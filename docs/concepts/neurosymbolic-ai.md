---
title: "Neurosymbolic AI"
slug: /concepts/neurosymbolic-ai
description: "Wiring a probabilistic neural model to a formal symbolic layer (an ontology, a rule set, a type system) so the parts that must be exact get checked by something that cannot hallucinate. The name for the architecture reliable agent systems keep converging on."
image: "/img/comics/neurosymbolic-ai.webp"
---

# Neurosymbolic AI

*Wiring a probabilistic neural model to a formal symbolic layer (an ontology, a rule set, a type system) so the parts that must be exact get checked by something that cannot hallucinate. The name for the architecture reliable agent systems keep converging on without knowing it has one.*

![Warm editorial plate: a glowing translucent orange holographic laptop sits on a wooden desk in soft daylight. Inside the screen face, two halves are wired together by a single luminous cable. On the left, the Chief of Agents, a small blocky orange mascot in an ornate gold admiral cap, stands inside a soft billowing cloud of loose half-formed shapes and holds out a blank slip of paper. On the right, a rigid geometric lattice of hard round nodes joined by straight ruled edges has swung shut like a gate directly in front of the slip, stopping it, and the node at the closed joint is ringed with light. Outside the laptop, on the real desk, an open notebook lies with the same lattice drawn by hand in pencil, one human hand resting calmly beside it.](/img/comics/neurosymbolic-ai.webp)

---

## Two lineages that finally converged

Most operators building agent systems in 2026 arrive at the same shape by trial and error: a model in the middle, hard checks around the edges. That shape has a name and a fifty-year history behind it, and knowing the name is worth something, because it tells you which prior art to steal from.

**Agents** come from the first lineage. The term artificial intelligence was coined at Dartmouth in 1956, and the people in that room (John McCarthy, Marvin Minsky, Oliver Selfridge) worked toward a construct that perceives, decides, and acts. That is the definition still in use.

**Ontologies** come from the second, and they are far older. Aristotle wanted a philosophy of being and produced categories of being, which is the direct ancestor of what a graph database does today. W. V. O. Quine formalized the question of what a theory commits you to existing. Tom Gruber gave the field its working definition in 1993, usually quoted as **a formal specification of a shared conceptualization**. That phrase is worth sitting with, because it is exactly what you are handing an agent when you do the work described in [Ontology as Substrate](/disciplines/ontology-as-substrate): your conceptualization of your domain, made explicit enough for a machine to hold you to it.

Both lineages hit a wall and both walls were scale. Symbolic AI had its commercial boom in the 1980s. Expert systems were going to be the whole game, companies raised on it, Japan launched a national program around it, and it collapsed into an AI winter because hand-authored rule bases could not scale. Neural networks were published in the 1960s and sat idle for the same reason, until GPUs built for video games turned out to be the missing hardware.

Now both scale. **Neurosymbolic AI** is the name for the join: neural networks tied into symbolic systems, which covers rule engines, type systems, reasoners, and the knowledge graphs most teams are assembling right now without calling them that.

## Hallucination is the generator, not the defect

The reason to reach for the symbolic half is not that the neural half is broken.

A language model returns the next token with a high probability. That is the whole mechanism, and the same mechanism produces both the useful output and the confident fabrication. Imagining things that do not exist and then treating them as real is not a bug that a better model release removes. It is what the generator is for.

The design consequence is direct: do not try to make the probabilistic component deterministic. Surround it. Put the imagination where imagination is the job, and put a component that cannot imagine anything in front of every claim that has to be exact. This is [the more capable the agent, the more guardrails it needs](/perspectives/capable-agents-need-more-guardrails) stated at the architectural level, and it is why [variance is the existential problem](/perspectives/variance-is-the-existential-problem) for anyone selling an outcome rather than a demo.

Loops sharpen the stakes. The Böhm-Jacopini result from 1966 established that sequence, conditionals, and iteration are together enough to compute anything computable. Agents had the first two for a while. Giving them loops completed the set, which is the real reason agentic systems feel like a capability change rather than a chat upgrade. It is also the reason they need rails: a loop can spin forever, a loop can drift as agents talk to each other, and a loop meters tokens the entire time it is going wrong.

## Where the symbolic layer sits in the loop

The useful formulation of the placement, from a talk on this at the AI Engineer conference:

