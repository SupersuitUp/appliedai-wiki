// ONE PAGE, SENT ON PURPOSE: the address space for sharing a single page out of a gated wiki.
//
// A gated wiki has one door, the password, and it opens the whole wiki. Sending someone a page
// used to mean sending them that door, which is the wrong size for the ask twice over: it gives
// a reader the run of a private site when they were sent one article, and the article arrives
// wrapped in a sidebar, a navbar and a table of contents pointing at everything else. The
// share address below gives away exactly one page, chrome-less, and nothing beyond it.
//
//   /s/<sig>/<route>          e.g. /s/Q2h1cmNoT2ZUaGVSZWFsTGlmZQ/purpose-of-life/enjoy-the-whole-ride
//
// `sig` is an HMAC over the route, keyed by a secret only the edge holds, so the address is
// unguessable and the route is readable. It is DETERMINISTIC: one page has one share link,
// however many times it is minted, and there is nothing to store and nothing to commit. It
// does not expire; revocation is rotating the secret, which revokes every link at once. That
// trade is right for a soft gate whose password is itself meant to be handed around: a page
// link is strictly less access than the password, so it needs no shorter life than the
// password has.
//
// The middleware serves a valid address from the chrome-less mirror the share-view plugin
// emits at build time (/share-view/<route>/), by REWRITE, so the browser's URL stays /s/...
// and the real route stays gated. An authorized visitor is redirected to the canonical page
// instead: their JS loads, Docusaurus hydrates, and the client router has no /s/ route.
//
// Everything in this file is pure and runs on Web Crypto, so it works in the edge runtime, in
// the browser, and under `node --test` unchanged.

export const SHARE_PREFIX = '/s/';
export const MINT_PATH = '/s/mint';
export const SHARE_VIEW_PREFIX = '/share-view';

// 22 base64url characters carry 132 bits of the HMAC: unguessable, and short enough that the
// route still reads in a text message.
const SIG_LENGTH = 22;
const SIG_PATTERN = /^[A-Za-z0-9_-]{22}$/;
// Every share signature is domain-separated from anything else the same secret signs (a gate
// ticket, a session), so a stolen ticket is never a valid share address or the reverse.
const DOMAIN = 'wiki-share:v1:';

const encoder = new TextEncoder();

function base64url(bytes: ArrayBuffer): string {
  let binary = '';
  const view = new Uint8Array(bytes);
  for (let i = 0; i < view.length; i += 1) binary += String.fromCharCode(view[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** A site-absolute route with one leading slash, no trailing slash (except the root), no query,
 *  no fragment. The same page always normalizes to the same string, which is what makes the
 *  signature deterministic. Returns null for anything that is not a plain in-site route. */
export function canonicalRoute(input: string): string | null {
  if (typeof input !== 'string' || input === '') return null;
  let route = input;
  // A full URL is accepted and reduced to its path, so a caller can hand over location.href.
  if (/^https?:\/\//i.test(route)) {
    try { route = new URL(route).pathname; } catch { return null; }
  }
  route = route.split('#')[0].split('?')[0];
  if (!route.startsWith('/')) return null;
  if (route.includes('//') || route.includes('..')) return null;
  if (!/^[A-Za-z0-9\-._~/%]*$/.test(route)) return null;
  if (route.length > 1) route = route.replace(/\/+$/, '');
  // The share space and the mirror are addresses, never targets.
  if (route === '/s' || route.startsWith(SHARE_PREFIX) || route.startsWith(SHARE_VIEW_PREFIX)) return null;
  return route || '/';
}

/** The signature for one route under one secret. Empty secret: no signature, ever. */
export async function signRoute(secret: string, route: string): Promise<string | null> {
  if (!secret) return null;
  const canonical = canonicalRoute(route);
  if (canonical === null) return null;
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(DOMAIN + canonical));
  return base64url(mac).slice(0, SIG_LENGTH);
}

/** The share path for one route: /s/<sig>/<route>. Null when there is no secret or the route
 *  is not shareable. */
export async function sharePath(secret: string, route: string): Promise<string | null> {
  const canonical = canonicalRoute(route);
  if (canonical === null) return null;
  const sig = await signRoute(secret, canonical);
  if (!sig) return null;
  return canonical === '/' ? `${SHARE_PREFIX}${sig}` : `${SHARE_PREFIX}${sig}${canonical}`;
}

/** /s/<sig>/<route> -> { sig, route }, or null when the path is not shaped like a share. The
 *  shape check is deliberately strict: a 22-character signature segment and nothing else, so
 *  /s/mint and a committed short slug on a sibling wiki never parse as a signed address. */
export function parseSharePath(pathname: string): { sig: string; route: string } | null {
  if (!pathname.startsWith(SHARE_PREFIX)) return null;
  const rest = pathname.slice(SHARE_PREFIX.length);
  const slash = rest.indexOf('/');
  const sig = slash === -1 ? rest : rest.slice(0, slash);
  if (!SIG_PATTERN.test(sig)) return null;
  const route = canonicalRoute(slash === -1 ? '/' : rest.slice(slash));
  if (route === null) return null;
  return { sig, route };
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** The route a share path addresses, if its signature is genuine under this secret. */
export async function verifySharePath(secret: string, pathname: string): Promise<string | null> {
  const parsed = parseSharePath(pathname);
  if (!parsed || !secret) return null;
  const expected = await signRoute(secret, parsed.route);
  if (!expected || !constantTimeEqual(expected, parsed.sig)) return null;
  return parsed.route;
}

/** The static path that serves a route's chrome-less mirror.
 *
 *  The trailing slash is LOAD-BEARING: a platform rewrite resolves the exact static path with
 *  no clean-URL normalization, and Docusaurus emits <route>/index.html, so a slashless rewrite
 *  serves the 404 shell (found live on FaithWalk OS, 2026-08-09). */
export function shareViewPath(route: string): string {
  const canonical = canonicalRoute(route) ?? '/';
  return canonical === '/' ? `${SHARE_VIEW_PREFIX}/` : `${SHARE_VIEW_PREFIX}${canonical}/`;
}
