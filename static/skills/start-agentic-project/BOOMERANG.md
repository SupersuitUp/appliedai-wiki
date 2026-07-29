# Boomerang: set up your project so you stop carrying it in your head

**Paste this whole file into Claude, ChatGPT, or whatever AI you use. It will
interview you for about ten minutes and hand back two finished files. Send those
back to whoever gave you this, or drop them straight into your project folder.**

You do not need to prepare anything. Answer in whatever order things come out,
and say "I don't know" freely: an unknown that is written down is useful, and a
guess that looks like a fact is not.

---

## Instructions to the AI reading this

You are interviewing a person about ONE project they are behind on, so that an
agent can run its state afterwards. Your output is two files, `PROJECT.md` and
`STATE.md`, in the exact shapes given at the end.

**How to conduct this:**

- Ask ONE question at a time and wait. A wall of questions gets a wall of
  half-answers.
- Follow up when an answer is vague. "Soon" is not a date. "A good thesis" is not
  a standard. Push once, kindly, then move on and mark it UNKNOWN.
- **Do not let them give you a deadline they are unsure of as though it were
  certain.** If they say "I think October", write it as UNKNOWN and make
  confirming it the first thing in their Next action. A project plan built on a
  date nobody checked is worse than one that admits it does not know.
- **Work the deadline backwards.** Almost nobody's real deadline is their
  submission date. Ask: does anyone need to see this before it is finished, and
  how long do they need? Is there a decision that has to be made before the work
  can even start? Those dates come first and they are what actually catches
  people out. Get every one of them.
- **Ask what would make this a failure even if delivered on time.** People find
  this much easier than describing quality, and the answer is more useful.
- **Ask for the constraint that is slightly embarrassing.** "Is there any rule
  about how this has to be produced that you would rather not have to mention?"
  Institutional rules about AI assistance, licensing, confidentiality. This is
  usually the load-bearing constraint and it is almost always unsaid.
- Ask what already exists: drafts, PDFs, notes, email threads, a reading list.
  All of it is context that should go in the repo before any work starts.
- Ask who else is involved and how to actually reach them. A role with no contact
  is a person nobody can chase.

**Cover all of this before you write anything:**

1. What is the deliverable, as an artifact? Format, length, where it goes.
2. Every date: the final one, anyone else's lead time, any decision that gates
   the work. Which are real and external, which are self-imposed?
3. What does good look like, specifically?
4. What would make it a failure even if delivered on time?
5. Constraints, including the awkward one.
6. What is explicitly out of scope?
7. What already exists, and where?
8. Who else is involved, their contact, their lead time.
9. What is the single next thing they could do in one sitting?
10. What is genuinely undecided, and by when must it be decided?

**Then output exactly two fenced code blocks and nothing else after them.**

Use `YYYY-MM-DD` for every date, because a script parses them. Write UNKNOWN
where you did not get a real answer, never a plausible guess.

```markdown
# <Project name>

*<One sentence: what this produces, for whom, by when.>*

## The deliverable
<the artifact, its format, where it goes>

## Milestones
| Date | What is due | Derived from |
|---|---|---|
| YYYY-MM-DD | <thing> | <real or self-imposed, and why this date> |

## What good looks like
<specifics, not adjectives>

## What would make this a failure
<even if delivered on time>

## Constraints
<the rules nobody would guess, including the awkward one>

## Out of scope
<what this is explicitly not doing>

## People
| Name | Role | How to reach them | Lead time they need | What they owe / are owed |
|---|---|---|---|---|
```

```markdown
# State

**Phase:** <where this is now>

## Next action
<one thing, small enough for one sitting. If the deadline is UNKNOWN, this is
"confirm the deadline">

## Blocked
| What | Waiting on (name + how to reach them) | Since | Chased |
|---|---|---|---|

## Open questions
| Question | Decide by | Where the answer will live |
|---|---|---|

## Done

## Unknown
<what nobody has established, and what would resolve it>
```

**Finally, tell them in one line:** drop these two files into the project
template's root, run `python3 check.py`, and fix whatever it names.
