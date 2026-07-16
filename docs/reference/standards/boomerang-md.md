---
title: "BOOMERANG.md"
slug: /reference/standards/boomerang-md
description: "An agent-readable file format for a prompt you hand to another person. An AI interviews them on their own time and returns build-ready material to you. The family's first consumer-facing format."
---

# BOOMERANG.md Specification v0.2

*A file format for a prompt you hand to another person. They paste it into their own AI, it interviews them on their own time, and it writes their answers back in a structure you can build from. The prompt went out, did the extraction, and came back to you full.*

---

{/* last_updated: 2026-07-16 */}
{/* version: 0.2 */}

BOOMERANG.md is a file format for teaching a consumer AI how to interview a person and return build-ready material. You write it, hand it to the subject, and they paste it into ChatGPT, Claude, or Grok. The AI conducts the interview, then writes a structured artifact the subject sends back to you. It is the codified form of the [Boomerang Prompt](/concepts/boomerang-prompt) pattern.

The format exists because every other standard in this family is read by *your* agent. A BOOMERANG.md is pasted by *another person* into *their* AI. That single difference drives everything about the shape: there is no filesystem, no harness routing, no bash verification. There is a person, a chat window, and a written artifact that has to come back clean enough to build from.

## The consumer-facing distinction

This is the family's first format aimed at a consumer chat rather than an operator's harness. Own that difference or the format reads muddled.

