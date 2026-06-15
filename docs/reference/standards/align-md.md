---
title: "ALIGN.md"
slug: /reference/standards/align-md
description: "An agent-readable file format for partnership alignment evaluation. Spec, writing guide, template, and worked example."
---

# ALIGN.md Specification v0.1

*A file format that teaches AI agents how to evaluate whether two organizations or people should work together. Both parties' agents read both ALIGN.md files and return an honest assessment.*

---

{/* last_updated: 2026-04-05 */}
{/* version: 0.1 */}

ALIGN.md is a file format for teaching AI agents how to evaluate alignment between organizations, people, or entities. Someone pastes your ALIGN.md into their agent and says "evaluate whether we should work together." The agent reads both parties' ALIGN.md files and returns an honest assessment.

## The Problem

Partnership evaluation is slow, biased, and expensive. The current process looks like this:

1. Someone sends a pitch deck. It's marketing, not truth.
2. You take calls. You read between the lines. You try to assess fit.
3. Months pass. You build trust, invest time, start collaborating.
4. Misalignment surfaces. Different values. Different goals. Different definitions of success.
5. The partnership ends or limps along. Time and trust are lost.

The problem isn't that people are dishonest. It's that the format (pitch decks, intro calls, LinkedIn profiles) rewards presenting the best version of yourself rather than the most accurate version. The uncomfortable truths that kill partnerships at month six never make it into the intro email.

The goal is simple: truncate the amount of time it takes before you know what the first pilot project to partner on is. When you meet someone you vibe with, you should know tactically how you can mutually benefit each other. Not in three months. Now.

ALIGN.md is not a replacement for human intuition. You're not going to send someone your ALIGN.md unless your intuition already says it's worth exploring. This just skips you to the step of: what exactly do you need help with? And if your agent can't answer that question, you haven't communicated to it who you are and what your priorities are. Most people don't even know what they want to do next. Most people don't know what's next for their company. Your agent should always know how it can be most helpful to you in getting to the next step of your journey. If it doesn't, you need to get clear on who you are and what you're building first.

## The Solution

A machine-readable document that honestly describes who you are, what you value, what you bring, what you look for, and what makes you walk away. Published at the org or person level. Designed for agents to read, compare, and evaluate.

ALIGN.md makes bilateral alignment checking possible. When both parties publish, their agents can cross-reference values, dealbreakers, and priorities before anyone takes a call. The goal isn't to replace human judgment. It's to make the initial filter faster and more honest.

## How It Differs from Other Agent Files

