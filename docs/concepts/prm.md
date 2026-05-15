---
title: "PRM (Personal Relationship Management)"
slug: /concepts/prm
description: "The relationship layer of your agent harness. One file per person who matters. Transcripts per conversation. Strategic documents per move. All cross-referenced."
---

# PRM (Personal Relationship Management)

*The relationship layer of your agent harness. One file per person who matters. Transcripts per conversation. Strategic documents per move. All cross-referenced so your agent knows who is who in your life, what you are building with them, and where things stand.*

---

## What it is

PRM is the practice of keeping the truth about your relationships in files on your computer, inside your agent's workspace, so your agent can read them the same way it reads everything else.

It is not a CRM. A CRM tracks a sales pipeline toward a transaction. PRM tracks the relationships that matter to your whole life. Your customers, your investors, your collaborators, your mentors, your kids' teachers, your vendors, your closest friends, your key connectors. Anyone whose context you need on tap to show up well.

It is three file types, living side by side in your workspace.

---

## The three file types

### 1. Relationship dossiers (`people/*.md`)

One file per person. Stable identity, evolving context. The anchor the rest of PRM hangs off of.

What goes in a dossier:

- **Who they are.** Name, role, organization, location, how they identify themselves professionally.
- **How you met.** The introduction event and the person who connected you.
- **What you are building together** (if anything). Current project, current stage, next step.
- **Their ambitions, constraints, and preferences.** What they are trying to do with their life. What they do not tolerate. How they want to be communicated with.
- **Your judgment on the relationship.** Where it stands, what stage it is in, what you think the next move is. This is your private analytical layer; it is what makes the dossier actually useful for priming future prompts.
- **Personal humanizing details.** Kids' names, birthdays, hobbies, the thing they mentioned they were excited about last time. People remember that you remember.
- **Pointers into the rest of PRM.** Links to recent transcripts, relevant artifacts, ongoing deals.

What does not go in:

- Quickly-stale tactical details (those belong in transcripts or artifacts, not the identity layer).
- Sensitive gossip that would harm someone if the file were exposed. Assume a dossier could be read by the person it is about.
- Information that is not yours to have.

### 2. Transcripts (`meeting-transcripts/*.md`)

Raw conversations, dated, one per meeting. Your agent processes these back into the relevant dossiers and artifacts.

Naming convention: `YYYY-MM-DD_<audience>_<short-title>.md`. Example: `2026-04-10_sarah-chen-followup.md`.

Where they come from:

- [Granola](https://granola.ai), Otter, or other meeting-transcription tools
- Voice memos that you transcribed
- Rough notes you typed up after the fact
- iMessage threads (via sync skills)

The point of keeping the transcript is not the transcript. The point is that your agent can re-read the conversation and update the dossier, draft a follow-up, or reference a specific quote in a future artifact.

### 3. Strategic documents (`artifacts/*.md`)

Plans, proposals, decision records, strategy docs that reference specific people and relationships.

Examples: `2026-04-18_acme-partnership-proposal.md`, `2026-03-15_joint-venture-thesis.md`, `2026-04-12_who-to-hire-head-of-ops.md`.

Artifacts link back to dossiers ("see `people/sarah-chen.md`"). Dossiers link forward to artifacts ("current deal tracked in `artifacts/2026-04-18_acme-partnership-proposal.md`").

---

## How the three types compound

The files are not independent. They interact in a loop.

**A new conversation happens.** You record a transcript.

→ Your agent reads the transcript and updates the relevant dossiers (what Sarah now cares about, what Acme's next priority is, who was new in the room).

→ The transcript may surface a new strategic question, which becomes an artifact (a proposal, a decision doc, a pressure-test of a plan).

→ The artifact references the dossiers it depends on, and the dossiers link to the artifact so future you can find the context.

→ The next time you are about to meet Sarah, you prime a prompt with her dossier plus the recent transcripts plus the current artifact. You walk in prepared in a way that would be impossible without PRM.

Each loop adds one more file. Over a year, that is hundreds of files. Over three years, thousands. The compounding is the whole point.

---

## First principles

### Relationships are the highest-leverage asset in your life

People decide to help you, or not, in moments you usually do not see coming. Your ability to show up prepared for those moments is the difference between the opportunity landing and the opportunity not landing. PRM is the infrastructure that makes preparation cheap.

### Memory fades. The truth lives in the files.

You will not remember what Sarah said three months ago about her legal timeline. Your agent will, if you wrote it down. The truth in your head is not the truth. The truth is what your agent can read.

### Your agent is only as helpful as the relationship context it has

Ask your agent to draft an email to Mark with zero context and you will get generic slop. Drag in Mark's dossier, the last three transcripts, and the artifact describing the deal you are trying to close with him, and your agent produces something in your voice, on-target for this specific relationship at this specific moment. Same model, different output, because of PRM.

### Compound over years, not weeks

Week one of PRM feels thin. "I have six dossiers and three transcripts." Month three, the system starts talking back to you: your agent references a quote from a meeting you forgot about, in a draft of a proposal for someone you met at that meeting. Year two, the compounding is obvious to everyone around you.

### Ownership matters

These files live on your computer, backed up to your GitHub. You own the relationship graph. If your agent harness changes, if a vendor dies, if you switch tools, you take your PRM with you. That sovereignty is part of why it compounds: nothing interrupts the accumulation.

---

## How to start

You do not need to document everyone on day one. Start with the five to ten people whose context you wish your agent had right now.

1. **Voice-dump a quick dossier per person.** Five minutes each. Who they are, how you met, what you are working on together, anything important you want to remember. Save each to `people/<name>.md`. Imperfect is fine. You will refine over time.
2. **Start capturing transcripts for meaningful meetings.** Install [Granola](https://granola.ai) or whatever your preferred transcription tool is. Drop the raw output into `meeting-transcripts/` after each meeting. Your agent can clean and process it.
3. **After each transcript, ask your agent to update the relevant dossiers.** One sentence prompt: "Process this transcript and update the dossiers for everyone involved." Done in 30 seconds.
4. **When you start a real strategic project involving specific people, make the artifact file.** Reference the relevant dossiers. Let the artifact live alongside them in your workspace.

At that point you have a running PRM. The rest is just repetition.

---

## The superpower move

Before any meaningful meeting (partner call, investor conversation, hiring decision, family conflict, hard conversation with a friend), open your agent and say:

> I have a call with `<person>` in 30 minutes. Read their dossier, the last three transcripts we had, and any current artifacts involving them. Brief me on where we are, what I said I would do, what they said they would do, and what I should be paying attention to in this conversation.

You arrive at that call primed in a way that the other person can feel. You remember their kid's name. You remember the concern they raised last time. You come in with a move that addresses it. That level of presence is rare. PRM makes it repeatable.

---

## What PRM is not

- Not a CRM. CRMs track pipelines toward transactions. PRM tracks relationships for their own sake.
- Not a social graph. You are not modeling a network. You are documenting the people whose context you specifically need on tap.
- Not a contact list. A contact list holds phone numbers. A dossier holds context, judgment, history, and next moves.
- Not surveillance. You only keep what serves showing up well for the person. Sensitive gossip does not belong here.

---

## Further Reading

- [Agentic Relationship Management](/disciplines/agentic-relationship-management): the active practice on top of PRM. Build-out, automated capture, activation prompts. The reason PRM exists.
- [Truth Management](/disciplines/truth-management): the broader discipline of keeping documented reality aligned with what is actually true. PRM is one slice of it.
