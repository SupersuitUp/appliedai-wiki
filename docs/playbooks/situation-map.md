---
title: "Situation map"
slug: /playbooks/situation-map
description: "Map your current operational reality in enough detail that an implementer can actually help you, before you scope a pilot."
---

# Situation map

*Most business owners skip this step. It's the single most common reason applied AI projects disappoint.*

---

## When to run this

You've taken the [quick check](/playbooks/business-owner-quick-check) and you're ready to do the real work. This is where you map your current situation in enough detail that an implementer can actually help you.

There is an extensive amount of situation and system assessing that needs to happen before you even know what to build. **This is best done as a conversation, not a form.** Most business owners find it much easier to walk through these questions with an implementer in a 30-minute call than to fill them out alone. The questions below are the agenda for that conversation. You can review them in advance, or use them on your own if you prefer.

---

## 0. Start with your bottlenecks

Before diving into the detailed mapping below, take five minutes and list your top operational bottlenecks. Don't think about AI yet. Just think about problems.

- Where are humans doing repetitive work?
- Where are errors expensive?
- Where is scale limited by headcount?

This list is your starting point. Pick the one that hurts the most and map it below.

---

## From roles to workflows

The most common mistake business owners make when thinking about AI is thinking in terms of roles: "I need to hire an editor," "I need a social media manager." The shift you need to make is from **role-based thinking to workflow-based thinking.**

That editor you want to hire? They actually do 16 discrete activities. Each of those activities exists within a workflow. And each workflow can be decomposed, optimized, and (increasingly) automated.

> "Instead of saying 'I need to hire an editor,' you say: I need an agent that just does *this*, and an agent that just does *this*, and an agent that just does *this*."

**How to decompose a role into workflows:**

1. **Start big.** List the 4 to 6 major things this role does (e.g., idea research, scripting, shooting, editing, posting).
2. **Go one level deeper.** Under each, list the 6 to 7 actual actions (e.g., "check what performed well last week," "cross-reference with topics I'm good at," "draft a 7-step outline").
3. **Keep reducing.** Each action becomes 2 to 3 sub-actions until you can't break it down further.
4. **That's what you automate.** The irreducible actions are your automation targets.

The goal is to draw your entire business as one linear workflow, from first customer touchpoint to final delivery. If you can't draw it, you don't fully understand your business yet. And if you don't understand it, neither will an AI.

See also: [Workflow decomposition](/playbooks/workflow-decomposition).

---

## 1. The current workflow

Map how that area actually works today. Walk through it step by step.

"We process invoices" is not useful. "Sarah opens the email, downloads the PDF, types the line items into QuickBooks, then emails the vendor a confirmation" is useful.

**What are the steps?** (Brief bullet points.)

**Who performs each step?**

**What tools or systems are involved?**

**Where do things slow down, break, or require judgment calls?**

**How long does it take end to end?**

**How often does it run?** (Daily, weekly, per patient, per transaction, etc.)

If you can't map your workflow, that's a finding. Many business owners discover they haven't documented their SOPs yet. That mapping needs to happen before anything else.

---

## 2. The data

**What information exists that's relevant to this workflow?**

- Where does it live? (Spreadsheets, databases, email threads, PDFs, someone's head.)
- Is it structured or unstructured? (A clean spreadsheet vs. a folder of scanned documents.)
- How current is it? (Updated daily? Last touched in 2023?)
- Can it be exported? (Some vendor systems lock data behind proprietary formats.)

If you can't answer these questions, it means data infrastructure work needs to happen before any AI work can begin.

---

## 3. The team

**Who would own this if it worked?**

- Is there a specific person who would manage the AI-assisted workflow day to day?
- Does that person have time and willingness to learn a new way of working?
- Is there someone technical on your team (even lightly technical) who could troubleshoot basic issues?

If the answer to "who owns this" is unclear, that's the first thing to solve. AI tools without an owner become shelfware.

---

## 4. Gaps

Based on your answers, check any that apply:

- [ ] **Process gap**: the workflow isn't clearly defined or documented.
- [ ] **Data gap**: the information exists but isn't accessible, clean, or organized.
- [ ] **Ownership gap**: nobody has been designated to own the AI-assisted process.
- [ ] **Buy-in gap**: key decision-makers haven't agreed this is worth pursuing.
- [ ] **Technical gap**: systems don't support integration or data export.

Each gap is a to-do item, not a blocker. But they need to be resolved before the AI work begins, not discovered mid-project.

**If you have no gaps:** Move to the [pilot scope](/playbooks/pilot-scope). You're ready to scope.

**If you have 1 to 2 gaps:** You can likely close these quickly. Consider a guided consultation to help.

**If you have 3 or more gaps:** There's foundational work to do first. That's valuable to know. It saves you from a premature engagement that frustrates everyone.

## Further Reading

- [Quick check](/playbooks/business-owner-quick-check). The two-minute filter that precedes this map.
- [Workflow decomposition](/playbooks/workflow-decomposition). How to break a role into automatable actions.
- [Pilot scope](/playbooks/pilot-scope). The next document you produce after this map.
