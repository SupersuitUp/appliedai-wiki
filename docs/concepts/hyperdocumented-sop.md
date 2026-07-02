---
title: Hyperdocumented SOP
slug: /concepts/hyperdocumented-sop
description: "An SOP documented for double duty: a human can follow it and an agent can execute it. Branch-explicit, metadata-rich, cross-linked, and structured so its repeatable stretches can be crystallized into skills. The unit of workflow documentation that makes progressive automation possible."
---

# Hyperdocumented SOP

*A hyperdocumented SOP (HDSOP) is a standard operating procedure documented for double duty: a human can follow it and an agent can execute it. Branch-explicit, metadata-rich, cross-linked, and structured so its repeatable stretches can be crystallized into skills.*

---

A traditional SOP is prose written for a person. In agentic work that is no longer enough, because the SOP is also the substrate an agent reads, follows, and extracts automation from. The **HDSOP** is the upgrade: one document that teaches a human and programs an agent, and that doubles as a standing inventory of automation opportunities.

## The five axes

What separates an HDSOP from ordinary SOP prose:

1. **Dual-readable.** A human can follow it and an agent can execute it.
2. **Branch-explicit.** Every decision point is drawn as a flowchart, not buried in paragraphs.
3. **Metadata-rich.** Machine-readable frontmatter: frequency, time per run, automation potential, related skills.
4. **Cross-linked.** Wired to the references and sibling processes it depends on, not standalone.
5. **Skill-extractable.** An agent can read it and crystallize its repeatable branches into [skill files](/concepts/skill-files).

One convention carries most of the value: **steps say what happens; the flowchart says who.** The procedure reads actor-free, and the flowchart color-codes each node as irreducibly human or agent-executed. The picture then shows at a glance how much of the process is machine and how little is judgment, which is the most honest view of a workflow you can produce.

## Map versus machine

An HDSOP is not a skill. A skill is a packaged, auto-invocable unit of agent capability; the HDSOP is process truth, the canonical map of how the work actually runs. The map is the doctrine; skills are machines that automate stretches of the map. You document the process first, prove the map against reality (the drafted map will be confidently wrong in places, and only the operator knows the real shape), and then quarry skills out of the proven stretches. You do not automate a process you have not mapped.

## Why the applied-AI practitioner cares

The HDSOP is the working unit of [Progressive Automation Is the Job](/perspectives/progressive-automation-is-the-job). Run [Workflow decomposition](/playbooks/workflow-decomposition) to find the workflows and their automatable steps; write each workflow up as an HDSOP; then automate the repeatable stretches one at a time. The map is valuable even before any automation ships: it trains new people, survives the operator's absence, and makes the business legible to an acquirer.

Scaled to a whole business, this becomes the **Hyper Documentation Protocol**: a version-controlled repository housing every critical workflow as an HDSOP, with a coverage map tracking how much of the business is documented and how much is automated. The canonical treatment, the documentation standard, and a forkable workspace template live on the truth-management wiki: [Hyper Documentation Protocol](https://truthmanagement.wiki/concepts/hyper-documentation-protocol) and [Documenting a Hyperdocumented SOP](https://truthmanagement.wiki/playbooks/documenting-a-hyperdocumented-sop).

## Further Reading

- [Progressive Automation Is the Job](/perspectives/progressive-automation-is-the-job): the posture the HDSOP operationalizes.
- [Workflow decomposition](/playbooks/workflow-decomposition): how to find and classify the steps the map captures.
- [Skill Files](/concepts/skill-files): what gets quarried out of a proven map.
- [Convert Business Logic to AI System](/concepts/convert-business-logic-to-ai-system): the engagement meta-pattern the HDSOP feeds.
- [Compounding Docs](/concepts/compounding-docs): why documentation like this gains value with use.
