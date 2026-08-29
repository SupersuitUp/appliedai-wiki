---
title: Agent Experience
description: "Designing the environment an agent works in, its files, names, folders, and frontmatter, so it spends its budget producing instead of searching. Most of the work in the world is about to be done by agents, which makes this most of experience design."
image: "/img/comics/agent-experience.webp"
---

# Agent Experience

*Designing the environment an agent works in, its files, names, folders, and frontmatter, so it spends its budget producing instead of searching. Most of the work in the world is about to be done by agents, which makes this most of experience design.*

![Titled three-panel strip, AGENT EXPERIENCE. One, THE COLD ARRIVAL: a gray-haired man gives his glowing amber laptop a task while inside the glow a small agent faces a chaotic heap of unlabeled pages. Two, SEARCHING IS THE TAX: the agent is waist-deep in the heap holding a wrong page, the man outside waiting by a clock. Three, STRUCTURE IS THE REBATE: a tidy shelf of dated files inside the glow, the agent already working with the one right file, a finished page emerging. Footer: THE AGENT IS A USER. DESIGN FOR IT.](/img/comics/agent-experience.webp)

---

## The user nobody designs for

Every workspace has two kinds of user now. The human, who built the mess and forgives it because they remember where things are. And the agent, who arrives cold on every run, remembers nothing it is not handed, and pays for every wrong turn out of a finite budget of context and tool calls. The industry is settling on a name for designing around the second user: **Agent Experience (AX)**, with Anthropic's "agent-computer interface" naming the machine-facing equivalent of a GUI.

The stakes are set by the ratio. The vast majority of the work done in your operation is shifting to agents, which means the environment they navigate is the interface where most work actually happens. UX for the screens people touch keeps mattering; AX is the same discipline aimed at where the volume went.

## Search is the tax, and structure is the rebate

An agent given a task spends its first minutes answering one question: *where is the thing I need?* Every tool call spent answering it is budget not spent producing, and worse, each search fills the context window with directory listings and wrong files, so the agent arrives at the real work with less room to think. [Context searching](/concepts/context-searching) covers the retrieval mechanics; AX is the upstream act of building an environment where retrieval is short because the structure already answers the question.

## The practical ontology

Nothing here is exotic. It is library discipline, applied where agents live:

- **Dated, self-describing names.** An artifact carrying its creation moment in the name (`2026-08-07-14-32-lamis-debrief.md`) sorts itself chronologically, answers "which is current" unopened, and lets an agent construct paths instead of searching for them. Stable IDs for anything recurring do the same job: the perfect search is the one that never happens.
- **Folders that say what they hold, and few of them.** Every hierarchy level is a decision the agent makes with incomplete information. Shallow trees with self-describing names beat deep taxonomies that made sense only to their author.
- **Frontmatter that answers the first three questions.** What is this, when is it from, what does it relate to. An agent that reads those in the first lines never opens the wrong file all the way, and cross-file work becomes a grep over heads instead of a read over bodies.
- **Documented AND self-explanatory.** The structure should be intuitive enough that a cold agent's first guess is right, and documented so the structure survives its authors. If the layout needs the manual to be usable, the layout is wrong; the manual confirms, it does not rescue.

The measurable test: drop a fresh agent in with a real task and count tool calls until it touches the right file. That number is your AX score, and it is worth watching the way web teams watch page-load time, because it is the same number one layer up.

## The compounding effect

Good AX is what lets a knowledge base actually compound. [Compounding docs](/concepts/compounding-docs) only compound if agents reliably find and update them; a corpus that costs eleven hops gets bypassed, and a bypassed corpus quietly dies. The same logic that makes [your product agent-accessible](/concepts/agent-accessible-products) on the outside applies to your own workspace on the inside: the counterparty most likely to read any file you write today is an agent, so write and file it for that reader.

## Further Reading

- [Context Searching](/concepts/context-searching): the runtime retrieval this page shortens
- [Compounding Docs](/concepts/compounding-docs): what good AX lets a corpus become
- [Agent-Accessible Products](/concepts/agent-accessible-products): the same principle, pointed outward
- [Hyperdocumented SOP](/concepts/hyperdocumented-sop): the workflow-level version of legibility
