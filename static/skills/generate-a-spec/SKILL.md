---
name: generate-a-spec
description: Turn a vague "can you help me build this?" into a build-ready spec you can act on. Hand the boomerang prompt to the person who wants something built (app, site, tool, feature, or automation); an AI interviews them on their own time and returns a nine-section spec led by a triage-ready TL;DR, which they paste into a Google Doc and share. Use when someone asks for build help without a spec, or when you say "generate a spec", "spec this out", "boomerang a spec".
---

# Generate a Build-Ready Spec

Someone asks you to help build something. They hand you a vibe, not a spec, so you cannot tell whether you can help, whether an off-the-shelf tool already does it, or who to forward it to. This skill fixes that: it is a [Boomerang Prompt](https://appliedai.wiki/concepts/boomerang-prompt) that interviews the person on their own time and returns a spec precise enough to triage.

Gathering belongs to them (only they have the real numbers, names, and constraints). The spec comes back to you build-ready. You decide.

## When to use this

- Someone asks for help building an app, website, tool, feature, or automation and gives you no spec.
- You want to assess build-vs-buy and rough cost before spending a dollar or an hour.
- You want a shareable artifact you can forward to whoever is the right builder.

Do not use it when you already have the detail (this is for extraction, not dressing up facts you hold), when the conversation itself is the point, or when what you need is two sentences rather than a spec.

## How to run it

1. **Send the prompt.** Give the person `BOOMERANG.md` (the full paste-in) and this note: *"Paste this whole thing into a new ChatGPT, Claude, or Grok chat. Answer out loud using dictation, not live voice mode. It will interview you one question at a time, then write your spec. Paste that into a Google Doc and send me the link."*
2. **They get interviewed.** The AI asks one question at a time across nine areas (the ask, the outcome it serves, current reality, the dream, core features and behaviors, users and data, constraints, open questions, success and scale), following the energy and pushing once when an answer is thin.
3. **The spec comes back.** The AI writes it in the fixed nine-section structure, led by a TL;DR routing block a busy reader absorbs in ten seconds.
4. **They share the Google Doc.** They paste the spec into a Google Doc, set "anyone with the link can view," and send you the link. The doc is the artifact, not the chat.
5. **You triage.** Read the TL;DR. Decide: can I help, or who do I forward this to.

If you are the one running the interview inside an agentic harness, drive the same nine questions, capture answers in a copy of `build-notes-template.md`, and write the spec to `build-ready-spec.md`.

## What good output looks like

- All nine sections present and in order, led by a filled TL;DR (what it is, who for, rough size, might-already-exist call, budget/timeline/technical comfort).
- Every core feature names its success condition and at least one failure or edge case.
- Real numbers and names survived; vagueness is named in Open Questions, not invented over.
- No product or vendor recommended (build-vs-buy is left to you, the reader).

If a stranger still has to ask "so what do you actually want?" after reading the TL;DR, the interview failed, not the template.

## Files

- `BOOMERANG.md`: the self-contained paste-in prompt you hand over (a conforming BOOMERANG.md instance).
- `build-notes-template.md`: working-notes starter for when you run the interview yourself.

## Pairs with

- [Spec Writing](https://appliedai.wiki/disciplines/spec-writing): the discipline this operationalizes. The spec it produces is the input to spec-driven development.
- [Boomerang Prompt](https://appliedai.wiki/concepts/boomerang-prompt): the pattern this is an instance of.
- [Interview Prompts](https://appliedai.wiki/disciplines/interview-prompts): the prompt-design craft behind the interview half.

## Pitfalls

- **Proposing tools during the interview.** The moment the AI suggests a product, the person reacts to a solution instead of describing what they want. Gather first.
- **Typing instead of dictating.** Typed answers are three flat sentences; spoken answers are three warm paragraphs. Tell them to talk.
- **Live voice mode.** It leaves no written artifact to paste into a doc. Dictation transcribes to text; live voice is the trap.
- **A blank routing block.** Skipping the size estimate or the might-already-exist call guts the point. Write the TL;DR last, on purpose, and grade it.
- **Gold-plating.** A spec listing forty someday-features is unroutable. Keep it to what they need now; park the rest in Open Questions.
