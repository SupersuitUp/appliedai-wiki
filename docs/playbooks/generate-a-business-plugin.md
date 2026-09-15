---
title: Generate a Business Plugin
slug: /playbooks/generate-a-business-plugin
description: A one-time recipe that turns a business into an installable plugin holding its own verbs as skills. Name the verbs, write one map, stamp the package, and score it against the seven requirements of the business plugin standard. Followable by hand with no tooling.
image: "/img/comics/generate-a-business-plugin.webp"
---

# Generate a Business Plugin

*A one-time recipe that turns one business into an installable package somebody else could inherit: its verbs, its facts, its maps, its tests and its release path, versioned together.*

![Three panels in warm editorial ink and wash on cream paper. Title bar: GENERATE A BUSINESS PLUGIN. One: a man in a rust work shirt sits at a kitchen table with his back to us, writing on small cards and standing them in an open wooden box, while inside his glowing amber laptop the Chief of Agents in his gold cap waits beside an empty shelf; caption NAME WHAT YOU REPEAT. Two: the same table, and inside the screen the shelf now holds those cards with a folded paper hanging beside each one, the Chief of Agents reading one open in both hands while the man reads the matching paper at the table; caption A MAP BESIDE EVERY VERB. Three: the closed box now sits on a second desk across the room where a woman in a slate-blue jumper lifts the lid and takes out a card beside her own glowing laptop, while the man sits back with his hands off everything; caption SHIP IT OR IT REACHES NOBODY. Footer bar: NAME IT. MAP IT. SHIP IT.](/img/comics/generate-a-business-plugin.webp)

---

{/* last_updated: 2026-09-14 */}
{/* version: 0.1 */}

You are running a ONE-TIME GENERATION. After this completes, one business exists as a package: install it and an agent knows how this particular company onboards a client, which repository the site lives in, what a release has to pass, and who gets told when it ships. Do not re-run this for the same business. Re-run it to stand up a different one.

