---
title: "Agent Rule Files"
slug: /concepts/agent-rule-files
description: "Standing orders the agent reads at the start of every session. CLAUDE.md and AGENTS.md. Imperative, persistent, always-on. The version-controlled spine of how an agent behaves inside your workspace."
---

# Agent Rule Files

*Standing orders the agent reads at the start of every session. CLAUDE.md and AGENTS.md. Imperative, persistent, always-on. The version-controlled spine of how an agent behaves inside your workspace.*

---

## What they are

An agent rule file is a plain markdown document that defines the standing instructions an AI agent reads on session start. It is not a prompt. It is not a workflow. It is the always-loaded baseline the agent walks in already knowing.

The canonical examples:

- **[AGENTS.md](https://supersuit.wiki/concepts/agents-md)** is the open standard, stewarded under the Linux Foundation, honored by Codex, Cursor, OpenCode, Hermes, and a growing list of harnesses.
- **[CLAUDE.md](https://supersuit.wiki/concepts/claude-md)** is Anthropic's parallel filename for Claude Code, which does not honor the open standard natively. The best practice is to keep `CLAUDE.md` as a one-line pointer to `AGENTS.md` so the same rules apply across every harness.

Both files are read on every session before the model produces a single token. They are the agent equivalent of `README.md`. The human reader does not need them. The agent does.

## A different ontological category than skill files or memory files

Three categories of file shape an agent. They are peers, not parent and child:

- **Agent rule files** are *rules*: standing orders, always loaded, imperative. "Never use em dashes." "Always run tests before committing." "Push after every successful commit."
- **[Skill files](/concepts/skill-files)** are *procedures*: on-demand workflows the agent invokes when triggered. Episodic, parametric, called.
- **[Memory files](/concepts/memory-files)** are *facts*: harness-managed notes the agent writes to itself across sessions. Opaque, agent-curated, off by default in this framework.

Older framings (including some still floating around as "instruction files") collapsed all three into one umbrella. They do not behave the same way. They do not load the same way. They do not fail the same way. Keep them separate.

## Why they matter

Every prompt the agent assembles loads the agent rule file stack first. That stack is the [orientation budget](https://supersuit.wiki/concepts/orientation-budget): the upfront context cost paid once so every downstream session walks in already oriented.

Skip the file, and every session re-pays the orientation budget in confused exploration. Pay it once, well, and the agent never has to be told the same thing twice.

This is why agent rule files are the highest-leverage file in the workspace. A 200-line `AGENTS.md` that captures the conventions, the voice, the people, the where-things-live map is the difference between an agent that contributes from minute one and an agent that needs re-onboarding every day.

## The nested cascade

Both AGENTS.md and CLAUDE.md are hierarchical. The harness reads the **nearest file in the directory tree** plus its ancestors, with the closer file taking precedence.

A real session typically loads a stack:

- **Computer-wide**: `~/.claude/CLAUDE.md` or `~/AGENTS.md`, holding cross-project preferences. Voice rules. Standard tooling. Identity-level facts.
- **Workspace-wide**: the agent rule file at your [Personal Agentic OS](https://supersuit.wiki/paos/what-it-is) root, holding canonical workspace conventions and pointers to everything else.
- **Folder-level**: a nested file inside any subfolder with its own domain rules. A consulting folder ships its own. A specific client's project ships its own.

Three or four agent rule files can land on the same prompt. OpenAI's own monorepo ships 88 of them. Each layer orients the harness to a finer-grained slice of the work.

## What makes a good one

After studying how harnesses actually load these files and watching real practitioners build agentic systems, patterns emerge:

**Be specific, not comprehensive.** A rule file that tries to cover every possible situation is too long and too vague. A rule file that covers the three most important conventions for this project is short, clear, and followed consistently.

**Use imperative voice.** "Always run tests before committing" works. "It would be nice if tests were run before commits" does not. The agent follows directives more reliably when they are stated as directives.

**State constraints, not just goals.** "Build a REST API" is a goal. "Build a REST API. Never expose internal IDs in responses. Always validate request bodies against Zod schemas. Return 404 for missing resources, never 500" is a goal with constraints. The constraints matter more than the goal, because the agent can figure out what to build but cannot intuit what you consider unacceptable.

**Compound, do not refresh.** Every time you catch the agent doing something off-pattern, write the correction into the file. The file gets richer over time and the agent gets sharper every week without any model change. This is the [compounding docs](/concepts/compounding-docs) discipline applied to the most load-bearing file in the workspace.

**Update when behavior drifts, not when prompts get long.** If you keep correcting the agent on the same issue, the fix is a new line in the rule file. Once it is in the file, you never correct it again. If the agent makes a mistake inside a [skill file](/concepts/skill-files), the fix lives in the skill, not in the rule file.

## Rule files as the spec

This connects directly to [Spec Writing](/disciplines/spec-writing). An agent rule file is a specification the model follows literally. The quality chain holds:

**Rule quality → agent behavior quality → output quality.**

A vague `AGENTS.md` produces vague behavior. A precise `AGENTS.md` produces precise behavior. Same model. Same harness. The only variable is the quality of the rules you wrote.

This is why writing agent rule files is emerging as a core practitioner skill. It is the act of telling an intelligent system how to operate. Programming-adjacent, but not programming in the traditional sense. The people who do it well get dramatically better results than the people who do not. And unlike traditional programming, the barrier to entry is literacy, not computer science.

## For practitioners

When you set up an agent workspace for a client, the rule file is the foundation. The user profile is referenced from it. The skill files are referenced from it. The voice spec is referenced from it. The map of where everything lives is in it.

Your job is to write these well. Not the client's job. Most clients have never written rules for a machine that interprets them with judgment. They will write vague aspirations ("be helpful") or rigid scripts ("always do X then Y then Z"). Neither works well. The practitioner's craft is translating the client's actual intent into rules that the agent can follow with the right amount of judgment.

This is [context engineering](/disciplines/context-engineering) at its most practical: curating the exact information state that makes the agent useful for this specific person, in this specific context, with these specific constraints.

---

## Further Reading

- [AGENTS.md](https://supersuit.wiki/concepts/agents-md): the open standard and its nested cascade in full treatment.
- [CLAUDE.md](https://supersuit.wiki/concepts/claude-md): the pointer-pattern best practice that keeps `AGENTS.md` as the single source of truth across every harness.
- [Skill Files](/concepts/skill-files): the sibling concept. On-demand workflows the rule file points at.
- [Memory Files](/concepts/memory-files): the third sibling. Harness-managed notes the agent writes to itself, and why this framework defaults them off.
- [Harness Engineering](/disciplines/harness-engineering): rule files are the user-configurable layer of the harness.
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): how Claude Code's harness actually discovers and assembles the nested rule-file stack.
- [Spec Writing](/disciplines/spec-writing): the quality chain that applies to every rule file.
- [Compounding Docs](/concepts/compounding-docs): the practice that keeps rule files getting richer over time.
- [Fat Skills](/concepts/fat-skills): what a rule file looks like when it is dense with encoded judgment.
- [Context Engineering](/disciplines/context-engineering): the discipline of curating the right information state.
