---
title: "My AI Assistant Can't See My App's Memory or Project Folders. How Do You Deal With That?"
slug: /questions/my-assistant-cant-see-its-own-memory
description: "The friction is real and it is not a skill issue. It is the moment you decide whether to keep renting someone else's memory system or cross the chasm and own your context layer."
image: "/img/comics/my-assistant-cant-see-its-own-memory.png"
---

# My AI Assistant Can't See My App's Memory or Project Folders. How Do You Deal With That?

*The friction is real and it is not a skill issue. It is the moment you decide whether to keep renting someone else's memory system or cross the chasm and own your context layer.*

![Three-panel cream-paper action comic titled CROSSING THE CHASM with footer OWN THE SUBSTRATE. Panel 1 THE SEALED BOX: Midas, a Blasian hyperagent in bulky matte-navy plate armor with orange seams, presses a gauntlet against the inside of a sealed glass box; locked folder and memory icons sit out of reach; his Chief of Agents shows only as a dim cyan-gold hologram. Caption: My assistant can't reach its own memory. Panel 2 THE CHASM: Midas leaps a canyon gap from cracked glass shards labeled VENDOR BOX BROKEN to a far ledge built of stacked markdown context files. Caption: Rent the provider's memory, or own your context layer. Panel 3 OWNED CONTEXT: in the cyber-cathedral command hall the Chief of Agents is now fully luminous, gold comms crown on his head, conductor's mantle, LEAD LLM-COMMS LAYER chest band, reading freely from glowing holographic markdown files. Caption: HYPERCONTEXT LOADED.](/img/comics/my-assistant-cant-see-its-own-memory.png)

---

## The Question

A community member asked this after a workshop on building your own AI assistant:

> I was revisiting the assistant I built myself today and realized it cannot access:
>
> - General memory of my interactions through the Claude app
> - Specific project information (the "folders" you can build in the Claude app)
>
> How do you all deal with that? Is this something Obsidian could tackle?

It is one of the most common questions we get, and it is a good one. The friction is real. Here is the honest answer.

---

## The Short Answer

You are not hitting a skill gap. You are hitting an architectural wall the product was built with. Consumer AI apps have added memory (the Claude app now synthesizes your conversations into memory automatically), but that memory is siloed inside the app on purpose: it is a set of facts the provider extracts and controls, kept in separate boxes you cannot open, query, or reshape, and that an assistant you built yourself cannot reach at all.

So the real question underneath your question is the one worth answering: do you want to keep renting a memory system the provider owns, or do you want to own your context layer? Obsidian (or plain files in a folder) is one good way to own it. The decision to own it at all is the part that matters.

---

## Why This Happens

The memory and folders inside a consumer AI app are features of that app, not a substrate you control.

- **Memory now exists, but it is siloed and not yours.** As of 2026 the Claude app synthesizes your conversations into memory automatically (project chats into a project's memory, standalone chats into a separate global memory, refreshed roughly every day). Those are separate boxes that do not share, and none of it is a substrate you can open, query, or restructure.
- **Project folders are mostly static and separate again.** The "folders" hold uploaded files and custom instructions. They are a different box from the synthesized memory, and they do not grow into a connected, queryable layer you control.
- **The app remembers what the app decides to remember.** Memory is a set of facts the provider extracts, in the structure the provider chose, exposed only as far as the provider exposes it. You do not get to reach in and reshape it.
- **Your own assistant cannot touch any of it.** The memory and folders live inside the app, with no clean way for an assistant you built yourself to read or write them. This is the exact wall you hit.
- **Export is clunky and lossy.** When you try to move your context to another model or tool, the structure does not survive the trip.

This is the same wall described in [The Chat Is Not the Product](/perspectives/the-chat-is-not-the-product): the chat window is a thin surface over a memory layer you cannot open up. Hitting this wall is the signal that you have outgrown the consumer surface, not that you did something wrong.

---

## The Real Decision: Two Paths

Your specific frustrations (no general memory across the app, no clean access to project folders) are symptoms of one architectural choice you have not consciously made yet.

**Path 1: Stay a consumer of abstracted, auto-managed memory.** The app handles memory for you. Very low friction. You just talk. The ceiling is hard: the memory is siloed, limited in structure, not portable, and controlled by the provider. The features improve over time, but they will always be bounded by what the provider chooses to expose. When you hit the wall, your only moves are workarounds inside their system or accepting the limit.

**Path 2: Own your context layer.** Your context lives in files you control: plain markdown in folders, version-controlled, model-agnostic. The AI becomes a reasoning engine that reads from and writes to your system instead of a black box that remembers what it wants. Higher upfront and ongoing effort, because you design how context is organized and kept current. The upside is a different kind of thing entirely: portability across every model, memory that compounds over years, real ownership, and the ability to build systems on top of your context instead of inside someone else's product.

This is the chasm. Most people will not cross it, because the consumer path is good enough for most uses and the owned path takes real work: structuring, pruning, tooling, discipline. But if you are building something that needs to get better over time rather than hit a ceiling, the consumer side eventually becomes the limiting factor. Your question is the canary. Once you feel the friction of "my assistant cannot reach its own history or project context," you are standing at the edge.

This is the same jump argued in [Learn the Harness, Not the Wrapper](/perspectives/learn-the-harness-not-the-wrapper) and [Build, Don't Buy Your Way In](/perspectives/build-dont-buy-your-way-in): the goal is to own a substrate that outlives any single vendor.

---

## Can Obsidian Solve It?

Yes, but not as a magic bullet on its own. Obsidian is one of the best low-friction ways to own your context layer today, for the same reasons any file-based system works:

- **It is a true external brain.** Plain markdown files in a folder. Portable, ownable, version-controllable with Git, and model-agnostic. This is exactly the principle in [Local-First Software](/concepts/local-first-software).
- **It gives you real structure.** Folders, atomic notes, maps of content, tags, and links. You can mirror the "folders" concept from the app and go well past it.
- **It is queryable and connected.** Plugins like Dataview, Smart Connections, and the graph view let you actually use the memory instead of just storing it.
- **It is AI-friendly.** You feed slices of it back into any model by copy-paste, plugins, or a harness that reads the folder directly.

Obsidian is not the only answer. The thing that matters is that your context becomes files you own, which is what [Memory Files](/concepts/memory-files) and [Compounding Docs](/concepts/compounding-docs) are about. Obsidian is one nice viewer over those files. A [harness](/reference/tools/claude-code) pointed at the same folder is another.

---

## How People Actually Bridge It

The patterns that work in practice, from lightest to most serious:

1. **Single source of truth plus reasoning engine.** Keep projects, decisions, interaction summaries, and key context in your files. Instruct your assistant to output structured updates into specific notes, and pull the relevant notes into the prompt when you need deep work. The files are the memory; the model is the thinker.
2. **A dedicated context layer.** Carve out a section of your vault for AI memory: daily notes or interaction logs, plus project folders with consistent templates (goals, decisions, open questions, key people, session summaries). This becomes the portable memory that survives any model or app change. This is what a [Command Center](/concepts/command-centers) is.
3. **The AI reads and writes the vault directly.** Point a harness at your folder so the assistant can search and update it without copy-paste. This is the direction serious setups move toward, and it is what closes the loop your question is really about: the assistant gaining access to its own persistent memory because that memory is now files it can reach.

The throughline: stop relying on the app to remember what it wants about you, and start maintaining a structured, queryable, ownable representation of your context that the AI operates on top of.

---

## Crossing the Chasm

Storing files on Git or your disk is not the whole story. The real shift is moving from "the AI remembers what it decides to remember about me" to "I maintain my context, and the AI operates on top of it." That shift takes a small amount of discipline to start and a habit to sustain. It is the same one step into ownership described across this wiki, and everything you build on the other side of it is portable, durable, and yours.

If the friction you are feeling is annoying, good. It means you are ready to cross.

---

## Further Reading

- [Learn the Harness, Not the Wrapper](/perspectives/learn-the-harness-not-the-wrapper): Why owning the primitive beats renting a vendor's interface
- [The Chat Is Not the Product](/perspectives/the-chat-is-not-the-product): Why the chat window hides the memory layer you actually want
- [Build, Don't Buy Your Way In](/perspectives/build-dont-buy-your-way-in): The case for owning the substrate
- [Local-First Software](/concepts/local-first-software): Files you own, model-agnostic and portable
- [Memory Files](/concepts/memory-files): The unit of an owned context layer
- [Compounding Docs](/concepts/compounding-docs): Why owned context gets better over time
- [Command Centers](/concepts/command-centers): The structured home for your context
- [Context Overflow](/concepts/context-overflow): What goes wrong when context is unmanaged
- [The Lock-In Is Coming](/perspectives/the-lock-in-is-coming): Why every provider's memory will pull you deeper in
