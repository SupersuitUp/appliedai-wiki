---
title: "Campaign Plugins"
slug: /concepts/campaign-plugins
description: "A plugin is the right container for a campaign: skills as the campaign's atomic actions, versioned files as its state machine, layered on top of the permanent relationship record. The operator talks; the campaign updates itself."
image: "/img/comics/campaign-plugins.png"
---

# Campaign Plugins

*A campaign is a goal-directed, time-bounded effort with people, artifacts, and a deadline. A campaign plugin packages that campaign as an installable action-set: skills as the atomic actions, versioned files as the state machine, layered on top of the permanent relationship record. The operator talks; the campaign updates itself.*

![Three-panel cream-paper action comic. Title bar: CAMPAIGN PLUGINS. Panel 1, caption A CAMPAIGN IS A STATE MACHINE: Midas, the navy-armored hyperagent with orange seams, stands at a physical wooden board of person-cards arranged in three labeled columns QUEUED, SENT, RESPONDED, moving one card with a gauntleted hand. Panel 2, caption EVERY ACTION IS A TRANSITION: close on Midas stamping a person-card whose fresh ink tag reads TOUCH LOGGED; below the board a deep wooden drawer with a brass plate reading PERMANENT RECORD stays closed and intact. Panel 3, caption THE MACHINE LISTENS: a visibly distinct second person in casual clothes speaks to Midas, speech bubble filled with abstract line work only, while behind Midas a board card slides itself one column right under a gold READY stamp. Footer bar: THE OPERATOR TALKS. THE CAMPAIGN UPDATES ITSELF.](/img/comics/campaign-plugins.png)

---

## What a campaign is

A campaign is a goal-directed, time-bounded effort with people, artifacts, and a deadline. Get hired somewhere. Raise a round. Launch a product. Win a client. It has a definition of done, a cast of characters, a set of moves you make over and over, and a date after which it either worked or it did not.

Most operators run campaigns out of their heads, a notes app, and a browser full of tabs. The claim of this page: a [plugin](/concepts/plugins) is the right container for a campaign, and the mapping is close to exact.

## Skills are the campaign's atomic actions

Every campaign reduces to a small set of moves the operator makes repeatedly: log advice from an insider contact, draft outreach to a person in the process, journal privately, process a conversation, checkpoint state, report status. Each of those moves becomes one [skill file](/concepts/skill-files) in the plugin.

The payoff is more than convenience. The set of skills IS the ontology of the campaign, rendered legible. Read the skill list and you know exactly what kinds of action this campaign consists of, the same way a [hyperdocumented SOP](/concepts/hyperdocumented-sop) makes a workflow's branches explicit. If a move you keep making has no skill, the ontology is incomplete and the campaign has an unmanaged edge.

## Every action updates a grounded state machine

State lives in versioned files, not in anyone's head. The typical shape:

- **A board of people** with stages: PROPOSED, QUEUED, SENT, RESPONDED, FOLDED-IN. Each row is a person in the campaign with a role, a stage, and a next action.
- **A touch log**: every contact with every person, dated and appended.
- **A save log** with checkpoint anchors, so any future session resumes from the exact state the last one left.

An action is a state transition; the files are the state. When outreach goes out, a row moves from QUEUED to SENT. When a reply lands, SENT flips to RESPONDED and the touch log gains a line. Git history is the audit trail: every transition is a diff with a timestamp, which is [save your progress](/concepts/save-your-progress) applied continuously instead of at session end.

## A layer on top of the permanent record, never a replacement

The campaign layer sits on top of the permanent relationship record. It does not replace it. The permanent CRM stays canonical for who a person IS: history, context, how you met, what they care about. The campaign layer is canonical for where that person stands IN THIS CAMPAIGN: role, stage, next action.

Every campaign row links down to the person's permanent record, and every campaign touch mirrors into it. When the campaign ends, the layer archives; the relationships remain. This separation is what lets campaigns be time-bounded without making relationships disposable, and it only works if the underlying records exist, which is the [legible organization](/disciplines/legible-organization) prerequisite doing its usual load-bearing work.

## The operator should rarely invoke a skill by name

This is the practical point most builders miss. A well-built campaign plugin disappears into conversation. The operator says "my friend gave me feedback on the deck" or "I got off the call with the insider contact," and the harness routes to the right atomic action, because the skill descriptions carry the trigger conditions and the campaign context makes intent obvious. Explicit invocation is the fallback, not the interface.

The test of a campaign plugin is not whether the skills run when called. It is whether the operator can narrate their day in plain speech and watch the board, the touch log, and the artifacts update themselves.

## Why a plugin beats a folder of loose skills

The container matters:

- **Named after the goal.** The plugin carries the campaign's name, so the whole action-set is discoverable as one thing, not scattered across a skills folder.
- **Ships and retires together.** Installable and versioned, the campaign's entire ontology moves as a unit. When the campaign ends, disable one plugin and the action-set retires cleanly while its state files archive.
- **A definition of done.** The state machine gives the campaign an endpoint a folder of loose skills never has. When every row reaches a terminal stage or the deadline passes, the campaign is over, and the plugin's status skill can say so.

## Worked example: a hiring campaign

A campaign to get hired at a specific company. The plugin's skills: journal (private, unfiltered), log-advice (insider counsel into an intel file), log-thinking (strategy into a direction file), process-conversation, draft-outreach, checkpoint, status, and track (the CRM layer with the board).

The operator never says "run the track skill." They say "a founder-advisor replied, he loved slide 3 but bounced at the code." The board row flips to RESPONDED, the touch logs and mirrors into the advisor's permanent record, and the slide feedback routes to the artifact that needs fixing. One sentence of natural speech, three state transitions, zero skill names.

## Further Reading

- [Plugins](/concepts/plugins) the packaging layer a campaign plugin is built on
- [Skill Files](/concepts/skill-files) the atomic-action unit inside the plugin
- [Save Your Progress](/concepts/save-your-progress) the checkpoint mechanic the campaign runs continuously
- [Command Centers](/concepts/command-centers) the environment a campaign plugin installs into
- [Legible Organization](/disciplines/legible-organization) the capture discipline that makes the permanent record worth layering on
