---
title: "The Portability Tax"
slug: /concepts/the-portability-tax
description: "The ongoing cost of keeping maximal model and vendor flexibility: building to the lowest common denominator, owning the harness and the deployment yourself, and forfeiting the platform-native capabilities that would otherwise be free."
image: "/img/comics/the-portability-tax.png"
---

# The Portability Tax

*The ongoing cost of keeping maximal model and vendor flexibility. Staying portable means building to the lowest common denominator, owning the harness and the deployment yourself, and forfeiting the platform-native capabilities that would otherwise be free.*

![Four-panel comic strip in a uniform 2x2 grid on warm cream paper, heavy black inks, matte-navy power armor with vivid orange seam accents and cyan wrist glow. Chunky inked title bar at top reads "THE PORTABILITY TAX". PANEL 1, labeled "1. WHY YOU WANT IT": the hyperagent stands confidently between three identical heavy steel doors plated "1", "2", "3", holding up a single gold master key; gold banners above the doors read "LEVERAGE", "NO LOCK-IN", "HEDGE". Paper-tape caption: "Real reasons. Sometimes decisive." PANEL 2, labeled "2. WHAT IT COSTS": the same three doors are now chained shut together, and the hyperagent is hunched low squeezing through a narrow doorway cut where the three overlap, stamped "THE INTERSECTION"; discarded wooden crates on the floor are stamped "CACHE", "BATCH", "SANDBOX", "MEMORY", "VAULT". Paper-tape caption: "You build to the intersection. The rest is forfeited or rebuilt." PANEL 3, labeled "3. THE RECURRING BILL": the hyperagent at a workbench patches a rickety machine plated "ABSTRACTION LAYER" with a wrench while three canisters marked "v2", "v3", "v4" fly in at him from off-panel and a long paper receipt unspools onto the floor. Paper-tape caption: "The layer is never done. It lags every release." PANEL 4, labeled "4. PRICE IT, THEN DECIDE": the hyperagent stands at a large gold balance scale weighing stacked gold coins labeled "LEVERAGE" against a heavy stone block stamped "COST", chin in gauntlet, visor glowing cyan, beside an inked sign reading "A PURCHASE, NOT A DEFAULT". Paper-tape caption: "Most teams adopt it by reflex and never compute the bill." Chunky inked footer bar reads "PORTABILITY IS A PURCHASE. PRICE IT."](/img/comics/the-portability-tax.png)

---

## Portability is a purchase

Almost every team building on models declares itself model-agnostic, and almost none of them price the declaration. It gets adopted the way a coding convention gets adopted: obviously correct, no meeting required, no line item.

It is a purchase. It has a recurring cost, it buys real things, and for some teams the things it buys are worth more than the cost. The failure is not choosing portability. The failure is choosing it by reflex and never computing the bill.

## Why teams want it, and why they are often right

The case for portability is not naive. Five reasons show up repeatedly and each of them is genuine.

**Pricing leverage.** If two providers can serve your workload, you can move volume, and the credible threat of moving is worth money even when you never move. Teams with a real second option negotiate from a different position than teams with none.

**Avoiding lock-in.** Depth of integration is depth of dependence. A provider that owns your loop, your sandbox, your credential store, and your memory owns your migration cost, and migration cost is what a repricing conversation is really about.

**Models improve at different rates.** Capability leadership rotates. A workload that is state of the art on one provider this quarter may be second-best next quarter, and if you cannot switch, you eat the gap for as long as it lasts.

**Regulatory and customer requirements.** Some buyers contractually require a named alternative. Some jurisdictions require data residency or processing arrangements only some providers offer. This is not a preference; it is a gate.

**Hedging a roadmap.** Providers deprecate, reprice, restrict, and change posture. Betting a company on one vendor's continued alignment with your use case is a real bet, and sometimes the hedge is cheap insurance.

Any one of these can be decisive. The point of pricing the tax is not to argue nobody should pay it. It is to make sure the people paying it know they are.

## What it actually costs

Four costs, and they are not the ones teams expect.

**You build to the intersection.** A portable system can only use features every target provider has. That is not a mild constraint; it is a hard filter on the design space. Anything provider-specific is off the table by construction, including the features that most reduce your own engineering. The intersection also shrinks over time, because providers differentiate faster than they converge.

**You own both axes.** A portable stack means you supply [the harness and the deployment](/concepts/the-harness-and-the-deployment) yourself, permanently, because a managed platform is by definition provider-specific. The loop, the sandbox, the session store, the secret handling, the capacity plan, the scheduler: all yours, all forever. This is usually the largest cost and the least discussed.

**Every provider-specific optimization is forfeited or rebuilt.** The list is longer than most teams realize, and it grows:

- **Prompt-cache economics.** Cache reads cost a fraction of fresh input, but caching is prefix-matched and provider-specific in placement rules, minimum cacheable prefix, and invalidation behavior. Building to the intersection means either giving up the savings or maintaining per-provider cache strategies, which is the abstraction leaking immediately.
- **Batch discounts.** Asynchronous batch endpoints price non-latency-sensitive work at a steep discount. Not every provider has one, and their semantics differ.
- **Effort and thinking controls.** The knobs that trade reasoning depth against cost are named differently, take different values, and are rejected outright on some models. A portable wrapper either exposes the union (and breaks on the provider that rejects the parameter) or the intersection (and gives up the control).
- **Managed sandboxes.** Per-session isolated execution environments for shell, file, and code tools, with lifecycle and capacity handled for you. Rebuilding this is a security-critical infrastructure project, not a weekend.
- **Credential vaults with egress-time injection.** Secrets stored outside the execution environment and substituted into the outbound request after it leaves the sandbox, so no code the agent writes can read them. This is the correct answer to prompt-injection-driven credential theft, and it requires the platform to own the egress path.
- **Durable cross-session memory.** Versioned, auditable stores the agent reads and writes across sessions, with concurrency preconditions and redaction. The naive version is a folder. The real version is a database with an audit trail.
- **Rubric-graded iteration loops.** Declaring what "done" looks like and having the platform run an iterate, grade, revise cycle against a rubric with an independent grader. Rebuilding this means building the grader, the loop, and the accounting.
- **Scheduled runs.** A recurring schedule that fires autonomous sessions with per-firing run records and lifecycle controls. Or you run a cron box and reinvent the run-record semantics.

**The abstraction layer is a permanent maintenance surface.** This is the cost that compounds. Someone owns the translation layer, and that layer lags every provider release: a new parameter ships and the wrapper does not expose it, a parameter is removed and the wrapper still sends it, a new model changes tokenizer behavior and your budgets are silently wrong. The layer is never done, and its complexity tracks the divergence between providers, which is increasing.

## The honest cases where paying it is right

Four situations where the tax is worth it, stated so you can check yourself against them.

**Model choice is your product.** Routers, gateways, evaluation platforms, and comparison tools sell optionality. Portability is not overhead; it is the thing customers buy.

**A customer or regulator requires it.** A contractual second source or a residency constraint is not a trade-off to optimize. Pay the tax and move on.

**The workload is a thin, well-scoped call.** Classification, extraction, summarization over a bounded input. The abstraction is a few dozen lines, the intersection covers everything you need, and switching providers is a config change. Portability here is nearly free, and refusing it would be silly.

**You measured, and the leverage exceeds the cost.** Someone put a number on the negotiating advantage and a number on the engineering, and the first is larger. This is the rarest of the four, because almost nobody does the arithmetic.

## The asymmetry

The tax is not a flat rate. It scales with how stateful the system is.

A single well-scoped call is cheap to keep portable. The surface is small, the intersection covers it, and the wrapper is thin enough to be nearly free.

A stateful agent with tools, memory, and sandboxed execution is expensive to keep portable, because that is exactly where platforms differentiate. Sandboxing, session persistence, credential handling, memory durability, and scheduling are the hard parts, so they are the parts platforms compete on, so they are the parts a portable design cannot use. Portability is cheapest precisely where it matters least, and most expensive precisely where it matters most.

The practical consequence: split the system. Keep the thin calls portable, because it costs almost nothing. Decide deliberately about the stateful agent, because that is where the bill is.

## The reframe

Portability is a purchase, not a default. Price it, then decide.

The arithmetic is not complicated. On one side: the pricing leverage you will realize, the migration risk you avoid, the contracts you can sign. On the other: the harness and deployment you now maintain forever, the platform capabilities you forfeit or rebuild, and the salaried engineer whose job is keeping the abstraction current.

Run it once. If the answer is pay the tax, pay it deliberately and stop apologizing for the constraints it imposes. If the answer is do not, stop paying it out of habit.

## Further Reading

- [The Harness and the Deployment](/concepts/the-harness-and-the-deployment) for the two axes a portable stack commits you to owning.
- [Intelligence Is Commoditized, Deployment Is the Moat](/perspectives/intelligence-is-commoditized-deployment-is-the-moat) for why the model layer converges while the application layer does not.
- [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure) for the floor beneath any of this.
- [Your Edge Is Not Your Infrastructure](/perspectives/your-edge-is-not-your-infrastructure) for the case against owning the undifferentiated half.
- [Learn the Harness, Not the Wrapper](/perspectives/learn-the-harness-not-the-wrapper) for the skill-portability argument, which is a different question from system portability.
