---
title: "Masturbatory Programming"
slug: /concepts/masturbatory-programming
description: "Building technical systems as self-expression instead of service, so the builder's identity attaches to the architecture rather than to anyone it was supposed to serve. The tell is a detailed system and zero users."
image: "/img/comics/masturbatory-programming.png"
---

# Masturbatory Programming

*Building technical systems as an act of self-expression instead of service, so the builder's identity attaches to the architecture rather than to anyone it was supposed to serve. The tell is simple: they can describe the system in exhaustive detail and cannot name one person whose day it changed.*

![Four-panel action-comic strip in a single horizontal row on warm cream paper, heavy black inks, palette of matte navy, vivid orange seam accents, arc-reactor cyan, gold and crimson. Chunky inked title bar at top in bold caps reads "MASTURBATORY PROGRAMMING". PANEL 1, labeled "1. THE PROUD REVEAL": Midas the hyperagent in bulky matte-navy plate armor with orange seams and cyan inner-wrist glow stands in a warm workshop, both gauntleted arms spread wide in pride beside a towering brass-and-navy machine of interlocking gears and pipes stamped "THE SYSTEM", a plaque on its base reading "18 MONTHS"; paper-tape caption: "Midas builds something genuinely impressive. The engineering is real." PANEL 2, labeled "2. THE ONE QUESTION": an older Black woman in a plain work apron and no armor stands with arms folded, her speech bubble reading "HOW MANY PEOPLE USE IT?", while Midas deflates with a gauntlet at the back of his helmet and answers "NONE YET. DEPLOYING SOON."; a brass mechanical counter bolted to the machine reads 0 above an inked plate reading USERS; paper-tape caption: "The question separates a system from an outcome." PANEL 3, labeled "3. THE CLOSED LOOP": Midas alone in the dim workshop with the door shut and bolted, walking a circular track of heavy crimson arrows that loops back on itself around THE SYSTEM, signposts along the loop reading BUILD, ADMIRE, BUILD AGAIN; paper-tape caption: "The loop closes. Every input to the next version comes from him." PANEL 4, labeled "4. THE OPEN LOOP": bright and warm with the workshop door open to daylight, Midas hands a small crude lopsided unit stamped "ROUGH BUT LIVE" to the same older woman, who takes it with relief; a glowing cyan feedback card stamped "WHAT'S WRONG" flows from her hands back to him, and on a shelf behind him a cartridge stamped "GOLDEN" is being slotted in; gold corner stamp reads "MISSION INTACT"; paper-tape caption: "Midas ships the rough slice to one real person. Her correction comes back and the process gets blessed." Chunky inked footer bar at bottom in bold caps reads "COUNT THE PEOPLE, NOT THE COMMITS."](/img/comics/masturbatory-programming.png)

---

## The tell is one question

A CTO walks you through something he made. Months of work, nights and weekends, genuinely clever. He is proud, and he should be, because the engineering is real.

Then you ask: how many customers are using it?

"None yet. I'm going to deploy it soon."

That answer is the whole diagnosis, and *soon* is carrying more weight than the rest of the sentence. Soon has been soon for a while. The question was not hostile and it was not clever. It is the only question that separates a system from an outcome, and it should be the first one asked, by the builder, of himself.

Everything upstream of that answer can be excellent. Clean abstractions, a real architecture, tests that pass. None of it is contradicted by the answer. It is orthogonal to it. The system exists. The utility does not.

## Shipping stopped being evidence

Volume of code used to be a costly signal. It took a long time to produce, so producing a lot of it meant something about you. That pricing is gone. Everyone ships thousands of lines a day now, and next year it will be more. When production is nearly free, the artifact proves nothing on its own. See [The Cheaper Code Gets, the Simpler You Should Build](/perspectives/the-cheaper-code-gets-the-simpler-you-should-build) for what that does to system design, and [Acceleration Is Not Completion](/perspectives/acceleration-is-not-completion) for what it does to timelines.

What stayed scarce is a specific person, with a specific want, whose reality is measurably better because the thing exists. That is the unit that got harder to fake, which is exactly why it is the one worth attaching an identity to. [Move a Load-Bearing Measurable](/perspectives/move-a-load-bearing-measurable) is the same demand pointed at a number the business already agreed matters.

## It is a dial, not a verdict

Almost nobody is purely in this mode, and calling someone a masturbatory programmer as a label is both rude and imprecise. Treat it as a position on a dial that everyone technical sits somewhere on, and that moves week to week.

Plenty of building has no user and is still correct. Building one harness to learn what a harness is, as [Your Edge Is Not Your Infrastructure](/perspectives/your-edge-is-not-your-infrastructure) argues, buys judgment you cannot rent. Exploration, play, and craft practice are all legitimate and should be defended. The dial only becomes a problem when the identity load moves onto the system itself.

That is the actual mechanism, and it explains the delay. Once the system is who you are, deploying it introduces the possibility that nobody wants it, and that possibility now reads as a verdict on you. An unshipped system stays perfect. A shipped one gets judged. So the deploy keeps slipping, always for a defensible technical reason, and the builder experiences the delay as rigor. [Idolizing the Build](/perspectives/idolizing-the-build) covers the sibling failure, where the pleasure sits in the act of building. This one sits in the ownership of what was built.

## The loop on the other side

The healthy version is a loop that runs through somebody else.

You find one real person who wants an outcome badly enough to describe it unprompted. You ship the smallest ugly thing that delivers it. They use it, and they tell you what is wrong, which is information you could not have generated alone. You fix it and the fix holds. The procedure that worked gets blessed and checked in as a [golden process](/concepts/golden-processes), so the next person gets the outcome faster and at higher quality than the first one did. Then you go find the next person.

The difference between the two modes is topological. The masturbatory loop is closed: build, admire, build again, with every input to the next iteration coming from you. The virtuous loop is open, because it passes through a person who does not care about your architecture and will tell you the truth about the outcome. Only the open loop has a source of correction outside your own taste, and only the open loop compounds, because each turn leaves behind a reusable process and a person who will vouch for you. That accumulation is the whole substance of [The Outcome Economy](/concepts/the-outcome-economy).

## Getting off the dial

- **Name the person.** Not a segment, not a persona. A first name, someone you could message today.
- **Ask what they do instead right now.** If the current workaround is tolerable, there is no want, and no amount of system quality creates one.
- **Ship the embarrassing slice this week.** The version that handles one case badly and is in someone's hands beats the complete one that is still yours.
- **Count users, not commits.** Pick the number before you build, so the scoreboard is not something you get to redesign later.
- **Keep the pride, move its object.** The skill that built the system is real and worth being proud of. Point it at a person and the pride survives contact with reality.

> **Nobody owes your architecture their attention. The system is not the accomplishment. A person who wanted the outcome, got it from you, and would be worse off if you stopped is the accomplishment.**

## Further Reading

- [Idolizing the Build](/perspectives/idolizing-the-build) for the sibling failure, where the pleasure is in the act of building rather than in owning what was built.
- [Move a Load-Bearing Measurable](/perspectives/move-a-load-bearing-measurable) for the number that settles the argument about whether the work was real.
- [The Outcome Economy](/concepts/the-outcome-economy) for what actually changes hands once the system is pointed at somebody.
- [Golden Processes](/concepts/golden-processes) for how a delivered outcome becomes repeatable instead of re-improvised.
- [Slop Factory](/perspectives/slop-factory) for what the closed loop produces once it is automated and nobody is checking the output.
- [The Early Demand Trap](/perspectives/the-early-demand-trap) for the opposite failure, and why the fix is a few deep users rather than a flood.
