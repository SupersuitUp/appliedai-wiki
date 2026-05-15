---
title: "Start your wiki"
slug: /playbooks/start-your-wiki
description: "Build a personal or organizational wiki that sharpens your thinking, stops the 'saying the same thing twice' tax, and gives your agents real context to work with."
---

# Start your wiki

*A wiki is the layer where your thinking becomes legible, searchable, and reusable. The practitioner playbook for building one.*

---

## When to use this

This playbook is framed for an individual leader or practitioner who wants to start smaller, prove the practice to themselves, and then graduate ideas into organizational truth when they earn it.

## Why start a wiki

A wiki is the layer where your thinking becomes legible, searchable, and reusable. The reasons to start one compound on each other:

**You're tired of saying the same thing twice.** Every time you explain something to a new client, a new teammate, or a new AI agent, you're paying a tax. A wiki converts that tax into a one-time investment.

**Your way of doing things is not quite like other people's.** If you operate anywhere near your own unique edge, you're charting new territory. You have a unique read on reality. That edge is worth documenting, and the act of writing it down sharpens it.

**Documented truth is how your agents become actually useful.** An agent operating without your written context is stuck at "generic expert." An agent operating with your wiki as context is stuck at "knows how I think." This is the core of [context engineering](/disciplines/context-engineering) and the foundation of an agent workspace.

**It gets everyone on the same page.** "On the same page" is such a cliché because it points at something real. What you think you've aligned on in conversation is not what you've actually aligned on. A written artifact is the thing you can point to and interrogate together. As AI agents become a meaningful part of any team, the quality and coherence of your organization is downstream of the precision and comprehensiveness of what's on the page.

**Documenting is a game, not a chore.** Your first draft will miss the mark. That's fine. Everything is version controlled. The fun is in the loop of documenting your current understanding, using it, bumping into where it's wrong, and refining. Over months, you develop an operational model of your world that no one else has.

---

## Before you start: the humility check

There is a version of wiki-building that is pure ego. Don't do that one.

The version worth doing starts with a humility check. You are claiming to have a unique insight on some slice of reality. That claim has to survive contact with:

- **Other people's prior work.** Someone has probably thought about this before. Find them. Cite them. If they named it first and named it well, use their word. You don't always have to invent vocabulary. Acknowledging good names is a sign of a serious wiki, not a weak one.
- **Reality.** A wiki that never updates is a wiki that assumes you were right the first time. You won't be. Update as you learn. Old positions stay in the git history.
- **Edge cases.** If your principle cracks under a real example, the principle is incomplete. Document the edge case alongside the principle.

If you're a leader charting frontier territory, you have a responsibility to name phenomena accurately. Naming a pattern that's likely to repeat is one of the highest-leverage things a leader can do. But naming it wrong is worse than not naming it at all, because bad names calcify. Slow down on the naming.

---

## Personal wiki vs organizational wiki

Both individuals and organizations can have wikis. Both can have private wikis and public wikis. Wikis can be segmented by audience (team-only, advisor-only, public).

The practical difference between personal and organizational wikis is **gravitas**.

- **Personal wiki** is a playground. You're sketching ideas, testing concepts, developing vocabulary. You can be wrong quickly and often. Nothing is promised to anyone.
- **Organizational wiki** is a contract. Every entry is a commitment that the organization stands behind. It binds how agents act, how teammates align, how clients understand you.

There is something more serious about saying an idea "graduated into the wiki" than saying it "lives in a Google Doc." That seriousness is useful. Use it.

**The graduation pipeline:**

1. Idea starts as a note, voice memo, or personal wiki draft.
2. You live with it, share it informally with colleagues, let it absorb feedback.
3. When it's earned its place, it graduates: personal wiki to organizational wiki.
4. When it's no longer true, it gets removed, archived, or rewritten (git history preserves the reasoning).

You can also move in the other direction. If a personal wiki entry starts getting traction from colleagues or clients, that's the signal it might be ready to graduate into organizational truth.

---

## The first-principles case for technical documentation

Software engineers have been sharpening the tools for good technical documentation for decades. Before you build your own wiki, spend 30 minutes reading what they've learned. Search "what is the purpose of technical documentation" and read a few canonical answers.

