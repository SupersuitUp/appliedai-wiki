---
name: update-appliedai-wiki
description: Create or update a page on appliedai.wiki (the Applied AI Engineer's craft wiki at ~/Documents/github-repos/supersuit-repos/appliedai-wiki). Default mode is a reflection: Gary's own take, framework, or claim drafted straight into the right page type (concept, perspective, playbook, discipline, role, engagement-pattern). It also detects create-vs-update (enrich an existing page instead of duplicating) and routes outside material elsewhere: a published external source (URL, video, PDF, a named firm's or person's material) hands off to the intake skill, and a real question someone asked hands off to the Q&A skill. It also HOSTS agent-runnable files: "publish this skill on the wiki" means shipping the actual SKILL.md (and any script) under static/skills/ so any agent can fetch it at a URL, not writing a prose page about it. Use when Gary says "update the applied ai wiki", "add this to appliedai.wiki", "create an appliedai wiki page", "reflection for the applied ai wiki", "wiki this up for appliedai", "I have a take for the applied ai wiki", "publish this skill on appliedai", "host this skill on the wiki", or describes a concept/claim/playbook that belongs in the applied-AI craft canon. NOT for the other four SupersuitUp wikis (use intake-field-note-into-garys-wikis), NOT for personal-site or FaithWalk content.
---

# Update appliedai.wiki

The general-purpose authoring skill for appliedai.wiki. One front door for "this belongs on the Applied AI wiki," which then routes to create, update, or a specialist intake skill.

## Pre-flight: read the conventions, do not duplicate them

Before drafting, read these two files. They are the source of truth for page types, naming rules, page anatomy, voice, sidebar wiring, and the generic-unattributed posture. This skill does not restate them, it routes you to them and adds the decision logic on top.

1. `~/Documents/github-repos/supersuit-repos/appliedai-wiki/CLAUDE.md` (page types, "When to add what" table, page anatomy, voice rules, common mistakes).
2. `~/Documents/github-repos/supersuit-repos/CLAUDE.md` (cross-wiki posture, routing, sidebar conventions, build/deploy, comic heroes).

## Step 0: Work in a git worktree (authoring path)

If this input routes to a specialist skill (outside resource, question, boomerang), that skill owns its own worktree. If you stay in this skill to author or edit a page (the default reflection path), do the work in a throwaway git worktree off `main`, per the canonical mechanism in `~/Documents/github-repos/supersuit-repos/CLAUDE.md` ("Isolation: wiki authoring skills work in a git worktree"). Create the worktree for `appliedai-wiki` with the page slug, make every edit and generate the hero inside it, run `pnpm run build` there as the gate, then merge to `main` and push (which deploys). Read-only checks (the create-vs-update dedup search below) can run in the primary checkout.

## Step 1: Classify the input (the routing fork)

| The input is... | Route to | How |
|---|---|---|
| **A reflection** (Gary's own take, framework, claim, lesson from his work). **This is the default.** | Stay in this skill. Create or update a page directly. | Step 2 onward. |
| **An outside resource** (a URL, YouTube video, PDF, article, or the published material of a named firm or person) | The intake pipeline | Invoke `applied-ai-field-notes` (the canonical note-sharers pipeline for this wiki) or `intake-field-note-into-garys-wikis` (cross-wiki router). Then stop. |
| **A real question someone asked** (screenshot, paste, "field this question") | The Q&A pipeline | Invoke `add-appliedai-wiki-qa`. Then stop. |
| **A boomerang prompt** (a paste-in Gary hands a person so their AI interviews them and returns build-ready material) | The hosted-skill pipeline | Invoke `publish-boomerang-to-appliedai` (authoring first via `generate-boomerang-prompt` if the file does not exist). It ships under `static/skills/`, not `docs/`. Then stop. |
| **A skill or other agent-runnable file to host** (an existing `SKILL.md`, `GENERATE.md`, or the script one needs, that Gary wants fetchable at a URL) | The hosted-file pipeline | Step 1b below. It ships under `static/skills/`, not `docs/`. |
| **A page that used to exist** ("unhide X", "restore X", "bring back the X articles", "republish what I hid") | The unhide path | Step 1c below. Do NOT rewrite the page from scratch. |

If unsure whether something is a reflection or an outside resource: if Gary is the one making the claim and there is no single external source being summarized, it is a reflection. Treat it as the default and stay here.

**"Publish this skill on the wiki" means HOST THE ARTIFACT, not write a page about it.** Gary
says "publish X on appliedai" when he wants the runnable file reachable at a URL. Drafting a
prose page about the idea instead is the wrong output, and it is the failure this row exists
to prevent (2026-07-30: the request was read as a reflection and a perspective was drafted
before Gary corrected it by hand). He may ALSO want an article, but that is a second,
separately-stated job. When both are wanted, host first, then return to Step 2.

## Step 1b: Hosting an agent-runnable file (skills, generators)

Only for the hosted-file row above. A hosted file is not a docs page: no page type, no
italic definition line, no hero comic. The only `docs/` edit is one row in the library.

1. **Check it should be hosted at all.** Do NOT host a copy of something that already has
   its own public repo (parent `CLAUDE.md`, "Hosting agent-readable files"). Link the repo
   instead. Hosting is for artifacts whose only public home is the wiki, which is the usual
   case for a skill living in a private `~/.agents/skills/`.
2. **File the payload** at `static/skills/<name>/SKILL.md`, plus any script it needs
   alongside it (`static/skills/<name>/<script>`). Multi-file is fine and already in use.
   Prefer one source per file over inlining a script into the SKILL.md, since two copies in
   one folder still drift.
3. **Genericize for a public, unbranded audience.** This is the step that is always missed,
   because the local original is written for one machine:
   - No absolute personal paths (`/Users/<name>/...`). Use `~/` paths.
   - No personal names. Address the reader as "you" or "the operator".
   - A personal shell alias or command must be overridable (a `--command` flag, an env var)
     and explained where it first appears, since it means nothing to a stranger.
   - State platform constraints honestly (OS, editor, permissions). The library claims to be
     harness-agnostic; a skill that is not must say so in its own row.
4. **Wire the library**: add one row to `docs/skills/index.md` with the raw-file link(s).
5. **Cross-link it both ways.** If any article argues for what this file does, the article's
   body links the hosted file by its raw URL, and the row links the article. A hosted skill
   nobody can find from the prose it belongs to is shipped but not published.
6. **Build, commit, push** (Steps 7 and 8).
7. **Verify with a BLOCKED bot UA, never a plain curl.** A default `curl` returns 200 while
   every agent the file exists for gets 403. See `publish-boomerang-to-appliedai` for the
   full lesson and the `middleware.ts` fix if it fails:

   ```bash
   curl -sL -A "ClaudeBot/1.0" -o /tmp/hosted.md -w "%{http_code}\n" \
     https://appliedai.wiki/skills/<name>/SKILL.md
   head -3 /tmp/hosted.md    # a 200 that served an error page is still a failure
   ```

   Then re-fetch any hosted script from its live URL and confirm it still parses
   (`bash -n`). Shipping a script that 200s but is truncated or mangled is the silent case.

## Step 1c: Unhiding a page that was hidden or deleted

Only for the unhide row. **The page is in git, not in `docs/`.** Never redraft from
memory: find it first, because a restored original beats a rewrite that quietly
drops the argument Gary wanted back.

```bash
cd ~/Documents/github-repos/supersuit-repos/appliedai-wiki
git log --oneline --all -i --grep="hid"      # the hide commit, and any later delete
git log --oneline --diff-filter=D --all -- "docs/**/*<term>*"
```

Then follow **"Unhiding is more than the reverse of hiding"** in the wiki's own
`CLAUDE.md`, which owns the checklist (inbound links, redirects, the restored
page's own outbound links, and the changelog's path-keyed suppression). Two
things that only bite on this path:

- **The hide commit's diff will not reverse-apply.** Months of renames have moved
  the pages that used to link in, so `git apply -R` aborts on "does not exist in
  index". Re-link by hand against the current text.
- **A page hidden before a section-wide naming pass comes back carrying the old
  convention.** Say so, and offer the rename plus redirects, rather than letting
  it sit as a silent exception.

## Step 2: Create vs update (always check before creating)

Creating a near-duplicate page is the most common failure mode. Before writing anything new:

```bash
cd ~/Documents/github-repos/supersuit-repos/appliedai-wiki
find docs -name "*.md*" | sed 's|docs/||' | sort          # read ALL ~290 titles once
for t in <term1> <term2> <term3>; do echo "--- $t ---"; rg -il "$t" docs/; done
```

Do both, in that order. The wiki is large enough that a single `rg` on the idea's own
vocabulary reliably misses the page that already owns the idea under different words,
which is exactly the "near-duplicate under a slightly different name" failure in the
wiki CLAUDE.md. Scanning the full title list is what catches it. Then sweep several
keyword angles, not one: the idea's terms, its metaphor, its opposite, and the audience
it serves.

**Gary names things by SOUND, and the page spells them out.** He will say "happs",
"chaps", "PAOS" — an acronym or a compression that appears nowhere in the file, because
the page is titled `Harness Apps` at `concepts/harness-apps.md`. Grepping the spoken
form returns nothing and the honest-looking conclusion ("this doesn't exist yet, it's
net-new") is wrong. Expand the sound to its likely words before searching, and never
report that something is new on the strength of a keyword grep: the title scan is what
settles it. Earned 2026-08-12, when a rename was reported to Gary as a net-new concept
because `rg 'haps'` and `rg 'happs'` both came back empty against an existing page.

**Both sweeps above read the working tree, so neither can see a page that was
deleted.** This wiki has deleted pages that Gary later wanted back. If the idea
smells like something he has argued before, add
`git log --oneline --diff-filter=D --all -- "docs/**"` before concluding it is
net-new, and route to Step 1c if it turns up.

Expect to kill candidates. On a batch of six ideas, two being already covered is a
normal, healthy result, and reporting what you dropped and why is part of the output.

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

**Verify a docs page with a BROWSER UA, the opposite of Step 1b.** `middleware.ts`
hard-403s `ClaudeBot` and every other AI-crawler UA on HTML routes; hosted files
escape it only because the matcher excludes `skills/` and `generators/`. Reusing
Step 1b's bot-UA curl on a `docs/` page returns 403 on a perfectly good deploy,
which reads as a failed ship.

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36"
curl -sL -A "$UA" https://appliedai.wiki/<section>/<slug> | grep -o '<title>[^<]*'
```

Check the `<title>`, not just the status: a redirect stub from
`plugin-client-redirects` also returns 200, with no title. For a renamed page,
confirm the old slug's stub by reading its `canonical` href.

## Skill improvement

If any convention here drifts from the wiki's CLAUDE.md (page types renamed, sidebar logic changed, a new intake skill supersedes the ones referenced), fix this SKILL.md in the same session per the AGENTS.md skill-improvement rule.
