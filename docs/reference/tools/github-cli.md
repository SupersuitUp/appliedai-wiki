---
title: "GitHub CLI"
slug: /reference/tools/github-cli
description: "The gh command. Lets your terminal (and your agent) authenticate with GitHub and run GitHub operations without leaving the terminal."
---

# GitHub CLI

*The `gh` command. Lets your terminal (and your agent) authenticate with GitHub and run GitHub operations without leaving the terminal.*

---

## What it is

GitHub CLI is the official command-line client for GitHub, made by GitHub. You authenticate once (`gh auth login`) and from then on any GitHub operation (create a repo, clone a repo, open a pull request, invite a collaborator, check CI status) can happen directly from your terminal.

## What it costs

Free. Open source. Maintained by GitHub.

## When to use it (and when not)

**Use GitHub CLI when:**

- You want your agent to create repos, clone templates, open pull requests, or push changes without prompts.
- You want one-command flows like `gh repo create --template --private --clone` instead of a multi-step web UI.
- You want hourly sync scripts or automation to push to GitHub without ever asking for credentials.

**When not to use it:**

- For organizations with strict credential policies that require browser-based auth flows per operation. Use the web UI instead.
- For users who do not have a GitHub account. Make the account first.

## Is this safe?

Yes. The authentication flow (`gh auth login`) opens GitHub's official website in your browser to confirm access and stores the resulting token locally on your computer. You can revoke the token any time from your GitHub account settings.

## Setup pointer

Official documentation and download: [cli.github.com](https://cli.github.com).

On Mac: `brew install gh`. On Windows: `winget install GitHub.cli`. On Linux, see the [official install instructions](https://github.com/cli/cli/blob/trunk/docs/install_linux.md) for your distribution.

After install, run `gh auth login` and accept the defaults. The flow walks you through a browser-based authorization step. You only need to do this once per machine.

Verify with `gh auth status`.

## Further Reading

- [Git](/reference/tools/git): the version control system `gh` is the GitHub companion to.
- [Setups](/reference/tools/setups): harness setups that use `gh` to scaffold a workspace from a template.
