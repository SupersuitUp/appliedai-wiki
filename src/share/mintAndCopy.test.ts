import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linkForPage, mintAndCopy } from './mintAndCopy';

const URL_ = 'https://example.wiki/s/AAAAAAAAAAAAAAAAAAAAAA/concepts/x';

class FakeClipboardItem { data: Record<string, unknown>; constructor(data: Record<string, unknown>) { this.data = data; } }

/** Stands in for iOS Safari: `write` is allowed only while the click's activation is live, and
 *  `writeText` always rejects because it runs after an await. */
function safariClipboard(state: { activationLive: boolean }) {
  const calls = { write: 0, writeText: 0 };
  return {
    calls,
    write: async (items: unknown[]) => {
      calls.write += 1;
      if (!state.activationLive) throw new Error('NotAllowedError');
      await (items[0] as FakeClipboardItem).data['text/plain'];
    },
    writeText: async () => { calls.writeText += 1; throw new Error('NotAllowedError: activation expired'); },
  };
}

test('copies on mobile Safari, where the write must start before the fetch', async () => {
  const state = { activationLive: true };
  const clipboard = safariClipboard(state);
  const res = await mintAndCopy({
    mint: async () => { state.activationLive = false; return URL_; },
    clipboard,
    ClipboardItemCtor: FakeClipboardItem as never,
  });
  assert.deepEqual(res, { url: URL_, copied: true });
  assert.equal(clipboard.calls.write, 1);
  assert.equal(clipboard.calls.writeText, 0, 'the eager path ran; the fallback was not needed');
});

test('falls back to writeText on an engine without promise-valued ClipboardItems', async () => {
  let written = '';
  const res = await mintAndCopy({
    mint: async () => URL_,
    clipboard: { writeText: async (t) => { written = t; } },
    ClipboardItemCtor: undefined,
  });
  assert.deepEqual(res, { url: URL_, copied: true });
  assert.equal(written, URL_);
});

test('a clipboard that refuses everything still yields the url, marked not copied', async () => {
  const res = await mintAndCopy({
    mint: async () => URL_,
    clipboard: { writeText: async () => { throw new Error('denied'); } },
    ClipboardItemCtor: undefined,
  });
  assert.deepEqual(res, { url: URL_, copied: false });
});

test('a mint failure propagates, and settles the pending clipboard promise rather than leaking it', async () => {
  const clipboard = safariClipboard({ activationLive: true });
  await assert.rejects(
    mintAndCopy({ mint: async () => { throw new Error('offline'); }, clipboard, ClipboardItemCtor: FakeClipboardItem as never }),
    /offline/,
  );
});

test('linkForPage takes the focused link when the edge mints one', async () => {
  const fetchImpl = async (input: string) => {
    assert.equal(input, '/s/mint?path=%2Fconcepts%2Fx');
    return new Response(JSON.stringify({ url: URL_, focused: true }), { status: 200 });
  };
  assert.deepEqual(await linkForPage('https://example.wiki/concepts/x?key=pw#h', fetchImpl), { url: URL_, focused: true });
});

test('linkForPage falls back to the clean page url when there is no mint endpoint, a refusal, or garbage', async () => {
  const fallback = { url: 'https://example.wiki/concepts/x', focused: false };
  assert.deepEqual(await linkForPage('https://example.wiki/concepts/x', async () => new Response('<html>', { status: 404 })), fallback);
  assert.deepEqual(await linkForPage('https://example.wiki/concepts/x', async () => new Response('{}', { status: 401 })), fallback);
  assert.deepEqual(await linkForPage('https://example.wiki/concepts/x', async () => new Response('not json', { status: 200 })), fallback);
  assert.deepEqual(await linkForPage('https://example.wiki/concepts/x', async () => { throw new Error('offline'); }), fallback);
  assert.deepEqual(await linkForPage('https://example.wiki/concepts/x', async () => new Response(JSON.stringify({ url: 'javascript:alert(1)' }), { status: 200 })), fallback);
});
