---
title: "Auto-syncing Granola notes"
slug: /playbooks/auto-syncing-granola-notes
description: "Stop copy-pasting transcripts. Pull meetings into your agent workspace with one command, plus the manual fallback for voice memos and wearable recorders."
---

# Auto-syncing Granola notes

*Stop copy-pasting transcripts. Pull your meetings into your agent workspace with one command, then process them all at once. Plus the manual fallback for voice memos and wearable recorders.*

---

## Why this matters

The [PRM](/concepts/prm) only compounds if conversations actually get into the workspace. The most common point of failure is the gap between "I had a great meeting" and "the relationship file reflects it." Every step you have to do by hand is a step that gets skipped on a busy day.

This tutorial closes the most common version of that gap: Granola meetings ending up in your `meeting-transcripts/` folder without you copy-pasting anything. It also covers the manual flow for any other audio source (Apple Voice Memos, Plaud Note, wearable recorders, plain phone recordings) using TurboScribe as the no-API intermediate step.

By the end, you will have one folder where every conversation lands, regardless of which tool captured it, ready for `/process-transcript` to turn into structured PRM updates.

---

## The unified ingestion model

One destination, three on-ramps:

```
Granola (auto)        ─┐
TurboScribe (manual)  ─┼─►  meeting-transcripts/  ─►  /process-transcript  ─►  people/, artifacts/
Direct paste          ─┘
```

- **`meeting-transcripts/`** is the single intake folder in your agent workspace.
- **`/process-transcript`** is the skill that reads a transcript file, updates `people/` files, surfaces action items, and creates artifacts where warranted.
- The **on-ramps** differ by source. Granola gets a dedicated sync skill. Audio from anywhere else flows through TurboScribe and lands in the same folder.

Holding the model is more important than memorizing any one path. Anything that produces a transcript text file can land in `meeting-transcripts/` and feed the same downstream skill.

---

## Path 1: Granola (the auto path)

Granola is a strong default meeting recorder for video calls.

The `sync-granola` skill uses the Granola API (via the same auth your desktop app already has) to pull recent meetings into your workspace.

### Prerequisites

