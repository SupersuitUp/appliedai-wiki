---
title: "Tokens Are Cheap, Your Future Attention Is Not"
slug: /perspectives/tokens-are-cheap-your-future-attention-is-not
description: "An agent left to optimize for the cheapest completion of this turn will quietly spend your scarcest resource: the attention it costs you to review work that came back wrong, and the attention it costs future you to rediscover a lesson nobody wrote down."
image: "/img/comics/tokens-are-cheap-your-future-attention-is-not.webp"
---

# Tokens Are Cheap, Your Future Attention Is Not

*An agent left to optimize for the cheapest completion of this turn will quietly spend your scarcest resource: the attention it costs you to review work that came back wrong, and the attention it costs future you to rediscover a lesson nobody wrote down.*

![Warm editorial painterly plate on a cream ground. A woman sits at a wooden desk in a lamplit room, seen from behind, one hand resting open on a thick closed cloth-bound ledger. To her right stands a glowing translucent amber laptop; inside its screen, small rounded agent figures work along a long lit bench under pendant lamps, and on the wall behind them hangs a large round brass gauge whose single needle rests low and calm. On the wall of her own room hangs a second brass gauge of the same size and make, but its face is entirely blank and it has no needle at all. No text anywhere in the frame.](/img/comics/tokens-are-cheap-your-future-attention-is-not.webp)

---

## The Asymmetry Nobody Prices Correctly

Two resources get spent on every agentic task. One is metered, itemized, and visible on a dashboard. The other is invisible until it is gone.

Tokens are the metered one. A thorough pass costs some multiple of a shallow one, and that multiple is knowable in advance. Your attention is the other one, and it has no meter. It gets spent when a task comes back wrong and you have to look at it again, when you re-explain a preference you already gave, and most expensively when you return to your own system months later and cannot reconstruct why it works the way it does.

The prices are not close. A model reading an entire file instead of skimming it, running the full verification instead of the fast one, or writing down the failure it hit costs a rounding error against one round of you re-reviewing wrong output. Yet the token cost is the one that shows up on a screen, so it is the one that gets optimized, by you and by the agent.

This is the same substitution [Anxious Creativity](/concepts/anxious-creativity) makes in the other direction: expensive motion that feels productive. Here the motion is thrift.

## An Agent With No Instruction Optimizes the Visible Cost

Left unspecified, a capable agent will produce the cheapest thing that plausibly satisfies the request. It will read part of a file and infer the rest. It will run a subset of checks and report success. It will finish and move on rather than write down what it learned. None of that is malfunction. It is a reasonable default when the only cost signal available is length.

The failure is not that the agent is lazy. It is that nobody told it which resource is scarce. A model has no way to know that your attention is the binding constraint unless the harness says so, and the arithmetic that makes thoroughness obviously correct is arithmetic it never sees.

Which is why the instruction has to be explicit and standing. Not "be thorough," which is advice, but a rule with the reasoning attached: token budget is not the constraint, so never truncate a read, skip a verification pass, or hand back a partial result to save tokens. Cost was never the thing being conserved.

## Spending Tokens on Future You

The highest-return use of surplus tokens is almost never more output. It is durability: work that makes the *next* interaction cheaper.

- **Read the whole thing.** Partial reads produce confident answers grounded in the half that got read. Cheap to prevent, expensive to detect, because a wrong answer from a partial read looks exactly like a right one.
- **Run the full verification, not the fast one.** [Verification](/disciplines/evals) is the step most tempting to shorten and the one whose absence surfaces latest.
- **Write the lesson where it will fire again.** A failure diagnosed and not recorded will be rediscovered at full price. Record it on the artifact that caused it, so the next run reads it without anyone remembering to look. This is the read side of [Compounding Docs](/concepts/compounding-docs).
- **Record why, not only what.** Future you inherits the decision without the context that produced it. The reasoning is the part that cannot be reconstructed from the diff.
- **Keep the superseded version beside the new one.** Rejected attempts are the cheapest possible documentation of a failure mode, and they are free: you already paid to generate them.
- **Fix the generator.** A one-off patch buys this turn. [The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing) buys every turn after it.

Each of these trades a resource you have for one you do not.

## The Honest Limit

This is not an argument that all spend is good, and an agent that reads "tokens are cheap" as license to pad is making a different version of the same mistake. Volume is not thoroughness. A longer answer that restates itself has spent the metered resource and the unmetered one at the same time, which is the worst available trade.

The test is not how much was spent. It is whether the spend bought durability: something that makes the next pass cheaper, more correct, or unnecessary. Tokens spent on a fuller read, a real verification, or a lesson recorded where it fires again all pass. Tokens spent restating the previous section do not.

Two cases fall outside the rule and both are about real money rather than plan-metered tokens. Paid model calls billed per invocation deserve a thought before a re-run. So does anything with a side effect in the world, where the constraint is not cost at all.

## What This Looks Like as a Rule

The instruction belongs in the harness, not in your memory of having said it once. In [Agent Rule Files](/concepts/agent-rule-files) it reads roughly like this:

> Token budget is not the constraint. Your attention is. Never truncate a read, skip a verification pass, batch sloppily, or hand back a partial result to save tokens. Spend them: read the whole file, run the full check, write the real docs. The expensive thing is a human re-reviewing work that came back wrong, or future-you re-deriving a lesson that was already learned and never written down.

Attach the reasoning, not only the directive. A rule with its arithmetic attached survives an agent that is trying to be helpful by being frugal. A bare "be thorough" does not.

## Further Reading

- [Tokens Are the Atomic Unit of AI Economics](/perspectives/tokens-are-the-atomic-unit-of-ai-economics) prices the metered resource this page argues against over-optimizing.
- [The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing) is the highest-return way to spend surplus capacity.
- [Spare Cycles](/concepts/spare-cycles) is the standing backlog that turns surplus into compounding work instead of padding.
- [Compounding Docs](/concepts/compounding-docs) is what "write the lesson down" produces over time.
- [You Are the Bottleneck](/perspectives/you-are-the-bottleneck) covers the constraint this page treats as the thing worth conserving.
