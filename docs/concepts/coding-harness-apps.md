---
title: "Coding Harness Apps"
slug: /concepts/coding-harness-apps
description: "An app whose backend is an agentic harness, and whose interface exists to collect the one thing the harness cannot do itself. Coding harness apps, or CHAPPS. The harness runs the pipeline, summons a real interface when it needs your hands, eyes, or voice, then takes the data back and keeps going."
image: "/img/comics/coding-harness-apps.png"
---

# Coding Harness Apps

*An app whose backend is an agentic harness, and whose interface exists to collect the one thing the harness cannot do itself. Coding harness apps, or **CHAPPS**. The harness runs the pipeline, summons a real interface when it needs your hands, eyes, or voice, then takes the data back and keeps going.*

![Three panels in a warm room. One: a woman sits at a desk with her hands idle while inside the glowing amber laptop a small gold-capped figure holds a row of cards with one card left blank. Two: a single panel lifts out of the laptop and floats between the screen and the woman, showing one round button, and she leans in and speaks into it. Three: the floating panel is gone, the figure inside the laptop holds the same row with every card now filled, a stack of sealed envelopes slides out onto the desk, and the woman sits back with her hands off the desk.](/img/comics/coding-harness-apps.png)

---

## What it is

A coding harness app, or **CHAPPS**, is a real interface with no backend of its own. It renders some state, it collects input a harness cannot produce, and when you act on it, the work is done by an agentic harness. People usually call these Claude Code apps, because that is the harness most of them are wired to today. The pattern is not vendor-specific. Codex, or any harness that can be driven headlessly, does the same job, which is why a neutral name is worth keeping.

The short form has to survive being said out loud, which is why it carries a leading consonant. "Harness apps" compresses in speech to a sound almost identical to "apps," so the term disappears the moment anyone says it. CHAPPS keeps the APPS visible and puts a hard sound in front of it, and it collides with nothing.

The distinguishing test is what happens when you take the agent away. A normal app keeps working and loses a feature. A CHAPPS becomes an empty shell, because the agent was the runtime.

This is a different claim from the two ideas next to it. [Local-First Software](/concepts/local-first-software) is about where your data lives and who owns it. [HTML-First Artifacts](/concepts/html-first-artifacts) is about the format an agent hands you when it is finished. A CHAPPS is about architecture: the thing you are clicking has an agent underneath it, working while you watch.

## It is an app, not a skill file

The most common way to get this wrong is to build a [skill file](/concepts/skill-files) and call it a CHAPPS. A skill teaches the harness to do something. A CHAPPS is the interface the harness opens when the next step needs a human body.

The order matters, and it runs one way. [Skill File First, App Second](/concepts/skill-file-first-app-second) is the governing discipline: prove the capability as a skill, and only build the interface once you have hit a step chat genuinely cannot carry. A CHAPPS built before that step is identified is a UI in search of a job.

## Chat cannot capture, judge, or arrange

The chat box is extraordinary at what it is good at, and quietly terrible at a short list of jobs that come up constantly:

- **Capturing.** Recording thirty-five voice notes, one per person. Taking a photo. Drawing a shape. The harness has no microphone, no camera, and no hands.
- **Judging.** Listening to seven sounds and deciding which two are wrong. Comparing four layouts. Scrubbing a video.
- **Comparing.** Anything that wants two things side by side, where scrolling back through a transcript destroys the comparison.
- **Arranging.** Ordering, grouping, and reordering. Dragging beats describing.
- **Approving.** A decision that needs a deliberate, visible act rather than the word "yes" in a stream of other words.

For any of these, describing the work in prose costs more than doing it with a pointer. The right move is for the harness to stand up an interface, hand you the URL, and let you work. Then the agent goes back to being the engine.

## The round trip is the pattern

The part that gets missed is that the interface is not a destination. It is a limb the harness extends and then retracts.

The shape is always the same:

1. **The harness is running a pipeline** and reaches a step only a human body can complete.
2. **It summons an interface** and hands you a URL, mid-conversation.
3. **You do the human-only thing** in a surface built for it. Thirty-five recordings in a row, one tap each, no context switch between them.
4. **The interface posts the payload back** to the harness. Raw audio files, a set of approvals, a reordered list.
5. **The pipeline resumes** where it paused, now holding data it could never have generated.

