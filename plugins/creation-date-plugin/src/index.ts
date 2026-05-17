import type { Plugin, LoadContext, PluginOptions } from '@docusaurus/types';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

interface RecentFile {
  docKey: string;          // path-based key without extension, e.g. "concepts/cut-and-supersuit"
  routePath: string;       // public URL path with leading slash, e.g. "/cut-and-supersuit"
  section: string;         // top-level folder, e.g. "concepts"
  title: string;
  description?: string;
  creationDate: string;    // first git commit date (ISO8601) or fallback
  lastModifiedDate: string; // last git commit date (ISO8601) or fallback
}

interface CreationDatePluginContent {
  recentFiles: RecentFile[];
}

function gitFirstCommitDate(filePath: string, siteDir: string): string | null {
  try {
    const result = execSync(
      `git log --follow --diff-filter=A --format=%aI -- "${filePath}" | tail -1`,
      { cwd: siteDir, encoding: 'utf-8', shell: '/bin/bash' as any }
    ).trim();
    return result || null;
  } catch {
    return null;
  }
}

function gitLastCommitDate(filePath: string, siteDir: string): string | null {
  try {
    const result = execSync(
      `git log --follow -1 --format=%aI -- "${filePath}"`,
      { cwd: siteDir, encoding: 'utf-8' }
    ).trim();
    return result || null;
  } catch {
    return null;
  }
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
    slug: slugMatch ? slugMatch[1].trim().replace(/^"/, '').replace(/"$/, '') : undefined,
  };
}

const EXCLUDED_LEAF_KEYS = new Set(['index', 'intro']);
function isExcluded(docKey: string): boolean {
  if (EXCLUDED_LEAF_KEYS.has(docKey)) return true;
  if (docKey.endsWith('/index')) return true;
  return false;
}

export default function creationDatePlugin(
  context: LoadContext,
  _options: PluginOptions,
): Plugin<CreationDatePluginContent> {
  return {
    name: 'creation-date-plugin',

    async loadContent() {
      const docsDir = path.join(context.siteDir, 'docs');
      if (!fs.existsSync(docsDir)) return { recentFiles: [] };

      const getAllMdFiles = (
        dir: string,
        basePath: string = '',
      ): Array<{ filePath: string; docKey: string }> => {
        const out: Array<{ filePath: string; docKey: string }> = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relPath = basePath ? `${basePath}/${entry.name}` : entry.name;
          if (entry.isDirectory()) {
            out.push(...getAllMdFiles(fullPath, relPath));
          } else if (
            entry.isFile() &&
            (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))
          ) {
            out.push({ filePath: fullPath, docKey: relPath.replace(/\.mdx?$/, '') });
          }
        }
        return out;
      };

      const all = getAllMdFiles(docsDir);
      const recentFiles: RecentFile[] = [];

      for (const { filePath, docKey } of all) {
        if (isExcluded(docKey)) continue;

        const created = gitFirstCommitDate(filePath, context.siteDir);
        const updated = gitLastCommitDate(filePath, context.siteDir);
        if (!created && !updated) continue;

        const content = fs.readFileSync(filePath, 'utf-8');
        const fm = parseFrontmatter(content);

        const section = docKey.split('/')[0];
        const fallbackTitle = (docKey.split('/').pop() || docKey)
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        const stripNumberPrefix = (s: string) => s.replace(/^\d+-/, '');
        const cleanedDocKey = docKey.split('/').map(stripNumberPrefix).join('/');

        recentFiles.push({
          docKey,
          routePath: fm.slug
            ? fm.slug.startsWith('/')
              ? fm.slug
              : `/${fm.slug}`
            : `/${cleanedDocKey}`,
          section,
          title: fm.title || fallbackTitle,
          description: fm.description,
          creationDate: created || updated!,
          lastModifiedDate: updated || created!,
        });
      }

      recentFiles.sort(
        (a, b) =>
          new Date(b.lastModifiedDate).getTime() -
          new Date(a.lastModifiedDate).getTime(),
      );

      return { recentFiles };
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
}
