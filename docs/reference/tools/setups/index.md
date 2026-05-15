---
title: "Setups"
slug: /reference/tools/setups
description: "Harness setup guides. Each setup walks you from zero to a working agent workspace on a specific harness, with the same end state across all of them."
---

# Setups

*Harness setup guides. Each setup walks you from zero to a working agent workspace on a specific harness, with the same end state across all of them.*

---

## How the section is shaped

Every setup page follows the same shape:

- **Why this harness**: what it is good for, and where the tradeoffs sit.
- **Prerequisites**: the tools you need before you start (typically [Git](/reference/tools/git), [GitHub CLI](/reference/tools/github-cli), and optionally [VS Code](/reference/tools/vscode)).
- **Install**: the one-line install for each platform.
- **Authenticate**: the one-time login flow.
- **Set up your workspace**: the canonical workspace-setup pointer, shared across harnesses.
- **First session**: what to do once the harness is running.
- **Daily usage**: the working loop.
- **Troubleshooting**: the failure modes that show up in the first hour.

## The setups

- **[Claude Code Setup](/reference/tools/setups/claude-code-setup)**: Anthropic's terminal agent. Strongest instruction-following and the easiest first harness for most people.
- **[Codex Setup](/reference/tools/setups/codex-setup)**: OpenAI's open-source terminal agent. Free with an existing ChatGPT Plus or Pro subscription.
- **[Workspace Setup](/reference/tools/setups/workspace-setup)**: the harness-agnostic workspace bootstrap flow. Referenced by every harness setup. One prompt, done.

## Files are portable across harnesses

The workspace folder structure is the same regardless of which harness you choose. Skill files, instruction files, and your relationship and project files all work the same way. If you switch from one harness to another, your files come with you. The choice of harness is reversible.

## Further Reading

- [Tools](/reference/tools): the broader tool reference. Setups depend on Git, GitHub CLI, Node.js, and VS Code.
- [Disciplines](/disciplines): the practices the harness exists to serve. The harness is plumbing; the disciplines are the work.