This is the runnable form of [The Business Plugin](https://agenticbusiness.wiki/concepts/the-business-plugin), held to the [Business Plugin Standard](/reference/standards/business-plugin). The standard says what has to be true of the package; this page is how to make it true.

**Nothing here requires any particular tooling.** Every requirement is a file, a field, or a folder, and every step below can be done with a text editor and `git`. Where a generator makes a step one command, that is named as a convenience at the end, never as the method. A reader who cannot run the command can still finish this page and end up with a conforming package.

## What This Generates

One repository, one plugin, scoring seven of seven against the standard on its first check:

- `.claude-plugin/plugin.json`: the manifest. Name, description, semver version, and the list of paths its skills live under.
- `.claude-plugin/marketplace.json`: the catalog the release verb refreshes, so the plugin can be installed by name rather than by path.
- `plugin.config.json`: the business's own facts in one place, declaring its own front door. No literal home paths and no contact details in any value.
- `skills/<front-door>/`: the verb you hand nothing, which reports where things stand and names one next move.
- `skills/ship/`: the verb that releases the plugin, so a fix reaches everyone who runs it.
- `skills/<verb>/` for each verb of the business, added over time rather than up front.
- `HDSOP.md` beside every one of those verbs: the map a human reviews and a buyer inherits.
- `run-tests.sh` at the root, discovering its tests rather than enumerating them, plus a `tests/` folder holding at least one real test.

The success test is concrete and is not "the folder exists". Hand the repository to someone who has never run this business, with no explanation, and ask them to do the thing the business does most often. If they can find the door, read the map, run the verb, and ship a correction back, the package is real.

## Prerequisites

- `git`, and a text editor.
- A shell that runs `bash`, for the test runner.
- Whatever your tests are written in. Node, Python and plain shell all work; pick one and stay with it.
- A business that repeats something. This is the real prerequisite, and it is checked in the interview below rather than assumed.

## Interview

Ask each question one at a time. Two of them cannot be decided for the operator, and the rest can, so do not ask the rest.

**Q1. What is the business called?** It becomes the plugin name, the skill namespace and the front-door folder, so it has to be lowercase kebab-case. Offer the obvious conversions of the name they already said and let them type their own.

**Q2. Which things does it repeat?** This is the verb list and it is theirs. Offer the candidates you can actually see, from what they have described, from folders they already keep, from work they say they do every week. Ten or fewer to begin. The test for each candidate is whether one agent session could take it start to finish: "onboard a client" is a verb if a session can go from a signed contract to accounts made, welcome sent and record updated. "Grow the business" is a hundred verbs wearing one name, and what goes in the package is the hundred, or rather the eight of them that matter.

Everything else is decided rather than asked. The description comes from the sentence they already said about the business. The config's shape, the folder layout, the test runner and the release verb each have one right answer.

### Refuse the wrong shape out loud

Three requests look like this recipe and are not, and each gets refused by name with the thing that does fit offered in the same breath.

- **A one-off piece of work.** It has an end, so it is a project, not a package of verbs.
- **A business with no verb anyone repeats.** There is nothing to put in the package. Say the shape is not there yet, and map the work first.
- **One skill the operator wants for themselves.** Wrapping it in a plugin buys a release process nobody needs.

Generating anyway produces a folder that looks finished, gets opened once, and then has to be remembered as empty.

## Common scenarios

- **A solo owner packaging what is already in their head.** Start with two verbs: the front door and `ship`. Add the third the second time you catch yourself doing something by hand. The package is real after step 5, and everything after that is the business getting more valuable each time a verb runs.
- **A two-person business where one person holds the operations.** Do step 2 first and carefully, because the config is where the second person's machine gets accommodated. A configured path tried first and the repository name second is what makes the package run on both machines.
- **A business being prepared for sale or for a manager.** Weight step 4. The maps are what the incoming person reads, and they are the half of this package that a buyer actually scores.

## Steps

Show the operator the output after each step. Do not chain steps silently.

### 1. Create the repository and the manifest

```bash
mkdir -p ~/code/<name>/.claude-plugin ~/code/<name>/skills ~/code/<name>/tests
cd ~/code/<name> && git init -b main
```

Write `.claude-plugin/plugin.json`:

```json
{
  "name": "<name>",
  "version": "0.1.0",
  "description": "<one sentence about what this business does>",
  "skills": ["./skills/"]
}
```

The version is not decoration. It is the field that makes staleness detectable, and without it nothing downstream can ask whether this package is current.

Write `.claude-plugin/marketplace.json` beside it, naming the same plugin with `"source": "./"`, so the package can be added as a marketplace once a remote exists.

**Success:** the manifest parses, and the version reads as semver.

### 2. Declare the business's facts in one config

Write `plugin.config.json` at the root:

```json
{
  "workspace": "~/code/<name>-workspace",
  "repos": {},
  "people": [],
  "frontDoor": "<name>"
}
```

Two rules decide whether this file is worth having.

**Paths resolve by repository name, with the configured path tried first.** The folder a clone lands in varies per person; the repository it came from does not. That fallback is the entire reason the package runs on a second machine, and it is the thing to get right before the verb list grows.

**No literal home path, no email address, no phone number, in any value.** A path rooted in one machine's home directory works for one person. A contact detail in a repository is disclosed to everyone who ever had access, which now includes whoever inherits the business. People are named, and their contact details are resolved from the operator's own relationships directory, outside the package.

**Success:** the file parses, and a second person could read it and know where this business's work lives on their own machine.

### 3. Write the front door

Create `skills/<name>/SKILL.md`. This is the verb you hand nothing.

It reads the config, resolves the repositories it names, re-derives the current standing from those checkouts rather than reporting a remembered fact, says where things stand in three lines or fewer, and names exactly one next move. If the operator named something to do, it routes to that verb instead. If the named thing has no verb yet, it says so, does the nearest useful thing, and records the request with today's date.

Two behaviors are worth writing in explicitly because they are the difference between a door and a decoration. A repository named in the config and absent from this machine is reported as unknown rather than as fine. And a config naming no repositories at all is the package's first invocation, so the honest response is to say it is unconfigured and name the first configuration step rather than to report an empty business as healthy.

Then declare it. `"frontDoor": "<name>"` in the config, from step 2, is the declaration, and the standard checks that the skill it names exists. A declaration pointing at nothing fails, which is the point: a door named in a config and missing on disk reads as a door in a report and is a wall in practice.

**Success:** someone who knows nothing about the verb list can type the name of the business and get an answer they can act on.

### 4. Write one map, beside the verb it maps

Create `HDSOP.md` in the front door's own folder, and one beside every verb from here on. The map carries what the step is for, what triggers it, what it reads, what it writes, where it refuses, what a human still has to decide, and the procedure as numbered steps.

Two habits from maps that have survived contact with real work. Mark which steps are irreducibly human and which are agent-executed, in the procedure itself rather than in a preamble, because that is the line a second person needs to see first. And write the refusals down: the conditions under which the verb should stop and say so are the design, and they are the part a written procedure almost always omits.

The standard only checks that the file exists, which is [deliberate](/reference/standards/business-plugin): whether a map is any good is not mechanically decidable, and a check that pretended to measure quality would be satisfied within a week by maps that say nothing. The quality is yours to own. The file being there is what the machine can promise.

**Success:** a person who does not run this business can read the map and describe what the verb does, including when it should refuse.

### 5. Write the ship verb

Create `skills/ship/SKILL.md` plus its map. This is the verb that makes every other verb improve.

It runs the tests, bumps the version, commits, pushes, refreshes the marketplace catalog, updates the local install, and verifies against the remote rather than against the local disk. That last one matters more than it sounds: a release verified on the machine that built it is a release that reaches its author, which is the exact failure the verb exists to prevent.

Two edges to write into the verb rather than leaving to memory. **The remote is the operator's**, so the first release stops and asks which account it belongs to and whether it is private, rather than creating a repository under whatever account happens to be authenticated. And **the marketplace is added from the remote, never from a local clone**, because a marketplace added from a clone resolves to that folder forever, so every update afterward reports "already up to date" correctly and reaches nobody.

The package exists after this step. Everything that follows is the business getting more valuable each time a verb runs.

**Success:** a one-line change committed here reaches a second person's machine, and you watched it arrive there rather than assuming it did.

### 6. Write a test runner that discovers, and one real test

Create `run-tests.sh` at the root, make it executable, and have it find its tests rather than list them:

```bash
#!/usr/bin/env bash
set -uo pipefail
cd "$(dirname "$0")"
fail=0
found=0
while IFS= read -r f; do
  found=$((found+1))
  node --test "$f" || fail=1
done < <(find . -name '*.test.mjs' -not -path './node_modules/*' | sort)
if [ "$found" -eq 0 ]; then
  echo "no test files found" >&2
  exit 1
fi
exit "$fail"
```

Three properties of that script are load-bearing, and each one is there because its absence produced a green run over a broken suite.

**It discovers.** An enumerated list drops any suite nobody remembered to add, silently. One package lost a twenty-two-test suite that way for weeks.

**It captures the exit status rather than piping the run.** Piping to something like `tail` masks a non-zero status, so the runner reports green over red.

**Zero suites found is a failure.** A package that has deleted its last test should say so out loud rather than passing on nothing.

If your tests are not Node, change the glob and the command together. If you accept more than one shape, discover all of them: a runner that globs one pattern while the standard counts three lets a business write its suite in either of the other two and have the runner execute nothing.

Then write one test that would actually fail. The cheapest honest first test asserts that the config parses, declares a `frontDoor`, and that the skill it names exists on disk.

**Success:** you broke the test on purpose, watched it go red, and put it back.

### 7. Score it against the standard

Walk the seven requirements and confirm each one by looking, not by remembering:

1. `.claude-plugin/plugin.json` has a name, a description, and a semver version.
2. A config file at the root parses, and no value in it is a home-rooted path, an email address, or a phone number.
3. At least one `skills/<verb>/SKILL.md` exists.
4. Every one of those verbs has an `HDSOP.md` beside it.
5. A verb named `ship` exists.
6. `run-tests.sh` exists and at least one test file exists, and running the script executes the tests rather than reporting zero.
7. The config declares a front door, and the skill it declares exists.

**Seven of seven with nothing hand-edited afterward is the bar.** If a generated package scores lower, that is a disagreement between the generator and the standard, and the fix is to reconcile the two rather than to edit the package until the table goes green.

**Success:** seven of seven, checked by looking at the files.

### 8. Add the next verb the second time you do something by hand

The package is finished as a package and unfinished as a business, permanently, which is the intended state. The rule that keeps it moving: a verb that ran wrong, ran twice, or needed a hand-fix gets its fix filed into the skill on the first occurrence, in the same session. The second occurrence is a different day and a different agent who does not know there was a first, so [waiting for it](/perspectives/dont-hand-off-a-skill-until-it-one-shots) is how nothing ever gets filed.

Then ship it, so the improvement is versioned with the plugin and the whole business has it the next time anyone runs the verb.

**Success:** the verb list grew because work happened, and each addition arrived through step 5 rather than by hand on one machine.

## Output

- Repository: `~/code/<name>/` or wherever the business keeps its work.
- Manifest and catalog: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`.
- Config: `plugin.config.json`, declaring the front door.
- Verbs: `skills/<name>/`, `skills/ship/`, and one folder per verb of the business.
- Maps: `HDSOP.md` beside every verb.
- Tests: `run-tests.sh` at the root and at least one file under `tests/`.

## The one-command path

If you run tooling that already knows this standard, steps 1 and 2, most of 3 and 5, and all of 6 collapse into a single stamp command that writes a conforming skeleton, and a second command scores any package directory against the seven requirements with a [ratchet](/concepts/ratcheting-standards) over an existing population. That is a convenience, and this recipe is the thing it automates.

Two properties belong to the stamp rather than to the standard, and they are worth insisting on in whatever you use. **A freshly stamped package scores seven of seven with nothing hand-edited**, because a generator that needs manual repair to satisfy the standard it ships with is a generator disagreeing with itself. And **the stamp deliberately leaves two things undone**: the remote, because only the operator knows which account this belongs to, and the config's claims about the business, which have to be read back and corrected by the person who knows them. A config nobody approved is a guess published in the confident voice of a fact.

## Pairs with

- [Business Plugin Standard](/reference/standards/business-plugin): what this recipe is aiming at, requirement by requirement.
- [The Business Plugin](https://agenticbusiness.wiki/concepts/the-business-plugin): the doctrine, and the worked example of a two-partner business running on one.
- [Hyperdocumented SOP](/concepts/hyperdocumented-sop): the map format step 4 asks for.
- [Ratcheting Standards](/concepts/ratcheting-standards): how a population of non-conforming packages adopts this without a cleanup first.
- [Plugins](/concepts/plugins): the container, what it bundles, and how it installs.
- [Decompose the Workflow](/playbooks/decompose-the-workflow): how to get from "we do sales" to verbs sized for one session.

## Pitfalls

- **Naming verbs that no session could finish.** "Run marketing" is a department. A verb an agent cannot take start to finish is a project several verbs serve, and the verbs are what go in the package.
- **Stamping before there is a repeated thing.** A package with no verb anyone repeats is a folder that looks finished and is opened once.
- **A literal home path in the config.** It works on the machine that wrote it and fails silently everywhere else, usually on the day a second person joins.
- **A contact detail in the config.** The repository keeps it forever and hands it to everyone who ever had access. Name the person; resolve their details outside the package.
- **Maps written after the fact, in a batch.** A map written a month after the verb describes what the author remembers rather than what the verb does. Write it beside the verb, in the same sitting.
- **A test runner that enumerates.** It will drop a suite, it will stay green while doing it, and nothing will report it.
- **Verifying a release against the local disk.** The whole point of the ship verb is reaching a second machine. Check the remote, and check the version moved on somebody else's install.
- **Adding the marketplace from a local clone.** Every update afterward correctly reports that nothing changed, and the release reaches nobody.
- **A front door declared and not written.** It scores worse than declaring nothing, and it should: the report says there is a way in, and there is not.
- **Fixing the package until the checker goes green.** When a generated package fails its own standard, the generator and the standard disagree, and editing the output hides which one is wrong.
