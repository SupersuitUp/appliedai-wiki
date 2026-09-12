import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { compare, isTemplate, latestTag, newestLedgerVersion, readVersion, templateVerdict } from "./check-template-version.mjs";

test("the newest ledger heading is the LAST one, whatever the numbers say", () => {
  assert.equal(newestLedgerVersion("### → v1.0.0 (a)\n### → v1.1.0 (b)\n"), "v1.1.0");
  assert.equal(newestLedgerVersion("no headings"), null);
});

test("compare orders semver numerically, not lexically", () => {
  assert.ok(compare("v1.10.0", "v1.9.0") > 0);
  assert.equal(compare("v1.1.0", "v1.1.0"), 0);
});

test("readVersion refuses anything that is not vX.Y.Z", () => {
  const d = mkdtempSync(join(tmpdir(), "tv-"));
  assert.equal(readVersion(d), null);
  writeFileSync(join(d, "TEMPLATE-VERSION"), "1.2\n");
  assert.equal(readVersion(d), null);
  writeFileSync(join(d, "TEMPLATE-VERSION"), "v1.2.3\n");
  assert.equal(readVersion(d), "v1.2.3");
});

test("the template's own verdict catches a half-bumped release", () => {
  const d = mkdtempSync(join(tmpdir(), "tv-"));
  mkdirSync(join(d, "scripts"));
  writeFileSync(join(d, "scripts", "bump.sh"), "");
  writeFileSync(join(d, "TEMPLATE-VERSION"), "v1.1.0\n");
  writeFileSync(join(d, "package.json"), JSON.stringify({ version: "1.0.0" }));
  writeFileSync(join(d, "UPGRADE-LEDGER.md"), "### → v1.0.0 (a)\n");
  assert.ok(isTemplate(d));
  const v = templateVerdict(d);
  assert.equal(v.problems.length, 2, v.problems.join("; "));
  writeFileSync(join(d, "package.json"), JSON.stringify({ version: "1.1.0" }));
  writeFileSync(join(d, "UPGRADE-LEDGER.md"), "### → v1.0.0 (a)\n### → v1.1.0 (b)\n");
  assert.deepEqual(templateVerdict(d).problems, []);
});

test("latestTag picks the highest vX.Y.Z tag and answers null rather than throwing", async () => {
  const ok = async () => new Response(JSON.stringify([{ name: "v1.2.0" }, { name: "v1.10.0" }, { name: "junk" }]), { status: 200 });
  assert.equal(await latestTag(ok), "v1.10.0");
  assert.equal(await latestTag(async () => new Response("", { status: 403 })), null);
  assert.equal(await latestTag(async () => { throw new Error("offline"); }), null);
});
