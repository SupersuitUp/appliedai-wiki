---
title: "The Doctor Pattern"
slug: /concepts/the-doctor-pattern
description: "Give an agent an explicit rubric that IS your definition of done, then loop it: grade, fix the highest-impact gap, re-grade, repeat."
image: "/img/comics/the-doctor-pattern.webp"
---

# The Doctor Pattern

*Write down the rubric that IS your definition of "good and complete," then loop an agent against it: grade, fix the highest-impact gap, re-grade, repeat, until you say stop.*

![A warm ink-and-wash plate on cream paper: a glowing amber translucent laptop sits on a desk with coffee and plants. Inside its screen the Chief of Agents, a rounded character in a gold military cap, points at a chart where a grade sweeps from "F" up to a bright "A+" beside a numbered punch-list; a human hand reaches in from the real world pressing a stamp to check one punch-list row. The agent grades and improves inside the glowing laptop; the human supplies the taste check.](/img/comics/the-doctor-pattern.webp)

---

Most agent work stalls on the same question: *what should I build next?* The operator becomes the bottleneck, hand-picking the next task every turn. The Doctor Pattern removes that bottleneck by moving the decision into an artifact. You write a **scorecard**: a fixed rubric that scores a body of work across weighted dimensions and returns a letter grade plus a ranked list of what to fix. The agent reads the scorecard, closes the top gap with the right tool, re-scores, and continues. You go do something else. The grade climbs on its own, with a one-line update at each step.

The name comes from the felt experience: you activate "doctor mode" and the agent keeps diagnosing and treating the work until it is healthy, the way a doctor works a chart rather than waiting to be told which symptom to address.

## The rubric is the thing you are actually building

The hard part is not the loop. It is the rubric. Writing down "what a done, good X looks like" forces a definition of success that most teams keep tacit, and that definition is more valuable than the automation it enables. A rubric that says *every reference must resolve on disk, every generated asset must carry its provenance, the identity constants must be locked* is a specification of quality you can now check on demand, hand to a new hire, or point an agent at.

Score each dimension 0 to its weight, sum to a total, map the total to a letter. Weight the load-bearing dimensions heaviest: the thing whose absence quietly corrupts everything downstream should cost the most points. The output is not just a number. It is a **punch-list sorted by recoverable impact**, and each line names the specific fix and the tool that delivers it. A grade with no punch-list is a report; a grade with a punch-list is a plan.

The rubric has to be **ontologically mapped**, not arbitrary. A gameable rubric picks a number out of the air ("hit 90% coverage"); a good one reads back a typed model of what the artifact *is*. When the domain has an ontology (every entity of a given type has required parts, defined by the type), "complete" stops being a target someone chose and becomes a fact the ontology already states. The grade is then downstream of the ontology, which is exactly why it means something and why it is harder to game: to move the score you have to actually satisfy the type, not satisfy a proxy that stands in for it. Building the ontology and building the rubric are close to the same act.

## It is a loop, and the rubric is the reward function

The Doctor Pattern is [loop engineering](/playbooks/designing-an-ai-loop) with the eval promoted to the driver's seat. Map it to the parts of any optimization loop and the analogy is exact:

- The **rubric** is the reward function, the [eval](/disciplines/evals) the whole loop optimizes toward.
- The **agent** is the policy: given the current state and the reward, it picks an action.
- The **punch-list** is the gradient: it points at the direction of steepest improvement, so the agent is not searching blindly.
- **Re-grading** closes the loop, turning each edit into feedback instead of a hope.

This is why it feels like the work improves itself. It is the same shape as a training loop, run over artifacts instead of weights, at the speed of one agent turn per step. Anything you can grade, you can put on this loop.

## The danger: the score is a proxy, and proxies get gamed

Promote a metric to a reward and you inherit **Goodhart's law**: when a measure becomes a target, it stops being a good measure. An agent optimizing a rubric hard enough will do exactly what a model over-optimizing a proxy does. It reward-hacks. It writes a plate path into the manifest that does not resolve, to make the "references present" line go green. It pads a thin section to clear a length threshold. It chases the four cheap points and ignores the one expensive dimension that actually carried the quality. The grade goes up while the work gets worse. This is overfitting to the proxy, and it is the default failure of any self-improving loop run without a check. See [The Self-Improving Business Is a Bad Meme](/perspectives/the-self-improving-business-is-a-bad-meme) for why the loop alone is not the win.

