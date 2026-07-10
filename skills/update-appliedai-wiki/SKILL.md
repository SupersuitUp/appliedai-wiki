---
name: update-appliedai-wiki
description: Create or update a page on appliedai.wiki (the Applied AI Engineer's craft wiki at ~/Documents/github-repos/supersuit-repos/appliedai-wiki). Default mode is a reflection: Gary's own take, framework, or claim drafted straight into the right page type (concept, perspective, playbook, discipline, role, engagement-pattern). It also detects create-vs-update (enrich an existing page instead of duplicating) and routes outside material elsewhere: a published external source (URL, video, PDF, a named firm's or person's material) hands off to the intake skill, and a real question someone asked hands off to the Q&A skill. Use when Gary says "update the applied ai wiki", "add this to appliedai.wiki", "create an appliedai wiki page", "reflection for the applied ai wiki", "wiki this up for appliedai", "I have a take for the applied ai wiki", or describes a concept/claim/playbook that belongs in the applied-AI craft canon. NOT for the other four SupersuitUp wikis (use intake-field-note-into-garys-wikis), NOT for personal-site or FaithWalk content.
---

# Update appliedai.wiki

The general-purpose authoring skill for appliedai.wiki. One front door for "this belongs on the Applied AI wiki," which then routes to create, update, or a specialist intake skill.

## Pre-flight: read the conventions, do not duplicate them

Before drafting, read these two files. They are the source of truth for page types, naming rules, page anatomy, voice, sidebar wiring, and the generic-unattributed posture. This skill does not restate them, it routes you to them and adds the decision logic on top.

1. `~/Documents/github-repos/supersuit-repos/appliedai-wiki/CLAUDE.md` (page types, "When to add what" table, page anatomy, voice rules, common mistakes).
2. `~/Documents/github-repos/supersuit-repos/CLAUDE.md` (cross-wiki posture, routing, sidebar conventions, build/deploy, comic heroes).

## Step 1: Classify the input (the routing fork)

| The input is... | Route to | How |
|---|---|---|
| **A reflection** (Gary's own take, framework, claim, lesson from his work). **This is the default.** | Stay in this skill. Create or update a page directly. | Step 2 onward. |
| **An outside resource** (a URL, YouTube video, PDF, article, or the published material of a named firm or person) | The intake pipeline | Invoke `applied-ai-field-notes` (the canonical note-sharers pipeline for this wiki) or `intake-field-note-into-garys-wikis` (cross-wiki router). Then stop. |
| **A real question someone asked** (screenshot, paste, "field this question") | The Q&A pipeline | Invoke `add-appliedai-wiki-qa`. Then stop. |

If unsure whether something is a reflection or an outside resource: if Gary is the one making the claim and there is no single external source being summarized, it is a reflection. Treat it as the default and stay here.

## Step 2: Create vs update (always check before creating)

Creating a near-duplicate page is the most common failure mode. Before writing anything new:

```bash
cd ~/Documents/github-repos/supersuit-repos/appliedai-wiki
rg -il "<key terms of the idea>" docs/
```

- If a page already covers this idea, **update it**: add a section, sharpen the italic definition line, or add a bullet to a "Supporting voices" / body section. Enrich, do not fork.
- **Default bias (from the wiki CLAUDE.md): a bullet or section on an existing page beats a new page.** A new page is warranted only when the idea is genuinely standalone and will be cross-linked from several places.

## Step 3: Pick the page type (only if creating)

Use the "When to add what" table in the wiki CLAUDE.md. Quick map:

- Named mechanism or framework worth defining → `concepts/` (noun-phrase title).
- An opinionated, arguable claim backed by evidence → `perspectives/` (short declarative-sentence title, **not** a noun label).
- A step-by-step guide or named framework with operational steps → `playbooks/` (imperative or named-framework title).
- A deep craft area spanning many pages → `disciplines/` (noun phrase).
- A seat or function → `roles/` (role title).
- A reusable engagement shape → `engagement-patterns/` (noun phrase).

The single most common naming mistake: writing a `perspectives/` title as a noun label. Perspectives are claims ("Owners Near an Exit Are the Easiest AI Buyers"), not labels ("The Pre-Exit Remodel").

## Step 4: Draft (page anatomy + voice + posture)

Follow the page anatomy in the wiki CLAUDE.md exactly: frontmatter (`title`, `description`, and `slug` for sections that need it), H1, one italic definition/thesis line directly under the H1 (load-bearing, this is what other pages quote at first mention), H2 body sections, optional `## Sources`, and a `## Further Reading` list.

Non-negotiables:

- **Generic-unattributed posture.** No org branding (no Imagos, AAS, Magnolia, garyinparadise, real client or counterparty names). Anonymize real people to their role ("a boutique M&A advisor", "the head of content"). This wiki is public but unbranded. See parent CLAUDE.md.
- **Voice rules.** No em dashes. No filler ("really", "just", "very", "truly"). No recapping the previous section. Bold named frameworks on introduction. Cross-links replace re-explanation: if a concept has a page, link it and move on.
- **Cross-link aggressively.** Link the canonical home for every concept you reference, and add a `## Further Reading` list of 3 to 5 sibling pages. `rg docs/` to find the real slugs. Every link must resolve (the build enforces this).
- **Operator audience.** Concrete over abstract. Written for someone running real AI work on a real business.

## Step 5: Hero comic (MANDATORY for new pages)

**Every new page ships with a comic hero in the same session. Never ship text-only and offer the hero as a follow-up** (standing order from Gary, 2026-07-10). Use the `supersuit-org-comic` global skill (it bundles the canonical brand references and IP-name discipline). The image embeds as the first element after the italic definition line, with reproducible alt text, and the frontmatter gets `image: "/img/comics/<slug>.png"` (og:image rule in the parent CLAUDE.md). If generation fails after reasonable retries, tell Gary before pushing a heroless page. Only skip when editing an existing page that already has its hero.

## Step 6: Sidebar

Most sections (`concepts`, `perspectives`, `playbooks`, `disciplines`, `roles`, `engagement-patterns`, `people-to-follow`, `note-sharers`, `questions`) are **autogenerated** in `sidebars.ts`. A new page in those folders needs **no** `sidebars.ts` edit. Only curated sections (Start Here, Onboarding, Reference) list items explicitly. Confirm against `sidebars.ts` before assuming you must wire anything.

## Step 7: Validate

```bash
cd ~/Documents/github-repos/supersuit-repos/appliedai-wiki
grep -rn "—" docs/<new-or-edited-file>     # must return nothing
rg -n "Imagos|Magnolia|AAS|garyinparadise" docs/<file>   # no org branding / real names
pnpm run build                              # onBrokenLinks: throw catches every dead link
```

Fix anything the build throws before committing. A broken cross-link fails the Vercel deploy.

## Step 8: Commit and push

```bash
git add docs/<file> [static/img/comics/<hero>.png if added]
git commit -m "perspective: <Title>"    # or concept: / playbook: / etc.
git push
```

Pushing to `main` auto-deploys to https://appliedai.wiki via Vercel. Per Gary's standing preference, push once the page is in a good spot, do not wait to be asked.

## Skill improvement

If any convention here drifts from the wiki's CLAUDE.md (page types renamed, sidebar logic changed, a new intake skill supersedes the ones referenced), fix this SKILL.md in the same session per the AGENTS.md skill-improvement rule.
