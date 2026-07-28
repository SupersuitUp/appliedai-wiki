---
title: "Demonstration Is the Highest-Bandwidth Spec"
slug: /perspectives/demonstration-is-the-highest-bandwidth-spec
description: "Three minutes of doing a workflow while narrating it carries more usable specification than an hour of writing the procedure down. The binding constraint on automating a process was never model capability. It was asking an operator to describe something their hands run without conscious observation."
image: "/img/comics/demonstration-is-the-highest-bandwidth-spec.png"
---

# Demonstration Is the Highest-Bandwidth Spec

*Three minutes of doing the work while narrating it carries more usable specification than an hour of writing the procedure down, because it captures the steps you would never have thought to mention.*

![Three warm editorial panels in one row on cream paper, one lamplit room and one desk throughout, title bar above reading DEMONSTRATION AS SPEC. One, captioned A HALF-EMPTY PAGE: a person sits at the desk with a pen over a sheet holding only a few lines, while inside the glowing amber laptop screen the round agent in a gold cap holds an identically sparse sheet and waits with nothing else to work from. Two, captioned SHOW IT AND SAY IT: the pen and sheet are pushed aside, the person's hands sort a stack of paper slips into two piles on the desk while speaking, a soft amber ribbon of speech curves into the screen, and inside it the agent watches those hands and writes rapidly on a page now dense with lines. Three, captioned THE RULE NOBODY SAID: the person leans in and points at the screen where the agent holds the finished dense page up, one line near its bottom underlined and glowing amber, the person's expression one of recognition. Footer bar: WRITING LOSES WHAT THE HANDS KNOW. SHOWING KEEPS IT.](/img/comics/demonstration-is-the-highest-bandwidth-spec.png)

---

In July 2026 Anthropic shipped a feature called "record a skill" in Claude Cowork. You click record, do a task on your own screen while talking through what you are doing, click done, and a few minutes later you have a skill file describing the process. In an early public walkthrough, a nine-minute session yielded 73 discrete steps, roughly 76 screenshots, a transcript of the narration, and a `SKILL.md` containing spreadsheet column layouts, filter settings, and the criteria for a judgment call.

The feature will be copied everywhere inside a year. The part worth keeping is why it works, because it holds whether or not you ever use that particular button.

## The binding constraint was never the model

Applied-AI work gets described as limited by model capability. On real engagements it binds earlier than that, at the point where the person who runs a workflow has to convert it into words an agent can execute. [Spec Writing](/disciplines/spec-writing) names the discipline. This is the part of the discipline clients cannot perform.

Ask an accounts-payable clerk how she decides which invoices to hold. She gives you four rules. Watch her for twenty minutes and she holds one for a fifth reason she has never articulated, because nobody asked and because in the moment it does not feel like a rule. Her hands run a process her mouth has never had to describe.

Every [workflow decomposition](/playbooks/workflow-decomposition) session hits this wall, and the standard remedy is to interview harder. Interviewing harder helps. It does not close the gap, because the gap is not a shortage of questions. Recall of procedural knowledge is lossy in a way that recall of facts is not, and the loss is invisible to the person doing the recalling. They finish the interview confident they told you everything.

## A recording carries three tracks at once

A narrated screen recording is three artifacts captured in one pass, and each one solves a different failure of the written SOP.

**The action track.** Every click, keystroke, filter, and navigation, in order, against the real interface. UI navigation is the single most error-prone thing an operator writes in prose, because they are reconstructing a sequence they have not consciously observed in years. Recorded, it stops being a reconstruction.

**The narration track.** The reasoning, spoken at the moment the decision is made rather than assembled afterward. "That one is probably not worth a video" is a judgment rule no click-track contains, and it arrives attached to the exact case that triggered it. Narration is where exceptions live. Say "if the total is blank, skip the row" out loud while skipping the row, and you have taught the rule and shown an instance of it in the same second. This is [intent engineering](/disciplines/intent-engineering) done at conversational speed, which is the only speed at which most operators will do it at all.

**The negative space.** What the operator never touched. In the walkthrough, the generated skill included a constraint the operator had not stated and, by his own account, had not thought about: the workflow reads comments and never replies to, likes, or deletes one. Prose contains what the writer thought to include. An unbroken record also contains what they left alone.

