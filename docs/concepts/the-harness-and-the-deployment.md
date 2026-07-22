---
title: "The Harness and the Deployment"
slug: /concepts/the-harness-and-the-deployment
description: "Two independent questions decide who owns an agent system: who supplies the harness, and who supplies the deployment. Teams conflate the two and end up owning both by accident."
image: "/img/comics/the-harness-and-the-deployment.png"
---

# The Harness and the Deployment

*Two independent questions decide who owns an agent system: who supplies the **harness** (the agent loop, tool dispatch, context management) and who supplies the **deployment** (the infrastructure it runs on). Teams routinely conflate them and end up owning both by accident.*

![Four-panel comic strip in a uniform 2x2 grid on warm cream paper, heavy black inks, matte-navy power armor with vivid orange seam accents and cyan wrist and visor glow. Chunky inked title bar at top reads "THE HARNESS AND THE DEPLOYMENT". PANEL 1, labeled "1. THE QUESTION THEY ANSWER": the hyperagent in bulky matte-navy plate armor stands in a bright workshop holding up a glowing cyan gear-and-loop mechanism stamped "HARNESS", with inked sub-labels pointing at it reading "LOOP", "TOOLS", "CONTEXT"; his speech bubble reads "WE'RE JUST USING THE SDK." Paper-tape caption: "The harness is the loop, the tools, the context." PANEL 2, labeled "2. THE QUESTION THEY DIDN'T": the workshop floor has swung open like a trapdoor and the hyperagent kneels peering down into a vast dim machine basement of barred cells stamped "SANDBOX", storage drums stamped "SESSIONS", a steel safe stamped "SECRETS", and pressure gauges stamped "CAPACITY"; a large orange arrow points down at an inked plate reading "DEPLOYMENT". Paper-tape caption: "The deployment is everything underneath it." PANEL 3, labeled "3. FOUR COMBINATIONS": a clean inked 2x2 chart with column headers "HARNESS" and "DEPLOYMENT" and rows A, B, C, D; rows A, B and C each show a cyan checkmark under HARNESS and a crimson "YOU" stamp under DEPLOYMENT, while row D shows a cyan checkmark under both. Paper-tape caption: "Three of four leave the deployment with you." PANEL 4, labeled "4. THE DIAGNOSTIC": the helmeted hyperagent with glowing cyan visor holds up three inked question cards reading "WHERE DO SESSIONS LIVE?", "WHO SANDBOXES TOOLS?", "WHERE ARE THE KEYS?", beside a hanging gold price tag headed "REAL BILL" itemizing compute, storage, sessions, security, capacity, observability, support. Paper-tape caption: "Those are deployment questions. They surface the real bill." Chunky inked footer bar reads "TWO QUESTIONS. ANSWER BOTH ON PURPOSE."](/img/comics/the-harness-and-the-deployment.png)

---

## The two axes, defined separately

Most conversations about "building an agent" collapse into one question: which library are we using? That is half the decision. There are two, and they are independent.

**The harness** is the software that turns a model into an agent. It owns the loop (call the model, read the stop reason, dispatch the tool, feed the result back, decide whether to continue), the tool schemas and their dispatch, context assembly and compaction, retry and resumption semantics, budget accounting, and subagent orchestration. [Harness Engineering](/disciplines/harness-engineering) is the discipline; [Anatomy of a Harness](/disciplines/anatomy-of-a-harness) walks the subsystems in a real one.

**The deployment** is the infrastructure the harness runs on. It owns sandboxed execution of whatever the agent's tools do, container and process lifecycle, the filesystem the agent reads and writes, session persistence across restarts, multi-tenant isolation between one customer's agent and another's, secret storage and how credentials reach an outbound call without ever landing in the execution environment, capacity per concurrent agent, autoscaling, and scheduling.

The harness question is "who wrote the loop." The deployment question is "where does the loop live, and what happens to it when the box dies."

:::note
"Deployment" carries a second meaning on this wiki: in [Intelligence Is Commoditized, Deployment Is the Moat](/perspectives/intelligence-is-commoditized-deployment-is-the-moat), deployment means the work of applying general intelligence to one company's specific reality. That is the business sense. This page uses the infrastructure sense. Both are real and they compound: the bridge you build has to run somewhere.
:::

