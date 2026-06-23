---
title: Generate an Agentic Brand OS
slug: /playbooks/generate-agentic-brand-os
description: A GENERATE.md recipe that scaffolds a complete Agentic Brand OS for one brand. Run the brand interview to lock identity, then emit the machine-consumable package (logo matrix, tokens, motifs, templates, generation layer, manifest) as a dedicated repo, optionally rendered and deployed. One-time generation per brand.
---

# Generate an Agentic Brand OS

{/* last_updated: 2026-06-22 */}
{/* version: 0.10 */}

**This page is canonical.** It is the always-current source of truth for the recipe. A local harness skill (`~/.agents/skills/generate-agentic-brand-os/`) is a thin pointer to this page; follow what is here. Pairs with the [brand.txt standard](/reference/standards/brand-txt) and [Agentic Brand OS](/concepts/agentic-brand-os).

You are running a ONE-TIME GENERATION. After this completes, one brand exists as a system: a dedicated repo whose root manifest an agent can read to produce on-brand sites, decks, and assets. Do not re-run for the same brand. Re-run only to scaffold a different brand.

This recipe is the runnable form of the [Agentic Brand OS](/concepts/agentic-brand-os) concept. It composes two existing pieces: the [AI-Led Brand Interview](/playbooks/ai-led-brand-interview) supplies the identity-lock phase (the soul of the brand), and the generation layer is built on the [Golden Atomic Brand References](/concepts/golden-atomic-brand-references) discipline. The job here is to turn a locked identity into the machine-consumable package and a repo that holds it at stable paths.

