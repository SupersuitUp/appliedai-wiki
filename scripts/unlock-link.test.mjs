// The decision tree for "is this link sendable", with no network.
//
// Most of these assert on a REFUSAL, because handing back a gated url as though it were a page
// is the failure the whole script exists to prevent. The cookie-redirect case is here because
// an earlier version of this logic, in a sibling tool, reported a perfectly good password as
// rotated: `fetch` follows a cookie-setting 302 without a cookie jar, lands back on the gate,
// and reads 401. It was wrong in the direction that looks like diligence.

import { test } from "node:test";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import {
  decide, opens, candidateUrl, withSlug, existingSlugFor,
  shareMechanism, mintFocusedLink,
  OPEN, UNLOCKED, BLOCKED, MINTABLE,
} from "./unlock-link.mjs";

const PAGE = "https://example.wiki/concepts/thing";
const KEYED = "https://example.wiki/concepts/thing?key=pw";
const ok = { status: 200, setsCookie: false };
const shut = { status: 401, setsCookie: false };
const cookieRedirect = { status: 302, setsCookie: true };
const bareRedirect = { status: 302, setsCookie: false };
const none = { status: 0, setsCookie: false };

test("an open page is returned bare, with nothing appended", () => {
  const r = decide(PAGE, { param: "key", password: "pw" }, { bare: ok, keyed: none });
  assert.equal(r.outcome, OPEN);
  assert.equal(r.url, PAGE, "an already-open url must not grow a ?key=");
});

test("a BARE url that cookie-redirects is open, and is sent unchanged", () => {
  // The gate redirects an already-authorized visitor to the canonical page, so the bare probe
  // can be a cookie-setting 3xx too. Reading only 200 here appends a ?key= to a url that
  // already worked, which leaks the password into a link that did not need it.
  const r = decide(PAGE, { param: "key", password: "pw" },
    { bare: cookieRedirect, keyed: none });
  assert.equal(r.outcome, OPEN);
  assert.equal(r.url, PAGE, "no parameter is appended to a url that already opens");
});

test("a gated page with a working password comes back unlocked", () => {
  const r = decide(PAGE, { param: "key", password: "pw" }, { bare: shut, keyed: ok });
  assert.equal(r.outcome, UNLOCKED);
  assert.equal(r.url, KEYED);
});

test("a cookie-setting redirect counts as open, because a browser carries the cookie", () => {
  const r = decide(PAGE, { param: "key", password: "pw" }, { bare: shut, keyed: cookieRedirect });
  assert.equal(r.outcome, UNLOCKED);
  assert.equal(r.url, KEYED);
});

test("a redirect that sets no cookie is still a closed door", () => {
  const r = decide(PAGE, { param: "key", password: "pw" }, { bare: shut, keyed: bareRedirect });
  assert.equal(r.outcome, BLOCKED);
  assert.equal(r.url, null);
});

test("no password available is BLOCKED, and never falls back to the bare url", () => {
  const r = decide(PAGE, { param: "key", password: "" }, { bare: shut, keyed: none });
  assert.equal(r.outcome, BLOCKED);
  assert.equal(r.url, null);
  assert.match(r.why, /no password is available/);
  assert.match(r.ask, /SENSITIVE/, "it must warn that a sensitive var cannot be read at all");
});

test("a wiki with no unlock parameter is BLOCKED and says why", () => {
  const r = decide(PAGE, { param: null, password: "pw" }, { bare: shut, keyed: none });
  assert.equal(r.outcome, BLOCKED);
  assert.match(r.why, /no unlock parameter/);
});

test("a rotated password is BLOCKED rather than sent hopefully", () => {
  const r = decide(PAGE, { param: "key", password: "pw" }, { bare: shut, keyed: shut });
  assert.equal(r.outcome, BLOCKED);
  assert.equal(r.url, null);
  assert.match(r.why, /rotated/);
});

test("a plain canonicalization redirect is NOT a gate", () => {
  // The false negative that nearly shipped. Most of these wikis 307/308 from the apex to
  // `www`, which is canonicalization; a first cut refused every cookie-less redirect and
  // therefore reported getfreedom.wiki and supersuit.wiki as locked. The real probe follows
  // redirects carrying cookies, so by the time decide() sees it, that walk has ended in a 200.
  const r = decide(PAGE, { param: "key", password: "pw" }, { bare: ok, keyed: none });
  assert.equal(r.outcome, OPEN, "a followed redirect ending in 200 is an open page");
  assert.equal(r.url, PAGE);
});

