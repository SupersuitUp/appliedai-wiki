---
title: "Use AI To Hunt For The Right Solution"
slug: /engagement-patterns/use-ai-to-hunt-for-the-right-solution
description: "Almost every tool you need already exists. The use case is using your agent to write a tight requirements spec from your operational reality, then hunting the catalog like a recruiter hunts a candidate, instead of low-coding a brittle custom workflow."
---

# Use AI To Hunt For The Right Solution

*Almost every tool you need already exists. The use case is having your agent interview you into a sharp requirements spec, then helping you find the existing CLI, binary, web app, agent, or harness skill that already solves your problem. Building should be the rare exception, not the reflex.*

---

## The claim, plainly

When a workflow gap shows up, most professionals reach for a low-code platform and start assembling. Sometimes it is a no-code app builder. Sometimes it is a custom Zapier rats-nest. Sometimes it is a half-baked CLI script. The pattern is the same: skip the search, jump to construction, ship something brittle, maintain it forever.

This was a defensible move three years ago, when the tool catalog was smaller and AI could not help you find the long tail. It is not defensible now. The catalog has exploded. Most workflow gaps a professional runs into in 2026 are already covered by an existing CLI tool, downloadable binary, web app, agent, or harness skill. Often by several of them. The job is not to build the thing. The job is to find the right one.

Your agent is the discriminator. Without it, the search is too noisy and the spec is too vague. With it, you can write a real requirements spec from your operational reality in 15 minutes, screen candidates against that spec at speed, and stop confusing motion with progress. **Assume the solution exists. Spec out exactly what you need. Then go hunting for it like a recruiter hunts a candidate.** Build only when solution hunting has genuinely failed.

---

## Why building is almost always the wrong move

Three reasons to default to finding, not building.

**The maintenance tax compounds.** Every low-code workflow you assemble is a thing you will maintain for the rest of its life. The platform changes its UI. An integration breaks. A schema drifts. A vendor sunsets. Your custom thing becomes a liability that takes time away from the work you actually care about. An existing, actively maintained tool externalizes that tax to its maintainers.

**Custom usually means worse.** The product team that ships a focused tool has spent years thinking about the edge cases you have not encountered yet. Your weekend build covers the happy path and breaks on the third real user. By the time you have closed the gaps, you have rebuilt the existing tool and ended up with a worse version of it.

**You are scaling slop.** Every premature build is one more brittle artifact in your operational reality. Multiply that by every practitioner doing the same thing and the field drowns in custom workflows that nobody can extend, audit, or hand off. The principle applies to your own toolchain, not just your client's: see [Don't Scale Slop](/playbooks/dont-scale-slop).

There are real exceptions. We will cover them at the end. But the exception bar is high, and most builds people justify do not clear it.

---

## The solution-hunt spec

If solution hunting is the discipline, the artifact is **the solution-hunt spec**. Think of it the way a recruiter thinks of a job description. The job description is not the candidate. The job description is what makes finding the right candidate possible. Without it, you screen on vibes, get sold on the wrong fit, and waste weeks discovering the misalignment.

A solution-hunt spec sits between [spec writing](/disciplines/spec-writing) and the actual search. It is shorter than a product spec. It does not describe the system you are going to build. It describes the system you are going to find.

A good solution-hunt spec has six sections:

1. **The job.** One paragraph. What problem are you solving and for whom? Who uses this tool, in what moment, to do what?
2. **Must-haves.** The non-negotiables. If a candidate tool fails any of these, it is out. Be ruthless. Long must-have lists shrink your candidate pool to zero.
3. **Nice-to-haves.** The features that would make a good candidate a great one. These are tiebreakers, not screens.
4. **Operational reality.** What does your existing system look like, and what does the new tool need to fit into? Filesystem layout, naming conventions, the harnesses you already use, the formats your other tools speak, where the data lives, who the human collaborators are. (More on this below.)
5. **Form factor preferences.** CLI, downloadable binary, web app, hosted SaaS, agent, harness skill, browser extension. Some practitioners have strong preferences here for sovereignty or speed reasons. Name them.
6. **Anti-patterns.** Tools you have already tried and rejected, with one line each on why. Saves your team from suggesting the things you already eliminated.

Two pages, max. If your solution-hunt spec is longer than two pages, you are probably trying to find something that does not exist as a single tool, and you should split it into two specs for two tools.

---

## Operational reality is the section people skip

The single most-skipped section is operational reality, and it is also the one that determines whether the tool you find will actually survive contact with your stack.

A tool that ignores your existing systems will force you to change your workflows around it. That sounds tolerable in the abstract. In practice it is corrosive. Workflows are not just human preferences. They are constrained by hardware, by where your files live, by the formats other tools in your stack consume, by the muscle memory you have built over years. Every workflow change you take on to accommodate a new tool is a hidden cost the tool's marketing page does not warn you about.

Document the reality before the hunt:

- **Hardware constraints.** Does this run on your laptop, your iPad, your phone, a server, all of the above? Are you offline-first or always-online? Which OS?
- **Existing harness.** Which coding agent or terminal harness are you running? What does the new tool need to live alongside?
- **File and folder conventions.** Where does the data live now? What naming conventions are you locked into?
- **Adjacent tools.** What does the new tool need to read from, write to, or hand off to? What formats do those tools speak?
- **Human collaborators.** Who else touches this workflow? What are their tool preferences and skill levels?
- **Where you cannot change.** Hardware you are stuck with for years. Vendor lock-in you have already accepted. Data you cannot move.

The goal is to give a candidate tool the best possible chance of slotting into your existing world without forcing you to rebuild everything around it. The closer the fit, the less retraining, the less migration, the less workflow risk.

---

## The agent interview for your solution-hunt spec

