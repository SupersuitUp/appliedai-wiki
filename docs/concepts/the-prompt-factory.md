---
title: The Prompt Factory
slug: /concepts/the-prompt-factory
description: "Deterministic code that assembles the final prompt from locked parts plus per-run variables, so no LLM call is spent constructing what a template and a branch could have built."
image: "/img/comics/the-prompt-factory.png"
---

# The Prompt Factory

*Deterministic code that assembles the final prompt from locked parts plus per-run variables, so no LLM call is spent constructing what a template and a branch could have built.*

![Three-panel comic in neo-comic action-zine style on cream paper with forest-green-and-gold power-armor DNA. Panel 1, THE WASTEFUL WAY: a boxy robot marked LLM slowly handwrites yet another scaffolding scroll beside a pile of crumpled near-identical scrolls red-circled TOO LONG, REDO, SAME AS LAST TIME, STILL OFF, AGAIN?, a CREDITS meter reads SPINNING DOWN, caption: THE MODEL REBUILDS THE SAME PROMPT EVERY RUN. Panel 2, THE FACTORY: the supersuited leader in forest-green plating with gold seams and a gold spiral above his head works a gear-stamped PROMPT FACTORY press with three padlocked blocks labeled PREAMBLE, STYLE ANCHOR, NEGATIVES and one cyan slot labeled SCENE, VARIES PER SCROLL, the emerging scroll showing those four sections filled in, caption: CODE ASSEMBLES. ONLY THE VARIABLE PART VARIES. Panel 3, THE PAYOFF: six numbered cyan lanes carry six identical-scaffold scrolls into six finished picture frames at once while the leader reviews with one raised gauntlet beside a checkmarked badge reading 6 SCENES GENERATED IN PARALLEL, caption: INSTANT, IDENTICAL, PARALLEL. Title bar: THE PROMPT FACTORY. Footer bar: SPEND THE MODEL ON JUDGMENT, NOT ASSEMBLY.](/img/comics/the-prompt-factory.png)

---

## What it is

A **Prompt Factory** is the deterministic layer that builds the prompts a generation pipeline sends to a model. It holds the locked parts (the preamble, the style anchor references, the negative rules, the output format contract) as data, takes the per-run variables (this scene, this record, this recipient) as input, and emits the finished prompt by assembly rather than by asking an LLM to write it.

The name describes the shape: raw parts go in, finished prompts come out, and the machinery in between is ordinary code. A factory can be a template literal, a function with branches, or a small module reading a spec file. What makes it a factory is that nothing inside it improvises.

## Why it exists

Pipelines that generate at volume (a book of illustrations, a batch of briefs, a personalized mailing) repeat most of every prompt. When an LLM is asked to reconstruct that repeated scaffolding on each run, three costs stack up:

- **Credits and latency.** Every reconstruction is a paid call and a wait, spent producing text you already had yesterday.
- **Drift.** The reconstruction is never verbatim. The parts of the prompt that were supposed to be constants (the style rules, the banned terms, the format contract) wobble run to run, and the output quality wobbles with them.
- **Debuggability.** When a bad output arrives, you cannot tell whether the model failed the task or failed to rebuild the scaffolding. The factory removes the second suspect entirely.

This is [the judgment line](/perspectives/the-judgment-line) applied to prompt construction: assembling a known scaffold is below-the-line work, and below-the-line work never goes through an LLM.

## Deterministic does not mean rigid

The reflex objection is that hardcoding the prompt kills flexibility. It does not, because the flexibility was never in the scaffolding:

- **Code branches.** A factory can select different preambles per content type, inject conditional rules per entity in frame, and compose reference lists per scene. Branching logic is what code does best.
- **The model choice carries customization.** Much of what feels like prompt-level variety is a routing decision: which image model, which tier, which voice. The factory holds the routing table; swapping the model swaps the character of the output without touching the scaffold.
- **References carry identity.** In image pipelines especially, the recurring anchors (style swatches, character sheets) travel as reference inputs the factory attaches deterministically. The prompt text stays lean because the references do the heavy lifting, per [Agentic Brand OS](/concepts/agentic-brand-os).

The LLM still appears in the pipeline where judgment lives: writing the one-off scene description, scoring the output, deciding what to regenerate. It no longer appears as a typist reassembling boilerplate.

## The parallel dividend

A factory changes the pipeline's shape as well as its cost. Because prompts are produced instantly and independently, nothing forces the generations into single file. Steps that are not load-bearing on each other's outputs can fan out and land together: twelve illustrations render as a batch, and the human reviews a set instead of drip-feeding corrections between serial runs. Sequencing is reserved for the steps where an output genuinely feeds the next input. The experience-side argument for why this matters is made on the UX canon at [Blame the Architecture, Not the Model](https://userexperience.wiki/perspectives/blame-the-architecture-not-the-model): the human's felt quality of an AI product is how rarely they are forced to correct and wait.

## How to spot the missing factory

- The pipeline's LLM transcript shows the same paragraphs being regenerated with small mutations run after run.
- Style or format rules that were "locked" keep resurfacing as defects downstream.
- Generations run serially with no dependency justifying the order.
- Token spend scales with volume even though the per-item novelty is one sentence.

Each is the same root cause: judgment-priced machinery doing assembly-priced work.

## Further Reading

- [The Judgment Line](/perspectives/the-judgment-line): the architectural rule this pattern instantiates
- [Agentic Brand OS](/concepts/agentic-brand-os): the reference-carried identity system a factory attaches deterministically
- [Harness Engineering](/disciplines/harness-engineering): the discipline the factory belongs to
- [Sometimes the Workflow Step Should Be an Agent](/perspectives/sometimes-the-workflow-step-should-be-an-agent): the inverse call, for when a step earns real judgment
- [Blame the Architecture, Not the Model](https://userexperience.wiki/perspectives/blame-the-architecture-not-the-model): the UX-side case that correction load is an architecture output
