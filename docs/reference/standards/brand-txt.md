---
title: "brand.txt"
slug: /reference/standards/brand-txt
description: "A single statically-served file that primes any agent to generate on-brand assets: identity, preamble, characters roster, annotated GABRs, tokens, voice, and banned terms inline, plus absolute URLs to every brand asset. One link, no repo access, an on-brand asset out the other side."
---

# brand.txt — Agentic Brand OS Standard

*The served format spec: one statically-served file that makes a brand agent-ready in one link. Identity, preamble, characters roster, graphic types, annotated GABRs, tokens, voice, and banned terms are inlined; every brand asset is listed as an absolute URL. Part of the [Agentic Brand OS Standard v0.8](/playbooks/generate-agentic-brand-os).*

---

<!-- last_updated: 2026-06-10 -->
<!-- version: 0.8 -->

`brand.txt` is to a brand what [`llms.txt`](https://llmstxt.org) is to a website: one flat, predictable, statically-served file that gives an agent everything it needs about the thing, in one fetch, with no crawling. Where `llms.txt` orients an LLM to a site's content, `brand.txt` primes a harness to *generate in a brand's voice and look*.

It is the interface layer over an [Agentic Brand OS](/concepts/agentic-brand-os). The brand OS is the full machine-consumable package (logo matrix, tokens, generation layer, Golden Atomic Brand References). `brand.txt` is the one page that points at all of it and inlines the parts an agent needs immediately, so the cost of priming a new agent drops to pasting a single URL.

## The problem it solves

A brand OS lives in a repo with many files at many paths. To use it, an agent needs repo access, or a human has to assemble the right context by hand every time. That friction is where brands drift: the agent gets a screenshot and a hex value instead of the system.

`brand.txt` collapses that to one link. The file is served at a stable path (`https://<brand-site>/brand.txt`), so the entire priming step becomes: *"Generate an on-brand X. Brand spec: https://brand.example.com/brand.txt."* The agent fetches one file and has the identity, the rules, the preamble, and the routing guidance for every reference image it should condition on.

## What goes in the file

Plain text or Markdown (agents parse both; humans can read it raw). The file inlines what an agent needs to read and links what an agent needs to fetch.

**Inlined (read directly):**

- **Identity**: brand name, lockup, tagline, one-liner, audience, archetype, non-negotiables, and the brand OS `id` slug (the local cache folder name).
- **How to generate an on-brand asset**: the numbered procedure (prepend the preamble, pass the reference images, honor the banned terms, stamp the lockup).
- **Preamble**: the always-on image-generation brief, verbatim, in a copy-ready block. Sent to the image model on every request — contains visual DNA, character descriptions, hard rules, comic format conventions, and moderation notes.
- **Characters**: the recurring cast. For each character: name, role/lean, visual description, whether they are the default protagonist, and their GABR URL. This is the routing table that tells an agent which character to reach for by default and which GABR to pass alongside them.
- **Graphic types** (optional but recommended): named output types the brand supports — illustration, comic, stat-card, etc. Each entry declares a prompt suffix, the GABRs to auto-pass, and the output size. An agent reading this can call a named type instead of assembling prompt rules by hand.
- **Color tokens**: semantic roles with hex.
- **Type**: families by role, with font-file URLs.
- **Voice**: motto, tone, the positive move.
- **Banned terms**: visual and verbal.

**Linked as absolute URLs (fetch on demand):**

- The full **logo matrix** (every mark, wordmark, lockup, crop).
- The **Golden Atomic Brand References** — each entry annotated with what it depicts and when to pass it (not a flat URL list — see below).
- The **fonts**, **tokens.css**, and the generation layer.
- The **hosted on-brand-asset skill(s)** — at minimum a model-agnostic `create-on-brand-image` and a `create-gabr` SKILL.md served by the brand OS (see below).

The links are absolute, not repo-relative, because the consumer may have only the file, not the repo.

## A hosted generation skill is required

brand.txt is the canon; a brand OS MUST also serve the **procedure**. Ship at least two static `SKILL.md` files under the served generation layer, linked from brand.txt — **`create-on-brand-image`** (make a one-off on-brand asset) and **`create-gabr`** (add a new Golden Atomic Brand Reference to the canon: fit the visual universe, cohere with the existing set, validate with a human, store the prompt + reference images + alt text, register it, regenerate brand.txt). The `create-on-brand-image` skill:

- **Reads brand.txt** as its source of truth — the canon lives there, never duplicated in the skill.
- **Is model-agnostic with sensible defaults**: it tells the agent to search its registered skills for a top image-creation tool (e.g. `chatgpt-images` / `nano-banana-pro`) and pick one that accepts reference images, falling back to a direct API call.
- **Passes the GABRs, honors the banned terms, stamps the wordmark.**

A brand MAY also host genre skills that build on it (e.g. `create-on-brand-comic`). Local / harness skills should be **thin pointers** to the hosted skill, never second copies — so "paste one link → on-brand asset" holds for the *procedure*, not just the canon.

## GABRs must be annotated, not a flat URL list

A flat list of image URLs tells an agent nothing. It cannot tell which file is the comic-style anchor, which is the default protagonist, or which is required whenever a specific character appears. Every GABR entry in `brand.txt` must carry:

- **What it depicts** — a description of the image content.
- **When to pass it** — the routing rule: "pass for every comic," "pass whenever the Chief appears," "pass for any scene with a human figure."

This routing guidance lives in `brand.json`'s `golden_atomic_brand_references.references` array (objects with `file`, `description`, `when`) and is projected into `brand.txt` at build time by the generator. The difference between a flat list and an annotated list is the difference between "here are 14 files" and "here is the decision tree for which file to reach for."

## Required shape

````text
# <BRAND> — brand.txt
> <lockup> · <tagline>

<one line: this file primes any agent; everything inline + every asset linked>
Format: the brand.txt standard — https://www.appliedai.wiki/reference/standards/brand-txt

## Identity
- Brand / Lockup / Handle / Tagline / One-liner / Audience / Archetype
- Non-negotiable: ...
- ID: <id-slug>  ← local cache: ~/.agents/agentic_brand_oses/<id>/

## How to generate an on-brand asset
1. Prepend the preamble (copy verbatim).
2. Append the REFERENCE IMAGES block naming each GABR you pass.
3. Describe the asset. Honor the banned terms.
4. Stamp the real wordmark onto finished assets (don't let the model draw it).
5. Use the color + type tokens for any code.

## Preamble (copy verbatim, prepend to every image generation request)
```text
<the verbatim image-generation preamble: visual DNA, character descriptions,
hard rules, comic format, moderation notes>
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

## On-brand asset skills (hosted procedures — follow these to generate)
- https://.../brand/generation-layer/skills/create-on-brand-image/SKILL.md
- https://.../brand/generation-layer/skills/create-gabr/SKILL.md

## Characters (recurring cast — always pass the matching GABR as an input image)
- **<Name>** — **default protagonist**; <role>; <visual description> → https://.../gabr-NN-<slug>.png
- **<Name>** — <role>; <visual description> → https://.../gabr-NN-<slug>.png

## Graphic types (named output types — pass --type <slug> to use one)
- **illustration** — <description>
  suffix: "<prompt suffix>"
  size: <WxH>
  auto-gabrs: <gabr-slug>
- **comic** — <description>
  suffix: "<prompt suffix>"
  size: <WxH>
  auto-gabrs: <gabr-slug>, <gabr-slug>

## Golden Atomic Brand References (reference images — pass these to the image model)
- **gabr-NN-<slug>.png** — <what it depicts> | pass when: <routing rule> → https://.../gabr-NN-<slug>.png

## Fonts / Tokens
- https://.../brand/fonts/... ; https://.../brand/tokens.css
````

## Graphic types declare named output formats

Every brand commonly ships multiple output formats — editorial illustrations, comic strips, stat cards, social cards — each with its own prompt rules, auto-passed GABRs, and size. Without a type system, every project that uses the brand OS must reconstruct these rules itself, creating drift.

The optional `graphic_types` array in `brand.json` solves this. Each entry has five fields:

```json
{
  "slug": "illustration",
  "description": "Single-panel editorial scene. No text, no labels, generous whitespace.",
  "suffix": ". Generous white space, at least 30 percent of the canvas untouched paper. No text, no labels, no captions inside the image.",
  "auto_gabrs": ["gabr-18-default-client.png"],
  "size": "1536x1024"
}
```

The build script reads `graphic_types` and emits a `## Graphic types` section in `brand.txt`. An agent or render script can look up a type by slug and get the exact suffix and GABR routing for that format — no brand logic lives in the project.

## Brand OS ID and local cache

Every brand OS declares a short URL-safe `id` slug in `brand.json` (e.g. `"id": "built-for-exit"`). This slug names the local cache folder at `~/.agents/agentic_brand_oses/<id>/`, where agents can cache `brand.txt` and download GABRs for offline or fast access. The build script emits the ID inline in `## Identity`.

A `sync-brand-os` skill acts as the package manager for brand OSes — `sync-brand-os install <brand-txt-url>` fetches `brand.txt`, downloads all listed GABRs into the local cache, and generates a `render-graphic-<id>` skill in `~/.agents/skills/` pre-loaded with the full brand context. See the [spec](/brand.txt) for the full local cache schema.

## Generate it, do not hand-write it

`brand.txt` is a build artifact, not a hand-maintained file. Generate it from the brand OS manifest (`brand.json`) plus a scan of the asset folders, at **build time**, so it can never drift from the assets that actually exist. A missing or stale link in the prime file is the moment an agent improvises and the brand drifts.

The pattern, in any build:

1. A small generator reads `brand.json` (identity, tokens, voice, preamble path, characters, annotated GABR references) and walks the asset folders (`logos/`, the Golden Atomic Brand References, `fonts/`).
2. It inlines the readable parts — including the full characters roster and annotated GABR entries — and emits an absolute URL for every asset, resolving the base URL from config or an environment variable.
3. It writes the file to the site's static root so it serves at `/brand.txt`.
4. It runs on `prebuild` (and `prestart`), so every deploy ships a current prime file.

Because it is generated, adding a new Golden Atomic Brand Reference or a new logo crop automatically appears in `brand.txt` on the next build. No second place to update.

## How it relates to BRAND.md and brand.json

A brand OS repo carries three manifest surfaces. They are not redundant; each serves a different context.

| File | What it is | Audience | Paths |
|---|---|---|---|
| `brand.json` | the structured **data** (tokens, voice, characters, annotated GABR index) | machines | repo-relative |
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

## Version history

This page tracks the Agentic Brand OS Standard. For the full version history see [Generate a Brand OS](/playbooks/generate-agentic-brand-os).

- **v0.8** (2026-06-10): `id` field required in brand.json and emitted in `## Identity`. Optional `graphic_types` array in brand.json; when present, build script emits `## Graphic types` section in brand.txt with slug, description, suffix, auto-gabrs, and size per type. Local brand OS cache convention `~/.agents/agentic_brand_oses/<id>/` documented. `sync-brand-os` and `render-graphic-<id>` patterns introduced.
- **v0.7** (2026-06-10): "Master prompt" renamed to "preamble." Required `## Characters` section added. GABRs must be annotated objects (description + pass-when), not a flat URL list. Concept renamed from AI-Native Brand OS to Agentic Brand OS.
- **v0.6** (2026-06-10): `characters` object required in brand.json with `default_protagonist: true` on exactly one entry. `## Characters` section required in brand.txt.
- **v0.1–0.5** (2026-06-06 to earlier): Initial spec, preamble groundwork, GABR standard, hosted skills requirement.

## Further Reading

- [Agentic Brand OS](/concepts/agentic-brand-os): the full package `brand.txt` is the interface to.
- [Golden Examples](/concepts/golden-examples): the curated A+ references the prime file links for conditioning.
- [Generate a Brand OS](/playbooks/generate-agentic-brand-os): the recipe that builds the OS and ships the prime file.
- [GENERATE.md](/reference/standards/generate-md): the sibling standard that scaffolds the artifact.
- [Standards](/reference/standards): the index for all standards in this family.
