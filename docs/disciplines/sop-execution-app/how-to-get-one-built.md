---
title: How to Get One Built
slug: /disciplines/sop-execution-app/how-to-get-one-built
sidebar_position: 4
description: "Five stages: find the right engineer, brief them well, ship v0.1 in the first session, iterate weekly, and know what kills the engagement."
---

# How to Get One Built

*Five stages: find the right engineer, brief them well, ship v0.1 in the first session, iterate weekly, and know what kills the engagement.*

---

## Find your embedded applied AI partner (who will also build the app)

The canonical move is to commission your SOP Execution App from your [**Embedded Applied AI Partner**](/concepts/embedded-applied-ai-partner): the same person who continually evolves your [Supersuit](/concepts/supersuit). The build engagement and the durable engagement should not be two different hires. The partner already knows your [skill files](https://appliedai.wiki/concepts/skill-files), your voice rules, your workflow, your relationship context, and the rails of your suit; they are the right person to package a proven workflow as a deployed app, and they are the right person to keep it tailored after launch. If you do not yet have an embedded partner, the SOP Execution App engagement is often how that relationship begins.

The profile is specific.

**They should be able to ship the same week.** This rules out most agency engagements and most software engineers whose default cadence is sprint-based. You want someone who can sit down on Monday, hear your workflow, and deploy something usable by Friday. If the first conversation involves architecture diagrams and a multi-month roadmap, you are talking to the wrong person.

**They should be comfortable with the harness and markdown-files stack.** The SOP Execution App sits on top of an [agentic harness](/concepts/agentic-harness) (Claude Code, Hermes, Codex, or similar). The engineer should have shipped tools in this environment before. An engineer who has only built traditional SaaS applications will underestimate how much the harness changes what is possible and how it should be built.

**They should be willing to be in the room with you.** The first session is not a requirements document phase. The engineer should be in the room, physical or virtual, while you walk through your actual work. They should be asking questions, watching how you operate, and building while you are still talking. The best SOP Execution App engineers are forward-deployed: they stay close to the user and extend the system in response to observed usage, not in response to written requirements.

**They should be durable.** The system they ship has to keep evolving as your operation evolves. An engineer who builds the v0.1 and hands it off to a maintenance team is the wrong engineer. The right engineer is the one who can stay as your embedded partner past launch and keep tailoring the app (and the suit underneath it) as your needs shift.

Where to find them: [applied AI](/concepts/applied-ai) communities, referrals from other [hyperagents](/concepts/hyperagent) who already work with an embedded partner, and practitioners who have publicly documented their agentic work. Ask to see something they have shipped, not something they have designed.

## Brief the engineer

The right brief is not an architecture document. It is a workflow description.

Walk the engineer through your typical working week. Which tabs do you have open every day? Which tasks do you do repeatedly? Where do you spend time doing something that feels like it should be faster? Which decisions do you make so often that you have a rough mental framework for them?

The friction points are the starting material. The engineer's job in the brief is to hear them and identify the two or three that are highest-frequency and highest-value. Those are the first workflows to automate.

**Do not make architecture requests.** Asking for integrations across every tool you use before anything ships is a way to delay shipping, not accelerate it. Brief the problem, not the solution. The engineer will figure out the integration. Your job in the brief is to be honest about what actually slows you down.

The brief session typically runs sixty to ninety minutes. By the end, the engineer should be able to name the two workflows they will build in the first session and explain why those two are the right place to start.

## v0.1 in the room

The first working session should ship something usable. This is the most important constraint in the engagement.

A session that ends with a prototype you used once, on a real task, is a success. A session that ends with a plan for what the system will eventually do is not.

The user must use the system before the session ends. That means the first workflow has to be live, connected to real data or at least realistic test data, and the user has to run an actual task through it. Not a demo. Not a simulation. An actual task they would have done that day anyway.

The reason this matters: the [hyperagent](https://hyperagency.wiki/the-hyperagent) experience is not transmitted by reading about it or watching a demo. It is felt. A user who has run one real task through a system that knows their context understands, in their experience, what the system does for them. That understanding drives everything that happens in the iteration loop. The user who never runs a real task through v0.1 stays theoretical about the value. They will not push the engagement hard enough.

Shoot for one workflow shipped, running, and used by the user in a real task before the session ends. If you get two, great. One is enough.

## The iteration loop

After v0.1, the pattern is: use the system for a week, then add a workflow.

The user's job in the iteration phase is to use the system on real tasks every day and pay attention to what they notice. Observations like "it would be better if it also knew X" or "the output format is not quite right for my actual use" or "I keep wishing I had a button for Y" are the raw material for the next session.

The engineer's job is to take those observations and ship the next workflow. This is typically a shorter session than the first, often sixty minutes or less per workflow added.

The cadence that works: one to two workflows added per session, one session every one to two weeks. By month two, most practitioners have six to eight workflows running. By month three, the system covers the majority of the work that can be covered.

Two things accelerate the iteration loop. First, the user documenting their observations between sessions, rather than trying to remember them at the start of the next session. A quick voice memo or text note as soon as the observation occurs is enough. Second, the engineer having access to usage data, even if informal. When the user can say "I used workflow two six times this week and workflow one only once," the engineer can prioritize the right refinements.

## What kills the engagement

**Architecture-first thinking.** The engagement dies when the engineer gets absorbed in building the right infrastructure before shipping anything usable. Ship the imperfect working version now. Refactor later if the usage demands it.

**Generic dashboards.** A SOP Execution App that shows the user everything rather than the right thing for their role is not a SOP Execution App. It is a generic dashboard with more steps. The value of the SOP Execution App is specificity: your workflows, your context, your decision patterns. If the system could be used by anyone in your profession without modification, it is not specific enough.

**Handing off to a separate engineering team.** The engineer who built the system should be the same person who maintains and extends it: your embedded applied AI partner. The context they hold about your workflow, your preferences, and your usage patterns is not fully in the codebase. It is in their head. Handing the system off to a new engineer resets that context. The new engineer spends the first several sessions catching up instead of shipping. The whole point of the embedded partnership is that the build engineer stays.

**Debugging burden on the user.** If the user is expected to troubleshoot when workflows break, the engagement will stall. Errors happen. The engineer should be reachable and responsive when they do. A system that requires the user to understand why it broke is a system the user will stop using.

---

## Further Reading

- [What it is](/disciplines/sop-execution-app/what-it-is): how the SOP Execution App form factor works.
- [Anatomy](/disciplines/sop-execution-app/anatomy): the four components that make a SOP Execution App function.
- [Case studies](/disciplines/sop-execution-app/case-studies/video-strategy-workflow): a real example of the v0.1 to full-app arc.
- [When to get one built](/disciplines/sop-execution-app/when-to-get-one): the conditions that justify commissioning an SOP Execution App.
- [The Supersuit (PAOS)](/paos/what-it-is): the canonical capability the SOP Execution App is a deployment artifact for. Build this first.
- [Skill File First, App Second](https://appliedai.wiki/concepts/skill-file-first-app-second): the development order. Every button needs a proven skill file behind it.
- [Embedded Applied AI Partner](/concepts/embedded-applied-ai-partner): the tailor-on-call role the SOP Execution App engineer should ideally evolve into (or already be).
