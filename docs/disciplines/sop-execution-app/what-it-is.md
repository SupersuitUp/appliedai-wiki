---
title: What it is
slug: /disciplines/sop-execution-app/what-it-is
sidebar_position: 1
description: "A custom web app that exposes a hyperagent's battle-tested digital SOPs as form-driven pages, one tab per SOP. A deployment artifact downstream of the Supersuit, not a replacement for it."
---

# What it is

*A custom web app that exposes a hyperagent's battle-tested [digital SOPs](/concepts/digital-sops) as form-driven pages, one tab per SOP. A deployment artifact downstream of the [Supersuit](/paos/what-it-is), not a replacement for it.*

![Single-panel splash comic. A large glowing inked web-browser window dominates the panel, banner-headed WESTSIDE CAPITAL · SOP EXECUTION APP. The window has a LEFT-HAND SIDEBAR nav with tabs for each SOP (analyze-property, underwrite-deal currently selected and highlighted, draft-loi, prep-broker-meeting, market-pulse, weekly-pipeline-review, draft-investor-update, property-tour-recap, lease-redline). The MAIN CONTENT area on the right shows the UNDERWRITE-DEAL tab open with a structured FORM: PROPERTY ADDRESS (typed), BROKER from people/ (dropdown showing Mary Jones), TARGET CAP RATE 6.25%, DEAL SHEET (file upload), NARRATIVE CONTEXT (voice-to-text button), and a RUN UNDERWRITE-DEAL button. Below the form, an OUTPUT PANEL titled DEAL UNDERWRITE · WESTSIDE TOWER · DRAFT shows section checkmarks (Cap Rate Analysis, Sensitivity Table, IRR Ranges, Memo Draft). The canonical Blasian supersuited hyperagent sits at the laptop, gauntleted hands mid-filling-the-form. Top banner: NOT A SINGLE BUTTON DASHBOARD: A MULTI-TAB WEB APP. EVERY SOP GETS ITS OWN PAGE WITH A STRUCTURED FORM FOR INPUTS. HUD callouts: A TAB FOR EVERY SOP, A FORM FOR EVERY TAB, TYPED OR SPOKEN INPUTS, ONE APP PER EMPLOYEE · CONNECTED. Background insets show two more browser windows labeled CHIEF OF STAFF · SOP APP and ASSOCIATE · SOP APP with the tag ONE APP PER EMPLOYEE, all three windows feeding into and reading from a SHARED CONTEXT GRAPH diagram tagged CONNECTED LIKE RAMP'S GLASS + DOJO. Another inset shows the PAOS file tree with .agents/skills/ visible, dashed-line connection to the active tab with tag SPEC'D INSIDE HIS SUPERSUIT. Top-right corner tag: SOMETHING TO SUPPLEMENT A SUPERSUIT · NOT A REPLACEMENT FOR IT. Title bar: SOP EXECUTION APP. Footer bar: A FORM-DRIVEN PAGE FOR EVERY SOP. ONE APP PER EMPLOYEE.](/img/comics/sop-execution-app.png)

---

## What it is

A **SOP Execution App** is a custom web application built around the [hyperagent](/concepts/hyperagent)'s curated [digital SOPs](/concepts/digital-sops). The shape is not a single button dashboard: it is a multi-tab app where **every SOP has its own page and its own form**. The user opens the tab for the SOP they want to run, fills in the form (typed inputs, voice-to-text, file uploads, dropdowns that read from their PAOS context like `people/` or `artifacts/`), and presses run. The agent executes the [skill file](https://appliedai.wiki/concepts/skill-files) behind that tab against the form inputs and lands the output on the same page.

The relationship to the [Supersuit](/concepts/supersuit) is structural: the SOP Execution App is a **deployment artifact for skill files that were developed and proven inside the hyperagent's Personal Agentic OS first**. The PAOS is the source. The app is one of several places those proven skills get fired from. See [Skill File First, App Second](https://appliedai.wiki/concepts/skill-file-first-app-second) for the development order this depends on.

## One app per employee, connected through a team shared context layer