| File | Purpose | Invocation | Runs where |
|---|---|---|---|
| [SKILL.md](https://github.com/anthropics/claude-code/blob/main/docs/skills.md) | Ongoing capability the agent performs | Many | Your harness |
| [INTEGRATE.md](/reference/standards/integrate-md) | Wire one system into another | Once per wiring | Your harness |
| [ALIGN.md](/reference/standards/align-md) | Evaluate partnership alignment | On demand | Your harness |
| [GENERATE.md](/reference/standards/generate-md) | Scaffold a new artifact from inputs | Once per artifact | Your harness |
| **BOOMERANG.md** | **Extract build-ready material from a person** | **Once per subject** | **A consumer chat you hand to someone** |

The key axis: the other four are recipes your agent executes. A BOOMERANG.md is a payload you give away. It composes with the others rather than competing: a SKILL or GENERATE recipe often embeds a boomerang as its front half (the [Generate a Microautobiography](/playbooks/generate-a-microautobiography) GENERATE embeds one; the [Generate a Build-Ready Spec](/playbooks/generate-a-spec) SKILL ships one).

## The two-part contract

Everything in a boomerang serves a two-part contract. The second part is what makes it boomerang rather than just chat.

**Part 1: Interview me.** The AI asks one question at a time, waits for the full answer, never stacks questions, and follows up when an answer is thin. It gets the areas to cover in rough order but is told to follow the energy of the answers rather than march a checklist, and to gather far more than it will use. It does not propose tools or solutions while gathering.

**Part 2: Write it, build-ready.** When the subject signals they are done, the AI stops interviewing and writes the corpus in an exact structure you specify: the sections, the order, how to label each one, what to bold, how long. This is the difference between a transcript and something you can build from. You are designing the shape of the return, not just the questions.

## Required Metadata

Every BOOMERANG.md starts with a `last_updated` and `version` comment. The interview craft and the return schema both drift; a reader uses the date to judge staleness.

```markdown
<!-- last_updated: 2026-07-15 -->
<!-- version: 0.1 -->
```

Use ISO 8601 for the date. Update both fields when you change the interview areas or the return structure.

This `version` is the file's own version, which moves as you refine this particular boomerang. It is distinct from the version of *this standard* the file targets, which every boomerang declares separately (see Conformance below). Keeping them apart lets an instance evolve without implying the standard changed, and lets the standard bump without silently invalidating every instance.

## Required Sections

Every BOOMERANG.md must include these sections in order. Note the split: a few sections are operator-facing (you read them), and one is the paste-in payload (the subject pastes it). Keep that boundary explicit.

### 1. Frontmatter

```yaml
---
name: <kebab-case-name>
description: <one-line description of what it extracts and from whom, ending in "Consumer-facing boomerang prompt; hand to a person, not routed by the harness.">
returns: <one-line description of the build-ready artifact that comes back>
conforms_to: <this standard's URL> v<version>
---
```

- **`name`**: kebab-case, matches the folder name and any paired SKILL.md or GENERATE.md `name:` field.
- **`description`**: one line. State what the boomerang extracts and who runs it, then the trailing marker so a harness does not mistake it for a recipe it should execute itself.
- **`returns`**: one line naming the artifact the subject sends back (for example "a nine-section build-ready spec" or "narrated life-story chapters").
- **`conforms_to`**: the URL of this standard plus the version this file targets (for example `https://appliedai.wiki/reference/standards/boomerang-md v0.2`). The machine-readable half of the conformance declaration; see Conformance.

### Conformance

Every boomerang declares which version of this standard it conforms to, in two places: the `conforms_to` frontmatter field above (machine-readable), and a visible line beside the Canonical source (human-readable):

```markdown
**Conforms to:** [BOOMERANG.md](/reference/standards/boomerang-md) v0.2
```

This is non-negotiable. A boomerang with no version reference cannot be checked against the contract it claims to follow, and a reader cannot tell whether it predates a breaking change to the standard. When this standard bumps, an instance keeps its old `conforms_to` version until someone updates it against the new one, which is exactly the signal you want.

### 2. H1 Title

Name the return, not the act of interviewing. Noun-phrase preferred.

```markdown
# Build-Ready Spec Boomerang
```

### 3. Orientation

Two to four sentences for the operator: what this extracts, who you hand it to, that the return is build-ready, and that it is one run per subject. Above or within it, include a **Canonical source** line linking the rendered page this boomerang ships in, and a **Conforms to** line naming this standard with the version the file targets (see Conformance above), so an operator who receives only the file can find both the current version and the contract it follows in one click.

### 4. Send Note

The exact line you give the subject when you hand it over. This is boomerang-specific and load-bearing. It must tell them to paste the whole prompt into a fresh chat, answer by dictation, and send back the finished artifact.

```markdown
**Send note:** "Paste this whole thing into a new ChatGPT, Claude, or Grok
chat. Answer out loud using dictation, not live voice mode. When it writes
your <artifact>, paste that into a Google Doc and send me the link."
```

### 5. The Paste-In Prompt

The payload, clearly delimited (a fenced block) so the operator knows exactly what to hand over. It contains the full two-part contract, written in the second person to the subject:

- **Part 1: Interview me.** The interview contract (one question at a time, dictation, follow the energy, push once when thin, gather more than you use, do not propose solutions) plus the areas to cover in rough order.
- **Part 2: Write it.** The exact return structure: every section heading, its order, what goes in it, what to bold, how long. End with the delivery instruction (paste into a Google Doc, set link sharing, send it on).

### 6. Delivery

Operator-facing. What comes back, in what form (a Google Doc by default), and what you do with it once it lands. The send-back is the default, not a requirement: when the return serves the subject directly (a job fit brief, a personal plan), say so here and make sharing back optional, reserved for the case where the operator is helping them act on it. A subject who keeps the doc and runs with it is a success, not a broken loop.

## Optional Sections

- **Common scenarios.** Named subject profiles with a default area-set, so the interview can short-circuit when the subject self-identifies.
- **Composition.** If this boomerang is the front half of a SKILL or GENERATE, name the recipe it feeds.
- **Pitfalls.** Real failure modes from running the boomerang end to end.

## The Two Quality Levers

These are non-negotiable and belong in every boomerang. They are the difference between a rich return and a thin one.

- **Dictation, not live voice mode.** Tell the subject to answer out loud using dictation that transcribes to text. A person who would type three flat sentences will speak three warm paragraphs. Live or advanced voice mode leaves no written artifact to send you; the transcriber is the tool, the live phone-call mode is the trap.
- **A generous frame.** Where the return is about the subject, give the writeup a device (for example a named AI narrator speaking in the third person) that licenses it to say confident, warm, or precise things the subject would never write about themselves. The frame does the work the subject's modesty blocks.

Two more habits raise quality: tell the AI to gather far more than it will use, and specify a typed return, not a transcript. A boomerang that dumps the raw conversation has failed Part 2.

## Composition

A boomerang is a primitive, not always a whole deliverable. It is frequently the front half of a larger recipe:

- A **SKILL** that produces a document ships the boomerang as the gathering step and keeps the building step for the operator. See [Generate a Build-Ready Spec](/playbooks/generate-a-spec).
- A **GENERATE** that scaffolds an artifact embeds the boomerang as its interview phase, then runs the build phase in a harness. See [Generate a Microautobiography](/playbooks/generate-a-microautobiography).

When a boomerang stands alone (no build phase, the return is the deliverable), it ships as its own file with nothing wrapped around it. Standalone returns often serve the subject rather than the operator, which makes the send-back optional (see Delivery above): the boomerang shape still earns its keep through the interview contract and the typed return, even when nothing needs to come back to you.

## Filing Convention

A boomerang lives beside the recipe it serves, or on its own when it stands alone.

```
<name>/
  BOOMERANG.md          # this file, always this name
```

Always name the file `BOOMERANG.md`, the canonical name, whether it stands alone or ships as the front half of a SKILL or GENERATE. Keep the name even when embedded, the same way `SKILL.md` and `GENERATE.md` keep theirs: a recipe folder that holds `SKILL.md` (or `GENERATE.md`) next to `BOOMERANG.md` reads at a glance as a capability plus its interview front-half, and the recipe references the boomerang by that name. Match the folder to the `name:` field.

Publish the paste-in prompt at a stable URL so the operator can hand over a link instead of a file. A statically-served copy (for example under a wiki's `static/`) lets the subject open the raw prompt in one click.

## Formatting Rules

- **Second person in the payload.** The paste-in prompt addresses the subject and their AI directly ("interview me", "write my spec"). The operator-facing sections address the operator.
- **Delimit the payload.** Fence the paste-in block so the boundary between what the operator reads and what the subject pastes is unambiguous.
- **Name the return schema exactly.** Headings, order, bolding, length. Vagueness in Part 2 is the single most common cause of a return you cannot build from.
- **No em dashes.** Use colons, parentheses, or separate sentences.
- **Keep the two levers explicit.** Never leave dictation or the generous frame implied.

## Skeleton Template

Copy this as a starting point.

````markdown
---
name: <kebab-case-name>
description: <what it extracts and from whom, ending in "Consumer-facing boomerang prompt; hand to a person, not routed by the harness.">
returns: <one-line artifact description>
conforms_to: https://appliedai.wiki/reference/standards/boomerang-md v0.2
---

<!-- last_updated: YYYY-MM-DD -->
<!-- version: 0.1 -->

# <Return Name> Boomerang

**Canonical source:** [<wiki>/<page-slug>](https://<wiki>/<page-slug>): the rendered page this boomerang ships in.
**Conforms to:** [BOOMERANG.md](https://appliedai.wiki/reference/standards/boomerang-md) v0.2

[Orientation: what this extracts, who you hand it to, that the return is
build-ready, one run per subject.]

**Send note:** "Paste this whole thing into a new ChatGPT, Claude, or Grok
chat. Answer out loud using dictation, not live voice mode. When it writes
your <artifact>, paste that into a Google Doc and send me the link."

## The Paste-In Prompt

```text
You are [role]. Your job is to interview me, then write [artifact].

PART 1: INTERVIEW ME.
Ask one question at a time. Wait for my full answer. Never stack questions.
Do not propose tools or solutions while gathering. I will answer by voice
dictation, so my answers will be messy; tighten them silently. Follow the
energy of my answers and push once when an answer is thin. Gather far more
than you will use.

Cover these areas, roughly in order, following the energy not a checklist:
1. [Area]
2. [Area]
[...]

PART 2: WRITE IT.
When I say I am done, stop interviewing and write [artifact] in this exact
structure:

# [Title]
## [Section]
## [Section]
[...]

Rules: [bolding, length, be concrete, name unknowns rather than invent].
No em dashes.

FINALLY: tell me to paste the result into a Google Doc, set it to "anyone
with the link can view," and send that link on. The doc is what I share,
not this chat.

Start now with Part 1. Ask me only the first question, then wait.
```

## Delivery

[What comes back, in what form, and what the operator does with it.]

## Common scenarios

- **[Scenario].** [Default area-set.]
````

## Worked Examples

- **[Generate a Build-Ready Spec](/playbooks/generate-a-spec).** A boomerang that interviews someone who wants something built and returns a nine-section spec led by a triage-ready TL;DR. Ships as the front half of a SKILL; the raw paste-in prompt is served statically.
- **[Generate a Microautobiography](/playbooks/generate-a-microautobiography).** A boomerang that interviews someone across seven areas of their life and returns narrated chapters. Ships as the front half of a GENERATE, whose build phase turns the return into a deployed site.
- **[Job Fit Brief Boomerang](pathname:///skills/job-fit-brief/BOOMERANG.md).** A boomerang that interviews someone figuring out what work suits them and returns evidence-backed role directions plus real local openings. Stands alone (no build phase) and extends the contract with a Part 3 web-search step after the write.

All three are conforming instances of this spec: the same two-part contract, the same two levers, different areas and different return schemas.

## Version Note

This is v0.2. The spec documents what works in practice rather than designing comprehensively up front. As more boomerangs ship, the spec evolves based on real usage.

- **v0.2 (2026-07-16):** the send-back is explicitly optional when the return serves the subject directly; Delivery must state which way the artifact goes.
- **v0.1 (2026-07-15):** initial version.

## Further Reading

- [Boomerang Prompt](/concepts/boomerang-prompt): The concept and doctrine this spec formalizes.
- [Interview Prompts](/disciplines/interview-prompts): The prompt-design craft behind Part 1.
- [GENERATE.md](/reference/standards/generate-md): The scaffolding format a boomerang often feeds.
- [Standards](/reference/standards): The index page for all formats in this family.
