---
title: Generate a Brand OS
slug: /playbooks/generate-a-brand-os
description: A GENERATE.md recipe that scaffolds a complete AI-Native Brand OS for one brand. Run the brand interview to lock identity, then emit the machine-consumable package (logo matrix, tokens, motifs, templates, generation layer, manifest) as a dedicated repo, optionally rendered and deployed. One-time generation per brand.
---

# Generate a Brand OS

<!-- last_updated: 2026-06-06 -->
<!-- version: 0.4 -->

**This page is canonical.** It is the always-current source of truth for the recipe. A local harness skill (`~/.agents/skills/generate-a-brand-os/`) is a thin pointer to this page; follow what is here. Pairs with the [brand.txt standard](/reference/standards/brand-txt) and [AI-Native Brand OS](/concepts/ai-native-brand-os).

You are running a ONE-TIME GENERATION. After this completes, one brand exists as a system: a dedicated repo whose root manifest an agent can read to produce on-brand sites, decks, and assets. Do not re-run for the same brand. Re-run only to scaffold a different brand.

This recipe is the runnable form of the [AI-Native Brand OS](/concepts/ai-native-brand-os) concept. It composes two existing pieces rather than restating them: the [AI-Led Brand Interview](/playbooks/ai-led-brand-interview) supplies the identity-lock phase (the soul of the brand), and [Design Systems for AI-Generated Visuals](/concepts/design-systems-for-ai-generated-visuals) supplies the generation layer. The job here is to turn a locked identity into the machine-consumable package and a repo that holds it at stable paths.

## What This Generates

A dedicated brand-os repo for one brand, with the brand in two forms at once: a human-readable portal and a machine-consumable package. The exact artifact:

- `BRAND.md` at the repo root: the manifest an agent reads first. Names the brand, the aesthetic posture, the seven components, and the path to every usable artifact.
- `brand.json`: the structured twin of `BRAND.md` (tokens, type, voice, banned terms, asset index) at a stable path.
- `tokens.css`: color and type as CSS variables, plus a framework theme block (Tailwind or design-token JSON) so a generated site and deck pull from one source.
- `logos/`: the full logo matrix. Mark, wordmark, and lockups, each in full-color, mono, and knockout, on light and dark grounds, exported to SVG plus the raster and crop formats (favicon, social avatar, open-graph lockup).
- `motifs/` and `templates/`: the recurring graphic signatures and the reusable composition blocks (deck title/divider/data/closing, website hero/feature/CTA/footer).
- `generation-layer/golden-atomic-brand-references/`: the **Golden Atomic Brand References (GABR)**, the pillar. Best-in-class exemplar renders that are the brand universe, each stored next to the exact prompt that produced it plus alt text. A rulebook tells a model what to do; golden references show it what good looks like. They are fed back into an image model as in-context references to generate net-new on-brand assets. Golden = best-in-class example of its type; Atomic = a single self-contained reusable unit; Brand Reference = fed back to seed new assets.
- `generation-layer/`: the master prompt, per-asset example prompts, the banned-term list, and an `illustrations/SPEC.md` for the AI-native illustration system.
- A `voice` slice: taglines, naming conventions, tone in a sentence or two, on-brand and off-brand example lines.
- `generation-layer/skills/`: the **hosted generation skill(s)**, served as static `SKILL.md` files. At minimum a model-agnostic `create-on-brand-image` skill (reads `brand.txt`, searches the harness for a top image model, passes the GABRs, honors banned terms, stamps the wordmark); optionally genre skills like `create-on-brand-comic` that build on it. The brand OS ships the *procedure*, not just the canon — local/harness skills are thin pointers to these. Required by the [brand.txt standard](/reference/standards/brand-txt).
- `brand.txt` at the served root: the all-in-one agent prime. The whole brand on one statically-served page (identity, master prompt, tokens, voice, banned terms inline, plus absolute URLs to every asset). Like `llms.txt` for a website, but for generating in the brand's voice and look. Auto-generated at build time so it never drifts; one pasted link primes any harness with no repo access. See the [brand.txt standard](/reference/standards/brand-txt).
- Optionally, a rendered Docusaurus portal over the repo (the human gallery), optionally deployed to a domain.