The pattern scales sideways. A hyperagent who has commissioned an SOP Execution App for themselves can commission one for each of their employees (chief of staff, associate, partner): each app scoped to that employee's role.

These apps do not read from the hyperagent's personal PAOS directly. They read from a **[team shared context layer](/concepts/company-context-layer)**: a separate big-data substrate that holds the company-wide context the team is allowed to share: the live deal pipeline, the company [PRM](/concepts/prm), shared artifacts, meeting transcripts marked team-visible, the canonical playbooks. Each employee accesses the layer through their own SOP Execution App, scoped by their access rights. The associate sees the deals he is staffed on; the chief of staff sees the hyperagent's calendar and inbox-routing context; the partner sees the partner-level governance threads.

The hyperagent's personal PAOS stays personal. The Supersuit on the hyperagent's own machine holds the raw thinking, the half-formed strategy memos, the private people notes, the rough drafts. What the hyperagent chooses to make team-visible: a finalized playbook, a battle-tested skill file, a clean deal memo: flows into the shared layer on his terms. Nothing flows automatically. The wiki is not prescriptive about how this boundary is set; what matters is that the boundary exists and the hyperagent is the one who draws it.

The corporate-scale validation of the personal-apps-plus-team-substrate pattern is Ramp's Glass + Dojo architecture: 700 personal Glass apps, one shared Dojo substrate, 350+ shared skill files, 1,500 apps shipped in six weeks. The shape works at one employee or seven hundred. The team shared context layer is what makes a constellation of SOP Execution Apps add up to a working operation rather than a set of disconnected button dashboards.

## Why an SOP Execution App exists at all

Inside the [Supersuit](/paos/what-it-is), the hyperagent already has the fastest possible interface for firing their SOPs: a typed sentence in the [agentic harness chatbox](/concepts/agentic-harness-chatbox). For most of the hyperagent's own work, that interface is enough. The SOP Execution App exists for the cases where typing is not the right interface:

- **For other people.** A chief of staff, an associate, a partner, a client who needs the workflow but will not learn the terminal. The web app is the door they open.
- **For high-frequency moves.** Even for the hyperagent herself, a labeled button can be faster than re-typing a prompt fifteen times a day for the same SOP.
- **For public or client-facing apps.** The terminal is private. The web app can be shared.

The app is never the substrate. The substrate is the Supersuit underneath it.

## Two anchor cases

- **The serial publishing principal.** A custom web app built for a senior advisor whose operation runs on a recurring publishing rhythm. The site replaces what used to live across five tabs with a single app for drafting, scheduling, and publishing. The skill files behind every button were proven in the principal's PAOS before they earned a slot in the app.
- **The video production suite.** A web app for the principal of a content production business. Project state, client comms, asset handoffs, deadlines, AI-recommended next moves on each project: all compressed into one app, all driven by skill files from the principal's Supersuit.

The pattern is the same in both cases. The system is custom-built around what the principal already does. The skills were proven first; the buttons came second.

## What is inside

A SOP Execution App has four load-bearing components:

1. **A page per SOP, with a form per page.** Each tab in the left-hand nav is one battle-tested skill file from the hyperagent's Supersuit. The page for that SOP is a structured form for the inputs the skill needs: typed fields, voice-to-text capture for narrative context, file uploads (e.g., a deal sheet PDF), dropdowns that read from PAOS files (e.g., a person picker that pulls from `people/`), and a Run button at the bottom. The form is what makes the SOP usable without re-typing a long prompt every time.
2. **Role-scoped memory drawn from the PAOS.** The substrate the app reads from is the hyperagent's PAOS context (people, artifacts, prior decisions, meeting transcripts). Every SOP page runs against this memory. The user does not re-explain themselves on every run.
3. **Role-scoped views.** The app shows the user only what is theirs to see: a function head sees aggregated function-wide views, an associate sees their own pipeline. Same app architecture, different scope. When the hyperagent deploys SOP Execution Apps for multiple employees, each app's view is scoped to that role.
4. **A backend of agents.** The Run button on each SOP page triggers agents that read the form inputs, load the relevant PAOS context, execute the skill file workflow, and land the output on the same page.

