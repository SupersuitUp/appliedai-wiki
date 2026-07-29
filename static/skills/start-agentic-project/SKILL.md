---
name: start-agentic-project
description: Stand up a new AGENTIC PROJECT: a git repo that holds every piece of context a project has, a resumable state machine an agent reads to answer "what's next", a set of project verbs as skills, and a supervising project-manager subagent. Use when someone has a real project with a deliverable and a deadline (a thesis, a book, taxes, a separation, a launch, a move) and wants to stop holding it in their head. Trigger phrases include "start an agentic project", "set up a project repo for X", "I want an AI project manager for X", "/start-agentic-project", "make my thesis resumable", or any time a person describes a months-long effort they keep procrastinating on because planning it is itself the overwhelming task. NOT for a campaign of outreach to people (that is `campaign-plugins` shaped, layered on the PRM) and NOT for a single artifact you can finish in one sitting.
---

# Start an Agentic Project

Turn a project into a **repo with a state machine and verbs**, so that closing the laptop costs nothing and reopening it costs one command.

The claim underneath: a project is not a to-do list. It is a body of context plus a position in a process. Hold both in files, in git, and the agent can always tell you what is next, because it never lost the thread.

## When this is the wrong tool

- **A campaign of outreach to people.** That is relationship-shaped and belongs on the PRM. See the `campaign-plugins` pattern instead.
- **A single artifact you can finish in one sitting.** The scaffolding costs more than the work.
- **A project with no deliverable.** If nothing is ever produced, there is no state to advance and this is a note-taking system, not a project.

## The four parts, and why each exists

**1. The ontology (`PROJECT.md`).** What this project IS, what done looks like, the constraints, the non-negotiables, and a MILESTONES TABLE carrying every date in `YYYY-MM-DD` form. Written once, revised rarely. Everything else derives from it.

This is the part people skip, and skipping it is why delegated work comes back wrong. An agent cannot advance a project whose definition of success it has to guess. State the deliverable, state the standard, state what would make it a failure.

**The submission date is usually not the date that binds.** If a reviewer needs a draft two weeks earlier, or a decision has to be made before the research can start, those come first and they are what actually catches people out. List every one, because `check.py` parses this file and reports the nearest as the real runway. A project that tracks only its final deadline is buying itself weeks of false comfort.

**2. The state machine (`STATE.md` plus `check.py`).** Split deliberately, and this split is the thing that makes the pattern survive contact with a real project.

`check.py` DERIVES everything countable: how many sources exist, how many are annotated, how many claims and drafts, and every date in `PROJECT.md` with the nearest one flagged as the runway that actually binds. `STATE.md` holds only what cannot be derived: phase, next action, blocks, open questions, unknowns.

A cold review of the first build of this template caught the seeded example claiming three sources and two annotations when the repo held two and one, next to an "on track: yes" nobody could falsify. Both were hand-typed. **A hand-typed count is wrong the day after it is written, and it is wrong inside the one file the whole pattern tells you to trust.** So counts are counted and dates are computed.

The tie-breaker is stated in the file itself: if `STATE.md` and the filesystem disagree, the filesystem wins.

**3. The verbs (`.claude/skills/`).** The small set of actions that move this project forward. Every project has different ones. A research project ingests sources; a tax project collects documents; a separation tracks obligations and dates. The verbs ARE the process, made callable.

**4. The supervisor (`.claude/agents/project-manager.md`).** A subagent whose entire job is the state machine: read it, answer "what's next", update it after work happens, and notice when a deadline has stopped being realistic. It does not do the work. It knows where the work is.

## Procedure

### Step 1: Interview for the ontology

Do not scaffold first. Ask, and keep asking until you can write `PROJECT.md` without guessing:

- What is the deliverable? Name the artifact. "A 20-page thesis on Bitcoin, submitted to the university portal."
- What is the hard deadline, and is it real or self-imposed?
- What does GOOD look like, specifically? What would make it a failure even if it were submitted on time?
- What are the constraints nobody would guess? (A university that penalises AI-assisted prose. A tax authority that wants originals. A counterparty who reads everything you send.)
- What already exists? Half-written drafts, a folder of PDFs, an email thread. All of it is context.
- Who else is involved, and what are they waiting on?

**Ask about the constraint that embarrasses them.** It is usually the load-bearing one, and it is usually unsaid.

**The template ships this interview as a skill** (`template/.claude/skills/interview/`),
so a person who clones it and opens Claude Code can run `interview` and get the
same thing without you. Prefer that when they are technical: it fills the files
in place instead of handing them two blobs to paste.

**If the person is not in the room, or does not use Claude Code, send them this link instead:**
https://github.com/SupersuitUp/agentic-project-template/blob/master/BOOMERANG.md
(GitHub gives them a one-click copy button; they paste it into whatever AI they
use). It runs this
same interview through their own AI and hands back a finished `PROJECT.md` and
`STATE.md`. Use it whenever the project owner is someone else, in another
timezone, or busy: the alternative is you guessing at their deliverable, and a
scaffold built on a guess is worse than no scaffold. They come back populated
rather than staring at `<PROJECT NAME>`.

### Step 2: Choose the verbs

Derive them from how this specific project actually advances. Do not ship a generic set.

