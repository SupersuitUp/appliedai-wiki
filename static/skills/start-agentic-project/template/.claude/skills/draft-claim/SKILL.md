---
name: draft-claim
description: Turn something you have concluded from the sources into a claim file. Use when an annotation has produced an actual position, or when the next action is "decide X". Delete this skill if the project does not argue anything.
---

# Draft a claim

The most ambitious idea in this template is that the deliverable is a PROJECTION
of the claims, not a document you hand-edit. That only works if claims exist, and
in testing a full working session produced zero of them, because every other verb
had a skill and this one did not.

So: whenever an annotation yields a position, write it down here.

1. Copy `claims/_example.md` to `claims/<short-id>.md`.
2. Fill it: the claim in ONE sentence that could be false, what it rests on, why
   it follows, which `sources/<slug>` support it, and what observation would show
   it is wrong.
3. **A claim with no source is an opinion.** Say so in the file rather than
   leaving the Sources line blank, so the gap is visible.
4. **`falsified by` must be an observation, not the claim restated in the
   negative.** "X is not true" is not falsifiable; "if I found Y in the 2019 data"
   is.
5. Update `STATE.md`: add to Done, revise Next action.

`check.py` rejects a claim file under 120 bytes as a stub.
