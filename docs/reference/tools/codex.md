---
title: "Codex"
slug: /reference/tools/codex
description: "OpenAI's terminal coding agent. ChatGPT-subscription billing, GPT-5-Codex under the hood, the strongest case for clients already standardized on OpenAI."
---

# Codex

*OpenAI's terminal coding agent. ChatGPT-subscription billing, GPT-5-Codex under the hood, the strongest case for clients already standardized on OpenAI.*

---

## What it is

Codex is OpenAI's CLI agent for coding and workspace tasks. It reads files, runs commands, calls tools, and operates as a persistent harness across sessions. The installation is `npm install -g @openai/codex` (or the macOS app installer). The model is GPT-5-Codex, OpenAI's coding-specialized variant of GPT-5.

For implementation work inside a leader's organization, Codex is the right harness pick when the principal or the engineering team is already on a ChatGPT Plus / Pro / Team subscription, when the rest of the stack is OpenAI-leaning, or when the operator has a strong preference for OpenAI as the model vendor. It is comparable to Claude Code in most agentic capabilities; the meaningful differences are billing, model temperament, and ecosystem.

## What it costs

- **ChatGPT Plus:** $20/month. Includes Codex CLI access with daily limits suitable for individual use.
- **ChatGPT Pro:** $200/month. Significantly higher Codex usage limits; suitable for heavy daily implementation work.
- **ChatGPT Business / Enterprise:** per-seat pricing. Codex is included; usage limits scale with the plan.
- **API access:** pay-per-token if Codex is invoked programmatically rather than through the CLI subscription.

If the leader's organization is on ChatGPT Business or Enterprise already, Codex is effectively free as an extension of that contract, which is a real cost advantage over standing up a separate AI tooling line item.

## When to use it (and when not)

**Use Codex when:**

- The leader or the engineering team is already on a ChatGPT subscription. Adding Codex is a checkbox, not a procurement cycle.
- The implementation is mostly coding-heavy and benefits from a coding-specialized model.
- The organization has standardized on OpenAI as the model vendor for compliance, vendor consolidation, or familiarity reasons.
- The implementer prefers GPT-5's response style over Claude's.

**When not:**

- The leader has hard data-residency or vendor-isolation requirements that exclude OpenAI. Use a different harness.
- The work is heavily document-shaped (writing, contracts, strategy artifacts) rather than coding-shaped. Claude Code's instruction-following on long-form work is generally stronger.
- The implementer needs the longest available context window for a single task. Check both vendors' current context limits before committing.

## Codex versus Claude Code: the decision framework

In most engagements, both Codex and Claude Code can do the work. The choice is about fit, not capability. Use this filter:

1. **What subscription does the leader already pay for?** Almost always pick the harness that matches the existing subscription. Adding a second AI vendor is a procurement and security review the engagement does not need.
2. **What does the engineering team prefer?** A team that already knows one harness will move faster on it. Switching costs are real.
3. **What is the work shape?** Heavy code editing leans Codex (coding-specialized model). Heavy document work leans Claude Code. Both do both, but the edge cases matter at scale.

If none of the three is decisive, default to Claude Code for new implementations and Codex for organizations already standardized on OpenAI.

## Setup pointer

Official documentation: [developers.openai.com/codex](https://developers.openai.com/codex/cli/).

CLI install:

```
npm install -g @openai/codex
codex login
```

A `.codex/` directory in the workspace serves as the persistent instruction layer, comparable to Claude Code's `CLAUDE.md`. See Codex Setup for the workspace setup procedure.

We do not duplicate installation steps here. The tool's own docs are the source of truth.

## Further Reading

- [Claude Code](/reference/tools/claude-code): the most direct comparison.
- [Harness Engineering](/disciplines/harness-engineering): the discipline upstream of harness selection.
