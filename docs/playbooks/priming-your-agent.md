---
title: "Priming your agent"
slug: /playbooks/priming-your-agent
description: "The tactical discipline of giving your agent enough context before you ask it to do anything real: drag in files, voice-dump framing, define success."
---

# Priming your agent

*The tactical discipline of giving your agent enough context before you ask it to do anything real. Drag the relevant files into the chat. Voice-dump the framing. Define what success looks like. Then send. There is no excuse for a one-line prompt when the stakes are real.*

---

## The reflex to build

When you find yourself typing a prompt to your agent, pause. That pause is the discipline.

Before you hit enter, ask:

1. **What files could I drag in so my agent has the actual context?**
2. **What framing could I voice-dump in 60 seconds that would take me 10 minutes to type?**
3. **What does "good" look like for this output?**

The one-line prompt is the default. The one-line prompt is why your agent feels underwhelming. Your agent cannot read your mind. It can only work with what you put in front of it.

The quality of what your agent produces is bounded by the quality of what you prime it with. This is the [spec is the product](/disciplines/spec-writing) idea applied to every single prompt you write, not just the big artifacts.

---

## The three-part recipe

### 1. Drag files in. Do not type paths.

You almost never need to type a file path in a chat. Drag the file from Finder, File Explorer, the VS Code sidebar, or any file viewer directly into the chat input. The full path auto-appends.

This works for:

- **A single file.** Drag `people/sarah-chen.md` into the chat.
- **Multiple files at once.** Select several files in Finder, drag the whole selection in.
- **A whole folder.** Drag the folder; your agent will treat it as the set of files inside.

Claude Code, Codex, and most agentic harnesses support this. Test it on your first session and make it muscle memory. Typing paths manually is a sign that you are not priming enough context. It is also slow and error-prone.

### 2. Voice-dump the framing. Do not type it.

If your framing takes 90 seconds to speak and 10 minutes to type, you will type less framing than your task deserves. Voice-to-text removes that friction.

