#!/usr/bin/env node
// Provenance gate. Runs in prebuild, beside check-image-weight, check-admonitions, check-links.
//
// THE CONTRACT, and it is the Agentic Brand Universe contract rather than a wiki-local one:
// no asset without its recipe. Every generated image carries a `<asset>.recipe.json` sidecar
// naming the model, the exact prompt, and every input by path. ABU SPEC §3.2 states the three
// honest ways to get one, and hand-writing is not among them: the provider adapter writes one
// when it GENERATES, `import-asset` writes one when it COPIES an asset in from outside, and a
// deterministic transform writes one when it DERIVES.
//
// WHY A WIKI NEEDS THIS. An illustration on a wiki is the one artifact nobody can audit by
// looking. Six months later the questions are: which model made this, what was it actually
// asked, which reference images were passed, and can it be made again. Without a sidecar every
// answer is "ask whoever ran it", and that person is a chat window that has since been cleared.
// The picture still renders, so nothing ever reports the loss. Same invisible-failure shape as
// the weight gate next door, and the same reason it has to be a gate rather than a convention.
//
// WHY IT IS A RATCHET AND NOT A WALL. Measured across the fleet on 2026-09-08: 2,387 images,
// 327 carrying a recipe. A gate that simply failed would have broken 27 of 28 wikis' deploys
// on the day it shipped, and the honest response to that is not to weaken the rule but to
// record the debt. So:
//
//   NEW images must carry provenance.       <- the gate, binding from today
//   PRE-EXISTING images are baselined.      <- listed by path, so the backlog is visible
//   The baseline may only SHRINK.           <- delete an entry, never add one by hand
//
// `--accept` rewrites the baseline from what is on disk and prints the delta. It is the escape
// hatch, it is loud, and it is the thing to reach for when adopting the gate in a wiki that
// already has images. Running it to silence a NEW image is the one misuse, and it shows up in
// the diff as a baseline that grew.
//
// A BASELINED IMAGE IS STILL CHECKED IF IT HAS A RECIPE. Being in the baseline excuses the
// absence of a sidecar and never a broken one, so a stub that says `{}` fails exactly as loudly
// as it would on a new image. Otherwise the cheapest way past this gate would be to write a
// worthless file, which is the failure mode the ABU rule about hand-writing exists to prevent.
//
//   node scripts/check-image-provenance.mjs            # check, exit 1 on a violation
//   node scripts/check-image-provenance.mjs --accept   # rebaseline, print the delta
//   node scripts/check-image-provenance.mjs --json     # machine-readable summary
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "fs";
import { join, resolve, relative, dirname } from "path";

const args = process.argv.slice(2);
const ROOT = resolve(args.find((a) => !a.startsWith("--")) || ".");
const ACCEPT = args.includes("--accept");
const JSON_OUT = args.includes("--json");

const BASELINE_FILE = join(ROOT, "scripts", "image-provenance-baseline.json");
const IMAGE_EXT = /\.(webp|png|jpe?g|gif|avif)$/i;
const SKIP_DIRS = new Set(["node_modules", ".git", "build", ".docusaurus", ".next", ".vercel", "coverage"]);

// EXEMPT BY ROLE, not by convenience. These are files a BUILD produces from other files in the
// repo, so their provenance is the build and re-running it reproduces them byte for byte. The
// judgement is on the whole path rather than the filename, for the reason the weight gate
// learned the hard way: a share card at static/og-deck/share.png is a card wherever it sits.
//
// The honest end-state is narrower than this. `build-icons.py` is a deterministic generator and
// ABU §4.13 says a generator writes `generator` + `params` + `seed` + input hashes exactly as an
// adapter writes `model` + `prompt` + `refs`. When that lands, the ICON rule below should go and
// the icons should carry real sidecars. It is exempt today because the generator does not write
// them yet, and pretending otherwise would make the gate a liar on its first run.
const ICON_NAME = /^(favicon|apple-touch-icon|android-chrome|mstile|safari-pinned|icon)[-.]/i;
const CARD_STEM = /^(share|card|og|og-image|social-card|share-card)$|(-social-card|-share-card|-og-image)$/i;
const CARD_DIR = /^(og|share|social)(-.*)?$/i;

