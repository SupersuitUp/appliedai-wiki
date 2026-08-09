---
title: "Daily Use Is the Benchmark That Can't Be Gamed"
slug: /perspectives/daily-use-is-the-benchmark-that-cant-be-gamed
description: "A published benchmark is a target a vendor can train to. Months of daily use by a demanding operator is an eval nobody can see, so nobody can game it. Trust the felt experience, and the revealed preference of builders you respect, over the leaderboard."
image: "/img/comics/daily-use-is-the-benchmark-that-cant-be-gamed.png"
---

# Daily Use Is the Benchmark That Can't Be Gamed

*A published benchmark is a target a vendor can train to. Months of daily use by a demanding operator is an eval nobody can see, so nobody can game it. When choosing a model, weigh the felt experience, and the revealed preference of builders you respect, over the leaderboard.*

![Three panels. One: at a warm wooden desk, a silver-haired woman in a rust cardigan studies the glowing amber laptop, where a gold trophy stamped 98 stands under spotlights and confetti; caption THE STAGED SCORE. Two: inside the screen the same trophy has turned to show its back, open and hollow like a theater prop held up by a wooden brace, and she leans in with eyebrows raised; caption PROPPED FOR THE TEST. Three: beside a wall calendar dense with cross-marks, she writes calmly in a notebook while the small coral holographic Chief of Agents in its gold admiral hat presents a solid stack of finished pages on the screen; caption PROVEN BY DAILY WORK. Title bar: THE BENCHMARK THAT CAN'T BE GAMED. Footer: A SCORE CAN BE STAGED. A YEAR OF USE CANNOT.](/img/comics/daily-use-is-the-benchmark-that-cant-be-gamed.png)

---

## A published benchmark is a training target

The moment a benchmark starts moving purchase decisions, it stops being a neutral measurement and becomes a target. A lab that wants the score can get the score: tune on data shaped like the test, optimize for the grader's preferences, ship a model that is excellent at the benchmark without being excellent at the general ability the benchmark claims to measure. Call it hyperfitting. It is the model-market version of a rule every operator already knows: when a measure becomes a target, it stops measuring.

This does not make benchmarks worthless. A model that cannot score well is telling you something, and [evals](/disciplines/evals) remain the discipline for testing your own systems against your own tasks. It makes benchmarks a screen, and a screen is the wrong instrument for a final verdict. A high score is compatible with a great model and compatible with a model built to produce high scores. The leaderboard cannot tell you which one you are looking at.

## Your daily use is an eval nobody has seen

There is a benchmark no lab can train against: your own work. An operator who lives inside a harness runs hundreds of implicit evals a day, on tasks no benchmark author has imagined, in a context no training set contains. Did it understand the half-specified request. Did it hold the thread across a long session. Did it push back when the instruction was wrong. Did the output survive contact with a real client, a real deploy, a real deadline.

Months of that is the deepest eval that will ever be run on a model for your purposes, and it has a property no public benchmark has: it is invisible to the vendor. Nobody can overfit to a test they cannot see. So the felt experience of daily use is trustworthy in a way a score is structurally not. If the model were weaker than its numbers, you would feel it, the way you feel a car that pulls slightly left. Friction that appears where there was none is data. Smoothness that holds across a thousand varied asks is data. This is also why a distilled model [can benchmark well and still feel thin under pressure](/perspectives/you-cant-distill-your-way-to-the-frontier): the surface copies, the depth does not, and daily use is where you spend time in the depth.

## Revealed preference aggregates thousands of private evals

You cannot run a month-long trial of every model, and you do not have to. Watch what the builders whose work you respect actually pay for, day after day, when their own output is on the line.

Cheap distilled models sit near the top of public leaderboards at a fraction of frontier prices. If score-per-dollar were the true measure, serious builders would have migrated in droves. Look around at the people shipping software you admire: they are paying for frontier subscriptions and daily-driving frontier harnesses. The wallets have not moved. That is not brand loyalty. It is thousands of private, unhackable evals, run by demanding operators on real work, returning a different verdict than the leaderboard. Revealed preference is the aggregate of every eval nobody published, and for [skilled work only the frontier holds up under it](/perspectives/only-frontier-models-replace-skilled-labor).

## Daily use also reveals the maker

A long stretch of daily use tells you about more than the model. Values leak through a product's defaults: what it does when your instructions run out, whether it will tell you no for your own stated reasons, how it behaves when it fails. A tool built by people who care about the human on the other side feels different across a thousand small interactions, and no benchmark measures that either.

This matters because you are not choosing a score, you are [choosing a stack to trust with your mission](/perspectives/pick-a-stack-that-can-be-faithful-to-your-mission), and the market helps you here: for tools bought to do real work, [commercial success itself selects for truthful models](/perspectives/commercial-success-selects-for-truthful-models), because the customer's "did I get what I wanted" is run every session. Your daily use is your seat in that selection process. The verdict you feel is the same verdict the market is aggregating.

## What it means for operators

- **Use leaderboards to shortlist, never to decide.** A benchmark score earns a model a trial, nothing more.
- **Run the real trial.** Put a candidate model in your actual harness, on your actual work, for weeks. The felt experience over that stretch outranks any published comparison.
- **Weigh revealed preference.** Ask what the practitioners you respect daily-drive and pay for. Their subscriptions encode more eval data than their opinions do.
- **Treat felt regressions as signal.** When a tool that was smooth develops friction, something changed. Investigate before you rationalize.
- **Notice what the product says about the maker.** You are entering a long relationship with a vendor's judgment. The daily experience is your best evidence of what they optimize for.

---

## Further Reading

- [Evals](/disciplines/evals) the discipline of testing AI systems against your own tasks, which is what daily use does informally at scale
- [You Can't Distill Your Way to the Frontier](/perspectives/you-cant-distill-your-way-to-the-frontier) why a model can score well and still feel thin under pressure
- [Only Frontier Models Replace Skilled Labor](/perspectives/only-frontier-models-replace-skilled-labor) the capability asymmetry that daily use keeps rediscovering
- [Pick a Stack That Can Be Faithful to Your Mission](/perspectives/pick-a-stack-that-can-be-faithful-to-your-mission) the selection criteria beyond capability, which daily use is uniquely positioned to test
- [Commercial Success Selects for Truthful Models](/perspectives/commercial-success-selects-for-truthful-models) why the market's verdict and your felt verdict converge for work tools
