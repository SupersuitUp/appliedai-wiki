---
title: "CLIPs: The Apps of the Agentic Era"
slug: /concepts/clips
description: "Every major computing wave creates a platform and an ecosystem on top of it. The browser gave us websites. The iPhone gave us apps. Cloud gave us SaaS. Agents are next. The question is: what gets b..."
---

# CLIPs: The Apps of the Agentic Era

*Every major computing wave creates a platform and an ecosystem on top of it. The browser gave us websites. The iPhone gave us apps. Cloud gave us SaaS. Agents are next. The question is: what gets built on top?*

*This article is based on [Sam Padilla's original post](https://x.com/theSamPadilla/status/2040965610155155681) introducing the CLIPs concept.*

---

## The Platform Is Here. What About the Ecosystem?

AI agents (not just models) are becoming the next platform.

Most people are focused on the platform war: better models, better [harnesses](https://appliedai.wiki/disciplines/harness-engineering), longer task loops, better tool use. That matters. But the more interesting question is what gets built on top. What is the app layer for agents? Is there even a need for one?

When AI can build anything, why do you need anything pre-built?

The answer is emerging: agent-native software that plugs into harnesses, carries domain expertise, and gives agents packaged capabilities they do not have to reinvent every session.

**The POV: most people should not be jumping to build apps. They should be building CLIPs.**

## Start With the Harness

Over the last year, the term “AI harness” has become shorthand for the software layer that turns a raw model into an agent.

**Agent = AI Model + Harness**

Claude Code is a harness. Codex is a harness. OpenClaw, Cursor, and Windsurf are harnesses too. They wrap a model with tools, execution environments, files, memory, and context management. Out the other end comes something that can actually do work. (For a deep dive, see [Harness Engineering](https://appliedai.wiki/disciplines/harness-engineering) and [Anatomy of a Harness](https://appliedai.wiki/disciplines/anatomy-of-a-harness).)

That layer has become one of the most important new battlegrounds in software. Billions of dollars are flowing into better scaffolding, better tool use, better context handling, and longer-running agent loops.

But there is an implicit assumption hiding underneath all of that: that the harness is the final layer that matters.

It is not.

## The Appless Platform?

If agents are general-purpose reasoners that can write code, call APIs, and figure things out from first principles, why would they ever need pre-built tools?

Three reasons.

### 1. Domain expertise is expensive to rediscover every time

An agent can figure out how to trim silence from a video. It can read the ffmpeg docs, reason about codec flags, and assemble a command.

But should it have to rebuild that pipeline every session?

Domain knowledge compounds. Video editing is not one ffmpeg call. It is hundreds of edge cases, format quirks, codec behaviors, and non-obvious dependencies that take iteration to get right.

A [skill file](/concepts/skill-files) or system prompt does not solve this. A skill can tell an agent how to think about a problem. It cannot execute the solution. That distinction matters. The skill is the knowledge. The tool is the execution.

Execution from scratch is expensive. Every time the agent rebuilds the same workflow in context, it writes code, debugs edge cases, and burns tokens on work that should already be packaged. Worse, it is fragile.

### 2. Reliability beats improvisation

Model output is inherently stochastic.

Better models, chain-of-thought reasoning, good tooling, and clear context/filesystem management have led to a reliable collapse of the probabilistic cloud of AI slop into something useful. But this still breaks. The longer a task's reasoning chain, the more opportunities an agent has to hallucinate, produce a broken output, or simply fail to follow standards.

### 3. Speed matters

Building from scratch is slow. Reasoning from first principles every time is slow. Calling a pre-built step with a JSON schema is fast. For anything an agent does more than once, packaged tools turn a 30-step reasoning chain into a 3-step tool call.

**The bottom line:** packaged, opinionated software with curated AX (Agent Experience) and UX beats general-purpose tools for specific jobs.

## This Is Already Happening

Stripe is building agent-native payment flows. Moltbook is building agent-first social media. Across the stack, builders are redesigning software around a new assumption: the primary users are now agents. (See [Agent-Accessible Products](https://appliedai.wiki/concepts/agent-accessible-products) for more on this shift.)

But we still do not have a good name for this category.

For now, this kind of software is called a **CLIP**.

Whether or not the name sticks, the category is real.

## What Is a CLIP?

CLIP stands for **CLI Program**, for agents.

The name is deliberate. In climbing, clips are the small but critical pieces of gear that attach to your harness. They connect you to the rest of the system. Without clips, the harness is just something you are wearing.

An Agentic CLIP works the same way. It is a self-contained program (typically CLI-first) that attaches to existing harnesses to give agents specialized capabilities in a specific domain. It does not replace the harness. It does not compete with it. It clips on.

A CLIP is a collection of tools, workflows, schemas, and domain knowledge packaged for agentic use. It is built with AX in mind first, UX second.

The agent does not need to write code to use it. It reasons about which operations to call, in what order, and with what parameters. The CLIP provides the *what*. The agent provides the *why*, the *how*, and the *when*.

## CLIPs vs. Skills vs. MCP Servers

These three things are often confused. Here is the distinction.

### A skill is knowledge

It is a set of [instructions](/concepts/skill-files) that tells an agent how to think about a domain. What to prioritize, what patterns to follow, what pitfalls to avoid, what tools to use. Skills live in the agent's context window. They shape reasoning and direct tool calling.

### An MCP server is a connector

It exposes functions and discrete capabilities that an agent can call. An MCP connection is stateful, but the state it manages is the session, not the work state. It does not track where you are in a multi-step workflow or what the last three operations produced. You cannot terminate a session, come back, and pick right back up where you left off.

### A CLIP is all of it, and more

**Opinionated but flexible.** CLIPs tell agents: “Here is the strongly suggested order, here are the dependencies, here is when to parallelize, here is when to deviate.” It does not take away the agent's reasoning. It bounds the stochastic cloud of potential outputs into a proven workflow.

**Work-stateful.** A CLIP tracks work: a project file, a state machine, a DB entry, a progression from raw input to finished output. It knows what has been done and what is left.

**Dual interface.** It is not just agent-callable. It is also human-viewable and editable. The agent works, the human inspects. A local UI, a project file a human can read, or a draft/final state the human can approve.

**Installable and callable.**

```bash
brew install clip-name
```

And the agent has a new domain. CLIPs are full programs with a CLI for native agent interaction, possibly an MCP server to serve harnesses without direct CLI access, and agent-first entrypoints.

## An Example

An agent with video editing **skills** knows it should “transcribe first, then remove filler words and dead air.”

An agent with a trim **MCP tool** can cut a clip at a given timestamp.

An agent with a video editing **CLIP** can probe a clip for metadata, transcribe it, identify filler words and silence gaps, pick the best takes, trim out the bad ones with proven ffmpeg operations that handle codec edge cases correctly, and composite the result. All by following an opinionated workflow that encodes domain expertise and available tools.

All while using only 20k tokens, since all the heavy lifting was done by workflow steps and tools.

## The SaaSpocalypse

The timing of CLIPs is not accidental. There is a structural collapse happening in the SaaS economy.

Companies with massive market caps built on subscription-based, seat-based pricing are getting crushed. Not because their products stopped working, but because the economics changed underneath them. When a single person with an agentic harness can build a custom solution in an afternoon that does 80% of what the SaaS product does, the pricing model breaks. Why pay $50/seat/month for a CRM when your agent can manage contacts in plain markdown files that you own? Why pay $200/month for a project management tool when your [Personal Agentic OS](/paos/what-it-is) already tracks everything?

The stranglehold that SaaS companies have had is loosening because people are realizing something fundamental: they do not need to upload all their contacts, all their documents, all their institutional knowledge to random companies anymore. The data was always the value. The SaaS product was just a wrapper around it. Now the wrapper is commoditized and the sovereignty of the data matters more than ever.

This does not mean every SaaS company dies. The ones with genuine network effects, deep integrations, or regulatory moats will survive. But the long tail of “we put a dashboard on a database” companies is in trouble. The value is shifting to two places:

1. **Open-source CLIPs** that you install locally, connect to your harness, and own completely. These replace the functionality of SaaS products without the subscription, the vendor lock-in, or the data exposure.

2. **Applied AI practitioners** who maintain agentic infrastructure for companies. Instead of paying ten SaaS subscriptions, you pay one practitioner (or build one internal team) to maintain a sovereign system that does everything those subscriptions did, but better, because it is built around your specific operation. Ramp proved this at scale: one internal team, one integrated system, 700 employees activated.

The SaaSpocalypse is the economic context that makes CLIPs not just interesting but inevitable. When the wrapper is free, the domain expertise inside the CLIP is what you are paying for.

## The Opportunity

Right now, most of the energy in AI tooling is going into harnesses. That makes sense. You need a harness before you can clip in.

But harnesses are maturing fast. Claude Code, Codex, OpenClaw. A dynamic similar to the App Store is emerging: closed-source walled gardens alongside open-source frameworks.

Agentic AI is coming for every knowledge industry. Think about every vertical that requires specialized, multi-step expertise: video editing, audio production, legal document review, financial modeling, medical records processing, architectural drafting, data pipeline orchestration.

Each of these is a CLIP waiting to be built.

The pattern will look like this: a small team with deep domain expertise packages their knowledge into a CLI-first toolkit built for the agent harnesses their clients are already using. In the CLIP live the steps, the schemas, the workflows, and the compliance. Suddenly, every agent in the world can do what only their domain experts could do before.

This is a new kind of software, one where the fundamental dependency is an agent: not SaaS, not an API wrapper, not an MCP server with a few extra functions. The CLIP does not work on its own. It assumes an intelligent hyperagent is holding the other end.

## Don't Build Apps. Build CLIPs.

If you are a practitioner with deep domain expertise, do not default to building a traditional app. The instinct to build a dashboard, a login page, and a SaaS product is strong. It is also probably wrong for this moment.

The agents are the interface now. Your domain knowledge is the value. Package it as a CLIP: installable, callable, work-stateful, and opinionated. Let the harness handle the UX. You handle the AX.

We are moving from software that waits for humans to click, to software that waits for agents to think.

The harnesses are here. Now clip in.

---

## Further Reading

- [Sam Padilla's original CLIPs post](https://x.com/theSamPadilla/status/2040965610155155681): The post that introduced the CLIPs concept
- [Harness Engineering](https://appliedai.wiki/disciplines/harness-engineering): The layer that CLIPs attach to
- [Anatomy of a Harness](https://appliedai.wiki/disciplines/anatomy-of-a-harness): Deep technical analysis of how harnesses work
- [Agent-Accessible Products](https://appliedai.wiki/concepts/agent-accessible-products): The broader shift toward agent-native software
- [Skill Files](/concepts/skill-files): How skills differ from CLIPs (knowledge vs. execution)
