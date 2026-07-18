---
title: "Package the Patterns You Keep Copying"
slug: /playbooks/package-the-patterns-you-copy
description: "When you have copied the same code into a third project, publish it as a package so a fix is one update instead of many."
image: "/img/comics/package-the-patterns-you-copy.png"
---

# Package the Patterns You Keep Copying

*The third time you copy the same component or script into a new project, stop copying and publish it as a package. One source of truth, and every future fix becomes one update instead of an edit in every copy.*

![Three-panel comic on cream paper. Title bar: PACKAGE WHAT YOU COPY. Panel 1, THE COPY-PASTE TAX: the hyperagent Midas in matte-navy armor with orange seams stands tired before five near-identical floating website panels, each with the same small red bug glowing in the same spot; a paper-tape caption reads "one fix, five edits." Panel 2, THE THIRD COPY: Midas holds up three fingers as a third identical panel appears, and a glowing box labeled PACKAGE forms around the shared part they all contain; caption "the third copy is the signal." Panel 3, ONE UPDATE: the five site panels now each show a small socket plugged into one central glowing PACKAGE cartridge; Midas taps a single button reading UPDATE and the same fix ripples to all five at once; caption "fix once, update everywhere." Footer bar: THE SPEED THAT MADE THE COPIES NOW COMPOUNDS FOR YOU.](/img/comics/package-the-patterns-you-copy.png)

---

## The copy-paste tax

Every time you copy a working piece of code into a new project, you create a future obligation you cannot see yet. The narrated-story player you paste into a fifth site. The build script you carry into every repo. The config block you fork again. Each copy works today. Each copy is also a place a bug now lives, a place a feature now has to be added by hand, a place that will silently drift from the others.

That is the **copy-paste tax**: the cost is not the copy, it is every future change multiplied by the number of copies. Five copies means a one-line fix is five edits, five builds, and five chances to miss one.

**AI-native building makes this tax compound faster.** When an agent can stand up a whole site, book, or brand system in an afternoon, you accumulate near-identical copies at a rate no hand-coder ever did. The speed that lets you ship ten similar things is the same speed that leaves you maintaining ten forks. The faster you build, the sooner you must package what has stabilized, or the copies bury you.

## The third-copy rule

Do not package the first time. The first version is still learning what it is. The second copy tells you which parts are shared and which were incidental. **The third copy is the signal**: you now have enough evidence of the real, stable shape to extract it without guessing.

Packaging too early is its own failure. A pattern still in flux, extracted into a package, forces every consumer to churn every time you change your mind. Wait until the shape stops moving, then extract. Copy, copy, package.

## What to extract, what to keep

Draw the line between the **stable shared core** and the **per-project layer**.

- **Extract** the parts that are the same across every copy: the component and its logic, the tooling and build scripts, the types, the debugged edge cases. This is what earns its place in the package.
- **Keep in each project** the content and configuration: the data, the copy, the page that composes the component, the branding. These are what make each instance itself.
- **Pass the difference as configuration.** Anything a consumer needs to vary (a palette, a title, a callback) becomes a prop or a config object, never a fork. If a consumer has to edit the package internals to use it, the boundary is in the wrong place.

## The steps

1. **Scaffold the package.** A new repo or a workspace package. Set the module exports, mark the framework libraries as peer dependencies (so consumers bring their own React, their own Next), and pick a small bundler.
2. **Move the shared core in.** Lift the component, its dependencies, and the types out of one project and into the package. Delete nothing from the consumers yet.
3. **Ship the tooling too, not just the components.** The build scripts that produced the copied artifacts belong in the package as `bin` commands. A consumer should run one package command, not carry a script.
4. **Publish.** Public registry if the code is not sensitive (fastest installs), private registry if it must stay closed (every consumer then needs an auth token). Version it, and bump on every change.
5. **Refactor the consumers one at a time.** In each project: install the package, replace the copied imports with imports from the package, delete the copied files, and confirm the project still builds. Do one, verify, then the next. Never convert all of them blind.
6. **Prove the payoff.** Make a real fix in the package, publish, and update one consumer with a single command. That is the whole point made concrete.

## When not to package

- **The pattern is still moving.** If you are unsure of its shape, a package freezes a bad boundary. Copy once more and learn.
- **It is a one-off.** Two copies that will never become three do not need the ceremony.
- **The abstraction would be more complex than the duplication.** Some duplication is cheaper to live with than the wrong shared abstraction. Package what is stable and load-bearing, not everything that looks similar.

The move is not "never repeat yourself." It is "when a pattern has proven itself by being copied a third time, pay the one-time cost to package it, so the speed that created the copies compounds in your favor instead of against you."

## Further Reading

- [Fat Skills](/concepts/fat-skills): the same instinct applied to capability instead of code. Package a proven workflow so it is invoked, not re-explained.
- [Generate a Microautobiography](/playbooks/generate-a-microautobiography) and [Generate an Agentic Brand OS](/playbooks/generate-agentic-brand-os): build pipelines whose shared player and generation layer are prime packaging candidates once copied.
- [Knowledge Repo Design](/playbooks/knowledge-repo-design): the content counterpart, structuring what you reuse so it stays one source of truth.
- [Don't Scale Slop](/playbooks/dont-scale-slop): scaling multiplies whatever you copy, quality and defects alike.
