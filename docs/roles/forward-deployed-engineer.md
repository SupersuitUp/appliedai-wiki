---
title: "Forward Deployed Engineer"
slug: /roles/forward-deployed-engineer
description: "The Palantir-coined seat that turns commoditized intelligence into working systems inside one company's messy reality. The rare person who is genuinely excellent at both the business and the code, not the average of the two."
---

# Forward Deployed Engineer

*The seat that turns commoditized intelligence into working systems inside one company's specific reality. Genuinely excellent at both the business and the code, not the average of the two.*

---

The Forward Deployed Engineer (FDE) is the role Palantir popularized: an engineer who embeds inside a client, learns how the work actually happens, decides where intelligence belongs, and builds the deployed system end to end. It is consulting for the software age, and in the AI age it has become one of the best-paid seats in technology. Reported compensation runs from a $150K base with heavy equity to as high as a reported $1M a year. The reason is scarcity: the role demands two skill sets that rarely live in one person.

The wiki's generic name for the client-facing builder is the [Applied AI Consultant](/roles/applied-ai-consultant). The FDE is the sharpest, most demanding version of that shape, carrying a specific industry lineage and a specific bar.

## Why the seat exists now

Every company can buy the same frontier intelligence. Walk into fifty enterprises and they run the same stack. If everyone taps the same models, intelligence is no longer the moat. The advantage moved to **deployment**: the bridge between general intelligence and one company's specific processes, politics, and exceptions. See [Intelligence Is Commoditized, Deployment Is the Moat](/perspectives/intelligence-is-commoditized-deployment-is-the-moat) for the full argument. The FDE is the person who builds that bridge.

## What they do: three stages

**1. Understand the business reality.** How the work actually happens today, which is almost never the documented process. "An email arrives" is really 40-plus senders, no two formatted alike, data buried in PDFs and forwarded threads, half of them exceptions, and the true routing logic living in one person's head. This is where the bulk of the time goes, and where technical people most often fail, because they assume the software is the point and skip the mess. The best FDEs embed on site. An hour-long meeting gets you the sanitized version of a job; a full day beside someone gets you the exceptions nobody wrote down and the relationship that surfaces them.

**2. FDE judgment: where does intelligence belong, and where does it not.** The scarce skill. Of a 10-step workflow, perhaps three steps need genuine judgment and get routed to a model. The rest is deterministic code and API calls. Some workflows should not be touched by AI at all: too risky, too low ROI, or already automated. Drawing that line correctly is the [judgment line](/perspectives/the-judgment-line) applied at the altitude of a whole business, and it is the heart of the role. Most companies are best served by majority deterministic software, model judgment where it earns its place, and a human approval gate ([default to determinism](/perspectives/default-to-determinism)).

**3. Build and deploy the system.** This varies wildly. Some FDEs write production code; others compose workflows on top of a platform. Either way they own it in production: when it breaks, it is their name on the line. The build has three parts of its own: audit the workflow, build the eval suite that proves the system behaves, and deploy with both client hand-holding and hard monitoring of KPIs and SLAs.

## The million-dollar combination

The FDE is the person who is both the best communicator and the best engineer, not the average of the two. Consultants (the McKinsey, BCG, and Bain engagement managers) own the business side: workflows, cost, incentives, risk, adoption, and internal politics. Software engineers own the technical side: models, systems, APIs, evals, guardrails, harnesses, and fine-tuning. The FDE is genuinely excellent at both sides and can move information between them. Put another way: someone who understands both art and science and can speak each fluently. That is the combination that clears $1M, and the reason it is rare is that people strong on one side are usually only passable on the other.

## How the work is structured

An FDE engagement runs a loop: **audit, then eval, then deployment**, over and over. The audit maps the real workflows, the exceptions, and an ROI matrix of what is worth automating versus what is not. Evals turn non-deterministic behavior into evidence. Deployment integrates with what already exists rather than forcing a migration, and scales from shadow mode to increasing autonomy to production. Improving one workflow makes the next one obvious, because organizational bottlenecks are interconnected. Related craft and playbooks:

- [Audit to Sprint to Deployment](/playbooks/audit-to-sprint-to-deployment) for the FDE engagement loop.
- [First Eval Harness](/playbooks/first-eval-harness) for stage-two evidence.
- [Evals](/disciplines/evals) and [Harness Engineering](/disciplines/harness-engineering) for the technical craft the role demands.
- [Progressive Automation Is the Job](/perspectives/progressive-automation-is-the-job) for the shadow-mode-to-production ramp.

## The three buckets they are measured on

Every system an FDE ships is judged on three things and nothing else: **revenue uplift, risk mitigation, and cost savings**. A working agent that cannot be tied to one of those buckets does not survive a performance review, and neither does the person who built it.

## How to become one

Voss (Veric Agents) frames a 30-day on-ramp of doing the job before you have the title: build an agent that completes one real back-office loop (week one), make it recover from the ways it goes wrong (week two), make it measurable and economical (week three), then defend it as both an engineer and a VP and pitch it to real businesses (week four). On day 30 you both understand the work and hold evidence that you can do it, which is what earns the first engagement. Full write-up in the field note below.

## Sources

- [Greg Isenberg: the Forward Deployed Engineer, the $1M AI job](/note-sharers/greg-isenberg/2026-07-20-forward-deployed-engineer) (Voss of Veric Agents, 2026-07-20).

## Further Reading

- [Applied AI Consultant](/roles/applied-ai-consultant) for the wiki's generic name for the client-facing builder.
- [AI Enablement Architect](/roles/ai-enablement-architect) for the adjacent seat focused on org-wide capability.
- [Intelligence Is Commoditized, Deployment Is the Moat](/perspectives/intelligence-is-commoditized-deployment-is-the-moat) for why this seat exists now.
