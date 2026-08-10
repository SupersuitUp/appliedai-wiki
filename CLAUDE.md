# appliedai.wiki

Ground truth for practitioners applying AI to businesses at the highest leverage possible. Deployed at https://appliedai.wiki.

Read the parent `../CLAUDE.md` first — cross-repo Docusaurus conventions, build commands, sidebar rules, and the generic-unattributed posture all live there. This file covers content conventions specific to this wiki.

---

## Audience

Operators, consultants, and founders running AI transformations on real businesses. Not researchers. Not builders at AI labs. The reader has access to the tools; they are deciding how to use them well at scale in an organization that did not start as AI-native.

---

## Page types and naming rules

### `concepts/` — noun phrase titles

Definitions of terms used across the wiki. Named frameworks, mechanisms, failure modes worth naming. Think "the thing itself."

Examples: `Command Centers`, `Fat Skills`, `Pharmakeia of AI`, `The Tool-Agent Category Error`

**Naming rule:** noun phrase. Not a sentence. Not an imperative.

### `perspectives/` — short declarative sentence titles

Opinionated takes. A claim the reader might push back on. Evidence-backed but assertive. Think "the argument."

Examples: `Acceleration Is Not Completion`, `AI Labs Speak to Investors, Not Operators`, `Knowing AI Changes How You Use It`, `AI Is Becoming the Thing We Serve`

**Naming rule:** short sentence or sentence fragment with a clear claim. Not a noun label. This is the most common mistake — do not write a perspectives title as a concept name.

### `playbooks/` — action-oriented titles

Step-by-step guides or structured approaches. Named playbooks or frameworks with operational content.

Examples: `Don't Scale Slop`, `Designing an AI Loop`, `AI Opportunity Radar`

**Naming rule:** imperative verb or named framework. Starts with action or proper name.

### `disciplines/` — noun phrase (craft area)

Deep craft areas that span many playbooks and concepts. Think "the practice."

Examples: `Harness Engineering`, `Context Engineering`, `Evals`, `Spec Writing`

**Naming rule:** noun phrase naming the craft area. This governs the *discipline* page itself, which is `disciplines/<name>.md` or `disciplines/<name>/index.md`. A discipline large enough to have chapters (`disciplines/truth-management/`, `disciplines/sop-execution-app/`) names those chapters by what they are: a principle chapter reads as a claim or an instruction (`Don't Assume Common Sense`, `Protect Your Truth`), a process chapter reads as an imperative (`Start Your Company Handbook`), and a definition chapter reads as a noun phrase (`Truth as Context`). Do not force a chapter into a craft-area noun phrase; the craft area is the folder.

### `roles/` — role title noun phrase

Descriptions of the actual seats and functions in applied-AI work.

Examples: `Applied AI Consultant`, `AI Enablement Architect`, `Leader as Workflow PM`

**Naming rule:** role title. How you would put it on a business card.

### `engagement-patterns/` — noun phrase

Reusable shapes for how AI work gets structured in an engagement.

### `note-sharers/` — firm profile + dated field notes

Each firm gets `note-sharers/<slug>/index.mdx` (firm profile) and dated field notes `<YYYY-MM-DD>-<topic-slug>.mdx`. The topic slug is kebab-case, not a sentence. The field note *title* in frontmatter is a punchy reframe of the source's thesis.

---

## Page anatomy

Every page follows this shape:

```mdx
---
title: "Page Title Here"
slug: /section/page-slug
description: "One sentence why this matters."
---

# Page Title Here

*One italic line: the tightest definition or thesis statement. This is what other pages use when they link here.*

---

## Body sections (H2)

...

## Further Reading

- [Related Page](/section/related) explanation of the connection
```

The italic definition line under the H1 is load-bearing. It is what other wiki articles use as the inline summary at first mention. Make it as precise as possible.

---

## When to add what

| You have... | Add to... |
|---|---|
| A named mechanism or framework worth defining | `concepts/` |
| An opinionated claim backed by evidence | `perspectives/` |
| A step-by-step guide or structured approach | `playbooks/` |
| A craft area deserving deep treatment | `disciplines/` |
| A role description with seat-level specificity | `roles/` |
| Field notes from a published source | `note-sharers/<firm>/` |
| A pattern that repeats across engagements | `engagement-patterns/` |

**Default bias: bullet in a field note, not a new page.** Most ideas belong as bullets in a field note or a Supporting voices section on an existing page. A new page is warranted when the concept is genuinely standalone and will be cross-linked from multiple places. When in doubt, bullet first.