The success test is concrete. Hand only this repo to an agent with no designer in the loop and ask for a landing page, a deck, and a social set. If the three come back unmistakably one brand, the OS is real.

## Prerequisites

- Node >= 20 and `pnpm` (only if you render the Docusaurus portal).
- `git`, and `gh` if you want a GitHub repo.
- An image model for the logo matrix and illustration references (Gemini image generation or equivalent).
- The brand name and, if it has one, the domain.
- Vercel CLI only if you deploy the portal.

## Interview

Ask each question one at a time. Do not batch. Capture answers to `./generate-a-brand-os-build-notes.md` as you go. After every third answer, echo the running plan back so drift is corrected before anything is generated.

Phase A, the soul. Run the twelve-question [AI-Led Brand Interview](/playbooks/ai-led-brand-interview) in full (the feeling, the space, the anti-position, the simple version, the poison words, the testimony, the name for the people served, the non-negotiable, the archetype, the 100 mark, the first moment, the motto). The founders' exact words are the brand language. Do not paraphrase them.

Phase B, the executable decisions. These convert the soul into the locked identity the package is generated from.

**Q13.** Palette. Name the semantic roles (primary, accent, ground, ink, plus any status colors) and give a hex for each. Ground is rarely pure white; confirm the off-white.
**Q14.** Type. The typefaces by role (display, heading, body, any mono or script accent), the web-font source, and the rough type scale.
**Q15.** Motifs. The one or two recurring visual signatures the brand will repeat (the equivalent of a sun, a seam-accent, a texture, a mark posture).
**Q16.** Aesthetic direction. One paragraph an image model can render from: the register, the lighting, the texture, the background treatment, the overall feeling. State the sibling brands it should and should not resemble.
**Q17.** Banned vocabulary. The visual terms the model must avoid, plus any IP-safety and voice bans. This list is as load-bearing as the palette.
**Q18.** Logo concept. The mark idea (symbol, posture, what it stands for), and the wordmark treatment.
**Q19.** Production form. Lean v0 (manifest, tokens, a starter asset set, no rendered portal yet) or full brand-os-wiki (the Docusaurus portal over the repo). See Common scenarios.
**Q20.** Home and deploy. Where the repo lives (path, GitHub org), and whether to render and deploy the portal now or later.

## Common scenarios

When the operator names a scenario, confirm the defaults below and short-circuit the relevant questions.

- **Lean v0 to a live surface.** Generate `BRAND.md`, `brand.json`, `tokens.css`, a starter logo and a small illustration reference set, and the generation layer. Skip the Docusaurus portal. The intended consumer is an immediate site or deck. Graduate to the full brand-os-wiki later with this same recipe's portal step. This is the fastest path from interview to an on-brand shipped surface.
- **Full brand-os-wiki.** Scaffold a Docusaurus portal over the repo (`BRAND.md` + `brand.json` + `static/brand/` + `docs/brand-os/` pages), render the human gallery, and deploy. The intended consumer is a team and a long-lived brand with many future surfaces.

## Steps

Show output to the operator after each step. Do not chain steps silently.

