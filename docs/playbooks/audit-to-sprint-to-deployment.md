---
title: "Audit to Sprint to Deployment"
slug: /playbooks/audit-to-sprint-to-deployment
description: "The Forward Deployed Engineer's engagement loop: open with an audit that maps the real work and its ROI, prove behavior with evals, then deploy on top of existing systems. Improving one workflow makes the next one obvious, so the loop compounds."
---

# Audit to Sprint to Deployment

*The FDE engagement loop: audit the real work, prove behavior with evals, deploy on top of what exists. Then run it again, because fixing one workflow makes the next one obvious.*

---

This is the operational spine of [Forward Deployed Engineer](/roles/forward-deployed-engineer) work: a three-stage loop that repeats across a client, each pass making the next one cheaper. It exists because [intelligence is commoditized and the moat is deployment](/perspectives/intelligence-is-commoditized-deployment-is-the-moat): the value is in how well you map, prove, and land the system, not in which model you picked.

## Stage 1: The audit (the wedge)

Every engagement opens with an audit. You map the real workflows in a department: the full steps, the back-and-forth, the exception handling, and an ROI matrix of what is worth automating versus what is not. Then you show, concretely, how you would build the highest-ROI case and what it is worth.

The audit is the highest-leverage sale in the whole engagement. Clients have reported the audit alone was worth ten times what they paid, because AI is new enough that almost nobody has cleanly mapped their own operations against it. It also builds trust: it shows how you work, it lets you under-promise and over-deliver, and it gets the client's own creative juices flowing about use cases they had never considered.

**Rebrand it.** People have an allergic reaction to the word "audit" (they hear "tax audit"). One team renamed the same deliverable a **design sprint** and it sold materially better. Same medicine, easier to swallow. The point is the mapping, not the label.

**De-risk it to get in the door.** Early on, do the audit free, prove value, then get paid only when you deliver measured results. Your first few customers teach you more than you deliver to them, so they are worth more to you than you are to them. After two or three, you are far enough ahead to charge for the audit itself.

The audit's core discovery: **the documented process is never the real process.** "An email arrives" is really dozens of senders, no two formatted alike, data buried in PDFs and forwarded threads, half of them exceptions, and the true routing logic living in one person's head. You only surface that by sitting with the people who do the work. See [Document and Streamline Load-Bearing Workflows](/perspectives/document-and-streamline-load-bearing-workflows).

## Stage 2: Evals (turn non-determinism into evidence)

Before anything ships, prove the system behaves. Build a golden data set from the client's own history (past emails, past presentations, past decisions), define what "correct" means, and run the system against it. Produce an evaluation report: of 50 runs, 41 passed; of the 9 that failed, 5 had missing data and 4 pulled the wrong record. Then use that breakdown to improve the system.

For non-deterministic tasks (a presentation, a creative output) you will never reach a perfect eval, so you bake in a human-in-the-loop feedback mechanism that keeps improving the harness over time. See [First Eval Harness](/playbooks/first-eval-harness) and [Evals](/disciplines/evals) for the craft.

Route by safety: wherever the system is not safe to act autonomously, send it to a human. Most companies are best served by majority deterministic software, model judgment where it earns its place, and a human approval gate ([default to determinism](/perspectives/default-to-determinism)).

## Stage 3: Deployment (integrate, do not migrate)

Land the system inside the business, and do it by building on top of what already exists. If a client spent years and millions moving to an ERP, a pitch that starts with "move off it" gets you shown the door. Instead, build on top and integrate it with their existing stack. Then scale gradually: shadow mode, then increasing autonomy, then production. This is the [progressive automation](/perspectives/progressive-automation-is-the-job) ramp, and meeting the client in person makes it far easier to walk them along it.

Two disciplines make deployment stick:

- **Observability equals trust.** If you cannot show the client exactly what the agent did (logged traces, a full audit trail), they will never trust it. Solving this well puts you ahead. See [Observable Behavior Engineering](/disciplines/observable-behavior-engineering).
- **Help the buyer get promoted.** The person you pitch does not want to get fired; they want to get promoted, and involving you at all is a risk to them. De-risk it and tie the work to something they can point to at their next performance review. You do that by driving value cost-effectively, not by swapping one system for a marginally better one.

## The loop compounds

Measure every deployed system against the only three buckets that matter to a business: **revenue uplift, risk mitigation, and cost savings.** Then run the loop again. Bottlenecks are interconnected: improving one workflow frees something downstream and exposes the next constraint, so the second pass is clearer and cheaper than the first. You are not 10x-ing one workflow; over enough passes you are re-shaping the whole operation.

## Further Reading

- [Forward Deployed Engineer](/roles/forward-deployed-engineer) for the seat that runs this loop.
- [Pilot Scope](/playbooks/pilot-scope) and [Pilot to Engagement](/playbooks/pilot-to-engagement) for the adjacent pilot-shaped entry patterns.
- [AI Opportunity Radar](/playbooks/ai-opportunity-radar) for a complementary way to find the workflow worth rebuilding.
