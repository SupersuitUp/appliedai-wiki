---
title: Evals
slug: /disciplines/evals
description: "The discipline of measuring AI output quality at a level the operator can actually trust. Golden sets, rubrics, regression rules."
---

# Evals

*The discipline of measuring AI output quality at a level the king's organization can actually trust. Not vibes. Not vendor dashboards. Golden sets, rubrics, and regression rules versioned alongside the code that produces the output.*

---

## What the discipline is

An eval is a measurement of whether AI output is doing what it is supposed to do, with enough rigor that the measurement is trustworthy across changes. The amateur version is "I tried it three times and it looked good." The professional version is a versioned golden set, a versioned scoring rubric, a baseline number, and a rule that says a change does not ship if it regresses the baseline.

Without evals, an implementation is faith. With evals, every prompt change, model swap, RAG update, and tool-use refactor produces a number the operator can defend. When the king asks "is it better than last quarter," you have a chart.

## The high-leverage moves

**Build a golden set before you write a single new prompt.** Twenty examples that span the realistic distribution of inputs, with notes about why each example matters and what good output looks like. Twenty is enough. The point is not coverage. The point is a tripwire that catches regressions before they reach the king's customers.

**Write the rubric in the operator's words, not yours.** Interview whoever currently judges output quality. Capture their criteria verbatim. Convert that to a scoring prompt for an LLM judge. If the LLM judge does not agree with the operator on the easy cases, the rubric is wrong, not the operator.

**Make the eval a precondition for shipping.** Wherever prompt changes happen (a notebook, a script, a CI pipeline), the eval runs before the change ships. If the change regresses, the change does not ship. Without this gate, the harness is decoration.

**Score the LLM-judge against the human-judge.** Run the LLM judge against five outputs hand-scored by the operator. If they agree on the top dimension, the rubric is operational. If they diverge, iterate the rubric until they agree on the easy cases. This is the only check that keeps evals honest.

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

If those four are true, evals are real in the king's organization. If they are not, evals are theater.

## Pages in this discipline

- **[The Judgment Line](/disciplines/the-judgment-line)**: where AI ends and human judgment begins. The most important boundary in any AI system.
- **[The Overconfidence Trap](/disciplines/the-overconfidence-trap)**: the failure mode where the model is wrong with conviction and the operator believes it.
- **[LLM Psychosis](/disciplines/llm-psychosis)**: the failure mode where the model loses the plot mid-conversation. How to detect and prevent.
- **[Observable Behavior Engineering](/disciplines/observable-behavior-engineering)**: instrumenting AI systems so failures are visible before they reach the customer.

## Playbooks downstream

- **[First eval harness in week one](/playbooks/first-eval-harness)**: the procedure for standing up the minimum viable eval loop on a new engagement.

## Further Reading

- [Disciplines](/disciplines)
- [The Judgment Line](/disciplines/the-judgment-line)
- [First eval harness in week one](/playbooks/first-eval-harness)
