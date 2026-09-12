// The share address: deterministic, unguessable, readable, and never a door.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  canonicalRoute, parseSharePath, sharePath, shareViewPath, signRoute, verifySharePath,
} from './signedRoute';

const SECRET = 'a-secret-only-the-edge-holds';

test('canonicalRoute normalizes to one spelling and refuses what is not a page', () => {
  assert.equal(canonicalRoute('/concepts/x/'), '/concepts/x');
  assert.equal(canonicalRoute('/concepts/x?key=pw#top'), '/concepts/x');
  assert.equal(canonicalRoute('https://example.wiki/concepts/x/'), '/concepts/x');
  assert.equal(canonicalRoute('/'), '/');
  assert.equal(canonicalRoute(''), null);
  assert.equal(canonicalRoute('concepts/x'), null);
  assert.equal(canonicalRoute('/a//b'), null);
  assert.equal(canonicalRoute('/../etc'), null);
  assert.equal(canonicalRoute('/s/abc'), null, 'the share space is never a target');
  assert.equal(canonicalRoute('/share-view/x'), null, 'nor is the mirror');
  assert.equal(canonicalRoute('/x y'), null);
});

test('one page has one link: the signature is deterministic across spellings of the route', async () => {
  const a = await signRoute(SECRET, '/concepts/x');
  const b = await signRoute(SECRET, '/concepts/x/');
  const c = await signRoute(SECRET, 'https://example.wiki/concepts/x?key=pw');
  assert.equal(a, b);
  assert.equal(a, c);
  assert.match(a!, /^[A-Za-z0-9_-]{22}$/);
});

test('a different secret or a different route is a different signature', async () => {
  const a = await signRoute(SECRET, '/concepts/x');
  assert.notEqual(a, await signRoute(SECRET + '2', '/concepts/x'));
  assert.notEqual(a, await signRoute(SECRET, '/concepts/y'));
});

test('no secret, no signature, no link', async () => {
  assert.equal(await signRoute('', '/concepts/x'), null);
  assert.equal(await sharePath('', '/concepts/x'), null);
});

test('the share path reads as /s/<sig>/<route> and round-trips through verify', async () => {
  const p = (await sharePath(SECRET, '/purpose-of-life/enjoy-the-whole-ride'))!;
  assert.match(p, /^\/s\/[A-Za-z0-9_-]{22}\/purpose-of-life\/enjoy-the-whole-ride$/);
  assert.equal(await verifySharePath(SECRET, p), '/purpose-of-life/enjoy-the-whole-ride');
  assert.equal(await verifySharePath(SECRET, p + '/'), '/purpose-of-life/enjoy-the-whole-ride', 'trailing slash tolerated');
});

test('the root shares as /s/<sig> with nothing after it', async () => {
  const p = (await sharePath(SECRET, '/'))!;
  assert.match(p, /^\/s\/[A-Za-z0-9_-]{22}$/);
  assert.equal(await verifySharePath(SECRET, p), '/');
});

test('a tampered signature or route verifies to nothing', async () => {
  const p = (await sharePath(SECRET, '/concepts/x'))!;
  const flipped = p.replace(/^\/s\/(.)/, (_m, ch) => `/s/${ch === 'A' ? 'B' : 'A'}`);
  assert.equal(await verifySharePath(SECRET, flipped), null);
  assert.equal(await verifySharePath(SECRET, p.replace('/concepts/x', '/concepts/y')), null);
  assert.equal(await verifySharePath('wrong', p), null);
  assert.equal(await verifySharePath('', p), null);
});

test('parseSharePath is strict about the signature segment', () => {
  assert.equal(parseSharePath('/s/mint'), null, 'the mint endpoint is not a share');
  assert.equal(parseSharePath('/s/aa3a052d187791dd'), null, 'a committed 16-hex slug is not a signed address');
  assert.equal(parseSharePath('/concepts/x'), null);
  const sig = 'A'.repeat(22);
  assert.deepEqual(parseSharePath(`/s/${sig}/a/b/`), { sig, route: '/a/b' });
  assert.deepEqual(parseSharePath(`/s/${sig}`), { sig, route: '/' });
});

test('the mirror path carries the trailing slash the static host needs', () => {
  assert.equal(shareViewPath('/concepts/x'), '/share-view/concepts/x/');
  assert.equal(shareViewPath('/'), '/share-view/');
});
