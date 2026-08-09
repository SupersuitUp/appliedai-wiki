import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

// Every change to a doc is its own event, derived from git history:
// a "new" event when the file is first added, an "updated" event for every
// later commit that touches it, and a "removed" event when it is deleted.
// Both the Changelog page and the ChangelogWidget home-page widget render this
// same stream, so the widget is always exactly the top N of the changelog.
export type ChangeType = 'new' | 'updated' | 'removed';

export interface ChangeEvent {
  id: string; // unique React key: docKey@commitHash
  type: ChangeType;
  date: string; // ISO8601 commit date
  docKey: string; // path-based key without extension, e.g. "concepts/favor"
  routePath: string; // public URL with leading slash; empty for removed pages
  section: string; // top-level folder, e.g. "concepts"
  title: string;
  description?: string;
}

// Meta pages and section indexes are not content entries; keep them out of
// the changelog so it does not list itself or the how-to page.
const EXCLUDED_LEAF_KEYS = new Set([
  'index',
  'intro',
  'changelog',
  'how-to-update',
]);
function isExcluded(docKey: string): boolean {
  if (EXCLUDED_LEAF_KEYS.has(docKey)) return true;
  if (docKey.endsWith('/index')) return true;
  return false;
}

function parseFrontmatter(content: string): {
  title?: string;
  description?: string;
  slug?: string;
  sidebarLabel?: string;
  draft?: boolean;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = match[1];
  const titleMatch = fm.match(/title:\s*"?([^"\n]+?)"?\s*$/m);
  const descMatch = fm.match(/description:\s*"((?:[^"\\]|\\.)*)"/);
  const slugMatch = fm.match(/slug:\s*"?([^"\n]+?)"?\s*$/m);
  const labelMatch = fm.match(/sidebar_label:\s*"?([^"\n]+?)"?\s*$/m);
  const draftMatch = fm.match(/^draft:\s*true\s*$/m);
  return {
    title: titleMatch
      ? titleMatch[1].trim().replace(/^"/, '').replace(/"$/, '')
      : undefined,
    description: descMatch ? descMatch[1].trim().replace(/\\"/g, '"') : undefined,
    slug: slugMatch
      ? slugMatch[1].trim().replace(/^"/, '').replace(/"$/, '')
      : undefined,
    sidebarLabel: labelMatch
      ? labelMatch[1].trim().replace(/^"/, '').replace(/"$/, '')
      : undefined,
    draft: draftMatch ? true : undefined,
  };
}

