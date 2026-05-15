---
title: "Claude Code Setup"
slug: /reference/tools/setups/claude-code-setup
description: "A practical guide to installing and configuring Claude Code as the harness for your agent workspace."
---

# Setting Up Claude Code

*Claude Code is Anthropic's AI agent. It reads your files, writes files, runs commands, and operates inside your workspace. This guide gets it running as the engine for your agent workspace.*

---

## Why Claude Code

Claude Code is Anthropic's agentic coding tool. It reads your workspace, runs commands, writes files, and supports persistent instruction files (`CLAUDE.md`) that shape how it operates across sessions. It is available as a CLI, a desktop app (Mac and Windows), and a web app. It is one of several harnesses that work well for an agent workspace. Others include [OpenAI Codex](/reference/tools/setups/codex-setup), OpenCode, and Cursor.

The tradeoff: Claude Code requires a paid Anthropic subscription (Claude Max at $100/mo or $200/mo, or API usage). If cost is a constraint, see [Codex Setup](/reference/tools/setups/codex-setup) if you already have a ChatGPT subscription. All harnesses work with the same workspace folder structure. Your files are portable.

---

## Prerequisites

Every code block below is a **terminal command**. Open the terminal (Terminal on Mac, PowerShell on Windows), click the copy icon in the top-right of the block, paste, and press Enter.

