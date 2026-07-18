---
name: save-my-progress
description: Save my progress at the end of (or partway through) a heavy agentic work session. Surveys the session and workspace, then APPLIES the durable changes autonomously by default (work log, skill files, wiki/docs, README, memory/context, commit, resume note, report-back) using best judgment. Pass "ask" as an argument to get the interactive checklist gate instead. Use when the user says "save", "save my progress", "/save", "checkpoint", "wrap up this session", or before clearing/compacting a rich chat.
---

# Save My Progress

A reviewed sweep that rescues the value of a work session before the chat clears or the context window fills. The artifacts are already on disk; this captures everything *around* them — decisions, rationale, newly-earned tribal knowledge — and leaves the workspace resumable.

**Canonical concept:** https://www.appliedai.wiki/concepts/save-your-progress
This file is hosted at https://www.appliedai.wiki/skills/save-my-progress/SKILL.md — link it, fork it, or copy it into your workspace's skills folder.

## Default: autonomous. Ask only when invoked with "ask".

*(Gary's local override, 2026-07-03. The hosted canonical at appliedai.wiki still defaults to propose-then-confirm.)*

**Default mode (no argument):** survey, decide, and apply the durable changes using best judgment — no checklist, no confirmation gate. Commit with clear messages so everything is reviewable and reversible in git history. Then report back what was saved and where.

**Interactive mode (argument `ask`, `interactive`, or "ask me"):** present the AskUserQuestion checklist from Step 2 and apply only what Gary confirms.

Guardrails that hold in BOTH modes:
- Never touch files another session left dirty (uncommitted changes you did not make); mention them in the report instead.
- Never push to repos outside the session's workspaces, never publish to public surfaces (wikis, hosted docs) as part of a default save — public promotion is always an explicit ask.
- When genuinely uncertain whether an item belongs (e.g. a PRM edit built on a secondhand claim), skip it and flag it in the report rather than guessing.

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
- Did the session change any versioned artifact — a spec/standard, or an instance carrying `version:` / `last_updated:` metadata or a `conforms_to:` declaration — without bumping its numbers? (Candidate for the version-bump item in Step 3.)
- What durable surfaces already exist in this workspace? Look for: a work log / changelog, a `skills/` or `.agents/skills/` folder, a wiki or `docs/`, `README`(s), memory/context files (e.g. `people/`, project files, `USER.md`).
- What is unfinished — open threads and the next obvious move?

## Step 2 — Decide the item list (checklist gate only in interactive mode)

**Default mode:** build the same item list internally, decide inclusion by best judgment, and go straight to Step 3. Do not ask.

**Interactive mode only:** use the `AskUserQuestion` tool with `multiSelect: true` to present proposed changes as native checkboxes — never plain markdown `[ ]` lists. Each question takes 2–4 options; if you have more than 4 items, split into multiple questions (max 4 questions total) grouped by theme.

Typical grouping when there are many items:
- **Q1 "Durable artifacts"** — work log, skill refinement, wiki/docs update, README update (up to 4)
- **Q2 "Git + output"** — commit, resume-here note, report-back summary, memory/context update (up to 4)

If there are ≤4 items total, use a single question. Only include items that actually apply to THIS workspace and session.

Each option shape:
- `label`: short noun phrase — "Work log entry", "Skill update", "SAVE-LOG.md", "Report-back summary"
- `description`: one sentence — what file, what change, why it matters

Example call:
```
AskUserQuestion({
  questions: [{
    question: "Which of these should I write?",
    header: "Save items",
    multiSelect: true,
    options: [
      { label: "SAVE-LOG.md", description: "Create at repo root — SHA anchor for incremental saves" },
      { label: "Session notes artifact", description: "AEP artifact capturing decisions + rationale from this session" },
      { label: "Report-back summary", description: "Paste-ready account — safe to clear chat after" }
    ]
  }]
})
```

In interactive mode, the user's selections are the confirmed items; apply only those. In either mode, if nothing durable applies, say so plainly rather than inventing work.

## Step 3 — Apply the items

For each item (self-decided in default mode, confirmed in interactive mode):

- **Work log** — append a dated entry: what got done, key decisions, what changed and why. Do NOT create a work log if none exists unless the user asked for one.
- **Skill files** — refine the existing skill or scaffold a new `SKILL.md` that captures the repeatable value, so it can be re-invoked later. This is the highest-leverage item; prioritize it. **A skill is a set of instructions, not a changelog — every line you add must IMPROVE what the next invocation produces.** Apply the test to each proposed edit: *does the skill behave or produce better because of this line?* It passes if it adds a new procedure, changes a choice, or **corrects a wrong instruction the skill was giving** (the highest-value edit). It FAILS if it is descriptive state, session history, implementation trivia (file paths, class names, internal mechanisms), or true-but-inert detail that leaves the next run's behavior unchanged — that is bloat; route it to the SAVE-LOG / docs / changelog instead. Also match the edit to the RIGHT skill: put a lesson only in the skill whose task it changes (a "how to ship" fact belongs in the shipping skill only if it changes shipping; deep implementation belongs with the code or its docs). Length without behavior-change is a regression: prefer correcting/tightening existing lines over appending new ones, and if an addition doesn't pass the test, cut it.
- **Wiki / docs** — update the specific pages identified, in the wiki's own voice/conventions.
- **README / state docs** — reflect the new project state.
- **Memory / context files** — update the relationship/project/memory files the session touched.
- **Version bumps** — if the session changed a spec/standard or a versioned instance, bump the numbers as part of the save: update the instance's `version` and `last_updated`; bump the standard's own version when its normative content changed (title, metadata comment, Version Note, and any example version strings inside it); and refresh the `conforms_to` declaration on any instance that was updated against the new standard version. Leave untouched instances at their old `conforms_to` — that lag is the signal the format intends. A content change with a stale version number lies to the next reader.
- **Commit** — stage and commit with the approved message. Push only if the user asked.
- **Resume-here note** — record open threads + the next obvious move where the next session will look.

## Step 4 — Record the checkpoint, then report

- **Record a save checkpoint** so the next save is incremental: append a one-line entry — `<ISO timestamp> · <commit SHA you just made> · <one-line summary>` — to the work log if one exists, otherwise to a `SAVE-LOG.md` at the workspace root. This is the anchor Step 0 reads next time.
- **Report back:** output the report-back summary (what was saved, where) and state plainly that the chat is now safe to clear/compact — nothing of value lives only in the conversation anymore.

## Notes

- Model-agnostic and harness-agnostic: works in any harness that can read files and run commands.
- Adaptive, not fixed: coverage over ceremony. Skip slots that don't apply; never manufacture surfaces.
- Run it often — partway through long sessions, not just at the end. The checkpoint (Step 0/4) makes each re-run incremental, so cheap, frequent saves keep window pressure low without redoing work.
