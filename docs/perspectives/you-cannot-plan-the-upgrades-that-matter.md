---
title: "You Cannot Plan the Upgrades That Matter"
slug: /perspectives/you-cannot-plan-the-upgrades-that-matter
description: "The features that make a generation pipeline good are discovered by delivering real artifacts to real people, not by designing the pipeline up front. Real delivery is the roadmap, and the commit history is the record of thinking."
image: "/img/comics/you-cannot-plan-the-upgrades-that-matter.png"
---

# You Cannot Plan the Upgrades That Matter

*The upgrades that make a generation pipeline good are not designed in advance. They are surfaced by delivering real artifacts to real, named people, where each delivery exposes exactly one gap the plan could not have predicted. Real delivery is the roadmap. The commit history is the record of thinking, and it is legible evidence that the work was demanded rather than invented.*

![Three-panel cream-paper comic strip titled YOU CANNOT PLAN THE UPGRADES THAT MATTER, footer bar reading REAL DELIVERY IS THE ROADMAP. Panel 1, caption "He hands the finished book to one real reader.": the hyperagent in bulky matte-navy power armor with orange seams hands a finished illustrated book to a smiling older woman in a red cardigan, in a warm room. Panel 2, caption "Her use exposes one gap no plan predicted.": he stands hand-on-chin studying a large brass-and-steel book-printing engine of gears and rollers, a single crimson spark marking one fracture among the gold gears. Panel 3, caption "He repairs the ENGINE, not the book. The line rises.": he welds the fractured gear with a gold tool, the seam now sealed in gold, while behind him a staircase of finished books ascends to the upper right, each step brighter than the last, with a gold MISSION INTACT stamp in the corner.](/img/comics/you-cannot-plan-the-upgrades-that-matter.png)

---

## The accusation this answers

Anyone building a pipeline that keeps growing hears the same charge: you are over-engineering. Ship the thing and stop polishing the machine.

The charge is worth taking seriously, because over-engineering is real and it looks identical from the outside. Both cases produce a system with more parts this month than last. The difference is not size or velocity. It is **provenance**: where the requirement came from. Call the healthy version **disciplined compounding**, growing a system only where real use has already demanded it ([canonical treatment](https://compounding.wiki/concepts/disciplined-compounding)).

Over-engineering builds for a user who has not shown up yet. It is speculative generality, features designed against an imagined future load. The discipline described here builds only for a delivery that already happened and went badly, or went well and revealed the next constraint. Every part traces to a specific artifact that went to a specific person and taught you something.

That test is not rhetorical. For any component in your system, ask: *which real delivery demanded this?* If you can name it, the part is earned. If the honest answer is "I thought we might need it," you are over-engineering, and no amount of iteration language makes it otherwise.

## What the evidence looks like

A worked case: a personal picture-book platform, one operator, six days. Two hundred sixty-three commits. Ninety-nine books shipped.

The commit history interleaves in a specific and diagnostic way. A book ships. Then the engine grows a feature. Then another book ships, and the engine grows again. The features are not batched into a platform phase followed by a content phase. They alternate, because each one was provoked.

The most telling example: a private single-book share system, complete with token minting, a chrome-less reader route, dual-auth on the guest book, and an admin revoke path. Read as a plan, that is an unmistakable case of over-engineering: nobody needs an entitlements system for a picture book. Read against the history, it exists because one particular book was made for one particular person and had to reach them without being public. The requirement was not forecast. It arrived attached to a name.

The same history shows the inverse discipline. Reading-position tracking, a resume strip, and the vocabulary change from "spread" to "page" all landed after real people read real books and the friction became visible. None of it was on a roadmap. All of it was obvious the moment someone actually read something.

## Fix the engine, not the instance

The mechanism that makes this compound rather than sprawl is where the fix lands.

When a delivery exposes a defect, there are always two places to repair it: in the artifact, or in the thing that produced the artifact. Fixing the artifact ships today and teaches the system nothing. Fixing the producer costs slightly more today and means that class of defect stops recurring for every future artifact.

The second option is what turns a sequence of deliveries into an ascending line instead of a flat one. It is also the specific move that makes the growth non-speculative, because you are not adding capability, you are removing a failure mode that has already occurred at least once. See [golden processes](/concepts/golden-processes) for what it looks like when a repaired procedure gets promoted into checked-in machinery.

A practical marker: the second time you find yourself making the same correction by hand, the correction belongs in the engine. The first time is an incident. The second is a pattern, and patterns are cheap to fix and expensive to keep paying.

## Why one person can sustain it

The conventional answer to a system growing this fast is to add people. Here that instinct is usually wrong, and the reason is [context](/concepts/compounding-docs), not heroics.

The expensive part of an upgrade is rarely the implementation. It is knowing which upgrade is correct: what the thing is for, who it serves, which constraints are load-bearing, what was already tried and rejected and why. That knowledge is diffuse, mostly tacit, and extremely expensive to transfer. Adding a person means paying the transfer cost before any work happens, and paying it again for every subsequent decision.

When one operator holds the intent and the system holds the accumulated context in version control, that transfer cost goes to nearly zero. Each new upgrade lands against a system that already encodes every prior decision, so the marginal upgrade gets cheaper rather than more expensive. This inverts the usual expectation that systems calcify as they grow.

The condition is that the context has to be genuinely externalized, not merely remembered. A system whose accumulated judgment lives only in one person's head has the same bottleneck with extra steps.

## The commit history is the artifact

The record of this process is not a strategy document. It is the commit log, and it is worth treating as a real deliverable.

A strategy document states what you intended before you knew anything. A commit history states what you actually learned, in order, with the provocation for each decision still attached. It is the only honest record of thinking, because it cannot be retroactively tidied into a narrative that was smarter than the reality.

Two practices make it legible later. Write commit messages that name the provocation, not only the change: what broke, in which delivery, and why the fix landed where it did. And keep the rejected attempts, marked as rejected, rather than deleting them. A discarded approach preserved with its reason is a fence that stops the system from rediscovering the same dead end.

## The faith part

There is an uncomfortable middle where the pipeline is visibly unfinished, the next upgrade is unknown, and no plan exists to point at. The discipline requires proceeding anyway, on the wager that sincerely serving specific people will surface the right work faster than analysis would.

That is a real bet, and it is not blind. It rests on a structural claim: needs revealed by actual delivery are better evidence than needs imagined in a planning session, because they have already survived contact with a person. Planning optimizes against a model of the user. Delivery optimizes against the user.

The bet fails in one specific way, and it is worth naming. If the deliveries are not real, the loop degenerates. Shipping to nobody produces no signal, and a pipeline improved against imagined use is over-engineering wearing the vocabulary of iteration. The loop is only load-bearing when something actually reaches someone who did not have to be polite about it.

## Further Reading

- [Golden Processes](/concepts/golden-processes): what a repaired procedure becomes once it is blessed and checked in, so the fix stops being re-improvised.
- [Golden Chain](/concepts/golden-chain): a worked example of an upgrade that only became visible after a real batch failed in a way no plan anticipated.
- [Compounding Docs](/concepts/compounding-docs): the externalized-context flywheel that keeps the marginal upgrade cheap enough for one operator.
- [Default to Determinism](/perspectives/default-to-determinism): where to spend the engine upgrades, since the parts worth hardening are the ones that should never have been improvised.
- [compounding.wiki: Disciplined Compounding](https://compounding.wiki/concepts/disciplined-compounding): the canonical home for the discipline, including the one-question provenance test and the failure mode that voids it.
