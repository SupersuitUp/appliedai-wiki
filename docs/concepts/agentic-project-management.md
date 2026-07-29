---
title: "Agentic Project Management"
slug: /concepts/agentic-project-management
description: "Holding a project as a repo an agent can read: every piece of context in files, a resumable state machine, the project's verbs as skills, and a supervising subagent that answers what is next. Version control, source control and resumability stop being features to build and arrive for free."
image: "/img/comics/agentic-project-management.png"
---

# Agentic Project Management

*Holding a project as a repo an agent can read: every piece of context in files, a resumable state machine, the project's verbs as skills, and a supervising subagent whose only job is to answer what is next. Version control, source control and resumability stop being things to build and arrive for free.*

![Comic hero: three panels, the same man at the same desk. One, he sits with his head in both hands while loose paper, sticky notes and printed pages drift in a disordered cloud around him; his laptop is closed and dark and a wall calendar behind him has one date circled in red. Two, the drifting scraps stream down in an orderly line into a single large ruled ledger open on the desk, filing themselves; beside it the whole laptop is now a translucent glowing amber object and his hands rest open and empty. Three, he walks out through a doorway with his coat over his arm while the ledger stays open on the desk and, inside the still-glowing laptop, a small rounded figure holds up one card with a single task on it.](/img/comics/agentic-project-management.png)

---

## The trap this removes

A project you are behind on has a specific shape. The context lives in your head, in a folder, in an email thread, and in three chats. You cannot start because you do not know what the next step is, and finding out means sitting down and planning the whole thing.

So planning becomes the task. And planning is the most postponable task there is, because it produces nothing, takes hours, and generates more work at the end of it. The project stalls at the point where you would have to hold all of it at once.

**Agentic project management removes the requirement to hold it at once.** Not by planning better. By putting the state somewhere that is not your memory, and giving something else the job of reading it.

## What a project actually is

Two things, and most tools only model the first.

A project is a **body of context**: sources, drafts, decisions, correspondence, constraints, the reason you rejected an approach in March. And it is a **position in a process**: what is done, what is blocked and on whom, what is next.

A to-do list models the second and loses the first. A folder models the first and loses the second. Agentic project management holds both, in files, in one repo, where an agent can read them together.

## The four parts

**The ontology.** One file saying what the project IS: the deliverable named as an artifact, the deadline, what good looks like, and what would make it a failure even if delivered on time. That last section is the most useful and the least written, because it is easier to state than a definition of quality and much harder to argue with.

Agents cannot advance a project whose definition of success they have to guess. Most disappointing delegated work traces back to this file not existing.

**The state machine.** One file holding where things are now: phase, done, blocked and on whom, the single next action, days to the deadline. Markdown rather than a database, because an operator who cannot read their own project's state will not trust the agent maintaining it.

**The verbs.** The repeatable moves that leave the project further along, written as skills so they are callable. A research project ingests and annotates sources. A filing project collects documents and checks completeness. A separation logs communications and tracks obligations. The verbs are not generic; they are that project's process made executable.

**The supervisor.** A subagent whose entire job is the state machine. It reads, it answers what is next, it updates state after work happens, and it says out loud when a deadline has stopped being realistic. It deliberately does not do the work. It knows where the work is, which is a different job and a full one.

## Resumability is the whole test

There is exactly one gate, and it takes a minute.

**Close the session. Open a new one. Type `resume`.**

If the new session cannot pick the project up without you re-explaining anything, you have built a folder. If it can, you have built a project, and the cost of stopping has gone to zero.

That last part is the real prize. Projects do not usually die from difficulty. They die from the cost of context reload after two weeks away being higher than the appetite to pay it. When reload costs one command, a project can be picked up in the twenty minutes you actually have.

## What arrives for free

Once the project lives in a git repo, several things you would otherwise build, or more likely go without, are simply there.

**Version control on the argument, not only the prose.** You can see when a claim changed and what changed it.

**Source control in the literal sense.** Every input is stored beside the output it justifies. "Where did that number come from" is a `git log`, not an archaeology project.

**An audit trail nobody had to maintain.** The log of decisions and reasons is a byproduct of working, not a separate discipline.

**Cheap parallelism.** Branches. Try the aggressive version of the argument without endangering the safe one.

None of this is the reason to adopt the pattern, and all of it is why people keep it.

