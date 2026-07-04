---
title: The Capture-First Autobiography
slug: /playbooks/capture-first-autobiography
description: "Capture the raw truth of a life into files you own before turning any of it into a book, a site, or a video. A continuous AI interview builds the corpus; every format you ever want is a projection of it."
image: "/img/comics/capture-first-autobiography.png"
---

# The Capture-First Autobiography

*Capture the raw truth of your life into files you own before you write a single polished page. The corpus is the asset; the book, the site, the children's book, and the videos are all projections of it.*

![Three-panel comic strip on cream paper. Title bar in chunky inked caps: THE CAPTURE-FIRST AUTOBIOGRAPHY. Panel 1, label "1. TESTIFY": the hyperagent seated in a warm lamplit room across from a recorder, mid-story, his spoken words streaming as a golden ribbon into a stack of dated markdown file cards. Paper-tape caption: "Raw truth, one story at a time. Testimony, not writing." Panel 2, label "2. OWN THE VAULT": an open vault drawer holding dated markdown cards, old photo prints, and scanned journal pages, with a padlock icon and a version-history ribbon; outside the vault a dim crossed-out chat-bubble window. Paper-tape caption: "Files you own, under version control. Never trapped in a chat app." Panel 3, label "3. PROJECT LATER": one glowing corpus card fanning light beams onto a printed book, a children's picture book, a phone playing a video, and a narrated one-page site. Paper-tape caption: "The corpus is the asset. Every format is a projection of it." Footer bar: CAPTURE THE TRUTH ONCE. EVERY FORMAT FOLLOWS.](/img/comics/capture-first-autobiography.png)

---

Most people who want to write their life story start at the wrong end: they open a blank document and try to write chapter one. The writing stalls, because writing and remembering are different jobs, and doing both at once does both badly.

The capture-first approach splits them. First, get the truth down: raw, specific, unpolished, in your own words, in files you control. Only later, and as a separate project, transform that corpus into whatever formats the story deserves. Someone with a shelf of journals and a phone full of photos already has most of the raw material; what is missing is a stable home for it and a process that keeps drawing more out.

## Principle 1: Own the files

The corpus lives in plain markdown files under version control, in a folder on your machine, backed up to a private repo. Not in a chat app.

A conversation on a chat website is an interview trapped in someone else's database: hard to search across sessions, impossible to organize, gone if the account goes. Files you own are [local-first](/concepts/local-first-software): every AI tool present and future can read them, no product decision can take them from you, and version control gives the whole archive a history. For a project measured in years and meant to outlive you, ownership is not a preference. It is the design requirement.

Photos, scans of old journals, letters, and clippings go in the same folder, under the same version control. A story capture that says "the summer the photo on the porch was taken" should sit next to that photo forever.

## Principle 2: Give the interviewer context

The difference between a generic AI chat and a real biographical interviewer is a [rule file](/concepts/agent-rule-files). At the root of the folder, one file tells any agent that opens the workspace three things:

1. **The purpose.** What this autobiography is ultimately for.
2. **The audience.** Who it is for: grandchildren, the public, one specific person.
3. **The priorities.** Which parts of the life matter most to get right, and any ground rules (what is off limits, what must be preserved verbatim, whose names to handle carefully).

With that file in place, the interview directs itself. The agent asks the questions you want to be asked, because you told it once what the project is trying to become. Without it, every session starts from zero and drifts generic.

## Principle 3: The continuous interview

The engine of the whole playbook is an interview that never really ends. Each session, the agent reads the rule file and everything previously captured, then asks the next question a good biographer would ask: the follow-up about the person you mentioned twice but never explained, the decade the corpus skips, the contradiction between two stories.

Two rules keep it honest:

- **One question at a time.** Rapid-fire questionnaires produce resumes. Single questions with real follow-ups produce memories.
- **Raw truth over wording.** You are not writing; you are testifying. Do not polish sentences, do not perform, do not summarize yourself. Specifics beat summaries: what happened, who was there, what was said, what it felt like. The transformation step can fix every sentence later; it cannot recover a detail you never said.

Each session lands as a dated markdown file in the captures folder. Over months, the corpus compounds the way [good documentation compounds](/concepts/compounding-docs): every session makes the next one smarter.

## The workspace shape

A minimal capture-first workspace:

```
my-life/
  AGENTS.md            # purpose, audience, priorities, ground rules
  captures/
    2026-07-04-how-my-parents-met.md
    2026-07-11-the-first-house.md
  journals/            # scans and transcriptions of existing journals
  photos/
    1994-porch-summer.jpg
  people/
    grandmother-rose.md   # one file per recurring person, grown over time
```

This is the personal version of [knowledge repo design](/playbooks/knowledge-repo-design): raw material in one pantry, future products assembled from it. If you already run a broader personal workspace, the life folder lives inside it.

Existing journals are intake, not homework. Scan or photograph them into `journals/` first; transcribe opportunistically, starting with the volumes the rule file marks as most important. The interview will pull from them ("your 2011 journal mentions a move you have never told me about").

## Transform later, and only later

Once the corpus is real, every output format is a projection of it:

- A narrated one-page life story via [Generate a Microautobiography](/playbooks/generate-a-microautobiography)
- A printed book or memoir manuscript
- A children's book of the family stories
- Short videos, each one a single capture retold for the camera
- A private wiki the family can browse

None of these are the asset. All of them can be regenerated, restyled, and re-edited as long as the captures exist. This is why capture comes first: transformation is cheap and repeatable; testimony is neither.

## Quick start without the setup

The owned workspace is the destination, but nobody should wait on tooling to start remembering. Paste this into any AI chat app today:

```text
You are my autobiography interviewer. Your job is to help me capture the
raw truth of my life, one story at a time. We are capturing, not writing:
do not polish my words, do not turn them into prose, do not summarize
what I say back to me.

Start by asking me these three things, one at a time:
1. Who is this autobiography ultimately for, and what do I want it to do
   for them?
2. Which parts of my life feel most important to get right?
3. Where does my story begin?

Then interview me from there. Go deep before you go wide: when I mention
a person, a place, or a turning point, ask the follow-up a curious
biographer would ask. Prefer specific memories over general summaries:
what happened, who was there, what was said, what it felt like. One
question at a time. Keep going until I say stop.

When I say "wrap up", produce a clean markdown transcript of everything
I told you this session, organized under topic headers, keeping my words
as close to verbatim as possible. I will save that file myself.
```

At the end of each session, say "wrap up", copy the transcript, and save it as a dated file. When the owned workspace exists, those files move into `captures/` and become the seed corpus, and the answers to the first two questions become the first draft of the rule file. Nothing from the chat-app phase is wasted; it was capture all along.

## Further Reading

- [Generate a Microautobiography](/playbooks/generate-a-microautobiography): the ready-made transformation for one format, run after the corpus exists
- [Local-First Software](/concepts/local-first-software): why the files must be yours
- [Agent Rule Files](/concepts/agent-rule-files): the mechanism behind the self-directing interview
- [Knowledge Repo Design](/playbooks/knowledge-repo-design): the pantry-and-products pattern this personalizes
- [AI-Led Brand Interview](/playbooks/ai-led-brand-interview): the same interview craft pointed at a venture instead of a life
