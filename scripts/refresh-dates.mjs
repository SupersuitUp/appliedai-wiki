#!/usr/bin/env node
// Rewrite src/data/changelog-events.json from this clone's git history and stage it.
//
//   node --import ./scripts/ts-resolve-hooks.mjs scripts/refresh-dates.mjs [--check] [--no-stage]
//
// PORTED from @supersuit/docusaurus-preset-wiki 1.8.0 (`wiki refresh-dates`) on 2026-09-20,
// because this wiki still carries the framework as copied files. When it moves onto the
// package this file goes and the hook calls `node_modules/.bin/wiki refresh-dates` instead.
//
// Why it exists: production reads the snapshot (Vercel clones shallow), and until the hook
// only a local build on a full clone rewrote it. This wiki takes ~30 commits a day from
// Freedom releases, so a page committed after the last refresh lost its Created / Updated
// line the same afternoon (three pages, 2026-09-20). The pre-commit hook runs this, so the
// snapshot lags HEAD by one commit and HEAD is always inside the clone window.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');

async function main() {
  const args = process.argv.slice(2);
  const stage = !args.includes('--no-stage');
  const check = args.includes('--check');
  const { loadHistory, readSnapshot, serializeSnapshot, SNAPSHOT_RELATIVE_PATH } = await import(
    '../plugins/creation-date-plugin/src/snapshot'
  );
  const { isShallowClone, collectHistory } = await import('../plugins/creation-date-plugin/src/collect');
  if (!existsSync(join(ROOT, 'docs'))) { console.error('[refresh-dates] no docs/ here'); return 2; }
  if (isShallowClone(ROOT)) {
    console.error('[refresh-dates] shallow clone; the snapshot can only be refreshed from full history');
    return 2;
  }
  if (check) {
    const live = collectHistory(ROOT);
    const before = serializeSnapshot(readSnapshot(ROOT));
    const after = serializeSnapshot({ changeEvents: live.changeEvents, pageDates: live.pageDates });
    if (before === after) { console.log('[refresh-dates] snapshot is current'); return 0; }
    console.error(`[refresh-dates] ${SNAPSHOT_RELATIVE_PATH} is behind git history; run scripts/refresh-dates.mjs and commit it`);
    return 1;
  }
  const history = loadHistory(ROOT);
  const pages = Object.keys(history.pageDates).length;
  if (!history.wroteSnapshot) {
    console.log(`[refresh-dates] snapshot already current (${history.changeEvents.length} events, ${pages} dated pages)`);
    return 0;
  }
  console.log(`[refresh-dates] ${SNAPSHOT_RELATIVE_PATH} refreshed: ${history.changeEvents.length} events, ${pages} dated pages`);
  if (stage) {
    execFileSync('git', ['add', '--', SNAPSHOT_RELATIVE_PATH], { cwd: ROOT, stdio: 'inherit' });
    console.log('[refresh-dates] staged');
  }
  return 0;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) main().then((code) => process.exit(code), (err) => { console.error(`[refresh-dates] ${err.message}`); process.exit(1); });
