---
title: "Case Study: Video Strategy Workflow"
slug: /disciplines/sop-execution-app/case-studies/video-strategy-workflow
description: "A video strategy practitioner automated ten workflows into a single web app. The two most important shipped first. The rest followed over weeks."
---

# Case Study: Video Strategy Workflow

*A video strategy practitioner automated ten workflows into a single web app. The two most important shipped first. The rest followed over weeks.*

---

## The practitioner and the work

The practitioner works as a video strategist for high-output podcast operations. Each podcast sends raw footage. The practitioner's job is to clip that footage for social distribution, develop thumbnail concepts, write titles, and guide the strategy that turns long-form recordings into a social media presence. The work is pattern-intensive: the same decisions get made dozens of times a week across multiple clients, each with its own aesthetic, audience, and performance history.

Before the SOP Execution App, the practitioner ran this work through a combination of general-purpose chat tools and mental standard operating procedures. The SOPs existed in their head, applied inconsistently because there was no forcing function for following them. The cognitive overhead of re-initializing context on every task was eating significant time. Roughly ten distinct workflow types needed to happen for each client: thumbnail ideation, title frameworks, clip selection logic, hook writing, performance analysis review, and others.

The practitioner knew how to do all of it. The problem was time, consistency, and the gap between how they did it when they were fresh versus when they were rushed.

## What the system replaced

The previous stack was a blank chat window, a growing collection of mental SOPs not reliably followed, and a habit of re-explaining context to the model at the start of every session. Each session started from zero. The practitioner's aesthetic preferences, the client's performance history, the specific formats that worked for that show: none of it was loaded before the conversation began.

The result was slower than it needed to be and less consistent than the practitioner's actual standard. Good sessions produced great output. Off sessions produced output that needed significant rework.

## v0.1 anatomy

The initial version of the system shipped the two most important workflows. Both were the highest-frequency and highest-value decisions in the practitioner's week.

**Workflow one: thumbnail concept generator.** The practitioner inputs the episode topic, the guest's name and background, and notes on the emotional tone of the conversation. The system pulls the client's aesthetic reference data, their prior thumbnail performance patterns, and the practitioner's documented preferences for what performs well in that niche. Output: three to five thumbnail concept directions with visual rationale. The practitioner selects, refines, and hands the direction to a designer or produces it directly.

**Workflow two: title framework engine.** The practitioner inputs the episode's core argument or most compelling moment. The system applies the client's title conventions, the practitioner's framework for what makes a strong title in that format, and pulls comparable high-performing titles from the show's history. Output: five to eight title options ranked by the practitioner's documented criteria. The practitioner edits from the output rather than writing from scratch.

Both workflows reduced the time-per-task by roughly half compared to the blank-window approach, and the consistency of output was noticeably higher because the client context and the practitioner's preferences were loaded before the first response.

## The iteration loop

The practitioner used v0.1 for the first few weeks without adding anything new. During that period, something interesting happened: they started commenting on the workflows. Using them, and noticing their edges. "What if the thumbnail tool also accounted for the current trending visual styles in this niche?" "What if the title engine flagged titles that are too similar to recent episodes?"

Each of those observations became the brief for the next workflow addition. The engineer shipped the refinements, typically in a single session per update. By week six, the system had all ten original workflow types automated. By week ten, a few of the workflows had been refined enough that the practitioner considered them meaningfully better than what they would have produced manually, and faster.

The iteration pattern was consistent: use the current app, develop intuition about what would make it better, communicate that to the engineer, use the improved version. The system grew in the direction of the practitioner's actual working intelligence rather than in the direction of someone else's idea of what a video strategist should need.

## Current state

Most of the practitioner's core work now happens inside the system. The exception is the actual video editing, which requires dedicated tools and stays outside the SOP Execution App by design.

The system handles thumbnail strategy, titling, hook writing, social copy variants, performance review framing, and a handful of administrative workflows. The practitioner opens the SOP Execution App at the start of each work block, routes the active tasks through it, and moves to the next. The context load that used to happen at the start of every session now happens once when the system is first opened, and then persists for the duration of the day.

The clearest signal of the system's value: the practitioner's output is now consistent regardless of whether they are fresh or tired. The system carries the context that used to live only in their best moments.

---

## Further Reading

- [What it is](/disciplines/sop-execution-app/what-it-is): how the SOP Execution App form factor works.
- [Anatomy](/disciplines/sop-execution-app/anatomy): the four components that make a SOP Execution App function.
- [How to get one built](/disciplines/sop-execution-app/how-to-get-one-built): the process for commissioning your own SOP Execution App.
- [When to get one built](/disciplines/sop-execution-app/when-to-get-one): signs a SOP Execution App user is ready to add the PAOS.
