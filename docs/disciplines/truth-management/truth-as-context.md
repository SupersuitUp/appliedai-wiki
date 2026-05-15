---
title: "Truth as Context"
slug: /disciplines/truth-management/truth-as-context
description: "Ensure AI agents have full institutional context when creating or modifying documentation."
---

# Truth as Context

*A systematic process for ensuring AI agents operate with full institutional context when creating or modifying truth documentation.*

---

## The core principle

When augmenting your institutional truth (adding new documents, updating existing ones, or refactoring across files), the AI agent should have access to all relevant existing truth. New documentation created in isolation risks contradicting, duplicating, or misaligning with established principles.

**The ideal**: Every new piece of truth is written with full awareness of all existing truth.

## The context challenge

While LLM context windows are expanding rapidly, it is often still unfeasible to include every document in every interaction. This creates a tension:

- **Too little context.** Agent produces work that contradicts or duplicates existing truth.
- **Too much context.** Token costs increase, performance degrades, or context limits are exceeded.

The solution is not to avoid the problem. It is to manage it systematically.

## Implementation framework

### 1. Use your README as the truth index

Your README.md should serve as the index of your entire truth repository, listing every document with a one-line summary. This is the minimum context an agent needs to understand what exists and navigate to relevant files.

The README should always fit in context, even when individual documents cannot.

### 2. Tiered context loading

**Always include:**

- The truth index.
- Any documents directly related to the task.
- The principle of [Make Every File Count](/disciplines/truth-management/make-every-file-count).

**Include when relevant:**

- Documents the new content will reference.
- Documents that cover adjacent topics.
- Recent additions that might overlap.

**Include on request:**

- Historical documents.
- Archived decisions.
- Rarely-referenced material.

### 3. Pre-creation context check

Before creating any new truth document, the agent should:

1. Review the truth index for potential overlaps.
2. Read any documents flagged as related.
3. Identify terminology that must be used consistently.
4. Note any principles the new document must align with.

### 4. Post-creation coherence audit

After creating or significantly modifying a document:

1. Check for contradictions with existing principles.
2. Verify terminology consistency.
3. Add appropriate cross-references.
4. Update the truth index if needed.

## Dealing with context pollution

Per [Make Every File Count](/disciplines/truth-management/make-every-file-count), if certain documents consistently pollute context without adding value:

**Diagnose the problem:**

- Is the document outdated? Update or archive it.
- Is it too verbose? Condense to essentials.
- Is it redundant? Merge with another document.
- Is it rarely relevant? Move to a lower-priority tier.

**The fix.** Ruthlessly prune, consolidate, or rewrite. Source control preserves history. Nothing is lost.

## The refactorability connection

This process directly enables [Make Your Company Refactorable](/disciplines/truth-management/make-your-company-refactorable). When all truth fits in context (or is systematically loadable), you can:

- Rename concepts across all documents in one session.
- Ensure new policies align with existing principles.
- Refactor institutional structure with full awareness of dependencies.
- Maintain coherence as your truth repository grows.

## The North Star

An institutional truth repository where any augmentation (new document, update, or refactor) happens with full awareness of existing truth. Not because every document is always loaded, but because you have built systems to ensure relevant context is always available when decisions are made.

---

## Further Reading

- [Make Every File Count](/disciplines/truth-management/make-every-file-count): the pruning discipline that keeps context clean.
- [Maintain Coherence](/disciplines/truth-management/maintain-coherence): the ongoing audits that keep loaded context trustworthy.
- [Make Your Company Refactorable](/disciplines/truth-management/make-your-company-refactorable): why refactorable truth and loadable context are the same problem.
- [Don't Assume Common Sense](/disciplines/truth-management/dont-assume-common-sense): why every principle must be explicit enough to load as context.
