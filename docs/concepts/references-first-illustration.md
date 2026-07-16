---
title: "References-First Illustration"
slug: /concepts/references-first-illustration
description: "References-first illustration is the discipline of deriving, auditing, and locking every reference image a composite scene depends on before rendering the scene. The model copies what the references show, so a defect that survives prompt rewrites lives in a reference, and the fix happens in isolation, under human approval, before compositing resumes."
image: "/img/comics/references-first-illustration.png"
---

# References-First Illustration

*References-first illustration is the discipline of deriving, auditing, and locking every reference image a composite scene depends on before rendering the scene. The model copies what the references show, so a defect that survives prompt rewrites lives in a reference, and the fix happens in isolation, under human approval, before compositing resumes.*

![4-panel comic strip, Marvel-zine power-armor style on cream paper. Title bar: "REFERENCES FIRST". Footer bar: "PERFECT THE REFERENCES, THEN COMPOSITE." PANEL 1, label "THE MANIFEST": Midas in matte-navy Supersuit with orange seams sits in his night command office beside a pinned scene brief; a holographic REFERENCE MANIFEST panel lists CHARACTER, PROP, and POSE thumbnails filled in, with a fourth slot BOT MASCOT flagged by a crimson X reading MISSING. Caption: "His engine derives the manifest and flags the gap." PANEL 2, label "THE CANDIDATES": the console presents three completely different robot mascot designs on cards labeled CANDIDATE A (crimson boxy robot), CANDIDATE B (gold bulbous robot), and CANDIDATE C (navy robot with orange ear caps, cyan smile, orange M chest emblem). Caption: "The engine generates candidates in isolation." PANEL 3, label "THE LOCK": Midas presses a heavy gold APPROVED stamp onto Candidate C, the navy bot, its card glowing gold while A and B sit dim beside it. Caption: "The human's whole job: improve the references, then lock." PANEL 4, label "THE COMPOSITE": the rendered night-office scene on a large display features the exact approved navy bot; Midas stands arms crossed before it with a READY stamp. Caption: "The composite inherits the library for free."](/img/comics/references-first-illustration.png)

---

## The failure mode this exists to kill

You have a scene you want to illustrate: a recurring character doing something specific, in a setting, with a prop. You write a careful prompt, pass the character's reference image, and render. The character comes out wrong in some persistent way. So you rewrite the prompt with capital letters and negations, and render again. Same defect. A dozen rolls later you are still trying to out-argue the model with prose.

The model was never listening to your prose. Image models weight reference images over prompt language, and one of the references you were passing depicted the defect. When a reference literally shows the thing you are forbidding, no prompt beats it. Every re-roll of the composite was a coin flip against a rigged coin.

## The loop

The fix is a loop that runs before any composite render, and it is the same loop whether the target is a wiki hero, a picture-book spread, a deck illustration, or a one-off:

1. **Write the scene.** The composite prompt, one paragraph.
2. **Derive the reference manifest.** Every recurring character, prop, setting, and pose the scene depends on, each mapped to the reference file that should anchor it. In a mature pipeline this is the engine's job, not a human checklist (see below).
3. **Audit the manifest against disk.** For each entry, confirm the reference exists and actually depicts what the scene needs. Inspect it at crop-zoom. A reference that shows a defect will teach that defect to every render it touches.
4. **Close the gaps in isolation.** Generate candidates for any missing or defective reference as a single subject on a plain ground, derived from the subject's locked master. Iterate there, where each roll is cheap and legible, not inside the crowded scene.
5. **The human locks.** Candidates go to the operator; only an approved candidate becomes the canonical reference. References are the first-principle building blocks of a visual universe, and one bad lock propagates into every downstream render, so this gate stays human even in an otherwise agent-run pipeline.
6. **Composite.** Render the scene with the manifest's references passed in, identity references first. The composite inherits the corrected canon for free.
7. **Read the tell.** If a defect survives two or three re-rolls of the composite, stop re-rolling. Something in the manifest is teaching it. Go back to step 3.

## Why the lock is human

Everything else in the loop is agent work: deriving the manifest, auditing, generating candidates, compositing, inspecting. The lock is the exception on purpose. A reference is not one image among many; it is upstream of every image that will ever pass it. Approval is cheap at the reference and expensive at the composite, because a composite defect costs one re-roll while a reference defect costs every future render until someone finds it. The operator spending thirty seconds picking candidate B is the highest-leverage thirty seconds in the pipeline.

## The mature form: the engine derives, the human improves references

Run as a habit, the loop still asks a person to think about manifests. The mature form removes even that. A real illustration generation engine (a render wrapper over a canonical reference library, with a gate) derives the manifest from the scene itself, resolves each entry against the library, and refuses or flags when something is missing or suspect. The engine points out which references need to be generated. It generates the candidates. It composites.

What remains for the human is exactly one activity: improving references. Picking candidate B over candidate A, catching the arm that reads wrong, saying "warmer eyes." Every unit of human taste lands in the library, where it compounds into every future render, instead of landing in a single composite, where it evaporates. That inversion is the whole point: composites become nearly free, and the reference library becomes the asset.

## Make it structural, not remembered

The gate is what makes the mature form trustworthy: a wrapper that resolves each recurring element's canonical reference from the library and refuses to render when one is missing on disk. The refusal is the feature. A pipeline that cannot composite past a missing reference does not need anyone to remember this page.

Two related disciplines follow directly. Never generate a multi-view character sheet with the model, because a generated sheet redraws the character and can invent anatomy that then rides along in every render that passes the sheet; composite sheets from the individually locked pose files with an image tool instead. And when a pose keeps failing from the master alone, that pose has earned its own dedicated reference; build it once in isolation and every future scene that needs it starts from truth.

## Further Reading

- [Agentic Brand OS](/concepts/agentic-brand-os) covers the brand-scale home of these references: the Golden Atomic Brand References are a reference manifest maintained at the level of a whole identity.
- The [worked example on truthmanagement.wiki](https://truthmanagement.wiki) walks the mapped version of this workflow, including the live failure that produced it.
