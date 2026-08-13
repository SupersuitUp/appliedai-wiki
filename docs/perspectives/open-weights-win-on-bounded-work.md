---
title: "Open Weights Win on Bounded Work"
slug: /perspectives/open-weights-win-on-bounded-work
description: "The case for running open models is not fear of lock-in. It is that bounded work rewards the things open weights are actually better at: price, pinning, and a boundary your data never crosses. The frontier keeps the judgment; the volume does not need it."
---

# Open Weights Win on Bounded Work

*The case for running open models is not fear of lock-in. Bounded work rewards exactly what open weights are better at: price per unit, a version you can pin, and a boundary your data never crosses. The frontier keeps the judgment. The volume does not need it.*

---

## The argument this wiki has been avoiding

Every page here that recommends open weights recommends them defensively. [The Lock-In Is Coming](/perspectives/the-lock-in-is-coming) says adopt them because the vendor will capture you. [Cheap Tokens Are a Subsidy That Will Be Withdrawn](/perspectives/cheap-tokens-are-a-subsidy-that-will-be-withdrawn) says adopt them because the price will reset. [Open Weights Cap What Closed Labs Can Charge](/perspectives/open-weights-cap-what-closed-labs-can-charge) does not say adopt them at all; it says read them as pricing intelligence about the closed model you are already buying.

Those are all reasons to hedge. None of them is a reason to build. A practitioner who reads only those pages ends up with a stack that is closed by default and open when frightened, which is not a considered position.

Here is the considered one. **The workloads where open weights win are the bounded ones**, and in a mature agentic system the bounded ones are most of the calls, even though they are almost none of the interesting ones.

## What "bounded" means

A bounded workload has four properties, and it needs all four:

- **The input space is known.** Classification into a fixed set, extraction against a fixed schema, transformation between two known formats, routing, tagging, reranking, summarizing a document type you see a thousand times.
- **Correctness is checkable.** Not by taste, by a rule. A schema validates, a label is in the enum, a total reconciles, a diff is empty. If you can only tell whether the output is good by reading it, the work is not bounded.
- **Volume is real.** Enough calls that the unit price shows up on a line item rather than in the rounding.
- **No open-ended judgment is required.** The moment the task needs the model to figure out what the task actually is, you have left this category.

That last one is the fence, and [Only Frontier Models Replace Skilled Labor](/perspectives/only-frontier-models-replace-skilled-labor) built it. Judgment and generality live at the frontier, small models cannot fake them, and distilling toward them is a race you lose to the next release. This page does not argue with that. It argues that the fence has two sides and the wiki has only ever described one.

## What open weights are actually better at

Not "almost as good, cheaper." Three things they are better at, which a closed API cannot offer at any price.

**A version you can pin forever.** A closed model is a moving dependency: the provider improves it, and your outputs change underneath a workload you already validated. This is the whole subject of [Model Upgrades Are No Longer Strictly Upgrades](/perspectives/model-upgrades-are-no-longer-strictly-upgrades). On a bounded workload with a passing eval suite, you often do not want the upgrade. You want the artifact you tested. Open weights are the only way to hold one.

**A boundary the data does not cross.** Not a promise about retention, an architectural fact. When the input is client material under an NDA, a patient record, or an internal document set, "the vendor says it does not train on this" and "it never left the building" are different products, and only one of them survives a procurement review. [Uncensored Inference](/concepts/uncensored-inference) works through the same choice from the refusal side and lands on the same rule: decide on the data, not the vibe.

**Unit price at volume.** An order of magnitude is not a discount, it is a different design space. Workloads that were not worth automating at closed-flagship prices become worth automating, which is [Jevons Paradox](/concepts/jevons-paradox) arriving on your own roadmap rather than in the market at large.

## The split this implies

Stop asking which model your company uses. It is the wrong unit. Ask it per workload, and expect the answer to come out mixed:

- **Frontier, closed, always current.** Anything with open-ended judgment: the agent loop, the planning step, the ambiguous customer email, the code. Pay for the frontier and take every upgrade, because on judgment work the upgrade is the product.
- **Open, pinned, self-hosted or cheaply routed.** The bounded volume underneath it: classification, extraction, routing, reranking, bulk summarization, embedding, the eval graders themselves.

This is the same split [LLMs Handle Judgment, Code Handles Everything Else](/perspectives/llms-handle-judgment-code-handles-everything-else) makes one layer down, with one more tier inserted. Code where it is deterministic. Open weights where it is probabilistic but bounded. The frontier where it is genuinely open-ended.

The split is also the cheap kind of portability rather than the expensive kind. Bounded calls are thin calls, and [The Portability Tax](/concepts/the-portability-tax) is explicit that portability at the thin-call layer is nearly free while portability at the stateful-agent layer is a salaried engineer forever. So this recommendation costs almost nothing, which is precisely why it is not a hedge.

## What it does not license

**It does not license running the whole stack open.** The agent loop is where judgment lives and where you should be buying the best available thing.

**It does not license self-hosting by reflex.** Hosting open weights yourself is [grade 4 sovereignty](/concepts/sovereignty), the most expensive grade, and a routed open model through an aggregator gets you the price and the pinning without the GPU bill. Self-host when the boundary is the requirement. Otherwise route.

**It does not license skipping the evals.** Everything above depends on correctness being checkable, which means somebody checked. Without [an eval suite](/disciplines/evals) you cannot tell whether a bounded workload is holding on the cheaper model, and the migration between tiers stops being a measurement and becomes a hope.

## The test

For any call your system makes at volume, ask: **could I write down what a correct answer looks like, without reading the answer?**

If yes, that call is a candidate for an open, pinned model, and paying frontier prices for it is a habit rather than a decision. If no, it belongs at the frontier and no amount of price pressure should move it.

> **Buy the frontier for judgment. Run open weights for volume. The mistake is using one model because choosing twice felt like complexity.**

## Further Reading

- [Only Frontier Models Replace Skilled Labor](/perspectives/only-frontier-models-replace-skilled-labor): the other side of the fence, and why the judgment tier is not negotiable.
- [Open Weights Cap What Closed Labs Can Charge](/perspectives/open-weights-cap-what-closed-labs-can-charge): why these models exist, keep improving, and discipline the price of the tier above them.
- [Uncensored Inference](/concepts/uncensored-inference): the four paths to an open model, chosen on cost, privacy, and capability.
- [Model Upgrades Are No Longer Strictly Upgrades](/perspectives/model-upgrades-are-no-longer-strictly-upgrades): why pinning is a feature and not a fear.
- [The Portability Tax](/concepts/the-portability-tax): why this particular portability is the cheap kind.
- [Sovereignty](/concepts/sovereignty): the four grades, and why routing an open model is usually enough.
- [Evals](/disciplines/evals): the instrument that makes tier migration a measurement instead of a guess.
- [Tokens Are the Atomic Unit of AI Economics](/perspectives/tokens-are-the-atomic-unit-of-ai-economics): the tiering discipline this applies at the host layer.
