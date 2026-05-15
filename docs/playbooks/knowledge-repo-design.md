---
title: Knowledge Repo Design
slug: /playbooks/knowledge-repo-design
description: A monorepo pattern for knowledge work. Shared raw material in one pantry, product folders that assemble that material into outputs. Forager first, chef second.
---

# Knowledge Repo Design

*A monorepo pattern for knowledge work. Shared raw material in one pantry, product folders that assemble that material into outputs. Forager first, chef second.*

---

When a knowledge worker is producing multiple outputs that draw on the same underlying material (a book and a course, a podcast and a newsletter, a client report and a public essay), the temptation is to silo each product into its own repo. That makes the same raw material get re-collected, re-framed, and re-edited every time. The fix is a monorepo where shared ingredients live in one pantry and product folders assemble those ingredients into final outputs.

## Design Principles

1. **Forager not chef.** The structure prioritizes collecting raw ingredients first, assembling them later. Cooking is downstream of stocking the pantry. If you optimize for the meal before you have the ingredients, you cook the same three dishes forever.
2. **Shared ingredients.** Stories, frameworks, excerpts, and exercises serve multiple products. They live in a shared ingredients folder, not inside any single product folder.
3. **One shared knowledge base.** A single `docs/` is the source of truth for research, interviews, perspectives, ICP profiles, and raw material. Every product reads from it.
4. **Product folders are assembly zones.** Product folders take shared ingredients and assemble them into product-specific outputs. They are kitchens, not gardens.
5. **Version-controlled outputs.** The product updates like software, with changelogs and transparent versioning. Readers can see what changed.

## Top-Level Structure

```
your-knowledge-repo/
├── CLAUDE.md
├── PROJECT-STATUS.md
├── README.md
│
├── docs/                             # Shared knowledge base
│   ├── vision/
│   ├── icp/                          # Audience profiles
│   ├── perspectives/                 # Your POVs
│   ├── interviews/                   # Transcripts and notes
│   ├── reference-books/              # Notes from inputs you've read
│   ├── research/
│   ├── ingredients/                  # SHARED raw material pantry
│   │   ├── stories/
│   │   ├── frameworks/
│   │   ├── excerpts/
│   │   └── exercises/
│   └── plans/
│
├── product-a/                        # First product
│   ├── architecture/
│   ├── drafts/
│   ├── fragments/
│   └── final/
│
├── product-b/                        # Second product
│   ├── architecture/
│   ├── ingredients/                  # Product-specific raw material
│   │   ├── walkthroughs/
│   │   ├── assignments/
│   │   └── case-studies/
│   ├── modules/
│   │   ├── section-1/
│   │   ├── section-2/
│   │   └── section-3/
│   ├── production/
│   └── strategy/
│
├── strategy/                         # Cross-product business strategy
├── prompts/
├── logs/
├── skills/
└── community/
```

## Ingredient Flow

Shared ingredients in `docs/ingredients/` are referenced by path from any product that needs them:

```
docs/ingredients/stories/gig-work-soul-cost.md      -> product A + product B
docs/ingredients/frameworks/great-transition.md      -> product A Ch 2 + product B Module 0.1
product-b/ingredients/walkthroughs/agent-setup.md    -> product B only (product-specific)
product-a/fragments/founder-obedience.md             -> product A only (product-specific)
```

The rule: if more than one product would benefit from a piece of raw material, it goes in `docs/ingredients/`. If only one product will ever touch it, it stays inside that product's own folder.

## Product Subfolder Pattern

Inside each product folder, use the same convention so the structure becomes muscle memory:

- `architecture/`: the blueprint. Outline, audience journey, learning or reading objectives, cross-product maps.
- `ingredients/`: product-specific raw material that does not belong in the shared pantry.
- `modules/` or `chapters/` or `episodes/`: the assembled content. References shared ingredients by path.
- `production/`: the pipeline. Recording, editing, asset tracking, tech stack.
- `strategy/`: product-specific decisions. Pricing, funnel, launch plan, content marketing.

## When to Use This Pattern

Use it when:

- You have two or more knowledge products drawing from a shared body of material.
- You catch yourself rewriting the same story or framework for different audiences.
- Your research and interviews are scattered across products and you cannot tell which version is canonical.
- You want product-specific assembly to evolve independently while keeping the underlying truth synced.

Skip it when:

- You have a single product and no plans for a second. The overhead is not worth it.
- The products are so different they share nothing but a creator. Then they are separate operations.

## Failure Modes

- **Pantry sprawl.** `docs/ingredients/` becomes a junk drawer because nothing gets pruned. Treat it like a real pantry. Throw out what is stale.
- **Premature assembly.** Building the product folder before there is enough raw material to assemble from. Forage first.
- **Duplicate ingredients across products.** If you find the same story copy-pasted into multiple product folders, move it to the shared pantry and reference it from both.
- **Strategy lag.** Ingredients pile up but no product folder ever ships. The pantry is full; the kitchen is cold. Set a shipping cadence.

## Further Reading

- [Teammate Discipline](/foundations/teammate-discipline) for how to behave inside a knowledge repo someone else owns
