---
title: "Playable Harness Experience"
slug: /concepts/playable-harness-experience
description: "A shippable bundle of skill files, artifact templates, and intended flow that runs inside an agentic harness. Designed once, shared on GitHub, played by anyone whose harness can load it. The new unit of distributable interactive software."
image: "/img/comics/playable-harness-experience.webp"
---

# Playable Harness Experience

*A shippable bundle of [skill files](/concepts/skill-files), artifact templates, and intended flow that runs inside an [agentic harness](https://supersuit.wiki/concepts/agentic-harness). Designed once, shared on GitHub, played by anyone whose harness can load it. The new unit of distributable interactive software.*

![Single-panel splash comic. The canonical hyperagent (Blasian, mid-30s, matte navy Supersuit with vivid orange seam accents, helmet off, cyan glow at the inner wrist of each gauntlet) at his high-tech innovator's workshop terminal. His gauntleted hands insert a glowing cyan CARTRIDGE labeled EOS-BOOTSTRAP.EXP into a slot on the side of his terminal. The terminal housing is labeled HARNESS, the slot CARTRIDGE BAY. Cyan tendrils extend from the cartridge backward into a visible library substrate behind him with labeled drawers: PRM, DECISIONS, PROJECTS, VOICE, PRINCIPLES, HISTORY. Floating inset upper right: a GitHub repo card showing 'eos-bootstrap-template', star count 247, a custom glowing-cyan badge reading ▶ 1,247 PLAYS, fork count 42. HUD overlays in cyan and gold: HARNESS = CONSOLE / EXPERIENCE = CARTRIDGE / DESIGN ONCE → PLAY MANY. Prominent stamp in cyan and gold caps: HYPERCONTEXT LOADED. Caption: THE HYPERAGENT LOADS A CARTRIDGE. SOMEONE ELSE'S WORK COMES ALIVE INSIDE HIS HYPERCONTEXT. Title bar: THE PLAYABLE HARNESS EXPERIENCE. Footer bar: THE NEW DISTRIBUTABLE UNIT OF INTERACTIVE SOFTWARE.](/img/comics/playable-harness-experience.webp)

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

The metaphor has since been taken literally by a published standard. The [Agentic Brand
Universe](https://agenticbranduniverse.com) defines a brand as a **cartridge**: a typed,
git-versioned canon plus its locked golden assets, portable enough to fork or rent. Its
**console** is Claude Code with the ABU plugin installed, and the plugin reads universes the
way a PDF reader reads PDFs. Install it and the harness you already use becomes the runtime:

```
/plugin marketplace add garysheng/agentic-brand-universe
/plugin install abu@agentic-brand-universe
```

What makes it a useful worked example rather than a restatement is that the cartridge carries
**data and gates, not just prompts**. A universe declares invariants its renders must satisfy,
and the console refuses to draw a character whose reference art is not on disk, because a
plausible picture of the wrong person passes review and is more expensive than a hard stop.
That is the cartridge doing what a skill-file bundle alone cannot: shipping the standard of
correctness along with the instructions.

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

When the leader has loaded their full corpus into the harness (relationships, prior decisions, voice samples, project history, principles, prior artifacts), an experience can read that substrate and supplement itself accordingly. The same is true for a company that has stood up a [company context layer](https://supersuit.wiki/concepts/company-context-layer).

A bare EOS bootstrap experience asks: *"Who is on your leadership team? List names and titles."*

The same experience inside a hypercontext-rich harness reads the existing relationship files and proposes a list before asking: *"Looks like your leadership team is the two cofounders, with three contracted function heads on the chart. Confirm?"*

A bare deal-memo experience starts cold. The same experience inside a hypercontext-rich harness already knows the client's history, prior conversations, who is on the deal, the relevant principles applied to similar deals before. The interview compresses from an hour to ten minutes because most of the answers are already in the substrate.

A bare assessment experience asks the user questions. The same experience inside a hypercontext-rich harness can read existing context files and skip the interview entirely, answering the prompt from prior evidence.

The cartridge is the same. The save data the cartridge reads from is richer. The output diverges by an order of magnitude.

This is why a playable harness experience is categorically different from a static SaaS form. A SaaS form cannot read the user's full corpus. The harness can, and so the experience can.

## What it looks like to play one

Discover, load, interview, ship. The full arc of a playable harness experience compresses into a single session.

![4-panel comic strip. Panel 1, DISCOVERED ON GITHUB: The supersuited hyperagent (Blasian, mid-30s, matte navy Supersuit with vivid orange seam accents, helmet on with translucent cyan visor band) at his high-tech innovator's workshop terminal, looking at a GitHub repo card on his monitor showing 'eos-bootstrap-template', ★ 247 stars, ▶ 1,247 PLAYS, 42 forks, with a 'Clone repository' button highlighted. HUD overlay: DISCOVERED ON GITHUB. Caption: 'The hyperagent finds a cartridge played a thousand times.' Panel 2, LOADED + INVOKED: The hyperagent (helmet off, face visible) inserts a glowing cyan cartridge into a slot labeled HARNESS / CARTRIDGE BAY. The Chief of Agents materializes beside him as a luminous translucent cyan-and-gold holographic construct labeled CHIEF OF AGENTS, asking via floating speech bubble: 'Who is on your leadership team?'. Wispr Flow microphone icon and voice waveform visible. Caption: 'He loads it. The Chief of Agents begins the interview.' Panel 3, HYPERCONTEXT MULTIPLIER: Substrate library shelves with cyan-glowing labels: PRM, DECISIONS, PROJECTS, VOICE, PRINCIPLES, HISTORY. Cyan tendrils flow from the substrate into the cartridge. The Chief of Agents presents a pre-filled structured option: 'Your leadership team is the two cofounders + three contracted heads. CONFIRM?' with glowing CONFIRM button. HUD overlay: HYPERCONTEXT LOADED → INTERVIEW COMPRESSED. Caption: 'The cartridge reads his hypercontext. The interview compresses.' Panel 4, ARTIFACT SHIPPED: First-person POV through the hyperagent's helmet visor. HUD overlays in cyan and gold: a V/TO — SIGNED card showing CORE VALUES, CORE FOCUS, 10-YEAR TARGET, MARKETING STRATEGY, 1-YEAR PLAN, ROCKS sections; COMMITTED TO MAIN and READY FOR L10 stamps; ARTIFACT STATUS panel. Gauntleted hand reaching forward. Caption: 'Four hours later, the artifact is signed, committed, and alive inside his hypercontext.' Title bar: PLAYING A HARNESS EXPERIENCE. Footer bar: ONE CARTRIDGE. ONE SESSION. A FINISHED ARTIFACT.](/img/comics/playable-harness-experience-walkthrough.webp)

## The extreme: when the substrate is enough

When the hypercontext is rich enough, an experience can skip the interview entirely. A Bible-character assessment is the canonical worked example: zero prompts, zero forms, one artifact. The cartridge reads the user's journal entries, prophetic words, decision logs, relationships, and history, then names the answer.

![4-panel comic strip. Panel 1, INVOKED: The supersuited hyperagent (Blasian, mid-30s, matte navy Supersuit, helmet off) at his high-tech innovator's workshop terminal, typing into the AGENTIC CHATBOX visible on his monitor with the command '/bible-character-assessment'. A glowing cyan cartridge labeled BIBLE-CHARACTER.EXP sits in a slot labeled HARNESS / CARTRIDGE BAY. EXPERIENCE INVOKED checkmark badge. Caption: 'The hyperagent invokes the experience.' Panel 2, SUBSTRATE FLOOD: Wide shot of the workshop. Substrate library shelves with cyan-glowing labels: PRM, JOURNAL, DECISIONS, PRAYERS, PROPHETIC WORDS, RELATIONSHIPS, HISTORY. Massive streams of cyan light flow from every drawer into the cartridge. The Chief of Agents (luminous translucent cyan-and-gold holographic construct, software not flesh) on the right with label READING & PARSING SUBSTRATE. The hyperagent stands aside watching. Caption: 'The cartridge reads everything. Journal entries. Prayers. Decisions. Prophetic words.' Panel 3, NO QUESTIONS ASKED: The Chief of Agents holds up a glowing sign reading 'NO QUESTIONS ASKED. SUBSTRATE IS ENOUGH.' A small counter card shows: 0 PROMPTS / 0 FORMS / 1 ARTIFACT. The hyperagent stands relaxed beside his terminal, not being interviewed. HUD overlay: INTERVIEW SKIPPED. Caption: 'It asks him nothing. The substrate is the input.' Panel 4, THE ANSWER: First-person POV through the hyperagent's helmet visor. Central card heading 'YOU ARE MOST LIKE:' followed by bold caps 'DAVID'. Justification bullets: '14 journal entries about facing giants', '7 prophetic words about destined kingship', 'Jonathan-like trust in your closest relationships', 'Your shift from shepherd to king-in-waiting'. Match-strength indicators (95%, 98%), SUBSTRATE COMPLETE and MATCH STRONG stamps. Gauntleted hand reaching forward. Caption: 'Four seconds later, the answer.' Title bar: THE ZERO-QUESTION ASSESSMENT. Footer bar: WHEN THE SUBSTRATE IS RICH ENOUGH, THE EXPERIENCE STOPS ASKING.](/img/comics/zero-question-assessment.webp)

Most playable harness experiences sit between these poles: some questions remain because the substrate cannot guess, but most of the answers are already present. The interview-vs-substrate ratio is a design dial each cartridge sets for itself.

## What makes it playable rather than merely runnable

The word *playable* in the name has to earn itself, and for most bundles it does not. A cartridge that loads, runs, and produces an artifact is **runnable**. What separates a runnable experience from a playable one is not polish. It is that a game, at every moment, tells you three things: where you stand, what moves are available, and what each one is worth. A bundle that answers none of those is software you operate. A bundle that answers all three is something you play.

The failure is specific and easy to miss, because nothing about it looks like a failure. A verb finishes. It did the thing correctly. It produced the artifact. And the person is now sitting in front of a finished step holding four possible next moves, none of which the system named. They have to remember what the bundle can do, work out which of those the last step made possible, and choose, all from memory. The experience did its job and handed back a guessing game.

This is the [seam](https://userexperience.wiki/concepts/the-seam) problem in a lean-forward session. The end of a unit of work is the highest-risk moment in the flow, because the momentum the step just built is spent entirely on recall.

### The three things a playable experience always shows

- **Where you stand, as a number that moved.** Not a status page. A grade, a score, a distance to done, and ideally the previous value beside it. Progress a person cannot see is progress they do not feel, and a bundle whose state is only legible by reading its files has no scoreboard.
- **The available moves, ranked, with what each one is worth.** Not a list of everything the bundle can do, which is a wall. Three or four, ordered by what they gain, each described in terms of the outcome rather than the mechanism. "Lock its plates, so every later render stops inventing it" is a move. "Run shoot-references" is a menu item.
- **The moves as choices, not as prose.** This is the part most bundles get wrong even when they get the first two right. Describing the options in a paragraph and ending with a question mark is a reading task. Offering them as selectable options is a decision. Same information, different amount of work for the person, and over a long session that difference is most of the fatigue.

### Compute the moves; never author them

The instinct is to write the next-moves list into the skill file by hand. Resist it: a hand-written list is a second source of truth about the bundle's own state, and it is stale the moment the bundle grows.

Derive them instead. If the experience already has anything that evaluates its own state, that evaluator almost certainly knows what to do next and is throwing the information away. A checker that reports what is wrong is one field away from reporting the verb that fixes it, and once each finding carries its own remedy, the board is a sort rather than a judgement. Worked example: the [Agentic Brand Universe](https://agenticbranduniverse.com) grader emits every open issue as an impact, a description, and the name of the verb that closes it, so the board is assembled from the grader's output and no ranking logic exists in a second place.

### Two refusals worth stating

**Offer at most four moves.** A fifth is a board the person is shown and cannot act on, and a long list is the wall that made them stop reading in the first place. Say how many you omitted instead, which is honest and costs one line.

**Always leave the door open for the answer that is not on the board.** The most useful next move is frequently the one in the person's own head, and a board that presents itself as exhaustive quietly forbids it. Whatever mechanism offers the choices has to keep a visible way to say something else, and if a richer presentation costs you that door, the richer presentation is the wrong trade.

### Pass the last move in, so the board reads as a consequence

A board computed with no knowledge of what just happened has two tells. It offers the move the person has this second completed, which reads as though nothing was noticed. And it ignores what that move made possible, so it arrives as a fresh menu rather than as the next beat.

Both are fixed by passing in the verb that just finished: drop it from the options, and promote whatever it unlocks. One consequence is not obvious and is worth building in deliberately. A move with no outstanding work against it should still be offered, and offered high, because the usual reason a step has nothing recorded against it is that nobody has reached it yet. That is precisely when naming it helps.

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
- **Ends every step by offering the next moves.** See [what makes it playable](#what-makes-it-playable-rather-than-merely-runnable). This is the single most commonly missing piece, and its absence is what makes an otherwise good bundle feel like software you operate instead of something you play.
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
- [Superprompt](/concepts/superprompt): what an experience-driven session looks like at the chatbox.
- [The Seam](https://userexperience.wiki/concepts/the-seam): the same boundary problem in a lean-back session, where the fix is to carry the stream rather than to offer the moves.
