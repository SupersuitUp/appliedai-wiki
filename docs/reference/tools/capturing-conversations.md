---
title: "Capturing Conversations"
slug: /reference/tools/capturing-conversations
description: "Get every meeting, voice memo, and phone call into files your agent can read. The point is not the recording. The point is ending the day with notes that compound over years."
---

# Capturing Conversations

*Get every meeting, voice memo, and phone call into files your agent can read. The point is not the recording. The point is that you end the day with notes that compound over years into a relationship system that knows your whole life.*

---

## Why this matters

Relationships, decisions, and context live in conversations. If a conversation ends and nothing is captured, the context evaporates. You will not remember what was said three weeks from now. Your agent cannot update anyone's dossier without raw material to process.

A capture habit solves this. One capture layer per setting:

- **Meetings** (two or more people, typically on video or in person): use a dedicated meeting-notes tool. [Granola](#granola) is a strong default.
- **Solo thinking or debriefs** (just you, right after a meeting or while working through something): use your phone's built-in Voice Memos / Voice Recorder.
- **Phone calls** (voice-only conversations, mobile to mobile): use your phone's built-in Call Recording. iPhone and Pixel both have this now.

Each of these lands an audio file or a transcript in a place you can drop into a `meeting-transcripts/` folder inside your agent workspace. Your agent takes it from there, updating dossiers, extracting action items, and linking the conversation to the relevant people and projects.

---

## Granola {#granola}

*An AI-powered meeting notes app that runs in the background during video calls and enhances the notes you actually jot.*

### What it is

[Granola](https://granola.ai) listens to the audio on your machine during a meeting, sends it to Granola's servers for transcription and summarization, and builds structured notes from the combination of the transcript and any notes you type during the call. Unlike most competitors, it does not join the meeting as a bot, so the other participants never see "Granola is recording" in the attendee list. It is just another app running on your computer.

After the meeting, Granola gives you a clean transcript plus a structured summary in whatever template you picked (meeting notes, one-on-one, user interview, sales call, etc.). You export the markdown and drop it into `meeting-transcripts/YYYY-MM-DD_<audience>_<title>.md` in your workspace.

### Why teams use it

Granola is the most reliable "I had a meeting, it is now captured" loop available. It works for in-person meetings: open the laptop on the table, hit record, let Granola transcribe and summarize afterward. It works for remote video calls without announcing itself as a bot, which matters in sensitive conversations (therapy, legal, financial, intimate partner). And the transcript-plus-summary output is already in the format your agent wants.

### Is this safe to install?

Yes, with caveats on consent (covered below) and on cloud transcription. Granola runs on your computer and sends audio to their servers for processing. Read [their privacy policy](https://www.granola.ai/privacy) if you handle regulated data; for HIPAA or attorney-client conversations, do not use Granola or any other cloud transcription tool. If you need everything local (audio never leaves your machine), use Meetily instead. Mac and Windows supported. There is a free tier that is enough for personal use; the paid tier removes meeting limits.

### Setup pointer

Official documentation and download: [granola.ai](https://granola.ai). Create an account. Open the app before your next meeting. Click Record when you are ready to start capturing.

### How to use

- **Before the meeting starts:** open Granola, type your agenda or the questions you want to ask. Those notes become the scaffolding of the final output.
- **During the meeting:** type as much or as little as you want. Granola fills in the gaps with the transcript.
- **After the meeting:** review the summary, export as markdown, drop the file into `meeting-transcripts/` in your workspace, and ask your agent: "Process this transcript. Update the relevant dossiers. Surface any commitments I made or received."

### Alternatives

Reasonable alternatives depending on your situation:

- **[Meetily](https://meetily.ai)**: locally hosted, sovereign alternative. Runs transcription and summarization on your own machine so audio and notes never leave your computer. Free for individuals. The right choice if you handle regulated conversations (HIPAA, attorney-client, therapy) or care about keeping meeting data off third-party servers.
- **[Otter](https://otter.ai)**: best live collaborative transcription. Joins the call as a bot. Good if you want multiple people seeing the transcript in real time.
- **[Fathom](https://fathom.video)**: most generous free tier (unlimited recordings, limited AI summaries). Good starting point if cost is the deciding factor.
- **[Fireflies](https://fireflies.ai)**: strongest for sales-conversation intelligence. Joins as a bot.
- **[Tactiq](https://tactiq.io)**: Chrome extension that captures live transcripts without a bot, specifically for Google Meet, Zoom, or Teams.

All of the above produce exportable transcripts or notes that can land in `meeting-transcripts/` the same way Granola's do.

---

## Voice memos (solo capture)

*For the moments between meetings. Walking to your car, driving home, debriefing in the shower, riffing on an idea while it is fresh.*

### What it is

Every modern phone has a native voice recorder that makes capturing 30 seconds of thinking trivial. You do not need a specialized app for this.

- **iPhone: Voice Memos.** Pre-installed. Red record button. Automatic transcription in the Voice Memos app on iOS 18+ (tap the transcript icon on any recording).
- **Android (Pixel): Google Recorder.** Pre-installed. On-device transcription, strong accuracy, works offline.
- **Android (Samsung, other): Voice Recorder.** Pre-installed on most phones. Samsung's version supports transcription directly; for others, you may need to transcribe after the fact.

### Why this matters

Some of the best thinking happens in the 5 minutes right after a meeting, on your walk to the car, or at 10 PM when an idea lands. Capture it as audio. Your agent can transcribe and process it later.

### Getting voice memos into your agent workspace

Three paths, in order of preference:

1. **AirDrop / Nearby Share the audio file to your computer**, drop it into `meeting-transcripts/` or a dedicated `voice-memos/` subfolder, and ask your agent to process it. Most harnesses can transcribe audio directly; if not, use a transcription tool like Superwhisper or a local transcription skill.
2. **iOS 18+ built-in transcript:** open the memo in Voice Memos, tap the transcript icon, copy the text, paste into a new markdown file in `meeting-transcripts/`.
3. **Sync skill for power users:** a skill file that watches `~/Library/Group Containers/group.com.apple.VoiceMemos.shared/Recordings/` and pulls new `.m4a` files into your workspace automatically. Advanced; write one yourself once the pattern is clear, or ask your agent to write it for you. Not required for day one.

### Bonus: Superwhisper as a capture tool

[Superwhisper](https://superwhisper.com) is primarily a dictation tool, but it doubles as a structured note-capture layer: hold a hotkey, speak, release, and clean text appears wherever your cursor is. Drop that text into a markdown file and you have a structured note in seconds. Fully local; audio never leaves your machine.

---

## Phone call recording

*For voice-only conversations. Mobile phone to mobile phone.*

### iPhone (iOS 18+)

Apple added native [Call Recording](https://support.apple.com/en-us/120966) in iOS 18, expanded to additional iPhone models in iOS 18.1. Open the Phone app, start or receive a call, tap the record button that appears in the call UI. iOS plays an audible announcement to everyone on the call ("This call is being recorded") that cannot be disabled. The recording and an automatic transcript land in the Notes app when the call ends.

This is a feature, not a bug. The audible announcement handles consent automatically so you do not have to memorize your state's wiretap laws. In regions where call recording is prohibited, Apple simply does not offer the feature.

**To enable:** Settings → Apps → Phone → Call Recording, toggle on. On the call, tap the record button in the top-left of the Phone UI.

### Android (Pixel, Samsung, others)

- **Pixel: Recorder app** records calls with on-device transcription. Announcement plays in supported regions.
- **Samsung, other Android:** the stock Phone app on most modern Android phones has a record option during calls. Behavior and announcement vary by carrier and country.

### Getting call recordings into your agent workspace

iPhone: the Notes app entry has the transcript already. Copy it, paste into `meeting-transcripts/YYYY-MM-DD_<person>_call.md`, and ask your agent to process. Or use a sync skill if you want it automated.

Android: export the audio or transcript from the Recorder app to your computer. Same flow from there.

### What about FaceTime, WhatsApp, Signal, Google Meet?

Native iOS Call Recording only covers regular Phone calls (cellular or VoLTE). FaceTime, WhatsApp, Signal, and third-party video/voice apps are not supported. For video calls on those, use [Granola](#granola) or one of the meeting-note alternatives that can listen to system audio. For voice-only calls on those apps, you are generally better off asking the other person if you can switch to a regular phone call if recording matters.

---

## Consent and ethics

Recording someone without their knowledge is usually illegal, often unethical, and always damaging to the relationship if they find out. Even where the law permits it, treat recording as a trust action. Three defaults worth adopting:

- **Default to disclosing.** Tell the other person you are using a tool that will capture the conversation, especially if you plan to drop the transcript into your system for future reference. "I use a tool called Granola to keep notes of our conversations so I can follow up better, okay with you?" is almost always met with a yes.
- **Default to the audible announcement.** iPhone Call Recording's built-in announcement is a gift. Let it play. Do not go looking for workarounds.
- **Default to not recording sensitive situations.** Therapy, legal privilege, family crises, intimate conversations: even if a tool lets you record, do not. The social cost of being caught is enormous. The upside of having the transcript is small.

State law matters if you are in the US. Most states are "one-party consent" (you can record a conversation you are in without telling the other person). Eleven states including California, Florida, Illinois, Pennsylvania, and Washington require "all-party consent." If you travel or talk to people in those states, disclose.

---

## The pipeline

Every capture method above feeds the same final destination:

```
meeting-transcripts/
  2026-04-18_sarah-chen_followup.md       (Granola)
  2026-04-18_drive-home-debrief.md         (Voice Memos)
  2026-04-19_mom-call.md                   (iPhone Call Recording)
```

After the transcript lands, the prompt is identical:

> Process this transcript. Update any dossiers of people mentioned. Surface action items, commitments, and anything I should follow up on. Save relevant strategic notes to `artifacts/` if they rise above daily context.

Your agent does the rest. Over a year of this, you end up with the relationship system that makes every future conversation better prepared than the last.

---

## Further Reading

- [Agentic Relationship Management](/disciplines/agentic-relationship-management): why transcripts matter and how they feed the relationship graph.
- [Capture, Process, Compound](/foundations/capture-process-compound): the daily discipline behind the capture habit.
- [Externalize Your Brain](/foundations/externalize-your-brain): the broader principle the capture pipeline serves.