## Worked example: a thesis with a hard deadline

A student has a Bitcoin thesis due in October, a stalled draft, and a real fear that sitting down to plan it will eat a weekend and produce nothing.

**The repo holds everything.** Every paper, book transcript, podcast, and the white paper itself, each in `sources/<slug>/` with the raw file beside an `annotation.md`.

**The annotations are dictated, not typed.** For each source: what is in it, what is useful, what they disagree with, which part of the argument it serves. This is the step that decides the outcome. An agent handed fifty annotated sources will assemble something. An agent handed fifty PDFs will summarise, which is a different and much worse artifact.

**The argument lives as claims, not prose.** One file per claim: what is asserted, what it rests on, which sources support it, what would prove it wrong. The thesis document then becomes a [projection](/concepts/the-corpus-and-the-projection) of that corpus rather than a thing edited by hand. Add ten sources later and the deliverable regenerates instead of being re-argued.

**The next action is always one sitting long.** Not "work on the thesis". "Read chapter three and dictate the annotation." A next action the operator can refuse for being too big has failed at its only job.

**The constraint that embarrasses them is in the ontology.** The university penalises AI-assisted prose. So the repo's job ends at a complete, sourced, structured argument, and the final pass is typed by hand. Stated in `PROJECT.md`, that constraint shapes the plan instead of ambushing it. Unstated, it derails the project in week eight.

Note what did not happen: nobody sat down and planned the thesis. The plan accumulated as a side effect of ingesting and annotating.

## Where it applies beyond research

The pattern is indifferent to subject. It holds anywhere there is a deliverable, a deadline, and more context than fits in a head: a book, a tax filing, dissolving a business partnership, a house move, a hiring round, a launch.

The tax case is the clearest demonstration that this is not a knowledge-work trick. It is a year of documents, a fixed date, a specific definition of complete, and a set of verbs that do not change.

## How to start one

[`start-agentic-project`](pathname:///skills/start-agentic-project/SKILL.md) scaffolds the shape and, more importantly, runs the interview first. For someone who is not going to run a skill, the [boomerang](pathname:///skills/start-agentic-project/BOOMERANG.md) is a paste-in that conducts the same interview against whatever AI they already use and hands back a filled ontology and state file, so they start populated rather than staring at a folder of placeholders. The template is not the valuable part. The interview that produces the ontology is.

The [template itself](pathname:///skills/start-agentic-project/template/README.md) ships a `check.py` that asserts the project is actually in the state it claims: a directory is not a source, a touched file is not an annotation, a section still holding its own authoring instructions is not filled in, and a date that has already passed cannot be the thing that binds. It exits non-zero until those are true.

That check exists because the first three versions of it did not work. One counted filenames and reported a healthy project over an empty repo. One tested for exactly the bugs the previous review had found, which is a regression test wearing a health check's clothes. One could be defeated by deleting ten comment lines. **A checker you have not attacked is a checker you have not tested.**

Do not scaffold before you can state the deliverable, the deadline, and what would make it a failure. A repo built before those exist is a folder with extra steps.

## Related patterns, and how this differs

[Campaign Plugins](/concepts/campaign-plugins) is the same machinery pointed at relationships: skills as atomic actions, versioned files as state, layered on the permanent contact record. Reach for it when the project IS the outreach. Reach for this when the project produces an artifact.

[Knowledge Repo Design](/playbooks/knowledge-repo-design) is the shape to use when several projects share raw material, with one pantry and many product folders. A single agentic project is one product folder that grew its own state machine and verbs.

[Save Your Progress](/concepts/save-your-progress) is the session-level version of the same instinct. This is the project-level version, and it is what makes saving cheap enough to do often.

> A project does not fail because the work is hard. It fails because reloading the context costs more than the appetite you have that evening.

## Further Reading

- [The Corpus and the Projection](/concepts/the-corpus-and-the-projection) on why the deliverable should be regenerable rather than precious.
- [Campaign Plugins](/concepts/campaign-plugins) on the relationship-driven sibling of this pattern.
- [Knowledge Repo Design](/playbooks/knowledge-repo-design) on the monorepo shape for shared raw material.
- [Save Your Progress](/concepts/save-your-progress) on routing a session's value into durable homes.
- [Memory Files](/concepts/memory-files) on what an agent should carry between sessions.
