---
title: "Agents Read READMEs"
slug: /perspectives/agents-read-readmes
description: "Keep agent rule files thin and push the substance into a genuinely good README the rule file points at. Agents read READMEs the way capable developers do."
image: "/img/comics/agents-read-readmes.png"
---

# Agents Read READMEs

*Keep the agent rule files thin. Put the substance in a genuinely good README and tell the rule file to read it. A capable developer reads the README before touching the code, and so does the agent.*

![Three-panel cream-paper comic titled AGENTS READ READMEs. Panel 1: Midas in his bulky navy-and-orange Supersuit half-buried under an avalanche of loose papers stamped CLAUDE.md, caption "The rule file swells. The substance rots inside it." Panel 2: Midas standing tall holding a small card reading READ THE README FIRST, an orange arrow pointing to a thick bound book stamped README on a pedestal, caption "Keep the rules thin. Point them at the README." Panel 3: the holographic Chief of Agents with his gold comms crown and LEAD LLM-COMMS LAYER chest band in the navy cyber-cathedral, reading a glowing README checklist (Purpose, Installation, Usage, Examples, Guidance, Gotchas) and beaming out OUTPUT ORIENTED SHIPPING, caption "The agent reads it like a sharp new hire and ships." Footer bar: "Write it for the new hire. The agent reads over their shoulder."](/img/comics/agents-read-readmes.png)

---

## The instinct that bloats the rule file

When an agent gets something wrong, the reflex is to add another line to [`CLAUDE.md` or `AGENTS.md`](/concepts/agent-rule-files). Do that enough times and the rule file swells into a 400-line briefing nobody can read, half of it explanatory prose that has nothing to do with standing orders.

There is a cleaner split. Keep the rule file short: standing orders, hard constraints, and pointers. Put the actual substance (what this project is, how to run it, where things live, the conventions, the gotchas) in the README. Then make the rule file's first instruction the cheapest one to write: **read the README before you do anything.**

Treat the agent like what it is. A capable developer joining a codebase does not get handed a list of 400 rules. They read the README, get oriented, and start contributing. The agent works the same way. Give it the same on-ramp you would give a sharp new hire, because it reads it the same way.

## A README is dual-audience; a rule file is not

A rule file is single-audience: the agent reads it, the human almost never does. A README is dual-audience. The human contributor reads it on day one and the agent reads it on every session. That overlap is the whole argument.

When the substance lives in the README, one document serves both readers and stays current because the humans depend on it too. When the substance lives in the rule file, it rots: the humans never open it, so nobody notices when it drifts, and the agent inherits the drift on every run.

This is also a single-source-of-truth move. The pointer pattern already keeps `CLAUDE.md` as a one-line redirect to `AGENTS.md`. Extend the same discipline one layer out: the rule file holds the rules, the README holds the explanation, and neither one duplicates the other. The agent loads the thin rule file first, follows the pointer, and arrives at the same oriented state a human contributor would.

## What goes where

The split is clean once you name what each file is for.

**Agent rule file** (`AGENTS.md` / `CLAUDE.md`): standing orders the agent must obey every session. Imperative, short, durable. "Never use em dashes." "Run the build before committing." "Read the README at the repo root before starting." Constraints and pointers, not tutorials.

**README**: the substance a contributor needs to be productive. What the project is and why it exists. How to install, run, test, and deploy it. The map of where things live. The conventions that are not obvious from the code. The known gotchas that would otherwise cost an afternoon. Everything you would want a competent new developer to read before their first commit.

If a line is a rule the agent must always follow, it belongs in the rule file. If a line explains how the thing works, it belongs in the README. When you catch yourself writing a paragraph of explanation into `AGENTS.md`, that paragraph is a README section wearing the wrong hat.

## The leverage only shows up if the README is good

The catch is that the agent inherits whatever quality the README actually has. A thin rule file pointed at a bad README is worse than a fat rule file, because now the orientation step lands on noise. The payoff requires the README to be genuinely good, and "good for the agent" is the same standard as "good for a human developer":

- **It is current.** A README that describes a setup three refactors out of date actively misleads. The agent treats it as truth and proceeds confidently in the wrong direction. Stale docs are worse than no docs.
- **It is runnable.** The commands in it actually work, copy-pasted, from a clean checkout. If the human cannot follow them, the agent cannot either.
- **It is mapped.** It says where things live, so the agent does not have to rediscover the file layout by [exploration](/concepts/agentic-exploration) every session.
- **It is specific.** It captures the non-obvious conventions and the real gotchas, the things that are true about this project and documented nowhere else. Generic boilerplate adds nothing for either reader.

This is the [compounding docs](/concepts/compounding-docs) flywheel pointed at the one document a human contributor was already going to read. Every correction you would have buried in the rule file becomes a README improvement that makes the project better for the next human and the next session at the same time.

## For practitioners

When you set up an agent workspace, write the rule file thin on purpose and invest the time in the README. Most clients have a README that is either empty or a stale stub from the day the repo was created. Fixing it is high-leverage work that pays off in two directions: the agent gets a real on-ramp, and the client's human team gets the onboarding doc they never wrote.

The test for whether you have the split right: hand the repo to a competent developer who has never seen it, point them at the README, and watch whether they can get oriented and productive without asking you anything. If they can, the agent can. If they cannot, the README is the thing to fix, and no amount of additional rule-file lines will cover for it.

---

> Write the README for a sharp new hire. The agent is reading over their shoulder, every single session.

---

## Further Reading

- [Agent Rule Files](/concepts/agent-rule-files) the thin layer this argument keeps thin: standing orders and pointers, not substance.
- [Compounding Docs](/concepts/compounding-docs) the flywheel a genuinely good README sits on.
- [Memory Files](/concepts/memory-files) the related failure mode: state that should live in a file you wrote, scattered into an opaque store instead.
- [Knowledge Repo Design](/playbooks/knowledge-repo-design) how to structure a repo so the README and the rule file both have an obvious home.
- [Context Engineering](/disciplines/context-engineering) the discipline of curating the exact information state that orients the agent.
- [Skill Files](/concepts/skill-files) where procedures go, so neither the rule file nor the README carries workflows it should not.
