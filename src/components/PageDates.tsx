import React from 'react';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useGlobalData from '@docusaurus/useGlobalData';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

// Created / Updated for the article being read, from the git-derived history
// the creation-date plugin publishes. Docusaurus ships `showLastUpdateTime`,
// but it reads git at build time, and the build host clones shallow with no
// remote — so it reports the clone window's start date, not the truth. The
// plugin already solved that (full-clone snapshot committed to the repo, merged
// with whatever live git the build can see), so the dates here ride on a source
// that is correct in production.
//
// Rendered in the React tree, under the title, by DocMetaRow — so it is in the
// static HTML, in the chrome-less share mirror, and there before hydration.
//
// Deliberately self-contained: it reads the plugin's global data itself rather
// than importing from ChangelogWidget, so it drops into a wiki that has the
// creation-date plugin but no changelog widget, and renders nothing at all in
// a wiki that has neither.

type ChangeType = 'new' | 'updated' | 'removed';

interface ChangeEvent {
  type: ChangeType;
  date: string; // ISO8601 commit date
  routePath: string; // public URL with leading slash; empty for removed pages
}

interface PageDatesEntry {
  created?: string;
  updated?: string;
}

interface PluginData {
  changeEvents?: ChangeEvent[];
  pageDates?: Record<string, PageDatesEntry>;
}

function usePluginData(): PluginData {
  const globalData = useGlobalData() as
    | Record<string, Record<string, unknown>>
    | undefined;
  return (globalData?.['creation-date-plugin']?.default as PluginData | undefined) ?? {};
}

function normalizeRoute(pathname: string, baseUrl: string): string {
  let route = pathname;
  if (baseUrl !== '/' && route.startsWith(baseUrl)) {
    route = route.slice(baseUrl.length - 1);
  }
  if (route.length > 1 && route.endsWith('/')) route = route.slice(0, -1);
  return route.toLowerCase();
}

/** `@site/docs/concepts/foo.md` -> `concepts/foo`, the plugin's docKey. */
export function docKeyFromSource(source: string): string | null {
  const m = source.match(/^@site\/[^/]+\/(.+?)\.mdx?$/);
  return m ? m[1] : null;
}

function formatDay(iso: string): string {
  // The commit date carries its own offset (2026-08-09T19:30-05:00), so the
  // leading YYYY-MM-DD is the day the edit was actually made. Parsing to a
  // Date and formatting in the reader's zone would shift evening edits a day.
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

interface Dates {
  created?: string;
  updated?: string;
}

/**
 * The dates for the doc being rendered. Looked up by the doc's SOURCE PATH
 * first (exact, and it covers section indexes and intro pages the changelog
 * leaves out), then by route through the changelog stream, which is what a
 * snapshot written before `pageDates` existed still carries.
 */
export function usePageDates(): Dates {
  const { changeEvents = [], pageDates = {} } = usePluginData();
  const { metadata } = useDoc();
  const { pathname } = useLocation();
  const baseUrl = useBaseUrl('/');

  const key = docKeyFromSource(metadata.source);
  const byKey: Dates = (key && pageDates[key]) || {};

  const route = normalizeRoute(pathname, baseUrl);
  const mine = changeEvents.filter(
    (e) => e.type !== 'removed' && e.routePath && normalizeRoute(e.routePath, '/') === route,
  );
  // The stream is newest-first, so the last "new" event is the original birth
  // even if a page was deleted and re-added.
  const byRoute: Dates = {
    created: [...mine].reverse().find((e) => e.type === 'new')?.date,
    updated: mine[0]?.date,
  };

  const at = (iso: string) => new Date(iso).getTime();
  const earliest = (a?: string, b?: string) => (a && b ? (at(a) <= at(b) ? a : b) : a ?? b);
  const latest = (a?: string, b?: string) => (a && b ? (at(a) >= at(b) ? a : b) : a ?? b);
  return {
    created: earliest(byKey.created, byRoute.created),
    updated: latest(byKey.updated, byRoute.updated),
  };
}

export default function PageDates(): React.JSX.Element | null {
  const { created, updated } = usePageDates();
  if (!created && !updated) return null;

  const createdDay = created ? formatDay(created) : null;
  const updatedDay = updated ? formatDay(updated) : null;
  // A page written once says so once, rather than claiming an update that is
  // really just its own creation commit.
  const showUpdated = updatedDay && updatedDay !== createdDay;

  const style: React.CSSProperties = {
    fontFamily: 'var(--ifm-font-family-monospace)',
    fontSize: '0.8rem',
    color: 'var(--ifm-color-emphasis-600)',
  };

  return (
    <span className="doc-page-dates" style={style}>
      {createdDay ? (
        <>
          Created <time dateTime={created!.slice(0, 10)}>{createdDay}</time>
        </>
      ) : null}
      {createdDay && showUpdated ? ' · ' : null}
      {showUpdated ? (
        <>
          Updated <time dateTime={updated!.slice(0, 10)}>{updatedDay}</time>
        </>
      ) : null}
    </span>
  );
}
