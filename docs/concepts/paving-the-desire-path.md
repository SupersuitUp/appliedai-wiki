---
title: "Paving the Desire Path"
slug: /concepts/paving-the-desire-path
description: "The retrospective pass over a finished run that finds the hand-rolls you could not see while making them, and promotes the ones that will certainly recur into the system itself. You do not plan a desire path, you discover it by looking at the worn grass."
image: "/img/comics/paving-the-desire-path.png"
---

# Paving the Desire Path

*The retrospective pass over a finished run that finds the hand-rolls you could not see while making them, and promotes the ones that will certainly recur into the system itself. You do not plan a desire path, you discover it by looking at the worn grass.*

![Three panels in a warm workroom, title bar reading PAVING THE DESIRE PATH. One, captioned THE RUN SHIPS: a woman in an olive sweater walks away from her desk toward the open door, her back to us, while the glowing amber laptop sits finished behind her and a scatter of small pale paper cards lies across the floorboards she is not looking at. Two, captioned SEE THE WORN LINE: she has come back and stands still in the middle of the room, head bowed, looking down for the first time, and from her angle the scattered cards resolve into one single worn line across the floor with the boards rubbed pale along that line and untouched everywhere else. Three, captioned PAVE ONLY THAT LINE: she kneels and lays smooth pale paving stones along exactly that one line and nowhere else, the rest of the floor left plain, while inside the laptop screen the same line now runs as one clean continuous amber rail. Footer bar reading DISCOVER THE PATH, THEN PAVE IT.](/img/comics/paving-the-desire-path.png)

---

## Why in-the-moment discipline is not enough

[Fix the Generator, Not the Output](/perspectives/fix-the-generator-not-the-output) is the right reflex, and it fires when you notice you are reaching for a one-off. The problem is the noticing. [Hand-Rolling](/concepts/hand-rolling) already concedes this about itself: a hand-rolled fix produces a correct artifact, so nothing looks wrong, and only the aggregate reveals it.

That sentence names a gap the reflex cannot close. If the tell only appears in the aggregate, then something has to actually go and look at the aggregate. In the moment, a hand-roll does not feel like a hand-roll. It feels like getting unstuck, which is a good feeling, attached to real progress, on the way to a result you shipped. Nothing in the experience flags it.

So the discipline needs two beats, not one. The reflex catches what you notice. The sweep catches what you did not.

## Why a desire path

A desire path is the line worn into the grass because people actually walk it. Nobody designs one. You discover it by looking at where the grass died, and then you decide whether to lay pavement.

The metaphor carries two constraints that matter.

**You cannot see a path you are still walking.** Run the sweep after the work ships, not during it. Mid-run, every improvisation is load-bearing and none of it looks optional.

**Paving before the path exists is speculative abstraction**, which is worse than hand-rolling twice. A hand-roll costs one session. A bad abstraction calcifies into every session after it. The whole point of waiting is that the ground has already told you where people walk.

## The bar: name the next invocation

One test decides everything. Complete this sentence with a specific, named case:

> I hand-rolled **X**, and the next thing that will need **X** is **Y**.

If you cannot name Y, do not pave. Write it down and move on.

The bar is genuinely strict, and **declining is the common outcome**. Most improvisation is one-off and should stay that way. But once a candidate clears the bar, "proposed" is not a state it is allowed to rest in.

## Read the evidence, do not recall it

Memory of a long session is unreliable and flattering. It keeps the interesting problems and discards the repetitive ones, which is exactly backwards, because the repetitive ones are the pavement candidates.

Read the artifacts instead. The diff shows what the run actually touched. The scratchpad is the richest source in the whole exercise and the most commonly ignored, because throwaway files feel disposable. The files are disposable. The pattern in them is not. Every one-off script you wrote to get unstuck is, by definition, a hand-roll you have already forgotten writing.

Three more veins worth mining: any retry loop you wrote around an external call encodes a failure mode your system does not model; any verification you performed by hand is a test you are missing; and anything you did more than twice by hand is a loop that belongs in code.

## What a sweep actually finds

The sweep is worth running because its yield is usually not what you went looking for.

A pipeline that renders illustrated books from a versioned canon had accumulated nine separate hand-written scripts for drawing one kind of schematic, roughly thirteen hundred lines, one per object. The expected finding was duplication, and the duplication was real: eight of the nine re-implemented the identical font-loading helper, and several re-implemented the same dimension and dashed-line drawing code.

That was the cheap part. The expensive finding was that **only four of the nine stamped the "layout reference only" marking** that the pipeline's entire convention depends on. Five had shipped a schematic that does not declare itself a schematic, into a system where every downstream consumer assumes the marking is present.

No single run could have surfaced that. Each script worked correctly on the day it was written, and each author was one person solving one problem well. The defect existed only in the aggregate, across nine runs and months of calendar time, which is precisely the shape of thing a retrospective pass exists to catch. The generated replacement stamps the marking unconditionally, with no flag to disable it.

## Classify before you build

Not every candidate gets paved the same way, and sorting them is most of the work.

**Pave** the mechanical and verifiable: a rename, a crop, an aspect conversion, a retry policy. These become code. **Gate** the correctness you were enforcing by paying attention, and make it fail closed. **File a bug** when the system is wrong rather than missing, and resist building a helper on top of a broken guard. **Write guidance** for judgment calls, because coding a taste decision is how a system becomes a straitjacket. **Leave** the genuine one-offs, and say explicitly that you considered and declined them, so the next reader knows it was a decision and not a miss.

## The failure mode: shipping a list instead of a change

The worst available outcome is a sweep whose only artifact is a ranked list of proposals, because it looks like diligence. A suggestion in a log is a task nobody does. The sweep has simply moved the hand-rolling into the future and added paperwork to it.

If the candidate clears the bar, build it in the same session, prove it with a test, and integrate it. The caution belongs in the bar, not in the follow-through. Two exceptions are legitimate and both require saying so plainly: a change that alters behavior for work someone else already shipped, and a change large enough to be its own project, where landing it half-built is worse than not starting.

The tell that this practice is missing entirely: a scratchpad full of one-off scripts at the end of a run, and a system that is byte-identical to how it started. Every one of those scripts is a thing you will write again.

## Further Reading

- [Hand-Rolling](/concepts/hand-rolling): the failure mode this sweep hunts for. It states that only the aggregate reveals a hand-roll, which is the reason the sweep has to exist.
- [Fix the Generator, Not the Output](/perspectives/fix-the-generator-not-the-output): the in-the-moment reflex. This page is what you run for everything the reflex missed.
- [Save Your Progress](/concepts/save-your-progress): the sibling end-of-session pass. That one routes a session's knowledge into durable homes; this one routes its improvisation into the system.
- [The Doctor Pattern](/concepts/the-doctor-pattern): a fixed rubric and punch-list applied to one artifact. A sweep that keeps finding the same defect should graduate into a doctor.
- [Self-Improving Systems](/concepts/self-improving-systems): the compounding this practice buys. A system that absorbs its own desire paths gets better every run instead of every rewrite.
