---
title: "Truth Management"
slug: /disciplines/truth-management
description: "The discipline of keeping documented truth aligned with operational reality, so your systems can act on what is actually true."
---

# Truth Management

*The discipline of keeping documented truth aligned with operational reality, so your systems can act on what is actually true.*

---

## What it is

Truth management is the systematic work of capturing, organizing, and maintaining the shared understanding that individuals and organizations operate from. It treats that understanding as an artifact: something that lives in files, has a version history, and can be read by anyone with access, including your agents.

The name is intentional. "Context management" would be accurate but undersells the stakes. Every file in your truth system becomes a premise that your agents and teammates act on. If those premises are wrong, contradictory, or stale, the actions that follow are wrong at machine speed. Treating the work as "truth management" captures the seriousness the practice requires.

## Why an applied AI practitioner needs it

A practitioner running serious workflows operates with a compounding agent surface. The surface's output is only as good as the context it operates on. If the context is accurate and current, the output is calibrated to the actual situation. If the context is stale or contradictory, the output misses the mark in ways that are hard to diagnose because the execution itself looks clean.

This is the substrate problem. You can have excellent tools and poor truth management. The tools will produce plausible-looking output that does not serve your actual situation. You can have modest tools and excellent truth management. The tools will produce output that consistently lands.

A productive worker can get away with thin truth management because their output is not compounding. Each task starts from scratch. An operator running an AI-leveraged organization cannot get away with it. Their surface compounds from a foundation. If the foundation is poor, the compounding magnifies the inaccuracy.

## The repeated-question test

A team that asks the same question three times and gets a verbal answer each time is failing the simplest truth management test. The fourth time the question comes up, write the answer down and put it where the question naturally surfaces. That entry is now in the system. The fifth time, the answer is already there.

This is truth management at its most basic. Not sophisticated. Not technical. Just the discipline of capturing the answer the first time it is earned and making it available to everyone who needs it afterward.

A wiki is one of the structural forms this takes. When the answer belongs to the canon, it gets a page. When other pages reference it, they link to the page rather than re-explaining it. One canonical home. No drift.

## Source-controlling truth as artifact hubs

Truth lives at different sensitivity tiers:

- **Public wikis**: canonical reference for disciplines and concepts, accessible to anyone.
- **Private repositories**: operational truth for teams and individuals, access-controlled.
- **Password-protected wikis**: trust-circle material, gated but shareable via link.

A serious operator builds and maintains artifact hubs at each relevant tier. This is not about information architecture for its own sake. It is about ensuring that every agent and collaborator who needs context has access to the right version of it, and that version is trustworthy.

The source control discipline means every change is tracked. When the definition of a concept sharpens, the history of that sharpening is preserved. When a strategy evolves, the reasoning behind the evolution is documented. The version history is part of the artifact.

## The connection to your agent harness

Your agent reads from your truth repository. When you brief an agent before a meeting, the agent reads the relationship file for that person. When an agent drafts in your voice, it reads your voice spec. When it makes a recommendation, it reads your current strategy and principles.

All of those files are truth management artifacts. The agent is the execution layer. Truth management is the substrate the agent executes from. The two are not separable: an agent running on a poor truth repository produces poor output. An agent running on a sharp truth repository produces sharp output.

---

## The framework

If you have not committed to the discipline yet, read [Why It Matters](/disciplines/truth-management/why-it-matters) first. If you are already convinced, go straight to [Getting Started](/disciplines/truth-management/getting-started) for the Day 1 to Week 4 plan.

### Principles

Core operating principles for effective truth management, ordered from foundational claim to structural commitments:

- [**Don't Assume Common Sense**](/disciplines/truth-management/dont-assume-common-sense): the foundational claim. Remove "common sense" from your vocabulary; only shared understanding exists.
- [**Align Before Committing**](/disciplines/truth-management/align-before-committing): the partnership-level application. Never start meaningful projects without explicit, documented alignment.
- [**Make Every File Count**](/disciplines/truth-management/make-every-file-count): the per-file quality bar. Every document must actively support right action with minimal noise.
- [**Make Your Company Refactorable**](/disciplines/truth-management/make-your-company-refactorable): the structural requirement. Can you grep and edit your entire company OS with an agent call?
- [**Empower Your Truth Manager**](/disciplines/truth-management/empower-your-truth-manager): the institutional commitment. Truth management requires real authority to enforce coherence.
- [**Protect Your Truth**](/disciplines/truth-management/protect-your-truth): the security layer. Match access controls to sensitivity levels.

### Processes

Systematic workflows for implementing truth management:

- [**Getting Started**](/disciplines/truth-management/getting-started): the sequenced Day 1 through Week 4 rollout.
- [**Start Your Company Handbook**](/disciplines/truth-management/start-your-company-handbook): build comprehensive documentation capturing your institution's "way."
- [**Migrate to Refactorable Systems**](/disciplines/truth-management/migrate-to-refactorable-systems): move from siloed tools to grep-able, version-controlled formats.
- [**Truth as Context**](/disciplines/truth-management/truth-as-context): ensure AI agents have full institutional context when creating or modifying documentation.
- [**Maintain Coherence**](/disciplines/truth-management/maintain-coherence): automated checks, cross-linking, and scheduled audits that keep your repository reflecting current reality.
- [**Refactor Your Information Architecture**](/disciplines/truth-management/refactor-your-information-architecture): the other audit. Coherence catches broken links and stale dates; this one catches drifted folder labels, oversized sections, and content that has outgrown its current home.

### Tools

- [**Source Controller**](/disciplines/truth-management/source-controller): version control platforms (e.g., GitHub) that store and evolve your truth repository.
- [**Voice Transcriber**](/disciplines/truth-management/voice-transcriber): speech-to-text tools that lower the friction between thinking and documenting.

### Argument

- [**Why It Matters**](/disciplines/truth-management/why-it-matters): the three claims that build to the thesis.

---

## Further Reading

- [Disciplines](/disciplines): the other craft pillars.
- [Anointed Repository](https://truthmanagement.wiki/concepts/anointed-repository): the governance act of declaring a specific Git repository as the canonical source of truth for an operation. The piece of discipline the implementer asks the principal to commit to.
- [Truth Portal](https://truthmanagement.wiki/concepts/truth-portal): the readable interface layered over an anointed repository, shaped for each audience (client, board, ops) without giving them write access to the substrate. The pattern the implementer ships when the principal needs to expose truth to non-engineering audiences.
