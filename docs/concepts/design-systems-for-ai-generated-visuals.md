---
title: "Design Systems for AI-Generated Visuals"
slug: /concepts/design-systems-for-ai-generated-visuals
description: "Generating a coherent corpus of AI visuals is a design-system problem. Recurring identity anchors (character look, palette, world) ride in reference images. Variable per-render content (scene, HUD, captions, banned-term substitutions) rides in the prompt. They cooperate, anchored by a spec doc, named characters, and a single bundled skill."
---

# Design Systems for AI-Generated Visuals

*Generating a coherent corpus of AI visuals is a design-system problem. Recurring identity anchors (character look, palette, world) ride in reference images. Variable per-render content (scene, HUD, captions, banned-term substitutions) rides in the prompt. They cooperate, anchored by a spec doc, named characters, banned-term lists, and a single bundled generation skill.*

![Four-panel comic in neo-comic action-zine style on cream paper. Title bar: DESIGN SYSTEMS FOR AI-GENERATED VISUALS. PANEL 1 (top-left), '1. DRIFT': a 2x3 grid mini-panel showing six AI-generated characters all visibly different (different ethnicities, builds, outfits, palettes), each labeled with a varying prompt fragment underneath ('futuristic engineer', 'AI implementer', 'the architect', 'the operator', 'the builder', 'the protagonist'). Red 'DRIFT' stamp at the top-right of the grid. Thought-bubble above: 'Same character. Six versions.' Caption: 'Without a system, every render reinvents the look.' PANEL 2 (top-right), '2. DIVISION OF LABOR': an East Asian hyperagent Supersuited in forest-green plating with metallic gold seam accents stands at a workbench. A large cyan holographic generation pipeline floats in front with TWO input streams: TOP STREAM tagged 'REFERENCES: recurring anchors' (character, palette, world) flowing in via a small character-sheet poster + a palette swatch row; BOTTOM STREAM tagged 'PROMPT: per-render scene' (this beat, this HUD, this caption, banned-term subs) flowing in as a glowing prompt-text card. Both streams converge into a central GENERATION PIPELINE block, which outputs a clean rendered comic panel of the same forest-green hyperagent. HUD callout at top: 'REFERENCES + PROMPT · DIVISION OF LABOR'. Caption: 'References anchor the recurring look. Prompts carry the variable scene.' PANEL 3 (bottom-left), '3. THE STACK': the same forest-green-and-gold Supersuited hyperagent at a pulled-back angle gestures toward a seven-layer holographic system-architecture stack rendered bottom-up: '1. SPEC DOC', '2. REFERENCE LIBRARY', '3. NAMED CHARACTERS', '4. BANNED-TERM LISTS', '5. BUNDLED SKILL', '6. ALT-TEXT STORAGE', '7. ALIGNMENT'. All seven layers shoot cyan beams to the right into a generation pipeline funnel that outputs a column of coherent OUTPUT ARTIFACTS. Physical command office (cockpit window, three monitors, skill shelf) visible in soft focus behind him. Caption: 'Stack the discipline. Every render runs through one funnel.' PANEL 4 (bottom-right), '4. ONE UNIVERSE': FIRST-PERSON POV through the hyperagent's helmet visor, translucent cyan visor band creating the panel borders. HUD displays a 2x3 grid of six small AI-generated artifacts all clearly from the same universe (comic strip, character portrait, system diagram, mission brief, hero shot, HYPERAGENT brand logo), same line weight and palette across all six. 'HYPERCONTEXT LOADED' stamp at top-right of the visor. 'CORPUS COHERENT' stamp centered above the grid. A forest-green-and-gold gauntleted hand reaches forward from the bottom edge. Cyan core glow at the bottom edge. Single unified gold coiled-spiral halo at the top of the visor view. Caption: 'One system. One universe. A hundred renders.' Footer bar in chunky inked caps: 'ANCHOR IN REFERENCES. VARY IN PROMPTS. THE SYSTEM HOLDS.'](/img/comics/design-systems-for-ai-generated-visuals.png)

---

## The Default Outcome Is Drift

The first time you generate an AI image, you write a careful prompt and the result feels almost made. The next time you generate one for the same brand, the model picks slightly different proportions, a different palette, a different character build. Five renders in and the corpus looks like five different artists made five different things.

This is the default. Single-shot prompts are unstable. Even when the prompt is verbatim identical, the model rolls within a wide envelope. When the prompt drifts in language ("the protagonist" vs "the hyperagent" vs "the engineer"), the visual envelope widens further. When the corpus has recurring characters, a recurring world, or a recurring style, the drift compounds. Every render reinvents the look.

Working around this with longer prompts is a trap. Stacking more visual descriptors ("matte-navy armored plating, vivid orange seam accents, clean chest, cyan wrist glow, gold spiral halo, mid-30s East Asian face, dark close-cropped fade") makes the prompt more brittle, not more reliable. The descriptors trip moderation filters when they get specific enough to lock identity. The model still picks a different face every time. And the prompt now has to be edited on every render to vary the scene without breaking the identity.

The fix is upstream. The recurring anchors of visual identity belong in image data. The prompt still does load-bearing work on every render (what is happening in this panel, what HUD floats, what the captions read, what banned terms get substituted), but the pieces that should hold constant across the corpus belong in reference images.

## Division of Labor: References and Prompt

The single most useful move when generating a corpus of AI visuals is to **pass canonical reference images alongside the prompt on every render.** The model picks up identity, palette, line weight, and composition from the references with much higher fidelity than from text alone. References and prompt then split the work.

**References carry the recurring anchors.** Character implementation (faces, hair, gear), exact palette values, line weight, panel-composition family, recurring locations. These are the things that should look the same across a hundred renders. Encoding them in prose every time is brittle: descriptors drift across operators, the model rolls within a wide envelope, and stacking enough specificity to lock the look trips moderation filters. Encoding them in image data is stable. Pass the same references on every call.

**The prompt carries the variable per-render content.** Which named character is on the panel, what state they are in (pre-suit, suited, helmet on or off), what is happening in the scene, what the HUD overlays read verbatim, what the captions say, what banned-term substitutions apply, what panel-count and beat structure this render uses. This is the part that legitimately varies render to render, and language is the right substrate for it.

Two practical wins from the division:

**Identity stabilizes across renders.** A character sheet image of your protagonist (full body, multiple views, gear callouts) passed on every render anchors the look. The prompt names the character ("The Chairman, see character reference") and describes the per-render state; the reference does the visual rendering. Same face, same suit, same proportions. Five renders in, the corpus feels like one universe.

**Moderation filters stop blocking you.** Most frontier image models reject prompts that name trademarked IP (specific superheroes, branded designs, named celebrities). The visual you want is often dangerously close to a moderated concept. When the implementation lives in the reference, the prompt can use safety-clean generic descriptors ("the protagonist, see reference") and produce the same visual result. The IP-tripping language stays in your wiki's prose where it teaches the human reader. The prompt sent to the model is the generic version, anchored visually by the references.

This single move flips the cost structure. Prompts become short and stable for the recurring identity, references do the heavy lifting for visual implementation, and the per-render language stays focused on what actually changes.

## The Anatomy of the System

Reference-image anchoring is the seed. A full design system for AI-generated visuals stacks several more layers on top, each of which compounds.

**A canonical spec document.** One source of truth for the visual identity: palette, line weight, composition rules, panel count, character canon, banned vocabulary, output spec. Lives once. Other locations cross-link instead of duplicating. When the spec changes, one edit propagates. This wiki family's canonical spec is [supersuit.wiki/reference/graphic-style](https://supersuit.wiki/reference/graphic-style); [reference/graphic-style](/reference/graphic-style) is the local mirror.

**A reference image library.** Every render passes a fixed set of canonical references: at minimum a style reference (panel layout, line weight, palette) and a character reference (the protagonist's look). Conditional references load when the render touches the worlds or substrates they lock (a workshop scene, a virtual command hall, a recurring location). The library lives in the generation skill so every operator passes the same images.

**Named canonical characters.** When the corpus has recurring protagonists, each character gets a dedicated character sheet image. The character is named (not "the engineer" but a specific named protagonist); the look is locked by the sheet; the prompt language calls the name and lets the image do the rendering. No improvisation. No "version-of-the-protagonist-with-glasses-this-time." The corpus feels like one ongoing story instead of a hundred one-offs.

**Banned-term lists.** Three layers stacked, each shipping with the spec doc:

1. *IP-safety bans* (trademarked names that trip moderation filters). The visual still arrives via reference images; the names stay out of the prompt.
2. *Brand bans* (terms that violate your product identity). Generic-sounding words the model gravitates toward but that compete with your canonical naming. Replace them everywhere.
3. *Voice bans* (terms that drift the canonical actor framing). The protagonist acts; the equipment does not. Captions, panel labels, and alt text all obey the same rule.

**A single bundled generation skill.** Wrap the spec doc, the reference image library, the prompt template, the banned-term lists, and the post-processing rules into one callable. Every render goes through one funnel. The discipline doesn't drift across operators because there is only one path. New operators learn the system by reading the skill. New visual conventions get added to the skill and propagate everywhere.

**Version-controlled prompts.** The prompts you ship belong in files alongside the artifacts they generate. For images on a markdown surface, alt text doubles as accessibility and prompt storage. The full discipline lives in [Version-Control Your Prompts](/foundations/version-control-your-prompts).

**Artifact-and-source alignment.** After a render lands, the artifact (image) and its source (article, deck, brand doc) get audited together. If the render introduced a sharper framing, a renamed concept, or a new beat, the source gets pulled up to match. Drift between artifact and source is corpus rot. Catch it in the same commit.

## A Worked Example

The Supersuit Up wiki family is the production worked example. Five wikis (this one and four siblings) share one comic style, two named protagonists, the same panel-count rules, palette, banned vocabulary, and alt-text discipline. The canonical spec lives at [supersuit.wiki/reference/graphic-style](https://supersuit.wiki/reference/graphic-style). The bundled generation skill (`supersuit-org-comic`) is the funnel every comic on every wiki passes through. The reference image library lives in the skill folder; character sheets carry each protagonist's identity, and conditional references lock the recurring workshop, the virtual command hall, and the canonical file tree.

Each comic hero on each wiki passes through the same pipeline. The result is that a reader who lands on a comic on any of the five wikis recognizes it as part of one universe. Same line weight. Same cream paper. Same characters when they appear. Same captioned beats. No operator had to negotiate any of that at render time. The system carried it.

## For Implementers

If you're building this for a principal or a firm, here's the order of operations:

1. **Lock the spec first.** One document. Palette, line weight, composition, named characters, banned vocabulary. Write it before you generate a single artifact.
2. **Produce the reference image library.** Generate (or commission) the canonical character sheets and style references. Save them where the generation skill can read them. This is the single highest-leverage step.
3. **Wrap the discipline in a skill.** Bundle the spec, the references, the prompt template, the banned-term lists, and the output paths into one callable. Make it the only way to generate corpus artifacts.
4. **Ship the alt-text discipline.** Every embed stores the prompt-readable description in the alt text. See [Version-Control Your Prompts](/foundations/version-control-your-prompts).
5. **Audit alignment after every render.** Pull the source artifact up to match if the render landed a sharper framing.

Most of the cost lives in steps 1 and 2. Once the spec and the references exist, every subsequent render is cheap. The design system pays for itself by the third artifact.

The implementer's value to the principal is standing up the system that keeps the corpus coherent as the principal scales generation across a hundred renders, across a year, across the next model that ships. One image is a deliverable. The system is the asset.

---

## Further Reading

- [Version-Control Your Prompts](/foundations/version-control-your-prompts): the alt-text-as-prompt-storage discipline this concept builds on
- [Compounding Docs](/foundations/compounding-docs): why corpus coherence compounds over time
- [Learn the Harness, Not the Wrapper](/perspectives/learn-the-harness-not-the-wrapper): reference images are the primitive, the prompt is the variable wrapper
- [Graphic Style](/reference/graphic-style): this wiki's own visual spec, an in-production worked example
