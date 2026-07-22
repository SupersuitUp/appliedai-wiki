---
title: The Moat Layer
slug: /concepts/the-moat-layer
description: "The part of an agent system that is actually yours: the context corpus, the evals, the tool definitions and encoded craft, and the prompts. It is all text, it costs almost nothing to keep portable, and for a company that sells agents it is the entire asset."
image: "/img/comics/the-moat-layer.png"
---

# The Moat Layer

*The part of an agent system that is actually yours: your context corpus, your evals, your tool definitions and encoded craft, and your prompts. Everything else is rented, and should be.*

![Three-panel horizontal comic strip on cream paper, heavy black inks, three equal-width panels left to right. Chunky inked title bar at top reads "THE MOAT LAYER" in bold block capitals. PANEL 1, corner label tab "TWO LAYERS": Midas the hyperagent stands centered in bulky matte-navy plate armor with vivid orange seam accents and cyan glow at the inner wrists, looking between two things. On his left is a heavy grey riveted industrial machine housing with thick cables and cooling vents, carrying four stenciled label plates reading "SANDBOX", "SESSIONS", "SECRETS" and "CAPACITY". On his right, resting on a low wooden bench, sits a modest gold-banded wooden crate with its lid open, stenciled on the front with "CORPUS", "EVALS", "CRAFT" and "PROMPTS". Parchment paper-tape caption: "One of these is yours." PANEL 2, corner label tab "THE TEST": Midas walks toward the right edge of the panel carrying only the wooden crate under one arm. The grey machine housing stays behind him, unbothered and still running, one large stenciled word across its front reading "RENTED". A small paper tag hangs from the crate's handle reading "YOURS". Parchment paper-tape caption: "If you moved platforms tomorrow, what would you carry out?" PANEL 3, corner label tab "IT THICKENS": Midas at a sturdy workbench under a hanging lamp, a tool board on the wall behind him, setting one more small gold-edged card down into the open crate, which is now visibly fuller than in panel 1 and packed with stacked gold-edged cards. A crumpled paper scrap lies discarded on the bench below, lettered "FIXED BY HAND". Parchment paper-tape caption: "Every correction you encode instead of remember." Chunky inked footer bar at the bottom reads "RENT THE PLUMBING. KEEP THE CRAFT."](/img/comics/the-moat-layer.png)

---

## The two layers

Every agent system splits cleanly in two, and almost nobody draws the line on purpose.

**The rented layer** is what runs the thing: sandboxed execution, session state that survives a restart, tenant isolation, secret handling, capacity, scheduling, retries. It is real work and it is hard work. It is also the same work at every company doing this, which is exactly why nobody's customer has ever bought from them because of it.

**The moat layer** is what makes the output yours rather than generic:

- **The context corpus.** The documents, decisions, and accumulated business truth the agent reasons over. See [Compounding Docs](/concepts/compounding-docs).
- **The evals.** The suite that tells you whether a change made the product better or worse. See [Evals](/disciplines/evals).
- **The tool definitions and the encoded craft.** Not just what the agent can call, but the accumulated specifics of how the work is done well, written down. See [Skill Files](/concepts/skill-files).
- **The prompts and the doctrine.** The standing instructions that carry your taste.

## It is all text, and that is the whole point

Every item on that list is text in a repository. Keeping it portable costs close to nothing: you are already versioning it, already reviewing it, already able to copy it somewhere else in an afternoon.

Keeping the rented layer portable costs a salaried engineer forever, which is what [The Portability Tax](/concepts/the-portability-tax) prices in full. Most teams buy the expensive portability by reflex and neglect the cheap one, which is precisely backwards.

**The portability of the moat layer is not theoretical.** An operator who had spent months encoding craft into skill files on their own machine, then moved that work onto a managed agent platform, found the skills uploaded as plain directories and ran unchanged in a hosted sandbox. The accumulated specifics traveled; only the plumbing was rebuilt. That is the shape to expect, and it is the reason the trade is rational rather than reckless.

## Why this matters most when the agent IS the product

For a company using agents internally, the moat layer is an efficiency asset. Losing it would hurt.

For a company whose **product delivery depends on selling agents to its end customers**, the moat layer is the company. Their software is a thin shell around a rented loop; what the customer is actually paying for is the accumulated judgment about how this particular work gets done well. Strip the corpus, the evals, the encoded craft, and the doctrine, and a competitor with the same platform account produces the same output by Friday.

This has a sharp implication that founders in this position keep getting wrong. **The instinct to protect yourself by owning infrastructure protects the wrong thing.** Owning your own sandboxing does not make your agent better than a competitor's; encoding two years of hard-won specifics about your customers' actual work does. Every engineer-month spent on the rented layer is a month not spent thickening the only layer a competitor cannot copy by buying the same subscription.

## The test

Ask it plainly, and answer honestly: **if you had to move platforms next quarter, what would you carry out, and what would you rebuild?**

- Whatever you would **carry** is the moat layer. It should be growing every week, and it should live in files you control.
- Whatever you would **rebuild** is the rented layer. It should be as small as you can make it, and you should feel nothing about it.
- If the honest answer is that you would carry almost nothing, you do not have a moat problem to solve later. You have one now, and no infrastructure decision fixes it.

## Thickening it on purpose

The moat layer does not accumulate by accident, and shipping features does not thicken it.

It thickens when a correction gets **encoded** rather than remembered. Every time a human catches something the system got wrong and that judgment becomes a rubric line, an eval case, or a rule in a skill file, the layer gets denser and the human's attention gets bought back. That is the compounding loop, and it is the same motion described in [Progressive Automation Is the Job](/perspectives/progressive-automation-is-the-job).

The failure mode is a team that fixes the same class of mistake by hand every week and calls it quality control. That is a moat layer being burned as fuel.

## Further Reading

- [Your Edge Is Not Your Infrastructure](/perspectives/your-edge-is-not-your-infrastructure) for the argument that produces this split.
- [The Portability Tax](/concepts/the-portability-tax) for what the expensive kind of portability actually costs.
- [The Harness and the Deployment](/concepts/the-harness-and-the-deployment) for the two questions that define the rented layer.
- [You Are Having the 2008 Cloud Argument Again](/perspectives/you-are-having-the-2008-cloud-argument-again) for the historical precedent, where the same split decided who survived.
- [Skill Files](/concepts/skill-files) for the format the encoded craft usually takes.
