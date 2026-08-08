// The identity gate's server half: member store, invite provenance, and the
// request handler behind /api/gate. Self-contained on Node builtins, no
// dependencies, so the function deploys with zero build step.
//
// Access model:
//   Members live in Firestore under gate/{namespace}/members. Every member
//   record carries WHO brought them in: invitedBy (the inviting member's
//   email), inviteChain (the full chain from the root outward, transitively),
//   and inviteId (the invite-link token they claimed). Invite links are minted
//   by active members and recorded under gate/{namespace}/invites, tied to the
//   minting member's identity. Revocation works per person and per invite
//   subtree (a revoked person's descendants go with them when asked).
//
// Three doors into the handler:
//   internal ops (session, request-access, track, invite-create, invite-claim):
//     only the edge middleware calls these, proven by an HMAC over the exact
//     request body with the shared gate secret.
//   admin ops (funnel-members, funnel-invites, funnel-trail, funnel-revoke,
//   funnel-reinstate, funnel-add, funnel-revoke-invite):
//     proven by the x-admin-key header (FUNNEL_ADMIN_KEY) or by an admin's
//     signed identity cookie (an address in ADMIN_EMAILS).

import { createHmac, createSign, timingSafeEqual, randomBytes } from 'node:crypto';

export const DEFAULT_NAMESPACE = 'supersuit-family';

// ---------------------------------------------------------------------------
// HMAC helpers shared by the internal-call check and the admin-cookie check.

export function hmacBase64url(payload, secret) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function gateSecret(env) {
  return env.WIKI_GATE_SECRET || '';
}

export function adminEmails(env) {
  return (env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

// Verifies the wiki_id identity cookie the edge middleware issues. Same
// format, same secret, other runtime.
export function identityFromCookieHeader(cookieHeader, secret) {
  if (!cookieHeader || !secret) return null;
  let raw = null;
  for (const part of cookieHeader.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === 'wiki_id') raw = part.slice(eq + 1).trim();
  }
  if (!raw) return null;
  const [version, payload, signature] = raw.split('.');
  if (version !== 'v1' || !payload || !signature) return null;
  if (!safeEqual(signature, hmacBase64url(`${version}.${payload}`, secret))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!parsed.e || !parsed.st) return null;
    return { email: String(parsed.e).toLowerCase(), status: String(parsed.st) };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Firestore over REST. Token minting is a signed JWT exchanged for an access
// token, cached until shortly before expiry. Ported from the proven
// takeoffwithclaude funnel store.

export function firestoreConfigFromEnv(env = process.env) {
  const projectId = env.FIREBASE_PROJECT_ID;
  const clientEmail = env.FIREBASE_CLIENT_EMAIL;
  // Vercel env vars store the key with literal \n sequences.
  const privateKey = env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) return null;
  return { projectId, clientEmail, privateKey };
}

function toValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toValue) } };
  if (typeof value === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(value)) fields[k] = toValue(v);
    return { mapValue: { fields } };
  }
  return { nullValue: null };
}

function fromValue(value) {
  if (!value) return null;
  if ('stringValue' in value) return value.stringValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('nullValue' in value) return null;
  if ('arrayValue' in value) return (value.arrayValue.values ?? []).map(fromValue);
  if ('mapValue' in value) {
    const fields = value.mapValue.fields ?? {};
    const out = {};
    for (const [k, v] of Object.entries(fields)) out[k] = fromValue(v);
    return out;
  }
  return null;
}

function fieldsOf(object) {
  const fields = {};
  for (const [k, v] of Object.entries(object)) fields[k] = toValue(v);
  return fields;
}

export class FirestoreClient {
  constructor(config) {
    this.config = config;
    this.token = null;
  }

