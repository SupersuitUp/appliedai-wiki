---
title: "Refactor Your Information Architecture"
slug: /disciplines/truth-management/refactor-your-information-architecture
description: "The shape of your truth repository drifts. Coherence catches broken links and stale dates; this audit catches drifted folder labels, oversized sections, and content that has outgrown its home."
---

# Refactor Your Information Architecture

*The shape of your truth repository drifts. Coherence checks catch broken links and stale dates. They do not catch a folder that has outgrown its label, a sidebar that no longer matches what is inside it, or a "playbook" that is a concept piece in disguise. That is a different audit. Run it on its own cadence.*

---

## Coherence is not refactoring

[Maintain Coherence](/disciplines/truth-management/maintain-coherence) keeps your repository internally consistent: links resolve, terminology is stable, dates are current, contradictions get reconciled. That is a continuous discipline. Most truth managers run a coherence check weekly or after every batch of edits.

What coherence does not catch is *shape drift*. Your folders might be perfectly internally consistent and still be in the wrong shape. A folder labeled "Playbooks" can fill up with concept-y essays. A folder labeled "Tools" can miss the setup tutorials that obviously belong inside it. A subfolder can grow to forty files and still not have any sub-categorization. Sidebars can drift from the underlying content because every new file gets appended to the most plausible existing list, even when the right move was to start a new sub-section.

This is the IA refactoring problem. The fix is a different audit, run on a different cadence, with a different prompt.

---

## When to run the IA refactor

The trigger signals:

- **A folder "feels muddled."** When you open the directory and cannot articulate what unifies the files in it, that is the signal. A clean folder has a one-sentence label. A drifted folder has a euphemism.
- **A new doc has nowhere natural to live.** When you write a new piece and ask yourself which folder it belongs in, and the honest answer is "none of them, but I will put it in X anyway," your IA is telling you it needs a new sub-section.
- **The sidebar shape stops matching the underlying content.** Open the sidebar. Read the labels out loud. Then open one file from each section and ask: does this file actually fit the label? Mismatches are drift.
- **A coherence check keeps flagging the same kind of issue in the same folder.** That is not a coherence problem. The folder itself is the problem.
- **A folder has more than fifteen flat files.** Almost always a sub-categorization is overdue. Two folders of seven each is healthier than one folder of fourteen.

The cadence signal:

- **Quarterly** for actively-evolving repositories (a public docs site, a wiki under daily edits).
- **Annually** for slower-moving ones (a personal wiki, an archive).
- **Defensively** before a major content push that would otherwise pile twenty more files onto an already-overloaded folder.

---

## The refactor cycle

The discipline has four phases. Each one has to land before the next one starts. Skipping is the failure mode.

### Phase 1: Inventory the scope

Pick the scope. Almost always start with a single folder, not the whole repo. Walk every file in scope. For each one, capture its title, description, first paragraph, and the count of inbound and outbound cross-references. This is your raw material.

### Phase 2: Cluster by content, not by folder

Group the files by what they are actually about, ignoring where they currently live. Look at titles, opening paragraphs, terminology, link patterns. The cluster is the *content cluster*, not the *folder cluster*. The whole point of refactoring is to discover where the two have diverged.

### Phase 3: Compare clusters to current structure

For each cluster, ask:

1. Is it cohesive in its current folder?
2. Is the folder name an honest label for it?
3. Is the folder oversized and ready for sub-categorization?
4. Are there orphan files that do not fit any cluster (often signals of an old draft or a missing parent category)?
5. Are there duplicate clusters across two folders (a sign that one of the two folders has eaten content the other should own)?

Write down the answer for each cluster. The mismatches become candidate moves.

### Phase 4: Plan, then execute, then sweep

Build a structured move plan before touching anything. Each candidate move has four columns: from, to, the reason, and the cross-reference impact. Add a fifth column for external link risk: if other repositories, slide decks, or external sites link to the file by its current canonical URL, surface the count and the affected sources. The plan is the artifact your team can sanity-check before any file moves.

When the plan is approved:

1. Move files one at a time with `git mv` so history follows.
2. Sweep cross-references in the same change. A move that breaks seventeen internal links is not a complete move.
3. Update the navigation file (sidebar, mkdocs nav, sitemap, whatever your tool uses).
4. Update affected index and landing pages (remove from the old parent's "Available X" table, add to the new parent's index).
5. Verify with a `grep` for the old paths. Empty result, or you are not done.
6. Commit and push. The commit message should call out external breakage so anyone watching can sweep their own references.

This is not optional. A refactor that ships broken inbound links is worse than no refactor.

---

## The audit prompt you can run

Below is a paste-able prompt. Drop it into your agent with no edits.

```
I want to audit the information architecture of a markdown corpus
and produce a structured move plan. I do not want any file moved
until I approve the plan.

Scope: <paste the absolute path to the folder you want audited>

Steps:

1. Detect the corpus type (Docusaurus, Obsidian, Next.js content
   site, plain markdown, MkDocs). Read any CLAUDE.md or AGENTS.md
   at the repo root for canonical IA conventions.

2. Inventory the scope: list every .md / .mdx file. For each one,
   capture title, description, first paragraph, and the count of
   inbound + outbound cross-references within the corpus.

3. Cluster the files by what they are actually about, ignoring
   the folder they currently live in. Output the clusters with
   the files in each.

4. For each cluster, evaluate against the current folder layout:
   - Is the cluster cohesive in its current folder?
   - Is the folder name an honest label for it?
   - Is the folder oversized (>15 flat files)?
   - Any orphans, duplicates, or cross-folder eating?

5. Produce a structured move plan. Each move row:
   - From → To (full paths)
   - Reason (which signal flagged it)
   - Internal cross-ref count that needs updating
   - External link risk (best-effort grep across sibling repos
     in the same workspace; surface specific URLs and counts)
   - Required follow-up (sidebar updates, new index pages)

6. Cap the plan at 20 moves. Surface additional candidates as a
   tail list so I can scope a follow-up run.

7. Show me the plan. Wait for me to approve, revise, or scope down
   before executing anything.

When I approve, execute the moves with `git mv`, sweep cross-refs
with perl in-place across all corpus files, update the sidebar /
nav file, update affected index pages, verify nothing stale remains
with grep, and commit + push in one step. The commit message must
flag external link breakage with specific URLs.
```

The output is a plan you can review with the team before any file moves. The execution is mechanical and auditable after the fact.

---

## What good IA looks like

The marker of a healthy information architecture is *honesty*. Every folder label describes what is actually inside it. Every file lives in the folder a new reader would predict. Every sidebar grouping tells the truth about the cluster underneath. New docs find their natural home without forcing. Minimalism is a side effect at best; honesty is the load-bearing property.

You will know the refactor worked when the next person who joins your team can guess where to find a doc by reading the sidebar, and they are right almost every time.

---

## Further Reading

- [Maintain Coherence](/disciplines/truth-management/maintain-coherence): the continuous discipline of keeping the repository internally consistent. Run on a different cadence than IA refactoring.
- [Make Your Company Refactorable](/disciplines/truth-management/make-your-company-refactorable): why grep-able, version-controlled formats are the precondition for being able to refactor at all.
- [Migrate to Refactorable Systems](/disciplines/truth-management/migrate-to-refactorable-systems): the one-time migration that gets you to a corpus you can refactor in the first place.
- [Make Every File Count](/disciplines/truth-management/make-every-file-count): the principle that an oversized folder usually means too many files that should not exist, beyond a few in the wrong place.
