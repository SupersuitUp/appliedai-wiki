---
title: "Graphic Style"
slug: /reference/graphic-style
description: "The visual spec lives in one place: the SuperSuit brand OS brand.txt — one link that primes any image model with the full style, tokens, voice, banned terms, and reference set."
---

# Graphic Style

The visual spec for this wiki lives in **one place** — the SuperSuit brand OS `brand.txt`:

> **https://supersuit-brand-os.vercel.app/brand.txt**

Paste that one link into any image model or agent and it is primed with the master prompt, color + type tokens, voice, banned terms, and absolute URLs to every Golden Atomic Brand Reference (GABR). It is generated at build time from the brand OS, so it never drifts.

To change the canon, edit the [brand OS](https://supersuit-brand-os.vercel.app) — not this page.

## Key rules for agents generating comics

These are the most commonly violated rules. They are in brand.txt; they are repeated here for speed.

**Always pass the GABR reference images.** The image model has no memory of prior generations. Without a reference image, character identity drifts every time. Minimum set for a comic:
- `gabr-08-comic-kit.png` — panel style and layout conventions
- `gabr-13-chief-of-agents.png` — required any time the Chief of Agents appears. The Chief has a gold comms crown and a high-collared conductor's mantle. Without this reference the crown disappears and the Chief looks like a generic hologram.
- `gabr-02-midas.png` or `gabr-04-chairman.png` — for named hyperagent characters

**No halos or spirals.** Nothing floats above anyone's head in this brand. This includes resolved-state "gold spiral halos" — those are banned.

**Chief of Agents is holographic, never flesh.** A luminous translucent cyan-and-gold construct in the cyber-cathedral. Never sitting in a real chair. Never in the physical world.

**Two worlds stay separate.** The hyperagent is solid flesh in his physical Supersuit. The Chief of Agents and sub-agents are holographic in the virtual cyber-cathedral. They never cross into each other's world.

All GABR URLs are at the bottom of brand.txt.
