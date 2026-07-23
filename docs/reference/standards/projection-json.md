---
title: "PROJECTION.json"
slug: /reference/standards/projection-json
description: "An agent-readable contract for a KIND of deliverable: the surface it occupies, the canon it requires, the slots it composes, the generators it invokes, and the invariants it is held to. Adding a new kind of asset becomes filling in a contract rather than writing a renderer."
---

# PROJECTION.json Specification v0.1

*A typed contract for a KIND of deliverable. It declares the surface an artifact occupies, the canon it requires by kind, the slots it composes, the generator capabilities it invokes, and the invariants it must satisfy. An agent reads it, plans the artifact, produces each slot, and verifies the result against the contract's own rules.*

---

{/* last_updated: 2026-07-23 */}
{/* version: 0.1 */}

Most systems that generate branded assets have one template per asset: a share-card generator, a slide generator, a book pipeline. Each is written from scratch, each re-derives what "on brand" means, and each drifts from the others the moment one is updated.

PROJECTION.json is the alternative. Describe the *kind* of thing once, as a contract, and let any brand fill it. The format is portable by construction: it names what it needs **by kind**, never by id, so a projection can be handed to a brand it has never seen.

## Why this is not SKILL.md or GENERATE.md

The [standards family](/reference/standards) already has formats for capability and for scaffolding. This one is for **output shape**.

| Format | Answers |
|---|---|
| SKILL.md | *what can the agent do, repeatedly?* |
| [GENERATE.md](/reference/standards/generate-md) | *how do I scaffold this artifact once?* |
| [brand.txt](/reference/standards/brand-txt) | *what does this brand look and sound like?* |
| **PROJECTION.json** | *what is this KIND of deliverable, and how do I know it came out right?* |

A skill might invoke a projection. A brand.txt supplies the look a projection renders in. They compose; none replaces the others.

## The six fields

```jsonc
{
  "id": "share-card", "version": "1.0.0",
  "extends": null,                       // fork another projection without copying it
  "author": "example.com/registry",

  "surface":  { "medium": "raster", "geometry": { "w": 1200, "h": 630, "split": 790 } },

  // BY KIND, never by id. This is what makes a projection portable.
  "requires": [ { "kind": "style-pack", "min": 1 } ],

  "slots": [
    { "id": "text-panel", "type": "deterministic", "emitter": "brand-card",
      "schema": { "eyebrow": "string", "headline": "string" } },
    { "id": "art-panel",  "type": "generated", "geometry": { "w": 410, "h": 630 } }
  ],

  "generators": [
    { "for": "art-panel", "capability": "image", "accepts": "reference-images",
      "pin": null, "producibleAspects": [1.0, 0.667, 1.5], "tolerance": 0.25,
      "quirks": [] }
  ],

  "invariants": {
    "perSlot":   [ { "id": "no text in the art", "check": "judged" },
                   { "id": "exactly 1200x630",   "check": "computed" } ],
    "crossSlot": [ { "id": "art is generated AT the panel aspect, never cropped",
                     "check": "computed", "scope": "art-panel vs its generator request" } ]
  },

  "emits": [ "share.png" ]
}
```

### `requires` names kinds, not ids

A projection says "I need at least one character." It cannot say "I need `jerry-man`," because it is meant to be shared with brands that have never heard of him. A **composition** supplies the actual ids. That binding step is the whole reason one projection can serve many brands.

### Slots are `deterministic` or `generated`, and both are first-class

A `deterministic` slot is emitted by code. A `generated` slot is produced by a model. A single artifact may contain both: a share card is a text panel laid out precisely by code beside an art panel produced by an image model.

**A `deterministic` slot MUST name an `emitter`.** A slot typed deterministic that names nothing capable of producing it is not deterministic, it is unspecified, and the type is decoration. This is the most common authoring error in the format.

### `surface` must be feasible against `generators`

A contract can be internally coherent and physically undeliverable. A 1200x1200 card with a two-thirds text split needs an art panel at aspect 0.333, and no image generator emits 0.333. Nothing in the individual fields is wrong; the contradiction lives *between* two of them.

So generators declare `producibleAspects`, and feasibility is checked **before** anything is generated. The alternative is discovering it deep into a run, or silently cropping to fit and losing exactly the edges the composition needed.

### Invariants are typed by who can check them

- **`computed`** rules are checkable by pure code: geometry, palette compliance, content fitting its frame, required metadata present. These cost nothing and run on every render.
- **`judged`** rules need a model to look: whether an image contains text, whether a hand is malformed, whether the person on page 19 is the person on page 3.

