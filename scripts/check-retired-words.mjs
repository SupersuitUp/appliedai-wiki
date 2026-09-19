#!/usr/bin/env node
// Refuse a build that uses a word the operator has retired.
//
// A retired word is one that used to carry a meaning and was replaced on purpose: Jarvis
// (2026-09-02, the agent is Freeda), worklife (2026-09-19, the thing is life infrastructure).
// Retiring by hand fails in one predictable way: the sweep matches the compound the word was
// last seen in and the bare word survives in five other places. This gate matches the bare
// word, on every page, on every build, so the next retirement is one config entry.
//
// Config, in order: `retired_words` in wiki.config.json (preset wikis); scripts/retired-words.json
// (wikis not yet on the package); neither means nothing to check. Shape:
//   { "words": [{ "name", "pattern", "since", "use" }], "exempt": ["glob", ...] }
// `pattern` is a JS regex source, matched case-insensitively. `use` is what to write instead,
// printed on every hit so the fix travels with the refusal.
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const SCAN_DIRS = ['docs', 'plain', 'src/data', 'static/og-deck'];
const EXT = /\.(mdx?|mjs|js|ts|tsx|json|html|txt)$/;

export function findRetiredWords(text, words) {
  const out = [];
  for (const w of words) {
    const re = new RegExp(w.pattern, 'gi');
    let m;
    while ((m = re.exec(text))) out.push({name: w.name, match: m[0], index: m.index, use: w.use});
  }
  return out;
}

const GLOB_SPECIAL = /[.+?^${}()|[\]\\]/;

// A `**` segment matches ZERO or more full path segments, not one or more: `static/**/*.recipe.json`
// must exempt `static/a.recipe.json` (zero directories between `static/` and the file) as well as
// `static/img/comics/x.recipe.json` (two). A naive `split('**').join('.*')` forces the literal `/`
// that follows `**` in the source glob to still appear in the match, which makes the zero-segment
// case impossible. Fixed by walking the glob and folding `**` plus an adjacent `/` into a single
// optional `(?:.*/)?` group, so the group can match nothing at all.
export function globToRe(glob) {
  let out = '';
  let i = 0;
  while (i < glob.length) {
    if (glob[i] === '*' && glob[i + 1] === '*') {
      if (glob[i + 2] === '/') {
        out += '(?:.*/)?'; // '**/' (mid-pattern or leading): zero or more segments, each ending in /
        i += 3;
      } else {
        out += '.*'; // '/**' trailing, or a bare '**' with no adjacent slash
        i += 2;
      }
    } else if (glob[i] === '*') {
      out += '[^/]*';
      i += 1;
    } else {
      out += GLOB_SPECIAL.test(glob[i]) ? '\\' + glob[i] : glob[i];
      i += 1;
    }
  }
  return new RegExp('^' + out + '$');
}

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir)) {
    if (e === 'node_modules' || e.startsWith('.')) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (EXT.test(e)) acc.push(p);
  }
  return acc;
}

export function scanTree(root, config) {
  const exempt = (config.exempt || []).map(globToRe);
  const hits = [];
  for (const dir of SCAN_DIRS) {
    for (const file of walk(join(root, dir))) {
      const rel = relative(root, file).split(sep).join('/');
      if (exempt.some((re) => re.test(rel))) continue;
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        for (const h of findRetiredWords(line, config.words)) hits.push({file: rel, line: i + 1, name: h.name, match: h.match, use: h.use});
      });
    }
  }
  return hits;
}

export function resolveConfig(root) {
  const wc = join(root, 'wiki.config.json');
  if (existsSync(wc)) {
    const cfg = JSON.parse(readFileSync(wc, 'utf8'));
    if (cfg.retired_words) return cfg.retired_words;
  }
  const local = join(root, 'scripts', 'retired-words.json');
  if (existsSync(local)) return JSON.parse(readFileSync(local, 'utf8'));
  return null;
}

export function main(root = process.cwd()) {
  const config = resolveConfig(root);
  if (!config || !config.words?.length) {
    console.log('[retired-words] no retired words configured; nothing to check');
    return 0;
  }
  const hits = scanTree(root, config);
  if (!hits.length) {
    console.log(`[retired-words] clean: ${config.words.map((w) => w.name).join(', ')}`);
    return 0;
  }
  for (const h of hits) console.error(`${h.file}:${h.line}: "${h.match}" is retired (${h.name}); use ${h.use}`);
  console.error(`[retired-words] ${hits.length} hit(s). A retired word is one the operator replaced on purpose; the record keeps it, live pages do not.`);
  return 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main());
