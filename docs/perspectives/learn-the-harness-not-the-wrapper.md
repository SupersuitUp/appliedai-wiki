---
title: "Learn the Harness, Not the Wrapper"
slug: /perspectives/learn-the-harness-not-the-wrapper
description: "Agentic harnesses (Claude Code, Hermes, Codex) are primitives. Vendor wrappers over them (Claude Cowork, opinionated desktop apps) hide those primitives to look friendlier. We teach the primitives,..."
---

# Learn the Harness, Not the Wrapper

*Agentic harnesses (Claude Code, Hermes, Codex) are primitives. Vendor wrappers over them (Claude Cowork, opinionated desktop apps) hide those primitives to look friendlier. We teach the primitives, so your skills transfer across every harness you will ever use.*

---

## The Question I Get Most

Somewhere in almost every [Supersuit Up workshop](/paos/supersuit-up-workshop), an attendee asks some version of this:

> “I'm having a hard time with this whole VS Code plus terminal thing. Claude Cowork is friendlier. Isn't that the same thing, basically?”

It is a great question. The friction is real. Here is the honest answer.

You are not being asked to become a developer. You are being asked to take **one step** into the developer world so you can see the primitives that every serious AI user will need in the next decade. The friction is temporary. What you build on the other side of it is not.

---

## Harnesses vs Wrappers

Two terms to keep straight.

**An agentic harness** is the actual engine that reads your files, runs skills, calls models, and executes tool calls. [Claude Code](/reference/tools/claude-code) is a harness. [Hermes](/reference/tools/hermes) is a harness. [Codex](/reference/tools/codex) is a harness. Cursor's agent is a harness. These run in the terminal (or an IDE) and give you direct access to the full agentic loop: context, files, skills, commands, tools.

