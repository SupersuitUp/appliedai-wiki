# Save log

Checkpoints for `/save-my-progress`. Each line is `<ISO timestamp> · <commit SHA> · <summary>`.
The next save diffs from the most recent SHA here, so this file is read for SCOPE, never for facts:
re-derive any claim about current state from git itself.

---

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

2026-08-12T18:20:00-05:00 · PLACEHOLDER_SHA · unhide + retitle the nine hidden drafts; unhide checklist added to CLAUDE.md and the skill
