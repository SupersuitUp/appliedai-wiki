---
title: "Onboarding Belongs in a Repo That Holds Your State"
description: "The friction in adopting new AI infrastructure is that nobody holds your state between sessions. Ship the onboarding as a project the developer clones, which tracks real integration instead of lessons read."
image: "/img/comics/onboarding-belongs-in-a-repo-that-holds-your-state.webp"
---

# Onboarding Belongs in a Repo That Holds Your State

*The friction in adopting new infrastructure is rarely missing documentation. It is that nobody holds your state between sessions. The onboarding artifact should be a project the developer clones, which knows where they stopped and what they have actually integrated.*

---

## The stall happens before the first line of code

Watch a capable engineer meet a genuinely new piece of infrastructure, a hosted agent runtime being the current example, and the failure is not comprehension. They read the quickstart and understand it. Then they close the tab, because understanding it did not tell them what to do inside their own product on Tuesday morning.

The gap is between "I know what this is" and "I know my first move, in my repo, this week." Documentation is written to close the first gap. Almost nothing is built to close the second, and the second is where adoption actually dies.

## Documentation cannot hold state, so the developer has to

A doc site is the same for every reader and remembers none of them. Everything about where you are lives in your head: which parts you tried, what broke, which of the six concepts you still have not internalized, what you decided to build first, why you stopped. That context is expensive to rebuild and it evaporates in about a week.

So the developer pays a reload tax every time they return, and the tax is usually larger than the appetite they have that evening. This is the same failure [Agentic Project Management](/concepts/agentic-project-management) diagnoses for research and deliverables, arriving in a different costume: the project does not fail because the work is hard, it fails because reloading the context costs more than the will to continue.

## Progress is integration, not lessons completed

Every course-shaped onboarding measures the wrong thing. Modules finished, videos watched, a checklist of concepts. A developer can complete all of it and have shipped nothing.

The measurable that matters is whether the infrastructure is load-bearing in their real product: a first call running against their own data, then a step of their pipeline moved onto it, then a thing they could not previously ship. State worth holding is state about their codebase, not about their attendance. A learning project that tracks integration is auditable in a way a course never is, because the evidence is a diff.

## Ship it where the developer already lives

If the people adopting your infrastructure spend their day inside an agentic harness, an onboarding experience that is not harness-native gives up most of its advantages. A [harness](/disciplines/harness-engineering) can read the repo it is sitting in, see what has already been built, run the command, notice the error, and load what it needs when it needs it. A web tutorial can do none of that. It cannot see the codebase it is supposedly teaching you to change.

This is the practical corollary of [the harness being the thing worth learning](/perspectives/the-harness-is-the-thing-worth-learning). Once a developer's working environment is the harness, that environment is the correct delivery surface for anything meant to change how they build, and a [plugin](/concepts/plugins) is the shape it takes.

## What the artifact actually is

A template repo whose purpose is to manage one project: the developer's adoption of a specific piece of infrastructure.

- **A state file that is honest about progress.** Not a syllabus. What has been tried, what is integrated, what broke and why, what the next concrete move is. It updates as the work happens rather than as boxes are ticked.
- **The verbs as skills.** The operations the developer needs are runnable rather than described, so the first working call is a command instead of a copy-paste assembly job.
- **A supervising agent that answers what is next**, reading the state and the codebase together, which is the part a doc site structurally cannot offer.
- **A cold-start guarantee.** Someone who has been away three weeks opens it and gets the true state in minutes. That property has a name and a test: [project resumability](/concepts/project-resumability).
- **Something that pushes.** A schedule, a nudge, an accountability partner that notices the project has been quiet and says so. Adoption dies from silence more often than from difficulty.

Nothing here is novel machinery. It is [Agentic Project Management](/concepts/agentic-project-management) pointed at learning instead of at a deliverable, and the reason it transfers cleanly is that adoption IS a project: it has a goal, a definition of done, more context than fits in a head, and a deadline the developer keeps quietly missing.

## The blank page is where this gets abandoned

The template is the least valuable part, and shipping only the template reproduces the original problem in a new location. A cloned repo full of empty placeholders is a doc site with extra steps and more guilt.

Whatever removes the blank page is the product. An interview that fills the initial state from the developer's actual situation, in ten minutes, is what turns a scaffold into a project. This is the same lesson the [generator](/reference/standards/generate-md) pattern encodes: a one-time scaffold whose output is a persistent artifact, with the questions asked for you.

## The honest objection

This is heavier than a quickstart, and for most software it is the wrong answer. An API you can call correctly in five minutes should ship five minutes of documentation, and wrapping it in a project would be ceremony.

The pattern earns its cost when three things are true at once: the infrastructure has a real learning curve, adoption requires changing something structural in the developer's own system, and the work spans more sessions than a single sitting. Hosted agent runtimes qualify on all three, which is why the friction shows up there and not at the level of a single endpoint.

The other real cost is maintenance. A stateful onboarding project is software, and it goes stale exactly as fast as the infrastructure moves. A vendor unwilling to maintain it should ship good docs instead, because an abandoned learning project is worse than no learning project.

> Documentation teaches the reader and forgets them. A project remembers where they stopped, which is the only reason they come back.

## Further Reading

- [Agentic Project Management](/concepts/agentic-project-management): the machinery this borrows, pointed at deliverables.
- [Project Resumability](/concepts/project-resumability): the property that makes a paused project cheap to restart, and how to test it.
- [The Harness Is the Thing Worth Learning](/perspectives/the-harness-is-the-thing-worth-learning): why the harness is the surface, and why wrappers over it cost the developer transferable skill.
- [Plugins](/concepts/plugins): the packaging a harness-native experience ships as.
- [AI Enablement Architect](/roles/ai-enablement-architect): the seat that builds this inside a company rather than for a vendor.
