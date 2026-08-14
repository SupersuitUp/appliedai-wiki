---
title: "Don't Hand Off a Skill Until It One-Shots"
slug: /perspectives/dont-hand-off-a-skill-until-it-one-shots
description: "One-shot reliability at home is the readiness bar for sharing a skill with another person or deploying it to the cloud, because both moves price out the correction loop that made the skill good."
image: "/img/comics/dont-hand-off-a-skill-until-it-one-shots.png"
---

# Don't Hand Off a Skill Until It One-Shots

*Iterating with an agent is cheap when you are in the room and expensive everywhere else. So the readiness bar for handing a skill off, whether that means sharing it with another person or deploying it to run unattended in the cloud, is one-shot reliability at home: you invoke it once, the output is basically right, and your edits are trivial. Until a skill clears that bar, every frustrating run is training data for the skill file, and escalating it out of your supervision is escalating the frustration to a place where you can no longer fix it.*

![Three warm editorial panels titled DON'T HAND OFF UNTIL IT ONE-SHOTS. One: a man in a rust sweater leans in at the glowing amber laptop, frowning and pointing at a crooked stack of film clips inside the screen where the Chief of Agents stands; an amber line loops down into a desk card reading SKILL; caption CORRECT. FOLD IT BACK. Two: the same man sits back delighted, hands off the keys, while the Chief of Agents presents one clean aligned row of clips and the SKILL card glows; caption ONE CALL. CLEAN OUTPUT. Three: the chair is empty, the laptop works on unattended with an amber thread rising to a small cloud, and the man is at the open door with a travel bag, glancing back; caption NOW IT RUNS WITHOUT YOU. Footer: ITERATE WHERE FEEDBACK IS CHEAP. HAND OFF WHAT ONE-SHOTS.](/img/comics/dont-hand-off-a-skill-until-it-one-shots.png)

---

## Handoff removes the correction loop that made the skill good

A [skill file](/concepts/skill-files) gets good one way: you run it, the output disappoints you in some specific way, you tell the agent exactly what was wrong, and the correction lands back in the file. That loop is nearly free when you are sitting at the machine. The run is in front of you, the defect is fresh, and the fix is one sentence of feedback away.

Both forms of handoff destroy that loop. Share the skill with a friend and the defects now surface on their machine, in their context, described to you secondhand if they bother to report them at all. Deploy it to the cloud, on managed-agent infrastructure or anywhere else it runs without you, and the defects surface in finished output you were not watching, discovered late, debugged through logs. The back-and-forth that cost you thirty seconds at home costs a round trip of messages, or a redeploy, or a batch of ruined output nobody caught.

The mistake is treating the cloud as the fix for a skill that misfires. A podcast producer had built himself a local clip-cutting app that turned long recordings into batches of short clips. It messed up a lot, and his instinct was to move it to the cloud, where it could churn without occupying his laptop. But a process that misfires under your supervision does not misfire less when you remove the supervision. It misfires invisibly, at scale, with the correction loop priced out. Unreliability is a reason to stay local, and the desire to deploy is exactly the signal to start iterating harder.

## Frustration data belongs in the skill file

The run that took an hour longer than you wanted feels like waste. It is the opposite: everything you noticed while dragging the output to acceptable (the boundaries it cut wrong, the context it missed, the step it skipped) is precisely the data the skill needs. The discipline is to close each painful run by telling the agent what you learned and having it fold that into the skill file, so the next run starts from everything the last one cost you.

You do not have to overthink the mechanism. Say why the output was wrong, get the run to the point where every piece of it is right, then say: based on what I corrected this run, update the skill. Do that after every run and the skill converges. Skip it and you pay the same frustration tax forever, which is the [hand-rolling](/concepts/hand-rolling) failure applied to your own tooling. This is also how a private procedure earns its way toward being a [golden process](/concepts/golden-processes): proven in real work, refined over repetitions, blessed only once it reliably delivers.

## The bar is one-shot, and you can feel when you clear it

One-shotting means you invoke the skill once, with a plain instruction, and what comes back is shippable with edits so small they do not annoy you. Several runs in a row. The subjective version of the test is blunter and works fine: you should be reacting to the output like it is magic. If your honest reaction is still "close, but I had to fix three things," you are below the bar, and both handoffs will amplify those three things past your reach.

This is the same graduation logic as [moving a workflow down the loop](/concepts/in-on-out-of-the-loop). Sharing a skill and deploying a skill are both moves from in the loop toward out of the loop, and the discipline of that graduation is that trust is earned by observed reliability first. The bar does not move because the cloud is exciting or because your friend asked today.

## What handoff is actually for

None of this argues against sharing or deploying. It sequences them. The cloud is the right home for a proven skill: unattended volume, no laptop occupied, output you skim rather than supervise, the endpoint [progressive automation](/perspectives/progressive-automation-is-the-job) keeps walking toward. Sharing is the right move for a proven skill too, and there are forms built for exactly that moment, like the [boomerang prompt](/concepts/boomerang-prompt), which works precisely because the prompt one-shots on a stranger's machine with nobody there to coach it.

And if a skill refuses to converge no matter how much correction you feed it, the problem is usually upstream of the skill: you skilled before you mapped. Map the workflow first, every branch, what is yours versus the machine's, then quarry the skill from the proven map. There is a hosted skill that does this interview end to end: [map-a-workflow](https://truthmanagement.wiki/skills/map-a-workflow/SKILL.md).

## Further Reading

- [Skill Files](/concepts/skill-files) the artifact the correction loop improves
- [Golden Processes](/concepts/golden-processes) the promotion gate a proven procedure passes through
- [In, On, and Out of the Loop](/concepts/in-on-out-of-the-loop) the graduation ladder handoff moves you down
- [Progressive Automation Is the Job](/perspectives/progressive-automation-is-the-job) the weekly cadence this bar plugs into
- [Boomerang Prompt](/concepts/boomerang-prompt) a shareable prompt form built to one-shot on someone else's machine
