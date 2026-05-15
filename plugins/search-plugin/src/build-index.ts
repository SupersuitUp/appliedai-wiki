import path from 'path';
import fs from 'fs/promises';
import { glob } from 'glob';
import matter from 'gray-matter';
import { remark } from 'remark';
import strip from 'strip-markdown';

export type SearchEntry = {
  id: number;
  title: string;
  path: string;
  section: string;
  headings: string[];
  content: string;
};

const CONTENT_CHAR_CAP = 2000;

export async function buildSearchIndex(
  docsDir: string,
): Promise<SearchEntry[]> {
  const files = await glob('**/*.{md,mdx}', { cwd: docsDir, posix: true });
  files.sort();

  const entries: SearchEntry[] = [];
  let id = 0;
  for (const relPath of files) {
    const fullPath = path.join(docsDir, relPath);
    const raw = await fs.readFile(fullPath, 'utf8');
    const parsed = matter(raw);
    const frontmatter = parsed.data as Record<string, unknown>;
    const body = parsed.content;

    if (frontmatter.draft === true || frontmatter.unlisted === true) continue;

    const title = String(
      frontmatter.title || extractFirstH1(body) || deriveTitleFromPath(relPath),
    );
    const headings = extractHeadings(body);
    const section = sectionFromPath(relPath);
    const docPath = computePath(relPath, frontmatter);
    const content = await stripToText(body);

    entries.push({
      id: id++,
      title,
      path: docPath,
      section,
      headings,
      content: content.slice(0, CONTENT_CHAR_CAP),
    });
  }

  return entries;
}

function extractFirstH1(body: string): string | undefined {
  const match = body.match(/^#\s+(.+?)\s*$/m);
  return match?.[1]?.trim();
}

function extractHeadings(body: string): string[] {
  const out: string[] = [];
  const re = /^(##+)\s+(.+?)\s*$/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(body)) !== null) {
    const level = match[1].length;
    if (level !== 2 && level !== 3) continue;
    out.push(match[2].replace(/[`*_]/g, '').trim());
  }
  return out;
}

function deriveTitleFromPath(relPath: string): string {
  const base = path.basename(relPath, path.extname(relPath));
  return base
    .split(/[-_]/)
    .map((p) => (p ? p.charAt(0).toUpperCase() + p.slice(1) : ''))
    .filter(Boolean)
    .join(' ');
}

function sectionFromPath(relPath: string): string {
  const norm = relPath.replace(/\\/g, '/');
  if (!norm.includes('/')) return '';
  return norm.split('/')[0];
}

function computePath(
  relPath: string,
  frontmatter: Record<string, unknown>,
): string {
  const slug = typeof frontmatter.slug === 'string' ? frontmatter.slug : '';
  if (slug) {
    return slug.startsWith('/') ? slug : '/' + slug;
  }
  const norm = relPath.replace(/\\/g, '/');
  const noExt = norm.replace(/\.(mdx?|md)$/, '');
  if (noExt.endsWith('/index')) {
    const dir = noExt.replace(/\/index$/, '');
    return dir ? '/' + dir : '/';
  }
  return '/' + noExt;
}

async function stripToText(markdown: string): Promise<string> {
  // Drop fenced code blocks and JSX-like component tags before strip-markdown,
  // which leaves component names and code untouched.
  const cleaned = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<\/?[A-Z][^>]*>/g, ' ')
    .replace(/<\/?[a-z]+[^>]*\/>/g, ' ');

  const file = await remark().use(strip).process(cleaned);
  return String(file).replace(/\s+/g, ' ').trim();
}
