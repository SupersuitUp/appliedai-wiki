---
title: Propaganda-Weighted Average
slug: /concepts/propaganda-weighted-average
description: "The average of the public internet is the world's pitch, not the world's truth. Models trained on it inherit that weighting. Vague prompts collapse to the propaganda-weighted average; specific prompts with operator ground-truth context pull away from it."
---

# Propaganda-Weighted Average

*The average of the public internet is the world's pitch, not the world's truth. Models trained on it inherit that weighting. Vague prompts collapse to the propaganda-weighted average; specific prompts with operator ground-truth context pull away from it.*

---

## What it is

The training corpus of every modern frontier model is approximately the public internet plus the corpus of digitized books. The selection criterion was availability, not truth. What got into the corpus is what someone took the time to publish. What someone took the time to publish is, on average, what someone wanted the world to see.

The average of "what someone wanted the world to see" is a pitch. Companies promote themselves. Governments frame themselves. Activists shape narratives. Influencers sell products. Academics defend priors. News organizations chase the cycle. The corpus is not adversarial in any individual case. The aggregate is structurally promotional.

A model trained on that corpus does not learn truth. It learns the propaganda-weighted average of the corpus. That is the default disposition any prompt collapses to in the absence of pull.

## Why the published average skews to pitch

Three reinforcing structural forces.

- **Publication is costly.** People publish when they have a reason. The most common reason is to influence: sell, persuade, defend, promote. Patient truth-telling rarely has the same publication incentive.
- **Algorithmic amplification.** What gets read is what the algorithm rewards, and the algorithm rewards engagement. Engaging content over-represents narrative shape, emotional load, and certainty. The internal numbers, the messy data, the boring truth tend not to make the cut.
- **Survival of the polished.** Anything written precisely enough to be falsifiable gets falsified and edited or buried. Anything written vaguely enough to dodge falsification persists. The persistent material is therefore the vague-promotional kind.

The result is a corpus whose average is structurally a pitch. The model trained on it inherits that average as its baseline output.

## What it implies for prompting and system design

The model's behavior is a function of pull. Pull comes from the operator. Two regimes:

- **Low-pull prompts.** Vague briefs with no ground-truth context collapse the model to the propaganda-weighted average. The output sounds polished, asserts confidently, references the consensus view, and matches what most people would say is true. It is also typically wrong about what is actually going on in the operator's specific situation, because the operator's specific situation is not the published average.
- **High-pull prompts.** Specific briefs with operator ground-truth context (the lived data nobody published, the internal numbers, the actual sequence of events in the room, the suppressed counter-narrative) pull the output away from the published average and toward the operator's actual reality. This is where useful AI output comes from.

The operator's job, mechanically, is to apply enough pull to overcome the propaganda-weighted gravity of the model's default. That is not a prompt-engineering trick. It is a reflection of who has access to truth the corpus does not contain.

## What this does not mean

It does not mean the corpus is worthless. The corpus contains enormous amounts of genuine information, and the model is brilliant at recall and synthesis across it. The point is the *average disposition* is promotional, so the default output is too.

It does not mean every prompt needs forensic context. Plenty of tasks are fine to leave at the propaganda-weighted average (general background, common-knowledge synthesis, low-stakes draft generation). The discipline is knowing when the task is one of those and when it is not.

It does not mean the operator is the only path to truth. Verified ground-truth datasets, internal company data, well-curated retrieval sources, and authenticated expert input all serve the same function: they overcome the model's default by feeding it material the published average did not contain.

## Further Reading

- [AI Is Your Smartest, Most Coachable Friend Who Has Read Everything But Experienced Nothing](/perspectives/ai-is-your-smartest-most-coachable-friend) for the broader operator-side model this concept lives inside.
- [Slop Factory](/perspectives/slop-factory) for what happens at scale when nobody applies the pull.
- [Vibe Curation](/concepts/vibe-curation) for the editing-seat discipline that grades the output against the operator's actual taste.
- [You Are the Bottleneck](/perspectives/you-are-the-bottleneck) for why the operator's access to truth is the load-bearing capacity in the loop.
