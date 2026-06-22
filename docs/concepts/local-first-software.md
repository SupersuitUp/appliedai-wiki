---
title: "Local-First Software"
slug: /concepts/local-first-software
description: "Software that runs and keeps its data on your own machine. In the agentic era, a bespoke tool per problem becomes cheap enough to build, use once, and throw away."
---

# Local-First Software

*Software that runs and keeps its data on your own machine, cheap enough to build for a single problem and throw away when you are done.*

---

:::note[Stub]
A short capture to be expanded. The core idea and why it matters for applied AI are here; patterns and more examples can be added over time.
:::

## What it is

Local-first software runs on your own device and keeps its data there. You own the files, it works offline, and there is no server in the middle. The filesystem is the database: plain JSON and markdown on disk instead of a hosted Postgres. Often it is a thin graphical interface wrapped around scripts you already have, spun up when you need it and shut down when you are done.

The idea has a few names worth knowing. Ink & Switch coined **local-first** for the technical posture: your data lives on your device, syncs across your own machines, and survives without a vendor. Robin Sloan's essay "An app can be a home-cooked meal" names the cultural cousin: **home-cooked software**, or software for one, made for yourself or your household with no intent to scale or sell. Adjacent terms include personal software, malleable software, and end-user programming.

## Hyperlocal: the far end

There is an extreme version worth naming separately. Local-first still assumes some ambition: data that syncs across devices, sometimes collaboration. The far end is a tool that runs on one machine, for one person, with no sync, no server, and no future. You build it, use it, and kill it. Call it **hyperlocal software**: maximally local, disposable, an extension of your own computer rather than a product. The word collides with the geographic sense of "hyperlocal" (neighborhood-level news and commerce), so treat it as a private coinage rather than a public label.

## Why it matters now

This pattern was always possible and rarely worth it. Hand-building a custom interface to manage a few dozen records cost a day, so nobody did it for a one-off. Agentic AI collapses that cost from a day to minutes, which changes the economics: a tool per problem becomes affordable, and software for one finally pays off. No single app is the point. The win is that you can now afford an app per problem, fit exactly to the task, gone when the task is.

A concrete example: a local interface to clean up a voiceprint library, an Express server bound to localhost that reads and writes a JSON file plus some markdown, opened in the browser and killed when the cleanup was done. It existed for one afternoon's job and was never meant to ship. That is the shape this names.

## Further Reading

- [Skill File First, App Second](/concepts/skill-file-first-app-second): the script is the product; the interface is a thin wrapper.
- [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure): the just-enough posture this extends.
- [Jevons Paradox](/concepts/jevons-paradox): when the cost of building collapses, you build far more of it.
- [HTML-First Artifacts](/concepts/html-first-artifacts): lightweight, self-contained outputs in the same spirit.
