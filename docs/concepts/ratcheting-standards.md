---
title: "Ratcheting Standards"
slug: /concepts/ratcheting-standards
description: "A check that records how many violations a codebase already has and fails only when the number goes up. Lets you adopt a standard today on a codebase that does not meet it, without blocking on a cleanup you will keep postponing."
image: "/img/comics/ratcheting-standards.png"
---

# Ratcheting Standards

*A check that records how many violations a codebase already has and fails only when the number goes up. It lets you adopt a standard today on a codebase that does not meet it.*

![Three panels in warm editorial ink-and-wash on cream paper. Title bar: RATCHETING STANDARDS. One: inside a glowing amber laptop on a wooden desk, a tall untidy stack of loose papers; the person outside reaches in and clamps a slim brass bar horizontally against the stack at exactly its current top edge. Caption: MARK THE CURRENT HEIGHT. Two: the bar sits at the same height and a single new sheet is stopped dead against its underside, held by a small rounded agent, while the stack below the bar is undisturbed. Caption: NEW WORK CANNOT EXCEED IT. Three: the stack is visibly shorter because the person has drawn a sheaf of papers out onto the desk outside the laptop, and the brass bar has slid down to rest on the new lower top edge. Caption: THE MARK ONLY MOVES DOWN. Footer bar: GRANDFATHER THE DEBT. BLOCK THE NEXT ONE.](/img/comics/ratcheting-standards.png)

---

## The problem it solves

You decide on a standard. No file over a thousand lines. No type errors. Every endpoint authenticated. Then you run it against the codebase you actually have, and there are four hundred violations.

Two options present themselves and both are bad. Fix everything first, which means the standard does not take effect until a cleanup you will keep deferring. Or write the standard down as guidance, which means it is advisory, and an advisory standard is the thing that produced the four hundred violations.

A ratchet is the third option. Count the violations that exist right now, commit that number as the baseline, and fail the build when the count exceeds it. Existing violations are grandfathered. New ones cannot be added. The standard is enforced from today forward on a codebase that has never met it.

## What makes one work

Four properties separate a ratchet from a counter that annoys people.

- **The count is cheap and deterministic.** A ratchet runs constantly, so it has to be a script, not a scan. This is [Recurring Work Belongs in Code](/perspectives/recurring-work-belongs-in-code) applied to your own quality checks: the thing that fires on every change belongs in code.
- **The baseline is committed.** The number lives in the repo and moves through review like any other change. A baseline held in someone's memory or a CI cache is not a baseline.
- **It lowers itself automatically.** When a refactor drops the count, the ratchet writes the new number down and holds you to it. A ratchet that only ever blocks, and never records progress, lets the improvement you just made get spent again.
- **It runs at a chokepoint.** A pre-commit hook, a CI step, or an agent stop hook that fires after every response. The same reasoning as [prompt guards](/concepts/prompt-guards): put the rule where every path converges, or you have protected one path.

## Why agents raise the stakes

A ratchet was always useful. Agents make it close to necessary, for a reason that is about volume rather than quality.

An agent produces far more code per hour than a person, so an advisory standard degrades far faster than it used to. The gap between "we agreed on this" and "the codebase reflects this" now opens in an afternoon. At the same time, agents make the cleanup side cheaper, which tempts teams into believing they can just fix it all later. They usually do not, because the cleanup competes with feature work and always loses.

The ratchet resolves both. New output is held to the standard immediately, and the backlog stops being a precondition for having a standard at all.

There is a second-order benefit worth naming. Once the count cannot go up, the standard becomes a fact the agent discovers by failing, rather than a rule it has to remember from a file. That is the general move from [agent rule files](/concepts/agent-rule-files) toward enforcement: a rule the agent reads is a suggestion, and a check it cannot pass is not.

## The failure mode

A ratchet is a floor, and a floor is not a plan. The number stops rising and then sits there for a year, and the original violations calcify into permanent exceptions that everyone has learned to read past.

So pair it with a paydown that has a real owner and a real cadence, and treat a baseline that has not moved in months as a signal rather than a success. The ratchet buys you the right to adopt the standard now. Getting to zero is separate work that still has to be scheduled.

The other failure is setting the standard by what the codebase can pass. A limit chosen to produce a comfortable baseline is a description of the status quo wearing the costume of a rule.

## Not the same ratchet as the determinism ratchet

[Recurring Work Belongs in Code](/perspectives/recurring-work-belongs-in-code) uses "the ratchet" for a related but distinct mechanism: folding each newly settled case out of the model's path and into deterministic code, so the metered surface shrinks over time. Both are one-way mechanisms that only tighten, which is why the word fits twice.

They differ in what is accumulating. The determinism ratchet accumulates settled behavior in code. A ratcheting standard accumulates enforcement against a debt you already carry. A codebase can run both, and the checks a ratcheting standard enforces are frequently the output of the determinism one.

## Further Reading

- [Recurring Work Belongs in Code](/perspectives/recurring-work-belongs-in-code): the general case, and the other sense of the ratchet.
- [Prompt Guards](/concepts/prompt-guards): the same chokepoint reasoning applied to prompts instead of code.
- [The More Capable the Agent, the More Guardrails It Needs](/perspectives/capable-agents-need-more-guardrails): why enforcement has to scale with capability.
- [Deny Rules Are Not a Wall](/perspectives/deny-rules-are-not-a-wall): where enforcement has to stop being a rule and become a removed capability.
- [Agent Rule Files](/concepts/agent-rule-files): the layer a ratchet exists to back up.
- [Don't Scale Slop](/playbooks/dont-scale-slop): what happens when volume outruns the standard.
