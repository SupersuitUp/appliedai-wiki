---
title: "Spec Writing"
slug: /disciplines/spec-writing
description: "The discipline of describing what you want with enough precision that an AI can deliver it. Implementation is being commoditized; the spec is where the value lives now."
---

# Spec Writing

*Implementation is being commoditized. The spec is where the value lives now.*

---

## Write the Vision. Make It Plain.

There is an ancient principle that predates software, predates management consulting, predates every productivity framework ever sold: if you cannot articulate what you want with clarity, you will not get it.

This has always been true. What's changed is the consequence of ignoring it.

When humans executed the work, ambiguity was survivable. A talented employee could fill in the gaps, read between the lines, intuit what the boss actually meant even when the brief was vague. The gap between fuzzy intent and quality output was bridged by human judgment, accumulated over years of context.

AI cannot do this. AI is extraordinarily capable and extraordinarily literal. It will build exactly what you describe. If your description is vague, you get vague output. If your description is precise, you get precise output. The quality of what AI produces is bounded by the quality of what you ask for.

This means the specification document is no longer a preliminary step on the way to the real work. The spec *is* the real work.

## Vibe Coding Is Not Enough

The fastest way to understand why the spec matters is to contrast two modes of AI-assisted building.

**Vibe coding.** You open your agent, type a prompt for the app you want, watch it generate boilerplate, edit the prompt, try again, and iterate your way toward something close to what you had in mind. This is fast. It feels magical. It is excellent for exploration, prototypes, and testing whether an idea is worth pursuing at all. It is also non-deterministic: a hundred attempts at the same prompt will produce a hundred different implementations, and the process itself tells you nothing about *why* the agent made the choices it made. There is no durable artifact beyond the code.

**Spec-driven development.** You do not prompt an implementation. You prompt the behavior, constraints, and success criteria you want. That specification becomes a contract that governs every downstream step: requirements, design, implementation, tests, documentation, verification. At each stage, you approve or edit before the next one begins. Nothing gets built on fuzzy inputs. By the time code is written, the spec has already done the hard thinking.

A concrete example. "Build me a login page" is vibe coding. Fast, maybe useful, but the agent has thirty plausible implementations and you will burn cycles discovering which one it picked. Spec-driven looks more like:

- **Feature:** user authentication
- **Endpoint:** POST /login
- **Inputs:** `user` (string), `pass` (string)
- **Success:** return 200 with a session token
- **Failure modes:** missing username returns 400; bad password returns 401
- **Tests:** valid credentials -> 200; missing user -> 400; bad pass -> 401

When the agent starts writing code, it knows exactly what good looks like, and you know exactly what it is going to produce. No ambiguity, no fifteen-round reprompt loop, and the spec itself becomes the durable artifact your team can reference a year later.

People sometimes describe this as test-driven development on steroids. TDD said: write the test first, let it shape the code. Spec-driven development goes further upstream: write the behavior, the constraints, the design, the tests, and *then* the code. The spec is upstream of all of it.

Vibe coding is still useful. It is the right tool for quick exploration, throwaway prototypes, and the first minute of checking whether an idea is worth building. Spec-driven is the discipline that gets you from "interesting prototype" to "system your business can trust."

## The Quality Chain

Here is the chain that governs outcomes in an AI-native workflow:

**Spec quality -> System quality -> Outcome quality.**

Each link constrains the next. A brilliant AI model operating on a mediocre spec will produce mediocre results. A modest model operating on an extraordinary spec will often outperform it. The bottleneck has moved. It is no longer "can AI do this?" It is "can you describe what you actually want with enough precision that AI can deliver it?"

When you write a spec, you are defining what success looks like. You are setting the rules of the game. You are telling the AI: here is what good looks like, here is what bad looks like, here are the boundaries, here are the goals. The spec is the rubric. Without it, the AI has no way to distinguish a great outcome from a mediocre one.

A system is only as good as its spec. The spec is the seed. Everything that grows from it is shaped by it.

## Most People Have Never Practiced This

Here is the uncomfortable truth: most professionals have spent their entire careers as executors. They were handed specs written by someone else (a manager, a client, a product owner) and their job was to fulfill them. They got good at execution. They got paid for execution. Their identity is built around execution.

This is not a criticism. Execution is valuable, and the world runs on it. But in an economy where AI handles more and more of the execution layer, the center of gravity shifts. The person who can clearly define what needs to be built becomes more valuable than the person who builds it. The person who designs the machine becomes more valuable than the person who operates the machine.

This is a skill most people have never been asked to develop. Schools don't teach it. Most jobs don't require it. And yet it is rapidly becoming one of the highest-leverage skills in the economy.

## What a Good Spec Actually Contains

A spec is not a wish list. It is not a paragraph of vibes. A good spec is an engineered document that gives AI (or any builder) enough structure to produce the outcome you actually want.

At minimum, a strong spec defines:

1. **The outcome.** Not "make it better" but what specifically looks different when this is done. Measurable where possible. Observable always.
2. **The constraints.** What must be true? What must never happen? What trade-offs are acceptable and which are not?
3. **The context.** What does the builder need to know about the environment, the users, the existing systems, the organizational values that should shape decisions?
4. **The success criteria.** How will you know it worked? What does the feedback loop look like?

## Principles Before Implementations

There is a mistake that even rigorous spec writers make: they jump to implementation before they have established the principle.

