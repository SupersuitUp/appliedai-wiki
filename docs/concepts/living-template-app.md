---
title: "Living Template App"
slug: /concepts/living-template-app
description: "An app already about 99% built for a common life need, kept as one shared template that keeps improving. A person's agent tailors it to them with a prompt, they own the result, and every improvement to the template keeps flowing into their copy without overwriting what they changed."
image: "/img/comics/living-template-app.webp"
---

# Living Template App

*An app already about 99% built for a common life need, kept as one shared template that keeps improving. A person does not build it: their agent **tailors** it to them, mostly by pasting one prompt, and they own the result. The template is the living part, and every improvement to it flows into each **tailored app** cut from it without overwriting what the owner changed.*

![Three-panel warm ink-and-wash strip titled LIVING TEMPLATE APP. In every panel the camera is behind the shoulder of a woman with curly grey-streaked hair in a rust cardigan, seated at a wooden table before a glowing amber laptop. One, labeled The app is already almost built: inside the screen the Chief of Agents in his gold cap and two sub-agents stand beside a nearly finished house with rooms for an album, a journal and poems, while she holds a phone with the one prompt she is about to paste. Two, labeled Her agent tailors it to her: the agents copy the house onto a new plot, hang her family photos in its windows and set a blue lockbox with a key beside it, the data hers. Three, labeled Every upgrade still reaches her copy: sub-agents add a new porch to the template house and amber arrows carry it to three small tailored houses, each keeping its own door and photos, while she sits back with a mug.](/img/comics/living-template-app.webp)

---

## Two things with two names

The name exists to keep two objects apart.

- **The living template app** is the shared thing. One codebase for one common need: a couple's private album, a newborn's first years, a cooking companion. It is maintained, it gets better, and nobody uses it directly.
- **The tailored app** is the personal copy. It runs on the owner's own accounts and keeps its data in the owner's own stores. It carries their names, their photos, their choices about what to keep and what to drop. Nobody else can see into it.

Most confusion about this pattern comes from collapsing the two. Call the personal copy "the template" and the owner starts to feel like a tenant in someone else's product. Call the template "the app" and every improvement looks like a one-off favor to one person. The template is the factory floor. The tailored app is the house.

## Ninety-nine percent is already done

The claim underneath the pattern is plain: most of what any one person needs from an app for a common life moment has already been built, by someone, for someone else. A relationship album does not differ much between two couples. A baby journal does not differ much between two newborns. The difference that matters to the owner is real, and it is small: names, a few features turned on or off, the voice of the prompts, where the data lives.

So what remains is assembly. The tailoring prompt reads the person's context, provisions their accounts, sets the variables, removes what they will not use, and hands back a working app. The owner's job shrinks to pasting the prompt and answering the few questions only they can answer.

The same logic runs one layer down. A living template does not rebuild the services it depends on. If a good transcription service, a good document editor, or a good photo store already exists, the template hooks into it. Everything the world needs has mostly been built. The leverage is in putting the right pieces together for one need, once, and then reusing that assembly for everyone who has the need.

## Why nobody else says this out loud

Two kinds of seller could offer a person the same app, and both are paid to hide the 99%.

- **An hourly developer** is paid for the hours. Telling a client the app is nearly done before work starts is telling them the invoice is small.
- **A generate-from-scratch app builder** is paid per generation and sells the feeling of creation. Its whole pitch is that you start from a blank prompt, so it rebuilds the same couple's album from nothing for every couple who asks.

Neither is lying about its own economics. Each is structured so that the reuse never reaches the customer. A living template is the shape where the reuse is the product: the work done for the first owner is the reason the hundredth owner gets theirs in minutes.

## What "living" means

A copy of a template is a fork, and a fork rots. The day after it is cut, it stops receiving the fixes made upstream, and within a year the owner is running a worse version of something that kept getting better somewhere else.

A living template closes that gap. Improvements to the template flow automatically into every tailored app cut from it. The constraint that makes this hard is also the one that makes it trustworthy: **the update never overwrites what the owner changed.** Their edits are theirs. The template supplies everything they did not touch, and what they did touch stays put.

Holding that line takes structure in the template itself:

