---
title: The Judgment Line
slug: /perspectives/the-judgment-line
description: LLMs handle judgment. Code handles everything else. The architectural rule that keeps agentic systems trustworthy.
---

# The Judgment Line

*LLMs handle judgment. Code handles everything else.*

---

## The Rule

Every task in an agentic system falls on one side of a line.

**Above the line:** synthesis, prioritization, drafting, reasoning, interpretation, deciding what matters. Work where the answer depends on context, nuance, or taste. This is what LLMs are for.

**Below the line:** reading files, calling APIs, sending messages, comparing timestamps, transforming data, moving things between systems. Work where the answer is deterministic. This is what scripts are for.

The rule: never push below-the-line work through an LLM.

---

## Why This Matters

When you route deterministic work through an LLM, things break in unpredictable ways. The model might add a timestamp wrong, skip a file it was supposed to read, hallucinate an API response, or silently drop a step it found uninteresting. These failures are invisible until they cause real damage, because the system looked like it was working.

Worse: you stop trusting the system. Once you catch an LLM getting a date comparison wrong or mangling a data transformation, you start double-checking everything. That defeats the purpose. The whole point of building an agentic system is to stop doing the work yourself.

The fix is layer separation. Code does what code is good at: reliable, repeatable, verifiable execution. The LLM does what the LLM is good at: reading a situation and making a call. When you get this separation right, the system becomes something you actually depend on rather than something you babysit.

---

## What This Looks Like

**Email triage.** Code pulls emails from the API, parses headers, extracts metadata, checks timestamps, deduplicates. The LLM reads the content and decides what needs your attention, what can wait, and what to ignore. Code handles retrieval. The LLM handles judgment.

**Meeting prep.** Code queries your calendar, fetches prior notes from the file system, pulls recent email threads with the attendees. The LLM synthesizes all of it into a brief: what matters, what to bring up, what to watch for. Code handles assembly. The LLM handles synthesis.

**Task management.** Code reads task files, compares due dates, identifies what is overdue, checks which items have rolled forward for five consecutive days. The LLM looks at the full picture and decides what to flag as urgent, what to deprioritize, and what to say in the evening summary. Code handles state. The LLM handles prioritization.

**Research.** Code fetches RSS feeds, scrapes pages, downloads PDFs, extracts text. The LLM reads the content and decides what is relevant, what is noise, and how it connects to what you are working on. Code handles collection. The LLM handles curation.

The pattern is always the same: code assembles the inputs, the LLM applies judgment, code executes the output.

---

## The Common Mistake

Most people building agentic systems make the same error: they give the LLM a broad instruction ("check my email and handle anything important") and let it figure out the mechanics. The LLM then has to handle both the judgment ("is this important?") and the plumbing ("connect to Gmail, parse MIME, extract attachments"). It will get the judgment right most of the time and the plumbing wrong some of the time, and you will not know which failures are which.

The fix is not to constrain the LLM. It is to give it less to do. Write the plumbing in code. Hand the LLM clean inputs. Let it do what it is actually good at.

---

## The Trust Equation

A system you trust is a system you use. A system you use is a system that compounds.

Trust comes from predictability. The deterministic parts of your system should be perfectly predictable because they are code. The judgment parts should be predictably good because the LLM is only being asked to do LLM-shaped work with clean inputs.

When both layers are doing what they are designed for, the system earns your trust faster. When they are blurred together, every failure could be either layer, and debugging becomes guesswork.

A smaller system you trust will always beat a bigger one you route around. The judgment line is how you build the smaller system.

---

## The Human Layer

The judgment line has two sides. But not all judgment belongs to the LLM.

High-stakes decisions (sending money, publishing externally, responding to a key client, making a commitment on your behalf) need a human in the loop. The LLM can draft, recommend, and flag. It should not execute. The cost of a bad judgment call on routine email triage is low. The cost of a bad judgment call on a fundraise follow-up or a public statement is not.

This applies to creative work too. A musician choosing which take has the right feel, a designer deciding the visual tone of a brand, a writer finding the voice of a piece: these are judgment calls that define the work itself. Automating them does not save time. It removes the thing that makes the output worth anything. The judgment line is not just about risk management. It is about knowing which decisions are the point of your work and keeping those in human hands.

The design rule extends naturally: code handles determinism, the LLM handles routine judgment, and you handle the judgment that matters most. The permission surface is how you enforce this in practice: certain actions require your approval before the system executes them. As trust builds over time, the boundary between LLM judgment and human judgment can shift. But it should shift deliberately, not by default.

---

## Further Reading

- [Harness Engineering](/disciplines/harness-engineering): The broader architecture that the judgment line operates within
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): How Claude Code implements this separation in practice
- [The Overconfidence Trap](/perspectives/the-overconfidence-trap): The operator-side mirror of routing too much through the LLM
- [LLM Psychosis](/perspectives/llm-psychosis): The build-side failure that violating the judgment line produces
- [Judgment Burnout](/perspectives/judgment-burnout): What happens to the operator when too much work crosses onto the human side of the line