function titleize(docKey: string): string {
  return (docKey.split('/').pop() || docKey)
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Some wikis title pages by H1 rather than a `title:` frontmatter field, so the
// H1 is used as the display title when frontmatter has none. Falls back to
// sidebar_label, then to a titleized filename.
function displayTitle(content: string, docKey: string): string {
  const fm = parseFrontmatter(content);
  if (fm.title) return fm.title;
  const body = content.replace(/^---\n[\s\S]*?\n---/, '');
  const h1 = body.match(/^#\s+(.+?)\s*$/m);
  if (h1) return h1[1].trim();
  if (fm.sidebarLabel) return fm.sidebarLabel;
  return titleize(docKey);
}

const stripNumberPrefix = (s: string) => s.replace(/^\d+-(?!\d)/, '');

// `git log --name-status` prints paths relative to the REPO ROOT, not to the
// cwd it was run from. When the Docusaurus site is a subdirectory of the repo
// (e.g. the site in `wiki/`), those paths arrive as `wiki/docs/...`, so the
// site's own prefix has to come off before the `docs/` check. sitePrefix is ''
// when the site is the repo root, which makes this a no-op there.
function docKeyFromRepoPath(
  repoRelPath: string,
  sitePrefix: string,
): string | null {
  if (sitePrefix && !repoRelPath.startsWith(sitePrefix)) return null;
  const fromSite = sitePrefix
    ? repoRelPath.slice(sitePrefix.length)
    : repoRelPath;
  if (!fromSite.startsWith('docs/')) return null;
  const rel = fromSite.slice('docs/'.length);
  if (!/\.mdx?$/.test(rel)) return null;
  return rel.replace(/\.mdx?$/, '');
}

function routePathFor(slug: string | undefined, docKey: string): string {
  if (slug) return slug.startsWith('/') ? slug : `/${slug}`;
  const cleaned = docKey.split('/').map(stripNumberPrefix).join('/');
  return `/${cleaned}`;
}

/**
 * Read every change event visible in whatever git history this checkout has.
 *
 * On a full clone (a laptop) that is the complete history. On Vercel it is only
 * the handful of commits their shallow clone carries, which is why the plugin
 * merges this with the committed snapshot rather than trusting it alone.
 */
export function collectChangeEvents(siteDir: string): ChangeEvent[] {
  const docsDir = path.join(siteDir, 'docs');
  if (!fs.existsSync(docsDir)) return [];

  // Metadata for files that still exist, read from the working tree.
  const currentMeta = new Map<
    string,
    { title: string; description?: string; routePath: string }
  >();
  // Draft pages are excluded from the production build, so they are excluded
  // from the changelog too. Every event for a drafted docKey is skipped below,
  // including its historical "new"/"updated" rows, so flipping a page to draft
  // removes it from the changelog entirely rather than surfacing an "updated"
  // (or, if deleted, "removed") event.
  const draftKeys = new Set<string>();
  // A page that moved folders (e.g. foundations/ -> perspectives/) has history
  // under its OLD docKey too. The filename basename is stable across such
  // moves, so also skip events whose leaf matches a drafted page's leaf.
  // ('index' is already excluded, so never key on it.)
  const draftLeafKeys = new Set<string>();
  const draftLeaf = (docKey: string): string | undefined =>
    docKey.split('/').pop()?.replace(/^_/, '');

  const walk = (dir: string, base = '') => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = base ? `${base}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(full, rel);
      } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
        const docKey = rel.replace(/\.mdx?$/, '');
        const raw = fs.readFileSync(full, 'utf-8');
        const fm = parseFrontmatter(raw);
        if (fm.draft) {
          draftKeys.add(docKey);
          // Strip a leading "_": a hidden page is often also renamed with an
          // underscore prefix (Docusaurus ignores `_*` files) while its git
          // history sits under the un-prefixed name. Key on the bare basename
          // so both resolve to the same leaf.
          const leaf = draftLeaf(docKey);
          if (leaf && leaf !== 'index') draftLeafKeys.add(leaf);
          continue;
        }
        currentMeta.set(docKey, {
          title: displayTitle(raw, docKey),
          description: fm.description,
          routePath: routePathFor(fm.slug, docKey),
        });
      }
    }
  };
  walk(docsDir);

  // Path from the repo root to this site, e.g. "wiki/" here and "" when the
  // site IS the repo root. Used to normalize the repo-root-relative paths
  // that `git log --name-status` emits.
  let sitePrefix = '';
  try {
    sitePrefix = execSync('git rev-parse --show-prefix', {
      cwd: siteDir,
      encoding: 'utf-8',
    }).trim();
  } catch {
    sitePrefix = '';
  }

  // Git history of docs/ as a status stream. -M detects renames so a move
  // shows as one "updated" row instead of a spurious remove + add.
  let raw = '';
  try {
    raw = execSync(
      `git log -M --diff-filter=ADMR --name-status --format='__C__%x09%aI%x09%H' -- docs/`,
      { cwd: siteDir, encoding: 'utf-8', maxBuffer: 128 * 1024 * 1024 },
    );
  } catch {
    return [];
  }

  // A page hidden with a leading "_" (on the file or on a parent folder) is
  // excluded from the build by Docusaurus, so its history must stay out of the
  // changelog. The draft-frontmatter pass above cannot do that job alone,
  // because it reads the WORKING TREE: once a hidden page is deleted outright
  // there is no `draft: true` left to find, and every historical row for it
  // resurfaces, plus a fresh "removed" event. Deleting a hidden page would then
  // publish the very titles the underscore was hiding.
  //
  // So derive the suppression from the PATHS in history instead, which survive
  // the file. Any path that ever carried a "_" segment is hidden forever, under
  // its underscored key, its bare key, and its leaf (for folder moves).
  const hiddenDocKeys = new Set<string>();
  const bareKey = (docKey: string) =>
    docKey
      .split('/')
      .map((seg) => seg.replace(/^_/, ''))
      .join('/');
  for (const line of raw.split('\n')) {
    if (line.startsWith('__C__\t') || !line.trim()) continue;
    for (const col of line.split('\t').slice(1)) {
      if (!/\.mdx?$/.test(col) || !col.split('/').some((s) => s.startsWith('_'))) continue;
      const docKey = docKeyFromRepoPath(col, sitePrefix);
      if (!docKey) continue;
      hiddenDocKeys.add(bareKey(docKey));
      const leaf = draftLeaf(docKey);
      if (leaf && leaf !== 'index') draftLeafKeys.add(leaf);
    }
  }

  // Recover frontmatter for a path that no longer exists in the tree from
  // a specific commit (the deletion's parent, or the add/edit commit).
  const recoveredCache = new Map<string, { title: string; description?: string }>();
  const recoverAt = (
    repoRelPath: string,
    ref: string,
    docKey: string,
  ): { title: string; description?: string } => {
    const cacheKey = `${docKey}@${ref}`;
    const hit = recoveredCache.get(cacheKey);
    if (hit) return hit;
    let meta: { title: string; description?: string } = {
      title: titleize(docKey),
      description: undefined,
    };
    try {
      const content = execSync(`git show ${ref}:"${repoRelPath}"`, {
        cwd: siteDir,
        encoding: 'utf-8',
        maxBuffer: 32 * 1024 * 1024,
      });
      const fm = parseFrontmatter(content);
      meta = { title: displayTitle(content, docKey), description: fm.description };
    } catch {
      // keep fallback
    }
    recoveredCache.set(cacheKey, meta);
    return meta;
  };

  const boundaryCommits = shallowBoundaryCommits(siteDir);

  const events: ChangeEvent[] = [];
  let curDate = '';
  let curHash = '';
  for (const line of raw.split('\n')) {
    if (line.startsWith('__C__\t')) {
      const parts = line.split('\t');
      curDate = parts[1] || '';
      curHash = parts[2] || '';
      continue;
    }
    if (!line.trim() || !curDate) continue;
    if (boundaryCommits.has(curHash)) continue;

    const cols = line.split('\t');
    const status = cols[0];
    let repoRelPath: string;
    let type: ChangeType;
    if (status.startsWith('R')) {
      repoRelPath = cols[2]; // new path
      type = 'updated';
    } else if (status === 'A') {
      repoRelPath = cols[1];
      type = 'new';
    } else if (status === 'M') {
      repoRelPath = cols[1];
      type = 'updated';
    } else if (status === 'D') {
      repoRelPath = cols[1];
      type = 'removed';
    } else {
      continue;
    }

    const docKey = docKeyFromRepoPath(repoRelPath, sitePrefix);
    if (!docKey || isExcluded(docKey)) continue;
    // A page currently marked draft is invisible everywhere, including here:
    // drop all of its history, including events recorded under an older path
    // it has since moved away from.
    if (draftKeys.has(docKey)) continue;
    // Hidden by a "_" on the file or a parent folder, at any point in history.
    // Keyed on the path, so it still holds after the page is deleted.
    if (hiddenDocKeys.has(bareKey(docKey))) continue;
    const movedLeaf = draftLeaf(docKey);
    if (movedLeaf && draftLeafKeys.has(movedLeaf)) continue;
    const section = docKey.split('/')[0];

    if (type === 'removed') {
      // A move shows D(old)+A(new) only without -M; with -M real deletes are
      // D. Guard anyway: skip if a live file still owns this docKey.
      if (currentMeta.has(docKey)) continue;
      const meta = recoverAt(repoRelPath, `${curHash}^`, docKey);
      events.push({
        id: `${docKey}@${curHash}`,
        type,
        date: curDate,
        docKey,
        routePath: '',
        section,
        title: meta.title,
        description: meta.description,
      });
    } else {
      const live = currentMeta.get(docKey);
      const meta = live ?? recoverAt(repoRelPath, curHash, docKey);
      events.push({
        id: `${docKey}@${curHash}`,
        type,
        date: curDate,
        docKey,
        routePath: live ? live.routePath : '',
        section,
        title: meta.title,
        description: meta.description,
      });
    }
  }

  return sortNewestFirst(events);
}

export function sortNewestFirst(events: ChangeEvent[]): ChangeEvent[] {
  return [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * The commits where a shallow clone's history is cut off, from `.git/shallow`.
 *
 * Git presents such a commit as if it were a root commit, so `--name-status`
 * reports every file that merely EXISTED at that point as freshly added. Taken
 * at face value that invents a "New" event for most of the wiki, dated whenever
 * the clone's window happens to start. Events from these commits are dropped;
 * the committed snapshot is what actually covers that far back.
 */
function shallowBoundaryCommits(siteDir: string): Set<string> {
  if (!isShallowClone(siteDir)) return new Set();
  try {
    const gitPath = execSync('git rev-parse --git-path shallow', {
      cwd: siteDir,
      encoding: 'utf-8',
    }).trim();
    const abs = path.isAbsolute(gitPath) ? gitPath : path.join(siteDir, gitPath);
    if (!fs.existsSync(abs)) return new Set();
    return new Set(
      fs
        .readFileSync(abs, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    );
  } catch {
    return new Set();
  }
}

/** True when this checkout only has part of the history (Vercel's clone). */
export function isShallowClone(siteDir: string): boolean {
  try {
    return (
      execSync('git rev-parse --is-shallow-repository', {
        cwd: siteDir,
        encoding: 'utf-8',
      }).trim() === 'true'
    );
  } catch {
    return false;
  }
}
