---
title: "Give Your Agent a Voice"
slug: /concepts/give-your-agent-a-voice
description: "Add a voice channel and your agent stops being a screen you stare at and starts being a presence in your room. The architecture that works."
---

# Give Your Agent a Voice

*The most underrated upgrade to an agentic harness in 2026 is the one most implementers have not tried yet. Add a voice channel and your agent stops being a screen you stare at and starts being a presence in your room. Here is why it matters, the architecture that works, and the right local default.*

---

## Why a Voice Channel Belongs in Your Harness

For a year, we have all been training ourselves to read agent output. Long terminal sessions, scrolling transcripts, watching the spinner. That worked because the alternative was waiting in silence. But silent reading turns out to be a low-bandwidth way to receive information from a partner who is doing real work on your behalf.

Three concrete shifts happen when you add spoken output to your harness:

**Group settings stop requiring screen-sharing.** When you are in a room with other people, opening your terminal to show them what your agent just did breaks the flow of the conversation. You either narrate manually or ask everyone to crowd around your laptop. With a voice channel, your agent can summarize what it just finished and everyone in the room hears it. No screen real estate, no interruption, no awkward "let me read this out loud."

**Multitasking becomes possible.** Long agent runs (codebases being refactored, research being compiled, transcripts being processed) used to require either staring at the screen or losing track of progress. With voice output, you can walk to the kitchen, wash dishes, take a stretch break, and still know when your agent finished and what the result was.

**The agent feels like a colleague.** This sounds soft and is structurally important. When you can hear your agent's report from across the room, the relationship shifts from "tool I operate" to "partner I delegate to." That shift compounds in everything you ask of it.

---

## The Right Default: Local TTS, Not Cloud

The naive way to add voice is to call a cloud TTS API (ElevenLabs, OpenAI TTS, Google) on every agent turn. This is wrong for three reasons:

1. **Cost.** Per-call billing means voice becomes a feature you ration. You will turn it off to save money. Defeats the purpose.
2. **Latency.** Every cloud round-trip adds 500ms to several seconds. Voice loses its low-friction feel.
3. **Privacy.** Your agent's output often includes work-in-progress thinking, internal strategy, and sensitive details. Sending all of that to a third-party TTS provider is unnecessary exposure.

The right default in 2026 is **Kokoro**, a local open-source TTS model. Apache 2.0 licensed, ~82M parameters, runs on a MacBook in real time. Quality is dramatically better than `say`, `espeak`, or any of the older OS-native engines, and it is competitive with paid cloud services on the voices that matter.

---

## The Architecture That Works

Voice in your harness needs three components or it will frustrate you within a week.

### 1. A Warm Daemon

Loading a TTS model takes 2 to 5 seconds. If you load it on every agent turn, every spoken message has a multi-second delay before audio starts. Unacceptable.

The fix is a small persistent daemon that loads the model once and stays in memory. A FastAPI server on a local port (4555 works fine), POST a text payload, daemon synthesizes and plays. End-to-end latency drops to ~1 second from the moment the agent finishes. Use `launchd` (macOS) or `systemd` (Linux) to keep the daemon alive across reboots.

### 2. Summarize Before You Speak

Do not pipe your agent's raw output to TTS. Most agentic responses are too long to listen to and too dense to follow when read aloud. Pass the response through a cheap fast model (Haiku, GPT-mini, Gemini Flash) with a prompt like *"Summarize this assistant response in 1-2 short sentences (max 35 words total), optimized for spoken delivery, no preamble or markdown."* Speak the summary instead of the raw text.

This is the difference between "I have to listen to a five-minute monologue" and "I get a 10-second briefing every time my agent finishes a turn."

### 3. A Toggle, Front and Center

Voice is contextual. You want it on when you are working solo or want ambient awareness, off when you are on a call or in a quiet room. Make the toggle one keystroke or one slash command away. Backing the toggle with a state file the hook script reads on every invocation works well: `/tts-on` writes `on`, `/tts-off` writes `off`, the hook checks the file before doing anything else.

---

## The Hook-Based Implementation

In any harness that exposes lifecycle hooks (Claude Code, Cursor, OpenHands, Aider), the natural integration point is the turn-end or stop hook. When the agent finishes a turn, the hook fires, the script reads the final assistant message from the transcript, summarizes it, and pipes the summary to your local TTS daemon.

The full architecture in five blocks:

1. **State file** (e.g., `~/.claude/tts-state` containing `on` or `off`).
2. **Hook script** that exits silently when state is off, otherwise reads the transcript.
3. **Summarizer call** to a cheap model.
4. **Local TTS daemon** for synthesis and playback.
5. **Slash commands** to flip the state file.

The whole thing is roughly 80 lines of bash plus a small Python daemon. Once it works, you forget it is there until you need it, which is exactly what you want from infrastructure.

---

## Picking a Voice

Kokoro ships with 54 voices spanning American, British, and several other accents. Most are forgettable. The strong defaults from extensive listening:

- **`bf_emma`**: British female, warm and articulate.
- **`af_bella`**: American female, neutral and clear.
- **`af_sarah`**: American female, professional register.
- **`am_michael`**: American male, warm baritone.
- **`bm_george`**: British male, gravitas without stuffiness.

Audition all five with the same test sentence before you commit. The voice you hear most often should be the one you genuinely enjoy, since your agent will be talking to you dozens of times a day.

---

## What This Unlocks

This is more than an accessibility upgrade, though it is genuinely useful for that. It is the next step in making your agentic harness feel like real infrastructure for delegation. The shift from a tool you operate to a partner who reports back to you is structural, and voice is one of the cleanest ways to make that shift visible.

If you have spent the last year building out your harness with skills, hooks, memory, and command centers, voice is the upgrade that closes the loop on the experience. The smallest amount of code for the largest change in how your agentic work feels.

---

## Related Reading

- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness)
- [Always-On Agents](/concepts/always-on-agents)
- [Harness Engineering](/disciplines/harness-engineering)
