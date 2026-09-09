#!/usr/bin/env node
// Mutation tests for the provenance gate.
//
// A gate that has only ever passed cannot be told apart from a gate that cannot fail, and this
// one guards something nobody can audit by looking, so it is the worst possible place for a
// check that quietly does nothing. Every rule gets broken on purpose here.
//
// The two DIALECT cases are the ones that earned this file. The first version of the checker
// invented a schema and failed 72 correct recipes across two real wikis; the fix was to accept
// what the adapters actually emit. Without a test pinning both dialects, the next tidy-up
// reintroduces exactly that.
//
//   node scripts/test-image-provenance.mjs
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const CHECK = join(HERE, "check-image-provenance.mjs");

let pass = 0, fail = 0;
const t = (name, fn) => {
  try { fn(); console.log(`  ok   ${name}`); pass++; }
  catch (e) { console.log(`  FAIL ${name}\n       ${e.message}`); fail++; }
};

/** A throwaway wiki. `files` maps a relative path to bytes or an object (written as JSON). */
function wiki(files) {
  const root = mkdtempSync(join(tmpdir(), "img-prov-"));
  for (const [rel, body] of Object.entries(files)) {
    const p = join(root, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, typeof body === "string" ? body : JSON.stringify(body, null, 2));
  }
  return root;
}
const run = (root, args = []) => {
  const r = spawnSync("node", [CHECK, root, ...args], { encoding: "utf8" });
  return { code: r.status, out: r.stdout + r.stderr };
};
const PNG = "\x89PNG\r\n\x1a\n";

// The two dialects that exist in the wild, both correct, both must pass.
const ABU_DIALECT = {
  provider: "gpt-image-2", model: "gpt-image-2", prompt: "a warm editorial strip",
  refs: [{ path: "/refs/style.png" }], timestamp: "2026-08-08T17:09:23Z", sha256: "abc",
};
const SCRIPT_DIALECT = {
  asset: "static/img/hero.png", model: "gpt-image-2", prompt: "an editorial illustration",
  inputs: ["/refs/gary/master.png"], generatedAt: "2026-08-09T20:28:54+00:00",
  generator: "chatgpt-images/scripts/generate_image.py",
};

t("the ABU adapter dialect (refs + timestamp, no asset field) passes", () => {
  const root = wiki({ "static/img/hero.png": PNG, "static/img/hero.png.recipe.json": ABU_DIALECT });
  const r = run(root);
  if (r.code !== 0) throw new Error(`a correct recipe was refused:\n${r.out}`);
  rmSync(root, { recursive: true, force: true });
});

t("the generate_image dialect (inputs + generatedAt + asset) passes", () => {
  const root = wiki({ "static/img/hero.png": PNG, "static/img/hero.png.recipe.json": SCRIPT_DIALECT });
  const r = run(root);
  if (r.code !== 0) throw new Error(`a correct recipe was refused:\n${r.out}`);
  rmSync(root, { recursive: true, force: true });
});

t("an image with NO recipe is refused", () => {
  const root = wiki({ "static/img/hero.png": PNG });
  const r = run(root);
  if (r.code === 0) throw new Error("an undocumented image passed, which is the whole bug");
  if (!/MISSING/.test(r.out)) throw new Error(`no MISSING line: ${r.out}`);
  rmSync(root, { recursive: true, force: true });
});

t("an empty recipe is refused, so a stub cannot launder an image past the gate", () => {
  const root = wiki({ "static/img/hero.png": PNG, "static/img/hero.png.recipe.json": {} });
  const r = run(root);
  if (r.code === 0) throw new Error("`{}` counted as provenance");
  if (!/no .model. or .provider./.test(r.out)) throw new Error(`did not say what was missing: ${r.out}`);
  rmSync(root, { recursive: true, force: true });
});

t("a recipe with no prompt is refused", () => {
  const root = wiki({
    "static/img/hero.png": PNG,
    "static/img/hero.png.recipe.json": { ...ABU_DIALECT, prompt: "" },
  });
  if (run(root).code === 0) throw new Error("a recipe naming no prompt passed");
  rmSync(root, { recursive: true, force: true });
});

t("a recipe copied onto a DIFFERENT image is caught", () => {
  // The defect ABU names by name: a hand-copied sidecar claiming an asset it does not sit
  // beside. Found in the wild in agenticart, where one claimed style-ref-01 and its neighbour
  // claimed style-ref-03.
  const root = wiki({
    "static/img/hero.png": PNG,
    "static/img/hero.png.recipe.json": { ...SCRIPT_DIALECT, asset: "static/img/something-else.png" },
  });
  const r = run(root);
  if (r.code === 0) throw new Error("a recipe for a different image passed");
  if (!/claims asset/.test(r.out)) throw new Error(`did not name the mismatch: ${r.out}`);
  rmSync(root, { recursive: true, force: true });
});

t("a recipe left naming the pre-conversion extension is caught", () => {
  // The converter bug: optimize-images.py renamed foo.png.recipe.json to foo.webp.recipe.json
  // and never touched its contents, so the record pointed at a file it had just deleted. Four
  // of these were shipping across two wikis.
  const root = wiki({
    "static/img/hero.webp": PNG,
    "static/img/hero.webp.recipe.json": { ...SCRIPT_DIALECT, asset: "static/img/hero.png" },
  });
  if (run(root).code === 0) throw new Error("a recipe naming the deleted .png passed");
  rmSync(root, { recursive: true, force: true });
});