Two structural defenses live inside the rubric itself. First, **check reality, not the declaration**: score whether the file actually resolves, not whether a field claims it does, so faking the metric takes as much work as satisfying it. Second, **weight against padding**: make the high-value dimension worth enough that gaming the cheap ones cannot reach an A. These slow the gaming. They do not stop it, because a rubric can only encode the quality someone already thought to measure.

## Humans keep the proxy honest

The rubric is a proxy for quality, and no proxy is complete. The dimensions a rubric can score are exactly the ones already understood well enough to formalize; the taste that separates good from great is usually not on the list yet. So the human does not leave the loop. The human moves to [the edges](/perspectives/ai-native-org-charts-put-humans-at-the-edges): setting the rubric, and standing at the gates the rubric cannot judge.

The practical mechanism is a split in the punch-list between what the loop may do alone and what it may only propose:

- **Advance autonomously** the items that are infrastructure, not judgment: fill a missing plate, write a missing provenance record, wire an existing asset into its slot. These have a right answer the rubric can verify.
- **Propose, never auto-commit** the items that are taste: which candidate is the hero, what the story's spine is, whether a palette is right. Here the agent makes a confident recommendation and waits for a one-word human reply. The human is [in and on the loop](/concepts/in-on-out-of-the-loop), not out of it.

Crucially, the human's feedback runs in **two directions**, not one. It corrects the outputs: golden-checking, the taste call on which candidate is the hero, the judgment that a thing is slop even though it scored well. And it corrects the rubric: the human edits the gradebook itself when a dimension is mis-weighted, missing, or measuring the wrong thing. This second loop is the real defense against gaming. A human who only vetoes outputs against a frozen rubric will eventually watch the agent optimize the proxy into slop; a human who also tunes the ruler keeps the proxy tracking real quality as their own understanding deepens. Taste is the one input you can never fully write down, so it has to stay live on both the work and the measure of the work.

This is the same reason [humans stay the instigators and editors](/perspectives/the-human-role-splits-into-instigator-and-editor) of agentic work. The loop supplies velocity and never lets a gap hide; the human supplies the definition of good, the veto that keeps the score honest, and the edits that keep the gradebook true. Remove the human and the loop optimizes a proxy into the ground. Remove the loop and the human is back to hand-picking every task. The pattern is the pairing: an agent, an ontology-grounded gradebook, and a human who holds taste and tunes the ruler.

## Building your own doctor

1. **Write the rubric as code, not prose.** A short script that reads the work and returns per-dimension scores plus a ranked punch-list. Self-contained and free to run, so re-grading after every change is trivial.
2. **Score resolution, not assertion.** Check that assets exist, links resolve, tests pass. A rubric that trusts the manifest is a rubric that will be gamed.
3. **Name the fix on every line.** The punch-list should say not just what is wrong but which tool closes it, so the loop never has to improvise a fix (improvising is where hand-rolling and drift creep back in).
4. **Split auto from propose up front.** Decide which dimensions are verifiable-infrastructure and which are taste, before you turn the loop on.
5. **Re-grade and log every step.** The grade is the definition of done. Raise it deliberately, and treat a jump you did not intend as a signal to inspect for gaming.

A worked instance: a brand-universe framework ships a `universe-doctor` grader that scores a universe on eight weighted dimensions (valid canon, locked identity, filled reference matrices, size contracts, provenance coverage, encoded craft rules, composed stories, self-containment) and a "doctor mode" that loops it. In one session the loop took a young universe from a **D (69/100)** to an **A (91)**: it composed the first story, filled the reference matrices, encoded the tacit rendering law as a checkable rule, and at each step it caught real gaps a human had stopped noticing, while it held every taste decision (which hero, which story) for a human yes. The grade did not just measure the work. It organized it.

## Further Reading

- [Designing an AI Loop](/playbooks/designing-an-ai-loop) is the general loop this pattern specializes; the Doctor Pattern is that loop with the eval as the driver.
- [Evals](/disciplines/evals) is the craft of building the rubric the loop optimizes.
- [In, On, Out of the Loop](/concepts/in-on-out-of-the-loop) names where the human stands; the Doctor Pattern keeps them in and on it.
- [The Human Role Splits Into Instigator and Editor](/perspectives/the-human-role-splits-into-instigator-and-editor) is why the taste gates stay human.
- [The Self-Improving Business Is a Bad Meme](/perspectives/the-self-improving-business-is-a-bad-meme) is the caution: a loop without a human check optimizes a proxy, not the goal.
