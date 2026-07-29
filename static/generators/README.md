# Hosted generators

This folder hosts canonical **GENERATE recipes** as plain `GENERATE.md` files. A generator is a one-time scaffold an agent runs (following the [GENERATE.md spec](https://appliedai.wiki/reference/standards/generate-md)) to stand up a wiki, a sub-type of wiki, or any other repeatable build. Anything here is copied verbatim into the build and served at the site root:

```
static/generators/<slug>/GENERATE.md   ->   https://<this-wiki>/generators/<slug>/GENERATE.md
```

## Why host a generator

Same reason as a hosted skill: one editable source of truth that any agent on any machine can fetch and run, without a copy living inside every playbook. The playbook page stays the readable doctrine (the why, the when, the decision logic); the generator is the fetchable machine. Map vs machine.

A playbook that owns a generator links to it and tells the agent to fetch and follow it, instead of embedding a long copy-paste code block.

## How agents reach it

`middleware.ts` excludes `/generators/` from the bot-block, so these files are fetchable by any agent (including blocked-UA crawlers) while the rest of the wiki stays sealed. Do not remove that exclusion.

## Format

A hosted generator is a normal `GENERATE.md`: YAML frontmatter (`name`, `description`, `generates`) then the run instructions. Same shape whether copied into a harness or fetched from here.
