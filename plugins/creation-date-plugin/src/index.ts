import type { Plugin, LoadContext, PluginOptions } from '@docusaurus/types';
import * as path from 'path';
import * as fs from 'fs';
import {
  collectChangeEvents,
  isShallowClone,
  sortNewestFirst,
  type ChangeEvent,
} from './collect';

interface CreationDatePluginContent {
  changeEvents: ChangeEvent[];
}

// Vercel's build container clones the repo SHALLOW and with NO git remote, so
// `git remote -v` is empty there, any fetch dies with "'origin' does not appear
// to be a git repository", and `git fetch --unshallow` exits 0 having done
// nothing. (Verified on way-of-fire-wiki, 2026-07-26. Earlier versions of this
// recipe told you to unshallow in the build command; that never worked.)
// History older than the clone's window is unreachable at build time.
//
// So history rides along in the repo. On a full clone (a laptop) the plugin
// writes what git shows into the snapshot below; on a shallow clone it leaves
// the snapshot alone and merges it with whatever recent git it can see, live
// git winning on collision so titles track the working tree. Commit the
// snapshot when it changes: it is what makes /changelog show more than the
// last few weeks in production.
const SNAPSHOT_RELATIVE_PATH = 'src/data/changelog-events.json';

function readSnapshot(siteDir: string): ChangeEvent[] {
  const file = path.join(siteDir, SNAPSHOT_RELATIVE_PATH);
  if (!fs.existsSync(file)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return Array.isArray(parsed?.changeEvents) ? parsed.changeEvents : [];
  } catch {
    return [];
  }
}

function writeSnapshot(siteDir: string, events: ChangeEvent[]): void {
  if (events.length === 0) return;
  const file = path.join(siteDir, SNAPSHOT_RELATIVE_PATH);
  const next = `${JSON.stringify({ changeEvents: events }, null, 2)}\n`;
  const previous = fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : '';
  if (previous === next) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, next);
  console.log(
    `[changelog] snapshot refreshed with ${events.length} events, commit ${SNAPSHOT_RELATIVE_PATH}`,
  );
}

export default function creationDatePlugin(
  context: LoadContext,
  _options: PluginOptions,
): Plugin<CreationDatePluginContent> {
  return {
    name: 'creation-date-plugin',

    async loadContent() {
      const siteDir = context.siteDir;
      const fromGit = collectChangeEvents(siteDir);

      // Only a full clone may rewrite the snapshot. A shallow one would
      // replace deep history with its own truncated window.
      if (!isShallowClone(siteDir)) writeSnapshot(siteDir, fromGit);

      const byId = new Map<string, ChangeEvent>();
      for (const event of readSnapshot(siteDir)) byId.set(event.id, event);
      for (const event of fromGit) byId.set(event.id, event);

      return { changeEvents: sortNewestFirst([...byId.values()]) };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
}
