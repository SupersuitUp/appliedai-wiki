---
name: add-source
description: Ingest a source into the project and annotate it. Use when a book, paper, transcript, email thread, screenshot or link turns out to be relevant. Delete this skill if the project does not consume outside material.
---

# Add a source

1. Create `sources/<slug>/` and put the raw thing in it as `raw.<ext>`. A link is
   not a source you own: if it is a web page, save the text; if it is a video or
   podcast, get a transcript into the folder by whatever means this machine has
   (a local transcription tool if one is installed, the platform's own captions,
   or paste). If you genuinely cannot, write `raw-UNAVAILABLE.md` saying where it
   lives and why, so the gap is visible rather than silent.
2. Write `meta.json`: where it came from, when, and why it matters.
3. **Write `annotation.md`, and prompt the operator to DICTATE it.** What is in
   it, what is useful, what they disagree with, which part of the deliverable it
   serves.
4. Update `STATE.md`: add to Done, and revise Next action if this changes it. Do
   NOT type counts anywhere; `check.py` derives those.

The annotation is the point. Without it you have stored a rock. Do not let a
source land un-annotated: an agent given annotated sources assembles, and an
agent given raw files summarises.