test("opens() is exact about what counts", () => {
  assert.equal(opens({ status: 200 }), true);
  assert.equal(opens({ status: 302, setsCookie: true }), true);
  assert.equal(opens({ status: 303, setsCookie: true }), true, "the template documents a 303");
  assert.equal(opens({ status: 302, setsCookie: false }), false);
  assert.equal(opens({ status: 401, setsCookie: true }), false, "a cookie on a 401 is not entry");
  assert.equal(opens({ status: 0 }), false, "a network failure is not an open page");
});

test("candidateUrl builds a WELL-FORMED url and keeps an existing query", () => {
  // Substring matching passes for a naive `${url}?${k}=${v}` concat, because the result still
  // contains both parameters. Parse it: a second literal `?` makes one malformed parameter and
  // the link fails on somebody's phone.
  const out = candidateUrl("https://example.wiki/x?tab=two", "key", "pw");
  assert.equal((out.match(/\?/g) ?? []).length, 1, "exactly one query separator");
  const u = new URL(out);
  assert.equal(u.searchParams.get("tab"), "two");
  assert.equal(u.searchParams.get("key"), "pw");
});

test("candidateUrl refuses rather than returning something unusable", () => {
  assert.equal(candidateUrl(PAGE, null, "pw"), null);
  assert.equal(candidateUrl(PAGE, "key", ""), null);
});

// ── the share-view path ──────────────────────────────────────────────────────────────────
//
// WRITTEN AFTER A REAL WRONG ANSWER. Asked for a sendable link to a page on a gated wiki, this
// CLI returned BLOCKED with "no unlock parameter", and an agent relayed that to the operator as
// "I cannot send you a link". Both were wrong in the same way: that wiki serves any page at an
// unguessable /s/<slug> address from a COMMITTED slug list, which needs no password at all,
// because it is a code change rather than a credential. The capability existed and the tool that
// exists to answer this question did not know about it.
//
// So a wiki with a share mechanism must never be told a link is impossible.

const shares = { kind: "committed-slug", prefix: "/s/", file: "src/auth/shareRoutes.ts" };

test("a gated wiki with a share mechanism is MINTABLE, never BLOCKED", () => {
  const r = decide(PAGE, { param: null, password: null, share: shares }, { bare: shut });
  assert.equal(r.outcome, MINTABLE, r.why);
  assert.equal(r.url, null, "no url yet: the slug does not exist until it is minted and deployed");
});

test("the mintable result says the file, the prefix, and that no secret is needed", () => {
  // The operator's next action has to be in the output. "Cannot open" plus a shrug is what sent
  // somebody to the registry to guess.
  const r = decide(PAGE, { param: null, password: null, share: shares }, { bare: shut });
  assert.match(r.ask, /shareRoutes\.ts/);
  assert.match(r.ask, /--mint/);
  assert.match(r.why + r.ask, /no (secret|password)/i);
});

test("a mintable wiki still prefers a plainly OPEN page", () => {
  // The share address is for pages behind the gate. A page that already opens is just sent.
  const r = decide(PAGE, { param: null, password: null, share: shares }, { bare: ok });
  assert.equal(r.outcome, OPEN);
  assert.equal(r.url, PAGE);
});

test("a mintable wiki still prefers a working unlock parameter over minting", () => {
  // Minting is a commit and a deploy. A query-string link that works costs nothing, so a wiki
  // with both takes the cheap one.
  const r = decide(PAGE, { param: "key", password: "pw", share: shares }, { bare: shut, keyed: ok });
  assert.equal(r.outcome, UNLOCKED);
  assert.equal(r.url, KEYED);
});

test("a rotated password on a mintable wiki falls through to minting, not to a dead end", () => {
  // The case that actually strands somebody: the password is stale AND the wiki can serve the
  // page anyway. Before this it reported the rotation and stopped.
  const r = decide(PAGE, { param: "key", password: "old", share: shares }, { bare: shut, keyed: shut });
  assert.equal(r.outcome, MINTABLE);
});

test("no share mechanism is still BLOCKED, and that is correct", () => {
  // Most wikis have no share-view. Reporting a mintable link on those would be inventing a
  // capability, which is worse than the dead end this replaces.
  const r = decide(PAGE, { param: null, password: null, share: null }, { bare: shut });
  assert.equal(r.outcome, BLOCKED);
});

