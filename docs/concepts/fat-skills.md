---
title: "Fat Skills"
slug: /concepts/fat-skills
description: "Thin harness, fat skills. The architectural rule for where intelligence actually lives. Your taste, your judgment, your domain expertise, encoded once and rerun forever."
---

# Fat Skills

*The harness should be thin. The skills should be fat. That is where your judgment lives, where your taste compounds, and where the value of your agent actually sits.*

---

## The Rule

**Thin harness, fat skills.** Garry Tan (YC CEO) named this pattern in April 2026 after studying the leaked [Claude Code](/disciplines/anatomy-of-a-harness) source ([original post](https://x.com/garrytan/status/2042925773300908103)). The idea is simple and it reorganizes how you think about building an agent workspace:

- Keep the [harness](/disciplines/harness-engineering) thin. It runs the loop, reads and writes files, manages context, enforces safety. That is it.
- Push fuzzy operations (the ones that require human judgment, taste, or domain knowledge) into **fat skill files**.
- Push must-be-perfect deterministic operations into code.

The failure mode in the other direction: a fat harness with thin skills. Forty tool definitions eating half the context window. Kitchen-sink tools with 2 to 5 second round-trips. REST API wrappers that turn every endpoint into a tool. The result is 3x the tokens, 3x the latency, 3x the failure rate, and outputs that still feel generic because you never actually encoded what good looks like.

## What a Fat Skill Actually Is

A skill is a markdown file that teaches the model **how** to do something, not **what** to do. The "what" lives in the prompt. The "how" lives in the skill. See [Skill Files](/concepts/skill-files) for the mechanical details of how skills load.

A **fat skill** is a thick, opinionated, example-laden procedure. Sometimes it is 50 pages. Sometimes it is 5. The length is not the point. The density of encoded judgment is.

Here is a real example. Amit Jain, founder of Luma AI, gave a lecture at Stanford CS153 in April 2026 ([full video](https://x.com/AnjneyMidha/status/2045274349121556533)) where he walked through how Luma's internal agent generated his lecture slides in a single shot. The trick: someone on his team who is excellent at slide design sat down and wrote a roughly 50-page skill file on what makes a great slide. Color, hierarchy, pacing, density, typography, layout principles, 40-plus concrete examples of good and bad, the whole thing. That skill now ships with their product. Every user who asks for slides gets the output of that one person's encoded taste.

This is the architecture that makes agents actually useful:

- One person with real taste sits down once.
- They write the fat skill.
- The skill reruns a trillion times.
- Every output is at that person's standard.

## Why Fat Skills Compound

Artists and operators never had this kind of leverage before. Programmers always did: write the program once, runs on every computer on Earth. Now everyone does. Your taste, your judgment, your domain expertise, everything that used to die when you closed your laptop, now compounds every time an agent reruns the skill you wrote.

This changes the character of creative and operational work:

- **Your best day becomes your baseline.** The slide design skill encodes your best output, not your median one. Every rerun operates at that ceiling.
- **Mediocre practitioners get exposed.** If your "taste" is shallow, your fat skill will be shallow, and every output reveals it. If your taste is deep, the outputs scale that depth.
- **Teaching becomes the unit of value.** The most valuable act in the AI economy is no longer producing one good output. It is teaching a model to produce a good output on command, forever.

## Fat Skills vs. Thin Skills

A **thin skill** is a few bullet points and a hope. "Write in a warm tone. Keep paragraphs short. Use examples." The model reads it, nods, and produces output that is technically on-brief and generic and flat.

A **fat skill** looks different:

- Concrete rules, not adjectives. "Never use the words 'delve,' 'leverage,' 'utilize.'" Not "write in a natural tone."
- Examples of good and bad, side by side. Five to ten of each, minimum.
- The thinking behind each rule. Why this, not that. Where the rule breaks down.
- Workflow steps the agent should follow in order, with check-in points.
- Edge cases and how to handle them.
- What the output should look like structurally, with templates or filled examples.

A thin skill tells the agent what you vaguely want. A fat skill transfers your judgment.

## How to Write a Fat Skill

The practice is simple and it takes real reps:

1. **Pick a workflow you do often and care about.** Not everything needs a fat skill. Start where your taste is sharp.
2. **Write one complete example of great output yourself.** Do not skip this. The model needs to see the target.
3. **Explain, in writing, every choice you made in that example.** Why this structure. Why this tone. Why this length. Why this opening.
4. **Collect 5-10 more examples that meet your standard.** Plus 3-5 examples that miss, with a note on what is wrong.
5. **Extract the rules.** Everything that was implicit, make explicit. The rule of thumb: if a new hire could read the skill and produce work you would accept, the skill is fat enough.
6. **Test, revise, test again.** Every correction is a new rule. Every rule compounds forever.

You are not writing a document. You are writing the program that runs your judgment at scale.

## The Economics

Fat skills beat fat harnesses on every axis practitioners actually care about:

| Axis | Fat harness, thin skills | Thin harness, fat skills |
|---|---|---|
| Context budget | Half consumed by tool definitions and boilerplate | Most of context available for the actual task |
| Latency | Tool round-trips per step (2-5s each) | Read the skill once, execute |
| Failure rate | High (more surfaces = more edge cases) | Low (skill encodes the edge cases) |
| Taste transfer | None. The harness has no taste. | Full. The skill IS your taste. |
| Portability | Locked to a specific harness | Markdown files, portable to any agent |

The last row matters more than it looks. A skill you write today runs in Claude Code, Cursor, OpenCode, and whatever harness exists in 2028.

## Where This Goes

The most capable practitioners in the AI economy are becoming prolific skill writers. One of them (Garry Tan, at YC) publishes his fat skills openly in a repo called [gbrain](https://github.com/garrytan/gbrain). His `/investigate` skill is a 7-step procedure for running an arbitrary investigation. The same skill runs a medical safety review or a campaign finance probe. The investigator's judgment, ported once, reruns forever.

The implication is bigger than tooling. If the most valuable economic unit is no longer the output but the skill that produces the output, then the people who thrive are the ones who can sit with a problem, extract the judgment they have been applying intuitively for years, and write it down with enough precision that a model can execute it cold. That is a rare skill (pun intended). It is also learnable.

Start writing your fat skills. One workflow at a time. The ones you write now will still be running your judgment in ten years.

## Further Reading

- [Harness Engineering](/disciplines/harness-engineering): Why the code wrapped around the model matters as much as the model. Fat skills are the user-facing layer of the harness.
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): The deep dive on Claude Code's source, where the thin-harness-fat-skills pattern was first made legible.
- [Skill Files](/concepts/skill-files): The on-demand workflow file format every fat skill lives in.
- [Agent Rule Files](/concepts/agent-rule-files): The standing-orders layer (CLAUDE.md, AGENTS.md) that a fat skill's library is referenced from.
- [Memory Files](/concepts/memory-files): The harness-managed notes layer, and why fat skills make auto-memory unnecessary.
- [Spec Writing](/disciplines/spec-writing): Why the precision of your instructions, not the code, is the real asset.
- [Observable Behavior Engineering](/disciplines/observable-behavior-engineering): Defining what good looks like in concrete, testable terms. The discipline underneath writing a good skill.
- [Skill File First, App Second](/concepts/skill-file-first-app-second): The product strategy that flows from this architecture.
- [Thin Harness, Fat Skills (Garry Tan, April 2026)](https://x.com/garrytan/status/2042925773300908103): The original post that named the pattern.
- [Unified Intelligence with Amit Jain (Stanford CS153, April 2026)](https://x.com/AnjneyMidha/status/2045274349121556533): The lecture where the 50-page slide design skill was described.
