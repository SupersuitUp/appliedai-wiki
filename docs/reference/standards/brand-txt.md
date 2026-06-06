---
title: "brand.txt"
slug: /reference/standards/brand-txt
description: "A single statically-served file that primes any agent to generate on-brand assets: identity, master prompt, tokens, voice, and banned terms inline, plus absolute URLs to every brand asset. One link, no repo access, an on-brand asset out the other side."
---

# brand.txt Specification v0.1

*A single statically-served file that makes a brand agent-ready in one link. Identity, master prompt, tokens, voice, and banned terms are inlined; every brand asset is listed as an absolute URL. Paste the link into any agent harness and it can produce on-brand work without touching the repo.*

---

<!-- last_updated: 2026-06-06 -->
<!-- version: 0.1 -->

`brand.txt` is to a brand what [`llms.txt`](https://llmstxt.org) is to a website: one flat, predictable, statically-served file that gives an agent everything it needs about the thing, in one fetch, with no crawling. Where `llms.txt` orients an LLM to a site's content, `brand.txt` primes a harness to *generate in a brand's voice and look*.

It is the interface layer over an [AI-Native Brand OS](/concepts/ai-native-brand-os). The brand OS is the full machine-consumable package (logo matrix, tokens, generation layer, Golden Atomic Brand References). `brand.txt` is the one page that points at all of it and inlines the parts an agent needs immediately, so the cost of priming a new agent drops to pasting a single URL.

## The problem it solves

A brand OS lives in a repo with many files at many paths. To use it, an agent needs repo access, or a human has to assemble the right context by hand every time. That friction is where brands drift: the agent gets a screenshot and a hex value instead of the system.

`brand.txt` collapses that to one link. The file is served at a stable path (`https://<brand-site>/brand.txt`), so the entire priming step becomes: *"Generate an on-brand X. Brand spec: https://brand.example.com/brand.txt."* The agent fetches one file and has the identity, the rules, the master prompt, and the URLs of every reference image it should condition on.

## What goes in the file

Plain text or Markdown (agents parse both; humans can read it raw). The file inlines what an agent needs to read and links what an agent needs to fetch.

**Inlined (read directly):**

- **Identity**: brand name, lockup, tagline, one-liner, audience, archetype, non-negotiables.
- **How to generate an on-brand asset**: the numbered procedure (prepend the master prompt, pass the reference images, honor the banned terms, stamp the lockup).
- **Master prompt**: the always-on style preamble, verbatim, in a copy-ready block.
- **Color tokens**: semantic roles with hex.
- **Type**: families by role, with font-file URLs.
- **Voice**: motto, tone, the positive move.
- **Banned terms**: visual and verbal.

**Linked as absolute URLs (fetch on demand):**

- The full **logo matrix** (every mark, wordmark, lockup, crop).
- The **Golden Atomic Brand References** (the exemplar images an image model conditions on).
- The **fonts**, **tokens.css**, and the generation layer.

The links are absolute, not repo-relative, because the consumer may have only the file, not the repo.

## Required shape

````text
# <BRAND> — brand.txt
> <lockup> · <tagline>

<one line: this file primes any agent; everything inline + every asset linked>

## Identity
- Brand / Lockup / Handle / Tagline / One-liner / Audience / Archetype
- Non-negotiable: ...

## How to generate an on-brand asset
1. Prepend the master prompt.
2. Pass the relevant Golden Atomic Brand Reference URL(s) as input images.
3. Describe the asset. Honor the banned terms.
4. Stamp the real wordmark onto finished assets (don't let the model draw it).
5. Use the color + type tokens for any code.

## Master prompt
```text
<the verbatim master prompt>
```

## Color tokens
- <role>: <hex>

## Type
- <role>: <family> — <absolute font URL>

## Voice
- Motto / Tone / Positive move

## Banned terms
- Words: ...
- Visual: ...

## Logo matrix (absolute URLs)
- https://.../brand/logos/...

## Golden Atomic Brand References (pass these to the image model)
- https://.../brand/.../gabr-NN-*.png

## Fonts / Tokens
- https://.../brand/fonts/... ; https://.../brand/tokens.css
````

## Generate it, do not hand-write it

`brand.txt` is a build artifact, not a hand-maintained file. Generate it from the brand OS manifest (`brand.json`) plus a scan of the asset folders, at **build time**, so it can never drift from the assets that actually exist. A missing or stale link in the prime file is the moment an agent improvises and the brand drifts.

The pattern, in any build:

1. A small generator reads `brand.json` (identity, tokens, voice, master-prompt path) and walks the asset folders (`logos/`, the Golden Atomic Brand References, `fonts/`).
2. It inlines the readable parts and emits an absolute URL for every asset, resolving the base URL from config or an environment variable.
3. It writes the file to the site's static root so it serves at `/brand.txt`.
4. It runs on `prebuild` (and `prestart`), so every deploy ships a current prime file.

Because it is generated, adding a new Golden Atomic Brand Reference or a new logo crop automatically appears in `brand.txt` on the next build. No second place to update.

## How it relates to BRAND.md and brand.json

A brand OS repo carries three manifest surfaces. They are not redundant; each serves a different context.

| File | What it is | Audience | Paths |
|---|---|---|---|
| `brand.json` | the structured **data** (tokens, voice, asset index) | machines | repo-relative |
| `BRAND.md` | the human-readable **front door** in the repo (what the brand is, components, how to consume) | a human or agent **that has the repo** | repo-relative |
| `brand.txt` | the **generated, served, self-contained prime** | an agent **that only has a URL** | **absolute** |

The relationship is a projection: `brand.json` is the database, `BRAND.md` is the README you read when you are inside the repo, and `brand.txt` is the one link you paste when you are anywhere else. `brand.txt` is auto-generated from `brand.json` (plus an asset scan), inlines the essentials, and rewrites every path as an absolute URL so a remote agent needs nothing but the link. `BRAND.md` points at assets you would open locally; `brand.txt` points at assets an image model can fetch over HTTP right now.

Clean division for adopters: `brand.json` is the canonical data, `brand.txt` is the generated public interface, and `BRAND.md` is the thin human front door that orients and points to both.

## How it relates to the other standards

| File | Primes for | Form |
|---|---|---|
| [llms.txt](https://llmstxt.org) | navigating a site's content | one served file |
| [GENERATE.md](/reference/standards/generate-md) | scaffolding the brand OS once | agent recipe |
| **brand.txt** | **generating on-brand assets from a live brand** | **one served file** |

`GENERATE.md` builds the brand OS. `brand.txt` is one of the things that brand OS ships, and the thing other agents actually consume day to day. The brand OS is the warehouse; `brand.txt` is the loading dock.

## The new standard, stated plainly

A brand is agent-ready when priming a harness to work in it costs one pasted link. `brand.txt` is that link. The user experience is: paste the URL, describe the asset, get something on-brand back. Everything else (the repo, the matrix, the generation layer) sits behind that one file.

## Version Note

This is v0.1. The spec documents what works in practice rather than designing comprehensively up front. As more brand OSes ship a `brand.txt`, the spec evolves based on real usage.

## Further Reading

- [AI-Native Brand OS](/concepts/ai-native-brand-os): the full package `brand.txt` is the interface to.
- [Golden Examples](/concepts/golden-examples): the curated A+ references the prime file links for conditioning.
- [Generate a Brand OS](/playbooks/generate-a-brand-os): the recipe that builds the OS and ships the prime file.
- [GENERATE.md](/reference/standards/generate-md): the sibling standard that scaffolds the artifact.
- [Standards](/reference/standards): the index for all standards in this family.