- [Granola](https://granola.ai) installed and signed in on the same Mac as your agent workspace.
- A workspace that includes the `sync-granola` skill.
- Mac. Windows support is a known gap; the auth path the script reads is macOS-specific.

### Daily flow

In your agent terminal, after a batch of meetings, just say:

> "Sync my Granola notes."

Your agent will:

1. Run a dry-run preview so you can see which meetings would be imported.
2. Wait for you to confirm.
3. Pull each meeting into `meeting-transcripts/<date>-<slug>.md` with frontmatter that includes the Granola ID, attendees, and the AI-generated summary.
4. Tell you what landed and offer to run `/process-transcript` on the new files.

That is the loop. Sync, glance, process. Three minutes for a week of meetings.

### What the skill does NOT do

- **It does not run on a schedule.** No cron, no daemon, no background heartbeat. You trigger it.
- **It does not auto-process.** It writes raw transcript files and stops. You decide when `/process-transcript` runs, so you stay in control of which conversations turn into people-file updates.
- **It does not touch non-Granola audio.** For voice memos, wearable recorders, and anything else, see Path 2.

### Why on-demand is the default

You could put this on an hourly cron. Don't, yet. Three reasons:

1. **You want a human in the loop on what gets imported.** A bad meeting (a 2-minute connection-test call, a meeting Granola accidentally captured because the laptop was open) does not need a permanent place in your PRM. Eyeballing the dry-run preview takes ten seconds and prevents months of clutter.
2. **Silent failures compound.** If Granola changes their auth scheme, an automated cron job fails quietly while you assume meetings are flowing in. An on-demand skill fails loudly the first time you run it, and you fix it that day.
3. **Speaker reconciliation is real for other sources.** If you graduate to ingesting voice memos with diarization, you have to label unknown speakers. That step has to be a human-in-the-loop step or you will misidentify people and corrupt your PRM. Building the on-demand habit now sets you up for that later.

If you eventually want full automation across all sources (voice memos, calls, Granola, all on autopilot with voiceprint identification), that is a v3 system. Mention it to your agent when you are ready and it can walk you toward the architecture.

---

## Path 2: TurboScribe (the manual path for everything else)

For any audio that is not a Granola call (Apple Voice Memos, a Plaud Note recording, an Otter export, a phone call recording, a video file you have the audio for), [TurboScribe](https://turboscribe.ai) is the simplest intermediate step. It has no API, but it has high-quality transcription and a UI for labeling speakers, which is exactly the manual checkpoint you want.

### The flow

1. Upload the audio file at [turboscribe.ai](https://turboscribe.ai).
2. Wait for it to transcribe. Usually a minute or two.
3. **Label the speakers in their UI.** This is the step that matters: you tell TurboScribe which voice is you and which is each other person. This prevents the misidentification problem that kills automated voice-memo pipelines.
4. Download the transcript as plain text or markdown.
5. Save it to `meeting-transcripts/YYYY-MM-DD-descriptive-slug.md` in your workspace, or paste it directly into your agent chat and say: "Process this transcript."

Your agent runs `/process-transcript` and the transcript flows into the PRM the same way a Granola transcript does.

### Why TurboScribe specifically

- **Speaker labeling in the UI.** This is the load-bearing feature for any voice source where you are not the only speaker. Tools that auto-diarize without giving you control will sometimes assign "you" to the wrong person, which then propagates into your `people/` files. That is much harder to undo than to prevent.
- **No API required.** You upload, label, download. No keys, no pipeline, no cron job. This is the right starting point before you commit to a fully-automated stack.
- **Quality is high.** Comparable to Deepgram and AssemblyAI in testing.

If you want to keep audio fully local (HIPAA, attorney-client, anything regulated), use [Meetily](https://meetily.ai) or a local Whisper setup instead. TurboScribe sends audio to their servers.

---

## Weaving in Plaud and other wearable recorders

Wearable voice recorders (Plaud Note, Plaud NotePin, Limitless Pendant, Bee, the magnet-on-the-back-of-the-phone setups) are just audio sources. The recorder produces a `.m4a` or `.mp3` file. Everything downstream is the same as any other audio.

The principle: **the recorder is a capture device, not a pipeline.** Most of these devices ship their own app with auto-transcription, but the auto-transcription is usually weaker than TurboScribe's, and almost none of them give you speaker control. Use the device to capture audio, then run the file through the path you already have.

The flow:

1. Wear the recorder. Have the conversation. Stop the recorder.
2. Pull the audio file off the device (USB, app export, AirDrop, however that specific device works).
3. Upload to TurboScribe. Label speakers. Download the transcript.
4. Drop into `meeting-transcripts/` and run `/process-transcript`.

Same destination, same processing skill, different capture device. Once you have the muscle memory for the TurboScribe step, adding a new recorder is a no-op.

A note on consent: wearable recorders make it much easier to record people without their explicit knowledge. Make sure you understand local recording laws and your own ethics before you build a habit you would not want disclosed.

---

## When to graduate to a fully automated pipeline

If you are running 30+ meetings a week, recording most of them, and the manual TurboScribe step is becoming the bottleneck, you are ready for the next level: a pipeline that watches your audio sources, transcribes automatically, identifies speakers by voice fingerprint, and feeds your PRM without you touching anything.

That system uses Deepgram + pyannoteAI + voiceprint enrollment, costs ~$25 to $30 per month, and requires API keys plus a one-time enrollment of every person you regularly speak with. For most practitioners, the on-demand Granola sync plus manual TurboScribe for everything else is more than enough for the first year.

---

## Common questions

**Does the Granola sync work on Windows?** Not yet. Granola exists on Windows but the auth path the skill reads is macOS-specific. If you are on Windows, use the manual flow: export from Granola's web UI as text, drop into `meeting-transcripts/`, run `/process-transcript`.

**What if I have months of old Granola meetings I do not want to import?** When your agent runs `sync-granola` for the first time, it will offer to mark all existing meetings as already-synced (the `--init` flag) so you start fresh from today forward. Say yes if you do not want to backfill.

**What if the same meeting gets recorded by both Granola and a voice memo?** The Granola sync deduplicates against existing files in `meeting-transcripts/` by Granola URL, so re-runs do not produce duplicates of the same Granola meeting. Cross-source dedup (the same meeting captured two ways) is on you for now: the simplest move is to delete one of the two files before running `/process-transcript`.

**Why not just have my agent read the Granola UI directly?** Browser-driving is slow, fragile, and harder to reason about than file-based pipelines. Files in your workspace are what keep you sovereign. If Granola disappears tomorrow, your imported transcripts stay.

## Further Reading

- [PRM](/concepts/prm). The concept this tutorial feeds.
- [Priming your agent](/playbooks/priming-your-agent). How to use the PRM you build in real prompts before meetings.
- [Compounding docs](/foundations/compounding-docs). Why one folder of plain markdown beats every CRM you have ever used.
