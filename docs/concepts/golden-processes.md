---
title: "Golden Processes"
slug: /concepts/golden-processes
description: "Golden is a status for how you make things, not only for the artifacts you keep. A golden process is a human-blessed, version-controlled procedure that reliably turns a small amount of the right human input into an excellent result."
image: "/img/comics/golden-processes.png"
---

# Golden Processes

*Golden is a status for how you make things, not only for the artifacts you keep. A golden process is a human-blessed, version-controlled procedure that reliably turns a small amount of the right human input into an excellent result. It is discovered in real work, refined over repetitions, and checked into modular skills and plugins, so an emergent good workflow stops being re-improvised every time and becomes reusable, isolable, and reliable.*

![Three-panel cream-paper comic titled GOLDEN PROCESSES. Panel 1: Midas the hyperagent in matte-navy plate armor works a task the hard way at a cluttered workbench, one path glowing orange, caption "Midas runs it the hard way, and the shape that works emerges." Panel 2: Midas presses an orange APPROVED stamp on the refined procedure and slots it as a modular cartridge into a shelf of plugin cartridges, caption "He blesses the proven procedure and checks it in as a modular skill." Panel 3: in the navy cyber-cathedral the holographic Chief of Agents with a gold comms crown runs the process on floating grids, a small input flowing in and a finished artifact out, caption "Now it runs itself: small input in, excellent result out." Footer bar: GOLDEN IS A STATUS YOU CONFER ON HOW YOU MAKE, NOT ONLY WHAT YOU KEEP.](/img/comics/golden-processes.png)

---

## Golden is not only for artifacts

The word [golden](/concepts/golden) names a promotion gate: a human with the authority to set the bar looks at a candidate and rules it into the canon, where it becomes load-bearing on all future work. That framing usually attaches to *things* you keep, [golden examples](/concepts/golden-examples), [golden atomic brand references](/concepts/golden-atomic-brand-references), golden templates. The blessed artifact rides back into the system as a reference and pulls future output toward the standard.

The same gate applies to *how the work gets done*. A procedure can be golden too. When a way of producing a result has been proven, blessed, and promoted into the version-controlled library, it stops being tribal knowledge or a one-off improvisation and becomes a **golden process**: an asset the operation owns, on the same footing as its golden artifacts.

The distinction matters because artifacts and processes compound differently. A golden reference raises the floor on the next render of its kind. A golden process raises the floor on an entire *class* of work, every time it runs, for anyone who invokes it.

## Processes are discovered, then refined

A golden process is not designed on a whiteboard and handed down. It is unearthed. You do the work once the hard way, notice which parts carried the quality and which were noise, and a shape emerges: the sequence of moves that reliably produced the good result. That emergent shape is a candidate process, the procedural equivalent of an artifact sitting in `explorations/` waiting to be blessed.

Refinement is the rest of the discipline. Each repetition exposes a gap, a step that was ambiguous, a check that was missing, a default that was wrong. You harden the procedure against what actually broke, not against what you imagine might. Over enough repetitions the process converges: fewer surprises, tighter output variance, less human babysitting per run. Convergence is the signal that a candidate is ready to be promoted.

This is why golden processes cannot be bought or copied wholesale. The value is in the accumulated corrections, the same reason a curated [golden examples](/concepts/golden-examples) library is a moat: what you keep, and what you fixed, is what a competitor cannot clone.

## Check them in: modular skills and plugins

A discovered process that lives only in a person's head, or in a chat transcript, is not golden. It is not version-controlled, not reusable, and not isolable. Promotion means checking it in as code and documentation the system can invoke: a [skill file](/concepts/hyperlocal-skills), and increasingly a **plugin** that bundles many interrelated skill files into one modular unit.

Modularity is the point, and it is ordinary good software practice applied to agentic work. When a process is decomposed into small, named, independently-owned components:

- You can **improve one component without risking the rest.** A better readback step ships without touching the render loop.
- You can **isolate the culprit** when output degrades. A modular process fails in a locatable place; a monolithic script fails as a blob.
- You can **compose** proven components into new processes instead of rebuilding from scratch.