The short version: documentation exists to make truth about a system transferable. Transferable across time (so you don't forget), across people (so new collaborators can ramp), and now across agents (so your AI knows what your brain knows).

Every best practice flows from that purpose. Clear titles. Concise prose. Examples. Cross-links. Search. All of it is in service of making truth transferable.

This is the stance a leader takes toward their own thinking. Your wiki is not a personal blog. It's an infrastructure project that happens to be written in prose.

---

## Where to host it: GitHub first

Before picking a platform, pick a home. **Your wiki should live in a GitHub repository.** This is non-negotiable for anyone serious about building a practice on top of documented truth.

Which account the repo sits under is the important choice:

- **If your organization already has a GitHub org**, the organizational wiki lives there as a private (or public) repo. Team members get access through org permissions.
- **If your organization does not have a GitHub org yet, create one.** This is worth doing even if you're the only person in it today. GitHub orgs let you separate organizational repos from personal work, manage team access when you grow, and give you a clean URL for future collaborators. Five minutes to set up.
- **For a personal wiki**, use a repo under your personal GitHub username. Private by default, public if you want the wiki to be open and readable by others (many people do, because a public wiki is also a reputation asset).
- **For an individual leader running a company wiki before the team has caught up**, start a repo under the org account anyway. Keep it private. When teammates are ready to join, the infrastructure is already in place.

You can have multiple wikis across different accounts: a private personal wiki under your username, a public one for ideas you want to share, and one or more organizational wikis under your org. Use the visibility settings to mirror the sensitivity tiers of the content.

## Why version control is the whole point

The real magic of a GitHub-backed wiki is not the hosting. It is the **version control**. Every change you make is recorded with a timestamp, a commit message explaining why, and a diff showing exactly what moved. This produces two things that compound over time:

**Accountability to your own evolution.** When you change your mind about something, you don't just silently update the doc. You commit the change with a reason. Six months later, you can read that commit and remember why you thought differently. This is what it means to be rigorous about your own thinking rather than coasting on whatever you currently believe.

**The gratification of watching your model of reality sharpen.** Running `git log` on a wiki entry you've been updating for a year is genuinely one of the best feelings in this practice. You can see the embarrassing early drafts, the moments you realized you were wrong, the refinements that came from real experience. The wiki is a record of you becoming more accurate. That is what a serious intellectual life looks like in the age of AI: a version-controlled model of reality that gets sharper every month, rather than a fixed set of opinions you happen to hold today.

This is why a GitHub-backed wiki beats a Google Doc. A Google Doc flattens your history. Git preserves it.

## Where it lives on your machine: the `~/Documents/github-repos/` pattern

Your wiki on GitHub is the canonical copy. On your local machine, you want every repo you work on sitting side-by-side inside a single parent folder so you can open the whole thing in one editor window and cross-reference, edit, and maintain coherence across repos without context-switching.

The pattern that works:

```
~/Documents/github-repos/
├── your-agent-workspace/    # Your agent workspace
├── your-personal-wiki/      # Your personal wiki
├── your-org-wiki/           # Your organizational wiki (company handbook)
├── your-client-project-a/
├── your-client-project-b/
└── ...
```

Your wiki sits at the same level as your agent workspace. That matters. When your agent is running in your workspace repo and needs to read or update your wiki, it's one directory hop away. When you're writing in the wiki and need context from a client project, it's right there. Opening the whole `github-repos/` folder in VS Code (or any editor) gives you a single pane of glass over your entire operation.

**Why this pattern pays off:**

- **Cross-repo coherence.** You can grep across every repo at once. When you rename a concept, you can update it everywhere in one session.
- **Agent-friendly.** Claude Code, Cursor, Codex, and every other harness can be pointed at the parent folder and will happily navigate across repos. Your agent sees the whole landscape, not one repo at a time.
- **No hunting.** Every repo lives in exactly one predictable place. New machine? `git clone` each one back into `~/Documents/github-repos/`. Done.

The folder name doesn't have to be `github-repos`. Some people use `~/dev/` or `~/code/`. What matters is that it's a single, predictable parent folder for everything you version-control.

## Picking a static site generator

On top of your GitHub repo, you want a **static site generator** that turns your markdown files into a navigable, searchable website. Plain markdown means agents can grep and edit it directly, which is the whole point. A static site generator gives you navigation, search, and a shareable URL that colleagues and clients can actually use.

Reasonable defaults include:

- **Docusaurus** (React-based, common in technical docs).
- **MkDocs** (Python-based, often used for technical product docs).
- **GitBook** (hosted, more polished UI out of the box, less control).
- **Docsify** (runtime-rendered, no build step).
- **Gatsby** (React-based, more flexible if you want a full marketing site + docs combined).
- **Obsidian Publish** (native to Obsidian vaults, great if you're already there).
- **Mintlify**, **Nextra**, **VitePress**, etc.

Things to look for when evaluating:

- **Local markdown as source of truth.** If the platform stores content in a proprietary database or behind an API, pass.
- **Built-in search.** You'll have hundreds of documents on a deep topic. Search is non-negotiable.
- **SEO basics.** Static HTML output, sitemaps, metadata. If you're writing publicly, you want Google to be able to index it.
- **Sidebar / navigation control.** You need to be able to organize docs into sections that make sense as the wiki grows.
- **Agent accessibility.** Can an AI agent open the repo, read files, and make edits? If yes, you're set.

Experiment with one, ship it, and move on. The platform choice matters less than the practice of actually writing.

---

## Publish llms.txt and llms-full.txt

Once your wiki is live, the single highest-leverage thing you can add is a pair of plain-text files at the root of your site: `/llms.txt` (an index of every page) and `/llms-full.txt` (the full corpus concatenated). They turn your wiki into something any LLM can ground itself in, without you having to host a chatbot.

For Docusaurus, the [`docusaurus-plugin-llms`](https://github.com/rachfop/docusaurus-plugin-llms) community plugin adds both files to every build with a few lines of config. Other SSGs have similar plugins, and the format is simple enough to generate with a shell script if you cannot find one.

Publish the files. Link them from your README. Stop thinking about whether to build a chat. The reader's own LLM is a better chat than anything you would host.

---

## Ready-to-paste prompts

Copy these into an agent (Claude Code, Cursor, Codex, etc.) and paste as-is. **No placeholders to fill in.** Each prompt asks the agent to infer what it can from context (current directory, CLAUDE.md, git state, existing files, prior conversation) and then interview you only for what it couldn't infer.

### Prompt 1: initialize a new Docusaurus wiki

Use this the first time. Best run from inside `~/Documents/github-repos/` or wherever you keep your repos.

```
I want to create a new Docusaurus-powered wiki in a new GitHub repo.

Variables you'll need: repo name, GitHub account (user or org),
visibility (private/public), wiki title, tagline, local path.

First, infer what you can:
- Check my current working directory. If I'm already inside a
  parent folder like ~/Documents/github-repos/ or ~/dev/, default
  the local path to a new subdirectory there.
- Run `gh auth status` and `gh org list` to see which GitHub
  accounts I have access to. If there's only one org, that's a
  reasonable default for an organizational wiki.
- Check if there's any README.md in the parent directory that
  hints at naming conventions.

Briefly tell me what you inferred and what's still missing. Then
interview me for the missing variables, one question at a time.
If I'm not sure on any answer, offer 2-3 sensible options.

Once you have all the answers, do this:
1. Create the directory at the chosen path.
2. Initialize a fresh Docusaurus project there using the official
   classic template. Use the command from docusaurus.io/docs.
3. Clean up default content: remove the blog section, delete the
   Docusaurus tutorial docs, reset the sidebar to empty.
4. Update docusaurus.config.ts (or .js) with the chosen title and
   tagline. Leave url and baseUrl as placeholders I can fill in
   when I deploy.
5. Create a top-level README.md as the truth index: short
   description of what this wiki is, plus a placeholder entry
   list.
6. Create CLAUDE.md (or AGENTS.md) at the repo root with basic
   voice rules: no em dashes, concise, add cross-links, always
   update the README index when adding a new doc.
7. git init, first commit, create the GitHub repo via `gh repo
   create` under the chosen account with the chosen visibility,
   push.
8. Verify `npm start` runs and the dev site loads.

Report back with the local path, the GitHub URL, and anything I
still need to do manually.
```

### Prompt 2: write your first wiki entry

Use this for the first few entries, while you're still establishing voice.

```
I want to write a new wiki entry. This is for the voice-setting
phase, so take extra care with phrasing and word choice.

Variables you'll need: topic, my voice rules, entry type,
cross-link candidates.

First, infer what you can:
- Check my current working directory to confirm which wiki I'm in.
- Read the repo's CLAUDE.md / AGENTS.md and README.md. Voice rules
  are usually already documented there.
- Scan the existing entries. They reveal the type system
  (concepts, SOPs, etc.) and the current voice.
- Check my recent messages in this conversation for the topic.

Briefly tell me what you inferred and what's still missing. Then
interview me for the gaps, one question at a time:
- If the topic is vague, ask me to describe it in my own words,
  then ask 2-3 follow-ups to surface the unique angle I have.
- If voice rules aren't documented yet, ask me for 2-3 lines on
  how I write and any tone rules.
- If the entry type isn't obvious, propose one and let me confirm.
- Propose cross-link candidates from the existing entries and ask
  me to approve or adjust.

Once you have enough:

1. Propose a filename (kebab-case) and a sidebar_position.
2. Draft the entry in my voice. Concise. Concrete examples. No
   hedging.
3. Suggest 2-3 cross-links and which existing entries should gain
   inbound links back.
4. Show me the draft and proposed link edits. Wait for my approval
   before updating the README index or committing.
```

### Prompt 3: the daily "add another wiki post"

Use this as your default capture workflow once the first few entries exist.

```
I want to add another wiki post.

First, infer what you can:
- Confirm which wiki repo I'm in (current working directory).
- Read CLAUDE.md / AGENTS.md and the README index.
- Scan the last few commits to see what I've been thinking about
  lately.
- Check this conversation: have I already pasted a braindump or
  hinted at a topic?

If I already gave you a braindump or topic in this conversation,
use it. Don't ask me to repeat myself.

If there's no topic yet, ask exactly one question: "Do you want to
paste a braindump, or should I interview you cold?"

If I paste a braindump: read it, then ask 2-3 clarifying questions
to surface context I left out.

If I want a cold interview: ask "what's on your mind lately that's
worth capturing?" and go from there. One question at a time. Follow
up when my answer is thin.

Before drafting, also:
- Read at least 3 existing entries most related to the topic, so
  you have real context.
- Tell me what type of entry you think this is (concept, principle,
  SOP, case study) and propose a title. Let me push back.

Then draft in my established voice. Preserve my phrasing where it's
good. Clean up filler and repetition.

Add cross-links both ways: links from this entry to related
entries, and links from related entries back to this one. Update
the README index.

Show me the draft and the proposed link edits. Wait for my approval
before committing.
```

### Prompt 4: graduate a personal wiki entry to your organizational wiki

Use this when an idea has earned its way from personal playground to organizational commitment.

```
I want to graduate a wiki entry from my personal wiki to my
organizational wiki.

Variables you'll need: source entry, source repo path, destination
repo path, destination section, source-side disposition (delete or
leave pointer).

First, infer what you can:
- Check my current working directory. If I'm inside a personal
  wiki repo, that's the source.
- Look at sibling directories under the parent folder.
- Read the destination repo's README / sidebar to map out its
  sections.
- Check this conversation: have I already named the entry I want
  to graduate?

Briefly tell me what you inferred. Then interview me for the gaps,
one question at a time.

Once you have the answers:
1. Read the source entry and the destination wiki's voice rules
   (CLAUDE.md and README.md at the org-wiki root) so your rewrite
   matches the org's voice, which may be more formal.
2. Rewrite the entry for the org wiki. Drop any personal-only
   cross-links. Add org-wiki cross-links where relevant.
3. Place the new file in the right section, update the destination
   README index, and update sidebars/navigation if needed.
4. Apply the chosen source-side change (delete or replace with
   pointer).
5. Show me both the new entry and the source-side change. Wait for
   my approval before committing on either side.
```

---

## The first few documents matter most

Your first few wiki documents do two jobs at once: they communicate the content, and they teach the AI agents who will help you write future documents how you think.

So spend disproportionate time on the first five to ten entries. Get the voice right. Get the word choice right. Get the level of concision right. Every future document you write with an agent's help will inherit the pattern you establish here.

Practical moves:

- Write the first few entries yourself, without an agent. Let your natural voice show up.
- Once the voice is established, bring in the agent. Give it the first few docs as style references and say "write the next one in this voice."
- Re-read what the agent drafts. If it starts drifting toward generic AI prose, correct it explicitly and update your style guide.

---

## The capture loop

Once the first few docs exist and the voice is set, the daily loop is:

1. **You experience something.** A client call reveals a pattern. A project surfaces an edge case. You realize you've been explaining the same thing for the third time.
2. **You brain-dump it.** Speak into a voice transcriber or type freely. Don't edit yet. Just get the raw thinking out.
3. **You name it.** Is this a new SOP? A new concept? A new principle? A case study? Naming the type of entry is half the work.
4. **You draft it with an agent.** Say "add another wiki post about X" and let the agent propose structure and first draft. You edit for voice and accuracy.
5. **You cross-link.** Ask the agent to identify related existing entries and add links in both directions. Cross-linking is how wikis stay coherent.
6. **You commit.** One commit per entry. Commit message describes what changed and why.

This loop gets faster with practice. After the first month, "add another wiki post" goes from 45 minutes to 10.

---

## Wire in your agents

A wiki that your agents don't read is a wiki that's only half working.

- **README.md at the root**: serves as the truth index. Every document listed with a one-line summary.
- **CLAUDE.md / AGENTS.md**: tells the agent how to work in this repo specifically. Voice rules, cross-linking expectations, what to do before creating a new file.
- **Related instruction files**: see [instruction files](/concepts/instruction-files) for the broader pattern.

The agent should always load the README and relevant CLAUDE.md before helping you write or edit a document. Without that context, it produces generic docs that contradict existing entries.

---

## Cross-links are the whole game

A wiki with no internal links is a folder of isolated files. A wiki with dense, accurate cross-links is a graph of thought that agents and humans can traverse to build understanding.

Minimum standards once you have more than ten entries:

- Every entry links to at least 2 to 3 related entries.
- Every new entry earns inbound links from older related entries (bidirectional).
- Related concepts outside your wiki (other people's wikis, papers, books) get cited with real URLs.
- Orphan pages (zero inbound links) get audited and either linked or removed.

Treat link maintenance as a recurring discipline.

---

## Maintenance is the whole second half

A wiki that isn't maintained decays into a liability faster than you'd think. Stale entries produce confident, well-reasoned actions from your agents based on outdated premises.

Set up a weekly coherence check that flags:

- Entries older than 30 days that may need review.
- Contradictions between entries.
- Broken links.
- Orphan pages.

Act on the report. A report nobody reads is worse than no report.

---

## What "done" looks like

You'll never be "done" with a wiki. You will hit these milestones:

- **Week 1:** first ten entries published. Voice established. Agent wired in.
- **Month 1:** fifty entries. Search actually helps you find old thinking. You've stopped repeating yourself.
- **Month 3:** colleagues and clients start citing your entries back to you. Something graduates from personal wiki to organizational wiki.
- **Month 6:** your agents produce visibly better work because their context is visibly better. New hires or collaborators ramp faster than they would have.

The compounding starts once you cross about 30 to 50 entries with good cross-linking. Before that, you're investing. After that, the wiki starts paying you back on every use.

---

## The north star

A living map of your unique understanding of the world, version-controlled, agent-accessible, and coherent enough that your future self, your collaborators, and your AI agents can all operate from the same premises.

You stopped repeating yourself. Your edge got sharper. Your agents got real. The people you work with actually know what you mean.

That's the practice.

## Further Reading

- [Context engineering](/disciplines/context-engineering). The broader skill your wiki develops.
- [Compounding docs](/foundations/compounding-docs). The flywheel a well-maintained wiki creates.
- [Knowledge repo design](/playbooks/knowledge-repo-design). The structural patterns that work at scale.
