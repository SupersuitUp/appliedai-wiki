---
title: "Business Plugin"
slug: /reference/standards/business-plugin
description: "A conformance standard for the package a business ships its own verbs in. Seven mechanically checkable requirements, what each one proves, what conformance means, and a ratchet that lets a machine full of non-conforming plugins adopt it today."
image: "/img/comics/business-plugin.webp"
---

# Business Plugin Standard v0.1

*Seven requirements a plugin has to meet before someone other than its author can run the business it belongs to. Each one is checked mechanically, each one cites a package that already proves it, and adoption ratchets rather than refuses.*

![Three panels in warm editorial ink and wash on cream paper. Title bar: THE BUSINESS PLUGIN STANDARD. One: a woman in an olive sweater sits at a desk with her back to us, and inside her glowing amber laptop the Chief of Agents in his gold cap holds a plain closed wooden crate, while an older man in a grey cardigan stands in the doorway with empty hands; caption THE BUSINESS LIVES IN ONE HEAD. Two: the same desk, and inside the screen the crate now sits under a row of small brass stamping presses that the Chief of Agents works one at a time, some marks pressed into the lid and one patch still bare; caption A CHECK DECIDES, NOT AN OPINION. Three: the older man now sits at his own desk with the same crate open in front of him, plain cards standing in it and his own laptop beginning to glow, while the woman leaves with her coat over her arm; caption SOMEONE ELSE CAN RUN IT. Footer bar: PACKAGE THE WORK. PROVE IT MECHANICALLY.](/img/comics/business-plugin.webp)

---

{/* last_updated: 2026-09-14 */}
{/* version: 0.1 */}

