---
title: "HTML-First Artifacts"
slug: /concepts/html-first-artifacts
description: "As your agent gets better, the output format becomes the bottleneck. HTML is the upgrade most practitioners have not noticed yet."
---

# HTML-First Artifacts

*As your agent gets better, the output format becomes the bottleneck. Markdown was the default for a reason. HTML is the upgrade most practitioners have not noticed yet.*

---

## The Shift

For most of the harness era, agents have communicated with us in markdown. Plain text, headings, lists, code fences. Easy to read, easy to version, easy to edit by hand. It made sense as the default.

The defaults have moved. Two things changed at once:

1. The agent is doing more of the writing. You are not editing markdown files by hand the way you used to. You are reading them, prompting changes, and re-reading.
2. The artifacts are getting longer and richer. Plans, specs, brainstorms, research synthesis, code reviews. A 100-line markdown file used to feel ambitious. Now it feels like the floor.

Markdown is fine for short documents you will edit by hand. It is a poor fit for long, agent-generated artifacts you mostly consume. The format leaks information density and makes the artifact harder to share.

HTML is the upgrade. Same harness, same superprompt, same agent. Just ask for the artifact in HTML and watch what changes.

## What HTML Can Carry That Markdown Cannot

Markdown has headings, lists, links, tables, and code blocks. That is the whole vocabulary. Anything more expressive falls back to clever ASCII or unicode tricks.

HTML is the canvas of the modern web. Anything you can render in a browser is fair game:

- **Tables with real layout** (colspans, rowspans, sticky headers, color-coded cells)
- **CSS-driven design** (typography, spacing, color, responsive layout)
- **SVG illustrations** (flowcharts, architecture diagrams, sparklines, anything you would have hand-drawn)
- **Inline code with syntax highlighting** via a small script tag
- **Spatial layout** (side-by-side comparison, grids, absolute positioning)
- **Interactive elements** (sliders, toggles, copy buttons, tabs, collapsible sections)
- **Images** (screenshots, photos, generated illustrations)

There is almost no kind of information your agent can produce that HTML cannot carry efficiently. The same is not true of markdown.

## Why The Shift Pays Off

### Information density

A spec rendered as HTML can carry the same content in less screen space than the markdown version, with diagrams where diagrams belong and color-coded tables where they help. The artifact gets shorter to scan even when the content gets richer.

### Visual clarity

Long markdown files are exhausting to read. Long HTML documents are not, when they use real headings, real navigation, real visual hierarchy. The same brain that gives up on a 200-line markdown plan will happily read a well-structured HTML version of the same plan.

### Sharing

Markdown does not render well in most browsers. To share a markdown artifact you usually have to import it somewhere first.

HTML is sharable as-is. Drop the file on object storage, paste the link, the recipient opens it in a browser. No import step. The chance someone actually reads your spec, report, or PR writeup goes up.

### Two-way interaction

Markdown is read-only by nature. HTML can be a live tool. Ask your agent to add a slider that adjusts a value, a copy-as-prompt button that exports the current state, a side-by-side editor with a live preview. The artifact stops being a document and becomes a small purpose-built interface for the work in front of you.

### Joy

This is the one nobody puts in the bullet list. Reading a beautiful HTML artifact your agent produced for you is more fun than reading a markdown wall of text. You stay in the loop because you want to. That is its own justification.

## Practitioner Patterns

The shift does not require a new skill or a new tool. You can ask your harness for HTML the same way you ask it for markdown. What matters is matching the format to the goal.

### Specs, plans, and brainstorms

Instead of a markdown plan, ask your agent for an HTML file with the plan, embedded mockups (HTML or SVG), data flow diagrams, and the key code snippets annotated. When you start a new session to implement, hand the HTML file in as context.

> "Generate six distinctly different approaches to the onboarding screen. Vary layout, tone, and density. Lay them out in a single HTML file in a grid so I can compare side by side."

### Code review and PR explainers