A plugin of interrelated skills is a golden process made durable: the sequence, the checks, the defaults, and the invariants, all captured where the next run reads them the same way every time. See [fat skills](/concepts/fat-skills) for how much load a single skill should carry, and [agent rule files](/concepts/agent-rule-files) for the always-on layer that governs behavior across every process.

## Skillify reusable code generation

The most common place a golden process leaks value is the boundary between what the model should author and what should be permanent code. An agent will happily regenerate the same deterministic scaffolding on every run: the loop that assembles a prompt, fans out parallel image renders, and writes the outputs. That loop is identical across runs. Regenerating it each time is not flexibility. It is waste, and worse, it is non-reproducible, because each regeneration can drift.

The rule that closes the leak: **the model authors only what genuinely varies; the invariant loop is checked-in deterministic code.** Concretely, the varying content, the prose rules, the scene descriptions, the specific inputs, gets authored per instance and version-controlled as data. The mechanical procedure that consumes that data runs from one committed script, reused, never re-emitted. The one step that legitimately needs the model on every run, the judgment call, the readback, the taste decision, stays with the model because it is not deterministic.

The operational reflex is to treat **repeated code generation as a signal.** The second time an agent writes substantially the same deterministic code, that code is an emergent golden-process candidate. It should be promoted into a checked-in skill or plugin instead of regenerated a third time. Unearthing and skillifying these reusable generations is how a system's golden-process library grows from real usage rather than from planning.

## Precision is the enabling requirement

A process is only promotable to golden if it is specified precisely enough that an agent executes it faithfully. A procedure written for a human to skim and get the gist leaves gaps the reader fills with judgment. An agent does not fill gaps with judgment; it fills them with improvisation, and improvisation is the enemy of reproducibility. The density that reads as over-engineering to a human skimming is exactly what lets an agent copilot the process without drifting. This is its own claim, treated in [Precise Procedures Are Written for the Agent](/perspectives/precise-procedures-are-written-for-the-agent).

## The horizon: convergence to reliability

The reason to invest in golden processes is not tidiness. It is a trajectory. As the underlying models improve, image, video, reasoning, the deterministic scaffolding around them gets more reliable and the required human input shrinks toward the part that is irreducibly human: the taste, the intent, the blessing. A well-built golden process converges toward incredible reliability, where the human does a small, high-judgment amount and an excellent result happens every time.

That reframes the goal of automation. The aim is not to remove the human from the loop; it is to reduce the human's obligation to exactly the part that carries their judgment and, for the work they care about, the part they find meaningful. For sentimental work made for a loved one, the ideal is not maximum automation but the right participation: the person contributes the stories and the love and the final yes, and the reliable process carries everything else. Golden processes are how that participation stays constant while reliability climbs. The [judgment line](/perspectives/the-judgment-line) is what remains on the human's side of that boundary as everything below it converges.

## Further Reading

- [Golden](/concepts/golden): the promotion gate this concept extends from artifacts to procedures.
- [Golden Examples](/concepts/golden-examples): the artifact-side discipline and the compounding that makes blessing worth defending.
- [Precise Procedures Are Written for the Agent](/perspectives/precise-procedures-are-written-for-the-agent): why a golden process must be specified without ambiguity.
- [Hyperlocal Skills](/concepts/hyperlocal-skills): where a checked-in process lives so it travels with the work it concerns.
- [Fat Skills](/concepts/fat-skills): how much a single skill should carry.
- [Agent Rule Files](/concepts/agent-rule-files): the always-on layer that governs behavior across every process.
- [Hyperdocumented SOP](/concepts/hyperdocumented-sop): mapping a real workflow precisely enough to prove it against reality and progressively automate it.
- [Version-Control Your Prompts](/disciplines/version-control-your-prompts): the provenance that lets a candidate process be promoted, reproduced, and trusted.
- [In, On, or Out of the Loop](/concepts/in-on-out-of-the-loop): golden processes move the human up the ladder toward on-the-loop without removing them.
