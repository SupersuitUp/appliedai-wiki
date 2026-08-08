// Vercel Routing Middleware (platform-level, runs before the cache).
//
// Two independent layers:
//
//   Layer 1, always on: the bot block. Known LLM training and AI-search
//   crawlers get a hard 403 by User-Agent, exactly as this file has always
//   done. No auth, no password logic.
//
//   Layer 2, DARK unless switched on: the identity gate. It activates only
//   when GATE_IDENTITY=1 AND the Google OAuth client AND the gate secret are
//   all present in the environment. With any of those missing, every request
//   passes through byte-identical to the bot-block-only behavior. Flipping
//   GATE_IDENTITY off (or removing it) is the instant relief valve.
//
// The identity gate, when on:
//   Google sign-in at the edge (OAuth code flow handled right here), an
//   HMAC-signed identity cookie, and membership by invitation. Members live
//   in Firestore behind /api/gate?op=*, reached only with an HMAC over the
//   exact request body. Every member record carries provenance: who invited
//   them, transitively, back to the root. Invite links are minted at
//   /auth/invite by active members and claimed at /auth/invite/<token>.
//   Strangers without a link can request access and wait as pending.
//   Revocation is per person (and per invite subtree via the admin API) and
//   bites within REVALIDATE_SECONDS.
//
// What stays open even with the gate on:
//   the machine layer (.md, .txt including /llms.txt, audio), because agents
//   cannot type passwords or complete OAuth; unfurl-bot user agents so shared
//   links keep their cards; and everything the matcher already excludes
//   (assets, images, hosted skills and generators).
//
// An optional password handshake stage (Layer 1.5) exists for wikis that want
// it: it runs only if WIKI_PASSWORD is set. The family default is Google-only,
// so most deployments never set it.

const BLOCKED_BOT_PATTERN =
  /\b(GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-Web|anthropic-ai|CCBot|Google-Extended|GoogleOther|Applebot-Extended|FacebookBot|Meta-ExternalAgent|meta-externalagent|Bytespider|PerplexityBot|Perplexity-User|Amazonbot|AI2Bot|cohere-ai|Diffbot|Omgili|ImagesiftBot|YouBot|DuckAssistBot|peer39_crawler|TimpiBot|Webzio-Extended|Kangaroo|Cotoyogi)\b/i;

const COOKIE_NAME = 'wiki_gate';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const COOKIE_VERSION = 'v1';

const ID_COOKIE_NAME = 'wiki_id';
const ID_COOKIE_VERSION = 'v1';
// How long an active identity rides before the member list is consulted
// again. Revoking someone therefore takes effect within this window, with no
// per-request Firestore read.
const REVALIDATE_SECONDS = 600;
// After a failed revalidation fetch (function cold, network blip) we wave the
// visitor through and retry this soon, instead of hammering every request.
const REVALIDATE_RETRY_SECONDS = 60;
const TRACK_TIMEOUT_MS = 3000;
const SESSION_TIMEOUT_MS = 5000;

// Link-preview crawlers pass through so shared links keep unfurling with
// their real og:image card.
const UNFURL_BOT_PATTERN =
  /\b(facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Slack-ImgProxy|Discordbot|WhatsApp|TelegramBot|Applebot|redditbot|Pinterest|SkypeUriPreview|Iframely|embedly|Mastodon|Bluesky|Cardyb|vkShare)\b/i;

// The machine layer: files agents fetch and run. An agent cannot complete
// OAuth, so these stay open with the gate on, matching the posture of the
// hosted skills and generators the matcher already excludes.
const MACHINE_PATH_PATTERN = /\.(?:md|txt|mp3|mp4|m4a|wav|pdf)$/i;

const encoder = new TextEncoder();

interface MiddlewareContext {
  waitUntil?: (promise: Promise<unknown>) => void;
}

