---
title: "Vertical Integration Is the Moat"
slug: /perspectives/vertical-integration-is-the-moat
description: "Model quality converges, but the harness compounds. The company that fully verticalizes the model and the harness harvests the one dataset nobody else has: how humans turn intent into action and whether they got what they wanted. Users pay to train it, and productizing the harness as an SDK farms that collection out to other companies too."
image: "/img/comics/vertical-integration-is-the-moat.png"
---

# Vertical Integration Is the Moat

*Model quality converges, but the harness compounds. The fully verticalized owner of both the model and the harness harvests the one dataset nobody else has: how humans turn intent into action and whether they got what they wanted. Every user session pays to train it, and productizing the harness as an SDK farms that collection out to other companies too. The moat is the loop, not the model.*

![Four-panel action-comic on cream paper, 2x2 grid. Chunky inked title bar reads VERTICAL INTEGRATION IS THE MOAT; footer bar reads THE MOAT IS THE LOOP, NOT THE MODEL. Panel 1, label "THE HARNESS HARVESTS": Midas the Blasian hyperagent in a bulky matte-navy Supersuit with orange seams and cyan wrist glow works at a real-world command desk; three amber capture-tags peel off his workflow reading INTENT, ACTION, and GOT WHAT I WANTED?; orange rubber-stamp HYPERCONTEXT LOADED; paper-tape caption "Every session is a labeled example." Panel 2, label "OWN BOTH LAYERS": a single glowing column of two fused cubes, a gold cube labeled MODEL on the bottom and a cobalt cube labeled HARNESS stacked on top, bound by cyan energy with arrow-loops cycling between them; the translucent cyan-and-gold holographic Chief of Agents, gold comms crown worn on his head and conductor's mantle, conducts the loop; paper-tape caption "Own both layers. Each turn improves every layer." Panel 3, label "USERS PAY TO TRAIN IT": three visibly distinct ordinary humans of different ages and skin tones drop gold coins into glowing funnels that pour cyan energy up into a large rising MODEL core; orange rubber-stamp MISSION INTACT; paper-tape caption "They bought the classroom and became the teachers." Panel 4, label "PRODUCTIZE THE HARNESS": Midas hands out a glowing cobalt cartridge stamped AGENT SDK to a row of small company storefronts, each with its own cluster of customer figures; bright cyan data-streams flow from every storefront back down into one gold MODEL core; paper-tape caption "Farm out the harness, keep the exhaust."](/img/comics/vertical-integration-is-the-moat.png)

---

## The moat is not the model

Frontier models leapfrog each other every few months, and open weights cap what any closed lab can charge (see [Open Weights as Price Ceiling](/perspectives/open-weights-as-price-ceiling)). Any single model lead is temporary and expensive to defend. You also cannot copy your way to the front: distillation reproduces yesterday's answers while inheriting yesterday's errors (see [You Can't Distill Your Way to the Frontier](/perspectives/you-cant-distill-your-way-to-the-frontier)).

What does not converge is the loop wrapped around the model. That loop is the harness.

## The harness is a data-collection engine

A harness is where a human turns a thought into action ([Learn the Harness, Not the Wrapper](/perspectives/learn-the-harness-not-the-wrapper), [Harness Engineering](/disciplines/harness-engineering)). Every session inside it is a labeled example: the intent a person came in with, the sequence of steps they took, the corrections they made along the way, and the one signal that matters most, whether they accepted the output or threw it away.

That trio, intent then action then satisfaction, is the exact data you need to make a model more useful at real work. It exists nowhere else. No public benchmark contains it. No amount of scraped text captures whether a specific human got what they actually wanted. It is generated only when real people do real work inside your harness, and it belongs to whoever runs that harness.

## Full vertical integration compounds every layer

The crux is vertical integration. When one company owns both the model and the harness, the feedback closes a loop no single-layer competitor can run. Anthropic owns the model and Claude Code. OpenAI owns the model and both Codex and ChatGPT. In each case the harness data trains the model, the better model makes the harness more capable, the more capable harness attracts more work, and more work produces more data.

Each turn of that loop improves every layer at once. Compare the two ways to own only half of it:

- A **pure-model company** sells intelligence by the token and never sees what was done with it. It ships capability blind to outcomes.
- A **pure-wrapper company** sees the work but cannot move the model underneath it. It watches the taste data flow past and cannot train on it.

The full-stack owner sees both and moves both. That is why owning the stack is hard to beat: it is not one advantage, it is a flywheel where every layer feeds the next.

## Users pay to train it

Here is the part that is beautiful and slightly eerie. The people generating the training data are paying for the privilege. Every subscription funds the collection of the taste data, the workflows, and the accepted-and-rejected outputs that make the next model better at exactly the work those users do. Users are not the product in the old advertising sense. They are the teachers, and they bought the classroom.

This is the strongest flywheel in the industry precisely because it runs on the customer's own money and the customer's own judgment. The lab does not have to guess what good output looks like. Millions of operators tell it, for a fee, every day.

## Productize the harness and it compounds again

The loop does not stop at your own users. Once the harness is good, you can productize it: ship it as an SDK other companies build their own products on. The **Claude Agent SDK** is exactly this move. Now every company that builds on your harness runs their end customers' work through it, and that work flows back to the layer underneath as data. You farmed out the harness and kept the exhaust.

This second-order flywheel dwarfs the first. Your own product reaches only the customers you can sell to directly. Your harness-as-a-platform reaches every customer of every company that builds on it, across industries and workflows you would never have entered yourself. The firms building on the SDK are not a threat to the data engine, they are unpaid distribution for it. They bring their own end customers, and the taste data from those customers still lands with whoever owns the harness and the model beneath it.

That is why the fully verticalized owner is so hard to beat. They capture the data from their own users, from the companies who build on their SDK, and from those companies' customers, and all of it trains the same model at the bottom of the stack.

## What it means for operators

Which specific lab survives, and for how long, is genuinely uncertain. The structural point holds no matter who wins: you will not out-model the full-stack labs, and you should stop trying. Their edge is not a better prompt you can match. It is a loop you are not inside. Three moves follow.

- **Ride the harness, do not rebuild it.** Learn the primitives that transfer, and prefer a small core with extensible edges over a bespoke stack you now have to maintain ([The Case for Simple Harnesses](/perspectives/the-case-for-simple-harnesses)).
- **Keep your own context and taste under your control.** Your accumulated context is the one asset the flywheel wants and the one you can actually withhold or carry between harnesses ([Ephemeral Software, Precious Context](/perspectives/ephemeral-software-precious-context), [Command Centers](/concepts/command-centers)).
- **Price in the lock-in.** The same loop that makes a harness useful makes leaving it expensive. Assume the switching cost will rise, and keep an exit that does not depend on any one vendor's goodwill.

The competitive question in applied AI is moving off the model and onto the loop. Build where the loop cannot reach: your judgment, your context, and the specific business you understand better than any harness ever will.

## Further Reading

- [Learn the Harness, Not the Wrapper](/perspectives/learn-the-harness-not-the-wrapper): why the harness, not the vendor wrapper, is where durable skill lives.
- [Only Frontier Models Replace Skilled Labor](/perspectives/only-frontier-models-replace-skilled-labor): the companion claim about where model capability actually bites.
- [You Can't Distill Your Way to the Frontier](/perspectives/you-cant-distill-your-way-to-the-frontier): why copying the model is not a path to leading it.
- [Open Weights as Price Ceiling](/perspectives/open-weights-as-price-ceiling): how the moat moves off the technique and onto distribution and trust.
- [Harness Engineering](/disciplines/harness-engineering): the craft of building the loop this perspective is about.