export function roleExempt(relPath) {
  const parts = relPath.split("/");
  const name = parts[parts.length - 1];
  const stem = name.replace(/\.[^.]+$/, "");
  return ICON_NAME.test(name) || CARD_STEM.test(stem) || parts.slice(0, -1).some((d) => CARD_DIR.test(d));
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name) && !e.name.startsWith(".")) walk(join(dir, e.name), out);
    } else if (IMAGE_EXT.test(e.name)) out.push(join(dir, e.name));
  }
  return out;
}

/**
 * What a recipe has to say to count as one.
 *
 * Three shapes are legal, matching ABU's three honest origins, and each is required to carry
 * the fields that make its own claim checkable. The point of validating rather than merely
 * existing: an empty object beside an image is worse than no file, because it reports the
 * asset as documented while answering none of the questions a sidecar exists to answer.
 */
export function validateRecipe(recipe, relAsset) {
  const problems = [];
  const has = (k) => recipe[k] !== undefined && recipe[k] !== null && recipe[k] !== "";
  // TWO DIALECTS, BOTH REAL, AND THE GATE ACCEPTS EITHER. The first version of this function
  // invented a schema and then failed 72 correct recipes across two wikis with it. What the
  // adapters actually emit:
  //
  //   ABU image adapter      provider/model · prompt · refs[{path}] · timestamp · sha256
  //   chatgpt-images script  model · prompt · inputs[path] · generatedAt · asset · generator
  //
  // So the fields are checked by what they MEAN rather than by name. Normalising the two into
  // one dialect is worth doing at the emitters; doing it here, by refusing one of them, would
  // just mean the gate is wrong about half the fleet.
  const first = (...keys) => keys.find((k) => has(k));
  const inputsKey = ["refs", "inputs"].find((k) => recipe[k] !== undefined);

  // `asset` is OPTIONAL, because the sidecar's own filename already names what it describes.
  // When it IS present it has to agree, and a mismatch is the one defect that proves a recipe
  // was copied rather than written by the thing that made the file. ABU hit exactly this: a
  // hand-copied cover recipe claimed `.../cover-raw.png` while sitting beside `cover.png`.
  if (has("asset")) {
    const claimed = String(recipe.asset).replace(/^\.\//, "");
    const actual = relAsset.replace(/^\.\//, "");
    const claimedName = claimed.split("/").pop();
    const actualName = actual.split("/").pop();
    if (claimedName !== actualName) {
      problems.push(`claims asset "${recipe.asset}" but sits beside "${relAsset}"`);
    }
  }

  const mode = recipe.mode ?? (recipe.derivedFrom ? "derive" : null);

  if (mode === "derive") {
    // A transform ran and no model did. It must name what it came from, or the chain back to a
    // generation is broken and the sidecar documents nothing.
    if (!has("derivedFrom")) problems.push('mode "derive" with no `derivedFrom` naming the source');
    if (!has("generator")) problems.push('mode "derive" with no `generator` naming what transformed it');
  } else if (!first("model", "provider") && (has("params") || has("seed") || has("generator"))) {
    // A deterministic generator DREW it. Reproducibility is the claim, so the seed and the
    // parameters are what a reader needs and a prompt would be a fiction.
    if (!has("generator")) problems.push("a generated asset with no `generator`");
    if (!has("seed") && !has("params")) problems.push("a generator recipe with neither `seed` nor `params`, so nothing about it is reproducible");
  } else {
    // A model made it. These three are the point of the file.
    if (!first("model", "provider")) problems.push("no `model` or `provider`");
    if (!has("prompt")) problems.push("no `prompt` (the EXACT prompt, not a summary)");
    if (inputsKey === undefined) {
      problems.push("no `refs`/`inputs` list (use [] when nothing was passed in)");
    } else if (!Array.isArray(recipe[inputsKey])) {
      problems.push(`\`${inputsKey}\` is not a list`);
    }
  }

  if (!first("timestamp", "generatedAt", "created")) problems.push("no timestamp (`timestamp`, `generatedAt` or `created`)");
  return problems;
}

const images = walk(ROOT).map((p) => relative(ROOT, p).split("\\").join("/")).sort();
const baseline = existsSync(BASELINE_FILE)
  ? new Set(JSON.parse(readFileSync(BASELINE_FILE, "utf8")).baseline ?? [])
  : new Set();

const missing = [];   // no sidecar, not baselined, not exempt  -> a violation
const invalid = [];   // a sidecar that does not say enough      -> a violation, baselined or not
const debt = [];      // no sidecar, but baselined               -> reported, not fatal
const covered = [];

for (const rel of images) {
  if (roleExempt(rel)) continue;
  const sidecar = join(ROOT, `${rel}.recipe.json`);
  if (!existsSync(sidecar)) {
    (baseline.has(rel) ? debt : missing).push(rel);
    continue;
  }
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(sidecar, "utf8"));
  } catch (e) {
    invalid.push([rel, [`recipe is not valid JSON: ${e.message}`]]);
    continue;
  }
  const problems = validateRecipe(parsed, rel);
  if (problems.length) invalid.push([rel, problems]);
  else covered.push(rel);
}