function base64url(bytes: ArrayBuffer): string {
  let binary = '';
  const view = new Uint8Array(bytes);
  for (let i = 0; i < view.length; i += 1) binary += String.fromCharCode(view[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlOfString(text: string): string {
  return base64url(encoder.encode(text).buffer as ArrayBuffer);
}

function stringOfBase64url(value: string): string | null {
  try {
    const b64 = value.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return base64url(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
}

async function hasValidTicket(request: Request, secret: string): Promise<boolean> {
  const raw = readCookie(request, COOKIE_NAME);
  if (!raw) return false;
  const [version, expires, signature] = raw.split('.');
  if (version !== COOKIE_VERSION || !expires || !signature) return false;
  const expiresAt = Number(expires);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now() / 1000) return false;
  const expected = await sign(`${version}.${expires}`, secret);
  return constantTimeEqual(signature, expected);
}

async function issueTicket(secret: string): Promise<string> {
  const expires = String(Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE_SECONDS);
  const payload = `${COOKIE_VERSION}.${expires}`;
  return `${payload}.${await sign(payload, secret)}`;
}

// ---------------------------------------------------------------------------
// Identity cookie: v1.<base64url(json)>.<hmac>. The payload carries the
// address, the display name, the member status as of the last check, when the
// cookie was first issued (iat) and when the member list last confirmed it
// (rv). Tampering with any field breaks the signature and fails closed.
//
// Statuses: 'active' is a member in good standing; 'pending' has asked for
// access and waits for approval; 'none' signed in with Google but holds no
// member record yet; 'revoked' is out.

type IdentityStatus = 'active' | 'pending' | 'none' | 'revoked';

interface Identity {
  e: string; // email, lowercased
  n: string; // display name
  st: IdentityStatus;
  iat: number; // seconds
  rv: number; // seconds, last revalidation against the member store
}

// The greeting cookie: first name only, deliberately readable by page JS so
// the static site can say hello. Never trusted for anything; the HttpOnly
// identity cookie remains the only authority.
function helloFirstName(identity: Identity): string {
  return (identity.n || identity.e).trim().split(/\s+/)[0].slice(0, 40);
}

function helloCookieIfNeeded(request: Request, identity: Identity): string | undefined {
  const first = helloFirstName(identity);
  const current = readCookie(request, 'wiki_hello');
  if (current !== null && decodeURIComponent(current) === first) return undefined;
  return `wiki_hello=${encodeURIComponent(first)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax; Secure`;
}

async function issueIdentityCookie(identity: Identity, secret: string): Promise<string> {
  const payload = base64urlOfString(JSON.stringify(identity));
  const signature = await sign(`${ID_COOKIE_VERSION}.${payload}`, secret);
  const value = `${ID_COOKIE_VERSION}.${payload}.${signature}`;
  return `${ID_COOKIE_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax; Secure; HttpOnly`;
}

async function readIdentity(request: Request, secret: string): Promise<Identity | null> {
  const raw = readCookie(request, ID_COOKIE_NAME);
  if (!raw) return null;
  const [version, payload, signature] = raw.split('.');
  if (version !== ID_COOKIE_VERSION || !payload || !signature) return null;
  const expected = await sign(`${version}.${payload}`, secret);
  if (!constantTimeEqual(signature, expected)) return null;
  const json = stringOfBase64url(payload);
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as Identity;
    if (typeof parsed.e !== 'string' || !parsed.e.includes('@')) return null;
    if (!['active', 'pending', 'none', 'revoked'].includes(parsed.st)) return null;
    if (!Number.isFinite(parsed.iat) || !Number.isFinite(parsed.rv)) return null;
    if (parsed.iat < Date.now() / 1000 - COOKIE_MAX_AGE_SECONDS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

// A relative path we can safely redirect to after auth. Refuses absolute
// URLs and protocol-relative tricks so `next` can never leave the site.
function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/';
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Pages. One neutral shell that names the wiki by its host, so this file
// ports across the whole family without per-wiki branding edits.

function pageShell(host: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(host)}</title>
<meta name="robots" content="noindex" />
<style>
  :root {
    --ink: #1c1c1a;
    --paper: #fdfcf9;
    --card: #ffffff;
    --muted: #6d6a63;
    --line: #e5e1d8;
    --accent: #2f6f5f;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.65;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }
  main {
    width: 100%;
    max-width: 32rem;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 2.25rem 2rem;
  }
  .eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 0.9rem;
    font-weight: 600;
  }
  h1 {
    font-size: clamp(1.5rem, 5vw, 1.9rem);
    line-height: 1.2;
    margin: 0 0 1rem;
  }
  p { margin: 0 0 1.1rem; color: #3c3a34; }
  label {
    display: block;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 1rem 0 0.35rem;
  }
  input[type="password"], input[type="text"], textarea {
    width: 100%;
    font-size: 1rem;
    color: var(--ink);
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 0.7rem 0.85rem;
    font-family: inherit;
  }
  textarea { min-height: 6rem; resize: vertical; }
  input:focus-visible, textarea:focus-visible, button:focus-visible, a.button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  button, a.button {
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 6px;
    padding: 0.7rem 1.4rem;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-family: inherit;
  }
  button:hover, a.button:hover { filter: brightness(1.08); }
  .error { color: #a3543c; font-size: 0.95rem; margin: 0 0 1rem; }
  .actions { margin-top: 1.25rem; }
  .linkbox {
    font-family: ui-monospace, monospace;
    font-size: 0.85rem;
    word-break: break-all;
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 0.8rem 0.9rem;
    margin: 0 0 1rem;
  }
  footer {
    margin-top: 1.75rem;
    padding-top: 1rem;
    border-top: 1px solid var(--line);
    font-size: 0.85rem;
    color: var(--muted);
  }
  footer a { color: var(--accent); }
</style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>`;
}

function gatePage(host: string, wrongAnswer: boolean): string {
  return pageShell(
    host,
    `  <p class="eyebrow">${escapeHtml(host)}</p>
  <h1>This wiki opens with a password.</h1>
  <p>If someone sent you here, they can tell you the word.</p>
  ${wrongAnswer ? '<p class="error">Not it. Ask whoever sent you the link.</p>' : ''}
  <form method="POST">
    <input
      type="password"
      name="password"
      placeholder="the password"
      autocomplete="current-password"
      autocapitalize="off"
      autocorrect="off"
      spellcheck="false"
      aria-label="Password"
      autofocus
    />
    <div class="actions">
      <button type="submit">Come in</button>
    </div>
  </form>`,
  );
}

function identityPage(host: string, nextPath: string): string {
  const startHref = `/auth/google/start?next=${encodeURIComponent(nextPath)}`;
  return pageShell(
    host,
    `  <p class="eyebrow">${escapeHtml(host)}</p>
  <h1>This wiki is shared by invitation.</h1>
  <p>Sign in once with Google and this browser is set. If a member sent you an invite link, open that link after signing in and the door opens on its own.</p>
  <div class="actions">
    <a class="button" href="${startHref}">Continue with Google</a>
  </div>
  <footer>One click, no forms yet. Your address stays private.</footer>`,
  );
}

function requestPage(host: string, nextPath: string, email: string, showError: boolean): string {
  return pageShell(
    host,
    `  <p class="eyebrow">${escapeHtml(host)}</p>
  <h1>You need an introduction.</h1>
  <p>You are signed in as <strong>${escapeHtml(email)}</strong>, and this wiki runs on invitations. If a member gave you an invite link, open it now and you are in. Otherwise, two quick answers put you in the queue.</p>
  ${showError ? '<p class="error">Both answers are required. A name and a sentence is plenty.</p>' : ''}
  <form method="POST" action="/auth/request">
    <input type="hidden" name="next" value="${escapeHtml(nextPath)}" />
    <label for="inviter">Who sent you, or how did you find this?</label>
    <input type="text" id="inviter" name="inviter" maxlength="300" placeholder="a name, or where you found the link" autocomplete="off" />
    <label for="story">What brings you here?</label>
    <textarea id="story" name="story" maxlength="2000" placeholder="a sentence or two"></textarea>
    <div class="actions">
      <button type="submit">Request access</button>
    </div>
  </form>
  <footer><a href="/auth/signout">Sign in with a different account</a></footer>`,
  );
}

function waitingPage(host: string, email: string): string {
  return pageShell(
    host,
    `  <p class="eyebrow">${escapeHtml(host)}</p>
  <h1>Your request is in.</h1>
  <p><strong>${escapeHtml(email)}</strong> is in the queue. Once someone approves it, this page turns into the wiki on its own; just come back. If a member hands you an invite link in the meantime, opening it lets you skip the line.</p>
  <footer><a href="/auth/signout">Sign in with a different account</a></footer>`,
  );
}

function lockedPage(host: string): string {
  return pageShell(
    host,
    `  <p class="eyebrow">${escapeHtml(host)}</p>
  <h1>This door is closed for you right now.</h1>
  <p>Your sign-in worked, and access for this account is switched off at the moment. That is sometimes deliberate and sometimes a mistake on our side.</p>
  <footer>If you think this is wrong, reply to whoever sent you the link and it gets sorted quickly.</footer>`,
  );
}

function inviteDeadPage(host: string): string {
  return pageShell(
    host,
    `  <p class="eyebrow">${escapeHtml(host)}</p>
  <h1>This invite link is no longer live.</h1>
  <p>It may have been revoked, or the member who minted it lost access. Ask them for a fresh one, or <a href="/auth/request">request access</a> directly.</p>`,
  );
}

function mintPage(host: string, inviteUrl: string | null): string {
  return pageShell(
    host,
    `  <p class="eyebrow">${escapeHtml(host)}</p>
  <h1>Invite someone in.</h1>
  <p>An invite link admits whoever opens it, recorded as invited by you. Mint one per person so the chain of introductions stays honest.</p>
  ${
    inviteUrl
      ? `<p>Send them this link:</p><div class="linkbox">${escapeHtml(inviteUrl)}</div>`
      : ''
  }
  <form method="POST" action="/auth/invite">
    <div class="actions">
      <button type="submit">${inviteUrl ? 'Mint another link' : 'Mint an invite link'}</button>
    </div>
  </form>
  <footer><a href="/">Back to the wiki</a></footer>`,
  );
}

function authErrorPage(host: string, nextPath: string): string {
  const retryHref = `/auth/google/start?next=${encodeURIComponent(nextPath)}`;
  return pageShell(
    host,
    `  <p class="eyebrow">${escapeHtml(host)}</p>
  <h1>That sign-in did not complete.</h1>
  <p>Google sent us back without a usable answer. It happens: an expired attempt, a cancelled prompt, a stale tab. Nothing is broken on your side.</p>
  <div class="actions">
    <a class="button" href="${retryHref}">Try again</a>
  </div>`,
  );
}

function notFoundPage(host: string): string {
  return pageShell(
    host,
    `  <p class="eyebrow">${escapeHtml(host)}</p>
  <h1>Nothing lives at this address.</h1>
  <p><a href="/">Head back to the front page.</a></p>`,
  );
}

function htmlResponse(
  html: string,
  status: number,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(html, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex',
      ...extraHeaders,
    },
  });
}

function redirect(location: string, setCookies: string[] = []): Response {
  const headers = new Headers({ location, 'cache-control': 'no-store' });
  for (const cookie of setCookies) headers.append('set-cookie', cookie);
  return new Response(null, { status: 303, headers });
}

// Continue to the underlying route (like returning undefined) while attaching
// a refreshed cookie. `x-middleware-next` is the platform's documented way to
// say "keep going" from a returned Response.
function passThrough(setCookies: Array<string | undefined> = []): Response | undefined {
  const cookies = setCookies.filter((value): value is string => Boolean(value));
  if (cookies.length === 0) return undefined;
  const headers = new Headers({ 'x-middleware-next': '1' });
  for (const cookie of cookies) headers.append('set-cookie', cookie);
  return new Response(null, { headers });
}

// ---------------------------------------------------------------------------
// Server calls. The middleware talks to its own deployment's /api/gate
// function, authenticating with an HMAC over the exact body, so that route
// accepts the edge and nobody else.

interface GateEnv {
  secret: string;
  origin: string;
}

async function signedGatePost(
  env: GateEnv,
  op: string,
  payload: Record<string, unknown>,
  timeoutMs: number,
): Promise<Response> {
  const body = JSON.stringify(payload);
  return fetch(`${env.origin}/api/gate?op=${op}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-gate-sig': await sign(body, env.secret),
    },
    body,
    signal: AbortSignal.timeout(timeoutMs),
  });
}

type MemberStatus = 'active' | 'pending' | 'none' | 'revoked';

async function fetchMemberStatus(env: GateEnv, email: string, name: string): Promise<MemberStatus | null> {
  try {
    const res = await signedGatePost(env, 'session', { email, name }, SESSION_TIMEOUT_MS);
    if (!res.ok) return null;
    const data = (await res.json()) as { status?: string };
    if (data.status === 'active' || data.status === 'pending' || data.status === 'none' || data.status === 'revoked') {
      return data.status;
    }
    return null;
  } catch {
    return null;
  }
}

function trackVisit(env: GateEnv, context: MiddlewareContext, email: string, path: string, ua: string): void {
  const promise = signedGatePost(
    env,
    'track',
    { email, path, ts: Date.now(), ua: ua.slice(0, 120) },
    TRACK_TIMEOUT_MS,
  ).then(
    () => undefined,
    () => undefined,
  );
  // Never add latency to the page: hand the promise to the platform if it
  // lets us, otherwise let it float.
  if (typeof context?.waitUntil === 'function') context.waitUntil(promise);
}

// ---------------------------------------------------------------------------
// The Google OAuth 2.0 authorization-code flow, handled entirely at the edge.

interface OAuthEnv extends GateEnv {
  clientId: string;
  clientSecret: string;
  host: string;
}

async function makeState(next: string, secret: string): Promise<string> {
  const payload = base64urlOfString(JSON.stringify({ next, ts: Date.now() }));
  return `${payload}.${await sign(`state.${payload}`, secret)}`;
}

async function readState(state: string | null, secret: string): Promise<string | null> {
  if (!state) return null;
  const [payload, signature] = state.split('.');
  if (!payload || !signature) return null;
  if (!constantTimeEqual(signature, await sign(`state.${payload}`, secret))) return null;
  const json = stringOfBase64url(payload);
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as { next?: string; ts?: number };
    if (!Number.isFinite(parsed.ts) || Date.now() - (parsed.ts as number) > 10 * 60 * 1000) return null;
    return safeNext(parsed.next);
  } catch {
    return null;
  }
}

function decodeIdToken(idToken: string, clientId: string): { email: string; name: string } | null {
  const parts = idToken.split('.');
  if (parts.length !== 3) return null;
  const json = stringOfBase64url(parts[1]);
  if (!json) return null;
  try {
    const claims = JSON.parse(json) as {
      iss?: string;
      aud?: string;
      exp?: number;
      email?: string;
      email_verified?: boolean;
      name?: string;
    };
    // The token arrived directly from Google's token endpoint over TLS, so
    // the transport is the trust anchor; these checks catch mixups, not forgery.
    if (claims.iss !== 'https://accounts.google.com' && claims.iss !== 'accounts.google.com') return null;
    if (claims.aud !== clientId) return null;
    if (!Number.isFinite(claims.exp) || (claims.exp as number) < Date.now() / 1000) return null;
    if (!claims.email || claims.email_verified !== true) return null;
    return { email: claims.email.toLowerCase(), name: claims.name ?? claims.email };
  } catch {
    return null;
  }
}

function clearCookie(name: string, httpOnly: boolean): string {
  return `${name}=; Path=/; Max-Age=0; SameSite=Lax; Secure${httpOnly ? '; HttpOnly' : ''}`;
}

async function stampAndGo(
  identity: Identity,
  status: MemberStatus,
  next: string,
  secret: string,
): Promise<Response> {
  const now = Math.floor(Date.now() / 1000);
  const cookie = await issueIdentityCookie({ ...identity, st: status as IdentityStatus, rv: now }, secret);
  return redirect(next, [cookie]);
}

async function handleAuthRoute(
  request: Request,
  url: URL,
  env: OAuthEnv,
  context: MiddlewareContext,
): Promise<Response> {
  const path = url.pathname.replace(/\/$/, '') || '/';
  const redirectUri = `${env.origin}/auth/google/callback`;
  const host = env.host;

  if (path === '/auth/google/start') {
    const next = safeNext(url.searchParams.get('next'));
    const authorize = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authorize.searchParams.set('client_id', env.clientId);
    authorize.searchParams.set('redirect_uri', redirectUri);
    authorize.searchParams.set('response_type', 'code');
    authorize.searchParams.set('scope', 'openid email profile');
    authorize.searchParams.set('state', await makeState(next, env.secret));
    authorize.searchParams.set('prompt', 'select_account');
    return new Response(null, {
      status: 302,
      headers: { location: authorize.toString(), 'cache-control': 'no-store' },
    });
  }

  if (path === '/auth/google/callback') {
    const next = (await readState(url.searchParams.get('state'), env.secret)) ?? '/';
    const code = url.searchParams.get('code');
    if (!code) return htmlResponse(authErrorPage(host, next), 400);
    let tokenData: { id_token?: string } | null = null;
    try {
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: env.clientId,
          client_secret: env.clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }).toString(),
        signal: AbortSignal.timeout(8000),
      });
      if (tokenRes.ok) tokenData = (await tokenRes.json()) as { id_token?: string };
    } catch {
      tokenData = null;
    }
    const who = tokenData?.id_token ? decodeIdToken(tokenData.id_token, env.clientId) : null;
    if (!who) return htmlResponse(authErrorPage(host, next), 401);

    const status = await fetchMemberStatus(env, who.email, who.name);
    if (status === null) return htmlResponse(authErrorPage(host, next), 502);
    const now = Math.floor(Date.now() / 1000);
    const cookie = await issueIdentityCookie(
      { e: who.email, n: who.name, st: status, iat: now, rv: now },
      env.secret,
    );
    // Wherever they were headed. If they hold no membership yet, the main
    // flow (or the invite route in `next`) takes it from here.
    return redirect(next, [cookie]);
  }

  if (path === '/auth/request') {
    const identity = await readIdentity(request, env.secret);
    if (!identity) return redirect('/auth/google/start?next=%2Fauth%2Frequest');

    if (request.method === 'POST') {
      const form = new URLSearchParams(await request.text());
      const next = safeNext(form.get('next'));
      const inviter = (form.get('inviter') ?? '').trim().slice(0, 300);
      const story = (form.get('story') ?? '').trim().slice(0, 2000);
      if (!inviter || !story) {
        return htmlResponse(requestPage(host, next, identity.e, true), 400);
      }
      try {
        const res = await signedGatePost(
          env,
          'request-access',
          { email: identity.e, name: identity.n, inviter, story },
          SESSION_TIMEOUT_MS,
        );
        if (!res.ok) throw new Error(`request-access ${res.status}`);
        const data = (await res.json()) as { status?: string };
        const status: MemberStatus = data.status === 'active' ? 'active' : data.status === 'revoked' ? 'revoked' : 'pending';
        if (status === 'active') return stampAndGo(identity, 'active', next, env.secret);
        if (status === 'revoked') return htmlResponse(lockedPage(host), 403);
        const now = Math.floor(Date.now() / 1000);
        const cookie = await issueIdentityCookie({ ...identity, st: 'pending', rv: now }, env.secret);
        return htmlResponse(waitingPage(host, identity.e), 200, { 'set-cookie': cookie });
      } catch {
        return htmlResponse(authErrorPage(host, next), 502);
      }
    }

    const next = safeNext(url.searchParams.get('next'));
    // A fresh check every load: the moment an admin approves or seeds this
    // address, reloading this page opens the door.
    const status = await fetchMemberStatus(env, identity.e, identity.n);
    if (status === 'active') return stampAndGo(identity, 'active', next, env.secret);
    if (status === 'revoked') return htmlResponse(lockedPage(host), 403);
    if (status === 'pending') return htmlResponse(waitingPage(host, identity.e), 200);
    return htmlResponse(requestPage(host, next, identity.e, false), 200);
  }

  // Claiming an invite link: /auth/invite/<token>
  const claimMatch = path.match(/^\/auth\/invite\/([\w-]+)$/);
  if (claimMatch) {
    const token = claimMatch[1];
    const identity = await readIdentity(request, env.secret);
    if (!identity) {
      return redirect(`/auth/google/start?next=${encodeURIComponent(`/auth/invite/${token}`)}`);
    }
    if (identity.st === 'active') return redirect('/');
    try {
      const res = await signedGatePost(
        env,
        'invite-claim',
        { token, email: identity.e, name: identity.n },
        SESSION_TIMEOUT_MS,
      );
      if (!res.ok) throw new Error(`invite-claim ${res.status}`);
      const data = (await res.json()) as { status?: string };
      if (data.status === 'active') return stampAndGo(identity, 'active', '/', env.secret);
      if (data.status === 'revoked') return htmlResponse(lockedPage(host), 403);
      return htmlResponse(inviteDeadPage(host), 410);
    } catch {
      return htmlResponse(authErrorPage(host, `/auth/invite/${token}`), 502);
    }
  }

  // Minting an invite link: members only.
  if (path === '/auth/invite') {
    const identity = await readIdentity(request, env.secret);
    if (!identity) return redirect('/auth/google/start?next=%2Fauth%2Finvite');
    if (identity.st !== 'active') return redirect('/');

    if (request.method === 'POST') {
      try {
        const res = await signedGatePost(env, 'invite-create', { createdBy: identity.e }, SESSION_TIMEOUT_MS);
        if (!res.ok) throw new Error(`invite-create ${res.status}`);
        const data = (await res.json()) as { token?: string };
        if (!data.token) throw new Error('no token');
        return htmlResponse(mintPage(host, `${env.origin}/auth/invite/${data.token}`), 200);
      } catch {
        return htmlResponse(authErrorPage(host, '/auth/invite'), 502);
      }
    }
    return htmlResponse(mintPage(host, null), 200);
  }

  if (path === '/auth/signout') {
    return redirect('/', [clearCookie(ID_COOKIE_NAME, true), clearCookie('wiki_hello', false)]);
  }

  if (path === '/auth/locked') {
    return htmlResponse(lockedPage(host), 403);
  }

  return htmlResponse(notFoundPage(host), 404);
}

