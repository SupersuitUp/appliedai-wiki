// Tests for the server half of the identity gate: api/_lib/gate-core.mjs.
// Run: pnpm test   (Node >= 22.6)
//
// The load-bearing assertions here are the provenance guarantees: every
// member created through an invite link carries who invited them,
// transitively, and revocation can take a whole invite subtree.

import assert from 'node:assert/strict';
import test from 'node:test';
import { createHmac } from 'node:crypto';

const { createGateHandler, MemoryGateStore, identityFromCookieHeader } = await import(
  '../api/_lib/gate-core.mjs'
);

const SECRET = 'test-secret';
const ENV = {
  WIKI_GATE_SECRET: SECRET,
  FUNNEL_ADMIN_KEY: 'test-admin-key',
  ADMIN_EMAILS: 'admin@example.com',
};

function signed(payload: Record<string, unknown>): { body: string; headers: Record<string, string> } {
  const body = JSON.stringify(payload);
  return {
    body,
    headers: { 'x-gate-sig': createHmac('sha256', SECRET).update(body).digest('base64url') },
  };
}

const adminHeaders = { 'x-admin-key': 'test-admin-key' };

function fresh() {
  const store = new MemoryGateStore();
  const handle = createGateHandler(ENV, store);
  return { store, handle };
}

async function seedRoot(handle: any, email = 'root@example.com') {
  const res = await handle('funnel-add', 'POST', JSON.stringify({ email, name: 'Root' }), adminHeaders);
  assert.equal(res.status, 200);
  return email;
}

async function mint(handle: any, createdBy: string): Promise<string> {
  const { body, headers } = signed({ createdBy });
  const res = await handle('invite-create', 'POST', body, headers);
  assert.equal(res.status, 200);
  return res.body.token;
}

async function claim(handle: any, token: string, email: string, name = '') {
  const { body, headers } = signed({ token, email, name });
  return handle('invite-claim', 'POST', body, headers);
}

// ---------------------------------------------------------------------------

test('internal ops refuse a missing or wrong HMAC', async () => {
  const { handle } = fresh();
  for (const op of ['session', 'request-access', 'invite-create', 'invite-claim', 'track']) {
    const noSig = await handle(op, 'POST', JSON.stringify({ email: 'a@b.com' }), {});
    assert.equal(noSig.status, 401, `${op} without a signature must refuse`);
    const badSig = await handle(op, 'POST', JSON.stringify({ email: 'a@b.com' }), {
      'x-gate-sig': 'deadbeef',
    });
    assert.equal(badSig.status, 401, `${op} with a wrong signature must refuse`);
  }
});

test('session: unknown address answers none, a member answers their status and is touched', async () => {
  const { handle, store } = fresh();
  const probe = signed({ email: 'x@example.com', name: 'X' });
  const none = await handle('session', 'POST', probe.body, probe.headers);
  assert.equal(none.body.status, 'none');

  await seedRoot(handle);
  const { body, headers } = signed({ email: 'root@example.com', name: 'Rooty' });
  const res = await handle('session', 'POST', body, headers);
  assert.equal(res.body.status, 'active');
  const member = await store.getMember('root@example.com');
  assert.equal(member!.name, 'Rooty', 'the display name is refreshed on session checks');
});

test('request-access creates a pending member with declared provenance, never active', async () => {
  const { handle, store } = fresh();
  const { body, headers } = signed({
    email: 'stranger@example.com',
    name: 'Stranger',
    inviter: 'found the link in a group chat',
    story: 'curious about the craft',
  });
  const res = await handle('request-access', 'POST', body, headers);
  assert.equal(res.body.status, 'pending');
  const member = await store.getMember('stranger@example.com');
  assert.equal(member!.status, 'pending');
  assert.equal(member!.provenance!.inviter, 'found the link in a group chat');
  assert.equal(member!.invitedBy, '', 'a declared request carries no invite-link provenance');

  const again = await handle('request-access', 'POST', body, headers);
  assert.equal(again.body.status, 'pending', 'a repeat request never resets the record');
});

test('invite-create requires an active minting member', async () => {
  const { handle } = fresh();
  const { body, headers } = signed({ createdBy: 'nobody@example.com' });
  const res = await handle('invite-create', 'POST', body, headers);
  assert.equal(res.status, 403);
});

test('claiming an invite records provenance: invitedBy, the chain, and the token', async () => {
  const { handle, store } = fresh();
  const root = await seedRoot(handle);
  const token = await mint(handle, root);

  const res = await claim(handle, token, 'ada@example.com', 'Ada');
  assert.equal(res.body.status, 'active');
  const ada = await store.getMember('ada@example.com');
  assert.equal(ada!.status, 'active');
  assert.equal(ada!.invitedBy, root);
  assert.deepEqual(ada!.inviteChain, [root]);
  assert.equal(ada!.inviteId, token);
  assert.equal(ada!.provenance!.inviter, root);

  const invite = await store.getInvite(token);
  assert.equal(invite!.uses, 1);
});

test('invite chains are transitive: the chain grows one hop per generation', async () => {
  const { handle, store } = fresh();
  const root = await seedRoot(handle);
  await claim(handle, await mint(handle, root), 'ada@example.com', 'Ada');
  await claim(handle, await mint(handle, 'ada@example.com'), 'bob@example.com', 'Bob');
  await claim(handle, await mint(handle, 'bob@example.com'), 'eve@example.com', 'Eve');

  const eve = await store.getMember('eve@example.com');
  assert.deepEqual(eve!.inviteChain, [root, 'ada@example.com', 'bob@example.com']);
  assert.equal(eve!.invitedBy, 'bob@example.com');
});

