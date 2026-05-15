---
title: "Getting Started"
slug: /disciplines/truth-management/getting-started
description: "The sequenced plan for standing up truth management from zero. Day 1 to Week 4."
---

# Getting Started with Truth Management

*The sequenced plan for standing up truth management from zero. Designed to get you from "I have no documented operational truth" to "my agents and teammates operate from a live, coherent repository" over the course of about a month.*

---

If you are looking for the philosophical case first, read [Why It Matters](/disciplines/truth-management/why-it-matters). If you are already sold, start here.

## Before you begin

You need three things on hand:

1. **A writing surface.** A terminal, an editor, and a Git client. If you do not code, a GitHub web editor plus an AI chat interface is enough to start.
2. **An AI agent with file access.** Claude Code, Cursor, or equivalent. Something that can read and write markdown files in your repository.
3. **30 minutes a day.** Truth management is not a weekend project. It is a daily practice that compounds.

## Day 1: Pick your source controller

Before writing a single word of documented truth, choose where it will live.

Default recommendation: a GitHub repository. See [Source Controller](/disciplines/truth-management/source-controller) for why source control is the foundation.

- **Individuals.** Create a private repo named something like `my-truth` or `<yourname>-os`.
- **Institutions.** Create a private repo under your org, e.g. `<company>-truth`. If sensitivity matters, plan for multiple repos per [Protect Your Truth](/disciplines/truth-management/protect-your-truth).

The commit is the contract. Every future change to your truth goes through this repo.

## Day 2 to Day 7: Start your company handbook

Follow the process in [Start Your Company Handbook](/disciplines/truth-management/start-your-company-handbook) to capture what already lives in your head (or in the heads of your team).

Minimum viable first week:

- A `README.md` that serves as the truth index.
- A `principles/` folder with 3 to 5 core principles written down.
- A `people/` folder with a profile for yourself (for individuals) or your 5 most important collaborators (for institutions).
- A `decisions/` folder capturing the last 3 meaningful decisions you made and why.

Use [Voice Transcriber](/disciplines/truth-management/voice-transcriber) to accelerate capture. Speak the content, let an agent process the transcript into markdown.

## Week 2: Migrate from siloed tools

You almost certainly have operational truth scattered across Notion, Google Docs, Slack, or a CMS. Follow [Migrate to Refactorable Systems](/disciplines/truth-management/migrate-to-refactorable-systems) to pull it into your repo.

Prioritize in this order:

1. Documents you reference weekly.
2. Onboarding and training materials.
3. Strategic decisions and their reasoning.
4. Everything else (only if it still matters).

Prune as you migrate. Per [Make Every File Count](/disciplines/truth-management/make-every-file-count), every file has to justify its existence. Migration is the cheapest time to delete.

## Week 3: Wire up truth as context

Your repository exists. Now teach your agents to use it.

Follow [Truth as Context](/disciplines/truth-management/truth-as-context):

- Make sure your README is a complete truth index.
- Set up your agent to load the README at the start of every session.
- Establish the pre-creation context check: before writing any new doc, the agent reads related existing docs.
- Establish the post-creation coherence audit: after writing, check for contradictions and add cross-links.

If you have an agent harness, this is where you wire your truth repo into its context layer.

## Week 4: Set up maintenance

The repository will decay without active maintenance. Follow [Maintain Coherence](/disciplines/truth-management/maintain-coherence) to install the practice:

- Write a coherence check skill (freshness, consistency, cross-references, structure).
- Schedule it weekly via a cron job.
- Review the report each Monday and act on flagged items.

## Ongoing: Build the muscle

After Week 4, truth management becomes a daily practice rather than a project:

- **Every meaningful decision** gets a commit explaining the reasoning.
- **Every new person in your orbit** gets a profile.
- **Every strategic shift** triggers updates to the affected docs, not a new parallel doc.
- **Every contradiction an agent surfaces** gets resolved in a commit.

## Institutional rollout

If you are rolling this out for an institution beyond yourself, two additional prerequisites:

- **Empower a truth manager.** See [Empower Your Truth Manager](/disciplines/truth-management/empower-your-truth-manager). Without real authority, the repository becomes bureaucratic theater.
- **Align partners and hires on the practice.** See [Align Before Committing](/disciplines/truth-management/align-before-committing). Truth management only works if everyone accepts explicit documentation as the norm.

## If you get stuck

- **"I do not know what to write down first."** Start with your last meeting. Have the agent process the transcript into a decision log and a people update. You now have a first commit.
- **"My agent does not have the context I want it to."** You have not wired up [Truth as Context](/disciplines/truth-management/truth-as-context) yet. The agent can only use what you route into its context window.
- **"The repo keeps going stale."** You skipped Week 4. Install the [coherence check](/disciplines/truth-management/maintain-coherence).
- **"My team will not adopt this."** You skipped the institutional prerequisites. The truth manager needs executive authority that goes beyond a calendar invite.

## The North Star

One month in, your agents and teammates should be able to make decisions from shared, written premises rather than from whoever happens to remember the relevant conversation. That is the whole game. Everything else in this section is refinement on top of that foundation.

---

## Further Reading

- [Why It Matters](/disciplines/truth-management/why-it-matters): the argument for why any of this is worth doing.
- [Truth Management (overview)](/disciplines/truth-management): the full framework overview.
- [Start Your Company Handbook](/disciplines/truth-management/start-your-company-handbook): the primary process this plan runs.
- [Maintain Coherence](/disciplines/truth-management/maintain-coherence): the ongoing discipline that keeps the repo alive.
