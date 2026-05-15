---
title: "Instruction Files"
slug: /concepts/instruction-files
description: "The new unit of programming. Plain markdown files that configure how an AI agent operates within a specific context. CLAUDE.md, AGENTS.md, skill files, memory files."
---

# Instruction Files (aka Skill Files)

*The new unit of programming is not a function. It is a markdown file that tells an agent how to behave.*

---

## What They Are

An instruction file is a plain text document that configures how an AI agent operates within a specific context. It is not code. It is not a prompt. It is a persistent set of directives that the agent reads at the start of every session and follows throughout.

If you have used any modern AI coding harness, you have already encountered them:

- **CLAUDE.md** tells Claude Code what to know about your project, how to behave, and what conventions to follow
- **AGENTS.md** does the same across multiple agent platforms (Claude Code, Gemini, Codex, OpenCode, and others)
- **Skill files** define specific workflows the agent can execute on demand
- **Memory files** store persistent knowledge that survives across sessions

The specific file names and paths vary by harness, but the concept is universal. Every serious harness supports some form of instruction files. When choosing which harness to build on, look for one that maximizes a good balance of utility, cost, and sovereignty. Your instruction files should be portable.

These are all instruction files. Together, they form the configurable layer of the [harness](/disciplines/harness-engineering) that sits between you and the model.

## Why This Is a New Programming Paradigm

Traditional programming tells a computer exactly what to do, step by step, in a formal language with strict syntax. The computer executes the instructions literally and has no judgment about whether the result is good.

Instruction file programming tells an intelligent agent what to care about, what constraints to respect, and what patterns to follow, in natural language with flexible structure. The agent interprets the instructions using judgment, adapts them to the specific situation, and often produces better output than a rigid program would.

This is a fundamentally different relationship between human and machine:

| Traditional Code | Instruction Files |
|---|---|
| Formal syntax (Python, TypeScript) | Natural language (markdown) |
| Executed literally by a runtime | Interpreted by a language model |
| Must handle every edge case explicitly | Agent applies judgment to edge cases |
| Changes require a developer | Changes require anyone who can write clearly |
| Tested with unit tests | Tested by observing agent behavior |
| Version controlled as code | Version controlled as documentation |

The last point is important. Instruction files live in Git alongside your code. They are version-controlled, diffable, and reviewable. But they are written by anyone who understands the domain, not just people who can write code. This is one of the most significant shifts in who gets to program computers.

## The Instruction File Stack

Just as software has a stack (operating system, runtime, framework, application), instruction files have a stack. Each layer provides different scope and persistence:

### Layer 1: Global Instructions
**File:** `~/.claude/CLAUDE.md` or `~/.agents/AGENTS.md`

Your personal defaults that apply to every project. Your preferences, your communication style, your non-negotiable rules. "Never use em dashes." "Always ask before making destructive changes." "I am a senior engineer, do not over-explain."

This is the equivalent of your shell profile (`.zshrc`, `.bashrc`). It configures the environment before any project-specific context loads.

### Layer 2: Project Instructions
**File:** `CLAUDE.md` or `AGENTS.md` at the project root

Project-specific context and rules. Coding conventions, architecture decisions, deployment procedures, team norms. "This is a Next.js 16 app." "We use Neon for the database." "Run tests before committing."

This is the equivalent of a project's `package.json` or `Makefile`. It defines how work is done in this specific codebase.

### Layer 3: Directory Instructions
**File:** `CLAUDE.md` in any subdirectory

Nested context for specific parts of the project. "This directory contains API routes. Always validate input schemas." "These are test files. Use the mock database, never production."

This is the equivalent of a `.eslintrc` that overrides rules for a specific directory. Scope narrows as you go deeper.

### Layer 4: Skill Files
**File:** `.claude/skills/*.md` or `~/.claude/skills/*.md`

Executable workflows defined in markdown. Each skill has metadata (name, description, triggers) and instructions (step-by-step procedures). The agent loads the full skill only when it decides to invoke it.

This is the equivalent of a script or CLI command, but written in natural language.

### Layer 5: Memory Files
**File:** `~/.claude/projects/<slug>/memory/*.md`

