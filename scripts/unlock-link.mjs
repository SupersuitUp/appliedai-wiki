#!/usr/bin/env node
// Turn a page on THIS wiki into a link that opens on tap, or refuse and say why.
//
// Ships with every wiki so the wiki itself answers the question. A central registry can only
// REMEMBER how a wiki is gated; the wiki knows. That difference is not academic: a registry
// entry recorded a month ago is a memory of a check, and twelve of them were stale when this
// was written.
//
// The rule it enforces: a gated URL is never an acceptable thing to send. It arrives on
// somebody's phone at a moment they did not choose and asks them to stop and type.
//
//   pnpm share /concepts/some-page
//   node scripts/unlock-link.mjs /concepts/some-page --json
//
// Pure core, injected edges: decide() takes probe results, so the whole decision tree tests
// without a network.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

export const OPEN = "open";
export const UNLOCKED = "unlocked";
export const BLOCKED = "blocked";

/** This wiki's public base url, from wiki.config.json, else the docusaurus config. */
export function siteUrl(root = ROOT) {
  const cfg = join(root, "wiki.config.json");
  if (existsSync(cfg)) {
    const u = JSON.parse(readFileSync(cfg, "utf8")).url;
    if (u) return u.replace(/\/$/, "");
  }
  const ds = join(root, "docusaurus.config.ts");
  if (existsSync(ds)) {
    const m = readFileSync(ds, "utf8").match(/url:\s*['"](https?:\/\/[^'"]+)['"]/);
    if (m) return m[1].replace(/\/$/, "");
  }
  return null;
}

/**
 * Does a probe result mean the page opened?
 *
 * A 200 obviously does. A 3xx that SETS A COOKIE also does, kept as a safety net for a probe
 * that could not follow: the gated convention is "?key=<pw> sets the cookie, then redirects to
 * the clean url", and following that WITHOUT the cookie lands back on the gate and reports 401
 * for a password that is perfectly good.
 *
 * Both halves matter and each one alone is wrong. Plain `fetch(url)` follows redirects with no
 * cookie jar, so it fails the gated case. Refusing every cookie-less redirect fails the OTHER
 * case, which is far more common: most of these wikis 307/308 from the apex to `www`, which is
 * canonicalization and not a gate at all. A first cut of this script called getfreedom.wiki and
 * supersuit.wiki locked because of it. So `follow()` below carries cookies AND follows, which is
 * what a browser does, and this predicate then only has to recognise the end of that walk.
 */
export function opens({ status, setsCookie = false }) {
  if (status === 200) return true;
  return status >= 300 && status < 400 && setsCookie;
}

/** The unlock parameter this wiki uses. `key` is the family convention; a wiki that deviates
 *  declares it in wiki.config.json so this stays one line rather than a fork of this file. */
export function unlockParam(root = ROOT) {
  const cfg = join(root, "wiki.config.json");
  if (existsSync(cfg)) {
    const g = JSON.parse(readFileSync(cfg, "utf8")).gate;
    if (g && typeof g === "object" && g.unlockParam !== undefined) return g.unlockParam;
  }
  return "key";
}

export function candidateUrl(pageUrl, param, password) {
  if (!param || !password) return null;
  const u = new URL(pageUrl);
  u.searchParams.set(param, password);
  return u.toString();
}

/**
 * decide(pageUrl, {param, password}, probes) -> result
 * `probes` is {bare, keyed} of probe results, gathered by the caller.
 */
export function decide(pageUrl, { param, password }, probes) {
  if (opens(probes.bare)) {
    return { outcome: OPEN, url: pageUrl, checked: probes.bare.status };
  }
  const candidate = candidateUrl(pageUrl, param, password);
  if (!candidate) {
    return {
      outcome: BLOCKED, url: null, checked: probes.bare.status,
      why: !param
        ? "this wiki declares no unlock parameter, so a query-string link cannot open it"
        : `the page is ${probes.bare.status} and no password is available to put in ?${param}=`,
      ask: "set WIKI_PASSWORD in this shell, or run `vercel env pull` in this repo first. "
         + "If the variable is marked SENSITIVE on the project, it cannot be read at all and "
         + "the link has to come from a human.",
    };
  }
  if (opens(probes.keyed)) {
    return { outcome: UNLOCKED, url: candidate, checked: probes.keyed.status };
  }
  return {
    outcome: BLOCKED, url: null, checked: probes.keyed.status,
    why: `?${param}= with the available password did not open it (${probes.keyed.status}); it may have been rotated`,
    ask: "confirm the live WIKI_PASSWORD for this project, or get a link from whoever owns it.",
  };
}

const invokedDirectly =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (invokedDirectly) {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const route = args.find((a) => !a.startsWith("--"));
  if (!route) {
    console.error("usage: unlock-link.mjs </route or full url> [--json]");
    process.exit(2);
  }
  const base = siteUrl();
  if (!base && !route.startsWith("http")) {
    console.error("BLOCKED: cannot determine this wiki's url (no wiki.config.json url, none in docusaurus.config.ts)");
    process.exit(1);
  }
  const pageUrl = route.startsWith("http") ? route : `${base}${route.startsWith("/") ? "" : "/"}${route}`;

  // Follow redirects the way a browser does: manually, carrying cookies forward. Neither half
  // is optional; see opens() above for what each one alone gets wrong.
  const follow = async (start, max = 6) => {
    let url = start, jar = "", setsCookie = false;
    for (let i = 0; i <= max; i++) {
      let r;
      try {
        r = await fetch(url, { redirect: "manual", headers: jar ? { cookie: jar } : {} });
      } catch { return { status: 0, setsCookie }; }
      const cookies = r.headers.getSetCookie?.() ?? [];
      if (cookies.length) {
        setsCookie = true;
        const pairs = cookies.map((c) => c.split(";")[0]).filter(Boolean);
        jar = [jar, ...pairs].filter(Boolean).join("; ");
      }
      const loc = r.headers.get("location");
      if (r.status >= 300 && r.status < 400 && loc && i < max) {
        url = new URL(loc, url).toString();
        continue;
      }
      return { status: r.status, setsCookie };
    }
    return { status: 0, setsCookie };
  };
  const probe = follow;

  let password = process.env.WIKI_PASSWORD ?? "";
  if (!password) {
    for (const f of [".env.local", ".env.production.local", ".env"]) {
      const p = join(ROOT, f);
      if (!existsSync(p)) continue;
      const m = readFileSync(p, "utf8").match(/^WIKI_PASSWORD=(.*)$/m);
      if (m) { password = m[1].trim().replace(/^["']|["']$/g, ""); if (password) break; }
    }
  }
  const param = unlockParam();

  const bare = await probe(pageUrl);
  const candidate = candidateUrl(pageUrl, param, password);
  const keyed = candidate ? await probe(candidate) : { status: 0, setsCookie: false };
  const out = decide(pageUrl, { param, password }, { bare, keyed });

  if (json) console.log(JSON.stringify(out, null, 2));
  else if (out.outcome === BLOCKED) {
    console.error(`BLOCKED: ${out.why}`);
    console.error(`  ${out.ask}`);
    console.error(`  Do NOT send the bare url. It is a door, not a page.`);
  } else {
    console.log(out.url);
    console.error(`  ${out.outcome}, verified ${out.checked}`);
  }
  process.exit(out.outcome === BLOCKED ? 1 : 0);
}