test("a slug is inserted into the real shareRoutes shape, and existing entries survive", () => {
  const before = `export const SHARES: Record<string, string> = {
  // a comment that must survive
  'aaaabbbbccccdddd': '/reference/system-architecture',
};`;
  const after = withSlug(before, "0123456789abcdef", "/concepts/thing", "2026-09-10");
  assert.match(after, /'0123456789abcdef': '\/concepts\/thing'/);
  assert.match(after, /'aaaabbbbccccdddd'/, "clobbered an existing share");
  assert.match(after, /a comment that must survive/);
  assert.match(after, /2026-09-10/, "a minted slug with no date is one nobody can ever retire");
});

test("minting refuses a route that already has a slug", () => {
  // Two slugs for one page means revoking the link you remember and leaving the other live.
  const before = `export const SHARES: Record<string, string> = {
  'aaaabbbbccccdddd': '/concepts/thing',
};`;
  assert.equal(existingSlugFor(before, "/concepts/thing"), "aaaabbbbccccdddd");
  assert.equal(existingSlugFor(before, "/concepts/other"), null);
});

test("shareMechanism detects the file, and claims nothing when it is absent", () => {
  // The detector, exercised directly. Every test above INJECTS `share`, so a mutation that
  // claimed the mechanism existed on every wiki in the family survived the whole suite: the
  // function that makes that call was never run. A detector with no test is decoration.
  const root = mkdtempSync(join(tmpdir(), "unlock-share-"));
  assert.equal(shareMechanism(root), null, "claimed a share mechanism in an empty repo");

  mkdirSync(join(root, "src", "auth"), { recursive: true });
  writeFileSync(join(root, "src", "auth", "shareRoutes.ts"), "export const SHARES = {};");
  const found = shareMechanism(root);
  assert.equal(found.kind, "committed-slug");
  assert.equal(found.prefix, "/s/");
  assert.match(found.path, /shareRoutes\.ts$/);
});

test("a wiki with the signed-route share is detected ahead of the slug file", () => {
  const root = mkdtempSync(join(tmpdir(), "wiki-"));
  mkdirSync(join(root, "src", "share"), { recursive: true });
  writeFileSync(join(root, "src", "share", "handleShare.ts"), "export {}");
  const m = shareMechanism(root);
  assert.equal(m.kind, "signed-route");
  assert.equal(m.mint, "/s/mint");
});

test("a keyed page on a signed-route wiki is still UNLOCKED by decide; the focused link is minted after", () => {
  const share = { kind: "signed-route", prefix: "/s/", mint: "/s/mint", file: "src/share/handleShare.ts" };
  const r = decide(PAGE, { param: "key", password: "pw", share }, { bare: shut, keyed: cookieRedirect });
  assert.equal(r.outcome, UNLOCKED);
  assert.equal(r.url, KEYED);
});

test("a signed-route wiki with no password is MINTABLE, and the ask names the password rather than a commit", () => {
  const share = { kind: "signed-route", prefix: "/s/", mint: "/s/mint", file: "src/share/handleShare.ts" };
  const r = decide(PAGE, { param: "key", password: "", share }, { bare: shut, keyed: none });
  assert.equal(r.outcome, MINTABLE);
  assert.match(r.ask, /password/);
  assert.doesNotMatch(r.ask, /commit/);
});

test("mintFocusedLink hands back the edge's url with the cookie it was given, and never throws", async () => {
  const seen = [];
  const ok = async (url, init) => { seen.push([url, init.headers.cookie]); return new Response(JSON.stringify({ url: "https://example.wiki/s/AAAAAAAAAAAAAAAAAAAAAA/concepts/thing", focused: true }), { status: 200 }); };
  const m = await mintFocusedLink("https://example.wiki", "/concepts/thing", "wiki_gate=t", ok);
  assert.equal(m.focused, true);
  assert.match(m.url, /^https:\/\/example\.wiki\/s\/[A-Za-z0-9_-]{22}\/concepts\/thing$/);
  assert.deepEqual(seen, [["https://example.wiki/s/mint?path=%2Fconcepts%2Fthing", "wiki_gate=t"]]);
  const refused = await mintFocusedLink("https://example.wiki", "/concepts/thing", "", async () => new Response("{}", { status: 401 }));
  assert.equal(refused.url, null);
  assert.match(refused.why, /401/);
  const down = await mintFocusedLink("https://example.wiki", "/concepts/thing", "", async () => { throw new Error("ECONNRESET"); });
  assert.equal(down.url, null);
});
