import type { Plugin, LoadContext, PluginOptions } from '@docusaurus/types';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

// Every change to a doc is its own event, derived from git history:
// a "new" event when the file is first added, an "updated" event for every
// later commit that touches it, and a "removed" event when it is deleted.
// Both the Changelog page and the RecentlyAdded home-page widget render this
// same stream, so the widget is always exactly the top N of the changelog.
type ChangeType = 'new' | 'updated' | 'removed';

interface ChangeEvent {
  id: string; // unique React key: docKey@commitHash
  type: ChangeType;
  date: string; // ISO8601 commit date
  docKey: string; // path-based key without extension, e.g. "learning/mentors"
  routePath: string; // public URL with leading slash; empty for removed pages
  section: string; // top-level folder, e.g. "learning"
  title: string;
  description?: string;
}

interface CreationDatePluginContent {
  changeEvents: ChangeEvent[];
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
} {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = match[1];
  const titleMatch = fm.match(/title:\s*"?([^"\n]+?)"?\s*$/m);
  const descMatch = fm.match(/description:\s*"((?:[^"\\]|\\.)*)"/);
  const slugMatch = fm.match(/slug:\s*"?([^"\n]+?)"?\s*$/m);
  return {
    title: titleMatch
      ? titleMatch[1].trim().replace(/^"/, '').replace(/"$/, '')
      : undefined,
    description: descMatch ? descMatch[1].trim().replace(/\\"/g, '"') : undefined,
    slug: slugMatch
      ? slugMatch[1].trim().replace(/^"/, '').replace(/"$/, '')
      : undefined,
  };
}

function titleize(docKey: string): string {
  return (docKey.split('/').pop() || docKey)
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const stripNumberPrefix = (s: string) => s.replace(/^\d+-(?!\d)/, '');

function docKeyFromRepoPath(repoRelPath: string): string | null {
  if (!repoRelPath.startsWith('docs/')) return null;
  const rel = repoRelPath.slice('docs/'.length);
  if (!/\.mdx?$/.test(rel)) return null;
  return rel.replace(/\.mdx?$/, '');
}

function routePathFor(slug: string | undefined, docKey: string): string {
  if (slug) return slug.startsWith('/') ? slug : `/${slug}`;
  const cleaned = docKey.split('/').map(stripNumberPrefix).join('/');
  return `/${cleaned}`;
}

export default function creationDatePlugin(
  context: LoadContext,
  _options: PluginOptions,
): Plugin<CreationDatePluginContent> {
  return {
    name: 'creation-date-plugin',

    async loadContent() {
      const siteDir = context.siteDir;
      const docsDir = path.join(siteDir, 'docs');
      if (!fs.existsSync(docsDir)) return { changeEvents: [] };

      // Metadata for files that still exist, read from the working tree.
      const currentMeta = new Map<
        string,
        { title: string; description?: string; routePath: string }
      >();
      const walk = (dir: string, base = '') => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name);
          const rel = base ? `${base}/${entry.name}` : entry.name;
          if (entry.isDirectory()) {
            walk(full, rel);
          } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
            const docKey = rel.replace(/\.mdx?$/, '');
            const fm = parseFrontmatter(fs.readFileSync(full, 'utf-8'));
            currentMeta.set(docKey, {
              title: fm.title || titleize(docKey),
              description: fm.description,
              routePath: routePathFor(fm.slug, docKey),
            });
          }
        }
      };
      walk(docsDir);

      // Full git history of docs/ as a status stream. -M detects renames so a
      // move shows as one "updated" row instead of a spurious remove + add.
      let raw = '';
      try {
        raw = execSync(
          `git log -M --diff-filter=ADMR --name-status --format='__C__%x09%aI%x09%H' -- docs/`,
          { cwd: siteDir, encoding: 'utf-8', maxBuffer: 128 * 1024 * 1024 },
        );
      } catch {
        return { changeEvents: [] };
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
          meta = { title: fm.title || titleize(docKey), description: fm.description };
        } catch {
          // keep fallback
        }
        recoveredCache.set(cacheKey, meta);
        return meta;
      };

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

        const docKey = docKeyFromRepoPath(repoRelPath);
        if (!docKey || isExcluded(docKey)) continue;
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

      events.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      return { changeEvents: events };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
}
