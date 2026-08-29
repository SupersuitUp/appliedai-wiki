---
title: "Don't Move at Agentic Speed Without Extreme Test Coverage"
slug: /perspectives/dont-move-at-agentic-speed-without-extreme-test-coverage
description: "The regression tax is charged at the rate you change things, and agents raised that rate by an order of magnitude. Writing tests used to be the expensive part, which is what made skipping them defensible. It is not expensive anymore, so the excuse is gone and the coverage bar should be extreme."
image: "/img/comics/dont-move-at-agentic-speed-without-extreme-test-coverage.webp"
---

# Don't Move at Agentic Speed Without Extreme Test Coverage

*Speed without a suite is not speed. It is borrowing, and the loan comes due as regressions at exactly the moment you are moving fastest. Tests were expensive to write, which is what made skipping them defensible; that stopped being true, so the bar moved.*

![Three panels on warm cream paper in soft amber ink-and-wash, one workshop and one woman throughout: a South Asian woman in her forties with a short dark bob, reading glasses pushed up on her head, an olive knit sweater, seated at a wooden workbench with a glowing translucent amber laptop open in front of her. Title bar above: EXTREME TEST COVERAGE. Panel one, captioned THE CHANGES MULTIPLY: inside the laptop screen a crowd of small rounded agent figures loads finished amber parts onto a fast belt, far more than one person could inspect, while she sits outside the screen with a hand raised in a relaxed waving-through gesture. Nothing crosses the belt. Panel two, captioned THE BREAK SHIPS UNSEEN: the belt has carried the parts out into the real world, where a plainly drawn customer seen from behind cups a finished amber part with a dark crack splitting it, while inside the screen the agents keep loading heads-down and she stays turned toward the laptop with her back to the crack. Nobody is looking at it. Panel three, captioned CAUGHT AT THE WIRE: inside the screen the same belt now runs through a dense grid of fine taut amber tripwire threads strung across it like harp strings, a cracked part has struck the threads and stopped dead against them glowing hot, clean parts pass through untouched, the belt still runs fast, and she sits outside calm with one hand resting on the bench. Footer bar below: AGENTIC SPEED NEEDS EXTREME COVERAGE.](/img/comics/dont-move-at-agentic-speed-without-extreme-test-coverage.webp)

---

## The regression tax is charged per change, not per hour

Every change to a working system carries a chance of breaking something that already worked. That probability is roughly fixed by how tangled the system is. The bill you pay is that probability multiplied by the number of changes you make.

Agents did not lower the probability. They multiplied the changes. A person who used to ship four edits a day now approves forty, across files they did not open, in subsystems they have not read this month. The per-change risk held steady and the multiplier went up tenfold, so the expected number of regressions went up tenfold with it. This is the specific way [you become the bottleneck](/perspectives/you-are-the-bottleneck): the only verifier in the loop is a human reading diffs at human speed, sitting downstream of a generator running ten times faster.

The trap is that this feels fine for a while. Regressions do not announce themselves on the day they are introduced. They surface later, in a different subsystem, usually in front of a customer, and by then the change that caused them is thirty commits back and nobody remembers it. The feedback loop is long enough that a team can accumulate months of damage while reporting excellent velocity.

A test suite collapses that loop to seconds. That is its entire job: convert a regression you would have found in three weeks into a red line you find in three seconds. Everything else people say about tests is secondary to this.

## The old objection died and nobody updated the policy

"We will add tests later" was a defensible position, and it is worth being precise about why, because the reason is gone.

Tests were expensive. Writing them was skilled human labor competing directly against shipping features, and the tradeoff was real: an hour on a test was an hour not on the product. Under that cost structure, thin coverage on the load-bearing paths was a rational call, and most teams made it.

Writing tests is now close to free. An agent that just wrote the code can enumerate its edge cases, draft the suite, and wire the fixtures in a fraction of the time it took the code itself. The labor that made the tradeoff a tradeoff has collapsed. What remains is judgment: deciding what must never break, and checking that the tests actually check it.

So the arithmetic inverted, and most teams are still running the pre-inversion policy. The old objection was cost. The cost is gone. Meanwhile the benefit went up, because the change rate went up. Both terms moved in the same direction and the conclusion moved with them: the coverage bar that was correct at human speed is negligent at agentic speed. Write more tests than feels necessary. The old instinct for "necessary" was calibrated against a price that no longer exists.

## A test is a spec that cannot drift

The second job of a suite is the one people notice years later.

Prose specs rot in silence. A README, a PRD, a design doc, an architecture note: all of them describe the system on the day they were written, and none of them know when they stop being true. Nothing checks them. They drift from the code one small edit at a time, and there is no moment where the drift announces itself. Eventually a new engineer reads a document that confidently describes software that no longer exists.

A test is a specification that runs. It cannot drift, because the moment it stops matching the system it fails, loudly, with a name and a line number. That property is not available in any other form of documentation. It is the difference between a claim about the system and a claim the system is continuously forced to honor.

Tests also state things prose is bad at stating. Prose says "handles empty input gracefully." A test says exactly what empty means here, exactly what graceful resolves to, and what the return value is. Every ambiguity a written spec papers over has to be resolved before a test can be written at all, which is why writing the test frequently exposes that the requirement was never actually decided. See [Spec Writing](/disciplines/spec-writing) for the intent side of this, and [Precise Procedures Are Written for the Agent](/perspectives/precise-procedures-are-written-for-the-agent) for the same precision demand applied to process.

