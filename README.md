# wiki-template

*Docusaurus 3 starter for opinionated reference wikis. The bones of every wiki in this ecosystem, extracted once so the next one ships in an hour.*

---

## What this is

A GitHub template repo for spinning up a new Docusaurus reference wiki with the conventions already baked in:

- **Page anatomy enforced.** Frontmatter, H1 + italic one-line definition, divider, named H2 sections, Further Reading. The sample docs in `docs/` demonstrate the shape.
- **Per-wiki branding via `wiki.config.json`.** Title, tagline, URL, GitHub org/repo, noindex toggle. The Docusaurus config and prebuild scripts read from this single source of truth.
- **Search built in.** Custom MiniSearch plugin (Cmd+K / `/` trigger, in-memory index, no third-party service).
- **Bot-blocked at the edge.** `middleware.ts` returns 403 for known LLM training and AI-search user agents.
- **Noindex by default.** `robots.txt: Disallow: /` + `<meta name="robots" content="noindex, nofollow">`. Toggle via `wiki.config.json`.
- **`llms.txt` + `llms-full.txt` at build time.** Auto-generated from your docs so well-behaved AI agents can read the wiki without crawling it.
- **Page templates in `templates/`.** Copy-and-rename scaffolds for `concept.mdx`, `tool.mdx`, `playbook.mdx`, `case-study.mdx`.

## How to use this template

### 1. Create a new repo from the template

On GitHub: click **Use this template** > **Create a new repository**. Pick your org and name.

Or from the CLI:

```bash
gh repo create your-org/your-wiki --template SupersuitUp/wiki-template --private
gh repo clone your-org/your-wiki
cd your-wiki
```

### 2. Initialize

```bash
npm install
npm run init
```

`npm run init` prompts for title, tagline, URL, GitHub org/repo, description, and noindex preference, then writes `wiki.config.json` and updates `package.json`.

### 3. Customize

- **Brand colors:** edit `src/css/custom.css` (the `--ifm-color-primary-*` group).
- **Favicon and social card:** replace `static/img/favicon.png` and `static/img/docusaurus-social-card.jpg`.
- **Sidebar:** edit `sidebars.ts` as content grows. The template ships with three top-level categories (`Start Here`, `Concepts`, `Reference`).
- **Voice rules:** edit `docs/reference/voice-rules.md` to encode your wiki's writing constraints.

### 4. Run locally

```bash
npm start -- --port 4444
```

Opens at `http://localhost:4444`. Hot-reload on content changes.

### 5. Deploy

The repo ships with `vercel.json` and is ready for Vercel auto-deploy from `main`.

```bash
vercel link
vercel --prod
```

## Repo layout

```
wiki.config.json           Per-wiki branding (single source of truth)
wiki.config.schema.json    JSON schema for editor autocompletion
docusaurus.config.ts       Reads wiki.config.json; rarely edited directly
sidebars.ts                Sidebar structure; edited per wiki
docs/                      Wiki content
  start-here/              Entry point
  concepts/                Flat A-Z lexicon
  reference/               Tools, glossary, voice rules
templates/                 Copy-and-rename MDX scaffolds
src/
  css/custom.css           Brand colors + typography
  components/ShareButton   Reusable copy-link button
  theme/                   Docusaurus swizzles
plugins/search-plugin/     Custom MiniSearch
scripts/
  init-wiki.sh             `npm run init` — interactive setup
  generate-llms-txt.sh     Generates llms.txt at build
  llms-txt-env.mjs         Bridges wiki.config.json -> env vars
middleware.ts              Edge bot-block
static/
  img/                     Favicon, social card
  robots.txt               Disallow all (toggle by removing if noindex=false)
```

## Adding pages

```bash
cp templates/concept.mdx docs/concepts/my-new-term.md
cp templates/tool.mdx docs/reference/tools/my-new-tool.md
```

Then edit the new file. The frontmatter and page anatomy are already in place.

## Conventions enforced by this template

- **One coined term = one concept page.** Never redefine a term in two places. Cross-link.
- **Italic one-line definition under every H1.** Quotable, scannable.
- **Further Reading at the bottom.** Internal links first, outside sources second.
- **Absolute paths for cross-links.** `/concepts/term-name`, not relative paths.
- **`onBrokenLinks: 'throw'`.** A broken cross-link fails the build.

## License

Use it however you like. No attribution required.
