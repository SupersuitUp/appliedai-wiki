---
title: "Integration Recipe"
slug: /concepts/integration-recipe
description: "A self-contained folder that wires your agent up to take one specific action with one specific service. Markdown narrative plus a drop-in SKILL.md plus scripts."
---

# Integration Recipe

*A self-contained folder that wires your agent up to take one specific action with one specific service. Markdown narrative plus a drop-in SKILL.md plus any helper scripts. One folder, one action, runnable.*

---

## What An Integration Recipe Is

An integration recipe is a unit of "wire your agent up to do X." Where `X` is something concrete: create a Google Doc, send a Slack message, append a row to a spreadsheet, post to Notion, create a calendar event.

It is a folder, not a tutorial. The folder contains:

- **`INTEGRATE.md`**: the narrative recipe. Setup steps, prerequisites, gotchas, alternatives, a "Last Verified" date.
- **`SKILL.md`**: the drop-in skill file your agent reads to know what trigger phrases activate this capability and what flags to pass.
- **`scripts/`** (when needed): auth helpers, API wrappers, anything the recipe ships as code.
- **`package.json`** (when scripts ship): the manifest for the JS/Node code.

Drop the folder into your skill directory, run the setup commands, and your agent can now do that one thing in the world.

## Why The Recipe Format

Most "how to integrate X with AI" content lives as a blog post or a README. Two problems with that shape:

1. **Not runnable.** A blog post tells you what to do. A recipe folder is the thing you do. You install it.
2. **Goes stale invisibly.** A blog post from 2024 looks the same as a blog post from yesterday. A recipe carries a "Last Verified" date and a steward, so you know whether to trust it before you start.

The recipe shape solves both. It is self-contained, dated, and forkable. It travels.

## One Recipe, One Action

The discipline: one recipe wires up one specific action. The folder name describes the action in verb-action shape, kebab-case, matching the SKILL.md `name:` field exactly.

Examples:

- `create-or-update-google-doc/`
- `send-slack-message/`
- `create-google-calendar-event/`
- `append-row-to-google-sheet/`
- `compose-and-send-email/`

A single service like Google often gets several recipes (Docs, Sheets, Calendar, Gmail), each its own folder. A recipe named after the service alone (`google-docs/`) is a smell: the moment you want a second action with the same service, the name no longer fits.

## What's Inside `INTEGRATE.md`

The narrative recipe is opinionated about what an operator needs to ship. Required sections:

1. **What This Gives You**: the capabilities your agent gains.
2. **Why This Recipe**: the chosen path and the tradeoff vs alternatives.
3. **Prerequisites**: accounts, runtimes, CLIs you must have first.
4. **Setup**: numbered, concrete shell commands.
5. **Usage From Your Agent**: what trigger phrases work.
6. **Common Gotchas**: real failure modes with concrete fixes.
7. **Last Verified**: date, OS, runtime, CLI versions tested with.
8. **Alternatives**: at least one other path so the reader can pick what fits them.
9. **Maintainer**: who stewards this recipe.

Skip the marketing copy. The recipe is for an operator who already knows they want to do the thing; it is not a sales pitch for the service.

## How It Differs From Adjacent Formats

| Format | Audience | Purpose |
|--------|----------|---------|
| **Integration recipe** (this concept) | Personal agent operator | Wire up a specific action with a specific service |
| SKILL.md (alone) | Your agent | Tell the agent how to perform a capability |
| [INTEGRATE.md](/reference/standards/integrate-md) (open spec) | A coding agent integrating a library into a target codebase | Teach the agent how to wire that library into an unknown project |
| Blog post / tutorial | Humans reading | Explain a concept; not runnable |
| README | Anyone landing on the repo | Orient them; not the install path |

The closest neighbor is `SKILL.md`. The recipe differs because it bundles the SKILL.md with the surrounding setup and scripts: a recipe is a SKILL.md plus everything you need to make the SKILL.md work end to end on a fresh machine.

## Where Recipes Live

A recipe can live anywhere markdown lives, but the discipline is to publish recipes you trust into a public bank so other practitioners can fork them. The reference implementation: [SupersuitUp/curated-personal-agentic-os-integrations](https://github.com/SupersuitUp/curated-personal-agentic-os-integrations), an MIT-licensed bank with one folder per recipe.

Practitioners then either:

- **Fork the whole bank** for ongoing updates, or
- **Copy a single recipe folder** into their personal skill directory (e.g. `~/.claude/skills/`) for a one-shot install.

The bank pattern matches forkable-by-default open-source: the recipes get more useful as more people fork them and contribute back, while the underlying mechanism (folder of files) stays trivially understandable.

## When To Reach For A Recipe

- You want your agent to take a specific action in a specific service and a one-shot copy-paste is no longer fast enough.
- You publish artifacts at enough volume that automating the publish step earns its keep.
- You want a teammate's agent to do the same thing yours does, and you need to hand them a runnable artifact rather than a writeup.

## When NOT To Reach For A Recipe

- You are doing the thing once. Manual is fine.
- The action is narrow enough that a fresh SKILL.md without surrounding setup covers it.
- You are still figuring out what you want; ad-hoc shell commands are cheaper to iterate on than a packaged recipe.

## The Implementer's Move

When you find yourself doing the same wiring twice, write the recipe. When you find an existing recipe in a public bank that fits, fork it instead of writing your own. When you ship one, date it, name a maintainer, and list at least one alternative path. That is the contract. That is what makes recipes compound across the network instead of getting stale on individual machines.

---

## Further Reading

- [INTEGRATE.md spec](/reference/standards/integrate-md): The adjacent open standard for library authors teaching agents to wire their library into a target codebase. Different audience and shape; worth reading once to keep them straight.