This matters more when an agent is the reader. An agent handed a suite has an executable description of what the system must do, and it can check itself against that description without you. An agent handed only prose has a suggestion it will interpret. The suite is the part of your documentation that has teeth, which is why it is worth being abundant with it: every test is one more sentence of a spec that maintains itself.

## A test that never fails is decoration

Abundance is only worth anything if the tests bite, and a suite written at agentic speed is exactly where non-biting tests come from. An agent asked for tests will produce tests. Some of them assert things that cannot fail, restate the implementation back to itself, or mock away the behavior under examination. They are green forever. They are worse than nothing, because they buy confidence without providing any.

The check is cheap and it is not optional: **break the thing on purpose and confirm the test catches it.** Revert the fix, or invert the condition, or delete the line, and watch the suite go red. If it stays green, the test was decoration and you just found out for free.

A recent case: a share-link button copied nothing on mobile because the clipboard write ran after an `await`, which expires the browser's user-activation window. The fix restructured the ordering. Before trusting the new test, the old ordering was stubbed back in, and three of seven tests failed. That is what earns the suite the right to be believed later. The same discipline appears at the organizational level in [Ratcheting Standards](/concepts/ratcheting-standards): a check only holds the line if it is capable of saying no.

The corollary is the harder rule: **never delete or weaken a check to make a run go green.** A test failing against reasonable behavior is either finding a real defect or is itself wrong, and both are worth the hour. Deleting it converts a known problem into an unknown one.

## Where to be extreme

Abundance is not a uniform coverage percentage, which is a number teams learn to game. It means every place where being wrong is expensive gets a test, and the bar for "expensive" is much lower than it used to be.

**Anything an agent will touch without you reading it.** This is the new one. The surfaces you have effectively delegated need the densest coverage, because the suite is now the primary reader of that code, not you. Coverage here is what makes delegation safe; the parts of the system with no tests are the parts you still have to read personally.

**Every bug you have already fixed once.** The test goes in with the fix, in the same commit. A bug that ships twice is a bug nobody wrote a test for.

**Anything whose failure is silent.** Wrong output that still looks like output, a permission check that stops checking, a cache serving stale data. Loud failures announce themselves; silent ones need a tripwire.

**Seams between components, not just units.** Most regressions live where two pieces meet, which is precisely where unit tests mock each other out and see nothing.

**Behavior, never implementation shape.** A test coupled to how the code is arranged will fail on every refactor and teach the team that red means "ignore it." A test coupled to what the code does survives an agent rewriting the internals, which is the scenario you are buying insurance against. See [Software Is Disposable, Context Is the Asset](/perspectives/software-is-disposable-context-is-the-asset): if the implementation is disposable, your tests had better not be pinned to it.

Non-deterministic surfaces are the exception that needs a different instrument. Model output does not pass or fail, it scores, so it belongs in [Evals](/disciplines/evals) with golden sets and a rubric rather than in a unit test with an equality assertion. The two live side by side: deterministic code gets tests, judgment gets evals, and [everything recurring belongs in the deterministic half](/perspectives/recurring-work-belongs-in-code) where a test can hold it.

## What the suite actually buys

Teams pitch tests as a quality practice. For an operator moving at agentic speed, the return is better stated three ways.

**Delegation.** A suite converts "I have to read everything the agent wrote" into "I ran it and I know." That is the difference between supervising a generator and being its rate limit, and it is why coverage, not model capability, is usually what caps how much you can hand off. Related: [Cognitive Coverage](/concepts/cognitive-coverage), which applies the same instrument to how much of the agent's work you personally understand.

**Upgrade freedom.** [Model upgrades are no longer strictly upgrades](/perspectives/model-upgrades-are-no-longer-strictly-upgrades), and the same is true of dependency bumps and framework migrations. A team with a real suite runs the upgrade and reads the failures. A team without one either upgrades blind or never upgrades, and the second option ages worse.

**Refactorability.** Systems that can be restructured stay cheap to change, and the thing that makes restructuring safe is a suite that pins behavior while the shape moves underneath it. Without it, code calcifies: everyone can see the better structure and nobody will touch it.

## Further Reading

- [You Are the Bottleneck](/perspectives/you-are-the-bottleneck): the constraint this page is about relieving. Verification capacity, not generation capacity, is what caps throughput.
- [Evals](/disciplines/evals): the instrument for the non-deterministic half. Tests assert, evals score, and a serious system needs both.
- [Generation Is Cheap, Discrimination Is the Job](/perspectives/generation-is-cheap-discrimination-is-the-job): the general form of the argument. A suite is discrimination that runs without you.
- [Capable Agents Need More Guardrails](/perspectives/capable-agents-need-more-guardrails): why rising capability raises the guardrail bar rather than lowering it.
- [Cognitive Coverage](/concepts/cognitive-coverage): test coverage pointed at your own understanding of what the agent did.
- [Ratcheting Standards](/concepts/ratcheting-standards): how a check that can say no holds a line permanently.
- [Recurring Work Belongs in Code](/perspectives/recurring-work-belongs-in-code): the deterministic half of the system, which is the half a test suite can hold.
