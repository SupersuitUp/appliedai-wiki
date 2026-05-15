---
title: "Intent Engineering"
slug: /disciplines/intent-engineering
description: "Encoding organizational purpose into infrastructure so AI agents make autonomous decisions aligned with what actually matters. The third discipline in the age of AI, and the one almost nobody is building for yet."
---

# Intent Engineering

*The third discipline in the age of AI. And the one almost nobody is building for yet.*

---

## Three Disciplines, Three Eras

To understand intent engineering, you have to see where it sits in a progression.

**Prompt engineering** was the first discipline. It was individual, synchronous, and session-based. You sat in front of a chat window, crafted an instruction, and iterated the output. The value was personal. The skill lived in the person, not the organization. This is the era that produced a thousand "how to write the perfect prompt" blog posts.

**[Context engineering](/disciplines/context-engineering)** is the discipline the industry is currently grappling with. Anthropic described it in late 2025 as the shift from crafting isolated instructions to crafting the entire information state that an AI system operates within. Building RAG pipelines, wiring up MCP servers, structuring organizational knowledge so agents can access it. Context engineering tells agents what to know.

**Intent engineering** is the third discipline, and it's the one that's mostly unbuilt. If context engineering tells agents what to know, intent engineering tells agents what to want. It is the practice of encoding organizational purpose into infrastructure as structured, actionable parameters that shape how agents make decisions autonomously, rather than as prose buried in a system prompt.

## The Problem Intent Engineering Solves

In January 2025, Klarna reported that its AI agent was doing the work of 853 full-time employees and had saved the company $60 million. In the same earnings cycle, its CEO admitted publicly that the AI strategy had cost something far more valuable than $60 million, and he was still trying to buy it back.

The agent had handled 2.3 million conversations in its first month across 23 markets and 35 languages. Resolution times dropped from 11 minutes to two. The projections looked extraordinary.

Then customers started complaining: generic answers, robotic tone, no ability to handle anything requiring judgment. By mid-2025, Klarna began frantically rehiring the human agents it had let go.

The standard reading of this story is that AI can't handle nuance. A more useful reading: the AI agent was extraordinarily good at resolving tickets fast, and that was the wrong goal to give the agent.

Klarna's organizational intent wasn't "resolve tickets fast." It was "build lasting customer relationships that drive lifetime value in a very competitive fintech market." Those are profoundly different goals, and they require profoundly different decision-making at the point of interaction.

A human agent with five years at the company knows this difference intuitively. She knows when to bend a policy, when to spend three extra minutes because the customer's tone suggests they're about to churn, when efficiency is the right move versus when generosity is. She knows because she absorbed Klarna's real values through months of osmosis: the decisions managers made every day, the stories veterans told new hires, the unwritten rules about which metrics leadership actually cared about when things got hard.

The AI agent knew none of it. It had a prompt. It had context. It did not have intent.

## What Intent Engineering Requires

Making organizational intent machine-readable is genuinely hard. Most organizations have never had to do this because humans could fill in the gaps. Intent lived in the heads of experienced employees, absorbed over months and years.

Agents can't absorb it. They need it explicit, before they start working.

At the top level, intent engineering requires goal structures that agents can interpret and act on. Not "increase customer satisfaction" (a human-readable aspiration) but an agent-actionable objective: what signals indicate customer satisfaction in this context? What data sources contain those signals? What actions is the agent authorized to take? What trade-offs is it empowered to make, and where are the hard limits?

Below that, you need delegation frameworks: organizational values translated into decision boundaries. Amazon's "customer obsession" leadership principle works for humans because humans can interpret it through contextual judgment. An agent needs it decomposed: when a customer request conflicts with a policy, here is the resolution hierarchy. When data suggests one action but the customer expressed a different preference, here is the decision logic.

At the base, you need feedback mechanisms that close the loop. When an agent makes a decision, was it aligned with organizational intent? How do you know? How do you correct drift over time?

## Why It Hasn't Been Built Yet

Three reasons.

First, it's genuinely new. Before agents could run autonomously over long time horizons, organizations didn't need this. The human was the intent layer. Long-running agents broke that model and created a demand for something that didn't exist.

Second, it's a two-cultures problem. The people who understand organizational strategy (executives, operations leaders) are not the people who build agents. The people building agents (engineers) don't typically see organizational alignment as their job. Bridging that gap requires someone whose role explicitly spans both. The applied AI implementer specialty exists to do exactly this.

Third, it's hard. Making organizational intent explicit and structured is difficult work. Most organizations have never had to do it. Their values live in slide decks, in leadership principles that get cited during performance reviews but aren't operationalized, in the tacit knowledge of experienced employees who know what to do in ambiguous situations even though they've never been told.

## Why It's Urgent

Organizations have solved "can AI do this task?" They have not solved "can AI do this task in a way that serves our organizational goals, at scale, with appropriate judgment?"

The second question is an intent engineering question.

The companies that answer it will be able to deploy agents with confidence across weeks and months of operation. The companies that don't will keep having their own Klarna moments: AI that works brilliantly at the wrong objective, optimizing for what it can measure while degrading what actually matters.

A mediocre model with extraordinary organizational intent infrastructure will outperform a frontier model operating with fragmented, inaccessible, unaligned organizational knowledge. The race in AI is no longer a model race. It's an intent race.

## Further Reading

- [Context Engineering](/disciplines/context-engineering): The companion discipline that tells agents what to know
- [Observable Behavior Engineering](/disciplines/observable-behavior-engineering): The discipline of translating vague intent into testable, measurable behaviors
- [Spec Writing](/disciplines/spec-writing): Where intent gets pinned down in concrete artifacts
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): Permission design as one of the most concrete forms of intent engineering
- Hat tip to [this video](https://www.youtube.com/watch?v=QWzLPn164w0), which named and articulated the intent engineering concept as clearly as anything we've encountered
