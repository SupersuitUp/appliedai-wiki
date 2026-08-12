---
title: Discoverability Is a Just-in-Time Problem
slug: /perspectives/discoverability-is-a-just-in-time-problem
description: "An agent does not fail to use your tool because it never knew the tool existed. It fails because nothing put the tool in front of it at the moment it was about to hand-roll one. Anything that depends on having read something earlier and remembered it loses on a long session."
image: "/img/comics/discoverability-is-a-just-in-time-problem.png"
---

# Discoverability Is a Just-in-Time Problem

*An agent does not fail to use your tool because it never knew the tool existed. It fails because nothing put the tool in front of it at the moment it was about to hand-roll one. Anything that depends on having read something earlier and remembered it loses on a long session.*

![Three-panel warm editorial ink-and-wash strip on a cream ground. Title bar: DISCOVERABILITY IS JUST-IN-TIME. In every panel a woman in her fifties with short silver hair and a charcoal sweater sits at a wooden desk outside a glowing translucent amber laptop, while a small rounded agent works inside its screen. Panel one: the agent cuts and pastes a grid of little picture-cards by hand at a bench, while on a shelf behind it in the same screen the identical finished grid already sits, complete and unnoticed. Caption: THE TOOL WAS ALREADY THERE. Panel two: the bench is heaped with a pile of identical hand-cut grids and the agent is still cutting another, while far away on the desk outside the laptop a long scroll lies rolled and grey with its glow gone. Caption: AGAIN AND AGAIN, BY HAND. Panel three: the woman reaches one hand into the glow and writes a short glowing line directly on the bench beside the agent's hands, and the agent has set down the scissors and lifted the ready-made grid off the shelf. Caption: ITS NAME, WHERE THE HANDS ARE. Footer bar: A TOOL NOBODY FINDS IS A TOOL THAT DOES NOT EXIST.](/img/comics/discoverability-is-a-just-in-time-problem.png)

---

## The thing that actually happens

In one long session on a framework I maintain, an agent wrote the same image-montage script roughly fifteen times. A utility that did exactly that job had been sitting in the repository the entire time.

This is not a story about a missing tool. It is a story about a tool that was present, working, and invisible. The agent had every file in the repo available. It had a catalog of capabilities loaded at session start. It simply never thought of the utility at the moment it needed a montage, and there was nothing in that moment to remind it.

The failure mode is worth stating precisely, because the obvious diagnosis is wrong. It is not **"the agent did not know the tool existed."** It is **"the agent did not think of the tool when it needed it."** Those two failures look identical from the outside and have completely different fixes. The first is solved by documentation. The second is not solved by documentation at all.

## Why the catalog loses

The instinct when an agent misses a capability is to write it down somewhere more prominent. Make the description longer. Add it to the rule file. This is the wrong direction, and the numbers show why.

That framework ships a capability description of about 6,900 characters, loaded once at session start. By hour six of a working session, that text is thousands of turns behind whatever is currently in front of the model. It is not forgotten in any dramatic sense; it is simply outcompeted by everything more recent and more relevant. And length actively hurts: capabilities were missed *inside* that description, because a 6,900-character blob is skimmed, not read.

An [agent rule file](/concepts/agent-rule-files) has the same shape of problem. It loads at session start, so it is paid for on every future turn whether or not it is relevant, and its authority decays as the session fills with more immediate context. Rule files are the right home for genuinely unpredictable standing orders. They are the wrong home for "here is a tool for a specific job," because you can name the moment that fires.

## The three fixes, in order of what actually works

**Put the pointer where the work happens.** This is by far the strongest, and it is the one that fixed the montage problem. The utility got named inside the method file that an agent reads *while doing that kind of work*. Not in a catalog, not in a rule file: in the procedure being followed at the moment of need. An instruction read at the point of use beats a catalog read six hours earlier, and on a long session it beats it badly.

**Make the tool refuse loudly.** A validator that rejects a malformed field at the moment of misuse teaches faster than any prose explaining the correct field. The lesson arrives attached to the mistake, which is the only time it is fully legible. This is the same logic as a [prompt guard](/concepts/prompt-guards): a check that fires in the moment beats a rule that hopes to be remembered.

**Name and file by job, not by owner.** This is the structural bug underneath the montage story. The utility lived inside the folder of the workflow that happened to own it. An agent only opens that folder once it has already decided to run that workflow, so every tool inside is invisible to anyone who merely needs the *job* it does. Filing by owner is natural for the author and useless for the consumer. An index organized as **"I need to make a contact sheet →"** rather than **"this workflow contains…"** is a different artifact, not a reformatted one.

## A tool nobody finds and a tool that does not exist are the same tool

This has a sharp consequence for anyone building agent tooling, and it is the reason the distinction is worth a page.

When a retrospective finds hand-rolled work, the natural reading is that the framework lacked the capability, and the natural fix is to build it. That reading is wrong often enough to be expensive. Hand-rolling is equally often evidence that the capability exists and was not found. **The two cases have opposite fixes**, and confusing them ships a duplicate implementation that immediately begins drifting from the original.

| | It does not exist | It exists and was not found |
|---|---|---|
| The fix | build it | put a pointer where the work happens |
| Cost of guessing wrong | nothing | a second implementation that drifts |

The cheap guard is to search before promoting anything. One `find` across the tool directories, one `grep` for the capability. It takes seconds and it is the difference between paving a real gap and quietly forking your own utility.

## What this means if you maintain agent tooling

Stop optimizing the thing read at the beginning. Start optimizing the thing read in the middle.

Concretely: when you add a tool, add its row to a job-indexed index in the repository, in the words someone would search for at the moment of need. When a procedure should call that tool, name it *inside that procedure*, not only in the index. Prefer a check that fails at the point of misuse over a paragraph that explains the correct usage. And treat a long capability description as a liability rather than an asset, because every character of it competes with every other character for a slot in attention that shrinks as the session grows.

The general form: **any mechanism that relies on prior reading plus recall will fail on a long session, and every mechanism that places the tool in the path of the work will succeed.** Design accordingly.

## Further Reading

- [Just-in-Time Context Collection](/concepts/just-in-time-context-collection) is the same timing argument aimed at people rather than agents.
- [Hand-Rolling](/concepts/hand-rolling)
- [Hyperlocal Skills](/concepts/hyperlocal-skills)
- [Agent Rule Files](/concepts/agent-rule-files)
- [Skill Files](/concepts/skill-files)
- [Context Overflow](/concepts/context-overflow)
- [Prompt Guards](/concepts/prompt-guards)