if (ACCEPT) {
  const next = [...debt, ...missing].sort();
  const added = missing.length;
  const dropped = [...baseline].filter((b) => !next.includes(b)).length;
  // The very first `--accept` in a wiki is exactly the case where scripts/ may not exist yet,
  // and writeFileSync into a missing directory throws a raw ENOENT stack at the one moment a
  // person is adopting the gate. Caught by the test suite rather than by an operator.
  mkdirSync(dirname(BASELINE_FILE), { recursive: true });
  writeFileSync(BASELINE_FILE, JSON.stringify({
    _comment: "Images that predate the provenance gate. This list may only SHRINK: give an image a real .recipe.json and delete its line. Anything NOT in here must carry provenance or the build fails. Regenerate with `node scripts/check-image-provenance.mjs --accept`, and treat a diff that ADDS a line as the thing to explain in review.",
    baseline: next,
  }, null, 2) + "\n");
  console.log(`provenance baseline: ${next.length} image(s) (+${added} accepted, -${dropped} resolved)`);
  process.exit(0);
}

const summary = {
  images: images.length,
  covered: covered.length,
  debt: debt.length,
  missing: missing.length,
  invalid: invalid.length,
};

if (JSON_OUT) {
  console.log(JSON.stringify({ ...summary, missingPaths: missing, invalidPaths: invalid }, null, 2));
  process.exit(missing.length || invalid.length ? 1 : 0);
}

console.log(`image provenance: ${covered.length} with a recipe, ${debt.length} pre-gate, ${missing.length + invalid.length} to fix`);

for (const rel of missing) {
  console.log(`  MISSING   ${rel}`);
  console.log(`            no ${rel}.recipe.json. An image that reached this repo without one cannot say`);
  console.log(`            which model made it, what it was asked, or what was passed in. Write it where the`);
  console.log(`            image was MADE (the adapter or generator emits it), never by hand here.`);
}
for (const [rel, problems] of invalid) {
  console.log(`  INVALID   ${rel}.recipe.json`);
  for (const p of problems) console.log(`            ${p}`);
}

if (missing.length || invalid.length) {
  console.log("");
  console.log("Adopting the gate in a wiki that already has images? `--accept` baselines what is");
  console.log("here today. Use it once, at adoption. Using it to clear a NEW image shows up as a");
  console.log("baseline that grew, which is the one thing to look for in the diff.");
  process.exit(1);
}
process.exit(0);
