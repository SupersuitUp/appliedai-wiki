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
//   pnpm share /concepts/some-page --mint   # gated wiki with a share mechanism: mint, push, poll
//   node scripts/unlock-link.mjs /concepts/some-page --json
//
// Pure core, injected edges: decide() takes probe results, so the whole decision tree tests
// without a network.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

export const OPEN = "open";
export const UNLOCKED = "unlocked";
export const BLOCKED = "blocked";
/** The page cannot be opened by a query string, and this wiki can still serve it at an
 *  unguessable address once a slug is minted. See shareMechanism() for why that is not the
 *  same thing as being blocked. */
export const MINTABLE = "mintable";

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

/**
 * This wiki's own way of serving ONE page to somebody who cannot get past the gate, or null.
 *
 * WHY THIS EXISTS. Asked for a sendable link to a page on a gated wiki, this tool used to
 * answer BLOCKED, "this wiki declares no unlock parameter", and an agent relayed that to the
 * operator as "I cannot send you a link". Both were wrong the same way: that wiki serves any
 * page at an unguessable `/s/<slug>` address from a COMMITTED slug list, which needs no
 * password at all, because it is a code change rather than a credential. The capability was
 * there and the tool built to answer this exact question did not know about it.
 *
 * Detected from the FILE rather than declared in config, deliberately. A wiki grows this
 * mechanism by adding that file, and a config flag somebody has to remember to set is a flag
 * that is wrong on the instance where it matters. Same reason this file probes the live site
 * instead of trusting a registry.
 */
export function shareMechanism(root = ROOT) {
  const file = join(root, "src", "auth", "shareRoutes.ts");
  if (!existsSync(file)) return null;
  return { kind: "committed-slug", prefix: "/s/", file: "src/auth/shareRoutes.ts", path: file };
}

/** The slug already serving this exact route, or null. Two slugs for one page means revoking
 *  the link you remember and leaving the other one live. */
export function existingSlugFor(source, route) {
  const re = new RegExp(`['"]([0-9a-f]{8,})['"]\\s*:\\s*['"]${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}['"]`);
  const m = source.match(re);
  return m ? m[1] : null;
}

