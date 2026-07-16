---
name: save-my-progress
description: Generate a save-your-progress skill tailored to one workspace; surveys the operator's durable surfaces (work log, skills folder, docs, memory files, git), interviews for the gaps, and installs a personalized SKILL.md plus a first checkpoint. One-time generation; not for ongoing use.
generates: A personalized save-your-progress SKILL.md installed in the operator's skills folder, with their durable surfaces, default mode, and guardrails baked in, plus a first save checkpoint
---

<!-- last_updated: 2026-07-16 -->
<!-- version: 0.1 -->

# Generating Your Save-My-Progress Skill

**Canonical source:** [appliedai.wiki/concepts/save-your-progress](https://appliedai.wiki/concepts/save-your-progress): the concept this factory installs, with the doctrine behind every default below.

You are running a ONE-TIME GENERATION. After this completes, the operator has a working `save-my-progress` skill installed in their own workspace and the recipe is done. Do not re-run unless the operator explicitly says they want to generate the skill for a different workspace.

The generic hosted skill ([SKILL.md](https://appliedai.wiki/skills/save-my-progress/SKILL.md)) works as-is by re-discovering the workspace on every save. This factory produces something better for a workspace the operator will save in repeatedly: a copy with their actual surfaces, checkpoint home, default mode, and protected files written in, so every save starts warm instead of surveying cold.

## What This Generates

- `<skills-folder>/save-my-progress/SKILL.md`: a personalized instance of the hosted skill, with the operator's confirmed durable surfaces baked into the survey and apply steps.
- A first save checkpoint (timestamp plus current commit SHA) recorded where the operator chose, so their first real save is already incremental.

## Prerequisites

- An agentic harness that loads skill files from a folder (Claude Code, or any harness with the same shape).
- A workspace the operator actually works in, ideally a git repository.

## Interview

Ask each question one at a time. Capture answers in `./save-my-progress-build-notes.md`.

**Q1.** Where do skills live in this workspace? (Common answers: `.agents/skills/`, `.claude/skills/`, `~/.claude/skills/` for global.) Accept an existing folder path; offer to create the conventional one for this harness if none exists.

**Q2.** Before asking anything else, survey the workspace yourself: look for a work log or changelog, a `docs/` or wiki, `README`(s), memory or context files (`people/`, `user/`, project files), and whether this is a git repo. Present what you found as the candidate durable-surface list and ask the operator to confirm, remove, or add surfaces. Only confirmed surfaces go into the generated skill.

**Q3.** Default mode: propose-then-confirm (the agent presents a checklist and waits for approval before writing anything; recommended, especially for shared repos) or autonomous (the agent applies its best-judgment item list and reports after)? 

**Q4.** Where should save checkpoints live: appended to the existing work log (if one was confirmed in Q2) or in a `SAVE-LOG.md` at the workspace root?

**Q5.** Are there files or folders a save must never touch (another person's notes, generated files, anything deliberately kept uncommitted)? These become a named guardrail list in the skill.

Echo the running plan back to the operator after every third answer.

## Common scenarios

When the operator names a scenario, confirm the defaults below and short-circuit the interview.

- **Solo personal workspace.** Skills in `.agents/skills/`, autonomous mode acceptable, `SAVE-LOG.md` at root, minimal protected list.
- **Shared team repo.** Propose-then-confirm mode, checkpoints in the existing changelog if one exists, protected list includes teammates' working files, commit but never push without asking.
- **Global (whole-machine) install.** Skills in the harness's global folder (`~/.claude/skills/`), checkpoints per-repo rather than global, mode per operator preference.

## Steps

1. **Fetch the base.** Download the canonical template from `https://appliedai.wiki/skills/save-my-progress/SKILL.md`. Success: you have the full file contents.
2. **Specialize it.** Replace the generic "look for durable surfaces" survey with the confirmed Q2 list (keep the instruction to stay alert for new surfaces); set the Q3 default mode as the skill's default and keep the other mode reachable by argument; write the Q4 checkpoint location into Step 0 and Step 4; add the Q5 protected list to the guardrails. Keep everything else, including the incremental-checkpoint mechanic, intact. Success: a diff against the base shows only these personalizations.
3. **Install it.** Write the file to `<skills-folder>/save-my-progress/SKILL.md`. Success: the file exists and its `name:` field matches the folder name.
4. **Record the first checkpoint.** Append `<ISO timestamp> · <current commit SHA or "no-git"> · skill installed by GENERATE` to the Q4 location. Success: the line exists, so the operator's first real save scopes to the delta from now.
5. **Dry-run the survey.** Invoke the new skill in survey-only mode (read Step 1 of the generated skill and execute just that). Success: it finds every confirmed surface and flags nothing missing.

Show output to the operator after each step.

## Output

- Installed skill: `<skills-folder>/save-my-progress/SKILL.md`
- First checkpoint: in the operator's chosen checkpoint home
- Working notes: `./save-my-progress-build-notes.md`

## Verification

```bash
cat <skills-folder>/save-my-progress/SKILL.md | head -5
# expected: frontmatter with name: save-my-progress

grep -n "checkpoint" <checkpoint-home>
# expected: the first checkpoint line from Step 4
```

Also confirm the harness lists the skill (for Claude Code: it appears among available skills in a fresh session). If any check fails, do NOT declare the GENERATE complete. Diagnose and resolve.

## Idempotency

Refuse to clobber. If `<skills-folder>/save-my-progress/SKILL.md` already exists, halt and ask whether the operator wants to (a) update it in place against the current canonical template (show the diff first) or (b) abort. Never silently overwrite: their copy may carry personalizations this recipe does not know about.

## When to NOT run this again

To actually save a session, invoke the generated skill, not this recipe. To adjust the generated skill (change mode, add a surface), edit its SKILL.md directly. Re-run this GENERATE only for a genuinely different workspace, and install into that workspace's own skills folder.

## Pairs with

- [save-your-progress SKILL.md](https://appliedai.wiki/skills/save-my-progress/SKILL.md): the canonical template this factory specializes.
- [Save Your Progress](https://appliedai.wiki/concepts/save-your-progress): the concept and doctrine.
- [Skill Files](https://appliedai.wiki/concepts/skill-files): the unit this installs.

## Pitfalls

- **A workspace with no durable surfaces.** If Q2 finds nothing (no git, no docs, no log), the skill would have nowhere to sweep value into. Recommend the minimum viable set first: initialize git and create a `SAVE-LOG.md`. Generate against that.
- **Autonomous mode in a shared repo.** A save touches load-bearing surfaces. Default shared repos to propose-then-confirm; let the operator opt into autonomous deliberately, not by default.
- **Baking in surfaces the agent cannot reach.** If a confirmed surface lives outside the workspace (another repo, a cloud doc), verify the agent can actually read and write it during the dry-run, or mark it report-only in the generated skill.
- **Dropping the checkpoint mechanic while specializing.** Without Step 0/Step 4 checkpoints the skill re-chews the whole history every save and gets invoked less. It is the feature that makes saves cheap; keep it.
