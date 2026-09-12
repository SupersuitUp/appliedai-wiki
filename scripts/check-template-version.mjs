#!/usr/bin/env node
// Which wiki-template version is this repo at, and is that the newest one?
//
// Runs in TWO places and answers differently in each:
//   - in the template itself: asserts TEMPLATE-VERSION, package.json and the newest ledger
//     heading all agree, so a release cannot ship half-bumped. Exit 1 on disagreement.
//   - in an INSTANCE (any wiki forked from the template): prints the instance's version, asks
//     GitHub for the template's newest tag, and says whether the instance is behind. An
//     instance with no TEMPLATE-VERSION is "unversioned", which is the honest answer and also
//     the one that should make somebody go and stamp it.
//
//   node scripts/check-template-version.mjs          # human line, exit 1 when behind or broken
//   node scripts/check-template-version.mjs --json   # {role, version, latest, behind}
//   node scripts/check-template-version.mjs --offline  # no network; instance reports its version only
//
// The remote is the template repo's tag list, read through the public API so no token is
// needed. If the network is down the check says so and exits 0: being unable to ask is not
// the same as being behind, and a check that fails a build on a flaky network teaches people
// to delete it.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATE_REPO = "SupersuitUp/wiki-template";
const args = process.argv.slice(2);
const json = args.includes("--json");
const offline = args.includes("--offline");

export function readVersion(root = ROOT) {
  const p = join(root, "TEMPLATE-VERSION");
  if (!existsSync(p)) return null;
  const v = readFileSync(p, "utf8").trim();
  return /^v\d+\.\d+\.\d+$/.test(v) ? v : null;
}

export function newestLedgerVersion(ledgerText) {
  const heads = [...ledgerText.matchAll(/^### → (v\d+\.\d+\.\d+)/gm)].map((m) => m[1]);
  return heads.length ? heads[heads.length - 1] : null;
}

/** Is this checkout the template itself? The ledger and bump script ship only here. */
export function isTemplate(root = ROOT) {
  return existsSync(join(root, "UPGRADE-LEDGER.md")) && existsSync(join(root, "scripts", "bump.sh"));
}

export function compare(a, b) {
  const pa = a.replace(/^v/, "").split(".").map(Number);
  const pb = b.replace(/^v/, "").split(".").map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

export async function latestTag(fetchImpl = fetch) {
  try {
    const r = await fetchImpl(`https://api.github.com/repos/${TEMPLATE_REPO}/tags?per_page=100`, {
      headers: { accept: "application/vnd.github+json", "user-agent": "wiki-template-version-check" },
    });
    if (!r.ok) return null;
    const tags = (await r.json()).map((t) => t.name).filter((n) => /^v\d+\.\d+\.\d+$/.test(n));
    return tags.sort(compare).pop() ?? null;
  } catch {
    return null;
  }
}

export function templateVerdict(root = ROOT) {
  const version = readVersion(root);
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
  const ledger = newestLedgerVersion(readFileSync(join(root, "UPGRADE-LEDGER.md"), "utf8"));
  const problems = [];
  if (!version) problems.push("TEMPLATE-VERSION is missing or not vX.Y.Z");
  if (version && `v${pkg}` !== version) problems.push(`package.json says v${pkg}, TEMPLATE-VERSION says ${version}; run scripts/bump.sh`);
  if (version && ledger !== version) problems.push(`newest ledger heading is ${ledger}, TEMPLATE-VERSION is ${version}; append the ledger entry`);
  return { role: "template", version, ledger, problems };
}

const invokedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invokedDirectly) {
  if (isTemplate()) {
    const v = templateVerdict();
    if (json) console.log(JSON.stringify(v));
    else if (v.problems.length) console.error(`template version broken:\n  ${v.problems.join("\n  ")}`);
    else console.log(`wiki-template ${v.version}, ledger agrees`);
    process.exit(v.problems.length ? 1 : 0);
  }
  const version = readVersion();
  const latest = offline ? null : await latestTag();
  const behind = version && latest ? compare(version, latest) < 0 : null;
  const out = { role: "instance", version, latest, behind };
  if (json) console.log(JSON.stringify(out));
  else if (!version) console.error("unversioned: no TEMPLATE-VERSION here. Check the ledger in the template, stamp the version this repo actually carries.");
  else if (latest === null) console.log(`${version} (template's newest tag not reachable${offline ? ", offline" : ""})`);
  else if (behind) console.error(`${version}, BEHIND template ${latest}. Read UPGRADE-LEDGER.md in the template from your version forward.`);
  else console.log(`${version}, current with template ${latest}`);
  process.exit(!version || behind ? 1 : 0);
}
