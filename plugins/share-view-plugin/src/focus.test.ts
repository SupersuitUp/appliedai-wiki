// The mirror's contract, asserted: static, scriptless, no way out, one line home.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { focusPage, stripCrossLinks, stripNavSections, stripScripts, withShareFooter } from './focus';

test('every script is gone, inline and external, so nothing hydrates', () => {
  const html = '<head><script>window.x=1</script><link rel="preload" href="/assets/js/a.js" as="script"><link rel="stylesheet" href="/assets/css/a.css"></head><body><p>hi</p><script src="/assets/js/runtime~main.js" defer></script></body>';
  const out = stripScripts(html);
  assert.ok(!/<script/i.test(out));
  assert.ok(!out.includes('/assets/js/'));
  assert.ok(out.includes('/assets/css/a.css'), 'stylesheets survive');
});

test('the Further Reading section goes whole, list included, and the prose before it stays', () => {
  const html = '<div class="markdown"><p>Body.</p><h2 class="anchor" id="further-reading">Further Reading<a href="#further-reading" class="hash-link">#</a></h2><ul><li><a href="/a">A</a> — one</li><li><a href="/b">B</a> — two</li></ul></div><footer class="theme-doc-footer"></footer>';
  const out = stripNavSections(html);
  assert.ok(!out.includes('Further Reading'));
  assert.ok(!out.includes('href="/a"'));
  assert.ok(out.includes('<p>Body.</p>'));
  assert.ok(out.includes('</div><footer'), 'the markdown wrapper still closes');
});

test('a nav section followed by another heading stops at that heading', () => {
  const html = '<h2 id="in-this-section">In this section</h2><ul><li>x</li></ul><h2 id="real">Real</h2><p>kept</p>';
  const out = stripNavSections(html);
  assert.equal(out, '<h2 id="real">Real</h2><p>kept</p>');
});

test('minified heading ids without quotes are recognised', () => {
  const html = '<p>a</p><h2 class=anchor id=further-reading>Further Reading</h2><ul><li>b</li></ul></div>';
  assert.equal(stripNavSections(html), '<p>a</p></div>');
});

test('a content heading is left alone', () => {
  const html = '<h2 id="the-short-version">The short version</h2><p>keep</p>';
  assert.equal(stripNavSections(html), html);
});

test('internal links unwrap to their text; external links survive', () => {
  assert.equal(
    stripCrossLinks('<p>walk the <a href="/concepts/the-golden-path" class="x">Golden Path</a> daily</p>'),
    '<p>walk the Golden Path daily</p>',
  );
  const ext = '<p>see <a href="https://example.com/voice.md">the spec</a></p>';
  assert.equal(stripCrossLinks(ext), ext);
});

test('minified unquoted internal hrefs unwrap too', () => {
  assert.equal(
    stripCrossLinks('<p>walk the <a class="" href=/concepts/the-golden-path>Golden Path</a> daily</p>'),
    '<p>walk the Golden Path daily</p>',
  );
});

test('heading permalinks and bracketed pointers go', () => {
  assert.equal(stripCrossLinks('<h2>Title<a class="hash-link" href="#title">#</a></h2>'), '<h2>Title</h2>');
  assert.equal(
    stripCrossLinks('<p>Receptivity grows. <em>[See: <a href="/p/x">X</a>.]</em></p>'),
    '<p>Receptivity grows.</p>',
  );
});

test('the footer names the wiki, links only home, and is the last internal link standing', () => {
  const out = withShareFooter('<body><p>piece</p></body>', 'Real Life & Co');
  assert.ok(out.includes('One page from <a href="/">Real Life &amp; Co</a>'));
  assert.ok(out.indexOf('share-view-footer') < out.indexOf('</body>'));
});

test('focusPage does the whole thing in order and refuses a page with no head', () => {
  assert.equal(focusPage('<p>no head</p>', 'W'), null);
  const html = '<html><head><title>t</title><script>1</script></head><body><nav class="navbar"></nav><article><h1>T<a class="hash-link" href="#t">#</a></h1><p>See <a href="/x">X</a>.</p><h2 id="further-reading">Further Reading</h2><ul><li><a href="/y">Y</a></li></ul></article><script src="/assets/js/main.js"></script></body></html>';
  const out = focusPage(html, 'Wiki')!;
  assert.ok(out.includes('data-share-view'));
  assert.ok(!/<script/.test(out));
  assert.ok(!out.includes('Further Reading'));
  assert.ok(out.includes('<p>See X.</p>'));
  assert.ok(out.includes('<a href="/">Wiki</a>'));
  const internal = out.match(/<a\s[^>]*href=["']?\/[^"'\s>]*/g) ?? [];
  assert.deepEqual(internal, ['<a href="/'], 'the footer is the only internal link');
});