test('a revoked invite, or an invite from a revoked member, no longer admits anyone', async () => {
  const { handle } = fresh();
  const root = await seedRoot(handle);
  const token = await mint(handle, root);

  await handle('funnel-revoke-invite', 'POST', JSON.stringify({ token }), adminHeaders);
  const dead = await claim(handle, token, 'late@example.com');
  assert.equal(dead.body.status, 'invalid');

  const token2 = await mint(handle, root);
  await handle('funnel-revoke', 'POST', JSON.stringify({ email: root }), adminHeaders);
  const orphaned = await claim(handle, token2, 'later@example.com');
  assert.equal(orphaned.body.status, 'invalid', 'a revoked inviter takes their links with them');
});

test('claiming an invite promotes a pending requester without losing their story', async () => {
  const { handle, store } = fresh();
  const root = await seedRoot(handle);
  const req = signed({
    email: 'ada@example.com',
    name: 'Ada',
    inviter: 'asked around',
    story: 'my real story',
  });
  await handle('request-access', 'POST', req.body, req.headers);

  const token = await mint(handle, root);
  const res = await claim(handle, token, 'ada@example.com', 'Ada');
  assert.equal(res.body.status, 'active');
  const ada = await store.getMember('ada@example.com');
  assert.equal(ada!.invitedBy, root);
  assert.equal(ada!.provenance!.story, 'my real story');
});

test('a revoked member cannot slip back in through a fresh invite link', async () => {
  const { handle } = fresh();
  const root = await seedRoot(handle);
  const token = await mint(handle, root);
  await claim(handle, token, 'ada@example.com', 'Ada');
  await handle('funnel-revoke', 'POST', JSON.stringify({ email: 'ada@example.com' }), adminHeaders);

  const token2 = await mint(handle, root);
  const res = await claim(handle, token2, 'ada@example.com', 'Ada');
  assert.equal(res.body.status, 'revoked', 'revocation outranks any invite link');
});

test('subtree revocation takes the descendants and their invite links, not the siblings', async () => {
  const { handle, store } = fresh();
  const root = await seedRoot(handle);
  await claim(handle, await mint(handle, root), 'ada@example.com');
  await claim(handle, await mint(handle, root), 'sibling@example.com');
  await claim(handle, await mint(handle, 'ada@example.com'), 'bob@example.com');
  const bobsToken = await mint(handle, 'bob@example.com');

  const res = await handle(
    'funnel-revoke',
    'POST',
    JSON.stringify({ email: 'ada@example.com', subtree: true }),
    adminHeaders,
  );
  assert.deepEqual(res.body.revoked.sort(), ['ada@example.com', 'bob@example.com']);
  assert.equal((await store.getMember('ada@example.com'))!.status, 'revoked');
  assert.equal((await store.getMember('bob@example.com'))!.status, 'revoked');
  assert.equal((await store.getMember('sibling@example.com'))!.status, 'active');
  assert.equal((await store.getInvite(bobsToken))!.revoked, true, 'a revoked descendant loses their links');

  const rein = await handle(
    'funnel-reinstate',
    'POST',
    JSON.stringify({ email: 'bob@example.com' }),
    adminHeaders,
  );
  assert.equal(rein.body.status, 'active');
});

test('funnel ops refuse without the admin key or an admin identity cookie', async () => {
  const { handle } = fresh();
  const bare = await handle('funnel-members', 'GET', '', {});
  assert.equal(bare.status, 401);
  const wrongKey = await handle('funnel-members', 'GET', '', { 'x-admin-key': 'nope' });
  assert.equal(wrongKey.status, 401);

  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ e: 'admin@example.com', n: 'Admin', st: 'active', iat: now, rv: now }),
  ).toString('base64url');
  const sig = createHmac('sha256', SECRET).update(`v1.${payload}`).digest('base64url');
  const asAdmin = await handle('funnel-members', 'GET', '', { cookie: `wiki_id=v1.${payload}.${sig}` });
  assert.equal(asAdmin.status, 200);

  const strangerPayload = Buffer.from(
    JSON.stringify({ e: 'stranger@example.com', n: 'S', st: 'active', iat: now, rv: now }),
  ).toString('base64url');
  const strangerSig = createHmac('sha256', SECRET).update(`v1.${strangerPayload}`).digest('base64url');
  const asStranger = await handle('funnel-members', 'GET', '', {
    cookie: `wiki_id=v1.${strangerPayload}.${strangerSig}`,
  });
  assert.equal(asStranger.status, 401);
});

test('identityFromCookieHeader refuses forged cookies', () => {
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ e: 'ada@example.com', n: 'Ada', st: 'active', iat: now, rv: now }),
  ).toString('base64url');
  const sig = createHmac('sha256', SECRET).update(`v1.${payload}`).digest('base64url');
  assert.ok(identityFromCookieHeader(`wiki_id=v1.${payload}.${sig}`, SECRET));
  assert.equal(identityFromCookieHeader(`wiki_id=v1.${payload}.deadbeef`, SECRET), null);
  assert.equal(identityFromCookieHeader(`wiki_id=nonsense`, SECRET), null);
  assert.equal(identityFromCookieHeader(undefined, SECRET), null);
});

test('track appends a visit and refuses garbage', async () => {
  const { handle, store } = fresh();
  const { body, headers } = signed({ email: 'ada@example.com', path: '/concepts/x', ts: 123, ua: 'UA' });
  const res = await handle('track', 'POST', body, headers);
  assert.equal(res.status, 204);
  assert.equal(store.visits.length, 1);

  const bad = signed({ email: 'not-an-email', path: 'nope' });
  const refused = await handle('track', 'POST', bad.body, bad.headers);
  assert.equal(refused.status, 400);
});

test('unknown ops answer 404', async () => {
  const { handle } = fresh();
  const res = await handle('anything-else', 'GET', '', adminHeaders);
  assert.equal(res.status, 404);
});
