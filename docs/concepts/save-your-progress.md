---
title: "Save Your Progress"
slug: /concepts/save-your-progress
description: "The deliberate act of routing a work session's hard-won value — decisions, rationale, and newly-earned tribal knowledge — into durable homes (work logs, skill files, wiki pages, memory, commits) before the chat clears or the context window fills. The save mechanic for the playable harness experience: a reviewed sweep, never autopilot."
---

# Save Your Progress

*The deliberate act of routing a work session's hard-won value — decisions, rationale, and newly-earned tribal knowledge — into durable homes before the chat clears or the context window fills. The save mechanic for the [playable harness experience](/concepts/playable-harness-experience): if the work is playable, you must be able to save.*

![Four-panel comic strip on cream paper, title bar 'SAVE YOUR PROGRESS'. Panel 1 'THE RICH SESSION': the hyperagent at his workshop terminal after a long session, a tangled glowing cloud of un-captured insights and decisions swirling around his head, a CONTEXT meter on his monitor nearly full, a tag reading UNSAVED. Caption: 'A long session. The hard-won thinking is still trapped in the chat.' Panel 2 'HIT SAVE': he types /save; the Chief of Agents (translucent cyan-and-gold hologram) presents a floating CHECKLIST card of proposed changes with empty checkboxes — WORK LOG, SKILLS, WIKI, README, MEMORY, COMMIT — header 'PROPOSED — CONFIRM?'. Caption: 'He hits save. The Chief proposes a checklist first. Nothing is written yet.' Panel 3 'CONFIRM, THEN ROUTE': he taps CONFIRM; confirmed items flow as cyan streams into labeled durable drawers — WORK LOG, SKILLS, WIKI, MEMORY — one drawer showing a new SKILL.md crystallizing, a COMMITTED stamp. Caption: 'He confirms. The session routes to where it lives durably, even a brand-new skill.' Panel 4 'SAFE TO CLEAR': first-person POV through the armored helmet visor, HUD overlays — a big PROGRESS SAVED stamp, a fresh empty chat, a REPORT-BACK card, the CONTEXT meter reset; a matte-navy gauntleted hand reaching forward, nothing above the head. Caption: 'Now the chat can clear. Nothing lost. Future-you resumes in seconds.' Footer bar: 'IF THE WORK IS PLAYABLE, YOU CAN SAVE.'](/img/comics/save-your-progress.png)

---

## What it is

You just spent two hours in the harness. You shipped real artifacts — a draft, a repo, a deck. But most of what happened never landed on disk: the decisions you made and *why*, the dead ends you ruled out, the framing that finally clicked, the little trick you discovered that you'll want to do again. That value is real, and right now it lives in exactly one place: a chat that is about to scroll away, get cleared, or hit the edge of its [context window](/concepts/context-overflow).

**Saving your progress** is the deliberate move that rescues it. Before you walk away, you route the session's value into homes that outlive the conversation — and you leave the workspace in a state where future-you (or a teammate) can pick it up cold.

The artifacts were already permanent. Saving is about everything *around* the artifacts.

## Why you need it

People doing heavy agentic work share a specific anxiety: the sense that they are *making progress they can't hold onto.* They feel it most in three moments.

- **The window is filling.** A long, rich session is approaching the model's context limit. Compaction looms. The richness that made this session good is the first thing to blur.
- **They want to walk away.** They're not sure when they'll return to this thread — maybe never. They'd love to clear it, but clearing it *feels* like throwing away work, even when the files are safe.
- **Someone asks "what did you get done?"** and the honest answer is trapped in a 200-message scroll nobody will read.

The fix is not "keep the chat forever." Chats are cheap and disposable by design. The fix is to make the *work* durable so the *chat* can be disposable. Saving is what lets you clear a conversation without flinching.

## Saving is an adaptive catch-all sweep

A save is not a fixed checklist — it's a **sweep that adapts to what durable surfaces exist** in your workspace and propagates the session's value into each relevant one:

