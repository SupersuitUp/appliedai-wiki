---
title: "In, On, and Out of the Loop"
slug: /concepts/in-on-out-of-the-loop
description: "Three positions a human can hold relative to an automated workflow: in the loop (the human is the gate), on the loop (the human supervises), out of the loop (fully automated, no human trigger). Good practice graduates each workflow down the loop as capability advances."
---

# In, On, and Out of the Loop

*Three positions a human can hold relative to an automated workflow: in the loop, on the loop, or out of the loop. Naming the position tells you where the human attention goes and how much of it. Good practice graduates each workflow down the loop, from in to on to out, as insight and AI capability make more of it safe to automate.*

![Four-panel neo-comic action-zine on cream paper, crimson + cobalt + gold + cyan. Title bar: IN, ON, AND OUT OF THE LOOP. Panel 1, IN THE LOOP: a glowing circular workflow loop with a human gate drawn directly across it, the supersuited hyperagent standing inside the gap as the gate; a card labeled CANNOT PROCEED WITHOUT ME sits on the gate; the loop is stalled waiting on him. Caption: 'In the loop: the human is the gate. The workflow cannot proceed without their judgment.' Panel 2, ON THE LOOP: the same loop now spinning on its own in cyan-and-gold, the hyperagent standing above it on a balcony watching a row of monitors, one card flashing crimson ANOMALY with his hand reaching to intervene. Caption: 'On the loop: the workflow runs itself. The human supervises and steps in when something looks off.' Panel 3, OUT OF THE LOOP: the loop fully closed and humming in gold, no human on it at all; a small FORM-SUBMITTED token enters one side and a HANDED-OFF token exits the other; a distant cobalt FUNCTION OWNER silhouette holds a clipboard reading ACCOUNTABLE IT KEEPS WORKING, not touching the loop. Caption: 'Out of the loop: fully automated, no human trigger. Someone still owns that it keeps working.' Panel 4, GRADUATE DOWN THE LOOP: first-person POV through the armored helmet visor, three loops in a descending ladder labeled IN then ON then OUT with a glowing cyan arrow pulling a workflow token down the ladder, a status strip reading CAPABILITY RISES, WORK MOVES DOWN, a gauntleted hand guiding the token, a single gold spiral halo at the top of the visor frame. Caption: 'The craft move: graduate each workflow down the loop as capability rises, freeing the human for the work that still needs them.' Footer bar: IN. ON. OUT. GRADUATE DOWN THE LOOP.](/img/comics/in-on-out-of-the-loop.png)

---

## The three positions

Every automated or semi-automated workflow puts a human in one of three positions. The position is the cleanest way to say how much human attention the workflow consumes and where that attention sits.

- **In the loop.** The workflow cannot proceed without the human's input or judgment. The human is the gate: the system can propose, draft, and flag, but it stops and waits for a person before the consequential step happens. This is the right position when the cost of a wrong call is high (sending money, publishing externally, committing on someone's behalf) and a person needs to approve before the action fires.
- **On the loop.** The workflow runs mostly on its own, and the human supervises. They watch the output, scan the logs or the scoreboard, and intervene when an anomaly appears or a threshold is crossed. They do not touch every run. This is the right position for high-volume, mostly-predictable work where reviewing each instance would defeat the point but unattended drift would be dangerous.
- **Out of the loop.** The workflow is fully automated with no human trigger. A form gets submitted, a cascade of steps fires, the result is handed off, and no person starts or gates each run. This is the right position for low-stakes, well-understood, repeatable work. Someone still owns the workflow (they are accountable that it keeps doing its job), but they are not in or on each run.

A useful test for which position a workflow is in: ask what happens if every human walks away for a week. In-the-loop work stops. On-the-loop work keeps running but accumulates unreviewed risk. Out-of-the-loop work just keeps working.

## Graduate down the loop

The positions are not fixed. The craft move is to **graduate each workflow down the loop over time**: from in, to on, to out, as two things change.

1. **Insight about the work.** The first time you run a workflow you keep a human in the loop because you do not yet trust the automation. As you watch it succeed, you learn which parts are safe to stop gating, and you move the human from in the loop to on the loop.
2. **AI capability.** Work that genuinely needed a human last quarter becomes reliably automatable as the models improve. A step that sat in-the-loop because the model could not be trusted with it moves on-the-loop, then out-of-the-loop, as capability crosses the bar.

The direction is one-way under normal conditions: down the loop, toward less human involvement per run, as trust and capability rise. The discipline is to move deliberately and only when the evidence supports it, and to move *back up* the loop the moment a workflow starts failing in a way that costs more than the human attention it would take to gate it.

Graduating down the loop is how a person ends up spending their time only on the work that still genuinely needs them. Each workflow that reaches out-of-the-loop is one a human never has to touch again, which frees that attention for the work still in or on the loop.

## How to use it

- **Tag every workflow with its current loop position.** It is a one-word annotation (in, on, out) that immediately tells a new operator where their attention is required.
- **Default a new automation to in the loop, then earn the way down.** Start with a human gate, watch it run, and graduate it only when the evidence says the gate is no longer earning its cost.
- **Keep the gate where the cost of error is high.** Some workflows should stay in the loop permanently. Loop position is a risk decision, not just an efficiency decision. The point is not to push everything to out-of-the-loop; it is to put each workflow in the right position for its stakes.
- **Name who owns the out-of-the-loop workflows.** Fully automated does not mean unowned. Every out-of-the-loop workflow needs an accountable owner who notices when it breaks, even though no one triggers it.

## What this does not mean

It is not the same as the [judgment line](/perspectives/the-judgment-line). The judgment line is about *what kind* of work goes to an LLM versus a script (judgment versus deterministic execution). Loop position is about *how much a human is involved* in the workflow as a whole. A single workflow has both: a judgment line inside it and a loop position around it.

Out of the loop does not mean out of mind. An unowned automation that no one notices when it breaks is a liability, not a win. The owner moves from running the work to owning that the work runs.

Down is not always right. The goal is the correct position for the stakes, not the lowest-human position possible. A high-stakes workflow graduated to out-of-the-loop to save attention is how expensive mistakes ship silently.

## Related

- [The Judgment Line](/perspectives/the-judgment-line), the orthogonal axis: LLM-judgment versus deterministic code inside a workflow.
- [Comparative Human Edge](/perspectives/comparative-human-edge), the roles a human keeps; the in-the-loop and on-the-loop steps are where that edge lives.
- [The Jagged Frontier](/perspectives/the-jagged-frontier), why capability advances unevenly, which is what lets workflows graduate down the loop at different rates.
- [Seat Wrapper](/concepts/seat-wrapper), the per-seat surface that congregates a seat's in-the-loop and on-the-loop work.

## Sources

The in-the-loop / on-the-loop / out-of-the-loop ontology is standard in the human-AI-collaboration literature. Representative treatments: [Human-in-the-Loop vs Human-on-the-Loop](https://thefix.it.com/human-in-the-loop-vs-human-on-the-loop-the-ai-control-guide/), [Moxo: how to choose the right automation model](https://www.moxo.com/blog/human-in-the-loop-vs-human-on-the-loop), and [The Loop Paradox](https://medium.com/@savneetsingh_1/the-loop-paradox-human-in-the-loop-human-above-the-loop-ai-in-the-loop-and-human-out-of-the-loop-03fee4d66798). The graduate-down-the-loop framing is the applied craft layer on top of the ontology.
