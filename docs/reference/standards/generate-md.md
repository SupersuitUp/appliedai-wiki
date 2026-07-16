---
title: "GENERATE.md"
slug: /reference/standards/generate-md
description: "An agent-readable file format for one-time scaffolding recipes. The agent reads the file, interviews the user, and runs the scaffold once to produce a persistent artifact."
---

# GENERATE.md Specification v0.1

*A file format for one-time scaffolding recipes. The agent reads the file, gathers inputs from the user, runs the scaffold once, and verifies the artifact exists. After completion, the recipe stays idle until the operator wants to scaffold a sibling artifact.*

---

{/* last_updated: 2026-05-19 */}
{/* version: 0.1 */}

GENERATE.md is a file format for teaching an AI agent how to scaffold a new artifact from inputs. The agent reads the file, conducts an interview, executes the scaffold steps, and verifies the result. Once the artifact exists, the GENERATE is done.

The format exists because [SKILL.md](https://github.com/anthropics/claude-code/blob/main/docs/skills.md) is the wrong shape for one-time scaffolding work. A SKILL describes an ongoing capability the agent invokes repeatedly (process a transcript every time one arrives; draft a comic every time one is needed). A GENERATE describes a single bootstrap call: scaffold a new wiki, create a new project, spin up a new repository, seed a new dataset. After it runs, the artifact has a terminal state and the recipe steps out of the way.

The two formats compose. A SKILL might invoke a GENERATE during its execution (e.g., a `start-client-engagement` skill calls a `create-client-workspace` GENERATE). A GENERATE often installs a SKILL as part of the artifact it produces (e.g., a wiki-scaffolding GENERATE drops a `process-transcript` skill into the new repo). The two shapes are sibling primitives, not competitors.

## How GENERATE.md differs from related formats

| File | Purpose | Invocation | Terminal state |
|---|---|---|---|
| [SKILL.md](https://github.com/anthropics/claude-code/blob/main/docs/skills.md) | Ongoing capability the agent performs | Many | No |
| [INTEGRATE.md](/reference/standards/integrate-md) | Wire one system into another | Once per wiring (capability persists) | No |
| [ALIGN.md](/reference/standards/align-md) | Evaluate partnership alignment | On demand, evaluative | No |
| **GENERATE.md** | **Scaffold a new artifact from inputs** | **Once per artifact** | **Yes (artifact persists, recipe stays idle)** |
| [BOOMERANG.md](/reference/standards/boomerang-md) | Extract build-ready material from a person | Once per subject (a consumer chat you hand over) | No (a return artifact comes back to you) |

The key axis: SKILL describes a capability; GENERATE describes a one-shot recipe whose output is a persistent artifact. BOOMERANG sits slightly apart from the other four: it is the only format read by another person's AI rather than your own agent, and it frequently rides inside a SKILL or GENERATE as the interview phase.

## Required Metadata

Every GENERATE.md starts with a `last_updated` HTML comment. Agents read this to decide whether the recipe is current. Tooling shifts. CLIs ship. A recipe older than six months should be treated as potentially stale.

```markdown
<!-- last_updated: 2026-05-19 -->
<!-- version: 0.1 -->
```

Use ISO 8601 for the date. Update both fields when you change the scaffold steps.

## Required Sections

Every GENERATE.md must include these sections in order.

### 1. Frontmatter

```yaml
---
name: <kebab-case-name>
description: <one-line description of what this generates and when to use it>
generates: <one-line description of the artifact shape>
---
```

- **`name`**: kebab-case, matches the folder name and any sibling SKILL.md `name:` field (if the GENERATE installs a paired skill).
- **`description`**: one line. State what the recipe produces and the trigger phrases that should activate it. End with "One-time generation; not for ongoing use." so the harness routes it correctly.
- **`generates`**: one line naming the artifact (e.g., "Docusaurus wiki + GitHub repo + Vercel deployment").

### 2. H1 Title

Name the artifact being scaffolded. Verb-action shape preferred.

```markdown
# Starting Your Own Wiki
```

### 3. Opening paragraph

Two to four sentences orienting the agent: this is a one-time run, what the end state looks like, and the rule that the agent must not re-run without explicit operator request.

```markdown
You are running a ONE-TIME GENERATION. After this completes, the artifact
exists at the agreed location and the recipe is done. Do not re-run unless
the operator explicitly says they want a sibling artifact.
```

Above this paragraph, include a **Canonical source** line that links to the rendered page where this GENERATE.md is published. When an operator pastes the file into their harness, the agent (and the operator's future self) should be able to find the canonical page in one click for updates, related material, and the framing that informs the defaults.

```markdown
**Canonical source:** [example.wiki/playbooks/<slug>](https://example.wiki/playbooks/<slug>), the rendered playbook this recipe ships in.
```

### 4. What This Generates

One paragraph or short list naming the exact final artifact. URLs, file paths, deployments, repos. The agent reads this to know what success looks like before executing.

### 5. Interview

The agent asks questions one at a time to gather inputs. Each question is numbered, has clear acceptance criteria, and is captured to a working notes file (e.g., `./<name>-build-notes.md`) as the operator answers.

Two interview discipline rules:

1. **One question at a time.** Do not batch.
2. **Summarize before moving on.** After every three answers, echo the running plan back to the operator so drift can be corrected before execution.

If the operator names a known scenario upfront (e.g., "personal reference wiki"), the agent may short-circuit some questions by confirming the scenario's default profile. Document each scenario's defaults in a "Common scenarios" section near the end.

### 6. Steps

Numbered, imperative, atomic. Each step has observable success criteria.

```markdown
1. Create a new repo from the template.
2. Run `npm run init` to write `wiki.config.json`.
3. Verify the dev server runs at `http://localhost:4444`.
```

Show the user output after each step. Do not chain multiple steps silently.

### 7. Output

The exact artifact location. File paths, URLs, deployment URLs, GitHub repo URL. After execution, the operator should be able to copy these into a bookmark.

```markdown
- GitHub repo: `https://github.com/<org>/<repo>`
- Production URL: `https://<wiki>.wiki`
- Local workspace: `~/Documents/github-repos/<repo>`
- Working notes: `./<name>-build-notes.md`
```

### 8. Verification

Concrete checks the agent runs to confirm the artifact works. Each check has a command and an expected result. Fail-loud: if any check fails, do not declare the GENERATE complete.

### 9. Idempotency

State explicitly what happens if the operator re-invokes the recipe.

The default for most GENERATEs: **refuse to clobber**. If the target location already has an artifact, halt and ask whether the operator wants a sibling at a new name or to explicitly destroy and recreate. Never silently overwrite.

If the GENERATE is naturally idempotent (e.g., re-running produces the same result), say so.

### 10. When to NOT run this again

Explicit guidance for the agent: this is a one-time recipe. If the operator wants to operate on the produced artifact (edit content, add pages, run maintenance), point them at the relevant SKILL.md or follow-up GENERATE.md.

```markdown
After the wiki exists, do NOT re-run this GENERATE to add a page. Use the
`add-wiki-page` skill instead. If the operator wants a second wiki for a
different corpus, run this GENERATE again with a fresh repo name.
```

## Optional Sections

- **Prerequisites.** Accounts, runtimes, CLIs, credentials the operator's machine needs before the scaffold can begin.
- **Common scenarios.** Named profiles with default answers for the interview, so the agent can confirm-and-skip when the operator self-identifies their use case.
- **Pitfalls.** Real failure modes from running the recipe end-to-end.
- **Pairs with.** Sibling SKILLs or GENERATEs that the produced artifact uses ongoing.
- **Alternatives.** Other recipes that achieve a similar outcome with different tradeoffs.

## Skeleton Template

Copy this as a starting point.

````markdown
---
name: <kebab-case-name>
description: <one-line description ending in "One-time generation; not for ongoing use.">
generates: <one-line artifact description>
---

<!-- last_updated: YYYY-MM-DD -->
<!-- version: 0.1 -->

# <Artifact Name>

**Canonical source:** [<wiki>/<playbook-slug>](https://<wiki>/<playbook-slug>), the rendered playbook this recipe ships in.

You are running a ONE-TIME GENERATION. After this completes, the artifact
exists at the agreed location and the recipe is done. Do not re-run unless
the operator explicitly says they want a sibling artifact.

## What This Generates

[One paragraph or list naming the final artifact: URLs, files, deployments.]

## Prerequisites

- [Account, runtime, CLI requirements]

## Interview

Ask each question one at a time. Capture answers in `./<name>-build-notes.md`.

**Q1.** [Question]
**Q2.** [Question]
**Q3.** [Question]
[...]

Echo the running plan back to the operator after every third answer.

## Common scenarios

When the operator names a scenario, confirm the defaults below and short-circuit the interview.

- **[Scenario A].** [Default answers.]
- **[Scenario B].** [Default answers.]

## Steps

1. **[Step name].** [Imperative action.] [Observable success criterion.]
2. **[Step name].** [Imperative action.] [Observable success criterion.]
[...]

Show output to the operator after each step.

## Output

- [Artifact location 1]
- [Artifact location 2]
- Working notes: `./<name>-build-notes.md`

## Verification

```bash
[Concrete check command]
# expected: [success criterion]
```

If any check fails, do NOT declare the GENERATE complete. Diagnose and resolve.

## Idempotency

[Refuse to clobber / sibling-at-new-name / naturally idempotent.]

## When to NOT run this again

[Explicit guidance: this is one-time. Point at the relevant SKILL or follow-up GENERATE for ongoing operations on the produced artifact.]

## Pairs with

- [Sibling SKILL or GENERATE]

## Pitfalls

- **[Failure mode]**: [the fix].
````

## Formatting Rules

- **Imperative voice.** "Create the repo" beats "You should create the repo."
- **One question at a time in the interview.** Do not batch.
- **Numbered atomic steps.** Each step has one job and one observable success criterion.
- **Fenced code blocks** for exact commands.
- **No em dashes.** Use colons, parentheses, or separate sentences.
- **No marketing copy.** The audience is an agent and an operator running the recipe, not a reader evaluating whether to adopt it.

## Filing Convention

A GENERATE recipe lives in its own folder. The folder name matches the `name:` field exactly. The minimum contents:

```
<name>/
  GENERATE.md       # this file
  build-notes-template.md   # optional starter for the working-notes artifact
```

For Claude Code harnesses, the folder typically lives under `~/.claude/skills/<name>/` alongside SKILL.md folders. The agent routes to the right primitive based on the `description` field's trailing marker ("One-time generation; not for ongoing use." → treat as GENERATE; otherwise treat as SKILL).

Other harnesses (Hermes, Codex, Cursor) follow the same folder shape with their own loader paths.

## Worked Example: starting-your-own-wiki

A reference GENERATE recipe ships in the truth-management-wiki playbook at [Starting Your Own Wiki](https://truthmanagement.wiki/playbooks/starting-your-own-wiki). It scaffolds a Docusaurus wiki + GitHub repo + Vercel deployment with the SupersuitUp template plus a chosen subset of the curated-wiki-integrations recipes.

What makes it a GENERATE rather than a SKILL:

- The operator runs it once per new wiki.
- After it completes, the artifact (the live deployed wiki) persists.
- Re-running with the same inputs would not edit the existing wiki; it would conflict or refuse.
- Ongoing operations on the wiki (add a page, run a coherence check) are SKILLs, not GENERATEs.

The sibling [Seed a Personal Learning Wiki](https://truthmanagement.wiki/playbooks/gamify-your-learning-in-life) playbook ships a paired GENERATE that specializes the wiki scaffold for the personal-truth-wiki use case (private repo, password gate, seed-the-first-five-posts, set the maintenance cadence). Two GENERATEs, one shared mechanics layer.

## Version Note

This is v0.1. The spec documents what works in practice rather than designing comprehensively up front. As more GENERATE recipes ship, the spec evolves based on real usage.

## Further Reading

- [SKILL.md](https://github.com/anthropics/claude-code/blob/main/docs/skills.md): The sibling primitive for ongoing capabilities.
- [INTEGRATE.md](/reference/standards/integrate-md): The standard for wiring one system into another.
- [ALIGN.md](/reference/standards/align-md): The standard for partnership alignment.
- [Standards](/reference/standards): The index page for all standards in this family.
