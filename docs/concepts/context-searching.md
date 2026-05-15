---
title: "Context Searching"
slug: /concepts/context-searching
description: "The runtime side of context engineering. How an agent actually pulls the right context out of your knowledge base at the moment it needs it."
---

# Context Searching

*The runtime side of [context engineering](/disciplines/context-engineering). How an agent actually pulls the right context out of your knowledge base at the moment it needs it.*

---

## What It Is

Context engineering is the discipline of building the knowledge base. Context searching is the discipline of querying that knowledge base well at runtime.

An implementer who has spent months building a deep [context lake](/disciplines/context-lake) has solved the supply problem. The agent has all the relevant information available somewhere. The next problem is harder: when the agent gets a specific request, how does it find the right slice of that lake to load into the working session?

That is context searching.

The naive answer is "load everything." That works for tiny vaults and falls apart fast. The serious answer is a layered set of search techniques that each handle a different shape of question.

---

## Why It Matters

Most people who set up a personal AI workflow plateau here. They build a respectable vault. They configure an agent. The first few sessions feel magical. Then quality starts to drift.

What happened: the agent is dumping too much into context, or pulling the wrong slice, or missing the obvious connection between two files. Output gets vague. Hallucinations creep back in. The implementer blames the model.

The model is fine. The retrieval layer is the bottleneck. Without a real context searching strategy, even a perfect knowledge base will produce mediocre answers.

The fix is to think about context searching as its own engineering surface. Different question shapes need different search strategies. The agent's job is to pick the right one (or combine several) for the request in front of it.

---

## The Search Taxonomy

There are four search techniques worth knowing. Most real systems combine them.

### Vector Search (Basic RAG)

Chunk your documents into small pieces. Embed each chunk as a vector. At query time, embed the user's question and find the chunks whose vectors are closest. Hand those chunks to the model.

This is the default. It works well for "find me a passage that talks about X." It is what most people mean when they say "RAG."

Where it falls short: vector search has no idea about structure. It cannot follow a relationship. It cannot understand that the file titled "Q3 Strategy" is connected to the meeting transcript from October 14 with the client whose renewal is the subject of that strategy. It only knows what is semantically similar to your query string.

### Graph-Based Context Searching

Instead of asking "what is similar to my query," graph-based context searching asks "what is connected to the entities in my query."

Your knowledge base already contains a graph, even if you didn't design it that way:

- A **person doc** links to many transcript docs (every meeting you've had with them), strategy docs (the work you're doing together), decision docs (commitments you've made), and email threads (correspondence history).
- A **client project doc** links to the person docs for everyone on that project, the strategy docs that frame the work, the meeting transcripts where decisions got made, and the artifacts produced.
- A **strategy doc** links to the projects it covers, the people it involves, and the principles it draws from.

When a request comes in like "give me everything I need for tomorrow's meeting with Anna," graph-based context searching starts at Anna's person doc, traverses the edges to the active projects she's involved in, the transcripts from your last three meetings with her, the open commitments on her file, and the recent strategy docs that touch her work. It assembles a structured set of files that are *connected* to Anna, not just files that mention her name.

The graph supplies precision and structure. Vector search can fill in the detail within that scope: once the graph has narrowed the universe to "files connected to Anna," vector search can find the most relevant passages inside that subset.

This is dramatically more powerful than vector search alone. It is also the technique most personal AI setups are missing.

### Agentic Search

The agent does not have to retrieve everything in one shot. It can make a first-pass request, look at what came back, decide whether it has enough, and go back for more.

This is agentic search: iterative retrieval driven by the agent's own reasoning about its information needs. If the first pass surfaces a transcript that mentions a strategy doc the agent didn't load, the agent can pull that strategy doc next. If it sees a reference to a decision it doesn't have full context on, it can search for the decision record.

Most modern agentic harnesses (Claude Code, Cursor, etc.) do this naturally if you let them. The agent has a search tool, it uses the tool, it reasons about results, it searches again. The implementer's job is to give it good search tools and to structure the knowledge base so iterative search converges.

### Compression and Reranking

Even with the right files identified, you don't always want to dump them whole into context. Long documents waste tokens. Old material may be less relevant than recent material. Multiple files may overlap.

Compression and reranking handle this:

- **Summarization** condenses long documents into shorter versions that preserve the key points relevant to the query.
- **Reranking** takes the candidate set and reorders it by actual relevance to the question, often using a smaller model dedicated to that task.
- **Recency weighting** prefers newer material when the query is about current state.

The goal is to maximize signal and minimize noise before the model sees the input.

---

## Putting It Together

A real context searching strategy combines these techniques:

1. **Graph traversal** to identify the universe of relevant files. (Start at the entities the question is about. Follow the edges.)
2. **Vector search** within that universe to find specific passages.
3. **Agentic loop** to iterate when the first pass isn't enough.
4. **Compression and reranking** to keep what reaches the model lean.

This is the architecture behind any personal AI setup that genuinely feels like a thinking partner instead of a chatbot. It's also the architecture behind any client engagement that produces output an executive can actually act on.

---

## For Implementers

If you're helping someone build an agent workspace, context searching is where the real engineering happens. Anyone can set up a vault. The differentiator is whether the agent can find the right slice of that vault when it counts.

Concrete things to check in any setup you're advising on:

- **Do entity files link to each other?** A person doc that doesn't link to the projects, transcripts, and strategy docs related to that person is a dead-end node in the graph. Add the links.
- **Does the harness actually traverse the graph?** Some harnesses do this automatically (following links between markdown files). Others need explicit tools.
- **Is there a reranking step?** Vector search alone is rarely enough. Even a simple "rank these results by recency" pass helps.
- **Can the agent search iteratively?** If the first retrieval pass misses, can the agent recognize that and try again?

Context engineering builds the lake. Context searching is what makes the lake actually useful at runtime. Both are skills the implementer has to develop.

---

## Further Reading

- [Context Engineering](/disciplines/context-engineering): The supply side. Building the knowledge base in the first place.
- [Context Lake](/disciplines/context-lake): The structured collection of files that context searching queries.
- [Compounding Docs](/foundations/compounding-docs): Why every file you add (and every link you add between files) makes every future search better.
- [Hypercontext Protocol](/concepts/hypercontext-protocol): Where context searching goes when agents start querying each other's context lakes through trusted permission surfaces.
- [What Is Context Engineering?](https://www.youtube.com/watch?v=pN-LfxNFiTc) (Martin Keen, IBM): Frames the same retrieval taxonomy at the enterprise scale.
