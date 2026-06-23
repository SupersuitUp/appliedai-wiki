---
title: "Golden Atomic Brand Templates (GABTs)"
slug: /concepts/golden-atomic-brand-templates
description: "Coded HTML/CSS templates that render a brand's exact-text assets (stat cards, scorecards, before/after tables, open-graph cards, event flyers) to exact pixels, with no image model in the loop. The coded twin of the GABR: where a GABR is a reference image you generate from, a GABT embeds the real logo SVGs and tokens directly, so marks, numbers, and copy are pixel-perfect."
---

# Golden Atomic Brand Templates (GABTs)

*Coded HTML/CSS templates that render a brand's exact-text assets (stat cards, scorecards, before/after tables, open-graph cards, event flyers) to exact pixels, with no image model in the loop. The coded twin of the GABR: where a GABR is a reference image you generate from, a GABT embeds the real logo SVGs and tokens directly, so marks, numbers, and copy are pixel-perfect.*

---

## What a GABT Is

Each word does load-bearing work, the same way it does for a [GABR](/concepts/golden-atomic-brand-references).

**Golden** means best-in-class and human-validated. Only the templates that represent the brand at its best enter the canon. A GABT is curated, not just collected.

**Atomic** means one self-contained reusable unit. One template does one job: a stat card, a scorecard, an open-graph card. You fill it with per-instance props (the metric, the date, the headline) and render it.

**Brand Template** names the form: coded HTML and CSS, not a generated image. The asset is built, not drawn.

A GABT is the coded twin of the GABR. A GABR is a reference image passed to an image model; a GABT is code rendered to exact pixels with no model in the loop. Because it is code, a GABT embeds the real logo SVGs and pulls the real tokens directly, so the mark and the type are pixel-perfect and laid into the design, never redrawn.

## Why Code Beats Generation for Exact Assets

Image models garble text, drop letters, and mangle logos and digits. Any asset whose value depends on a precise word, number, or mark cannot be trusted to a generative render: the 62% comes back 67%, the street address turns to gibberish, the logo grows an extra letter. The failure is not occasional; it is the nature of the tool.

A GABT sidesteps it entirely. The number is a string in the HTML. The logo is the real SVG, embedded as a file. The color is the real token. What you write is what renders, at exact pixels, every time.

This retires an older tactic. Brands used to generate the art clean and stamp the real wordmark on top afterward. But a flat overlay never follows the fabric, the lighting, or the perspective, so it reads as a sticker. The cleaner split: when a logo simply needs to appear inside a generated photo (printed on a shirt or a sign), pass the real logo as a reference image and let the model render it in place on the surface. When the whole asset is exact text or marks, it is a GABT.

## The Generate or Code Decision

Exactness decides which to reach for.

- **[GABRs](/concepts/golden-atomic-brand-references)** for photography, illustration, and scenes where the value is in the image rather than a precise word.
- **GABTs** for anything whose text, numbers, or logo must be exact: a data slide or stat card, a scorecard, a before/after table, an open-graph card, an event flyer with a real date and address.

GABRs and GABTs are the two halves of one generation story. A complete brand OS provides for both and routes between them.

## Anatomy of a GABT

One folder per template under the brand OS's `templates/` directory:

- A **shared CSS** that pulls the real brand tokens (the actual hex values, the real fonts).
- One or more **HTML instances**, where the per-render content is filled in.
- A **`render.sh`** that screenshots the HTML headless at 2x and downscales to the target size for crisp type.
- An **`out/`** of rendered PNGs.

Because it is HTML, a GABT embeds the real logo SVGs (an `img` tag pointing at the actual file) and uses the real token values. Nothing is approximated, so nothing drifts.

## Structure and Annotation

Every GABT is registered in `brand.json`'s `golden_atomic_brand_templates.templates` array, one object per template:

- `slug`: the template name (`stat-card`, `event-flyer`).
- `kind`: the type (`data-slide`, `scorecard`, `og-card`, `banner`).
- `description`: what it renders.
- `when`: the routing rule, when an agent should reach for it instead of generating an image.
- `render`: the command (`./templates/<slug>/render.sh`).
- `size`: the output dimensions.
- `path`: where the template lives.

The build script projects these into the `## Golden Atomic Brand Templates` section of `brand.txt`. The `when` routing rule is what distinguishes a GABT registry from a folder of HTML files: it tells an agent "use this when a number must be exact," not just "here is a template." An unregistered GABT is invisible to any agent reading `brand.txt`.

## Lifecycle

1. **Build the template** (HTML, shared CSS, `render.sh`) from the real tokens and the real logo SVGs.
2. **Validate** that it renders on-brand and that the copy and numbers are exact.
3. **Register it** in `brand.json` with `slug`, `kind`, `description`, `when`, `render`, `size`, and `path`.
4. **Regenerate `brand.txt`** so the entry appears with its routing rule and URL.

To make a new instance, copy an HTML file, fill in the props, and run `render.sh`. The exact-text content is yours to vary; the brand (tokens, logo, layout) is already locked into the template.

## Relationship to brand.txt

GABTs appear in the `## Golden Atomic Brand Templates` section of `brand.txt`, each with its routing rule, render command, and URL. An agent reading `brand.txt` learns the same way it learns the GABR routing: not "here are some files" but "there is a stat-card template, use it when a number must be exact, render it with this command." GABTs earn the same first-class treatment GABRs get, so the brand stays exact as the agent roster grows.

---

## Further Reading

- [Golden Atomic Brand References](/concepts/golden-atomic-brand-references): the generative twin, reference images you generate from.
- [Agentic Brand OS](/concepts/agentic-brand-os): the full package GABTs are the coded-template layer of.
- [brand.txt](/reference/standards/brand-txt): the served format that includes annotated GABT entries.
- [Generate an Agentic Brand OS](/playbooks/generate-agentic-brand-os): the recipe that generates the brand OS and its template canon.
