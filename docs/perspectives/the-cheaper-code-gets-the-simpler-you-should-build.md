---
title: "The Cheaper Code Gets, the Simpler You Should Build"
slug: /perspectives/the-cheaper-code-gets-the-simpler-you-should-build
description: "When producing code costs almost nothing, the friction that used to enforce simplicity is gone. Restraint is now something you supply on purpose. Build the simplest thing that works, and stop."
---

# The Cheaper Code Gets, the Simpler You Should Build

*Cheap production removed the friction that used to keep systems simple. Complexity now costs almost nothing to add and everything to own, so the discipline has to come from you. Build the simplest thing that works, and stop.*

---

## The constraint that used to protect you is gone

For most of software history, effort was the governor on complexity. Every abstraction, every extra feature, every configuration flag cost real hours to write, so you thought hard before adding one. The pain of production was a filter. It quietly killed most bad ideas before they shipped, because you could not be bothered to build them.

Agentic coding removed the filter. You describe an elaborate system and watch it appear in minutes. The cost signal that used to whisper "this is not worth it" is silent, because now everything is cheap to produce. That is the danger, not the gift. The thing that kept your systems lean was never your taste. It was the friction. Take the friction away and the taste has to become explicit, or the complexity floods in through the gap where the cost used to be.

## Easy production feels like value, and it is not

Generating code now delivers a fast physical reward. Something appears, it compiles, the diff is large, and your body reports progress. That reward is the same one described in [Idolizing the Build](/perspectives/idolizing-the-build) and quantified in [Vice Is Quantifiable](/perspectives/vice-is-quantifiable): the spend itself becomes the hit. The difference here is subtler than build-versus-buy. You can be building the exact right thing, the part that is genuinely yours, and still over-build it, because producing more of it feels good.

That is the masturbatory failure. The extra layer of indirection, the speculative config surface, the second and third code path for cases nobody has hit, the framework you reached for when a function would do. None of it was demanded by the problem. It was demanded by the pleasure of producing, and the agent is a bottomless supply. You end up admiring the machinery instead of shipping the outcome, and every part you added is now a part you own forever.

## What over-building looks like now

The tell is a gap between the functional requirement and the size of the thing you built to meet it. Watch for it in the usual places:

- **Abstractions with one caller.** A generalized interface, plugin system, or config layer built for a second and third use case that does not exist yet.
- **Speculative flexibility.** Options, flags, and modes added because they were cheap to add, not because anyone asked. Every one is a branch you now test and maintain.
- **Features the spec never named.** The agent offered them, they looked nice, and they slid in. Scope crept while you enjoyed the ride.
- **Infrastructure the problem did not need.** A database, a queue, a service boundary standing in for what a file and a list could have done.

Each item is defensible alone. Stacked, they are a system only you can hold in your head, built to serve a requirement a fraction of its size.

## A worked example

A gated personal wiki had accumulated an elaborate access system: email magic-link sign-in, one-time invite codes, expiring guest passes, a request-access form wired to a transactional-email provider, an admin panel to manage all of it, and three database collections behind it. Every piece worked. Every piece had a reasonable-sounding story for why it existed.

The functional requirement was one sentence: let a short list of known people in.

The whole apparatus collapsed to a committed list of email addresses and a single Sign-in-with-Google button. The list is the entire access-control model. Adding someone is a line in a file. The change deleted roughly six hundred lines more than it added, and the result is easier to reason about, easier to hand to the next person, and has less surface to break. Nothing of value was lost, because none of the machinery had been serving the actual requirement. It had been serving the pleasure of having built it.

## Just make it functional

The operating rule is blunt on purpose: build the simplest thing that satisfies the real requirement, confirm it works, and stop. Not the most extensible thing. Not the most impressive thing. The thing that clears the bar and no more.

Holding the line, in practice:

- **Name the functional requirement in one sentence first.** If your build is much larger than that sentence, the excess is for you, not the user.
- **Make the agent build less, not more.** Default prompts sprawl. Ask for the minimum that works, then add only what a real, hit case forces.
- **Delete on sight.** The cheapest complexity to own is the complexity you never merged. When you catch a speculative layer, cut it before it grows callers.
- **Count what you now maintain, not what you produced.** Lines shipped is motion. Lines you are on the hook for is the real cost, and simplicity is the only thing that lowers it. This is the honesty [Acceleration Is Not Completion](/perspectives/acceleration-is-not-completion) demands of speed.
- **Reserve real engineering for the differentiated core.** Everything else earns its complexity or gets cut.

## Simple is not sloppy

Functional means it actually works: it meets the requirement, handles the real cases, and stays legible to the next person who opens it. That is a higher bar than a pile of clever machinery, not a lower one, and it is a different failure from [Slop Factory](/perspectives/slop-factory), where the output is high-volume and low-quality. Here the output can be genuinely well-made and still wrong, because it is well-made in service of complexity the problem never asked for. The same restraint runs through [The Case for Simple Harnesses](/perspectives/the-case-for-simple-harnesses) at the tooling layer: a small core beats a kitchen sink because someone has to own every default you ship.

The skill the industry is quietly selecting for is not the ability to produce. That is free now. It is the judgment to produce as little as the outcome requires and to feel no smaller for it.

> **Cheap production made complexity feel free. It never was. Every part you add is a part you own, so build the simplest thing that works, prove it works, and put the tool down.**

## Further Reading

- [Idolizing the Build](/perspectives/idolizing-the-build): the sibling failure, worshipping the act of building over the outcome it serves.
- [The Case for Simple Harnesses](/perspectives/the-case-for-simple-harnesses): the same restraint applied to the harness and tooling layer.
- [Acceleration Is Not Completion](/perspectives/acceleration-is-not-completion): why speed of production is not the same as a finished outcome.
- [Vice Is Quantifiable](/perspectives/vice-is-quantifiable): why the production rush behaves like every other addiction.
- [Slop Factory](/perspectives/slop-factory): the adjacent failure of high-volume, low-quality output.
