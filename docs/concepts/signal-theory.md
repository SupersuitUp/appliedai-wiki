---
title: Signal Theory
slug: /concepts/signal-theory
description: A communication discipline that treats every document, message, and brief as a signal engineered to produce action at the destination.
---

# Signal Theory

*A communication discipline that treats every document, message, and brief as a signal engineered to produce action at the destination, not merely received.*

---

Signal Theory is distilled from Roberto H. Luna's "Signal Theory: The Architecture of Optimal Intent Encoding in Communication Systems" (MIOSA Research, February 2026). It is the communication filter for any output produced inside an applied AI engagement.

## The Core Principle

Every act of communication follows the same architecture:

```
Intent -> Encoder -> [Channel + Noise] -> Decoder -> Destination -> Action
```

Communication fails when action does not happen at the destination. Signal Theory provides the diagnostic for why, and the framework for fixing it before you send.

**Root objective:** maximize Signal-to-Noise Ratio. Every communication decision is either raising the signal or adding noise.

## The Signal

A Signal is the fundamental unit of actionable communication. Not a message. Not a document. A unit of intent designed to produce action at the destination.

Every Signal is defined by 5 dimensions simultaneously:

| Dimension | Question | Examples |
|-----------|----------|----------|
| **Mode** | How is it perceived? | Linguistic, visual, auditory, gestural |
| **Genre** | What conventionalized form does it take? | Brief, proposal, runbook, email, CLAUDE.md, contract, pitch |
| **Type** | What does it *do*? | Direct (compels action), Inform (states facts), Commit (binds sender), Decide (changes state), Express (conveys attitude) |
| **Format** | What is the container? | Markdown, PDF, Google Doc, email, Slack, video |
| **Structure** | How is it organized internally? | The internal skeleton, what comes first, what follows |

**The formula:** S = (Mode, Genre, Type, Format, Structure)

A Signal is only as strong as its weakest dimension. You can have perfect genre and broken structure. You can have the right format and the wrong type. All five must be right for the Signal to produce action.

## The Four Governing Principles

These are the constraints that determine whether a Signal will be received correctly. When communication fails, one of these four is violated.

### Channel Capacity (Shannon)

Every channel has a maximum rate of reliable communication. Exceed it and the Signal degrades, not gradually but absolutely. More words, more channels, more complexity does not equal better communication. It equals noise.

*Diagnostic: is the channel adequate for this Signal? Is the volume of information within the capacity of this medium and this receiver?*

### Requisite Variety (Ashby)

Only variety can absorb variety. The Signal repertoire must match the complexity of the situation. Sending one genre to four receivers with four different contexts is a structural failure, not a content failure.

*Diagnostic: is the repertoire sufficient? Did you use the right genre for this specific receiver, not a generic signal sent to everyone?*

### Viable Architecture (Beer)

Any viable communication system requires five subsystems: Operations, Coordination, Control, Intelligence, Policy. Remove the coordination layer and receivers decode independently, producing divergent interpretations from identical signals. This is why a great brief still produces chaos at launch: the coordination layer was missing.

*Diagnostic: is the architecture complete? Is there a mechanism ensuring all receivers align their decoding?*

### Closed Feedback Loop (Wiener)

A system cannot self-correct without feedback. A broadcast with no confirmation path compounds encoding errors over time. The signal left the encoder. That tells you nothing about whether it was decoded correctly.

*Diagnostic: is the feedback loop closed? How will you know the Signal was decoded as intended, before it is too late to correct?*

## The Four-Question Diagnostic

Apply these four questions to every Signal before publishing. Any "no" identifies both the failure and the fix.

1. **Is the channel adequate?** Can this medium carry this message to this receiver without capacity failure?
2. **Is the repertoire sufficient?** Is this the right genre for this specific receiver's context?
3. **Is the architecture complete?** Is there a coordination mechanism ensuring aligned decoding?
4. **Is the feedback loop closed?** Will you know if it landed as intended?

## Key Failure Modes

| Failure | What It Looks Like | Principle Violated |
|---------|-------------------|-------------------|
| **Channel Overload** | 4,000-word email to a busy executive. Document too long for the context. | Shannon |
| **Genre Mismatch** | Sending a strategy doc when they needed a one-pager. Sending a one-pager when they needed a contract. | Ashby |
| **Variety Deficit** | One brief sent to marketing, sales, support, and engineering, each needing a different document. | Ashby |
| **Missing Coordination Layer** | Everyone received the brief but no one confirmed shared understanding before execution. | Beer |
| **Open Loop** | Sent the pitch. Heard nothing. No confirmation mechanism in place. | Wiener |
| **Wrong Type** | Wrote an Inform when you needed a Direct. Message states facts but does not compel action. | Signal definition |
| **Structure Failure** | Right content, wrong order. Lead buried. Action unclear. | Signal definition |
| **Herniation** | Signal bypasses architectural authority, going around decision-makers, skipping layers. | Beer |

## Application to Applied AI Work

Every output an implementer produces is a Signal. Here is how the framework maps to the most common artifacts:

### CLAUDE.md files and agent instructions

- **Genre:** operating instructions, configuration
- **Type:** Direct (compels agent behavior)
- **Diagnostic check:** is every instruction specific enough to produce consistent action? Vague instructions are noise.

### Strategy artifacts (proposals, briefs, plans)

- **Genre:** depends. Brief, proposal, plan, runbook, one-pager. Name it correctly and structure it accordingly.
- **Type:** usually Direct + Inform
- **Diagnostic check:** is this document written for this specific receiver, or is it a generic document being sent to multiple people with different contexts? If the latter, break it into multiple signals.

### Outreach (emails, DMs, intro messages)

- **Genre:** outreach, cold introduction
- **Type:** Direct (you want a response or meeting) packaged as Inform
- **Diagnostic check:** is the channel right? Seven lines max for senior receivers. Does the structure lead with the receiver's interest, not the sender's?

### Content (media, posts, clips)

- **Genre:** field notes, editorial, interview, recap
- **Type:** Inform + Express
- **Diagnostic check:** what action does this produce at the destination? If the answer is "I do not know," the signal is incomplete.

## The Path of Least Resistance

Optimal encoding converges on minimum effort through noise. The encoder's job is to remove every obstacle between intent and action at the destination. This means:

- Lead with what matters to the receiver, not the sender.
- Use the genre the receiver already knows how to decode.
- Make the required action explicit, not implied.
- Cut everything that does not contribute to the root objective.

Complexity in a Signal is almost always noise. The best brief is the shortest brief that produces the right action.

## Source

Roberto H. Luna, "Signal Theory: The Architecture of Optimal Intent Encoding in Communication Systems," MIOSA Research (miosa.ai), February 2026.

Integrates: Shannon (1948), Wiener (1948), Ashby (1956), Beer (1972), Bakhtin (1986), Searle (1976), Kress & van Leeuwen (2001).

## Further Reading

- [Teammate Discipline](/disciplines/teammate-discipline) for the operator hygiene that produces high-signal work
- [AI-Led Brand Interview](/playbooks/ai-led-brand-interview) for an applied protocol that lives or dies on signal quality
- Claude Shannon, "A Mathematical Theory of Communication" (1948), the foundational text behind Channel Capacity
