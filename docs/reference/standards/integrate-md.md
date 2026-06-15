---
title: "INTEGRATE.md"
slug: /reference/standards/integrate-md
description: "An agent-readable file format for wiring one system into another. Spec, writing guide, and worked examples for both flavors."
---

# INTEGRATE.md Specification v0.2

*A file format that teaches AI agents how to wire one system into another. The agent reads the file and executes the integration steps autonomously.*

---

{/* last_updated: 2026-05-06 */}

INTEGRATE.md is a file format for teaching AI agents how to wire one system into another. The agent reads the file and executes the integration steps autonomously.

The format works in two flavors that share the same spine:

- **Flavor A: Library Into Codebase.** A library author publishes an INTEGRATE.md so a coding agent in any target codebase can wire the library in. (The original v0.1 use case. Reference: the CESP example below.)
- **Flavor B: Service Into Agent Harness.** An integration recipe maintainer publishes an INTEGRATE.md so a personal AI agent can install the recipe and start taking that action with that service. (Reference: the create-or-update-google-doc example below.)

Both flavors are runnable, dated, and forkable. Both target an agent rather than a human reader. The spine is the same; the flavor-specific sections differ.

## How It Differs from Other Agent Files

| File | Purpose | Audience |
|---|---|---|
| [CLAUDE.md](https://docs.anthropic.com/en/docs/claude-code/memory#claudemd-files) | How to behave in this repo | Agent working inside the repo |
| [AGENTS.md](https://openagents.com) | How to behave in this repo (multi-agent) | Agent working inside the repo |
| [llms.txt](https://llmstxt.org) | What this project is and does | Agent learning about the project |
| [install.md](https://github.com/nicholascelesworthy/install.md) | How to install this tool | Agent setting up dependencies |
| [SKILL.md](https://github.com/anthropics/claude-code/blob/main/docs/skills.md) | How to perform a capability | Agent executing a task |
| **INTEGRATE.md** | **How to wire one system into another** | **Agent performing the integration** |

The key difference: INTEGRATE.md assumes the agent is going to take action, not just learn or behave. It is the connective tissue between two named systems.

## Required Metadata

Every INTEGRATE.md must start with a `last_updated` date. This is how agents know whether the integration instructions are current. Tooling changes. APIs break. CLIs ship. An INTEGRATE.md without a date is untrustworthy. An INTEGRATE.md older than 6 months should be treated as potentially stale.

```markdown
<!-- last_updated: 2026-05-06 -->
```

Place this as the first line of the file, before any content. Use ISO 8601 format (YYYY-MM-DD). Update it every time you change the integration steps.

## Required Sections: Shared Spine

Every INTEGRATE.md, regardless of flavor, must include these three sections.

### 1. H1 Title

Name what's being wired up. Be specific about the outcome.

**Flavor A example:**

```markdown
# Add CESP Sound Pack Support to This CLI
```

**Flavor B example:**

```markdown
# create-or-update-google-doc
```

State what the agent is building or what capability it is gaining. Skip generic titles like "Integration Guide" or "Getting Started."

### 2. What You're Building

One paragraph describing the end state. What will the system do after integration that it does not do now? This orients the agent before it reads any implementation details.

In Flavor B, this section is conventionally titled **"What This Gives You."** Same shape, different framing for the operator audience.

### 3. Verification

A concrete test command and expected result. The agent should be able to run this and know whether integration succeeded.

## Flavor A: Library Into Codebase

In addition to the shared spine, Flavor A requires:

### Read the Codebase First

A directive telling the agent to scan the target project before writing any code. Name the specific patterns it should look for.

```markdown
Read this codebase. Find the event system (command lifecycle, hooks,
callbacks, event emitters, whatever this CLI uses).
```

This prevents the agent from blindly pasting boilerplate without understanding what it is integrating into.

### Integration Steps

Numbered, imperative, concrete steps. Each step should describe what to do, not explain why. Use tables for concept mappings. Use fenced code blocks for exact commands or file contents.

```markdown
## CESP Event Categories

Map this CLI's internal events to these standard categories:

| Category | When to emit |
|---|---|
| session.start | CLI launches, new session begins |
| task.complete | Work finished successfully |
| task.error | Something failed |
```

### Skeleton Template (Flavor A)

Copy this as a starting point:

````markdown
<!-- last_updated: YYYY-MM-DD -->

# Add [Library] Support to This [Project Type]

You are adding [library] support to this [project type]. [One sentence on what the library does and why it matters here.]

## What You're Building

[One paragraph describing the end state after integration.]

## Read the Codebase First

Read this codebase. Find [specific patterns to look for] (e.g., event systems, route handlers, config files, plugin architectures). Understand how this project is structured before writing any integration code.

## [Core Concept Mapping]

Map this [project type]'s internal [events/routes/models] to these [library] categories:

| [Library Concept] | When to use |
|---|---|
| concept.one | [When this maps to something in the target codebase] |
| concept.two | [When this maps to something else] |

## [Data Format / Schema]

[Show the key data structures the agent needs to work with.]

```json
{
  "example": "manifest or config"
}
```

## Quick Start: Just Want [Simplest Case]?

[Shortcut for the minimal integration. Skip the full setup.]

## [Full Integration Steps]

[Numbered steps for the complete integration.]

## Implementation Checklist

1. Read the codebase and identify [what to look for]
2. Create a [module/file] that handles [responsibilities]
3. Wire [target codebase events] into [library concepts]
4. Add configuration ([list settings])
5. Test it: [concrete test command and expected result]

## Quick Test

[Exact commands to verify the integration works.]

## Links

- [Spec/docs URL]
- [Registry/package URL]
- [Reference implementation URL]
````

## Flavor B: Service Into Agent Harness

In addition to the shared spine, Flavor B requires:

### Prerequisites

The accounts, runtimes, CLIs, and credentials the agent's machine must have available before setup can begin.

```markdown
- macOS
- Node.js 18 or newer
- A Google account
- The `gog` CLI installed
```

This section is Flavor-B-specific. Library-into-codebase recipes assume the agent already has the target codebase open. Service-into-harness recipes have to specify what the agent's environment needs first.

### Setup

Numbered, concrete shell commands. Include the auth flow (browser-based OAuth, token paste, env var setup).

Use placeholders for personal info (`you@example.com`, `<your-token>`). Never hardcode real credentials or emails.

### Usage From Your Agent

What trigger phrases activate the recipe. This couples the recipe to the SKILL.md it ships alongside.

```markdown
Once your agent can see this skill (via SKILL.md), trigger phrases like:

- "create a google doc with these contents"
- "update the google doc"
- "make a google doc titled X"

...will produce a properly-formatted Google Doc and return the URL.
```

### Common Gotchas

Real failure modes from end-to-end testing. Be specific. Include the error message and the fix.

### Alternatives

At least one alternative path. Lets the operator pick what fits them.

### Maintainer

Who stewards this recipe. The operator picking it up needs to know who to ping when something breaks.

```markdown
Stewarded by [@username](https://github.com/username). Open an issue or PR if anything in this recipe breaks.
```

### Skeleton Template (Flavor B)

Copy this as a starting point:

````markdown
<!-- last_updated: YYYY-MM-DD -->

# [skill-name-in-kebab-case]

[One sentence on what wiring this gives the operator.]

## What This Gives You

- [Capability one your agent gains]
- [Capability two]
- [Capability three]

## Why This Recipe

[The default failure mode. The recipe's chosen path and why it's the right tradeoff right now.]

## Prerequisites

- [OS / runtime requirements]
- [Accounts / API keys / OAuth scopes]
- [Other CLIs the recipe builds on]

## Setup

### 1. [First step name]

```bash
[concrete command]
```

### 2. [Second step name]

```bash
[concrete command, with placeholders for personal info]
```

### 3. Verify

```bash
[smoke-test command]
```

If you see [expected output], you are wired up.

## Usage From Your Agent

Once your agent can see this skill (via SKILL.md), trigger phrases like:

- "[trigger phrase one]"
- "[trigger phrase two]"

...will [the action]. See SKILL.md for the full flag reference.

## Common Gotchas

- **[Failure mode one]**: [the fix]
- **[Failure mode two]**: [the fix]

## Last Verified

YYYY-MM-DD on [OS], [runtime version], [primary CLI/MCP version].

## Alternatives

- **[Alternative one]**: [what it is, when to prefer it].
- **[Alternative two]**: [what it is, when to prefer it].

## Maintainer

Stewarded by [@username](https://github.com/username). Open an issue or PR if anything in this recipe breaks.
````

## Optional Sections

These are useful but not required, in either flavor:

- **Quick Path**: A shortcut for the simplest case (e.g., bundling one pack instead of supporting a registry; copy-paste path instead of full CLI install).
- **Cross-Platform Notes**: Platform-specific commands or behaviors.
- **Configuration**: Settings the integration should expose.
- **Links**: Spec URLs, registries, reference implementations.

## What to Omit

INTEGRATE.md is not documentation. Leave out:

- Marketing copy or feature comparisons
- Changelogs or version history
- Full API reference (link to it instead)
- Installation instructions for adjacent tools (that's install.md's job)
- Tutorials or explanations aimed at humans

The audience is an agent that already has context on what it is trying to accomplish. Give it the mapping, not the pitch.

## Formatting Rules

- **Imperative voice.** "Create a module" beats "You should create a module."
- **Tables for mappings.** When showing how concepts in one system map to concepts in another, use tables.
- **Fenced code blocks** for exact commands, file contents, and code snippets.
- **Short sentences.** Agents parse structure better than prose.
- **No em dashes.** Use colons, parentheses, or separate sentences.

## Publishing Your INTEGRATE.md

### README Reference

Your project's README.md should link to the INTEGRATE.md file. This is how developers (and their agents) discover it.

**Flavor A README snippet:**

```markdown
## Integration

Want to add [library] support to your project? Copy the contents of
[INTEGRATE.md](./INTEGRATE.md) into your AI coding agent and let it
handle the wiring.
```

**Flavor B README snippet:**

```markdown
## Install

Want to install this recipe in your own agent harness? See
[INTEGRATE.md](./INTEGRATE.md) for the full setup, or hand the file
to your agent and let it walk you through.
```

### Surfacing on Your Website

If your project has a marketing site or docs site, render the INTEGRATE.md content there too. The file in the repo is the source of truth. The website is a distribution channel.

The pattern:

1. Keep `INTEGRATE.md` at the repo root (Flavor A) or inside the recipe folder (Flavor B). This is where agents and developers find it on GitHub.
2. Have your site read that file at build time and render it on a page like `/integrate` or `/recipes/<name>`.
3. The README links to both: the raw file for agents, the rendered page for humans browsing the site.

This way you maintain one copy of the integration instructions. The site stays in sync automatically on every deploy.

## Version Note

This is v0.2. The spec evolves based on real usage:

- **v0.1** covered Flavor A only (library into codebase). Reference implementation: the CESP / OpenPeon example.
- **v0.2** generalizes the spec to cover both flavors after observing the recipe shape stabilize in the wild. The shared spine (H1, "What You're Building," Verification, `last_updated`) is unchanged. New Flavor B sections (Prerequisites, Setup, Usage From Your Agent, Common Gotchas, Alternatives, Maintainer) are documented alongside the original Flavor A sections (Read the Codebase First, Integration Steps).

The spec documents what works in practice rather than designing a comprehensive format upfront. As more libraries and recipes publish INTEGRATE.md files, the spec will continue to evolve based on real usage patterns.

## Writing guide

Practical advice for authoring an effective INTEGRATE.md. The spec above defines the format. This section helps you write one that actually works.

The advice below applies to both flavors unless a section is explicitly labeled.

### Start from the Verification Test

Write your Quick Test section first. What command should the agent run to prove the integration works? What output confirms success?

Work backwards from there. Every section in your INTEGRATE.md should contribute to making that test pass. If a section doesn't help the agent reach that outcome, cut it.

### Map Your Concepts to Unknown Patterns

Your library has its own vocabulary. The target codebase has different vocabulary for similar things. Your job is to bridge the gap.

Bad:
```markdown
Register a CESP event emitter in your application lifecycle.
```

Good:
```markdown
Find this CLI's event system (command lifecycle, hooks, callbacks,
event emitters, whatever it uses). Map those events to CESP categories.
```

The first version assumes the agent knows what a "CESP event emitter" means in context. The second tells it what to look for in whatever codebase it's working in.

### Don't Assume Language or Framework

INTEGRATE.md targets any codebase. Your examples can show specific languages (agents understand code), but your instructions should be language-agnostic.

Bad:
```markdown
Add this to your package.json dependencies.
```

Good:
```markdown
Add the CESP module to your project's dependencies using whatever
package manager this project uses.
```

If your library only supports one language, say so upfront. But keep the integration steps focused on what to do, not how a specific framework does it.

### Give the Agent Decision Points, Not Decisions

Agents work best when you describe the tradeoff and let them choose based on the target codebase.

Bad:
```markdown
Store packs in ~/.mylib/packs/.
```

Good:
```markdown
Pick a storage path for packs. Common patterns:
- ~/.yourclitool/packs/ (CLI-specific)
- ./sounds/ (bundled in repo)
- Wherever makes sense for this tool
```

The agent knows the target project's conventions. Let it apply them.

### Writing for Flavor B (Service Into Agent Harness)

Flavor B recipes wrap external CLIs and MCPs that ship and break independently. The discipline is different from Flavor A in three places:

**Pin Versions In "Last Verified."** Do not just write the date. Include the OS, runtime version, and primary CLI/MCP version you tested with.

Bad:

```markdown
## Last Verified

2026-05-06.
```

Good:

```markdown
## Last Verified

2026-05-06 on macOS, Node 22, gog CLI 0.5.x.
```

The version pinning is what lets a future operator reading your recipe diagnose breakage when a newer CLI version ships incompatibly.

**Sanitize Personal Info In Setup Commands.** Every shell command must use placeholders for emails, tokens, and paths. Real credentials never go in a published recipe. The convention:

- Emails: `you@example.com`
- Tokens: `<your-token>`
- Doc IDs / file IDs: `<doc-id>`

Operators copy-pasting your recipe should be able to swap one variable for their own value, not edit twelve lines.

**Always List Alternatives.** A Flavor B recipe wraps a chosen path through a competitive ecosystem. The Alternatives section is mandatory, not optional. List at least one other tool that could deliver the same capability with a different tradeoff. This protects future operators when your primary CLI ships a breaking change.

**Name A Maintainer.** A library author at a known GitHub handle. Operators picking up the recipe need a single human to ping when the underlying tooling shifts or a gotcha surfaces that the recipe missed.

**Common Gotchas Are Not Optional.** Flavor B recipes wire OAuth flows, env vars, and Keychain entries. Things go wrong. The first time you run the recipe end-to-end on a fresh machine is when you find the gotchas. Capture them in the recipe immediately. Skipping this section is how recipes get a reputation for "almost working."

### Writing for Flavor A (Library Into Codebase)

Flavor A recipes assume the agent is already inside the target codebase. The discipline is about teaching that agent to map your library's vocabulary onto whatever it finds.

Key Flavor A move: parenthetical lists of patterns the agent should look for, not assumptions about which pattern the codebase uses. Flavor B recipes can name the runtime explicitly (Node 18+); Flavor A recipes typically cannot.

### Common Mistakes

**Writing for Humans Instead of Agents.** INTEGRATE.md is not a tutorial. Don't explain concepts. Don't provide context about why your library exists. Don't include "Getting Started" sections that walk through prerequisites. The agent already has context. It needs the mapping.

**Skipping the Quick Path.** Most integrations have a simple case and a full case. If someone just wants the basics, give them a shortcut. This prevents agents from over-engineering a simple integration.

**Vague Verification.** "Test that it works" is not verification. "Run `mycli sounds install peon`, then start the CLI. You should hear audio on startup" is verification. The agent needs to know exactly what success looks like.

**Bundling Install Instructions.** If your library requires installation, that belongs in install.md. INTEGRATE.md assumes the library is already available. Don't mix the two concerns.

**Too Much Detail on Internals.** Link to your API docs. Don't reproduce them. The agent can fetch reference material if it needs it. INTEGRATE.md should contain the integration logic, not the library's full surface area.

### Checklist Before Publishing

**Shared Spine (both flavors)**

- Does the file start with `{/* last_updated: YYYY-MM-DD */}`?
- Does the H1 title state what's being built (Flavor A) or what skill is being installed (Flavor B)?
- Does "What You're Building" / "What This Gives You" describe the end state in one paragraph?
- Does verification include a concrete command and expected result?
- Is the file free of marketing copy, changelogs, and install instructions for adjacent tools?

**Flavor A only (Library Into Codebase)**

- Does the file tell the agent to read the codebase before writing code?
- Are integration steps numbered and imperative?
- Are concept mappings shown as tables?
- Can an agent in a codebase it's never seen follow these steps?

**Flavor B only (Service Into Agent Harness)**

- Does Prerequisites list every account, runtime, and CLI the operator's machine needs?
- Does Setup use placeholders for personal info (`you@example.com`, `<token>`)?
- Does "Last Verified" include OS + runtime version + primary CLI version, not just a date?
- Does Alternatives list at least one other path with its tradeoff?
- Does Common Gotchas reflect real failure modes from running the recipe end-to-end?
- Is a Maintainer named with a real GitHub handle?
- Does the folder name match the SKILL.md `name:` field exactly?

## Example: CESP (Flavor A)

The [OpenPeon project](https://openpeon.com) publishes an INTEGRATE.md that teaches AI agents how to add sound pack support to any CLI. It's the reference implementation that informed the INTEGRATE.md spec. The live version sits at [openpeon.com/integrate](https://openpeon.com/integrate).

What makes it effective, section by section:

**The Title.** "Add CESP Sound Pack Support to This CLI". States exactly what the agent is building. The title names the library (CESP), the capability (sound pack support), and the target (this CLI). Not "CESP Integration" or "Sound Pack Setup."

**The Opening Paragraph.** One sentence orienting the agent: what it's doing and what standard it's following.

**What You're Building.** One paragraph describing the end state. The agent knows the goal before reading any implementation details.

**Read the Codebase First.** Gets its own section so the agent treats it as a distinct step. The parenthetical list ("command lifecycle, hooks, callbacks, event emitters") gives the agent multiple patterns to search for without assuming which one the target codebase uses.

**The Concept Mapping Table.** This is the core of the integration. CESP has categories. The target CLI has events. The table tells the agent how to bridge them. The "When to emit" column uses language that applies to any CLI, not CESP-specific terminology.

```markdown
| Category | When to emit |
|---|---|
| session.start | CLI launches, new session begins |
| task.complete | Work finished successfully |
| task.error | Something failed |
| input.required | Blocked waiting for user input or approval |
```

The file splits categories into "Core" (implement all 6) and "Extended" (optional). This gives the agent clear priorities.

**The Data Format Section.** Shows the manifest format with a realistic example. The agent needs to parse this structure, so showing it concretely is better than describing it abstractly. The section also specifies lookup order and path resolution rules.

**The Quick Path.** Prevents over-engineering. If the target CLI just wants basic sound support, the agent can take a shortcut instead of implementing the full registry system.

**Cross-Platform Audio.** Platform-specific commands in fenced code blocks. The agent can detect the target platform and pick the right approach. Each command includes volume control so the agent doesn't have to figure out each tool's volume flag.

**The Implementation Checklist.** Numbered, imperative, ordered by dependency. The checklist gives the agent a clear execution plan.

**The Verification.** Concrete. Testable. The agent knows exactly what command to run and what result to expect. No ambiguity.

**What It Omits.** No description of what CESP is or why it exists. No dependency install steps. No full API documentation. No changelogs. Everything serves one purpose: getting the agent from "codebase with no sound support" to "codebase with working CESP integration."

## Example: create-or-update-google-doc (Flavor B)

A reference integration recipe ships at `integrations/create-or-update-google-doc/` for wiring any personal AI agent up to publish Google Docs from markdown. Its `INTEGRATE.md` is the reference INTEGRATE.md for **Flavor B: Service Into Agent Harness**.

What makes it effective, section by section:

**The Title.** "create-or-update-google-doc". Verb-action shape, kebab-case. Matches the folder name and the SKILL.md `name:` field exactly. Skip the marketing version ("Google Docs Integration") in favor of the operational verb.

**The Opening Paragraph.** One sentence. Names the surface (Google Docs), the capability (create / update / share from markdown), and the constraint (without leaving the terminal). The agent knows the goal before reading any setup details.

**What This Gives You.** The shared spine's "What You're Building" section is conventionally renamed "What This Gives You" in Flavor B. The shape is identical: a short list of capabilities the operator's harness will gain after install.

```markdown
- Your agent can create a new Google Doc from a markdown file
- Your agent can update an existing Google Doc with new content
- Your agent can set sharing permissions ("anyone with link", folder-scoped, or private)
- Markdown formatting (headings, bold, italic, lists, code, tables, links, images) survives the trip
```

**Why This Recipe.** Two paragraphs that name the failure mode of naive approaches and explain the recipe's chosen path. Honest about the tradeoff: this is the right path because the alternatives have specific problems. The "Why" exists so an operator skimming three competing recipes can pick the one that matches their needs without running all three.

**Prerequisites (Flavor B Required).** The accounts, runtimes, and CLIs the agent's machine needs before setup can begin.

```markdown
- macOS (the gog CLI's OAuth flow uses Keychain; Linux works with minor adjustments)
- Node.js 18 or newer
- A Google account
- The gog CLI installed
```

This section is what distinguishes Flavor B from Flavor A: a Flavor A agent is already inside the target codebase and can scan it. A Flavor B agent is wiring an external service into the operator's machine, so the recipe has to declare what that machine needs first.

**Setup (Flavor B Required).** Numbered, concrete, copy-pasteable.

```markdown
### 1. Install gog

\`\`\`bash
brew install saucelabs/tap/gog
\`\`\`

### 2. Authorize the docs service

\`\`\`bash
gog auth add you@example.com --services docs
\`\`\`

### 3. Drop this folder into your agent harness

\`\`\`bash
cp -r integrations/create-or-update-google-doc ~/.claude/skills/create-or-update-google-doc
\`\`\`

### 4. Set your email environment variable

\`\`\`bash
export GOG_EMAIL=you@example.com
\`\`\`

### 5. Verify

\`\`\`bash
node integrations/create-or-update-google-doc/scripts/auth.mjs
\`\`\`

If you see an access token printed, you are wired up.
```

Notice the placeholder discipline: every personal-info slot uses `you@example.com` instead of a real email. The verify step is the shared-spine "Verification" requirement: a concrete command and a concrete success criterion.

**Usage From Your Agent (Flavor B Required).** The trigger phrases couple the recipe to the SKILL.md it ships alongside. A Flavor B integration is always a pair: `INTEGRATE.md` (this file) plus `SKILL.md` (drop-in skill definition the agent's harness reads to route trigger phrases). Neither file is complete without the other.

**Common Gotchas (Flavor B Required).** Real failure modes from running the recipe end-to-end. Each entry names the symptom and the fix.

```markdown
- Token cache stale: If you see auth errors, delete scripts/.token-cache.json and try again.
- gog credentials missing: If ~/Library/Application Support/gogcli/credentials.json doesn't exist, run gog auth add again.
- Wrong email in keyring: Make sure GOG_EMAIL matches exactly the email you authorized.
- Permissions on the new doc: New docs are private by default. Pass --share anyone or use --folder <id>.
- Updating instead of creating: Always pass --update <doc-id> when updating an existing doc.
```

**Last Verified (Flavor B Required).** The most important Flavor B addition. Service-into-harness recipes wrap external CLIs and MCPs that ship and break independently. The date and version pinning let any future operator (and any future agent reading this recipe) see at a glance whether the recipe is current.

```markdown
2026-05-06 on macOS, Node 22, gog CLI 0.5.x.
```

The standard for staleness: an INTEGRATE.md older than 6 months should be treated as potentially stale.

**Alternatives (Flavor B Required).** At least one alternative path. Flavor B recipes wrap external tooling that has competitors; an honest recipe lists the closest competitors with their tradeoffs so the operator can pick whichever fits their volume and risk tolerance. This is also a hedge against the underlying primary path going stale.

**Maintainer (Flavor B Required).** The named human who keeps the recipe current. Flavor B recipes live in public banks where many recipes share a repo. The maintainer field tells the operator picking up the recipe who to ping when the underlying tooling shifts.

### What This Example Demonstrates

The pattern that makes the recipe work end to end:

1. **Verb-action title** matching the folder name and SKILL.md `name:` field.
2. **One paragraph** orienting the agent to what the wiring delivers.
3. **Prereqs declared upfront** so the agent does not start setup with a missing dependency.
4. **Numbered setup steps** with placeholder discipline (no real emails, tokens, or paths).
5. **Verify command** with a concrete success criterion.
6. **Common gotchas** sourced from real install runs, not imagined.
7. **Dated** so future readers know whether to trust it.
8. **Alternatives + maintainer** so the recipe survives churn in the underlying tools.

Copy this shape for any Flavor B recipe. The names of the sections are not load-bearing; the spine and the discipline are.

## Further Reading

- [ALIGN.md](/reference/standards/align-md): The companion spec for partnership alignment
- [Standards](/reference/standards): The index page for both formats
