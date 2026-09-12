// The pure transforms that turn one built page into its chrome-less mirror. Kept apart from
// the plugin so they run under `node --test` with no Docusaurus, and so the middleware's
// contract ("the mirror is static, scriptless HTML with no way out") is asserted rather than
// assumed.
//
// A shared page is a LETTER, not a door. The reader was sent one page. So:
//   - no navbar, sidebar, table of contents, breadcrumbs, prev/next, site footer (CSS);
//   - no <script> at all, so nothing hydrates: the client router would paint "Page Not Found"
//     over a page served by rewrite, and Docusaurus chunks embed OTHER pages' content;
//   - no internal links: each one would bounce the reader off the password door and leak the
//     titles of pages they were not sent. Prose links unwrap to their text; the trailing
//     navigation sections (Further Reading, Related, In this section, See also) go entirely,
//     because a list of dead titles reads worse than no list;
//   - one deliberate line at the bottom naming where the page came from.
//
// The production HTML is MINIFIED: attribute quotes are dropped when the value has no spaces
// (href=/concepts/x) and optional closing tags (</p>, </li>) are omitted. Every pattern below
// tolerates both the pretty and the minified form.

export const CHROME_HIDING_CSS = [
  'nav.navbar, .theme-doc-sidebar-container, .theme-doc-toc-desktop,',
  '.theme-doc-toc-mobile, .theme-doc-breadcrumbs, .breadcrumbs,',
  '.pagination-nav, footer.footer, .theme-edit-this-page, .theme-doc-footer,',
  '.theme-doc-version-badge, .theme-last-updated, .doc-meta-slot { display: none !important; }',
  // With the columns hidden, cap and center the reading column. There is no <main> element in
  // this theme's markup (the wrapper is div.main-wrapper), so selectors scoped under `main`
  // silently match nothing; scope to real classes.
  "[class*='docItemCol'] { max-width: 100% !important; flex: 0 0 100% !important; }",
  // The desktop TOC is hidden above, but it lives INSIDE a col--3 wrapper that still occupies
  // the right quarter of the row; drop the wrapper and center what remains.
  '.main-wrapper .row > .col.col--3 { display: none !important; }',
  '.main-wrapper .row { justify-content: center; }',
  // The doc main container reserves the (hidden) sidebar's width via
  // max-width: calc(100% - var(--doc-sidebar-width)), which off-centers everything.
  "[class*='docMainContainer'] { max-width: 100% !important; }",
  '.main-wrapper .container { max-width: 860px !important; padding-top: 2rem !important; }',
  // Bottom space is PADDING, not margin: the margin of the last element before </body>
  // collapses out of the body, so the text sat on the page edge.
  '.share-view-footer { max-width: 480px; margin: 5rem auto 0; padding: 2rem 1rem 7rem; border-top: 1px solid var(--ifm-color-emphasis-300); text-align: center; font-size: 0.85rem; color: var(--ifm-color-emphasis-600); font-style: italic; }',
  '.share-view-footer a { color: var(--ifm-color-emphasis-700); text-decoration: underline; }',
].join('\n');

export const STYLE_TAG = `<style data-share-view>${CHROME_HIDING_CSS}</style>`;

// Headings that introduce navigation rather than content. Matched on the heading's id, which
// Docusaurus derives from the text, so "Further Reading", "Further reading" and "## Further
// Reading {#further-reading}" all land here.
const NAV_HEADING_IDS = /^(further-reading|related|related-pages|in-this-section|see-also|read-next|next-steps)$/i;

/** Every <script> gone, and every hint to preload one. Inline and external alike. */
export function stripScripts(html: string): string {
  let out = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<link\b[^>]*\brel=["']?(?:preload|modulepreload|prefetch)["']?[^>]*>/gi, (tag) =>
    /\bas=["']?script["']?/i.test(tag) || /modulepreload/i.test(tag) || /\.js["'\s>]/i.test(tag) ? '' : tag,
  );
  return out;
}

/** The trailing navigation sections removed whole: from their heading to the next heading,
 *  the next block-level close, or the end of the article, whichever comes first. */
export function stripNavSections(html: string): string {
  const heading = /<h([2-6])\b[^>]*\bid=["']?([A-Za-z0-9_-]+)["']?[^>]*>/g;
  let out = '';
  let cursor = 0;
  let m: RegExpExecArray | null;
  while ((m = heading.exec(html)) !== null) {
    if (!NAV_HEADING_IDS.test(m[2])) continue;
    const start = m.index;
    // The section ends where the next thing that is not this list begins.
    const after = html.slice(start + m[0].length);
    const stops = [/<h[1-6]\b/i, /<\/div>/i, /<\/article>/i, /<footer\b/i]
      .map((re) => { const s = re.exec(after); return s ? s.index : -1; })
      .filter((i) => i >= 0);
    const end = stops.length ? start + m[0].length + Math.min(...stops) : html.length;
    out += html.slice(cursor, start);
    cursor = end;
    heading.lastIndex = end;
  }
  return out + html.slice(cursor);
}

/** Internal anchors unwrapped to their text, heading permalinks and bracketed pointers gone.
 *  External links to the public web survive. */
export function stripCrossLinks(html: string): string {
  let out = html;
  // 1. The trailing "Related: ..." paragraph (its </p> may be omitted).
  out = out.replace(/<p><em>Related:[\s\S]*?<\/em>(<\/p>)?/g, '');
  // 2. Heading anchor permalinks (the # hash-links).
  out = out.replace(/<a[^>]*hash-link[^>]*>[\s\S]*?<\/a>/g, '');
  // 3. Unwrap every internal anchor (site-absolute href, quoted or not) to its inner text.
  //    Anchors do not nest, so non-greedy to the closing tag is sound.
  out = out.replace(/<a\s[^>]*href=(?:"\/[^"]*"|'\/[^']*'|\/[^\s>]*)[^>]*>([\s\S]*?)<\/a>/g, '$1');
  // 4. Bracketed pointer sentences, now linkless: <em>[See: ...]</em> and kin. Only ems that
  //    are entirely one bracketed aside are removed.
  out = out.replace(/\s*<em>\[[^<>]*\]<\/em>/g, '');
  return out;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** The one line a shared page carries about where it came from. Injected AFTER
 *  stripCrossLinks so its link to the front door is the only internal link that survives. */
export function withShareFooter(html: string, siteTitle: string): string {
  if (!html.includes('</body>')) return html;
  const footer =
    `<footer class="share-view-footer">One page from <a href="/">${escapeHtml(siteTitle)}</a>, sent to you on purpose.</footer>`;
  return html.replace('</body>', `${footer}</body>`);
}

/** The whole transform, in the order the pieces depend on. */
export function focusPage(html: string, siteTitle: string): string | null {
  if (!html.includes('</head>')) return null;
  let out = html.replace('</head>', `${STYLE_TAG}</head>`);
  out = stripScripts(out);
  out = stripNavSections(out);
  out = stripCrossLinks(out);
  out = withShareFooter(out, siteTitle);
  return out;
}
