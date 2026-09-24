---
title: Gates and Hooks
slug: /concepts/gates-and-hooks
description: "The two mechanisms that turn an instruction to an agent into a constraint on it. A gate refuses: a check runs, and failing prevents the action. A hook forces: your step runs at a seam whether or not the agent remembered. Instructions are read. Gates and hooks are executed."
image: "/img/comics/gates-and-hooks.webp"
---

# Gates and Hooks

*The two mechanisms that turn an instruction to an agent into a constraint on it. A gate refuses: a check runs, and failing prevents the action. A hook forces: your step runs at a seam whether or not the agent remembered. Instructions are read. Gates and hooks are executed.*

![Three panels in the hyperagentic-age register, titled GATES AND HOOKS, all shot over the right shoulder of a woman in a mustard cardigan at a wooden desk, so the glowing amber laptop's screen faces her and the viewer beyond her. One, THE RULE ON THE WALL: she points firmly at a blank sheet pinned to the wall while, inside the screen, one small agent writes at a table and the other carries a box out through an open door, neither looking at the sheet. Two, THE GATE REFUSES: she sits back with her hands folded under her chin as the same agent stops short of a heavy barred wooden door inside the screen, the box still in its arms. Three, THE HOOK RUNS ANYWAY: she has walked away to the window with a mug, her back to the desk, and inside the screen a small brass bell rings on its own while one agent sweeps with a broom and the other stands by. Footer: INSTRUCTIONS ARE READ. GATES AND HOOKS ARE EXECUTED.](/img/comics/gates-and-hooks.webp)

---

## An instruction is a suggestion

Every operator of an agent system has written the same sentence into a rules file: never do X. Then the agent did X, and the sentence was right there the whole time.

This is not a defect in the model. A rules file is context, and context is weighed. An instruction competes with the task, the examples, the tool output, and everything else in the window, and on a long enough session it loses some fraction of the time. A sub-agent dispatched with "do not edit any files" edited four repositories and pushed a public one, because a prohibition in prose reads as a preference and the task read as the task. "Do not use alerts" written into a rules file several times still produced alerts. The [alignment stack](/concepts/the-alignment-stack) has seventeen layers and the operator's written intent is one of them, which is exactly why it cannot be the only one.

The move is to stop asking the model to hold the rule and put the rule where the model cannot get past it. [Prompt guards](/concepts/prompt-guards) do this for prompts. Gates and hooks do it for everything else.

## A gate refuses

A [gate](https://telontology.wiki/concepts/gate) is a check that runs, returns pass or fail, and where failing prevents the action. The definition is telontology's and the last clause carries it: a check whose failure is reported and then ignored is a linter, and a linter is an instruction with a log file.

Gates sit at the point where an action becomes irreversible or leaves the machine, and they are indifferent to what the agent believes:

- A style gate refuses to publish a page to a public surface on a severity-three hit. The agent can think the draft is fine; the page does not ship until the hit is fixed, the surface is lowered, or the rule is turned off by the person who owns it.
- A staleness gate fails the build when a page's plain-language twin no longer matches its source, so a good edit that forgot its twin cannot deploy.
- A merge script refuses to land a branch on a conflict and leaves the tree untouched, rather than resolving it by guess.
- A session cannot be closed while a project it touched has no next action written, because that is the orphan the close exists to prevent.
- A [ratcheting standard](/concepts/ratcheting-standards) fails the moment the count of violations goes up, on a codebase that has never met the standard.

None of those is a rule the agent might forget. Each is a program that runs whether or not anybody remembered it, and the agent finds out it was wrong by being refused.

## A hook forces

A [hook](https://getfreedom.wiki/concepts/hook) is the mirror: your step, run at a seam in the system's own flow, when something happens rather than when someone asks. Where a gate says "not unless", a hook says "and also, every time".

The seams are the moments an agent harness already passes through: a session starting, a tool about to be called, a tool having been called, the agent about to stop. Claude Code exposes each of those as a hook point, and a script attached there runs on the harness's schedule, not the model's. Some examples of what that buys:

- **Before a tool runs**, a hook can inspect the call and block it. A destructive command, a write to a path the operator fenced off, a push to the wrong remote: refused before it executes, with the reason handed back to the model. This is a gate implemented as a hook, and it is the one place a prohibition becomes physical.
- **After a tool runs**, a hook sees what happened. That is the observation layer [self-improving systems](/concepts/self-improving-systems) are built on: every tool result, every failure, logged by something that cannot skip a turn.
- **When the agent stops**, a hook can run the check the agent should have run, and re-open the turn if it fails. The voice check on a reply, the test suite after a change, the reminder that a project was touched and its state file was not.
- **When a session starts**, a hook loads the context the operator would otherwise have to paste: who they are, what is open, what the last session left undone.

A rule in a hook is a fact about the environment the model works in, and the model finds it the way it finds a locked door.

## Refuse or force, and the pairing

The two are complementary and most real constraints want both. "Every public page passes the voice check" is a hook (the check runs at publish) and a gate (a failure stops the publish). "Tests ship with the behavior change" is a hook at commit time and a gate that refuses the commit without them. A hook with no gate observes; a gate with no hook depends on somebody invoking it, which is the instruction problem again one level up.

The design question for any rule you find yourself writing into a rules file for the second time is: at which seam does this run, and what does failing prevent? Answer both and the rule has become a mechanism. Answer neither and you have documentation, which is worth having and is not enforcement.

## What makes a gate honest

A gate can be worse than no gate, and the failure is always the same: everyone believes it ran.

- **Prove it can fail.** A gate that has never refused anything has never been tested. Break the thing on purpose and watch it refuse, the same discipline [prompt guards](/concepts/prompt-guards) require.
- **Never delete or skip a check to make a run go green.** A check failing against reasonable behavior is either finding a real defect or is itself wrong, and both are worth the hour. Removing it converts a refusal into silence.
- **A skipped gate is reported, never quietly bypassed.** Three legitimate ways past a refusal: fix the thing, lower the surface if it was never public, or turn the rule off in the layer you own. All three leave a record. Publishing past a refusal without saying which rule fired is the one thing that destroys the gate for everyone after you.
- **The gate holds the standard, the person holds the gate.** A gate is a written definition of good that a program can check, which means changing it is a decision with a date on it, made by the person whose standard it is. [The doctor pattern](/concepts/the-doctor-pattern) is the same idea run as a loop rather than a door.

## Further Reading

- [Prompt Guards](/concepts/prompt-guards): the same principle applied to what goes into the prompt; documentation is not enforcement.
- [Ratcheting Standards](/concepts/ratcheting-standards): a gate you can adopt today on a codebase that does not yet meet it.
- [The Doctor Pattern](/concepts/the-doctor-pattern): a rubric as the reward function, graded in a loop.
- [Self-Improving Systems](/concepts/self-improving-systems): hooks as the observation layer.
- [The Alignment Stack](/concepts/the-alignment-stack): where the operator's written intent sits, and why it needs mechanisms under it.
- [Gate](https://telontology.wiki/concepts/gate): the definition, on the wiki that owns it.
- [Run CI on a Machine Your Agents Share](/playbooks/run-ci-on-a-machine-your-agents-share): gates in a test pipeline on a shared machine, and why a drift gate belongs at commit time rather than release.
- [Hook](https://getfreedom.wiki/concepts/hook): the seam where your own steps attach to a shipped skill.
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): the hook points Claude Code exposes.

> **Instructions are read. Gates and hooks are executed.**