---

## Note-sharers workflow

The `applied-ai-field-notes` skill handles the full intake pipeline. Key conventions for the artifacts it produces:

- Firm slug is kebab-case of the channel/publication/firm name.
- Field note file: `<YYYY-MM-DD>-<topic-slug>.mdx` inside the firm's folder.
- The field note title (frontmatter `title:`) is a punchy reframe of the source's thesis, not a description of the source.
- Firm profile `index.mdx` auto-appends one row to the Field notes log table. The Recurring themes section is edited by hand only — never auto-populated.
- The `note-sharers/index.mdx` table gets a new row when a firm is added.

---

## Voice rules

**Canonical spec: https://garysheng.com/voice.md.** Read it before drafting. It is the one source of
truth for how Gary writes and it is more nuanced than any summary of it, so this
file no longer restates the hard rules. If a local rule below ever contradicts
the canonical spec, the canonical spec wins.

Only what is SPECIFIC to this wiki lives here:

- **Operator audience.** Write for someone running real AI work on a real business. Not for a researcher. Not for a builder at a lab. Concrete over abstract.
- **Cross-links replace re-explanation.** If a concept has a page, link it and move on. This wiki is dense enough that re-explaining is always the wrong call.

---

## Cross-linking to sibling wikis

This wiki cross-links to:
- `supersuit.wiki` for PAOS, command center, and harness concepts
- `agenticbusiness.wiki` for operating-model and org-design concepts
- `traction.wiki` for EOS/seats/roles concepts

Never link to `faithwalk.garysheng.com` — that is a gated personal surface. See `../CLAUDE.md` for the full cross-wiki boundary rules.

---

## Hiding a page without deleting it

To make a page invisible on every surface while keeping the file in the repo, do both of these, then rebuild:

1. Add `draft: true` to its frontmatter.
2. Rename the file (or its folder) with a leading `_` (`git mv foo.md _foo.md`). Docusaurus's default `exclude` ignores `_*` files, so the page gets no route, no search entry, and no `draftIds` manifest line in the client bundle.

Both matter. `draft: true` alone leaves the page's path in the `draftIds` array that ships in the client JS; the `_` prefix removes it. Do not add explicit filenames to a `docs.exclude` array in `docusaurus.config.ts` — that array is serialized into the client bundle, so it leaks the very names you are hiding.

Two build-time generators are wired to honor `draft: true` so hidden pages leave no trace:

- `plugins/creation-date-plugin/` skips draft pages (and their pre-rename git history, matched by basename) so the changelog never shows a new/updated/removed event for them.
- `scripts/generate-llms-txt.sh` skips draft pages so they stay out of `llms.txt` / `llms-full.txt`.

**Deleting a hidden page is safe, and it was not always.** The changelog collector used to derive its suppression from `draft: true` in the working tree, so deleting a hidden page removed the only flag telling the collector to stay quiet: every historical row resurfaced, plus a fresh "removed" event, and the build published the exact titles the underscore was hiding. Verified live on 2026-08-09, when removing nine hidden drafts put all nine slugs and titles back into `main.*.js`. `plugins/creation-date-plugin/src/collect.ts` now derives suppression from the PATHS in git history instead: any path that ever carried a `_` segment stays suppressed under its underscored key, its bare key, and its leaf. Paths survive the file, so the rule holds after deletion. Do not revert this to a working-tree check.

Before hiding, remove or neutralize every inbound link from pages that stay (the build's `onBrokenLinks: throw` will catch any you miss), and drop any `redirects` entry in `docusaurus.config.ts` that points at the page. Verify by grepping `build/` for the page's title and slug after `pnpm run build`; expect zero hits and `draftIds":[]`. Reverse by dropping the `_` prefix and the `draft` flag.

---

## Common mistakes

- Writing a `perspectives/` title as a noun label ("The Adoption Inversion") instead of a sentence ("Knowing AI Changes How You Use It").
- Creating a new concepts page for something that already has a page under a slightly different name — always `rg` the docs folder before creating.
- Populating the Recurring themes section in a firm profile automatically — that section is hand-edited only.
- Forgetting to run `grep "—"` on new files before committing (em dashes show up often in auto-drafted prose).
- Adding content that belongs on a sibling wiki (`agenticbusiness.wiki` for operating-model content, `supersuit.wiki` for PAOS/harness concepts).
