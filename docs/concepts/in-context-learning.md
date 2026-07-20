---
title: "In-Context Learning"
slug: /concepts/in-context-learning
description: "The only lever you have. You cannot touch the model's weights, so every customization enters as text in the context window. Which turns agent customization into context engineering under a fixed budget."
image: "/img/comics/in-context-learning.png"
---

# In-Context Learning

*The only lever you have. You cannot touch the model's weights, so every customization your codebase, your conventions, your institutional memory enters as text in the context window. Which turns agent customization into context engineering under a fixed budget.*

![4-panel cream-paper action-comic, title bar "IN-CONTEXT LEARNING", footer bar "CAN'T TOUCH THE WEIGHTS. ONLY THE TEXT. SPEND THE BUDGET ON SIGNAL." Panel 1, THE ONLY KNOB IS TEXT: Midas the Blasian hyperagent in matte-navy Supersuit with orange seams turns away from a sealed glass case stamped "MODEL WEIGHTS - SEALED / NO ACCESS" and feeds parchment cards labeled SKILLS, RULES, DOCS into a glowing cyan frame labeled CONTEXT WINDOW. HUD: "CAN'T TOUCH THE WEIGHTS / ONLY THE CONTEXT." Caption: "You can't change the weights. Only the text." Panel 2, THE FIXED BUDGET: same window now labeled "CONTEXT WINDOW ~1M TOKENS / FIXED" with a side BUDGET meter; Midas slides small cards in while two oversized cards stamped WHOLE WIKI and WHOLE CODEBASE sit on the floor because they will not fit. HUD: "MINIMUM SUFFICIENT / LEAVE ROOM TO WORK." Caption: "Like running a package manager on an Arduino." Panel 3, DON'T PAY FOR WHAT YOU DON'T USE: the window shown as a stack, cyan STABLE/SHARED cards (SYSTEM PROMPT, CORE INSTRUCTIONS, API REFERENCE, DOMAIN SPEC, TEAM STYLE GUIDE) locked at the FRONT and orange PER-TASK/VOLATILE cards (CURRENT TASK NOTES, RECENT CONVERSATION, USER REQUEST, DRAFT OUTPUTS, TEMP SCRATCHPAD) at the END; a red warning points at a front card: "MOVE A FRONT CARD -> 10x UNCACHED." Caption: "Stable at the front. Volatile at the end." Panel 4, RED SQUIGGLIES: first-person view through Midas's helmet visor; outside the window a script box labeled POST-TOOL HOOK fires and returns a red-underlined nudge card reading "GENERATED FILE - REVERT?" that a gauntleted hand reaches toward. HUD: "TIGHTER FEEDBACK LOOP > SMARTER MODEL." Caption: "The fastest upgrade is a tighter loop, not a bigger model."](/img/comics/in-context-learning.png)

---

## The only knob is text

There are two ways to change how an AI system behaves: change the weights, or change the context. For anyone customizing an agent for their own work, only the second one is on the table. You have no way to affect the weights of a frontier model. Everything you can do to steer it, all of it, is text you put into the context window.

That is what "in-context learning" names. You will hear it abbreviated ICL. It sounds like a research term, and it is one, but in day-to-day applied AI work it means something plain. Daisy Holman, an engineer on the Claude Code team, put it best in a 2026 talk:

> ICL is a fancy word for when you want people to think you're smart, but you're actually just talking about text files.
>
> Daisy Holman, [Beyond the Basics with Claude Code](https://youtu.be/tuY2ChJIx48), talk, 2026-05-22

Skills, tools, [agent rule files](/concepts/agent-rule-files), [skill files](/concepts/skill-files), hooks, retrieved documents: they are all just text entering the context window. There is good and bad in that. The bad is that text is the entire surface, so a hard budget bounds everything you can teach the model. The good is that you do not need to understand a single thing about the weights to change the behavior. It is easy to start, which is exactly why people stop too early. They wire up a rule file, decide it is good enough, and never learn that in-context learning is a discipline with real optimization in it.

## Why the weights are a dead end

The obvious objection is: why not fine-tune? Just train your codebase's conventions, your internal vocabulary, your institutional memory into a model and be done. At frontier scale this fails, for three reasons.

**The bitter lesson.** General AI wins out over specialized AI in the long run. A model trained broadly and cheaply keeps overtaking the hand-tuned specialist. Betting your customization on a narrowly tuned model is betting against the direction the whole field moves.

**Frontier churn.** Frontier models turn over fast. By the time even a very large company finishes fine-tuning for something small, a stronger base model has shipped, and the fine-tune has to start over against the new floor. The economics do not close.

**Hallucination.** Fine-tuning on specialized, factual, company-specific information can make a model hallucinate *more*, not less. Teaching the weights new facts pushes the model to confabulate in the neighborhood of those facts. Research from late 2025 documents the effect.

So the weights are not a lever you fight to reach. Institutional knowledge, things that changed last week, internal APIs, the stuff that is uniquely yours: none of it belongs in a training run. It belongs in the context, delivered as text, at the moment the agent needs it.

## The context window is a fixed budget

If text is the only lever, the size of the window is the constraint that governs everything. And the striking fact is that it is not growing. Frontier context has hovered around a million tokens while the models themselves got dramatically better. The window is a roughly fixed target, and context engineering has to be designed against it.

That makes the problem feel less like a spacious document and more like an embedded system. Holman's analogy: it is like running a package manager on an Arduino. You have a tiny amount of memory, you have to pick the very most important things to load, you want the smallest sufficient version of each, and you have to leave enough room to do the actual work. Install packages willy-nilly on an Arduino and there is no room left for your own code. Dump your whole wiki, your whole codebase, and every internal doc into the window and there is no room left to think.

The naive move is to load everything. The disciplined move is to load the minimum sufficient context for the task in front of you, and to structure your knowledge so the right slice is reachable at the right time. See [context engineering](/disciplines/context-engineering) for how that structuring is done, and [context overflow](/concepts/context-overflow) for what happens when it is not.

## Don't pay for what you don't use

There is a principle from C++ that transfers exactly: don't pay for what you don't use. It is called the zero-overhead abstraction principle, and here it is not a nice-to-have. You cannot buy your way past the window with more compute, because the limit is the window itself. The only way to fit more useful information is to stop spending tokens on information the task does not need.

One more constraint makes this sharper, and it is the part most people miss. Treating the window like an ordinary cache, evicting whatever was least recently used, does not work, because of the KV cache. The cost of computing the next token depends on it, and the rule is unforgiving: change something early in the prompt and every token after that change becomes uncached, and uncached tokens can cost around ten times as much. You cannot quietly swap one tool out of a block near the front without re-billing the entire window behind it.

The design that follows is concrete. Put stable, shared material at the very front, where it stays cached across every turn. Put volatile, per-task material near the end, where it can be evicted without invalidating everything upstream of it. Some tokens are cheap and some are expensive; a good context layout keeps the expensive ones from moving.

## Judge every abstraction by whether it scales

Once you accept the fixed budget, every customization primitive gets the same test: what happens when you have a hundred thousand of them? Real monorepos already do. An abstraction is only worth adopting if its cost stays flat as the count grows.

**Zero-overhead abstractions win.** A hook runs outside the context window. If you have a hundred thousand of them and 99,995 do not match the current action or return nothing, they cost zero tokens; your only constraint is your computer. You have taken a scarce resource and traded it for an abundant one. That is the property to hunt for.

**Abstractions that look cheap but aren't.** An unconditional injection, a file every plugin gets to add to the system prompt, looks like the cheapest thing in the world, one small file. But every plugin would ship one, and the sum does not scale. The honest version forces the cost into the open: if a plugin truly must add standing context, it does so through a session-start hook, so the reader can see they are paying for it on every turn. Cheap-looking and cheap are not the same thing.

**Tools that scale with intelligence vs. tools that compensate for its lack.** A hard block that forbids the agent from ever referencing an undefined symbol produces fewer mistakes in theory, but it forces the agent to write in a rigid order and gets less useful as the model gets smarter. An overwritable nudge does the opposite. Holman calls these the red squigglies for your agent: a post-tool-use hook runs a linter or type check and leaves a reminder the agent can reason past when it knows better, exactly like the red underline that makes a human pause without stopping them. Build the nudge, not the block. As the models improve, the nudge gets *more* useful and the block gets *more* in the way.

The whole stance compresses to one line from the talk:

> The fastest way to make your agent better at your code base isn't a smarter model, it's a tighter feedback loop.
>
> Daisy Holman, [Beyond the Basics with Claude Code](https://youtu.be/tuY2ChJIx48), talk, 2026-05-22

## For practitioners

Every knob you reach for, a rule file, a skill, a retrieval pipeline, a hook, is in-context learning under a fixed budget. That reframes the job. You are not teaching a model; you are deciding what text is worth its space and where in the window it should sit. The winning moves are consistent: keep only the minimum sufficient context, place it by how volatile it is, and prefer abstractions whose cost stays flat when there are a hundred thousand of them. When a client's agent takes the wrong direction, the fix is almost never a bigger model. It is context the agent could not see, delivered as text, at the right moment.

## Further Reading

- [Context Engineering](/disciplines/context-engineering): the discipline of doing in-context learning well. This page is why the lever is text; that page is how to wield it.
- [Context Overflow](/concepts/context-overflow): what happens when you spend the fixed budget badly.
- [Golden Examples](/concepts/golden-examples): one slice of in-context evidence, curated so the reference the model reads is A+.
- [The Token Economy](/perspectives/the-token-economy): the pricing reality underneath "don't pay for what you don't use."
- [Plugins](/concepts/plugins): the packaging layer whose primitives (skills, hooks, agents) this page evaluates for scale.
- [The Case for Simple Harnesses](/perspectives/the-case-for-simple-harnesses): the harness-design corollary of a fixed context budget.
- Source: [Anthropic](/note-sharers/anthropic), specifically [Beyond the Basics with Claude Code](/note-sharers/anthropic/2026-05-22-beyond-the-basics-with-claude-code), the field-note log of what was lifted from Daisy Holman's talk.
