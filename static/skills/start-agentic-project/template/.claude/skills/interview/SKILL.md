---
name: interview
description: Fill in PROJECT.md and STATE.md by interviewing the person who owns this project. Run this FIRST, before any work, on a freshly cloned template. Use when check.py reports sections are unfilled, when someone says "set this up", "interview me", "fill this in", or when a repo has been cloned and nothing has been written yet.
---

# Interview

The ontology is the part that makes everything else work, and a blank
`PROJECT.md` is why people abandon this on day one. So do not ask them to fill in
a form. Interview them, and write the files yourself.

**One question at a time. Wait for the answer.** A wall of questions gets a wall
of half-answers.

## What you must come away with

1. **The deliverable as an artifact.** Format, length, where it goes. "Finish my
   thesis" is not a deliverable. "A 20-page PDF via the university portal" is.
2. **Every date, and which are real.** See below; this is the part people get
   wrong.
3. **What good looks like**, specifically.
4. **What would make it a failure even if delivered on time.** People find this
   far easier than describing quality, and the answer is more useful.
5. **Constraints, including the awkward one.**
6. **What is out of scope**, so you stop proposing it.
7. **What already exists** and where.
8. **Who else is involved**, their contact, and their lead time.
9. **The single next action**, small enough for one sitting.
10. **What is genuinely undecided**, and by when.

## Work the deadline BACKWARDS

Almost nobody's real deadline is their submission date. Ask:

- Does anyone need to see this before it is finished, and how long do they need?
- Is there a decision that has to be made before the work can even start?

Those dates come first and they are what actually catches people out. Put every
one in the Milestones table in `YYYY-MM-DD`, and mark each real or self-imposed.

**Never harden a hedge.** If they say "I think October", write UNKNOWN and make
confirming it the next action. A plan resting on a date nobody checked is worse
than one that admits it does not know.

## Ask for the constraint that embarrasses them

"Is there a rule about how this has to be produced that you would rather not have
to mention?" Institutional rules about AI assistance, licensing, an NDA. This is
usually the load-bearing constraint and it is almost always unsaid. Stated, it
shapes the plan. Unstated, it derails the project late.

## Then

Write `PROJECT.md` and `STATE.md` yourself. Do not hand them a template to fill.

Run `python3 check.py` and keep going until it is quiet. It will name anything
still unfilled, so it is the end of this conversation, not the start of a new one.

Finally, tell them the one next action and stop.

**If the project owner is not in the room** and you are setting this up on their
behalf, do not guess their answers. Send them `BOOMERANG.md` from the template
repo, which runs this same interview against whatever AI they already use and
returns the two files.
