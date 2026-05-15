---
title: "Ramp: Glass"
slug: /engagement-patterns/ramp-glass
description: "700 employees, 350 shared skills, 6,300% AI usage growth, 1,500 apps shipped in six weeks. The internal AI suite Ramp built and the playbook that produced company-wide adoption."
---

# Ramp: Glass

*700 employees. 350 shared skills. 6,300% usage growth. 1,500 apps shipped in six weeks. And they are just getting started.*

---

## The story

Ramp is a financial payments infrastructure company. In January 2025, they told their entire company they would become the most productive company in the world. They had no plan for how to get there. What they had was a culture of velocity, a bias toward building, and leadership that treated AI adoption as an expectation rather than an experiment.

Eighteen months later, the numbers speak for themselves: AI usage up 6,300% year over year. 99.5% of the team active on AI tools. 84% using coding agents weekly. Non-engineers now account for 12% of all human-initiated pull requests on the production codebase (thousands per month). 1,500+ apps shipped on their internal platform in six weeks, from 800+ different builders.

They did this without a formal change management program. Without a mandatory training curriculum. Without a master plan. They built infrastructure, raised expectations, removed constraints, and watched it compound.

---

## The problem

Ramp hit 99% adoption of AI tools across the company early on. On paper, mission accomplished. In practice, most people were stuck.

The models were not the bottleneck. The people were not the bottleneck. The [harness](/disciplines/harness-engineering) was the bottleneck. Terminal windows, npm installs, MCP configurations, environment setup: all of it was too much for most employees to configure on their own. The few who pushed through had wildly different setups with no way to share what they had learned.

Ramp had created urgency without providing infrastructure. The result: AI's true upside was limited to the people who already knew how to configure it. Everyone else was driving a Ferrari with the handbrake on.

---

## Glass: the internal AI suite

So they built Glass, their own AI productivity suite built on Anthropic's Claude Agent SDK. A team of four built it in under three months. 700 daily active users within a month of launch.

### Everything connects on day one

Glass comes auto-configured on install. Employees sign in once via SSO and 30+ tools light up: Salesforce, Snowflake, Gong, Slack, Notion, Google Workspace, Figma, plus Ramp's own internal products. No setup guide. No tickets to IT. If the user has to debug, they have already lost.

This is [minimum viable infrastructure](/foundations/minimum-viable-infrastructure) done right. When a sales rep asks Glass to pull context from a Gong call, enrich it with Salesforce data, and draft a follow-up, it works because everything is already connected.

### Shared skills through the Dojo

The biggest innovation is their skill marketplace, called the Dojo. Skills are markdown files (the instruction-files pattern) that teach an agent how to perform a specific task.

When someone on the sales team figures out the best way to analyze Gong calls, break down competitive mentions, and draft battlecards, they package it as a skill and give that superpower to every rep. A CX engineer builds a Zendesk investigation workflow that pulls ticket history, checks account health, and suggests resolution paths. Through the Dojo, the entire support team levels up overnight.

Over 350 skills have been shared company-wide. They are Git-backed, versioned, and reviewed like code. The marketplace is the flywheel: every skill shared raises the floor for everyone.

The Dojo includes a built-in AI guide called the Sensei that looks at which tools you have connected, what role you are in, and what you have been working on, then recommends the skills most likely to be useful. A new hire does not browse a catalog of 350 skills. The Sensei surfaces the five that matter most on day one.

### Persistent memory

When users first open Glass, the system builds a full memory layer based on their authenticated connections. Every chat session has context on the people they work with, their active projects, relevant Slack channels, Notion documents, and Linear tickets.

A synthesis pipeline runs every 24 hours, mining previous sessions and connected tools for updates. Glass adapts to the user's world without them re-explaining things every session. This is [context engineering](/disciplines/context-engineering) and [compounding docs](/foundations/compounding-docs) at the organizational scale.

### Always-on automation

Glass turns your laptop into a server. Schedule automations that run daily, weekly, or on custom cron, and post results directly to Slack. A finance team lead pulls yesterday's spend anomalies every morning at 8am and posts a summary to the team channel.

You can create Slack-native assistants that listen and respond in channels using your full Glass setup: integrations, memory, and skills included. For long-running tasks, Glass has a headless mode: kick off a task, walk away, approve permission requests from your phone.

### Workspace, not chat window

Most AI products give you a single conversation thread. Glass gives you a full workspace built around split panes. Tile multiple chat sessions side by side, open documents, data files, and code alongside your conversations. The layout persists across sessions. The product is designed around how real work actually happens.

---

## The playbook: how they got the whole company building

Glass was the infrastructure. But the cultural transformation required more than a tool. Ramp's CPO Geoff Charles documented the full playbook. Here is what they learned.

