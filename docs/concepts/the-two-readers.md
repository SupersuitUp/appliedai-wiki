---
title: "The Two Readers"
slug: /concepts/the-two-readers
description: "Every artifact an agentic system writes has a reader, and it is either the next agent session or a person. They want opposite things, so audience is a separate axis from how much scrutiny the writing will survive, and it should be derived from where the file lives rather than decided sentence by sentence."
image: "/img/comics/the-two-readers.webp"
---

# The Two Readers

*Every artifact an agentic system writes has a reader, and there are only two: the next session, or a person. They want opposite things. So **audience** is a separate axis from how much scrutiny the writing will survive, and it should be derived from where the file lives rather than decided sentence by sentence.*

![Three panels in a warm study at golden hour, the same woman in each: early thirties, short natural hair, rust knit sweater, at a wooden desk beside a glowing amber laptop whose screen faces her and holds the agents inside it. One: she offers a single handsome page of flowing handwritten script into the laptop, and the Chief of Agents, a small rounded figure in a gold military cap, reaches up with both hands to take it. Two: the Chief stands holding that same page with its script faded to faint empty lines it cannot read, a question mark of amber light above its cap, while she has turned away to the window with her mug and does not see it. Three: she holds the handsome flowing page toward herself in one hand and slides a second, plain page of short flat ruled lines into the laptop with the other; the Chief holds that plain page open and gestures to two smaller sub-agents already at work beside it.](/img/comics/the-two-readers.webp)

---

## The axis that goes missing

Systems that check their own writing almost always check one thing: how careful to be. A note to yourself, a working document, something a stranger can quote back at you. Call it the **surface**, and rank it by scrutiny.

Surface is real and it is not the whole question. It describes how exposed the writing is. It says nothing about who is on the other side, and the two are independent:

| | Surface | Audience |
|---|---|---|
| A project's state file | internal | agent |
| A message to a client | public | human |
| A published [skill file](/concepts/skill-files) | public | **agent** |

That third row is the proof the axes are separate. It is held to the highest standard there is, and no person will ever read it for pleasure. Collapse audience into surface and it has nowhere to sit.

## Writing up to a machine is the failure that actually happens

Writing down to a person is the obvious failure mode and it is rarely the one that occurs. The one that occurs is the reverse: putting warmth, argument, and persuasion into a file whose only reader cannot be warmed, argued with, or persuaded.

The reader in question has no memory of the conversation that produced the file. It does not know what day it is. It cannot ask a follow-up question, and it will not know when it has misunderstood. Against that reader, four things are not stylistic preferences:

- **A word anchored to the moment of writing.** *Today*, *currently*, *this week*. True for a few hours, wrong forever after, and nothing in the sentence tells the reader which one it is holding.
- **A pointer back into the conversation.** *As we discussed*, *the thing you mentioned*. The reader was not there and will either guess or skip the line.
- **A next action that names no action.** *Continue*, *follow up*, *finish up*. Usually the one field the file exists to carry.
- **Mood.** How the session felt is not resumable, and it displaces the state that is. A session that felt great and moved nothing reads identically to one that did not.

None of these survive contact with the reader, and all of them are what good prose habits produce when nobody has said who is reading.

## Some rules invert, which is how you know the axis is real

If audience were only a relabelling of surface, the same rules would apply everywhere at different strengths. They do not. At least two reverse sign completely.

**Restating context.** Padding in an essay, because the reader was there for the first half. In a file for the next session the reader was not there at all, so restating is the courtesy the file exists to perform.

**Narrating what you tried.** Amateurish in published prose, where a finished piece should not read as a changelog of itself. In a file for the next session, *"I tried this and it deadlocked"* is the single most valuable line available, because it is the one thing that cannot be rediscovered without spending the same hour again.

An editor who tidies both out of a state file has made it prettier and more expensive. This is not a hypothetical: they are exactly the sentences a competent writer removes first, and they are removed by the same instinct that makes the rest of the writing good.

## Derive the audience, never ask for it

The tempting design is a declaration: each file says who it is for, or the agent decides before writing. Both fail the same way. A rule that asks an agent to classify its own writing first fires only when the agent remembers, and "the agent remembers" is the fix shape that [self-improving systems](/concepts/self-improving-systems) exist to replace.

The path already carries the answer. Nothing writes a state file for a human reader, and nothing writes into a documents folder for a machine. So the map from path to audience lives in one place and every checker, hook, and skill reads it instead of holding an opinion.

Two properties make that map safe to trust:

**Unrecognised is a real answer, and it is returned.** A path the map does not know gets no audience rules at all rather than a guessed one. A checker that guesses will eventually scold an operator about a file it has never heard of, and the first time that happens the whole thing gets turned off, taking the useful findings with it.

**The refusal names which axis fired.** The ways past a surface problem and an audience problem are different: lowering the surface does nothing about the fact that the next session still cannot tell what day *today* was. A gate that reports a generic failure teaches people to route around it.

## Where the two readers already live side by side

The clearest existing instance is a [hyperdocumented skill](/concepts/hyperdocumented-skills): `SKILL.md`, the instructions an agent executes, shipped beside the [hyperdocumented SOP](/concepts/hyperdocumented-sop) a human reviews, changing in the same commit. That pairing is usually explained as documentation discipline. It is better explained as this: one procedure, two readers, two artifacts, because one artifact cannot serve both.

The same shape shows up wherever an agentic system has matured. A documentation site with a machine tree and a plain-language mirror. A [memory file](/concepts/memory-files) beside the report generated from it. A [corpus and its projections](/concepts/the-corpus-and-the-projection). In every case the split was discovered by the specific pain of one artifact failing one of its readers, and in every case the general rule was available the whole time.

## What it costs, said plainly

A state file written for the next session reads worse. It is terser, it drops the warmth, it puts a date on everything, and it keeps the dead ends. Somebody reviewing it will think the writing got lazy.

It reads worse and it resumes better, and resuming is the entire function of the file. That trade is worth naming out loud, because the pressure to undo it comes from good taste rather than from carelessness, and good taste is much harder to argue with.

## Further Reading

- [Hyperdocumented Skills](/concepts/hyperdocumented-skills) on the worked instance: one procedure, two artifacts, two readers.
- [Project Resumability](/concepts/project-resumability) on the property the agent-facing register exists to protect.
- [The Session Save](/concepts/the-session-save) on the moment the register gets decided, and usually skipped.
- [Compounding Docs](/concepts/compounding-docs) on why what you write for the machine pays you back.
- [Agent Rule Files](/concepts/agent-rule-files) on files whose only reader is an agent, and what that does to how they are written.
