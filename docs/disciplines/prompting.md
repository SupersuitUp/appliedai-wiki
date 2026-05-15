---
title: "Prompting"
slug: /disciplines/prompting
sidebar_position: 1
description: "The systematic side of getting models to produce the output you actually want. Frameworks, libraries, prompt versioning."
---

# Prompting

*The systematic side of getting models to produce the output you actually want. Not vibes. A discipline with frameworks, libraries, and version control.*

---

## What the discipline is

Prompting is the practice of constructing the input that gets the model to produce useful output. The amateur version is a one-shot question. The professional version is a structured, reusable artifact that is versioned, tested, and improved over time.

The difference between amateur and professional prompting compounds. A consultant who is using shaped, versioned prompts is operating ten times faster than one writing fresh prompts every session, and the quality gap widens with every iteration.

## The high-leverage moves

**Use a prompting framework, not freestyle.** The single biggest leverage move is adopting a structured framework so prompts have predictable shape. The best-known framework for business prompting is **CRIT** (Context, Role, Interview, Task), popularized by Geoff Woods.

- **C: Context.** Give the model the situation. Background, constraints, what has already been tried, what the stakes are.
- **R: Role.** Tell the model who it is in this exchange. "You are a senior operations consultant" beats "tell me how to think about this."
- **I: Interview.** Ask the model to interview *you* before producing output. "Before you answer, ask me three questions you need answered to give the best response." This single move turns a one-shot into a collaboration and surfaces context the operator forgot to provide.
- **T: Task.** State the deliverable. Be specific about format, length, and what counts as success.

CRIT works because it forces the operator to do the thinking they would have done anyway, in a sequence that lets the model do its part well. It is the difference between hiring a contractor with a clear brief and one with a vague text message.

**Treat prompts as artifacts, not throwaways.** A prompt that produced a great output once is reusable. Save it. Name it. Version it. Most consulting work has fewer than thirty unique prompt patterns. Build a library.

**Use in-context examples for shape, not content.** If you want the output in a specific shape, give the model two or three examples in that shape *before* asking for the new output. The model will mimic structure faster than it will mimic instructions about structure.

## Bottom-of-the-barrel mistakes

- **Asking the model to "think step by step" as a panacea.** Chain-of-thought helps with reasoning but does not fix bad context or a vague task statement. Diagnose the actual gap.
- **Long prompts without structure.** A 2,000-word prompt with no sections, no labels, no examples is worse than a 300-word prompt with all four CRIT parts. Length is not the variable. Structure is.
- **Reinventing prompts every session.** If you are typing a similar prompt twice, save it. If you are typing it five times, version it.

## Tools and playbooks downstream

- **[Claude Code](/reference/tools/claude-code)**: the practitioner's harness when prompts grow into skills, instruction files, and agent workflows.

## Further Reading

- [Disciplines](/disciplines): the other craft pillars
- Geoff Woods, *The AI-Driven Leader* (book): the canonical book-length treatment of CRIT.
