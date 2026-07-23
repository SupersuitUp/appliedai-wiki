---
title: "Hand-Rolling"
slug: /concepts/hand-rolling
description: "Producing a one-off result by hand to get around your own system, instead of improving the system so it produces the result. Every hand-roll is a fix that helps once and teaches the generator nothing."
image: "/img/comics/hand-rolling.png"
---

# Hand-Rolling

*Producing a one-off result by hand to get around your own system, instead of improving the system so it produces the result. Every hand-roll is a fix that helps once and teaches the generator nothing.*

![Comic hero: three panels titled HAND-ROLLING. Panel one, an armored operator pulls a slightly crooked object off a machine and files it smooth by hand with a satisfied look, caption "Fix the thing in your hand." Panel two, the same machine keeps producing identical crooked objects that pile up behind him while he hand-files the first, caption "The machine never learned." Panel three, a mountain of crooked objects and one exhausted operator still filing while the untouched machine hums, footer "Every hand-roll fixes one and teaches the machine nothing."](/img/comics/hand-rolling.png)

---

Hand-rolling is what happens the moment your own tool gets in the way and you step around it. The generator produces something wrong or refuses to produce it at all, and rather than fix the generator, you open a side door: a bespoke script, a manual edit, a one-time prompt typed straight into the model. The result comes out fine. The system that was supposed to produce it is exactly as broken as before.

The word carries no shame in isolation. Every system starts hand-rolled, and a genuine one-off that will never recur is correctly done by hand. Hand-rolling becomes a failure mode only against a process **you intend to standardize**. There, each hand-roll is a small theft from your future self: it delivers today's artifact and forfeits the compounding you were building the system to get.

## The tell

You are hand-rolling when you catch yourself doing any of these to a process you own:

- Writing a second script that does what the pipeline already does, because driving the pipeline was inconvenient.
- Editing the generator's output by hand instead of changing what the generator emits.
- Obeying a rule your own system imposed, working around it in the artifact, when the rule is simply wrong.
- Typing a fix into the model directly rather than into the place the fix would persist.

The common thread: the correction lands on the **artifact** and never reaches the **generator**. Next time, the generator makes the same mistake, and you make the same correction, forever.

## Why it is so tempting

Hand-rolling always looks faster in the moment, and for the single artifact in front of you it usually is. Fixing the generator costs more now and pays later; hand-rolling costs less now and pays never. Under deadline the trade feels obvious, which is exactly why it compounds against you: the deadline is always there, so the generator is never fixed, so every run needs the same manual rescue.

It also hides. A hand-rolled fix produces a correct artifact, so nothing looks wrong. Only the aggregate reveals it: a process you have run twenty times that is no more capable than the first time, because all twenty improvements went into the outputs and none into the system.

## The hidden cost: a hand-roll cannot find the bug the system would

The sharpest cost is not the repeated labor. It is that a hand-rolled path **routes around the exact defect the real system would have surfaced.**

A book generator built to render a real recurring character crashed the first time it was pointed at one, because the character's reference photos were declared as a folder and the pipeline passed the folder where the model expected a file. A hand-rolled render script never hit that bug, because it happened to pass references its own way. The bug was real, it was in the shared system, and it would have broken every future book about a real person. Only using the actual pipeline exposed it. The hand-roll would have shipped one good book and left the landmine armed for the next.

This is the deepest reason to stop hand-rolling a process you own: the hand-roll is not only slower to compound, it is **blind to the failures that matter**, because it never exercises the path everyone else will use.

## The correct response

When your own generator produces the wrong thing, the fix is upstream, in the generator, not sideways, in the artifact. If the generator's rules are what block the good result, the rules are wrong and you change them, because you own them. This is the discipline of [Fix the Generator, Not the Output](/perspectives/fix-the-generator-not-the-output): the intended outcome is the authority, and any rule that fights it is a bug in the system rather than a constraint on the work.

## Further Reading

- [Fix the Generator, Not the Output](/perspectives/fix-the-generator-not-the-output): the principle that replaces hand-rolling. When a rule blocks the outcome, change the rule.
- [Default to Determinism](/perspectives/default-to-determinism): the standardized path is cheaper and more consistent than the hand-rolled one, which is why routing around it is a loss.
- [Frameworks Are Proven by Variety, Not Volume](/perspectives/frameworks-are-proven-by-variety-not-volume): each new kind of thing run through the real system is what exposes its holes; a hand-roll runs nothing through it.
- [Masturbatory Programming](/concepts/masturbatory-programming): the opposite failure, over-investing in the system for its own sake. The line between them is whether the work serves a real outcome.
- [A Startup Is an Outcome Generator](/perspectives/a-startup-is-an-outcome-generator): if the company is the generator, hand-rolling its outputs is refusing to build the company.
