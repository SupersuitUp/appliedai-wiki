---
title: "Agent Constellation"
slug: /concepts/agent-constellation
description: "Staffing an operation with many narrowly scoped, persistently named agents instead of one all-knowing assistant. Each one gets a job, its own tools, and its own workspace."
image: "/img/comics/agent-constellation.png"
---

# Agent Constellation

*Staffing an operation with many narrowly scoped, persistently named agents instead of one all-knowing assistant. Each one gets a job, its own tools, its own workspace, and its own coaching.*

![Three-panel comic strip with a chunky inked title bar reading AGENT CONSTELLATION. Panel one, labeled "1. ONE AGENT, EVERY JOB": inside the deep-navy cyber-cathedral, a single bare-headed luminous cyan holographic sub-agent is buried under an avalanche of glowing task cards labeled SALES, SUPPORT, CALENDAR, ANALYTICS, INVOICES, KIDS, HIRING, arms overloaded, three cards already cracked on the floor, his one desk piled with tangled cables and too many tools. Paper-tape caption: "One agent. Every job. Nothing done well." Panel two, labeled "2. SCOPE THE JOBS": the hyperagent (Blasian, bulky matte-navy plate armor with vivid orange seam accents, wire glasses, cyan inner-wrist glow) stands in his real physical office, gauntleted hand extended toward a floating virtual frame opening into the cyber-cathedral, where the Chief of Agents (translucent cyan-and-gold hologram, gold comms crown resting on his head, high-collared conductor mantle, LEAD LLM-COMMS LAYER chest band) fans out four gold-bordered charter cards reading SCHEDULING, INBOUND SALES, SUPPORT, ANALYTICS. Paper-tape caption: "The hyperagent writes the job description. One job per agent." Panel three, labeled "3. THE CONSTELLATION RUNS": four separate glass-walled holographic workrooms side by side, each holding one visibly distinct bare-headed cyan sub-agent working alone with its own small tool rack, each room carrying a gold desk plate reading SCHEDULING, INBOUND SALES, SUPPORT, ANALYTICS and emitting one finished card stamped READY; in the foreground, in the real world, the hyperagent sits in the flesh at his own desk working a single card labeled JUDGMENT. Paper-tape caption: "Four rooms. Four jobs. The hyperagent works on what only he can." Chunky inked footer bar: ONE JOB EACH. OWN TOOLS. OWN WORKSPACE. MANAGED LIKE A TEAM.](/img/comics/agent-constellation.png)

---

## The model

The instinct most operators bring to agents is to build one of them and give it everything: all the context, all the tools, all the jobs. The constellation is the opposite bet. You stand up a set of small agents, each scoped to a single function, each with a name, a defined job, its own toolset, and its own persistent workspace. Then you run them the way you would run a team.

Claire Vo runs ChatPRD this way. She is the only full-time human in a profitable, bootstrapped, investor-free business, and the org chart under her is nine agents built on [OpenClaw](/perspectives/the-chatbot-trap). Polly is the executive assistant: she holds calendar access, read access to email, her own email address, and explicit rules about when she may send mail unsupervised. Sam runs inbound sales replies and books meetings. Howie runs analytics and A/B tests for the podcast and recommends titles and guests. Finley is the household agent, and every afternoon Finley and Polly negotiate with each other over who is picking up the kids.

