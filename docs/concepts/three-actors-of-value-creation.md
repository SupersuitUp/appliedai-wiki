---
title: "The Three Actors of Value Creation"
slug: /concepts/three-actors-of-value-creation
description: "Engineering value now comes from three actors: engineers, agents, and code. The craft is placing each in the right node. Ranked by reliability it goes code, then engineers, then agents, and code is the one everyone forgets."
---

# The Three Actors of Value Creation

*Engineering value now comes from three actors: engineers, agents, and code. The craft of agentic engineering is knowing when and where to place each.*

---

## The three actors

Every piece of engineering work now gets done by some mix of three actors:

- **Engineers.** Human judgment, taste, planning, and validation.
- **Agents.** Models in a harness that decide their own path through a task.
- **Code.** Deterministic scripts that run the same way every time.

The whole game of composing an [AI developer workflow](/concepts/ai-developer-workflow) is placement: deciding which actor owns which node, at the right time, for the right price and speed.

## Code is the unsung hero

The industry talks about agents constantly and prices engineers carefully, and then forgets the third actor entirely. Code is the one that quietly does the most reliable work in the system.

Code runs the same way every time unless you tell it not to. It never hallucinates. It costs zero tokens. It moves at the speed of light. When someone reaches for an agent to do string formatting, ticket routing, or a file rename, they are spending money, latency, and reliability to buy nondeterminism they did not want. The correction is simple: when the transformation is genuinely fixed, use code.

## The reliability ranking

Ranked most reliable first: **code, then engineers, then agents.**

That ordering is the opposite of where most attention goes, and it is why so much agentic work is fragile. Agents are the least predictable actor by construction, because their value is that they decide their own path. So the design instinct should be to shrink the agent's footprint to the nodes that genuinely need judgment, wrap it in deterministic code on both sides, and keep the human at the two ends where taste and validation live.

This does not mean use fewer agents everywhere. It means stop over-leveraging on agents out of reflex. Agents plus code beats either alone: the agent handles the unpredictable middle, the code handles everything fixed, and the combination is faster, cheaper, and more reliable than an all-agent pipeline. See [sometimes the workflow step should be an agent](/perspectives/sometimes-the-workflow-step-should-be-an-agent) for the per-node version of this call.

## Why this is the fundamental

Master the fundamentals and you master the compositions. Once you see every workflow as a placement problem across three actors, the advanced patterns (parallel sandboxes, specialized agent experts, routers, the whole software factory) stop looking like magic. They are just three actors arranged well, over and over, at larger and larger scale.

## Sources

Developed from IndyDevDan's "three actors of value creation" framing, July 2026.

- Field note: [IndyDevDan: forget loop engineering, build AI developer workflows](/note-sharers/indydevdan/2026-07-18-ai-developer-workflows).

The three-actors framing and the code-as-unsung-hero point are his.

## Further Reading

- [AI Developer Workflow](/concepts/ai-developer-workflow): the composition these three actors get placed into.
- [Sometimes the Workflow Step Should Be an Agent](/perspectives/sometimes-the-workflow-step-should-be-an-agent): the per-node call versus agent versus code decision.
- [Harness Engineering](/disciplines/harness-engineering): the discipline of the code wrapped around the agent.
- [Humans at the Edges](/perspectives/humans-at-the-edges): where the engineer actor sits in a mature workflow.