A [business plugin](https://agenticbusiness.wiki/concepts/the-business-plugin) is one installable [plugin](/concepts/plugins) per business, holding that business's own verbs as [skill files](/concepts/skill-files). That page is the why: the verbs leave the owner's head, the plugin docks into whoever is running the business next, and what a buyer inherits is an agent that already knows how to operate the company. This page is the engineering half. It says what has to be in the package, how each requirement is decided by a program rather than by an opinion, and what it means to conform.

The case for writing it down is not that the idea is good. It is that the same package keeps getting built by hand. On one operator's machine in September 2026 there were eight of them, and six were unfinished in ways nobody could see without opening them. Some carried no version, so nothing could tell whether a verb was current. Some carried no config, so they resolved one person's folder layout and worked for one person. Some carried no map on any verb, so only the author could audit what the business claimed to do.

Every requirement below cites two things: a package that already proves it works, and at least three packages that are missing it. **A requirement that can cite only one half is taste and does not belong in a standard.** That governor is what holds the list at seven, and it has already disqualified a requirement once (see [Requirement 7 and the check that did not survive](#requirement-7-and-the-check-that-did-not-survive)).

## The seven requirements

| # | Requirement | What a checker decides |
|---|---|---|
| 1 | **Identity** | A manifest carrying a name, a description, and a version that parses as semver |
| 2 | **Config** | One config file that parses, holding no literal home path and no contact detail in any value |
| 3 | **Verbs** | At least one skill |
| 4 | **Maps** | A map file beside every verb, existence only |
| 5 | **A ship verb** | A skill that releases the plugin |
| 6 | **Tests** | Both a discovering runner and at least one test file |
| 7 | **A declared front door** | The package names a way in, and the skill it names exists |

### 1. Identity

The package carries a manifest at `.claude-plugin/plugin.json` with a `name`, a `description`, and a `version`. The version has to parse as semver, so `0.1.0` passes and `none`, `latest`, or an absent field does not.

The version is the load-bearing field. Without it, staleness is undetectable, and a verb that claims to be the business's map while being a year out of date is worse than no verb, because it is believed. Every other requirement on this page assumes you can ask whether a package is current, and requirement 7 in particular is unenforceable against a package that cannot answer.

### 2. Config

The business's own facts sit in one file at the package root: where its repositories and workspace live, who its people are, where its queue goes. A checker accepts `plugin.config.json`, or `<name>.config.json`, or `<name>.json`. It has to parse, and then two things have to be absent from it.

**No literal home path.** A value that is an absolute path rooted in a machine's home directory resolves on one machine, which means the package works for one person. The remedy is the single most valuable idea in the population that produced this standard: a configured path is tried first and the repository **name** second, because the folder a clone lands in varies per person and the repository it came from does not. That fallback is the reason a plugin runs on a second person's machine at all.

**No contact detail.** No email address, no phone number. A repository keeps them forever and discloses them to everyone who ever had access, including everyone who inherits the business. Contact resolution belongs in the operator's own relationships directory, which is per-person and stays out of the package.

The check walks the parsed JSON and tests every **string value**, at any depth. It never tests keys, which is a deliberate line: a key named for a contact is a schema decision and is fine, and a value that is one is the disclosure. Three narrowings earned by false positives are worth copying if you implement this yourself. Anchor the home-path test at the start of a value rather than searching the raw file text, so an API route that merely contains a path segment does not match. Require an alphabetic top-level domain of at least two characters in the email pattern, which rules out a pinned dependency version without narrowing real addresses. Require a leading plus sign or real separators between digit groups in the phone pattern, so a millisecond timestamp is not read as a phone number.

### 3. Verbs

At least one skill, at `skills/<verb>/SKILL.md`. A verb is sized by what it runs on: one thing the business does over and over, small enough that an agent can take it start to finish in a single session.

This is the floor rather than a bar. It exists so that an empty package cannot score well on the other six and read as finished. Note that the manifest's own `skills` key is a list of paths, so a checker has to read it rather than hardcoding `skills/`; hardcoding it makes requirements 3, 4, 5 and 7 all silently false for any package that declares a different root.

### 4. Maps

Every verb has a map beside it: an [HDSOP](/concepts/hyperdocumented-sop) at `HDSOP.md` in the verb's own folder, carrying what the step is for, what it reads, what it writes, where it refuses, and what a human still has to decide.

The map is the half a human reviews and the half a buyer inherits. Without it, the plugin is a pile of instructions only its author can audit, which is the [owner dependence](https://exitstrategy.wiki/concepts/owner-dependence) the package was supposed to remove.

**The check is existence only, and that is deliberate.** Whether a map is any good is not mechanically decidable, and a check that pretends to measure quality teaches people to satisfy the proxy. A word count, a section list, or a readability score would all be gamed within a week by maps that pass and say nothing. Existence is honest about what it measures: the file is there, a human can read it, and the review of whether it is true is [a separate discipline](/perspectives/document-and-streamline-load-bearing-workflows) that no checker performs.

### 5. A ship verb

One skill whose folder is named `ship`, or begins with `ship-`. It releases the plugin: its own repository, its own version bump, its own catalog entry.

This is the verb that makes every other verb improve. A business plugin earns its keep through the loop where a verb that ran wrong gets fixed in the skill on the first occurrence, and the fix is worthless if it stops at the author's own checkout. Without a ship verb, an improvement reaches its author and nobody else, and the package stops compounding the moment a second person is running the business. It is the one verb to install before any verb of the business's own.

### 6. Tests

Both halves: a `run-tests.sh` at the root, and at least one test file somewhere in the tree.

Either half alone is a specific lie, which is why the check refuses both asymmetries by name. **Test files with no runner** means nobody runs them, and the suite is decoration that gets more convincing as it gets bigger. **A runner with no test files** means green means nothing, and the more often it is run the more confidence it manufactures out of nothing.

**The runner has to discover its tests rather than enumerate them.** An enumerated list drops any suite nobody remembered to add to it, silently, and stays green while doing it. That is not hypothetical: one package in the population lost a twenty-two-test suite this way for weeks. Two related disciplines belong in the same file. Capture the exit status explicitly rather than piping the run through something like `tail`, which masks a non-zero status and reports green over red. And treat zero suites found as a failure rather than a pass, because a package that has deleted its last test should say so out loud.

A runner that discovers has one obligation the enumerating kind does not: **it has to discover every shape the standard accepts.** If a checker counts three filename patterns as evidence of tests and the runner globs only one of them, a business can write its suite in either of the other two, pass the requirement, and have the runner execute nothing at all. That is the silent-drop failure again, one layer down.

### 7. A declared front door

The package names a way in, and the skill it names exists on disk. The declaration goes in the config, or in the manifest; a checker reads the config first, because config is already a requirement of its own.

This is the requirement that matters most to a non-technical owner, who will never learn a verb list. A package with twenty verbs that can only be used by someone who knows twenty verb names is unusable by anyone who did not write it. The front door is the skill you hand nothing: it reports where things stand and what the next move is, and every other verb is reachable from there.

**A declaration naming a skill that does not exist FAILS**, and that is the whole point of checking the declaration rather than trusting it. A door named in a config and absent on disk reads as a door in a report and is a wall in practice, which is worse than honestly reporting that none was declared. A checker that only read declarations would score the broken case higher than the missing one.

A fallback survives underneath: a skill folder named after the package also counts. It is there so nothing that passed an earlier version of this check regresses, and it is a fallback rather than the rule for the reason in the next section.

## Requirement 7 and the check that did not survive

This requirement first read *a skill whose folder name matches the package name*. It is the most useful thing on this page, because of how it failed.

That check measures where the nameplate is rather than whether there is a way in, and it did not survive being pushed on. **The package that best exemplifies the requirement failed the check for it.** The agent framework this standard was written inside has no skill named after itself; its front door is a session-opening skill reached by declaration, which is exactly the job the requirement describes. A rule that needs an exception written for the thing it was modeled on is measuring the wrong thing.

The repair was to check the property instead of the proxy: a declaration plus the existence of what it declares. The name match stayed as a fallback so nothing regressed, and the requirement went from something a package could satisfy by renaming a folder to something it can only satisfy by having a door.

This generalizes past this standard. A mechanical check is a proxy for a property, and the moment you find yourself writing an exception for a case that obviously has the property, the proxy is wrong rather than the case. [Ratcheting Standards](/concepts/ratcheting-standards) names the sibling failure at the other end: a limit chosen so the current codebase passes is a description of the status quo wearing the costume of a rule.

## What conformance means

A package conforms when all seven requirements pass. There are no levels, no partial credit, and no weighting: the score is a count of violations, and zero is conformance.

Three things conformance deliberately does not claim.

**It does not claim the verbs are good.** Requirement 4 checks that a map exists, not that it is true. A conforming package can carry seven maps that describe a workflow nobody runs any more.

**It does not claim the package is complete.** One verb and a ship verb is a conforming package, and that is intended: a plugin with one verb and an improve verb is a business that gets more valuable every week, where a plugin with ten verbs and no way to ship a fix is a snapshot.

**It does not survey the working tree's history.** A checker reads the files as they are on disk, which is correct and is also the most common surprise. A package reported as unmapped because its maps landed on a branch this checkout does not have is being scored accurately. Check out the branch you mean to score.

## Adoption: the ratchet

Six of the eight packages in the population failed on the day the standard was written. A standard that refuses non-conformance is a standard nobody adopts, because adopting it would mean a cleanup of six packages that gets postponed forever. So this one ratchets, in the sense of [Ratcheting Standards](/concepts/ratcheting-standards).

The mechanism is three rules.

- **Existing violations are recorded once and grandfathered.** A baseline file records, per package, which requirements pass today. That is the debt, and it is visible rather than forgiven.
- **Only new debt fails.** A run fails when a package loses a requirement it used to pass. Improvements are reported, and are locked in by re-recording the baseline, never by editing the package until the table goes green.
- **A package the baseline has never seen has nothing to grandfather and must pass clean.** This is the rule that stops the baseline becoming a place to hide. Without it, adding a new non-conforming package would be the cheapest way to make the standard say nothing.

Two things about where the baseline lives are worth stating, because both were learned by getting them wrong. It is machine-local and never committed, since it records what the packages on one machine owe, which is that machine's private inventory. And it is never written beside the checker script: a checker installed as part of a plugin lives in a versioned cache that the next update deletes, so a baseline stored there vanishes on upgrade, after which every package reads as a newcomer that must pass clean and the table simply gets worse with nothing reporting why.

## The gap, stated rather than implied

**Upgrading a package stamped against an older skeleton is named and not built.** A generator that stamps conforming packages produces copies, copies drift, and the honest remedy for drift in a copy-based system is either a package the copies depend on or a checker that names the gap. The checker exists. The migration does not.

The reason it does not is the overengineering test. There is exactly one version of the skeleton, and nothing has been stamped from an earlier one, so nobody can name the caller. Building the migration now would be designing for a user who does not exist. **The trigger to build it is the first package stamped from a skeleton that has since changed**, and until then the honest report is that a package whose machinery is behind the standard still scores accurately, and nothing yet fixes it automatically.

A business plugin must also survive its owner dropping the tooling that generated it, which is why the skeleton stamps machinery into each package rather than having packages depend on a shared runtime. That choice buys transferability and pays for it in drift. Reporting the drift is the part that is owed; preventing it is not available at this price.

## Conforming by hand

Nothing in this standard requires any particular tooling. Every requirement is a file, a field, or a folder, and [the playbook](/playbooks/generate-a-business-plugin) walks through satisfying all seven by hand, with the one-command path named as a convenience rather than as the method. That is the test of whether this is craft: someone with none of the tooling should be able to read this page and produce a conforming package.

## Version Note

This is v0.1. It documents seven requirements that were each measured against a real population before being written down, and it will move when a requirement earns its place by the same two-part test.

- **v0.1 (2026-09-14):** initial version. Requirement 7 replaced a name-match check with a declaration check before publication.

## Further Reading

- [The Business Plugin](https://agenticbusiness.wiki/concepts/the-business-plugin): the doctrine this standard is the engineering half of.
- [Generate a Business Plugin](/playbooks/generate-a-business-plugin): the how, followable with no tooling.
- [Ratcheting Standards](/concepts/ratcheting-standards): the adoption mechanism, and why a standard nobody can adopt is not a standard.
- [Plugins](/concepts/plugins): the container itself, what it bundles and how it installs.
- [Campaign Plugins](/concepts/campaign-plugins): the same container for a time-bounded effort.
- [Hyperdocumented SOP](/concepts/hyperdocumented-sop): the map requirement 4 asks for.
- [Self-Improving Skills](/concepts/self-improving-skills): what the ship verb exists to circulate.
- [Standards](/reference/standards): the index page for the other formats in this family.
