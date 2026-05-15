---
title: "Node.js"
slug: /reference/tools/nodejs
description: "The JavaScript runtime. Required by many agentic tools, and installing it also gives you npm for one-line installs of hundreds of developer tools."
---

# Node.js

*The JavaScript runtime. Required by many agentic tools, and installing it also gives you `npm` for one-line installs of hundreds of developer tools.*

---

## What it is

Node.js is an open-source JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript code outside the browser (on your computer, on a server, or inside a command-line tool). Installing Node.js also installs `npm`, the Node Package Manager, which is how you install any JavaScript-based tool globally in one command.

## What it costs

Free. Open source. Governed by the OpenJS Foundation.

## When to use it (and when not)

**Use Node.js when:**

- A tool you want to install is distributed through `npm` (many modern developer tools are).
- You want one-line installs for hundreds of CLI tools across the JavaScript ecosystem.
- You are building, running, or maintaining anything Node-based (Next.js, agent harnesses with Node dependencies, build tooling).

**When not to use it:**

- If you only need a single specific binary and the tool ships a native installer that does not require Node. Use the native installer.
- If you have a tight version requirement and `nvm` (Node Version Manager) is the better fit. Use `nvm` to manage multiple Node versions on one machine.

## Is this safe?

Yes. Node.js is used by essentially every major tech company and is one of the most heavily audited open-source projects in existence. The installers distributed from nodejs.org are official binaries.

## Which version

Use **LTS** (Long-Term Support). LTS is the right choice for almost everyone. Only pick the "Current" version if a specific tool you depend on needs a newer version.

## Setup pointer

Official documentation and download: [nodejs.org](https://nodejs.org).

On Mac: `brew install node`. On Windows: `winget install OpenJS.NodeJS.LTS`. Or download the LTS installer directly from nodejs.org for any platform and run it.

Verify with `node --version` and `npm --version`. Both should print version numbers.

## Further Reading

- [Homebrew](/reference/tools/homebrew): how to install Node on Mac in one command.
- [Setups](/reference/tools/setups): harness setups that depend on Node.
