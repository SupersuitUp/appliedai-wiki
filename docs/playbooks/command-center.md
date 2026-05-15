---
title: Command Center
slug: /playbooks/command-center
description: How a single repo evolves into the operating brain of a knowledge worker or small team. The pattern, the folders, and what each one is for.
---

# Command Center

*How a single repo evolves into the operating brain of a knowledge worker or small team. The pattern, the folders, and what each one is for.*

---

A command center is one repo that holds the strategic and operational substrate of an operator's work. It starts narrow (a single project) and expands deliberately as the surface area grows. This playbook describes the expansion pattern, the design principles behind it, and the failure modes to avoid.

## When to Expand

The trigger is when the repo's current shape can no longer hold the work without stretching its existing folders past their meaning. Common triggers:

- New client or pro-bono engagements that need their own context, history, and artifacts.
- Events the operator is running or speaking at that need planning surface.
- Strategy work that has outgrown a single doc and needs a dedicated home.
- Fundraising, hiring, or other cross-cutting workstreams that touch every other folder.

If the repo started as "the book" or "the course" or "the consulting practice," and you find yourself stuffing unrelated work into corners of those folders, it is time to expand.

## The Expansion Pattern

The pattern is additive, not destructive. Existing folders that work do not move. New folders are added at the top level only when the work is happening now or imminently.

### New Top-Level Folders to Consider

| Folder | Purpose |
|--------|---------|
| `engagements/` | Client and pro-bono work. Each person or project gets a subfolder. |
| `events/` | Event planning and execution. Each event gets a subfolder. |
| `strategy/` | High-level cross-product business strategy. Not project-specific. |
| `fundraising/` | Pitch materials and investor tracking (under strategy/ if light, standalone if heavy). |

### Populating `strategy/`

A useful strategy folder typically holds:

| File | Purpose |
|------|---------|
| `vision.md` | What this operation is, the core principles, the open questions. |
| `sequencing.md` | The domino strategy. What happens when. Active dominos tracked. |
| `brain-trust.md` | Key people, criteria for inclusion, network strategy. |
| `fundraising/` | Pitch materials and investor tracking if relevant. |

### What Should NOT Change

The folders that already work get left alone. If the original repo was a book project with `book/`, `docs/`, and `community/`, those folders keep their shape. The expansion adds; it does not refactor. Refactoring proven structure is a tax on yourself.

## Design Principles

1. **Lean expansion.** Only add folders for things that are happening now or imminently. Speculative folders rot.
2. **Do not move what works.** Existing structure that is producing output stays put.
3. **Each engagement is a case study.** Every person or project worked with feeds back into shared knowledge. The engagement folder is not a silo, it is a source.
4. **Strategy is the brain, engagements are the hands.** Strategy says what to do. Engagements are doing it. Both folders need to coexist.

## Relationship to Personal Operating Repos

A command center sits between two layers:

- **The operator's personal repo** (private context, daily notes, personal relationship management) is upstream. It holds the human running the operation.
- **The command center** holds the operation itself, including everything that crosses multiple projects.
- **Project-specific repos** (a client codebase, a product) live downstream.

Cross-references between these layers are fine, but the command center should be readable on its own. If understanding it requires opening the operator's private repo, the boundary has been violated.

## Failure Modes

- **Speculative folders.** Adding `partnerships/` before a single partnership exists. The folder sits empty, signals chaos, and confuses future agents reading the repo.
- **Refactoring out of boredom.** Renaming working folders because they feel inelegant. The cost is paid in broken links and lost muscle memory.
- **Conflating personal and operational.** The command center is for the work, not for the operator's daily journal. Keep those separate.
- **Letting strategy lag execution.** If `engagements/` is bursting and `strategy/` is empty, the operation is running on instinct alone. Strategy is the part that compounds.

## Further Reading

- [Knowledge Repo Design](/playbooks/knowledge-repo-design) for the "forager not chef" principle behind a healthy knowledge layer
- [Teammate Discipline](/foundations/teammate-discipline) for how implementers operate inside a command center they do not own
- [Signal Theory](/foundations/signal-theory) for the discipline that every document in the command center should pass
