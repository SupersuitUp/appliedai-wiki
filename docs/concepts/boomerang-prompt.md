---
title: "Boomerang Prompt"
slug: /concepts/boomerang-prompt
description: "A prompt you hand another person so an AI interviews them on their own time, then returns their story to you as build-ready material for a bespoke artifact."
image: "/img/comics/boomerang-prompt.png"
---

# Boomerang Prompt

*A prompt you hand another person so an AI interviews them on their own time, then comes back to you loaded with everything you need to build them something.*

![Three-panel cream-paper comic strip. Chunky inked title bar: THE BOOMERANG PROMPT. Panel 1, label "1. THROW IT OUT": a hyperagent in bulky matte-navy plate armor with orange seams and a cyan visor throws a glowing rolled scroll marked "TAILORED PROMPT" across a warm lamplit room; an inked stamp reads "HYPERCONTEXT LOADED". Paper-tape caption: "You hand a friend one tailored prompt." Panel 2, label "2. IT DRAWS THEM OUT": a different flesh person, a young woman with curly dark hair in a yellow hoodie, sits on a couch talking into her phone; her spoken words stream out as a golden ribbon of interview beats (HOW IT STARTED, THE CHALLENGES, WHAT FINALLY CLICKED, LESSONS LEARNED, ADVICE FOR OTHERS, THE NEXT CHAPTER) with a small cyan question-mark bubble at the phone. Paper-tape caption: "An AI interviews them by voice, one question at a time." Panel 3, label "3. IT COMES BACK FULL": the scroll boomerangs back into the hyperagent's gauntlet and unfurls into a finished glowing one-page narrated website titled "MY STORY. MY PATH." with labeled sections; an inked stamp reads "READY". Paper-tape caption: "It returns loaded. You build the thing." Footer bar: GATHERING IS THEIRS. BUILDING IS YOURS.](/img/comics/boomerang-prompt.png)

---

You want to make someone a bespoke artifact: a narrated life-story page, a listening guide for their album, a founder profile, a tribute. The artifact is easy for you to build. The hard part is getting the raw material out of their head, and that material lives only with them.

The usual answer is to sit them down and interview them yourself. That does not scale, it depends on both of you being free at the same time, and most of your time in the room is spent transcribing and prompting rather than building.

A **Boomerang Prompt** removes you from the gathering. You write one tailored prompt, hand it to the person, and they paste it into a chat with an AI. The AI interviews them, one question at a time, on their own schedule. When it is done it writes their answers back in a structured, build-ready shape. They send you that output. You build. The prompt went out, did the extraction, and came back to you full. Hence the name.

## The split it creates

The core move is decoupling two jobs that are usually jammed together:

- **Gathering** belongs to the subject. Only they have the stories, the names, the dates, the feeling behind each choice. A Boomerang Prompt lets them supply all of it asynchronously, at high fidelity, without you present.
- **Building** stays with you. You receive a clean corpus and turn it into the polished artifact, applying taste and craft the subject does not have and does not want to learn.

This is the same instinct as the [capture-first autobiography](/playbooks/capture-first-autobiography): get the raw truth down first, in a form you can build any number of things from, and treat the polished output as a separate later step. The Boomerang Prompt is how you run that capture step for someone who is not you.

## Why it works

**Async beats scheduling.** The subject answers in the cracks of their week. No shared calendar slot, no meeting to run. A twenty-question interview that would take an awkward hour on a call becomes something they do over coffee across three sittings.

**A patient interviewer outperforms a form.** A blank questionnaire gets blank-questionnaire answers. An AI that asks one question, waits, and follows up when an answer is thin pulls out the story under the story. This is the [interview-prompts](/disciplines/interview-prompts) pattern doing the work: the prompt drives the conversation instead of asking the person to fill in placeholders.

**People say more out loud than they type.** Tell them to answer by voice. Every major chat app can transcribe dictation, so they can just talk. A person who would type three flat sentences will speak three warm paragraphs. Dictation is the single biggest lever on output quality here.

**You stay [in the loop where it counts](/concepts/in-on-out-of-the-loop).** You are out of the loop for gathering and firmly in the loop for building. The handoff is one clean artifact moving from them to you, not a live session you have to attend.

## Anatomy of a good Boomerang Prompt

A Boomerang Prompt has two explicit parts, and the second is what makes it boomerang rather than just chat.

**Part 1: Interview me.** Instruct the AI to ask one question at a time, wait for the full answer, never stack questions, and follow up when an answer is thin. Give it the areas to cover in rough order, but tell it to follow the energy of the answers rather than march a checklist. Tell it to gather far more than it will use.

**Part 2: Write it, build-ready.** When the subject signals they are done, the AI stops interviewing and writes the corpus in an exact structure you specify: the sections, the order, how to label each one, what to bold, how long. This is the difference between getting a transcript and getting something you can drop straight into a build. You are designing the shape of the return, not just the questions.

Two details that consistently raise quality:

- **Tell them to use dictation, not live voice mode.** You want the AI to transcribe their speech into text and then write the structured output. The live back-and-forth "voice mode" or "advanced voice" conversation leaves them with no written artifact to send you. The transcriber is the tool; the live phone-call mode is the trap.
- **Give the writeup a generous frame.** A narrator device (an AI voice that talks about the subject in the third person) lets the output say confident, warm things about the person that they would never write about themselves. The frame licenses generosity.

## Worked examples

**The narrated microautobiography.** A Boomerang Prompt interviews someone across seven areas of their life, then writes it as chapters spoken by a named AI narrator, formatted for the ear and ready to become an audio-narrated one-page site. The full paste-in prompt and build steps live in the [Generate a Microautobiography](/playbooks/generate-a-microautobiography) playbook, with a public worked example.

**The album listening guide.** The same shape, retargeted. A musician friend wanted a private page aimed at a prospective manager or distributor. The Boomerang Prompt walks him through his origin as an artist, then goes song by song (the story, how it was made, and full credits for each track), then the making of the record and a complete thanks list, and writes it as a narrated listening guide ready to build into a gated page. Same mechanism, different subject and different return structure.

**The build-ready spec.** The same shape, retargeted from a person's story to a person's project. A friend asks you to help build something but hands over a vibe, not a spec. The Boomerang Prompt interviews them across nine areas (the ask, current reality, the dream, features, data, constraints, open questions, success) and returns a build-ready spec led by a triage-ready TL;DR, which they paste into a Google Doc and send you. Now you can tell whether you can help, whether an off-the-shelf tool already does it, or who to forward it to. The full paste-in prompt lives in the [Generate a Build-Ready Spec](/playbooks/generate-a-spec) playbook.

The pattern generalizes: change the areas covered and the shape of Part 2, and the same technique produces founder profiles, memorial pages, portfolio narratives, or onboarding dossiers.

## When to use it, and when not to

Reach for a Boomerang Prompt when the raw material lives in someone else's head, the artifact is worth building well, and you do not need to be present for the telling. It is at its best for one bespoke artifact per person.

Interview the person yourself instead when the conversation is the point (you are building the relationship, not just the artifact), when the subject cannot or will not run a chat tool, or when what you need is two sentences rather than a corpus. And skip the whole apparatus when you already have the material; the technique is for extraction, not for dressing up facts you already hold.

---

## Further Reading

- [Interview Prompts](/disciplines/interview-prompts): The prompt-design pattern the Boomerang Prompt is built on, for when you are the one running it
- [Generate a Microautobiography](/playbooks/generate-a-microautobiography): The flagship worked example, with the full paste-in prompt
- [Generate a Build-Ready Spec](/playbooks/generate-a-spec): The boomerang retargeted at a project instead of a person, so a vague ask comes back as a spec you can triage
- [The Capture-First Autobiography](/playbooks/capture-first-autobiography): The broader principle of gathering raw truth before building any format from it
- [In, On, and Out of the Loop](/concepts/in-on-out-of-the-loop): Choosing where the human belongs in an AI workflow
