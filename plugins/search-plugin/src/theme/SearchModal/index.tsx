import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type MiniSearch from 'minisearch';
import {
  buildEngine,
  buildSnippet,
  searchEngine,
  type SearchEntry,
} from '../../engine';
import styles from './styles.module.css';

type Props = {
  onClose: () => void;
};

type LoadState =
  | { kind: 'loading' }
  | { kind: 'ready'; engine: MiniSearch<SearchEntry>; entries: SearchEntry[] }
  | { kind: 'error' };

let cachedEngine: MiniSearch<SearchEntry> | null = null;
let cachedEntries: SearchEntry[] | null = null;
let inflight: Promise<{
  engine: MiniSearch<SearchEntry>;
  entries: SearchEntry[];
}> | null = null;

const SECTION_LABEL: Record<string, string> = {
  'truth-management': 'Truth Management',
};

async function loadIndex(
  url: string,
): Promise<{ engine: MiniSearch<SearchEntry>; entries: SearchEntry[] }> {
  if (cachedEngine && cachedEntries) {
    return { engine: cachedEngine, entries: cachedEntries };
  }
  if (!inflight) {
    inflight = (async () => {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) {
        throw new Error(`search index fetch failed: ${res.status}`);
      }
      const entries: SearchEntry[] = await res.json();
      const engine = buildEngine(entries);
      cachedEngine = engine;
      cachedEntries = entries;
      return { engine, entries };
    })().catch((e) => {
      inflight = null;
      throw e;
    });
  }
  return inflight;
}

function highlightSnippet(snippet: string, query: string): React.ReactNode {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2);
  if (tokens.length === 0) return snippet;
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = snippet.split(re);
  return parts.map((part, i) =>
    re.test(part) ? <mark key={i}>{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>,
  );
}

function sectionLabel(section: string): string {
  if (!section) return '';
  if (SECTION_LABEL[section]) return SECTION_LABEL[section];
  return section
    .split(/[-_]/)
    .map((p) => (p ? p.charAt(0).toUpperCase() + p.slice(1) : ''))
    .filter(Boolean)
    .join(' ');
}

export default function SearchModal({ onClose }: Props): React.ReactElement {
  const history = useHistory();
  const indexUrl = useBaseUrl('/search-index.json');
  const [load, setLoad] = useState<LoadState>({ kind: 'loading' });
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    let cancelled = false;
    setLoad({ kind: 'loading' });
    loadIndex(indexUrl)
      .then((r) => {
        if (!cancelled) setLoad({ kind: 'ready', engine: r.engine, entries: r.entries });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error('[search] loadIndex failed:', e);
        if (!cancelled) setLoad({ kind: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [indexUrl]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query), 80);
    return () => window.clearTimeout(id);
  }, [query]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [debounced]);

  // Lock body scroll while modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const results = useMemo(() => {
    if (load.kind !== 'ready') return [];
    const q = debounced.trim();
    if (!q) {
      return load.entries.slice(0, 8).map((e) => ({
        id: e.id,
        title: e.title,
        path: e.path,
        section: e.section,
        snippet: buildSnippet(e.content, ''),
      }));
    }
    return searchEngine(load.engine, q, 20);
  }, [load, debounced]);

  const navigate = useCallback(
    (path: string, openInNewTab: boolean) => {
      if (openInNewTab) {
        window.open(path, '_blank', 'noopener,noreferrer');
      } else {
        history.push(path);
        onClose();
      }
    },
    [history, onClose],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(results.length - 1, i + 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(0, i - 1));
        return;
      }
      if (e.key === 'Enter') {
        const r = results[selectedIdx];
        if (r) {
          e.preventDefault();
          navigate(r.path, e.metaKey || e.ctrlKey);
        }
      }
    },
    [results, selectedIdx, navigate, onClose],
  );

  // Keep the selected row in view as the user arrows down.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-idx="${selectedIdx}"]`);
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIdx, results]);

  const onBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const retry = useCallback(() => {
    cachedEngine = null;
    cachedEntries = null;
    inflight = null;
    setLoad({ kind: 'loading' });
    loadIndex(indexUrl)
      .then((r) => setLoad({ kind: 'ready', engine: r.engine, entries: r.entries }))
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error('[search] retry failed:', e);
        setLoad({ kind: 'error' });
      });
  }, [indexUrl]);

  // SearchBar renders inside the navbar, which has its own stacking context.
  // Portal to document.body so our z-index applies against the page, not the
  // navbar's children.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={onBackdropClick}
    >
      <div className={styles.modal} onKeyDown={onKeyDown}>
        <div className={styles.inputRow}>
          <svg
            className={styles.inputIcon}
            width="16"
            height="16"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M14.386 14.386l4.0877 4.0877c.4101.4101.4101 1.0743 0 1.4844-.4101.4101-1.0743.4101-1.4844 0L12.901 15.87a8 8 0 111.485-1.485zM8 14a6 6 0 100-12 6 6 0 000 12z"
            />
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the wiki…"
            aria-label="Search query"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close search"
          >
            Esc
          </button>
        </div>

        <div className={styles.results}>
          {load.kind === 'loading' && (
            <div className={styles.empty}>Loading index…</div>
          )}
          {load.kind === 'error' && (
            <div className={styles.error}>
              <p>Couldn&apos;t load search.</p>
              <button type="button" className={styles.retry} onClick={retry}>
                Retry
              </button>
            </div>
          )}
          {load.kind === 'ready' && results.length === 0 && (
            <div className={styles.empty}>
              {debounced.trim() ? 'No results.' : 'Type to search.'}
            </div>
          )}
          {load.kind === 'ready' && results.length > 0 && (
            <ul ref={listRef} className={styles.resultList}>
              {results.map((r, idx) => (
                <li
                  key={r.id}
                  data-idx={idx}
                  className={
                    idx === selectedIdx ? styles.resultItemActive : styles.resultItem
                  }
                >
                  <button
                    type="button"
                    className={styles.resultButton}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    onClick={(e) =>
                      navigate(r.path, e.metaKey || e.ctrlKey)
                    }
                  >
                    {r.section ? (
                      <span className={styles.resultBreadcrumb}>
                        {sectionLabel(r.section)}
                      </span>
                    ) : null}
                    <span className={styles.resultTitle}>{r.title}</span>
                    {r.snippet ? (
                      <span className={styles.resultSnippet}>
                        {highlightSnippet(r.snippet, debounced)}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.footer}>
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>Enter</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
