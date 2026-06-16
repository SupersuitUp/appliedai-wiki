---
title: "Golden Atomic Brand References (GABRs)"
slug: /concepts/golden-atomic-brand-references
description: "A curated set of reference images that carry a brand's recurring visual identity — character looks, style anchors, palette, motifs — into every image-generation request. Passed alongside the prompt, they solve the drift problem: identity rides in image data, not text description."
---

# Golden Atomic Brand References (GABRs)

*A curated set of reference images that carry a brand's recurring visual identity — character looks, style anchors, palette, motifs — into every image-generation request. Passed alongside the prompt, they solve the drift problem: identity rides in image data, not text description.*

---

## What a GABR Is

Each word in the name does load-bearing work:

**Golden** means best-in-class. Not every generated image qualifies — only the ones that best represent what the brand should look like. A GABR is curated, not just collected. If an image doesn't represent the brand at its best, it doesn't enter the canon.

**Atomic** means a single self-contained unit. Each GABR covers one thing: a specific character, a style reference, a motif exemplar, or a brand identity anchor. Not a collage, not a mood board — one thing, done well, reused everywhere.

**Brand Reference** names the purpose: it gets fed back to an image model. Not a hero shot for a website, not a mood board for a designer. A reference image that gets passed as input on generation calls to anchor what comes back.

A GABR is not just a well-generated image. It is a well-generated image that has been validated against the brand's visual canon, registered in the brand OS (`brand.json` `references` array), given a description and a routing rule, and made available as an absolute URL in `brand.txt` so any agent can fetch it.

## Why Reference Images Beat Text for Identity

Single-shot text prompts are unstable. The model rolls within a wide envelope on every render. Even verbatim prompts produce different results. Stacking more visual descriptors makes prompts brittle: they trip moderation filters when specific enough to lock a character's look, and the model still improvises the face. A character described as "young Black man, close-cropped fade, mid-twenties, confident posture" will look meaningfully different across five renders.

When the same character's canonical look exists as a GABR image and is passed as a reference on every render, the model anchors to the image data. Same face. Same proportions. Same palette. Five renders in, the corpus is recognizably one universe.

Reference images also provide an IP-safety win. Most frontier image models reject prompts that name trademarked characters or specific branded designs. The visual you want often lives close to a moderated concept. When the look lives in a GABR, the prompt uses safety-clean generic descriptors ("the host, see reference") and the reference does the visual work. The prompt stays model-compliant; the output is what you intended.

## Division of Labor: References and Prompt

The design principle behind GABRs is a clean split:

**Reference images carry the recurring anchors** — character implementation (faces, hair, gear, expressions), exact palette values, line weight, panel-composition family, recurring locations, motif art. These are the things that should look the same across every render. Put them in image data once; pass them every time.

**The prompt carries the per-render variable content** — what is happening in the scene, what the captions read, what banned-term substitutions apply, what panel-count and beat structure this render uses. The part that legitimately varies render to render is the only thing that goes in the prompt.

This division collapses the cost of generating a coherent corpus. Prompts stay short for the recurring identity; references do the visual heavy lifting; the per-render language stays focused on what actually changes. With this split in place, adding a new asset doesn't require re-describing the whole brand — just describe the scene and pass the references.

## Structure and Annotation

Every GABR in a brand OS has:

- **A file** in `static/brand/generation-layer/golden-atomic-brand-references/`: a PNG, named with a sequential number and descriptive slug: `gabr-01-style-anchor.png`, `gabr-07-russ.png`. An authored GABR (see Generated and Authored GABRs below) also ships its source (`.svg` / `.html`) next to the rendered PNG so it stays editable.
- **A prompt and alt text** stored alongside it in the brand OS repo — the prompt that generated it, stored so it can be reproduced or iterated.
- **A registration entry** in `brand.json`'s `golden_atomic_brand_references.references` array — an object with:
  - `file`: the filename (`gabr-07-russ.png`)
  - `description`: what it depicts
  - `when`: the routing rule — when should this GABR be passed?
- **An entry in `brand.txt`** at build time, formatted as: `- **gabr-07-russ.png** — description | pass when: routing rule → https://absolute-url`

