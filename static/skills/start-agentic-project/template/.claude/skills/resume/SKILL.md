---
name: resume
description: Pick this project back up after any time away. Verifies the state file against the repo, then reports where things stand and the single next action. Use at the start of any session on this project, or when someone says "resume", "where was I", "what's next", or "pick this up".
---

# Resume

The one command that has to work. If this fails, the repo is a folder.

1. **Run `python3 check.py` FIRST.** It counts what is actually in the repo and
   computes the real dates from `PROJECT.md`. Never report counts or days
   remaining from `STATE.md`; report them from this.
2. Read `PROJECT.md`, `STATE.md`, `LOG.md`. Also `git log --oneline -10` IF this
   is a git repo; if it is not, say so as a finding, because an agentic project
   that is not version-controlled is missing half the point.
3. **If `check.py` reported drift, say that FIRST, in one line, and offer to
   reconcile.** The filesystem wins; `STATE.md` gets corrected to match it, never
   the other way round. This is not an interruption of the report, it is the most
   important part of it: a state file that is trusted and wrong is the exact
   failure this whole pattern exists to prevent.
4. Then report, and nothing beyond it:
   - **Where you are.** Phase, and the NEAREST date from `check.py` with the days
     remaining. Not the final deadline if something binds earlier.
   - **What happened last.** One line.
   - **The single next action.** One thing, sized for one sitting.
5. Stop. Do not start the work unless asked.

For the fuller picture (everything blocked, all open questions, the whole
milestone table) run `resume --full`. There is no separate `status` verb: it was
a third copy of rules that already live in `project-manager.md`, and this repo
keeps one copy of a rule.

Judgment about WHICH action is next belongs to the `project-manager` agent, whose
rules are in `.claude/agents/project-manager.md`. This skill is the entry point;
that file is the reasoning. If they ever disagree, the agent file wins.
