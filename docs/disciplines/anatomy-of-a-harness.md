---
title: "Anatomy of a Harness"
slug: /disciplines/anatomy-of-a-harness
description: "Ten engineering patterns from the source code of the most capable AI harness in the world, mapped to what practitioners can apply at their own scale."
---

# Anatomy of a Harness: Lessons from Claude Code's Source

*In March 2026, Claude Code's source code became publicly visible. For the first time, we could study the internals of the most capable AI harness in the world. Here is what we found, and what it teaches practitioners about building their own systems.*

---

## What Happened

In late March 2026, the full TypeScript source code for Claude Code (Anthropic's agentic coding tool) surfaced publicly via [community mirrors on GitHub](https://github.com/instructkr/claude-code). The codebase is roughly 800,000 lines in its main module alone, with over 50 directories covering tools, hooks, skills, memory, context assembly, state management, plugins, and the core agent loop.

For anyone who has read the [Harness Engineering](/disciplines/harness-engineering) article, this is an extraordinary opportunity. That article argued that the code wrapped around an AI model is just as important as the model itself, and cited the [MetaHarness](https://yoonholee.com/meta-harness/) research showing 6x performance gaps from harness variations alone. Now we can see exactly how the best harness in the world is built. Not in theory. In source code.

What follows is a deep architectural analysis of Claude Code's harness, mapped to the patterns practitioners use every day.

## The Big Picture

Claude Code is not a chatbot with file access. It is a state machine that assembles context, dispatches tools, manages permissions, tracks budgets, and recovers from failures, all wrapped around a single model call in a loop. The model (Claude) provides the intelligence. The harness provides everything else.

The architecture breaks into ten major subsystems:

1. **The Agent Loop** (the heartbeat)
2. **Context Assembly** (what the model sees)
3. **Tools** (what the model can do)
4. **Hooks** (event-driven extensibility)
5. **Skills** (data-driven commands)
6. **Memory** (persistent knowledge)
7. **Tasks** (background work)
8. **Commands** (user interface)
9. **State** (session tracking)
10. **Plugins** (extensible capabilities)

Each one teaches something different about harness engineering. Let's go through them.

## 1. The Agent Loop Is a State Machine

The most important file in the entire codebase is `query.ts`. It contains the main agent loop, and it is not recursive. It is a pure state machine.

Each iteration of the loop follows the same pattern:

1. Assemble the current state (messages, tools, context, budget)
2. Normalize messages for the API (strip internal metadata, reorder attachments, merge thinking blocks)
3. Call the model
4. Stream the response (thinking blocks, text, tool calls)
5. Execute requested tools
6. Check continue conditions (budget remaining? stop hooks triggered? end_turn?)
7. Loop or exit

The state is split cleanly into two categories: **immutable parameters** (system prompt, model config, available tools) and **mutable state** (messages, turn count, budget tracking, auto-compact state). At the start of each iteration, the mutable state is destructured. At the end, it is reconstructed. This prevents bugs from accidental cross-iteration mutation.

**Recovery is explicit, not hidden.** When the model hits its output token limit, the loop retries up to three times with an increased budget. When the context gets too long, it triggers automatic compaction (summarizing earlier conversation to free space). When a tool fails, it retries. Each recovery path is a visible branch in the state machine, not a try/catch buried somewhere.

### Why This Matters for Practitioners

If you are building any kind of agent workflow (for a client, for your own operation, for a product), the lesson is: **treat the agent loop as engineering, not magic.** The model is one function call inside a larger system. Everything around that call (what context goes in, what happens with tool results, how you handle failures, when you stop) is your responsibility to design.

The [MetaHarness paper](https://arxiv.org/abs/2603.28052) showed that changing this loop produces a 6x performance gap. Now we can see exactly what "changing the loop" means in practice: it means changing how you assemble context, which tools you offer, when you retry versus stop, and how you manage the token budget.

## 2. Context Assembly Is Layered and Lazy

Claude Code does not dump everything into the system prompt. It assembles context in layers, each with different lifecycle and caching behavior.

**Layer 1: System prompt.** The base instructions that define what the model is and how it should behave. This is static within a session. It includes the tool descriptions, behavioral guidelines, and formatting rules.

**Layer 2: System context.** Runtime state like git branch, recent commits, working directory, and platform info. This is memoized (computed once, cached, and reused). It resets between sessions but stays stable within one.

**Layer 3: User context.** CLAUDE.md files discovered from the project tree, current date, and user preferences. Also memoized. This is the layer that makes Claude Code project-aware.

**Layer 4: Memory attachments.** Relevance-filtered files from the memory directory. These are prefetched in parallel while the model is streaming its response, so by the time the model needs to call a tool, memory is already loaded. This is a performance optimization that most harnesses miss.

**Layer 5: Skill content.** Loaded on demand, only when a skill is invoked. The skill index (names and descriptions) loads upfront. The full skill content (the actual instructions) loads only when the model decides to use that skill.

### The Economics Are Deliberate

This architecture directly reflects the economics described in [Context Engineering](/disciplines/context-engineering): "load the minimum sufficient context for the task at hand." Claude Code does not load every CLAUDE.md, every memory file, and every skill on every turn. It loads the base, caches what's stable, prefetches what's likely, and lazy-loads everything else.

The 200-line, 25KB limit on the memory index is a hard constraint. If your memory index exceeds this, it gets truncated with a warning. This is not a bug. It is a design choice: the memory index must fit in context without crowding out the actual work.

**For practitioners:** Your folder structure is literally the context architecture. When the harness starts a session in your project directory, it walks the tree looking for CLAUDE.md files and loads them as context. Every CLAUDE.md you write is an instruction to the harness. Every skill file is a lazy-loaded command. Every memory file is a piece of persistent knowledge that survives across sessions. Structure these files with the same care you would structure a database schema, because they are serving the same function.

## 3. Tools Are Loosely Coupled Through Dependency Injection

Claude Code ships with over 30 tools: file I/O (Read, Write, Edit, Glob, Grep), execution (Bash), agents (Agent tool for subagents), skills (SkillTool), task management (TaskCreate, TaskUpdate), web access (WebSearch, WebFetch), and more.

Every tool follows the same interface:

- **Name and aliases** (how the model calls it)
- **Input schema** (Zod-validated, converted to JSON Schema for the API)
- **Execute function** (receives input and a `ToolUseContext`, returns a `ToolResult`)
- **Optional prompt and progress functions** (for dynamic descriptions and status updates)

The critical design choice: tools receive all their dependencies through `ToolUseContext`, a shared context object that carries the current state, permission settings, file cache, MCP clients, abort signals, and message store. Tools never import each other. They never import the main loop. They never access global state.

This is dependency injection, and it has three consequences:

1. **Tools are testable in isolation.** You can construct a mock `ToolUseContext` and test any tool without running the full agent loop.
2. **Tools are composable.** The Agent tool launches subagents that have their own tool sets and contexts. Because tools don't reach into global state, subagents cannot corrupt the parent's state.
3. **Tools are feature-gatable.** A `feature('FLAG')` check at load time determines whether a tool is registered. Unused tools are stripped by the bundler. Different users get different tool sets from the same codebase.

## 4. The Permission System Is Intent Engineering in Code

Before any tool executes, it passes through `canUseTool()`. This function checks the tool call against three rule sets:

- **Always allow rules:** Actions the user has pre-approved (e.g., "always allow Read on any file in this project")
- **Always deny rules:** Actions the user has forbidden (e.g., "never allow Bash commands with `rm -rf`")
- **Always ask rules:** Actions that require explicit approval each time

Hooks can intercept this process and auto-approve or auto-deny via structured JSON responses. This means organizations can encode their intent into hook configurations: "when an agent tries to push to main, always ask." "When an agent reads a file in the project directory, always allow." "When an agent tries to install a package, check against the approved list."

This is exactly the [Intent Engineering](/disciplines/intent-engineering) pattern: organizational values translated into decision boundaries that agents respect autonomously.

### For Practitioners Building Client Systems

When you are deploying agents for a client, the permission layer is not an afterthought. It is where you encode the client's risk tolerance, compliance requirements, and operational boundaries. "The agent can draft emails but cannot send them." "The agent can read financial data but cannot modify it." "The agent can suggest code changes but a human must approve the commit."

These are not technical constraints. They are business decisions expressed as code. And they compound: a well-configured permission layer means the client can give the agent more autonomy over time, because the boundaries are explicit and auditable.

## 5. Skills Are Specs, Not Code

This is one of the most important insights from the source code, and it directly validates [Spec Writing](/disciplines/spec-writing).

Skills in Claude Code are markdown files with YAML frontmatter. They are not TypeScript. They are not compiled. They are plain text documents that describe a workflow, and the model follows them.

A skill file contains:

- **Name and description** (for discovery and matching)
- **When to use** (triggers and relevance criteria)
- **Allowed tools** (which tools the skill can access)
- **Model override** (optionally run on a different model)
- **The actual instructions** (markdown describing the workflow step by step)

The harness discovers skills from three locations: bundled skills shipped with the CLI, project skills in `.claude/skills/`, and user skills in `~/.claude/skills/`. It loads only the metadata (name, description) upfront. The full content loads only when the model decides to invoke a skill.

Here is what this means: **the quality of your skill file directly determines the quality of the agent's output.** A vague skill file produces vague behavior. A precise skill file produces precise behavior. Same model. Same harness. Same tools. The only variable is the spec.

This is the quality chain made real: **Spec quality -> System quality -> Outcome quality.** Every skill file you write is a spec. Every CLAUDE.md is a spec. Every instruction you put in a context file is a spec. The model executes them literally.

## 6. Memory Is Declaratively Indexed

Claude Code's memory system consists of:

- **MEMORY.md:** A master index file (200-line limit, 25KB max) containing one-line pointers to individual memory files
- **Individual memory files:** Markdown files with typed frontmatter (user, feedback, project, reference)
- **An auto-discovery system** that finds and attaches relevant memories at the start of each turn

The index is always loaded. Individual files are loaded when relevant. The model can write new memories, update existing ones, and delete stale ones.

Three design choices stand out:

**Typed memories with structured frontmatter.** Each memory has a type, a name, and a description. The type tells the system when this memory is relevant. The description helps with discovery. This is not a blob of text. It is structured knowledge with metadata.

**Bounded index size.** The 200-line limit forces prioritization. You cannot store everything. You must decide what matters. This constraint is a feature: it prevents the context window from being consumed by memory overhead, leaving room for the actual work.

**Write-through pattern.** The model writes memories in a two-step process: first write the memory file, then update the index. This ensures the index stays in sync with the files. This is a deliberate trade-off: consistency of the index is more important than completeness.

## 7. Hooks Make the Harness Event-Driven

Hooks are shell commands that execute at specific points in the agent lifecycle:

- **PreToolUse:** Fires before any tool executes. Can auto-approve, auto-deny, or inject additional context.
- **PostToolUse:** Fires after a tool completes. Can analyze results and trigger follow-up actions.
- **SessionStart:** Fires when a session begins. Can inject baseline context, check prerequisites, or configure the environment.
- **SessionEnd:** Fires when a session ends. Can persist state, send notifications, or clean up.

Hooks are configured in `settings.json` and receive structured JSON input about the triggering event. They return structured JSON output that the harness interprets.

This is what makes Claude Code extensible without modifying its source code. A hook can watch what the agent does (PostToolUse), analyze patterns, and propose improvements. "I notice you keep running the same three commands after every deployment. Should I create a skill for this?" The hook does not need to modify the harness. It operates at the boundary, observing and suggesting.

This is the recursive improvement loop from the Harness Engineering article made concrete. The harness provides hooks. Hooks enable observation. Observation enables proposals. Proposals (approved by the human) improve the harness. The improved harness provides better hooks. And the cycle continues.

## 8. Message Normalization: The Boundary Between Internal and External

One of the most subtle and important patterns in the codebase is `normalizeMessagesForAPI()`. This function sits between the harness's internal message representation and what actually gets sent to the Claude API.

Internally, messages carry rich metadata: virtual messages (display-only, never sent to the API), tool use results with structured types, thinking blocks from the model's reasoning process, oversized image/PDF references that errored, and attachment ordering metadata.

Before any API call, `normalizeMessagesForAPI()` strips all of this:

- Virtual messages are removed
- Attachments are reordered to satisfy API requirements
- Failed image/PDF references are cleaned out
- Thinking blocks are merged with subsequent assistant messages
- Tool results are paired correctly with their tool calls

The model never sees the harness's internal bookkeeping. It sees a clean conversation with properly formatted messages.

For practitioners building their own agent systems: maintain this separation. Your internal state will always be richer than what the model needs to see. Do not leak implementation details into the model's context. It wastes tokens and confuses the model.

## 9. Budget Tracking Across Compaction

This is an engineering detail that reveals how much thought goes into long-running agent sessions.

Claude Code tracks multiple budgets simultaneously: token budget per turn (how much context the model can use), task budget per session (total allowed cost or tokens), and auto-compact tracking (when to trigger context compaction).

The clever part: when the context gets too long and the harness compacts earlier messages into a summary, the remaining budget information is stored in the compaction summary itself. When the loop continues after compaction, it reconstructs the budget from the summary. The budget survives compaction.

This means an agent can run for hours, processing thousands of messages, compacting multiple times, and never lose track of how much work it has done and how much it is allowed to do.

For practitioners helping clients deploy agents: build budget tracking into your systems from day one. Agents without budgets will run up costs that surprise everyone. Agents with budgets operate within predictable economics that clients can plan around.

## 10. Plugins: Declarative Capability Registration

The plugin system is the harness's extension mechanism. A plugin is a declarative metadata object:

```typescript
{
  name: string
  description: string
  version: string
  skills?: SkillDefinition[]
  hooks?: HooksConfig
  mcpServers?: MCPServerDefinition[]
  isAvailable?: () => boolean
  defaultEnabled?: boolean
}
```

Registration is separate from loading. The harness knows about all plugins upfront (what they can do, whether they are available, whether they are enabled), but only loads the actual implementation when needed. A plugin that provides five skills only loads those skill files when the model invokes them.

The core stays stable. The extensions evolve independently. New capabilities can be added without modifying existing code.

## The Ten Patterns, Summarized

From this analysis, ten engineering patterns emerge that define what makes Claude Code's harness effective:

| # | Pattern | What It Does |
|---|---|---|
| 1 | **State machine loop** | Makes recovery, budgeting, and continuation explicit rather than hidden in recursion |
| 2 | **Layered context** | Loads the minimum sufficient context at each layer, caches stable layers, lazy-loads expensive ones |
| 3 | **Dependency injection for tools** | Keeps tools decoupled, testable, and composable via shared context objects |
| 4 | **Permission boundaries** | Encodes user intent as allow/deny rules that gate every tool execution |
| 5 | **Specs as instructions** | Skills are markdown files the model follows literally; spec quality determines output quality |
| 6 | **Declarative memory index** | Bounded, typed, structured memory with explicit relevance filtering |
| 7 | **Event-driven hooks** | Extensibility without modification; observation enables self-improvement |
| 8 | **Message normalization** | Clean boundary between internal richness and external API contract |
| 9 | **Budget persistence through compaction** | Long-running sessions never lose track of cost and progress |
| 10 | **Declarative plugin registration** | Capabilities declared upfront, loaded on demand, evolved independently |

Every one of these patterns is something a practitioner can apply at a simpler scale when building client systems, personal agent setups, or enterprise agent architectures. You do not need 800,000 lines of TypeScript to use these patterns. You need the principles.

## What This Means for Applied AI Practitioners

### Your CLAUDE.md Is Layer 3

When you write a CLAUDE.md file for your project, you are writing Layer 3 of the context assembly. The harness discovers it, loads it, and injects it as user context on every turn. This is not a nice-to-have. It is architectural. The quality of your CLAUDE.md directly shapes the quality of every agent interaction in that project.

### Your Skill Files Are Specs

Every skill file you write is a spec that the model follows literally. If your skill says "ask the user for context before proceeding," the model asks. If your skill says "write the output to artifacts/," the model writes there. The spec IS the product.

### Your Folder Structure Is Your Context Architecture

The harness walks your directory tree looking for CLAUDE.md files, skill files, and memory files. Where you put things determines when and how the model discovers them. A flat folder with everything in one place forces the harness to load everything. A structured hierarchy lets it load the right context for the right task.

### Permission Design Is Intent Engineering

When you set up rules like "always allow reads, always ask before writes, never allow destructive bash commands," you are encoding intent into infrastructure. This is the work that [Intent Engineering](/disciplines/intent-engineering) describes. It just happens to be expressed as permission rules rather than organizational strategy documents.

### Budget Tracking Is Not Optional

Claude Code tracks every token and enforces hard limits. If you are building agent systems for clients, do the same. Agents without budgets will eventually produce an unpleasant surprise.

## The Recursive Insight

The deepest lesson from studying Claude Code's source is recursive: **the harness that we used to study the harness is the harness we are studying.**

The agent session where we analyzed these files was itself running through the exact architecture described above. Our CLAUDE.md files were being loaded as Layer 3 context. Our skill files were being invoked as specs. Our memory files were being prefetched and attached. The permission system was gating our tool calls. The budget tracker was metering our tokens.

This is the self-referential nature of harness engineering. You are always inside a harness. The question is whether you are aware of it, and whether you are designing it deliberately or letting it happen by default.

The [MetaHarness](https://yoonholee.com/meta-harness/) research showed that harnesses can improve themselves. Claude Code's hook system provides the mechanism. The practitioners who understand this architecture will be the ones who build the self-improving systems of the next era.

All software will be self-evolving software. We just got to see the source code of what that looks like today.

## Further Reading

- [Harness Engineering](/disciplines/harness-engineering): The conceptual foundation this article builds on
- [The Harness and the Deployment](/concepts/the-harness-and-the-deployment): every subsystem above still has to run somewhere, and that is a separate ownership decision
- [Context Engineering](/disciplines/context-engineering): The discipline behind Layer 2-5 of context assembly
- [Intent Engineering](/disciplines/intent-engineering): What the permission system is really encoding
- [Spec Writing](/disciplines/spec-writing): Why skill files as markdown specs matter
- [Fat Skills](/concepts/fat-skills): The architectural rule for where intelligence actually lives
- [Agent Rule Files](/concepts/agent-rule-files): How CLAUDE.md and AGENTS.md load into every session
- [Skill Files](/concepts/skill-files): How on-demand workflows lazy-load on invocation
- [Memory Files](/concepts/memory-files): How harness-managed notes inject standing context, and why this framework defaults the feature off
- [MetaHarness Paper](https://arxiv.org/abs/2603.28052) (Stanford, MIT, Krafton, March 2026): The research proving that harness variation produces 6x performance gaps
