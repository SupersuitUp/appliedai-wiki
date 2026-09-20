#!/usr/bin/env node
// Write the pre-commit hook that keeps src/data/changelog-events.json fresh.
//
//   node scripts/install-hooks.mjs        idempotent; `prepare` runs it on every install
//   node scripts/install-hooks.mjs --print show the hook body and exit
//
// PORTED from @supersuit/docusaurus-preset-wiki 1.8.0 (`wiki install-hooks`) on 2026-09-20,
// because this wiki still carries the framework as copied files; the hook body runs this
// wiki's scripts/refresh-dates.mjs instead of the package bin. Goes when the wiki migrates.
//
// One hook, one job: `wiki refresh-dates` before every commit, so the snapshot production
// reads for Created / Updated lags HEAD by one commit at most. Worktrees share the hooks
// directory, so a branch made in one refreshes it too. An existing hook is kept: the block
// between the markers is added or replaced, nothing outside it is touched. Never fails an
// install: a machine with no git (a tarball, a Vercel build of an exported tree) just says so.
import { execFileSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const BEGIN = '# >>> @supersuit/docusaurus-preset-wiki refresh-dates >>>';
export const END = '# <<< @supersuit/docusaurus-preset-wiki refresh-dates <<<';

/** The lines this package owns inside the hook. `prefix` is the wiki's path under the repo root ('' when it is the root). */
export function hookBlock(prefix = '') {
  const cd = prefix ? `cd "${prefix.replace(/\/$/, '')}" || exit 0` : ':';
  return [
    BEGIN,
    '# Refresh the page-dates snapshot from full git history and stage it, so every',
    '# deploy (Vercel clones shallow) can date every page. Installed by `wiki install-hooks`.',
    `${cd}`,
    'if [ -f scripts/refresh-dates.mjs ]; then node --import ./scripts/ts-resolve-hooks.mjs scripts/refresh-dates.mjs || exit 1; fi',
    END,
  ].join('\n');
}

/** The hook file with our block added or replaced; a fresh file when `existing` is empty. */
export function mergeHook(existing, block) {
  const re = new RegExp(`${escape(BEGIN)}[\\s\\S]*?${escape(END)}`);
  if (existing && re.test(existing)) return existing.replace(re, block);
  if (existing && existing.trim()) return `${existing.replace(/\s*$/, '')}\n\n${block}\n`;
  return `#!/bin/sh\n${block}\n`;
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const PREPARE = 'node scripts/install-hooks.mjs';

/** Give the instance's package.json a `prepare` that installs the hook on every install. Returns true when changed. */
export function ensurePrepare(pkg) {
  const scripts = (pkg.scripts ??= {});
  const cur = scripts.prepare;
  if (!cur) { scripts.prepare = PREPARE; return true; }
  if (cur.includes(PREPARE)) return false;
  scripts.prepare = `${cur} && ${PREPARE}`;
  return true;
}

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

export function installHooks({ root = process.cwd(), log = console.log } = {}) {
  let hooksDir;
  let prefix;
  try {
    // `--git-path hooks` honours core.hooksPath and resolves to the COMMON dir from a worktree.
    const raw = git(['rev-parse', '--git-path', 'hooks'], root);
    hooksDir = isAbsolute(raw) ? raw : resolve(root, raw);
    prefix = git(['rev-parse', '--show-prefix'], root);
  } catch {
    log('[install-hooks] not a git checkout; nothing to install');
    return 0;
  }
  const file = join(hooksDir, 'pre-commit');
  const existing = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const next = mergeHook(existing, hookBlock(prefix));
  if (next === existing) {
    log(`[install-hooks] pre-commit hook already current (${file})`);
    return 0;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, next);
  chmodSync(file, 0o755);
  log(`[install-hooks] pre-commit hook ${existing ? 'updated' : 'written'}: ${file}`);
  return 0;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  if (process.argv.includes('--print')) {
    console.log(hookBlock());
    process.exit(0);
  }
  process.exit(installHooks());
}
