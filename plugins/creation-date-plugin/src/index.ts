import type { Plugin, LoadContext, PluginOptions } from '@docusaurus/types';
import type { ChangeEvent, PageDates } from './collect';
import { loadHistory, undatedPages, SNAPSHOT_RELATIVE_PATH } from './snapshot';

export interface CreationDatePluginContent {
  /** The changelog stream: newest first, meta pages excluded. */
  changeEvents: ChangeEvent[];
  /** Created / Updated for every built page, keyed by docKey. See collect.ts. */
  pageDates: Record<string, PageDates>;
}

// Git history in, two things out: the event stream /changelog renders and the
// per-page dates every article shows under its title. How the snapshot keeps
// production honest on Vercel's shallow clone is explained in snapshot.ts.
export default function creationDatePlugin(
  context: LoadContext,
  _options: PluginOptions,
): Plugin<CreationDatePluginContent> {
  return {
    name: 'creation-date-plugin',

    async loadContent() {
      const history = loadHistory(context.siteDir);
      if (history.wroteSnapshot) {
        console.log(
          `[changelog] snapshot refreshed with ${history.changeEvents.length} events and ${Object.keys(history.pageDates).length} dated pages, commit ${SNAPSHOT_RELATIVE_PATH}`,
        );
      }
      // On the build host this is the only place the drift is visible: a page
      // with no dates renders nothing, silently, and nobody sees a blank line.
      if (history.shallow) {
        const undated = undatedPages(history, history.liveDocKeys ?? []);
        if (undated.length > 0) {
          console.warn(
            `[changelog] shallow clone: ${undated.length} page(s) have no Created/Updated dates because ${SNAPSHOT_RELATIVE_PATH} predates them and their commits are outside the clone window. Run \`wiki refresh-dates\` (or install the pre-commit hook with \`wiki install-hooks\`) and commit the snapshot:\n  ${undated.join('\n  ')}`,
          );
        }
      }
      return { changeEvents: history.changeEvents, pageDates: history.pageDates };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
}
