---
title: "Fixing the Generator Does Not Fix the Fleet"
description: "Repairing the template stops the next instance from being born broken and does nothing for the eleven already shipped. Propagating the fix needs a detector, not just an edit."
image: "/img/comics/fixing-the-generator-does-not-fix-the-fleet.webp"
---

# Fixing the Generator Does Not Fix the Fleet

*Repairing the template stops the next instance from being born broken and does nothing for the eleven already shipped. Propagating the fix needs a detector, not just an edit.*

![Three panels in a warm pottery workshop. One, captioned THE MOULD IS REPAIRED: a woman in a slate-blue apron kneels at a wooden casting mould, repairing a chip in its inner edge, while a shelf of eight already-made pale jugs behind her each still carry that same chip on the rim, and a glowing amber laptop beside her shows small agents working under a gold-capped chief. Two, captioned THE SHELF IS UNCHANGED: a flawless ninth jug stands on the bench beside the repaired mould while she looks past it to the eight older jugs on the shelf, still chipped and untouched. Three, captioned TEST EVERY ONE: she stands at the shelf holding a brass gauge against a jug's rim, three already-tested jugs carrying small pale tags, while inside the laptop the agents hold a matching gauge and test alongside her.](/img/comics/fixing-the-generator-does-not-fix-the-fleet.webp)

---

## The half-finished reflex

[The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing) is the right instinct and it stops one step early. Patching the template means the next thing minted from it is correct. Every instance already running keeps the defect, and those are the ones with users.

The gap is easy to miss because fixing the generator feels like the senior move. It is the senior move for a defect discovered before the fleet exists. Once there are instances in production, "fixed at the source" and "fixed" are different claims, and only one of them is about what people are currently looking at.

## A fix is a detector plus a remedy

The instinct when sweeping is to write the edit once and apply it everywhere. That produces the worst available outcome: a sweep that reports success on every instance, including the ones it silently did nothing to.

An edit no-ops when the source drifted, when the anchor text differs by a character, and when the instance never had the defect at all. All three are indistinguishable from success, because the tool exits zero and the file is on disk.

So a fix worth propagating ships as a pair. A **detector** answers "does this instance have it?" and can run against an untouched instance. A **remedy** is what changes when the detector fires. The detector is what turns a sweep from an assertion into a report.

**Prefer a detector that reads built output or the live deployment over one that greps source.** A source grep encodes one spelling of the defect. An output check encodes the defect. Grepping for a particular line finds one authoring style; counting the metadata tags in the built HTML finds the problem however it was written.

**And prove the detector can fail.** Run it against the instance already known to be broken. If it comes back clean there, it is not a detector, and a clean sweep with it means nothing. A detector that cannot fail is the same species of decoration as a permissions test that cannot fail.

## A real one, and what the detector was worth

Fifteen documentation sites from one template. A swizzled theme component was added by hand to four of them long after the fork, and on three of those four it opened with an early return of `null` before mount. That component wraps the entire application including the document head, so static generation emitted every page with an empty title and not one Open Graph tag. Those two sites had never produced a working link preview, on any page, since the component was written.

Nothing reported it. The HTML was valid, every asset returned 200, and the build was green. The defect was visible only to a scraper, and scrapers do not file tickets.

The obvious sweep is "apply the gate fix to all fifteen". Eleven of the fifteen have no such component at all, and a twelfth has it without the defect. That sweep edits nothing on eleven repos and reports fifteen successes, and the split is exactly the information worth having, since it says the template was never the source and the defect was introduced by hand, three times, at three different moments.

The audit that produced these numbers also caught the sweep that produced them. A first pass enumerated the sites it happened to have surveyed rather than the full set from the registry, reported the fleet as done, and missed a site that still carries the defect today. That is the failure this skill's own rule about enumerating from a registry exists to prevent, committed by the person who wrote the rule.

## Fixing one thing exposes what it was hiding

On the second site, the fix turned the build red. Three links on one page had been broken for months, and the same early return was the reason nobody knew: with the component rendering nothing, the framework's broken-link checker had nothing to check. The moment the head rendered, the checker could see the page and did its job.

That is the fix working. Budget for it. A sweep whose schedule assumes each instance is a two-minute edit will treat the first red build as a failure of the sweep rather than as the sweep finding a second defect, and the tempting move at that point is to revert the fix that surfaced it.

## The report is a matrix

Four outcomes per instance, and collapsing them loses the only interesting one.

**Had it, fixed, verified** is the happy path. **Already clean** means the detector ran and did not fire, and saying so out loud is the whole difference from a remedy-only sweep. **Had it, could not apply** means the defect is present and the remedy did not fit, because the source drifted or the instance is deliberately different. That row is the most valuable line in the table and it must never be rounded up to done. **Skipped**, with the reason.

One more rule worth holding: if the detector fires on every instance, stop and change the story. A defect in eleven of eleven usually means the template produced it, which turns a fleet sweep into a generator investigation, and those have a different shape.

## Further Reading

- [The Generator Is the Only Thing Worth Fixing](/perspectives/the-generator-is-the-only-thing-worth-fixing)
- [Improvement Compounds When the Loops Nest](/perspectives/improvement-compounds-when-the-loops-nest)
- [Skill Files](/concepts/skill-files)
- [Skills](/skills) (the `lift-all-boats` skill implements this)
