---
title: "Golden Examples"
slug: /concepts/golden-examples
description: "The A+ outputs you preserve in your library so they can ride as in-context references on every new generation. The asset class of AI-native workflows. Mediocre stuff compounds the same way A+ stuff does."
image: "/img/comics/golden-examples.png"
---

# Golden Examples

*The A+ outputs you preserve in your library so they can ride as in-context references on every new generation. The asset class of AI-native workflows. Mediocre stuff compounds the same way A+ stuff does. Curating the library IS the work.*

![4-panel comic. Panel 1, THE LIBRARY: The supersuited hyperagent (Blasian, mid-30s, matte navy Supersuit with vivid orange seam accents, helmet off, mechanical armored plating, cyan glow at inner wrists) standing in his high-tech innovator's workshop in front of a tall holographic reference library shelf. The shelf has three tiered rows of artifact cards: GOLDEN EXAMPLES (KEEP) row with bright gold A+ stamps, SERVICEABLE (MAYBE) row in muted tones, MEDIOCRE (REMOVE) row in red with LOW labels. HUD overlay in cyan: REFERENCE LIBRARY / MODEL SEES WHAT YOU KEEP. Caption: 'The model sees what you keep.' Panel 2, THE CURATION: The same hyperagent at the shelf, gauntleted hand actively flipping mediocre artifact cards toward a glowing red DELETE bin with a large red X on it. Several cards crumpling toward the bin, each stamped with red ✗. The GOLDEN EXAMPLES (KEEP) row remains intact on the shelf with bold A+ stamps. HUD: A+ IN. MEDIOCRE OUT. NO EXCEPTIONS. Caption: 'Curating the library IS the work.' Panel 3, THE PASS-IN: Pulled-back shot. The Chief of Agents (luminous translucent cyan-and-gold holographic construct, software not flesh) at the center labeled CHIEF OF AGENTS / OPERATING GENERATION PIPELINE. Golden A+ artifact cards from the shelf glow with bright cyan tendrils flowing OUT and INTO the Chief of Agents' generation pipeline. HUD overlays: GOLDEN EXAMPLES → IN-CONTEXT REFERENCE, and QUALITY IN. QUALITY OUT. Caption: 'Every generation rides on what came before.' Panel 4, THE A+ OUTPUT: First-person POV through an armored hero's helmet visor. Translucent inked visor frame creates the panel borders. A new artifact card materializes in front, stamped A+ ON FIRST PASS in cyan and gold caps. Content visible on the card. Smaller HUD card to the side: FLOOR RAISED. Quality indicators: DRAFT OPTIMAL / EVIDENCE MAXIMUM. Red-and-gold gauntleted hand reaches forward. Cyan glow at bottom edge of visor frame. Caption: 'The library compounds in the direction you curate.' Title bar: GOLDEN EXAMPLES. Footer bar: A+ COMPOUNDS UP. MEDIOCRE COMPOUNDS DOWN. PICK A SIDE.](/img/comics/golden-examples.png)

---

## Why the library is the asset

In an AI-native workflow, every new artifact the system generates is shaped by the artifacts it can see. The references it loads, the prior outputs it has been shown, the documents in the workspace it can read.

The model is not generating from scratch on every call. It is interpolating against the in-context evidence it sees right now. When the evidence is a row of A+ outputs from past work, the new output drifts toward A+. When the evidence is a pile of mediocre outputs nobody bothered to delete, the new output drifts toward mediocre.

The library is the asset. The library is what compounds.

## The compounding bet

A working AI system runs for years. Across those years, the library of saved outputs holds thousands of artifacts. Each one influences the future, in two directions:

- **Golden examples compound up.** Every time the model sees one, it raises the floor of what it produces next. Pass three golden V/TO drafts in and the next V/TO lands closer to A+ on first generation. Repeat across every category.
- **Mediocre examples compound down.** Every B-minus draft left in the library tells the model "this level of work is acceptable here." Every typo'd memo, every clichéd opening, every weakly-structured proposal nobody deleted: the model reads it as a reference for what gets tolerated.

The compounding works the same way in both directions. The difference is whether the library gets curated.

## The bar: A+ or delete

The discipline is simple. Every artifact produced falls into one of three buckets:

- **A+.** Preserve. Tag it. Make it findable. Pass it as reference in future generations of that category.
- **B-minus or below.** Delete. The system has version control. The mediocre artifact is not preserving anything that cannot be reproduced on a sharper day. Letting it sit in the library is a tax on every future generation.
- **A-minus.** The dangerous middle. Almost good enough. Looks fine at a glance. The temptation is to keep it. Resist. The model cannot tell the difference between an A-minus and an A+; it treats both as reference quality. Mediocre dressed up as good is the slow poison.

When in doubt, delete. The library will be smaller and better. The model will be sharper for it.

## Who curates

The curator is the person willing to call A+ or delete on every artifact. Sometimes that is the principal who originally commissioned the work. Sometimes it is the applied AI engineer maintaining the system. Sometimes it is a designated curator on the team. The role matters more than the title.

The principal may not be the one generating the artifacts day to day. The principal's job is to set and police the bar. The team or the system produces the work; the principal calls A+ or calls delete. The library does not get curated by accident. Someone has to be willing to look at a mediocre output and say *"this does not enter."*

The team that refuses to set this bar ends up with a library that pulls every new generation back to the average of the past. The team that does set it ends up with a library where every new generation starts higher than the last.

This is the discipline that lets the principal step away from doing the work without the work degrading. Someone else writes the memos. The principal enforces the bar.

## What goes in the library

Golden examples are not only visual. They are every artifact category the system will generate again:

- Strategic documents (memos, proposals, briefs, deal memos, intelligence briefs)
- Communications (emails, intro messages, follow-ups, decline-with-grace)
- Operational artifacts (V/TOs, scorecards, rocks, accountability charts)
- Content (essays, social posts, talks)
- Visuals (comics, slides, hero images, character sheets)
- Voice (recorded clips, written samples in the operator's tone)
- Decisions (post-decision write-ups in the form they should be remembered)

Each category gets its own corner of the library. Each corner is curated the same way: A+ in, mediocre out, no exceptions.

## The mechanics

For visuals, the mechanics are written up in detail at [Golden Atomic Brand References](/concepts/golden-atomic-brand-references). The same shape applies to every other category: a few canonical references pass on every generation, the prompt carries the variable per-render content, the system stays coherent because the references stay locked.

The engineer building the system implements the mechanics. The curator demands the discipline.

## When NOT to curate

If the curator is having a brain-numb day (see [AI Psychosis on supersuit.wiki](https://supersuit.wiki/concepts/ai-psychosis)), do not touch the library. Curation requires the same judgment-and-taste circuit that updating the system requires. The day you cannot tell A+ from A-minus is the day you make the library worse. Wait for a clearer day.

## Further Reading

- [Golden Atomic Brand References](/concepts/golden-atomic-brand-references): the implementation pattern for the visual category — curated reference images that anchor recurring identity in image data.
- [Context Engineering](/disciplines/context-engineering): the discipline of curating what information the harness feeds to the model at each step. Golden examples are one slice of context.
- [Skill Files](/concepts/skill-files): the structural unit that often carries the reference list for a category.
- [Hypercontext](https://supersuit.wiki/concepts/hypercontext): the broader substrate the library is one part of.
- [AI Psychosis](https://supersuit.wiki/concepts/ai-psychosis): the failure mode that ungrounds the curator. Same judgment circuit determines both pages' disciplines.
- [Compound Delusion](https://supersuit.wiki/concepts/compound-delusion): mediocre examples are the slow-bleed cousin of unflagged hallucinations.
