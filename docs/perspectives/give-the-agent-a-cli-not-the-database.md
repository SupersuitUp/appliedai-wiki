---
title: Give the Agent a CLI, Not the Database
slug: /perspectives/give-the-agent-a-cli-not-the-database
description: An app's privileged operations belong in a tested admin CLI the agent calls, not in ad-hoc SDK calls the agent composes fresh every time.
image: "/img/comics/give-the-agent-a-cli-not-the-database.webp"
---

# Give the Agent a CLI, Not the Database

*Every app accumulates privileged operations. If the only way an agent can perform them is to compose raw SDK calls against production, every run is untested, unrepeatable and unreviewable. Ship the admin CLI first, name it in the README, and the agent stops improvising against your database.*

![Three panels on warm cream paper, the same woman in a charcoal sweater at the same glowing amber laptop in each. One: inside the screen a bank of drawers stands wide open and the capped agent has both arms buried in it while blank sheets fly loose, and she holds one hand half-raised, unable to see what he is touching. Two: the drawers are shut behind a plain counter with a single lever, the agent rests one hand on it and holds up a blank card first, a second small agent watching, and she leans in to read the card. Three: an open book sits on a stand beside the counter and a newly arrived agent walks straight past the closed drawers to the lever, while she sits back with her hands in her lap.](/img/comics/give-the-agent-a-cli-not-the-database.webp)

## The reflex that feels like capability

Give a capable agent admin credentials and a database client and it will do the job. It will find the right collection, work out the field, write the value, and report success. That competence is exactly what makes the pattern dangerous, because nothing about the run leaves a trace anyone can review.

Consider a small, real task: restore one user's revoked access to an app. Done through raw admin calls, that is a chain of judgment calls in a session nobody will read again. Which collection holds users. Whether access is gated by a status field, a separate allowlist, or a deactivated invite code. Whether the query is even pointed at the right project, since a client configured from ambient credentials will happily answer about a different one and return an empty result that reads exactly like a clean bill of health.

Each of those is a place to be wrong quietly. The agent that gets it right and the agent that gets it wrong produce the same confident paragraph at the end.

## What a CLI changes

The same task behind a command is a different object entirely. `access restore <email> --dry-run` has a name, a defined set of arguments, and a body of tests that assert what it does. The decision about which collection holds users was made once, reviewed once, and is now the same on every run. The agent is not deciding it again at two in the morning.

Four things follow, and they are the whole argument:

**The operation becomes testable.** An SDK call composed in a session cannot be tested, because it does not exist until the moment it runs. A command can have a test that pins its behavior, including the parts that are easy to get wrong: that a destructive path refuses without confirmation, that a dry run mutates nothing, that a filter with no matches exits non-zero rather than reporting success over an empty set.

**Refusals get a home.** A CLI is where you put the guard rails that an improvising agent has no way to observe. Confirmation on anything hard to reverse, and [confirmation shaped so it cannot be given by accident](https://clig.dev/): a `[y/N]` default of no, and for the severe operations a flag that must name the thing being changed, so the guard survives automation instead of being bypassed by it.

**The blast radius gets an edge.** Credentials handed to an agent are permission to do anything the credentials allow. A command surface is permission to do the listed things. That is the [principle of least privilege](https://www.strongdm.com/blog/principle-of-least-privilege) expressed as an interface rather than as a policy document, and it is the version an agent actually respects, because it is the only version it can see.

**The run leaves a record.** Commands and their arguments are greppable in a way that a paragraph of narrated SDK calls is not. If an operation matters enough to be privileged, it matters enough to be answerable later.

## Design rules that survive contact with an agent

Most CLI guidance is written for humans at a terminal. The rules below are the subset that changes when the caller is an agent, and they are worth stating separately because the failure modes differ.

**A dry run must show the real decisions, not a summary.** Its job is to let a caller inspect the plan before it executes. A dry run that prints "would update 1 user" while the real path resolves a different record has taught the caller nothing. Print what will change, by identity.

**Every command needs a machine-readable mode.** `--json` is not a convenience. Without it an agent parses prose, and prose changes when someone improves an error message. A stable output shape is what makes the command safe to build on. Human-readable output is the default; the structured form is what the agent asks for.

**Exit codes are the contract.** Zero means it happened. Non-zero means it did not, and the reason should not require reading stdout to discover. An agent chains commands, and a command that exits zero on "nothing matched" will be treated as success by the next step in the chain.

**Refusing is a feature, and the refusal should say what to do.** The most useful thing a privileged command can do is stop and name the missing precondition. A message that says which check failed and which flag or command resolves it turns a dead end into a next step. This is [the doctor pattern](/concepts/the-doctor-pattern) applied to operations rather than to setup.

**Never let a destructive default be the quiet one.** If the flagless form of a command mutates production, the first person to run it while exploring will find out afterwards. Reads are the default; writes are asked for.

## Name it in the README, or it does not exist

An agent that does not know the CLI exists will reach for the SDK, and it will be right to, because from where it sits the SDK is the only interface. The CLI is discovered the same way a new engineer discovers it: by [reading the README](/perspectives/agents-read-readmes). One section, near the top, listing the commands and what each is for.

This is the cheapest half of the work and the half most often skipped. A well-built admin CLI that is documented only in the commit that added it is, to the next agent, indistinguishable from one that was never written.

## The honest limit

A CLI is not a substitute for judgment about who should be able to run it, and wrapping a dangerous operation in a command does not make the operation safe. It makes it *named*, which is a smaller claim and a real one. The value is that the decision about how to perform it was made once, in the open, with tests, instead of being re-derived under time pressure by whoever is at the keyboard, human or otherwise.

The test of whether you need one is simple. If your operational runbook contains the phrase "this is also scriptable, see the one-liners in git history", you needed the CLI some time ago.

## Sources

- [Command Line Interface Guidelines](https://clig.dev/), the standard reference on CLI ergonomics, confirmation and output.
- [CLI Tools That Support Previews, Dry Runs or Non-Destructive Actions](https://nickjanetakis.com/blog/cli-tools-that-support-previews-dry-runs-or-non-destructive-actions), on why a preview must show the real decisions.
- [Principle of Least Privilege](https://www.strongdm.com/blog/principle-of-least-privilege), on scoping access per task rather than granting it broadly.

## Further Reading

- [Agents Read READMEs](/perspectives/agents-read-readmes)
- [Capable Agents Need More Guardrails](/perspectives/capable-agents-need-more-guardrails)
- [Precise Procedures Are Written for the Agent](/perspectives/precise-procedures-are-written-for-the-agent)
- [Do Not Move at Agentic Speed Without Extreme Test Coverage](/perspectives/dont-move-at-agentic-speed-without-extreme-test-coverage)
- [Agent-Accessible Products](/concepts/agent-accessible-products)