Ask: *what are the repeatable moves that leave this project further along than it was?* Every project ships with `resume`, `add-source`, `draft-claim` and `log-decision`. Beyond those:

| Project shape | Its verbs |
|---|---|
| Research or thesis | `add-source`, `annotate`, `draft-claim`, `project-deliverable` |
| Book | `add-beat`, `render-spread`, `read-back`, `publish` |
| Taxes or filing | `add-document`, `check-completeness`, `file-item` |
| Separation or negotiation | `log-communication`, `track-obligation`, `check-deadline` |
| Launch | `add-asset`, `check-blockers`, `dry-run` |

A verb is worth adding when you have done the same thing twice by hand.

### Step 3: Scaffold from the template

**The template is NOT carried in this skill.** It lives in exactly one place, and
this skill clones a pinned tag of it. A second copy is how a reviewer once spent
an hour on a stale one.

```bash
TAG=v2026-07-29.5    # pinned deliberately; see "Bumping the pin" below
git clone --depth 1 --branch "$TAG" \
  https://github.com/SupersuitUp/agentic-project-template.git /tmp/apt
cp -R /tmp/apt/template ~/projects/<project-slug>
cd ~/projects/<project-slug> && git init && git add -A && git commit -m "init: <project> as an agentic project"
python3 check.py     # should report zero of everything, and no dates yet
```

Then fill `PROJECT.md` (including the milestones table) and `STATE.md` from the interview, and write one skill per verb into `.claude/skills/`. Re-run `check.py`: it should now name your real runway.

**`check.py` prints its template version on the first line.** If someone hands you a project repo to review, check that line against this template before you trust anything you conclude. A cold review once spent an hour producing a confident, thorough, wrong report against a two-generations-stale copy that had no way to announce itself.

**Bumping the pin.** Template changes happen in the repo, never here. To adopt one:

```bash
gh repo clone SupersuitUp/agentic-project-template && cd agentic-project-template
# make the change, then:
bash run-tests.sh                      # must be ALL GREEN
# bump TEMPLATE_VERSION in template/check.py, commit, then:
git tag -a v<new-version> -m "..." && git push origin v<new-version>
```

Then update `TAG` in the block above to match. Six cases run: five attacks that must exit 1 (pristine, deleted markers, the copied `_example` source, touched empty files, filled-but-dateless) and one good-faith fill that must exit 0. Every one is a defect a cold review actually found. Add a case whenever a new one is found; a checker you have not attacked is a checker you have not tested.

### Step 4: Ingest everything that already exists

This is the step that makes the difference and the step people underrate. Every draft, PDF, email thread, screenshot and voice note goes into `sources/` **now**, before any work starts.

The rule: **if it took effort to find, it goes in the repo.** The reason to keep it is not that you will read it again. It is that you will never again wonder whether you have it.

### Step 5: Annotate, do not just collect

A raw source is a rock. An annotated source is an ingredient.

For each source, write `annotation.md`: what is in it, what is useful, what you disagree with, which part of the deliverable it serves. **Dictate these rather than typing them.** The point is volume and honesty, not prose.

An agent given fifty annotated sources will assemble something. An agent given fifty PDFs will summarise, which is a different and much worse thing.

### Step 6: Wire the supervisor

Register `.claude/agents/project-manager.md` and confirm it can answer three questions cold, in a fresh session, with no context but the repo:

1. What is the state of this project?
2. What is the single next action?
3. Are we still going to make the deadline?

If it cannot answer all three from files alone, the state machine is incomplete. Fix it now, because that is exactly the moment it is cheap to fix.

### Step 7: Prove resumability

The gate, and the one step most likely to be skipped by whoever builds this,
including its author. **Close the session. Open a new one. Type `resume`.**

If the new session cannot pick the project up without you re-explaining anything, the scaffold has failed and you have built a folder, not a project. Do not skip this. It is the only check that matters and it takes one minute.

## The evolution loop

The project manager may improve its own process. When a better way to manage this project is discovered, it belongs in the repo, not in the operator's memory:

- A verb used twice by hand becomes a skill.
- A question asked twice becomes a field in `STATE.md`.
- A mistake made twice becomes a check inside the relevant verb.

Record each change in `LOG.md` with the reason. The repo should get better at running the project while the project runs.

## Gates honored

- **Ontology before scaffold.** No repo is created before the deliverable and the standard are written down.
- **Resumability is proven, not assumed.** A cold session must pick it up, tested at least once.
- **Everything in git.** Version control and source control are not features to build; they come free the moment the project lives in a repo, and they are most of the value.
- **The agent never invents state.** If it does not know, `STATE.md` says UNKNOWN and the next action is to find out.
- **Nothing countable is typed.** `check.py` runs first in `resume` and its numbers win over anything written in `STATE.md`.
- **The template ships no seeded example data.** Placeholder prose only. A seeded example drifts out of sync with itself and then teaches the operator to distrust the state file, which is the failure this pattern exists to prevent.

## Related

- `concepts/agentic-project-management` on appliedai.wiki is the canonical write-up of the pattern.
- `campaign-plugins` is the relationship-driven special case, layered on the PRM.
- `the-corpus-and-the-projection` is why the deliverable is regenerable rather than precious.
- `knowledge-repo-design` is the monorepo shape when several projects share raw material.
