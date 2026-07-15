---
title: Generate a Microautobiography
slug: /playbooks/generate-a-microautobiography
description: A GENERATE.md recipe that produces an AI-narrated life-story site for one person. Run a seven-question life interview, lock the narrator persona and voice, write chapters for the ear, and ship a page where every sentence is clickable, highlighted as it is read, and scored with music. One-time generation per person.
image: "/img/comics/generate-a-microautobiography.png"
---

# Generate a Microautobiography

{/* last_updated: 2026-07-08 */}
{/* version: 0.2 */}

*A microautobiography is a person's life told in narrated chapters on a single page: an AI narrator reads it aloud over music, the sentence being spoken glows, and clicking any sentence plays from exactly there.*

![Three-panel cream-paper comic. Title bar: GENERATE A MICROAUTOBIOGRAPHY. Panel 1, THE INTERVIEW: a flesh hyperagent in matte-navy plate armor sits telling his story while a bare-headed cyan-and-gold holographic AI narrator listens from a glowing virtual window labeled NARRATOR; caption "One question at a time." Panel 2, THE CHAPTERS: holographic cyan hands in a virtual command hall stack scattered photos and memory fragments into a glowing tower of titled life-chapters; caption "The answers become chapters." Panel 3, THE PAGE: a glowing single life-story web page with a live cyan audio waveform while a distinct older woman with silver-streaked hair listens with a hand on her heart, a READY stamp in the corner; caption "A stranger presses play, and feels they know you." Footer bar: ONE LIFE, TOLD ALOUD ON ONE PAGE.](/img/comics/generate-a-microautobiography.png)

---

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

## The Copy-Paste Interview Prompt

Not everyone has a coding agent in the room. For the subject who wants to start alone, this prompt turns any hosted AI chat (ChatGPT, Claude, Grok) into the interviewer. They paste it in, answer one question at a time until they run out, and the model writes their chapters back in a ready-to-build shape. They then hand that output to whoever builds the page (the Build and Deploy phase below).

It is the same Phase A interview and the same for-the-ear writing rules, packaged so a non-technical person can run the whole front half themselves, in a chat window, on their own time. It ships as a conforming [BOOMERANG.md](/reference/standards/boomerang-md) file (`BOOMERANG.md` in the template repo), the [Boomerang Prompt](/concepts/boomerang-prompt) pattern applied to a life story.

```text
You are going to help me create my microautobiography: a short, narrated version of my life story that will live on a single web page and be read aloud by an AI voice. Think of the finished thing like a museum audio guide for one person's life. A worked example is garysheng.com/bio.

Your job has two parts.

PART 1: INTERVIEW ME.
Interview me about my life, one question at a time. Ask a single question, then stop and wait for my full answer. Never ask two questions at once, and never move on until I have finished answering. Do not summarize or analyze my answers while we are still collecting. Just listen, and ask a natural follow-up when an answer opens a door worth walking through. Be warm, curious, and specific. Draw me out. When I give you a thin or resume-style answer, gently push for the real story: what happened, what it cost, what it changed in me.

Cover these seven areas, roughly in order, but follow the energy of my answers instead of marching through a checklist:
1. Where my story actually begins, before I was born: my family, and the people and events that made me possible. Grandparents, migrations, faith, luck, hardship.
2. The three to six defining chapters of my life so far. For each one: what happened, what it cost, and what it built in me.
3. The moments a stranger should know: the most interesting, the most impressive, the wildest, the most painful.
4. What I do now, in one plain sentence.
5. Where I am going, and what someone should believe about my future by the end.
6. What I believe that most people around me do not.
7. How it should end: a vow, a poem, a letter to the reader, an invitation, or a line of scripture or verse that matters to me.

Keep going until I tell you I am done, or until I clearly run out of answers. If I give short answers, ask more follow-ups. Gather far more than you will use.

PART 2: WRITE MY STORY.
When I say I am done, or you can tell I have run dry, stop interviewing and write my microautobiography. Produce it in this exact structure so it is ready to build:

NARRATOR: Invent a warm, likable AI narrator with a first name. The narrator speaks in the first person as an AI ("I") and about me in the third person ("she", "he", "they", or my name). This framing is the whole trick: it lets the narrator say generous, honest things about me that I could never say about myself. Tell me the narrator's name and one line about its personality. Then tell me to pick an ElevenLabs voice at elevenlabs.io whose gender and warmth match that name.

CHAPTERS: Write 6 to 9 chapters in this arc:
  1. A cold open where the narrator introduces itself, gives the short version of who I am in a few sentences, and teases the long version.
  2. Three to six life chapters, each covering one defining era, in order.
  3. A "what I do now and where this is going" chapter.
  4. A closing: the vow, poem, letter, or verse I chose, in my own voice.

Write every chapter FOR THE EAR, because it will be read aloud:
  - Contractions everywhere. Short sentences. One idea per sentence. One beat per paragraph.
  - Bold the proper nouns a stranger should remember (wrap them in **double asterisks**).
  - State impressive facts plainly and let them land. Do not gush, pile on exclamation points, or flatter me. A dry, affectionate one-liner from the narrator beats a compliment.
  - Never use em dashes. Use a period, a comma, or the word "to" instead.
  - In the closing chapter, give one spoken line from the narrator, then my vow or poem as short standalone lines.

PHOTOS: Under each chapter, suggest one real photo I should supply (for example "a childhood photo", "me at work", "a family picture"). Real photos always beat generated art.

TITLE: Give the page a title (usually just my name) and one quiet closing line.

Label each chapter clearly (CHAPTER 1 - TITLE, then the text) and keep everything clean and copy-pasteable, because I am going to hand it to whoever builds the page.

One rule for the whole thing: this page exists to help people get an accurate, human picture of who I really am. Keep it true, keep it warm, and keep it in my voice.

Start now with Part 1. Ask me only the first question, then wait.
```

The output is not the finished website. It is the script: narrator, chapters, closing, and photo list. Building and deploying still follows the phase below. But the hardest and most human part, getting the story out of a person in their own words, is now something they can do on their own before a builder ever gets involved.

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