1. **Lock the identity.** Distill the interview into one identity document (palette with roles and hex, typefaces by role, the motifs, the one-paragraph aesthetic, the banned vocabulary, the logo concept, the voice slice). Success: the operator confirms the identity doc reads like their brand and nothing downstream is generated before this is fixed.
2. **Scaffold the repo.** For full, clone the brand-os-wiki template (SupersuitUp / Docusaurus). For lean, create a plain repo with `BRAND.md`, `brand.json`, `tokens.css`, and the `logos/`, `motifs/`, `templates/`, `generation-layer/` folders. Success: the folder tree exists at the agreed path.
3. **Generate the full logo matrix.** Every mark, wordmark, and lockup, in full-color, mono, and knockout, on light and dark, exported to SVG plus raster and crop formats. Do not ration variants; a missing conversion is where the brand drifts. Success: the matrix files exist in `logos/`.
4. **Tokenize color and type.** Emit `tokens.css` (CSS variables), the framework theme block, and the font `@import` with the role mapping. Success: a throwaway HTML file using only these tokens renders in the brand's colors and fonts.
5. **Build the motif and template library.** The graphic-element source files and components, the deck template elements, and the website section blocks. Success: each motif and template exists as a reusable file, not a screenshot.
6. **Stand up the generation layer.** Write the master prompt, the per-asset example prompts, finalize the banned-term list, and write `generation-layer/illustrations/SPEC.md`. Success: one example prompt run through the image model returns an on-brand asset.
6b. **Build the Golden Atomic Brand References (the pillar).** Generate the exemplar renders that are the universe (the mark, a hero scene, each character or mascot, the core content atom, key templates, a sticker or motif set). Disciplines learned from real runs: generate **incrementally, validating each with the operator** (the validation is what makes a reference golden); **store each render next to its exact prompt** and the **reference images passed**; **pass an earlier golden reference back in** whenever an asset reuses a brand element (a mark, a mascot, a character) so style never drifts; for finished assets, **stamp the real wordmark** into a reserved band rather than letting the model draw it (image models garble text). When a reference shows **multiple figures, make each a visibly distinct individual** (never clone one face across slots), and keep mirrored groups equal in count; give every **recurring entity** (a character, a mascot, the orchestrator) a **recognizable signature** and pass its golden reference back on each reuse. Success: each reference is validated and committed with its prompt.
7. **Write the root manifest, three surfaces.** Fill `brand.json` (structured data, the source of truth), `BRAND.md` (the human front door), and wire `brand.txt` (the served agent prime). Each indexes every artifact at a stable path. Success: an agent handed only `BRAND.md`, or just `brand.txt`, can locate every asset.
7a2. **Host the generation skill(s).** Write a model-agnostic `create-on-brand-image` `SKILL.md` under `generation-layer/skills/` (served statically): it reads `brand.txt`, tells the agent to search its registered skills for a top image-creation tool (e.g. `chatgpt-images` / `nano-banana-pro`) that accepts reference images, passes the GABRs, honors the banned terms, and stamps the wordmark. Add genre skills (e.g. `create-on-brand-comic`) only if the brand needs them. `brand.txt` links these. Success: pasting the hosted `SKILL.md` URL into a fresh agent is enough to produce an on-brand asset, and any local skill can shrink to a pointer to it.
7b. **Wire `brand.txt`, generated at build time.** A small dependency-free generator (Node, on `prebuild`/`prestart`) reads `brand.json`, inlines identity + master prompt + tokens + voice + banned terms, and emits an absolute URL for every asset, writing `static/brand.txt`. It declares its format and links the [brand.txt standard](/reference/standards/brand-txt). Success: pasting `<site>/brand.txt` into a fresh agent is enough to generate an on-brand asset with no repo access.
8. **Render and deploy (optional, full only).** Build the Docusaurus portal, fix broken links, and deploy. If the brand is fundamentally a single ground (paper, deep navy), ship the portal in that one mode and disable the dark/light toggle. Success: the live site shows the logo matrix, live swatches, type specimens, the GABR gallery, and the prompt library with copy buttons.
9. **Version-control the prompts and run the alignment audit.** Store every generation prompt (and its reference images) alongside its artifact. After the first real render, pull the manifest up to match anything the render sharpened. Success: prompts are committed next to outputs and the manifest reflects the latest identity.

## Output

- Repo: the agreed path (e.g. `~/Documents/github-repos/<...>/<brand>-brand-os/` or a lean `<brand>/brand/` folder).
- Manifest: `BRAND.md` and `brand.json` at the repo root.
- Tokens: `tokens.css`.
- Logo matrix: `logos/`.
- Golden Atomic Brand References: `generation-layer/golden-atomic-brand-references/` (each render plus its `*.prompt.md`).
- Generation layer: `generation-layer/` including `illustrations/SPEC.md`.
- Hosted generation skill(s): `generation-layer/skills/create-on-brand-image/SKILL.md` (and any genre skills), served and linked from `brand.txt`.
- Agent prime: `brand.txt` at the served root (auto-generated at build time).
- Portal (full only): the local dev URL and, if deployed, the production URL.
- Working notes: `./generate-a-brand-os-build-notes.md`.

