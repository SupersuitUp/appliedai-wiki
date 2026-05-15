---
title: LLM Psychosis
slug: /disciplines/llm-psychosis
description: Generation without discrimination. The default failure mode of agent-driven work. The reason most people who go all-in on multi-agent setups end up shipping confident slop.
---

# LLM Psychosis

*Generation without discrimination. Believing the output because it sounds smart. The default failure mode of agent-driven work, and the reason most people who go all-in on multi-agent setups end up shipping confident slop.*

---

## The Term

"LLM psychosis" is a term builders have been using throughout 2026 to name a specific failure pattern. It is not a clinical diagnosis. It is the moment an operator stops checking the model's output and starts trusting the fluency. The model sounds smart. The work feels like progress. The user accepts it. The work was wrong.

Operator Shaw ([@shawmakesmagic](https://x.com/shawmakesmagic/status/2048177750847144274)) put the mechanism cleanly on X in April 2026:

> "LLM psychosis is what happens when you believe the outputs without verifying them, or rather you generate without discriminating."

That is the whole mechanism. Generation is cheap. Discrimination is the work. Skip the second half and you are in psychosis, regardless of how much you are shipping.

## Generate vs Discriminate

Two postures show up at the keyboard. Most builders only operate in one.

- **Generative.** Adding features. Spinning up agents. Drafting copy. Producing.
- **Discriminatory.** Reading the output. Catching duplicates. Calling out hallucinations. Killing slop. Rejecting the agent's plan when it is 20% wrong.

The agentic stack rewards generation lavishly. You can run ten agents in parallel and feel like a wizard. The wizard who only generates is a confident slop machine with a confident author attached.

The discipline that separates real practitioners from the trapped is the second posture, applied harder than the first. Roughly 80% of agent-operator time should be discrimination work: report generation on duplicate types, refactor and componentization plans, internationalization, strict lint and type checks, documentation, slop removal, and reading the plans the agents produced. The other 20% is generation. Most operators run those numbers backwards, then wonder why their codebase is unshippable.

## Why It Spikes Outside Your Domain

The most reliable predictor of LLM psychosis is venturing into a domain you do not understand.

The model is a junior that sounds senior. It does not know it is wrong. It will produce confident, plausible work in physics, math, law, medicine, finance, and security, in none of which it actually understands the load-bearing constraints. If you cannot read the output and immediately say "oh god this is all wrong," you cannot catch the error. You will accept it. Confidence will compound. The work will diverge from reality, and you will be the last to find out.

This is the rule. If you do not understand the meaning of the words or the code, and you cannot read it back to yourself with a working mental model, you will slip into psychosis 100% of the time. Being smart and credentialed in some other domain does not save you. The model is louder than your humility, and the output is too polished for you to feel its thinness.

This is the same frontier [The Overconfidence Trap](/disciplines/the-overconfidence-trap) names from the operator-perception side: AI fluency manufactures confidence that has nothing to do with operator strength. Outside your competence, fluency is all there is, and fluency is not enough.

## The Discipline That Holds It Off

Five practices keep operators out of psychosis. Each one is a deliberate insertion of the discriminatory posture into a workflow that wants to be purely generative.

### Read the plan

If your agent plans a feature, read the plan. All of it. Plans the model produces are around 20% wrong, and the failures are concentrated in places it glossed because it did not know the real constraints. Ask the agent to surface anything it is uncertain about. Ask it to identify risks. If you do not understand something in the plan, have it explain until you do. If you accept a plan you did not read, you are no longer the operator. You are a downstream customer of your own agent's confabulation.

See [Spec Writing](/disciplines/spec-writing) for why the spec is where the value lives now. The plan is a draft spec. Treat it that way.

### End-to-end against the live stack

Agents cannot reliably write unit tests yet. They hallucinate large test harnesses with their own bugs that pollute code search and assert green on red. Real verification is end-to-end against your live stack, with no mocks and no synthetic fixtures. If the user journey runs all the way through, the APIs and the data shapes are real, and you have something to sculpt. If the only signal that the system works is a test the agent wrote, you are in psychosis.

The UX will be ugly. Hand-fix the front. The point of the e2e run is verification that the bones are real, and an occasional headful run to confirm the agent is not lying about what it sees.

### Cap the agent count by your bandwidth, not your subscription

Eight to ten agents is feasible during the day if most of them are running long discriminatory tasks: validation, refactor and dedup reports, lint and type strict passes, documentation, slop removal. It is not feasible if every one of them is generating new features. Two or three agents each adding features in parallel is a recipe for redundancy, duplicated types, and competing abstractions. The cleanup tax exceeds the throughput.

Practical gate from operators who have lived through it: no more than three agents after 10pm. The discriminatory posture requires sharpness, and judgment fatigue degrades it long before code quality breaks. See [Judgment Burnout](/concepts/judgment-burnout) for the body-level account of why this ceiling is real.

### Use your own product

The quality of your product is directly proportional to how much you yourself use it. Most of your time should not be spent talking to agents at all. It should be spent inside the thing you are shipping, hitting friction, then returning to the agents only when something is genuinely broken.

Building with AI is addictive. The reward loop is fast. The trap is mistaking the dopamine of generation for product quality. The exit is to close the agent terminal and open the product the way a customer would.

### Architect for what models are good at

Models are magical on small bits of code with clear instructions and awful at large constructions. Architect for that. Monorepos with small, individually testable packages. Strict dependency isolation. Clean abstraction. Dispatch standing janitor agents to find circular dependencies and consolidation opportunities. Parallelize across packages that do not conflict.

If a package is individually self-consistent and well tested end-to-end, you can rely on it as a substrate for more complex things. The agent-management work is real architectural work. It does not go away. It compounds in your favor when done well.

## The Engineering-Manager Test

If you cannot plan and manage a project and architecture for ten engineers, you cannot do it for ten agents either. The agentic stack does not install management capacity. It exposes the lack of it.

The operators currently shipping working systems with eight to ten parallel agents are, almost without exception, people who could already do this work without LLMs. The decade of pre-AI engineering practice they did before the agents arrived is the load-bearing layer. The agents amplify. They do not install the upstream skill.

This is the [You Are the Bottleneck](/concepts/you-are-the-bottleneck) frame applied to agents. Smart hires cannot reach up and fix you from below. Smart agents cannot either. The judgment, architecture, and discrimination still have to come from you.

If you do not have that layer yet, the path is not "more agents." The path is to build the engineering and architectural skill in domains you can actually read. Then the agents start working for you instead of around you.

## The Crossing-the-Rubicon Phase

Most builders go through a brief psychotic period when they first realize what the agents can do. The output looks like godlike powers. They run twenty agents at once. They ship something that looks impressive on day three and is unshippable by week two.

This phase is normal. Most people acclimate. The ones who get out of it do so by collapsing back to a small surface area: one application, narrow features, eight to ten disciplined agents most of whom are doing janitorial discrimination work, and a hard ceiling at night. The ones who do not acclimate get louder, ship more, and accumulate slop until either the codebase or the customer corrects them.

Acclimation is not slowing down. It is becoming the kind of operator the agents need on the other side of the keyboard.

## The Exit

If you find yourself in psychosis, the move is to slow down.

- Cut the agent count. Sometimes one agent. Read the code.
- Reread the plans. Find the 20% that is wrong.
- Step into the product. Use it the way a stranger would.
- Name the domain you are operating outside of, and either learn it or stop generating in it.

This is the same exit move named in [See Your Own Thinking](/concepts/see-your-own-thinking): get the work reflected back to you clearly enough that you can notice where it is thin. The agent cannot do that for you. Only you can.

---

## Further Reading

- [The Overconfidence Trap](/disciplines/the-overconfidence-trap): The companion frame from the operator-self-perception angle.
- [You Are the Bottleneck](/concepts/you-are-the-bottleneck): Multipliers cannot fix the operator. Agents are the latest multiplier, and the same rule holds.
- [Slop Factory](/concepts/slop-factory): The business-scale destination of unchecked psychosis.
- [Judgment Burnout](/concepts/judgment-burnout): Why running too many agents wrecks the discriminatory posture before it wrecks the code.
- [Spec Writing](/disciplines/spec-writing): The spec is where the value lives now. The plan your agent produces is a draft spec. Read it.
- [Shaw on agent maxxing and psychosis](https://x.com/shawmakesmagic/status/2048177750847144274): The April 2026 thread that sharpened the verbatim framing of generate-vs-discriminate.