[Git](/reference/tools/git) (version control) is required on all platforms. **Windows also requires [Git for Windows](https://git-scm.com/downloads/win)** specifically, because Claude Code uses Git Bash internally to run commands.

**Mac:** Git comes preinstalled on most Macs. Check first:

```bash title="Terminal"
git --version
```

If you get `command not found`, install Apple's developer command-line tools:

```bash title="Terminal"
xcode-select --install
```

**Windows:** Install [Git for Windows](https://git-scm.com/downloads/win) and accept the defaults. This also installs Git Bash, which Claude Code uses internally. Or via WinGet:

```powershell title="PowerShell"
winget install Git.Git
```

**Linux:**

```bash title="Terminal"
sudo apt install git    # Debian/Ubuntu
sudo dnf install git    # Fedora
```

[GitHub CLI](/reference/tools/github-cli) (`gh`) is also required. It handles GitHub authentication for the starter repo's sync script and lets your agent create repos, manage collaborators, and push your workspace without prompts.

**Mac:**

```bash title="Terminal"
brew install gh
gh auth login
```

**Windows:**

```powershell title="PowerShell"
winget install GitHub.cli
gh auth login
```

**Linux:** see the [official install instructions](https://github.com/cli/cli/blob/trunk/docs/install_linux.md) for your distro, then run `gh auth login`.

`gh auth login` is an interactive walkthrough. The defaults are the right answer almost every time. When in doubt, press **Enter**. The full step-by-step is on the [GitHub CLI tool page](/reference/tools/github-cli).

[VS Code](/reference/tools/vscode) (recommended, not required): Download from [code.visualstudio.com](https://code.visualstudio.com). Claude Code runs in any terminal, but VS Code gives you a file explorer and integrated terminal side by side, which makes it easy to see what your agent is doing.

---

## Install Claude Code

### Option 1: Native installer (recommended)

The native installer is the fastest method, requires no dependencies (Node.js is not needed), and auto-updates in the background.

**Mac / Linux / WSL:**

```bash title="Terminal"
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows (PowerShell):**

```powershell title="PowerShell"
irm https://claude.ai/install.ps1 | iex
```

If you see `The token '&&' is not a valid statement separator`, you are in PowerShell, not CMD. Use the PowerShell command above.

**Windows (CMD):**

```batch title="Command Prompt"
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Your prompt shows `PS C:\` when you are in PowerShell. If you see that, use the PowerShell command above.

### Option 2: Package managers

**Homebrew (Mac / Linux):**

```bash title="Terminal"
brew install --cask claude-code
```

Homebrew installations do not auto-update. Run `brew upgrade claude-code` periodically.

**WinGet (Windows):**

```powershell title="PowerShell"
winget install Anthropic.ClaudeCode
```

WinGet installations do not auto-update. Run `winget upgrade Anthropic.ClaudeCode` periodically.

### Verify

```bash title="Terminal"
claude --version
```

**If you get `command not found: claude`:** Claude Code is installed but its binary is not on your shell's PATH. On Mac and Linux, add it to your shell config and reload:

```bash title="Terminal"
echo 'export PATH="$HOME/.claude/local:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Use `~/.bashrc` instead of `~/.zshrc` if you are on bash. Open a new terminal window and run `claude --version` again. On Windows, WinGet and the official installer handle PATH automatically; if the command still fails, restart PowerShell.

On first launch, Claude Code walks you through authenticating with your Anthropic account. You need a Pro, Max, Team, or Enterprise plan (the free Claude.ai plan does not include Claude Code).

---

## Windows-specific notes

Claude Code on Windows runs in PowerShell, CMD, or Git Bash. You do not need to run PowerShell as Administrator.

If Claude Code cannot find your Git Bash installation, set the path in your settings (run `/config` inside Claude Code, or edit `~/.claude/settings.json`):

```json
{
  "env": {
    "CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe"
  }
}
```

WSL is also supported (both WSL 1 and WSL 2). If you use WSL, install Claude Code inside the WSL terminal using the Mac/Linux instructions.

---

## Set up your workspace

Installing Claude Code gives you the harness. Next, create your private workspace.

**Go to the canonical [Workspace Setup](/reference/tools/setups/workspace-setup) doc.** Follow the single-prompt flow there. It is shared across all harnesses and stays in sync with the underlying template so these instructions never drift.

The short version: launch `claude`, paste one prompt, and it uses `gh` to create a private repo from the template on your GitHub account, clones it, and wires the upstream remote with a disabled push URL. Then you launch Claude Code from inside the new workspace and the repo's built-in onboard skill handles personalization (profile, AI history import, strategic interview).

Once your workspace exists, open the **workspace folder itself** in VS Code. Do not open its parent (e.g., `~/Documents/github-repos/`). The `.agents/skills/` directory Claude Code auto-discovers is only found when VS Code has the workspace folder as its root.

```bash title="Terminal"
cd ~/Documents/github-repos    # wherever your workspace lives
code my-workspace               # passes the workspace folder directly to VS Code
```

**Sanity check.** Once VS Code is open, launch `claude` in the integrated terminal and type `/`. You should see the built-in skills (`/onboard`, `/sync-with-upstream`, etc.) in the slash-command menu. If you only see Claude's bundled commands, you opened the parent folder. Close and re-open with the workspace folder directly.

---

## First session

Open the terminal in VS Code (`` Ctrl+` `` or `` Cmd+` `` on Mac) and launch Claude Code:

```bash title="Terminal"
claude
```

On your very first session, Claude Code will read the CLAUDE.md instructions and notice that `user/USER.md` does not exist. It will run the `create-user-profile` skill automatically: an interview that asks you about who you are, what you are building, your values, your current situation, and your 90-day vision. Answer honestly. This file becomes the foundation everything else builds on.

After the interview, your `user/USER.md` exists. Every future session starts with Claude Code reading that file plus everything else in your workspace. The more context you add over time, the more useful every session becomes.

---

## Daily usage

The core loop is simple: talk to your agent. Some examples of what to say:

**Brain dump.** "I just got off a call with Sarah. She is interested in partnering on the Austin event. She runs a design studio and has 15 years of experience. Her email is sarah@example.com." Claude Code will create or update a relationship file in `people/sarah.md` and link it to any relevant artifacts.

**Strategic thinking.** "I need to decide between two offers. Offer A is higher pay but a two-year commitment. Offer B is lower pay but I keep full ownership. Help me think through this." Claude Code will engage with your decision using context from your user profile, your principles, and your 90-day vision.

**Process a transcript.** Paste a meeting transcript (from [Granola](https://granola.ai), Otter, or manual notes) and say "process this transcript." Claude Code will save it, extract participants, update relationship files, and surface action items.

**Create a skill.** "I keep doing the same thing every time I prepare for a meeting. Can we turn that into a skill?" Claude Code will help you write a skill file in `.agents/skills/` that codifies the workflow so it runs the same way every time.

---

## Resuming a session

Claude Code keeps per-workspace history of your past sessions. Three ways to come back to one:

**Inside a running session,** type `/resume` to open a picker of recent sessions. Pick one and the full conversation history reloads.

**From the terminal,** launch with one of these flags instead of plain `claude`:

```bash title="Terminal"
claude --resume     # opens the picker before the session starts
claude --continue   # skips the picker and jumps into the most recent session
```

**To start fresh instead,** just run `claude` and start typing. Your context lives in your workspace files, not in the chat history, so nothing is lost by starting fresh. If the previous session went down a wrong path or you are switching topics, fresh is usually faster than resume.

---

## Useful alias

One alias makes launching Claude Code a lot faster once you are using it daily:

- `clauded`: launches Claude Code with `--dangerously-skip-permissions` so you are not prompted to approve every file operation

**The cleanest way to set this up is to let Claude Code do it for you.**

Open a Claude Code session in any directory (it does not matter which, since you are editing shell config, not workspace files):

```bash title="Terminal"
claude
```

Then paste this prompt:

```text
Please add a shell alias to my shell config file (detect my shell and use ~/.zshrc, ~/.bashrc, or my PowerShell profile as appropriate). Preserve everything already in the file. The alias:

  clauded should run: claude --dangerously-skip-permissions

After you add it, tell me what file you edited and remind me to open a new terminal window for the alias to take effect.
```

Claude Code will detect your shell, find or create the right config file, and append the alias without touching your existing setup. Open a new terminal window afterward and the alias is live.

**When to use which:**

- `clauded` for trusted operations (brain dumps, file updates, content work)
- `claude` (no flag) when working with credentials or production systems

---

## Tips

**Voice input changes everything.** On Mac, install [Superwhisper](https://superwhisper.com) (free, fully local) or [Wispr Flow](https://wisprflow.ai) (around $10/mo). On Windows, Wispr Flow is available, or use the built-in Windows dictation (Win+H). Hold a key, talk, release. The text appears wherever your cursor is, including the Claude Code terminal. Speaking is 3 to 5x faster than typing and keeps you in flow state instead of editing yourself mid-thought.

**The system compounds.** Day one is thin. At 30 days, your agent knows your key relationships, your strategic context, and your communication patterns well enough to draft emails in your voice. At 90 days, it briefs you before every meeting with full relationship history. The compounding effect is the entire point. Feed it daily.

**Your files are sovereign.** Everything is plain markdown on your computer, version-controlled with Git. If Anthropic changes their pricing or a better harness appears, you take your files and walk. No export wizard. No migration headache.

**Your GitHub repo is already live.** Because you created your workspace from the template (not a manual clone), it is already a private repo on your GitHub account from the first commit. No need to run `git init` or `gh repo create`.

**Turn on hourly auto-sync.** The starter repo ships with `scripts/sync.sh` (commits local changes, pulls, pushes) and `scripts/install-sync-cron.sh` (registers it as an hourly cron). Run the installer once and you never have to think about backup or keeping collaborators in sync again:

```bash title="Terminal"
cd my-workspace
bash scripts/install-sync-cron.sh
```

Output accumulates in `.workspace-sync.log`. Remove the cron later with `crontab -l | grep -v scripts/sync.sh | crontab -`. If pushes fail, re-run `gh auth login`.

---

## Troubleshooting

**`claude: command not found` (Mac/Linux):** Restart your terminal or run `source ~/.zshrc`. The native installer places the binary at `~/.local/bin/claude`. Make sure `~/.local/bin` is on your PATH.

**`claude: command not found` (Windows):** Close and reopen PowerShell. The native installer places the binary at `%USERPROFILE%\.local\bin\claude.exe`. You may need to log out and back in for PATH changes to take effect.

**Authentication issues:** Run `claude` and follow the login prompts. You need an active Anthropic account with a Pro, Max, Team, or Enterprise plan.

**Windows long path errors:** Enable long paths in Git: `git config --global core.longpaths true`.

**Windows Git Bash not found:** Install [Git for Windows](https://git-scm.com/downloads/win). If already installed but Claude Code cannot find it, set `CLAUDE_CODE_GIT_BASH_PATH` in settings (see Windows-Specific Notes above).

**More help:** Run `claude doctor` for a detailed check of your installation and configuration. See the [official troubleshooting guide](https://docs.anthropic.com/en/docs/claude-code/troubleshooting) for additional issues.

---

## Further Reading

- [Workspace Setup](/reference/tools/setups/workspace-setup): the harness-agnostic workspace bootstrap flow.
- [Codex Setup](/reference/tools/setups/codex-setup): alternative harness using your existing ChatGPT subscription.
- [Harness Engineering](/disciplines/harness-engineering): why the code around the model matters as much as the model.
- [Externalize Your Brain](/foundations/externalize-your-brain): why you are the bottleneck and how this system fixes it.
- [Compound Agency](/foundations/compound-agency): what becomes possible when your system compounds.
