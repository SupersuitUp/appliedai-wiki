import * as path from 'path';
import * as fs from 'fs';
import {
  collectHistory,
  isShallowClone,
  mergePageDates,
  sortNewestFirst,
  type ChangeEvent,
  type History,
  type PageDates,
} from './collect';

// Vercel's build container clones the repo SHALLOW and with NO git remote, so
// `git remote -v` is empty there, any fetch dies with "'origin' does not appear
// to be a git repository", and `git fetch --unshallow` exits 0 having done
// nothing. (Verified on way-of-fire-wiki, 2026-07-26. Earlier versions of this
// recipe told you to unshallow in the build command; that never worked.)
// History older than the clone's window is unreachable at build time.
//
// So history rides along in the repo, in the snapshot below. On a full clone
// the plugin writes what git shows into it; on a shallow clone it leaves the
// snapshot alone and merges it with whatever recent git it can see, live git
// winning on collision so titles track the working tree.
//
// THE SNAPSHOT IS ONLY AS FRESH AS ITS LAST COMMIT. A page added after that
// has dates only while its commit is still inside Vercel's window (about ten
// doc-touching commits), and a wiki that takes thirty commits a day loses them
// the same afternoon (getfreedom-wiki, 2026-09-20: three pages with no dates in
// production). `wiki refresh-dates` rewrites it from a full clone and the
// pre-commit hook `wiki install-hooks` writes runs that on every commit, so the
// snapshot lags HEAD by one commit and HEAD is always inside the window.
export const SNAPSHOT_RELATIVE_PATH = 'src/data/changelog-events.json';

export function readSnapshot(siteDir: string): History {
  const file = path.join(siteDir, SNAPSHOT_RELATIVE_PATH);
  const empty: History = { changeEvents: [], pageDates: {} };
  if (!fs.existsSync(file)) return empty;
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return {
      changeEvents: Array.isArray(parsed?.changeEvents) ? parsed.changeEvents : [],
      pageDates:
        parsed?.pageDates && typeof parsed.pageDates === 'object' ? parsed.pageDates : {},
    };
  } catch {
    return empty;
  }
}

export function serializeSnapshot(history: History): string {
  return `${JSON.stringify(
    { changeEvents: history.changeEvents, pageDates: history.pageDates },
    null,
    2,
  )}\n`;
}

/** Write the snapshot if it changed. Returns true when the file was written. */
export function writeSnapshot(siteDir: string, history: History): boolean {
  if (history.changeEvents.length === 0 && Object.keys(history.pageDates).length === 0) return false;
  const file = path.join(siteDir, SNAPSHOT_RELATIVE_PATH);
  const next = serializeSnapshot(history);
  const previous = fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : '';
  if (previous === next) return false;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, next);
  return true;
}

/** Snapshot plus live git: events by id (live wins), page dates by the earliest birth and latest touch. */
export function mergeHistory(snapshot: History, live: History): History {
  // A snapshot event outlives the page it describes, and it still carries the routePath that
  // page had on the day it was written. On a shallow clone nothing regenerates those rows, so
  // the changelog goes on linking to a page that has since been deleted and the PRODUCTION
  // build fails on a broken link while the local one passes (getfreedom-wiki, 2026-09-05, nine
  // skill pages deleted at once; any single deletion does it). Clear the route rather than
  // drop the event: "this page was created on the 3rd" stays true after the page is gone, and
  // the widget renders an event with no routePath as plain text. Lifted from getfreedom-wiki's
  // own copy of this plugin on 2026-09-20, where it had lived alone since the day it was found.
  const liveRoutes = live.liveRoutePaths ? new Set(live.liveRoutePaths) : null;
  const onLiveRoute = (event: ChangeEvent): ChangeEvent =>
    !liveRoutes || !event.routePath || liveRoutes.has(event.routePath) ? event : { ...event, routePath: '' };
  const byId = new Map<string, ChangeEvent>();
  for (const event of snapshot.changeEvents) byId.set(event.id, onLiveRoute(event));
  for (const event of live.changeEvents) byId.set(event.id, onLiveRoute(event));
  return {
    changeEvents: sortNewestFirst([...byId.values()]),
    pageDates: mergePageDates(snapshot.pageDates, live.pageDates),
    // The working tree is the only source of what is built; a snapshot's idea of it is stale.
    liveDocKeys: live.liveDocKeys,
    liveRoutePaths: live.liveRoutePaths,
  };
}

/** Live docs (not draft, not hidden) the merged history cannot date at all. */
export function undatedPages(history: History, liveDocKeys: Iterable<string>): string[] {
  const out: string[] = [];
  for (const key of liveDocKeys) {
    const dates: PageDates | undefined = history.pageDates[key];
    if (!dates || (!dates.created && !dates.updated)) out.push(key);
  }
  return out.sort();
}

export interface LoadedHistory extends History {
  shallow: boolean;
  /** True when this call rewrote the snapshot file (full clone only). */
  wroteSnapshot: boolean;
}

/**
 * What the plugin and `wiki refresh-dates` both do: read git, refresh the snapshot on a
 * full clone, merge with the committed snapshot, and hand back the result.
 */
export function loadHistory(siteDir: string): LoadedHistory {
  const shallow = isShallowClone(siteDir);
  const live = collectHistory(siteDir);
  // Only a full clone may rewrite the snapshot. A shallow one would replace
  // deep history with its own truncated window.
  const wroteSnapshot = shallow ? false : writeSnapshot(siteDir, live);
  const merged = mergeHistory(readSnapshot(siteDir), live);
  return { ...merged, shallow, wroteSnapshot };
}
