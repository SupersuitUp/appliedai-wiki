---
title: "The Correction Seam"
slug: /concepts/the-correction-seam
description: "The boundary between two products where one makes an error and the other collects the user's correction of it. The signal is free, self-labeling, and unusable by either company alone, which turns an ordinary build-versus-buy question into a decision about whether to close a loop."
image: "/img/comics/the-correction-seam.png"
---

# The Correction Seam

*The boundary between two products where one makes the error and the other collects the correction. Both halves of a free training pair exist, held by two different companies, and neither one has both.*

![Three panels on cream paper. One, THE USER FIXES IT: at a warm wooden desk a woman in her fifties with short silver hair and a rust cardigan reaches into a single glowing amber laptop where a small rounded agent holds a slip of paper reading I SCREAM struck through, with ICE CREAM written beneath it in her hand. Two, NOBODY CATCHES IT: two separate glowing amber laptops now sit angled apart with a gap between them, each agent inside watching its own dial, while the corrected ICE CREAM slip lies fallen on the bare desk in the gap, unnoticed by both. Three, ONE OWNER, ONE LOOP: the two laptops have become one wider laptop, an amber arrow loops from the right half back into the left where the error was made, the left agent now holds the ICE CREAM slip, and the woman watches from outside with her hand resting on the desk. Footer: THE ASSET IS THE LOOP, NOT THE FEATURE.](/img/comics/the-correction-seam.png)

---

## The seam

Dictate into a coding agent using a voice-transcription app. The transcription mishears a word. You correct it in your next message, because you want to keep working.

You have just produced a labeled training pair: what was transcribed, and what you actually meant. It cost nothing to make, it is labeled by the person who knows the right answer, and it was generated at the exact moment the error mattered.

Nobody can use it.

- The **transcription company** made the error and never sees the correction, because the correction happened downstream, inside a different company's product.
- The **model company** sees the correction sitting in plain text in the conversation and cannot route it back into a transcription layer it does not own.

That boundary is the correction seam. It is not a bug in either product. It is a structural property of two good products owned by two different companies, and it is invisible to both of them, because each company's telemetry stops exactly where the other's begins.

## Why it is easy to miss

The seam hides because both products look healthy from the inside.

The transcription app measures word error rate against benchmarks and does fine. The model company measures conversation quality and does fine. Neither dashboard has a column for *errors we caused that someone else's user fixed for free.* You only see the seam by using both products in one workflow and noticing that you are doing the same repair over and over while the system never learns.

This is why the observation usually comes from a daily operator rather than from a strategy team. Feeling the seam requires being the person who keeps repairing it.

## The test

The seam turns build-versus-buy into a sharper question than cost, speed, or quality. For any adjacent product, ask:

> **Does the error happen in their product while the correction appears in mine?**

Then check the direction of the flow:

- **No loop.** Their product and yours share a user but not a signal. Integrate loosely: an API, a partnership, a recommendation. Owning it would buy you a feature and a maintenance burden.
- **One-way loop.** Their data would improve your product but yours does nothing for theirs, or the reverse. Usually a data or licensing deal, not an acquisition.
- **Two-way loop, currently severed.** Their errors are corrected in your product, and your corrections would make their product better, which would in turn make yours better. This is the build-or-buy case, and the asset you are acquiring is not the feature. It is the loop.

## Why a partnership usually cannot close it

The instinct on finding a severed loop is to propose a data-sharing agreement. That instinct is usually wrong, and for reasons that have nothing to do with engineering.

Closing this loop means moving the user's corrections across a company boundary. Corrections are drawn from conversation content, which is the most sensitive data either company holds. The privacy posture, the retention terms, the training-data commitments, and the liability all have to align between two firms with different customers and different promises. And the partner's incentive runs the other way: a transcription company that works with every model vendor gains nothing by wiring its improvement loop into one of them, because doing so trades its universality for a dependency.

The property that makes an adjacent product excellent, working equally well with everything, is often the same property that prevents it from closing a loop with anyone. That is not a failure on their part. It is the correct strategy for their business, and it is the reason the seam persists between two well-run companies.

## Why the loop is worth more than it looks

Three properties make a closed correction loop more valuable than the feature it comes attached to.

**The data is free and self-labeling.** No annotation vendor, no labeling budget, no eval harness to build. The user produces the ground truth as a side effect of continuing their work, and they produce it only for the cases that actually broke.

**It is the data no benchmark contains.** Public evaluations measure average performance on general text. The correction seam produces failures on *this* user's proper nouns, jargon, accent, and domain, which is exactly the distribution that decides whether the product feels good in daily use ([Daily Use Is the Benchmark That Can't Be Gamed](/perspectives/daily-use-is-the-benchmark-that-cant-be-gamed)).

**Per-user adaptation compounds into switching cost.** A loop that learns one person's vocabulary gets more valuable to that person every week, without anyone engineering a retention feature. The lock-in is a byproduct of the product working better, which is the durable kind.

## The discipline

The test has an obvious failure mode: applied without restraint, it argues for acquiring every adjacent product whose data would be useful, which is how a focused company becomes a conglomerate of mediocre features. Three constraints keep it honest.

**The loop has to feed your core.** If the recovered signal improves something you do not compete on, you have found a nice-to-have and dressed it as strategy. The question is whether the loop makes the thing you actually sell better.

**You have to be able to build it at least as well.** Rebuilding an excellent adjacent product badly destroys the signal you wanted. A worse transcriber generates corrections that teach you about your own inadequacy rather than about the user, and users route around a bad layer instead of correcting it. Below a quality floor there is no loop, only churn.

**The seam has to be real, not theoretical.** Point at the specific place where the correction lands today. If you cannot show the actual message where a user repairs the error, you are reasoning about a loop you have not observed.

## Where this sits

[Vertical Integration Is the Moat](/perspectives/vertical-integration-is-the-moat) makes the general case that owning both the model and the harness compounds, because the harness sees intent, action, and satisfaction. The correction seam is the sharp instrument inside that general claim, and it is available to companies that are not labs.

It says where to cut. Rather than owning more of the stack on principle, find the specific boundary where your product already collects the answer key to somebody else's test. That is a smaller, more defensible, and far more legible decision than a vertical-integration strategy, and it comes with its own evidence: the corrections are already sitting in your logs.

## Further Reading

- [Vertical Integration Is the Moat](/perspectives/vertical-integration-is-the-moat): the general claim this test sharpens, and why the loop beats the model.
- [Daily Use Is the Benchmark That Can't Be Gamed](/perspectives/daily-use-is-the-benchmark-that-cant-be-gamed): why the seam is found by operators rather than by strategy decks.
- [Improvement Compounds When the Loops Nest](/perspectives/improvement-compounds-when-the-loops-nest): what happens once you are running more than one of these loops.
- [The Moat Layer](/concepts/the-moat-layer): the parts of a system that are genuinely yours, and worth owning for the same reason.
- [The Portability Tax](/concepts/the-portability-tax): the cost paid by the adjacent product that works equally well with everything.
