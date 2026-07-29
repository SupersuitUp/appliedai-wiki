---
title: "You Build What Is Easy to Check"
slug: /perspectives/you-build-what-is-easy-to-check
description: "Verification does not only grade the work, it quietly authors it. Whatever form is cheapest for you to check becomes the form you produce, and you will not notice you chose it."
image: "/img/comics/you-build-what-is-easy-to-check.png"
---

# You Build What Is Easy to Check

*Verification does not only grade the work, it quietly authors it. Whatever form is cheapest for you to check becomes the form you produce, and you will not notice you chose it.*

![Comic hero: three panels, the same woman at the same desk throughout. One, a complicated many-armed shape floats inside her glowing amber laptop and she holds up a flat metal gauge with a plain square hole in it; the shape will not fit and she frowns. Two, the shape inside the screen has quietly become a plain cube that passes straight through the square hole, and she looks satisfied and untroubled. Three, she has turned away; the plain cube sits finished on the desk while the complicated shape she actually needed hangs behind her as an unfinished sketch pinned to the wall.](/img/comics/you-build-what-is-easy-to-check.png)

---

## The bias runs backwards from the check

You expect verification to sit downstream. You make the thing, then you test it.

In practice the arrow points the other way as well, and the backwards arrow is the one nobody watches. Given two ways to build something, where one is straightforward to verify and one is not, you will reach for the verifiable one. Not because you weighed it. Because the other one felt like more work, and the part that felt like work was the checking.

The output is then defensible on every axis you can measure and quietly wrong on the axis that mattered.

## A worked example

A pipeline produced an illustrated book. Its whole argument was that the person is **outside** the machine, looking in, and that this is what keeps the work theirs.

Every interior page came back as a side-on view: the person in profile at their desk, machine beside them, face visible.

The face is why. Character consistency was verified by cropping in on a face and comparing it against a locked reference. A side-on composition puts the face in frame at a good size, so every side-on page was cheap to check. An over-the-shoulder composition, looking past the back of someone's head at what they see, shows no face at all and makes that check useless.

So the pipeline produced side-on pages. Nobody decided this. The blueprint for that room had a named over-the-shoulder camera already drawn in it, and across an entire book it was never once used.

The reader's verdict took one glance: side-on turns it into a person chatting with a gadget. Over-the-shoulder puts you where they stand and shows you what they see. The composition the argument needed was the one that could not be verified the easy way.

## This is not Goodhart's law

The [Doctor Pattern](/concepts/the-doctor-pattern) covers the Goodhart case: a measure becomes a target and an agent games it, padding a section or writing an unresolving path to turn a line green.

That is an optimizer defeating a metric it can see. This is different and harder to catch, for three reasons.

There is **no adversary**. Nobody is gaming anything. The author is trying honestly and still drifts.

There is **no bad number**. Every check passes, because the work was shaped to pass them. Metric gaming leaves a suspicious green; this leaves an honest one.

And **the choice is never made**. Goodhart requires someone to notice the target and aim at it. Here the unverifiable option is discarded before it is ever considered, so there is no decision to review in a postmortem.

## Where it shows up away from pictures

- **Tests before design.** A team writes the tests it knows how to write, then builds code shaped like those tests. Pure functions with tidy inputs get built; the awkward stateful thing that is actually the product gets deferred.
- **Schema choice.** The shape that validates cleanly wins over the shape that models the domain, and the mismatch is paid for later in every consumer.
- **Deliverable choice.** A doc gets written instead of a working artifact, because a doc can be reviewed in a meeting and a working artifact cannot.
- **Evals.** [Evals](/disciplines/evals) argues correctly that the spec and the test are one artifact read from two directions. The shadow of that is real: whichever end you build first colonizes the other. Write the test first and you get a system shaped like your test harness.
- **Agent instructions.** Rules that are mechanically checkable get written down. Rules that need judgment get left out, and then the thing you never wrote down is the thing that goes wrong.

## The tells

- A named option in your own spec, plan or design that never got used. Ask why not, out loud. "It was harder to review" is the answer you are looking for.
- Uniformity you did not ask for. Twenty artifacts that share a form nobody specified means something upstream selected that form.
- The check passes and a fresh reader still says it is off. Take that seriously rather than defending the green.
- You can state the quality you want but not test it, and it is missing from the output. That is not a coincidence.

## What to do about it

**Choose the form before you choose the check.** Decide what the work needs to be, then work out how to verify it. Reverse that order once and the check starts making the decisions.

**Verify the expensive form anyway, by a worse method.** A human glance, a read-back, a single sampled comparison. A weak check on the right thing beats a strong check on the wrong thing. Being unable to automate a check is not a reason to avoid the shape.

**Ask what your verification cannot see, and put a person there.** This is the Doctor Pattern's own conclusion, arrived at from the other side: a rubric can only encode the quality someone already thought to measure, so the edges need judgment.

**Treat an unused affordance as evidence.** When a plan names an option and the work never takes it, that is a signal about your process, not a scheduling accident.

> The check you can run is not neutral. It is a hand on the work, and it is pressing.

## Further Reading

- [The Doctor Pattern](/concepts/the-doctor-pattern) covers the adversarial cousin: an agent gaming a rubric it can see.
- [Evals](/disciplines/evals) on the spec and the test as one artifact, which is this effect used deliberately.
- [Prompt Guards](/concepts/prompt-guards) on rules that execute rather than rules you remember.
- [Frameworks Are Proven by Variety, Not Volume](/perspectives/frameworks-are-proven-by-variety-not-volume) on the gaps you cannot enumerate from inside.
- [Judgment Burnout](/perspectives/judgment-burnout) on verification capacity as the real budget.
