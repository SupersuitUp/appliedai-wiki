---
name: start-agentic-project
description: Stand up ONE real project (a thesis, a book, a filing, a launch, a move) as an agentic project: a git repo holding every piece of context it has, plus a resumable state machine an agent reads to answer "what is next". Interviews the operator first, then clones, fills, commits and proves resumability. Trigger phrases include "start an agentic project", "set up a project repo for X", "I want an AI project manager for my thesis", "make my thesis resumable", or any months-long effort someone keeps postponing because planning it is itself the overwhelming task. One-time generation; not for ongoing use.
generates: A git repo with a filled PROJECT.md ontology, a STATE.md state machine, project verbs as skills, a supervising project-manager subagent, and a passing check.py
---

<!-- last_updated: 2026-07-29 -->
<!-- version: 0.1 -->

# Starting an Agentic Project

**Canonical source:** [appliedai.wiki/concepts/agentic-project-management](https://appliedai.wiki/concepts/agentic-project-management), the rendered doctrine this recipe ships in.

You are running a ONE-TIME GENERATION. After this completes, the project exists
as a git repo at the agreed location, `check.py` passes, and a cold session can
pick it up with one word. Do not re-run unless the operator explicitly says they
want a second, different project.

**Do the work yourself.** The operator answers questions; you run every command,
write every file, and report what happened. Do not hand them a checklist, do not
tell them to fill in a template, and do not stop at "here are your two files".
Handing back files instead of a working repo is the single most common way this
recipe gets run badly.

## What This Generates

- A git repo at `~/projects/<slug>` (or wherever the operator wants it) with an
  initial commit.
- `PROJECT.md`: the ontology. The deliverable named as an artifact, what good
  looks like, the constraints, and a milestones table carrying every date.
- `STATE.md`: the state machine. Phase, the ONE next action, blocks, unknowns.
- `check.py`: derives everything countable from disk and names the date that
  actually binds. Exits non-zero until the project is genuinely filled in.
- `.claude/skills/`: the project's verbs (`interview`, `resume`, `add-source`,
  `draft-claim`, `log-decision`, plus any this project specifically needs).
- `.claude/agents/project-manager.md`: the supervising subagent.
- Working notes: `./start-agentic-project-build-notes.md`.

## Prerequisites

- `git` and `python3` on the machine.
- Nothing else. No accounts, no deploy, no API keys. This is a local repo.

## Interview

**Ask one question at a time and wait for the answer.** A wall of questions gets
a wall of half-answers, and the ontology is the part that makes everything else
work. Capture answers to `./start-agentic-project-build-notes.md` as you go, so a
different agent can resume this build without re-interviewing.

Echo the running plan back after every third answer.

**Q1. What is the deliverable, as an artifact?** Push until it is a thing with a
format and a destination. "Finish my thesis" is not a deliverable. "A 20-page
PDF submitted to the university portal" is. If they cannot name it, that is the
finding, and the first next action becomes finding out.

**Q2. What is the deadline, and is it real or self-imposed?**

**Q3. Does anyone need to see this before it is finished, and how long do they
need?** This is the question that changes plans. A supervisor who wants a draft
two weeks early moves the real deadline two weeks earlier, and almost nobody has
done that subtraction. Ask it even when Q2 sounded confident.

**Q4. Is there a decision that has to be made before the work can even start?**
If yes, that date comes before both of the above and is probably the binding one.

**Q5. What does GOOD look like, specifically?**

**Q6. What would make this a failure even if you delivered it on time?** People
find this far easier than defining quality, and the answer is more useful. Do not
skip it because Q5 got a good answer.

**Q7. Is there a rule about how this has to be produced that you would rather not
have to mention?** Ask it in words close to these. This is the constraint that
embarrasses people: an institution's position on AI assistance, an NDA, a
licence, a co-author who must not be surprised. It is usually load-bearing and
almost always unsaid. Stated, it shapes the plan and often shrinks the work.
Unstated, it derails the project late, when there is no time left to absorb it.