## Verification

```bash
# manifest is valid structured data
python3 -c "import json,sys; json.load(open('brand.json')); print('brand.json OK')"
# tokens exist and are non-empty
test -s tokens.css && echo "tokens.css OK"
# the logo matrix is not empty
ls logos/ | head && echo "logos present"
```

Then run the hand-to-an-agent test: in a fresh context, give an agent only `BRAND.md` and ask for a one-section landing page. If it lands on-brand without guessing, the OS works. If any check fails, do NOT declare the GENERATE complete. Diagnose and resolve.

## Idempotency

Refuse to clobber. If the target path already holds a brand-os for this brand, halt and ask whether the operator wants a sibling for a different brand at a new path, or an explicit recreation. Never silently overwrite a locked identity.

## When to NOT run this again

This is one-time per brand. After the OS exists, do not re-run this recipe to add a single asset or tweak a token. Use an `add-brand-asset` or `update-brand-tokens` skill (or edit the repo directly and re-commit the prompt next to the output). Re-run this GENERATE only to stand up a different brand.

## Pairs with

- [AI-Led Brand Interview](/playbooks/ai-led-brand-interview): the identity-lock phase this recipe calls in step 1.
- [AI-Native Brand OS](/concepts/ai-native-brand-os): the concept this recipe produces.
- [Design Systems for AI-Generated Visuals](/concepts/design-systems-for-ai-generated-visuals): the discipline the generation layer runs on.
- [brand.txt](/reference/standards/brand-txt): the all-in-one agent prime this recipe emits.
- [Starting Your Own Wiki](https://truthmanagement.wiki/playbooks/starting-your-own-wiki): the Docusaurus scaffold the full-portal path reuses.
- Forkable starter and worked examples: `SupersuitUp/brand-os-template`, `SupersuitUp/supersuit-brand-os`, `POV-DTX/pov-dtx-brand-os`.

## Pitfalls

- **Generating before the identity is locked.** Steps 2 onward against an unlocked identity produce drift you then have to redo. Finish step 1 first.
- **Rationing logo variants.** The missing conversion is the moment a teammate or agent improvises and the brand slips. Generate the whole matrix once.
- **Pure-white grounds.** Most brands want a warm or cool off-white. Confirm the ground hex in Q13.
- **Prompts not stored with outputs.** An un-versioned prompt cannot be re-run or improved. Commit the prompt next to the asset every time.
- **Treating the rendered site as the source of truth.** The repo is canonical; the site is the portal over it. The manifest, not the homepage, is what an agent reads.
- **Skimping on the Golden Atomic Brand References.** They are the pillar, the difference between a rulebook and a generator. Validate each with the operator and store the prompt next to every render.
- **Letting an image model draw the wordmark or lockup.** It garbles text and drops letters. Generate the art clean with a reserved band, then stamp the real wordmark programmatically. Make the lockup always-on for finished assets.
- **Style drift across assets.** Pass the relevant golden reference back in as an input image for any reused element (mark, mascot, character), or the model re-invents it every time.
- **A stale `brand.txt`.** Generate it at build time from `brand.json` plus an asset scan, never by hand, so it cannot fall behind the assets that exist.
- **Duplicating canon instead of pointing at `brand.txt`.** Once `brand.txt` exists it is the single source of truth for the look. Downstream style, character, and usage docs (a graphic-style page, a comic skill, a character page) should be **thin pointers** to it — link `<site>/brand.txt`, say "brand.txt wins on any conflict" — not second copies of the canon. To change the look, edit the brand OS so the regenerated `brand.txt` carries it; never hand-maintain the same rules in many places. Duplicated canon drifts; one source does not.
- **Cluttered repo when the portal is rendered.** Consolidate the asset package under `static/brand/` so the root reads as a clean Docusaurus site, with the manifest trio (`BRAND.md`, `brand.json`, `tokens.css`) at root.
