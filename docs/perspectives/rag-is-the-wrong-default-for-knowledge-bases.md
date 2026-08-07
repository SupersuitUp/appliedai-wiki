---
title: "RAG Is the Wrong Default for Knowledge Bases"
slug: /perspectives/rag-is-the-wrong-default-for-knowledge-bases
description: "For a corpus an agent can hold or navigate whole, a chunk-embed-retrieve pipeline is lossy, extra infrastructure, and a hallucination mechanism. Give the agent the corpus and the tools an engineer would use."
image: "/img/comics/rag-is-the-wrong-default-for-knowledge-bases.png"
---

# RAG Is the Wrong Default for Knowledge Bases

*For a corpus an agent can hold or navigate whole (a wiki, a docs site, a company handbook), single-turn retrieval is lossy, extra infrastructure, and a built-in hallucination mechanism. The better default is agentic search: give the agent the corpus on disk and the tools an engineer would use.*

![Three panels, warm editorial ink-and-wash, titled RAG IS THE WRONG DEFAULT. One: a grey-haired woman in a rust cardigan feeds a whole cream page into a paper shredder, strips falling into a glass bowl; caption SHRED THE CORPUS. Two: the bowl of strips tips toward a glowing amber laptop, and inside the screen a small rounded agent tapes the strips into a crooked patchwork page full of seams; caption GUESS FROM SCRAPS. Three: the woman sets the intact page stack beside the laptop, and inside the screen the Chief of Agents in a gold military cap reads one whole page and passes a clean answer card out through the glow to her hand; caption READ IT WHOLE. Footer: STOP RETRIEVING FRAGMENTS. LET THE AGENT READ.](/img/comics/rag-is-the-wrong-default-for-knowledge-bases.png)

---

## The reflex

Someone says "let people chat with our docs" and the architecture appears fully formed: chunk the corpus, embed the chunks, stand up a vector store, retrieve top-k at question time, hand the fragments to a model to synthesize an answer. One retrieval, one generation, done. The pattern earned its place when context windows were four thousand tokens and the corpus was a million documents. It then hardened into a reflex that gets applied to a two-hundred-page wiki, where every one of its costs is still paid and none of its benefits apply.

The [retrieval discipline page](/disciplines/retrieval) already carries the professional judgment: decide whether you need retrieval at all, and if the corpus fits in context, include it. This page presses the stronger claim. For most knowledge bases, the answer to "do we need retrieval" is no, and what you build instead is not "paste the corpus into the prompt" either. It is an agent.

## What the pipeline actually costs

- **Chunking amputates structure.** A chunk is a passage with its heading, its caveats, and its cross-links cut off. A model synthesizing from fragments asserts what the fragments imply, and what fragments imply is often not what the page says. This is the hallucination mechanism, built into the architecture rather than a tuning problem on top of it.
- **Top-k cannot say "not covered."** Ask a question the corpus does not answer and the retriever still returns k nearest misses, which the model synthesizes into a confident answer that reads as grounded. The failure is invisible at exactly the moment honesty matters most.
- **The pipeline is standing infrastructure.** Embedding jobs, a vector store, re-indexing on every edit, chunk-size tuning, retrieval evals. All of it is built before the first good answer and maintained forever, and none of it differentiates the product sitting on top of it.

## The agentic alternative

Put the corpus on disk. Give a model grep, glob, and read. Let it run a loop instead of a lookup: search for the reader's terms, open the pages that match in full, follow the cross-links inside them, notice what is missing, and search again with better terms. The loop ends when the agent is satisfied, which is a different stopping condition from "top-k returned."

This is [agentic search](/concepts/context-searching), and it is how the frontier labs' own tools already work: the coding harnesses search repositories with grep and file reads, not an embedding index. Whole pages arrive with their structure intact, so the caveat two paragraphs down makes it into the answer. An agent that searched, found nothing, and checked the index can say "the corpus does not cover this," which no similarity score can express. Follow-up questions land in a session that remembers what it already read, so "which of those is the smaller company" gets answered from evidence rather than re-retrieved from scratch.

A worked example: a reference wiki of about 44,000 words now answers reader questions through an embedded agent with exactly three read-only tools and the repo as its working directory. The answer page shows the investigation as it happens (each grep, each page opened) above the streamed answer. Development runs headlessly on a coding-harness subscription for zero marginal cost; production is a config flip to a hosted agent platform. Total retrieval infrastructure: none.

## Where the reflex comes from, and where retrieval still wins

The reflex survives because RAG demos beautifully and its failures arrive later, on the long tail, in front of users. Agentic search inverts the cost curve: each answer takes longer and burns more tokens, and in exchange the failure mode changes from "confident synthesis of the wrong fragments" to "honest report of what the corpus holds."

Retrieval earns its slot at real scale and real traffic. Millions of documents make grep a non-plan. A support surface answering the same twenty questions thousands of times a day should cache, and a latency budget under a few seconds rules the loop out. Those cases are what the [retrieval discipline](/disciplines/retrieval) is for, evals and reranking and all. The claim here is about defaults: the burden of proof now sits with the pipeline, and a knowledge base whose whole text an agent can read is not close to meeting it.

One more consequence of choosing the agentic path: the corpus itself becomes the quality lever. An agent inherits the knowledge base's discipline (dated claims, real cross-links, names that mean something), which makes [agent experience](/concepts/agent-experience) and [context engineering](/disciplines/context-engineering) the work that improves answers, instead of chunk-size tuning.

## Further Reading

- [Retrieval](/disciplines/retrieval): the discipline, including when retrieval genuinely earns its place
- [Context Searching](/concepts/context-searching): the full taxonomy this perspective picks a winner from
- [Agent Experience](/concepts/agent-experience): why the corpus's ontology decides the agent's answer quality
- [llms.txt](/concepts/llms-txt): publishing your corpus so other people's agents can read it whole
- [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure): the general argument against standing up systems the job does not need

> A knowledge base an agent can read whole does not need a retrieval pipeline. It needs the agent, the corpus, and grep.
