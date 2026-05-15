---
title: "First eval harness in week one"
slug: /playbooks/first-eval-harness
sidebar_position: 1
description: "Stand up the minimum viable eval loop on a new engagement so quality is measured from day one, not discovered three months in."
---

# First eval harness in week one

*Stand up the minimum viable eval loop on a new engagement so quality is measured from day one, not discovered three months in.*

---

## When to run this

You have just started an implementation engagement where AI output quality matters and the client has no eval discipline yet. Symptoms: prompt changes are being shipped to production based on vibes, regressions are caught by users not engineers, and "is it better?" is answered by a senior person re-running a few examples manually.

This playbook does not apply if the engagement is about strategy, training, or non-AI process work. It applies specifically to engagements producing AI output that has a quality bar.

## Prerequisites

- Read access to whatever the AI system is producing now. Last 7 days of outputs is enough.
- One hour with the person who currently judges quality (operator, founder, head of the function).
- A scratch repo or document where you can write a golden set, run prompts, and record results.

## Steps

1. **Define the quality bar in writing.** Interview the quality judge for 30 minutes. Ask: "Show me three recent outputs you were happy with and three you were not. Tell me why." Write down the criteria they actually use, in their own words. This is your rubric. Do not invent criteria from scratch. The operator already has them; they are usually implicit.

2. **Build a golden set of 10-20 examples.** From the last 7 days of outputs, pick 10-20 input/output pairs that span the realistic distribution. Include the hard cases the operator complained about. Save them as a single JSON or CSV with `input`, `expected_output`, `notes`. Twenty is enough. The goal is not coverage. The goal is a tripwire that catches regressions.

3. **Write the rubric as a scoring prompt.** Convert the criteria from step 1 into a single prompt that asks an LLM to score an output against the criteria on a 1-5 scale per dimension. Each dimension gets one paragraph of definition and one example of a 1, 3, and 5. The LLM-as-judge prompt is itself an artifact you will version.

4. **Run the current production prompt against the golden set.** Score every output with the rubric. Write the numbers to the same JSON file. This is your baseline.

5. **Set the regression rule.** A change ships only if it does not regress the baseline by more than X on any dimension. Pick X with the operator. Common starting points: zero regression allowed on the top dimension, half a point allowed on others.

6. **Wire it into the workflow.** Wherever prompt changes happen: a notebook, a script, a CI pipeline: make the eval run before the change ships. If the change regresses, the change does not ship.

## What good looks like at the end

- A versioned `evals/` directory in the repo with `golden_set.json`, `rubric.md`, and a `run.py` (or equivalent) that scores any prompt against the set.
- A baseline score for the current production prompt, recorded by date.
- One prompt change has been run through the harness and either shipped or rejected.
- The operator has seen the dashboard once and agrees the numbers match their intuition.

If those four are true, you have an eval harness. You will improve it. You have one.

## Common failure modes

- **Rubric is too generic.** "Quality" or "helpfulness" alone does not work. The LLM-judge needs dimensions specific to the task: "tone matches the brand voice," "actionable next step is present," "all named entities are spelled correctly." → Re-interview the operator. Ask for criteria specific enough to disagree about.
- **Golden set is too easy.** If the baseline scores all 5s, the harness will never catch a regression. → Add the hardest 5 outputs the operator complained about. The harness should catch known failures or it is useless.
- **LLM-judge disagrees with the operator.** Score 5 outputs by hand and compare to the LLM-judge scores. If they diverge on the top dimension, the rubric prompt is wrong. → Iterate the rubric until the LLM-judge and the operator agree on the easy cases.
- **No one runs it.** A harness that lives in a folder no one checks is decoration. → Pair with the engineering team to put the eval run in their actual workflow before declaring this playbook done.

## Further Reading

- [Disciplines](/disciplines): Evals discipline page (when stood up)
- [Playbooks](/playbooks): other engagement playbooks