## The four combinations

Cross the two axes and there are four ways to build an agent system.

| | Harness | Deployment |
|---|---|---|
| **(a) Hand-rolled loop** | You write it | You host it |
| **(b) Library loop** | A vendor SDK supplies the loop over tools you define | You host it |
| **(c) Batteries-included agent framework** | A vendor supplies the full loop plus built-in file, shell, and search tools | You host it |
| **(d) Managed agent platform** | A vendor supplies it | A vendor supplies it |

Option (a) gives you total control of the control flow and a permanent maintenance obligation for both halves. Option (b) is the common default: you write tool functions, the SDK drives the request-execute-loop cycle, and you still stand up every machine it touches. Option (c) feels like a much bigger jump because the tool surface is enormous, but on the deployment axis it is identical to (b): you are still hosting. Option (d) is the only one where a vendor takes the infrastructure.

**Three of the four leave deployment with you.** That is the whole reason teams underestimate what they signed up for. The jump from (a) to (c) feels like an enormous amount of leverage bought, and it is, entirely on one axis. The infrastructure bill did not move.

## The diagnostic

A team that says "we're just using the SDK" has answered the harness question and usually believes it has answered both. Three questions surface the difference, and none of them are about the loop:

1. **Where do sessions persist after a container restart?** If the answer is "the conversation lives in memory in the request handler," the system has no session layer and every long-running task dies with the process. Building one means durable event storage, resumption semantics, and a reconnect path that does not lose events emitted during the gap.

2. **Who sandboxes tool execution?** If the agent can run shell commands or write files, something has to contain that. "It runs in our app container" means model-authored commands execute with your application's privileges against your application's filesystem. The real answer involves per-session isolation, a hardened image, egress policy, and a lifecycle you now own.

3. **Where do the tool credentials live?** If they are environment variables inside the execution environment, then anything the agent runs can read them, including anything a prompt injection convinces it to run. Keeping secrets out of the execution environment entirely, and injecting them only on the outbound request, is an infrastructure capability. Most teams discover they need it after the first incident.

Ask those three and the real scope appears. Add capacity planning per concurrent agent, autoscaling under bursty load, credential rotation, and per-tenant isolation, and the deployment half is frequently the larger engineering program of the two.

## Why the distinction pays

Naming the axes separately does three things.

**It makes the build-versus-rent decision two decisions.** You can own the harness because your control flow is genuinely unusual, and rent the deployment because your sandboxing requirements are not. Those are separable, and teams that treat them as one choice give up the cheaper half of the trade.

**It prices the work honestly.** [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure) names the floor an individual practitioner needs to participate at all. This is the production analog: the floor a team needs before an agent can serve customers, and it is higher than the demo suggests. A working prototype clears the harness bar and none of the deployment bar.

**It explains where the vendor bill comes from.** Platform-native capabilities cluster on the deployment axis, because that is where the expensive, unglamorous engineering lives. Choosing to own that axis is choosing to rebuild it, which is what [The Portability Tax](/concepts/the-portability-tax) prices out.

## What to do with it

Before the next agent build, write both answers down in one sentence each. "We supply the harness with a library loop; we supply the deployment on our own cluster." Then read the second half back and ask whether anyone on the team has scoped it.

If the second sentence is shorter than the first, the estimate is wrong.

## Further Reading

- [Harness Engineering](/disciplines/harness-engineering) for the discipline that owns the first axis.
- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness) for the subsystems a harness actually contains.
- [The Portability Tax](/concepts/the-portability-tax) for what it costs to keep both axes in-house on purpose.
- [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure) for the participation floor beneath all of this.
- [The Case for Simple Harnesses](/perspectives/the-case-for-simple-harnesses) for why a small core beats a kitchen-sink default on the harness axis.
- [You Are Having the 2008 Cloud Argument Again](/perspectives/you-are-having-the-2008-cloud-argument-again) for the cloud precedent on the deployment axis, and where that precedent stops applying.