![4-panel comic strip titled "GENERATE A BRAND OS" on cream paper. Panel 1 — THE INTERVIEW: Midas in matte-navy Supersuit with orange seams leans forward at a command table, gesturing toward floating holographic identity cards (color palette swatches, a wordmark silhouette, a type specimen). Caption: "MIDAS LOCKS THE IDENTITY. THE SOUL FIRST." Panel 2 — THE PILLAR: Midas stands before a wall of framed glowing golden reference images — logo mark, character reference, scene reference — each with a gold star stamp. He points at one, approving it. Caption: "HE VALIDATES EACH GOLDEN REFERENCE. SHOW IT, DON'T JUST DESCRIBE IT." Panel 3 — THE PRIME: Close-up of a terminal screen showing "> brand.txt" in cyan text. Midas's gauntleted hand with cyan wrist glow presses Enter. Caption: "BRAND.TXT GENERATED. ONE URL PRIMES ANY AGENT." Panel 4 — MISSION INTACT: Midas stands arms crossed as three holographic output panels float around him — a landing page, a deck slide, a social post — all unmistakably one brand. Bold READY stamp bottom-right. Caption: "THREE SURFACES. ONE BRAND. NO DESIGNER IN THE LOOP." Footer bar: "ONE REPO. ONE URL. ANY AGENT."](/img/comics/generate-a-brand-os.png)

---

## What This Generates

A dedicated brand-os repo for one brand, with the brand in two forms at once: a human-readable portal and a machine-consumable package. The exact artifact:

- `BRAND.md` at the repo root: the manifest an agent reads first. Names the brand, the aesthetic posture, the seven components, and the path to every usable artifact.
- `brand.json`: the structured twin of `BRAND.md` (tokens, type, voice, banned terms, asset index) at a stable path.
- `tokens.css`: color and type as CSS variables, plus a framework theme block (Tailwind or design-token JSON) so a generated site and deck pull from one source.
- `logos/`: the full logo matrix. Mark, wordmark, and lockups, each in full-color, mono, and knockout, on light and dark grounds, exported to SVG plus the raster and crop formats (favicon, social avatar, open-graph lockup).
- `motifs/` and `templates/`: the recurring graphic signatures and the reusable composition blocks (deck title/divider/data/closing, website hero/feature/CTA/footer). The validated, reusable templates are **Golden Atomic Brand Templates (GABTs)**, the coded twin of the GABR: coded HTML/CSS rendered to exact pixels (headless browser to PNG), each stored next to its render command. Any asset whose numbers or copy must be exact (a data slide or stat card, a scorecard, a before/after table, an open-graph card) is a GABT, never a generated GABR, because an image model garbles text and digits. GABTs are registered in `brand.json` and surfaced in `brand.txt` with the same rigor as GABRs.
- `generation-layer/golden-atomic-brand-references/`: the **Golden Atomic Brand References (GABR)**, the pillar. Best-in-class exemplar renders that are the brand universe, each stored next to the exact prompt that produced it plus alt text. A rulebook tells a model what to do; golden references show it what good looks like. They are fed back into an image model as in-context references to generate net-new on-brand assets. Golden = best-in-class example of its type; Atomic = a single self-contained reusable unit; Brand Reference = fed back to seed new assets.
- `generation-layer/`: the preamble (rich image-generation brief), per-asset example prompts, the banned-term list, and an `illustrations/SPEC.md` for the AI-native illustration system.
- A `voice` slice: taglines, naming conventions, tone in a sentence or two, on-brand and off-brand example lines.
- `generation-layer/skills/`: the **hosted generation skill(s)**, served as static `SKILL.md` files. At minimum a model-agnostic `create-on-brand-image` (make a one-off on-brand asset) and `create-gabr` (add a new Golden Atomic Brand Reference to the canon — fit the universe, cohere with the existing set, validate, store prompt+refs+alt, register, regenerate brand.txt); optionally genre skills like `create-on-brand-comic` that build on them. The brand OS ships the *procedure*, not just the canon — local/harness skills are thin pointers to these. Required by the [brand.txt standard](/reference/standards/brand-txt).
- `brand.txt` at the served root: the all-in-one agent prime. The whole brand on one statically-served page (identity, preamble, tokens, voice, banned terms inline, plus absolute URLs to every asset). Like `llms.txt` for a website, but for generating in the brand's voice and look. Auto-generated at build time so it never drifts; one pasted link primes any harness with no repo access. See the [brand.txt standard](/reference/standards/brand-txt).
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

   **Register each reusable template as a Golden Atomic Brand Template (GABT).** A GABT is the coded twin of the GABR: coded HTML/CSS that renders to exact pixels through a headless browser, used for any asset whose numbers or copy must be exact (a data slide or stat card, a scorecard, a before/after table, an open-graph card). The rule is load-bearing and generalizes the wordmark discipline in 6b: an image model garbles text and digits, so exact-text assets are coded, never generated. Implement each GABT as a folder under `templates/` holding the HTML, a shared CSS that pulls the real tokens, a `render.sh` (headless Chrome at 2x, downscaled to the target size), and example instances. Add a `golden_atomic_brand_templates` array to `brand.json`, one object per template: `slug`, `kind` (`data-slide` / `scorecard` / `og-card` / `banner`), `description`, `when` (the routing rule for when an agent should reach for it), `render` (the command), `size` (output dimensions), and `path`. Without this registration an agent reading `brand.txt` never learns the template exists.
6. **Stand up the generation layer.** Write the preamble (the rich image-generation brief sent verbatim to the image model on every request: visual DNA, character descriptions, hard rules, comic format, moderation notes), the per-asset example prompts, finalize the banned-term list, and write `generation-layer/illustrations/SPEC.md`. Success: one example prompt run through the image model returns an on-brand asset.
6b. **Build the Golden Atomic Brand References (the pillar).** Generate the exemplar renders that are the universe (the mark, a hero scene, each character or mascot, the core content atom, key templates, a sticker or motif set). Disciplines learned from real runs: generate **incrementally, validating each with the operator** (the validation is what makes a reference golden); **store each render next to its exact prompt** and the **reference images passed**; **pass an earlier golden reference back in** whenever an asset reuses a brand element (a mark, a mascot, a character) so style never drifts. When a logo belongs in a generated render, pass the real logo as a reference and let the model render it in place on the surface; when the logo or text must be exact, build the asset as a coded GABT that embeds the real SVG instead. When a reference shows **multiple figures, make each a visibly distinct individual** (never clone one face across slots), and keep mirrored groups equal in count; give every **recurring entity** (a character, a mascot, the orchestrator) a **recognizable signature** and pass its golden reference back on each reuse.

   **Register each character in `brand.json`.** Add a `characters` object to `brand.json` with one entry per recurring named character. Each entry: `ref` (the GABR path), `lean` (role or personality lean), `suit` or `form` (visual description), and optionally `signature` (the one detail that identifies them instantly — a crown, a color scheme, a posture). Designate exactly one character as `"default_protagonist": true` — the one who appears in any scene that calls for the brand's protagonist without further specification. This is the character whose GABR an agent should always reach for first when a human figure is needed. Without this designation, agents reading only `brand.txt` see an unlabeled list of image URLs and have no basis for which character is the default.

   **Annotate each GABR in `brand.json`.** The `golden_atomic_brand_references.references` array must use objects, not plain strings. Each entry: `file` (filename), `description` (what the image depicts), `when` (when an agent should pass it as an input image). Without this, an agent reading `brand.txt` sees a flat list of opaque URLs with no routing guidance — it cannot tell which file is which, or when to reach for it. The build script reads these annotations and emits them inline in the `## Golden Atomic Brand References` section of `brand.txt`.

   Success: each reference is validated and committed with its prompt, and every recurring character is registered in `brand.json` with a clear role and (for the default) the `default_protagonist` flag. Every GABR entry in `brand.json` has a `description` and `when` field.
7. **Write the root manifest, three surfaces.** Fill `brand.json` (structured data, the source of truth), `BRAND.md` (the human front door), and wire `brand.txt` (the served agent prime). Each indexes every artifact at a stable path. Success: an agent handed only `BRAND.md`, or just `brand.txt`, can locate every asset.
7a2. **Host the generation skill(s).** Write two static `SKILL.md` files under `generation-layer/skills/` (served): a model-agnostic `create-on-brand-image` (reads `brand.txt`, searches the harness for a top image-creation tool that accepts reference images, passes the GABRs and honors the banned terms) and `create-gabr` (the disciplined path to add a new GABR to the canon — scope vs the existing set, generate for coherence by passing the nearest references, validate with the human, store the prompt+refs+alt sidecar, register in `brand.json` + the gallery, regenerate brand.txt). Add genre skills (e.g. `create-on-brand-comic`) only if the brand needs them. `brand.txt` links these. Success: pasting the hosted `SKILL.md` URL into a fresh agent is enough to produce an on-brand asset, and any local skill can shrink to a pointer to it.
7b. **Wire `brand.txt`, generated at build time.** A small dependency-free generator (Node, on `prebuild`/`prestart`) reads `brand.json`, inlines identity + preamble + tokens + voice + banned terms, and emits an absolute URL for every asset, writing `static/brand.txt`. It declares its format and links the [brand.txt standard](/reference/standards/brand-txt).

   **The generator must emit a `## Characters` section** from `brand.json`'s `characters` data. The GABR list alone gives agents no routing guidance — they cannot tell which file is which character, or which is the default protagonist. The Characters section closes this gap: for each entry, emit the character name, their role/lean, their visual description, a note indicating if they are the default protagonist, and their GABR URL.

   **The generator must also emit annotated GABR entries.** The `## Golden Atomic Brand References` section must not be a flat URL list. For each entry in `brand.json`'s `references` array, emit the filename, the `description`, a `pass when:` routing rule, and the absolute URL. This is the difference between an agent knowing "there are 14 image files" and knowing "pass gabr-08 for every comic, pass gabr-13 whenever the Chief appears." The routing guidance lives in `brand.json`; the build script projects it into `brand.txt`.

   **The generator must also emit a `## Golden Atomic Brand Templates` section** from `brand.json`'s `golden_atomic_brand_templates` array, when present. For each entry emit the slug, kind, `description`, a `use when:` routing rule, the `render` command, the output `size`, and the path. This is what makes a coded template discoverable the same way a GABR is: an agent reading only `brand.txt` learns "there is a data-slide GABT, render it with this command when you need an exact-number stat card," instead of reaching for an image model that would garble the figure.

   Success: pasting `<site>/brand.txt` into a fresh agent is enough to generate an on-brand asset with no repo access. The agent can identify the default protagonist, route to the right GABR for any scene, reach for the right GABT when numbers must be exact, and never has to guess which image file to pass.
8. **Render and deploy (optional, full only).** Build the Docusaurus portal, fix broken links, and deploy. If the brand is fundamentally a single ground (paper, deep navy), ship the portal in that one mode and disable the dark/light toggle. Success: the live site shows the logo matrix, live swatches, type specimens, the GABR gallery, and the prompt library with copy buttons.
9. **Version-control the prompts and run the alignment audit.** Store every generation prompt (and its reference images) alongside its artifact. After the first real render, pull the manifest up to match anything the render sharpened. Success: prompts are committed next to outputs and the manifest reflects the latest identity.

## Output

- Repo: the agreed path (e.g. `~/Documents/github-repos/<...>/<brand>-brand-os/` or a lean `<brand>/brand/` folder).
- Manifest: `BRAND.md` and `brand.json` at the repo root.
- Tokens: `tokens.css`.
- Logo matrix: `logos/`.
- Golden Atomic Brand References: `generation-layer/golden-atomic-brand-references/` (each render plus its `*.prompt.md`).
- Generation layer: `generation-layer/` including `illustrations/SPEC.md`.
- Hosted generation skill(s): `generation-layer/skills/create-on-brand-image/SKILL.md` and `generation-layer/skills/create-gabr/SKILL.md` (and any genre skills), served and linked from `brand.txt`.
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

This is one-time per brand. After the OS exists, do not re-run this recipe to add a single asset or tweak a token. Edit the repo directly (update `brand.json` or `preamble.md`, run the build script to regenerate `brand.txt`, propagate the change downstream) — the `update-brand-os` skill covers this update loop. Re-run this GENERATE only to stand up a different brand.

## Pairs with

- [AI-Led Brand Interview](/playbooks/ai-led-brand-interview): the identity-lock phase this recipe calls in step 1.
- [Agentic Brand OS](/concepts/agentic-brand-os): the concept this recipe produces.
- [Golden Atomic Brand References](/concepts/golden-atomic-brand-references): the curated reference images at the heart of the generation layer.
- [brand.txt](/reference/standards/brand-txt): the all-in-one agent prime this recipe emits.
- [Starting Your Own Wiki](https://truthmanagement.wiki/playbooks/starting-your-own-wiki): the Docusaurus scaffold the full-portal path reuses.
- Forkable starter and worked examples: `SupersuitUp/brand-os-template`, `SupersuitUp/supersuit-brand-os`, `POV-DTX/pov-dtx-brand-os`.
- Live brand.txt example: [supersuit-brand-os.vercel.app/brand.txt](https://supersuit-brand-os.vercel.app/brand.txt) — see what a fully-generated brand.txt looks like.

## Pitfalls

- **Generating before the identity is locked.** Steps 2 onward against an unlocked identity produce drift you then have to redo. Finish step 1 first.
- **Rationing logo variants.** The missing conversion is the moment a teammate or agent improvises and the brand slips. Generate the whole matrix once.
- **Pure-white grounds.** Most brands want a warm or cool off-white. Confirm the ground hex in Q13.
- **Prompts not stored with outputs.** An un-versioned prompt cannot be re-run or improved. Commit the prompt next to the asset every time.
- **Treating the rendered site as the source of truth.** The repo is canonical; the site is the portal over it. The manifest, not the homepage, is what an agent reads.
- **Skimping on the Golden Atomic Brand References.** They are the pillar, the difference between a rulebook and a generator. Validate each with the operator and store the prompt next to every render.
- **Generating an asset whose logo or text must be exact.** Image models garble text, drop letters, and mangle logos. When a logo belongs inside a generated photo, pass the real logo as a reference image and let the model render it in place, integrated into the surface (not a flat overlay). When the asset is fundamentally exact marks or text (a logo lockup, a stat card, a banner with a wordmark), build it as a coded GABT that embeds the real logo SVG and the real tokens.
- **Style drift across assets.** Pass the relevant golden reference back in as an input image for any reused element (mark, mascot, character), or the model re-invents it every time.
- **Flat GABR list in brand.txt with no routing guidance.** Storing `references` as plain filenames or URLs gives agents a list with no meaning. An agent cannot tell which file is the comic-style anchor, which is the default protagonist, or which is mandatory for the Chief of Agents. Every `references` entry must be an object with `file`, `description`, and `when` — and the build script must emit those inline. A flat list is not a routing system.
- **Characters roster absent from brand.txt.** A flat GABR list (file URLs with no descriptions) gives agents zero routing guidance. An agent handed only `brand.txt` cannot tell which image is which character, or which character is the default protagonist for a scene. The build script must read `brand.json`'s `characters` data and emit a `## Characters` section with roles and the `default_protagonist` designation. Without it, the GABR mechanism works but agents use the wrong character — or invent one — because the routing decision is undocumented.
- **No default protagonist designated.** When a brand has multiple recurring characters, agents generating a comic or hero scene need to know who appears by default. Without a `default_protagonist: true` entry in `brand.json`, every generation request requires the operator to name the character explicitly. One character must own "appears when no other character is specified."
- **A stale `brand.txt`.** Generate it at build time from `brand.json` plus an asset scan, never by hand, so it cannot fall behind the assets that exist.
- **Duplicating canon instead of pointing at `brand.txt`.** Once `brand.txt` exists it is the single source of truth for the look. Downstream style, character, and usage docs (a graphic-style page, a comic skill, a character page) should be **thin pointers** to it — link `<site>/brand.txt`, say "brand.txt wins on any conflict" — not second copies of the canon. To change the look, edit the brand OS so the regenerated `brand.txt` carries it; never hand-maintain the same rules in many places. Duplicated canon drifts; one source does not.
- **Cluttered repo when the portal is rendered.** Consolidate the asset package under `static/brand/` so the root reads as a clean Docusaurus site, with the manifest trio (`BRAND.md`, `brand.json`, `tokens.css`) at root.
