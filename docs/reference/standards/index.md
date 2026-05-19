---
title: "Standards"
slug: /reference/standards
description: "Open agent-readable file formats: ALIGN.md for partnership alignment, INTEGRATE.md for wiring systems together, GENERATE.md for one-time scaffolding recipes."
---

# Standards

*Open file formats designed to be parsed by AI agents, not just read by humans.*

---

## What lives here

Three specs sit in this section. All three are agent-readable file formats. All three are versioned, dated, and meant to be copied into your own repos.

- **[ALIGN.md](/reference/standards/align-md)**. A relational format. Describes who you are, what you value, what you bring, what you look for, and what makes you walk away. Agents on both sides cross-reference the two files to surface alignment or dealbreakers before anyone takes a call.
- **[INTEGRATE.md](/reference/standards/integrate-md)**. A technical format. Teaches an agent how to wire one system into another, either a library into a codebase (Flavor A) or a service into your agent harness (Flavor B). The agent reads the file and executes the integration steps autonomously.
- **[GENERATE.md](/reference/standards/generate-md)**. A scaffolding format. Teaches an agent how to run a one-time generation: interview the operator, execute the scaffold, verify the artifact, then step aside. Distinct from SKILL.md (ongoing capability). Distinct from INTEGRATE.md (wiring two existing systems). The artifact has a terminal state: after the GENERATE runs, the wiki exists, the project is scaffolded, the workspace is bootstrapped.

All three formats target an agent reader. All three are intentionally minimal at v0.x. All three evolve based on real usage patterns rather than upfront design.

## Why these two

Practitioners working at the leverage layer keep running into the same coordination problems:

1. **Who should I work with, and on what?** ALIGN.md surfaces the answer faster than another intro call.
2. **How do I wire this thing into my system?** INTEGRATE.md gives an agent a runnable recipe instead of a tutorial aimed at humans.
3. **How do I scaffold this new thing from scratch?** GENERATE.md gives an agent a one-time recipe to bootstrap an artifact (a wiki, a workspace, a project) with the right inputs gathered through an interview.

All three are designed to be forkable. Copy the format, publish your own, and the format spreads through bilateral use.

## Further Reading

- [ALIGN.md](/reference/standards/align-md): The partnership alignment format
- [INTEGRATE.md](/reference/standards/integrate-md): The system integration format
- [GENERATE.md](/reference/standards/generate-md): The one-time scaffolding format
- [Voice Rules](/reference/voice-rules): The house style these specs are written in
