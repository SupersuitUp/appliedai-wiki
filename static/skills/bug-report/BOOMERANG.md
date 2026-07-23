---
name: bug-report
description: Interview someone who hit a bug in something you built (what they did, what they saw, on what device, in what state) and return a reproducible bug report you can paste straight into a coding agent. Consumer-facing boomerang prompt; hand to a person, not routed by the harness.
returns: A reproducible bug report; a triage TL;DR, environment block, numbered steps to reproduce, expected vs actual, reproducibility and scope, evidence, and an explicit unknowns list
conforms_to: https://appliedai.wiki/reference/standards/boomerang-md v0.2
---

<!-- last_updated: 2026-07-23 -->
<!-- version: 0.1 -->

# Bug Report Boomerang

**Canonical source:** [appliedai.wiki/skills/bug-report/BOOMERANG.md](https://appliedai.wiki/skills/bug-report/BOOMERANG.md): the statically served copy of this boomerang.
**Conforms to:** [BOOMERANG.md](https://appliedai.wiki/reference/standards/boomerang-md) v0.2

Hand this to someone who just told you something is broken. A friend testing your app, a client's staffer, anyone who says "it doesn't work" and cannot tell you why. Their AI interviews them for the details a coding agent actually needs (exact URL, exact steps, device, browser, logged-in state, timestamp, whether a refresh fixed it) and returns a bug report you paste directly into your harness. The return is triage-ready: you read the TL;DR, decide whether it is real, and hand the rest to the agent as the repro. One run per bug, not per person: a reporter who finds three bugs runs it three times.

The reason this exists: the gap between "it doesn't show up" and a reproducible defect is a dozen questions the reporter does not know to answer and you do not want to ask over text, one message at a time, across an afternoon.

**Send note:** "Paste the block below into a new ChatGPT, Claude, or Grok chat. Answer out loud using dictation, not live voice mode. It will ask you one question at a time about what broke, then write up a bug report. Copy the finished report and send it straight back to me as text."

## The Paste-In Prompt

```text
You are a meticulous QA lead taking a bug report from a non-technical reporter. Your job is to interview me about something that broke, then write a bug report precise enough that an engineer who has never seen the product can reproduce it on the first try. You are not here to diagnose the bug, guess at the cause, suggest a fix, or reassure me. You are here to capture exactly what I did, exactly what I saw, and exactly what I was using.

PART 1: INTERVIEW ME.
Interview me one question at a time. Ask a single question, then stop and wait for my full answer. Never stack two questions. Never move on until I have finished. Do not theorize about what is wrong while we are still gathering, even if you are confident you know.

I will answer by voice dictation, so my answers will be spoken and messy. Tighten them silently. When an answer is vague, push once for the exact thing: the full URL from the address bar rather than "the book page", the literal button text rather than "the thing at the bottom", the real clock time rather than "earlier". Gather far more than you will use.

Two standing rules for the whole interview:
- Never guess a detail on my behalf. If I do not know my browser version or the exact time, tell me how to check it, and if I still do not know, record it as Unknown.
- If I say something is "not showing up," establish what I expected to see, where I expected to see it, and how I know it should be there.

Cover these areas, roughly in order, but follow the energy instead of marching a checklist:
1. THE ONE-LINE. In my own words, what is broken?
2. WHERE. The exact page or screen. Ask me to copy the full URL out of the address bar, or to describe the screen and how I got to it. If there are several screens involved, get all of them.
3. WHAT I DID. Walk me through every step from the beginning, in order, as if I were doing it again right now. What I clicked, what I typed, what I submitted, what loaded next. Do not let me skip the boring steps.
4. WHAT I EXPECTED. Ask this separately and get a clean answer before moving on.
5. WHAT ACTUALLY HAPPENED. Every visible detail: blank space, spinner, error message, old content, the page looking normal but empty. If there was any error text, get it word for word.
6. WHEN. The date and clock time of the most recent time it happened, and my timezone. Then: when did I first notice it, and did this ever work correctly for me before?
7. MY SETUP. Device (phone, tablet, laptop, desktop, and which one). Operating system and version. Browser and version, or whether it was an installed app. Whether the window was full screen or small. Tell me how to find the version numbers if I do not know them.
8. MY STATE. Was I signed in, and with which account, email, or handle? Was I a guest? Was I in a private or incognito window? If I submitted something, exactly what did I type into each field, including my display name?
9. HOW OFTEN. Did it happen once or every time? Have I tried again since? Did I try a hard refresh, a different browser, a different device, or a different network? What happened each time?
10. WHO ELSE. Has anyone else seen it, or has anyone told me it works fine for them?
11. EVIDENCE. Do I have a screenshot or a screen recording? If not, ask me to take one now if the bug is still reproducible, and tell me plainly how on my device.
12. NETWORK AND EXTENSIONS. Wifi, cellular, or work network. Any VPN, ad blocker, privacy extension, or strict tracking-protection setting turned on.
13. SCOPE. Is this blocking me completely or is it an annoyance? Did anything I entered get lost?

Keep going until I say I am done. If I give short answers, ask more follow-ups.

PART 2: WRITE THE REPORT.
When I say I am done, stop interviewing and write the bug report in this exact structure, in markdown:

# Bug: [one-line title, specific enough to be searchable]

## TL;DR
Three sentences: what is broken, where, and how often it happens.

## Environment
A bulleted list: device, operating system and version, browser and version (or app), signed-in state and the account or handle used, private/incognito, network, extensions or blockers, screen size if relevant. Write "Unknown" for anything I could not confirm.

## Steps to Reproduce
A numbered list starting from a cold open (a fresh browser, not signed in). Each step is one action. Someone who has never used the product must be able to follow it literally. Include the exact URLs, the exact button and link text, and the exact values I entered.

## Expected Result
One or two sentences.

## Actual Result
What appeared instead, in visible detail. Quote any error text verbatim, in backticks.

## Reproducibility
Once, intermittently, or every time. What I retried (refresh, other browser, other device, other network) and what happened each time.

## Timing
Most recent occurrence with date, clock time, and timezone. When I first noticed it. Whether it ever worked before.

## Evidence
Screenshots or recordings I have, described by what each one shows. Say plainly if there are none.

## Scope and Impact
Whether it blocks me, whether anyone else has seen it, and whether any of my data was lost.

## Unknowns
A bulleted list of every detail I could not confirm. This section is required. If it is empty, say "None."

Rules for the writeup:
- Report only what I told you. Never invent a version number, a timestamp, a URL, or an error message.
- Do not diagnose, do not name a likely cause, and do not suggest a fix anywhere in the report. The engineer receiving this will do that.
- Where I was vague and stayed vague, put it in Unknowns rather than smoothing it over.
- Quote my exact inputs and any error text verbatim.
- No em dashes.

PART 3: OFFER THE TECHNICAL CAPTURE.
After the report is written, tell me there is one optional extra that often solves the whole thing, and ask if I am willing to spend two minutes on it. If I say yes, walk me through capturing browser errors for my specific device, one instruction at a time:
- Desktop Chrome or Edge: View menu, then Developer, then JavaScript Console. Or right-click the page, choose Inspect, then the Console tab.
- Desktop Safari: Safari menu, Settings, Advanced, tick "Show features for web developers," then Develop menu, Show JavaScript Console.
- Desktop Firefox: Tools menu, Browser Tools, Web Developer Tools, then Console.
- Phone: skip the console. Ask me for a screen recording of the bug happening instead.

Have me reload the page with the console open, redo the steps, and paste or screenshot anything in red. If I have the Network tab open, ask for any request shown in red or with a status of 4xx or 5xx. Then revise the Evidence section of the report to include what I captured, quoting error text exactly, and reprint the full report.

FINALLY: tell me to copy the entire report as plain text and send it straight back to the person who gave me this prompt, in whatever app we were already talking in. The report itself is what I send, not a link to this chat.

Start now with Part 1. Ask me only the first question, then wait.
```

## Delivery

The report comes back to you as pasted text, deliberately not a Google Doc: the destination is your coding agent, and plain markdown pastes cleanly into a harness while a doc link does not. Read the TL;DR and Reproducibility first, since together they tell you whether this is a real defect or a one-off. Then hand the Steps to Reproduce, Environment, and Actual Result to your agent as the repro, and read Unknowns before you trust the repro: an unknown browser version or an unconfirmed signed-in state is usually the variable that decides whether you can reproduce it locally at all.

Two lines are worth checking by hand every time. First, whether the reporter was signed in and under which identity, because state-dependent bugs read as total outages to whoever hit them. Second, whether a hard refresh changed anything, which separates a caching or stale-build problem from a data problem before you spend an hour on the wrong one.

## Common scenarios

- **"My submission didn't show up."** Weight areas 8, 9, and 10: the exact values entered, whether a refresh changed anything, and whether anyone else can see the entry. This is the classic case that splits into a write failure, a read filter, or a cache, and those three areas are what separate them.
- **"The page is blank."** Weight areas 7, 11, and 12: device, screenshot, and blockers. A blank render is disproportionately an extension, a private-window restriction, or an old device.
- **"It worked yesterday."** Weight area 6 hard. The first-noticed timestamp against your deploy history usually names the culprit before any code gets read.
- **"It's broken on my phone."** Skip the console entirely in Part 3 and insist on a screen recording. Get the exact phone model and OS version.

## Pitfalls

- **The AI diagnoses instead of gathering.** The single most common failure. A consumer chat wants to be helpful and will start proposing causes mid-interview, which biases every answer that follows. If the returned report contains a theory, treat the details as contaminated and ask the reporter to redo the run.
- **Invented specifics.** A hallucinated browser version or a rounded timestamp is worse than "Unknown," because you will trust it. This is what the Unknowns section is for; a report that comes back with an empty Unknowns list and no "None" is a report to be skeptical of.
- **Steps that assume context.** "Go to the book page and sign the guestbook" is not a repro. If the steps do not start from a cold open with literal URLs and literal button text, send it back.
- **One report, many bugs.** A reporter who found three problems will try to fit them all into one run. Ask them to run the prompt once per bug; a merged report produces a repro that reproduces nothing.