That round trip is what separates a CHAPPS from a website that happens to call an API. Control starts in the harness, leaves for exactly as long as your hands are needed, and comes back. You are never dropped into an app and left there to finish the job by hand.

The consequence is the one that changes how the work feels. Because the pipeline is code, edits are addressable in bulk. A batch of thirty-five personalized messages sitting in a normal app means thirty-five text boxes and thirty-five rounds of editing. Sitting in a harness, one instruction rewrites the rule that generated them, and all thirty-five regenerate. The interface handles the recording, because only you can speak. The harness handles the other thirty-four changes, because none of them need you at all.

## Some are temporary and some are not

Most CHAPPS should be born with a death date. Spun up for one job, opened in the browser, shut down when the job is done. Treating a single-use tool as permanent software is a real failure mode: it invites configuration, persistence, and a maintenance burden the pattern exists to avoid.

But the death date is a default, not a rule, and the earlier framing of this idea overstated it. When the human-only step recurs, the interface that captures it should stay. A capture surface you reach for every week has earned persistence, and rebuilding it each time is its own kind of waste. The test is whether the step repeats, not whether the code feels disposable.

## Worked examples

**A sound-pack tool, temporary.** A command starts a local server and opens a page listing every sound in a draft pack. You press play on each one. When something is wrong, you click "reroll this sound" and type why in plain language: *too harsh, want something softer*. That caption goes to the harness, which rewrites the generation prompt to honor your note, re-renders the audio, and logs what changed. When the pack is right, you click approve, and the app moves the pack into place and shuts itself down. The page existed because listening to seven sounds is something chat cannot do.

**A voiceprint library, durable.** A transcript pipeline keeps mis-clustering two speakers. The pipeline pauses and opens a page that lists every enrolled voiceprint with a play button beside each. You audition them, delete the bad ones, and re-enroll the speaker it confused. The pipeline picks the corrected library back up and finishes the run. This one earns its permanence: the failure recurs, and auditioning audio is permanently outside what a harness can do.

**An outreach tracker, durable.** A skill builds a filtered queue of people to contact, then hands over a single-file page with the queue loaded: copy the message, open it in the messaging app, mark sent or skipped, next. Progress persists locally in case the browser closes. At the end you download a log, and the skill ingests it back into a permanent record. The human is in the loop for the part that needs a human, which is deciding what to actually say to each person and pressing send.

## The failure mode to design for

A CHAPPS inherits a problem normal apps do not have: **your backend can decline to work and still report success.**

An agent invoked headlessly will often exit cleanly after refusing to act. It hit a permission boundary, decided the request was out of scope, or wrote its explanation to stdout and stopped. The exit code says zero. A naive app reads zero, tells the user "done", and re-renders the unchanged state. The user believes their instruction was honored. Nothing happened.

This is worth stating plainly because it is easy to ship and hard to notice. It hides especially well from whoever built the tool, because a developer's own harness is usually configured to auto-approve file edits, so the refusal never occurs on their machine and occurs on everyone else's.

Two habits fix it:

1. **Grant the agent what it needs, explicitly.** Give the spawned agent the working directory and the paths it must write. Do not assume it inherits them.
2. **Verify the artifact, never the exit code.** Record what the files looked like before, and after the agent claims success, check that something actually changed. If nothing did, report a failure with the agent's own explanation attached. An honest error beats a confident lie.

The same discipline covers the rest. Stream progress so a two-minute agent run does not look like a hang, surface the agent's real error text rather than a generic failure, and remember that a local server with no auth is reachable by any page in the user's browser, so a CHAPPS that can take a consequential action needs to check who is asking.

## Further Reading

- [The Harness Should Be Your Default Interface](/perspectives/the-harness-should-be-your-default-interface): the argument for starting every workflow here, and what it costs when you do not.
- [Skill File First, App Second](/concepts/skill-file-first-app-second): the discipline that comes first. Prove the capability as a skill, then build the interface when chat is genuinely the wrong place.
- [Local-First Software](/concepts/local-first-software): the data-ownership half of the same shift, and where an app per problem becomes affordable.
- [HTML-First Artifacts](/concepts/html-first-artifacts): what the agent hands you when a document is enough and an app is too much.
- [Playable Harness Experience](/concepts/playable-harness-experience): distributing an experience that runs inside the harness, rather than an interface standing beside it.
- [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure): the just-enough posture these apps depend on.
