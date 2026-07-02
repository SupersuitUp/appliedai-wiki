---
title: "Workflow decomposition"
slug: /playbooks/workflow-decomposition
description: "Draw the entire business as one linear workflow, decompose to irreducible actions, then classify each one as automatable, augmentable, or human-only."
---

# Workflow decomposition

*Draw the entire business as one linear workflow, then decompose each stage to irreducible actions. What you cannot draw, you cannot automate, improve, or hand to an agent and expect consistent results.*

---

## When to run this

You are about to recommend (or build) AI inside an operating business and the team cannot explain end-to-end how value moves through it. Symptoms: the founder describes the business in functions and titles rather than steps, operators disagree on what the workflow actually is, and "where should we use AI?" gets answered with a tool name rather than a step. Run this before any pilot scoping.

This playbook does not apply if the goal is strategic positioning, brand, or org design. It applies to operational workflows where work moves through stages and each stage has people doing things.

## Prerequisites

- Access to the operators who actually do the work, not just the leaders who describe it.
- One to two hours per function for direct observation or guided walkthrough.
- A whiteboard, doc, or canvas where you can capture stages, actions, and sub-actions side by side.

## Steps

1. **Sketch the spine.** Start with the 5 to 7 major stages of the operation. Do not overthink it. For a content business: Idea, Research, Script, Shoot, Edit, Package, Publish, Measure. For a service business: Lead, Qualify, Scope, Deliver, Follow-up, Referral. For home services: Inquiry, Estimate, Schedule, Execute, Invoice, Review. Write it linearly. This is the backbone everything else attaches to.

2. **List actions per stage.** Under each stage, list every action a human actually performs. Not what they say they do. What they actually do, observed. Usually 6 to 9 actions per stage. Each action has a clear input and output. Example for the Edit stage of a podcast business: receive raw transcript, segment by speaker change, identify caller transitions, find highest-tension moment in each segment, restructure to open on tension, remove filler words, identify the key data points needed for the host insight, collapse everything else, export final clip.

3. **Decompose to sub-actions.** Take each action and ask: "What does someone actually do to accomplish this?" The action "find the highest-tension moment" becomes: read the full segment, look for disagreement or surprise or emotional language, look for questions that challenge assumptions, score each candidate moment on a 1 to 5 tension scale, select the highest-scoring moment, note the timestamp. Now you have something an agent can execute.

4. **Keep reducing until irreducible.** Continue until you reach actions that cannot be broken down further. These are your automation targets. The rule of thumb: if an action contains the word "and," it is probably two actions. "Review the transcript and find the best moment" is two steps, not one.

5. **Classify each irreducible action.** Mark every leaf node:
   - **Automate now.** Fully automatable today. (Example: remove filler words from a transcript.)
   - **Augment.** Human plus AI together. AI proposes, human approves. (Example: score tension moments.)
   - **Human only for now.** Requires human presence, judgment, or relationship. (Example: record the original conversation.)
   - **Automate soon.** Possible but not yet reliable enough to deploy. (Example: voice-based customer intake calls in some domains.)

6. **Build the automation roadmap from the classification.** Start with the "automate now" items. They are free wins and they build internal confidence. Then move to the "augment" items where AI handles the heavy lifting and a human makes the final call. Defer the "human only" items. Revisit the "automate soon" items quarterly as model capabilities shift.

## What good looks like at the end

- One linear spine with named stages, agreed by the operators who actually do the work.
- Every stage decomposed to irreducible actions, with classification marks.
- A prioritized list of automation candidates, starting with the "automate now" items.
- The operators recognize their own work in the decomposition. If they do not, the map is wrong.

If those four are true, you can scope a pilot against this map. The pilot's "what we will solve" lands on a specific action or sub-action, not a vague function.

## Choose the cheapest solution per step

Classification tells you which steps to attack. It does not tell you how. Before building anything, run each "automate now" or "automate soon" step through a solution menu and pick the cheapest option that works:

- **Nothing (legibility was the fix).** Writing the step down often reveals it was dumb, redundant, or a workaround for a problem you can delete outright. The best automation is a step you no longer perform. Check this first, on every step.
- **An existing tool.** Search for a product that already does this, integrated and maintained. Reinventing it in an agent is a worse use of your time (the discipline in [Idolizing the Build](/perspectives/idolizing-the-build)).
- **A skill file.** A reusable prompt-plus-instructions the agent runs on demand. The right answer for repeatable judgment work the model can already do with the right context.
- **A custom app.** Worth it when the step recurs constantly, needs a clean interface for a non-technical operator, or wraps enough context that a skill file gets unwieldy.
- **A developer.** Some steps are worth paying a human to build once, correctly, especially anything touching money, compliance, or brittle integrations.

Let AI itself argue the tradeoffs. Give it the decomposed step and ask which option fits and why, including the option of not automating it at all. The output is not "use AI on everything." It is a per-step decision, and the honest answer is sometimes "this is not worth automating."

Once a workflow's steps are decomposed and classified, write the workflow up as a [Hyperdocumented SOP](/concepts/hyperdocumented-sop): the dual-readable map a human can follow and an agent can execute, and the durable artifact this playbook's output becomes.

## Worked example: content production pipeline

A media company's content workflow, fully decomposed and classified:

**Stage 1: Ideation**
- Automate now: scan community and platform for trending topics in the niche.
- Automate now: pull performance data from the last 30 days of content.
- Automate now: cross-reference trending topics with the team's competency list.
- Augment: select the intersection. AI proposes top 5, human picks.

**Stage 2: Scripting**
- Automate now: generate templated outline based on selected topic.
- Augment: fill in specific examples and stories. AI drafts, human refines.
- Augment: write hook and opening. AI generates 5 options, human selects.

**Stage 3: Packaging**
- Automate now: generate 10 headline variations.
- Automate now: generate thumbnail concepts based on headline.
- Augment: select best headline plus thumbnail combination.

**Stage 4: Production**
- Human only for now: record the content.
- Automate now: transcribe and segment.
- Automate now: remove filler, identify key moments.
- Augment: assemble final edit. AI proposes cut, human approves.

**Stage 5: Distribution**
- Automate now: format for each platform (vertical, square, landscape).
- Automate now: schedule based on optimal posting times.
- Automate now: generate platform-specific captions.
- Automate now: post and log.

**Stage 6: Measurement**
- Automate now: pull engagement metrics at 24h, 48h, 7d.
- Automate now: compare against baseline performance.
- Automate now: feed results back into the ideation scoring model.

That is one business function fully decomposed. Repeat for every function: sales, customer success, operations, finance, HR.

## Common failure modes

- **Decomposing from memory instead of observation.** Watch someone actually do the work. People skip steps they have internalized. The skipped steps are usually where the friction lives. Re-run the decomposition with an operator at the keyboard.
- **Stopping too early.** "Edit the video" is not an action. It is a stage containing 10-plus actions. If your leaf node could be expanded into a paragraph of instructions, it is not a leaf yet.
- **Trying to automate everything at once.** Start with the "automate now" items. Ship wins. Build confidence. Then tackle the "augment" tier.
- **Ignoring the handoffs.** The boundary between stages is often where work breaks: a CSV is exported and re-formatted, a Slack message gets forwarded, someone re-types a number. Map the handoffs explicitly and decompose them too. They are usually low-hanging automation fruit.

## Further Reading

- [Playbooks](/playbooks). Other engagement playbooks.
- [Pilot scope](/playbooks/pilot-scope). The natural next step after decomposition.
- [Disciplines](/disciplines). The craft pillars an applied AI engineer reaches for once the map is drawn.
