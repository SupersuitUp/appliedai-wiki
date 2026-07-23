---
title: "Fix the Generator, Not the Output"
slug: /perspectives/fix-the-generator-not-the-output
description: "When a system you own produces the wrong result, the fix belongs in the system, not the artifact. The intended outcome is the authority, so a rule that blocks it is a bug in the generator, not a constraint to route around."
image: "/img/comics/fix-the-generator-not-the-output.png"
---

# Fix the Generator, Not the Output

*When a system you own produces the wrong result, the fix belongs in the system, not the artifact. The intended outcome is the authority, so a rule that blocks it is a bug in the generator, not a constraint to route around.*

![Comic hero: a maker at a workbench pulls a slightly-wrong object off a machine. In the first panel they reach for a file to sand the object by hand. In the second they stop, turn to the machine, and adjust a dial on it instead. The third panel shows a row of correct objects coming off the machine, and the maker walking away.](/img/comics/fix-the-generator-not-the-output.png)

---

There is a moment, when you build the system that makes the thing, that decides whether the system ever gets good. The generator produces something wrong. You can fix the artifact in front of you, or you can fix the generator that produced it. Both give you a correct artifact today. Only one gives you a better generator tomorrow.

The claim here is narrow and strong: **for any process you intend to run more than once, the fix belongs in the generator.** Correcting the output is [hand-rolling](/concepts/hand-rolling), and it teaches the system nothing. The correction has to reach the place that will produce the next one, or you will make the same correction on the next one, and every one after that.

## Your own rule is not physics

The hardest version of this is when the thing blocking the good result is a rule you yourself put in the system.

You build an illustrated-book generator with a rule that forbids text in the art, because the interior pages should carry no lettering. Then you go to make the cover, and every book cover ever printed carries its title, and your own rule refuses to let the one page that must have text have it. The reflex is to route around the rule: bake the title on afterward by hand, or fight the model to sneak the text past the negative.

That reflex is backwards. **You wrote the rule. A rule you wrote is not a law of nature; it is a line of your own system that turned out to be wrong in a case you had not considered.** The rule was right for interior pages and wrong for the cover. The fix is to make the rule know the difference, so the cover is permitted text and the interiors are still forbidden it. Then the generator produces a correct cover on its own, forever, and you never fight it again.

Working around your own rule leaves the rule wrong for the next person who hits the same case, including future you. Fixing the rule is the only version that compounds.

## The outcome is the authority, not the framework

This inverts the usual relationship between a framework and its results. It is tempting to treat the framework as fixed and the results as what you negotiate. The opposite is true: the **intended outcome is fixed**, and the framework is what serves it. A framework is a means to good outputs and nothing else, so a framework that blocks a good output has failed at its only job.

So when the two disagree, the outcome wins and the framework changes. Not the artifact bent to fit the framework's limitation, but the framework corrected to produce the artifact the outcome demanded. Especially when you built the framework: there is no external authority to appeal to, no vendor whose constraint you are stuck with. The constraint is yours, which means the fix is yours, which means there is no excuse to route around it.

## Where this does not apply

The principle is about systems you **own** and processes you intend to **repeat**. It does not license editing a shared standard mid-flight to make one artifact easier, and it does not apply to a genuine one-off you will never make again. A constraint imposed by someone else's platform is a real constraint, not a rule you can rewrite. The rule here is specifically: when the thing in your way is your own, and the work will recur, fix the thing rather than dodge it.

It also is not permission to keep polishing the generator past the point of return. The system exists to serve outcomes, so over-investing in it for its own sake is the opposite failure, [masturbatory programming](/concepts/masturbatory-programming). The test in both directions is the same: does this serve the outcome. Fix the generator when the generator is what blocks the outcome. Stop when the generator already delivers it.

## Why it is worth the friction

Fixing the generator is slower every single time, in the moment. That is the whole reason it is rare, and the whole reason it wins. The cost is front-loaded and the payoff compounds: a generator that learns is worth more after twenty runs than a stack of twenty hand-corrected artifacts, because the twenty-first run is free and correct instead of needing the same rescue as the first.

You are not only making the thing. You are making the thing that makes the thing. Treat every wrong output as a chance to improve the maker, and the maker gets good. Treat every wrong output as a thing to fix by hand, and you will be fixing it by hand forever.

## Further Reading

- [Hand-Rolling](/concepts/hand-rolling): the failure mode this principle replaces, and its hidden cost of never exercising the real system.
- [Default to Determinism](/perspectives/default-to-determinism): once the generator is right, the deterministic path is cheaper and steadier than doing it live by hand.
- [Frameworks Are Proven by Variety, Not Volume](/perspectives/frameworks-are-proven-by-variety-not-volume): fixing the generator against each new kind of case is how a framework earns the claim that it generalizes.
- [A Startup Is an Outcome Generator](/perspectives/a-startup-is-an-outcome-generator): the same move at company scale. The product is the generator, so you improve the generator, not the individual deliverables.
- [Masturbatory Programming](/concepts/masturbatory-programming): the opposite error, and the shared test that tells them apart.
