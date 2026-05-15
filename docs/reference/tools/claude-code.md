---
title: "Claude Code"
slug: /reference/tools/claude-code
sidebar_position: 1
description: "Anthropic's terminal agent. Reads workspace files, runs commands, calls tools, and operates as a persistent harness across sessions."
---

# Claude Code

*Anthropic's terminal agent. Reads workspace files, runs commands, calls tools, and operates as a persistent harness across sessions.*

---

## What it is

Claude Code is Anthropic's CLI agent. It reads files in a workspace, runs shell commands, writes and edits files, and calls external tools. When invoked inside a workspace, it loads any `CLAUDE.md` instruction files in the folder and operates from that persistent instruction layer for the session. Interaction is natural language through the terminal.

For implementation work, Claude Code is one of the strongest harness options on the market. The persistent instruction format, strong instruction-following, native tool use, and large context window make it well-suited to long-running, multi-step engagements where the same context needs to compound across sessions. It is available as a CLI, a desktop app on Mac and Windows, and a web interface.

## What it costs

- **Claude Pro:** $20/month, includes Claude Code access with daily limits suitable for most individual use.
- **Claude Max:** $100/month, higher usage limits suitable for heavy production use.
- **API usage:** pay-per-token via the Anthropic API for programmatic access. Cost scales with usage volume and model tier.

There is no free tier for sustained agentic use beyond a trial period. If cost is a hard constraint, see free or open-source alternatives in the disciplines section.

## When to use it (and when not)

**Use Claude Code when:**

- You want best-in-class instruction-following for complex, multi-step workspace tasks.
- The engagement benefits from persistent instruction files (`CLAUDE.md`) that compound across sessions.
- You need a polished interactive experience with strong support, regular updates, and a real community.
- You want a desktop app option alongside the CLI.

**When not to use it:**

- If you need always-on cron-style execution out of the box (Claude Code is session-based). Use a separate scheduler.
- If you need a fully local, no-cloud-calls workflow (use an open-source local harness instead).
- If the client mandates a specific vendor for compliance reasons that exclude Anthropic.

## Setup pointer

Official documentation and download: [claude.ai/code](https://claude.ai/code).

We do not duplicate installation steps here. The tool's own docs are the source of truth.

## Further Reading

- [Prompting discipline](/disciplines/prompting): the discipline upstream of any agent harness.
- [Disciplines: Agents](/disciplines): the broader category Claude Code fits into.