The routing rule (`when`) is what distinguishes a GABR registry from a flat URL list. "Pass for every comic" vs. "pass whenever Russ appears" vs. "pass for any layout with a human figure" — this is the decision logic that tells an agent which image to reach for. Without the routing annotation, an agent sees fourteen files and guesses. With it, the agent has a decision tree.

## Characters vs. Style GABRs

GABRs fall into two categories:

**Character GABRs** anchor a specific recurring protagonist. One GABR per character, ideally a full character sheet (multiple poses, gear callouts, facial detail). The routing rule is typically "pass whenever [character name] appears." The character is registered in `brand.json`'s `characters` object pointing to their GABR, so an agent knows who the default protagonist is and which reference to pass without having to reason about it.

**Style and motif GABRs** anchor non-character visual elements: paper texture, a palette and line-weight reference, a recurring motif (hills, sun, geometric mark), a composition exemplar, a comic-style anchor. These typically have broader routing rules ("pass for every image generation request," "pass for any layout asset"). They carry the visual grammar that makes outputs look like the same brand even when no named character appears.

## Generated and Authored GABRs

Most GABRs are **generated** by an image model: photography, scenes, characters, textures, and plenty of diagrams and charts. Modern image models render type and even logos increasingly well, so generation is the default and covers most of what a brand needs. Everything above about references-beat-text applies here.

Some GABRs are better **authored** in code (SVG, HTML, or JS). This is a supported GABR type, not a requirement, and a lower priority than getting the generated canon right. Reach for an authored GABR when you specifically want a reusable component that is exact and editable: precise design tokens and real fonts, guaranteed spelling, exact geometry and color, output that stays crisp at any size, and a version-controlled source you can re-render as the data changes. A templated stat block, a scorecard whose numbers update, a rail you restyle across decks: these are the natural fits.

The choice is a judgment, not a rule. Generate by default. Author when a component needs to be exact and reused, and the cost of building it in code pays for itself across many renders. An authored GABR ships its source (`.svg` / `.html`) alongside the rendered `.png` so it stays editable.

### Stamping the real mark

When an asset needs the brand mark and it must be exact (a favicon, a precise lockup, a watermark that has to match), you can **stamp the real mark** (the actual logo PNG or SVG) into the asset in code rather than relying on the model to redraw it. The latest image models can render marks well, but stamping the real file guarantees fidelity where it matters. This is the same technique as stamping the real wordmark instead of letting the model set the text: an option to reach for when precision counts, not a blanket prohibition on generating the mark.

## Lifecycle

A GABR is generated (or captured), validated, registered, and then used on every applicable generation call. The `create-gabr` skill in the brand OS guides this:

1. **Generate a candidate** — or identify an existing on-brand output that's best-in-class.
2. **Validate against the brand canon** — does it represent the brand's visual identity at its best? Does it cohere with the existing GABR set?
3. **Register it in `brand.json`** with a `file`, `description`, and `when` routing rule.
4. **Regenerate `brand.txt`** so the annotation appears at the served absolute URL.
5. **Update `preamble.md`'s GABR routing table** to include the new routing rule.

A GABR that hasn't been validated and registered is just an image. Registration is what makes it part of the canon and what makes it reachable by any agent reading `brand.txt`.

## Relationship to brand.txt

`brand.txt` is the served interface over the Agentic Brand OS — one link that primes any agent. GABRs appear in the `## Golden Atomic Brand References` section of `brand.txt`, each annotated with description and routing rule. An agent reading `brand.txt` gets the complete routing decision tree: not "here are 14 image files" but "here is which file to reach for, and when."

This is how the brand stays coherent as the agent roster grows. Every new agent that reads `brand.txt` inherits the same GABR routing logic. The routing table lives in the brand OS, not in any individual agent. A new prompt for a new asset finds the same routing guidance the first prompt used.

---

## Further Reading

- [Agentic Brand OS](/concepts/agentic-brand-os): the full package GABRs are the generation layer of.
- [brand.txt](/reference/standards/brand-txt): the served format that includes annotated GABR entries.
- [Generate an Agentic Brand OS](/playbooks/generate-agentic-brand-os): the recipe that generates the full brand OS and its GABR canon.
- [Golden Examples](/concepts/golden-examples): the curation discipline that produces GABR-quality outputs.
- [Version-Control Your Prompts](/disciplines/version-control-your-prompts): storing the prompts that generate GABRs, so they can be reproduced and iterated.
