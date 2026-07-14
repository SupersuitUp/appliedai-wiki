---
title: Retrieval
slug: /disciplines/retrieval
description: "The discipline of fetching the right context at the right time. Embeddings, vector stores, retrieval evals, and when not to use RAG at all."
---

# Retrieval

*The discipline of fetching the right context at the right time. Embeddings, vector stores, retrieval evaluations, and the hard-won judgment about when retrieval helps and when it adds noise.*

---

## What the discipline is

Retrieval is the practice of pulling relevant information into the model's context window from a larger store at inference time. The model itself does not know what is in the leader's CRM, the engagement archive, the internal wiki, or last month's board deck. Retrieval makes those visible to the model exactly when they are needed.

The amateur version is "we set up a vector database." The professional version is a measured pipeline with chunking strategy, embedding model, retrieval evaluation, reranking, and a clear understanding of when retrieval is the right tool versus when long-context, fine-tuning, or just-include-the-document is better.

## The high-leverage moves

**Decide whether you need retrieval at all.** Most "we should add RAG" instincts are wrong. If the leader's reference corpus fits in the context window of a current frontier model (and at million-token contexts, most corpuses do), just include it. Retrieval adds complexity, latency, and a failure mode (the wrong chunks getting pulled). It earns its slot only when the corpus is too large to include, when the documents are dynamic, or when the operator needs auditable retrieval logs.

**Build the retrieval eval before the retrieval pipeline.** A retrieval eval is a set of questions paired with the documents that should be retrieved for each. Measure recall (did the right docs come back) and precision (were the wrong docs filtered out). Without this, every chunking-strategy or embedding-model change is a leap of faith.

**Chunking is the leverage point.** The single biggest variable in retrieval quality is how the documents are chunked. Naive paragraph-level chunking misses cross-paragraph relationships. Section-level chunking can include too much noise. The right answer is corpus-specific and worth iterating on with the eval as the ground truth.

**Rerank ruthlessly.** The first-pass retrieval should be wide (top 50-100). A reranker (a smaller LLM call or a dedicated reranker model) then narrows to top 5-10. This is significantly cheaper than tuning embeddings to be perfect.

**Treat metadata as first-class.** Date, author, tier, document type, source URL. A query like "what did we decide about the West Coast portfolio in the last quarter" needs date filtering before any vector similarity is computed. Pure-vector retrieval over a corpus with strong metadata structure is amateur work.

## Bottom-of-the-barrel mistakes

- **RAG as the default.** Retrieval is a tool, not the answer. If the corpus fits in context, include it. If the operator needs the model to memorize, fine-tune. Reach for retrieval when neither is right.
- **No retrieval eval.** Without measurement, retrieval quality is folklore. Every change is a guess.
- **Ignoring the metadata layer.** Vector similarity is one signal. Date filters, author filters, tier filters, document-type filters are often the higher-leverage move and they cost almost nothing.
- **Single-embedding strategy.** One embedding per chunk, no metadata, no reranker. The system works on the demo and fails in production on long-tail queries.
- **Re-indexing on every change.** Modern vector stores support incremental updates. Re-indexing the whole corpus on every document add is operational debt.

## What good looks like

- A retrieval eval with at least 30 query/document pairs that span the realistic distribution of queries, scored by recall and precision
- A documented chunking strategy with the reasoning ("we chunk at H2 boundaries because the leader's playbooks are organized by H2") not just the parameter
- A documented reranking strategy ("first-pass top 50, reranked to top 8 with a cheaper model")
- A metadata layer that supports the queries the operator actually runs ("show me deals from Q2 2026 in the West Coast portfolio")
- A retrieval logging trail the operator can audit: for any model output, which documents were retrieved and shown to the model

## When retrieval is wrong

Three patterns where reaching for retrieval is the implementer's mistake:

- **The corpus fits in context.** Modern frontier models read a million tokens. A leader's strategy archive, a portfolio overview, an annual report: these usually fit. Just include them.
- **The model needs to memorize, not look up.** If the leader's voice or the company's style needs to be embodied (not referenced), fine-tuning beats retrieval.
- **The data changes too fast.** If the document set turns over hourly, retrieval indexing becomes the bottleneck. A live API call to the source system is the cleaner answer.

## Tools and concepts downstream

- **[Context Engineering](/disciplines/context-engineering)**: the broader discipline retrieval lives inside. Retrieval is one of several ways to construct context.

## Further Reading

- [Context Engineering](/disciplines/context-engineering)
- [Evals](/disciplines/evals)
