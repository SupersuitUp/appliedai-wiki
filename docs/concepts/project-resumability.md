---
title: "Project Resumability"
slug: /concepts/project-resumability
description: "The property that lets a reader who was not there reach a project's true state in minutes, from the files alone, and be right about it. Saving is the act, agentic project management is one implementation, resumability is the quality both are trying to produce."
image: "/img/comics/project-resumability.png"
---

# Project Resumability

*A project is resumable when a reader who was not there (a new session, a teammate, future-you) can reach its true state in minutes, from the files alone, and be right about it.*

![Warm editorial three-panel strip on cream paper, title bar 'PROJECT RESUMABILITY'. The same wooden desk and the same glowing translucent amber laptop in all three panels. One: the woman's chair is empty and pushed back; inside the laptop a small rounded agent has just arrived, facing a wall of identical unlabeled drawers with a long paper scroll unrolled across the floor, its hand hovering over the nearest drawer at random. Caption: 'A NEW SESSION ARRIVES COLD'. Two: the agent walks away holding up one yellowed curled old page with a confident posture while the page that matters lies unread at the far end of the scroll; outside, the woman has returned to her chair, hand lifted from the keyboard, reading what it brought her and seeing that it is out of date. Caption: 'IT PICKS WRONG, CONFIDENTLY'. Three: the woman reaches into the laptop and sets one upright wooden signboard reading START HERE in front of the drawers, a green desk lamp burning steadily beside it; the agent walks straight to the signboard holding one crisp fresh page, and the scroll is neatly rolled up and set aside. Caption: 'ONE FRONT DOOR, VERIFIED STATE'. Footer bar: 'TEST THE COLD START, NEVER ASSUME IT'.](/img/comics/project-resumability.png)

---

## Where this sits next to its two siblings

Three pages in this wiki circle the same problem. [Save Your Progress](/concepts/save-your-progress) owns the act: what you do with a session's value before the chat clears. [Agentic Project Management](/concepts/agentic-project-management) owns one implementation: holding the project as a repo an agent reads, with an ontology file, a state machine, the project's verbs as skills, and a supervising subagent.

This page owns the property those two are aiming at. The distinction is worth keeping because the failures cross over. You can save diligently every session and still hand the next reader a pile they cannot get oriented in. You can skip the repo pattern entirely, on a plain folder of documents, and still be resumable. Saving is what you do. The repo pattern is one way to do it. Resumability is the thing you check for afterward.

## Why you would want it

Four capabilities fall out of the property, and none of them are available without it.

**Sessions become disposable.** A chat you can clear without flinching is a chat you can let run long, compact, and throw away. Resumability is the reason [context overflow](/concepts/context-overflow) stops being a threat.

**Work can go parallel.** Two sessions on two branches of the same project only work if both can establish the true state independently. Otherwise the second one is guessing.

**The project can change hands.** Handing someone a project and handing someone a folder are different acts. Which one you are doing is decided long before the handoff.

**You can stop before you are finished.** This is the one people underrate. Projects rarely die from difficulty. They die because the cost of reloading the context after two weeks away exceeds the appetite available that evening. When reload costs one command, you can pick a project up in the twenty minutes you actually have, which means you can also put it down at an awkward point.

## The two halves, and only one of them usually gets built

A long-running writing project was recently tested for this rather than assumed to have it. The test split cleanly in two, and it passed one half and failed the other. That split is the useful part, because the half that fails is almost always the same half.

The **mechanical half** is state a machine reports. The **human half** is what a cold reader opens first and what they conclude from it. Teams that think about resumability at all tend to build the mechanical half, because it looks like engineering. The human half is where projects actually stall.

## The mechanical half: state a machine can verify

**A command that reports the true state in seconds outranks any prose claiming it.** In the tested project this was two commands: a full check suite that came back green, and a drift reporter that came back clean. Thirty seconds, no reading, no trusting. Prose describing project health is a claim about the past. A check that runs is a measurement of the present. Build the check even when the prose already exists, because the prose is what goes stale first. This is the same instinct as [The Doctor Pattern](/concepts/the-doctor-pattern), pointed at the state of the project instead of the quality of an artifact.

**A checkpoint's authority is its commit SHA.** Records that carry a SHA that still resolves let the next session diff forward from a known point instead of re-reading everything. That is the difference between a five-minute orientation and an hour of archaeology.

The corollary matters more than the rule. **Read old records for scope, never for facts.** A checkpoint tells you what territory the last session was in. Every claim inside it about the current state has to be re-derived from the system before it gets repeated. A record that confidently restates a fact that has since changed is worse than no record, because it costs the reader the time to be wrong plus the time to discover they were wrong.

For the same reason, resumability cannot rest on [memory files](/concepts/memory-files) the harness curates for itself. Opaque, agent-written, vendor-specific state is not something a new reader can verify or a teammate can open.

## The human half: what a cold reader opens first

**There must be exactly one front door.** A file that names what to read and in what order, and says so in the first ten lines. Without it, the reader picks by filename, and picking by filename is picking at random. The tested project had no front-door instruction file, so a fresh session arrived with nothing telling it where to start. Everything it needed existed. Nothing pointed at it. That is the entire failure. See [Agents Read READMEs](/perspectives/agents-read-readmes) for the shape the front door should take, and for why thickening a rule file is not a substitute.

**Names are part of the interface.** The same project had a file at its root called `handoff.md` that was an unrelated exercise output. A file whose name implies "start here" gets opened first, every time, by every reader, human or agent. Naming something after what it sounds like rather than what it is puts a decoy at the front of the path. Rename it or delete it. This costs one minute and there is no cheaper resumability fix available.

**Append-only logs decay in a specific way, and the decay is predictable.** The most valuable thing in the tested project was roughly sixty-five lines at the bottom of a 760-line log with eight entries. Two properties made that log worse than useless to a cold reader:

- **Newest-last puts the useful part furthest from where a reader starts.** A reader who begins at the top spends most of their budget on the least current material and often runs out before reaching the part that matters.
- **Old entries and current entries are indistinguishable in tone.** Every entry states what was true on its own date, in the same confident voice. Entry two hands you a superseded fact with exactly the same authority as entry eight hands you a live one. The reader has no signal to discount by.

Reading such a log top-down is worse than not reading it, because the reader ends up holding stale facts and believing them. If you keep an append-only log, put the current state somewhere else, in a file that is overwritten rather than appended, and let the log be history. A log is a record of what happened. It is not a description of where things are.

## Untested resumability is a guess

The property is testable, and the test takes a minute. Close the session. Open a new one. Give it nothing except the project's location. Watch what it opens, in what order, and what it concludes.

You are grading three things: how long orientation took, whether the state it reported was actually true, and which file it opened first. That third one is the diagnostic. The file a cold reader opens first is your real front door, whatever you intended the front door to be.

Reasoning about whether a project is resumable does not work, for a structural reason: you already know where everything is. You cannot simulate not knowing. The only reliable instrument is an actual reader who does not know, which is what makes a fresh agent session so useful here. It is a cheap, honest, repeatable stranger.

## Cheap to build in, expensive to retrofit

Every element above costs minutes at the time and hours later. Writing the front door while you still remember what matters takes ten minutes. Reconstructing it eight months in means reading 760 lines to work out which facts survived. Naming a file correctly costs nothing on the day you create it. Renaming it after three documents reference it costs a search.

So treat resumability as a property you maintain rather than a project you eventually do. Each session leaves the front door current, records its checkpoint with a SHA, and keeps state that a command can verify. That maintenance is what makes the next session cheap, and cheap sessions are what let a project compound instead of restart. It is the same flywheel as [compounding docs](/concepts/compounding-docs), running on the project's state rather than its content.

> A project you can put down is a project someone can pick up. Both come from the same property, and it is the one you have to test rather than assume.

## Further Reading

- [Save Your Progress](/concepts/save-your-progress) on the act that produces this property, session by session.
- [Agentic Project Management](/concepts/agentic-project-management) on the repo pattern that makes it structural.
- [Agents Read READMEs](/perspectives/agents-read-readmes) on what the one front door should contain.
- [The Doctor Pattern](/concepts/the-doctor-pattern) on writing the check that reports true state instead of describing it.
- [Compounding Docs](/concepts/compounding-docs) on why cheap reloads make a project get stronger over time.
- [Skill Files](/concepts/skill-files) on turning a project's repeatable moves into something a new session can run.