> "Pydantic at the door, ontology at the ledger."

Two checks in two different places, doing two different jobs.

**Types at the door.** Before anything enters the loop, validate the shape. Field present, integer is an integer, enum is one of its permitted values. This is cheap, mechanical, and catches the class of failure where the model returned something structurally malformed. Pydantic is the Python instance of it; every language has one.

**Semantics at the ledger.** Before anything commits, validate the meaning against the domain model. Shape-valid and business-invalid are entirely different failures, and only the ontology catches the second one. A refund can be a perfectly well-formed refund object and still be the second refund issued on the same order.

Between them sits the rule that makes both checks worth having: **the agent stays free of side effects until validation passes.** An agent that writes to the database and then gets validated has already done the damage. Run the proposed action through the reasoner first, then commit. This is the same argument as [Recurring Work Belongs in Code](/perspectives/recurring-work-belongs-in-code), applied to the commit boundary rather than the cost curve.

## What a reasoner catches that a prompt cannot

The reason to encode constraints in a formal layer rather than in a well-written system prompt is that the formal layer derives consequences you never wrote down. RDFS and OWL, the mature vocabularies here, supply the primitives.

**Inference adds facts you did not state.** Declare that `teaches` has a domain of Teacher and a range of Student, and the single statement "Bob teaches Scooter" now also yields that Bob is a teacher, Bob is a person, and Scooter is a student. Declare `ancestor` transitive, and Sue being an ancestor of Mary and Mary of Ann gives you Sue and Ann for free. None of that was in the graph when you wrote it.

**Constraints catch what reads fine in English.** This is the part that matters for an operator, because each of these is a real production failure that a prompt tends to wave through:

| The failure | What catches it |
|---|---|
| A second refund issued against an order that was already refunded | A functional property, meaning at most one value permitted |
| A payout routed to the support desk instead of the buyer | Disjoint classes, meaning a customer and a support rep can never be the same entity |
| An order whose status comes back as "probably shipped" | An enumerated value set: paid, shipped, refunded, nothing else |

Each of those is trivially expressible as a formal constraint and genuinely hard to enforce in prose, because prose has no mechanism for refusing. A reasoner does. When the check fails, the loop has somewhere useful to go: back to the model with the specific violation, or to a human, per [in, on, and out of the loop](/concepts/in-on-out-of-the-loop).

## The operator's read

Three practical moves fall out of the framing.

**Name the architecture you are already building.** If you have an agent plus a schema plus a validator, you are doing neurosymbolic AI. Naming it gives you access to thirty years of prior work on the symbolic half, most of which is better than what you would invent this quarter.

**Do not author the ontology from scratch.** Substantial vocabularies already exist and are free: schema.org for general entities and relationships, FOAF for social graphs, Dublin Core for documents and publications, DBpedia for the structured extract of Wikipedia. Starting from one of these and extending it beats a blank file, and it makes your model legible to anything else that speaks the same vocabulary.

**Build it from both ends.** Top-down is the expert-systems method: get the domain experts in a room, enumerate the entities, properties, and relationships. That method is what failed to scale in the 1980s, so do not rely on it alone. Bottom-up is the complement: watch what actually shows up in customer interactions and real transactions, and attach the entities and relationships you observe. A graph takes an added property or relationship without a migration, which is precisely the rigidity that made relational tables the wrong home for a model you are still learning.

The expert-systems era was not wrong about the value of formal knowledge. It was wrong about being able to hand-author all of it. The model supplies what the expert systems could never scale to produce, and the symbolic layer supplies what the model structurally cannot: a check that does not hallucinate.

## Further Reading

- [Ontology as Substrate](/disciplines/ontology-as-substrate): the discipline of building the symbolic half, and why an agent without one drifts.
- [Ontology-Driven Development](/disciplines/ontology-driven-development): the methodology that turns the substrate into software, with the lineage back to Domain-Driven Design.
- [Recurring Work Belongs in Code](/perspectives/recurring-work-belongs-in-code): the economic case for the same split, with code as the default and the model as the escalation.
- [The More Capable the Agent, the More Guardrails It Needs](/perspectives/capable-agents-need-more-guardrails): why the check has to be external to the thing being checked.
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): where validators, tools, and rules physically sit in a running system.