t("a derive recipe passes when it names its source and its tool", () => {
  const root = wiki({
    "static/img/cover.webp": PNG,
    "static/img/cover.webp.recipe.json": {
      mode: "derive", generator: "conform_cover.py", model: null, prompt: null,
      derivedFrom: { path: "static/img/cover-raw.png", sha256: "def" }, generatedAt: "2026-09-01T00:00:00Z",
    },
  });
  const r = run(root);
  if (r.code !== 0) throw new Error(`a valid derive recipe was refused:\n${r.out}`);
  rmSync(root, { recursive: true, force: true });
});

t("a derive recipe with no derivedFrom is refused", () => {
  const root = wiki({
    "static/img/cover.webp": PNG,
    "static/img/cover.webp.recipe.json": { mode: "derive", generator: "x.py", generatedAt: "2026-09-01T00:00:00Z" },
  });
  if (run(root).code === 0) throw new Error("a derive recipe naming no source passed");
  rmSync(root, { recursive: true, force: true });
});

t("a deterministic generator recipe passes on generator + seed", () => {
  const root = wiki({
    "static/img/mark.png": PNG,
    "static/img/mark.png.recipe.json": {
      generator: "generators/mark/render.py", params: { size: 512 }, seed: 7, generatedAt: "2026-09-01T00:00:00Z",
    },
  });
  const r = run(root);
  if (r.code !== 0) throw new Error(`a valid generator recipe was refused:\n${r.out}`);
  rmSync(root, { recursive: true, force: true });
});

t("a generator recipe with neither seed nor params is refused as unreproducible", () => {
  const root = wiki({
    "static/img/mark.png": PNG,
    "static/img/mark.png.recipe.json": { generator: "render.py", generatedAt: "2026-09-01T00:00:00Z" },
  });
  if (run(root).code === 0) throw new Error("an unreproducible generator recipe passed");
  rmSync(root, { recursive: true, force: true });
});

t("icons and share cards are exempt by role, judged on the whole path", () => {
  const root = wiki({
    "static/img/favicon.ico": PNG, "static/img/apple-touch-icon.png": PNG,
    "static/img/social-card.png": PNG, "static/og-deck/share.png": PNG,
  });
  const r = run(root);
  if (r.code !== 0) throw new Error(`build output was treated as art:\n${r.out}`);
  rmSync(root, { recursive: true, force: true });
});

t("a baselined image with no recipe is debt rather than a failure", () => {
  const root = wiki({
    "static/img/old.png": PNG,
    "scripts/image-provenance-baseline.json": { baseline: ["static/img/old.png"] },
  });
  const r = run(root);
  if (r.code !== 0) throw new Error(`the baseline did not hold the build open:\n${r.out}`);
  if (!/1 pre-gate/.test(r.out)) throw new Error(`the debt was not reported: ${r.out}`);
  rmSync(root, { recursive: true, force: true });
});

t("the baseline excuses an ABSENT recipe and never a broken one", () => {
  // Otherwise the cheapest way past the gate is a worthless file, and the backlog gets
  // "resolved" by writing `{}` next to every image.
  const root = wiki({
    "static/img/old.png": PNG,
    "static/img/old.png.recipe.json": {},
    "scripts/image-provenance-baseline.json": { baseline: ["static/img/old.png"] },
  });
  if (run(root).code === 0) throw new Error("a baselined image laundered a stub recipe past the gate");
  rmSync(root, { recursive: true, force: true });
});

t("a NEW image is refused even when the baseline is populated", () => {
  const root = wiki({
    "static/img/old.png": PNG, "static/img/new.png": PNG,
    "scripts/image-provenance-baseline.json": { baseline: ["static/img/old.png"] },
  });
  const r = run(root);
  if (r.code === 0) throw new Error("the ratchet let a new undocumented image through");
  if (!/static\/img\/new\.png/.test(r.out)) throw new Error(`did not name the new image: ${r.out}`);
  if (/MISSING   static\/img\/old\.png/.test(r.out)) throw new Error("reported baselined debt as a failure");
  rmSync(root, { recursive: true, force: true });
});

t("--accept baselines what is there and the check then passes", () => {
  const root = wiki({ "static/img/a.png": PNG, "static/img/b.png": PNG });
  if (run(root).code === 0) throw new Error("fixture was supposed to start failing");
  const acc = run(root, ["--accept"]);
  if (acc.code !== 0) throw new Error(`--accept failed: ${acc.out}`);
  const written = JSON.parse(readFileSync(join(root, "scripts/image-provenance-baseline.json"), "utf8"));
  if (written.baseline.length !== 2) throw new Error(`baselined ${written.baseline.length}, expected 2`);
  if (run(root).code !== 0) throw new Error("still failing after adoption");
  rmSync(root, { recursive: true, force: true });
});

t("--accept DROPS an entry once its image has a real recipe", () => {
  // The ratchet only means anything if the list shrinks on its own when the debt is paid.
  const root = wiki({
    "static/img/a.png": PNG, "static/img/a.png.recipe.json": ABU_DIALECT,
    "scripts/image-provenance-baseline.json": { baseline: ["static/img/a.png"] },
  });
  run(root, ["--accept"]);
  const written = JSON.parse(readFileSync(join(root, "scripts/image-provenance-baseline.json"), "utf8"));
  if (written.baseline.length !== 0) throw new Error(`baseline kept ${written.baseline.length} paid-off entries`);
  rmSync(root, { recursive: true, force: true });
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
