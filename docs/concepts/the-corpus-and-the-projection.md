---
title: "The Corpus and the Projection"
slug: /concepts/the-corpus-and-the-projection
description: "Every generated artifact fuses two things: the corpus of annotated inputs and intent it draws from, and the projection, the editable spec that turns that corpus into this particular artifact. Separate them and the corpus becomes a durable asset while every artifact stays cheap, re-rollable, and traceable to its exact source."
image: "/img/comics/the-corpus-and-the-projection.webp"
---

# The Corpus and the Projection

*Every generated artifact fuses two things: the **corpus** of annotated inputs and intent it draws from, and the **projection**, the editable spec that turns that corpus into this particular artifact. Separate them and the corpus becomes a durable asset while every artifact stays cheap, re-rollable, and traceable to its exact source.*

![Comic hero: three-panel neo-comic action-zine strip on cream paper, matte-navy armor with vivid orange seam accents. Title bar: THE CORPUS AND THE PROJECTION. Panel one, THE VAULT: an armored maker stands beside a heavy glowing archive labeled THE CORPUS, its shelves stacked with tagged source cards each stamped with a small provenance seal, a mug reading GATHER ONCE. Panel two, THE LENS: he holds a small etched lens labeled THE PROJECTION up to the vault, and a single finished artifact, a book, beams out of it onto the workbench, caption "one lens, one artifact." Panel three, MANY LENSES: a rack of different lenses labeled MINI-BOOK, FLASHCARDS, ONE-PAGER, AUDIO each throw a different artifact from the same unchanged vault, footer bar: THE CORPUS IS THE MOAT. PROJECTIONS ARE CHEAP.](/img/comics/the-corpus-and-the-projection.webp)

---

## The default is a blob

Ask an agent for a finished artifact and you get one thing: a deck, a report, a mini-book, welded shut. The sources that fed it, the intent behind it, and the logic that shaped it are all dissolved into the output. You cannot see what went in, and you cannot re-run it differently without starting over.

That is fine for something you will make exactly once. It is a trap for anything else, and most valuable work is not once. The moment you want a second version, a different cut, or an honest answer to "where did this claim come from," the blob has nothing to offer. Every change is a manual edit to the artifact itself, which is [hand-rolling](/concepts/hand-rolling): it fixes the thing in your hand and teaches the system that made it nothing.

The fix is to notice that the blob was two things pretending to be one, and to keep them apart from the start.

## The corpus: annotated inputs plus intent

The **corpus** is the durable half. It has three parts, and it is worth building deliberately:

- **Raw inputs, captured with provenance.** The actual sources, stored as they were, each carrying where it came from: the URL, the author, the date, when it was retrieved. This is the evidence layer, and it does not change once captured.
- **Annotations.** A layer over each source that records what matters in it: the key claims, the quotable lines, why it earns its place, the hooks that connect it to your purpose. Raw capture is memory; annotation is understanding, and it is what a projection actually reads from.
- **Intent.** A written statement of what this body of material is for and who it serves. Not an artifact yet, the standing context every artifact will be shaped against.

The corpus is the expensive part to build and the part that compounds. Gathering and annotating a source is work you do once and draw on forever. This is the same substrate that [Self-Improving Artifacts](/concepts/self-improving-artifacts) regenerate from and that a [Golden Chain](/concepts/golden-chain) conditions on: the durable, accumulating context that every downstream output derives from.

## The projection: the editable generator

The **projection** is the disposable half. It is a small, explicit spec that declares how to turn the corpus into one particular artifact: which inputs it draws on, what shape the output takes, and the generation prompt that composes it. Point the projection at the corpus, run it, and an artifact falls out.