- **Owner choices live as data, apart from template code.** Names, copy, enabled features and data locations sit in configuration the tailoring step writes, so an upstream change to the code has nothing of the owner's to collide with.
- **Owner edits to code are recorded as the owner's.** When someone changes the app itself, that change is tracked as a deliberate divergence, and the update path carries it forward instead of resetting it.
- **The owner can always change anything.** Living does not mean locked. A tailored app the owner cannot modify is a subscription with extra steps.

This is the same discipline as [fixing the generator](/perspectives/the-generator-is-the-only-thing-worth-fixing), applied across people as well as across runs. When the tenth owner hits a bug, the fix goes into the template, and the other nine get it without asking.

## Two worked examples

**A private app for two.** One operator built an app for his relationship and nobody else: shared photo moments with a conversation thread under each one, a voice-first notes journal, and a book of poems written for her. It ran on accounts the two of them owned. Soon several friends asked for their own version. None of them wanted a different app. They wanted the same app with their names, their photos and their own voice in the prompts. That request is the signal that a tailored app is sitting on top of a template that has not been named yet.

**A super app for a newborn.** For a friend's newborn daughter, the same operator assembled an app around the first years: capture prompts through the day with a streak to keep the habit alive, milestones recorded with dates (the questions a pediatrician's form will ask years later, when nobody remembers), growth measurements at each doctor visit, and a feed for grandparents living abroad. Every one of those features is something any new parent needs, and none of them is specific to this child except the data.

Both are tailored apps cut from living templates. The second couple and the second family start from everything the first ones already built.

## Every template ships with its own plugin

A living template app is not finished until it has a **plugin** for the agent that operates it. The plugin is how the template reaches a person, and how their agent runs the tailored app afterward. Four jobs belong to it:

- **Tailoring.** Installing the plugin and giving the agent one prompt cuts a new tailored app from the template.
- **The nightly update.** The plugin carries the routine that brings template improvements into the owner's copy and leaves their changes alone.
- **Everyday verbs.** The common operations on the app become named verbs the owner asks for in plain words, so nobody opens settings or edits configuration by hand.
- **A version that moves with the template.** The plugin is released alongside the template, so the agent always knows which template version a tailored app was cut from and which one it should move to.

For the private album for two, the verbs add photos to the album and publish a poem. For the newborn's first-years app, they add a family member, change how often someone is notified, and log a doctor visit from a photo of the visit summary. In both cases the owner never learns the app's internals. They say what they want and the agent calls the verb.

The rule is short: every template app needs its own plugin. A template with no plugin is a codebase someone has to be walked through, and its owners drift back toward the tenant position this pattern exists to avoid.

## Why it makes the system concrete

There is a practical reason this pattern matters beyond efficiency. People do not adopt an agentic system because it "makes their computer better." That sentence is true and moves nobody. They adopt it because of one concrete thing it did for their life: *it helped me document my baby's first year.* A tailored app is that concrete thing. It is the first proof a person can point at, and the reason the rest of the system starts to make sense to them.

[Freedom](https://getfreedom.wiki/concepts/living-template-app) is built to make that step easy: the agent reads who the person is, tailors the template to them, provisions what they own, and keeps the copy current as the template improves.

## How it relates to its neighbors

- It is the delivery shape for [local-first software](/concepts/local-first-software): the tailored app runs on stores the owner holds, so the data never belongs to the template's maintainer.
- It is a [golden process](/concepts/golden-processes) for a whole app: the assembly is discovered once, blessed, and rerun for every new owner instead of being re-improvised.
- It sits close to a [playable harness experience](/concepts/playable-harness-experience), which ships a bundle someone plays inside their own harness. A living template ships the finished app and keeps it updated.
- Rebuilding a template-shaped app from scratch for each new person is [hand-rolling](/concepts/hand-rolling) at the scale of a whole product.

---

## Further Reading

- [Freedom: Living Template App](https://getfreedom.wiki/concepts/living-template-app): how the system tailors a living template to one person and keeps it current.
- [Local-First Software](/concepts/local-first-software): why the tailored app keeps its data on stores the owner holds.
- [Golden Processes](/concepts/golden-processes): the assembly a template captures, blessed once and rerun for every owner.
- [Own Your Libraries](/concepts/own-your-libraries): the same reuse argument at the level of code you build once and inherit forever.
- [Hand-Rolling](/concepts/hand-rolling): the failure a living template prevents, one rebuilt app per person.
- [The Personalizing Factory](/concepts/the-personalizing-factory): the opposite end of the personalization spectrum, where principles stay constant and the output itself is new each time.