/** `source` with one new slug added to SHARES, dated, and every existing entry untouched. */
export function withSlug(source, slug, route, today) {
  const anchor = "export const SHARES: Record<string, string> = {";
  const i = source.indexOf(anchor);
  if (i === -1) throw new Error("SHARES declaration not found in shareRoutes.ts");
  const at = i + anchor.length;
  return source.slice(0, at)
    + `\n\n  // ${route}. Minted ${today}.\n  '${slug}': '${route}',`
    + source.slice(at);
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
export function decide(pageUrl, { param, password, share = null }, probes) {
  if (opens(probes.bare)) {
    return { outcome: OPEN, url: pageUrl, checked: probes.bare.status };
  }

  // A page that cannot be opened by query string is only a dead end when the wiki has no other
  // way to serve it. Minting is checked AFTER the cheap paths and BEFORE any refusal, because
  // it costs a commit and a deploy where ?key= costs nothing.
  const mintable = (checked, why) => ({
    outcome: MINTABLE, url: null, checked, why,
    ask: `this wiki serves one page at a time at an unguessable ${share.prefix}<slug> address from `
       + `${share.file}, and that needs no password or secret, because it is a code change rather `
       + `than a credential. Run this command again with --mint to add the slug, commit that one `
       + `file, push, and wait for the link to answer.`,
  });

  const candidate = candidateUrl(pageUrl, param, password);
  if (!candidate) {
    const why = !param
      ? "this wiki declares no unlock parameter, so a query-string link cannot open it"
      : `the page is ${probes.bare.status} and no password is available to put in ?${param}=`;
    if (share) return mintable(probes.bare.status, why);
    return {
      outcome: BLOCKED, url: null, checked: probes.bare.status, why,
      ask: "set WIKI_PASSWORD in this shell, or run `vercel env pull` in this repo first. "
         + "If the variable is marked SENSITIVE on the project, it cannot be read at all and "
         + "the link has to come from a human.",
    };
  }
  if (opens(probes.keyed)) {
    return { outcome: UNLOCKED, url: candidate, checked: probes.keyed.status };
  }
  const rotated = `?${param}= with the available password did not open it (${probes.keyed.status}); it may have been rotated`;
  if (share) return mintable(probes.keyed.status, rotated);
  return {
    outcome: BLOCKED, url: null, checked: probes.keyed.status, why: rotated,
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
    console.error("usage: unlock-link.mjs </route or full url> [--json] [--mint]");
    console.error("  --mint: on a gated wiki that serves single pages at /s/<slug>, mint one, push it, and wait for it to answer.");
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
  const share = shareMechanism();

  const bare = await probe(pageUrl);
  const candidate = candidateUrl(pageUrl, param, password);
  const keyed = candidate ? await probe(candidate) : { status: 0, setsCookie: false };
  let out = decide(pageUrl, { param, password, share }, { bare, keyed });

  // --mint is the remedy for MINTABLE, and it is a flag rather than automatic because it
  // commits, pushes and waits on a deploy. Nobody asking for a link expects a push.
  if (out.outcome === MINTABLE && args.includes("--mint")) {
    const route = pageUrl.replace(siteUrl() || "", "") || "/";
    const src = readFileSync(share.path, "utf8");

    const already = existingSlugFor(src, route);
    if (already) {
      // Not an error. The link they are asking for exists, so hand it over.
      const url = `${siteUrl()}${share.prefix}${already}`;
      const p = await probe(url);
      out = opens(p)
        ? { outcome: UNLOCKED, url, checked: p.status, why: "this route already had a share slug" }
        : { outcome: BLOCKED, url: null, checked: p.status,
            why: `this route already has slug ${already} and it does not answer (${p.status}); the last mint may not have deployed`,
            ask: "check the deploy for the commit that added it before minting a second slug for one page." };
    } else {
      const slug = randomBytes(8).toString("hex");
      const today = new Date().toISOString().slice(0, 10);
      writeFileSync(share.path, withSlug(src, slug, route, today));

      // A PATHSPEC ON THE COMMIT, naming the one file. Every wiki here is a shared repo with
      // other sessions writing, and a bare commit takes whatever is staged.
      const git = (cmd) => execFileSync("git", cmd, { cwd: ROOT, encoding: "utf8" }).trim();
      git(["add", share.path]);
      git(["commit", "-m", `Mint a share link for ${route}`, "--", share.path]);
      try {
        git(["push"]);
      } catch (e) {
        console.error(`BLOCKED: the slug is committed and the push failed, so the link cannot work yet.`);
        console.error(`  ${String(e.message).split("\n")[0]}`);
        console.error(`  Pull or land the commit yourself, then re-run without --mint to verify.`);
        process.exit(1);
      }

      // The link IS a deploy, so it 404s until the build lands. Poll rather than promise.
      const url = `${siteUrl()}${share.prefix}${slug}`;
      process.stderr.write(`  minted ${slug}, waiting for the deploy`);
      let p = { status: 0, setsCookie: false };
      for (let i = 0; i < 40; i++) {
        p = await probe(url);
        if (opens(p)) break;
        process.stderr.write(".");
        await new Promise((r) => setTimeout(r, 15000));
      }
      process.stderr.write("\n");
      out = opens(p)
        ? { outcome: UNLOCKED, url, checked: p.status, why: `minted and deployed` }
        : { outcome: BLOCKED, url: null, checked: p.status,
            why: `the slug is committed and pushed but ${url} still answers ${p.status}`,
            ask: "the deploy may still be running or may have failed. Check it, then re-run without --mint to verify." };
    }
  }

  const failed = out.outcome === BLOCKED || out.outcome === MINTABLE;
  if (json) console.log(JSON.stringify(out, null, 2));
  else if (failed) {
    console.error(`${out.outcome === MINTABLE ? "MINTABLE" : "BLOCKED"}: ${out.why}`);
    console.error(`  ${out.ask}`);
    console.error(`  Do NOT send the bare url. It is a door, not a page.`);
  } else {
    console.log(out.url);
    console.error(`  ${out.outcome}, verified ${out.checked}`);
  }
  process.exit(failed ? 1 : 0);
}
