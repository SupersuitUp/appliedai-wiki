---
title: Anatomy
slug: /disciplines/sop-execution-app/anatomy
sidebar_position: 2
description: "The four load-bearing components inside every SOP Execution App: a page per SOP with a form per page, role-scoped memory drawn from the team layer, role-scoped views, and a backend of agents."
---

# Anatomy

*The four load-bearing components inside every SOP Execution App. Each one earns its place. Remove any one of them and the system loses a dimension of its leverage.*

---

Every SOP Execution App is custom-built, but the structure beneath the system is consistent. The same four components appear in every well-built one, because they address the same four jobs the system has to do: route recurring work to a single click, hold the user's context so they never re-explain themselves, show the user a view scoped to their role, and run the agents that do the heavy lifting.

## A page per SOP, with a form per page

The recurring SOPs the [hyperagent](/concepts/hyperagent) runs every week, each one given its own page in the app with a structured form for the inputs that SOP needs.

Before the app exists, those workflows live across tabs: the hyperagent opens a blank document in one tab, copies context from a CRM in another, pastes it into a chat window in a third, reformats the output manually, and pastes it into a destination app in a fourth. The total time is not the time spent thinking. The total time includes every click, every paste, every context switch, every moment of orientation cost. That overhead is the target.

A well-built SOP page identifies the inputs the [skill file](https://appliedai.wiki/concepts/skill-files) needs and exposes them as labeled form fields: typed text fields for short answers, voice-to-text capture for narrative context the hyperagent would rather speak, file uploads for deal sheets or transcripts, and dropdowns that read from the hyperagent's PAOS context (a person picker that pulls names from `people/`, an artifact picker that lists recent `artifacts/`). The Run button at the bottom fires the skill file against the filled-in form. The output lands on the same page.

The first SOP page is the most important one. It is chosen based on the most-fired, most-stable skill file in the hyperagent's PAOS: the SOP they already invoke the most often via the terminal. It sets the form pattern that the rest of the SOP pages follow. By the time the hyperagent has five or six SOP pages, the app covers the majority of the moves they used to fire by typing.

## Role-scoped memory

The substrate beneath the homepage carries the user's projects, history, decisions, and context. Every workflow runs against this memory.

Without role-scoped memory, each session starts from zero. The user re-explains who they are, what they are working on, and what has happened since the last time. That re-explanation cost is proportional to the complexity of the user's work. For a knowledge worker with dozens of active projects, the re-explanation cost becomes the primary friction. The homepage eliminates it.

Role-scoped memory is not a database in the traditional sense. It is a structured collection of files: relationship records, project states, decision logs, strategy documents, and the user's voice profile. The agents read these files on every invocation. When the user clicks a workflow button, the agent already knows the context for that task because the context lives in the memory layer.

The memory compounds. The more the user uses the homepage, the richer the memory gets, and the more useful the agents become. A homepage used for six months produces better output than the same homepage on day one, because six months of decisions and outcomes have been captured in the memory layer.

## Role-scoped views

A SOP Execution App shows the user a view of their work scoped to their role, not a generic view of everything.

A function head sees aggregated views of their function's work: team status, project pipeline, open blockers, work pending their approval. An individual contributor sees their own pipeline: their open tasks, their current project state, the things waiting on other people. Both views live inside the same app architecture. The difference is what the system shows and what it hides.

Role-scoped views matter because the wrong view wastes time. A generic view that shows everything to everyone creates attention tax. The user has to filter, sort, and interpret before they can act. A role-scoped view shows the user what is relevant to them right now and hides everything else. The cognitive overhead of finding the right thing drops to near zero.

When multiple users share the same function (several people in the same role at the same organization), the same role-scoped view template covers all of them, scoped to each person's individual context. Each user sees their own work inside the same structure. The template is shared; the context is individual.

## A backend of agents

The SOP pages and their forms are what the user sees. The agents are what runs when the form is submitted.

Each SOP page wires its form to the underlying skill file from the hyperagent's [Supersuit](/concepts/supersuit). When the user presses Run, an agent loads the relevant PAOS context (the relevant person file, the relevant artifacts, recent meeting transcripts), reads the form inputs, executes the skill file workflow against them, and lands the output on the same page. The user never sees the agent work directly. They see the form, they fill it in, they press Run, and the output appears.

The agent backend is what makes an SOP Execution App different from a form linked to a template. A form linked to a template produces the same output every time regardless of context. An agent backend reads the hyperagent's actual situation (the named person's prior interaction history, the named property's prior underwrites, the hyperagent's current strategic priorities) and produces output calibrated to that situation. The skill file is the spec for that behavior; the PAOS is the context the skill file gets to read.

