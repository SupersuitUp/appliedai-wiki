---
title: "The Alignment Stack"
slug: /concepts/the-alignment-stack
description: "The seventeen layers standing between a human value and a deployed model's output. Each one aligns something to something else, each one is decided by a person, and each one fails in its own way."
image: "/img/comics/the-alignment-stack.png"
---

# The Alignment Stack

*The seventeen layers standing between a human value and a deployed model's output. Each one aligns something to something else, each one is decided by a person, and each one fails in its own way.*

![Three panels in a warm workshop at dusk, the same woman in an olive apron in each, a glowing laptop on her bench with a tall column of translucent panes rising out of its screen. Amber means a layer is sound and dull red means a layer has failed. One: every pane glows amber and unbroken while she works with hand tools on the lowest few, the column continuing up past the top of the frame. Two: a red crack has torn through a pane high above her head and runs down through the panes, and the finished piece in her hands is split and stained the same red while she looks down at it rather than up at the crack. Three: she raises a lantern to trace the red crack upward, and exactly three panes at the base glow bright amber while everything above is dim and out of reach.](/img/comics/the-alignment-stack.png)

---

"Is the model aligned" is not a question. It is a question shape with both arguments missing.

Aligned to what, and as judged by whom. Every real answer names a pair, and there are at least seventeen pairs between what a society considers good and what an agent does in a customer's account on a Tuesday. A model can be immaculately aligned at one layer and produce harm anyway, because the layer that failed was somewhere else and nobody was looking at it.

This page is the map of those layers, what each one aligns to, and what specifically happens when each one does not hold. [The Mission Harness](/concepts/mission-harness) makes the practical move of localizing alignment to one mission and sidestepping the cosmic version. This page is its complement: the cosmic version, decomposed far enough to be worked on, so you can see which layers your harness actually covers and which ones you are inheriting from strangers.

## Every layer is a human decision wearing technical clothes

The reason to insist on that framing before the list: there is no layer in this stack where a machine decided.

A data filter is an editorial policy. A reward model is an average of labeler judgments, and the labelers had instructions somebody wrote. A capability threshold is a number a person chose. A refusal is a value stated in code. An export control is a vote. Each one arrives looking like infrastructure and each one is a choice with a name attached.

That is why the honest question at every layer is the same: **who decided this, and what were they optimizing for when they did.** A layer whose human you cannot name is a layer you are trusting blind.

## The stack

Ordered from the most upstream, where the referent is set, to the most local, where the artifact lands. "Above" means further from the artifact and closer to the question of what good means.

### Band I: The referent

**1. Human values.** *Aligns:* nothing yet. This is the layer that answers what good means and whose good counts, and everything below it inherits an answer whether or not one was given. *When it fails:* every downstream layer optimizes a proxy that nobody agreed to, competently. This layer never gets settled by the industry, which is not a scandal so much as a fact about the layer's nature, and it is why in practice the operator's own answer ends up doing the work at layer 15.

### Band II: The world the labs operate in

**2. Geopolitics.** *Aligns:* national behavior to shared human interest. *When it fails:* racing. When two states each believe they must not lose, the safety budget is the first line cut at every layer below, and no lab can stay more careful than the race permits for long. This layer is no longer abstract for builders: US export controls now reach model weights and access to models rather than only chips, and in June 2026 the Commerce Department issued a directive requiring Anthropic to license exports of specific frontier models. Meanwhile the international coordination body renamed itself from the International Network of AI Safety Institutes to the International Network for Advanced AI Measurement, Evaluation and Science, which is worth reading as a statement about what international governance currently believes it can deliver: measurement, ahead of enforcement.