- **Work log** — append a dated entry (what got done, key decisions, what changed and *why*) **if a work log already exists** that the agent knows about. Don't manufacture one nobody asked for.
- **Skill files** — refine an existing [skill](/concepts/skill-files) or write a new one whenever something happened you'll want to invoke again. (See below — this is the headline.)
- **Wiki / docs** — update any page the session made stale or newly informed.
- **README / state docs** — if the project's state moved, the front door should say so.
- **Memory / context files** — update the relationship, project, or [memory files](/concepts/memory-files) the session touched.
- **Commit** — land the working-tree changes with a clear message.
- **Resume-here note** — the open threads and the next obvious move, so the next session starts warm.
- **Report-back summary** — a clean, paste-ready account of what was accomplished.

It is, deliberately, a catch-all. The point is coverage: nothing valuable should fall through because there wasn't a slot for it.

## The headline move: capture tribal knowledge as skills

Most "save" routines stop at logging. The highest-leverage thing a save can do is **turn what you just learned into something you can re-run.**

When a session surfaces a repeatable technique — a sequence that worked, a prompt shape that landed, a gotcha you solved — that is tribal knowledge. Left in the chat, it dies. Written into a [skill file](/concepts/skill-files), it becomes a capability you (and your agents) keep. Saving is the natural moment to ask: *did something valuable happen here that we'll want to do again? If so, crystallize it.* Over months, this is how a workspace gets smarter on its own — each save compounds the next session, which is the same engine behind [self-improving systems](/concepts/self-improving-systems) and [compounding docs](/concepts/compounding-docs).

## A reviewed sweep, not autopilot

A save **proposes before it writes.** When you invoke it, the agent surveys the session and the workspace and hands you a **checklist of proposed changes** — specific and grouped (append this work-log entry; refine this skill; update this wiki page; this commit message; this resume note). Nothing is written until you approve. You can accept all of it, edit it, or deselect the parts that don't belong.

This matters because a save touches load-bearing surfaces — your skills, your docs, your git history. An autopilot that silently rewrites them is worse than no save at all. The checklist keeps you in the loop and makes the save *trustworthy* enough to run often.

## Saving is also reporting

The same sweep that protects future-you produces the artifact present-you needs for other people. A good save emits a **report-back summary**: what was accomplished, what changed, what's next. That's the message you paste to a teammate, a client, or a cofounder. The work and the account of the work come out of the same motion — so "tell me what you did this week" stops being a separate chore.

## Then it's safe to clear the chat

This is the payoff. Once the sweep is done, the conversation holds nothing that isn't also somewhere durable. You can compact it, archive it, or delete it with zero loss. Treat your work like a video game: you played hard, you hit **save**, and now you can power down knowing the next session resumes exactly where this one earned its place.

## How to do it

Use the hosted, model-agnostic **[save-your-progress skill](/skills)** — a `SKILL.md` you can invoke, link, or fork. It encodes the propose-then-confirm sweep above: survey → present the checklist → wait for your confirmation → apply only what you approved → report what was saved. Point your harness at it (or copy it into your workspace's skills folder) and "save" becomes a one-word command.

It's **incremental**, too. Each save records a small checkpoint (a timestamp and the commit it just made), so running save again in the same session only sweeps what changed *since* — it doesn't re-read the whole chat or re-propose what it already saved. That makes saves cheap enough to hit every hour, not just at the end.

## Why this matters for you

If you've ever ended a great session with a vague dread that you were about to lose something — you were right, and this is the fix. Make saving a habit and three things change: you stop fearing the context window, you start clearing chats freely, and your workspace quietly gets better every time you stop. The goal is simple: **work you can put down without losing.**

## Further Reading

- [Playable Harness Experience](/concepts/playable-harness-experience): the game this is the save mechanic for.
- [Skill Files](/concepts/skill-files): where captured tribal knowledge goes to live.
- [Memory Files](/concepts/memory-files): the context files a save keeps current.
- [Compounding Docs](/concepts/compounding-docs) and [Self-Improving Systems](/concepts/self-improving-systems): why each save makes the next session stronger.
- [Context Overflow](/concepts/context-overflow): the window pressure that makes saving urgent.
- [Context Gardening](https://supersuit.wiki/concepts/context-gardening) and [Externalize Your Brain](https://supersuit.wiki/concepts/externalize-your-brain): the broader practice of tending what you've externalized.