A projection is cheap by design. It holds no sources of its own and no hard-won understanding, only the instructions for one cut through material that already exists. The formal version of this is the [PROJECTION.json](/reference/standards/projection-json) contract, which types the surface an artifact occupies, the canon it requires, and the invariants it must satisfy so an agent can plan, produce, and verify it. An [Agentic Brand Universe](/concepts/agentic-brand-universe) is the same split named for one medium: the universe is the corpus, a finished asset is the projection rendered from it.

## Never edit the artifact, turn a knob

The whole point of the split shows up when you dislike the result. You do not touch the artifact. You find which upstream knob was wrong and turn it, then re-compose:

- **The input set** was missing a source, or carrying a weak one. Add it, drop it, re-compose.
- **An annotation** buried the line that should have led. Sharpen it, re-compose.
- **The intent** was aimed slightly off. Restate it, re-compose.
- **The projection prompt** asked for the wrong shape, length, or voice. Rewrite it, re-compose.

Each of these is a fix that lands where the next artifact will inherit it, which is the discipline of [The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing). Editing the artifact directly would give you a correct artifact today and the same wrong one tomorrow. Turning a knob gives you a corpus and a projection that are both better, so the next run starts from the improvement instead of repeating the mistake.

This is why the artifact should feel disposable. A projection you can re-run in seconds removes the incentive to protect a flawed output. You throw it away and project again, because projecting again is cheap and hand-repairing is not.

## Provenance is the payoff, not an afterthought

Because the artifact was composed from a named set of inputs by a named projection, it can carry a manifest: which sources fed it, which projection version produced it, when. Any sentence in the finished thing traces back to the primary source it came from and the prompt that placed it there.

This is not bookkeeping for its own sake. It is what lets you trust an artifact you will act on, defend a claim someone challenges, and re-roll with confidence, because you can see exactly what a change will and will not touch. Provenance is a property you get for free once the corpus and the projection are separate, and one you cannot bolt onto a blob after the fact.

## The corpus is the moat; projections are cheap

Once the two are apart, a second artifact is nearly free. The same corpus projects into a mini-book, a set of flashcards, a one-page brief, a narrated audio version, each one a new projection file and no new gathering. The material was the work. The cuts are cheap.

So the investment goes where it lasts. You spend on the corpus, because it feeds every artifact you will ever make from this material, and you spend little on any single projection, because it makes one artifact and you may well replace it tomorrow. The strategic mistake is the reverse: pouring effort into polishing one output while the inputs behind it stay ad hoc and untraceable, so the effort dies with that artifact and the next one starts from nothing.

## Where it fits and where it does not

This earns its keep whenever you will produce more than one artifact from the same material, or expect to re-roll the same one until it is right. Interview prep from a body of sources, a report that will have five versions, a brand that renders many deliverables: all corpus-and-projection shaped.

It does not fit a genuine one-off. Building a corpus and a projection to make a single thing you will never revisit is [masturbatory programming](/concepts/masturbatory-programming), effort in the machinery for its own sake. The test is the same one that governs [The Renderer and the Payload](/concepts/the-renderer-and-the-payload): the structure pays off on the second artifact and the honest re-roll, not the first draft you will never touch again.

## Further Reading

- [The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing): the discipline this architecture makes possible. When the artifact is wrong, turn an upstream knob rather than hand-edit the output.
- [Hand-Rolling](/concepts/hand-rolling): the failure mode a fused blob forces on you, because there is no upstream knob to turn.
- [The Renderer and the Payload](/concepts/the-renderer-and-the-payload): the complementary split at the output layer, presentation versus content, where this one splits the generation system into inputs versus generator.
- [PROJECTION.json](/reference/standards/projection-json): the typed contract that formalizes a projection so an agent can plan, produce, and verify the artifact.
- [Agentic Brand Universe](/concepts/agentic-brand-universe): the same corpus-and-projection split named for one medium, where the universe is the corpus and every asset is a projection.
- [Self-Improving Artifacts](/concepts/self-improving-artifacts): what a living corpus buys, artifacts that regenerate on a cadence as the corpus grows.
