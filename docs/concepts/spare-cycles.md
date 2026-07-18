---
title: "Spare Cycles"
slug: /concepts/spare-cycles
description: "A standing backlog of non-urgent, high-value work you pull from whenever you have surplus capacity to spend, so idle compute compounds instead of evaporating."
image: "/img/comics/spare-cycles.png"
---

# Spare Cycles

*A standing list of non-urgent, high-value work you pull from whenever you have surplus capacity to spend, so idle compute compounds instead of evaporating.*

![Four-panel comic on cream paper. Title bar: SPARE CYCLES. Panel 1, THE SURGE: the hyperagent Midas in matte-navy armor with orange seam accents stands at his workshop as a bright wave of surplus energy floods in from the left, a monitor reading BUDGET +500K and a meter pinned at MAX; caption "more capacity arrives than the urgent work needs." Panel 2, THE SHELF: Midas turns to a tall glowing rack of labeled cartridges, each stamped with a spare-cycle task (HARDEN PIPELINE, BACKFILL TESTS, PACKAGE PATTERN, RUN AUDIT), a small tag reading STANDING BACKLOG; caption "no brainstorming, the list is already ranked." Panel 3, THE PULL: Midas pulls the highest cartridge, PACKAGE PATTERN, glowing orange as he slots it into a socket; caption "pull the top unblocked item and spend the surplus." Panel 4, THE COMPOUND: the slotted cartridge sends bright streams into four site panels at once, each panel leveling up with a small PERMANENT stamp, nothing above his head; caption "one pass, an improvement that pays out forever." Footer bar: IDLE COMPUTE COMPOUNDS INSTEAD OF EVAPORATING.](/img/comics/spare-cycles.png)

---

## The problem: surplus capacity evaporates

An AI-native operator does not have a smooth, constant workload. Capacity arrives in bursts. A window opens where you have far more compute or token budget available than the urgent work in front of you needs: a fresh billing cycle, a big-model pass you can afford, a "+500k" directive, a quiet afternoon while a long job runs.

Without a ready list, that surplus gets spent on noise or on nothing. You refresh a dashboard. You re-litigate a decision that was already made. You polish something that did not need polishing. The budget drains and nothing durable comes of it.

The root cause is that urgency crowds out importance. The urgent work announces itself and gets the attention. The important-but-not-urgent work (the refactor, the hardening, the audit) never announces anything, so it never gets its turn. Surplus capacity is exactly the moment that work should get its turn, and exactly the moment it gets skipped, because deciding what to do with a surprise window is itself expensive.

## The move: keep a standing backlog you can pull from instantly

The fix is a **spare-cycles backlog**: a curated, standing list of worthy non-urgent work, kept ranked and ready before the surplus ever shows up.

The value of the list is that it removes the decision cost at the moment of surplus. When budget appears, you do not brainstorm and you do not negotiate with yourself. You pull the highest-value unblocked item and spend the capacity on it. The thinking about what deserves the surplus happens once, in advance, when you are calm, not under the mild pressure of a window that is about to close.

Every entry earns its place by passing one test. Each item names what it makes cheaper, better, or possible forever once done. That is the **compounding test**. Packaging a pattern you keep copying makes every future project that needs it cheaper forever. Hardening a fragile pipeline makes every run after it safer forever. If you cannot name what compounds, the item is not a spare cycle. It is either urgent (put it on the todo list) or it is busywork (cut it).

## What qualifies, and what does not

The backlog is a quality gate, not a junk drawer. Two conditions have to hold at once.

**It qualifies when the work is genuinely worth doing and genuinely safe to defer.** These are the two properties that make something a spare cycle rather than a todo or a distraction:

- Packaging a pattern you keep copying into a reusable [package or skill](/playbooks/package-the-patterns-you-copy).
- Hardening a fragile pipeline that works today but will bite you later.
- Backfilling tests on a system that shipped without them.
- A broad refactor that no single feature justifies but every future feature benefits from.
- An audit: a coherence pass over a knowledge base, a security review, a dependency sweep.

**It does not qualify when either condition fails.** Anything urgent is a todo, not a spare cycle. The point of the backlog is to hold work that can wait, so if it cannot wait, it does not belong there. And anything not actually worth doing does not belong there either. A full list is not the goal. A high-signal one is. A backlog padded with items that fail the compounding test just moves the decision cost from the moment of surplus back onto you every time you scan it. Prune aggressively. Ten items you would genuinely be glad to have done beat fifty maybes.

## Why this is newly load-bearing in AI-native work

"Having budget to burn" used to be a hypothetical. A human team's capacity is roughly fixed week to week, so surplus was rare and small. You did not need a system for it.

That changed when a single agent can absorb a huge task in one pass. The [operating leverage](/concepts/ai-operating-leverage) of AI-native work means capacity now arrives in large, lumpy, recurring bursts. A big model pass, a generous token budget, an overnight run: these are real, repeating states, not once-a-year windfalls. The question "what should I do with a lot of capacity right now" is one you will face constantly.

When that happens, the bottleneck moves. It is no longer the doing of the work. An agent can do a great deal of work quickly. The bottleneck is having a good enough list of worthy work queued to point the capacity at. Surplus capacity aimed at a bad list just [scales slop](/playbooks/dont-scale-slop): you multiply low-value output at speed. Surplus capacity aimed at a good list compounds: each spare cycle spent makes the whole operation permanently cheaper, better, or more capable.

The spare-cycles backlog is that queue. It is the standing answer to "I have capacity, what is worth spending it on," maintained ahead of time so the answer is instant and the surplus never evaporates.

## Further Reading

- [Package the Patterns You Keep Copying](/playbooks/package-the-patterns-you-copy) is the archetypal spare cycle: the third copy is the signal that a compounding backlog item exists.
- [Don't scale slop](/playbooks/dont-scale-slop) is the quality gate on what surplus buys: capacity spent on a bad list multiplies low-value output.
- [Fat Skills](/concepts/fat-skills) are what many spare cycles produce: judgment packaged once and rerun forever.
- [Compounding Docs](/concepts/compounding-docs) is the same flywheel logic applied to documentation: durable work that makes every future pass faster.
- [Save Your Progress](/concepts/save-your-progress) is the discipline of routing hard-won value into durable homes, the same instinct that keeps a spare-cycles backlog worth pulling from.
