---
title: "Skills"
slug: /skills
description: "A small library of hosted, model-agnostic reference skills you can link, fetch, or fork. Each is a raw SKILL.md served at a stable URL, ready to drop into any agentic harness that can read files."
---

# Skills

*A small library of hosted, model-agnostic reference skills. Each is a raw `SKILL.md` served at a stable URL: link it, point your harness at it, or fork it into your own workspace.*

---

## What this is

A [skill file](/concepts/skill-files) is a structured set of instructions an agentic harness loads on demand. Most skills live inside a personal workspace. The ones here are **reference skills**: general-purpose, harness-agnostic, and hosted at stable public URLs so anyone can grab them.

Each entry below links to its raw `SKILL.md`. You can:

- **Link it**: hand the URL to your agent ("follow this skill: …") and it WebFetches the instructions.
- **Copy it**: drop the file into your workspace's `skills/` (or `.agents/skills/`) folder.
- **Fork it**: take it as a starting point and edit the 20% that should differ for you.

These are served as raw files under `/skills/<name>/SKILL.md` (the `static/` folder maps to the site root, so the path is clean). They're reachable by a hyperagent's harness acting on your behalf; only named training/search crawlers are blocked at the edge.

## The library

| Skill | What it does | Raw file |
|---|---|---|
| **save-my-progress** | A reviewed sweep that rescues a session's value (work log, [skills](/concepts/skill-files), wiki/docs, README, memory, commit, resume note, report-back), proposing a checklist and confirming before it writes anything. The save mechanic for the [playable harness experience](/concepts/playable-harness-experience). See [Save Your Progress](/concepts/save-your-progress). | [`SKILL.md`](https://www.appliedai.wiki/skills/save-my-progress/SKILL.md) · [`GENERATE.md`](https://www.appliedai.wiki/skills/save-my-progress/GENERATE.md) (factory: installs a copy personalized to your workspace) |
| **generate-a-spec** | Turns a vague "can you help me build this?" into a build-ready spec: hand the paired boomerang to the person, an AI interviews them, and a nine-section spec led by a triage-ready TL;DR comes back. See [Generate a Build-Ready Spec](/playbooks/generate-a-spec). | [`SKILL.md`](https://www.appliedai.wiki/skills/generate-a-spec/SKILL.md) · [`BOOMERANG.md`](https://www.appliedai.wiki/skills/generate-a-spec/BOOMERANG.md) |
| **generate-a-boomerang** | Authors a new [Boomerang Prompt](/concepts/boomerang-prompt): gathers what you want back and from whom, designs the return schema first, then writes a conforming [BOOMERANG.md](/reference/standards/boomerang-md) instance. | [`SKILL.md`](https://www.appliedai.wiki/skills/generate-a-boomerang/SKILL.md) |
| **job-fit-brief** | A standalone boomerang for someone figuring out what work suits them: an AI interviews them, writes a job fit brief (evidence-backed role directions, pay ranges, entry paths), then searches real local openings. | [`BOOMERANG.md`](https://www.appliedai.wiki/skills/job-fit-brief/BOOMERANG.md) |
| **bug-report** | A standalone boomerang you hand to whoever says "it doesn't work": an AI interviews them for the details a coding agent needs (exact URL, numbered steps, device, signed-in state, timestamp, what a refresh changed) and returns a reproducible bug report you paste into your harness. | [`BOOMERANG.md`](https://www.appliedai.wiki/skills/bug-report/BOOMERANG.md) |

*More reference skills will be added here over time.*

## Further Reading

- [Skill Files](/concepts/skill-files): the unit these are made of.
- [Playable Harness Experience](/concepts/playable-harness-experience): how bundles of skills ship and run.
- [Save Your Progress](/concepts/save-your-progress): the concept behind the first hosted skill.
