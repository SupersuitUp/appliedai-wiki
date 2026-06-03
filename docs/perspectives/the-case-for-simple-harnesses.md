---
title: "The Case for Simple Harnesses"
slug: /perspectives/the-case-for-simple-harnesses
description: "A small core. Extensible edges. Your context under your control. The harness architecture that keeps winning as the field matures."
---

# The Case for Simple Harnesses

*A small core. Extensible edges. Your context under your control. The harness architecture that keeps winning as the field matures.*

---

## The Evidence Nobody Expected

In late 2025 a benchmark called [Terminal-Bench](https://www.tbench.ai/) started measuring how well coding agents do real terminal work. The result that surprised people: a deliberately minimal harness called **Terminus 2** (the benchmark team's own reference agent, which gives the model a tmux session and literally nothing else, no file tools, no sub-agents, no hand-crafted workflows) keeps holding its own against far more elaborate systems.

As of the [current Terminal-Bench leaderboard](https://www.tbench.ai/leaderboard/terminal-bench/2.0), Terminus 2 with Claude Opus 4.5 and Terminus 2 with Gemini 3 Pro are scoring at or near the top, often beating the same labs' own native harnesses. The minimal wrapper is competitive with the fancy ones.

That result is not a fluke. It is a signal about where the field is heading.

**Frontier models have been reinforcement-trained on how to be coding agents.** They already know what a terminal is, what a file is, how to edit code, how to read errors, how to recover from mistakes. Pile thousands of tokens of scaffolding on top of them and you are not teaching them anything new. You are crowding out the user's actual context with your own opinions.

The less the harness does, the more room the model has to do what it was trained to do.

---

## Your Context Is Not Your Context

[Mario Zechner](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) built a minimal harness called Pi after using Claude Code for most of 2025 and running into a specific wall. He named it plainly:

> *"My context wasn't my context. Claude Code is the thing that controls my context. And behind my back, Claude Code does things to the context."*

The specifics he flagged are worth knowing, because they are the predictable failure mode of any harness that tries to be helpful on your behalf:

- **System prompts churn between releases.** Tools get silently added, removed, or modified between versions. Your workflows start depending on invisible defaults that change under you.
- **"System reminders" get injected at inopportune moments.** The harness decides to tell the model *"here is some information that may or may not be relevant to what you are doing"* (that exact phrasing, which, no surprise, actively confuses the model).
- **Context budget is consumed by the harness itself.** Users on Claude Code have reported that re-injected rules can [consume roughly 46% of their context window](https://github.com/anthropics/claude-code/issues/32057) across a normal session. Separately, [TaskCreate and TaskUpdate reminders get re-injected every few tool calls](https://github.com/anthropics/claude-code/issues/45986) even when the work does not warrant tracking. And [file contents get auto-injected](https://github.com/anthropics/claude-code/issues/4464) multiple times per session. Every token the harness spends on its own reminders is a token your actual work does not get.
- **System reminders can bypass user confirmation.** [Issue #43870](https://github.com/anthropics/claude-code/issues/43870): a system reminder injected between turns can cause the model to read a "go ahead" signal that the user never sent.
- **Observability is thin to zero.** You cannot easily see what is in your context at any given moment. You are flying blind inside your own session.

None of this is malicious. It is the cost of a harness team trying to be clever on your behalf. The cleverness lands on top of your workflow whether you wanted it there or not.

A simple harness does not have this problem because it has little to be clever about. What you send is what the model sees. What you read is what you get.

---

## The OSS Trap: Defaults Are Contracts

Open source harnesses that try to serve every use case run into a different version of the same problem. When a single default install has to accommodate every user, the defaults drift toward "smart" behaviors that nobody asked for.

Mario's example (from his read of [OpenCode](https://opencode.ai/)'s source): every time the model calls the edit tool, the harness goes to the connected LSP server, checks for errors, and injects those errors back into the edit tool's result. It sounds helpful. It is not. Humans do not code by writing one line, checking errors, writing the next line, checking errors. They finish a batch of work and then check. Injecting errors mid-edit confuses the model the same way it would confuse a person. A well-meaning default actively degrades the experience.

You can list analogues everywhere:

- A "helpful" tool-output pruner that silently truncates after some threshold and lobotomizes the model's recall.
- Permissive CORS headers on a local server so any website in your browser can hit it.
- A storage layer that writes every individual message to its own JSON file, because the simplest thing is the fastest thing to ship and nobody pushed back.
- A "skills" or "rules" feature that re-injects the same text on every tool call "for safety."

Each one of these is defensible in isolation. Stacked together as defaults, they become a pile of assumptions that only the project maintainers can fully see.

**The lesson is not that these projects are bad.** The Claude Code, OpenCode, and Anthropic Cowork teams are brilliant, high-velocity, and shipping real value. The lesson is that **defaults are contracts**, and a single kitchen-sink default cannot honor a contract with every user at once. The heavier the default, the heavier the hidden opinions you inherit.

Simple harnesses flip this. The default is minimal. Everything else lives as opt-in extensions you load, write, or compose.

---

## The Desktop-App Evidence

Theo Browne's [roast of the new Claude Code desktop app](https://www.youtube.com/watch?v=WkHdkwDQJ5o) is the consumer-facing mirror of the same problem. The product teams inside a lab trying to bake every use case (chat, co-work, code, routines, preview browsers, multi-tab splits, remote control, plugin stores, workree management, iMessage connectors) into one app ends up with an experience where, in his words, signing in is two fewer clicks and doing anything is fifteen more.

Pick any one of these failure modes from the review:

- Hotkeys that fire against whichever window you were *not* focused on.
- Paste-an-image attaching to the wrong message because of an SDK misuse.
- A "customize sidebar" button that contains one toggle.
- A settings button rendered *inline in a project row* that turns out to apply to all projects.
- Bypass-permissions-always that forgets itself after a restart.
- Git worktrees on by default, stored inside your repo, with no instruction to .gitignore them.

Each one is a small regression. Any of them alone would be fine. All of them together is what kitchen-sink defaults look like at scale. The project was not shipped carelessly. It was shipped trying to do everything, by a team whose own velocity made it impossible to hold the whole surface area in one coherent mental model.

A simple harness avoids this by refusing most of the surface area. You ship the four tools that matter (read, edit, write, bash), document how to extend them, and let the community carry the rest.

---

## What Simple Actually Means

Simple is not "stripped." Simple is "small core + sharp edges + clear extension points." Concretely:

- **A minimal core set of tools.** Read. Edit. Write. Bash. That is enough for a frontier model to do almost any coding task. Everything else (sub-agents, plan mode, MCP servers, LSP integration, compaction strategies) is an opt-in extension.
- **The context belongs to you.** No magic injection. No system reminders the user cannot see. What is in the context is what you put there. If the harness wants to help, it does so via tools the model can call, not via hidden content it sprays into the prompt.
- **Self-modifying by default.** The harness ships with its own documentation and code examples. The agent can read those and write extensions *for itself* inside a running session. Hot reload, no forks, no PRs.
- **Distribution through existing infrastructure.** Extensions live on npm or GitHub. No bespoke marketplace silo. Use the tooling the rest of the software world already uses.
- **YOLO by default, with enough rope.** Every user's security posture is different. A pop-up that asks "do you approve running bash?" every ten seconds is not a security model. It is friction theater. Give the user enough hooks to wire the exact guardrails their situation requires.
- **Legible internals.** You should be able to see the system prompt. The full tool definitions. Every event the harness emits. Every byte in the context. Opacity is the anti-pattern.

This is the pattern Terminus 2 expresses in the benchmark setting. It is the pattern [Pi](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) expresses in a general-purpose setting. And it is the same pattern that makes a plain terminal plus [Claude Code](/reference/tools/claude-code), [Hermes](/reference/tools/hermes), or [Codex](/reference/tools/codex) more powerful in expert hands than a kitchen-sink IDE wrapper in novice hands.

---

## The Sovereignty Angle

Simple harnesses are sovereign harnesses.

When your harness is small and legible, you can reason about it end to end. When your context is uncontrolled by the vendor, your workflows are portable. When extensions are real code you own, the moat is your skill and your library, not the vendor's lock-in.

This is [progressive sovereignty](https://supersuit.wiki/concepts/progressive-sovereignty) applied to the tool layer. And it is the direct antidote to [the lock-in that is coming](https://appliedai.wiki/perspectives/the-lock-in-is-coming) across every major platform. The more "helpful" the vendor's default, the more of your workflow you are quietly handing them. Simple harnesses invert the default: the vendor provides the core, you provide the intelligence around it, and your work is portable across every model provider in the market.

Here, the posture is pragmatic. We recommend proprietary harnesses (Claude Code in particular) as the on-ramp because they work today. We also teach the primitives underneath, we keep everything in plain markdown files on your disk, and we treat the harness layer itself as something you should be able to swap. That is how you use the best tool available today without being trapped by it tomorrow.

---

## What to Do

If you are a practitioner building your [Personal Agentic OS](/paos/what-it-is):

- Know what is in your context at any given moment. If you cannot answer that question, you do not actually own your harness.
- Resist adding complexity to your setup before it has earned its way in. Every tool, every skill file, every MCP server is a new thing that can go subtly wrong.
- Own your files. The markdown files on your disk are the part that survives any harness switch. Build value there, not inside any one vendor's product.

If you are evaluating harnesses:

- Favor ones that expose their system prompt and tool definitions. If you cannot read what the harness is injecting, assume it is injecting more than you would like.
- Favor ones with real extension APIs over ones with hook systems that spawn new processes per event.
- Check the context budget under realistic use. How much of your 200k is consumed by the harness itself before you type anything?

If you are building a harness:

- Ship the smallest core you can defend. Let the community build everything else.
- Make defaults reversible and visible. The OSS trap is defaulting to clever behavior that most users never asked for.
- Document your internals so the model can modify itself. The best extensions are the ones users generate in-session and share back.

The industry is going to sort itself out over the next few years. Some products will keep stacking features into ever-heavier defaults. Others will stay small, sharp, and get out of the user's way. Our bet is on the second pattern, because it is the one that compounds sovereignty for the practitioners who use it.

---

## Further Reading

### External sources

- [What I learned building an opinionated and minimal coding agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) (Mario Zechner, Pi): The primary source for the "your context is not your context" frame.
- [Terminal-Bench leaderboard](https://www.tbench.ai/leaderboard/terminal-bench/2.0): Minimal harnesses competitive with complex ones across model families.
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) (Anthropic): The incumbent's perspective on harness design.
- [Harness Engineering](https://martinfowler.com/articles/harness-engineering.html) (Martin Fowler): The broader discipline framing.
- [Skill Issue: Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents) (HumanLayer).
- [The new Claude Code desktop app review](https://www.youtube.com/watch?v=WkHdkwDQJ5o) (Theo Browne): What happens when a single product tries to be everything.

### Further reading

- [Harness Engineering](https://appliedai.wiki/disciplines/harness-engineering): The discipline this concept sits inside.
- [Anatomy of a Harness](https://appliedai.wiki/disciplines/anatomy-of-a-harness): The components every harness shares.
- [Learn the Harness, Not the Wrapper](/perspectives/learn-the-harness-not-the-wrapper): Why we teach primitives over opinionated desktop layers.
- [Progressive Sovereignty](https://supersuit.wiki/concepts/progressive-sovereignty): Simple harnesses are the tool-layer expression of this principle.
- [The Lock-in Is Coming](https://appliedai.wiki/perspectives/the-lock-in-is-coming): The countervailing pressure simple harnesses resist.
- [Liberation Architecture](https://supersuit.wiki/concepts/liberation-architecture): The design philosophy minimal harnesses embody.
- [The Spec Is the Product](https://appliedai.wiki/disciplines/spec-writing): When the spec is the product, the harness should get out of the way.
