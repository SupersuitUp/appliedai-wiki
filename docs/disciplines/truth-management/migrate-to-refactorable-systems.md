---
title: "Migrate to Refactorable Systems"
slug: /disciplines/truth-management/migrate-to-refactorable-systems
description: "A systematic process for moving institutional knowledge from siloed tools to grep-able, version-controlled formats that AI agents can work with directly."
---

# Migrate to Refactorable Systems

*A systematic process for moving institutional knowledge from siloed tools (CMS, Notion, Confluence, Google Docs) to grep-able, version-controlled formats that AI agents can work with directly.*

---

## The core problem

Your institutional knowledge is scattered across systems that agents cannot refactor:

- **CMS platforms** lock content behind admin panels and databases.
- **No-code builders** store structure in proprietary formats.
- **Wiki tools** fragment knowledge across countless pages with broken links.
- **Google Docs and Notion** require API authentication and format conversion.

When you need to rename a concept, update a policy, or restructure documentation, you are clicking through interfaces instead of running a single agent command.

## The migration framework

### Phase 1: Audit current state

**Inventory your knowledge locations:**

- Where does policy documentation live?
- Where are operational procedures stored?
- Where do strategic decisions get recorded?

**Assess refactorability:**

- Can an AI agent read this content programmatically?
- Can an AI agent modify this content directly?
- How many clicks or logins to make a simple text change?

### Phase 2: Design target structure

Choose a repository structure that organizes by purpose:

```
company-truth/
├── principles/          # Core operating principles
├── processes/           # Systematic workflows
├── policies/            # Official policies and guidelines
├── playbooks/           # Role-specific guidance
├── decisions/           # Recorded strategic decisions
└── README.md            # Navigation and overview
```

### Phase 3: Execute migration

**Use AI agents to accelerate:**

- Export content from existing systems.
- Process exports into Markdown format.
- Clean up formatting and fix links.
- Consolidate redundant content.

**Migrate in priority order:**

1. Most frequently referenced documents.
2. Onboarding and training materials.
3. Operational procedures.
4. Historical records and decisions.

### Phase 4: Establish new workflows

- **Git-first publishing.** All changes through pull requests.
- **Agent-assisted maintenance.** Regular audits for outdated content, bulk updates when terminology changes.
- **Cross-document consistency checks.**

## Success criteria

- All active documentation lives in version-controlled Markdown.
- Any team member can propose changes via pull request.
- AI agents can grep across all institutional knowledge.
- Terminology updates can be executed in a single session.
- No critical knowledge locked in proprietary formats.

## Common objections

**"Non-technical team members cannot use git."**
GitHub and GitLab web interfaces allow editing Markdown files directly. For heavier editing, tools like Obsidian provide familiar interfaces while saving to plain files.

**"We need permissions and workflows."**
Git supports branch protection, required reviews, and access controls. You keep governance without losing refactorability.

**"Some content needs to stay in [tool]."**
Fine. Ensure it can export to formats agents can work with. The goal is not eliminating tools; it is eliminating lock-in.

## The North Star

An institution where strategic decisions about language, structure, or policy can be implemented across all documentation by an agent in minutes, because your institutional OS is stored in formats designed for exactly this kind of transformation.

---

## Further Reading

- [Make Your Company Refactorable](/disciplines/truth-management/make-your-company-refactorable): the principle that drives this migration.
- [Source Controller](/disciplines/truth-management/source-controller): the target platform the migrated truth should land on.
- [Start Your Company Handbook](/disciplines/truth-management/start-your-company-handbook): the content scaffolding that makes migration more than a format conversion.
- [Truth as Context](/disciplines/truth-management/truth-as-context): why migrated content must stay loadable for agents to benefit.
- [Make Every File Count](/disciplines/truth-management/make-every-file-count): the pruning pass to run during (not after) migration.
