#!/usr/bin/env node
// Fail the build on an admonition that will render as literal text.
//
// Docusaurus 3 runs MDX 3, where a titled admonition must bracket its title:
//
//     :::note[About the sources]        correct
//     :::note About the sources         renders ":::note About the sources"
//
// The broken form does not error. `docusaurus build` exits 0 and the page ships
// with `:::note` visible to every reader. It was live on supersuit.wiki's own
// install instructions until someone happened to look at the page.
//
// That is the entire reason this check exists: the defect is invisible to every
// signal a build normally gives you, so it needs a signal of its own.
import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join } from "path";

const TYPES = "note|tip|info|warning|danger|caution|success|secondary";
const BROKEN = new RegExp(`^:::(${TYPES})[ \\t]+\\S`);

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e.startsWith(".")) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.mdx?$/.test(e)) acc.push(p);
  }
  return acc;
}

const findings = [];
for (const f of [...walk("docs"), ...walk("blog"), ...walk("src/pages")]) {
  let fenced = false;
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    // A fenced block may legitimately DEMONSTRATE the broken form; the voice
    // rules page does exactly that, to show what not to write.
    if (/^\s*```/.test(line)) { fenced = !fenced; return; }
    if (fenced) return;
    const m = line.match(BROKEN);
    if (m) findings.push({ f, line: i + 1, type: m[1], text: line.trim() });
  });
}

if (findings.length) {
  console.error("\n  Admonitions that will render as literal text:\n");
  for (const x of findings) {
    console.error(`    ${x.f}:${x.line}`);
    console.error(`      ${x.text}`);
    console.error(`      fix: :::${x.type}[${x.text.slice(3 + x.type.length).trim()}]\n`);
  }
  console.error(`  ${findings.length} broken admonition(s). MDX 3 needs :::type[Title].\n`);
  process.exit(1);
}
