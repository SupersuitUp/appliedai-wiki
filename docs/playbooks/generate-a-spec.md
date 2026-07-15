---
title: Generate a Build-Ready Spec
slug: /playbooks/generate-a-spec
description: A Boomerang Prompt that turns a vague "can you help me build this?" into a build-ready spec. Hand it to the person who wants something built, an AI interviews them on their own time, and it returns a nine-section spec led by a triage-ready TL;DR that they paste into a Google Doc and share.
image: "/img/comics/generate-a-spec.png"
---

# Generate a Build-Ready Spec

*A Boomerang Prompt you hand to anyone who asks for build help but gives you no spec: an AI interviews them on their own time and returns a spec precise enough for you to decide "can I help, or who do I forward this to."*

![Three-panel cream-paper comic. Title bar: GENERATE A BUILD-READY SPEC. Panel 1, THE VAGUE ASK: a flesh person in a yellow hoodie shrugs and holds out a nearly blank sticky note reading "can you build me a thing?" to a hyperagent in matte-navy plate armor with orange seams and a cyan visor; caption "They ask for help with no spec." Panel 2, IT INTERVIEWS THEM: the same person sits talking into their phone, their spoken words streaming out as a golden ribbon of labeled interview beats (THE ASK, CURRENT REALITY, THE DREAM, FEATURES, DATA, CONSTRAINTS) with a small cyan question-mark bubble; caption "One question at a time, on their own time." Panel 3, IT COMES BACK BUILD-READY: a glowing Google Doc unfurls from the hyperagent's gauntlet, topped by a boxed TL;DR panel stamped READY, with labeled spec sections (project scope, technical requirements, constraints) beneath; caption "You read the TL;DR and route it in ten seconds." Footer bar: GATHERING IS THEIRS. TRIAGE IS YOURS.](/img/comics/generate-a-spec.png)

---

Implementation is being commoditized. The [spec is where the value lives now](/disciplines/spec-writing). Which means the most common way people waste your time is asking for help with no spec: a vibe, a screenshot, a "can you build me a thing." You cannot tell whether you can help, whether an off-the-shelf tool already does it, or who to forward it to, because the raw material lives only in their head.

This playbook is the fix. It packages a [Boomerang Prompt](/concepts/boomerang-prompt) as a reusable skill: you hand it to the person, an AI interviews them asynchronously, and it comes back to you as a build-ready spec. Gathering belongs to them. Triage belongs to you.

It ships as a skill (`generate-a-spec`), not a one-time GENERATE, because you run it every time someone shows up empty-handed. The recipe produces a document, not a scaffolded system, so it is a capability you perform and re-perform.

## What This Produces

One build-ready specification for a single thing the person wants built (an app, a website, a tool, a feature, or an automation), in a fixed nine-section structure, led by a **TL;DR routing block** a busy reader absorbs in ten seconds:

- **What it is**, in one sentence, and **who it's for**.
- **Rough size**: a weekend, a few weeks, or months-plus.
- **Might already exist**: whether an off-the-shelf tool likely does most of this.
- **Budget, timeline, and technical comfort**, as the person stated them.

Below the TL;DR sit eight more sections: the outcome it serves, current reality, the dream, core features and behaviors (each with success conditions and failure modes), users and data, constraints and non-negotiables, open questions, and success and scale.

The success test: someone who has never heard of the project reads the TL;DR and decides, in under a minute, whether they can help or who to forward it to. If a stranger still has to ask "so what do you actually want?", the interview failed, not the template.

## Why the Shape Works

**Async beats scheduling.** They answer in the cracks of their week. No meeting to run.

**A patient interviewer beats a form.** A blank questionnaire gets blank-questionnaire answers. An AI that asks one question, waits, and follows up when an answer is thin pulls out the real constraints and the real numbers.

**Dictation is the biggest lever.** A person who would type three flat sentences will speak three warm paragraphs. Tell them to talk, using dictation and not live voice mode, so there is a written spec at the end.

**The routing block does the triage work.** Everything else in the spec is for the builder. The TL;DR is for you: it exists so you can decide fast whether you are the right help.

## The Copy-Paste Boomerang Prompt

Hand the person this note with it: *paste the whole thing into a new ChatGPT, Claude, or Grok chat, answer out loud using dictation, and when it writes your spec, paste that into a Google Doc and send me the link.*

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

The raw files ship with the skill: the [paste-in prompt](pathname:///skills/generate-a-spec/BOOMERANG.md) (a conforming [BOOMERANG.md](/reference/standards/boomerang-md) instance) and a [build-notes template](pathname:///skills/generate-a-spec/build-notes-template.md) for when you run the interview yourself inside a harness.

## When Not to Run This

- You already have the detail. This is for extraction, not for dressing up facts you already hold.
- The conversation is the point. If you are building the relationship, not just the artifact, interview them yourself.
- The ask is two sentences, not a system. A spec would be heavier than the thing deserves.

## Further Reading

- [Spec Writing](/disciplines/spec-writing): the discipline this operationalizes; the spec it produces is the input to spec-driven development.
- [Boomerang Prompt](/concepts/boomerang-prompt): the pattern this playbook is an instance of.
- [BOOMERANG.md](/reference/standards/boomerang-md): the file-format standard this skill's paste-in prompt conforms to.
- [Interview Prompts](/disciplines/interview-prompts): the prompt-design craft behind the interview half.
- [Generate a Microautobiography](/playbooks/generate-a-microautobiography): the sibling boomerang, retargeted at a life story instead of a spec.
