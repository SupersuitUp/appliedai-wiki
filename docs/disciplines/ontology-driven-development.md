---
title: "Ontology-Driven Development"
slug: /disciplines/ontology-driven-development
description: "Build software around the canonical model of your domain, in the language of the business, so both human operators and AI agents can reason in the same terms."
---

# Ontology-Driven Development

*Build software around the canonical model of your domain, in the language of the business, so that both human operators and AI agents can reason in the same terms. The development methodology that turns the [substrate](/disciplines/ontology-as-substrate) into compounding software.*

---

## The Integration Problem

The software industry has spent twenty years getting very good at building components and very bad at integrating them. Every category of business software has a winner. Every winner ships a clean API, a documented schema, a public roadmap. The pieces, in isolation, have never been better.

The result inside an actual organization is a fragmented architecture. Sales lives in one tool, finance in another, ops in a third, customer support in a fourth, the marketing stack in a fifth, internal documents in a sixth. Each tool has its own data model, its own vocabulary for the same underlying business object, its own permissioning, its own audit trail. The components shine. The system as a whole grinds.

The Palantir engineering team named this gap directly in [their 2024 essay on Ontology-Oriented Software Development](https://blog.palantir.com/ontology-oriented-software-development-68d7353fdb12):

> "We've lost the plot by tricking ourselves into believing that because it's easier to build individual parts, someone else must be able to assemble them into something worthwhile. The resulting software architecture is optimized to produce returns for venture capitalists, not to achieve outcomes for customers."

The economic point is sharper than it sounds. The software-industrial complex rewards modular component vendors and penalizes integrators. Investors fund the components. Buyers pay for the components. Almost nobody is funded to do the unsexy connective work that makes the components add up to a working enterprise. So that work does not happen, and every organization quietly carries the cost.

Ontology-Driven Development is the discipline that closes the gap on the customer side. The argument: stop optimizing each component in isolation. Build a canonical model of your business, then write your software in the language of that model rather than in the language of the tools underneath it.

## The Lineage

Ontology-Driven Development is not a new idea. It is the AI-era refresh of **Domain-Driven Design** (DDD), the methodology Eric Evans laid out in [his 2003 book](https://www.domainlanguage.com/ddd/) of the same name. DDD's central claim was that complex software succeeds when its code reflects the domain it serves: when the names in your code match the words the business uses, when the boundaries in your modules match the boundaries in the actual operation, when the model is the source of truth and the implementation orbits around it.

DDD was a software-engineering claim. Two decades later, AI agents have made the same claim load-bearing for a new reason: the agents are now reading the code, calling the APIs, and acting on the model. A codebase that did not respect the domain was painful for human developers. A codebase that does not respect the domain is unworkable for an AI agent. The agent has no way to bridge the gap between the API call it can make and the business outcome you actually want.

Palantir's contribution was to take DDD and operationalize it at the enterprise scale, with a name that captures the AI moment: the [Ontology](/disciplines/ontology-as-substrate) is the canonical model, the OSDK (Ontology Software Development Kit) is the toolkit that lets developers write code against it, and Ontology-Oriented Development is the methodology that ties the two together.

The same methodology applies at every scale, from a single agent workspace up to a multinational enterprise. "Driven" carries the agency of the discipline more cleanly than "oriented."

## What Ontology-Driven Code Actually Looks Like

The clearest way to see the methodology is to compare the same business operation written two ways. Palantir's essay does this directly with an airline maintenance scheduler. The pre-ontology version is roughly two hundred lines of glue: database connections, authentication tokens, raw SQL, REST endpoints, email transports, JSON shaping. The actual scheduling logic is buried inside the plumbing.

The ontology-driven version of the same function reads like business prose:

```typescript
const schedule = await aircraft.getSchedule();
const flightToSwap = await schedule.getNextFlight();

const targetAirports = await OntologyClient.search()
  .airports()
  .filter(a => a.inventory.containsAll(parts))
  .all();

const swappableFlights = await flightToSwap.getDepartureAirport()
  .scheduledFlights()
  .filter(f => f.aircraft.airframe.exactMatch(aircraft.airframe))
  .filter(f => f.destination.isOneOf(targetAirports))
  .orderBy(f => f.departureTime.asc())
  .all();

const swapOptions = await OntologyClient.calculateOptimalSwaps(flightToSwap, swappableFlights);
```

The plumbing did not disappear. It moved into the ontology layer, where the domain model centralizes how every component is read, written, and reasoned about. The application code now talks about Aircraft, Flights, Airports, and Inventory. Those are the words a maintenance manager uses out loud. They are also the words an AI agent can reliably reason about, because the ontology has explicitly defined what each one means and what operations are allowed on it.

Two consequences of this shift matter for everyone outside the airline-scheduling example:

**Code becomes legible to its operators.** A developer reading the ontology-driven version can follow the logic without learning the API of every underlying system. So can a non-developer who understands the domain. So can an AI agent the team trusts with progressively more autonomy.

**The integration cost is paid once.** The mapping from "how the inventory database represents an airport" to "the canonical Airport object every application uses" lives in the ontology. The next application built in the same organization inherits all that integration work for free. The economic argument from Palantir is that this is where the missing integration leverage actually compounds.

## Why AI Sharpens The Stakes

The reason Ontology-Driven Development is having a moment in 2026 is that AI agents are now full participants in the software stack, and they participate at the API layer, not the GUI layer.

Palantir's framing is exact:

> "AI systems are more like applications than they are like users. They interact directly with APIs."

A human operator can paper over a fragmented enterprise with judgment, working memory, tribal knowledge, and the willingness to copy and paste between five tabs. An AI agent cannot. The agent reads the API surface, finds inconsistent vocabulary across systems, encounters ambiguous data models, and either gives up or hallucinates a bridge that does not exist. The fragmentation that has been quietly costing your organization for twenty years suddenly costs you the entire AI rollout.

Most organizations are running pilots of agentic systems on top of a software estate that was never designed to be reasoned over by a single mind. The pilots underperform. The conclusion in the C-suite is that AI is not ready. The actual conclusion is that the substrate is not ready, and the substrate problem has been visible since the first time a new hire said "wait, why does our finance team call this a job and our ops team call this a project."

Closing the substrate gap is the work. Ontology-Driven Development is the methodology by which that work gets done.

## The Personal-Scale Version

Most practitioners do not have an enterprise IT estate to refactor. The methodology still applies, just one scale down.

A personal agent workspace is an ontology-driven application. The dossiers in `people/`, the strategic documents in `artifacts/`, the meeting transcripts in `meeting-transcripts/`, the workflows captured in skill files: each one is a typed object in your personal ontology. When you ask your agent to "draft a follow-up to Sarah after our last meeting," the agent is doing the same thing the airline scheduler is doing in the Palantir example, with a smaller surface area: querying typed objects in a canonical model and reasoning at the level of the business, which in this case is your life.

The implication is that the architectural decisions that look enterprise-scale in Palantir's essay are personal-scale decisions for anyone building their own system. Naming files consistently. Picking one set of frontmatter conventions. Refusing to let three different folders carry three different versions of the same person. Each move is a small act of Ontology-Driven Development at the scale of one human, and each one compounds the same way the enterprise version does.

## The Business-Scale Version

At the company level, the ontology-driven methodology shows up as a single canonical layer that defragments customer data, financial data, operational data, and team knowledge into one model the agents can reason over. The consolidation from "fifteen SaaS products with fifteen logins and fifteen siloed datasets" into one intelligence hub is Ontology-Driven Development for the company-level case.

The architectural commitments are the same as the personal-scale version. One canonical model. Components mapped into it once. Code, queries, and agent prompts that read in the language of the business. The maintenance discipline is knowledge management: keeping the model aligned with reality as the operation evolves. The economic compound is the refactorability that comes from a centralized model that survives every component swap underneath it.

## How To Start

The methodology is iterative at every scale. The same five moves, scaled to the size of the system you operate.

1. **List the operators.** Every person, role, or agent that interacts with the system. Each one carries a vocabulary. Surface them.
2. **Find the canonical objects.** The shared concepts every operator means under different surface words. Person, Project, Engagement, Order, Conversation.
3. **Lock the schema before you build on it.** Once business logic depends on the ontology, every change is expensive. Take the time to get the canonical fields right before you wire up the first downstream consumer.
4. **Move integration into the ontology, not the application.** When a component needs to talk to your model, write the translation in the ontology layer. The application code stays in the language of the business.
5. **Maintain the model as living truth.** The ontology rots the moment your real operation diverges from it. Treat the maintenance as knowledge management, a first-class operational discipline, not a side project.

The smallest version of this is one person committing to one canonical naming convention for their `people/` files and refusing to drift. The largest version is a multinational platform team rebuilding the company on top of an ontology layer. The methodology is the same.

## Why This Matters For Applied AI

Most of the practical work an applied AI practitioner does for a client, after the initial setup, is Ontology-Driven Development by another name. Auditing the language the team uses. Picking canonical objects. Mapping the existing tools into a shared model. Wiring the agentic harness against that model rather than against any individual tool. The deliverable looks like a working agentic workflow. The actual deliverable is the ontology underneath it, which is what makes the workflow survive the next quarter, the next tool migration, and the next round of model upgrades.

If you are building any system in 2026 that will be operated in part by AI, the ontology layer is the part that determines whether the system compounds or collapses. The methodology of building that layer with intention is Ontology-Driven Development.

## Further Reading

- [Ontology As Substrate](/disciplines/ontology-as-substrate): The architectural cousin to this methodology. Why an ontology is the foundation that makes AI implementations reliable.
- [Spec Writing](/disciplines/spec-writing): The discipline that turns intent into a contract the model can follow.
- [Harness Engineering](/disciplines/harness-engineering): The runtime that operates on the ontology.
- [Palantir Blog: Ontology-Oriented Software Development](https://blog.palantir.com/ontology-oriented-software-development-68d7353fdb12): The Peter Wilczynski essay this concept builds on.
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/) (Eric Evans, 2003): The foundational lineage.
