---
title: "Remote Harness Control"
slug: /concepts/remote-harness-control
description: "Steering your agentic harness from your phone, so heavy work on your real files keeps moving while you are away from the desk."
---

# Remote Harness Control

*Driving your agentic harness (Claude Code, Codex) from your phone, so heavy work on your real files keeps moving while you are away from the desk.*

![4-panel cream-paper Marvel-zine comic strip. Title bar: "REMOTE HARNESS CONTROL". Footer bar: "APPLIEDAI.WIKI, REMOTE HARNESS CONTROL". PANEL 1, label "THE WORLD IS YOUR OFFICE": Midas in matte-navy Supersuit with orange seams and cyan visor glow stands on a sunlit city street, helmet on, holding a glowing cyan smartphone in his gauntleted hand, fully physical in the real world. Caption: "Midas launches the job from the sidewalk." PANEL 2, label "THE COMMAND HALL AWAKENS": a deep-navy cyber-cathedral command hall where the Chief of Agents, a luminous cyan-and-gold holographic construct wearing his gold comms crown and high-collared conductor mantle with a "LEAD LLM-COMMS LAYER" chest band, fans out three translucent sub-agent constructs amid cascading holographic file trees and code panels, no flesh figures. Caption: "The Chief fans out. Fifty files. Three agents. Clock running." PANEL 3, label "THE DECISION ARRIVES": Midas at a cream-toned cafe table, helmet off and face visible, plate armor on his torso, tapping a glowing cyan approval card on his phone that reads "APPROVE CHANGES?" with a green checkmark, a coffee cup beside him, fully in the physical world. Caption: "Push notification. One tap. Work ships." PANEL 4, label "WORK SHIPS WHILE YOU LIVE": split composition, on the left Midas walks away down a sunlit street with his phone pocketed and a relaxed posture, on the right a large cyan-bordered phone-screen inset shows the cyber-cathedral command hall with the Chief and sub-agents in motion and holographic cards labeled "PR OPENED, TESTS PASSING", the phone screen as the window between the two worlds. Caption: "The desk was never the point. The work is."](/img/comics/remote-harness-control.png)

---

## Why this matters

You built a real workspace. Your [command center](/concepts/command-centers) of profiles, artifacts, skills, and principles is the thing your agent reads and rewrites. The agent does heavy, filesystem-modifying work inside it: refactors, migrations, multi-file edits, long research-and-write passes. That work does not finish in thirty seconds, and it does not need you watching every token.

Two facts collide. The work runs on a machine. You are not always at the machine. You will not lug a laptop to dinner, the gym, or the school pickup line, and you should not have to sit and babysit a forty-minute task. **Remote harness control** closes that gap: you kick off the work, walk away, and steer it from the device already in your pocket.

This is the natural partner to [always-on agents](/concepts/always-on-agents). Always-on is about the agent acting without you. Remote control is about you acting without the desk. Together they detach your operation from any one chair.

## The two patterns

There are two distinct ways to run heavy agent work remotely, and the difference is exactly where the work executes.

### Phone as a window into your live machine

The harness runs on your own computer, against your real files, your real dev server, your real tools and credentials. Your phone is a remote control, not the runtime. The model never runs on the device. You send messages, approve file changes, and watch tool activity live from anywhere.

The catch is physical: your machine has to stay on and online. Close the process and the session ends. This mode is right when the work needs your actual repo state, uncommitted files, a running localhost, or local secrets.

### Hand it to the cloud

The harness runs in a managed, isolated sandbox in the cloud. It clones your repo fresh, works, runs tests, and hands back a branch or a pull request. You can close the laptop, power it off, and go. Sessions survive because nothing depends on your hardware.

The tradeoffs are the inverse: no uncommitted local files, usually no localhost or dev server, network often disabled mid-run for isolation, and a higher cost per task. This mode is right for fire-and-forget work that lives cleanly in a repo.

Pick by a single question: **does the task need your live machine, or only your code?**

## How Claude Code and Codex do it

Both harnesses now offer both patterns, and the shapes are nearly symmetric.

**Claude Code.**

- *Remote Control* is the phone-as-window mode. Run `claude remote-control` (or `/remote-control` inside a live session) and you get a session URL and a QR code. Open it at `claude.ai/code` or scan it into the mobile app to message the session, approve file changes, and watch tools run. Code, filesystem, and MCP servers stay fully local; only the chat and tool messages cross an encrypted outbound bridge, so there are no inbound ports to open. Push notifications fire when a long task finishes or needs a decision. It is on all plans, but it requires a claude.ai login (API keys are not supported), and the local process must keep running. If the machine is unreachable for about ten minutes the session times out, though it auto-reconnects after sleep or a brief drop.
- *Claude Code on the web* is the cloud mode: managed VMs with your GitHub repo cloned in. Close the browser or shut the machine down and the work continues. There are also *Routines* (scheduled cloud runs with no machine on) and *Dispatch* (fire a task from mobile that spawns a session on your desktop).

**Codex.**

- *Codex Cloud* (at `chatgpt.com/codex`, via `codex cloud exec` from the CLI, or by tagging `@codex` on a GitHub issue) is the cloud mode. It spins up an isolated container, clones the repo, works until tests pass, and opens a pull request. Tasks run async and in parallel while your machine is off. Codex inside the ChatGPT mobile app streams the terminal output, diffs, and test results in real time; you approve, revise, or reject, with sensitive commands surfaced as lock-screen approval cards.
- Codex also has a desktop-connect mode that windows into a local session, which, like Claude's Remote Control, needs the host machine running.

The phone is always a window, never the runtime. To walk away with the laptop off, use a cloud offering on either side.

## The real prerequisite

Remote control is only worth it if there is something worth controlling remotely. A harness pointed at an empty folder does nothing useful from your phone.

The leverage comes from the workspace. The richer your [command center](/concepts/command-centers), and the more of your operation captured as files the agent can read and rewrite, the more heavy work you can safely launch and steer from a phone. This is the same prerequisite that [context engineering](/disciplines/context-engineering) and always-on agents depend on. The investment compounds: the workspace you build for one pays off in all three.

It is also a [harness engineering](/disciplines/harness-engineering) decision. Choosing local versus cloud per task, keeping the workspace refactorable, and writing the approvals and guardrails that make it safe to say yes to a file change from a phone is craft, not a setting.

## What to do now

1. Turn on the phone-as-window mode in your harness and use it once on a real task. The session link in your pocket changes how it feels to own the work.
2. Move one fire-and-forget job (a migration, a sweep, a long write-up) to a cloud run and review the pull request from your phone.
3. Keep building the workspace. Every artifact, skill, and principle you add is one more thing you can put the agent to work on from anywhere.

The desk was never the point. The work is. Remote harness control is how you stop confusing the two.

---

## Further Reading

- [Always-On Agents](/concepts/always-on-agents): the agent acting without you, the complement to you acting without the desk.
- [Command Centers](/concepts/command-centers): the workspace that makes remote work worth launching.
- [Harness Engineering](/disciplines/harness-engineering): the craft of configuring the harness, including local versus cloud and approvals.
- [Context Engineering](/disciplines/context-engineering): the discipline that makes any remote agent useful.
