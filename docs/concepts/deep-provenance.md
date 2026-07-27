---
title: "Deep Provenance"
slug: /concepts/deep-provenance
description: "Recording what produced every artifact, in enough detail that you can tell which input to change. Without it you re-roll and hope. With it you steer, and you also learn which finished work a changed input made suspect."
image: "/img/comics/deep-provenance.png"
---

# Deep Provenance

*Recording what produced every artifact, in enough detail that you can tell which input to change. The output is close but not right, and you are sure it can get there. Provenance is what lets you steer toward it instead of re-rolling and hoping.*

![Three warm editorial panels on cream under a title bar reading DEEP PROVENANCE, the same cook in the same modest kitchen in all three, a single wide pot on a wooden counter and shelves of preserve jars behind. Panel one, captioned NOT QUITE RIGHT: she tastes from a wooden spoon with her brow furrowed, and nothing anywhere is written down. Panel two, captioned EVERY INPUT RECORDED: she writes on a small card laid beside the pot, recording what went in. The pot is unchanged; only the record is new. Panel three, captioned NOW YOU KNOW WHICH TO CHANGE: she reads the card in one hand and reaches up with the other to exactly one jar on the shelf, which glows warm while every other jar stays plain, and the pot itself now glows. A footer bar reads GUESSING IS NOT ITERATING.](/img/comics/deep-provenance.png)

---

## The case that actually bites: you cannot steer

You generate something and it is close. Eighty percent there. You are confident it can get the rest of the way with the right input added or the wrong one removed.

Which input?

Without a record, you cannot say. So you change something, re-run, and read the result to see whether it got better. That is not iteration. It is a slot machine with a long lever, and it is how most people spend most of their time with a capable model.

With a record, the question is answerable. This section came from that source. This passage leans on that concept. This framing exists because a parameter said the audience was one kind of reader rather than another. Change the input actually responsible and the output moves the way you meant.

**The difference is between editing and re-rolling.** Editing requires knowing what produced what. Re-rolling is what you do when you do not, and it feels like progress because something changes every time.

## The second case: knowing what went stale

Read the same mechanism backwards and you get the other reason people want this. An input changes, and you need to know which finished work now rests on something you no longer believe.

This is real, and it is the reason most people eventually reach for provenance. It is second because it only bites once you have a body of work old enough to have drifted, while the steering problem bites on your first afternoon.

## The mistake is thinking this is new

Content-addressed build systems have tracked inputs to outputs since the 2000s. Lockfiles pin dependency graphs. Hermetic builds guarantee that the same inputs produce the same artifact. Data warehouses ship column-level lineage. Engineers have had deep provenance the entire time, and they use it constantly without calling it anything special. It is why a build knows which twelve files to recompile out of nine thousand.

What never had it: prose, strategy, arguments, brand decisions, illustrations, business models, and every other artifact produced by judgment rather than by a compiler.

The usual explanation is that tracking those was too expensive. That explanation is wrong, and getting it right is what makes the idea useful.
## Why the rest of us never got it: invalidation without cheap recompute is only anxiety

Nothing stopped anyone from hashing the six sources behind a strategy memo. The tooling was trivial.

The problem came one step later. The system would report that fifty paragraphs now rested on a changed assumption, and a human would have to read all fifty, decide which were actually affected, and rewrite them. The signal was real, expensive to produce, and useless to act on. So the rational move was to skip the tracking, and everyone did.

**A staleness signal is worth roughly what it costs to act on it.** For code, acting was cheap, so the tracking paid. For everything made of judgment, acting cost human attention, which is the one input that never got cheaper.

That is the asymmetry that collapsed. The tracking did not get cheaper. **Acting on the signal did.** Which retroactively made the tracking worth doing across every artifact class that was excluded from it before.

## What a recipe actually records

A provenance recipe travels beside its artifact and names what produced it:

- **Inputs by path**, not by description. A source that cannot be resolved is not a citation.
- **Parameters by hash.** The spec, brief, or configuration that shaped this particular artifact, fingerprinted so a change is detectable rather than remembered.
- **Concepts by hash of their invariants, never their prose.** This distinction decides whether the system gets used. Hash the full text of a definition and a typo fix flags fifty artifacts, the alerts become noise, and everyone learns to ignore them within a week.
- **The model and the exact prompt**, where generation was involved.
- **The mode**: generated, hand-authored, or generated-then-edited.

That last field is what makes the discipline survive contact with work people care about. **Provenance records the inputs, not the manufacturing method.** Staleness detection works identically whether a section was generated, written by hand, or generated and then heavily rewritten, because it compares inputs rather than text. An author keeps the pen. Regeneration becomes available and targeted instead of mandatory.

The payoff that nothing else provides: change one parameter, re-project, and get a legitimately different artifact from the same body of work. A second edition for a different audience is a parameter change rather than a rewrite. This only works if the corpus was separated from the projection at the start, which is why it cannot be retrofitted later.

## Without it, you cannot tell improvement from drift

This is the strongest argument and the one most often skipped.

Any claim that a system is getting better is anecdote unless you can say *this output changed because that input changed*. Otherwise there is no baseline, only a sequence of outputs that feel different. Teams in this position argue about whether last month's version was better, and nobody can settle it, because the evidence needed to settle it was never recorded.

Deep provenance is the precondition for actual iteration rather than the sensation of it. It is what separates a system that compounds from one that merely churns, and the difference is invisible from the inside without it.

## A recipe is a claim, and claims can be false

Hashing an input is trivial for an agent. Deciding what the inputs *were* is not.

An agent can record three concepts it never consulted, omit the source that actually drove the paragraph, or write a plausible recipe entirely after the fact. The record then looks rigorous and is fiction. This is the same failure shape as any human-approval marker an agent can produce on its own: the artifact carries the appearance of an audit trail without the audit.

The answer is the same one that works everywhere else in this craft. Prefer facts a check can falsify. A path either resolves or does not. A hash either matches or does not. Anything that depends on an agent honestly reporting its own reasoning is a weaker claim, and should be labeled as one rather than trusted because it is written down.

## Further Reading

- [The Corpus and the Projection](/concepts/the-corpus-and-the-projection) separates durable inputs from the cheap spec that renders them. Deep provenance is how you know which knob to turn.
- [Golden Processes](/concepts/golden-processes) covers promoting a proven process into a repeatable one, which is where recipes start paying rent.
- [Fix the Generator, Not the Output](/perspectives/fix-the-generator-not-the-output) is the discipline provenance enables: you cannot fix the generator if you cannot tell which outputs it produced.
- [Ontology-Driven Development](/disciplines/ontology-driven-development) builds on a canonical model of the domain. Provenance is an ontology of derivation, with its own entities and one relation that matters.
- [Version Control Your Prompts](/disciplines/version-control-your-prompts) is the narrow case of this idea, applied to the one input most teams change most often.
