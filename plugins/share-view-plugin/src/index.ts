import path from 'path';
import fs from 'fs/promises';
import { glob } from 'glob';
import type { LoadContext, Plugin } from '@docusaurus/types';
import { focusPage } from './focus';

// ---------------------------------------------------------------------------
// Emits a CHROME-LESS mirror of every built page at /share-view/<route>/ for
// single-page sharing out of a gated wiki. The edge middleware rewrites a
// genuine /s/<sig>/<route> request here (src/share/handleShare.ts), so a share
// recipient reads ONE page as a dedicated, scriptless document: no navbar, no
// sidebar, no table of contents, no links into the rest of the wiki.
//
// The mirror is derived from the real built HTML at postBuild, so it cannot
// drift from the page. The transforms live in focus.ts and are tested on
// their own. On a wiki with no gate the mirror is emitted and never served:
// handleShare redirects every share address to the canonical page.
// ---------------------------------------------------------------------------

const SHARE_VIEW_DIR = 'share-view';

async function siteTitle(siteDir: string, fallback: string): Promise<string> {
  try {
    const raw = await fs.readFile(path.join(siteDir, 'wiki.config.json'), 'utf8');
    const title = JSON.parse(raw).title;
    if (typeof title === 'string' && title.trim()) return title.trim();
  } catch {
    // No wiki.config.json: the Docusaurus title is the next best name.
  }
  return fallback;
}

async function buildShareViews(outDir: string, title: string): Promise<number> {
  const pages = await glob('**/index.html', {
    cwd: outDir,
    nodir: true,
    ignore: [`${SHARE_VIEW_DIR}/**`, '404.html', 'search/**', 'login/**'],
  });
  let count = 0;
  for (const rel of pages) {
    const html = await fs.readFile(path.join(outDir, rel), 'utf8');
    const out = focusPage(html, title);
    if (out === null) continue;
    const dest = path.join(outDir, SHARE_VIEW_DIR, rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, out);
    count += 1;
  }
  return count;
}

export default function shareViewPlugin(context: LoadContext): Plugin<void> {
  return {
    name: 'share-view-plugin',
    async postBuild({ outDir }) {
      const title = await siteTitle(context.siteDir, context.siteConfig.title);
      const count = await buildShareViews(outDir, title);
      console.log(`[share-view] emitted ${count} chrome-less share pages under /${SHARE_VIEW_DIR}/`);
    },
  };
}
