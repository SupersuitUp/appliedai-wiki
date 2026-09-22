---
title: "Superprompt"
slug: /concepts/superprompt
description: "A regular prompt is the trigger. A superprompt is the trigger plus the activated system: the always-loaded baseline, the files tagged for the job, the invoked skill files, and the utterance, which is the only part supplied in the moment."
image: "/img/comics/superprompt.webp"
---

# Superprompt

*A regular prompt is the trigger. A **superprompt** is the trigger plus the activated system: the always-loaded baseline, the files tagged for the job, the invoked skill files, and the utterance, the net-new words and the only part supplied in the moment.*

![Three-panel warm editorial strip titled SUPERPROMPT. Panel 1, "One short line with nothing behind it": a silver-haired woman in a slate-blue cardigan, seen over her shoulder, types one short line into a plain, unlit laptop, and a single blank sheet of paper drifts out. Panel 2, "The same line, carried by everything she built": the same woman at a glowing amber laptop; inside the screen the Chief of Agents in a gold cap and small sub-agents stack a thick binder of standing instructions, a pile of folders, a fan of procedure cards, and on top one tiny slip holding her short line. Panel 3, "Four finished diagrams, checked on her phone": inside the screen the sub-agents set four box-and-arrow diagrams into an open draft while she checks one of them at small size on her phone.](/img/comics/superprompt.webp)

---

## What it is

Two people can type the same sentence into the same model and get categorically different work back. The sentence is identical. What differs is everything that arrives at the model alongside it.

A **superprompt** names that full payload. The words an operator types are one layer of it, and usually the smallest. The rest is material the operator assembled before the moment arrived: standing instructions, files about the people and projects involved, and procedures written down once and reused. The [harness](/disciplines/harness-engineering) gathers all of it and sends it together.

A regular prompt is the same sentence with nothing behind it. The model is as capable as ever, and the output is generic, because the model has nothing to be specific about.

## The four layers

A superprompt stacks four layers. Three are reused. One is fresh.

### 1. The always-loaded baseline

The files the harness reads at the start of every session, without being asked: the root instruction file (`AGENTS.md` or `CLAUDE.md`, covered in [agent rule files](/concepts/agent-rule-files)) and the voice file that says how the operator writes. The operator never names these when firing a prompt. They are in scope every time, which is what makes them the right home for rules whose trigger is unpredictable.

### 2. The files tagged for the job

The specific files that matter to this piece of work: the people file for whoever is involved, the transcript of the call it came out of, the project folder holding its state and its drafts. The files already exist. The operator's contribution here is selection, knowing which slice of their context this task needs, and in a well-kept workspace the harness can often find that slice on its own.

### 3. The invoked skill files

The [skill files](/concepts/skill-files) the work calls for, pulled in by name, by slash command, or by the harness recognizing the task. Each one is a procedure the operator wrote once: the steps, the success criteria, the output shape, the mistakes it already learned to avoid. Skills are where the operator's judgment compounds, which is the argument of [fat skills](/concepts/fat-skills).

### 4. The utterance

The net-new words: what the operator types or speaks in this moment that did not exist anywhere a minute ago. The intent, the framing, the signal they picked up an hour ago. It is the smallest part of the superprompt by far, and the only part supplied in the moment. Everything else was already on disk.

## Why it works: in-context learning

Nothing in a superprompt is trained into the model. The weights are the same for every customer. What changes is the text the model reads before it answers, and a model adapts to what it reads in the moment. That capacity is [in-context learning](/concepts/in-context-learning), and it is the only lever an operator has.

So the quality of a superprompt is a property of the context, which makes building one a [context engineering](/disciplines/context-engineering) problem. The three reused layers are written once, maintained, and read on every fire. Each improvement to them improves every future prompt that loads them, and the utterance can shrink as they grow, because it no longer has to carry the background, the standards, or the procedure. It only has to carry the intent.

This is also why the gap between two operators on the same tools keeps widening. The model and the harness can be identical. The files behind the utterance are not, and they are the part a competitor cannot copy, which is what the [personal agentic edge](https://supersuit.wiki/concepts/personal-agentic-edge) names.

## An example

An operator was writing a long piece that needed diagrams. The instruction they gave was one sentence:

> Pour love into creating really good diagrams for this.

Within the hour the draft had four diagrams, each drawn in code, each checked at phone size, each placed at the point in the draft where it belonged.

The sentence carried none of that. It said nothing about which project, how diagrams get drawn, what size to check them at, or what style they should follow. That came from the other three layers: the platform had the project loaded with the draft and its state, the style rules were in the always-loaded baseline, and a diagram skill held the procedure, including the check at phone size. The utterance supplied the intent and the standard of care. The system supplied everything else.

Typed into an empty chat window, the same sentence produces a question back, or a generic diagram with no draft to go into.

## How to tell which one you are writing

- **Do you have to explain who you are or what you are working on?** If so, the baseline and the tagged files are missing, and the utterance is doing their work.
- **Have you written this kind of instruction before?** If there is no skill for it yet, the procedure is being retyped every time. Promote it to a skill file.
- **Are you describing files in prose instead of pointing at them?** Description is slow and lossy. Reading is fast and faithful.
- **Does the utterance carry only the intent?** When it does, the system behind it is carrying the rest.

## Further Reading

- [In-Context Learning](/concepts/in-context-learning): the mechanism a superprompt runs on. Text in the window is the only lever.
- [Skill Files](/concepts/skill-files): the reusable procedures that make up the third layer.
- [Agent Rule Files](/concepts/agent-rule-files): the standing orders that make up the always-loaded baseline.
- [Context Engineering](/disciplines/context-engineering): the discipline of deciding what goes in the window.
- [Harness Engineering](/disciplines/harness-engineering): the code that assembles the layers and sends them.
- [Playable Harness Experience](/concepts/playable-harness-experience): a shippable bundle of skills and templates, played by firing superprompts against it.
- [Personal Agentic Edge](https://supersuit.wiki/concepts/personal-agentic-edge): why the reused layers are what separate two operators on the same model.
