#!/usr/bin/env node
// Internal link gate. Runs in prebuild, beside check-admonitions.
//
// WHY THIS EXISTS RATHER THAN TRUSTING onBrokenLinks.
// The config says `onBrokenLinks: 'throw'`. It does not fire. Measured on
// Docusaurus 3.10.1: a plainly dead `[x](/concepts/not-a-real-page)` in ordinary
// prose built clean, exit 0, with no mention of links anywhere in the build log,
// and the dead href present in the emitted HTML. Toggling `future.faster` off did
// not restore it either.
//
// A declared gate that never runs is worse than no gate. It is read as protection,
// so nobody checks by hand, and a dead link ships wearing a green build. That is
// exactly how a renamed concept page left a dead link in the decision log tonight
// and passed.
//
// So this does not depend on framework behaviour. It reads the files and resolves
// the links itself.
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, resolve, dirname, relative } from "path";

const ROOT = resolve(process.argv[2] || ".");
const DOCS = join(ROOT, "docs");
const STATIC = join(ROOT, "static");

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.mdx?$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = walk(DOCS);
if (!files.length) { console.log("check-links: no docs/ to check"); process.exit(0); }

/** Every route a doc can be reached at: its explicit slug, and its path-derived route. */
const routes = new Set(["/"]);
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const m = /^---\n([\s\S]*?)\n---/.exec(src);
  const slug = m && /^slug:\s*(.+)$/m.exec(m[1])?.[1]?.trim().replace(/^["']|["']$/g, "");
  if (slug) routes.add(slug.replace(/\/$/, "") || "/");
  // Path-derived route, which stays valid even when a slug is declared.
  let rel = "/" + relative(DOCS, f).replace(/\.mdx?$/, "").replace(/\\/g, "/");
  rel = rel.replace(/\/index$/, "") || "/";
  routes.add(rel);
}

/** A static asset that really is on disk. */
const isAsset = (p) => existsSync(join(STATIC, p.replace(/^\//, "")));

const problems = [];
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  let fenced = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) { fenced = !fenced; return; }
    if (fenced) return;   // a link inside a code fence is an example, not a link
    for (const m of line.matchAll(/\[[^\]]*\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g)) {
      const target = m[1].replace(/\/$/, "") || "/";
      if (routes.has(target) || isAsset(target)) continue;
      // Ignore anything the site serves outside docs (blog, custom pages) by
      // convention: only flag paths that look like doc routes.
      problems.push({ file: relative(ROOT, f), line: i + 1, target });
    }
  });
}

if (!problems.length) {
  console.log(`check-links: ${files.length} files, ${routes.size} routes, no broken internal links`);
  process.exit(0);
}
console.error(`\ncheck-links: ${problems.length} broken internal link(s)\n`);
for (const p of problems) console.error(`  ${p.file}:${p.line}  ->  ${p.target}`);
console.error(`\nEvery one of these renders as a link and 404s. Fix the target or the link.`);
console.error(`(Docusaurus' own onBrokenLinks does not fire in this setup, which is why`);
console.error(` this check exists. See the header of scripts/check-links.mjs.)\n`);
process.exit(1);
