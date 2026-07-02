---
title: Generate a Microautobiography
slug: /playbooks/generate-a-microautobiography
description: A GENERATE.md recipe that produces an AI-narrated life-story site for one person. Run a seven-question life interview, lock the narrator persona and voice, write chapters for the ear, and ship a page where every sentence is clickable, highlighted as it is read, and scored with music. One-time generation per person.
---

# Generate a Microautobiography

{/* last_updated: 2026-07-02 */}
{/* version: 0.1 */}

*A microautobiography is a person's life told in narrated chapters on a single page: an AI narrator reads it aloud over music, the sentence being spoken glows, and clicking any sentence plays from exactly there.*

**Where the canon lives.** The always-current runnable procedure is the `GENERATE.md` inside the template repo, because the procedure ships with the code it operates: [SupersuitUp/microautobiography-template](https://github.com/SupersuitUp/microautobiography-template). This page is the wiki home for the recipe: what it produces, why the shape works, and when to run it. When the two differ, `GENERATE.md` wins.

This is a worked example of a [Hyperdocumented SOP](/concepts/hyperdocumented-sop): the interview, the build rules, and the failure modes learned in the reference build are all encoded where the next operator will trip over them. It composes the same pattern as [Generate an Agentic Brand OS](/playbooks/generate-agentic-brand-os): interview to lock identity, then generate from a forkable template rather than from scratch.

## What This Generates

A deployed one-page site for one person, from a fork of the template:

- Chapters of their life story written in the voice of a named AI narrator: first person as the AI, third person about the subject.
- Narration audio per chapter (ElevenLabs, generated with character timestamps), committed as static files so the live site has no runtime AI dependency.
- Sentence-level sync: the sentence being read is highlighted, and every sentence is a seek target. This is the feature that makes the page feel alive; it is generated for free from the timestamped narration.
- A background music bed, a live waveform, image carousels per chapter, and verse blocks for poems or scripture.
- The subject's real photos wherever possible. Fully generated art is disclosed in its caption ("An imagining of ...").

The success test: a stranger presses play, and three chapters later they feel they know the person. If the page reads like a resume, the interview failed, not the template.

## Prerequisites

- Node 20+, `pnpm`, `git`, and `gh`.
- An ElevenLabs account and API key, and a voice chosen from its library. `GENERATE.md` walks through both.
- A Vercel account for deploy.
- Two to three hours with the subject for the interview and the first-listen edit pass.

## The Interview

Phase A is the life interview. One question at a time, answers captured verbatim; the subject's phrasing is the raw material for the chapters.

1. Where does the story actually begin (family, before you were born)?
2. What are the three to six defining chapters of your life so far?
3. Which moments should a stranger know: the most interesting, the most impressive, the most costly?
4. What do you do now, in one flat sentence?
5. Where are you going, and what should the reader believe about your future?
6. What do you believe that most people around you do not?
7. How should it end: a vow, a poem, a letter, an invitation?

Phase B locks the executable decisions: the narrator's persona and name, the ElevenLabs voice, palette, image inventory, music bed, and the final chapter list. The one rule that has already bitten twice: audition the voice before naming the narrator. The name must fit a voice someone has actually heard.

## Build and Deploy

Phases C and D live in `GENERATE.md`: fill the chapter file writing for the ear (contractions, short sentences, one beat per paragraph), generate narration per chapter, review on localhost, iterate chapter by chapter, then push and import to Vercel. Two invariants carry the whole system: every chapter edit requires regenerating that chapter's audio (or the sentence highlighting silently drifts), and every chapter must have an audio file (or the player hides its toolbar entirely).

## When Not to Run This

- The subject wants a resume or portfolio. This format is for a story, not a credential list.
- No one can sit for the interview. Chapters written from a LinkedIn profile produce exactly what you would expect.
- The story is private. The page is designed to be found; do not put in it what should not be.

## Further Reading

- [Generate an Agentic Brand OS](/playbooks/generate-agentic-brand-os)
- [AI-Led Brand Interview](/playbooks/ai-led-brand-interview)
- [Hyperdocumented SOP](/concepts/hyperdocumented-sop)
- [Compounding Docs](/concepts/compounding-docs)
