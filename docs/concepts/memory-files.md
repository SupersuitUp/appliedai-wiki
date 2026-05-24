---
title: "Memory Files"
slug: /concepts/memory-files
description: "Harness-managed notes the agent writes to itself between sessions. Opaque, agent-curated, vendor-specific. A worse-engineered version of what AGENTS.md already does. Off by default in this framework."
---

# Memory Files

*Harness-managed notes the agent writes to itself between sessions. Opaque, agent-curated, vendor-specific. A worse-engineered version of what AGENTS.md already does. Off by default in this framework.*

---

## What they are

Most modern AI coding harnesses now ship some form of "memory" feature. The harness watches your session, decides what is worth remembering, writes it to a file or a cloud store, and injects it back into the prompt on future sessions. The pitch is irresistible: an agent that learns about you so you do not have to keep re-explaining yourself.

The technical shape varies by vendor:

- **[Claude Code](https://supersuit.wiki/concepts/claude-md) Auto Memory** (v2.1.59+, **on by default**) writes to `~/.claude/projects/<project>/memory/MEMORY.md` plus topic files. The first 200 lines are injected on every session. Toggle via `/memory`, the `autoMemoryEnabled: false` config flag, or `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`. Docs: [code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory).
- **Hermes Agent** (Nous Research, **on by default**) writes `~/.hermes/memories/MEMORY.md` (2,200 char cap) and `~/.hermes/memories/USER.md` (1,375 char cap), with the agent autonomously consolidating when caps are hit. The full file is injected as a frozen snapshot into the system prompt at session start. Headlines memory as the product's signature feature. Docs: [hermes-agent.nousresearch.com/docs/user-guide/features/memory](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory).
- **Cursor Memories** stores entries on **Cursor's cloud servers**, not on your machine. Auto-extracts preferences from chat, surfaces them in Settings → Rules → "Generated Memories." Not in any file you can grep, not in version control, not portable to another harness. Discussion: [forum.cursor.com](https://forum.cursor.com/t/about-cursors-memory-record-feature/107355).
- **OpenAI Codex CLI Memories** (**off by default**) writes to `~/.codex/memories/` after a two-phase background extraction and consolidation pipeline with secret redaction. Enable via `memories = true` under `[features]` in `config.toml`. Docs: [developers.openai.com/codex/memories](https://developers.openai.com/codex/memories).
- **OpenCode** and **Aider** ship no native auto-memory. Both rely entirely on user-written, version-controlled instruction files (`AGENTS.md` and `CONVENTIONS.md` respectively).

Two of the six implement nothing. Three of the four that implement something turn it on by default.

## The same job AGENTS.md already does, with worse properties

Both an agent rule file and a memory file inject standing context into every session. They are doing the **same job**.

Compare the properties:

|  | [Agent Rule File](/concepts/agent-rule-files) | Memory File |
|---|---|---|
| Author | Human (you) | Agent (autonomous) |
| Format | Plain markdown | Vendor markdown, JSON, blob, or cloud row |
| Location | In your repo | Outside git, in `~/.claude/`, `~/.hermes/`, `~/.codex/`, or vendor cloud |
| Version controlled | Yes | No |
| Diffable | Yes | Usually no |
| Auditable in PR | Yes | No |
| Portable across harnesses | Yes (`AGENTS.md` standard) | Mostly no |
| Loaded on every session | Yes | Usually yes |
| Owner of what gets loaded | You | The harness |

The agent rule file is the explicit, versioned, human-written, portable version of the same primitive. The memory file is the opaque, agent-written, vendor-locked version of the same primitive.

Both end up in the same place: the prompt the model sees at session start. The question is who put it there and whether you can audit what changed.

## The failure mode: skill maintenance gets skipped

This is the load-bearing point.

When a [skill](/concepts/skill-files) misbehaves (the agent skips a step, formats the output wrong, misroutes a file), the right reflex is to **update the skill file**. The skill is the persistent, versioned thing. Fixing it once means every future invocation runs correctly.

What auto-memory does instead: write a note to the memory file. "The user wants the output formatted as X." "The user prefers Y." The skill stays broken. The memory entry papers over the bug. On the next invocation, the agent loads the memory note, applies the correction in-flight, and the skill produces the right output despite being wrong.

This is the discipline-skipping bug. Auto-memory automates an anti-pattern: it lets the system pretend it learned without actually fixing the upstream cause. The persistent file that needed to change did not change. The memory note silently grows. Six months later, the workspace has a memory file full of corrections for skills that nobody ever fixed.

The same logic applies up the stack:

- Personal preferences end up in memory instead of `AGENTS.md`, where they would be visible.
- Workflow corrections end up in memory instead of the skill, where they would compound.
- Facts about a person end up in memory instead of their [PRM](https://supersuit.wiki/concepts/prm) file, where they would be the canonical record.

Every case has a better persistent home. The memory file is what catches the work that should have gone to the right home and did not.

## Where state actually belongs

If you are running a deliberate context system, every category of thing the harness might want to "remember" has an upstream file home:

- **Cross-project preferences and identity rules** → computer-wide [`AGENTS.md`](https://supersuit.wiki/concepts/agents-md). Voice rules, banned phrases, default tooling.
- **Project-specific conventions** → workspace-root [`AGENTS.md`](https://supersuit.wiki/concepts/agents-md). Architecture, deployment, file map.
- **Workflows the agent runs** → [skill files](/concepts/skill-files). The procedure, the trigger, the steps.
- **Facts about people** → PRM relationship files. Phone numbers, preferences, context.
- **Project state and status** → `STATUS.md` or a strategic-document artifact.
- **Cross-cutting truths and definitions** → wiki concept pages.

If you cannot articulate why a "thing to remember" does not belong in one of these files, it belongs in one of these files.

## The Codex paradox

The harness that built the most disciplined auto-memory pipeline of any vendor ships it **off by default**, and its own docs explicitly say:

> Keep required team guidance in AGENTS.md or checked-in documentation. Treat memories as a helpful local recall layer, not as the only source for rules that must always apply.

Source: [OpenAI Codex CLI Memories documentation](https://developers.openai.com/codex/memories).

This is the cleanest articulation of the framework's position from inside a vendor. Codex spent the engineering effort to build secret-redacting extraction and global-locked consolidation, and then wrote in their own documentation that you should still keep your real rules in `AGENTS.md`.

The vendors that turn memory on by default (Claude Code, Hermes, Cursor) are betting on convenience. The vendor that turns it off by default is telling you the deliberate path is the better one.

## Default posture inside this framework: off

For practitioners running a [Personal Agentic OS](https://supersuit.wiki/paos/what-it-is), turn auto-memory off. The deliberate context system already covers everything memory tries to do.

Concrete settings:

- **Claude Code**: set `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` in your shell profile, or set `autoMemoryEnabled: false` in settings, or use `/memory` to disable. Auto Memory is on by default since v2.1.59.
- **Hermes Agent**: edit `~/.hermes/config.yaml` and disable the memory subsystem before your first real session.
- **Cursor**: enable Ghost mode (strict privacy), or disable the Generated Memories rule in Settings → Rules. Note that disabling does not retroactively delete anything already in Cursor's cloud.
- **Codex**: leave the default. Memory is off unless you opt in.
- **OpenCode, Aider**: no action needed. Neither ships auto-memory.

## The honest concession

There may be a narrow legitimate case. Genuinely cross-project ephemera the harness alone needs that does not merit a file: path-quoting habits, shell preferences, a recurring command flag. The class of thing your AGENTS.md would not be richer for containing.

The test: if you can articulate why a memory entry does not belong in `AGENTS.md`, keep it in memory. If you cannot, promote it to `AGENTS.md` and delete the memory entry.

In practice, the test fails most of the time. Most things the harness wants to remember are exactly the things `AGENTS.md` exists for.

## Hermes specifically

Hermes makes the boldest auto-memory pitch of any harness. The technical design is sharp: 2,200-character cap on `MEMORY.md` and 1,375 on `USER.md` force the agent to actively curate rather than accumulate, and the frozen-snapshot read pattern optimizes for prefix-cache hits.

The framework objection is not that the engineering is bad. It is that the architecture takes ownership of standing context away from the human and gives it to the agent. The MEMORY.md the Hermes agent writes is not the `AGENTS.md` you wrote. Two parallel standing-context layers, one of which you do not author. The simpler shape is to keep `AGENTS.md` as the single source of truth and not run a second parallel context layer at all.

If you are running Hermes, the honest practice is to treat its memory subsystem as off-by-default and promote anything the agent wants to remember into your `AGENTS.md` or a skill file by hand. The convenience the feature optimizes for is the same convenience that erodes the discipline of the deliberate system.

---

> Memory is a temporary capture buffer, not the resting place. Anything the agent wants to remember belongs in a file you wrote.

---

## Further Reading

- [Agent Rule Files](/concepts/agent-rule-files): the sibling concept. The explicit, versioned, human-written version of what memory files attempt to do automatically.
- [Skill Files](/concepts/skill-files): the second sibling. The discipline of fixing the skill file instead of letting a memory entry paper over the bug.
- [AGENTS.md](https://supersuit.wiki/concepts/agents-md): the open standard. The right home for cross-project rules and preferences.
- [Compounding Docs](/foundations/compounding-docs): the practice that makes deliberate context systems sharper over time. The opposite of auto-memory's polluting accumulation.
- [Context Engineering](/disciplines/context-engineering): the discipline this concept defends.
- [Harness Engineering](/disciplines/harness-engineering): the broader layer memory features live in.
