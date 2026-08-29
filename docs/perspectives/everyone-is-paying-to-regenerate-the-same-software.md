---
title: "Everyone Is Paying to Regenerate the Same Software"
slug: /perspectives/everyone-is-paying-to-regenerate-the-same-software
description: "Thousands of operators are independently spending tokens to generate the same handful of near-platonic modules, then leaving each copy to die in a private repo. The generated artifact is worth more published than kept, and almost nobody publishes."
image: "/img/comics/everyone-is-paying-to-regenerate-the-same-software.webp"
---

# Everyone Is Paying to Regenerate the Same Software

*A model already holds the pattern for a declarations app, a changelog widget, a password gate. Every operator who wants one pays again to materialize it, then leaves the result in a private repo where it helps exactly one person. The waste is not the tokens. It is that almost none of this gets published.*

![Three panels. One: in a warm workshop, a maker sits at a glowing amber laptop while inside the screen small agents assemble a neat cabinet from scratch; caption "GENERATE IT FROM NOTHING". Two: the view pulls back to a long row of identical workshops stretching into the distance, each with its own maker, its own glowing laptop, and its own set of agents building the very same cabinet, none of them able to see the others; caption "SO DOES EVERYONE ELSE". Three: one maker carries their finished cabinet out and sets it on a public shelf in a shared courtyard where a few others already stand; other makers are lifting cabinets off the shelf and walking away with them while their agents start on something new; caption "PUBLISH ONCE, SKIP THE REBUILD". Footer bar: THE SECOND BUILD OF A SOLVED THING IS WASTE.](/img/comics/everyone-is-paying-to-regenerate-the-same-software.webp)

---

## The pattern was already in the model

Ask a capable model for a declarations app, a password gate for a static site, a changelog that derives from git history, a share-link flow, an image-generation pipeline with provenance. You will get something good, quickly, because these are near-platonic shapes. They have been built thousands of times, the model absorbed the pattern, and it can hand you a clean instance of it on request.

Notice what that means. The knowledge is already collective. The *instance* is what costs money, and every operator who wants one pays to mint their own. Then it lands in a private repo, serves one person, and the marginal value of that spend to everyone else is zero.

Multiply it. Right now some large number of people are independently paying to generate the same module, each unaware of the others, each producing a version that is 90 percent identical to versions being produced in parallel. This is a coordination failure with a price tag, and it is running continuously.

## Generation is capex, and it is being expensed privately

The useful reframe is that a generated module is **capital expenditure**, not consumption. You paid once to bring an asset into existence, and it will keep producing value for as long as it runs. That is the definition.

But capex has a second property people forget: the same asset can serve many operations. A factory does not stop being useful because one product line finished with it. When you generate a module and leave it private, you have booked the cost of an asset and then denied it every use but one.

The instinct that keeps it private is worth naming, because it is usually not strategy. It is that the artifact does not feel like an achievement. You did not labor over it, the agent produced it in an afternoon, and publishing something you did not sweat for feels like publishing nothing. That instinct is wrong on the economics: the value to the next operator is identical whether it cost you three weeks or three prompts.

## What is worth publishing is now much broader

Open source has always run on a filter: is this general enough, polished enough, and important enough to justify the work of extracting and maintaining it? That filter was calibrated to a world where extraction was expensive. Pulling a feature out of an app, genericizing it, writing docs, and shipping it was days of work, so only the highest-value pieces cleared the bar.

Agents collapsed the extraction cost. Genericizing a module and writing its install guide is now an afternoon at most, which means the bar for what deserves publishing dropped by an order of magnitude and almost nobody moved their bar down to meet it. The correct output of that change is many more small, boring, immediately usable modules, published by people who would never have called themselves open-source maintainers.

The unit that travels well here is not a library. It is a **recipe**: a self-contained folder holding the code, an install narrative, and the gotchas that only show up in production. See [Integration Recipe](/concepts/integration-recipe) for the shape, and [Package the Patterns You Keep Copying](/playbooks/package-the-patterns-you-copy) for the sibling discipline of consolidating your own repeated copies. The gotchas are the part with the real leverage: a model can regenerate the code, and it cannot tell the next operator which four things silently broke in production the first time.

## The publish-your-capex habit

- **Ship the recipe when the second consumer appears.** Not the second copy in your own repos, which is [the packaging trigger](/playbooks/package-the-patterns-you-copy), but the first moment you can name someone outside your walls who would use this. If you can name them, extract it.
- **Publish the gotchas above the code.** Anything the model can regenerate is the cheap half. Write down the failures that only appear against a real platform, in production, at the hands of a real user. That is the part nobody else has.
- **Genericize deliberately.** Personal paths, one machine's assumptions, a private cookie name. Fifteen minutes of work, and skipping it is why most shared code is not adoptable.
- **Adopt before you generate.** Before minting a module, spend five minutes looking for a published one. Building it will feel faster than searching. It usually is not, once you count the failures you are about to rediscover.
- **Keep it lightweight.** Publishing is not a support commitment. State the maintenance posture plainly, up to and including "this is what worked for us, unmaintained," and ship it anyway. An unmaintained recipe that saves someone a day is worth more than a polished one that never gets written.

The arrangement is strange when you look straight at it: the models were trained on decades of freely published work, they now regenerate that inheritance on demand, and the artifacts coming out the other side are more private than the ones that went in. A norm where operators publish what their agents built for them would fix that, and it costs the publisher almost nothing.

## Further Reading

- [Integration Recipe](/concepts/integration-recipe) is the unit to publish: one folder, one action, runnable, with its gotchas attached.
- [Package the Patterns You Keep Copying](/playbooks/package-the-patterns-you-copy) is the same discipline pointed inward, at your own repeated copies.
- [Golden Processes](/concepts/golden-processes) covers promoting a repeated generation into a committed, blessed artifact.
- [Hyperlocal Skills](/concepts/hyperlocal-skills) explains where a capability should live, which is the question that decides whether it can travel at all.
- [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure) is the argument for keeping the published thing small enough that someone actually adopts it.