The backend also handles tool calls: reading a calendar, fetching a document, sending a draft, updating a record. The hyperagent grants the agents the tools they need when the app is built, and those tools expand what each SOP page can do over time. Adding a new tool connection is equivalent to adding a new class of SOP the app can handle.

## One app per employee, connected through a team shared context layer

The same anatomy stamps cleanly across multiple users. A hyperagent's chief of staff, associate, and partner each get their own SOP Execution App, each with the SOP pages that fit their role. The four components above are the same in every one: a page per SOP, role-scoped memory, role-scoped views, an agent backend.

What makes the apps powerful collectively is that the memory they each read is sourced from a **[team shared context layer](/concepts/company-context-layer)**: a separate big-data substrate, distinct from the hyperagent's personal PAOS. The team layer holds what the company is allowed to share with itself: the live deal pipeline, the company [PRM](/concepts/prm), team-visible artifacts and transcripts, canonical playbooks. Each employee's app reads the layer scoped by their access rights. The chief of staff captures a meeting note in her app; it lands in the team layer; the hyperagent's daily-briefing SOP page picks it up the next morning. The associate runs an underwrite in his app; the artifact lands in the team layer's `artifacts/` namespace.

The hyperagent's personal PAOS stays personal. Their raw thinking, half-formed strategy memos, private people notes, and rough drafts live there and stay there. What the hyperagent chooses to make team-visible: a finalized playbook, a battle-tested skill file, a clean deal memo: flows into the team layer on his terms. Nothing flows automatically. The wiki does not prescribe a specific sharing posture; the principle is that the personal-PAOS / team-layer boundary exists and the hyperagent is the one who draws it.

The corporate-scale validation of this pattern is Ramp's Glass + Dojo architecture: 700 personal Glass apps, one shared Dojo substrate, 350+ shared skills, 1,500 apps shipped in six weeks. Same anatomy. Scale changes; the personal-private-plus-team-shared structure does not.

---

## Further Reading

**Inside the wiki**

- [What it is](/disciplines/sop-execution-app/what-it-is): the overview page for the SOP Execution App.
- [The Supersuit (PAOS)](/paos/what-it-is): the canonical capability the SOP Execution App is a deployment artifact for. The [Supersuit](/concepts/supersuit) is where the skill files behind every button get developed and battle-tested first.
- [Skill File First, App Second](https://appliedai.wiki/concepts/skill-file-first-app-second): the development order. Every button in an SOP Execution App must be backed by a proven skill file in the hyperagent's PAOS.
- [When to get one built](/disciplines/sop-execution-app/when-to-get-one): the conditions that justify commissioning one.
- [How to get one built](/disciplines/sop-execution-app/how-to-get-one-built): finding an engineer and running the engagement.
- [Context Gardening](/concepts/context-gardening): the discipline that keeps the PAOS substrate the role-scoped memory is drawn from alive and current.
- [Compounding Docs](https://appliedai.wiki/concepts/compounding-docs): the documentation discipline that makes the memory layer sharper over time.
- [Personal Software](/concepts/personal-software): the broader category the SOP Execution App belongs to. Software built for one person's exact workflow, not learn-to-code.
- [Role Wrapper](/concepts/role-wrapper): the per-role design template extracted from a skilled practitioner's app. The pattern every other person in the same role inherits.

**Outside the wiki**

- Alan Cooper, *The Inmates Are Running the Asylum* (1999). The argument for persona-driven design: each user's app reflects the goals, mental model, and workflow of that specific person.
- Bret Victor, "Magic Ink" (2006). The case for surfaces that show the user the right thing for the moment they are in. Role-scoped views are this principle applied to the agentic layer.
