---
title: When to Get One Built
slug: /disciplines/sop-execution-app/when-to-get-one
sidebar_position: 4
description: "The signs that a hyperagent running a PAOS should commission an SOP Execution App. The default is to keep working in the terminal; the app is worth the engineering only when specific conditions hold."
---

# When to Get One Built

*The signs that a hyperagent running a [Supersuit](/paos/what-it-is) should commission an SOP Execution App. The default is to keep working in the terminal; the app is worth the engineering only when specific conditions hold.*

---

## The default is the terminal

If you are running your [Personal Agentic OS](/paos/what-it-is), the terminal is already your most-leveraged interface. You type a sentence in the [agentic harness chatbox](/concepts/agentic-harness-chatbox), the [Chief of Agents](/concepts/chief-of-agents) fires the right [skill file](https://appliedai.wiki/concepts/skill-files), and the work ships. Adding a custom web app on top adds a build cost and a maintenance cost. That cost is worth paying when the conditions below hold; otherwise, the terminal is fine.

## When it is worth getting one built

**A specific SOP has been battle-tested in your PAOS, and you want others to fire it.** Your chief of staff, an associate, a partner, a client. They need the workflow but they will not learn the terminal. An SOP Execution App is the deployment artifact that exposes the SOP to people who do not run a PAOS.

**One or two SOPs account for the majority of someone else's repeated work, and the call pattern is structured.** "Underwrite this property," "Draft an LOI from this deal sheet," "Prep me for this meeting": these are SOPs with a predictable input shape. Wrapping them in a button-driven web app is genuinely faster than typing a fresh prompt every time.

**The SOPs have stabilized.** You have run the skill file enough times that you are not editing it weekly anymore. Packaging an SOP into a web app is wasted engineering if the SOP is still being shaped. Wait until the SOP is stable, then commission the app.

**You want a public-facing or client-facing app.** An SOP Execution App can be exposed to people outside your team: a portfolio company, a prospect, a community. The terminal is for you. The app is what you let other people use.

**You want a polished daily driver for a high-frequency move.** Even for yourself, a button can be faster than a typed prompt for a workflow you fire fifteen times a day. The engineering is justified when the call frequency is high enough that the typing cost adds up.

## When it is not worth getting one built

**The SOP is still being shaped.** Wait. Run it in the PAOS until it produces consistent output. Edit the skill file. Lock the spec. Then commission the app.

**The call frequency is low.** A workflow you fire twice a month does not need a polished button. The terminal handles it.

**The principal you are commissioning the app for has not yet built their PAOS.** An SOP Execution App pointed at no underlying context is a thin wrapper. The deeper move is to help them build the PAOS first, then package SOPs from it.

**You want every change to be live in seconds.** The terminal is the only interface with that latency. An app has an iteration cycle measured in days or weeks; the PAOS iteration cycle is measured in seconds.

## What happens after you commission one

The PAOS keeps running. The app is a deployment artifact, not a replacement. New workflows still get drafted, battle-tested, and refined in the PAOS first. Once a workflow is proven, you decide whether it earns a button in the app or stays a terminal-only move.

This is the [Skill File First, App Second](https://appliedai.wiki/concepts/skill-file-first-app-second) order. The PAOS is where the workflow gets built. The app is where the workflow gets deployed for whoever needs it.

---

## Further Reading

- [The Supersuit (your PAOS)](/paos/what-it-is): the canonical capability. The PAOS is where SOPs are developed before they become app buttons.
- [SOP Execution App: what it is](/disciplines/sop-execution-app/what-it-is): definition and form factor.
- [How to get one built](/disciplines/sop-execution-app/how-to-get-one-built): the process of commissioning one once you have decided it is time.
- [Skill File First, App Second](https://appliedai.wiki/concepts/skill-file-first-app-second): the development order. Prove it as a skill file before packaging.
- [Digital SOPs](/concepts/digital-sops): the [hyperagent](/concepts/hyperagent)-register name for the workflows the app fires.
- [Don't Put The App On A Pedestal](/concepts/dont-put-the-app-on-a-pedestal): the category error that mistakes an interface for the system underneath. Helps you decide whether you need an app or just the rail behind it.
