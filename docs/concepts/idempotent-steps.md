---
title: "Idempotent Steps"
description: "A step is idempotent when running it a second time is safe and changes nothing. In agentic work, where sessions crash, run out of context, and get interrupted constantly, idempotency converts crash recovery from a design problem into a non-problem: the recovery procedure is just run it again."
image: "/img/comics/idempotent-steps.png"
---

# Idempotent Steps

*A step is idempotent when running it a second time is safe and changes nothing. Agents are interrupted constantly, so idempotency is what makes "just run it again" a complete recovery strategy instead of a gamble.*

![Three panels, warm editorial ink and wash, one woman at a wooden desk with a glowing amber laptop, the same in each. One, THE RUN IS INTERRUPTED: inside the screen a workbench holds a row of clay lamps, three of them lit and the remaining places empty, and the screen is going dark while her hand lifts from the keyboard. Two, IT SKIPS WHAT IS DONE: the screen is lit again and a small rounded holographic figure in a gold military cap walks the bench, stepping past the lamps that are already burning and reaching only for the empty places. Three, ONLY THE MISSING WORK IS PAID FOR: every place on the bench now holds a lamp burning with the same steady glow, and she is leaning back, unhurried.](/img/comics/idempotent-steps.png)

---

## The failure it prevents

A human runs a script once, watches it, and knows whether it finished. An agent does not get
that. It runs a step, dies partway through on a context limit or a killed process or a network
timeout, and a fresh session picks the work back up with no memory of what already happened.

That fresh session has exactly two options. It can try to remember what was done, which it
cannot, because the previous session's reasoning is gone. Or it can run the step again.

If the step is idempotent, running it again is free and correct. If it is not, running it again
duplicates records, re-spends money, overwrites good work with a worse regeneration, or silently
corrupts state in a way nobody notices for a week.

**Interruption is the normal case in agentic work, not the exception.** Designing for a clean
single pass is designing for the rare path.

## What it looks like in practice

The pattern is small and mechanical. Before doing the expensive thing, check whether it is
already done, and skip it if so.

- A reference-art step that shoots eight images per character skips every image already on disk,
  so a re-run after a crash costs nothing for the seven that landed.
- A backfill that writes metadata files never overwrites one that already exists, because a real
  record always outranks a reconstructed one. Run it twice and the second run writes zero files
  and says so.
- A documentation generator rebuilds derived files from source, so a second build with no source
  change is a no-op. That property is worth its own test, because if a build is not idempotent
  then its "is this stale" check reports stale forever and everyone learns to ignore it.
- A registry that records a known workspace does nothing when the entry is already there.

Notice that none of these require the step to remember anything. They ask the filesystem.

## Why this matters more for agents than for people

**Memory is the unreliable part, and idempotency removes the dependency on it.** A
non-idempotent step forces someone to answer "did this already run?" from recollection. A human
can sometimes do that. A fresh agent session never can. Making the step check its own state
converts a memory problem into a state problem, and state is the thing that survives the session
ending.

This is the same move as writing provenance as a side effect of generating rather than as a
step you remember at the end, and the same move as deriving documentation from its source
instead of maintaining it by hand. In all three, the reliable version does not depend on anyone
remembering.

**It also makes concurrency survivable.** Several agent sessions working the same repository will
run overlapping steps. If those steps are idempotent, the overlap is wasted cycles. If they are
not, the overlap is corruption, and the corruption is usually invisible until much later.

**And it protects spend.** Stochastic generation is the expensive part of most agentic
pipelines. A resumed run that re-generates work it already paid for is not only wasteful, it
produces a *different* result, because generation is not deterministic. The second image is not
the blessed one. Skipping it is both cheaper and more correct.

## Idempotent is not the same as resumable

They are siblings and they are often confused.

[Project resumability](/concepts/project-resumability) is about a cold reader reaching the true
state of the work from the files alone. It is a property of the *artifact*.

Idempotency is a property of the *operation*. A resumable project tells you where things stand.
Idempotent steps let you act on that without fear.

You want both, and they fail differently. A project that is resumable but whose steps are not
idempotent will tell you exactly where it stopped and then punish you for continuing. Steps that
are idempotent inside a project nobody can read leave you re-running things blindly and hoping.

## How to design one

Three questions, in order.

1. **What does done look like on disk?** If you cannot name the file, the field, or the record
   that proves the step ran, the step cannot check itself and you are back to remembering.
2. **What is the cheapest honest check?** Prefer the existence of an artifact over a status flag
   somebody has to keep updated, since a flag can lie about work that was never finished.
3. **What happens on partial completion?** The interesting case is not zero or done, it is seven
   of eight. Make the unit of skipping the smallest thing that costs real money or time, not the
   whole batch, or a crash on the last item redoes the first seven.

One caution. Idempotency has to be honest about what counts as *the same*. A step that skips
because a file exists, when the file is stale or was written by an older version of the rules,
is not idempotent, it is blind. When the inputs can change under a completed step, the
check has to compare the inputs and not merely the presence of an output.

## Further Reading

- [Project Resumability](/concepts/project-resumability), the sibling property, about the artifact rather than the operation.
- [Save Your Progress](/concepts/save-your-progress), the ritual that gets a session's value into durable homes before the context clears.
- [Prompt Guards](/concepts/prompt-guards), a worked example of a guard that skips itself when the rule is already present.
- [Playable Harness Experience](/concepts/playable-harness-experience), the distributable bundle these steps usually live inside.
- [Fix the Generator, Not the Output](/perspectives/fix-the-generator-not-the-output), the discipline that makes a step worth hardening in the first place.
