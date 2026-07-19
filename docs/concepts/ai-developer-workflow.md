---
title: "AI Developer Workflow"
slug: /concepts/ai-developer-workflow
description: "The real unit of agentic engineering: a repeatable composition of engineers, agents, and code that runs a piece of work end to end. The loop is one node inside it. Composed up behind a router, many of them become a software factory."
---

# AI Developer Workflow

*The real unit of agentic engineering is not the loop. It is the workflow: a repeatable composition of engineers, agents, and code that carries a piece of work from prompt to shipped result.*

---

## The reframe

Much of the current agentic-coding discourse names the primitive the "loop." An agent runs, a check fails, the result routes back, the agent tries again. That is a loop, and it is real. But it is one node.

An **AI developer workflow (ADW)** is the whole thing: plan, build, test, review, merge, ship. Those are the steps a human engineer used to run by hand. Swap agents and code in for the steps, keep the human at the entry and the exit, and you have an ADW. The loop is the retry inside the test step. Calling the entire construct "loop engineering" is like calling a factory a "conveyor belt."

The tell that "loop" is too small: if a loop deserves its own -engineering, so does every other control-flow primitive. Condition engineering. Function engineering. Exception engineering. That list never ends, because these are all just the ordinary machinery of the software development life cycle. The workflow is the name that already covers them.

## Why the name matters

Naming is half the value. "Workflow" tells you what to design: the flow of information through a system of actors, with a clear beginning and end. "Loop" tells you to obsess over one retry mechanism and miss the routing, the parallelism, the specialization, and the human checkpoints that actually decide whether the work is good.

The workflow framing also travels. It is the same object as [the roles-to-workflows shift](/concepts/roles-to-workflows) at the org level and [workflow decomposition](/playbooks/workflow-decomposition) at the design level. You are drawing the business as a flow, then deciding which node is a human, which is a deterministic script, and which is a full agent.

## What an ADW is made of

Every ADW is a placement problem across [the three actors of value creation](/concepts/three-actors-of-value-creation): engineers, agents, and code. The craft is putting each in the right node.

- **The human holds the two ends.** Prompting (planning) and reviewing (validation) are the two constraints. See [humans at the edges](/perspectives/humans-at-the-edges).
- **Code holds the deterministic middle.** Linting, formatting, type-checking, test execution, ticket state changes, sandbox setup. Fast, reliable, zero token cost.
- **Agents hold the judgment-heavy middle.** Scouting the codebase, planning, building, resolving test failures. See [sometimes the workflow step should be an agent](/perspectives/sometimes-the-workflow-step-should-be-an-agent) for the per-node decision.

The discipline is keeping code and agents as separate nodes with clean interfaces, so each transition is testable and each guardrail is real. Burying a linter inside a skill is still your agent running it, which forfeits the reliability the deterministic node was there to provide.

## Scaling up: the software factory

Start with the simplest possible workflow, usually one agent you babysit while it lints its own code. Add nodes as real problems appear: a type checker, a test agent, a planning phase, isolated sandboxes so parallel agents do not collide.

Push it far enough and you get a **software factory**. A ticket lands (feature, bug, chore, hot fix). A router reads the codebase and picks the workflow that fits. A sandbox spins up. The work runs at a price and speed matched to the job: a chore gets one lightweight agent, a feature gets your best planners and scouts, a production hot fix races several sandboxes and takes the first correct fix. Done right, the factory operates the product better than the team could by hand, because the team's expertise has been templated into the fabric of the workflows.

This is what "building the system that builds the system" means in practice. The highest-leverage work moves off the app layer and onto the agentic layer: the agents, prompts, and skills that build the app on your behalf. That layer compounds across the whole organization.

## The tension with the loop

This wiki also documents [designing an AI loop](/playbooks/designing-an-ai-loop), which names the self-improving loop the unit of construction. Both hold, at different altitudes. A loop that learns (sensor, policy, tool, quality gate, learning mechanism) is one kind of ADW: the kind that improves itself between runs. The ADW is the broader container; the self-improving loop is the subclass worth building when the workflow should get better while you sleep. Reach for the loop framing when the goal is self-improvement, and the workflow framing when the goal is composing a full pipeline of humans, agents, and code.

## Sources

Developed from IndyDevDan's argument against "loop engineering," July 2026.

- Field note: [IndyDevDan: forget loop engineering, build AI developer workflows](/note-sharers/indydevdan/2026-07-18-ai-developer-workflows).

The three-actors framing and the software-factory picture are his. The reconciliation with the self-improving loop is ours.

## Further Reading

- [The Three Actors of Value Creation](/concepts/three-actors-of-value-creation): the engineers, agents, and code an ADW places.
- [Designing an AI Loop](/playbooks/designing-an-ai-loop): the self-improving subclass of workflow.
- [The Roles-to-Workflows Shift](/concepts/roles-to-workflows): the same move at the org level.
- [Workflow Decomposition](/playbooks/workflow-decomposition): draw the flow, then classify each node.
- [Sometimes the Workflow Step Should Be an Agent](/perspectives/sometimes-the-workflow-step-should-be-an-agent): the per-node call versus agent versus code decision.
- [Harness Engineering](/disciplines/harness-engineering): the craft of the code wrapped around each agent node.
