---
title: "Skill Files"
slug: /concepts/skill-files
description: "On-demand workflow files the agent invokes when triggered. Each skill is a markdown SOP with a name, a trigger, and steps. Episodic, parametric, called. The library of procedures the agent runs on your behalf."
---

# Skill Files

*On-demand workflow files the agent invokes when triggered. Each skill is a markdown SOP with a name, a trigger, and steps. Episodic, parametric, called. The library of procedures the agent runs on your behalf.*

![Single-panel splash set inside the Chief of Agents' virtual command hall (cyber-cathedral with cyan-and-gold rendered walls, holographic blueprint geometry overhead, glowing inked floor). THE CHIEF OF AGENTS stands center-frame as a luminous translucent cyan-and-gold holographic humanoid construct, never flesh and never opaque, with no helmet visor band and no gold halo (the halo is reserved for the resolved hyperagent state, which the Chief does not earn). He holds an unfurled glowing SKILL FILE SCROLL in his outstretched holographic hands. The visible scroll text reads: '.agents/skills/underwrite-deal/SKILL.md' as the header label, then '# Underwrite Deal', '## Trigger: When the hyperagent receives a deal sheet', '## Steps: Pull comps + cap rates, Run DCF + sensitivity table, Draft memo in hyperagent voice'. Three floating cyan-and-gold HUD tabs pinned to the right of the Chief: ON-DEMAND PROCEDURE, NAMED + TRIGGERED + RERUNNABLE, ONE FILE PER WORKFLOW. Three smaller bubble panels along the bottom show three smaller holographic sub-agent figures (also fully translucent cyan-and-gold, never flesh) each working in their own bubble of the same metaverse: 1. DRAFTING. Sub-agent at a holographic desk producing a MEMO DRAFT card. 2. MODELING. Sub-agent in front of a floating spreadsheet HUD showing DCF SUMMARY with sensitivity-table rows. 3. SHIPPING. Sub-agent dispatching an EMAIL OUT envelope HUD. Captions under each panel: 'Draft memo in hyperagent voice.' / 'Run DCF + sensitivity table.' / 'Send memo in hyperagent voice.' Title bar: SKILL FILES. Footer bar: WRITE THE WORKFLOW ONCE. INVOKE IT FOREVER.](/img/comics/skill-files.png)

---

## What they are

A skill file is a markdown document that captures a repeatable workflow the agent can execute on demand. Each skill has:

- A **name** (the slug the agent and the user reference it by).
- A **trigger** (a slash command, a phrase, or a description that tells the agent when to fire it).
- A **set of steps** (the actual procedure, written in plain language, often interleaved with specific commands to run).

When the hyperagent says "process this transcript" or types `/process-transcript`, the harness loads the matching skill file and the agent walks the steps. The workflow runs the same way every time.

The canonical path inside a [Personal Agentic OS](https://supersuit.wiki/paos/what-it-is) is `.agents/skills/<skill-name>/SKILL.md`. Each skill lives in its own folder so it can carry scripts, templates, and reference assets alongside the markdown.

## A different ontological category than rule files or memory files

Skill files are one of three peer categories that shape an agent:

- **[Agent rule files](/concepts/agent-rule-files)** are *rules*: standing orders, always loaded, imperative. The standing baseline the agent reads every session.
- **Skill files** are *procedures*: on-demand workflows the agent invokes when triggered.
- **[Memory files](/concepts/memory-files)** are *facts*: harness-managed notes the agent writes to itself across sessions.

Older framings conflated all three under "instruction files." They are not the same. A rule fires every session. A skill fires when invoked. A memory entry exists when the harness decides to write it down. Different load timing, different ownership, different failure modes.

## Why they are the new unit of programming

Traditional programming tells a computer exactly what to do, step by step, in a formal language with strict syntax. The computer executes literally and has no judgment about whether the result is good.

Skill-file programming tells an intelligent agent what to care about, what constraints to respect, and what patterns to follow, in natural language with flexible structure. The agent interprets the steps using judgment, adapts them to the specific case, and often produces better output than a rigid program would.

This is a fundamentally different relationship between human and machine:

| Traditional Function | Skill File |
|---|---|
| Formal syntax (Python, TypeScript) | Natural language (markdown) |
| Executed literally by a runtime | Interpreted by a language model |
| Must handle every edge case explicitly | Agent applies judgment to edge cases |
| Changes require a developer | Changes require anyone who can write clearly |
| Tested with unit tests | Tested by observing agent behavior |
| Version controlled as code | Version controlled as documentation |

Skill files live in git alongside your code. They are version-controlled, diffable, reviewable. But they are written by anyone who understands the domain, not just people who can write code. This is one of the most significant shifts in who gets to program computers.

## How skills load (cheaper than rules)

Where [agent rule files](/concepts/agent-rule-files) are read in full on every session, skill files are lazy-loaded. The harness reads the **skill metadata** upfront (name, trigger, short description) and only loads the **full skill body** when the agent decides to invoke it.

This matters at scale. A workspace with 100 skills does not pay 100x the token cost on every prompt. It pays the metadata cost upfront and the body cost only for the skills it actually fires. See [Anatomy of a Harness](/disciplines/anatomy-of-a-harness) for the discovery and loading mechanics.

## What makes a good skill file

**Make the trigger obvious.** "Process a YouTube URL into a content summary" is a clear trigger. "Useful utility for content" is not. The harness picks skills based on the description; ambiguous descriptions mean wrong skills fire.

**Write the steps as a runnable procedure.** "Step 1: fetch the transcript via the script at `scripts/fetch.sh`. Step 2: pass the transcript to the summarizer prompt at `prompts/summarize.md`. Step 3: write the result to `artifacts/<date>-<slug>.md`." Specific paths. Specific commands. Specific output destinations.

**Encode the judgment, not just the steps.** "Skip the 'further reading' section if the source is under 500 words." "If the speaker is in the PRM, link their relationship file." The mechanical steps are easy. The judgment calls are where the skill earns its keep.

**Improve the skill when it misbehaves.** When a skill produces the wrong output or skips a step, the fix is a new line in the skill file, not a memory entry or a reminder in the chat. Once the correction is in the file, the next invocation runs better. This discipline is the difference between a skill library that compounds and one that rots. See [Memory Files](/concepts/memory-files) for the failure mode this defends against.

**Cap the scope.** One skill, one workflow. When a skill grows three responsibilities, split it. Composability is downstream of small, sharp skills.

## Skills as the spec

Every skill file is a specification the model follows literally. The quality chain holds:

**Skill quality → execution quality → output quality.**

A vague skill produces vague output. A precise skill produces precise output. Same model. Same harness. The only variable is the quality of the skill you wrote. This is [The Spec Is the Product](/disciplines/spec-writing) applied at the workflow level.

## For practitioners

When you set up a [Supersuit](https://supersuit.wiki/concepts/supersuit) for a principal, the skill library is the bulk of the work. The [agent rule file](/concepts/agent-rule-files) is one document. The skills are dozens. Each one captures a workflow the principal already does manually, encoded so the agent can run it on demand.

Your job is to write these well. The principal will describe the workflow in conversation. You translate it into a skill file that the agent can execute consistently. The first version is rough. The second is sharper. By the fifth invocation, the skill is encoding judgment the principal would have repeated by hand a hundred more times.

This is [context engineering](/disciplines/context-engineering) at the workflow scale: encoding the exact information state and procedure that makes the agent useful for this specific repeatable job.

---

## Further Reading

- [Agent Rule Files](/concepts/agent-rule-files): the sibling concept. Standing orders the skill library is referenced from.
- [Memory Files](/concepts/memory-files): the third sibling. Why the discipline of updating a skill matters more than letting auto-memory paper over a skill that misbehaved.
- [Digital SOPs](https://supersuit.wiki/concepts/digital-sops): the hyperagent-register name for the same primitive.
- [Fat Skills](/concepts/fat-skills): what a skill file looks like when it is dense with encoded judgment.
- [Skill File First, App Second](/concepts/skill-file-first-app-second): the product ordering this paradigm enables.
- [Harness Engineering](/disciplines/harness-engineering): skill files are the user-configurable workflow layer of the harness.
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): how Claude Code discovers, loads, and follows skill files.
- [Spec Writing](/disciplines/spec-writing): the quality chain that applies to every skill file.
- [CLIPs](/foundations/clips): where skills end and full programs begin.
- [Personal Agentic OS](https://supersuit.wiki/paos/what-it-is): the system the skill library configures.
- [Supersuit Up Workshop](https://supersuit.wiki/paos/supersuit-up-workshop): where the principal writes their first skill files.
