---
title: "Graphic Style"
slug: /reference/graphic-style
description: "Visual conventions for illustrations and diagrams on this wiki. The default is comic-strip article summaries in the Supersuit Up family style."
---

# Graphic Style

*Visual conventions for illustrations and diagrams on this wiki. The default is comic-strip article summaries in the Supersuit Up family style.*

---

This wiki is part of the [Supersuit Up wiki family](https://supersuit.wiki) and shares its visual identity. Articles open with a comic-strip hero in the same neo-comic action-zine style used across the family.

## Article-hero comic strips (default)

The default illustration for any article on this wiki is a **comic-strip summary** in neo-comic action-zine style with high-tech power-armor visual DNA — the same family used across [supersuit.wiki](https://supersuit.wiki) and the rest of the Supersuit Up wiki family. Cream paper, bold inked outlines, crimson + cobalt + gold + arc-reactor cyan, first-person helmet-visor POV as the signature panel, panel count matched to the article's beats.

**Canonical spec:** [supersuit.wiki/reference/graphic-style](https://supersuit.wiki/reference/graphic-style). The full prompt template, palette, panel-count rules, and IP-name discipline live there.

**Generation workflow:** use the global `comic-strip` skill at `~/.agents/skills/comic-strip/SKILL.md`. It bundles two canonical reference images that **must** be passed via `--input-image` on every generation to lock the style.

Once this wiki has 2+ comics of its own in the family style, use that wiki's own comics as references for in-wiki style continuity.

## Image embedding

Save generated comics to `static/img/comics/<slug>.png` where `<slug>` matches the article's URL slug. Embed at the top of the article, immediately after the subtitle italic block, before the first `## section`:

```markdown
*Article subtitle goes here.*

![One-line alt text describing the strip's beats.](/img/comics/<slug>.png)

---

## First section
```

---

## Further Reading

- [supersuit.wiki: graphic style](https://supersuit.wiki/reference/graphic-style): the canonical spec for the comic-strip style across the family
- [Voice rules](/reference/voice-rules): the prose equivalent of this page
