---
title: "Hyperlocal Skills"
slug: /concepts/hyperlocal-skills
description: "A file-organization pattern for harness users: a skill file lives in the repo it operates on, and a global index of symlinks makes it discoverable from anywhere. Hyperlocal home, global pointer."
image: "/img/comics/hyperlocal-skills.png"
---

# Hyperlocal Skills

*A file-organization pattern for harness users: a [skill file](/concepts/skill-files) lives in the repo it operates on, and a global index of symlinks makes it discoverable from anywhere. Hyperlocal home, global pointer.*

![Three-panel comic strip on cream paper. Title bar: HYPERLOCAL SKILLS. Panel 1, THE DRIFT: the hyperagent in matte-navy plate armor with orange seams pulls a dusty cobwebbed SKILL.md scroll reading 'Step 2: edit four files' from a dark shelf, beside a crimson X and a cyan git-diff HUD titled 'THE REPO CHANGED: now five files' listing modified files including an added skills/add-logo/SKILL.md. Paper-tape caption: 'Stored far from its repo, the skill drifts. The code moves; the procedure does not.' Panel 2, HYPERLOCAL HOME: the hyperagent kneels and slots the same scroll into a glowing cyan repo folder tree (repo/, src/, public/, skills/add-logo/SKILL.md highlighted gold) with a tag reading SAME COMMIT, SAME HISTORY. Paper-tape caption: 'The hyperagent files the skill inside the repo it operates on.' Panel 3, GLOBAL POINTER: a central inked index board labeled ~/.agents/skills/ lists plaques (add-logo, build-docs, fix-lint, deploy-prod, gen-readme, sync-schema, update-deps) with orange dotted threads arcing out to distinct glowing repo trees; a bright cyan thread runs from the add-logo plaque to the panel-2 repo tree as the hyperagent invokes it from his desk with a raised cyan-glowing gauntlet. Paper-tape caption: 'One global index of pointers. Invoke from anywhere; the truth lives with the code.' Footer bar: HYPERLOCAL HOME. GLOBAL POINTER.](/img/comics/hyperlocal-skills.png)

---

## The problem

Anyone who runs a harness seriously ends up with a skill library. Fifty skills, then a hundred. And every skill file needs an answer to one question: where does it live?

The two obvious answers are both wrong.

**Everything global.** One home-directory folder holds every skill. Discovery is easy, but a skill that only makes sense for one codebase (deploy this app, add a logo to this meme generator, regenerate this site's audio) is now divorced from the code it operates on. It is not version-controlled with that code. Collaborators cloning the repo never see it. When the repo's internals change, the skill drifts silently, because nothing ties the two together.

**Everything project-local.** Each repo carries its own skills folder and nothing else knows about it. Now the skills travel with their code, but there is no single place to see what your agent can do. Skills invisible from outside their repo stop being invoked from outside their repo. Cross-cutting workflows get duplicated into every project that needs them, and the copies diverge.

## The pattern

**Hyperlocal home, global pointer.** Two rules:

1. **The skill's source of truth lives as close to its subject as possible.** A skill that reads or writes one repo lives in that repo (`{repo}/skills/<skill-name>/SKILL.md`), version-controlled with the code it operates on. Only genuinely cross-repo skills (personal ops, workflows with no single home) live in the global folder directly.
2. **One global index points at everything.** A single directory (for example `~/.agents/skills/`) holds every skill name. Global skills live there as real folders. Hyperlocal skills appear there as symlinks back to their repo home. The index is how the harness discovers skills; the repo is where the truth lives.

Registration is one command per skill:

```bash
ln -sfn "/path/to/repo/skills/add-logo" ~/.agents/skills/add-logo
```

If you run more than one harness, each harness's own discovery path is itself a symlink into the index (`~/.claude/skills/add-logo` points at `~/.agents/skills/add-logo`, which points at the repo). One index, many harnesses, zero duplication.

## Why the bias runs hyperlocal

When a skill could plausibly live either place, put it in the repo. The asymmetry:

- **Skills drift toward their subject.** A repo-specific skill references file paths, conventions, and commands inside that repo. When the code changes, the skill needs to change in the same commit. That only happens reliably when they share a git history.
- **The skill is documentation.** A `skills/` folder in a codebase tells every future reader (human or agent) what workflows this repo supports. A skill hidden in someone's home directory documents nothing.
- **The repo's [agent rule file](/concepts/agent-rule-files) can point at it.** One line in the repo's rule file ("to add a logo, use the skill at `skills/add-logo/`") routes any agent working in that repo to the proven procedure, even an agent that has never seen your global index.
- **Cheap to promote, expensive to demote.** A hyperlocal skill that turns out to be general is easy to lift into the global folder. A global skill that turns out to be repo-specific has usually already rotted, because nothing forced it to move with the repo.

The pattern mirrors [Local-First Software](/concepts/local-first-software) one level down: keep the data (here, the procedure) where the work happens, and let the network layer (here, the symlink index) provide reach.

## A worked example

An operator maintains a small internal image-generator app. A recurring chore: adding a new brand logo option, which touches one asset folder and four source files with duplicated type unions. The procedure gets encoded once as a skill:

- `{repo}/skills/add-logo/SKILL.md` documents the asset conventions (transparent background, margin ratio, minimum resolution) and lists the exact four code touchpoints with file paths.
- The skill folder is committed, so the procedure ships with the app and appears in its diffs and PRs.
- A symlink registers it in the global index, so the operator can say "add this logo" from any working directory and the harness finds it.
- The repo's rule file gains one pointer line, so even a fresh agent session inside the repo routes to the skill instead of rediscovering the touchpoints.

Six months later the app gains a fifth touchpoint. The commit that adds it updates the skill in the same diff. That is the whole point.

## Failure modes this prevents

- **The stale global skill.** A skill written against version 1 of a repo, invoked against version 3, producing confidently wrong edits. Hyperlocal placement makes the skill visible in every refactor.
- **The invisible capability.** A workflow the agent could run perfectly, never invoked, because it lived in a repo nobody was standing in. The global pointer keeps it in the discovery set.
- **The forked procedure.** Two copies of the same skill in two places, edited independently. One source of truth per skill, everything else a symlink.
- **The undocumented repo.** A codebase whose operational workflows exist only in one person's global folder, invisible to collaborators and to any [Personal Agentic OS](https://supersuit.wiki/paos/what-it-is) built on top of it later.

---

## Further Reading

- [Skill Files](/concepts/skill-files): the primitive this pattern organizes.
- [Fat Skills](/concepts/fat-skills): what the skill itself should look like once it has a home.
- [Agent Rule Files](/concepts/agent-rule-files): the always-loaded layer that points agents at the hyperlocal skills.
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): how the harness discovers and lazy-loads skills from these paths.
- [Harness Engineering](/disciplines/harness-engineering): the craft this pattern belongs to.
- [Compounding Docs](/concepts/compounding-docs): the same keep-truth-next-to-the-work logic applied to documentation generally.