Most practitioners do not have a clean spec in their head. They have a vague sense that something is missing, and a hunch about what would help. The fastest way to convert that hunch into a real spec is to have your agent interview you.

Below is a paste-able prompt. Drop it into your agent with no edits. It follows the [Interview Prompts](/disciplines/interview-prompts) pattern: it infers what it can from your operational reality, then asks you only the questions it cannot answer on its own.

```
I want to write a solution-hunt spec. I think I need a new tool to do
something, but before I go searching (or worse, building), I want
to spec out exactly what I am looking for so my team can sanity
check it and so I have a real screen to evaluate candidates against.

The spec has six sections:

1. The job (one paragraph: problem, user, moment of use)
2. Must-haves (non-negotiables)
3. Nice-to-haves (tiebreakers)
4. Operational reality (existing systems the tool must fit into)
5. Form factor preferences (CLI, binary, web app, agent, etc.)
6. Anti-patterns (tools I already tried and rejected)

Before you ask me anything, infer what you can:

- Read my CLAUDE.md, AGENTS.md, or user profile to understand my
  existing harness, file conventions, hardware, and adjacent tools.
- Check recent transcripts and meeting notes for any earlier
  discussion of this tool gap.
- Look at the relevant project workspace to see what already lives
  there.

Then briefly tell me what you inferred and what is still missing.

After that, interview me one question at a time. Spend the most
time on:

- The job paragraph (push for specificity: who, when, what
  triggers the use, what success looks like)
- Must-haves vs nice-to-haves (challenge me on every must-have:
  is this really a screen, or is it a tiebreaker in disguise?)
- Operational reality (probe hardware, existing harness, file
  layout, adjacent tools, human collaborators, anything I am
  locked into)

When the spec feels complete, draft it as a two-page markdown
document with the six sections. Show me the draft.

After I review the draft, suggest 5 to 10 places I could go
hunting for candidates: specific CLI tool registries, agent
catalogs, awesome-lists, communities, GitHub topic searches.
Do not suggest tools yet, just hunting grounds.
```

The output is a draft spec your agent produced from your operational reality plus a 15 minute conversation. That is the artifact you take to your team.

---

## Get team feedback before you go hunting

The spec is not done when you and your agent finish it. The spec is done when at least one other person on your team has read it and tried to break it.

The reason is the same reason a job description benefits from a hiring manager review: the writer knows what they want and is therefore the worst person to spot what they left out. Your team will catch:

- Must-haves that should be nice-to-haves (and vice versa)
- Operational reality you take for granted but they do not
- Tools they have already used that solve the same problem
- Constraints you forgot because they are obvious to you

Standard flow:

1. Move the draft into a shared document. Google Docs, Notion, whatever your team lives in.
2. Tag the people whose work touches this workflow. Tag the person who is most likely to inherit the maintenance.
3. Ask for two specific things in the comment thread: *"Which must-haves are not actually screens?"* and *"What candidate tools should I look at first?"*
4. Revise the spec from the comments. Keep the comment thread visible so the trail is preserved.
5. Only then, start solution hunting.

This step takes a day. It saves weeks. Practitioners who skip it routinely buy or build the wrong thing.

---

## When building is actually the right move

The bar for building should be high. The bar is not zero. Build when at least one of these is genuinely true:

- **Solution hunting has been thorough and turned up nothing.** "Thorough" means you have searched the obvious catalogs, asked your community, and posted the spec publicly to invite suggestions. Not a 20 minute Google session.
- **All candidates fail a hard must-have, and the must-have cannot be relaxed.** Sovereignty constraints, regulatory constraints, hardware constraints. Not "it is missing my favorite color theme."
- **The composition of existing tools is the build.** Sometimes the right answer is gluing two existing tools together with a thin script. That is closer to a configuration than a build, and it is fine. The anti-pattern is reimplementing what one of the tools already does.
- **The build is small enough to be its own well-scoped tool.** If your build can itself be packaged as a CLI tool, a harness skill, a small web app that other practitioners could fork, you are not adding to the slop. You are adding to the catalog.

If you are building, write a real product spec, not a solution-hunt spec. See [spec writing](/disciplines/spec-writing) for the discipline. The same logic applies, with more rigor, because now you own the thing forever.

---

## The bottom line

1. **Default to solution hunting, not building.** The reflex to build is the mistake. The catalog is enormous and growing.
2. **Write a solution-hunt spec.** Six sections. Two pages max.
3. **Spend real time on operational reality.** Workflows are bound by hardware and adjacent tools, not just preferences. A solution that ignores your reality will force expensive workflow changes.
4. **Use your agent to interview you into the spec.** Paste the prompt above. Talk for 15 minutes. Get a draft.
5. **Run the spec by your team before you start hunting.** Google Doc, two specific questions, one day of feedback.
6. **Hunt like a recruiter.** Treat candidate solutions the way a hiring manager treats candidate engineers: screen on the must-haves, weigh on the nice-to-haves, check the operational fit, prefer maintained over clever.
7. **Build only when solution hunting genuinely fails.** And when you do, write a real product spec and treat the build as a solution you might one day open-source for the next person.

The world has plenty of capable execution. The scarce resource is practitioners who can describe what they need with enough precision that the right solution can be found, instead of invented.

---

## Further Reading

- [Spec Writing](/disciplines/spec-writing): the deeper case for why specs are the highest-leverage artifact in the AI era. The solution-hunt spec is a lighter-weight cousin.
- [Interview Prompts](/disciplines/interview-prompts): the pattern behind the agent interview prompt above. Useful any time you want your agent to extract requirements from you.
- [Don't Scale Slop](/playbooks/dont-scale-slop): the principle applied to client work. The same logic applies to your own personal stack.