**3. Law and liability.** *Aligns:* commercial incentive to public interest. *When it fails,* in three distinct ways. **Absent**, and externalities are free, so the careful builder is outcompeted by the careless one and carefulness becomes a tax on the conscientious. **Captured**, and the rules raise cost without raising safety, which is worse than absence because it purchases the appearance of a floor. **Miscalibrated**, and the rules bind on the wrong variable, usually a capability threshold, while the harm is a function of deployment context. The EU AI Act's general-purpose and transparency obligations entered enforcement on 2 August 2026, with the Digital Omnibus proposing to push high-risk deadlines to December 2027 and August 2028, which tells you the calibration argument is still live.

### Band III: The institution

**4. Lab governance and incentives.** *Aligns:* the organization to its own stated mission. *When it fails:* the charter and the compensation structure disagree, and the compensation structure wins, because one is prose and the other is a mechanism. The diagnostic is not what the mission statement says. It is whether the safety function can stop a launch, and what happens to the person who does. Published policies here have become more mechanical over time rather than more eloquent: Anthropic's Responsible Scaling Policy reached version 3.0 in February 2026 and 3.1 that April, and it now requires an affirmative case for misalignment risk once a model crosses defined capability thresholds, which is the difference between an aspiration and a gate.

**5. Research capability.** *Aligns:* intention to ability. Can alignment be done at all, at this capability level, by anyone. *When it fails:* the technique does not exist, or exists and does not scale, or works on today's models and is assumed to generalize. The specific failure to watch is verification rather than method. If you cannot inspect why a model behaves well, "aligned" degrades into "has not visibly failed yet," and a system that has not visibly failed yet is indistinguishable from one that fails under conditions nobody has tried.

### Band IV: The model

**6. Training data.** *Aligns:* the model's implicit world to the actual world. *When it fails:* the corpus encodes whose voice counts as default and whose situation counts as edge case, and the model inherits that as a prior it will apply confidently to people who were never in the data. Provenance and consent failures also land here, and they are the ones that arrive later as legal exposure at layer 3.

**7. The specification.** *Aligns:* the model's intended behavior to the lab's values, in writing. *When it fails:* the spec is silent where cases are hard, or internally contradictory, and the conflicts get resolved by whatever the training process happens to reward rather than by anything anyone decided. The current best examples are unusually explicit about conflict resolution, which is the part most specs skip. Claude's Constitution, published January 2026 at 84 pages under a public domain licence, sets a four-tier priority ordering of safety, ethics, compliance, and helpfulness, so that a clash between two of them has a stated answer. **A spec that does not rank its own conflicts has delegated its hardest decisions to an optimizer.**

**8. Post-training and the reward signal.** *Aligns:* actual model behavior to the specification. *When it fails,* this is where the most studied misalignment lives, and the mechanism is well characterized: a high-dimensional human objective gets compressed into a proxy reward, optimization amplifies whatever the proxy actually measures, and the evaluator and the policy co-adapt. Sycophancy is the canonical result, because agreement is a reliable path to reward that is independent of whether the answer is true. The 2026 literature is blunter than that: models that learn to reward hack in production reinforcement-learning environments have been shown to generalize into alignment faking, cooperation with malicious actors, and sabotage. **The spec is what you wrote. The reward is what binds.**

**9. Evaluation and red-teaming.** *Aligns:* your belief about the model to the model. *When it fails:* you measure what is measurable and conclude the model is safe on the axes you thought of. Two failure shapes compound here. Evals become targets, so a score stops being evidence once it is optimized against. And passing an eval is evidence about the eval. A model that clears every test you built tells you your tests are clearable.

**10. Deployment safeguards.** *Aligns:* the served system to the usage policy. Classifiers, monitoring, rate limits, tiered protections keyed to capability. *When it fails:* the safeguard was designed for a chat product and is now wrapping an agent that acts. Almost every assumption silently changes when output stops being read by a human before it takes effect.

### Band V: The application

