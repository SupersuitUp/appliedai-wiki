---
title: "The Jagged Frontier"
slug: /perspectives/the-jagged-frontier
description: "AI capability has an uneven border. Human-perceived difficulty does not predict which tasks AI does brilliantly and which it botches. You map the border by probing it, and it moves outward every week."
image: "/img/comics/the-jagged-frontier.png"
---

# The Jagged Frontier

*AI capability has an uneven border. Human-perceived difficulty does not predict which tasks AI does brilliantly and which it botches. You map the border by probing it, and the border moves outward every week.*

![Four-panel neo-comic action-zine on cream paper, crimson + cobalt + gold + cyan. Title bar: THE JAGGED FRONTIER. 1. THE JAGGED BORDER: a map split by a jagged glowing cyan border, left territory gold and labeled AI BRILLIANT, right territory crimson and labeled AI BREAKS; a STRATEGIC MEMO card with a gold check sits in the brilliant zone, a COUNT THE WORDS card with a red X sits in the breaks zone; the supersuited hyperagent studies the line. Caption: 'The border is jagged. How hard a task looks to you does not predict which side it lands on.' 2. PROBE, DON'T PREDICT: the hyperagent in a high-tech workshop throwing glowing task-tokens at the same map, patches lighting up BRILLIANT (gold) or BREAKS (crimson); HUD reads MAP BY PROBING, NOT PREDICTING and EDGE MOVES OUTWARD / NEXT WEEK as the border creeps into the crimson. Caption: 'The hyperagent maps the edge by running the work, not guessing it. And the edge moves outward every week.' 3. IT FILLS YOUR GAPS: a cobalt HUMAN STRENGTHS silhouette on the left, the hyperagent at center with cyan-and-gold AI light filling the jagged notches in his skill-map, an AI CAPABILITIES silhouette on the right, a bright band labeled YOUR EDGE, IRREPLACEABLE, HUD cards WEAK REGIONS IDENTIFIED and AI FILLS GAPS EXACTLY. Caption: 'Wielded well, AI fills the hyperagent's weak regions, so he spends more time in the narrow band where he is irreplaceable.' 4. JUDGMENT HOLDS THE LINE: first-person POV through the armored helmet visor, a GREAT card in gold on the AI BRILLIANT side and a SLOP card with a red X on the AI BREAKS side, a cyan reticle locked on the SLOP card labeled CAUGHT, a gauntleted hand reaching to reject it, status strip HYPERCONTEXT LOADED, a gold spiral halo at the top of the visor frame. Caption: 'On a border that shifts under you, the hyperagent's judgment is what tells good from slop.' Footer bar: PROBE THE EDGE. JUDGMENT HOLDS THE LINE.](/img/comics/the-jagged-frontier.png)

---

## The claim

Picture a map. Inside one border is everything AI does well; outside it is everything AI does poorly. The intuitive expectation is that this border is smooth and sensible: easy tasks inside, hard tasks outside. It is not. The border is jagged. Two tasks that look equally hard to a person sit on opposite sides of it. The model writes a sharp strategic memo (looks hard) and then miscounts the words in it (looks trivial). Difficulty as a human perceives it does not predict which side of the line a task falls on.

The term comes from the 2023 Harvard Business School and BCG field experiment [*Navigating the Jagged Technological Frontier*](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700) (Dell'Acqua, Mollick, et al.). Consultants given a capable model on tasks inside the frontier finished 12% more work, 25% faster, at roughly 40% higher quality. On a task deliberately placed outside the frontier, the same model made them about 19 percentage points more likely to land on the wrong answer. Same tool, same people, opposite outcomes, decided entirely by which side of the jagged line the task fell on.

This is the load-bearing idea, and everything actionable falls out of it.

## You cannot map it from a desk

Because human-perceived difficulty does not predict the border, you cannot reason your way to it in advance. A team that decides up front "AI handles X, people handle Y" has drawn a map of a coastline it never visited. The only way to find the edge is to throw real tasks at the model and watch where it is brilliant and where it face-plants. The probing is the work. (This is the discipline named in [Agentic Exploration](/concepts/agentic-exploration): you discover the shape of what the model can do by running it, not by predicting it.)

What an implementer does differently on Monday: stop pre-deciding what is "an AI task." Put the model on the real work, including the work you assume needs a person, and let it show you the border for this task, this week, this model.

## The border moves outward

The frontier is not fixed. A task on the "AI is bad at this" side this month lands on the "AI is superhuman at this" side next month, because the models keep improving and the scaffolding around them keeps getting better. So the probing never stops. You are mapping a coastline that advances while you survey it. A capability you ruled out a quarter ago is worth re-testing now. (See [Three Waves of AI Adoption](/perspectives/three-waves-of-ai-adoption) for the longer arc, and [Self-Improving Systems](/concepts/self-improving-systems) for the compounding underneath it.)

## Complementarity: it fills your gaps

Here is the payoff most people miss. The standard framing is that AI speeds up your existing judgment. The jagged frontier says something stronger: there are regions inside the model's border that sit outside yours. Things it is genuinely better at than you, not merely faster. Wielded well, those regions do not replace your judgment. They fill in your weaknesses, so you spend more of your time in the narrow band where you are the one who is irreplaceable.

That is the symbiosis. The model covers your jagged gaps; you cover its. The net effect is an operator who keeps stepping further into their own edge, with limited downside, because the model is carrying the parts of the work that were never the operator's strength in the first place. Mollick's [centaur and cyborg](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700) patterns describe two ways to run this pairing: the centaur splits the work at the border (you do your side, the model does its side), the cyborg interleaves at the level of individual moves. Both are ways of keeping a human's strengths and the model's strengths on the right sides of the line.

The downside stays limited only when the pairing is deliberate. Hand a task to the model on the far side of the frontier with no check, and the 19-point error rate is what you get.

## Why it takes a certain kind of operator

Probing the frontier honestly requires the judgment to recognize when an output is slop on the wrong side of the border. An operator who knows what great looks like catches the model when it confidently produces something broken. An operator who does not cannot tell which side of the line they are on, so the same tool that fills a discerning person's gaps simply multiplies an undiscerning person's blind spots. (This is the [Slop Factory](/perspectives/slop-factory) failure mode, and the reason [evaluation](/disciplines/evals) is the skill that makes the frontier safe to work across.)

So the frontier is not just a fact about models. It is a fact about the pairing. The capability is uneven, it moves, and the value you extract from it is gated by whether the human in the loop has the taste to know good from broken on a border that shifts under them.

## Further Reading

- [Agentic Exploration](/concepts/agentic-exploration), the discipline of discovering capability by probing rather than predicting.
- [Slop Factory](/perspectives/slop-factory), what happens when the frontier is worked without judgment.
- [Evals](/disciplines/evals), the skill that tells you which side of the border an output fell on.
- [Self-Improving Systems](/concepts/self-improving-systems), the compounding that pushes the border outward.
- [Three Waves of AI Adoption](/perspectives/three-waves-of-ai-adoption), the longer arc of the frontier advancing.
- [You Are the Bottleneck](/perspectives/you-are-the-bottleneck), why the human's judgment, not the model, sets the ceiling.
