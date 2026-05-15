---
title: "Computer Use"
slug: /concepts/computer-use
description: "Your agent operating your mouse and keyboard by seeing the screen. The universal fallback for every app with no API, CLI, or MCP server."
---

# Computer Use

*Your agent, operating your mouse and keyboard, by seeing the screen the way you do. The universal fallback for every app that has no API, no CLI, and no MCP server. In 2026 this capability stopped being a demo and became a working tool.*

---

## What It Is

Computer use is the capability for an AI agent to operate a computer the way a human does: by reading the screen, moving the cursor, clicking, typing, scrolling, and reading the results. The agent sees pixels, forms a plan, takes actions, sees the new state, and continues.

This is distinct from [agent-accessible products](/concepts/agent-accessible-products). Agent-accessible products expose CLIs, APIs, or MCP servers that an agent can call directly. Computer use is what your agent does when the product you need to use has none of those things. Which, in 2026, is still the vast majority of software in the world.

## Where It Is Today (April 2026)

The capability moved from research preview to practically useful in the last six months. The two production implementations:

**Claude Computer Use (Anthropic).** Originally shipped as a research preview in late 2024. The Q1 2026 rebuild brought action latency down roughly 50% via a rolling visual-context window. The Opus 4.7 release extended computer use alongside coding, long-context reasoning, and agent planning. Available on macOS and Windows to Claude Pro and Max subscribers, with permission prompts before consequential actions.

**Codex Background Computer Use (OpenAI).** Shipped April 16, 2026 as part of the "Codex for almost everything" release. Operates on macOS first (EU and UK rolling out), with 90+ plugins that combine skills, app integrations, and MCP servers in a single agent. Codex memory stores corrections and preferences and surfaces them automatically in future sessions. Currently the fastest and most practical computer-use implementation in the market.

The signal worth reading from a few weeks earlier: in February 2026, Peter Steinberger, the Austrian developer who built the open-source [OpenClaw](https://steipete.me/posts/2026/openclaw) personal-agent framework, [joined OpenAI](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/) to lead the next generation of personal agents. OpenClaw itself moved to an independent nonprofit foundation and stays open source. Two things are true at once: hyperscalers are paying for the talent that understands this space the deepest, and the open-source implementations are viable enough to be worth stewarding separately for the long run.

## Why It Fills A Critical Gap

The world of software has two populations, and one is much larger than the other.

**Agent-accessible software.** CLIs, APIs, MCP servers. Growing fast. Still a minority. Most SaaS products that ship APIs do so because a technical co-founder felt strongly about it. MCP is a 2025-forward standard. Adoption is accelerating but uneven.

**Everything else.** Internal tools at companies. Legacy enterprise software. Consumer apps that chose never to open up. Government portals. Vendor dashboards. Banking interfaces. The vast middle of the economy. Most of it is not shipping an MCP server next quarter. Much of it will never ship one.

Computer use is the answer for that second population. When your agent needs to update a vendor portal that has no API, computer use is the only answer. When a reconciliation requires touching a field that is not exposed through Shopify's API, computer use touches it. When a government form must be submitted through a specific GUI and only through that GUI, computer use submits it.

The point: "digital work I cannot delegate because the tool has no API" stops being a category. There is just digital work. Some of it your agent does fast through the API. Some of it your agent does slower-but-universally through the screen. Either way, the work gets done.

## The Pattern

You speak English into your voice-to-text. Your agent routes the request. For the agent-accessible portion of the task, it hits the CLI, the API, the MCP server. For the portion that requires operating a GUI that was never built for agents, it spins up a computer-use session. You watch (or do not watch) while the cursor moves, forms fill, buttons click, screens advance.

The output is the outcome you asked for. The vendor portal is updated. The expense report is filed. The internal tool is configured. The PDF you could not get into your workflow any other way is now inside it.

This is what *speak English to your computer and the result you want comes out* actually means. Computer use is how that sentence becomes true for all digital work, not just the portion currently covered by agent-accessible products.

## Priority Ladder

Computer use is a fallback, not a first choice. It is:

- **Slower.** Reading pixels and moving a cursor is slower than hitting an endpoint. A task that takes 50ms through an API can take 30 seconds through computer use.
- **More fragile.** A UI update breaks the script. A popup changes the flow. A loading spinner confuses the model.
- **More expensive.** Vision inference costs more than text inference. A long computer-use session costs measurably more than the equivalent API calls.

Priority ladder when your agent needs to do a digital task:

1. **CLI if the product has a good one.**
2. **API if it has a good one.**
3. **MCP server if it has one.**
4. **Computer use if it has none of the above.**

As [agent-accessible products](/concepts/agent-accessible-products) proliferate, the computer-use surface shrinks. For any tool you use a lot, the long-term win is pushing the vendor to ship agent-accessible interfaces, or switching to a competitor that already did. Computer use is the bridge while that happens, and the permanent fallback for products that never will.

## Sovereignty Implications

A computer-use agent operating on your behalf sees everything on your screen. Credentials. Customer data. Banking information. Every document you happen to have open.

Two guardrails that are load-bearing:

1. **Know what you are approving.** Both Claude and Codex default to asking permission for consequential actions. Do not train yourself to click yes without reading.
2. **Prefer local when you can.** As open-source computer-use matures, the path to running a capable agent entirely on your machine opens up. OpenClaw and successors are worth tracking as the alternative to indefinite hyperscaler dependency.

Computer use is an unusually powerful tool that is also an unusually powerful surveillance surface if it is pointed the wrong direction. Stay on the correct side of that ledger.

## What It Means For Your Agent

Once your agent has computer use wired in, the question of *"can I automate this?"* stops depending on whether the vendor shipped an API. The new question is: *"is this digital work I understand well enough to describe to my agent?"* If yes, it can be delegated.

The follow-on effect: for any work that is purely digital, the set of "tasks I cannot delegate because the tool is not agent-accessible" collapses to near-zero. Strategy stays with you. Execution moves to the agent. Computer use is the piece that makes that true across every corner of your digital workflow, including the corners the API economy will never reach.

---

> **The question stopped being whether computer use can do the work. In 2026 the answer to that question is yes. The question now is whether you have articulated the work well enough for your agent to run it.**

---

## Further Reading

- [Agent-Accessible Products](/concepts/agent-accessible-products): The first-choice alternative. Why CLIs, APIs, and MCP servers are preferable when available, and why the products with them will outcompete the ones without.
- [Harness Engineering](/disciplines/harness-engineering): What wraps the model. Computer use is a harness capability, not a model capability.

## Sources

- [Anthropic Release Notes, April 2026](https://releasebot.io/updates/anthropic/claude)
- [Claude Code Q1 2026 Update Roundup](https://www.mindstudio.ai/blog/claude-code-q1-2026-update-roundup-2)
- [OpenAI: Codex for (almost) everything](https://openai.com/index/codex-for-almost-everything/)
- [Codex Desktop Major Update, April 2026](https://smartscope.blog/en/generative-ai/chatgpt/codex-desktop-major-update-april-2026/)
- [Codex changelog](https://developers.openai.com/codex/changelog)
- [OpenClaw creator Peter Steinberger joins OpenAI (TechCrunch, February 2026)](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/)
- [OpenClaw, OpenAI and the future (Peter Steinberger's own post)](https://steipete.me/posts/2026/openclaw)
- [Computer Use Agents 2026: Claude vs OpenAI vs Gemini](https://www.digitalapplied.com/blog/computer-use-agents-2026-claude-openai-gemini-matrix)
