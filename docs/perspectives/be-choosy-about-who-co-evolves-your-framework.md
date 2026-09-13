---
title: "Be Choosy About Who Co-Evolves Your Framework"
slug: /perspectives/be-choosy-about-who-co-evolves-your-framework
description: "A framework you want others to adopt and co-evolve is shaped by whoever you let in. Every adopter's bug report is taken on faith and every pull request is taken on average, so the wrong adopters cost you bloat, and no software can be everything to everyone."
image: "/img/comics/be-choosy-about-who-co-evolves-your-framework.webp"
---

# Be Choosy About Who Co-Evolves Your Framework

*A framework that other people adopt and co-evolve is shaped by whoever you let adopt it. You are trusting that their bugs are real bugs and that their pull requests are, on average, good ones, so the choice of who is in is the choice of what the framework becomes. Serve the wrong people and you get bloat on their behalf; no piece of software can be everything to everyone.*

![Three panels, warm editorial ink-and-wash. One: a woman in her forties in a rust cardigan sits at a wooden desk, seen over her right shoulder, a glowing amber laptop facing her; inside the screen the Chief of Agents in a gold military cap holds a small clean wooden frame; six different people crowd in from the left, each holding out a blank card, a stack of blank cards piling at her elbow. Two: the same desk, the cards fed in; inside the screen the Chief is half-buried under a lopsided pile of mismatched parts bolted onto the frame while two small sub-agents strain to hold it up, and the woman leans back with a hand to her forehead. Three: she sits upright with one open palm raised gently; four of the six walk away carrying their cards, two remain beside the desk with one card each, and inside the screen the Chief holds the small clean frame again with two parts fitted neatly into it. Title bar: CHOOSE YOUR ADOPTERS. Captions: EVERY CARD TAKEN ON FAITH; THE FRAME GROWS HEAVY; TWO KEPT, THE SHAPE HELD. Footer: NOTHING IS FOR EVERYONE, SO DECIDE WHO IT IS FOR.](/img/comics/be-choosy-about-who-co-evolves-your-framework.webp)

---

## The claim

The visionary behind a framework usually thinks about adoption as a number. More people running it, more people filing against it, more people sending fixes. That is the growth instinct, and for a framework that is meant to be co-evolved it is exactly backwards.

Co-evolution means the framework changes in response to the people using it. Every bug report is a claim about reality that you will act on without reproducing most of them. Every pull request is a design decision you will merge on the strength of the sender's judgment, because you cannot re-derive each one. **Adopting someone into a co-evolving framework is extending them that trust in advance**, and trust extended to the wrong person does not fail loudly. It fails as a fix for a problem that only they had, a feature for a job the framework was never for, and a default changed to suit a workflow that was never the point.

Each of those is small. Together they are bloat, and bloat is not a cosmetic problem: it is the framework slowly becoming the average of everyone who touched it, which is to say becoming nothing in particular.

## What the wrong adopter costs

The cost is what merging their report does to everyone else, far more than the time spent on it.

**A real bug for them is a regression for the people you built it for**, whenever their use is off-axis. The report reads as diligence. The fix reads as responsiveness. The person it was built for opens the next version and finds a step that did not used to be there.

**A serious-looking pull request carries its author's model of the problem.** If that model is not yours, merging it imports a second opinion about what the framework is for, and the codebase now argues with itself. Review catches broken code far more reliably than it catches a coherent patch aimed at the wrong target.

**And every accommodation makes the next one harder to refuse.** Once the framework has bent for one off-axis user, "why not for me" has a precedent. The visionary who said yes to be kind ends up saying yes to be consistent.

## Nothing is for everyone, so decide who it is for

The alternative to being choosy is being nothing to anyone.

The reference case in this space is OpenClaw, an open personal-agent framework that accumulated capability for many kinds of user at once and became, for the people trying to build serious personal AI infrastructure on it, too bulky and too frustrating to build on. Whatever it set out to be, it was ultimately not that for them. The failure was that the features answered to no single picture of who the thing was for, so every one of them was somebody else's.

A framework with a picture of its user can say no. It refuses the report that is not a bug for that user, declines the patch that serves a job that user does not have, and stays small enough to be understood. That refusal is what makes it worth adopting for the people it is for, and it is invisible in the feature list, which is why growth-minded maintainers never budget for it.

## What choosy looks like in practice

Choosiness is an admission policy, and it is applied before the first report is filed.

- **Say who it is for, in a sentence, and put it where prospective adopters will read it first.** [Trust attaches to operators with a named framework](/perspectives/trust-attaches-to-operators-with-a-named-framework); the same opinion that earns trust is the one that repels the wrong adopter early, which is the cheap moment.
- **Onboard in person, or not at all, for as long as you can afford to.** The person who walks someone in learns within an hour whether their picture of the framework matches yours. A download learns nothing.
- **Grade adopters by the second report, not the first.** The first is enthusiasm. The second tells you whether they are reporting the framework's reality or their own preferences.
- **Prefer variety among the right kind of user over volume of any kind.** A framework is [proven by variety, not volume](/perspectives/frameworks-are-proven-by-variety-not-volume), and the variety that proves it is unlike jobs from people who share the picture, not unlike people.
- **Keep a golden standard and hold patches to it.** A [golden](/concepts/golden) example is a human-blessed reference; a pull request that moves the framework away from its goldens is a design change, and it gets a conversation rather than a merge.

## The uncomfortable corollary

The visionary is not choosing who is worthy. They are choosing what the framework will be a year from now, because the adopters will write half of it. Refusing someone is a statement that this framework is made in one image, and no verdict on them, and that a person who does not resonate with that image will be better served by a framework made in theirs, which should exist and probably will.

## Further Reading

- [Frameworks Are Proven by Variety, Not Volume](/perspectives/frameworks-are-proven-by-variety-not-volume): what kind of adoption tests a framework
- [Trust Attaches to Operators With a Named Framework](/perspectives/trust-attaches-to-operators-with-a-named-framework): the opinion that filters adopters is the same one that earns them
- [Simple Harnesses Keep Winning](/perspectives/simple-harnesses-keep-winning): the architecture that stays small enough to refuse
- [Golden](/concepts/golden): the human-blessed standard a patch is held to
- [Choosing A Supersuit OS Is Choosing Your People](https://supersuit.wiki/perspectives/choosing-a-supersuit-os-is-choosing-your-people): the same question from the adopter's side
