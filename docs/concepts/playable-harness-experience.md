---
title: "Playable Harness Experience"
slug: /concepts/playable-harness-experience
description: "A shippable bundle of skill files, artifact templates, and intended flow that runs inside an agentic harness. Designed once, shared on GitHub, played by anyone whose harness can load it. The new unit of distributable interactive software."
---

# Playable Harness Experience

*A shippable bundle of [skill files](/concepts/skill-files), artifact templates, and intended flow that runs inside an [agentic harness](https://supersuit.wiki/concepts/agentic-harness). Designed once, shared on GitHub, played by anyone whose harness can load it. The new unit of distributable interactive software.*

![Single-panel splash comic. The canonical hyperagent (Blasian, mid-30s, matte navy Supersuit with vivid orange seam accents, helmet off, single unified gold spiral halo above his head, cyan glow at the inner wrist of each gauntlet) at his high-tech innovator's workshop terminal. His gauntleted hands insert a glowing cyan CARTRIDGE labeled EOS-BOOTSTRAP.EXP into a slot on the side of his terminal. The terminal housing is labeled HARNESS, the slot CARTRIDGE BAY. Cyan tendrils extend from the cartridge backward into a visible library substrate behind him with labeled drawers: PRM, DECISIONS, PROJECTS, VOICE, PRINCIPLES, HISTORY. Floating inset upper right: a GitHub repo card showing 'eos-bootstrap-template', star count 247, a custom glowing-cyan badge reading ▶ 1,247 PLAYS, fork count 42. HUD overlays in cyan and gold: HARNESS = CONSOLE / EXPERIENCE = CARTRIDGE / DESIGN ONCE → PLAY MANY. Prominent stamp in cyan and gold caps: HYPERCONTEXT LOADED. Caption: THE HYPERAGENT LOADS A CARTRIDGE. SOMEONE ELSE'S WORK COMES ALIVE INSIDE HIS HYPERCONTEXT. Title bar: THE PLAYABLE HARNESS EXPERIENCE. Footer bar: THE NEW DISTRIBUTABLE UNIT OF INTERACTIVE SOFTWARE.](/img/comics/playable-harness-experience.png)

---

## What it is

A **playable harness experience** is a discrete, shippable bundle of context that runs inside a harness and produces a structured artifact through interview, prompting, and synthesis. One creator designs it once, packages it as a Git repo, ships it. Anyone whose harness can read skill files can clone or fork the repo, load the bundle, and "play" the experience.

Plays are countable. Forks are countable. Stars are countable. The experience now behaves like a piece of distributable software with its own usage metrics, separate from the harness it runs on.

The unit is the experience. The harness is the console it runs on.

This unit did not exist before agentic harnesses standardized. There was no shape to ship. Now there is.

## The cartridge metaphor

The harness is the **console**. [Claude Code](https://supersuit.wiki/reference/tools/claude-code), [Codex](https://supersuit.wiki/reference/tools/codex), Hermes, and any future harness are different consoles in the same generation, capable of loading the same cartridges. The console handles the runtime: tool execution, context assembly, memory, voice input, file system access.

The playable harness experience is the **cartridge**. It contains the substance: which questions to ask, in what order, with what guardrails, against what artifact templates, producing what final output. Same console, infinite cartridges. Same cartridge, multiple consoles.

This metaphor was structurally unavailable before the harness landscape consolidated. Pre-2026, "AI workflows" lived inside SaaS apps, each one a vertical silo. The cartridge model arrived the moment harnesses became substitutable.

## What's inside the bundle

A complete playable harness experience usually contains:

- **One or more `SKILL.md` files** in `.agents/skills/<name>/` that define the flow. Each skill is a structured set of instructions the [Chief of Agents](https://supersuit.wiki/concepts/chief-of-agents) follows when invoked.
- **Artifact templates.** Placeholder Markdown files representing the structured output the experience produces (a V/TO, a deal memo, a character assessment, a project spec).
- **Optional hooks, scripts, configs.** For experiences that need event-driven behavior, custom tool calls, or harness-specific extensions.
- **A README.** Explains what the experience does, how to install it, how to invoke it, what artifacts it produces.
- **A workspace folder shape.** Often the folder layout itself is part of the experience. A bootstrap template for the [Entrepreneurial Operating System](https://traction.wiki/start-here/what-is-eos) ships `vto.md`, `rocks/`, `meeting-notes/`, `scorecards/` as part of the cartridge; those folders are where the experience puts its artifacts.

When all five pieces ship together as a forkable GitHub repo, you have a playable harness experience.

## The hypercontext multiplier

A playable harness experience is dramatically more powerful when it runs inside a harness loaded with rich [hypercontext](https://supersuit.wiki/concepts/hypercontext) than when it runs inside a bare one.

When the king has loaded their full corpus into the harness (relationships, prior decisions, voice samples, project history, principles, prior artifacts), an experience can read that substrate and supplement itself accordingly. The same is true for a company that has stood up a [company context layer](https://supersuit.wiki/concepts/company-context-layer).

A bare EOS bootstrap experience asks: *"Who is on your leadership team? List names and titles."*

The same experience inside a hypercontext-rich harness reads the existing relationship files and proposes a list before asking: *"Looks like your leadership team is the two cofounders, with three contracted function heads on the chart. Confirm?"*

A bare deal-memo experience starts cold. The same experience inside a hypercontext-rich harness already knows the client's history, prior conversations, who is on the deal, the relevant principles applied to similar deals before. The interview compresses from an hour to ten minutes because most of the answers are already in the substrate.

A bare assessment experience asks the user questions. The same experience inside a hypercontext-rich harness can read existing context files and skip the interview entirely, answering the prompt from prior evidence.

The cartridge is the same. The save data the cartridge reads from is richer. The output diverges by an order of magnitude.

This is why a playable harness experience is categorically different from a static SaaS form. A SaaS form cannot read the user's full corpus. The harness can, and so the experience can.

## Examples in the wild

- **An EOS-business bootstrap template** that walks a leadership team through their first week running on the Entrepreneurial Operating System. Twelve skills drive weekly L10s, quarterly Rocks, annual V/TO refreshes, People Analyzer rounds. The workspace IS the running state of the company.
- **The PAOS workspace template.** A forkable starter for someone building a [Personal Agentic OS](https://supersuit.wiki/paos/what-it-is). Ships skills, artifact folders, bootstrap scripts. Each new PAOS is a fork of this experience.
- **An interview-shaped onboard skill.** Drops into any workspace, walks a new user through context capture, produces a `user/USER.md` file the rest of the agent uses afterward.
- **A Bible-character assessment.** Zero-question personality assessment that reads the user's existing context files and outputs which Bible character they most resemble.

Each is a different shape. Each is fully self-contained. Each can be cloned and played in under a minute.

## Why this is the future of distributable software

Playable harness experiences ship a kind of software that existing distribution models cannot ship cleanly:

- **Install time is seconds.** Clone the repo. Open the harness. Done.
- **No API keys to provision.** No servers to spin up. No SaaS account to create. The experience runs inside the harness the user already trusts.
- **Substitutable runtime.** The user picks the harness. The experience runs on whichever console they have.
- **Forkable by design.** A user who likes 80% of the experience forks it and edits the 20%. The fork ships back into the ecosystem.
- **Compounding capability.** As harnesses get richer (better models, better tools, better memory), every existing experience gets richer for free.

The closest existing analog is the open-source dotfile ecosystem: people share their shell configs as forkable Git repos, each repo is a personal cartridge, the ecosystem learns from forks. Playable harness experiences are dotfiles for cognitive workflows.

## How to ship a great one

- **Clear scope.** One well-defined job. "Bootstrap an EOS business in seven days." "Run a Q1 rocks-setting workshop." "Conduct a Bible-character assessment." A scope that fits in one sentence.
- **Honest interview flow.** Sharp follow-up questions. No wasted prompts. The skill file should encode a domain expert's instinct for what to ask next.
- **Produces actual artifacts.** A V/TO file. A signed scope. A graded assessment. Talk-only experiences do not count. The bundle's output IS the value.
- **Resumable across sessions.** State preserved on disk so a multi-day experience can pause and resume. The user should be able to walk away mid-flow and return without losing place.
- **Documented entry point.** README with the install command and the first invocation. A new user should be playing in under five minutes from landing on the GitHub repo.
- **Versionable.** Use Git tags, semver, or dated releases. When the experience evolves, existing users can pull updates without breaking their state.

## Why this matters for you

If you have ever wanted to ship a piece of cognitive software that helps people do specific structured knowledge work, the playable harness experience is the unit you have been waiting for. You can ship one this weekend. You will not need to host a server, register an LLC, or apply for an API key. You will need a clear scope, a skill file, a template, a README, and a Git repo. The next morning, someone will have played it.

## Further Reading

- [Skill Files](/concepts/skill-files): the structural unit a playable harness experience is mostly composed of.
- [Agentic Harness](https://supersuit.wiki/concepts/agentic-harness): the console that loads the cartridge.
- [Agentic Harness Chatbox](https://supersuit.wiki/concepts/agentic-harness-chatbox): the input field the experience drives the user through.
- [Chief of Agents](https://supersuit.wiki/concepts/chief-of-agents): the model executing the experience's instructions.
- [Hypercontext](https://supersuit.wiki/concepts/hypercontext): the substrate that turns a generic experience into a personalized one when loaded under it.
- [Company Context Layer](https://supersuit.wiki/concepts/company-context-layer): the company-shaped equivalent of personal hypercontext.
- [Personal Agentic OS](https://supersuit.wiki/paos/what-it-is): a workspace shape that is itself a long-running playable harness experience.
- [Superprompt](https://supersuit.wiki/concepts/superprompt): what an experience-driven session looks like at the chatbox.
