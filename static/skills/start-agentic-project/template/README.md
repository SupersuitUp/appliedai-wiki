# <PROJECT NAME>

An **agentic project**: a repo that holds every piece of context this project has,
plus a state machine an agent reads to tell you what is next.

Pattern: https://appliedai.wiki/concepts/agentic-project-management

## Everything here is a template until you replace it

Every file ships with placeholder prose. **It is all meant to be overwritten.**
Nothing in this repo is example data pretending to be your project, on purpose:
a seeded example drifts out of sync with itself and then teaches you to distrust
the one file the pattern depends on.

Do this in order:

1. **Open this folder in Claude Code and run `interview`.** It asks you questions
   for about ten minutes and writes `PROJECT.md` and `STATE.md` for you, so you
   never sit in front of a blank ontology. That blank page is the single most
   common reason this gets abandoned on day one.
   *No Claude Code?* Use `BOOMERANG.md` from the template repo instead. Same
   interview, run through whatever AI you already have open, and it hands the two
   files back to you.
2. **Run `python3 check.py`** and keep going until it is quiet. It names every
   section still unwritten, so it is the to-do list.
3. **Everything you already have, into `sources/`**, before starting any work.

## Using it

In your terminal:

    python3 check.py        what is actually here, and which date really binds

In Claude Code (these are agent skills, not shell commands):

    interview               FIRST, on a fresh copy: fills PROJECT.md and STATE.md
    resume                  pick the project up cold and get one next action
    resume --full           the fuller picture: everything blocked, all open questions
    add-source              ingest and annotate something
    draft-claim             turn what you have concluded into a claim file
    log-decision            record a choice and why

`check.py` is the honest one. It counts sources, annotations, claims and drafts
from the filesystem, reads every date out of `PROJECT.md`, and tells you which
one actually binds. Run it before you trust `STATE.md`.

## Commit as you go

Nothing here commits for you, and `resume` reads `git log` to tell you what
happened last. After any session that changed something:

    git add -A && git commit -m "what changed"

An agentic project that is never committed has thrown away the version control
that was most of the reason to use a repo.

## Keep it private if the sources are

You are about to put every PDF, transcript and export you have into `sources/`.
Some of that is licensed, personal, or under an NDA. `.gitignore` ships with a
commented block for excluding raw material while keeping annotations. Decide
this on day one, not after the first push.

## The test that matters

Close the session. Open a new one. Type `resume`.

If it picks the project up without you re-explaining anything, this works. If it
does not, fix that before doing any project work: everything else depends on it.