  async accessToken() {
    if (this.token && this.token.expiresAt > Date.now() + 60_000) return this.token.value;
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const claims = Buffer.from(
      JSON.stringify({
        iss: this.config.clientEmail,
        scope: 'https://www.googleapis.com/auth/datastore',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
      }),
    ).toString('base64url');
    const signer = createSign('RSA-SHA256');
    signer.update(`${header}.${claims}`);
    const signature = signer.sign(this.config.privateKey).toString('base64url');
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: `${header}.${claims}.${signature}`,
      }).toString(),
    });
    if (!res.ok) throw new Error(`firestore token exchange failed: ${res.status}`);
    const data = await res.json();
    this.token = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
    return data.access_token;
  }

  base() {
    return `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/(default)/documents`;
  }

  async request(method, path, body) {
    const token = await this.accessToken();
    const res = await fetch(`${this.base()}${path}`, {
      method,
      headers: {
        authorization: `Bearer ${token}`,
        ...(body ? { 'content-type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`firestore ${method} ${path}: ${res.status} ${await res.text()}`);
    return res.json();
  }

  async getDoc(path) {
    const doc = await this.request('GET', `/${path}`);
    if (!doc?.fields) return null;
    return fromValue({ mapValue: { fields: doc.fields } });
  }

  async setDoc(path, data, mergeFields) {
    const mask = mergeFields?.length
      ? `?${mergeFields.map((f) => `updateMask.fieldPaths=${encodeURIComponent(f)}`).join('&')}`
      : '';
    await this.request('PATCH', `/${path}${mask}`, { fields: fieldsOf(data) });
  }

  async addDoc(parentPath, collectionId, data) {
    await this.request('POST', `/${parentPath}/${collectionId}`, { fields: fieldsOf(data) });
  }

  async runQuery(parentPath, structuredQuery) {
    const token = await this.accessToken();
    const parent = `projects/${this.config.projectId}/databases/(default)/documents/${parentPath}`;
    const res = await fetch(
      `https://firestore.googleapis.com/v1/${parent}:runQuery`,
      {
        method: 'POST',
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify({ structuredQuery }),
      },
    );
    if (!res.ok) throw new Error(`firestore runQuery: ${res.status} ${await res.text()}`);
    const rows = await res.json();
    return rows
      .filter((row) => row.document?.fields)
      .map((row) => fromValue({ mapValue: { fields: row.document.fields } }));
  }
}

// ---------------------------------------------------------------------------
// The member and invite store, namespaced per wiki family so the shared
// Firestore project keeps this data apart from anything else living there.

function memberDocId(email) {
  return encodeURIComponent(email.toLowerCase());
}

function asMember(data) {
  const provenance = data.provenance ?? null;
  return {
    email: String(data.email ?? ''),
    name: String(data.name ?? ''),
    status: data.status === 'revoked' ? 'revoked' : data.status === 'pending' ? 'pending' : 'active',
    invitedBy: String(data.invitedBy ?? ''),
    inviteChain: Array.isArray(data.inviteChain) ? data.inviteChain.map(String) : [],
    inviteId: String(data.inviteId ?? ''),
    provenance: provenance
      ? {
          inviter: String(provenance.inviter ?? ''),
          story: String(provenance.story ?? ''),
          capturedAt: Number(provenance.capturedAt ?? 0),
        }
      : null,
    firstSeen: Number(data.firstSeen ?? 0),
    lastSeen: Number(data.lastSeen ?? 0),
    visitCount: Number(data.visitCount ?? 0),
  };
}

function asInvite(data) {
  return {
    token: String(data.token ?? ''),
    createdBy: String(data.createdBy ?? '').toLowerCase(),
    createdAt: Number(data.createdAt ?? 0),
    revoked: Boolean(data.revoked),
    uses: Number(data.uses ?? 0),
  };
}

export class FirestoreGateStore {
  constructor(config, namespace) {
    this.client = new FirestoreClient(config);
    this.ns = `gate/${encodeURIComponent(namespace)}`;
  }

  async getMember(email) {
    const data = await this.client.getDoc(`${this.ns}/members/${memberDocId(email)}`);
    return data ? asMember(data) : null;
  }

  async putMember(member) {
    await this.client.setDoc(`${this.ns}/members/${memberDocId(member.email)}`, member);
  }

  async mergeMember(email, fields) {
    await this.client.setDoc(`${this.ns}/members/${memberDocId(email)}`, fields, Object.keys(fields));
  }

  async listMembers() {
    const rows = await this.client.runQuery(this.ns, {
      from: [{ collectionId: 'members' }],
      orderBy: [{ field: { fieldPath: 'lastSeen' }, direction: 'DESCENDING' }],
      limit: 1000,
    });
    return rows.map(asMember);
  }

  async getInvite(token) {
    const data = await this.client.getDoc(`${this.ns}/invites/${encodeURIComponent(token)}`);
    return data ? asInvite(data) : null;
  }

  async putInvite(invite) {
    await this.client.setDoc(`${this.ns}/invites/${encodeURIComponent(invite.token)}`, invite);
  }

  async mergeInvite(token, fields) {
    await this.client.setDoc(`${this.ns}/invites/${encodeURIComponent(token)}`, fields, Object.keys(fields));
  }

  async listInvites() {
    const rows = await this.client.runQuery(this.ns, {
      from: [{ collectionId: 'invites' }],
      orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
      limit: 1000,
    });
    return rows.map(asInvite);
  }

  async addVisit(visit) {
    await this.client.addDoc(this.ns, 'visits', visit);
  }

  async listVisits({ email, sinceTs, limit }) {
    const filters = [];
    if (email) {
      filters.push({
        fieldFilter: { field: { fieldPath: 'email' }, op: 'EQUAL', value: { stringValue: email } },
      });
    }
    if (sinceTs) {
      filters.push({
        fieldFilter: {
          field: { fieldPath: 'ts' },
          op: 'GREATER_THAN_OR_EQUAL',
          value: { integerValue: String(sinceTs) },
        },
      });
    }
    const where =
      filters.length === 0
        ? undefined
        : filters.length === 1
          ? filters[0]
          : { compositeFilter: { op: 'AND', filters } };
    const rows = await this.client.runQuery(this.ns, {
      from: [{ collectionId: 'visits' }],
      ...(where ? { where } : {}),
      orderBy: [{ field: { fieldPath: 'ts' }, direction: 'DESCENDING' }],
      limit,
    });
    return rows.map((row) => ({
      email: String(row.email ?? ''),
      path: String(row.path ?? ''),
      ts: Number(row.ts ?? 0),
      ua: String(row.ua ?? ''),
    }));
  }
}

// In-memory twin for tests and local dev without credentials.
export class MemoryGateStore {
  constructor() {
    this.members = new Map();
    this.invites = new Map();
    this.visits = [];
  }

  async getMember(email) {
    const found = this.members.get(email.toLowerCase());
    return found ? { ...found, inviteChain: [...found.inviteChain] } : null;
  }

  async putMember(member) {
    this.members.set(member.email.toLowerCase(), { ...member, inviteChain: [...member.inviteChain] });
  }

  async mergeMember(email, fields) {
    const found = this.members.get(email.toLowerCase());
    if (found) Object.assign(found, fields);
  }

  async listMembers() {
    return [...this.members.values()]
      .map((m) => ({ ...m, inviteChain: [...m.inviteChain] }))
      .sort((a, b) => b.lastSeen - a.lastSeen);
  }

  async getInvite(token) {
    const found = this.invites.get(token);
    return found ? { ...found } : null;
  }

  async putInvite(invite) {
    this.invites.set(invite.token, { ...invite });
  }

  async mergeInvite(token, fields) {
    const found = this.invites.get(token);
    if (found) Object.assign(found, fields);
  }

  async listInvites() {
    return [...this.invites.values()].sort((a, b) => b.createdAt - a.createdAt);
  }

  async addVisit(visit) {
    this.visits.push({ ...visit });
  }

  async listVisits({ email, sinceTs, limit }) {
    return this.visits
      .filter((v) => (email ? v.email === email : true))
      .filter((v) => (sinceTs ? v.ts >= sinceTs : true))
      .sort((a, b) => b.ts - a.ts)
      .slice(0, limit);
  }
}

export function pickStore(env = process.env) {
  const config = firestoreConfigFromEnv(env);
  const namespace = env.GATE_NAMESPACE || DEFAULT_NAMESPACE;
  if (config) return new FirestoreGateStore(config, namespace);
  return null;
}

// ---------------------------------------------------------------------------
// The request handler. Pure enough to test against the memory store: takes
// the op, the method, the raw body string, and the relevant headers.

function newMember({ email, name, status, invitedBy, inviteChain, inviteId, provenance, now }) {
  return {
    email,
    name,
    status,
    invitedBy: invitedBy ?? '',
    inviteChain: inviteChain ?? [],
    inviteId: inviteId ?? '',
    provenance: provenance ?? null,
    firstSeen: now,
    lastSeen: now,
    visitCount: 0,
  };
}

export function createGateHandler(env, store) {
  const secret = gateSecret(env);

  function verifyInternal(rawBody, signature) {
    if (!secret || !signature) return null;
    if (!safeEqual(signature, hmacBase64url(rawBody, secret))) return null;
    try {
      return JSON.parse(rawBody);
    } catch {
      return null;
    }
  }

  function isAdmin(headers) {
    const key = headers['x-admin-key'];
    if (key && env.FUNNEL_ADMIN_KEY && safeEqual(key, env.FUNNEL_ADMIN_KEY)) return true;
    const identity = identityFromCookieHeader(headers.cookie, secret);
    if (!identity || identity.status !== 'active') return false;
    return adminEmails(env).includes(identity.email);
  }

  return async function handle(op, method, rawBody, headers = {}) {
    // Internal ops: HMAC over the exact body, edge middleware only. ---------
    if (op === 'session' && method === 'POST') {
      const body = verifyInternal(rawBody, headers['x-gate-sig']);
      if (!body) return { status: 401, body: { error: 'unauthorized' } };
      const email = String(body.email ?? '').toLowerCase();
      const name = String(body.name ?? '');
      if (!email.includes('@')) return { status: 400, body: { error: 'email required' } };
      try {
        const member = await store.getMember(email);
        if (!member) return { status: 200, body: { status: 'none' } };
        await store.mergeMember(email, { name: name || member.name, lastSeen: Date.now() });
        return { status: 200, body: { status: member.status } };
      } catch (e) {
        return { status: 502, body: { error: e?.message ?? 'store failed' } };
      }
    }

    if (op === 'request-access' && method === 'POST') {
      const body = verifyInternal(rawBody, headers['x-gate-sig']);
      if (!body) return { status: 401, body: { error: 'unauthorized' } };
      const email = String(body.email ?? '').toLowerCase();
      const name = String(body.name ?? '');
      const inviter = String(body.inviter ?? '').trim().slice(0, 300);
      const story = String(body.story ?? '').trim().slice(0, 2000);
      if (!email.includes('@') || !inviter || !story) {
        return { status: 400, body: { error: 'email, inviter and story are required' } };
      }
      try {
        const existing = await store.getMember(email);
        // A declared request never overwrites an existing record and never
        // self-activates: it lands as pending until an admin approves it.
        if (existing) return { status: 200, body: { status: existing.status } };
        const now = Date.now();
        await store.putMember(
          newMember({
            email,
            name,
            status: 'pending',
            provenance: { inviter, story, capturedAt: now },
            now,
          }),
        );
        return { status: 200, body: { status: 'pending' } };
      } catch (e) {
        return { status: 502, body: { error: e?.message ?? 'store failed' } };
      }
    }

    if (op === 'invite-create' && method === 'POST') {
      const body = verifyInternal(rawBody, headers['x-gate-sig']);
      if (!body) return { status: 401, body: { error: 'unauthorized' } };
      const createdBy = String(body.createdBy ?? '').toLowerCase();
      if (!createdBy.includes('@')) return { status: 400, body: { error: 'createdBy required' } };
      try {
        // Only a member in good standing can mint. The edge verified the
        // cookie; this re-checks the store so a stale cookie cannot mint.
        const creator = await store.getMember(createdBy);
        if (!creator || creator.status !== 'active') {
          return { status: 403, body: { error: 'not an active member' } };
        }
        const token = randomBytes(16).toString('base64url');
        await store.putInvite({ token, createdBy, createdAt: Date.now(), revoked: false, uses: 0 });
        return { status: 200, body: { token } };
      } catch (e) {
        return { status: 502, body: { error: e?.message ?? 'store failed' } };
      }
    }

    if (op === 'invite-claim' && method === 'POST') {
      const body = verifyInternal(rawBody, headers['x-gate-sig']);
      if (!body) return { status: 401, body: { error: 'unauthorized' } };
      const token = String(body.token ?? '');
      const email = String(body.email ?? '').toLowerCase();
      const name = String(body.name ?? '');
      if (!token || !email.includes('@')) return { status: 400, body: { error: 'token and email required' } };
      try {
        const invite = await store.getInvite(token);
        if (!invite || invite.revoked) return { status: 200, body: { status: 'invalid' } };
        const creator = await store.getMember(invite.createdBy);
        // A revoked inviter's links die with them.
        if (!creator || creator.status !== 'active') return { status: 200, body: { status: 'invalid' } };
        const existing = await store.getMember(email);
        if (existing && existing.status === 'active') return { status: 200, body: { status: 'active' } };
        if (existing && existing.status === 'revoked') return { status: 200, body: { status: 'revoked' } };
        const now = Date.now();
        const chain = [...creator.inviteChain, creator.email];
        const provenance = {
          inviter: creator.email,
          story: existing?.provenance?.story || 'claimed an invite link',
          capturedAt: existing?.provenance?.capturedAt || now,
        };
        await store.putMember(
          newMember({
            email,
            name: name || existing?.name || '',
            status: 'active',
            invitedBy: creator.email,
            inviteChain: chain,
            inviteId: token,
            provenance,
            now,
          }),
        );
        await store.mergeInvite(token, { uses: invite.uses + 1 });
        return { status: 200, body: { status: 'active' } };
      } catch (e) {
        return { status: 502, body: { error: e?.message ?? 'store failed' } };
      }
    }

    if (op === 'track' && method === 'POST') {
      const body = verifyInternal(rawBody, headers['x-gate-sig']);
      if (!body) return { status: 401, body: { error: 'unauthorized' } };
      const email = String(body.email ?? '').toLowerCase();
      const path = String(body.path ?? '');
      const ts = Number(body.ts ?? Date.now());
      const ua = String(body.ua ?? '').slice(0, 120);
      if (!email.includes('@') || !path.startsWith('/')) return { status: 400, body: { error: 'bad visit' } };
      try {
        await store.addVisit({ email, path, ts, ua });
      } catch {
        // Telemetry never deserves a retry loop at the edge.
      }
      return { status: 204, body: null };
    }

    // Admin ops. -------------------------------------------------------------
    if (op.startsWith('funnel-')) {
      if (!isAdmin(headers)) return { status: 401, body: { error: 'unauthorized' } };

      if (op === 'funnel-members' && method === 'GET') {
        return { status: 200, body: { members: await store.listMembers() } };
      }

      if (op === 'funnel-invites' && method === 'GET') {
        return { status: 200, body: { invites: await store.listInvites() } };
      }

      if (op === 'funnel-trail' && method === 'GET') {
        const email = String(headers['x-email'] ?? '').toLowerCase();
        if (!email.includes('@')) return { status: 400, body: { error: 'x-email header required' } };
        return { status: 200, body: { visits: await store.listVisits({ email, limit: 500 }) } };
      }

      if (op === 'funnel-add' && method === 'POST') {
        let body;
        try {
          body = JSON.parse(rawBody);
        } catch {
          return { status: 400, body: { error: 'body must be JSON' } };
        }
        const email = String(body.email ?? '').toLowerCase();
        const name = String(body.name ?? '');
        if (!email.includes('@')) return { status: 400, body: { error: 'email required' } };
        const existing = await store.getMember(email);
        const now = Date.now();
        if (existing) {
          // Approving a pending request keeps its declared provenance.
          await store.mergeMember(email, { status: 'active' });
          return { status: 200, body: { email, status: 'active' } };
        }
        await store.putMember(
          newMember({
            email,
            name,
            status: 'active',
            provenance: { inviter: 'whitelisted by admin', story: String(body.note ?? ''), capturedAt: now },
            now,
          }),
        );
        return { status: 200, body: { email, status: 'active' } };
      }

      if (op === 'funnel-revoke' && method === 'POST') {
        let body;
        try {
          body = JSON.parse(rawBody);
        } catch {
          return { status: 400, body: { error: 'body must be JSON' } };
        }
        const email = String(body.email ?? '').toLowerCase();
        const subtree = Boolean(body.subtree);
        if (!email.includes('@')) return { status: 400, body: { error: 'email required' } };
        const member = await store.getMember(email);
        if (!member) return { status: 404, body: { error: 'no such member' } };
        const revoked = [email];
        await store.mergeMember(email, { status: 'revoked' });
        if (subtree) {
          const all = await store.listMembers();
          for (const m of all) {
            if (m.email !== email && m.inviteChain.includes(email) && m.status !== 'revoked') {
              await store.mergeMember(m.email, { status: 'revoked' });
              revoked.push(m.email);
            }
          }
        }
        // Their invite links die too, so a revoked person cannot re-enter
        // through a link they minted earlier.
        const invites = await store.listInvites();
        for (const invite of invites) {
          if (revoked.includes(invite.createdBy) && !invite.revoked) {
            await store.mergeInvite(invite.token, { revoked: true });
          }
        }
        return { status: 200, body: { revoked } };
      }

      if (op === 'funnel-reinstate' && method === 'POST') {
        let body;
        try {
          body = JSON.parse(rawBody);
        } catch {
          return { status: 400, body: { error: 'body must be JSON' } };
        }
        const email = String(body.email ?? '').toLowerCase();
        if (!email.includes('@')) return { status: 400, body: { error: 'email required' } };
        const member = await store.getMember(email);
        if (!member) return { status: 404, body: { error: 'no such member' } };
        await store.mergeMember(email, { status: 'active' });
        return { status: 200, body: { email, status: 'active' } };
      }

      if (op === 'funnel-revoke-invite' && method === 'POST') {
        let body;
        try {
          body = JSON.parse(rawBody);
        } catch {
          return { status: 400, body: { error: 'body must be JSON' } };
        }
        const token = String(body.token ?? '');
        if (!token) return { status: 400, body: { error: 'token required' } };
        const invite = await store.getInvite(token);
        if (!invite) return { status: 404, body: { error: 'no such invite' } };
        await store.mergeInvite(token, { revoked: true });
        return { status: 200, body: { token, revoked: true } };
      }
    }

    return { status: 404, body: { error: 'unknown op' } };
  };
}