> "Instead of making one mega claw, I made nine mini claws. They all have their own identity. They all have their own tools. They all have their own workspaces. They all get better at their jobs over time. I give them all individual coaching."
>
> Claire Vo, ["She Staffed Her Profitable Startup With AI Agents"](https://www.youtube.com/watch?v=r5kF6RH3dKM), Solo Founders, 2026-07-15

## Why narrow beats mega

Scoping an agent to a job to be done is a smaller engineering problem than building an all-knowing one, and it stays smaller as the business grows. A narrow agent has a bounded context window of concerns, a short list of tools it is allowed to touch, and a success criterion you can actually state. A mega agent has to navigate the entire business on every turn, which is the failure mode [context overflow](/concepts/context-overflow) describes: the more you load in, the worse the judgment on any single task gets.

The coding tools already settled this. Nobody asks why the coding agent does not also run payroll. It is the coding agent, it is good at coding, and the scoping is the reason it is good. The constellation applies that same discipline to the non-engineering half of a business, where operators still reach for one generalist assistant by default.

Narrow scope also makes agents disposable in the right way. Spinning up a project-specific agent with its own identity and its own constrained toolset is cheap enough to do per project, and the constrained space is precisely why the output is good.

## Agents are just management

The transferable skill for running a constellation is not prompting. It is the ordinary discipline of managing people, and operators who have done that at scale start with a real advantage.

> "Agents are just management. So the ability to design an org, give jobs to people, give jobs to agents, figure out the kind of norms and operating model, and then hold them to account. I think that is also a skill that translates."
>
> Claire Vo, ["She Staffed Her Profitable Startup With AI Agents"](https://www.youtube.com/watch?v=r5kF6RH3dKM), Solo Founders, 2026-07-15

The four questions Vo applies to an agent are the four questions a decent manager applies to a hire. Can I tell you what your job is? Can I tell you what success looks like? Can I give you the tools you need to do it well? Do I spend enough time with you that you are getting better over time? Every one of those maps to something concrete in the harness: the [agent rule file](/concepts/agent-rule-files), the success criteria in its [skill files](/concepts/skill-files), the tool grants, and the coaching loop that turns corrections into [memory](/concepts/memory-files).

This is the same claim [the roles-to-workflows shift](/concepts/roles-to-workflows) makes from the other direction: specifying work for a machine is the same skill as training a human well. The two are not in tension. You decompose the seat into workflows first, then reassemble those workflows under a stable named identity so somebody can own them, be briefed on them, and get better at them. The role comes back as a container after the decomposition, not as a substitute for it.

## Partition by blast radius, not by convenience

Vo runs four Mac minis on her desk: one for the business agents, one for her husband's business, one for the family, and a floater. The rule she borrowed for it is that the machine is the sandbox.

Inside one machine the agents share an office, and Polly wandering into another business agent's workspace is fine because it is all the same business. Across machines they cannot reach each other at all, which is the point. The family agent has no path into company systems and the sales agent has no path into the kids' homework. Permissioning by physical machine is cruder than permissioning by credential, and it is far harder to get wrong at 2am.

The practical version for most operators is the same principle at whatever granularity they can enforce: separate accounts, separate workspaces, separate machines, drawn along the lines where a mistake would actually hurt. See [command centers](/concepts/command-centers) for the workspace shape each partition holds, and [the harness and the deployment](/concepts/the-harness-and-the-deployment) for why the running instance is the thing that needs isolating.

## Delegation means the agent sends the email

A constellation only pays off if the agents act without a human approving each move. Vo's assistant emailed a podcast host ninety minutes ahead of a meeting to flag that she was stuck in traffic, apologize, propose a new time, and offer to reschedule. The instruction that produced it was a voice note from a parked car saying she was running late and to just handle it.

> "What Polly sends is none of my business."

That sentence is the whole discipline. The rules about when the agent may send unsupervised are written once, up front, and after that the operator does not read the outbox. The alternative, reviewing every action, is a job, and an assistant whose every message you approve has not removed any work from your desk.

The accountability question resolves the same way it does with people. The principal is accountable for the performance of every system in the business, human or agent. An operator who has carried the pager for a large engineering org has already seen the failure states of human ownership, and agent ownership does not look meaningfully different. Delegating ownership to an agent is not an abdication as long as the escalation rules are real. Where the [judgment line](/perspectives/the-judgment-line) sits is a design decision you make deliberately, not a reason to keep a human in every loop.

Transparency is a separate question from delegation, and worth settling on purpose. Polly signs her mail with a lobster mark, so recipients who know, know. Sam is convincing enough that prospects show up to meetings asking whether Sam is joining. The rule that holds up is that people are comfortable interacting with an agent when they know it is one, and feel insulted when the ambiguity is doing work for you.

## What it actually takes

The constellation is not a shortcut around expertise, and reading it as one is the fastest way to be disappointed by it.

- **You have to know each job well enough to specify it.** An operator who cannot write the job description cannot staff the seat, with a human or an agent. That is the [hyperdocumented SOP](/concepts/hyperdocumented-sop) discipline, and it comes first.
- **Breadth in the operator is the constraint.** Vo can code, sell, market, and speak, which is why nine agents produce leverage instead of nine backlogs. A deep spike in one function with no coverage elsewhere gets less out of this model, because there is no one to catch what the agents get wrong.
- **The coaching loop is the work.** Agents get better because someone reviews their output and sharpens the rules. Skip that and the constellation decays into nine mediocre assistants.
- **Front-load what you avoid.** Vo does sales, marketing, and podcasting in the morning and codes in the afternoon, because she will build any feature on earth to avoid marketing. The constellation exists partly to keep her from being the single point of failure on the things she is inclined to dodge.

The honest caveat is the one Vo gives when people ask how to copy it: start twenty years ago building expertise and five years ago building an audience. The agents compress the execution, not the judgment feeding them.

## Constellation vs. digital employee

The two are opposite motions and easy to confuse. A constellation points inward: many agents running the functions of your own business so you stop being the bottleneck on all of them. A [digital employee](/concepts/digital-employee) points outward: your judgment packaged into something other businesses rent. A [seat wrapper](/concepts/seat-wrapper) is the single-seat version of the inward motion, and a constellation is what you get when you have built several and started managing them as a team.

## Sources

Full source profile at [Claire Vo](/people-to-follow/claire-vo), including a field-note log of what was lifted from each piece.

## Further Reading

- [The Roles-to-Workflows Shift](/concepts/roles-to-workflows): the decomposition that has to happen before you name the agents.
- [Always-On Agents](/concepts/always-on-agents): what changes when the agents work without being asked.
- [Digital Employee](/concepts/digital-employee): the outward-facing counterpart, expertise rented rather than staffed.
- [Command Centers](/concepts/command-centers): the workspace each agent in the constellation operates out of.
- [Sometimes the Workflow Step Should Be an Agent](/perspectives/sometimes-the-workflow-step-should-be-an-agent): when to scope a step to an agent versus a deterministic script.
