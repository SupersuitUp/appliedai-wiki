---
title: "Self-Improving Skills"
slug: /concepts/self-improving-skills
description: "A skill earns its place by getting better: every run's corrections fold back into the file, the target is consistent one-shots on the cases you care about, and the update rules live in the skill itself so improving one case cannot silently degrade another."
image: "/img/comics/self-improving-skills.png"
---

# Self-Improving Skills

*A skill earns its place by getting better: every run's corrections fold back into the file, the target is consistent one-shots on the cases you care about, and the update rules live in the skill itself so improving one case cannot silently degrade another.*

![Three warm editorial panels titled SELF-IMPROVING SKILLS. One: a middle-aged Black woman in round glasses and a mustard cardigan leans in frowning at the glowing amber laptop, where the Chief of Agents holds up a crooked incomplete page; an amber correction line loops from the screen down into a desk card labeled SKILL; caption FIRST RUN FAILS. FOLD IT BACK. Two: the same woman sits back with her hands off the keys while the Chief of Agents presents one clean finished page and the SKILL card beside the laptop carries layered annotation strokes and glows faintly; caption RUNS LATER: IT ONE-SHOTS. Three: she holds a new amber correction slip up against the SKILL card, which shows a neat stack of three blank case tags, while inside the laptop two sub-agents each hold up a clean page of a different shape; caption NEW FIX, CHECKED AGAINST THE REST. Footer: ADOPT ONLY WHAT IMPROVES. IMPROVE WITHOUT DEGRADING.](/img/comics/self-improving-skills.png)

---

## Skills are for one-shotting

A [skill file](/concepts/skill-files) has one job: you invoke it once, with a plain instruction, and what comes back is shippable with edits so small they do not annoy you. That is the whole point of packaging a procedure instead of re-explaining it every session. A skill that reliably needs three corrections per run is not a skill yet. It is a draft of one.

No skill starts there. The first packaged version of any real workflow misses steps, gets boundaries wrong, and encodes assumptions from the one session it was born in. Consistent one-shotting is reached one way: continual iteration. Run it, correct the output, fold the correction back into the file, run it again. A picture-book pipeline that now one-shots with only trivial edits at the end got there through hundreds of iterations, not through a good first draft. The coaching version of the loop fits in one breath: do the work as manually as possible, package the session into a skill, run it, watch it fail to one-shot, correct it, update the skill, repeat.

## Improvement is the adoption criterion

This is the part to swear by: never adopt a skill that is not improving. A static skill is not neutral. The world under it moves (the tools change, your standards rise, the edge cases accumulate), so a skill that is not absorbing corrections is decaying while looking stable. Whoever offers you a skill, the first question is not what it does today but whether the loop that improves it is alive: where corrections land, who folds them in, when it was last updated by a real run.

The same criterion binds your own library. A skill you keep invoking without ever feeding back is a skill you have silently abandoned; you are paying its failure modes as a permanent tax instead of a one-time tuition. Improvement discipline is what turns a private procedure into a [golden process](/concepts/golden-processes): proven in real work, refined over repetitions, blessed once it reliably delivers.

## Updates must not degrade the other cases

Here is the failure the loop creates on its own: a real skill serves more than one case, and the correction that fixes today's run can quietly break last month's. You sharpen the skill for the long-form report and the short-memo path starts over-explaining. You add a rule for one client's format and every other client inherits it. Each edit looked like an improvement in the session that made it, and the skill got worse in aggregate.

This is a regression problem, and it deserves the same discipline regressions get in software:

- **The skill states what it covers.** A skill file that names its cases (the shapes of input it serves, the outputs it promises) gives every future editor something to check an edit against. An undeclared scope cannot be protected.
- **Every added line must improve what the next invocation produces**, across the covered cases, not only the one that prompted it. If an edit helps one case, scope it to that case explicitly rather than letting it bleed into all of them.
- **Prefer correcting a wrong line over appending a new one.** Length without behavior change is a regression of its own: the [fat skill](/concepts/fat-skills) carries deep craft, but bloat is judged per line, and session history is not craft.
- **When a run goes well, say nothing.** The absence of an edit is information too; churn for its own sake is how covered cases get disturbed.

Part of this is engineering and part is intuition, the feel for which edits are load-bearing and which are one session's noise. Both improve with practice. Neither should live only in the head of whoever is editing today.

## The skill carries its own update principles

Which is the final move, and the one that makes the name honest: the update rules belong inside the skill itself. A skill file is not only the procedure; it is the constitution for its own evolution. The AI folding in a correction should find, in the file it is editing, the covered cases to protect, the test an added line must pass, and the instruction to correct rather than append. Then the non-degradation discipline runs on every update, whichever agent or session performs it, instead of depending on the editor happening to know the principles.

That is the difference between a self-improving skill and a frequently-edited one. Frequently-edited skills change; self-improving skills converge. The general pattern (observe, evaluate, propose, apply, repeat) is [self-improving systems](/concepts/self-improving-systems); the skill file is its most personal instance, and its cousin for documents is the [self-improving artifact](/concepts/self-improving-artifacts), which regenerates from captured context rather than from corrections. And once a skill converges to consistent one-shots, it clears the bar for leaving your supervision entirely: [don't hand off a skill until it one-shots](/perspectives/dont-hand-off-a-skill-until-it-one-shots).

## Further Reading

- [Don't Hand Off a Skill Until It One-Shots](/perspectives/dont-hand-off-a-skill-until-it-one-shots): the readiness bar the improvement loop is climbing toward.
- [Skill Files](/concepts/skill-files): the artifact this concept governs.
- [Self-Improving Systems](/concepts/self-improving-systems): the general observe-evaluate-propose-apply pattern.
- [Golden Processes](/concepts/golden-processes): what a skill becomes once repetition has proven it.
- [Fat Skills](/concepts/fat-skills): why depth is not bloat, and where the line sits.
