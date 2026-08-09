---
title: "Harness Apps"
slug: /concepts/harness-apps
description: "An app whose entire backend is an agentic harness. Harness apps, or happs. Commonly called Claude Code apps: small purpose-built interfaces, often temporary, where the buttons are wired to Claude Code or Codex rather than to a server you wrote."
---

# Harness Apps

*An app whose entire backend is an agentic harness. Harness apps, or **happs**. The interface is small, purpose-built, and often temporary. The engine behind every button is Claude Code or Codex.*

---

## What it is

A harness app, or **happ**, is a user interface with no backend of its own. It renders some state, it collects your input, and when you act on it, it shells out to an agentic harness to do the work. People usually call these Claude Code apps, because that is the harness most of them are wired to today. The pattern is not vendor-specific. Codex, or any harness that can be driven headlessly, does the same job, which is why the neutral name is worth keeping.

The distinguishing test is what happens when you take the agent away. A normal app keeps working and loses a feature. A harness app becomes an empty shell, because the agent was the runtime.

This is a different claim from the two ideas next to it. [Local-First Software](/concepts/local-first-software) is about where your data lives and who owns it. [HTML-First Artifacts](/concepts/html-first-artifacts) is about the format an agent hands you when it is finished. A harness app is about architecture: the thing you are clicking has an agent underneath it, working while you watch.

## Chat is the wrong interface for whole classes of work

The chat box is extraordinary at what it is good at, and quietly terrible at a short list of jobs that come up constantly:

- **Judging.** Listening to seven sounds and deciding which two are wrong. Comparing four layouts. Scrubbing a video.
- **Comparing.** Anything that wants two things side by side, where scrolling back through a transcript destroys the comparison.
- **Arranging.** Ordering, grouping, and reordering. Dragging beats describing.
- **Approving.** A decision that needs a deliberate, visible act rather than the word "yes" in a stream of other words.

For any of these, describing the work in prose costs more than doing it with a pointer. The right move is for the harness to stand up a small interface, hand you the URL, and let you click. Then the agent goes back to being the engine.

## The agent works both sides

What makes this newly practical is that the agent builds the interface *and* powers it. Hand-building a bespoke UI for a single afternoon's task used to cost a day, which is why nobody did it. That cost has collapsed to minutes. The same collapse that makes [an app per problem](/concepts/local-first-software) affordable also makes the app's backend free, because the backend is the agent you already have.

The practical consequence is that the interface can be genuinely narrow. It does not need settings, accounts, or a second screen. It needs the three controls this task actually has.

## They are supposed to be temporary

Most happs should be born with a death date. Spun up for one job, opened in the browser, shut down when the job is done. Treating them as permanent software is the failure mode: it invites configuration, persistence, and a maintenance burden that the pattern exists to avoid.

A worked example, from building a sound-pack tool. A CLI command starts a small local server and opens a page listing every sound in a draft pack. You press play on each one. When something is wrong, you click "reroll this sound" and type why in plain language: *too harsh, want something softer*. That caption is handed to Claude Code, which rewrites the generation prompt to honor your note, re-renders the audio, and logs what changed. When the pack is right, you click approve, and the app moves the pack into place and shuts itself down. The interface exists for one session. The agent did the authoring, the rerolling, and the file moves. The page existed because listening to seven sounds is something chat cannot do.

## The failure mode to design for

A happ inherits a problem that normal apps do not have: **your backend can decline to work and still report success.**

An agent invoked headlessly will often exit cleanly after refusing to act. It hit a permission boundary, decided the request was out of scope, or wrote its explanation to stdout and stopped. The exit code says zero. A naive app reads zero, tells the user "done", and re-renders the unchanged state. The user believes their instruction was honored. Nothing happened.

This is worth stating plainly because it is easy to ship and hard to notice. It hides especially well from whoever built the tool, because a developer's own harness is usually configured to auto-approve file edits, so the refusal never occurs on their machine and occurs on everyone else's.

Two habits fix it:

1. **Grant the agent what it needs, explicitly.** Give the spawned agent the working directory and the paths it must write. Do not assume it inherits them.
2. **Verify the artifact, never the exit code.** Record what the files looked like before, and after the agent claims success, check that something actually changed. If nothing did, report a failure with the agent's own explanation attached. An honest error beats a confident lie.

The same discipline covers the rest of the surface. Stream progress so a two-minute agent run does not look like a hang, surface the agent's real error text rather than a generic failure, and remember that a local server with no auth is reachable by any page in the user's browser, so a harness app that can take a consequential action needs to check who is asking.

## Further Reading

- [Local-First Software](/concepts/local-first-software): the data-ownership half of the same shift, and where an app per problem becomes affordable.
- [Skill File First, App Second](/concepts/skill-file-first-app-second): the discipline that comes first. Prove the capability as a skill, then build the interface when chat is genuinely the wrong surface.
- [HTML-First Artifacts](/concepts/html-first-artifacts): what the agent hands you when a document is enough and an app is too much.
- [Playable Harness Experience](/concepts/playable-harness-experience): distributing an experience that runs inside the harness, rather than a UI standing beside it.
- [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure): the just-enough posture these apps depend on.
