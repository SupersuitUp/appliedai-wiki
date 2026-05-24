---
title: Self-Improving Systems
slug: /concepts/self-improving-systems
description: A system that gets better without human intervention is not science fiction. It is an engineering pattern with specific, observable principles.
---

# Self-Improving Systems

*A system that gets better without human intervention is not science fiction. It is an engineering pattern with specific, observable principles.*

---

## The Principle

A self-improving system is one where the output of the system feeds back into the system in a way that makes the next output better. This sounds abstract until you see it in practice:

- A [harness](/disciplines/harness-engineering) that tracks which tool calls succeed and which fail, then proposes changes to its own configuration to reduce failures
- A skill file that the agent rewrites after observing that humans consistently correct step 3
- A memory system that prunes stale entries and surfaces patterns from recent sessions
- A documentation system that detects when a policy file has not been updated in 60 days despite 12 related brain dumps, and drafts an updated version for review

Each of these is a feedback loop: **observe, evaluate, propose, apply (with approval), repeat.**

---

## The Five Principles

### 1. Observable State

A system cannot improve what it cannot see. The first requirement is that the system's behavior is observable: logged, tracked, and available for analysis.

Claude Code implements this through its hook system. PostToolUse hooks fire after every tool execution and receive structured data about what happened. This data can be analyzed, aggregated, and used to detect patterns. "This bash command has failed 4 times in the last hour." "The model keeps reading the same file and then not using the information." "Tool calls to the database take 3x longer than everything else."

Without observability, improvement is guesswork. With observability, improvement is engineering.

### 2. Evaluation Against Intent

Observation alone is not enough. You need a way to determine whether what you observed is good or bad. This requires a clear definition of what "better" means.

This is where [intent engineering](/disciplines/intent-engineering) becomes foundational. The objectives, rules, guardrails, and scoring that you define for your system are not just operational infrastructure. They are the evaluation criteria that make self-improvement possible.

The [MetaHarness](https://arxiv.org/abs/2603.28052) project made this explicit: each harness version was tested against a benchmark with clear success criteria. The AI analyzed results against those criteria and proposed changes. Without the benchmark, the system would have no way to know whether a change made things better or worse.

For practitioners: if you cannot articulate what "better" means for your client's system, the system cannot improve itself. Define the scoring function before you automate anything.

### 3. Bounded Experimentation

A self-improving system must be able to try things. But unconstrained experimentation is dangerous. The system needs boundaries on what it can change and how much it can change at once.

MetaHarness enforces this through version control: every harness variant is a discrete version with full history. Changes are proposed, applied, and tested. If a change makes things worse, the system reverts to the previous version. No change is irreversible.

Claude Code enforces this through the permission surface: the agent can propose improvements to skill files and memory, but destructive changes require human approval. The agent cannot delete your CLAUDE.md. It can propose additions to it.

The principle: **the system can propose any change, but applying the change always has a gate.** Today, that gate is a human. Tomorrow, it may be an automated evaluation pipeline. But the gate must exist.

### 4. Memory Across Iterations

An improvement cycle is useless if the system forgets what it learned between iterations. The system needs persistent state that carries lessons forward.

Claude Code's memory system (typed files indexed by MEMORY.md) is one implementation. MetaHarness maintained the full history of every harness version, including source code, scores, and execution traces. Automated research systems maintain literature databases and experiment logs.

The pattern is always the same: **structured, persistent, queryable memory that the system can both read from and write to.** Not a blob of text. Not a chat history. Structured knowledge with metadata that supports relevance filtering.

### 5. Human Oversight at the Right Level

The most important principle: self-improving does not mean unsupervised.

The human's role shifts from operator to architect. You are not making the improvements. You are defining what "better" means, reviewing proposals, approving changes, and occasionally overriding the system when it optimizes for the wrong thing.

This maps directly to a clean separation:

- **Objectives:** What should the system optimize for? (You define this.)
- **Rules:** What are the boundaries of acceptable changes? (You define this.)
- **Guardrails:** What must never change, regardless of what the optimization suggests? (You define this.)
- **Scoring:** How do you measure whether the system is getting better? (You define this, the system evaluates against it.)

The human designs the game. The system plays it. The system proposes rule changes. The human approves or rejects them. This is the recursive loop.

---

## Automated Research: The Frontier

The most ambitious form of self-improving systems is automated research: AI systems that conduct their own scientific investigations.

Sakana AI's "The AI Scientist" (August 2024) demonstrated the pattern: an AI system that generates research hypotheses, designs experiments, writes code to run them, analyzes results, and produces research papers. The system operated in a loop: each experiment's results informed the next hypothesis.

The key insight was not that the AI produced good research (the papers were competent but not groundbreaking). The key insight was that the system could run the full research loop autonomously, producing incrementally better results with each iteration. Given enough time and compute, the improvement trajectory is steep.

This is the bitter lesson applied to research itself. Richard Sutton's observation (that hand-designed heuristics always lose to systems that learn patterns on their own, given enough compute) now applies to the process of designing AI systems. MetaHarness showed this for harnesses. Automated research shows it for the entire scientific method.

The practitioners who understand these patterns will be the ones who build systems that do not just work, but get better at working.

---

## The Recursive Stack

Self-improving systems nest:

1. **Self-improving agents.** An agent that rewrites its own skill files based on observed behavior. (Available today with Claude Code.)
2. **Self-improving harnesses.** A harness that modifies its own configuration based on benchmark performance. (Demonstrated by MetaHarness.)
3. **Self-improving research.** AI that conducts its own investigations and publishes results. (Demonstrated by AI Scientist and others.)
4. **Self-improving enterprises.** An entire business operation that detects inefficiencies and proposes structural changes. (Emerging in practice.)

Each level builds on the one below it. You cannot have a self-improving enterprise without self-improving agents. You cannot have self-improving agents without observable state and persistent memory. The stack is cumulative.

---

## For Practitioners

If you are helping clients build AI systems, self-improvement is not a feature you add later. It is an architectural decision you make on day one.

**Build in observability from the start.** Log what the agent does. Track which actions succeed and which fail. Record how long things take. This data is the raw material for improvement. Without it, you are flying blind.

**Define "better" before you automate.** If the client cannot articulate what a better outcome looks like, the system cannot improve toward it. This is [intent engineering](/disciplines/intent-engineering) in practice: encode what success means in a way the system can evaluate against.

**Use the instruction file stack for bounded experimentation.** Let the agent propose additions to skill files and memory. Review the proposals. Approve what works, reject what does not. Over time, the agent's proposals get better because it learns from the pattern of approvals and rejections.

**Start with the smallest loop.** Do not try to build a self-improving enterprise on day one. Start with a self-improving agent: one that tracks its own failures and proposes changes to its own skill files. Once that loop is working, extend it to the team level. Then the organization level. The principles are the same at every scale. The complexity increases.

---

## Further Reading

- [Harness Engineering](/disciplines/harness-engineering): Self-improving harnesses as a building block
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): Claude Code's hook system as the observation layer for self-improvement
- [Intent Engineering](/disciplines/intent-engineering): Defining what "better" means so systems can improve toward it
- [Agent Rule Files](/concepts/agent-rule-files): The configurable layer where self-improvement happens
- [MetaHarness Paper](https://arxiv.org/abs/2603.28052) (Stanford, MIT, Krafton, March 2026): Harnesses that improve themselves
- [The AI Scientist](https://arxiv.org/abs/2408.06292) (Sakana AI, August 2024): Automated scientific research as a self-improving system
