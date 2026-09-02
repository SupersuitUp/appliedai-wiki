---
title: Hyperdocumented Skills
slug: /concepts/hyperdocumented-skills
description: "A skill that ships with its map. The instructions an agent executes and the hyperdocumented SOP a human reviews live side by side and change in the same commit, so a procedure nobody can check stops being possible."
image: "/img/comics/hyperdocumented-skills.webp"
---

# Hyperdocumented Skills

*A hyperdocumented skill is a skill that ships with its map: `SKILL.md`, the instructions an agent executes, beside `HDSOP.md`, the [hyperdocumented SOP](/concepts/hyperdocumented-sop) a human reviews. They change in the same commit, and the map changes first. Without it a skill is a procedure that only its author can evaluate, and only while they still remember writing it.*

![Three-panel warm editorial strip titled HYPERDOCUMENTED SKILLS. Panel 1: an operator sits at a glowing amber laptop; inside the screen the Chief of Agents holds a page headed SKILL, ten numbered steps drawn identically in amber, and the operator's hand rests open on the desk. Caption: A list of steps says nothing about which ones were judgment. Panel 2: the same list has gone cool blue and is running on its own, and the one remaining amber step is being drawn into the blue flow while the operator's hand stays open and empty, unnoticed. Caption: So the one that needed a human gets absorbed, quietly. Panel 3: a second page headed MAP is pinned beside the SKILL page, its steps colour-coded with a legend reading AGENT STEPS and HUMAN STEPS and a small branching diagram; the operator now holds the amber step in his own hand while the agent runs the blue ones inside the laptop. Caption: The map beside it makes the human steps visible again.](/img/comics/hyperdocumented-skills.webp)
---

## Instructions alone rot, and they rot quietly

A `SKILL.md` is written for an agent to follow. That is what makes it useful and it is also what makes it unreviewable: nothing in a list of steps says which of them were judgment calls and which were mechanical. Six months later nobody can tell the difference, including the person who wrote it.

So the next revision automates a step that needed a human, and nothing objects. The skill still runs. It still reports success. The only symptom is that a decision somebody used to make is now being made by a machine that was never told it was a decision.

The map is where that information lives. A [hyperdocumented SOP](/concepts/hyperdocumented-sop) is branch-explicit and actor-coloured on purpose: amber for the steps that must stay human, blue for the steps an agent holds. Put it beside the skill and the skill becomes checkable by someone who was not in the room.

## The two files, and why the order matters

| File | Written for | Answers |
|---|---|---|
| `SKILL.md` | the agent | how to do it, in the operator's own trigger words |
| `HDSOP.md` | a person | what it is for, when it fires, where it branches, what must stay human, and what is worth automating next |

**The map moves first.** Not because a rule says so, but because deciding a change against the map is what stops an edit from quietly absorbing a judgment call. Write the instructions first and you tend to encode the happy path; write the map first and the branches are on the page before you can drop them.

**They move together, and that half is enforceable.** A gate can prove a skill and its map changed in the same commit. It cannot honestly prove which came first, because rebases and squashes rewrite order, so "together" is the check and "first" is the authoring discipline.

## The section that pays for the whole practice

Every map ends with an honest pass at automation: what already runs on its own, the single strongest next candidate, and what must stay human and why.

That section is where you notice that a skill you built six months ago is now three quarters automatable, and which quarter must never be. Without it, a skill either stays exactly as manual as the day it was written or gets automated end to end by someone who could not see which parts were load-bearing.

## Where it sits in the family

The other three answer different questions, and this one is what makes them trustworthy:

- [Fat skills](/concepts/fat-skills) says where the intelligence lives: in the skill, not the harness.
- [Hyperlocal skills](/concepts/hyperlocal-skills) says where the file lives: in the repo it operates on.
- [Self-improving skills](/concepts/self-improving-skills) says it gets better every run.
- **Hyperdocumented skills** says it can be reviewed. A skill that improves itself every run and cannot be reviewed is a system drifting confidently.

## What it costs, honestly

A map is roughly a page, and writing one for a skill that already exists takes fifteen minutes because the questions are answerable from the code. The cost is real and it is paid once per skill.

The failure it buys out of is not hypothetical. A gate meant to hold this exact standard once reported green for about thirty releases while checking nothing, because it anchored its window to a tag that nothing created any more. Every skill changed in that span passed. The gate was believed, which is worse than not having one, and the miss surfaced only when a contributor updated a map that the maintainer's own tooling had failed to require.

**A skill with no map is a procedure nobody can check. A gate nobody has watched fail is a decoration.** Both are the same mistake: trusting a green light that was never wired to anything.

## Related

- [Hyperdocumented SOP](/concepts/hyperdocumented-sop), the map itself, and the standard it follows
- [Skill files](/concepts/skill-files) and [fat skills](/concepts/fat-skills)
- [Golden processes](/concepts/golden-processes): the human blessing that a map makes reviewable
- [Document and streamline load-bearing workflows](/perspectives/document-and-streamline-load-bearing-workflows)
