---
title: "Version-Control Your Prompts"
slug: /disciplines/version-control-your-prompts
description: "Every AI prompt that produced something worth keeping is source code. Store it in a file you own, port it across models, sharpen it over time. For image prompts, alt text is the storage vector that pulls double duty as accessibility."
image: "/img/comics/version-control-your-prompts.png"
---

# Version-Control Your Prompts

*Every AI prompt that produced something worth keeping is source code. Store it in a file you own, port it across models, sharpen it over time. For image prompts, alt text is the storage vector that pulls double duty as accessibility.*

![Four-panel comic in neo-comic action-zine style on cream paper. Title bar: VERSION-CONTROL YOUR PROMPTS. PANEL 1 (top-left), '1. THE LOST PROMPT': the hyperagent in pre-Supersuit civilian fit (cream linen mandarin overshirt over charcoal crew tee, charcoal trousers, gold signet ring, clean-shaven East Asian face, dark close-cropped fade) slumped at a physical command office desk with three monitors. The center monitor shows an endless chat history pane receding into depth with a beautiful AI image at the top and a search box labeled 'SEARCHING: where did I put that prompt?'. Speech bubble from him: 'I had it three months ago.' Red wash over the panel. Caption: 'Six months later. The good output is here. The prompt is lost.' PANEL 2 (top-right), '2. STORE IT IN THE FILE': same hyperagent now Supersuited in forest-green plating with metallic gold seam accents, clean chest, cyan wrist glow, at a workbench in front of a large cyan holographic blueprint of a markdown article. The image-embed line is rendered at the center with the prompt text streaming out of the alt-text slot as a glowing cyan scroll. Two callouts label the slot: 'ACCESSIBILITY' (with screen-reader icon) and 'VERSION CONTROL' (with git-branch icon). HUD stamp top-right: 'STORED IN THE FILE'. Caption: 'Store the prompt where the image lives. Alt text does the work twice.' PANEL 3 (bottom-left), '3. THE PORTABILITY WIN': same hyperagent in full forest-green-and-gold Supersuit at his physical terminal, three monitors and a skill library shelf in the background, a HUD banner reading 'NEW MODEL SHIPPED'. Left column of six small image cards stacked and tagged 'OLD' (comic, diagram, character, logo, chart, poster); right column of the same six cards re-rendering into a new batch tagged 'NEW'; glowing cyan beams flow from old to new. Far-right vertical prompt-library card column with cards labeled 'COMICS', 'DIAGRAMS', 'CHARACTER SHEETS', 'VOICE PROMPTS'. A small 'EXECUTION COMPLETE' badge at the bottom. Caption: 'The next model ships. The hyperagent re-runs the entire library.' PANEL 4 (bottom-right), '4. PROMPT LIBRARY LOADED': FIRST-PERSON POV through the hyperagent's helmet visor, translucent cyan visor band creating the panel borders. Four floating HUD cards in cyan and gold labeled 'COMIC PROMPTS', 'SYSTEM PROMPTS', 'VOICE PROFILES', 'CHARACTER SHEETS', each stamped 'STORED, PORTABLE, VERSIONED' in chunky inked caps. 'HYPERCONTEXT LOADED' stamp at top-right of the visor. A forest-green-and-gold gauntleted hand reaches forward from the bottom edge. Arc-reactor-style cyan core glow at the bottom edge of the visor frame. A single unified gold coiled-spiral halo hovers at the top of the visor view (one stylized golden ring object). Caption: 'Prompts are the primitive. Models are the wrapper of the week.' Footer bar in chunky inked caps: 'PROMPTS ARE SOURCE CODE. STORE THEM. PORT THEM. SHARPEN THEM.'](/img/comics/version-control-your-prompts.png)

---

## Prompts Are Source Code

When you generate something with an AI model, the prompt is the artifact worth keeping. The output is downstream.

Most people invert this. They type a prompt into ChatGPT or a comic generator, get an output they like, save the output, and discard the prompt. Six months later a sharper model ships and they can't cleanly re-run. They're scrolling chat history trying to remember what they typed, what reference images they passed, what tone tweak finally landed the result.

The discipline is the inverse. Every prompt that produced something you'd want to reproduce, refine, or port lives in a file you control. A markdown article. A skill file. A git-tracked text snippet next to the artifact it generated. Somewhere with a version history.

Once a prompt is a file, it stops being a one-off ChatGPT session and starts being software. You can diff it. You can branch it. You can hand it to another harness and re-run. You can sharpen it next week without starting over.

## Alt Text Is the Storage Vector for Image Prompts

The cleanest version-control move for AI-generated images is to store the prompt in the alt text of the embed.

Markdown gives you this for free. Every embedded image has an alt text field. It exists for accessibility (screen readers narrate it to blind users), and the same string also lives in your repo's git history, scoped tightly to the file that uses the image. Two jobs out of one slot:

- A blind reader gets a full description of what the image actually depicts.
- A future agent (or you, six months from now) gets the prompt-readable form of the artifact, in the same file as the artifact, with full version history attached.

The wiki's own comic workflow already runs this way. Every article hero on a [SupersuitUp wiki](https://supersuit.wiki) carries alt text detailed enough to reproduce the comic from scratch: panel count, panel labels, key visual elements per panel, captions verbatim, title bar, footer bar. See [reference/graphic-style](/reference/graphic-style) for the policy. The pattern generalizes: any AI-generated image you ship to a markdown surface should store its generative prompt in the alt text. No separate file. No prompt registry to maintain. The image and its source live in the same `.md`, and git tracks both.

For non-markdown surfaces, the equivalent move is a sidecar file: `image.png` next to `image.prompt.txt`, both checked in.

### Caveat: the prompt is one layer of a larger stack

Storing the prompt in alt text gives you version control for a single image and the ability to regenerate it against a future model. It does not, by itself, produce visual coherence across a corpus of images that share a recurring character, palette, or universe. For that, the prompt is one layer of a larger system. The **recurring identity anchors** (character look, palette, world) are best carried by reference images passed alongside the prompt on every render, while the prompt keeps doing load-bearing work on the variable per-render content (scene, HUD, captions, banned-term substitutions). A design system around both layers (canonical spec doc, named characters, banned-term lists, a single bundled generation skill) governs how they cooperate. When you go from "I regenerate this one image" to "I run a coherent visual corpus," see [Golden Atomic Brand References](/concepts/golden-atomic-brand-references).

## The Portability Win

The reason this matters more than it looks: image and language models keep getting replaced. Every six to twelve months a new frontier model lands that's materially sharper than the one before it. People who stored their prompts get to re-run their entire library against the new model in an afternoon. People who didn't are back to the chat-history archaeology problem.

Stored prompts compound the same way [compounding docs](/concepts/compounding-docs) do. Each prompt you save makes the next regeneration cheaper. After a year you have a library of generative recipes you can lift, fork, and re-aim at whatever model is currently best. Without that library, every new model is a fresh start.

This is the same logic as [learn the harness, not the wrapper](/perspectives/learn-the-harness-not-the-wrapper) and [the lock-in is coming](/perspectives/the-lock-in-is-coming). The prompt is the primitive. The model is the wrapper of the week. You want your work portable across the wrappers, anchored to artifacts you own.

A working corollary: don't try to nail the prompt on the first try. Ship the imperfect version, store it, regenerate with the next iteration. The prompt improves like code does. It's never "done." Treating it as precious because you finally got one good output is the trap.

## Pick Models You Can Actually Call

Storing prompts only matters if you can re-run them. That puts a hard requirement on the image model you pick: it needs an API.

Two filters when choosing an image model:

**Research what's actually winning.** Reputation moves faster than vendor marketing. The honest sources are the subreddits where practitioners post side-by-side comparisons (`r/StableDiffusion`, `r/midjourney`, `r/OpenAI`, `r/aiArt`), the ranking sites like Artificial Analysis and image arenas where humans vote on pairwise outputs, and the X timelines of people who actually ship visual work daily. Vendor benchmarks are downstream of marketing; community rankings move with the actual quality. As of early 2026, OpenAI's image model (`gpt-image-1` / `gpt-image-2`) is the hot recommendation for production work because of prompt-following and reference-image support. Six months from now that will probably change. Re-check.

**Require an API.** Midjourney has been a popular product for years and still does not ship a public API. That's a load-bearing limitation. A model you can only reach through a Discord bot or a web UI cannot be called from a skill, a script, an agent, or any automation you build. As more of the world's code is written by AI for AI, models that can only be reached by a human clicking buttons will be limited to one-off human use. The serious users are moving to anywhere their agents can reach. The companies that want serious users will ship an API. The ones that don't are opting out of the agentic stack.

When the two filters conflict (the model with the best outputs lacks an API), the API requirement wins for any artifact you'll want to regenerate. A slightly worse model that you can call programmatically is more useful than a slightly better one you can only reach by hand.

## The Principle Extends Beyond Images

The alt-text trick is image-specific but the underlying discipline isn't. Every prompt-driven artifact in your stack gets the same treatment:

- **System prompts and skill files** live as markdown in your harness. They're already version-controlled by virtue of being files. Don't hide them in chat history or vendor settings panels.
- **Voice and character prompts** (the prompt that makes the AI write in your tone, the prompt that defines a recurring character) live in your workspace: `user/voice-profile.md`, `characters/midas.md`, anchored where the agent can find them.
- **Video and audio generation prompts** ride along with the artifact the same way image prompts do (sidecar `.prompt.txt`, or embedded in the markdown that references the asset).
- **One-shot prompts that produced something keeper-grade** (a generated logo, a chart, a research summary, a meeting outline) get saved alongside the output. The future-you who wants to regenerate or fork will thank present-you.

The bar is simple: if you might want to reproduce or improve this output later, the prompt belongs in a file. If it's truly disposable, fine. Most things you thought were disposable turn out not to be.

---

## Further Reading

- [Golden Atomic Brand References](/concepts/golden-atomic-brand-references): when you go from regenerating one image to running a coherent visual corpus
- [Compounding Docs](/concepts/compounding-docs): why every file you keep makes the next AI run sharper
- [The Lock-in Is Coming](/perspectives/the-lock-in-is-coming): why portability is the load-bearing posture
- [Learn the Harness, Not the Wrapper](/perspectives/learn-the-harness-not-the-wrapper): the prompt is the primitive
- [Ephemeral Software, Precious Context](/perspectives/ephemeral-software-precious-context): the artifacts worth keeping outlive the tools that made them
- [Graphic Style](/reference/graphic-style): the wiki's own image-prompt policy, including the reproducible alt-text spec
