---
title: "Own Your Libraries"
slug: /concepts/own-your-libraries
description: "Building your own software libraries used to be irrational, so everyone inherited someone else's. That calculation has flipped. A library you own carries your taste, improves every time you use it, and is waiting for you at the start of the next project."
image: "/img/comics/own-your-libraries.webp"
---

# Own Your Libraries

*Building your own libraries used to be the expensive choice. Now it is cheap, and a library you own is the only one that carries your taste, improves every time you use it, and is already there when you start the next thing.*

![Three panels, warm editorial ink-and-wash on cream. In every panel the camera is behind a woman's right shoulder, looking past her at a glowing amber laptop on a wooden desk, its screen facing her. One: inside the screen, the Chief of Agents in his gold cap and his sub-agents finish a small village, and one stone keep stands uphill with scaffolding still strapped around it; her hands rest on the desk and she is watching the keep. Caption, YOU BUILD THE KEEP ONCE. Two: the first village has receded and gone pale, the agents are pegging out the footprint of a second village on bare ground, and the same keep already stands finished on the hill above it with the scaffolding gone; she has leaned back, hands off the desk. Caption, THE NEXT VILLAGE INHERITS IT. Three: the keep's wall seen close, two strangers walking along the top of it, one pressing a single stone into a gap with a trowel while a sub-agent watches from below; she has her chin on her hand, doing nothing. Caption, STRANGERS FIND ITS HOLES. Title bar, OWN YOUR LIBRARIES. Footer, YOU PAY ON THE FIRST. YOU COLLECT ON THE SECOND.](/img/comics/own-your-libraries.webp)

---

In 2022 the answer was obvious, and it was correct. You needed date handling, so you installed a date library. You needed a carousel, a state manager, a CSS reset, a test runner. Writing your own was a beginner's mistake with a name: reinventing the wheel. The economics were brutal and clear. Someone else had already spent a hundred hours on the problem, they maintained it for free, thousands of people had found the bugs, and your version would be worse in every dimension except that it was yours, which was worth nothing.

Two things changed. Writing a library got dramatically cheaper, because the hundred hours became an afternoon. And finding out whether one already exists got cheaper too, because a competent agent can survey the field in minutes rather than leaving you to guess from package download counts.

Both halves matter, and most people have only absorbed the first. The cheap-to-build half, taken alone, produces a workspace full of half-finished reimplementations of solved problems. The interesting position is the one where both are true at once: you can build your own layer, and you can also check first, quickly, whether you should.

## What you are actually owning

The thing worth owning was never the algorithm. Date arithmetic is date arithmetic and nobody's version reflects their taste.

What reflects your taste is everything above it: how a thing should look, what it should refuse, how it behaves when it fails, what a finished artifact of yours is supposed to feel like in someone's hands. That layer has no package on any registry, because it is specific to you. Every time you build a project without owning it, you rebuild it by hand, slightly differently, and it never gets better.

A worked example. A playable slide deck, meant to be read on a phone, needs a pile of unglamorous mechanism: measure a slide unscaled and transform-scale it so nothing ever has to be scrolled, re-measure when an image finally loads and reports a real height, use `100dvh` rather than `100vh` because on iOS the address bar makes `vh` taller than the visible viewport and puts your footer under the chrome, accept a swipe only when the drag is horizontal so a vertical drag can still scroll, and rewrite history with `replaceState` so the back button leaves the deck instead of walking the reader back through twelve slides.

Every one of those is a fact about how a deck should behave, learned by watching one fail. None of them is in a library, because a deck is not a standard component. And all of them are the sort of thing that gets re-derived from scratch, at half quality, on the second deck, by a person who has forgotten which of the four things they fixed last time actually mattered.

## The village and the castle

Think of an app as a village. You build it, it works, people live in it.

Building the village taught you things, and if you did nothing deliberate, those things stay in the village. The next village starts on bare ground.

The alternative is that some of what you built comes out as a structure of its own: a castle, standing separately, that the village happens to sit beside. Then the second village starts with a castle already on the hill. You did not build it for that village and you get it anyway.

This is the whole argument, and the reason it is worth stating as a metaphor is that the payoff arrives at a moment when you are not thinking about it. The cost of extraction is paid on project one, consciously, by someone who could have just shipped. The benefit is collected on project two by someone who has forgotten they paid.

Keep going and it compounds in a way that is hard to feel: village three inherits a castle that has been through two rounds of contact with reality, and the walls are in the places walls turned out to be needed.

## Modularity stops being a virtue and becomes the mechanism

"Keep it modular" is the sort of advice that sounds like hygiene. In this frame it is the load-bearing practice, because a thing that cannot be lifted out of the village is not a castle. It is a wall of a house.

What makes the difference is unglamorous and mostly about boundaries:

- **It takes its subject as input and hardcodes nothing about any one caller.** The moment a module knows the name of the project it was born in, it has stopped being reusable and become a copy waiting to diverge.
- **It refuses rather than guesses.** A library that silently does something reasonable when handed something wrong is a library whose failures surface three projects later, in someone else's village, as a mystery.
- **It carries its reasoning.** The comment explaining *why* `100dvh` is a strange choice is the only thing standing between that line and a future maintainer tidying it back to `vh`. Working code cannot explain the failure it was written to prevent, so the explanation has to be written down beside it.
- **Its tests ship in the same commit as its behaviour.** A library is a promise made to a future caller who will not read the source. The tests are the promise.

## Extract on the second instance, not the first

The failure mode on the other side of this is real: a workspace of premature abstractions, each one a generalization of exactly one case, each one now a dependency that has to be maintained.