Typing them makes verification cost legible in advance: roughly the number of `judged` rules times the number of slots.

### Per-slot versus cross-slot, and why complexity becomes a number

A **per-slot** invariant is checkable against one output alone. A **cross-slot** invariant is only checkable across several outputs at once, and it is the expensive class: it is what forces locked reference assets, and it cannot be satisfied by making each slot individually excellent.

This makes "simple deliverable" versus "hard deliverable" a property of the contract rather than a matter of taste:

| Deliverable | Cross-slot invariants |
|---|---|
| Meme, share card, diagram | 0 |
| Flyer | 1 (one visual voice across its panels) |
| Illustrated book | the hardest one there is (identity across every page) |

A team can read that number off the contract before committing to build the thing.

**Two rules for authoring a cross-slot invariant**, both of which cost a real run to learn:

1. **Itemize it.** A rule written as one holistic question ("is this the same character?") passes while a specific declared property is plainly violated. Name the checklist.
2. **Check against the reference, never pairwise.** Outputs drift *together*, inheriting the same error from the same step. Compared with each other they look perfectly consistent and are uniformly wrong. Consistency is not fidelity.

### Generators declare a capability, and optionally a pin

Faithful reproduction does not come from pinning a provider, because generative output is stochastic regardless. It comes from the locked references, the verification gate, and recorded provenance.

So a slot declares what it *needs* and the runtime binds a provider, **except** where the model itself is the aesthetic. Where a locked reference carries the look, any competent provider works. Where no reference exists and the model's own hand is the style, the provider is part of the brand and must be pinned.

### `quirks` belong to the resolved provider

A `quirk` is what a specific model gets reliably wrong regardless of brand. It is a property of the capability binding, not of the look: it survives a change of brand and dies with a change of provider, which is the opposite of a style rule.

```jsonc
"quirks": [ { "id": "artwork-within-artwork-renders-inverted",
              "counter": "Any picture shown inside the scene must be right side up.",
              "check": "judged" } ]
```

Three rules make quirks useful rather than a notes file: the `counter` is appended to every compiled prompt automatically, the `check` becomes a gate item because countering in the prompt is never assumed to have worked, and quirks attach to the provider a slot **resolves to** rather than to its pin. Binding them to the pin leaves any deliberately provider-agnostic slot as the only unguarded one, which is backwards.

## Minimal valid projection

```jsonc
{
  "id": "meme", "version": "1.0.0",
  "surface": { "medium": "raster", "geometry": { "w": 1080, "h": 1080 } },
  "requires": [ { "kind": "style-pack", "min": 1 } ],
  "slots": [ { "id": "frame", "type": "generated", "geometry": { "w": 1080, "h": 1080 } } ],
  "generators": [ { "for": "frame", "capability": "image",
                    "producibleAspects": [1.0], "tolerance": 0.25 } ],
  "invariants": { "perSlot": [ { "id": "palette only", "check": "computed" } ], "crossSlot": [] },
  "emits": [ "meme.png" ]
}
```

Zero cross-slot invariants, one slot, one generator. That is the floor, and it is a legitimate projection.

## Versioning and forking

A projection carries a semantic `version` and may `extend` another rather than copying it. Child fields override parent fields key-wise. Forking a book projection to twelve pages instead of twenty-four should not mean duplicating its slots, its generators, and its invariants, because a duplicate is a thing that drifts.

The format is designed for a registry: `id`, `version`, `author`, and `extends` are the fields a marketplace needs. Nothing in the spec assumes a single owner.

## What to validate before running one

These are cheap static checks, and each corresponds to a failure that has actually shipped:

- every `deterministic` slot names an emitter, and that emitter exists
- every `generated` slot has a generator declaring `for` it
- each slot's required aspect is within tolerance of the capability's `producibleAspects`
- `extends` resolves
- every invariant is typed `computed` or `judged`
- a projection declaring no invariants is flagged: nothing can fail, so nothing is checked

Static checks are free and instant. Discovering the same problem by running a generation job is neither.

## Reference implementation

The [Agentic Brand Universe](/concepts/agentic-brand-universe) standard, whose universes declare projections and whose composer executes them.

## Further Reading

- [Agentic Brand Universe](/concepts/agentic-brand-universe): the cartridge this format renders from.
- [brand.txt](/reference/standards/brand-txt): the served format that primes an agent with the look.
- [Frameworks Are Proven by Variety, Not Volume](/perspectives/frameworks-are-proven-by-variety-not-volume): how the rules above were found, and why review did not find them.
- [Golden](/concepts/golden): why a locked reference, blessed by a human, is what a cross-slot invariant is checked against.
