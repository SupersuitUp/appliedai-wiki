// Runtime search engine: pure module so it can be unit-tested without a
// browser, React, or Docusaurus runtime.

import MiniSearch, { type SearchResult } from 'minisearch';

export type SearchEntry = {
  id: number;
  title: string;
  path: string;
  section: string;
  headings: string[];
  content: string;
};

export type SearchHit = {
  id: number;
  title: string;
  path: string;
  section: string;
  snippet: string;
};

export function buildEngine(
  entries: SearchEntry[],
): MiniSearch<SearchEntry> {
  const engine = new MiniSearch<SearchEntry>({
    idField: 'id',
    fields: ['title', 'headings', 'content'],
    storeFields: ['title', 'path', 'section', 'headings', 'content'],
    searchOptions: {
      boost: { title: 5, headings: 3, content: 1 },
      prefix: true,
      fuzzy: 0.2,
      combineWith: 'AND',
    },
    extractField: (doc, field) => {
      // headings is an array; flatten to a string so MiniSearch can index it.
      if (field === 'headings') return (doc.headings ?? []).join(' ');
      // Everything else (idField, title, content, …) passes through as-is so
      // numeric ids stay numbers and string fields stay strings. Coercing to
      // string here previously turned every numeric `id` into `""`, which
      // caused MiniSearch.addAll to throw `duplicate ID` after the first row.
      return (doc as Record<string, unknown>)[field] as string;
    },
  });
  engine.addAll(entries);
  return engine;
}

export function buildSnippet(content: string, query: string): string {
  if (!content) return '';
  const trimmed = content.trim();
  if (!query) return trimmed.slice(0, 160);
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2);
  let earliest = -1;
  let matchedToken = '';
  for (const t of tokens) {
    const idx = trimmed.toLowerCase().indexOf(t);
    if (idx !== -1 && (earliest === -1 || idx < earliest)) {
      earliest = idx;
      matchedToken = t;
    }
  }
  if (earliest === -1) return trimmed.slice(0, 160);
  const start = Math.max(0, earliest - 40);
  const end = Math.min(trimmed.length, earliest + matchedToken.length + 100);
  const prefix = start > 0 ? '… ' : '';
  const suffix = end < trimmed.length ? ' …' : '';
  return prefix + trimmed.slice(start, end) + suffix;
}

export function searchEngine(
  engine: MiniSearch<SearchEntry>,
  query: string,
  limit = 20,
): SearchHit[] {
  const q = query.trim();
  if (!q) return [];
  const raw: SearchResult[] = engine.search(q);
  return raw.slice(0, limit).map((r) => ({
    id: r.id as number,
    title: String(r.title ?? ''),
    path: String(r.path ?? '/'),
    section: String(r.section ?? ''),
    snippet: buildSnippet(String(r.content ?? ''), q),
  }));
}
