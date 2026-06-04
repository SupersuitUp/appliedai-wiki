---
title: Generate a Brand OS
slug: /playbooks/generate-a-brand-os
description: A GENERATE.md recipe that scaffolds a complete AI-Native Brand OS for one brand. Run the brand interview to lock identity, then emit the machine-consumable package (logo matrix, tokens, motifs, templates, generation layer, manifest) as a dedicated repo, optionally rendered and deployed. One-time generation per brand.
---

# Generate a Brand OS

<!-- last_updated: 2026-06-04 -->
<!-- version: 0.1 -->

**Canonical source:** [appliedai.wiki/playbooks/generate-a-brand-os](https://www.appliedai.wiki/playbooks/generate-a-brand-os) is the rendered recipe. The runnable copy lives at `~/.agents/skills/generate-a-brand-os/GENERATE.md`.

You are running a ONE-TIME GENERATION. After this completes, one brand exists as a system: a dedicated repo whose root manifest an agent can read to produce on-brand sites, decks, and assets. Do not re-run for the same brand. Re-run only to scaffold a different brand.

This recipe is the runnable form of the [AI-Native Brand OS](/concepts/ai-native-brand-os) concept. It composes two existing pieces rather than restating them: the [AI-Led Brand Interview](/playbooks/ai-led-brand-interview) supplies the identity-lock phase (the soul of the brand), and [Design Systems for AI-Generated Visuals](/concepts/design-systems-for-ai-generated-visuals) supplies the generation layer. The job here is to turn a locked identity into the machine-consumable package and a repo that holds it at stable paths.

## What This Generates

A dedicated brand-os repo for one brand, with the brand in two forms at once: a human-readable portal and a machine-consumable package. The exact artifact:

- `BRAND.md` at the repo root: the manifest an agent reads first. Names the brand, the aesthetic posture, the seven components, and the path to every usable artifact.
- `brand.json`: the structured twin of `BRAND.md` (tokens, type, voice, banned terms, asset index) at a stable path.
- `tokens.css`: color and type as CSS variables, plus a framework theme block (Tailwind or design-token JSON) so a generated site and deck pull from one source.
- `logos/`: the full logo matrix. Mark, wordmark, and lockups, each in full-color, mono, and knockout, on light and dark grounds, exported to SVG plus the raster and crop formats (favicon, social avatar, open-graph lockup).
- `motifs/` and `templates/`: the recurring graphic signatures and the reusable composition blocks (deck title/divider/data/closing, website hero/feature/CTA/footer).
- `generation-layer/`: the master prompt, per-asset example prompts, the reference-image set, the banned-term list, and an `illustrations/SPEC.md` for the AI-native illustration system.
- A `voice` slice: taglines, naming conventions, tone in a sentence or two, on-brand and off-brand example lines.
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
6. **Stand up the generation layer.** Write the master prompt, the per-asset example prompts, assemble the reference-image set, finalize the banned-term list, and write `generation-layer/illustrations/SPEC.md`. Success: one example prompt run through the image model returns an on-brand asset.
7. **Write the root manifest.** Fill `BRAND.md` and `brand.json` so they index every artifact above at a stable path, with the aesthetic posture and the seven components. Success: an agent handed only `BRAND.md` can locate every other asset.
8. **Render and deploy (optional, full only).** Build the Docusaurus portal, fix broken links, and deploy. Success: the live site shows the logo matrix, live swatches, type specimens, and the prompt library with copy buttons.
9. **Version-control the prompts and run the alignment audit.** Store every generation prompt alongside its artifact. After the first real render, pull the manifest up to match anything the render sharpened. Success: prompts are committed next to outputs and the manifest reflects the latest identity.

## Output

- Repo: the agreed path (e.g. `~/Documents/github-repos/<...>/<brand>-brand-os/` or a lean `<brand>/brand/` folder).
- Manifest: `BRAND.md` and `brand.json` at the repo root.
- Tokens: `tokens.css`.
- Logo matrix: `logos/`.
- Generation layer: `generation-layer/` including `illustrations/SPEC.md`.
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
- [Starting Your Own Wiki](https://truthmanagement.wiki/playbooks/starting-your-own-wiki): the Docusaurus scaffold the full-portal path reuses.

## Pitfalls

- **Generating before the identity is locked.** Steps 2 onward against an unlocked identity produce drift you then have to redo. Finish step 1 first.
- **Rationing logo variants.** The missing conversion is the moment a teammate or agent improvises and the brand slips. Generate the whole matrix once.
- **Pure-white grounds.** Most brands want a warm or cool off-white. Confirm the ground hex in Q13.
- **Prompts not stored with outputs.** An un-versioned prompt cannot be re-run or improved. Commit the prompt next to the asset every time.
- **Treating the rendered site as the source of truth.** The repo is canonical; the site is the portal over it. The manifest, not the homepage, is what an agent reads.
