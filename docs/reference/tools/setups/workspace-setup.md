---
title: "Workspace Setup"
slug: /reference/tools/setups/workspace-setup
description: "Create your private agent workspace from a starter template without ever leaving your harness. One prompt, done."
---

# Set Up Your Workspace

*Create your private agent workspace from a starter template without ever leaving your harness. One prompt, done.*

---

This is the canonical setup flow, referenced by [Claude Code Setup](/reference/tools/setups/claude-code-setup) and [Codex Setup](/reference/tools/setups/codex-setup). It assumes your harness is installed and you have the GitHub CLI (`gh`) authenticated.

## Why a template, not a clone

The recommended pattern uses a **GitHub template repository**. You create your own private copy from it. You never clone an upstream repo directly.

Why it matters:

- **Your repo is private.** On your GitHub account from the first commit.
- **You cannot accidentally push upstream.** You are not a collaborator on the template.
- **Future template updates are easy to pull.** A safety-disabled upstream remote lets you pull new skills and improvements without any risk of pushing back.
- **Git history is preserved.** You can merge upstream updates cleanly.

## Prerequisites

- A working harness: [Claude Code](/reference/tools/setups/claude-code-setup) or [Codex](/reference/tools/setups/codex-setup).
- [GitHub CLI](/reference/tools/github-cli) installed (`brew install gh` on Mac, `winget install GitHub.cli` on Windows).
- GitHub CLI authenticated: `gh auth status` should show a logged-in user. If not: `gh auth login` and follow the prompts.

## The setup flow (one prompt)

Launch your harness in **any directory** (it does not matter which, since the first thing it will do is navigate to your projects folder):

- **Claude Code:** `claude`
- **Codex:** `codex`

Paste this prompt (replace `<TEMPLATE_OWNER>/<TEMPLATE_REPO>` with the template you are using):

```text
Set up my private agent workspace. Specifically:

1. Ask me what I want to name my workspace. Suggest names like my-workspace, apex-os, <my-name>-command-center. This becomes both the GitHub repo name and the local folder name.
2. Ensure a sensible projects folder exists on my machine. Mac: ~/Documents/github-repos/. Windows: C:\Users\<me>\Documents\github-repos\. Create it if missing.
3. From inside that projects folder, run: gh repo create <workspace-name> --template <TEMPLATE_OWNER>/<TEMPLATE_REPO> --private --clone. This creates a new private repo on my GitHub account from the template and clones it locally in one command.
4. cd into the new cloned folder. Add an upstream remote with a disabled push URL so I can pull future template updates without ever accidentally pushing back:
   - git remote add upstream https://github.com/<TEMPLATE_OWNER>/<TEMPLATE_REPO>.git
   - git remote set-url --push upstream DISABLED
5. Report the final folder path to me.
```

Your harness will execute every step via the GitHub CLI and `git`. You stay in the terminal the whole time.

## Then let onboard take over

**Do not personalize the files yourself.** A well-designed template ships with an `onboard` skill that does this for you, and it will evolve over time as the template improves.

Exit your current session (`/exit` or Ctrl+D) and launch your harness again **from inside the new workspace folder** (not its parent). Skill auto-discovery and `AGENTS.md` routing only work when the current working directory is the workspace root.

```bash
cd <your-workspace-path>    # e.g., cd ~/Documents/github-repos/my-workspace
claude                       # or: codex
```

If you prefer VS Code: use `code <workspace-path>` (pointing at the workspace folder, not its parent), then open the integrated terminal. Verify with `pwd` (Mac/Linux) or `cd` (Windows) before launching the harness. Then type `/` in the harness session. You should see the built-in skills (`/onboard`, `/sync-with-upstream`, etc.). If you do not, you are in the wrong folder.

The repo's `AGENTS.md` sees that `user/USER.md` does not yet exist and auto-runs the `onboard` skill on your first session in that workspace. It will:

- Ask you to import any existing AI conversation history (ChatGPT exports, Claude conversations, docs about yourself)
- Interview you to build `user/USER.md`: who you are, what you value, what you are building, your 90-day vision
- Walk you through a strategic interview on the thing that matters most right now
- Save the output to `artifacts/` so you walk away with a real plan

You did not write any of this logic into the setup. It lives in the skill, which ships with the repo and updates with every template release.

## Pulling future template updates

When the template ships new skills, improved scripts, or refinements, pull them into your workspace at any time by asking your harness:

```text
Sync with upstream.
```

The repo ships with a `sync-with-upstream` skill that:

- Fetches from the upstream template
- Shows you what is new (especially any new skills) before merging
- Handles conflicts gracefully (your personal files are never touched)
- Pushes the merge to your private `origin`

You cannot accidentally push to the template. The push URL is `DISABLED` and you are not a collaborator.

## Troubleshooting

- **`gh: command not found`**: install and authenticate: `brew install gh && gh auth login` (Mac) or `winget install GitHub.cli && gh auth login` (Windows).
- **`gh auth login` asks a lot of questions**: choose HTTPS, authenticate via browser, the defaults are fine.
- **Your harness cannot run `gh`**: make sure your harness was launched in a shell that has `gh` on its PATH. Close and reopen the terminal after installing `gh` so the new PATH is picked up.
- **`onboard` does not auto-run**: make sure you launched your harness **inside** the workspace folder, not from its parent directory. Harnesses read the nearest `AGENTS.md` / `CLAUDE.md` in the current working directory.
- **Claude Code does not see slash commands like `/onboard` (Windows only)**: the template ships a `.claude/skills` symlink that points at `.agents/skills/`. On Mac/Linux and on modern Git for Windows (with `core.symlinks=true`) this works out of the box. If your clone shows `.claude/skills` as a one-line text file instead of a working link, run the included fallback script from the workspace root:

  ```bash
  powershell -ExecutionPolicy Bypass -File scripts/setup-claude-skills-windows.ps1
  ```

  This creates a directory junction from `.claude/skills` to `.agents/skills/` so Claude Code discovers the skills. It does not require admin rights.

## What you now have

- A private agent workspace on your GitHub account, named whatever you wanted
- A local clone in your projects folder
- An upstream remote wired for pulling future template updates, with the push URL safety-disabled
- A `user/USER.md` populated by `onboard` on your first session in the workspace
- The full set of built-in skills ready to use: `onboard`, `create-user-profile`, `process-braindump`, `prep-for-meeting`, `process-transcript`, `create-skill`, `sync-with-upstream`

You are ready to build.

---

## Further Reading

- [Claude Code Setup](/reference/tools/setups/claude-code-setup): install Claude Code as your harness.
- [Codex Setup](/reference/tools/setups/codex-setup): install Codex as your harness.
- [Harness Engineering](/disciplines/harness-engineering): why the wrapper around the model matters.
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): the parts of a working harness, in order.