// ---------------------------------------------------------------------------

export default async function middleware(
  request: Request,
  context: MiddlewareContext = {},
): Promise<Response | undefined> {
  // Layer 1, unchanged and always on: the bot block.
  const ua = request.headers.get('user-agent') ?? '';
  if (BLOCKED_BOT_PATTERN.test(ua)) {
    return new Response(
      'Forbidden: automated training and AI-search crawlers are not permitted on this site.',
      {
        status: 403,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      },
    );
  }

  // Layer 2: the identity gate, DARK unless everything it needs is present.
  // GATE_IDENTITY unset, or the OAuth client missing, or the secret missing:
  // pass through exactly as this middleware always has. Never brick the wiki.
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID ?? '';
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? '';
  const secret = process.env.WIKI_GATE_SECRET ?? '';
  const gateOn = process.env.GATE_IDENTITY === '1' && Boolean(clientId && clientSecret && secret);
  if (!gateOn) return undefined;

  const url = new URL(request.url);
  const host = url.host;
  const origin = `${url.protocol}//${url.host}`;

  // The machine layer and link unfurlers stay open with the gate on.
  if (MACHINE_PATH_PATTERN.test(url.pathname)) return undefined;
  if (UNFURL_BOT_PATTERN.test(ua)) return undefined;

  const oauthEnv: OAuthEnv = { secret, origin, host, clientId, clientSecret };

  // The sign-in flow itself. Reachable logged-out by definition.
  if (url.pathname === '/auth' || url.pathname.startsWith('/auth/')) {
    return handleAuthRoute(request, url, oauthEnv, context);
  }

  // Layer 1.5, optional per wiki and off by default: the password handshake.
  const password = process.env.WIKI_PASSWORD ?? '';
  if (password) {
    if (request.method === 'POST') {
      const body = await request.text();
      const submitted = new URLSearchParams(body).get('password') ?? '';
      if (normalize(submitted) !== normalize(password)) {
        return htmlResponse(gatePage(host, true), 401);
      }
      return redirect(url.pathname + url.search, [
        `${COOKIE_NAME}=${await issueTicket(secret)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax; Secure; HttpOnly`,
      ]);
    }
    const hasTicket = await hasValidTicket(request, secret);
    if (!hasTicket) {
      // Prefilled links: `?key=<password>` lets a link we send land the
      // reader ON the page instead of in front of the door, then redirects to
      // the clean URL so the key never rides along into anything they share.
      const key = url.searchParams.get('key');
      if (key !== null && normalize(key) === normalize(password)) {
        const clean = new URL(url.toString());
        clean.searchParams.delete('key');
        return redirect(clean.pathname + (clean.search || '') + clean.hash, [
          `${COOKIE_NAME}=${await issueTicket(secret)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax; Secure; HttpOnly`,
        ]);
      }
      return htmlResponse(gatePage(host, false), 401);
    }
  }

  // The identity stage.
  const gateEnv: GateEnv = { secret, origin };
  const identity = await readIdentity(request, secret);
  const nextPath = url.pathname + url.search;

  if (!identity) return htmlResponse(identityPage(host, nextPath), 401);

  if (identity.st === 'none') {
    return redirect(`/auth/request?next=${encodeURIComponent(nextPath)}`);
  }

  if (identity.st === 'pending') {
    // A pending visitor re-checks on every page load, so approval takes
    // effect the moment they come back. An outage keeps them waiting rather
    // than letting them in.
    const fresh = await fetchMemberStatus(gateEnv, identity.e, identity.n);
    if (fresh === 'active') return stampAndGo(identity, 'active', nextPath, secret);
    if (fresh === 'revoked') return htmlResponse(lockedPage(host), 403);
    return htmlResponse(waitingPage(host, identity.e), 403);
  }

  const now = Math.floor(Date.now() / 1000);
  let refreshedCookie: string | undefined;
  let status: IdentityStatus = identity.st;

  if (now - identity.rv > REVALIDATE_SECONDS || identity.st === 'revoked') {
    const fresh = await fetchMemberStatus(gateEnv, identity.e, identity.n);
    if (fresh === null) {
      // The member store is unreachable. Wave the known visitor through on
      // the last known answer and retry soon; a revoked cookie stays revoked.
      if (identity.st !== 'revoked') {
        refreshedCookie = await issueIdentityCookie(
          { ...identity, rv: now - REVALIDATE_SECONDS + REVALIDATE_RETRY_SECONDS },
          secret,
        );
      }
    } else {
      status = fresh as IdentityStatus;
      refreshedCookie = await issueIdentityCookie({ ...identity, st: status, rv: now }, secret);
    }
  }

  if (status === 'revoked') {
    const headers: Record<string, string> = {};
    if (refreshedCookie) headers['set-cookie'] = refreshedCookie;
    return htmlResponse(lockedPage(host), 403, headers);
  }
  if (status === 'pending') {
    const headers: Record<string, string> = {};
    if (refreshedCookie) headers['set-cookie'] = refreshedCookie;
    return htmlResponse(waitingPage(host, identity.e), 403, headers);
  }
  if (status === 'none') {
    return redirect(`/auth/request?next=${encodeURIComponent(nextPath)}`, refreshedCookie ? [refreshedCookie] : []);
  }

  // Telemetry: gated HTML page views only. The matcher already keeps assets
  // and bundles out of here; the machine layer returned early above.
  if (request.method === 'GET') {
    trackVisit(gateEnv, context, identity.e, url.pathname, ua);
  }

  return passThrough([refreshedCookie, helloCookieIfNeeded(request, identity)]);
}

export const config = {
  // Run on HTML routes only. Skip static assets so we do not pay function
  // invocations on every CSS, JS, image, or font fetch.
  //
  // `skills/` and `generators/` are intentionally excluded too: this wiki hosts
  // canonical agent SKILL.md and GENERATE.md files under static/skills/<name>/SKILL.md
  // and static/generators/<name>/GENERATE.md, served openly so agents (including
  // blocked-UA crawlers) can fetch and run them while the rest of the wiki stays
  // sealed. Without this, an agent told to fetch a hosted recipe gets a 403 and
  // the recipe is undeliverable, which is exactly what happened before 2026-07-29.
  // Note the `.md` extension is NOT in the asset list below, so these paths would
  // otherwise be matched and blocked. Do not remove these two exclusions.
  matcher: [
    '/((?!assets/|img/|skills/|generators/|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\.(?:js|css|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|map|json|xml)$).*)',
  ],
  runtime: 'edge',
};
