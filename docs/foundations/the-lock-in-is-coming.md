---
title: The Lock-In Is Coming
slug: /foundations/the-lock-in-is-coming
description: Every VC-backed hyperscaler with proprietary models will eventually move to lock you in. A structural inevitability the sovereign stack is designed around.
---

# The Lock-In Is Coming

*Every VC-backed hyperscaler with proprietary models will eventually move to lock you in. This is not a prediction. It is a structural inevitability.*

---

## The Pattern

A company raises billions of dollars from venture capital. In the early days, they are generous. Free tiers, open APIs, third-party integrations, developer-friendly policies. They need adoption. They need you to build on their platform, to make their product the default, to weave it into your daily workflow until switching feels impossible.

Then the economics kick in. Investors want returns. The company needs revenue. And the easiest revenue comes from the people who are already dependent on the platform. So the walls go up. Third-party access gets restricted. Open integrations get shut down or repriced. Features that were free become paid. The platform that welcomed you in now charges you to leave.

This is not unique to AI. It happened with social media. It happened with cloud computing. It happened with app stores. It is the lifecycle of every VC-backed hyperscaler with proprietary infrastructure: subsidize adoption, build dependency, monetize the captive audience.

The AI industry is now entering the monetization phase. If you built your workflow on any single AI platform's proprietary ecosystem, the lock-in is coming. Maybe it already arrived.

## Why This Is Structural, Not Personal

This is not about any specific CEO being good or bad. Most of them did not have a Machiavellian plan to build dependence and then raise walls. It is about incentive structures. When a company takes billions in venture capital, it takes on an obligation to generate returns that justify that investment. That obligation shapes every product decision, every pricing change, every policy update.

These companies are betting on two things: amortized usage at sustainable margins as capacity increases, and moving higher up the stack to own more of your operations. Not just the model. The data. The integrations. The workflows. The verticalization. Every layer they move into is a layer you become more dependent on.

To the extent that any AI company supports open source or third-party integrations, that support exists because it currently serves the company's growth. The moment it stops serving growth, it stops. This is not cynicism. It is how shareholder-driven companies work. The fiduciary duty is to the investors, not to the developer community.

The founders may genuinely believe in openness. Many of them do. But beliefs do not override balance sheets. When the board asks why subscription revenue is leaking through third-party harnesses, the answer is always the same: close the leak.

## The Two-Direction Squeeze

There are two forces converging on the same territory from opposite directions.

**Hyperscalers creep up from the bottom.** Think of the stack as layers, from low-level to high-level: model at the bottom, then harness, then workflows, then integrations at the top.

Anthropic started by selling you the model (Claude). Then they built the harness around it (Claude Code). Then they added workflows (projects, memory, custom instructions). Now they are moving into integrations and verticalization: connecting to your email, your calendar, your files, your entire digital life. Each step UP the stack captures more of your daily operations and makes switching harder. They are not just selling you intelligence anymore. They are becoming your operating system.

```
Hyperscaler direction (bottom -> up):

  Integrations  <- moving here now (email, calendar, files)
  Workflows     <- custom GPTs, projects, memory
  Harness       <- Claude Code, ChatGPT interface
  Model         <- started here (Claude, GPT)
```

**Open source moves from the top down.** Open source started the opposite way. People built integrations and workflow tools first (connecting APIs, automating processes with scripts and open tools). Then the community built open harnesses (OpenCode, Aider, Cursor). Now open source models are approaching frontier quality (Llama, Mistral, Qwen, DeepSeek). The gap with proprietary models is closing fast.

```
Open source direction (top -> down):

  Integrations  <- started here (open APIs, automation tools)
  Workflows     <- open workflow tools, n8n, Zapier alternatives
  Harness       <- OpenCode, Aider, Cursor
  Model         <- arriving here now (Llama, Mistral, DeepSeek)
```

**The squeeze.** Both are converging on the same middle ground from opposite directions. You, the user, are in the middle. The question is which force reaches you first.

If the hyperscaler captures your workflows and integrations before open source models are good enough to replace the proprietary ones, you are locked in. Your data, your habits, your team's processes are all inside their walls. Switching becomes painful enough that you just keep paying.

