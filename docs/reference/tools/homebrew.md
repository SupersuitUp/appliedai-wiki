---
title: "Homebrew"
slug: /reference/tools/homebrew
description: "The package manager for macOS. It is how you install almost every other developer tool on a Mac in one line."
---

# Homebrew

*The package manager for macOS. It is how you install almost every other developer tool on a Mac in one line.*

---

## What it is

Homebrew (`brew`) is an open-source package manager for macOS and Linux. Think of it as an App Store for developer tools. When you run `brew install <something>`, it downloads that tool and puts it on your computer in a standard place, configured to work correctly. When you run `brew upgrade`, it updates everything you installed through it.

## What it costs

Free. Open source. Widely trusted and used by millions of developers.

## When to use it (and when not)

**Use Homebrew when:**

- You are on a Mac and want one consistent install pattern for developer tools (Node.js, Git, GitHub CLI, VS Code, and many more).
- You want a single upgrade command (`brew upgrade`) to keep everything current.
- You want a tool to install correctly the first time without manual configuration.

**When not to use it:**

- On Windows, use [WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/) instead (built into Windows 10 and 11).
- On Linux, your native package manager (`apt`, `dnf`, `pacman`) is usually the right choice. Homebrew on Linux works but is rarely the default.
- For App Store apps, GUI applications with their own installers, or tools that need system-level integration that Homebrew does not handle.

## Is this safe?

Yes. The install command is the official script from [brew.sh](https://brew.sh), pulled directly from Homebrew's GitHub repository over HTTPS. You can inspect the script yourself before running it. Homebrew does not collect personal data; it only installs the tools you explicitly request.

## Setup pointer

Official documentation and install: [brew.sh](https://brew.sh).

Run the install command in your terminal. After it finishes, Homebrew prints two extra commands to add `brew` to your shell's PATH. Run those, then open a new terminal tab so the new tab picks up the updated PATH.

Verify with `brew --version`.

## Further Reading

- [Git](/reference/tools/git), [GitHub CLI](/reference/tools/github-cli), [Node.js](/reference/tools/nodejs), [VS Code](/reference/tools/vscode): tools commonly installed via Homebrew on Mac.
