---
title: "Run CI on a Machine Your Agents Share"
slug: /playbooks/run-ci-on-a-machine-your-agents-share
description: "Nine things to build into a test pipeline when several agent sessions share one machine: a limit on every test, a nightly full run, the foreground going first, three verdicts instead of two, arithmetic instead of races, one lone re-run before a red is final, anchors that still apply, drift gates at commit time, and verdicts where people already look. Each one was learned from a single day of releases on one repo."
image: "/img/comics/playbooks/run-ci-on-a-machine-your-agents-share.webp"
---

# Run CI on a Machine Your Agents Share

*CI was designed for one developer and a quiet build server. When a dozen agent sessions share one laptop, the pipeline's defaults turn a busy afternoon into a release that cannot ship, and every fix below is obvious only after the day it would have saved.*

![Three panels on warm cream paper, one woman throughout: in her mid thirties with curly auburn hair tied back and a rust cardigan, seen over her right shoulder at a wooden desk with a glowing amber laptop. Title bar: ONE MACHINE, MANY AGENTS. Panel one, ONE HUNG TEST JAMS THE LINE: she waits with a small wooden crate on her lap while inside the screen a line of rounded agent figures and the Chief of Agents in a gold cap stand stuck behind a grey figure slumped frozen in a narrow gate under a stopped clock. Panel two, THE RELEASE GOES FIRST: a glowing clock swings down like a crane hook and lifts the grey figure out of the gate, and the crate she set on the keyboard is carried through the open gate ahead of the waiting line. Panel three, THE FULL RUN WAITS FOR NIGHT: under a crescent moon she sleeps in an armchair beside the desk, and on the dimmed screen a single agent with a lantern walks the empty lanes alone.](/img/comics/playbooks/run-ci-on-a-machine-your-agents-share.webp)

## When to run this

Your repo is worked by several agent sessions at once, on one machine, and the suite runs on that same machine: before a commit, before a release, and in the background. The symptoms are all timing. A release waits forty minutes and nobody can say why. A test that passes alone fails inside the release. The load average sits well above the core count for most of the working day.

Every item below comes from one repo on one day, when a release took nine attempts to ship. None of the failures was a defect in the code being shipped. Every one was the pipeline treating a shared, loaded machine as if it were a quiet one.

## 1. Give every test a wall-clock limit, and kill the whole tree

One test hung at 0% CPU for forty-five minutes. The suite held a machine-wide lock (one full run at a time, which is right on a shared machine), so a release and another session's suite queued behind a run that was never going to finish. Nothing had a limit, so nothing ended it.

Set a limit per test at about three times the slowest honest run, and when it fires, **kill the process tree, not the process.** Killing only the test's own process left a child holding the output pipe, so the runner capturing that output kept waiting for the orphan. The fix's own test caught this before it shipped: the test was killed at one second and the caller returned at thirty.

## 2. Run the full suite nightly, and let releases run what changed

A background runner fired the full suite every ten minutes, which on a busy day meant it held the lock most of the time. The full suite is the audit, and an audit belongs to the hours nobody is waiting on the machine: once a night, at most once, retried at the next hour if the machine is busy.

A release then runs **only the suites its change could affect.** Record each suite's inputs when it passes and skip it while they are unchanged. Never skip a suite that has not passed since its inputs last moved, and keep a switch that forces the full run for the release that needs one. The nightly run catches the dependency the input tracking missed.

## 3. The foreground goes first

A person or a release waiting on the machine outranks a background run that nobody is waiting on. When a foreground run finds the background runner holding the lock, it stops that run instead of queuing behind it. Tell the stopped run why, so it records a **skipped night, never a red.** A preempted run says nothing about the code.

## 4. Pass, fail, and did-not-finish are three verdicts

An exit code has two values and a test run has three outcomes. A run killed by a signal, or one that could not start, is not a verdict on the code. The first time the background runner ran, the scheduler handed it a bare `PATH`, every suite failed on `node: command not found`, and the result would have been recorded as red. The release gate reads that verdict, so every release would have refused, naming the operator's own commit as broken.

Classify the outcome before recording it. A killed run is retried once and then reported as did-not-finish. A run where most failures are "command not found" is the environment, and it records a skipped tick while the previous verdict stands. For the mechanics of capturing the exit status honestly, see the [business plugin standard](/reference/standards/business-plugin).

## 5. Assert arithmetic, not races

Several tests proved that a timeout scaled correctly by racing a real `sleep` against it: a five-second job must die under a three-second budget and survive a twelve-second one. At a load of twenty-five on sixteen cores, process startup ate the survivor's slack. The margins were widened twice and the tests still failed inside the release while passing alone.

The claim was about a number, so test the number. Move the budget calculation into a function and assert its value directly. Keep the cases that prove **a real hang still gets killed** running for real, because load only makes those more certain to pass. A test whose pass depends on how busy the machine is was never testing the code.

## 6. Re-run a small red once, alone, before it is a verdict

The release script ran the suite, then published. A single failure stopped it with no resume, so one flaky test restarted a fifteen-minute release from the top. That happened six times in one day.

When five or fewer suites fail, re-run each one alone, once. A filtered run of one suite takes seconds. If they all pass, ship, and **print them by name as flaky** so they get fixed rather than tolerated. If any fails again, refuse exactly as before. A wide red, or a failure that is not a test file (a stale mutation anchor, below), is a verdict and never gets the re-run.

## 7. Check that the mutation anchors still apply

[A test that never fails is decoration](/perspectives/dont-move-at-agentic-speed-without-extreme-test-coverage), so every new test is seen to fail by mutating the code it guards. The mutation is a find-and-replace on a specific line. When a refactor moves that line, the mutation matches nothing, runs against untouched code, and passes forever. A fix that restructured one function left its mutation case testing nothing until a gate that checks every anchor still matches caught it at release.

Run the anchor check on every suite run, not only when someone runs the mutation file by hand.

## 8. Run drift gates at commit time

Gates that refuse a change to a skill without a matching change to its documentation, or without an explicit `unchanged: <why>` line in the commit, caught real drift that day. But when they fire first at release, each catch costs a full release attempt. The same check run at commit time costs seconds and lands on the person who made the change, in the moment they still remember why. This is the same argument [gates and hooks](/concepts/gates-and-hooks) make for moving a check to the earliest point it can fire.

## 9. Put the verdict where people already look

Once the full run moved to nightly, a red night became the audit's only report. Written to a state file, it is a report nobody reads. Surface it in whatever the operator opens first in the morning: a briefing, a status line, the first message of the day. Say nothing when it is green, and name the failures when it is not.

## Further Reading

- [Gates and hooks](/concepts/gates-and-hooks): moving a check to the earliest point it can fire, which is items 3 and 8 in one idea.
- [Don't Move at Agentic Speed Without Extreme Test Coverage](/perspectives/dont-move-at-agentic-speed-without-extreme-test-coverage): why the suite has to exist and be extreme; this playbook is how to keep it runnable once it does.
- [Business plugin standard](/reference/standards/business-plugin): discovered rather than enumerated suites, and exit statuses captured rather than piped away.
- [Stand Up an Eval Harness in Week One](/playbooks/stand-up-an-eval-harness-in-week-one): the same gate discipline applied to model output quality.
