# Style OS — A Brand OS Variant for Personal Style

**Date:** 2026-06-14
**Status:** Design approved, pre-implementation
**Worked example (dogfood):** Russ

---

## One-line

A brand OS, pointed at a *person's clothing and taste* instead of a company brand: capture a wardrobe and the inspiration someone saves, synthesize their **Style DNA**, surface where what-they-own / what-they-say / what-they-save diverge (the **Tension Report**), and from that drive two outputs — **outfit planning** (from what they own) and **made-to-order design briefs** for new clothes (from what they save + their fit).

Tagline: *"Your taste, made machine-consumable — so any agent can plan your outfits and design your next clothes."*

## Why this is a "variant" and not a new thing

It reuses the brand-OS mental model and toolchain almost verbatim (repo per subject, JSON token manifests, a reference-image library, an all-in-one agent prime, an optional deployed portal). Two organs are net-new: a clothing-specific **Fit Profile**, and the **Tension Report** that turns taste-divergence into a design brief.

| Brand OS | Style OS | Purpose |
|---|---|---|
| `brand.json` (tokens) | `style.json` (**Style DNA**: palette, silhouettes, fabrics, formality range, motifs, do's/don'ts, north-star icons) | Who the subject is, visually |
| brand assets library | `wardrobe.json` (**owned inventory** — each garment a structured, photo-derived entry) | What they *own* → outfit planning |
| `gabrs/` (Golden Atomic Brand References) | `references/` (**Golden Style References** — inspiring garments owned-or-not, each tagged *why saved*) | What they *save* → designing new clothes |
| brand templates | **outfit recipes / capsule templates** | Repeatable looks |
| generation layer | **design-concept generator** (made-to-order briefs + AI renders) | New clothes, tailor-ready |
| `brand.txt` (agent prime) | `style.txt` (**agent prime**) | Any agent can act as the subject's stylist/designer |
| deployed portal | **portal**: closet browser · outfit boards · references wall · design concepts · **Tension Report** | Where it becomes usable |
| *(none)* | `fit.json` (**Fit Profile**: measurements, body notes, what flatters/fails) | Net-new; required for made-to-order |
| *(none)* | **Tension Report** (own ⟷ say ⟷ save divergence) | Net-new; the design-brief engine |

## Capture model

**Photo-first.** The subject shoots photos of each garment (or closet shelves); a vision model extracts structured attributes per garment. Highest fidelity, and it makes the "design new clothes" step materially stronger because real fabric/cut/color data feeds the briefs. Interview and harvest are separate inputs, not substitutes.

## The engine: five ordered modules

Same rhythm as `generate-agentic-brand-os` — interview one question at a time, capture answers to a build-notes file, then execute. Each module produces exactly one artifact.

**Module 1 — Bootstrap Style DNA (interview, fast).**
Structured interview: north-star icons, vibes drawn to, hard do's/don'ts, occasions dressed for, and the **Fit Profile** (measurements, body notes, what's been flattered/failed). Writes the *stated* draft of `style.json` + `fit.json`. This is the **"say."**

**Module 2 — Inventory the wardrobe (photo-first).**
Subject shoots garments/shelves. Vision model extracts each into a `wardrobe.json` entry: type, color(s), fabric, pattern, cut/silhouette, brand, formality, season, condition, cropped thumbnail. De-dupes; flags gaps. This is the **"own."**

**Module 3 — Harvest references (the GABR-equivalent).**
Subject drops inspiration — screenshots, Pinterest, lookbooks, IG saves, owned-or-not. Each becomes a Golden Style Reference in `references/`: image + extracted attributes + **why saved** (silhouette? fabric? color story? attitude?). This is the **"save."**

**Module 4 — Synthesize + Tension Report (the core).**
Agent re-derives Style DNA *from the artifacts* (Modules 2+3), reconciles against the *stated* DNA (Module 1), and emits the **Tension Report**: where own ⟷ say ⟷ save diverge (e.g. *"You say minimalist, but 60% of saves are bold pattern — and you own almost none"*). Each divergence becomes a candidate design brief. Subject confirms/edits → final `style.json`.

**Module 5 — Activate (two outputs).**
- **Outfit planning** → from `wardrobe.json` + `style.json`: capsule templates, occasion-based outfit recipes, gap / "buy-this-to-unlock-N-outfits" suggestions.
- **Design new clothes** → from Tension Report + `references/` + `fit.json`: made-to-order **design briefs** (silhouette, fabric, measurements, construction notes) + AI-rendered concepts a tailor / made-to-measure service can quote from.

All five fold into `style.txt` (the agent prime) and the portal.

**Data flow:**
`Interview → stated DNA` · `Photos → owned` · `Harvest → saved` → **reconcile** → `final Style DNA` → branches into **Outfits** (uses owned) and **Designs** (uses saved + fit + tensions).

## How the playbook is packaged

Mirrors `generate-a-brand-os`:

- **Canonical recipe page** on the wiki: `appliedai.wiki/playbooks/generate-style-os` (parallel to `generate-agentic-brand-os`) — the single source of truth, the full runnable procedure.
- **Thin pointer skill** `generate-a-style-os` in the skills dir that WebFetches the canonical page and follows it.
- **Forkable starter** repo `style-os-template` with empty `style.json` / `wardrobe.json` / `fit.json` schemas, a `references/` folder, a `style.txt` template, and the portal scaffold — each new person is a fork, not a from-scratch build (parallel to `SupersuitUp/brand-os-template`).
- Reuses the existing portal/build pattern. A future `update-style-os` propagation skill (parallel to `update-brand-os`) handles taste evolution — **out of scope for v1**.

## The Russ dogfood (worked example)

Run after the playbook drafts:

1. Fork `style-os-template` → `russ-style-os`.
2. Module 1 interview with Russ (proxy or send him the questions).
3. Russ sends garment photos → Module 2 builds `wardrobe.json`.
4. Russ drops inspiration → Module 3 builds `references/`.
5. Module 4 → the Tension Report (the money artifact; the narrative for the worked example).
6. Module 5 → one capsule of outfit recipes + 1–2 made-to-order design concepts, tailor-ready.
7. Deploy his portal; capture the before/after as the playbook's worked example.

## v1 scope cuts (YAGNI)

No e-commerce / price-tracking · no auto-shopping · no `update-style-os` skill · no multi-person shared closets · no real-time wear-tracking / laundry state. v1 is exactly: **capture → Style DNA → Tension Report → outfits + design briefs → portal.**

## Open questions for implementation planning

- Exact `style.json` / `wardrobe.json` / `fit.json` schemas (field lists, enums for formality/season/fabric).
- Which vision model + prompt for garment extraction, and the photo-intake ergonomics (batch upload? per-garment? closet-shelf segmentation?).
- Portal: fork the existing brand-OS portal scaffold as-is, or a closet-specific layout.
- Where the design-concept renders are generated (which image model) and how fit measurements are encoded into the prompt.