### The proficiency ladder

Ramp thinks about AI proficiency in four levels:

| Level | Description | What it looks like |
|-------|------------|-------------------|
| L0 | Sometimes uses ChatGPT. Has not changed any workflows. | If you are here and not self-starting, you will most likely not be at the company. |
| L1 | Built custom GPTs, used Notion agents, dabbled in Claude Code. | Starting to see what is possible but has not compounded it yet. |
| L2 | Built an app that automates part of their job. Committed code or contributed feedback. | This is where things get real. |
| L3 | Systems builders. They build the infrastructure that levels up everyone else. | Force multipliers. |

Ramp's job is to get everyone up the ladder. Three things make that possible:

1. **Build tools that meet people where they are.** They shifted the whole company to Claude and Notion AI connected to workplace tools. Low technical bar, immediate benefit. That moves L0 to L1.
2. **Raise expectations as tools mature.** AI proficiency moved into hiring screens, onboarding, and performance conversations. That pushes L1s to L2.
3. **Match the mandate to the tooling.** If you raise expectations before the tools can deliver, you burn credibility and people stop listening.

### The hackathon

Ramp hosted the largest AI hackathon ever: 700 participants across sales, CX, legal, marketing, and finance, coached by 100 of their most capable engineering and product teammates. They shipped more in a week than Ramp previously could in a year. Hundreds of people experienced what AI can do firsthand, all at once.

### Embrace creative destruction

Many of the tools Ramp shipped in January 2026 were already obsolete by April, replaced by better versions, often from the same builders. They got comfortable with a shelf life of weeks, not months.

Their data democratization journey tells the story:

- **Phase 1:** Notion AI was the best option, so they piped data into Notion databases.
- **Phase 2:** They launched Ramp Research, a Slack-based Snowflake research tool.
- **Phase 3:** As coding agents matured, they encoded Snowflake research into skills those agents could use directly.
- **Phase 4:** Now they are making data research interactive and self-improving.

Each generation opened doors the previous one could not. Each former generation was quietly sunset. People are not attached to their tools. They are attached to their problems. When a better way to solve the problem shows up, they grab it.

### Build from the center, drive from the spokes

Ramp got the org design wrong before they got it right.

First instinct: centralize. One small team builds tools for the whole company. Demand outstripped capacity immediately. Then they swung decentralized: every team builds their own things. Tons of redundant re-learning.

The answer was both:

- **A small central team** builds the platforms, connectors, and plumbing across LLMs, data, knowledge, and workflows. They also manage training, enablement, and change management.
- **Functional teams** build on top of those platforms and give feedback that drives the central team's roadmap.

The results from non-engineers:

- A risk analyst automated 16 hours per month of manual financial modeling.
- A sales ops lead replaced a spreadsheet-based comp model across three orgs in 48 hours.
- An L&D lead built a training simulator in 15 minutes.
- Someone in finance built a contract reviewer that saves 45 minutes per contract.

None of them filed a ticket. They found their own pain, prototyped a fix, and pulled engineering in when it was time to go to production (when that was even necessary).

### Make it a competition

Ramp built an internal leaderboard tracking AI usage across every team and individual. Sessions run, skills used, apps shipped, tools connected. Visible to everyone.

The leaderboard created three dynamics:

**Healthy peer pressure.** Nobody wants to be at the bottom. When you can see that your peer on another team is running 3x more sessions and shipping tools that save their team hours, you do not need a mandate to start building.

**Manager accountability.** Team-level rankings made it impossible for managers to ignore AI adoption. If your team is in the bottom quartile, that is a conversation you are going to have.

**Discovery through emulation.** The leaderboard is not just a scoreboard. It is a map. When you see someone at the top, you want to know what they are doing. You look at their skills, their workflows, their apps.

### Remove every constraint

The number one way companies kill AI adoption is by treating it like a procurement decision. Budget approvals. IT reviews. Token limits. Connector requests sitting in a queue. Every one of these is a wall between your people and their breakthrough moment.

Ramp took the opposite approach:

**Infinite learning budget.** If you demand ROI on every token before people have even learned to use the tools, you will never get adoption. The payoff comes from the compounding, not from day one.

**No token limits or access restrictions.** No caps on usage. No tiered access based on role. Everyone gets the same tools, the same models, the same access. The people who surprised them most were the ones they would have never given access to under a traditional approval process.

**Pre-connected integrations.** An AI agent is only as useful as what it can access. If people have to file a ticket and wait two weeks for IT to approve a Salesforce connection, they lose momentum and never come back. 30+ tools connected on day one.

The cost math that should reframe the conversation for any CFO: token consumption per employee today is not even close to double-digit percentages of their salary. But if someone is 2x more productive with AI, you should be willing to spend their entire salary again in tokens. If you have agents that can do 10x more work than a person, why would you not pay them twice as much as that person?