Persistent knowledge that the agent has learned about you and your project. Indexed by a master file (MEMORY.md) and loaded by relevance. The agent writes these itself and reads them in future sessions.

This is the equivalent of a database that the application maintains on its own.

## How Claude Code Loads Them

The [Anatomy of a Harness](/disciplines/anatomy-of-a-harness) article describes the five-layer context assembly system in Claude Code. Instruction files map directly to this:

- **Layer 3 (User context):** CLAUDE.md files are discovered by walking the project directory tree. Every CLAUDE.md found is loaded and injected as context.
- **Layer 4 (Memory attachments):** Memory files are relevance-filtered and prefetched in parallel with model streaming.
- **Layer 5 (Skill content):** Skill metadata loads upfront. Full skill content loads only on invocation.

This lazy-loading architecture means you do not pay the token cost of every instruction file on every turn. The harness is selective. It loads what is relevant, when it is relevant.

## What Makes a Good Instruction File

After studying Claude Code's architecture and working with practitioners building agent systems, patterns emerge:

**Be specific, not comprehensive.** A CLAUDE.md that tries to cover every possible situation is too long and too vague. A CLAUDE.md that covers the three most important conventions for this project is short, clear, and followed consistently.

**Use imperative voice.** "Always run tests before committing" works. "It would be nice if tests were run before commits" does not. The agent follows instructions more reliably when they are stated as directives.

**State constraints, not just goals.** "Build a REST API" is a goal. "Build a REST API. Never expose internal IDs in responses. Always validate request bodies against Zod schemas. Return 404 for missing resources, never 500" is a goal with constraints. The constraints matter more than the goal, because the agent can figure out what to build but cannot intuit what you consider unacceptable.

**Separate the human-written from the agent-written.** Your CLAUDE.md is yours. Memory files are the agent's. Skill files can be co-authored. Keeping these boundaries clear prevents the agent from overwriting your intent with its own patterns.

**Update when behavior drifts.** If you keep correcting the agent on the same issue, the fix is not a better prompt. The fix is a new line in your instruction file. "Do not add docstrings to functions I did not modify." Once it is in the file, you never correct it again.

## Instruction Files as the Spec

This connects directly to [Spec Writing](/disciplines/spec-writing). Every instruction file is a specification that the model follows literally. The quality chain holds:

**Instruction quality -> Agent behavior quality -> Output quality.**

A vague CLAUDE.md produces vague behavior. A precise CLAUDE.md produces precise behavior. Same model. Same harness. The only variable is the quality of the instructions you wrote.

This is why instruction file writing is emerging as a core practitioner skill. It is the act of telling an intelligent system how to operate: programming-adjacent, but not programming in the traditional sense. The people who do this well get dramatically better results than the people who do not. And unlike traditional programming, the barrier to entry is literacy, not computer science.

## For Practitioners

When you set up an agent workspace for a client, the instruction files are the foundation. The user profile is an instruction file (it tells the agent who it is working for). The skill files are instruction files (they tell the agent how to execute workflows). The CLAUDE.md is an instruction file (it tells the agent how to behave in this workspace).

**Your job is to write these well.** Not the client's job. Most clients have never written instructions for a machine that interprets them with judgment. They will write vague aspirations ("be helpful") or rigid scripts ("always do X then Y then Z"). Neither works well. The practitioner's skill is translating the client's actual intent into instructions that an agent can follow with appropriate judgment.

This is [context engineering](/disciplines/context-engineering) at its most practical: curating the exact information state that makes the agent useful for this specific person, in this specific context, with these specific constraints.

## Further Reading

- [Harness Engineering](/disciplines/harness-engineering): Instruction files are the user-configurable layer of the harness
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): How Claude Code discovers, loads, and follows instruction files
- [Spec Writing](/disciplines/spec-writing): The quality chain that applies to every instruction file
- [Context Engineering](/disciplines/context-engineering): The discipline of curating the right information state
- [Fat Skills](/concepts/fat-skills): What it looks like when an instruction file is dense with encoded judgment
- [Skill File First, App Second](/concepts/skill-file-first-app-second): The product ordering this paradigm enables
