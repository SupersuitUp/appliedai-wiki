---
name: publish-boomerang-to-appliedai
description: Publish a BOOMERANG.md as a hosted reference skill on appliedai.wiki, so Gary can hand someone a URL instead of a file. Files the payload under static/skills/<name>/, wires the three index pages that list boomerangs (the skills library, the BOOMERANG.md standard's worked examples, the Boomerang Prompt concept page), builds, pushes, verifies the live URL, and hands back the send note. Use when Gary says "host this boomerang", "put the boomerang on the wiki", "I need a boomerang for X on appliedai", "give me a link I can send them", or after generate-boomerang-prompt has authored a boomerang that should live at a stable URL. NOT for authoring the boomerang itself (that is generate-boomerang-prompt) and NOT for ordinary wiki pages (that is update-appliedai-wiki).
---

# Publish a Boomerang to appliedai.wiki

A boomerang is worth more as a link than as a file. Gary hands the URL to a
tester, a friend, or a client's staffer, and they paste it into their own chat.
This skill owns the hosting half: where the payload lives, the three pages that
have to learn about it, and the verify-and-deploy loop.

Repo: `~/Documents/github-repos/supersuit-repos/appliedai-wiki`.

## Division of labor (do not blur these)

| Job | Owner |
|---|---|
| Designing the return schema and writing the paste-in prompt | `generate-boomerang-prompt` (global) |
| The normative format the file must conform to | [BOOMERANG.md standard](https://www.appliedai.wiki/reference/standards/boomerang-md) |
| Hosting, wiring, build, deploy, the send note | this skill |
| Ordinary docs pages (concepts, perspectives, playbooks) | `update-appliedai-wiki` |

If the boomerang does not exist yet, run `generate-boomerang-prompt` first and
come back. Author to the standard, not from memory of it.

## Step 1: Name it and check for a sibling

The name is kebab-case and describes the return, not the act (`bug-report`,
`job-fit-brief`, not `interview-about-bugs`). It becomes the folder, the
`name:` frontmatter, and the URL.

```bash
cd ~/Documents/github-repos/supersuit-repos/appliedai-wiki
ls static/skills/                      # what is already hosted
rg -il "<the idea's terms>" docs/      # is this return already covered
```

A boomerang that only retargets an existing one (same areas, same schema, new
label) belongs as a Common scenario inside the existing file, not as a new one.

## Step 2: File the payload

```
static/skills/<name>/BOOMERANG.md
```

Always `BOOMERANG.md`, the canonical name, even standing alone. `static/` maps
to the site root, so this serves at `/skills/<name>/BOOMERANG.md` with no
routing work and no sidebar entry.

Two fields are load-bearing and get written wrong most often:

- `conforms_to:` must carry the standard's **current** version. Read the
  version off the standard page; do not copy it from a sibling boomerang that
  may predate a bump.
- The `Canonical source:` line points at the `www` URL of this file itself.

## Step 3: Wire the three indexes

A hosted boomerang nobody links to is invisible. All three, every time:

1. **`docs/skills/index.md`**: add a row to The library table. Link the raw
   file with the full `https://www.appliedai.wiki/skills/<name>/BOOMERANG.md`
   URL, matching the existing rows.
2. **`docs/reference/standards/boomerang-md.md`**: add a bullet to Worked
   Examples using `pathname:///skills/<name>/BOOMERANG.md` (the `pathname://`
   prefix is required for static files; a plain relative link fails the build).
   Name what this instance does that the others do not, since the list earns
   its keep by showing the contract flexing. **Update the count sentence
   underneath it** ("All four are conforming instances..."), which is the line
   agents forget.
3. **`docs/concepts/boomerang-prompt.md`**: add a Worked examples paragraph in
   the house pattern: bold lead-in, "The same shape, retargeted at X," the
   areas covered, the return, then the `pathname://` link. It goes before the
   closing "The pattern generalizes" line.

Add a playbook page only when the boomerang has a build half worth documenting
(see `generate-a-spec`). A standalone boomerang does not get a docs page, does
not need a hero comic, and does not touch `sidebars.ts`.

## Step 4: Validate

```bash
cd ~/Documents/github-repos/supersuit-repos/appliedai-wiki
grep -rn "—" static/skills/<name>/BOOMERANG.md docs/skills/index.md \
  docs/concepts/boomerang-prompt.md docs/reference/standards/boomerang-md.md
rg -n "Imagos|Magnolia|AAS|garyinparadise|garysheng" static/skills/<name>/BOOMERANG.md
pnpm run build
```

Em dashes and branding must both return nothing. The generic-unattributed
posture applies to the payload too: a boomerang naming Gary's product or a real
client is a leak, and the paste-in is the part that travels furthest.

## Step 5: Push, then verify against the live host

```bash
git add static/skills/<name>/BOOMERANG.md docs/skills/index.md \
  docs/concepts/boomerang-prompt.md docs/reference/standards/boomerang-md.md
git commit -m "boomerang: <Title>"
git push
curl -sL -o /tmp/boom.txt -w "%{http_code} %{url_effective}\n" \
  https://appliedai.wiki/skills/<name>/BOOMERANG.md
```

**The apex host 308-redirects to `www`.** A bare `curl` without `-L` returns
308 forever and reads as a failed deploy; that is expected, not a bug. Follow
the redirect and confirm a 200 plus real frontmatter in the body. Vercel takes
roughly a minute, so poll rather than concluding it failed.

## Step 6: Hand back the send note, then text Gary

Two different outputs, both required:

- **To Gary in chat:** the send note verbatim, in a fenced code block so it
  pastes clean (a blockquote drags `>` along). It must name the URL, say to
  paste into a fresh ChatGPT, Claude, or Grok chat, say **dictation, not live
  voice mode**, and say what to do with the finished artifact. Then a short
  read of what the boomerang will surface for whatever situation prompted it.
- **To Gary on iMessage:** the live URL via `update-gary-on-imessage`. A wiki
  update is not done until he has been texted the link.

## Design notes that keep proving out

- **Route the return to its real destination.** A Google Doc is the standard's
  default because most returns are read by a human. When the return feeds a
  coding agent, have the subject send back plain markdown instead: it pastes
  into a harness, a doc link does not. Say so in Delivery.
- **Sometimes the generous frame inverts.** The standard's frame licenses
  warmth. For an extraction where warmth is the enemy (a defect report, an
  incident writeup), the device is a professional forbidden from interpreting,
  because a consumer AI that starts theorizing mid-interview biases every
  answer after it. Same lever, opposite sign. Note the inversion in the worked
  example so the standard's readers see the contract flexing.
- **A required unknowns section beats a complete-looking return.** Tell the AI
  to write "Unknown" rather than infer, and require the section even when
  empty. A confident hallucinated detail costs more than a gap.
- **Scope the run.** State in the Orientation whether it is one run per subject
  or one run per event. A reporter with three bugs must run it three times.

## Skill improvement

If the standard bumps its version, if the skills library table changes shape,
or if a fourth index page starts listing boomerangs, fix this SKILL.md in the
same session per the AGENTS.md skill-improvement rule.
