---
title: "Maintain Coherence"
slug: /disciplines/truth-management/maintain-coherence
description: "Documents decay by default. Coherence is an active practice: automated checks, cross-linking, and scheduled audits."
---

# Maintain Coherence

*Your truth repository is a living system. Like any living system, it decays by default. Coherence is an ongoing practice. If you are not actively maintaining it, you are actively losing it.*

---

Documents go stale. Cross-references break. Terminology drifts. Two files contradict each other because one was updated and the other was not. A decision made in March is still listed as "pending" in July.

---

## Why documents decay

Every document in your truth repository was accurate when it was written. The moment you write it, the clock starts ticking. The world changes. Your strategy evolves. People join and leave. Projects finish or pivot. A document that was the truth six months ago may now be confidently wrong.

The danger is not that the document exists. The danger is that an AI agent (or a new team member) reads it and treats it as current. Stale truth is worse than no truth, because it produces confident, well-reasoned actions based on outdated premises. Your agent will execute brilliantly on information that is no longer real.

This is the coherence problem: your truth repository must reflect your **current operational reality**, not a historical snapshot. Every file that an agent reads as context needs to be alive.

---

## What coherence looks like

A coherent truth repository has three properties:

**1. Internal consistency.** No two documents contradict each other. If your strategy doc says the priority is X and your status doc says the priority is Y, one of them is wrong. An agent reading both will make unpredictable decisions.

**2. Temporal freshness.** Every document reflects the current state. Dates are accurate. Statuses are current. People who left are not listed as active. Projects that finished are archived, not lingering in active directories.

**3. Structural connectedness.** Documents link to each other where the connections are real. A person's profile links to the transcripts they appear in. A strategy doc links to the case studies that informed it. A concept page links to the playbook that implements it. Cross-links create a web of context that agents can traverse to build understanding.

---

## The coherence skill pattern

Coherence checks should not depend on you remembering to do them. They should be automated. The pattern:

### 1. Write a coherence check skill

A skill file that your agent can run on a schedule. The skill audits your truth repository for drift:

- **Freshness checks.** When was each file last updated? Flag anything older than 30 days as potentially stale. Flag anything older than 90 days as almost certainly stale.
- **Consistency checks.** Do names, titles, statuses, and priorities match across files? If a person's role changed, does every file that mentions them reflect the change?
- **Cross-reference checks.** Do links between documents still resolve? Are there orphaned pages that nothing links to? Are there pages that should link to each other but do not?
- **Structural checks.** Does the directory structure match the index? Are there files that exist on disk but are not registered in any navigation or index?

### 2. Schedule it

Run the coherence check on a recurring schedule. Weekly is a good default for active repositories. Monthly works for repositories that change slowly. The check should produce a report: what is stale, what contradicts, what is disconnected.

With any agent harness, this is a cron job. The agent runs the check, produces the report, and either fixes what it can or flags what needs human judgment.

### 3. Act on the report

A coherence report that nobody reads is worse than no report (it creates the illusion of maintenance). Two approaches:

**Auto-fix where safe.** If the check finds a date that needs updating, a link that needs adding, or a status that clearly changed, the agent can fix it directly. These are mechanical corrections that do not require judgment.

**Flag for human review.** If the check finds a contradiction between two documents, a strategic priority that may have shifted, or a section that might need rewriting, flag it. A human decides.

---

## Cross-linking as coherence infrastructure

A wiki or truth repository with no internal links is a collection of isolated files. An agent reading one document has no way to discover related context unless you explicitly point it there.

Cross-links serve three purposes:

**For agents.** Links are navigation. When an agent reads a strategy document and finds a link to a case study, it can follow that link to get deeper context. The richer the link graph, the better the agent can build understanding without you manually loading every relevant file.

**For humans.** Links are discovery. When a new team member reads a concept page and finds links to the playbook that implements it, they learn faster. The wiki teaches itself.

**For coherence.** Links are contracts. When Document A links to Document B, any change to Document B that breaks the relationship is a coherence violation that a check can detect. Cross-links make your truth repository auditable.

### Practical guidelines

- Every concept page should link to at least 2 to 3 related pages.
- Every person profile should link to transcripts and projects they are involved in.
- Every strategy document should link to the case studies or data that informed it.
- When you create a new page, add links TO it from existing related pages (bidirectional linking).
- Periodically audit for orphan pages (pages with zero inbound links).

---

## The meta-coherence template

Every truth repository (personal wiki, company docs, community knowledge base) needs its own coherence check. The pattern is the same. Here is a template you can adapt:

```
Coherence Check: [Repository Name]

1. FRESHNESS
   - List all files with "last updated" or "last verified" dates
   - Flag anything > 30 days as REVIEW
   - Flag anything > 90 days as STALE

2. CONSISTENCY
   - Cross-check names, roles, statuses across all files
   - Verify that index/README matches what exists on disk
   - Check that terminology is used consistently

3. CROSS-REFERENCES
   - Verify all internal links resolve
   - Identify orphan pages (zero inbound links)
   - Identify highly-linked pages that may need extra attention when updated

4. STRUCTURAL
   - Does the sidebar/navigation match the files on disk?
   - Are there files not registered in any index?
   - Are there empty or stub files that should be completed or removed?

5. REPORT
   - Auto-fix: [list mechanical corrections made]
   - Human review: [list items requiring judgment]
   - Next check: [date]
```

Adapt this template for your specific repository. Add domain-specific checks (e.g., for a CRM-style repo, check that interaction dates are current; for a project repo, check that milestones reflect reality). The template is a starting point, not a ceiling.

---

## The compounding effect

Coherence compounds. Every coherence check that fixes a stale reference or adds a missing cross-link makes the next agent interaction slightly better. Over months, the difference between a maintained repository and an unmaintained one is enormous.

An unmaintained repository after 6 months: half the files are stale, cross-references are broken, new content contradicts old content, and agents produce increasingly unreliable output because their context is polluted.

A maintained repository after 6 months: every file reflects current reality, the link graph is rich and navigable, terminology is consistent, and agents produce high-quality output because they are working from clean truth.

The cost of maintenance is low (a weekly check that takes 15 minutes of agent time). The cost of not maintaining is high (a gradual, invisible degradation of everything your system produces).

> **Coherence is what makes documentation useful at all. Without it, the file is decorative.**

---

## Further Reading

- [Make Every File Count](/disciplines/truth-management/make-every-file-count): the pruning discipline that keeps repositories lean.
- [Truth as Context](/disciplines/truth-management/truth-as-context): how agents use your truth repository as context for decisions.
- [Empower Your Truth Manager](/disciplines/truth-management/empower-your-truth-manager): the authority needed to enforce coherence at the institutional level.
- [Refactor Your Information Architecture](/disciplines/truth-management/refactor-your-information-architecture): the sibling audit. Coherence catches broken links and stale dates; IA refactoring catches drifted folder labels, oversized sections, and content that has outgrown its current home.
