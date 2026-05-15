---
title: "Make Your Company Refactorable"
slug: /disciplines/truth-management/make-your-company-refactorable
description: "Can you grep and make edits to your entire company OS with an agent call? If not, why?"
---

# Make Your Company Refactorable

*Can you grep and make edits to your entire company "OS" with an agent call? If not, why?*

---

The test: *Pick any operational change (renaming a concept, updating a policy, restructuring a workflow). Can an AI agent implement it across your entire institution's documentation in a single session?*

If the answer is no, you have built abstractions that cost more than they save.

## Why this matters

The cost of abstraction has never been higher. Traditional tools (CMS platforms, no-code builders, siloed databases) introduce layers that AI agents cannot navigate. Every abstraction between your intent and your documentation is friction that compounds with scale.

This principle is the file-level expression of clearing institutional debt. Locked information architectures are the substrate-level debt every refactor eventually has to repay before AI can be applied with leverage.

When Lee Robinson migrated cursor.com from a CMS to raw code and Markdown, he estimated weeks but finished in three days with $260 in tokens. The same tasks that required navigating admin panels, plugins, and database tables became single prompts.

## The refactorability principle

Your institutional truth should be:

### Grep-able

- Plain text formats (Markdown, not proprietary databases).
- Flat file structures over nested abstractions.
- Content lives in code, not behind APIs.

### Git-first

- All changes flow through version control.
- No hidden state in CMS databases or admin panels.
- Publishing is a commit, not a button click.

### Agent-accessible

- An AI can read, understand, and modify any document.
- No authentication walls between agent and content.
- Standard formats every model understands.

## Implementation guidelines

### Audit your current stack

- Where does institutional knowledge live? (Notion, Confluence, Google Docs, SharePoint)
- How many clicks to edit? How many systems to update for one change?
- Can an AI agent access and modify it programmatically?

### Migrate to refactorable formats

See [Migrate to Refactorable Systems](/disciplines/truth-management/migrate-to-refactorable-systems) for the full process.

### Design for agent collaboration

- Structure files so agents can make targeted edits.
- Use consistent naming conventions across all documentation.
- Keep related content co-located rather than spread across systems.

## The trade-off

Some abstractions exist for good reasons (permissions, workflows, non-technical editors). The question is not "eliminate all tools" but "can agents still work with the output?"

A Markdown file exported from Notion is refactorable. A policy locked in a proprietary database is not.

## The North Star

An institutional operating system where any strategic change (terminology updates, process revisions, policy shifts) can be implemented across all documentation by an agent in a single session. Not because agents are doing your thinking, but because your thinking is stored in formats they can act on.

---

## Further Reading

- [Refactor Your Information Architecture](/disciplines/truth-management/refactor-your-information-architecture): the process this principle gets operationalized through.
- [Migrate to Refactorable Systems](/disciplines/truth-management/migrate-to-refactorable-systems): the migration playbook for moving to refactorable formats.
- [Make Every File Count](/disciplines/truth-management/make-every-file-count): the per-file discipline that keeps refactorability sustainable.
