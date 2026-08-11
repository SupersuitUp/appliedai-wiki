---
title: "Weight Training Data by Who Is Still in Business"
slug: /perspectives/weight-training-data-by-who-is-still-in-business
description: "Once a system learns from user corrections, it has to decide whose corrections count. Every available proxy for good judgment is bad, and money is the least bad of them, because a customer who keeps paying has run an expensive test you get to inherit for free."
image: "/img/comics/weight-training-data-by-who-is-still-in-business.png"
---

# Weight Training Data by Who Is Still in Business

*Once a system learns from its users' corrections, it has to decide whose corrections count. Every proxy for good judgment is bad, and revenue is the least bad of them, because a customer who keeps paying has already run an expensive experiment you get to inherit for free.*

![Three panels on cream paper, titled WHOSE CORRECTIONS COUNT. One, ALL SLIPS WEIGH THE SAME: a woman in her thirties with black hair in a low bun and a mustard blouse watches a glowing amber laptop where a small rounded agent stands before a two-pan balance scale holding equal piles of blank paper slips, the beam perfectly level and the agent's hands up, stuck. Two, THE ONES STILL IN BUSINESS: she reaches in and sets a small brass weight engraved with a lit-up open shopfront onto the left pan, which sinks while the right pan rises. Three, KEEP A FEW OF THE REST: the scale stays tilted, she holds the thick weighted stack up by the screen, and in her other hand down at the desk she has deliberately kept a small fan of the light slips rather than discarding them. Footer: THE FILTER IS THE MOAT, NOT THE DATA.](/img/comics/weight-training-data-by-who-is-still-in-business.png)

---

## The second question nobody asks

[The Correction Seam](/concepts/the-correction-seam) covers how a system captures free, self-labeled signal: the user fixes the error, and the fix is a labeled example nobody had to pay an annotator for.

Capture is the first question. The second one arrives immediately and gets far less attention. **Whose corrections count?**

Treating every correction equally is itself a choice, and a bad one. A user who has run agents daily for two years and a user who signed up on Tuesday are both producing corrections, and those corrections are not worth the same. One is a practitioner telling you your model is wrong. The other may be telling you they do not understand the tool yet. Weight them equally and you have averaged an expert with a novice and called the result data.

## Every proxy is bad

The honest starting point is that there is no clean signal for whose judgment to trust. Each candidate fails in a specific way.

- **Volume** rewards whoever generates the most text. That is the loudest user, not the best one.
- **Engagement** rewards whatever holds attention, which selects for compulsion as readily as for value.
- **Recency** rewards fashion. It tracks what people are trying this quarter, not what worked.
- **Self-report** rewards confidence, and confidence is anti-correlated with expertise often enough to be dangerous.
- **Credentials** reward whoever cleared a gate that someone else designed, usually a long time ago.
- **Explicit ratings** reward whoever bothers to rate, which is a mood sample, not a competence sample.

So the question is not which proxy is good. It is which proxy is least bad.

## Money is the least bad, because it is expensive to fake

Revenue and survival are the least bad filter available, and the reason is not that money is virtuous. It is that money is **costly to produce**.

Every other proxy on that list is cheap. Clicking, rating, posting, and self-describing all cost the user nothing, so they carry almost no information about whether the user is right. Paying is different. A company that has been paying you for three years and is still operating has passed a test administered by people who were free to say no and had every incentive to: their customers kept buying, their payroll kept clearing, their market did not eliminate them.

That is an expensive, adversarial, continuously-run experiment, and you did not have to design or fund it. When you weight that customer's corrections more heavily, you are inheriting the market's verdict on whose workflows actually work.

The two axes worth weighting on both come from this logic:

- **Survival and revenue.** A workflow used by a company that is alive and profitable has been validated by something harsher than any eval you would have written.
- **Tenure of real use.** A user who has run the tool daily for two years has accumulated judgment about it that a new user structurally cannot have. Their corrections tend to be about the tool being wrong rather than about them being confused.

Together these approximate the thing you actually want and cannot measure directly: *is this person's opinion about good output likely to be correct?*

## What it costs you

This is where the claim has to stay honest, because the weighting has real failure modes and they are not small.

**It is survivorship bias, adopted deliberately.** You are learning from the winners, which makes the system excellent at the workflows that already work and blind to the ones emerging at the edges. The next durable pattern usually shows up first among people who are not yet profitable, and this filter systematically discounts exactly them.

**Revenue measures pricing power, not process quality.** Some companies are profitable because their processes are good. Others are profitable because they own a distribution channel or a regulatory position, and their internal workflows are a mess that money is papering over. The filter cannot tell those apart.

**It compounds toward the already-capitalized.** Weight the paying enterprise, serve the paying enterprise better, and the gap between them and everyone else widens with every training cycle. That is a real cost borne by people who are not in the room, and it deserves naming rather than a footnote. A filter chosen for being least-worst is still doing something to somebody.

**It can eat its own tail.** If the weighting is strong enough, the system converges on the workflows of its largest customers and stops being general. The customer set becomes the ceiling.

None of these argue for equal weighting, which has worse problems. They argue for holding the weighting loosely, keeping a deliberate sample of unweighted signal from the edges, and rechecking whether the filter is still selecting for judgment or has quietly started selecting for size.

## This is not only a lab problem

The framing sounds like it belongs to whoever trains the model. It does not.

Any operator running agents across a client roster faces the identical question. Your eval set, your [golden examples](/concepts/golden-examples), your prompt library, and your accumulated corrections are all training data for a system, even when no gradient descent is involved. When two clients disagree about what good output looks like, you weight one of them, whether or not you admit it.

The rule ports cleanly. Weight the corrections of the client whose business is working. Weight the operator who has run the workflow a hundred times over the one who has run it twice. Keep the disagreements rather than averaging them, because a disagreement between two credible sources is information about the boundary of your system, not noise to be smoothed away.

## The filter points back at you

The uncomfortable corollary: the same test applies to the practitioner, not only to the customer.

An applied-AI engineer whose clients are measurably doing better because of the work is a credible source about what good work is. An engineer with an elegant stack, a large following, and no client whose business improved is not, however sophisticated the reasoning sounds. Weight their opinions accordingly, including when the opinion is your own.

This matters more than it sounds, because the failure it prevents is quiet and it feels excellent from the inside. Without a real business result to check against, applied-AI work drifts into elaborate self-reference: the harness that exists to improve the harness, the eval suite with no decision attached to it, the refactor that makes the system more beautiful to its author and no faster for anyone else. Every hour of it feels like progress, because building is genuinely pleasurable and agents make it cheap ([Developers Have Started Worshipping the Build](/perspectives/developers-have-started-worshipping-the-build), [Masturbatory Programming](/concepts/masturbatory-programming)).

Enterprise value creation is the tether. Not because money is the point, but because a client's moved measurable is the one signal that cannot be generated from inside your own head ([A Moved Measurable Is the Only Proof](/perspectives/a-moved-measurable-is-the-only-proof)). It is the same costly-signal logic turned inward: your own sense that the work is going well is cheap to produce, so it carries almost no information. A customer's business improving is expensive, so it carries a lot.

The practical version is a question to keep asking about your last month of work: **which client is better off, and by what number?** An answer that requires a paragraph of explanation is a no.

## Why this is the moat under the moat

[Vertical Integration Is the Moat](/perspectives/vertical-integration-is-the-moat) says the loop beats the model. The correction seam says where to close the loop. This is the layer beneath both: once the loop is closed and the corrections are flowing, the weighting function decides what the system actually becomes.

That function is the most defensible thing in the stack, because it is the hardest to copy. A competitor can match a model, buy a harness, and even license data. They cannot easily acquire the knowledge of *whose judgment has been right*, because that knowledge is a byproduct of having run the loop with real paying customers over real time. It accumulates in one place and nowhere else.

Capture the signal, then be deliberate about whose signal you are listening to. The second decision compounds harder than the first.

## Further Reading

- [The Correction Seam](/concepts/the-correction-seam): how the self-labeled signal gets captured in the first place, and why it usually does not.
- [Vertical Integration Is the Moat](/perspectives/vertical-integration-is-the-moat): the general claim that the loop beats the model.
- [Daily Use Is the Benchmark That Can't Be Gamed](/perspectives/daily-use-is-the-benchmark-that-cant-be-gamed): why tenure of real use is a credible weighting axis.
- [Golden Examples](/concepts/golden-examples): the operator-scale version of the training set this perspective is about weighting.
- [Generation Is Cheap, Discrimination Is the Job](/perspectives/generation-is-cheap-discrimination-is-the-job): why whose taste you encode is the decision that matters.
