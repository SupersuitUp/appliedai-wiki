---
title: "Plugins"
slug: /concepts/plugins
description: "The packaging and distribution layer for agent extensions: a per-vendor bundle of skills, commands, subagents, hooks, and MCP servers, installed from a marketplace. The plugin is the box; MCP is the cargo."
image: "/img/comics/plugins.png"
---

# Plugins

*The packaging and distribution layer for agent extensions. A plugin is a per-vendor bundle of skills, commands, subagents, hooks, and MCP servers, installed and versioned from a marketplace. The plugin is the box; MCP is the cargo.*

![Three-panel cream-paper action comic. Title bar: THE PLUGIN IS THE BOX. MCP IS THE CARGO. Panel 1: Midas, the navy-armored hyperagent, packs labeled modules (SKILLS, COMMANDS, HOOKS, SUBAGENTS, and a glowing cyan-and-gold MCP server-gear) into a wooden crate stamped PLUGIN; caption, Midas packs his whole toolkit into one crate. Panel 2: he slides the closed PLUGIN crate onto a dock rail where it clicks into place, stamped HYPERCONTEXT LOADED; caption, One install ships the whole domain. Panel 3: the same glowing MCP cargo fits into three distinct crates labeled CLAUDE, CODEX, and CURSOR, stamped READY; caption, Swap the box, the MCP cargo runs anywhere. Footer bar: PACKAGE THE BOX. KEEP THE CARGO PORTABLE.](/img/comics/plugins.png)

---

## What a plugin bundles

A plugin is not a new kind of capability. It is a container. One installable, versioned unit that can carry [skill files](/concepts/skill-files), slash commands, subagents, hooks, and [MCP](https://modelcontextprotocol.io) servers together.

In Claude Code the format is a git repo with a `marketplace.json` (the directory) and a `plugin.json` per plugin. You install with `/plugin marketplace add <owner/repo>`, then `/plugin install <name>@<marketplace>`, enable or disable the whole bundle in one command, and version it by commit or semver. Nothing inside a plugin is new. What is new is that a whole domain of capability travels as one thing.

## A packaging peer to rules, skills, and memory

[Agent rule files](/concepts/agent-rule-files), [skill files](/concepts/skill-files), and [memory files](/concepts/memory-files) are three kinds of content: rules, procedures, facts. A plugin sits in a different category. It is packaging. It does not tell the agent how to behave. It collects the files that do and makes them installable, shareable, and toggleable as a set.

The test: ask of any file, "does this change what the agent knows or does?" For a rule file, a skill, or a memory file the answer is yes. For a plugin the answer is no. It changes how a bundle of those files is distributed.

## The box and the cargo

Two layers are easy to conflate, and keeping them apart is the whole insight.

- The **interoperable capability layer** is [MCP](https://modelcontextprotocol.io), the open tool-and-server protocol. Build a server against MCP once and it runs across Claude, ChatGPT and Codex, Gemini, Cursor, and Windsurf. Anthropic introduced MCP in November 2024, OpenAI adopted it in 2025 and Google committed the same year, and in December 2025 Anthropic donated it to the Agentic AI Foundation under the Linux Foundation. Alongside it, [AGENTS.md](https://agents.md) is the portable instruction file the same tools honor.
- The **packaging and distribution layer** is the plugin: a per-vendor wrapper, a manifest plus a marketplace, that increasingly bundles MCP servers together with skills, commands, and hooks.

Said plainly: **the plugin is the box; MCP is the cargo.** A server you build against MCP outlives whatever plugin format happens to ship it this year. So package for convenience, but keep your durable capability in MCP and your durable rules in AGENTS.md. This is [learn the harness, not the wrapper](/perspectives/learn-the-harness-not-the-wrapper) applied to distribution.

## Is this a Claude-only idea? No, as of 2026

This landscape moves fast. The two-layer shape is stable; the product specifics are dated to mid-2026 and worth re-checking against primary docs before you rely on them.

- **Claude Code** has the most mature developer-facing, git-native plugin-and-marketplace format: manifests, local or GitHub-hosted marketplaces, versioning, and bundling of skills, commands, subagents, hooks, and MCP servers.
- **OpenAI** retired its original 2023 ChatGPT plugins (wound down in early 2024), moved to custom GPTs, then to the Apps SDK, which is built directly on MCP. It has since revived the word: as of 2026 there is a unified plugins directory spanning ChatGPT and Codex, where a plugin can carry skills, an MCP-backed app, and templates. "OpenAI abandoned plugins" is the wrong story. They retired one plugin product and rebuilt the concept on MCP.
- **Codex**, OpenAI's coding agent, extends through a `config.toml`, custom prompts, AGENTS.md, and MCP servers, plus that shared plugins directory. It has no separate plugin file format of its own.
- **Cursor, Gemini CLI, and Windsurf** lean on MCP plus a rules or instructions file, converging on AGENTS.md. The words "plugin" and "extension" appear, but loosely, not as one formal marketplace-distributed bundle.

The pattern underneath all of it: the interoperable unit is MCP, the instruction unit is AGENTS.md, and "plugin" is the per-vendor box that packages them for install.

## What it buys an operator

For a single builder on one machine, a plugin's day-to-day gain over loose files is modest. The model still finds a capability by its description, bundled or not. The value shows up at three moments:

- **Distribution.** A toolkit ships as one install to a new machine, a teammate, or a client, instead of being hand-recreated file by file.
- **On and off as a set.** Disable a whole domain when you are not using it, to cut menu and context clutter, and bring it back in one command.
- **More than skills.** A domain that needs a custom hook or a bundled MCP server carries them along, not as separate setup.

Package by domain. Keep the portable cargo (MCP servers, AGENTS.md) portable, and let the plugin be the crate. The moment you need to move a toolkit, share it, or toggle it, the crate earns its keep. Until then, its main gift is that you learned the mechanism before you needed it. One domain shape deserves its own page: a goal-directed, time-bounded effort packaged as a [campaign plugin](/concepts/campaign-plugins), where the bundle's skills are the campaign's atomic actions and versioned files carry its state.

## Further Reading

- [Skill Files](/concepts/skill-files)
- [Agent Rule Files](/concepts/agent-rule-files)
- [Hyperlocal Skills](/concepts/hyperlocal-skills)
- [Learn the Harness, Not the Wrapper](/perspectives/learn-the-harness-not-the-wrapper)
- [Harness Engineering](/disciplines/harness-engineering)
