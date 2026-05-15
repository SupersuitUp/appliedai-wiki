---
title: "VS Code"
slug: /reference/tools/vscode
description: "The recommended text editor for working with a markdown-first agent workspace. Free, cross-platform, and pairs naturally with terminal-based agent harnesses."
---

# VS Code

*The recommended text editor for working with a markdown-first agent workspace. Free, cross-platform, and pairs naturally with terminal-based agent harnesses.*

---

## What it is

Visual Studio Code (VS Code) is a free, open-source code editor made by Microsoft. It shows you a file tree on the left, the file you are editing in the middle, and an integrated terminal at the bottom. For working on a markdown-first agent workspace, that layout is ideal: you can see the files your agent creates and updates, and talk to your agent in the terminal at the same time.

## What it costs

Free. Open source. Available for Mac, Windows, and Linux.

## When to use it (and when not)

**Use VS Code when:**

- You want a file tree, an editor pane, and an integrated terminal in a single window.
- You want to see your agent's diffs and previews without leaving the editor.
- You want a tool that runs everywhere your collaborators run.

**When not to use it:**

- If you prefer a specific editor (Zed, Neovim, Cursor) and have it tuned. The choice is not load-bearing; the workflow patterns transfer.
- If you want a fully open-source build with no Microsoft telemetry. Use [VSCodium](https://vscodium.com), a community rebuild of the same source.

## Power moves

Three small habits that change how you work alongside your agent.

**Preview markdown.** When the agent writes or edits a markdown file, hit `Cmd+Shift+V` (Mac) or `Ctrl+Shift+V` (Windows/Linux) to open the rendered preview right next to the source. You read what your agent just produced without leaving the editor.

**Run multiple agent sessions in parallel.** Click the `+` icon at the top of the integrated terminal to spawn a second terminal in the same window. Now one terminal can run an agent working on a strategy doc while another runs a research pass on a different topic. Click `+` again for a third. Each terminal is its own independent session, so the agents do not step on each other.

**Name your terminals by task.** Right-click the terminal label in the terminal panel and pick **Rename**. Type the task: `strategy-doc`, `research-pass`, `daily-recap`. Five terminals deep, you can tell at a glance which agent is doing what.

These three moves apply identically to Cursor, since Cursor is a fork of VS Code.

## Setup pointer

Official documentation and download: [code.visualstudio.com](https://code.visualstudio.com).

On Mac: `brew install --cask visual-studio-code`. On Windows: `winget install Microsoft.VisualStudioCode`. Or download directly from the official site for any platform.

Verify by opening the editor, pointing it at a workspace folder, and confirming the file tree shows up. Open the integrated terminal with `` Cmd+` `` (Mac) or `` Ctrl+` `` (Windows/Linux).

## Further Reading

- [Git](/reference/tools/git): VS Code surfaces Git diffs and history inline.
