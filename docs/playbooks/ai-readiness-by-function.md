---
title: "AI readiness by business function"
slug: /playbooks/ai-readiness-by-function
description: "Which business functions are production-ready for AI today, which are close, and which to ignore."
---

# AI readiness by business function

*Not everything is ready for AI at the same time. Prioritize based on what actually works today, not hype cycles or vendor demos.*

---

## The readiness spectrum

### Ready now (deploy today)

**Back office and administration**

- Invoicing and billing automation
- Accounts receivable matching
- Expense categorization and reporting
- Calendar scheduling and coordination
- Document generation from templates
- Data entry and form processing

**Lead nurture and sales support**

- Email sequence personalization
- Lead scoring and qualification
- CRM data enrichment
- Follow-up scheduling and reminders
- Proposal generation from templates

**Content and knowledge work**

- Transcript processing and summarization
- Content repurposing across formats
- First-draft generation (blogs, social posts, emails)
- Research synthesis and briefing documents
- Translation and localization

**Text-based customer communication**

- Chat-based customer support
- FAQ and knowledge base responses
- Appointment booking via text/chat
- Order status inquiries
- Basic troubleshooting flows

### Almost there (prototype and monitor)

**Voice communication**

- Voice-based customer intake
- Phone-based appointment scheduling
- Voice agents for after-hours support
- Interactive voice response (IVR) replacement

Voice AI is very close. Text-based AI is production-ready. Voice has occasional latency, pronunciation, and turn-taking issues that are being resolved rapidly. Expect production-grade voice within 12 months.

**Complex content production**

- Full video editing pipelines (end-to-end)
- Live content moderation
- Real-time creative direction
- Multi-modal content generation (text + image + video coordinated)

**UX and interface**

- Conversational interfaces replacing traditional navigation
- Agent-based CRM (talk to your data instead of clicking through dashboards)
- Natural language business intelligence

> The mouse brought computers into mainstream. The next phase shift is that traditional UX disappears. You just have an agent you talk to. "What did we do in cash flow last month?" and it just answers.

### Not yet (watch and wait)

**Physical world operations**

- Humanoid robots for field service
- Autonomous equipment operation
- Physical inventory management without infrastructure
- Unstructured physical environments (each job site is different)

The skeleton key for the physical world is the generalized humanoid robot. The world is already built for human-shaped bodies (door handles, stairs, vehicles). Special-purpose robots for narrow tasks exist but haven't hit cost-effectiveness at scale. Expect meaningful deployment in 3 to 5 years.

## How to use this guide

1. **Start with "ready now."** Identify which categories apply to your business. Pick the one with the highest volume of repetitive work.
2. **Decompose it.** Use the [workflow decomposition](/playbooks/workflow-decomposition) playbook to map the specific actions.
3. **Automate the irreducible steps.** Build or buy solutions for the atomic actions.
4. **Monitor "almost there."** Set calendar reminders to re-evaluate every 90 days. The gap is closing fast.
5. **Ignore "not yet" for now.** Unless you're in R&D or have a long time horizon, don't invest here yet.

## The data behind this

Anthropic's [Economic Index](https://www.anthropic.com/economic-index) provides the most rigorous measurement of where AI is actually being used in the economy. Key findings:

- **Over one-third of occupations** have at least a quarter of their tasks touched by AI.
- AI is more often used for **augmentation** (human-in-the-loop) than full automation.
- Software development and technical writing see the highest AI usage; many occupations still see limited adoption.
- Broad AI adoption could raise labor productivity growth by **1 to 2 percentage points annually**.
- Usage is strongly correlated with education levels and national income: higher-education, higher-wage roles currently see larger productivity gains.

The Economic Index measures four key primitives:

- **AI Usage Index (AUI):** how much AI is used per worker across sectors.
- **Task Speedup:** how much faster tasks become with AI assistance.
- **AI Autonomy:** how much decision-making is delegated vs. collaborative.
- **Task Success:** how often AI actually completes tasks correctly.

These metrics confirm the pattern above: back-office and knowledge work tasks show the highest speedup and success rates, while physical and highly contextual tasks remain limited.

## The non-alarmist view

You don't need to panic. Humans plus better technology will always outperform humans with inferior technology. There will still be profitable businesses that use fax machines. The question isn't whether AI will eliminate your industry. It's whether your competitors will use it before you do.

The advantage isn't about replacing everyone. It's about being the business that does the same work faster, cheaper, and more consistently, starting with the functions that are ready right now.

## Further Reading

- [Why AI](/playbooks/why-ai). The case for getting started at all.
- [Workflow decomposition](/playbooks/workflow-decomposition). How to break a "ready now" category into atomic, automatable actions.
- [Quick check](/playbooks/business-owner-quick-check). Are you ready to scope a first project?
