# appliedai.wiki

*Curated ground truth for practitioners applying AI to businesses at the highest leverage possible.*

Live at **[appliedai.wiki](https://appliedai.wiki)** (noindex, public).

---

## What this wiki is

A craft wiki for the implementers who serve principals (founders, CEOs, operators) running businesses with real stakes. The reader is the applied AI engineer or consultant who walks into a room with someone like that and is expected to deliver leverage, not slideware.

The wiki is opinionated. It captures patterns, foundations, and concrete plays that have produced real outcomes in real engagements. It is not a survey of AI. It is the playbook the curators wish they had on day one.

## Who it is for

- Applied AI engineers and consultants who multiply principals
- Operators evaluating what good applied AI implementation actually looks like
- Founders and team leads scoping a serious AI engagement

Not for AI hobbyists, generic "AI for business" tourists, or vendors looking for a directory.

## How the wiki is shaped

- **[Start Here](https://appliedai.wiki/)**: the framing, the audience, the in-progress disclaimer
- **[Foundations](https://appliedai.wiki/foundations)**: the load-bearing principles every engagement is built on
- **[Disciplines](https://appliedai.wiki/disciplines)**: the named practices an implementer needs in their kit
- **[Playbooks](https://appliedai.wiki/playbooks)**: concrete procedures with concrete shapes
- **[Engagement Patterns](https://appliedai.wiki/engagement-patterns)**: the shapes a serious engagement actually takes
- **[Roles](https://appliedai.wiki/roles)**: the named roles inside a king's AI org
- **[Concepts](https://appliedai.wiki/concepts)**: the lexicon, flat A-Z
- **[Reference](https://appliedai.wiki/reference)**: glossary, voice rules, quality rubric

## In-progress disclaimer

The wiki is a working document. The applied AI craft for multiplying principals gets unearthed through real engagements, not theory. Expect pruning, rewriting, and new pages as the curators surface fresh patterns from the field.

## Voice rules

- No em dashes. Use periods, commas, or colons.
- One coined term lives in one place. Cross-link, do not redefine.
- Italic one-line definition under every H1.
- Further Reading at the bottom, internal links first.
- Absolute paths for cross-links: `/disciplines/term`, not relative.
- `onBrokenLinks: 'throw'`. A broken cross-link fails the build.

Full voice rules: [reference/voice-rules](https://appliedai.wiki/reference/voice-rules).

## Quality rubric

The bar this wiki is held to lives at [reference/quality-rubric](https://appliedai.wiki/reference/quality-rubric). Seven dimensions: audience fit, craft density, attribution honesty, voice discipline, structural integrity, freshness, and signal-to-noise. Every new page is judged against the rubric before merge.

## Local development

```bash
npm install
npm start -- --port 4444
```

Opens at `http://localhost:4444`. Hot-reload on content changes.

Build to validate (`onBrokenLinks: 'throw'` will catch broken cross-links):

```bash
npm run build
```

## Deploy

Vercel auto-deploys from `main`. To deploy manually:

```bash
vercel --prod
```

## Repo layout

```
wiki.config.json    Per-wiki branding (single source of truth)
docusaurus.config.ts
sidebars.ts
docs/
  start-here/
  foundations/
  disciplines/
  playbooks/
  engagement-patterns/
  roles/
  people-to-follow/
  concepts/
  reference/
src/
  css/custom.css    Brand colors + typography
plugins/search-plugin/
scripts/
  generate-llms-txt.sh
  llms-txt-env.mjs
middleware.ts       Edge bot-block
static/
  img/favicon.png
  robots.txt
```

## Lineage

Forked from [SupersuitUp/wiki-template](https://github.com/SupersuitUp/wiki-template) on 2026-05-15. Conventions and tooling inherit from the template; content is original.
