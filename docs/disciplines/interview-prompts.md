---
title: "Interview Prompts"
slug: /disciplines/interview-prompts
description: "A prompt-design pattern where the prompt itself instructs the agent to interview the user for any missing variables, instead of asking the user to fill in placeholders."
---

# Interview Prompts

*A prompt-design pattern where the prompt itself instructs the agent to interview the user for any missing variables, instead of asking the user to fill in placeholders.*

---

## The Problem: Mad Libs Prompts

A lot of prompt templates look like this:

```
Write a pitch for <COMPANY-NAME> targeting <CUSTOMER-PERSONA> with
tone <TONE> and length <LENGTH> words.
```

The user is expected to paste this into a note, find-and-replace every angle-bracketed placeholder, and then send the filled-in version to the agent. This is the Mad Libs pattern. It has three problems:

1. **It wastes attention.** The user burns cycles on secretarial work that the agent could do.
2. **It breaks on complex variables.** Filling in "customer persona" as a one-liner loses nuance the agent would get from a conversation.
3. **It assumes the user already knows what's needed.** Often the user doesn't, and the placeholders themselves are the wrong questions.

## The Pattern: Infer, Then Interview

A good interview prompt names the variables the agent will need, then instructs the agent to **infer what it can from context first, and only interview the user for what it truly can't infer**. The user pastes the prompt as-is. No pre-filling, no redundant questions.

The inference sources the agent should check before asking anything:

- **The current working directory.** If the harness is opened in `~/Documents/github-repos/my-wiki/`, the repo path and name are already known. Don't ask.
- **The repo's `CLAUDE.md` / `AGENTS.md` / `README.md`.** Voice rules, section structure, and conventions are often already documented. Read them before asking.
- **Existing files.** Package.json, config files, sidebars, existing entries. They reveal the stack, the tone, and the patterns already in use.
- **Git state.** The current branch, recent commits, and remote URL reveal the GitHub account and visibility.
- **The user's prior messages in the conversation.** If the user already said something, the agent shouldn't ask again.

After inference, the agent interviews the user **only** for what's genuinely missing: the user's intent, subjective preferences, or variables that exist only in the user's head.

```
I want to write a sales pitch.

Variables you'll need: company name, company description,
customer persona, tone, length.

First, infer what you can:
- Check the current working directory. Is there a README or
  package.json that names the company and describes what it does?
- Look for existing marketing copy, pitch decks, or prior pitches
  in the repo. They reveal tone and audience.
- Check this conversation: have I already told you any of these?

Briefly tell me what you inferred and what's still missing. Then
interview me for the gaps:
- Ask one question at a time
- For the customer persona, ask 2-3 follow-ups to get specific
- For tone, offer 3-4 options if I'm unsure

Once you have enough to draft a strong pitch, draft it. Show me
the draft before anything else.
```

The agent now owns the context-gathering. The user just says "go."

## Why This Works Better

**Less friction to use.** The user doesn't have to remember what variables to fill in or consult documentation to figure out what each placeholder means. Paste and talk.

**Better variable quality.** The agent can ask follow-up questions when an answer is thin. "Tone: professional" becomes a two-minute back-and-forth that produces "Warm, practitioner-to-practitioner, not corporate, with one concrete example early." That's a materially better input.

**Catches what the user forgot.** A good interview prompt lists the variables the agent needs, but leaves room for the agent to ask "is there anything else I should know before drafting?" That catches the context the user didn't realize mattered.

**Composable.** Interview prompts can be saved as instruction files or skill commands and reused across sessions without edits. Mad Libs prompts have to be re-filled every time.

## How to Write One

A good interview prompt has six parts:

1. **The job.** "I want to write X" or "I want to build Y." One sentence.
2. **The variable list.** Explicit variables the agent needs to complete the job.
3. **The inference pass.** An instruction to infer what it can from context (cwd, CLAUDE.md, README, git state, existing files, conversation history) before asking anything.
4. **Interview behavior rules.** For whatever inference didn't resolve: ask one question at a time, wait for answers, ask follow-ups when an answer is thin, offer options when the user seems unsure.
5. **The stopping condition.** What does the agent have before it starts drafting? Usually: "once you have enough to X, do X."
6. **The deliverable and review gate.** What the agent produces first, and whether it should wait for approval before committing or acting.

Template skeleton:

```
I want to <JOB>.

To complete this, you'll need these variables:
- <variable 1>
- <variable 2>
- <variable 3>
...

First, infer what you can from context:
- What's the current working directory?
- Is there a CLAUDE.md / AGENTS.md / README.md that answers any of
  these?
- Does git state (branch, remote, recent commits) reveal any of them?
- Have I already told you any of these in this conversation?

Briefly tell me what you inferred and what's still missing. Then
interview me for the missing variables only.

Interview rules (for missing variables):
- Ask one question at a time
- Follow up when an answer is thin
- Offer 2-3 options when I seem unsure
- Ask "anything else I should know?" before you start

Once you have enough to <ACTION>, <ACTION>. Show me the result before
<SIDE-EFFECT, e.g., committing, sending, publishing>.
```

## When Not to Use It

Interview prompts are overkill when the task is a one-shot, fully specified operation. "Format this JSON" doesn't need an interview. "Summarize this article in three bullets" doesn't either.

Use interview prompts when:

- The output depends on contextual variables the agent can't infer
- The user might not know what variables matter until asked
- The prompt will be reused and you don't want the friction of re-filling it
- The quality of the variables meaningfully affects the quality of the output

Use a direct prompt when:

- The task is deterministic and self-contained
- The agent has everything it needs from the current file or conversation
- An interview would slow down something you want to be instant

## Interview Prompts and Skills

When you convert an interview prompt into a reusable skill (e.g., a Claude Code slash command or an Agent SDK skill file), the interview pattern becomes native to the skill. Users invoke `/my-skill` and the skill drives the conversation.

This is how most well-designed skills are built internally. The SKILL.md or command file is an interview prompt with extra scaffolding (tool access, canonical output paths, repo-specific rules).

If you find yourself writing the same interview prompt twice, promote it to a skill.

## The North Star

A prompt library where every prompt is copy-paste runnable. No placeholders, no Mad Libs, no "fill these in first." The agent drives the interview, the user answers, and the work gets done. Your prompt-craft becomes conversational by default.

---

## Further Reading

- [Spec Writing](/disciplines/spec-writing): The upstream discipline of specifying what you actually want
- [Context Engineering](/disciplines/context-engineering): Why better inputs produce better outputs
- [Intent Engineering](/disciplines/intent-engineering): The adjacent skill of making your intent explicit to agents
- [Train Your Agent](/foundations/train-your-agent): Interview prompts are a training mechanism, not just a querying mechanism
- [Superprompt](/disciplines/superprompt): The interview pattern is one of the moves that turns a regular prompt into a superprompt
