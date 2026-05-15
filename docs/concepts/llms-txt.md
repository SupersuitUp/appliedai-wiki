---
title: "llms.txt and llms-full.txt"
slug: /concepts/llms-txt
description: "Two plain-text files that turn your wiki into something every LLM can read at full fidelity, without you having to host a chatbot."
---

# llms.txt and llms-full.txt

*Two plain-text files that turn your wiki into something every LLM can read at full fidelity, without you having to host a chatbot.*

---

## What They Are

`llms.txt` and `llms-full.txt` are an emerging convention from [llmstxt.org](https://llmstxt.org) for making a website cleanly consumable by language models. Two files, served from the root of your site:

- **`/llms.txt`** is the index. The site title, a one-line description, and a list of every page with its URL and a short summary. Think `sitemap.xml`, but for LLMs instead of search crawlers.
- **`/llms-full.txt`** is the corpus. Every page on your site concatenated into a single Markdown document, stripped of HTML chrome and navigation. Drop the URL into Claude or ChatGPT and the model gets the whole site as context in one shot.

Together they let any LLM, used by any reader, ground itself in the actual text of your wiki rather than whatever it half-remembers from training.

---

## Why Two Files

The split exists because the two files solve different problems.

`llms.txt` is the **menu**. An agent that lands on your site can read it in a few hundred tokens and know the entire shape of what is available. It can then decide which specific pages to fetch. This matters when an agent is operating across many sites and cannot afford to pull the full corpus from every one.

`llms-full.txt` is the **whole meal**. A reader who wants to ask deep questions about your worldview, your product, or your methodology can paste the URL into their LLM of choice and get the full picture loaded as context. No retrieval system to build. No embeddings to maintain. Just a text file.

You almost always want to publish both. They are cheap to generate and cover different use cases.

---

## Why a Wiki Should Publish Both

If you have already done the work to build a wiki, publishing llms.txt is a small additional step that compounds the value enormously.

**You stop fighting a losing battle for AI mindshare.** Every reader who asks ChatGPT or Claude about your topic is going to get an answer. The question is whether that answer is grounded in your actual writing or in whatever the model absorbed from training. Publishing llms-full.txt means anyone who cares enough to ground the conversation can do so in 30 seconds.

**You let readers use the LLM they already trust.** A built-in chat widget on your site forces the reader to use whatever model and system prompt you chose. A published llms-full.txt lets them paste it into Claude, ChatGPT, Gemini, or their own local model. They control the tool. You control the source.

**It is the lowest-cost form of [agent-accessible products](/concepts/agent-accessible-products).** Building an MCP server or a custom CLI takes real work. Publishing llms.txt is two files that get regenerated every time you build the site. The effort-to-reach ratio is the best in the agent stack right now.

**It removes a category of failure mode.** A hosted chat on your wiki can hallucinate, misrepresent your views, or paraphrase your theology / methodology / product positioning in ways you would never sanction. A static text file cannot. The reader's LLM might still misread, but at least the source is exact.

**It is permissionless.** You do not need to know who your readers are or what they will do with the file. They do not need an API key or an account. The artifact is just there, served as static text, the same way your sitemap is.

---

## How to Generate Them

If your wiki runs on **Docusaurus**, the easiest path is the community plugin [`docusaurus-plugin-llms`](https://github.com/rachfop/docusaurus-plugin-llms). Install it, add a few lines to your config, and both files get emitted on every build:

```ts
// docusaurus.config.ts
plugins: [
  [
    'docusaurus-plugin-llms',
    {
      generateLLMsTxt: true,
      generateLLMsFullTxt: true,
      docsDir: 'docs',
    },
  ],
],
```

Other static site generators have similar plugins (search "llms.txt + your SSG"). And if you cannot find one, the format is simple enough to generate with a shell script: walk your `docs/` folder, write the index to one file, concatenate all the Markdown to the other.

The point is not which tool you use. The point is that on every build, two static text files end up at the root of your site.

---

## Why Not Just Host Your Own Chat?

This is a real choice every wiki owner faces. A bolted-on chat widget feels like the obvious move, especially circa 2023–2024 when "Ask my docs anything" was the trendy demo. By 2026 the calculus has flipped, and most wiki authors should not host a chat. The honest tradeoffs:

**The puck has moved to the reader's LLM, not yours.** Almost every reader who would meaningfully engage with an "Ask my wiki" feature already has Claude, ChatGPT, Gemini, or a local model open in another tab. The skate-where-the-puck-is-going move is to make your corpus easy to drop into the LLM they already trust, not to compete for their attention with your own. A wiki author who insists on hosting their own chat in 2026 is solving last year's problem.

**A hosted chat is an inference bill anyone can run up.** The moment your site exposes an LLM endpoint, every spam bot, every curious tinkerer, every malicious actor on the open web can hammer it. You will pay for those tokens. Rate-limiting helps but does not eliminate the attack surface. A static `llms-full.txt` cannot be abused into a financial event. It is just bytes on a CDN.

**Hosted chats can hallucinate, misrepresent, or be prompt-injected.** Whatever model and system prompt you ship has to be kept current as the frontier moves, has to be defended against jailbreaks, and still might paraphrase your views in ways you would never sanction. A static file cannot misrepresent itself. The reader's own LLM might still misread, but the source-of-truth artifact is exact and auditable.

**Maintenance and lock-in compound.** A hosted chat means a vector store, embeddings to regenerate when content changes, an API provider you depend on, a model you have to upgrade, prompts to tune, evals to run. Every one of those is ongoing work and ongoing dependency. Publishing two static files at build time has none of that.

For most wikis serving most audiences in 2026, publishing the files and pointing readers to them is the better trade. If you have a specific reason to host a chat anyway (you are running a product where chat is part of the UX, or your audience is genuinely non-technical and will not paste URLs into LLMs), keep the chat. Otherwise, the static files are the right default and the chat is dead weight you do not need to carry.

---

## What Good Looks Like

A well-published llms.txt has:

- **A real description.** "Documentation for our docs site" tells the LLM nothing. State what your site is actually about in one sentence.
- **Per-page summaries that aren't just the page title.** The summary is what an agent uses to decide whether to read the page. Make it earn its line.
- **Stable URLs.** If you reorganize the site, regenerate the file. Agents and bookmarks both depend on the links resolving.
- **A regenerate-on-build pipeline.** A stale llms.txt is worse than no llms.txt. Wire it into your build so it cannot drift.

A well-published llms-full.txt has:

- **The actual text.** No navigation chrome, no UI strings, no "click here for more." Just the substance.
- **Section headers preserved.** An agent reading a 15,000-line file relies on `##` markers to navigate.
- **A reasonable size.** If your full corpus is genuinely huge (millions of tokens), consider segmenting by section and publishing multiple files (`llms-philosophy.txt`, `llms-playbooks.txt`).

---

## Worked Example

A personal wiki documenting one writer's worldview across 135 entries originally shipped with a hosted RAG chat using OpenAI embeddings. The chat worked, but it cost money on every query and carried a real risk of the model paraphrasing the writer's positions in ways they hadn't sanctioned.

In April 2026 it was rebuilt around llms.txt. The chat got removed. The embeddings got removed. The OpenAI dependency got removed. In its place, two static files: an `llms.txt` (143 lines indexing every entry) and an `llms-full.txt` (about 15,000 lines of the full corpus). Anyone who wants to ask the wiki a question now drops the URL into the LLM they already use.

Net result: 83 npm packages removed, ongoing inference costs dropped to zero, the surface area for "the chat misrepresented what I believe" went to zero, and the wiki became more useful to power-readers, not less.

---

## Further Reading

- [Agent-Accessible Products](/concepts/agent-accessible-products): The broader principle. llms.txt is the doc-site instance of it.
- [llmstxt.org](https://llmstxt.org): The external spec.
