---
name: generate-a-boomerang
description: Author a new BOOMERANG.md, a paste-in prompt you hand another person so their AI interviews them on their own time and returns build-ready material. Gathers what you want back and from whom, designs the return schema first, then writes a conforming BOOMERANG.md instance. Use when you say "make a boomerang", "boomerang this", "build me one of those interview prompts", or someone asks for a prompt where an AI interviews a person and sends back a structured writeup.
---

# Generate a Boomerang

Someone has material in their head that you need in build-ready form: their story, their project, their situation, their preferences. You could interview them yourself, but that costs a scheduled hour and most of it is transcription. This skill authors a [Boomerang Prompt](https://appliedai.wiki/concepts/boomerang-prompt) instead: a single paste-in prompt the person runs in their own AI chat, which interviews them one question at a time and writes their answers back in a structure you specified. The output of this skill is a conforming [BOOMERANG.md](https://appliedai.wiki/reference/standards/boomerang-md) file you hand over.

The standard is the contract; this skill is the authoring process. When they disagree, the standard wins.

## When to use this

- The raw material lives in another person's head and you want it back structured, not as a transcript.
- The subject can run a chat tool and answer asynchronously, on their own time.
- You want one clean artifact back per subject (a spec, a brief, a story corpus, a profile).

Do not use it when you already have the material (boomerangs are for extraction, not for dressing up facts you hold), when the conversation itself is the point, or when two sentences would do.

## How to run it

### 1. Read the standard

Read the [BOOMERANG.md standard](https://appliedai.wiki/reference/standards/boomerang-md) before drafting. It defines the required sections, the frontmatter, the conformance declaration, and the skeleton template you will fill in. Do not write from memory of it.

### 2. Gather the design inputs from the operator

Four questions decide everything. Ask whichever the operator has not already answered:

1. **What comes back?** Name the return artifact in one line (a build-ready spec, a job fit brief, narrated life-story chapters). This becomes the `returns:` field and the H1.
2. **Who is the subject?** Their relationship to the operator, their comfort with chat tools, and anything that shapes tone (a parent, a client, a friend who hates forms).
3. **What must the interview surface?** The facts, stories, numbers, and constraints the return cannot be built without.
4. **What happens to the return?** What the operator does when the doc lands. This shapes what "build-ready" means and writes the Delivery section.

### 3. Design the return schema first

Write Part 2 before Part 1. Specify the return exactly: every section heading, its order, what goes in each, what to bold, how long. Vagueness here is the single most common cause of a return you cannot build from. If the return should say generous things about the subject, give it a device (a third-person narrator, a recruiter's voice, an advocate's frame) that licenses warmth the subject's modesty would block.

### 4. Derive the interview areas from the schema

Work backward from each return section to the questions that fill it. Aim for five to nine areas, in rough order, and tell the AI to follow the energy of the answers rather than march the checklist. Bake in the interview contract from the standard: one question at a time, wait for the full answer, never stack questions, push once when an answer is thin, gather far more than it will use, and never propose tools or solutions while gathering.

### 5. Apply the two levers

Both are non-negotiable and both go in the file explicitly:

- **Dictation, not live voice mode.** The send note and the paste-in prompt both tell the subject to answer out loud using dictation. Spoken answers are paragraphs; typed answers are sentences. Live voice mode leaves no written artifact.
- **The generous frame.** Whatever device you chose in step 3, write it into Part 2 so the AI is licensed to say the confident things the subject would never write about themselves.

### 6. Write the file

Fill in the skeleton from the standard, in order: frontmatter (`name`, `description` ending with the consumer-facing marker, `returns`, `conforms_to`), the `last_updated` and `version` comments, an H1 that names the return (not the act of interviewing), the Canonical source and Conforms to lines, a two-to-four sentence orientation for the operator, the send note, the fenced paste-in prompt (Part 1 interview contract and areas, Part 2 exact return schema, the Google Doc delivery instruction, "ask me only the first question, then wait"), and the Delivery section. Add Common scenarios and Pitfalls if you know them. No em dashes anywhere in the file.

### 7. Validate against the contract

Check every line of this before calling it done:

- [ ] Frontmatter has all four fields; `description` ends with the consumer-facing marker sentence.
- [ ] `conforms_to` and the visible **Conforms to** line both name the standard and version.
- [ ] The H1 names the return.
- [ ] The send note tells the subject: fresh chat, dictation not live voice, Google Doc link back.
- [ ] The paste-in prompt is one fenced block, written in the second person to the subject.
- [ ] Part 1 has the full interview contract and the areas; no solutioning during gathering.
- [ ] Part 2 names the return schema exactly: headings, order, bolding, length.
- [ ] The generous frame is explicit, not implied.
- [ ] The prompt ends by asking only the first question, then waiting.
- [ ] No em dashes.

### 8. Test-run it

Paste the prompt into a fresh consumer chat yourself and answer as the subject for three or four questions. You are checking that the AI asks one question at a time, follows up on thin answers, and does not start solutioning. Then say you are done early and confirm it writes the return in your exact schema. Fix the prompt, not the AI.

### 9. File and hand off

Save as `<name>/BOOMERANG.md` (always that filename), with the folder matching the `name:` field. If it fronts a SKILL or GENERATE recipe, it lives in that recipe's folder. Publish the file at a stable URL when you can, so the operator can hand over a link instead of a file. Then send it with the send note, verbatim.

## What good output looks like

- A stranger could hand the file to a subject and get a usable return back without asking you anything.
- The return schema is precise enough that two different subjects produce structurally identical documents.
- Both quality levers are visible in the text, not assumed.
- The file passes every line of the step 7 checklist.

## Worked examples

- [Job Fit Brief Boomerang](https://appliedai.wiki/skills/job-fit-brief/BOOMERANG.md): interviews someone figuring out what work suits them, returns role directions plus real local openings.
- [Build-Ready Spec Boomerang](https://appliedai.wiki/skills/generate-a-spec/BOOMERANG.md): interviews someone who wants something built, returns a nine-section spec led by a triage-ready TL;DR.

## Pairs with

- [BOOMERANG.md standard](https://appliedai.wiki/reference/standards/boomerang-md): the normative contract this skill authors against.
- [Boomerang Prompt](https://appliedai.wiki/concepts/boomerang-prompt): the concept and doctrine.
- [Interview Prompts](https://appliedai.wiki/disciplines/interview-prompts): the prompt-design craft behind Part 1.

## Pitfalls

- **Writing the questions first.** Questions designed before the return schema produce a warm transcript and a weak artifact. Schema first, always.
- **A vague Part 2.** "Write up a summary" is not a schema. Name every heading or expect a shape you cannot build from.
- **Skipping the test run.** The first draft of a boomerang nearly always stacks questions or solutions too early somewhere. Ten minutes of role-play catches it before the subject does.
- **Forgetting the send note.** The subject experience starts before the paste. A file without its send note gets pasted into an old chat, answered by typing, and returned as a screenshot.
- **Overloading the areas.** Twelve interview areas exhaust the subject before the good material lands. Cut to what the schema needs.