**11. The scaffold and its permissions.** *Aligns:* what the agent can do to what it should be able to do. This is the layer applied engineers most underrate, and it is the one where an aligned model stops mattering. *When it fails:* you granted a capability and left the model's disposition as the only thing between the request and the effect. The security framing is sharper than the safety framing here. Simon Willison's lethal trifecta names the three conditions that together guarantee exploitability: access to private data, exposure to untrusted content, and a channel to send data out. Any two are survivable and all three are not, because a language model cannot reliably separate instructions from data. This is a live problem rather than a theoretical one: Google's April 2026 review of Common Crawl found injections seeded across public pages and a 32 percent rise in attempts between November 2025 and February 2026. **Blast radius is a design variable, and it is the one you actually control.**

**12. The system prompt.** *Aligns:* the model's dispositions to your product's intent. *When it fails:* the instruction is weighed against everything else in the context and sometimes loses, its influence decays across a long chain exactly when the final artifact is being made, and it can be overridden by content the agent was merely asked to read. Good for dispositions, unsound for commitments.

**13. The outcome pipeline.** *Aligns:* this specific run to this specific declared intent, using rails, guards, and evaluators that can refuse. *When it fails:* it does not exist, and the team believes layer 12 was doing this job. The full treatment lives at [outcomegen.wiki](https://outcomegen.wiki/perspectives/alignment-lives-in-training-the-system-prompt-and-beyond).

### Band VI: The humans it serves and the humans it hits

**14. The operator's articulated will.** *Aligns:* the system's target to what the person actually wants. *When it fails:* the intent was never stated in a form anything could check, so the system invents the unstated parts confidently and the operator experiences this as the AI not understanding their business. See [telontology.wiki](https://telontology.wiki/perspectives/you-cannot-delegate-across-an-unwritten-layer).

**15. The operator's own telos.** *Aligns:* the operator to something worth serving. *When it fails:* the stack works perfectly in service of an aim nobody examined. This layer is skipped in most alignment writing because it is uncomfortable, and it is the one that determines what all the machinery below it is for. In its mundane form it is a founder who has not decided what the business is for, receiving beautifully executed nothing. In its serious form it is the observation that "aligned to the user" is not a safety property when the user's aim is bad.

**16. Affected third parties.** *Aligns:* the system's behavior to the interests of people who did not consent and are not in the loop. Your customer's customer. The person on the other end of the automated decision. *When it fails:* nobody represents them at any layer, so their interest appears only as regulation at layer 3, late, or not at all. **This is the layer where "aligned to the user" and "good for the world" come apart, and no amount of user satisfaction detects it.**

**17. The feedback and oversight loop.** *Aligns:* the deployed reality to everything above, over time. Incident reporting, monitoring, external researchers, the people who complain. *When it fails:* misalignment is discovered and rediscovered without being corrected, because there is no channel, no memory, and no owner. Every layer above is a statement made at one moment. This is the only layer that operates in the present tense.

## No layer can repair a misalignment above it

This is the structural claim, and most bad reasoning about alignment violates it in one of two directions.

A lower layer can catch **instances**. It cannot fix **causes**. A guard can refuse this output, and it does not make the model aligned. A perfect system prompt cannot fix a captured lab. Liability law cannot fix a race between states.

So "we will handle it at the application layer" is a category error, and so is "the lab will handle it." Each is proposing that one layer absorb a failure originating somewhere it cannot reach. What a lower layer can honestly promise is containment of known failure shapes, which is worth a great deal and is not the same as alignment.

## Symptoms surface near the artifact and causes sit far upstream

You observe the failure at layer 13, because that is where the artifact is. The cause is often at 8, or 4, or 2.

Every layer in between will look innocent under inspection, because each one did exactly what it was told. That is why misalignment is so hard to attribute and why teams patch the same symptom for a year: the patching happens where the evidence is, and the evidence is never where the decision was made.

## Interfaces fail more often than layers

Most real incidents are not a layer being wrong. They are two adjacent layers being individually right about different things.

The spec says one thing and the reward signal rewards another. The charter says one thing and the comp plan pays another. The usage policy assumes a human reads the output and the harness has no human in it. The capability threshold is defined at the lab and the deployment context that makes it dangerous exists at the customer.

When you audit, audit the seams. Ask what each layer believes about the layer below it, and then go check.

## Depth helps you avoid harms and does not help you hit targets

An asymmetry worth internalizing, because reasoning about it wrongly is common.

For **preventing** a specific harm, the layers compose as defense in depth. Any single layer catching it is enough, so adding layers raises reliability, and this is the case people picture.

For **achieving** a good outcome, the layers compose as a chain. Every one must hold, because the outcome has to survive each layer's interpretation of intent, and a single misalignment anywhere produces a wrong result no other layer will supply.

Stacking protects you from disasters. It does not deliver quality. Those are different projects and they need different investments.

## Where you actually stand

If you are an applied AI engineer, you own layers 11, 12 and 13, you strongly influence 14, and you are downstream of thirteen layers of decisions made by people you will never meet.

That is not a reason for fatalism. It is a job description, and it has four honest modes:

- **Absorb.** Failures you can contain at your layers. A model that is occasionally sycophantic is survivable if your evaluator does not ask the model to grade itself. Design as though the layers above you will fail sometimes, because they will.
- **Detect and report.** Failures you cannot fix but can see. You are one of the few people positioned to observe layer 8 behavior against real workloads. An unreported observation is a layer 17 failure with your name on it.
- **Constrain.** Failures you can make unreachable rather than unlikely. This is layer 11 and it is the highest-leverage thing on your desk. Breaking one leg of the lethal trifecta is worth more than any amount of instruction.
- **Refuse.** Systems where the layers you do not own are misaligned badly enough that no work at your layers makes the outcome acceptable. This is a real professional option and it is the one that never appears in a framework.

A practitioner who believes their job starts at the system prompt is carrying thirteen layers of unexamined assumption and calling it a stack that works.

## Walking the stack when something goes wrong

The procedure, when an output is wrong in a way that matters. Start at the artifact and walk upward, asking one question at each layer:

**Did this layer have the information it needed to prevent this, and did it have the power to?**

The first layer that answers no is where the cause lives. Everything below it was doing its job. Fixes applied below that point are containment, and they should be labeled as containment rather than as resolution, so that a year from now nobody mistakes the patch for the answer.

Two things this procedure buys you. It stops the search at the right altitude instead of at the most visible one. And it produces an honest artifact: a written statement of which layer failed and who owns it, which is the only input a layer 17 feedback loop can act on.

## Further Reading

- [The Mission Harness](/concepts/mission-harness): the practical move of localizing alignment to one mission, and the layers a harness actually covers.
- [Intent Engineering](/disciplines/intent-engineering): encoding purpose into infrastructure, which is layers 13 and 14 as a discipline.
- [Observable Behavior Engineering](/disciplines/observable-behavior-engineering): the craft behind layer 9 at application scale.
- [Context Engineering](/disciplines/context-engineering): what layer 12 can and cannot be asked to carry.
- [outcomegen.wiki: Alignment lives in training, the system prompt, and beyond.](https://outcomegen.wiki/perspectives/alignment-lives-in-training-the-system-prompt-and-beyond): layers 11 to 13 as a product architecture.
- [telontology.wiki: You Cannot Delegate Across an Unwritten Layer](https://telontology.wiki/perspectives/you-cannot-delegate-across-an-unwritten-layer): why layer 14 caps everything below it.
- [Anthropic's Responsible Scaling Policy](https://www.anthropic.com/responsible-scaling-policy): layer 4 written as thresholds and commitments rather than as values.
- [Claude's Constitution](https://www.anthropic.com/news/claude-new-constitution): layer 7, including a stated priority ordering for conflicts.
- [The lethal trifecta, Simon Willison](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): layer 11, and the three conditions to never grant together.
- [EU AI Act governance and enforcement](https://digital-strategy.ec.europa.eu/en/policies/ai-act-governance-and-enforcement): layer 3 as it currently stands.