### AI proficiency as a hiring requirement

Ramp now has an absolute requirement for anyone joining the company to be proficient with AI tools. No exceptions. For PM candidates, there is a dedicated interview session: build me a product, show me how you built it, walk me through how it works. It is a full prototype, not a slide deck. If you cannot demonstrate that you have internalized these tools, you do not clear the bar.

AI proficiency also moved into performance management. It is not optional. It is how Ramp evaluates whether people and teams are operating at their potential.

---

## Why they built instead of bought

Ramp's reasoning for building in-house maps directly to the sovereignty argument:

**Internal productivity is a moat.** The companies that make every employee effective with AI will move faster, serve customers better, and compound advantages their competitors cannot match. You do not hand your moat to a vendor.

**Speed.** When you own the tool, you see exactly where people get stuck and ship fixes the same day. Every session generates signal about how non-engineers actually learn to use AI: which skills get adopted, where people break through, what separates someone who uses it once a week from someone who uses it every day.

**It informs the external product.** Many of the problems Ramp solves for internal users translate directly to customers. Solving these problems internally gives them conviction about what works before they ship it.

---

## The playbook for every company

You do not need to be Ramp. You do not need a team of four engineers or a 700-person hackathon. But you need to understand that this is the new bar. The companies that suit up their entire workforce this way will compound advantages that companies still debating their "AI strategy" cannot match.

Here is what any company can take from Ramp's approach:

**1. Start today, not with a plan.** Ramp did not have a master plan. They had a culture that rewards speed and a leadership team that said: AI usage is an expectation, not an experiment. That clarity alone moves organizations further than any strategy deck.

**2. Build the infrastructure that removes friction.** Pre-connect your tools. Eliminate token limits. Kill the IT approval queues that stand between your people and their breakthrough moment. If your employees have to debug a setup before they can use AI, you have already lost.

**3. Make it a game.** Leaderboards. Team rankings. All-hands celebrations. The competitive dynamics did more for Ramp's adoption than any training program. When a CSM sees a risk analyst save 16 hours a month, they do not think "good for Risk." They think "what can I build?"

**4. Build from the center, drive from the spokes.** A small central team builds platforms and plumbing. Functional teams build on top. The spokes drive the center as much as the center drives the spokes.

**5. Share skills, not just tools.** The Dojo pattern: when someone discovers a workflow, they package it as a reusable skill file. The floor rises with every contribution.

**6. Treat AI proficiency as a hiring requirement.** It is not optional. It is how you evaluate whether people and teams are operating at their potential. The interview should include: build me something, show me how you built it, walk me through how it works.

**7. Expect creative destruction.** Your tools from three months ago should feel obsolete. If they do not, you are not moving fast enough.

The cost math is simple: token consumption per employee is a rounding error compared to their salary. If AI makes someone 2x more productive, spend aggressively. The ROI is not in day one. It is in the compounding.

---

## The key insight

The single most important thing Ramp learned: **every feature is secretly a lesson.**

Skills show you what great AI output looks like before you know how to ask for it yourself. Memory shows you that context is the difference between a generic answer and a useful one. Self-healing integrations show you that errors are not your fault. None of this was designed as education. But when you hand someone a tool that just works, they learn by doing. And they learn fast.

The compounding is real. A CX team lead shares a skill and sixty reps level up overnight. A new hire's first session already knows their team, their projects, and their tools. Someone who has never opened a terminal is running scheduled automations that would have required an engineer six months ago.

Ramp did not start with a better strategy than most companies. They started with a culture that rewards speed, people who try things without waiting for permission, and leadership that backs bold bets. In lieu of a master plan, they just started. They kept building tools, kept raising the bar, kept creating venues for people to show off. Each track compounded separately. As they reinforced each other, the curve went vertical.

The most important lesson is the simplest one: just get started.

---

*Glass was built by Seb Goddijn, Shane Buchan, Cameron Leavenworth, Calvin Kipperman, Jay Sobel, and Caroline Horn. The organizational playbook was documented by CPO Geoff Charles. Original articles published on X on April 9-10, 2026.*

---

## Further Reading

- [Harness Engineering](/disciplines/harness-engineering): the technical foundation. The models are good enough. The harness is what matters.
- [Context Engineering](/disciplines/context-engineering): what Glass's memory system practices at organizational scale.
- [Compounding Docs](/foundations/compounding-docs): why the Dojo flywheel keeps getting more valuable.
- [Minimum Viable Infrastructure](/foundations/minimum-viable-infrastructure): the principle behind "everything connects on day one."
- [AI Enablement Architect](/roles/ai-enablement-architect): the role responsible for building Glass-shaped systems inside other companies.
