---
title: "Git"
slug: /reference/tools/git
description: "Version control. Tracks every change to every file in your workspace, forever, for free."
---

# Git

*Version control. Tracks every change to every file in your workspace, forever, for free.*

---

## What it is

Git is a free, open-source version control system. Every time you change a file in a Git-tracked folder, Git can snapshot that change along with a short message about what and why. You can view the history, revert to any previous state, branch into parallel experiments, and merge those back.

It was originally written by Linus Torvalds (the creator of Linux) and is the de facto standard for source control in software development. It runs entirely on your computer. You do not need an internet connection or an account to use it.

## What it costs

Free. Open source. Installed on billions of machines.

## When to use it (and when not)

**Use Git when:**

- You want an infinite undo history, audit log, and safety net for any folder full of files (agent workspace, project code, knowledge base).
- You want to make agent-driven edits safe. Git lets you see the diff and roll back cleanly if the agent writes something wrong.
- You want to push the state of a folder to GitHub or another remote and keep working from any machine.

**When not to use it:**

- For binary asset workflows where Git LFS or a dedicated DAM is the better fit.
- For files containing secrets. Never commit credentials, API keys, or production data.

## Git vs GitHub

- **Git** runs on your computer. It tracks changes.
- **GitHub** is a website where you can upload a copy of your Git-tracked project for backup, collaboration, and discovery.

You need Git. GitHub is strongly recommended but technically optional.

## Setup pointer

Official documentation and download: [git-scm.com](https://git-scm.com).

On most Macs, Git is already installed. Check first with `git --version` before installing. On Mac: `brew install git`. On Windows: `winget install Git.Git`. On Linux: use your distribution's package manager.

For a full introduction, [GitHub's own guide](https://docs.github.com/en/get-started/start-your-journey/about-github-and-git) is excellent.

## Further Reading

- [GitHub CLI](/reference/tools/github-cli): the companion `gh` command for terminal-based GitHub operations.
- [VS Code](/reference/tools/vscode): the editor that surfaces Git diffs and history without leaving the workspace.
- [Disciplines](/disciplines): the practices Git underwrites by making rollback cheap.
