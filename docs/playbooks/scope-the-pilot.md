---
title: "Pilot scope"
slug: /playbooks/pilot-scope
description: "Define the concrete bounded experiment that proves or disproves whether AI delivers real value for a specific part of the business."
---

# Pilot scope

*A pilot is not a proposal and not a wishlist. It is a concrete, bounded experiment that proves (or disproves) whether AI can deliver real value for a specific part of the business.*

---

## When to run this

You have done [workflow decomposition](/playbooks/workflow-decomposition) and identified a candidate workflow or action where AI looks like it could move a real number. Now you need to scope a focused first engagement that ships in 8 to 12 weeks and produces evidence you can decide on. Run this before any contract, statement of work, or build.

This playbook does not apply if the engagement is exploratory strategy, training, or culture work without a build component. It applies to pilots that produce a working AI system tied to a measurable outcome.

## Prerequisites

- A workflow map you trust (output of decomposition).
- The person with budget authority in the room or reachable in one step.
- The operator who owns the workflow day to day.
- Honest answers about data, process stability, and downside risk.

## Steps

1. **Run the honesty filter.** Before scoping anything, pressure-test the candidate problem:
   - **Is the data clean enough?** If the information the system needs is scattered across inboxes and someone's memory, you have a data problem to solve first, not an AI problem.
   - **Is the process stable?** If the workflow changes every month, automating it creates a maintenance burden, not savings.
   - **What is the cost of AI errors vs human errors?** Some domains (medical, financial, legal) have asymmetric downside. Factor that in before committing.
   - **Is there infrastructure to deploy and maintain the result?** Can the team actually run and maintain what gets built?

   Most candidate problems fail this filter. That is fine. You want the ones that pass.

2. **Write the one-sentence problem.** Not "we want to use AI." A specific, painful, measurable problem. Example: "Inbound leads sit unanswered for an average of 4 hours, and 70% never get a response within the day. We lose deals we should be winning."

3. **Quantify the cost today.** Time per week, dollars lost, errors made, delays caused. Rough estimates are fine. The point is to anchor the conversation in business reality, not in tool features.

4. **Define what success looks like in 30 days.** Pick one primary metric. Time saved, error rate reduced, revenue gained, throughput improved. If you cannot measure it, you cannot prove it worked, and you will not get budget for project two. Capture the baseline today. If the baseline is unknown, that is a fact worth surfacing.

5. **Map the technical environment.** Systems and tools involved (CRM, ERP, spreadsheets, email, proprietary software). Whether data can be exported (APIs, CSV, locked vendor platform). Compliance constraints (HIPAA, SOC 2, GDPR, financial regulations). Keep it tight.

6. **Name the people.** Day-to-day owner of the pilot. Approval authority if different. Affected operators and their adoption risk. Realistic team time per week.

7. **Set the constraints.** Budget range. Timeline target (8 to 12 weeks is the window for a real pilot; anything longer is a build dressed as a pilot). Deal-breakers the engineer must know up front (no cloud storage, must be self-hosted, cannot change the core workflow).

8. **Decide what happens after.** If the pilot succeeds, what is the next phase? If it fails, what was learned and what changes? Capture this before starting so the post-mortem has a frame.

## What good looks like at the end

- A one to three page document that names the specific problem, what it costs today, what success looks like, the environment, the people, the constraints, and the next phase.
- The operator, the approver, and the implementer all read it and agree this is the pilot.
- Anyone competent could pick it up cold and assess whether they can deliver it.

If those three are true, you have a real pilot scope. Everything else is filler.

## The shape of a pilot scope document

The format does not matter as much as the discipline of answering each question. A working template:

### 1. Company overview
Name. Industry. Size. What the company does in two sentences. Person leading this and their decision-making authority.

### 2. The problem the pilot solves
The specific, observed problem. What it costs today. Why this problem first.

### 3. What success looks like
The 30-day success state. The single primary metric. The baseline today. Who benefits most.

### 4. Technical environment
Systems involved. Data accessibility. Compliance constraints.

### 5. People and ownership
Day-to-day owner. Approver. Most-affected operators. Realistic team time per week.

### 6. Constraints and budget
Budget range. Timeline. Deal-breakers.

### 7. After the pilot
If it succeeds, the next move. If it fails, what changes.

## Common failure modes

- **Scope expansion in disguise.** "While we are at it, can it also do X?" is how a 10-week pilot becomes a 9-month build. Every additional ask is a separate pilot. Park it for project two.
- **Vague success metrics.** "We will see if it helps." If you cannot describe success in a sentence with a number, the pilot will not produce a decision. Pick one metric and a target.
- **Missing baseline.** Without a baseline, "improvement" is a claim, not evidence. If the baseline is unknown, the first week of the pilot measures it.
- **No approver in the room.** A pilot scoped with an operator but approved by an executive who was never in the conversation will get cut at the last meeting. Bring the approver in by step 5 at the latest.
- **Timeline longer than 12 weeks.** Beyond 12 weeks, the team loses urgency, the model landscape shifts, and the pilot becomes a project. Narrow the scope until 12 weeks fits.

## Supporting voices

- **Anonymous AI consultancy founder (2026-05-21):** "We do a three month POC. We go out and interview every single person that touches any function in the business. Then we scope out sort of AI transformation, then we can implement the transformation for them, likely within a subset of the team for them to utilize, get used to. And then after the POC is done and the ROI that comes from it, we do a year long engagement to where we roll out to everything." Same shape as this playbook, with the conversion mechanics treated as a structural feature, not a hope. The MBB firms use this exact structure to secure long contracts. [→ field note](/note-sharers/anonymous-ai-consultancy/2026-05-21-three-month-poc-pe-fund-cascade).

## Further Reading

- [Workflow decomposition](/playbooks/workflow-decomposition). The upstream playbook that produces the candidate problems.
- [Pilot pitch](/playbooks/pilot-pitch). The practitioner side of the same conversation.
- [Pricing](/playbooks/pricing). How to price the engagement once the scope is set.
- [Pilot to engagement](/playbooks/pilot-to-engagement). The conversion playbook for turning a paid POC into a year-long engagement.