Markdown PR descriptions are hard to scan. An HTML artifact with the actual diff, inline annotations, color-coded findings, and a flowchart of the data path is easier to review than the GitHub diff view. Attach it to the PR.

> "Help me review this PR with an HTML artifact. Render the diff with margin annotations, color-code findings by severity, focus on the streaming logic since that is the part I do not know well."

### Reports and research

Anything you would have produced as a long markdown report is a candidate. Weekly status updates, incident reports, research synthesis, conceptual explainers. Ask for SVG diagrams where the explanation needs a picture.

> "I do not understand how our rate limiter actually works. Read the relevant code and produce a single HTML explainer page: a token-bucket flow diagram, three or four annotated code snippets, a gotchas section."

### Throwaway editors

Sometimes the easiest way to do a one-time job is a single HTML file purpose-built for that job. Drag-and-drop card sorter for thirty Linear tickets. Form-based editor for a feature flag config. Side-by-side prompt tuner with live preview. End every throwaway editor with an export button: copy as JSON, copy as markdown, copy as a prompt to paste back into your harness.

### Design and prototypes

HTML is the most expressive design medium your agent has. Use it to sketch interactions, animations, and component variants before writing them in your final language. Sliders and knobs let you tune the parameters before you commit them to code.

## Tradeoffs

HTML costs more to generate (Thariq Shihipar at Anthropic estimates two to four times the time and tokens of the markdown equivalent). Diffs are noisier in version control. The 100-line markdown file you could edit by hand becomes an HTML file you mostly prompt the agent to revise.

For artifacts your agent is producing for you to read, share, or interact with, the cost is a fair trade for what you get back. For short notes you will edit by hand, markdown is still right.

## When To Reach For Each

| Goal | Format |
|------|--------|
| Short note you will edit by hand | Markdown |
| Source-of-truth file your agent reads on every run | Markdown |
| Long plan, spec, or brainstorm you will read once and prompt revisions on | HTML |
| Code review, PR explainer, incident report | HTML |
| Status update, research synthesis, conceptual explainer for an audience | HTML |
| One-off editor for ranking, tagging, tuning, or curating | HTML |
| Design exploration or prototype | HTML |

The default flips depending on whether you are editing the artifact or consuming it. Pick the format that matches that.

## Getting Started

You do not need a new skill to do this. Prompt your harness:

> "Make this an HTML file."

Then iterate. The first version will be functional and probably plain. Ask for color, structure, diagrams, or interactivity. The artifact gets sharper the same way every other agent output does, by saying what you want and letting the agent revise.

To open the file: ask the agent to open it in your browser, or open it yourself. To share: upload it (object storage, a quick static host, your own domain) and send the link.

If your taste needs a stronger steer, give your agent a small design system reference file (one HTML file with your preferred typography, colors, and spacing) and ask future artifacts to match it.

## The Frame

The output format is a leverage choice. As your agent gets more capable, the cost of the format you ask for compounds. Asking for markdown when you wanted a richer artifact is a quiet tax on every read.

HTML-first artifacts are how practitioners stay in the loop with an agent that is doing more of the work every quarter. The artifact is more enjoyable to read, easier to share, and capable of carrying interaction the markdown version could not. The decision to make is which artifacts deserve the upgrade.

---

## Further Reading

- [Compounding Docs](/foundations/compounding-docs): Why every artifact should accumulate value over time.
- [Spec Writing](/disciplines/spec-writing): The artifact type that benefits most from the HTML upgrade.
- [Harness Engineering](/disciplines/harness-engineering): The harness producing these artifacts.
- [Superprompt](/disciplines/superprompt): The activated prompt that drives the artifact in the first place.

## Source

This concept was articulated by Thariq Shihipar at Anthropic in *Using Claude Code: The Unreasonable Effectiveness of HTML* ([thread](https://x.com/trq212/status/2052809885763747935), [examples gallery](https://thariqs.github.io/html-effectiveness)). Credit to Thariq for the framing and the use-case taxonomy.