The third track is the one that carries the argument, because it is the only one you cannot reach by interviewing better. It also produces something valuable for free. A rule about what the process never touches is a [permission boundary](/perspectives/the-permission-surface), and permission boundaries are normally the thing nobody writes down until an agent crosses one.

## Ambiguity resolves toward what actually happened

[Precise Procedures Are Written for the Agent](/perspectives/precise-procedures-are-written-for-the-agent) makes the case that ambiguity is free for a human reader and expensive for an agent, because the agent fills each gap with a different plausible guess on every run. A written procedure inherits the writer's ambiguity by default. A demonstration cannot: the recording either shows the button or it does not.

This matters most exactly where written instructions are weakest. Work driven through a browser UI is a long chain of small, position-dependent actions. Describing that chain in prose is tedious to write, tedious to verify, and stale the moment the interface moves. Demonstrating it costs the time it takes to do the task once, which was already on the calendar.

## The recording is intake, not runtime

Two claims sit close together here, and only the first one holds.

The first: a recording is the best available way to capture what a workflow *is*. That is the argument above.

The second: the recording should therefore become the automation, with an agent replaying the clicks against the same UI forever. That one fails often enough to be a standing rule. [Default to Determinism](/perspectives/default-to-determinism) applies here with no modification. If the target system has an API, a connector, or an MCP server, the captured spec should compile down to that path, and the demonstration's job ends once it has told you what the path must do. Driving a UI is the fallback for systems with no other door, and it is the most fragile thing you can put into production.

So the order of operations is: demonstrate once to capture the truth, read the generated [skill file](/concepts/skill-files) as a draft spec rather than a finished deliverable, then implement against the most deterministic interface available. A skill earns promotion to a [golden process](/concepts/golden-processes) after it has been proven, not because a model wrote it convincingly.

## What this changes on an engagement

**Change the ask.** Stop opening an engagement by asking a client to write SOPs. Ask them to record themselves running the five workflows that matter, narrating as they go. Recording is a task they can complete this week. Writing an SOP is a task they will schedule and keep moving. [Document and Streamline Load-Bearing Workflows](/perspectives/document-and-streamline-load-bearing-workflows) sets the target; this is how the raw material for it actually arrives.

**Keep the raw capture.** Recordings, transcripts, and screenshots are the corpus. The skill file, the [hyperdocumented SOP](/concepts/hyperdocumented-sop), and the eventual code are projections of it, and each one loses something the capture retained. Keep the capture under version control so later projections can go back to it. The pattern is [the corpus and the projection](/concepts/the-corpus-and-the-projection), and [the capture-first autobiography](/playbooks/capture-first-autobiography) is the same discipline applied to a life instead of a workflow.

**Settle the privacy question before anyone hits record.** A screen recorder sees whatever is on the screen: an open password manager, a customer record, a private message. The vendor's warning covers the operator recording their own machine. In a client engagement, what may appear on screen and where the footage lives are the client's decisions, and they need to be made before the first session rather than after someone reviews the footage.

Demonstration does not remove the need for a written spec. It removes the need for the operator to author one from memory, which is the step that was quietly failing the whole time.

## Sources

- A public walkthrough of the record-a-skill flow in Claude Cowork, covering the recording, the generated step count, and the resulting skill file, published 21 July 2026: [Anthropic Just Changed How We Build Skills Forever](https://youtu.be/jbiMx17fEK0).
- Anthropic released record-a-skill in Claude Cowork on 21 July 2026, on the desktop app, for paid tiers.

## Further Reading

- [Spec Writing](/disciplines/spec-writing) the discipline this argument sits inside: implementation is commoditized and the specification is where the value lives.
- [Precise Procedures Are Written for the Agent](/perspectives/precise-procedures-are-written-for-the-agent) why the precision a demonstration captures is worth the density it produces.
- [Progressive Automation Is the Job](/perspectives/progressive-automation-is-the-job) the posture that decides what to do with a workflow once it has been captured.
- [Hyperdocumented SOP](/concepts/hyperdocumented-sop) the durable written form a demonstration should be turned into.
- [Default to Determinism](/perspectives/default-to-determinism) why the captured spec should compile down to code and connectors wherever they exist.
- [Fat Skills](/concepts/fat-skills) what a recording-derived skill file grows into once it has run against reality a few times.
- [See Your Own Thinking](/concepts/see-your-own-thinking) the adjacent case: externalizing a process makes visible what introspection alone will not surface.
