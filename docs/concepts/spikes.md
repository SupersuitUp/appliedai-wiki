---
title: "Spikes"
slug: /concepts/spikes
description: "A small, throwaway experiment whose only job is to kill one risky unknown before you build the real thing. In agentic development its value is the question it answers, never the code it leaves behind."
image: "/img/comics/spikes.png"
---

# Spikes

*A spike is a small, throwaway experiment whose only job is to answer one risky question before you commit to building the real thing. Its output is knowledge, not code. In agentic development, where building is cheap and fast, the discipline that matters is refusing to let the spike become the product.*

---

![Four-panel comic titled SPIKES on cream paper, footer reading "Verify by doing, then build for real." Panel 1, caption "One unknown blocks the whole plan.": the hyperagent in navy plate armor with orange seams faces a wall of grey fog with a glowing orange question mark over a half-drawn blueprint. Panel 2, caption "Drive one probe at the risk.": he drives a tagged SPIKE probe rod through the fog, punching a cyan beam through to the far side. Panel 3, caption "Learn the one fact, cheap.": the fog parts to reveal a steel structure, a READY stamp below it. Panel 4, caption "Throw it away. Build for real.": he walks past the discarded SPIKE toward a solid finished building, a MISSION INTACT stamp beside him.](/img/comics/spikes.png)

## What a spike is

The term comes from Extreme Programming. When a piece of work hides a technical unknown big enough to threaten the whole plan, you drive a spike straight through that unknown: the smallest possible experiment that answers one question and nothing else. Can this API do the thing I am assuming it can? Does this integration actually connect? Does the platform behave the way the docs imply?

A spike is defined by two properties. It is **narrow**: it targets exactly one unknown and ignores everything else. And it is **throwaway**: you learn the answer, write it down, and delete the code. What survives a spike is a fact, not an artifact.

## When to do this

Reach for a spike when the biggest risk in front of you is technical feasibility, and being wrong would waste a lot of downstream work. The signal is a sentence that starts with "this only works if..." followed by something you have not actually verified.

Concrete triggers:

- A **new or opaque platform capability** you are about to build on. A hosted-agent runtime, a new model endpoint, an [MCP](/concepts/integration-recipe) server, a storage primitive. You cannot recall how it behaves, so verify by doing. This is the same discipline as [precise procedures written for the agent](/perspectives/precise-procedures-are-written-for-the-agent): assume nothing, check the live surface.
- An **integration seam** where two systems meet and you are guessing at the contract.
- A plan whose **whole architecture rests on one unproven assumption**. Prove the assumption alone before you build the structure that depends on it.

If the path is already known, do not spike. Just build. A spike is a tool for buying down risk, not a ritual to perform on every task.

## Why spikes matter more in agentic development

Agentic tooling collapsed the cost of building. You can stand up the real structure in an afternoon, so the temptation is to skip straight to it. That is exactly the trap. When building is cheap, the expensive mistake is no longer slow code, it is **building elaborate, correct-looking structure on top of an assumption that turns out to be false**. The more capable the agent, the more convincing the wrong thing it will confidently produce.

A spike is the cheap counter. It isolates the one risky seam, proves or kills it for a few dollars and a few minutes, and lets the real build proceed on solid ground. Cheap to run and cheap to throw away is a better trade than fast-to-build and expensive-to-unwind. This is a targeted cousin of [Agentic Exploration](/concepts/agentic-exploration): exploration widens the search for what is good, a spike narrows to whether something is possible.

## The one rule: a spike is throwaway

Judge a spike only on the question it answered. Its code is scaffolding, its output is a byproduct, and both get discarded. The moment you keep the code because "it mostly works," you have stopped spiking and started building on scaffolding that was never meant to bear load.

## The failure mode: letting the spike become the product

The characteristic way a spike goes wrong is that its **output masquerades as real work**. A spike deliberately cuts corners to answer its question fast, so its artifact is not representative of what the real pipeline produces. Show that artifact as if it were the deliverable and you mislead yourself first, then everyone you show it to.

A worked example. To prove a hosted-agent runtime could load a project's data and produce a rendered result at all, an operator ran a spike: it mounted a stripped-down fragment of the project rather than the whole thing, and let the agent improvise its own generation call. The spike answered its question honestly. Yes, the runtime could mount data, generate, and check its own output. But the render itself came out soft and generic, because the fragment was missing most of the real inputs, the agent had reached for an older model, and it had [hand-rolled](/concepts/hand-rolling) a call instead of running the pipeline the project already owned. Presented as a result, it fell apart the instant someone asked for its provenance: wrong model, minimal inputs, no recipe.

Nothing about the spike was a failure. It proved the seam. The error was treating a feasibility probe as a quality demonstration. The lessons are worth stating plainly, because each is a rule the spike quietly broke:

- **A spike proves a seam works. It does not demonstrate quality.** Keep those claims separate, out loud.
- **Label a spike as a spike.** The people looking at its output need to know what corners it cut.
- **Do not hand-roll a generator you already own.** A spike may skip the real pipeline to move fast, but the real build must run the committed pipeline, or you are shipping the spike. See [The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing).
- **Then throw it away and build the real thing.** The spike's job ended when the question was answered.

## When not to spike

- The path is known. Building is the faster way to learn now. Do not perform feasibility theater.
- The risk is taste, not feasibility. That is a job for [Agentic Exploration](/concepts/agentic-exploration), which searches for what is good rather than what is possible.
- You have grown attached to the spike. If you cannot bring yourself to delete it, reread [Your Process Is Disposable, Your Judgment Is Not](/perspectives/your-process-is-disposable-your-judgment-is-not). A spike you refuse to discard has already become technical debt wearing the costume of progress.

## Further Reading

- [Agentic Exploration](/concepts/agentic-exploration) (its wider cousin: searching for what is good, not what is possible)
- [The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing) and [Hand-Rolling](/concepts/hand-rolling) (the anti-pattern a spike must not harden into)
- [Your Process Is Disposable, Your Judgment Is Not](/perspectives/your-process-is-disposable-your-judgment-is-not) (why throwaway has to mean throwaway)
- [Frameworks Are Proven by Variety, Not Volume](/perspectives/frameworks-are-proven-by-variety-not-volume) (proving by doing rather than by review)
- [You Cannot Plan the Upgrades That Matter](/perspectives/you-cannot-plan-the-upgrades-that-matter) (why some things can only be learned by running them)
