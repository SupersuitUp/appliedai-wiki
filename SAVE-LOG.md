# Save log

Checkpoints for `/save-my-progress`. Each line is `<ISO timestamp> · <commit SHA> · <summary>`.
The next save diffs from the most recent SHA here, so this file is read for SCOPE, never for facts:
re-derive any claim about current state from git itself.

---

## 2026-08-12 · coherence audit of the open-source / lock-in / sovereignty seam

**Why now.** Run hours after the nine vendor-critical pages were restored, on the question of
whether the wiki still holds a balanced view of open source, lock-in and sovereignty.

**The finding.** Not too few sovereign pages. The commit-and-rent half (portability tax, moat
layer, 2008 cloud, your-edge, vendor-resistance, sovereignty-and-safety, all written 20 Jul to
9 Aug) averages 11 outbound links and reconciles its opponents by name. `the-lock-in-is-coming`
came back with 3 outbound links, none newer than itself. **The newer half knew about the older
half and bridged to it; the older half did not know the newer half existed.**

**Applied, 9 of 11 findings** (`36b92f3`, hero in a follow-up). All additive; no incumbent thesis
rewritten. Two new pages: `concepts/sovereignty` (the word carried 18 files and was defined in
zero, so four pages had drifted into four senses of it; the page records the adjudication the
Aug 9 perspective already made rather than inventing one) and
`perspectives/open-weights-win-on-bounded-work` (every pro-open page argued from fear, and
nothing said when to actually run the models; synthesized from four existing pages). Three
bridges: the scope section on the lock-in page, the executive summary's missing half, and the
token-price contradiction rewritten as two forces. Four corrections, including Cursor listed as
an open harness three times inside the argument against proprietary capture.

**Decisions.**

- Restored pages get an additive scope marker, never a retraction. The restore was deliberate;
  what was missing was the date and the forward links.
- `concepts/sovereignty` was safe to write because the newest page had already ruled. Recording
  an existing adjudication is a bridge; picking between senses would have been the owner's call.
- The open-weights perspective is the one net-new claim and was flagged as such, deliberately
  left cheap to cut: 3 inbound links and no hero, so removing it costs nothing else.
- Hero generated for `concepts/sovereignty` only, for that same reason.

**The non-obvious part, and it is now in two rule files.** Unhiding rebuilds a page's LINKS, not
its ARGUMENTS. A restored page re-enters carrying the doctrine of its hide-date into a canon that
kept moving, and because the FILE is newer than the pages that superseded it, date-sorting the
corpus hides the problem completely. That is the inverse of how 0a normally presents, which is
why nothing caught it. `CLAUDE.md`'s unhide checklist gained item 5 (doctrine) so the pass fires
at restore time, and `meta-coherence-check` gained the RESTORE refinement under 0a with the git
commands. Three smaller lessons went into the skill too: a page can escalate past its own stated
bar, the banner word too common to look coined is the highest-value 0d hit, and an executive
summary is audited by its CITATION SET rather than its sentences.

**Open threads.** Two findings left for Gary on purpose. The missing receipt in
`sovereignty-cannot-be-sold` (it sets "a claim to watch, not a claim to build on", then accepts a
staked public identity, which is the claim) needs an assertion about a real company on his
first-person page. A falsifiable form of the lock-in thesis is a rhetorical rewrite, not a bridge.
Full report: https://claude.ai/code/artifact/8c714593-6d47-43ae-bdf5-4dfbdc4a951e

## 2026-08-12 · unhide and retitle the nine hidden drafts

**What happened.** Nine pages hidden on 2026-07-14 (`7168865`, draft flag + `_` prefix) and
deleted outright on 2026-08-09 (`fc765ba`) were restored and republished, then three of them
were retitled to match the perspectives naming convention.

Restored: The Lock-In Is Coming, The Token Rug Pull, Milking Humanity, The Loop-Everything
Harm, AI Labs Speak to Investors Not Operators, Uncensored Inference, the Dr. Errol Brandt
profile, and The PrimeTime note-sharer with its field note.

**Decisions.**

- Restored at the original slugs rather than redrafting, so old inbound links keep resolving.
- Flagged the three noun-label titles instead of silently renaming them; on the follow-up go-ahead
  they became claims, with redirects from every old slug:
  Milking Humanity → Overclaiming AI Capability Is an Ethical Violation;
  The Token Rug Pull → Cheap Tokens Are a Subsidy That Will Be Withdrawn;
  The Loop-Everything Harm → Loop-Everything Advice Is Free for the People Selling It.
- `/foundations/the-token-rug-pull` was repointed at the new slug in the same pass, so the
  redirect restored an hour earlier did not end up aimed at a dead target.
- The external YouTube title "Prepare for the AI Token Rug Pull" on the Errol Brandt profile is
  a source title and was deliberately left unrenamed.

**The non-obvious part.** Unhiding is not the reverse of hiding. Four things beyond the files:
inbound links (the hide commit's diff no longer reverse-applies, because five of the eleven
linking pages were renamed in `8237581`), the dropped redirects, the restored pages' own
outbound links pointing at slugs that moved under them, and the changelog suppression in
`plugins/creation-date-plugin/src/collect.ts`, which keys on paths in git history and therefore
outlives the file. That last one would have kept every restored page invisible in the changelog
forever. Live docKeys are now exempt from it; hidden-then-deleted pages stay suppressed, which
is the case the rule exists for. The full checklist lives in `CLAUDE.md` under "Unhiding is more
than the reverse of hiding".

**Open threads.** None blocking. If any of the three new titles land wrong, alternates were
offered in the session and a swap is a one-line change plus a redirect.

2026-08-12T18:20:00-05:00 · 8e4d3e9 · unhide + retitle the nine hidden drafts; unhide checklist added to CLAUDE.md and the skill