"I want to use zero-knowledge proofs for member privacy" is an implementation. "I want to maximally protect the privacy of my members" is a principle. ZK proofs are one possible way to realize that principle. Maybe the right way. Maybe not. Maybe today, maybe in two years when the tooling matures.

When a spec leads with implementations, it locks the builder into a technical path before the actual requirement is understood. Teams start debating ZK vs. encryption vs. on-device processing when the real question is simpler: do the people in this system feel protected? The implementation is the how. The principle is the what. The what must come first. The how must stay flexible.

This is where most specs go wrong. A document full of feature requirements ("we need end-to-end encryption, we need invite trees, we need reputation scores") looks rigorous. It is a house built from the roof down. The features are disconnected from the purpose they serve, so they drift, get gamed, or solve the wrong problem entirely.

A spec built from principles looks different. It says: "This system exists to protect the dignity and privacy of every member. Every design choice must serve that principle. Here are some ways that might work today." The principle constrains the design space. The implementation stays open to whatever best serves the principle as technology evolves.

**Practically, this means a good spec has a section most specs skip: the design principles.** Three to five statements about what the system values, stated plainly, before a single feature is mentioned. Every feature in the spec should trace back to at least one principle. If a feature serves no principle, cut it. If a principle has no feature serving it, that is a gap worth investigating.

The principle is eternal. The implementation is contextual. Write the spec accordingly.

## Two Emerging Disciplines

As spec writing becomes the core value-creation activity, two distinct skill sets are crystallizing in the market:

**Business requirements and analysis.** The practice of taking messy, real-world business situations and translating them into structured, actionable specifications. This requires domain expertise, the ability to ask the right questions, and the discipline to turn ambiguous goals into precise documents. The person doing this work sits between the business owner's vision and the systems that will execute it.

**Technical integration.** The practice of taking a well-defined spec and wiring together the AI systems, data pipelines, and workflows that fulfill it. This is still technical work, but its nature has changed. The integrator is not writing code from scratch so much as orchestrating capable systems according to a blueprint.

Both disciplines are valuable. But the first one, the ability to define what needs to be built, is where the leverage is shifting fastest. The people who can perform rigorous business analysis, decompose complex situations into clear requirements, and produce specs that AI can execute faithfully are building a skill that only becomes more valuable as AI gets better at execution.

## Why Natural Language Is Not Enough

Here is a prediction: we will see the emergence of spec-specific languages.

The reason is simple. Natural language is ambiguous by design. The word "event" could mean a conference, a webhook, a calendar entry, or a life milestone. The word "server" could mean a waiter or a rack-mounted computer. When you're writing a spec that an AI will interpret literally, ambiguity is not a feature. It is a failure mode.

Today, practitioners manage this ambiguity through careful writing, defined terms, and iterative refinement. Tomorrow, there will be structured formats and domain-specific languages purpose-built for encoding human intent with machine-level precision. Not programming languages in the traditional sense, but specification languages: ways to describe desired outcomes, constraints, and success criteria with the precision that AI requires and natural language struggles to provide.

This doesn't mean you need to learn a new language today. It means the direction is clear. The people practicing rigorous spec writing now are building the muscle that will transfer directly into whatever tooling emerges.

## The Preparation Principle

Proper preparation prevents poor performance.

Every hour spent refining a spec saves ten hours of rework. Every ambiguity caught before the build starts is a failure that never reaches production. Every constraint made explicit is a guardrail the AI will actually respect.

This is not busywork. This is the highest-leverage activity available to someone building with AI. The spec is not the boring part before the exciting part. The spec *is* the exciting part. It is the moment where vision becomes structure, where intent becomes actionable, where the quality of the outcome is determined.

If you are not practicing this skill, you are leaving value on the table. And the gap will only widen. As AI executes at higher and higher fidelity, the quality of the spec becomes the single largest variable in the quality of the result. The people who treated spec writing as a chore will wonder why their AI outputs are mediocre. The people who treated it as a craft will wonder why everyone else is struggling.

## For Practitioners

When you sit down with a client who says "I want to use AI in my business," the first question is not "which model should we use?" The first question is: can this client articulate what they actually want?

Most cannot. Not because they lack intelligence, but because they have never been asked to be this precise. Their goals live in their heads as feelings, intuitions, vague aspirations. "I want to be more efficient." "I want better customer service." "I want to grow."

Your job is to take those feelings and turn them into specs. Perform the analysis. Ask the hard questions. Map the situation. Decompose the workflows. Define what success looks like in terms that a machine can act on. Then tranche the work by complexity: what requires simple automation, what requires orchestration across systems, what requires judgment calls that need human oversight.

This is the work. This is where practitioners create real, lasting value. Not by demoing tools, but by engineering the documents that make those tools effective.

## Further Reading

- [Intent Engineering](/disciplines/intent-engineering): Encoding organizational purpose into infrastructure, the "why" behind the spec
- [Context Engineering](/disciplines/context-engineering): Curating the information state that agents operate within, the "what" the spec references
- [Observable Behavior Engineering](/disciplines/observable-behavior-engineering): Defining what good looks like in concrete, testable terms
- [Ontology-Driven Development](/disciplines/ontology-driven-development): The methodology that turns a strong domain model into compounding software
- [Generate a Build-Ready Spec](/playbooks/generate-a-spec): A Boomerang Prompt that interviews someone who wants something built and returns a triage-ready spec, so you can decide whether you can help before a line of code
