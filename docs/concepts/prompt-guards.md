---
title: Prompt Guards
slug: /concepts/prompt-guards
description: "Standing rules a generator appends to every prompt itself, conditional on what the prompt contains. A rule written as an instruction to the caller is a suggestion; a rule enforced at the chokepoint every caller passes through is a guarantee."
image: "/img/comics/prompt-guards.png"
---

# Prompt Guards

*Standing rules a generator appends to every prompt itself, conditional on what the prompt contains. A rule written as an instruction to the caller is a suggestion. A rule enforced at the chokepoint every caller passes through is a guarantee.*

---

Every generation system accumulates rules that are always true. Screens face their user. Text on a page faces the person reading it. Never render this brand's logo in that color. These get written down, usually in the tool's documentation, usually in the imperative: **always append this preamble.**

Then the system produces something that violates the rule, and the rule was right there the whole time.

A prompt guard is that rule moved out of the documentation and into the generator, where it fires on its own.

## Documentation is not enforcement

The failure is not that the rule was unknown or badly written. It is that the rule was stored somewhere it had to be *remembered* rather than somewhere it would *execute*.

An instruction that says "always append X" has an implicit precondition: the caller read the docs, retained the rule, recognized that this particular prompt triggers it, and pasted it in. That chain holds most of the time, which is what makes the failure so durable. It holds often enough that nobody suspects the design, and the occasional miss looks like carelessness instead of a missing mechanism.

The tell is a defect whose fix already existed in prose. When you find yourself writing "the rule was already documented" in a postmortem, you have found a guard that should have been code.

This is [The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing) applied to the prompt itself. The artifact is wrong, the rule was correct, and the thing that failed is the distance between them.

## Find the chokepoint, put the rule there

A guard is only worth building where every path converges. Most mature generation systems have exactly one such place and it is usually further down than people think: a provider adapter, the one script that calls the model, one function that assembles the final string.

Callers proliferate. A book renderer, a page-illustration tool, a one-off command, and a colleague's script can all build their own prompts in their own style, and each will forget a different rule. If all four shell out to the same generator, one guard there covers all four at once, including the caller that has not been written yet.

Put the rule in a caller and you have protected that caller. That is the same failure in a smaller font.

## A guard is conditional, not a preamble

The naive version staples every rule onto every prompt. That bloats the context, and it tells a model about devices in a picture of an empty field, which invites it to add one.

A real guard is keyed to the prompt's own content. Scan for the trigger, append only what applies, and stay silent otherwise. Three properties make one trustworthy:

- **Conditional.** It fires when the prompt names the thing it governs, and not otherwise.
- **Idempotent.** It skips itself when the prompt already states the rule, so a hand-written prompt that carries its own version is not double-stuffed with a near-duplicate.
- **Visible and escapable.** It announces which guards fired, and it takes an explicit opt-out for the deliberate exception. A rule with no escape hatch gets bypassed by copying the generator, which loses every other guard at the same time.

Log what fired. A guard that works silently is indistinguishable from a guard that is broken, and you will eventually need to know which one you have.

## Prove it can fail

A guard is a check, and checks fail in the direction that flatters you. The one that never fires looks exactly like a system with no violations.

So test both directions before trusting it. Feed it a prompt that must trigger the guard and confirm the guard appears. Feed it a prompt that must not and confirm the prompt is untouched. Then confirm the opt-out opts out, and that an already-compliant prompt is left alone.

This is cheap, it is a unit test on a pure function, and it is the difference between a guarantee and a decoration.

## What belongs in a guard, and what does not

Guards are for rules that are **always true and mechanically detectable**. Physical and spatial facts. Brand invariants. Format constraints. Anything you would enforce with a lint rule if the output were code.

They are not for judgment. Whether a composition is any good, whether this is the right moment in the story, whether the framing serves the argument: no keyword detects those, and a guard that pretends to cover them buys false confidence. Keep those in the review step where a human or a reading-back pass belongs.

The honest split is that guards eliminate the class of defect where **you already knew the rule**. That class is larger than most teams expect, and removing it is what frees attention for the judgment calls that need it.

## Supporting voices

- **Caleb Curry (2026-07-15):** runs the same move one layer out, from documentation into the toolchain rather than into the generator. His smallest example is the clearest: he wrote "do not use alerts" into `CLAUDE.md` several times, the agent kept using alerts, and one lint rule ended it permanently. His larger one is a database adapter that attaches the tenant to every query before it reaches the database, replacing a written instruction to respect tenant scoping. He also supplies the sourcing shortcut, which is that you do not have to author the checks: ask the agent to read the codebase and propose which rules can become checks that always run. [Field note](/note-sharers/caleb-curry/2026-07-15-instructions-into-deterministic-gates).

## Further Reading

- [The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing) is the parent principle: the fix belongs in the system, not the artifact.
- [The Prompt Factory](/concepts/the-prompt-factory) is where guards live: deterministic code assembling the final prompt from locked parts.
- [The More Capable the Agent, the More Guardrails It Needs](/perspectives/capable-agents-need-more-guardrails) explains why the need for this rises rather than falls as models improve.
- [Recurring Work Belongs in Code](/perspectives/recurring-work-belongs-in-code) is the general case: make code the default for recurring work.
- [Hand-Rolling](/concepts/hand-rolling) is what you are doing when you correct the output and leave the generator unchanged.
