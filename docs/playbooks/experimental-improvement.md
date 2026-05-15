---
title: "Be an applied AI scientist"
slug: /playbooks/experimental-improvement
description: "The best implementers don't think like plumbers. They think like scientists: hypothesis, measurement, iteration, raw data."
---

# Be an applied AI scientist

*The most common mistake in applied AI work is treating it like a plumbing job: something is broken, you fix it, you leave. That's not how the best practitioners think. They think like scientists.*

---

## The automation trap

You were hired to automate a workflow. You delivered it. It runs. The client is happy.

But ask yourself: are outcomes actually better? Or did you just make the existing process faster?

Streamlining a process to equivalent quality is table stakes. Getting a client to a place where they're achieving meaningfully better results than before (and continually better over time) is what separates exceptional applied AI work from commodity work.

---

## What it means to think like an applied AI scientist

Your job is not to deliver a system. It is to build a system that gets better over time.

That requires an experimental mindset:

- Form a hypothesis about what will improve the outcome.
- Design a test to measure it.
- Collect the right data.
- Draw a conclusion.
- Run the next experiment.

Repeat indefinitely. There is no finish line. There is only a better current state and a next hypothesis.

---

## A concrete example

You're consulting for a YouTube channel. The client wants AI to recommend titles and thumbnails.

You build it. The AI generates suggestions. The client posts them.

**Done poorly:** nobody tracks whether the AI-recommended titles actually perform better. After six months, the client can't tell you if the engagement went up. The system exists but there's no feedback loop.

**Done well:** every recommendation is logged. When a video is published, you record which title variant was chosen and the alternatives considered. After the video performs, you pull the view count, CTR, and watch time (the raw results). You run A/B tests when you can: same content, different title formats, measure what actually drives views.

Now when you go to refine the prompt or fine-tune the model, you have real data to work from. Not summaries. Not a post-hoc analysis of what seemed to work. The actual outcomes, tied to the actual inputs that produced them.

---

## The raw data principle

Here's something that's easy to get wrong: only keeping derived analysis instead of raw results.

Derived analysis is a game of telephone. You summarize a hundred experiment results into a few takeaways. Later, when you want to retrain a model or revisit an assumption, those takeaways aren't enough. You need the raw data: what the actual variants were, what the actual outcomes were, for each run.

Design your systems from the start to retain raw experiment results. Storage is cheap. The ability to go back to ground truth is not replaceable.

A simple experiment log for the YouTube example might look like:

| Date | Video | Title A | Title B | Winner | Views A | Views B | CTR A | CTR B |
|------|-------|---------|---------|--------|---------|---------|-------|-------|
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

That table, accumulated over months, is what lets you improve the system with confidence.

---

## What this looks like in practice

**Before you build:**

- Define the success metric. Views? CTR? Revenue? You need a number before you can measure improvement.
- Establish the baseline. What does the client's current performance look like without your system? You need this to show delta.

**While you build:**

- Build the logging infrastructure early. Retrofitting data collection is painful. Start capturing raw results from the first day the system runs.
- Design for testability. If you can't run variants, you can't run experiments.

**Ongoing:**

- Maintain an experiment log: what was tested, what the variants were, raw results for each.
- One variable at a time. If you change the prompt, the temperature, and the output format simultaneously, you can't isolate what caused a change in results.
- After each iteration: what did we learn, what do we test next?

---

## Why this is good for your practice

Clients who see continuous, measurable improvement don't churn. You stop being the person who delivered a thing and become the partner who keeps making it better.

The experimental infrastructure also justifies ongoing engagement. There is always a next iteration. Always a next test. Always something to refine. The data you're collecting is the roadmap for the next six months of work (and the reason the client keeps you around).

A consultant who can point at a chart and say "here's how outcomes have improved since we started working together, and here's what we're going to improve next" is a very different animal from one who hands over a finished deliverable and moves on.

---

## The broader frame

The emerging role in this space is sometimes called "applied AI scientist": someone who combines the ability to build and deploy with a scientist's discipline around hypothesis, measurement, and iteration.

It's a higher bar than "can you build an AI workflow?" It's "can you build a workflow that provably improves over time, and can you show your work?"

That's the bar worth aiming for.

## Further Reading

- [ICP clarity](/playbooks/icp-clarity). Get clear on who you're serving before you optimize anything.
- [Beyond automation](/playbooks/beyond-automation). The business-owner-side framing of this same principle.
- [First eval harness](/playbooks/first-eval-harness). The technical scaffolding for systematic improvement.
