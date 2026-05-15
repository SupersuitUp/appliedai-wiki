---
title: "Train Your Agent Like You Would Train a Human Apprentice"
slug: /foundations/train-your-agent
description: "Define what good looks like in observable terms, run feedback cycles fast, and encode every correction as a permanent rule."
---

# Train Your Agent Like You Would Train a Human Apprentice

*Most people give their agent one task, get a bad result, and conclude AI does not work. That is like hiring an apprentice, giving them zero training, and firing them after their first mistake.*

---

## The Problem

You ask your agent to write an email. It comes back sounding like generic internet slop. You conclude: "AI writing is bad."

You ask your agent to draft a strategy. It comes back vague and surface-level. You conclude: "AI cannot think strategically."

You ask your agent to do research. It hallucinated two facts. You conclude: "AI is unreliable."

In every case, the conclusion is wrong. The agent did exactly what you trained it to do, which was nothing. You gave it no rules, no examples, no context about what good looks like. You expected it to guess, and it guessed wrong. This is not an AI problem. This is a training problem.

## The Apprentice Mental Model

If you hired a new apprentice and said "write me an email," and they wrote something mediocre, you would not fire them. You would say: "Here is how I write. Here are 10 examples of emails I have sent. Never use these words. Always open with the key ask. Keep it under 5 sentences." And the next email would be better.

AI works the same way. The difference is speed. With a human apprentice, 100 feedback cycles might take a year. With an agent, 100 feedback cycles take 100 minutes. The training methodology is identical. The clock speed is different.

## Define What Good Looks Like

The single most important thing you can do to improve your agent's output is to define what good looks like in terms of [observable behaviors](/disciplines/observable-behavior-engineering). Not vibes. Not "make it better." Observable, concrete, verifiable criteria.

Bad: "Write with more personality."
Good: "Never use the words 'delve,' 'leverage,' or 'utilize.' Start every email with the action item, not the context. Write at a 6th grade reading level. Here are 5 examples of emails I wrote that I consider excellent."

Bad: "Make the strategy more concrete."
Good: "Every strategy section must include: what we are doing, why, what success looks like in 30 days, and the first three steps. No section should be longer than 4 sentences."

The agent does not know what you want until you tell it. And "tell it" means rules and examples, not adjectives.

## The Reinforcement Loop

Humans learn through reinforcement. You do a thing, get an outcome, good or bad. If good, do more. If bad, do less. You get better at recognizing patterns. You develop "taste."

Agents learn the same way, except the feedback is explicit, not implicit. Every time you correct an agent's output, that correction should become a permanent rule. Not a one-time fix. A rule that prevents the mistake from ever happening again.

This is what skill files are. Every correction, every refinement, every "no, do it like this" becomes a line in a skill file or a rule in your `CLAUDE.md`. The agent never forgets a rule. It never has a bad day. It never needs to be told twice, if you actually write it down.

The loop:

1. **Give the agent a task**
2. **Review the output**
3. **Identify what is wrong** (in observable terms, not vibes)
4. **Write a rule** that prevents that specific failure
5. **Add the rule to the skill file or CLAUDE.md**
6. **Run the task again**
7. **Repeat until the output is consistently good**

After 10 cycles, your agent is competent. After 50, it is good. After 100, it produces output you would be proud to send under your own name. And those 100 cycles happened in days, not years.

## Examples Over Explanations

The most powerful thing you can put in a skill file is not a rule. It is an example.

If you want your agent to write emails that sound like you, do not write 20 rules about your email style. Give it 10 emails you actually sent that you consider excellent. The agent will extract the patterns better than you could articulate them.

If you want your agent to produce strategic documents in your format, do not describe the format. Give it 3 documents that are exactly what you want. "Make the next one look like these."

Rules constrain. Examples teach. Use both, but when in doubt, add another example.

## Why Most People Fail at This

The same reason most people are bad managers. They do not define what good looks like. They expect the other party (human or agent) to read their mind. When the output is wrong, they blame the tool instead of the instruction.

The people who get the most out of AI are the same people who were already good at training humans: clear communicators who think in terms of observable outcomes rather than feelings. If you have ever written a great SOP, you can write a great skill file. If you have ever onboarded an employee well, you can onboard an agent well.

The meta-skill of the applied AI era is not prompt engineering. It is the ability to define what you want with enough precision that a system (human or machine) can reliably deliver it. That is the skill that separates "AI is okay" from "AI changed my life."

## The Compounding Effect

Here is what most people miss: every rule you write, every example you provide, every correction you encode into a skill file is permanent. It compounds.

A human apprentice might forget rule 47 after three months. Your agent will not. Every investment in training your agent pays dividends on every future interaction. Your agent at day 90 is operating on the accumulated wisdom of every correction you made on days 1 through 89. A human cannot do that. Their working memory has limits. Your agent's context files do not.

This is why the agent workspace architecture matters. The user profile, the skill files, the principles, the relationship files: they are not just context. They are training data. Every file you add makes the agent better at everything, not just the specific task that prompted the file.

---

## Further Reading

- [Observable Behavior Engineering](/disciplines/observable-behavior-engineering): Defining what good looks like in concrete terms
- [Context Engineering](/disciplines/context-engineering): The discipline of curating what your agent knows
- [Context Lake](/disciplines/context-lake): The workspace your trained agent operates within
- [Compounding Docs](/foundations/compounding-docs): How every correction makes the next output better
