---
title: "The Goldilocks Pace"
slug: /concepts/the-goldilocks-pace
description: "The operating pace that maximizes returns while keeping risk bounded, held predictably week after week."
image: "/img/comics/the-goldilocks-pace.png"
---

# The Goldilocks Pace

*The operating pace that maximizes returns while keeping risk bounded, held predictably week after week. Models can go a million miles an hour. A business should not, by default.*

![Three-panel warm editorial strip titled THE GOLDILOCKS PACE. Panel one, captioned TOO HOT: SLOP SHIPS, a young woman hunched over a glowing amber laptop as printed pages pour out of it and drift across the table and floor, while behind her a customer walks out the open door. Panel two, captioned TOO COLD: THE WINDOW PASSES, an older man sits with his arms crossed watching a train pull away through the window, his laptop closed on the table in front of him. Panel three, captioned JUST RIGHT: FOUNDATIONS FIRST, a woman works calmly at a glowing laptop in which small figures lay deep stone foundations under a rising tower, with a neat stack of tiles beside her. Bottom line: PICK THE PACE YOU CAN HOLD. DIG DEEP BEFORE YOU BUILD.](/img/comics/the-goldilocks-pace.png)

## The pace is a decision, and most teams inherit it instead of making it

Frontier models removed the speed limit. They did not answer how fast a business should move, and most teams never ask. They inherit a pace from panic (keep up with competitors) or from fear (wait until it is safer), and both defaults lose. The **Goldilocks pace** is the deliberate answer: the fastest speed that still maximizes returns, keeps risk bounded, and can be held week after week without breaking something you depend on.

## Too hot: slop ships and trust leaves quietly

Run at the model's speed and you ship whatever it produces. The banner it flies under is keeping up with competitors. What actually happens is the quality bar drops without anyone deciding to drop it, and the [slop factory](/perspectives/slop-factory) starts running in your name. If your product is an [outcome generator](/concepts/the-outcome-economy), every slop outcome it ships spends trust you cannot see on a dashboard. That is the dangerous part: nobody emails you that trust is gone. Word of mouth reverses without a sound. The referrals stop, and by the time the metrics show it, the reputation is already spent. [Don't scale slop](/playbooks/dont-scale-slop) is the operational rule; the Goldilocks pace is the operating posture behind it.

## Too cold: the window moves past while you evaluate

The opposite failure is circling the technology, waiting for it to get safer and cheaper before committing. It will keep getting safer and cheaper, so the wait never ends on its own terms, and the window moves past while you deliberate. This is [the 2008 cloud argument again](/perspectives/you-are-having-the-2008-cloud-argument-again): the objections are real, they are the same objections every eventual adopter had, and waiting them out is itself a decision with a price.

## Go slow on foundations so you can go fast for years

A marathoner who sprints the first miles burns out before the last leg. A tall building needs a deep hole dug first, because the foundation decides how much load the structure can ever carry. Tokyo laid subway lines it can extend; New York laid lines it can barely repair. What you bury badly, you live over forever.

For an AI-run operation, the foundations are the boring layer: [evals](/disciplines/evals), a [deterministic core](/perspectives/default-to-determinism), and the [minimum viable infrastructure](/concepts/minimum-viable-infrastructure) underneath the product. Foundations set the blast radius of every later change. Going deliberately slow on them is what makes you fastest a year from now, while competitors drown in the scaling issues they deferred. The same logic holds at the level of a single artifact: [hand-rolling](/concepts/hand-rolling) around your own system is a sprint that teaches the system nothing, which is why the standing rule is [fix the generator, not the output](/perspectives/fix-the-generator-not-the-output).

## Every new model is a new car, so budget a deletion pass

Holding the pace has a companion move at each model release, and it applies to one kind of guardrail only. **Delete the guardrails that patch a model's bug; keep the ones that compare a claim against external truth.** A checker whose only job is catching a rendering mistake the current image model makes constantly is dated the day it is written, and the next model release makes it deletable. A check that probes from the consumer's side and fails closed is not: it exists to catch a capable agent confidently shortcutting, and that risk rises with capability rather than falling, which is why [the more capable the agent, the more guardrails it needs](/perspectives/capable-agents-need-more-guardrails). So budget a **deletion pass** per model release: treat every new model as a new car and re-learn where its edges are before trusting last year's driving habits. The public receipt is Boris Cherny reporting that the Claude Code team deleted over 80 percent of the system prompt when Opus 5 landed, and the model performed better ([YC interview, 2026-07-28](https://www.ycrootaccess.com/p/boris-cherny-building-claude-code)). A team at the Goldilocks pace deletes on schedule; a team running too hot keeps stacking scaffolding it no longer needs.

## A pace you cannot hold is too hot, whatever the demo says

Predictability is part of the definition, and it is the part that gets skipped. A sprint that produces a great week and a broken month was too hot regardless of how the demo looked. The test is simple: could you run this speed for a year without the quality bar slipping and without the team or the systems breaking? If yes, you can probably go faster. If no, the impressive week was borrowed from the months after it.

> **Pick the fastest pace you can hold week after week without shipping slop, dig the deep hole before the building, and delete yesterday's scaffolding every time a new model lands.**

## Sources

- A prep conversation with a founder (2026-08-09). His term was "safe velocity"; his marathon, skyscraper, and subway images were sharpened live into the Goldilocks pace.
- Boris Cherny on deleting over 80 percent of Claude Code's system prompt at Opus 5: [YC interview, 2026-07-28](https://www.ycrootaccess.com/p/boris-cherny-building-claude-code).
- The concept as a 14-spread fable: [The Goldilocks Pace picture book](https://books.garysheng.com/the-goldilocks-pace).
- The one-line version rides slide 30 of [a takeoff talk deck](https://takeoffwithclaude.com/deck).

## Further Reading

- [Don't scale slop](/playbooks/dont-scale-slop) is the too-hot failure as an operational playbook.
- [You Are Having the 2008 Cloud Argument Again](/perspectives/you-are-having-the-2008-cloud-argument-again) is the too-cold failure in its historical costume.
- [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure) names the foundation layer the deliberate-slow phase builds.
- [Fix the Generator, Not the Output](/perspectives/fix-the-generator-not-the-output) applies the same discipline to a single artifact.
- [The More Capable the Agent, the More Guardrails It Needs](/perspectives/capable-agents-need-more-guardrails) is the other half: the deletion pass retires bug-patches, and external-truth checks keep growing.