**Q8. What is out of scope?** So the agent stops proposing it.

**Q9. What already exists, and where?** Drafts, PDFs, transcripts, email threads,
a folder on a dead laptop. All of it is context.

**Q10. Who else is involved, how do you reach them, and what is their lead time?**

**Q11. What is genuinely undecided, and by when does it have to be decided?**

**Q12. Where should the repo live, and what should it be called?**

### Never harden a hedge

If an answer contains "I think", "probably", "pretty sure", or "around", it is
not a fact and must not be written as one. Write `UNKNOWN` in the file and make
confirming it a next action with a name attached to it.

A plan resting on a date nobody checked is worse than one that admits it does not
know, because it looks finished. This rule outranks the operator's own impatience:
if they say "just put October", write UNKNOWN and tell them why in one sentence.

## Common scenarios

When the operator names one of these, confirm the profile and short-circuit the
questions it already answers.

- **A thesis or dissertation.** Verbs: `add-source`, `annotate`, `draft-claim`,
  `project-deliverable`. Assume a supervisor exists and ask Q3 hard. Assume the
  institution has a position on AI assistance and ask Q7 without hedging. The
  deliverable is a document with a word count and a submission portal.
- **Taxes or a filing.** Verbs: `add-document`, `check-completeness`, `file-item`.
  The deadline is real and external. Completeness matters more than quality; the
  failure mode in Q6 is almost always a missing document, not a bad one.
- **A book.** Verbs: `add-beat`, `draft-chapter`, `read-back`, `publish`. The
  deadline is usually self-imposed, which makes Q3 (who reads it first) the only
  real date in the project.
- **A separation, dissolution, or negotiation.** Verbs: `log-communication`,
  `track-obligation`, `check-deadline`. Every date is real and most are somebody
  else's. Q10 is the important one, and the record matters as much as the outcome.
- **A launch or a move.** Verbs: `add-asset`, `check-blockers`, `dry-run`. Many
  small dependencies with one fixed date; the binding date is usually a supplier's
  lead time, not the launch itself.

## Steps

Run these yourself. Show the operator the output of each before moving on.

**1. Clone the template and stand up the repo.**

```bash
TAG=v2026-07-29.5
SLUG=<from Q12>
git clone --depth 1 --branch "$TAG" \
  https://github.com/SupersuitUp/agentic-project-template.git /tmp/apt-$$
cp -R /tmp/apt-$$/template ~/projects/$SLUG
rm -rf /tmp/apt-$$
cd ~/projects/$SLUG && git init && git add -A \
  && git commit -qm "init: <project> as an agentic project"
python3 check.py
```

Success: `check.py` prints its template version on line one, reports zero of
everything, and exits non-zero. That failure is correct and expected.

**2. Write `PROJECT.md` from the interview.** You write it, not them. Fill the
milestones table with every date from Q2, Q3 and Q4 in `YYYY-MM-DD`, each marked
real or self-imposed. Put the Q7 constraint in, in plain words. Put the Q6 answer
in, because that is the section that makes delegated work come back right.

**3. Write `STATE.md`.** Phase, the ONE next action, what is blocked, what is
unknown. Keep it thin: anything countable is counted by `check.py`, never typed.
The next action must be small enough for one sitting. If it is big enough for the
operator to refuse it, it has failed at its only job.

**4. Choose the verbs and write them.** The template ships `interview`, `resume`,
`add-source`, `draft-claim` and `log-decision`. Add one skill per project-specific
verb from the scenario profile or from what the interview revealed. A verb earns
its place when the operator has done the same thing twice by hand.

**5. Run `check.py` until it is quiet.**

```bash
python3 check.py
```

It names every section still unwritten, so it is the to-do list, not a gate to
argue with. Fix what the interview covered. For anything only the operator can
answer, leave `UNKNOWN` and make it a next action rather than inventing a value.
Success: exit 0.

