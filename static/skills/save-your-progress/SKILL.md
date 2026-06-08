---
name: save-your-progress
description: Save your progress at the end of (or partway through) a heavy agentic work session. Surveys the session and workspace, PROPOSES a checklist of durable changes (work log, skill files, wiki/docs, README, memory/context, commit, resume note, report-back), waits for the user to confirm, then applies only what was approved. The save mechanic for a playable harness experience — a reviewed sweep, never autopilot. Use when the user says "save", "save my progress", "/save", "checkpoint", "wrap up this session", or before clearing/compacting a rich chat.
---

# Save Your Progress

A reviewed sweep that rescues the value of a work session before the chat clears or the context window fills. The artifacts are already on disk; this captures everything *around* them — decisions, rationale, newly-earned tribal knowledge — and leaves the workspace resumable.

**Canonical concept:** https://www.appliedai.wiki/concepts/save-your-progress
This file is hosted at https://www.appliedai.wiki/skills/save-your-progress/SKILL.md — link it, fork it, or copy it into your workspace's skills folder.

## Hard rule: propose, then confirm. Never autopilot.

A save touches load-bearing surfaces (skills, docs, git history). You MUST present a checklist of proposed changes and get explicit user confirmation BEFORE writing anything. The user can approve all, edit, or deselect items. Apply only what they confirm.

## Step 0 — Find the last checkpoint (so re-runs are incremental)

If this workspace has been saved before, do NOT re-chew the whole history. Find the most recent **save checkpoint** — a line recording the last save's timestamp and commit SHA (in the work log, or in a `SAVE-LOG.md` this skill maintains). If one exists, scope everything below to the delta **since that checkpoint**:

- **Files:** `git diff <last-sha>..` and `git log <last-sha>..HEAD`.
- **Conversation:** only what has happened since the last save.

This keeps repeated in-session saves cheap and stops the skill from re-proposing changes it already saved. If no checkpoint exists, do a full survey.

## Step 1 — Survey (read-only)

Without changing anything, build a picture of the session (scoped to the delta from Step 0 if there was one):

- What was actually produced or changed this session? (Run `git status` / `git diff --stat` if in a repo.)
- What decisions were made, and the *why* behind them?
- What was figured out that is repeatable — a technique, prompt shape, sequence, or gotcha? (Candidate tribal knowledge.)
- What durable surfaces already exist in this workspace? Look for: a work log / changelog, a `skills/` or `.agents/skills/` folder, a wiki or `docs/`, `README`(s), memory/context files (e.g. `people/`, project files, `USER.md`).
- What is unfinished — open threads and the next obvious move?

## Step 2 — Propose a checklist (the gate)

Present a grouped, specific checklist of proposed changes. Only include items that actually apply to THIS workspace and session. Example shape:

```
SAVE — proposed changes (confirm before I write):
  [ ] Work log: append dated entry → <path>            (only if a work log exists)
  [ ] Skill: refine <skill> / create <new-skill>       (capture: <the repeatable thing>)
  [ ] Wiki/docs: update <page>                          (now stale because <reason>)
  [ ] README / state docs: update <path>
  [ ] Memory/context: update <file(s)>
  [ ] Commit: "<proposed message>"
  [ ] Resume-here note: <where> (open threads + next move)
  [ ] Report-back summary: paste-ready account of what was done
```

Then ask the user to approve all, edit, or deselect. If nothing durable applies, say so plainly rather than inventing work.

## Step 3 — Apply only what was confirmed

For each confirmed item:

- **Work log** — append a dated entry: what got done, key decisions, what changed and why. Do NOT create a work log if none exists unless the user asked for one.
- **Skill files** — refine the existing skill or scaffold a new `SKILL.md` that captures the repeatable value, so it can be re-invoked later. This is the highest-leverage item; prioritize it.
- **Wiki / docs** — update the specific pages identified, in the wiki's own voice/conventions.
- **README / state docs** — reflect the new project state.
- **Memory / context files** — update the relationship/project/memory files the session touched.
- **Commit** — stage and commit with the approved message. Push only if the user asked.
- **Resume-here note** — record open threads + the next obvious move where the next session will look.

## Step 4 — Record the checkpoint, then report

- **Record a save checkpoint** so the next save is incremental: append a one-line entry — `<ISO timestamp> · <commit SHA you just made> · <one-line summary>` — to the work log if one exists, otherwise to a `SAVE-LOG.md` at the workspace root. This is the anchor Step 0 reads next time.
- **Report back:** output the report-back summary (what was saved, where) and state plainly that the chat is now safe to clear/compact — nothing of value lives only in the conversation anymore.

## Notes

- Model-agnostic and harness-agnostic: works in any harness that can read files and run commands.
- Adaptive, not fixed: coverage over ceremony. Skip slots that don't apply; never manufacture surfaces.
- Run it often — partway through long sessions, not just at the end. The checkpoint (Step 0/4) makes each re-run incremental, so cheap, frequent saves keep window pressure low without redoing work.