The shape is closer to a custom internal tool with one page per workflow than to a single-page button dashboard. Conversation has a place; the app makes each SOP one tab away with the right form already built for it.

For a deeper look at each component, see [Anatomy](/disciplines/sop-execution-app/anatomy).

## Who builds it

A SOP Execution App is built by a forward-deployed [applied AI engineer](/disciplines/sop-execution-app/how-to-get-one-built) who sits in the room with the hyperagent and ships v0.1 of the first button in the same session. Requirement documents handed to a separate engineering team are the wrong shape; the engineer collapses the distance between the person who understands the workflow (the hyperagent, because the workflow lives in their PAOS as a proven skill file) and the person who packages it as a button.

The engagement is durable. The first button wraps the most painful repeated workflow. The hyperagent's imagination opens up; they say "and this one." The engineer ships the next button the following week. The app compounds across months.

## What this rules out

- **An SOP Execution App without a Supersuit underneath.** Without proven skill files in a PAOS, the app is a wrapper around a generic capability. The buttons fire prompts that have not been battle-tested in the hyperagent's voice. The output drifts. The app does not compound.
- **A SaaS dashboard rebranded as a homepage.** The whole point is the app is custom to the hyperagent, runs against their context, and inherits no vendor's data model. A SaaS tool generic enough to fit every customer fits no specific hyperagent.
- **A chat window with someone's logo.** Conversational AI is one interface mode; the app makes the right action one click away. A chat window without buttons makes the user re-prompt every time.
- **A self-built app the hyperagent has to debug.** The engineer builds it, ships it, iterates it. If the hyperagent has to debug, the build has already failed.

## The economic frame

A SOP Execution App is a real engagement: forward-deployed engineering hours, iteration cycles, ongoing maintenance. The cost is justified when the conditions in [When to get one built](/disciplines/sop-execution-app/when-to-get-one) hold: most often when the hyperagent has already built their PAOS and now wants to extend its leverage to people who will not open a terminal.

The Supersuit, built on open primitives and continually tailored by an [Embedded Applied AI Partner](/concepts/embedded-applied-ai-partner), is what every serious hyperagent builds first. The SOP Execution App is the deployment layer on top of it for the use cases that justify the extra engineering.

---

## Further Reading

**Inside the wiki**

- [The Supersuit (PAOS)](/paos/what-it-is): the canonical system. The app is downstream of this.
- [Skill File First, App Second](https://appliedai.wiki/concepts/skill-file-first-app-second): the development order the app depends on.
- [Digital SOPs](/concepts/digital-sops): the hyperagent-register name for the workflows the buttons fire.
- [Anatomy](/disciplines/sop-execution-app/anatomy): the four load-bearing components of an SOP Execution App.
- [When to get one built](/disciplines/sop-execution-app/when-to-get-one): the conditions that justify commissioning one.
- [How to get one built](/disciplines/sop-execution-app/how-to-get-one-built): the engagement process.
- [The hyperagent](https://hyperagency.wiki/the-hyperagent): the role the Supersuit produces.
- [Build What Big AI Won't](/concepts/build-what-big-ai-wont): why the structurally opinionated SOP Execution App is the work the frontier labs cannot do.
- [Sovereign Agentic Business OS](/concepts/sovereign-agentic-business-os): the business-scale version of the same architecture. Where the SOP Execution App pattern goes when it generalizes across a whole company.

**Outside the wiki**

- Geoff Charles (CPO, Ramp), public threads on Glass and Ramp's company-wide AI rollout (X, April 2026). The corporate-scale validation of the personal-app-plus-shared-substrate architecture: 700 personal Glasses, one shared Dojo, 350-plus skills, 1,500 apps shipped in six weeks.
- Alan Cooper, *The Inmates Are Running the Asylum* (1999). The persona-driven design discipline. SOP Execution Apps are personas operationalized into software, one per user.
- Bret Victor, "Magic Ink" (2006). The argument for surfaces that show the user the right thing for the moment they are in, rather than generic dashboards that show everything.
- Don Norman, *The Design of Everyday Things* (1988). The case that good interfaces compress the user's working model into the system, with no friction left exposed.