Hold the key on [Superwhisper](https://superwhisper.com) or [Wispr Flow](https://wisprflow.ai), speak the full situation, release. The text appears in the chat. Both tools auto-clean stumbles ("oh wait, actually...") into clean thoughts.

What to dump into the chat:

- **Who the situation is about.** (Name, role, context.)
- **Where you are in the arc.** (First meeting? Third call? Deal almost signed?)
- **What each side wants.** (Your goals, what you think their goals are.)
- **Constraints, risks, and things to avoid.**
- **What prior artifacts already exist** (beyond the files you just dragged in).
- **Your current hypothesis or instinct on what the output should look like.**

Three paragraphs of voice-dumped context beats ten rounds of back-and-forth where the agent guesses wrong, you correct, it guesses differently, you correct again.

### 3. Define what "good" looks like.

End every primed prompt with success criteria. Even one sentence. "I want a one-page doc I can bring to Tuesday's meeting." "I want a 400-word LinkedIn post in my voice." "I want you to pressure-test this plan and surface the weakest three assumptions."

Without a success definition, the agent produces something reasonable-sounding that almost never matches what you actually wanted. With one, it aims correctly.

---

## A worked example: drafting a partnership proposal

You have a meeting next Tuesday with Sarah Chen, head of BD at Acme Corp. You want to walk in with a real proposal for a joint venture.

### What a lazy prompt looks like

> Help me draft a partnership proposal for Sarah Chen at Acme Corp.

Your agent will produce something generic. It has no context on Sarah, no history of your conversations with her, no record of your strategic thinking about the partnership, and no sense of what a "good" proposal looks like in your voice.

### What a primed prompt looks like

Open your agent session. Drag in every relevant file:

- `people/sarah-chen.md` (her dossier)
- `people/acme-corp.md` (the company-level dossier, if you have one)
- `meeting-transcripts/2026-03-28_sarah-chen-intro-call.md` (your intro conversation)
- `meeting-transcripts/2026-04-10_sarah-chen-followup.md` (the follow-up)
- `artifacts/2026-03-15_joint-venture-thesis.md` (your strategic thinking on partnerships in this space)
- `skills/draft-partnership-proposal.md` (if you have a skill file for this workflow)

Then voice-dump the framing (hit the dictation key and speak):

> We have a meeting on Tuesday at 3 PM. I have two goals for this meeting: first, get Sarah to commit to a pilot we can start in May. Second, get her to introduce me to their head of product so we can scope the integration. From the dossiers you just read, you know her style is direct and she hates marketing language. From the intro transcript you know she liked our idea of a revenue-share structure. From the followup she raised concerns about their legal review timeline. I want you to read all of this and draft a one-page proposal doc. Structure it: the ask, what each side brings, the pilot scope, the success criteria for the pilot, and the timeline that addresses her legal concern. Keep it in my voice. No jargon. Save it to `artifacts/2026-04-18_acme-partnership-proposal.md`. Then tell me the three weakest points of the proposal so I can think about how to address them in the meeting.

That is a primed prompt. Your agent now has:

- The actual person and company it is writing for.
- Your prior interactions with them.
- Your strategic thinking about the space.
- Your proven workflow for this kind of artifact.
- The specific goals for the meeting.
- Constraints and known concerns from the last call.
- The structure you want.
- Your voice.
- A defined output location.
- A defined second step (pressure-testing your own proposal).

What comes back is a real working draft you bring to Tuesday. Not a generic template.

---

## The PRM connection

This whole practice depends on having files worth dragging in. If `people/sarah-chen.md` does not exist, there is nothing to prime with.

See [PRM](/concepts/prm) for the architecture: one dossier per person, transcripts from conversations, artifacts for strategic moves, all cross-referenced. PRM is what makes priming possible. Priming is what makes PRM useful.

The loop is: have a real conversation, drop the transcript in your workspace, your agent updates the dossier, next time you prime a prompt about that person, the context is already there.

---

## Anti-patterns

- **The one-line prompt for a real task.** "Help me draft an email to Mark" is not priming. Who is Mark? What is the email about? What happened last time you talked? What do you want to accomplish?
- **Typing paths manually.** Wastes time and is a signal you have not built the drag-and-drop reflex yet.
- **Skipping voice-dump because "it feels weird to talk to my computer."** Everyone feels that way for the first week. Two weeks in, typing framing will feel slow and incomplete. Push through.
- **Priming and then asking something different.** If you drag in a bunch of files about Sarah Chen and then ask about a different person, the files are wasted context.
- **Not defining success.** Without success criteria, "reasonable" is what you get. "Good" needs the criteria.

---

## Advanced moves

### Keep the context warm across follow-ups

Once you have primed a prompt in a session, the context stays loaded. Follow-up prompts in the same session can be much shorter. "Now rewrite paragraph 3 to address the legal timeline more directly." The agent still remembers everything you dragged in.

### Ask the agent what else it needs

End a primed prompt with: "Before drafting, tell me anything unclear or any context you think you are missing." Sometimes the agent surfaces a gap you did not notice. Fill the gap, then proceed.

### Turn repeated primings into skill files

If you find yourself priming the same kind of task repeatedly (partnership proposals, newsletter drafts, daily briefings), capture the pattern as a [skill file](/concepts/instruction-files). The skill encodes the priming recipe: "when this skill is called, read these folders, ask the user for X and Y, produce Z." Over time your priming muscle gets automated into recurring-work infrastructure.

### Use the meta-skill

If your priming feels rough, ask your agent to help you improve it. "Here is the prompt I am about to send. What context am I missing? What would a better version of this prompt look like?" Your agent is a very good prompt critic.

---

## The habit

Every time you are about to type a prompt, ask yourself: *drag, speak, define.* Drag the relevant files. Speak the framing. Define what good looks like. Then send.

Three seconds of discipline at the front of every prompt. Orders of magnitude of quality on the back end.

## Further Reading

- [Spec writing](/disciplines/spec-writing). The architectural version of this same discipline.
- [Context engineering](/disciplines/context-engineering). The broader concept behind priming.
- [Intent engineering](/disciplines/intent-engineering). How to encode what you want clearly enough that AI can act on it.
- [PRM](/concepts/prm). The file architecture that makes priming possible for anything relationship-related.
- [How to prompt your agent](/playbooks/how-to-prompt-your-agent). The umbrella doc. Priming is one of the five layers. Start there if you want the whole stack, not just the per-session routine.
