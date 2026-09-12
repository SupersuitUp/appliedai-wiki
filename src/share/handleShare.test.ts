// The middleware layer's decisions, with no network and no host gate.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleShare } from './handleShare';
import { sharePath } from './signedRoute';

const SECRET = 's3';
const ORIGIN = 'https://example.wiki';
const req = (path: string, o: Partial<{ authorized: boolean; secret: string; gated: boolean }> = {}) =>
  handleShare({ url: new URL(path, ORIGIN), authorized: false, secret: SECRET, gated: true, ...o });

test('mint: an authorized reader on a gated wiki gets the focused link', async () => {
  const r = (await req('/s/mint?path=/concepts/x', { authorized: true }))!;
  assert.equal(r.status, 200);
  const body = await r.json();
  assert.equal(body.focused, true);
  assert.equal(body.url, ORIGIN + (await sharePath(SECRET, '/concepts/x')));
});

test('mint: nobody else gets one', async () => {
  const r = (await req('/s/mint?path=/concepts/x'))!;
  assert.equal(r.status, 401);
});

test('mint: an open wiki answers with the page itself, since it is already open', async () => {
  const r = (await req('/s/mint?path=/concepts/x', { authorized: true, gated: false }))!;
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { url: `${ORIGIN}/concepts/x`, focused: false });
});

test('mint: no secret means sharing is off, said plainly', async () => {
  const r = (await req('/s/mint?path=/concepts/x', { authorized: true, secret: '' }))!;
  assert.equal(r.status, 503);
});

test('mint: a bad path is refused before authorization is even considered', async () => {
  assert.equal((await req('/s/mint?path=concepts/x', { authorized: true }))!.status, 400);
  assert.equal((await req('/s/mint', { authorized: true }))!.status, 400);
  assert.equal((await req('/s/mint?path=/s/abc', { authorized: true }))!.status, 400);
});

test('a genuine address and an anonymous visitor: the chrome-less mirror, by rewrite', async () => {
  const p = (await sharePath(SECRET, '/concepts/x'))!;
  const r = (await req(p))!;
  assert.equal(r.headers.get('x-middleware-rewrite'), `${ORIGIN}/share-view/concepts/x/`);
  assert.equal(r.headers.get('x-robots-tag'), 'noindex, nofollow');
});

test('a genuine address and an authorized visitor: the canonical page, by redirect', async () => {
  const p = (await sharePath(SECRET, '/concepts/x'))!;
  const r = (await req(p, { authorized: true }))!;
  assert.equal(r.status, 302);
  assert.equal(r.headers.get('location'), `${ORIGIN}/concepts/x`);
});

test('a genuine address on an open wiki redirects too: there is nothing to focus away from', async () => {
  const p = (await sharePath(SECRET, '/concepts/x'))!;
  const r = (await req(p, { gated: false }))!;
  assert.equal(r.status, 302);
});

test('a forged or unknown address is not this layer\'s to answer', async () => {
  const p = (await sharePath(SECRET, '/concepts/x'))!;
  assert.equal(await req(p.replace('/concepts/x', '/concepts/y')), undefined);
  assert.equal(await req('/s/aa3a052d187791dd'), undefined);
  assert.equal(await req('/concepts/x'), undefined);
  assert.equal(await req(p, { secret: '' }), undefined, 'with no secret nothing verifies');
});
