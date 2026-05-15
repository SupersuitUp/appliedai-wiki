---
title: Quality Rubric
slug: /reference/quality-rubric
description: "How we hold this wiki to a bar. Seven dimensions, mechanical checks, auto-fail conditions, and the gut test."
---

# Quality Rubric

*How we hold this wiki to a bar. Seven dimensions, mechanical checks, auto-fail conditions, and the gut test, in that order.*

---

This rubric exists so that future passes on the wiki are not run on vibes. Hold the wiki against each dimension. The mechanical checks either pass or fail. The qualitative checks have explicit tests. The auto-fail conditions are red lights that override everything else.

## 1. Mission alignment: the Monday test

The wiki's premise: it is the twenty percent of moves that produce eighty percent of business outcomes. Not an encyclopedia.

Pick ten random pages. For each, state in one sentence what an implementer does differently on Monday because of reading it. If fewer than eight of ten pass, the wiki is drifting toward encyclopedia.

Foundation pages get a partial pass because they shape worldview, but they should be no more than a quarter of total pages.

## 2. Audience fit: the senior consultant test

Read five random pages with the posture of a senior consultant being paid four hundred thousand dollars a year to deliver an implementation. For each, two questions:

- Does it respect their time? No teach-from-zero, no preamble, no padding.
- Does it tell them something they did not already know, or sharpen something they half-knew?

If five of five clear both bars, the audience fit is right. If pages feel like AI literacy for beginners, reframe or cut.

## 3. Voice and anatomy: mechanical

These are grep and build checks. Either they pass or they do not.

- `grep -rn '—' docs/` returns zero
- `grep -rniE 'AAS|Applied AI Society|Imagos|Curia Regis|Travis Oliphant|Pegasus|human unicorn|Daniel as a service|counselors to the kings|strategy for kings|Christofuturist|1000x' docs/` returns zero. (The standalone word "king" is allowed as a canonical term-of-art on this wiki and is not forbidden. Only the Curia-Regis-flavored phrases above are.)
- One hundred percent of pages have: frontmatter (title, slug, description), H1 matching title, italic one-line definition under H1, `---` divider, Further Reading section
- `npm run build` passes with `onBrokenLinks: 'throw'`
- The `slug:` in frontmatter matches the file path on every page

If any of these is non-zero, fix before evaluating the rest.

## 4. Cross-linking density: graph not list

A wiki is a graph. A directory is a list. Measure:

- Average outbound Further Reading links per page is at least three
- Every concept page has at least two entries in Further Reading
- Zero orphan pages. Every page is in the sidebar and linked from at least one other page
- The lexicon is reachable from every section's index page

Quick test: pick a concept page at random. Click through Further Reading three hops. If you cannot reach disciplines, playbooks, or foundations within three hops, the wiki is too siloed.

## 5. Coverage of load-bearing topics

The "do you have what an implementer actually needs" check.

- **Disciplines:** prompting, context engineering, evals, agents, retrieval, observability. At least one substantive page each (eight hundred words or more, three named sections or more).
- **Playbooks:** at least one for each engagement phase: scoping, kickoff or week one, mid-engagement, handoff.
- **Foundations:** at least ten curated reads (books, talks, papers) with annotations.
- **Tools:** at least Claude Code, Codex, Hermes, git, github-cli, homebrew, node, vscode, plus at minimum one eval tool and one observability tool.
- **Standards:** ALIGN.md and INTEGRATE.md present with template and example.
- **Roles:** at least five named roles, including CAIO, applied AI consultant, AI enablement architect, applied AI engineer, applied AI streamliner.
- **Onboarding:** "what we ship" and "what we do not ship" stated explicitly, plus the implementer posture.

A gap is a missing pillar, not a missing entry. Each pillar present is a pass.

## 6. Findability: the thirty-second test

A senior implementer who has never seen the wiki should find the answer to a real question in under thirty seconds without using search.

Test it. Pick five questions you would actually ask:

- How do I scope a pilot?
- What is the eval framework?
- When do I use Claude Code versus Codex?
- How do I price?
- What does good context engineering look like?

If four of five reach the right page in under thirty seconds via sidebar navigation alone, findability is right. If they need search every time, the information architecture is wrong.

## 7. Maintainability: will it rot

A wiki that one operator can sustain is fine. A wiki that takes a team is a liability.

- Voice rules page exists at `/reference/voice-rules` and is current
- Page templates exist (`templates/concept.mdx`, `templates/tool.mdx`, others) and are kept in sync with the current page shape
- Adding a new page is a copy-rename-fill operation, not a from-scratch operation
- No concept is defined in two places. If two pages need the same definition, one links to the other.
- A coherence check (em-dash sweep, brand-term grep, build) runs cleanly any week without manual cleanup

## Auto-fail conditions

Each of these is an instant red. Fix before any other evaluation matters.

- Build fails on `onBrokenLinks: 'throw'`
- Any occurrence of forbidden brand terms in published `docs/`
- Any page without an italic one-line definition under its H1
- Any page that reads as a pitch or marketing for any organization
- Any public attribution of a person or company that was not explicitly approved
- Any leaked client-specific detail (names, deal sizes, identifying industry signals) in `engagement-patterns/`
- The noindex toggle accidentally off

## The gut test

Use this last, after everything else has been worked through. Would you confidently send the URL to a senior applied AI consultant you respect, someone you want to take you seriously, without preamble or "ignore the rough edges"?

- **A grade:** Yes, send it. They will come away thinking the operator has an unusual edge.
- **B grade:** Yes, send it, but you would watch their face. The substance is there; the polish is not all the way there.
- **C grade:** You would add a caveat email. "Still building this. Curious what you think." This means: not ready to be the wiki's primary positioning surface yet.
- **D grade:** You would not send it. This means: figure out why before continuing harvest.

## When to run this rubric

- After every major harvest pass (every fifty pages or so)
- Before any external sharing
- Quarterly, as a maintenance discipline

## Further Reading

- [Voice Rules](/reference/voice-rules) for the writing constraints
- [Start Here](/) for the wiki's premise and audience