| File | Purpose | Audience |
|---|---|---|
| [CLAUDE.md](https://docs.anthropic.com/en/docs/claude-code/memory#claudemd-files) | How to behave in this repo | Agent working inside the repo |
| [AGENTS.md](https://openagents.com) | How to behave in this repo (multi-agent) | Agent working inside the repo |
| [SKILL.md](https://github.com/anthropics/claude-code/blob/main/docs/skills.md) | How to perform a capability | Agent executing a task |
| [INTEGRATE.md](/reference/standards/integrate-md) | How to wire this library into a codebase | Agent integrating a library |
| **ALIGN.md** | **Are we aligned? Should we work together?** | **Agent evaluating a potential partnership** |

The key difference: the other files are about what to do. ALIGN.md is about whether to do it together. It's relational, not technical.

- `CLAUDE.md` / `AGENTS.md` = how to behave here (internal)
- `INTEGRATE.md` = how to wire this in (technical)
- `SKILL.md` = how to do this thing (capability)
- `ALIGN.md` = are we aligned? (relational)

## Optional YAML Frontmatter

In addition to the `last_updated` HTML comment, ALIGN.md supports an optional YAML frontmatter header for machine-readable structured data. This is useful if you want agents to parse your file without guessing:

```markdown
---
title: "Your Organization Name"
last_updated: 2026-04-05
version: 0.1
entity_type: organization  # or: individual
key_priorities:
  - University partnerships
  - Certification program
dealbreakers:
  - Vendor lock-in requirements
  - Enterprise paywalls on foundational knowledge
---
```

This is entirely optional. The markdown sections are the canonical format. Frontmatter is a convenience layer for agents that prefer structured data.

## Required Metadata

Every ALIGN.md must start with a `last_updated` date. This is how agents know whether the file is current. An ALIGN.md without a date is untrustworthy. An ALIGN.md older than 6 months should be treated as stale.

```markdown
<!-- last_updated: 2026-04-05 -->
```

Place this as the first line of the file, before any content. Use ISO 8601 format (YYYY-MM-DD). Update it every time you change anything in the file, especially the Current Priorities section.

## Required Sections

Every ALIGN.md must include these sections, in this order.

### 1. Identity

Who you are. One paragraph. No marketing speak. State what your organization does, how long it's existed, what stage it's at. If you're a person, state your roles and affiliations.

Not a tagline. Not a mission statement. Just the facts of who you are right now.

### 2. Mission

What you're trying to accomplish. The North Star metric or goal. This should be concrete enough that someone could measure progress.

### 3. Values

Non-negotiable principles. Be specific, not generic. "We value integrity" is useless. "We will not partner with organizations that train AI on unconsented data" is useful.

Every value should be testable. If you can't imagine a scenario where it would cost you something, it's not a real value. It's a platitude.

### 4. Capabilities

What you bring to the table. Concrete, not aspirational. Only list what you can deliver today. If it's in development, say so.

### 5. Looking For

What kinds of alignment you seek. Partner archetypes, collaboration types, specific needs. Be specific about what a good partner looks like so agents can match efficiently.

### 6. Dealbreakers

What makes you walk away. Be explicit. This is the most important section in the entire file.

The test: if something would kill a partnership six months in, put it here now. Don't soften it. Don't frame it diplomatically. State it plainly. The whole point of ALIGN.md is to surface these before anyone invests time.

### 7. Current Priorities

What you're focused on right now. This section is temporal and should be updated quarterly. It tells potential partners what's on your plate and where collaboration would have the most impact.

### 8. How to Engage

The first step. Be specific about how someone should reach out and what happens next. If the reader is an agent, it should know the exact procedure. If a human, they should know what to send and where to send it.

#### What If They Don't Have an ALIGN.md?

This will be the normal case for a while. Most people you evaluate won't have published one yet. That's fine. Your agent should prompt you with the key questions from your ALIGN.md, including dealbreakers, what you're looking for, and what matters right now, and help you evaluate them manually. The spec makes the process explicit even when the counterparty hasn't adopted it.

If you want to encourage them to publish one, send them a link to this spec. ALIGN.md adoption spreads through bilateral evaluation: someone receives your ALIGN.md, reads it, realizes it's useful, and publishes their own.

## Optional Sections

These are useful but not required.

### Core Values

For organizations or individuals operating with deeply held convictions. Include the ones that would affect partnership decisions. Many organizations and leaders operate from frameworks that shape their priorities and boundaries. Making these explicit prevents misunderstanding later.

### Network

Key relationships and communities you're part of. This helps agents identify shared connections and community overlap.

### References

Links to deeper context. Other ALIGN.md files, public documentation, relevant websites.

## The Union Principle

A person's ALIGN.md is a synthesis of their organizations' ALIGN.md files.

If someone runs an education nonprofit, co-founded a software company, and chairs a civic coalition, their personal ALIGN.md references all three. Someone evaluating "should we work with this person?" gets the full picture: the educational mission, the technical capabilities, and the civic framework that shapes their decisions.

This means a person's ALIGN.md will often be longer and more nuanced than any single organization's. That's correct. People are more complex than orgs. The union principle captures that complexity honestly.

When writing a personal ALIGN.md:

- Synthesize, don't copy-paste. The personal file should read as a coherent whole, not a list of org descriptions.
- Surface tensions. If your orgs have different priorities, say so. That's useful information for a potential partner.
- Declare which hats you're wearing. "For company X partnerships, email A. For other collaborations, email B."

## Privacy Tiers

Not everything belongs in a public ALIGN.md. Some strategic information (specific pipeline targets, proprietary partnership criteria, internal scoring rubrics) would give away your playbook if published. The spec supports two tiers:

**Public ALIGN.md** lives at your website root (`/ALIGN.md`). This is what agents and strangers fetch. It should contain your identity, mission, values, general capabilities, what you're looking for, dealbreakers, and how to engage. Think of it as what you'd say on stage if someone asked "what are you about and who should work with you?"

**Private ALIGN.md** lives in your internal docs, your agent's context, or shared on request. This is where you put specific partnership targets, scoring rubrics, internal evaluation criteria, names of people you're actively pursuing, and strategic priorities you don't want competitors to see.

The public file is the handshake. The private file is the strategy. Both follow the same format. The public file links to the spec. The private file never gets published.

When someone sends you their ALIGN.md, your agent reads it against your private file (the full evaluation criteria), not just the public one. This means your public ALIGN.md can be honest about values and dealbreakers without telegraphing your specific moves.

## Where It Lives

In a repo: `ALIGN.md` at the root. This is where agents and developers find it on GitHub.

On a website: `/ALIGN.md` at the root. This is where agents fetching public information find it.

Both is ideal. The repo file is the source of truth. The website file is a distribution channel.

## Design Principles

**Honesty over marketing.** Include the uncomfortable stuff. The dealbreakers, the deep convictions, the things that make some partners a bad fit. If your ALIGN.md reads like a pitch deck, you've missed the point.

**Specificity over platitudes.** "We value diversity" tells an agent nothing. "We require that partner organizations have published DEI commitments with measurable goals" tells it exactly what to check. Concrete examples, not generic values.

**Currency over permanence.** Update quarterly, especially Current Priorities. An ALIGN.md from two years ago is worse than no ALIGN.md. The temporal sections are what make bilateral evaluation useful in real time.

**Machine-readability.** Clean markdown, clear headers, bullet points. Agents parse structure better than prose. Keep sections distinct. Don't bury dealbreakers in paragraph form inside the Values section.

**Bilateral by design.** ALIGN.md works when one party publishes. It works dramatically better when both do. The format is designed so two agents can cross-reference sections: your Dealbreakers against their Values, your Looking For against their Capabilities, your Mission against their Mission. Encourage partners to publish their own.

## Write Your Own ALIGN.md

Copy this into your AI coding agent. It will read the spec, study the example, and draft an ALIGN.md for you.

````markdown
# Write an ALIGN.md for This Organization

Before writing anything, read the ALIGN.md spec, writing guide, and
reference example.

Now interview me about my organization. Ask about identity, mission, values,
capabilities, what I'm looking for, dealbreakers, and current priorities.

Then create an `ALIGN.md` at the repo root following the spec you just read.
Focus on honesty and specificity. Push me on the Dealbreakers section.
````

## Evaluate a Potential Partner

Copy this into your agent when someone sends you their ALIGN.md (or any partnership document). It will cross-reference against yours and return a structured assessment.

````markdown
# Evaluate Alignment with a Potential Partner

Read my ALIGN.md (pasted below or at [your ALIGN.md URL]).

Now read the potential partner's document (pasted below or at [their URL]).

Cross-reference these sections:
1. Their Values against my Dealbreakers (any triggers?)
2. My Values against their Dealbreakers (any triggers?)
3. Their Capabilities against my Looking For (what matches?)
4. My Capabilities against their Looking For (what matches?)
5. Their Mission against my Mission (complementary or competing?)
6. Their Current Priorities against mine (timing alignment?)

Output:
- Dealbreakers triggered (if any): stop here
- Alignment score (1-10): 1 means no overlap, 10 means near-perfect fit
- Top 3 alignment points (strongest overlaps)
- Top 3 gaps or risks
- Suggested first pilot project (based on the intersection of their
  capabilities and my current priorities)
- Recommendation: Pursue / Explore / Pass
````

## Standard Footer

Every ALIGN.md should end with a link back to a spec reference. This is how the standard spreads: someone's agent fetches your ALIGN.md, sees the spec link, and now their human knows the concept exists.

## Version Note

This is v0.1. It's intentionally minimal. The spec was published based on real partnership evaluation work where misalignment surfaced late and cost real time. As more organizations publish ALIGN.md files, the spec will evolve based on real usage patterns.

## Writing guide

Practical advice for authoring an effective ALIGN.md. The spec above defines the format. This section helps you write one that's honest, specific, and useful.

### Start from the Dealbreakers

Write your Dealbreakers section first. What would kill a partnership six months in? What has killed partnerships in the past? What do you know about yourself that you usually don't say out loud until trust is built?

Work backwards from there. Every other section should support or contextualize the Dealbreakers. If your Values section doesn't explain why something is a dealbreaker, one of them is wrong.

This is counterintuitive. Most people want to start with Identity or Mission because those feel positive and energizing. But the Dealbreakers section is where the real value of ALIGN.md lives. It's the section that saves everyone time.

### Section-by-Section Guide

**Identity.** One paragraph. Facts, not framing. State what you do, how long you've been doing it, and what stage you're at.

Bad:
```markdown
We are a revolutionary AI education platform transforming the future of learning.
```

Good:
```markdown
Maker collective and educational organization making the world applied AI
literate. Founded in 2025. Pre-revenue, community-funded. Based in
Austin, TX.
```

The bad version is marketing. The good version is information. An agent evaluating alignment needs information.

**Mission.** State the goal in terms that could be measured. If your mission statement could belong to any organization in your space, it's too generic.

Bad:
```markdown
Our mission is to empower individuals through AI education.
```

Good:
```markdown
Make the world applied AI literate. North Star: number of people certified who
can demonstrate applied AI competence in their domain.
```

The North Star metric is optional but valuable. It tells a potential partner what you're actually optimizing for.

**Values.** Each value should have a cost. If living this value never requires you to say no to something attractive, it's not a real value. It's a talking point.

Bad:
```markdown
- We value innovation
- We believe in collaboration
- We prioritize excellence
```

Good:
```markdown
- Sovereignty over convenience. We will not build systems that create
  dependency on any single vendor, including us.
- Signal over noise. We'd rather publish one useful thing than ten
  impressive-sounding things. This means we say no to most content
  opportunities.
```

Test each value: "Can I name a specific time this cost us something?" If yes, it's real. If no, rewrite it.

**Capabilities.** List what you can deliver today. Separate current capabilities from things in development. An agent evaluating "can this partner deliver what we need?" needs to know the difference.

Bad version reads like a brochure for any AI education company. Good version describes exactly one organization and exactly what it can do right now.

**Looking For.** Describe partner archetypes, not generic relationship types. "Strategic partners" is meaningless. "University departments that want to co-develop applied AI curriculum" is an archetype an agent can match against.

**Dealbreakers.** This is the hardest section to write and the most important. Most people instinctively soften their dealbreakers because stating them feels confrontational. Resist that instinct.

**The 6 Months Test:** Think about every partnership, collaboration, or relationship that went wrong. What went wrong? When did you first notice? Could you have known earlier if you'd asked directly? Those answers are your dealbreakers.

Tips for writing dealbreakers:

- **Be specific about the behavior, not the character.** "Dishonest people" is a character judgment. "Organizations that misrepresent their AI capabilities to clients" is a behavior you can observe.
- **Include structural dealbreakers.** Some misalignment isn't about values. It's about structure. "Partners who require 90-day payment terms" is structural. "Organizations without a technical co-founder" is structural. These matter.
- **Include the ones that feel awkward to state.** If you have deep convictions that affect partnership decisions, say so. If you won't work with certain industries, say so. If you have strong opinions about specific technologies or business models, say so. The point of this section is to be upfront about the things that usually stay unsaid until they cause problems.
- **Update this section when partnerships fail.** Every failed partnership teaches you a new dealbreaker. Add it.

**Current Priorities.** This is the only section that should change frequently. Update it quarterly. Include what you're focused on, what you're not focused on, and what would make a new partnership especially timely.

The date in the header matters. An agent reading this in Q4 should know it's stale. The "NOT currently focused on" items prevent wasted outreach.

**How to Engage.** Make the first step obvious. Don't send people to a generic contact page. Give them the specific channel, form, or workflow that reaches the right person.

The most powerful line in this section: tell potential partners that publishing their own ALIGN.md is the best way to get a serious conversation.

### Common Mistakes

**Making It a Pitch Deck.** If your ALIGN.md reads like it was written to impress, start over. The audience is an agent evaluating fit, not an investor evaluating upside. Include the things that would make some partners say "this isn't for us." That's the point.

**Omitting Dealbreakers.** The most common mistake. People leave out dealbreakers because stating them feels aggressive or limiting. But unstated dealbreakers don't disappear. They just surface later, after time and trust are invested. Every dealbreaker you omit is a future conversation you're postponing.

**Being Too Generic.** If you replaced your organization's name with a competitor's and the ALIGN.md still made sense, it's too generic. Every section should contain information specific to you. Values like "integrity" and "excellence" tell an agent nothing because every organization claims them.

**Not Updating Current Priorities.** An ALIGN.md with outdated Current Priorities is actively misleading. Partners will reach out about things you're no longer focused on. If you can't commit to quarterly updates, omit the section entirely rather than leaving stale information.

**Writing for Humans Instead of Agents.** ALIGN.md is designed for agents to parse. This means: clear headers, bullet points, short sentences, concrete language. Don't write flowing prose that requires interpretation. Don't embed important information in the middle of paragraphs. Structure everything so an agent can extract and compare it section by section.

### Keeping It Current

Set a quarterly reminder to review your ALIGN.md. The review process:

1. **Current Priorities.** Update the quarter, add new focuses, remove completed ones.
2. **Capabilities.** Did you ship something new? Move items from "in development" to the main list.
3. **Dealbreakers.** Did a partnership fail? Add the lesson.
4. **Looking For.** Have your needs changed? Update the archetypes.
5. **Values.** These should change rarely. If they're changing quarterly, they weren't values.

The identity, mission, and values sections should be stable. If you're rewriting them every quarter, the problem isn't ALIGN.md. The problem is that you haven't clarified those things for yourself yet.

### Checklist Before Publishing

- Does the Dealbreakers section include at least 3 specific, testable items?
- Does every value have a cost (something you'd say no to)?
- Does Capabilities separate current from in-development?
- Does Current Priorities include the quarter and year?
- Is it free of marketing language, superlatives, and pitch-deck energy?
- Would you be comfortable if your most skeptical potential partner read it?
- Can an agent cross-reference your sections against another ALIGN.md?

## Template

A blank ALIGN.md template to copy into your own repo.

```markdown
<!-- last_updated: YYYY-MM-DD -->
<!-- version: 0.1 -->

# [Organization Name] ALIGN.md

## Identity

[One paragraph. No marketing speak. What you are, how long you've existed, what stage you're at.]

## Mission

[Your North Star metric or goal. Concrete enough to measure progress.]

## Values

[Testable, non-negotiable principles. Every value should have a scenario where it would cost you something to uphold. If not, it's not a real value.]

- [Value 1]
- [Value 2]
- [Value 3]

## Capabilities

[What you bring to the table today. Only list what you can deliver now. Mark anything still in development.]

- [Capability 1]
- [Capability 2]
- In development: [future capability]

## Looking For

[What kinds of alignment you seek. Partner archetypes, collaboration types, specific needs.]

- [Looking for type 1]
- [Looking for type 2]
- [Looking for type 3]

## Dealbreakers

[What makes you walk away. Be explicit. If it would kill a partnership at month six, put it here now.]

- [Dealbreaker 1]
- [Dealbreaker 2]
- [Dealbreaker 3]

## Current Priorities ([Quarter Year])

[What you're focused on right now. Update quarterly. Tells partners where collaboration has the most impact.]

- [Priority 1]
- [Priority 2]
- [Priority 3]

## How to Engage

[The first step. Be specific. Don't make people guess.]

- **Email:** [email] with subject "ALIGN check"
- **Other:** [DM, form, etc.]
- **If you publish an ALIGN.md:** Include the link. We will run bilateral evaluation.
```

## Example

A fictional ALIGN.md for a person who operates across multiple organizations. Demonstrates the [Union Principle](#the-union-principle): synthesizing multiple org-level alignments into one coherent personal file.

Notice what makes this effective: specific dealbreakers (not platitudes), concrete capabilities (not aspirational ones), a clear hierarchy of commitments, and the "NOT currently focused on" line that prevents wasted outreach. This is not a resume. It is a compatibility document.

```markdown
<!-- last_updated: 2026-04-01 -->

# Identity

Maya Torres. Founder of Rootstock Education (open source STEM curriculum for
community colleges), co-founder of Verdant Labs with James Okafor (local-first
software tools for small businesses), and board chair at Mountain West Open Source Coalition in
Denver, CO.

These are the same mission from different angles: making sure working people
own their tools, their skills, and their futures. The economy is splitting and
most people don't have a guide.

# Mission

Make STEM education accessible and sovereign through Rootstock. Build software
that small businesses own outright through Verdant. Serve the regional open source
community as a board chair and mentor through Mountain West Open Source Coalition.

The North Star across all of these: number of people who move from dependent
on systems they don't understand to fluent operators of the tools shaping
their lives. Depth over scale. One transformed community over a thousand
newsletter subscribers.

# Values

- Ownership over subscription. I will not build tools that require ongoing
  payment to access your own data. If you stop paying us, your data and
  workflows stay with you. This is non-negotiable for Verdant products.

- Teach to fish, not to depend. Rootstock curriculum is designed so that
  after completing a course, the student doesn't need us anymore. We measure
  success by graduation, not retention.

- Open source by default. Rootstock curriculum, lesson plans, and assessment
  rubrics are public. Anyone can fork, translate, and adapt. No permission
  needed.

- Quality over quantity. I say no to most partnerships, speaking requests,
  and grant applications. If it doesn't compound, it's a distraction.

- Mission shapes everything. Every major decision runs
  through reflection and discernment before strategy. Partners don't need to
  share this, but they should know it influences timelines and priorities.

# Core Values

This work runs on a deep, non-negotiable mission orientation that shapes every major decision.

Practically, this means:
- One full day a week is offline. I don't take meetings, reply to emails, or ship code
  on that day.
- I direct 10% of all revenue (personal and organizational) to charitable causes
  before expenses.
- If a partnership conflicts with my convictions, I walk away regardless of
  the financial implications.
- "I'm not aligned on this yet" is a real answer and I will use it.

# Capabilities

What I can deliver today:

Rootstock Education:
- 12-module open source STEM curriculum designed for community colleges
- Instructor training program (47 certified instructors across 8 states)
- Assessment framework with competency-based credentialing
- Partnerships with 3 community college systems (Colorado, New Mexico, Oregon)

Verdant Labs (with James Okafor):
- Local-first business tools (invoicing, inventory, scheduling) that run
  on the owner's hardware
- Data migration services from cloud platforms to self-hosted
- Small business tech literacy workshops (monthly, Denver metro)

Personal:
- Curriculum design for technical education
- Community organizing in education and open source spaces
- Network of educators, small business owners, and civic leaders in the
  Mountain West

In development: Rootstock certification recognized by state workforce boards.
Verdant mobile app for offline-first inventory management.

# Looking For

Rootstock partnerships:
- Community colleges that want to pilot or adopt the STEM curriculum
- State workforce development boards interested in competency-based credentials
- Other open source education projects for cross-pollination (not competition)
- Donors who fund without strings (no curriculum control, no branding requirements)

Verdant collaborations:
- Small business associations that want to offer tech sovereignty workshops
- Open source developers interested in local-first architecture
- Hardware partners for affordable self-hosted business servers

Personal:
- People who build for communities, not for exits
- Mentors and peers in the open source + civic technology intersection
- Patient capital, not venture capital

# Dealbreakers

These are non-negotiable. If any apply, we are not a fit.

- Vendor lock-in by design. If your business model depends on making it hard
  for customers to leave, we disagree about what software is for.

- Curriculum control. If you fund Rootstock, you do not get editorial control
  over what we teach. Full stop. We've walked away from six-figure grants
  over this.

- Extraction disguised as partnership. If the structure means we do the work
  in communities and you get the case study, that's not partnership. Both
  sides contribute, both sides benefit.

- Growth-at-all-costs mentality. If your first question is "how does this
  scale?" instead of "does this actually work?", we're operating from
  different assumptions.

- Disrespect for boundaries. You don't need to share my convictions. But if you're
  uncomfortable that I hold deep deliberation before board meetings or that my one-day-offline practice
  is non-negotiable, we won't work well together.

# Current Priorities (Q2 2026)

- Rootstock v2.0 curriculum release (adding AI literacy modules)
- First state workforce board credential recognition (Colorado)
- Verdant mobile app beta for offline inventory
- Hiring a part-time community manager for instructor support

NOT currently focused on: K-12 education, international expansion, venture
fundraising, consumer apps, social media growth.

# How to Engage

Email maya@rootstocked.org or DM on LinkedIn.

If you publish an ALIGN.md, send it along. Bilateral evaluation is the fastest
path to a real conversation.

For Verdant-specific collaborations: reach out to both Maya and James.
```

### What Makes This Example Effective

**The Conviction Disclosure.** The Core Values section states plainly: "This work runs on a deep, non-negotiable mission orientation that shapes every major decision." It doesn't apologize. It doesn't minimize. It doesn't over-explain. It states the fact and then explains the practical implications.

A partner who reads this knows exactly what they're working with. They can decide whether that's compatible before anyone takes a call. No surprises at month three.

**The Dealbreakers.** Five specific, testable dealbreakers. Not "we prefer aligned partners" but "we have walked away from six-figure grants over curriculum control." An agent can check whether a potential partner triggers any of these.

**The Union Principle in Action.** The file synthesizes three organizations into one coherent identity. The Identity section shows how they connect. The Capabilities section separates them clearly. The Dealbreakers apply across all of them.

**The "NOT Currently Focused On" Line.** Prevents wasted outreach. If you're a K-12 edtech company or a VC, the ALIGN.md tells you upfront: not right now. This saves everyone time.

**Concrete Over Aspirational.** "47 certified instructors across 8 states" instead of "growing network of educators." "3 community college systems" instead of "partnerships with higher education institutions." Specificity lets an agent assess fit. Vagueness wastes tokens.

## Further Reading

- [INTEGRATE.md](/reference/standards/integrate-md): The companion spec for wiring one system into another
- [Standards](/reference/standards): The index page for both formats
