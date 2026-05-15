---
title: "Always-On Agents"
slug: /concepts/always-on-agents
description: "The shift from AI that answers when asked to AI that works for you while you sleep."
---

# Always-On Agents

*The shift from "AI that answers when asked" to "AI that works for you while you sleep."*

---

## The Prompt-Response Era Is Ending

Right now, most people interact with AI the same way: you type something, it responds. You close the window, it stops. Every interaction requires you to initiate. The AI is reactive. It waits for you.

This is already changing. The next phase is **always-on agents**: AI that runs in the background continuously, monitoring your operation, detecting problems, executing tasks, and advancing your goals without you having to ask. You open your laptop in the morning and things have already been handled.

## What This Looks Like

On March 31, 2026, [a deep analysis of Claude Code's source code](https://x.com/itsolelehmann/status/2039018963611627545) revealed a fully built but unreleased feature called KAIROS. It is the clearest signal yet for where all AI tools are heading.

KAIROS is a proactive Claude that runs 24/7. Here is how it works:

**The heartbeat loop.** Every few seconds, the agent receives a pulse. A prompt that essentially asks: "Anything worth doing right now?" It looks at the current state of your workspace, your files, your notifications, and makes a call: act or stay quiet.

**Exclusive capabilities.** Always-on agents need things that regular prompt-response agents do not:
- **Push notifications.** The agent can reach you on your phone or desktop even when you are not in the terminal. It taps you on the shoulder when something matters.
- **File delivery.** The agent can create things and send them to you without you asking.
- **Subscription to external events.** The agent watches your GitHub, your email, your systems, and reacts to changes on its own.

**Daily logs and memory consolidation.** The agent keeps append-only logs of what it noticed, what it decided, and what it did. It cannot erase its own history. At night, it runs what the code calls "autoDream": consolidating what it learned during the day and reorganizing its memory while you sleep.

**Persistence across sessions.** Close your laptop on Friday. Open it on Monday. The agent has been working the whole time.

## The Context Engineering Prerequisite

Here is the thing nobody is talking about yet: an always-on agent is only as useful as the context it has access to.

If your agent does not know your goals, it cannot advance them while you sleep. If it does not know your priorities, it cannot triage your notifications. If it does not know your relationships, it cannot draft the right response to the 2am email. If it does not know your principles, it will make decisions you disagree with.

This is why [context engineering](/disciplines/context-engineering) is so important. A workspace architecture of user profiles, relationship files, artifacts, skill files, and principles is not just useful for prompt-response interactions. It is the prerequisite for always-on agents. The people who have been building their context layer now will have agents that can actually do meaningful work autonomously. The people who have been using AI as a chatbot will have agents that are clueless.

Your `user/USER.md` tells the agent who you are. Your `artifacts/` tell it what you are working on. Your `skills/` tell it how to do things. Your `people/` tell it who matters. Without this context, an always-on agent is just a very expensive process running in the background doing nothing useful.

## What Always-On Agents Enable

Always-on agents are the mechanism by which a self-improving operation actually runs. Not a human checking dashboards every morning and making adjustments. Agents that continuously monitor, detect, propose, and (with appropriate guardrails) implement improvements.

Your website goes down at 3am. The agent detects it, restarts the server, and sends you a notification. By the time you see it, it is already resolved.

A skill file has a step that consistently fails. The agent notices the pattern, proposes a fix, logs the change.

A relationship file has not been updated in 60 days despite three meetings logged in transcripts. The agent drafts the update and flags it for your review.

This is what it means for an operation to improve itself. Not a human doing the improving. The system doing the improving, with the human defining what "better" means and reviewing the results.

## What You Should Do Now

You do not need to wait for KAIROS to ship. The preparation is the same whether always-on agents arrive in three months or three years:

1. **Build your context layer.** Set up your agent workspace. The richer your context, the more useful any future always-on agent will be.
2. **Write your principles.** An agent making decisions on your behalf at 3am needs to know your decision-making rules. Document them.
3. **Make your operation refactorable.** Always-on agents need to read and modify your files. If your truth is locked in proprietary tools the agent cannot access, it cannot help you.
4. **Think in skill files.** Every workflow you document as a skill file is a workflow an always-on agent can eventually run without you.

The post-prompting era is coming. The question is whether your system is ready for it.

---

## Further Reading

- [Context Engineering](/disciplines/context-engineering): The discipline that makes always-on agents useful
- [Context Lake](/disciplines/context-lake): The context layer always-on agents will operate on
- [Harness Engineering](/disciplines/harness-engineering): The code layer that always-on agents run inside
- [KAIROS analysis thread](https://x.com/itsolelehmann/status/2039018963611627545): The source code analysis that revealed Anthropic's always-on agent infrastructure
