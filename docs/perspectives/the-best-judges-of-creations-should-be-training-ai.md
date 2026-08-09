---
title: "The Best Judges of Creations Should Be Training AI"
slug: /perspectives/the-best-judges-of-creations-should-be-training-ai
description: "Taste is not a scale problem. A model's ceiling on any creative domain is the taste of whoever judged its output, so the highest-leverage hire in applied AI is the person whose verdict on a creation the market already trusts."
image: "/img/comics/the-best-judges-of-creations-should-be-training-ai.png"
---

# The Best Judges of Creations Should Be Training AI

*A model's taste ceiling is the taste of whoever judged its output. So the way you make AI have taste is not a better architecture or more data. It is hiring the people whose verdict on a creation the world already trusts, and putting their judgment in the loop.*

![Three panels. One: in a warm studio, a laptop glows on a workbench while inside its screen small agents hold up freshly made garments toward a row of identical grey silhouettes at a counting desk, each stamping the same neutral mark on everything; caption "SCALE JUDGES BY THE PAGE". Two: outside the laptop, one woman with a practiced eye lifts a single garment to the light, turns it over, and sets it in a small blessed pile while pushing three others aside; the agents inside the screen watch her sorted piles through the glass; caption "ONE VALIDATED VERDICT". Three: the agents inside the laptop now produce a rack of garments that match the blessed pile, and the woman rests one hand on the finished rack while the counting desk stands empty; caption "THE CEILING MOVED". Footer bar: A MODEL INHERITS ITS JUDGE'S TASTE.](/img/comics/the-best-judges-of-creations-should-be-training-ai.png)

---

## The question nobody asks plainly

Everyone in applied AI wants models with taste. Almost nobody states the mechanism by which a model could acquire any.

A model does not develop taste by getting larger. It acquires whatever taste is present in the signal it was scored against. Somewhere upstream of every "this output is good" gradient, a human made a call. The model is downstream of that call, forever. **A model's taste ceiling is the taste of whoever judged its output**, and no amount of scale raises a ceiling set by the judge.

Which makes "how do we give this model taste?" a hiring question wearing a research costume. You get taste in the loop by putting a person with taste in the loop.

## The judging layer is the cheapest part of the stack, and that shows

![A two-pan scale on a workshop bench. The left pan sinks under gleaming precision machinery, stacked server blocks and polished instruments. The right pan rides high holding only a flimsy paper rubber-stamp and a thin stack of checklist slips. A beautifully made garment rests on the top beam, tilting toward the light side and about to slide off, while an older man in a grey cardigan studies the light pan with his arms folded. Title bar: WHERE THE MONEY GOES. Footer: FRONTIER COMPUTE. COMMODITY JUDGMENT.](/img/comics/the-best-judges-of-creations-should-be-training-ai-scale.png)

Look at how creative judgment is actually sourced today. Frontier labs spend enormous sums on compute and top-percentile research talent, then route a meaningful share of preference judgments through a labeling layer procured on throughput and cost. That layer is staffed by people doing a job to make a living, working fast, against generic rubrics, on domains they were not selected for.

None of this requires anyone to have behaved badly. It is what optimizing a line item for volume and price produces. But the consequence is structural and it lands exactly where it hurts: **the taste ceiling of a creative model gets set by the median annotator in a queue**, while every other input to that model was selected for excellence. An operator paying frontier prices for compute is buying evaluation at commodity prices and then wondering why the outputs feel competent and anonymous.

The tell is in the outputs everyone already complains about. Models generate work that is technically clean and has nothing at stake. That is not a mystery. That is a faithful reproduction of the judgment that shaped it.

## Taste is a validated track record, not an opinion

The word taste invites a fair objection: it sounds subjective, so how could anyone be qualified?

Because taste is not a preference. It is a **prediction about reception**, and predictions get validated. The people worth hiring are the ones whose calls have been graded by reality: the editor whose acquisitions found their readers, the stylist whose looks got worn and copied, the A&R who heard it early and was right more than once, the art director whose covers moved. Their judgment carries information precisely because the world already ran the experiment on it.

That validation is what a generic rubric cannot manufacture and a smart generalist cannot fake. It is also domain-bound: excellent judgment about fashion transfers poorly to picture books. So the hire is never "someone tasteful." It is the specific validated judge for the specific thing being made.

## The engineer who cannot see product-market fit

![Two panels. One, labeled NO ONE TO ASK: a young engineer in a slate-blue button-down holds a freshly generated poster print at arm's length, head tilted, openly uncertain, beside a glowing amber laptop that has just produced a stack of identical prints; the wall behind him is blank where a standard would hang. Two, labeled A STANDARD ON THE WALL: the same engineer turns toward an older woman in a charcoal jacket who holds one print up beside three framed blessed prints now hanging on the wall, with the discarded prints in a tidy pile by the bench. Title bar: IS THIS ANY GOOD. Footer: THE JUDGE IS A REQUIRED COMPONENT.](/img/comics/the-best-judges-of-creations-should-be-training-ai-pmf.png)

Here is the operator version of the problem, and it is the reason this is urgent rather than philosophical.

An engineer builds a generator for a creative domain: a fashion line, a children's book, a brand system, ad creative. The pipeline runs. Output appears. And the engineer genuinely cannot tell whether what came out is good. They have shipped something whose entire value is a judgment they are not qualified to make, and they will not find out for months, if the market ever bothers to tell them.

That is not a model problem. That is a missing input. The validated judge is a **required component of the system**, the same way the model and the harness are, and a team that skips it is running an eval loop with the eval missing.

This also explains why an outside judge is hard to source cold. The credible ones are not answering DMs from strangers about AI work, and many are publicly skeptical of it. The scarce asset is a **trusted introduction into a network of validated judges**, which is why curated collectives of tastemakers are quietly becoming applied-AI infrastructure rather than a social scene.

## What this looks like when you build it

- **Name the judge before the pipeline.** Decide whose verdict settles quality for this domain, and get them under contract, before the generator exists. If nobody can name the judge, the project has no definition of good and its evals will be theater.
- **Buy verdicts, not hours.** The engagement that works is part-time and consultative: a standing rate for judging batches, with the judge's calls captured as [golden examples](/concepts/golden-examples) rather than as vibes in a meeting. Their approval is what makes an artifact [golden](/concepts/golden), which is a status a human confers.
- **Convert verdicts into a rubric, then keep the human.** Have the judge articulate why the blessed ones passed, and encode that into [evals](/disciplines/evals) so most batches can be scored automatically. Keep them in the loop for the ambiguous cases and for periodic recalibration, because a rubric derived once drifts from the taste that produced it.
- **Pay accordingly.** If the judging layer sets your ceiling, it is not the line item to minimize. An operator who would never hire the cheapest available engineer should notice they are hiring the cheapest available taste.

The people who are best in the world at knowing whether a made thing is any good have spent their careers being underpaid relative to their leverage. That is about to invert, because their judgment is now the input that decides whether a machine capable of infinite production makes anything worth keeping.

## Further Reading

- [Golden](/concepts/golden) is the status a human judge confers; this perspective argues about which human should be conferring it.
- [Evals](/disciplines/evals) is how a judge's verdicts become a repeatable measurement instead of a standing meeting.
- [Golden Examples](/concepts/golden-examples) are the artifacts a judge's blessing produces, and what the next generation conditions on.
- [Comparative Human Edge](/perspectives/comparative-human-edge) maps the capacities where a human stays decisively better; validated taste is one of the sharpest.
- [Humans as Instigators and Editors](/perspectives/humans-as-instigators-and-editors) locates the human at both ends of the pipeline, with judgment as the closing act.
