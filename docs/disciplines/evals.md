---
title: Evals
slug: /disciplines/evals
description: "The discipline of measuring AI output quality at a level the operator can actually trust. Golden sets, rubrics, regression rules."
---

# Evals

*The discipline of measuring AI output quality at a level the leader's organization can actually trust. Not vibes. Not vendor dashboards. Golden sets, rubrics, and regression rules versioned alongside the code that produces the output.*

---

## What the discipline is

An eval is a measurement of whether AI output is doing what it is supposed to do, with enough rigor that the measurement is trustworthy across changes. The amateur version is "I tried it three times and it looked good." The professional version is a versioned golden set, a versioned scoring rubric, a baseline number, and a rule that says a change does not ship if it regresses the baseline.

Without evals, an implementation is faith. With evals, every prompt change, model swap, RAG update, and tool-use refactor produces a number the operator can defend. When the leader asks "is it better than last quarter," you have a chart.

## The high-leverage moves

**Build a golden set before you write a single new prompt.** Twenty examples that span the realistic distribution of inputs, with notes about why each example matters and what good output looks like. Twenty is enough. The point is not coverage. The point is a tripwire that catches regressions before they reach the leader's customers.

**Write the rubric in the operator's words, not yours.** Interview whoever currently judges output quality. Capture their criteria verbatim. Convert that to a scoring prompt for an LLM judge. If the LLM judge does not agree with the operator on the easy cases, the rubric is wrong, not the operator.

**Make the eval a precondition for shipping.** Wherever prompt changes happen (a notebook, a script, a CI pipeline), the eval runs before the change ships. If the change regresses, the change does not ship. Without this gate, the harness is decoration.

**Score the LLM-judge against the human-judge.** Run the LLM judge against five outputs hand-scored by the operator. If they agree on the top dimension, the rubric is operational. If they diverge, iterate the rubric until they agree on the easy cases. This is the only check that keeps evals honest.

## Evals measure. Verifiers gate.

Two different instruments get called "evals," and conflating them costs real work. An **eval** scores output against a rubric, usually offline, to answer "is the system better than it was." A **verifier** is a check wired into the production loop that decides whether one specific output is allowed to proceed. Evals produce a number a leader can defend. Verifiers produce a pass or a fail that the pipeline obeys.

The verifier is what turns generation into a loop instead of a gamble. Once acceptance is machine-checkable, the system stops hoping for a good output and starts regenerating until it gets one. That pattern has a name in the literature: **rejection sampling against a verifier**. In operator terms: define the musts and nevers precisely enough that a machine can check them, then keep rolling until every condition is satisfied.

This is why the sharpest teams write the constraints before the prompt. The constraints are not documentation of the prompt. They are half of it.

## The spec is the prompt and the test

The highest-leverage version of this insight: **one artifact serves both ends of the loop.** The same list of musts and nevers is the instruction the generator is steered by and the checklist the verifier grades against. Writing them once improves the prompt and enables the loop. Those are not two benefits. They are one artifact read from two directions.

Wire only one end and the loop leaks, in one of two ways:

- **Stated but not checked.** The constraint reaches the generator and nothing confirms it landed. Output drifts silently, and the drift is found late by a human noticing, which is exactly the labor the system was supposed to remove.
- **Checked but not stated.** The verifier knows the rule and the generator was never told it. Every attempt fails for a reason the generator has no way to act on, so the loop burns attempts converging by luck. A constraint that exists only in the checker is an expensive way to be right.

The practical test for any constraint you write down: can the generator see it, and can the checker measure it? If the answer to either is no, the constraint is decorative.

A corollary worth stating plainly: constraints have to be specific enough to be mechanically checkable. "On brand" fails both ends. "Every garment is unbranded, with no logo, wordmark, or maker's mark" steers the generator and gives the checker something to look for.

## Bottom-of-the-barrel mistakes

- **"Quality" or "helpfulness" as the rubric.** Too generic to catch anything. The rubric needs dimensions specific to the task: tone matches brand voice, all named entities spelled correctly, an actionable next step is present.
- **A golden set that scores all 5s on the baseline.** The set is too easy. The eval will catch nothing. Add the hardest five outputs the operator has complained about.
- **Running evals out of band.** If the eval lives in a folder no one checks, it does not exist. The eval has to be in the actual shipping workflow.
- **Vendor dashboards as the eval.** Token counts, latency, and cost are observability, not evals. They tell you what happened, not whether it was good. Real evals score output against a rubric.

## What good looks like

The deliverable shape varies, but the operational state is the same:

- A versioned `evals/` directory in the repo with `golden_set.json`, `rubric.md`, and a `run.py` (or equivalent) that scores any prompt or model against the set
- A baseline score for the current production prompt, recorded by date
- At least one prompt change has been run through the harness and either shipped or rejected on the basis of the score
- The operator has seen the dashboard once and agrees the numbers match their intuition

If those four are true, evals are real in the leader's organization. If they are not, evals are theater.

## Pages in this discipline

- **[The Judgment Line](/perspectives/the-judgment-line)**: where AI ends and human judgment begins. The most important boundary in any AI system.
- **[The Overconfidence Trap](/perspectives/the-overconfidence-trap)**: the failure mode where the model is wrong with conviction and the operator believes it.
- **[LLM Psychosis](/perspectives/llm-psychosis)**: the failure mode where the model loses the plot mid-conversation. How to detect and prevent.
- **[Observable Behavior Engineering](/disciplines/observable-behavior-engineering)**: instrumenting AI systems so failures are visible before they reach the customer.

## Playbooks downstream

- **[First eval harness in week one](/playbooks/first-eval-harness)**: the procedure for standing up the minimum viable eval loop on a new engagement.

## Further Reading

- [Disciplines](/disciplines)
- [The Judgment Line](/perspectives/the-judgment-line)
- [First eval harness in week one](/playbooks/first-eval-harness)
- [Golden Chain](/concepts/golden-chain): a set-building loop whose verifier decides which asset is accepted before it conditions the next one.
