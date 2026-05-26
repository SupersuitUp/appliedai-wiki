---
title: Convert Business Logic to AI System
description: "The meta-pattern underneath almost every AI consulting engagement. Take the logic of the business, whether it's been written down or not, and convert it into an AI system. Naming the pattern changes how you scope, sell, price, and execute."
---

# Convert Business Logic to AI System

*The meta-pattern underneath almost every AI consulting engagement. Take the logic of the business and convert it into an AI system. Naming the pattern changes how you scope, sell, price, and execute.*

---

Devin Karns of Custom AI Studio puts it as a near-universal claim: "Ninety-seven percent of the projects we've done, when you really break it down fundamentally, what we are doing is just taking the logic of the business and converting it into an AI system." The frame is simple. The implications are not. Once you see every AI engagement through this lens, the things that distinguish good engagements from bad ones (scope, client fit, pricing, technical risk) all become legible.

## What the pattern is

Every business runs on logic. Some of it is explicit (SOPs, decision trees, eligibility criteria, escalation rules, approval thresholds). Most of it is implicit (operator judgment, accumulated experience, "we do it this way because"). An AI system is what you build when you extract that logic and re-render it in tools that can execute the logic at machine speed and machine volume.

The work is encoding, not invention. The AI consultant is not designing a new way to do customer support, sales qualification, refund handling, lead routing, or onboarding. The AI consultant is reading the existing way out of the client (and their SOPs, their dashboards, their tribal knowledge, their managers' heads) and re-rendering it as code.

## Three implications

### 1. The prerequisite is documented business logic

If the client cannot articulate the logic, the engagement either fails or quietly mutates into a discovery project. This is the structural reason [Mid-Markets Are the AI Sweet Spot](/foundations/mid-markets-are-the-ai-sweet-spot): mid-market companies have already written down their logic to onboard offshore teams, while SMBs have not yet. The first question on a sales call should not be "what AI do you want." It should be "show me your SOPs."

### 2. The technical work is bounded by the logic quality

Given clean logic, building the AI system that executes it is increasingly cheap. The model is good. The harness is good. Coding agents do most of the typing. What is not getting cheap is the upstream work of getting the logic right: interviewing the SME, asking the right disambiguating questions, surfacing the implicit cases, formalizing the decision tree. The bottleneck has moved from "can we build it" to "do we know what to build."

### 3. The expertise that matters is the interview, not the engineering

The AI consultant of 2026 is principally a business analyst who can also code. The differentiating skill is reading the logic out of the SME, including the parts the SME would not have thought to mention, and codifying it in a spec the model can execute against. This is what consultants have done for forty years. The AI consultant just has a cheaper execution layer behind them.

## What this changes about how you sell

When you stop pitching "I'll build you an AI agent" and start pitching "I'll take your existing logic and turn it into a system that runs it at scale," several things shift:

- **The discovery phase becomes the most valuable phase.** The blueprint deliverable from a [Workshop → Blueprint → Project → Partnership Engagement Ladder](/playbooks/workshop-blueprint-project-partnership-ladder) is worth more than the build, because it is what defines whether the build is viable.
- **You can charge for the discovery separately.** Custom AI Studio charges $15-35k for a blueprint, which is a discovery deliverable the client could take to any dev shop. The build is downstream.
- **You can refuse engagements that lack the prerequisite.** A client who cannot tell you what their refund logic actually is should not be sold an AI refund system. They should be sold an SOP-documentation project first, or referred elsewhere.

## What this changes about how you build

If the work is encoding documented logic, then the AI architecture pattern that follows is straightforward: deterministic workflows (the encoded logic) with LLM calls embedded where the logic genuinely requires judgment, reasoning, or unstructured-text handling. Most production AI systems are 70-90% deterministic plumbing wrapped around a few model calls. The temptation to build "agentic" systems with model-as-orchestrator is usually a misread of the engagement; the right architecture is harness-as-orchestrator with the model called as a specialized tool. This is the underlying logic of [The Case for Simple Harnesses](/perspectives/the-case-for-simple-harnesses).

## The worked case

Custom AI Studio's e-commerce engagement is the cleanest illustration. The client had a 21% refund rate on their flagship product. They had already mapped out the refund pushback logic as an SOP for their offshore customer support team. The team was not executing the logic consistently. The AI system was a faithful encoding of the SOP: customer requests refund, system evaluates eligibility against the decision tree, system either approves or runs the pushback script, system tracks outcome. Refund rate fell from 21% to 16%. The engagement worked because the logic existed before the engagement started.

A counterfactual SMB engagement (no documented SOP, founder makes refund calls case-by-case based on gut) would have produced a much smaller delta and a much harder build. The AI system would have been faking documented logic the business did not have, and the output would have looked like noise.

## Related patterns

- **Strategy is the new execution** ([/concepts/strategy-is-the-new-execution](/concepts/strategy-is-the-new-execution)). Once execution is cheap, the differentiator moves to whether you are executing the right thing. Converting business logic faithfully requires you to first confirm the business logic is worth converting.
- **You are the bottleneck** ([/concepts/you-are-the-bottleneck](/concepts/you-are-the-bottleneck)). The same operator who could not write down their logic is also the operator who will struggle to use the AI system once it exists. The encoding work has to upgrade the operator's clarity, not just the operator's tools.
- **The chat is not the product** ([/foundations/the-chat-is-not-the-product](/foundations/the-chat-is-not-the-product)). The AI system the encoded logic produces is not usually a chatbot. It is workflows, batch jobs, agents triggered by events, dashboards that compose model output. The chat is incidental.

## Sources

- [The Playbook for a $100M AI Agency](/note-sharers/custom-ai-studio/2026-05-25-playbook-for-100m-ai-agency): Devin Karns, Custom AI Studio, 2026-05-25. The 97% claim and the e-commerce worked example.

## Further Reading

- [Mid-Markets Are the AI Sweet Spot](/foundations/mid-markets-are-the-ai-sweet-spot): the client profile that has the documented logic prerequisite.
- [Workshop → Blueprint → Project → Partnership Engagement Ladder](/playbooks/workshop-blueprint-project-partnership-ladder): the engagement structure that separates discovery from build.
- [Strategy Is the New Execution](/concepts/strategy-is-the-new-execution): why the logic-defining work is now the high-value work.
- [The Case for Simple Harnesses](/perspectives/the-case-for-simple-harnesses): the architectural correlate of treating AI engagements as encoding work.