**A wrapper** is a friendlier UI built on top of a specific harness, usually by the vendor that makes the harness. Claude Cowork is a wrapper: it is [Anthropic's Desktop-app layer over Claude Code](https://claude.com/product/cowork), billed as “Claude Code without the code.” You point it at a folder, it reads and writes files in that folder, and you interact through a chat window. It is the same underlying harness, with the primitives hidden behind an opinionated interface.

Wrappers look like a shortcut. They are a trap.

---

## Why We Teach the Harness Directly

**You learn the primitives.** Context. Skills. Files. Tool calls. Commands. Skill files. These are the building blocks of every agentic system that exists or will exist. Learn them in Claude Code and you understand how Hermes works on day one. Learn them in a wrapper and you understand Claude Cowork.

**Your skills transfer.** The markdown files, skill definitions, CLAUDE.md / AGENTS.md conventions, and muscle memory you build working with a harness directly carry over to every other harness. A wrapper locks you into one vendor's flavor.

**You do not depend on any single harness.** Today Claude Code is the best harness available. In six months it might be an open-source harness. You want the ability to swap harnesses in an afternoon when a better one ships. If your context garden is files on your machine and you know how to work with a harness directly, that swap is easy. If you are inside Cowork, it is not.

**You can go as deep as you want.** A direct harness exposes the full surface: custom skills, background agents, MCP servers, shell integrations, your own tooling. A wrapper is capped at what the vendor chose to expose.

**You stay un-locked-in.** [The lock-in is coming](https://appliedai.wiki/foundations/the-lock-in-is-coming). Every hyperscaler has the same incentive: pull you deeper into their platform until switching is unthinkable. Wrappers are the tip of that spear. Cowork is a good wrapper. It is still a wrapper.

The line I keep coming back to:

> **You don't want to be learning Claude. You want to be learning AI.**

Wrappers teach you Claude. Harnesses teach you AI.

---

## Why We Teach VS Code (the File Viewer)

VS Code is not a harness. It is a file viewer that happens to be beloved by developers. That is all it is to us.

Reasons we use it:

1. **You are going to have a lot of files.** Your [Personal Agentic OS](/paos/what-it-is) is a workspace full of markdown: your user profile, relationship dossiers, meeting transcripts, strategic documents, skills. You need something that makes browsing, opening, and editing many files fast.
2. **It is harness-agnostic.** Claude Code, Hermes, Codex, Cursor, OpenCode: they all plug into a VS Code workspace natively. The moment you swap harnesses, you do not change environments.
3. **It is infinitely customizable.** Plugins for PDFs, web views, database browsers, diagrams, anything. Theme it however you like.
4. **It makes your files first-class citizens.** The left sidebar is a living directory of your [operational reality](https://supersuit.wiki/concepts/operational-reality). Seeing your files at a glance trains the habit of trusting the system.

VS Code is the vehicle. The harness is the engine. Your files are the cargo. The cargo is what matters.

---

## “But &lt;Insert Desktop App Version of Some CLI&gt; Is So Much Friendlier”

This applies to any vendor desktop wrapper: Claude Desktop, Claude Code Desktop App (Cowork), ChatGPT Desktop, Codex Desktop, Gemini Desktop, Copilot Desktop, and every one that ships next. The pattern is the same: a polished-looking wrapper over a CLI or model that the vendor controls end-to-end.

Sometimes they are great. Sometimes they are not.

Here is what the developer Theo wrote after spending an hour in the new Claude Code desktop app:

> “I feel bad dunking on them so much but it's genuinely absurd how bad the new Claude Code desktop app is. You can feel the vibe code leaking everywhere. Every 'feature' is barely integrated and full of edge cases that weren't considered. Every menu feels barren, stuffed in last second for some random toggle. Every hotkey breaks as soon as you try to do anything else. I've lost track of how many bugs I've encountered. I found at least 40 in under an hour... Any one of these issues would have been enough for me to do a massive post-mortem and likely fire someone. A $400b company shipping this is absurd.”

[Full thread](https://x.com/theo/status/2044680030706663726). He came back the same day with a sharper line:

> “The Claude Code Desktop app is an affront on software. As developers, we should be offended that they chose to ship something this awful.”

[Follow-up](https://x.com/theo/status/2044697225666929151).

This is the risk of living inside a vendor wrapper. Even a $400B company with the strongest AI talent on earth ships half-baked product. When it happens, your daily workflow breaks with it, and you have no recourse. The harness underneath is still solid. The wrapper is the thing falling apart.

The trade-off:

- **You learn a vendor UI.** When Anthropic redesigns Cowork, your muscle memory has to be rebuilt.
- **Your workflow lives in their app.** The folder is on your machine, but the workflow lives in Cowork. Porting to a different vendor is not trivial.
- **You never see the primitives.** Skills, context-loading logic, tool calls: all hidden. You cannot debug them when things go weird. You cannot extend them. You cannot mix-and-match.
- **You hit the vendor ceiling.** Cowork exposes what Anthropic wants you to see. The harness exposes everything.
- **You are a user, not a hyperagent.** Big difference when pricing changes, rate limits tighten, or a materially better alternative ships.

People who learn the harness directly can use Cowork whenever they want. People who only learn Cowork cannot easily use anything else.

---

## “But VS Code Is Ugly”

Fair. It is an IDE. Lots going on.

- **Install a theme.** Thousands to choose from. Light, dark, warm, whatever.
- **Install plugins.** PDF viewer, markdown preview, web previewer.
- **Hide what you do not use.** Debugger, git sidebar, menus: all collapsible.
- **Your daily surface is small.** File viewer on the left. Integrated terminal on the bottom. That is it. Two panes.

It takes about a week of regular use before it feels native. That is the whole learning curve.

---

## Where This Is Going

Here is the prediction: companies and individuals will build custom agent viewers for specific roles. Finance-team viewers. Chief-of-staff viewers. Marketing-team viewers. Ramp's Glass is already a concrete example at scale: a unified internal platform wrapping skills and workflows in a beautifully custom UI on top of shared files and agents.

The reason they can build custom viewers is that everything underneath is plain files and a well-understood harness. The UI on top is a choice. The substrate is the product.

If you learn a vendor's wrapper, your skills die the day that wrapper changes. If you learn the harness and the files, your skills persist forever, because every future interface (including the one you or your team eventually builds) is just another wrapper over the same underlying thing. This is the essence of [personal software](https://supersuit.wiki/concepts/personal-software): the custom, hyper-specific interfaces that emerge once the substrate is solid.

---

## The Resilience Angle

A practical note. There is a hard materials constraint behind every frontier AI vendor right now: GPU shortages, CPU shortages, data-center buildouts hitting physical limits, even occasional acts of sabotage. Demand is vertical. Supply is not.

If you run your entire workflow inside a single vendor's wrapper, you can be rate-limited, throttled, repriced, or degraded on the vendor's schedule. If you run your workflow on files you own with a harness you understand, you swap harnesses in an afternoon when a better (or cheaper, or faster) one ships. The difference in resilience is substantial.



---

## Sovereignty Is the Point

The goal of the [Supersuit Up Workshop](/paos/supersuit-up-workshop) is to build on sovereign foundations. Workshops are a means to that end. VS Code is a means. Claude Code is a means.

What the workshop is actually teaching: **how to own your operational reality in a format that outlives any single vendor, any single harness, and any single wrapper.**

That is a different product than “how to be a great Cowork user.” The first is portable. The second is rented.

---

## Stick With It

If you are in the first week of the harness-and-files setup and it feels clunky, you are right on schedule. The clunky feeling fades. What you build in your workspace will outlast three generations of vendor UIs.

One step into the developer world. That is all we are asking. You can go as deep as you want from there, or you can stop there and still be 10x ahead of people who only know a vendor wrapper.

The friction is real. The upside is uncapped.

---

## Further Reading

- [Personal Agentic OS](/paos/what-it-is): The workspace a harness reads
- [Harness Engineering](https://appliedai.wiki/disciplines/harness-engineering): What a harness actually is and why the code around the model matters as much as the model
- [The Lock-In Is Coming](https://appliedai.wiki/foundations/the-lock-in-is-coming): Why every hyperscaler will eventually ship a wrapper
- [The Chat Is Not the Product](https://appliedai.wiki/foundations/the-chat-is-not-the-product): Chat windows versus persistent files
- [Personal Software](https://supersuit.wiki/concepts/personal-software): Custom UIs over shared files and agents
- [Operational Reality](https://supersuit.wiki/concepts/operational-reality): What your files should contain
- Ramp: Glass: A custom agent viewer at scale
- [Supersuit Up Workshop](/paos/supersuit-up-workshop): Where we walk you through setting this up
- [Claude Code Setup](/reference/tools/claude-code): The default harness we teach
- [Hermes Setup](/reference/tools/hermes): A second harness to prove your skills transfer
- [The Case for Simple Harnesses](/perspectives/the-case-for-simple-harnesses): Why minimal harnesses keep winning and kitchen-sink defaults are the failure mode
