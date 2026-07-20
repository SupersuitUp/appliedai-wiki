---
title: "Precise Procedures Are Written for the Agent"
slug: /perspectives/precise-procedures-are-written-for-the-agent
description: "Dense procedural precision reads as over-engineering to a human skimming for the gist. It is not for the skim. It is the interface an agent executes against faithfully, and the second reader changes what good writing is."
image: "/img/comics/precise-procedures-are-written-for-the-agent.png"
---

# Precise Procedures Are Written for the Agent

*Dense procedural precision reads as over-engineering to a human skimming for the gist. It is not written for the skim. It is the interface an agent executes against faithfully, and once the agent is a reader, ambiguity stops being a stylistic choice and becomes a defect.*

![Three-panel cream-paper comic titled WRITTEN FOR THE AGENT. Panel 1: a civilian in ordinary street clothes squints skeptically at a long dense specification document, caption "Too complex. You could have simplified." Panel 2: Midas the hyperagent in matte-navy plate armor calmly holds the same precise spec and feeds it toward a glowing portal to the command hall, caption "The precision is not for the skim." Panel 3: in the navy cyber-cathedral the holographic Chief of Agents with a gold comms crown executes the procedure faithfully on floating grids, producing an identical reproducible result, caption "It is the interface an agent runs, the same way every time." Footer bar: AMBIGUITY IS FREE FOR A HUMAN AND COSTLY FOR AN AGENT.](/img/comics/precise-procedures-are-written-for-the-agent.png)

---

## The reaction that misreads the audience

A common exchange, when someone first sees a tightly-specified process:

> "I understand what you're doing, the language is just too hard to decipher. You could have simplified."

The reply that resolves it:

> "It's meant to be precise so that an agent can understand and copilot the process with me."

Both people are right about different readers. The skeptic is reading as a human who wants the gist, and for that reader the dense specification *is* harder than a one-paragraph summary. The builder is writing for a second reader who was not in the room a year ago: the agent that will execute the procedure. For that reader, the summary is unusable and the precision is the whole point.

The mistake is not the density. The mistake is assuming procedural writing has one audience.

## Ambiguity is free for a human and costly for an agent

Hand a capable human a loose procedure and they close the gaps with judgment. "Clean it up," "use the right format," "make it look professional", a person infers the intent and proceeds. The ambiguity costs nothing because the reader silently supplies what the writer left out.

Hand the same loose procedure to an agent and the gaps do not get filled with judgment. They get filled with improvisation, a different plausible guess each run. The same instruction produces a different execution every time, and the output that was supposed to be reliable becomes a coin flip. Ambiguity that was free for the human is the exact thing that makes the agent non-reproducible.

This is why a procedure that only ever describes its steps in prose forces the agent to re-invent the mechanism on every invocation. Two runs of the "same" process diverge, because nothing pinned the part that should have been fixed. Precision is what removes the coin flip.

## The procedure is an interface, not an essay

Once an agent executes it, a procedure is closer to an API than to documentation. An API that is vague does not get interpreted charitably; it gets called wrong. The precise procedure specifies the inputs, the order, the checks, the defaults, and the invariants tightly enough that the executor has nothing left to guess. That specificity is not decoration. It is the contract that makes faithful, repeatable execution possible, and it is the prerequisite for promoting a procedure to a [golden process](/concepts/golden-processes).

Precision also relocates where the human spends effort. Writing an unambiguous procedure is more work up front than writing a summary. That work is paid back every time the agent runs it without a human standing over the output correcting drift. The cost moves from per-run supervision to one-time specification, which is the trade that makes the process scale.

## Precise is not the same as complex

The objection "you could have simplified" conflates two different things. Simplify the *idea* as far as it will go: the concept should be as clear and small as the truth allows. Do not simplify away the *specification*: the executable detail an agent needs to run faithfully is not clutter to be trimmed.

A good process is a simple idea with a precise procedure. Cutting the precision to make the page easier to skim does not make the process simpler; it makes it ambiguous, and ambiguity is the failure this whole discipline exists to prevent. The reader who wants the gist is served by the one-line summary at the top. The reader who has to run it is served by everything below.

## Further Reading

- [Golden Processes](/concepts/golden-processes): a procedure is only promotable to golden if it is specified precisely enough to execute faithfully.
- [Hyperdocumented SOP](/concepts/hyperdocumented-sop): mapping a real workflow to the level of precision an agent can act on, then proving it against reality.
- [Agent Rule Files](/concepts/agent-rule-files): the always-on instructions where precision governs behavior across every task.
- [Spec Writing](/disciplines/spec-writing): the craft of specifying intent so an executor, human or agent, cannot misread it.
- [Version-Control Your Prompts](/disciplines/version-control-your-prompts): precise procedures belong in version control, where they are read the same way every run.
