---
title: "The Permission Surface"
slug: /disciplines/the-permission-surface
description: "The most powerful thing you can do for an AI agent is tell it what it cannot do. Permission design as the load-bearing layer of a working harness."
---

# The Permission Surface

*The most powerful thing you can do for an AI agent is tell it what it cannot do.*

---

## The Body Problem

Consider the human body. It is, in every meaningful sense, a harness for the mind.

Your mind is capable of extraordinary things: abstract reasoning, pattern recognition, emotional intelligence, creative leaps. But it does none of these things in a vacuum. It operates through a body that constrains it, channels it, and ultimately enables it.

You can only be in one place at a time. You need sleep. Your senses have limited bandwidth. You cannot fly. You cannot see in the dark. You cannot process a thousand conversations simultaneously. These are not bugs. They are the architecture that makes focused, productive thought possible.

Remove the constraints and you do not get a more powerful mind. You get an unfocused one. The body's limitations are what force the mind to prioritize, to attend, to choose. The constraints are the design.

This is exactly the relationship between a model and its [harness](/disciplines/harness-engineering). The model has extraordinary capability. The harness constrains it, channels it, and ultimately enables it. And the most important constraints are not the tools you give it. They are the permissions you withhold.

---

## Jensen Huang's 2-of-3 Rule

In January 2026, NVIDIA CEO Jensen Huang described a security pattern that NVIDIA uses internally for agentic AI systems ([Lex Fridman interview](https://lexfridman.com/jensen-huang-transcript/)). The pattern is deceptively simple.

Every agent has three possible capabilities:

1. **Access sensitive data** (corporate documents, user records, proprietary information)
2. **Execute code** (run tools, modify systems, invoke workflows)
3. **Communicate externally** (call APIs, send emails, reach the internet)

NVIDIA's rule: an agent may hold **any two of these three**, but never all three simultaneously.

An agent that reads sensitive data and executes code cannot talk to the outside world. An agent that executes code and communicates externally cannot see sensitive data. An agent that reads sensitive data and sends emails cannot execute arbitrary code.

The logic is structural, not behavioral. It does not matter how well-behaved the agent is. It does not matter how good the model is. If a single agent can read your customer database, execute code to package that data, and send it to an external endpoint, then a single jailbreak compromises everything. The 2-of-3 rule makes this impossible by design, not by prompt.

---

## Why Constraints Improve Performance

The counterintuitive insight is that reducing permissions does not just improve safety. It improves output quality.

This is observable in Claude Code's architecture (see [Anatomy of a Harness](/disciplines/anatomy-of-a-harness), Section 4). The permission system gates every tool execution through allow/deny/ask rules. When permissions are tight, the model:

- **Thinks more carefully** before choosing an action, because some actions will be rejected
- **Uses fewer tools per task**, which reduces error surface and token cost
- **Produces more predictable output**, because the space of possible actions is smaller
- **Stays on task**, because it cannot wander into unrelated capabilities

This mirrors what we see in human performance. A writer with a blank page and unlimited time produces worse work than a writer with a word count and a deadline. A chef with 200 ingredients makes a worse meal than a chef with 5. Constraints force prioritization, and prioritization forces quality.

---

## What Is a Permission Surface?

The permission surface is the total set of actions an agent is authorized to take. It is analogous to "attack surface" in security: the larger it is, the more things can go wrong.

A minimal permission surface means:
- The agent has exactly the tools it needs for its task, and no others
- Each tool has explicit boundaries on what inputs are valid
- Actions with real-world consequences require human approval
- The scope narrows as sensitivity increases

A maximal permission surface means:
- The agent can read everything, write everything, execute anything, and communicate with anyone
- It is maximally capable and maximally dangerous
- A single failure mode cascades into every connected system

Most people default to maximal permission surfaces because they want the agent to be "flexible." This is the same instinct that leads organizations to give every employee admin access because it is easier than designing proper roles. It works until it does not.

---

## Permission Design Is Intent Engineering

The [Intent Engineering](/disciplines/intent-engineering) discipline describes the practice of encoding organizational purpose into infrastructure. Permission design is one of the most concrete forms this takes.

When you configure permissions, you are answering intent questions:

- "What is this agent for?" (defines which tools it needs)
- "What should it never do?" (defines the deny rules)
- "What requires human judgment?" (defines the ask rules)
- "What can it do freely?" (defines the allow rules)

These are not security questions. They are business design questions. "The agent can draft proposals but cannot send them" is a statement about organizational trust, delegation boundaries, and the current stage of the agent's maturity. It is intent, expressed as configuration.

And like all intent engineering, it evolves. An agent that starts with narrow permissions earns broader ones as trust is established. The permission surface grows deliberately, not by default.

---

## The Three Permission Architectures

Different organizations adopt different philosophies:

### 1. Open by Default (Startup Mode)
Everything is allowed unless explicitly denied. Fast, flexible, and risky. Works when the team is small, the stakes are low, and everyone can monitor agent behavior directly.

### 2. Closed by Default (Enterprise Mode)
Everything is denied unless explicitly allowed. Slow to set up, but predictable and auditable. Works when compliance matters, when agents handle sensitive data, and when failures are expensive.

### 3. Graduated (Growth Mode)
Agents start closed and earn permissions through demonstrated reliability. This is the most sophisticated approach and the one that scales best. It maps to how humans earn trust in organizations: new employees have limited access, and scope grows with demonstrated competence.

Claude Code uses a version of graduated permissions: the user starts by approving each action, then sets "always allow" rules for actions they trust. The permission surface grows organically from observed behavior, not from upfront configuration.

---

## For Implementers

When you deploy an agent for a client, the permission surface is one of the first things you design. It is tempting to skip this step and give the agent full access so it can "do its job." Resist that temptation.

**Start with the minimum viable permission surface.** What is the smallest set of capabilities the agent needs to accomplish its core task? Start there. Expand only when a real need emerges, not a hypothetical one.

**Apply the 2-of-3 rule as a structural check.** Can this agent see sensitive data AND execute code AND talk to the internet? If yes, redesign it. Split it into two agents with narrower scopes. This is not over-engineering. It is the difference between an agent that fails gracefully and one that fails catastrophically.

**Make permissions auditable.** The client should be able to look at a configuration file and understand exactly what the agent can and cannot do. If the permission model is too complex to explain in a paragraph, it is too complex.

**Document the "why" behind each deny rule.** "Never allow the agent to delete customer records" is a rule. "Because a false positive in our churn prediction model could trigger mass deletion, and we have no undo mechanism" is the intent behind the rule. Document both.

---

## Further Reading

- [Anatomy of a Harness](/disciplines/anatomy-of-a-harness): How Claude Code implements permission boundaries (Section 4)
- [Intent Engineering](/disciplines/intent-engineering): The discipline of encoding purpose into agent infrastructure
- [Harness Engineering](/disciplines/harness-engineering): The broader concept of code wrapped around a model
- [Jensen Huang on Lex Fridman](https://lexfridman.com/jensen-huang-transcript/): The interview where the 2-of-3 rule was articulated
