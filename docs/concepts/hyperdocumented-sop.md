---
title: Hyperdocumented SOP
slug: /concepts/hyperdocumented-sop
description: "An SOP documented for double duty: a human can follow it and an agent can execute it. The unit of workflow documentation that makes progressive automation possible. Awareness page; the canonical standard lives on the truth-management wiki."
---

# Hyperdocumented SOP

*A hyperdocumented SOP (HDSOP) is a standard operating procedure documented for double duty: a human can follow it and an agent can execute it. Branch-explicit, metadata-rich, cross-linked, and structured so its repeatable stretches can be crystallized into skills.*

---

A traditional SOP is prose written for a person. In agentic work that is no longer enough, because the SOP is also the substrate an agent reads, follows, and extracts automation from. The **HDSOP** is the upgrade: one document that teaches a human and programs an agent, and that doubles as a standing inventory of automation opportunities.

The canonical standard (the five axes, the page anatomy, the separation-of-concerns rules, the writing recipe) lives on the truth-management wiki: [Documenting a Hyperdocumented SOP](https://truthmanagement.wiki/playbooks/documenting-a-hyperdocumented-sop), with a full production map published as a [worked example](https://truthmanagement.wiki/playbooks/example-hdsop-the-conversation-pipeline). Two conventions from the standard are worth carrying in your head:

- **Steps say what happens; the flowchart says who.** The procedure reads actor-free, and the flowchart color-codes each node as irreducibly human or agent-executed. The picture shows at a glance how much of the process is machine and how little is judgment.
- **Map versus machine.** An HDSOP is process truth (the map); a skill is packaged agent capability (a machine that automates stretches of the map). The distinction is not human-versus-agent: both can involve an agent, and both can pause for a human. You document the process first, prove the map against reality, then quarry skills out of the proven stretches. You do not automate a process you have not mapped.

## Why the applied-AI practitioner cares

The HDSOP is the working unit of [Progressive Automation Is the Job](/perspectives/progressive-automation-is-the-job). Run [Workflow decomposition](/playbooks/workflow-decomposition) to find the workflows and their automatable steps; write each workflow up as an HDSOP; then automate the repeatable stretches one at a time. The map is valuable even before any automation ships: it trains new people, survives the operator's absence, and makes the business legible to an acquirer.

Scaled to a whole business, this becomes the [Hyperdocumentation Protocol](https://truthmanagement.wiki/concepts/hyperdocumentation-protocol): a version-controlled repository housing every critical workflow as an HDSOP, with a coverage map tracking how much of the business is documented and how much is automated. A forkable workspace template ships at [SupersuitUp/hyperdocumentation-protocol-template](https://github.com/SupersuitUp/hyperdocumentation-protocol-template).

## Further Reading

- [Progressive Automation Is the Job](/perspectives/progressive-automation-is-the-job): the posture the HDSOP operationalizes.
- [Workflow decomposition](/playbooks/workflow-decomposition): how to find and classify the steps the map captures.
- [Skill Files](/concepts/skill-files): what gets quarried out of a proven map.
- [Convert Business Logic to AI System](/concepts/convert-business-logic-to-ai-system): the engagement meta-pattern the HDSOP feeds.
- [Compounding Docs](/concepts/compounding-docs): why documentation like this gains value with use.
