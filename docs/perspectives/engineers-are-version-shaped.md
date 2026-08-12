---
title: "Engineers Are Version-Shaped"
slug: /perspectives/engineers-are-version-shaped
description: "An engineer's real specialty is usually a version number. Taking a product from nothing to a launched first version is a different job from keeping version five alive, and staffing by job title mis-staffs both."
image: "/img/comics/engineers-are-version-shaped.png"
---

# Engineers Are Version-Shaped

*An engineer's real specialty is usually a version number. Taking a product from nothing to a launched first version is a different job from keeping version five alive, and the same title covers both.*

![Three-panel warm editorial ink-and-wash strip on a warm cream ground, one workshop with a long wooden bench, a plant-filled window and a hanging lamp in every panel, and the same glowing amber laptop throughout. Title bar above the panels reads ENGINEERS ARE VERSION-SHAPED. One: a wiry South Asian engineer in his late twenties, wire glasses and an olive work shirt with the sleeves rolled, leans into the laptop alone with quick energy, crumpled discarded paper scattered across the bench; inside the screen a small stepped amber structure is being assembled fast and roughly. Caption: Version one is a sprint into fog. Two: inside the same screen that structure has grown into a large scaffolded building, cool and pale and tied down with cables; the young engineer stands back with his hands open at his sides, out of his depth, while a broad-shouldered grey-bearded man in his fifties in a heather-grey cardigan has just stepped into frame, unhurried, looking at the building. Caption: Version five is a different job. Three: the two men stand facing each other at the bench, a small blank card passing cleanly between them with both pairs of hands on it at once, the scaffolded building steady and evenly lit in the screen behind them. Caption: Plan the handoff. Do not discover it. Footer bar below the panels reads STAFF THE VERSION, NOT THE TITLE.](/img/comics/engineers-are-version-shaped.png)

---

## The claim

"Good engineer" describes a field. The useful description names a position inside it, and for most engineers the position is a version number.

One engineer is excellent at the stretch where nothing exists yet: the idea becomes a running thing, the running thing gets in front of users, the product launches. Another is excellent at the stretch where the thing already exists and is load-bearing: version five, under real traffic, with an audit, a migration, and an on-call rotation attached. Both people answer to "engineer." They are doing different work with different failure modes, and an engagement staffed on the title rather than the version gets the wrong one about half the time.

The version an engineer is for is not a ranking. It is a shape.

## What actually changes between version one and version five

At version one the binding constraint is figuring out what the thing is. The work is embodiment under uncertainty: pick a direction before the evidence is in, cut scope to whatever proves the direction, hold the entire system in one head, throw away half of it on Thursday. Whatever gets to a launched artifact fastest is correct.

At version five the binding constraint is not breaking what is already carrying weight. The work is stewardship under accumulated commitment: migrations that cannot lose a row, a security posture that survives review, dependencies with their own release calendars, and decisions made two years ago by people who have left. Nothing gets thrown away on Thursday, because someone is depending on it.

Every instinct that wins version one is a liability at version five. Moving before certainty is how a production system gets a data-loss bug. Holding the whole system in one head stops being possible and starts being a bus factor. The reverse is also true: an engineer wired for version five will spend the first month of a zero-to-one build putting in the test harness, the abstraction layer, and the deployment pipeline for a product that has not yet earned any of them, which is exactly what [Acceleration Is Not Completion](/perspectives/acceleration-is-not-completion) and [The Cheaper Code Gets, the Simpler You Should Build](/perspectives/the-cheaper-code-gets-the-simpler-you-should-build) are each warning about from opposite ends.

Agents sharpened this split rather than dissolving it. The zero-to-one stretch is now dramatically cheaper, so more of the calendar sits on the far side of launch, where [the regression tax is charged at the rate you change things](/perspectives/dont-move-at-agentic-speed-without-extreme-test-coverage). The version-one specialist got faster. The version-five job got larger.

## Staffing by title mis-staffs the project

The practical damage shows up twice.

A team that needs a first version hires on a resume full of scale, and six months later has a service mesh, a design system, and no product. A team that needs to harden a working product hires the person who built three prototypes in a year, and gets a rewrite proposal instead of a hardening plan.

Both hires were competent. Both were pointed at the wrong stretch of the product's life. The fix is to name the version in the requirement rather than the seniority: this engagement runs from nothing to a launched first version, or this engagement takes a live system through its next two years.

For an implementer selling into these engagements, the version is also the honest scope line. "I take a product from nothing to launched, then hand off to a staffed engineer" is a smaller sentence than "I do engineering" and a far more sellable one, because the buyer can tell whether it is what they need. It also protects the buyer from the more expensive failure, which is a zero-to-one specialist quietly staying on through version three.

## The tell is where the interest dies

Ability is the easier reading and the less useful one. Most competent engineers could learn the other version's craft. The question that predicts a decade is appetite: which stretch does the person want to spend the decade inside.

The signal is where the work stops being interesting. For some it is the second version, when the novel problem becomes a maintained one. For others it is the fourth revision, or the first quarter with no new surface area. That boundary is worth naming out loud, because interest is what supplies the unglamorous hours that produce mastery, and where the interest is absent the mastery never arrives no matter how capable the person is.

An engineer saying "hardened production systems are not my interest" has given a usable spec. It is a routing instruction, and the project is better staffed for having heard it. [Your Edge Is Not Your Infrastructure](/perspectives/your-edge-is-not-your-infrastructure) makes the same move against the stack: name the part that is genuinely yours and rent or staff the rest.

## Write the handoff into the plan

A project whose engineers are version-shaped needs the handoff as a planned event with a date, an owner, and a deliverable, in the same way a hardening plan or a launch has those things.

Three things make that handoff survivable. The first is a documented system, because the version-one engineer holds most of it in their head and none of that transfers by default. The second is the test coverage the next stretch runs on, which is the entry fee for anyone changing a live system at agentic speed. The third is an explicit list of the decisions that were deliberately deferred, so the incoming owner can tell a shortcut from a mistake.

Agents absorb a growing share of the version-five work, and that changes who receives the handoff without changing whether one is needed. The receiving party may be a staffed engineer, a fleet of agents under a maintainer, or both. What stays constant is that somebody has to be handed a system they can hold, and the engineer who is honest about which version they are for is the one who plans for that instead of discovering it during an incident.

> Staff the version, not the title. An engineer who can name the stretch they are for is telling you where the handoff goes, and an engineer who cannot is going to hand it to you by surprise.

---

## Further Reading

- [High-Resolution Self-Knowledge](https://hyperagency.wiki/the-hyperagent/high-resolution-self-knowledge): the general form of this claim. The resolution of a self-model decides what can be handed off at all.
- [Your Edge Is Not Your Infrastructure](/perspectives/your-edge-is-not-your-infrastructure): the same discipline applied to the stack rather than to the version.
- [Some of Every Role Should Never Be Automated](/perspectives/some-of-every-role-should-never-be-automated): mapping which slices of a seat stay human, at the granularity this page argues for.
- [Acceleration Is Not Completion](/perspectives/acceleration-is-not-completion): why a fast version one is not a finished product.
- [Don't Move at Agentic Speed Without Extreme Test Coverage](/perspectives/dont-move-at-agentic-speed-without-extreme-test-coverage): the entry fee for the stretch after the handoff.
- [The Cheaper Code Gets, the Simpler You Should Build](/perspectives/the-cheaper-code-gets-the-simpler-you-should-build): the version-one discipline stated as a building rule.
- [Spikes](/concepts/spikes): the smallest version of the same instinct, where the throwaway artifact is the point.
