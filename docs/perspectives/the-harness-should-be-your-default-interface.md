---
title: The Harness Should Be Your Default Interface
slug: /perspectives/the-harness-should-be-your-default-interface
description: "Most people open an app and do the work by hand. The better default is to start in an agentic harness, describe the outcome, and let the harness open an interface only for the steps that need your body."
image: "/img/comics/the-harness-should-be-your-default-interface.png"
---

# The Harness Should Be Your Default Interface

*Most people open an app and do the work by hand. The better default is to start in an agentic harness, describe the outcome, and let the harness open an interface only for the steps that need your body.*

![Three panels in a warm room with a wall of small message cards. One: the laptop sits closed while a man corrects the cards one at a time by hand, and only the two under his hand carry a mark. Two: he turns to the now-open glowing amber laptop and holds out a single card, which a thin amber line carries in to a small gold-capped figure inside the screen, while the wall behind him is unchanged. Three: an amber line fans out of the laptop across the whole wall and every card now carries the same mark, while the man stands with his hands at his sides watching.](/img/comics/the-harness-should-be-your-default-interface.png)

---

## The claim

Your first move on a piece of work should be the harness, not the app.

This sounds like a preference and it is not. It is a claim about which of the two holds your work. When you start in an app, the app owns the state, and everything you want to change you change by hand, one control at a time. When you start in a harness, the pipeline owns the state, and the app becomes a [coding harness app](/concepts/coding-harness-apps): an interface the harness opens when it needs your hands, eyes, or voice, and closes when it has what it came for.

The second arrangement is better for a specific reason, and it is worth being precise about what that reason is not. It is not that typing is faster than clicking. It is that only one of the two arrangements lets you edit in bulk.

## The asymmetry that decides it

Take a real batch: thirty-five personalized messages, one per person, each carrying a recorded voice note and a written note that has to be specific to that person.

In an app, you do this thirty-five times. Then you notice the closing line is wrong in all of them, and you do it thirty-five more times. The cost of a change scales with the size of the batch, so past a certain size you stop making changes you know are improvements. The batch quietly gets worse because fixing it is too expensive.

In a harness, the messages are output. The recording is yours, because nobody can record your voice for you, and the harness opens a capture page so you can do thirty-five in a row without a context switch. The wording is generated, so changing the closing line is one instruction, and all thirty-five regenerate. The cost of a change is flat.

That flatness is the argument. It is the same reason [recurring work belongs in code](/perspectives/recurring-work-belongs-in-code), applied to work you would not think of as recurring, because "thirty-five variations of one message" is a recurrence even though it happens once.

## What stays yours

The uncomfortable version of this claim is that the human should be squeezed out. That is the wrong read, and it is worth naming because it is the read most people arrive with.

The steps that remain human in a harness-first setup are the steps that were always the valuable ones: what to say, whether it is good, and whether to send it. What leaves is the typing. This is [the split between instigator and editor](/perspectives/the-human-role-splits-into-instigator-and-editor), arranged so that the machine handles volume and you handle judgment.

The recording case makes it concrete. A harness cannot speak in your voice to someone who knows it. That step does not get automated, it gets a better interface: one page, one recipient at a time, no navigation between takes. The human-only step is preserved and made easier, and the thirty-four mechanical steps around it disappear.

## Where this thesis is weakest

Three honest limits.

**It requires a harness you trust with your files.** For most people that is currently a terminal, which is a real barrier and not a trivial one. [The GUI Is Becoming Legacy](/perspectives/the-gui-is-becoming-legacy) makes the case that the barrier is coming down. Until it does, "start in the harness" is advice a minority can act on.

**Small jobs do not repay the setup.** For a one-off with no variation, opening the app is correct and building a pipeline is [hand-rolling in reverse](/concepts/hand-rolling): ceremony where a direct action would do. The claim earns its keep at batch size, or at recurrence, or where a generation rule is worth fixing once.

**The backend can lie.** A harness invoked headlessly can decline to act and exit cleanly, so the interface reports success over an unchanged state. This is the standing failure mode of the pattern, and any harness-first workflow that takes consequential actions has to verify artifacts rather than exit codes.

## What this changes about how you build

If the harness is the default entry point, the thing you ship changes shape. You stop building an application with an agent feature bolted on, and start building a pipeline with capture surfaces attached to the steps that need a body.

Practically, that means the first artifact is a [skill file](/concepts/skill-files), not a screen. [Skill File First, App Second](/concepts/skill-file-first-app-second) is the discipline: prove the capability in the harness, run it by hand until you find the step where chat genuinely fails, and build an interface for exactly that step. Interfaces built before that point encode a workflow nobody has run yet.

It also means the interface you do build can be narrow in a way product design normally will not allow. It needs no accounts, no settings, and no second screen. It needs the three controls this step actually has, and a way to hand its payload back.

## Further Reading

- [Coding Harness Apps](/concepts/coding-harness-apps): the mechanism this argument depends on, including the round trip and its failure mode.
- [Skill File First, App Second](/concepts/skill-file-first-app-second): the order to build in, and why an interface built early encodes a workflow nobody has run.
- [The GUI Is Becoming Legacy](/perspectives/the-gui-is-becoming-legacy): the broader shift that makes a harness-first default reachable for non-developers.
- [The Chat Is Not the Product](/perspectives/the-chat-is-not-the-product): the companion correction. The harness is where you start, and the artifacts are what you keep.
- [Recurring Work Belongs in Code](/perspectives/recurring-work-belongs-in-code): the same flat-cost-of-change argument at the scale of a business workflow.
- [You Are the Bottleneck](/perspectives/you-are-the-bottleneck): what happens to throughput once the mechanical steps stop consuming your attention.