**6. Ingest everything that already exists.** Everything from Q9 goes into
`sources/` now, before any project work starts. One folder per source with the
raw file. The rule: if it took effort to find, it goes in the repo. Not because
they will read it again, but so they never again wonder whether they have it.

**7. Wire the supervisor and prove resumability.** This is the gate, and it is the
step most likely to be skipped by whoever runs this recipe, including its author.

Start a genuinely fresh session with no context but the repo and type `resume`.
Confirm it answers all three:

1. What is the state of this project?
2. What is the single next action?
3. Are we still going to make the deadline?

If it cannot answer all three from files alone, the state machine is incomplete.
Fix it now, while it is cheap. A scaffold that fails this is a folder.

**8. Commit and report.** Commit everything, then tell the operator three things
and stop: the one next action, the date that actually binds, and anything you had
to leave UNKNOWN with the question that would resolve it.

## Output

- Project repo: `~/projects/<slug>`
- The ontology: `~/projects/<slug>/PROJECT.md`
- The state machine: `~/projects/<slug>/STATE.md` + `check.py`
- Working notes: `./start-agentic-project-build-notes.md`

## Verification

Every one of these must pass before you declare the generation complete.

```bash
cd ~/projects/<slug>
python3 check.py                     # must exit 0
echo "exit: $?"
git log --oneline | head -3          # must show real commits
grep -c "UNKNOWN" STATE.md           # nonzero is FINE and often correct
```

Then the one that actually matters, which no command can run for you: a cold
session answered the three questions above without being re-explained anything.

Fail loud. If `check.py` does not exit 0, say so plainly and name what is missing
rather than reporting success with a caveat.

## Idempotency

**Refuse to clobber.** If `~/projects/<slug>` already exists, halt and ask whether
the operator wants a sibling project at a new name or has genuinely finished with
the old one. Never overwrite an existing project repo: it holds the only copy of
their annotations.

Re-running against a fresh slug is safe and is how you start a second project.

## When to NOT run this again

After the repo exists, this recipe is done and stays idle.

- To pick the project back up: `resume`, in the repo.
- To redo or extend the ontology: the `interview` skill, in the repo.
- To add a source, draft a claim, or record a decision: those verbs, in the repo.
- To start a genuinely different project: run this again with a new slug.

Do not re-run this to fix a half-filled `PROJECT.md`. That is what `interview` is
for, and re-running would clobber their sources.

## Pitfalls

Each of these has actually happened.

- **Handing back files instead of a repo.** The interview produces two files, and
  it is tempting to stop there. Two files in a chat window is a summary. Finish
  the job: clone, write, commit, verify.
- **Writing a date the operator hedged on.** See "Never harden a hedge". A
  confident wrong date is the most expensive thing this recipe can produce.
- **Naming a past date as the binding deadline.** `check.py` handles this now, and
  it is in the test suite because an earlier version got it wrong and reported a
  runway that had already expired.
- **Trusting a stale template.** `check.py` prints `TEMPLATE_VERSION` on line one.
  If you are reviewing or resuming a project repo, check that line before you
  trust anything you conclude. A cold review once spent an hour producing a
  confident, thorough, wrong report against a two-generations-old copy.
- **Skipping step 7.** Resumability is the entire point and it is the one step
  with no artifact to show for it, which is exactly why it gets skipped.

## Pairs with

- The template repo this recipe clones:
  [github.com/SupersuitUp/agentic-project-template](https://github.com/SupersuitUp/agentic-project-template)
- [`BOOMERANG.md`](https://github.com/SupersuitUp/agentic-project-template/blob/master/BOOMERANG.md),
  for when the person who can answer the interview is not the person at the
  keyboard. It runs the same questions through their own AI and returns the two
  files, which you then bring into step 2.
- The doctrine: [appliedai.wiki/concepts/agentic-project-management](https://appliedai.wiki/concepts/agentic-project-management)
