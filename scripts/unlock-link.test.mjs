// The decision tree for "is this link sendable", with no network.
//
// Most of these assert on a REFUSAL, because handing back a gated url as though it were a page
// is the failure the whole script exists to prevent. The cookie-redirect case is here because
// an earlier version of this logic, in a sibling tool, reported a perfectly good password as
// rotated: `fetch` follows a cookie-setting 302 without a cookie jar, lands back on the gate,
// and reads 401. It was wrong in the direction that looks like diligence.

import { test } from "node:test";
import assert from "node:assert/strict";
import { decide, opens, candidateUrl, OPEN, UNLOCKED, BLOCKED } from "./unlock-link.mjs";

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