The rule that holds both sides is to abstract on the **second** instance. One occurrence gets the direct fix, written plainly, in the village. When the second caller appears, extract.

The tell for premature abstraction is that you cannot name the second caller. If you are designing for callers you are imagining, you are building a wall for a village that does not exist.

The tell for a real extraction is that the second caller is standing right there. One recent case: a tracing routine written to turn a raster wordmark into vector was left exactly where it was, in the generator that needed it, for as long as it had one consumer. A second mark then needed the same treatment, and at that point the routine came out into a shared module. The extraction was verified by rendering the original mark again and checking the output was byte-identical, which is the cheapest possible proof that a refactor moved code without changing it.

## Other people inherit the castle, and that is when you find the holes

The part that is easy to miss: a library you hand to someone else comes back better.

Not because they are more careful than you. Because they are in a different village, and their village asks questions yours never did. Every one of those questions is a hole in a wall you believed was solid, and you cannot find those holes by inspecting your own work, because your own work is exactly as complete as your imagination was.

This is measurable. The deck shell above was extracted after one deck and looked finished. It had a full test suite and a documented vocabulary of slide kinds. The second deck through it, put to a genuinely different purpose, produced four defects inside a day:

- Its deep links stripped every non-digit out of the URL fragment, so a link naming a slide by id silently opened slide one. Worse, an id that happened to contain a digit was **mis-resolved**: `#why-2` opened slide two, a different slide, with nothing reporting a problem.
- A generated index file asserted that every image it listed carried a provenance record. Checked against real data, two of thirteen did not. The file was sending a reader to look for something that was not there.
- Text fields supported bold and italic and no links, so the one slide whose entire job was to point at an external standard rendered the link as literal brackets. The stylesheet had styled `a` all along, which is the tell that links were expected and never wired.
- One nested structure was never validated at all, so a typo inside it was the single silent hole left in a validator built specifically to refuse typos.

None of those were visible from inside the first village. All four are now closed, with tests, for every future caller. That is the trade this whole practice is built on: the second use is not a tax on the library, it is the only real audit it gets.

The same thing happens with strangers, at a larger scale, which is the actual argument for putting your library somewhere public. You are not being generous. You are recruiting people to walk the walls.

## Build or fork: the question to ask first

Given all of the above, the honest question is not whether to own a library. It is which ones.

There is a meta-practice here that deserves to be run deliberately rather than skipped, and it is now cheap enough that skipping it is indefensible. **Before building, survey.** Have an agent search for what already exists, read the top few candidates properly rather than by star count, and report back on fit, maintenance, licence and how far the thing is from what you actually need.

Then route on what the survey says:

- **Something fits.** Use it. This is still most cases, and it is still the right answer. The economics did not flip for solved, standard, taste-free problems.
- **Something is close and stuck.** Fork it. A fork gives you the hundred hours and the bug reports and hands you the steering wheel. This is the most undervalued option on the list, because forking used to mean adopting a maintenance burden you could not carry, and that is the exact burden that got cheap.
- **Several things half-fit and none of them cleanly.** This is the signal that the thing you need is your taste layer, and nobody has published your taste. Build it.
- **It exists in your own workspace already.** This is the most common answer and the one nobody checks for. Hand-rolling something is not evidence that your system lacks it. Just as often it is evidence that your system has it and you did not find it. Those two diagnoses want opposite fixes: a real gap wants a build, and a discovery failure wants a pointer placed where the work actually happens. Shipping a second implementation is worse than the hand-roll, because two implementations drift and neither is canon.

The last one is worth dwelling on. A catalogue read at the start of a session loses to an instruction read at the point of use, every time. If a capability exists and keeps getting rebuilt, the defect is not in the library. It is in where the library is mentioned.

## What not to own

Own the layer that carries your judgment. Rent everything else.

Concretely, the things worth owning are the ones where the correct answer is a matter of taste (how your artifacts look and behave), where the standard is yours (what you refuse to ship), or where the domain is yours (the rules of your own material). The things not worth owning are the ones with a right answer that someone else has already found: cryptography, date arithmetic, parsing anything with a specification, anything where being slightly wrong is a security problem.

The test is simple. If your version would be worse than the incumbent and identical in behaviour, rent it. If your version would be *different* in ways you can name, and the difference is the point, own it.

---

## Further Reading

- [Hand-Rolling](/concepts/hand-rolling): The failure this practice prevents. Every hand-roll fixes one artifact and teaches the generator nothing.
- [Fat Skills](/concepts/fat-skills): Where the intelligence lives once you have decided to own a layer.
- [Golden Processes](/concepts/golden-processes): The status a procedure earns once it reliably turns a little human input into an excellent result.
- [Self-Improving Skills](/concepts/self-improving-skills): How an owned library gets better on every run rather than only when someone remembers to improve it.
- [Compounding Docs](/concepts/compounding-docs): The same flywheel, applied to writing rather than to code.
- [The Layer Above the Harness](https://compounding.wiki/concepts/the-layer-above-the-harness): Why the layer you own is the part that survives the tools underneath it changing.
- [Agentic Brand Universe](/concepts/agentic-brand-universe): A worked example of an owned library for a domain that has no packages on any registry.
- [The Cathedral and the Bazaar (Eric S. Raymond, 1997)](http://www.catb.org/~esr/writings/cathedral-bazaar/): The essay this argument is often confused with. Raymond contrasts closed development with open; the claim here is narrower and about ownership rather than process, and a library you own is meant to end up in the bazaar precisely so that other people find its holes.
