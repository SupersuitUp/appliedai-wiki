---
title: SOP Execution App
slug: /disciplines/sop-execution-app
description: "A custom web app that exposes a hyperagent's battle-tested digital SOPs as form-driven pages, one tab per SOP. A deployment artifact downstream of the Supersuit. Built by an applied AI engineer."
---

# SOP Execution App

*A custom web app that exposes a hyperagent's battle-tested [digital SOPs](/concepts/digital-sops) as form-driven pages, one tab per SOP. A deployment artifact downstream of the [Supersuit](/paos/what-it-is). Built by an applied AI engineer.*

---

An **SOP Execution App** is a custom web application built around the [hyperagent](/concepts/hyperagent)'s curated [digital SOPs](/concepts/digital-sops). It is not a single button dashboard. It is a multi-tab web app where every SOP gets its own page, with a structured form for the inputs the skill needs (typed fields, voice-to-text capture, file uploads, dropdowns that read from PAOS context like `people/` or `artifacts/`). The agents run on the backend. The user opens the tab they want, fills in the form, hits Run, and the output lands on the same page.

The app is built by an [applied AI engineer](/disciplines/sop-execution-app/how-to-get-one-built) for a specific principal. The principal's voice and the relevant slice of their team's shared context get loaded in. The SOPs are scoped to the work the principal actually does. There is no terminal, no markdown to maintain, no harness to install. The SOPs the app fires, however, must have been developed and battle-tested first, inside the hyperagent's [Supersuit](/concepts/supersuit).

## What it is not

An SOP Execution App is **not** a [Supersuit](/paos/what-it-is). The Supersuit is the [Personal Agentic OS](/paos/what-it-is): the full personal agentic system on the hyperagent's own machine, with the context substrate, the skill library, and the harness. The SOP Execution App is a downstream deployment artifact that exposes proven SOPs as form-driven pages for the people who will use them. The Supersuit is the building. The SOP Execution App is one door into it.

## How the two relate

An SOP Execution App is **downstream** of a Supersuit. The PAOS is where the hyperagent develops and battle-tests each [skill file](https://appliedai.wiki/concepts/skill-files). Once a skill produces consistent in-voice output across many runs, the hyperagent (or their engineer) specs out a tab in the app for it. The PAOS is where the workflow gets *built*. The app is where the workflow gets *deployed* for the principal: or their team: who do their daily work without opening a terminal.

The two are not constantly in sync by default. Once a skill is proven and packaged as an SOP page in the app, the app runs against its own snapshot of the spec plus whatever live context layer it has been wired to read from. You can extend the wiring (e.g., have the app re-read the underlying skill file daily, or post outputs back into a shared store), but that is a deliberate extension, not the default.

This is the [Skill File First, App Second](https://appliedai.wiki/concepts/skill-file-first-app-second) order: prove the capability inside a markdown file in your PAOS first. Package it as a tab in an app only after the capability is real. The skill file is the spec the app's form and agent backend implement.

## In this section

1. [What it is](/disciplines/sop-execution-app/what-it-is): definition, the multi-tab form-driven shape, and how one app per employee connects through a team shared context layer.
2. [Anatomy](/disciplines/sop-execution-app/anatomy): the four load-bearing components of every SOP Execution App (a page per SOP with a form per page; role-scoped memory; role-scoped views; an agent backend).
3. [Case studies](/disciplines/sop-execution-app/case-studies/video-strategy-workflow): real examples of hyperagents using SOP Execution Apps day-to-day.
4. [When to get one built](/disciplines/sop-execution-app/when-to-get-one): the conditions that justify commissioning one once you are already running a Supersuit.
5. [How to get one built](/disciplines/sop-execution-app/how-to-get-one-built): finding the right engineer, briefing them well, shipping v0.1 in the first session, and the iteration loop.

---

## Further Reading

- [The Supersuit (PAOS)](/paos/what-it-is): the full personal agentic system. The canonical capability. An SOP Execution App is one deployment artifact for skill files developed inside it.
- [Digital SOPs](/concepts/digital-sops): the hyperagent-register name for the workflows each tab fires.
- [Skill File First, App Second](https://appliedai.wiki/concepts/skill-file-first-app-second): the development order. Prove the capability in a skill file inside your PAOS before you package it as an app tab.
- [Embedded Applied AI Partner](/concepts/embedded-applied-ai-partner): the tailor on call who keeps the Supersuit (and the SOP Execution App on top of it) fitted as the operation grows.
- [The hyperagent](https://hyperagency.wiki/the-hyperagent): the role the Supersuit produces.