If open source gets good enough at every layer before you are fully captured, you stay free. You run local models, use open harnesses, own your files, and switch providers whenever you want.

This is why the timing matters. Every month you spend deepening your dependency on a proprietary stack is a month the walls get higher. Every month you spend building on portable files and open harnesses is a month you stay sovereign. The race is real, and it is happening right now.

## What Gets Locked In

The lock-in happens at every layer:

**Your data.** Conversations, documents, strategic context poured into a platform's chat interface. Try exporting it in a format another tool can use. Most platforms make this difficult or impossible by design.

**Your context.** The accumulated understanding that an AI has about you, your business, your preferences. This context is the most valuable thing you build over time, and it lives on their servers, in their format, behind their login.

**Your workflows.** Custom instructions, system prompts, integrations with other tools. The more you customize, the more painful it is to leave. This is the switching cost they are banking on.

**Your team's habits.** Once an organization standardizes on a platform, the institutional inertia alone keeps them paying. Retraining, migrating, rebuilding workflows. Most teams will eat a price increase rather than deal with the disruption.

## The Sovereign Alternative

A sovereign architecture is designed to prevent this. Not as a theoretical principle. As a practical reality you can verify today.

**Own your data.** Your context lives in plain markdown files on your computer. Not on anyone's servers. Not behind anyone's API. Files you can open in any text editor, version-control with git, and back up anywhere you want.

**Own your models.** Open source models are getting remarkably good, remarkably fast. You can run them on your own hardware with zero data leaving your machine. Today's best default might be a proprietary model. Tomorrow it might be open source. Your files do not care.

**Own your harness.** Claude Code is one [harness](/disciplines/harness-engineering). There are others: OpenCode, Cursor, Aider, and more emerging constantly. A portable architecture works with any harness that can read files and run commands. If your current harness changes its pricing, its policies, or its attitude toward third-party tools, you switch. Your context comes with you. Nothing is lost.

**Own your future.** Sovereignty means the platform serves you, not the other way around. You are not a user of someone else's system. You are the operator of your own system.

## What To Do

**Audit your dependencies.** Where does your data live? Could you switch AI providers tomorrow without losing anything important? If the answer is no, you have work to do.

**Build on files, not platforms.** Markdown files are the universal format. Every AI tool can read them. No AI tool owns them. Your context should be a folder on your computer, not a conversation history on someone else's server.

**Stay portable.** Before adopting any AI tool, ask: what happens if this company doubles its price next month? What happens if it shuts down third-party access? What happens if it gets acquired? If the answer to any of these is "I lose my work," do not adopt it. Or adopt it with an exit plan.

**Support open source.** Open source models, open source harnesses, open source tools. Not because proprietary tools are bad. Because competition is good. Because the threat of switching is the only thing that keeps platforms honest.

The lock-in is coming. For some platforms, it has already arrived. The question is not whether it will happen. The question is whether you built your system in a way that makes it irrelevant when it does.

## Why We Win

Here is the optimistic ending.

Open source models are improving at a pace that surprises even the people building them. Local inference is getting faster, cheaper, and more accessible every quarter. Open harnesses are getting better. Sovereign infrastructure is being built, piece by piece, by thousands of builders who believe people should own their own intelligence.

The proprietary platforms have a head start on polish and convenience. But the sovereign stack has something they do not: it gets better for everyone at the same time. Every improvement to an open model benefits every user. Every improvement to an open harness benefits every builder. The compounding is on our side.

If, as a community, we commit to building sovereign infrastructure that is as easy to use, as effective, and as democratized as the proprietary alternatives, it is just a matter of time. Not because proprietary platforms will fail. Because sovereign alternatives will become so good that the lock-in stops mattering. You will have a real choice. And when people have a real choice between owning their future and renting it, most of them will choose to own.

> **Own your data. Own your models. Own your harness. Own your future.**

---

## Further Reading

- [Harness Engineering](/disciplines/harness-engineering): Why the wrapper matters as much as the model
- [Minimum Viable Infrastructure](/foundations/minimum-viable-infrastructure): The baseline requirements, including the ability to run tools independently
- [Hyperagency](https://hyperagency.wiki/start-here/what-is-hyperagency): The state of being you reach when you build on portable infrastructure
