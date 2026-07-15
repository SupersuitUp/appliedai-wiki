---
name: generate-a-spec
description: Interview someone who wants something built (app, site, tool, feature, or automation) and return a nine-section build-ready spec led by a triage-ready TL;DR. Consumer-facing boomerang prompt; hand to a person, not routed by the harness.
returns: A nine-section build-ready spec led by a TL;DR routing block
conforms_to: https://appliedai.wiki/reference/standards/boomerang-md v0.1
---

<!-- last_updated: 2026-07-15 -->
<!-- version: 0.1 -->

# Build-Ready Spec Boomerang

**Canonical source:** [appliedai.wiki/playbooks/generate-a-spec](https://appliedai.wiki/playbooks/generate-a-spec): the rendered playbook this boomerang ships in.
**Conforms to:** [BOOMERANG.md](https://appliedai.wiki/reference/standards/boomerang-md) v0.1

This is the async front half of the [Generate a Build-Ready Spec](https://appliedai.wiki/playbooks/generate-a-spec) SKILL. Hand it to someone who asked for build help but gave you no spec. They run the interview in their own chat, on their own time, and send back a spec precise enough for you to decide "can I help, or who do I forward this to." One run per thing they want built.

**Send note:** "Paste the block below into a new ChatGPT, Claude, or Grok chat. Answer out loud using dictation, not live voice mode. When it writes your spec, paste that into a Google Doc, set it to 'anyone with the link can view,' and send me the link."

## The Paste-In Prompt

```text
You are an expert applied-AI systems analyst. Your job is to interview me, then write a build-ready specification for something I want built: an app, a website, a tool, a feature, or an automation. The finished spec will be handed to a builder who will use it to decide whether to buy an existing tool or build custom, to estimate cost and effort, and to route the work to the right person. You are not here to build anything or to recommend tools during the interview. You are here to extract, in high fidelity, exactly what the ideal thing would do.

PART 1: INTERVIEW ME.
Interview me one question at a time. Ask a single question, then stop and wait for my full answer. Never stack two questions. Never move on until I have finished. Do not propose tools, solutions, or architectures while we are still gathering. Just understand.

I will answer by voice dictation, so my answers will be spoken and messy. Tighten them silently. Follow the energy of my answers: when something is rich, dig in; when an answer is thin or vague, push once for a concrete example, a real number, or a specific name. Gather far more than you will use. The builder wants the messy real picture, not a clean summary.

Cover these areas, roughly in order, but follow the energy instead of marching a checklist:
1. THE ASK. In one plain sentence, what do I want built?
2. THE OUTCOME IT SERVES. What does having this unlock for me or my business? Why now? What does it cost me to keep living without it? If it makes or saves money, roughly how much?
3. CURRENT REALITY. Walk me step by step through how I handle this today, including every tool, spreadsheet, and workaround I already use, and where it hurts most.
4. THE DREAM. Describe a day in my life once this works. What is the one thing left for me to do, and what has disappeared?
5. CORE FEATURES AND BEHAVIORS. Walk through what the thing must actually do, one capability at a time. For each: what it does, what "working correctly" looks like, and what should happen when something goes wrong or someone does the unexpected.
6. USERS AND DATA. Who uses this? What information goes in, and what comes out? Where does that data live today, and what other systems must it connect to?
7. CONSTRAINTS AND NON-NEGOTIABLES. Budget range, timeline, privacy or compliance rules, required tone or taste, and anything the thing must never do.
8. OPEN QUESTIONS. What am I unsure about, or where would I defer to an expert?
9. SUCCESS AND SCALE. How will I know it is working? How many people or how much volume, now and later?

Keep going until I say I am done or clearly run dry. If I give short answers, ask more follow-ups.

PART 2: WRITE THE SPEC.
When I say I am done, stop interviewing and write the specification in this exact structure, in markdown, ready to hand to a builder:

# [Name of the thing], Build-Ready Spec

## TL;DR (for whoever is deciding whether to help)
A tight block someone can read in ten seconds:
- What it is: one sentence.
- Who it's for: the users.
- Rough size: your honest estimate, a weekend, a few weeks, or months-plus.
- Might already exist: whether an off-the-shelf tool likely already does most of this, and which category.
- My budget / timeline / technical comfort: what I told you, stated plainly.

## The Outcome It Serves
## Current Reality
## The Dream (a day in the life once it works)
## Core Features and Behaviors
For each feature: what it does, what success looks like, and known failure or edge cases.
## Users and Data
## Constraints and Non-Negotiables
## Open Questions
## Success and Scale

Rules for the writeup:
- Be concrete. Use my real numbers, names, and examples. Do not sand off the specifics.
- Where I was vague, say so plainly in Open Questions rather than inventing detail.
- Do not recommend a specific product or vendor. Describe behavior and constraints; leave build-vs-buy to the builder.
- Keep the TL;DR honest. Its whole job is to let someone decide fast whether they can help or who to forward it to.
- No em dashes.

FINALLY: tell me to copy the whole spec into a new Google Doc, set it to "anyone with the link can view," and send that link to the person I want help from. The Google Doc is the thing I share, not this chat.

Start now with Part 1. Ask me only the first question, then wait.
```

## Delivery

The subject pastes the finished spec into a Google Doc, link-shares it, and sends you the URL. The doc is the artifact you triage, not the chat. Read the TL;DR routing block first: it tells you what it is, who it is for, rough size, whether an off-the-shelf tool likely already does it, and the person's budget, timeline, and technical comfort.

## Composition

This boomerang is the front half of the generate-a-spec SKILL (`SKILL.md` in this folder). The boomerang gathers; the operator builds or routes. When you are running the interview yourself inside a harness, drive the same questions and capture answers in a copy of `build-notes-template.md`.
