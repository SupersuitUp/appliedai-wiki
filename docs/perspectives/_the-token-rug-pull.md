---
title: The Token Rug Pull
slug: /perspectives/the-token-rug-pull
draft: true
description: Token prices are sold below cost, propped up by the largest capital subsidy in the history of enterprise software. The bill is coming due, and now there is an index that will measure it.
image: "/img/comics/the-token-rug-pull.png"
---

# The Token Rug Pull

*Token prices are sold below cost, propped up by the largest capital subsidy in the history of enterprise software. The bill is coming due, and now there is an index that will measure it.*

![Four-panel comic strip in bold neo-comic action-zine style on cream paper, crimson + cobalt + gold + arc-reactor cyan palette. Title bar: THE TOKEN RUG PULL. Panel 1 THE CARNIVAL OF CHEAP TOKENS: a neon AI TOKEN BAZAAR kiosk priced '$0.99 / 1M TOKENS' with buyers cheerfully filling carts labeled API CALLS, AGENTS, BATCH JOBS. In shadow behind the booth, three giant investor figures in dark suits prop the kiosk up; floating ledgers read OPENAI -$5B / YEAR and ANTHROPIC SIMILAR BURN. A placard reads TRUE COST UNKNOWN. The hyperagent stands at the edge of the frame, helmet off, narrowing his eyes at the propped-up booth. Caption: 'Every token consumed today is sold below cost, propped up by the largest capital subsidy in the history of enterprise software.' Panel 2 THE INDEX LIGHTS UP: a trading-floor wall lights up with a new electronic board reading AI TOKEN PRICE INDEX with four labeled columns INPUT, OUTPUT, CACHED, REASONING; small attribution line at the bottom reads MADDIPATLA · MONITOR DELOITTE · MELBOURNE. The hyperagent in his Supersuit watches with one armored gauntlet on a holographic console. Caption: 'Every commodity that matters has a price index. Now AI tokens have one too.' Panel 3 THE MUSIC STOPS: a chaotic server room with a literal red carpet being yanked sideways across the floor, sending chairs and papers flying. A wall monitor reads INVOICE: $200K --> $400K. A small world-map cluster shows pulsing red dots labeled FRANKFURT and VIRGINIA. Over the scene, a jagged red arrow labeled INDEX points sharply up. Caption: 'When the funding rounds dry up, every business built on subsidized infrastructure pays market price at the same time.' Panel 4 THE SURVIVOR: FIRST-PERSON POV through the hyperagent's armored helmet visor. The view is his physical workshop, foreground a small local-hardware inference rack glowing arc-reactor cyan, beyond the cockpit window storm clouds over a faint Frankfurt/Virginia world map. HUD overlays in cyan and gold floating: LOCAL INFERENCE: ARMED, PORTABLE HARNESS: READY, TOKEN FORECAST: DEFENDED, FILES > PLATFORMS. A single unified gold spiral halo hovers above the top of the visor frame. Caption: 'The hyperagent who treated cheap tokens as a window, not a feature, built the portable stack before the reset arrived.' Footer bar: TOKENS ARE PRICED LIKE A SUBSIDY. ARCHITECT LIKE THE SUBSIDY ENDS.](/img/comics/the-token-rug-pull.png)

---

## The Subsidy Nobody Is Pricing In

Every business building on top of a commercial API has the same fastest-growing variable cost: tokens. And nobody actually knows what a token costs to produce.

OpenAI lost roughly $5 billion last year. Anthropic is burning investor capital at a similar rate. The unit economics of the frontier labs are deliberately obscured by the largest capital subsidy in the history of enterprise software. Every token consumed today is sold below cost, propped up by investors hoping to be the last platform standing.

This is the oldest play in the platform economy: subsidize to capture, capture to monetize, monetize until the customer cannot afford to leave. The argument is structural, not personal, and the structure is already in motion. See [The Lock-In Is Coming](/perspectives/the-lock-in-is-coming) for the deeper treatment of why this happens and how to architect against it.

## What Is New: An Index

Every commodity that matters has a price index. Equities have the S&P 500. Oil has Brent crude. Shipping has the Baltic Dirty Tanker Index. Until recently, AI tokens did not.

The [AI Token Price Index](https://tokenpriceindex.com/) closes the gap. Built by Harsha Maddipatla, a Partner in Strategy at Monitor Deloitte in Melbourne, the index aggregates token pricing across the major commercial models, input and output tokens, cached tokens, and reasoning tokens, and produces a single benchmark. It is to AI compute what Brent crude is to a barrel of oil: a reference price the market can argue about.

This is the first time the AI economy has had an objective marketwide record of where token pricing actually sits and where it is heading.

## Why The Index Matters

A defensible reference price changes how three groups make decisions.

**Budgeting.** If you are forecasting AI spend for the next fiscal year, "tokens will cost what they cost today" is no longer a defensible assumption. An index lets you model floor and ceiling scenarios against a number a board will accept as legitimate.

**Negotiation.** When a vendor sends a renewal, you want to know whether they are charging above or below market. Without an index, you are flying blind and the vendor knows it. With an index, you can hold a renewal to the line.

**Strategy.** Token prices are about to become a board-level conversation, and boards love indices. Once a benchmark exists, the question stops being "is AI expensive?" and starts being "are we above or below the index, and what are we doing about it?"

## Why The Direction Is Up

The direction of travel on the index is unambiguously up. Most of the pressure has nothing to do with the AI labs themselves: it is geopolitics, energy costs, and constrained data center capacity in Europe and the Middle East. The companies still routing every query through a single US or European region will wake up one morning and discover their AI bill has doubled with no architectural defense.

The subsidies compound the problem. When the music stops, when a funding round dries up or a single major player breaks, the reset is not gradual. Every business that built its workflows on subsidized infrastructure pays market price at the same time. There is no soft landing in a platform economy when the platform decides to monetize.

## What Survival Looks Like

The businesses most likely to survive the rug pull are the ones who reduce their exposure to the subsidy before the subsidy ends. That means three things in practice.

**Multi-provider portability at the harness layer.** Build on [files instead of platforms](/perspectives/the-lock-in-is-coming). Plain markdown context, swappable models, harnesses that can move between providers without losing state. The cost of switching providers should be a config change, not a re-platforming.

**Local inference where it earns its slot.** Open source models are improving fast. Not every workload needs a frontier proprietary model. Routing classification, summarization, and structured extraction to local inference on owned hardware caps the exposure for the work that does not need the top tier. This is the [tier discipline](/perspectives/the-token-economy) applied to host architecture, not just model selection.

**A defensible internal token forecast.** Track your own consumption against the public index. Know which workloads are price-elastic (could move to cheaper tiers or local inference) and which are not. Have a board-ready answer to "what happens if our token bill doubles in 90 days." The answer should not be "we are exposed."

The rug pull, if it comes, will sort the field cleanly. The companies that treated cheap tokens as a permanent feature will pay the reset. The companies that treated cheap tokens as a window will have used the window to build the portable stack that makes the reset survivable.

## Sources

This page is distilled from a 2026-05-23 field note by [Dr. Errol Brandt](/people-to-follow/dr-errol-brandt), Founder of Kiraa.AI. His video introducing the AI Token Price Index is the primary source for the framing; the index itself is the artifact worth tracking over time. Full source profile, including the field-note log of what was lifted from this piece, lives on the speaker page.

The [AI Token Price Index](https://tokenpriceindex.com/) is the standing reference. Check it before any vendor renewal conversation.

---

## Further Reading

- [The Lock-In Is Coming](/perspectives/the-lock-in-is-coming): The deeper structural treatment of why VC-backed platforms always end this way, and the sovereign-stack response.
- [The Token Economy](/perspectives/the-token-economy): The atomic-unit treatment of what a token is and how token economics shape applied AI work.
- [Jevons Paradox](/concepts/jevons-paradox): The flipside, where cheaper tokens expand total demand. Both forces operate on the index at once.
- [Dr. Errol Brandt](/people-to-follow/dr-errol-brandt): The speaker who surfaced the index, and his field-note log on this wiki.

## Supporting voices

- **The PrimeTime (2026-06-12):** Flagged the incentive asymmetry underlying the "loop-everything" advice: labs give their own employees free and unlimited tokens, then tell practitioners to spend $10,000 a day on the same product. The person whose advice costs them nothing is not in the same position as the person who bears the actual cost. Reinforces the structural misalignment the Token Rug Pull names. [Field note](https://appliedai.wiki/note-sharers/the-primetime/2026-06-12-lying-to-you)
