---
title: "Small Binaries Matter"
slug: /perspectives/small-binaries-matter
description: "The rule is not 'no binaries in git.' Small binaries that ship with the product belong in the repo. Large regenerable derivative sets do not, and an agent will happily commit 600MB of them unless you encode the boundary."
image: "/img/comics/small-binaries-matter.png"
---

# Small Binaries Matter

*The rule is not "no binaries in git." Small binaries that ship with the product belong in the repo. Large regenerable derivative sets do not, and an agent will happily commit 600MB of them unless you encode the boundary as a test.*

![Four-panel comic on cream paper. Title bar in chunky inked caps: SMALL BINARIES MATTER. Panel 1, 1. THE DEBACLE: inside a code repository drawn as a library-warehouse, tidy glowing code shelves (/src, /lib, /tests, /docs, /config) are crushed between towering wooden crates stamped WEBP ART, MP3 AUDIO, and 566MB; the hyperagent Midas in matte-navy plate armor with orange seams looks up at the stacks under a strained REPO sign; a red HUD screen reads PUSH FAILED: 408. Caption: 'The hyperagent let every derivative crate pile into the code repo. Nothing hurt until everything did.' Panel 2, 2. THE SORT: Midas directs the split with both arms; a tidy shelf labeled SMALL BINARIES: KEEP holds two small tiles (a notes card and a share card) while huge crates ride cyan lift-beams through a doorway toward a gold vault labeled PRIVATE BUCKET with a ticket slot reading SIGNED URLS ONLY. Caption: 'Small binaries stay with the code. The big derivative set moves to the vault behind the gate.' Panel 3, 3. THE PURGE: Midas kneels over an unrolled ledger filmstrip of commits (a7f3c2e MAR 01 through e1f7c4d MAR 29), striking a red X through the crate in every frame with a glowing pen; a brass scale tips from a heavy weight stamped 593MB to a light weight stamped 13MB; a rubber stamp beside the scroll reads TREE UNCHANGED. Caption: 'Deleting files slims nothing. The hyperagent rewrites history itself, and the repo drops to 13MB.' Panel 4, 4. THE GUARD: the repo's front door, an inked archway labeled REPO, with a mechanical gate-check bolted beside it labeled GUARD TEST; a small card passes with a green check while an oversized crate stamped DERIVATIVES is bounced back by a crimson X barrier; Midas stands behind the gate with arms crossed. Caption: 'The hyperagent encodes the boundary as a test, so the mistake can never quietly return.' Footer bar in chunky inked caps: SMALL BINARIES IN THE REPO. BIG DERIVATIVES IN THE VAULT.](/img/comics/small-binaries-matter.png)

---

## The debacle

A private library platform served 26 illustrated, narrated books. Every book's full derivative set (WebP spread art plus MP3 narration, roughly 70 files per book) lived inside the app repo's `public/` folder. About 1,900 binaries, 566MB in the working tree, and more in history: every art resweep replaced dozens of files, and git keeps both copies forever.

Nothing hurt until everything did, on the same day:

- **Pushes started failing.** A 564MB pack over HTTPS times out with a 408. The fix (switching the remote to SSH) treats the symptom.
- **Clones got heavy.** The repo's git object store crossed 590MB for an app whose actual code is a few megabytes.
- **The privacy model broke.** Everything in `public/` is fetchable by exact URL. When the library went invite-only, the words were access-controlled but every page of art and every minute of narration remained one guessable URL away. The asset store and the access model were the same folder, so they could not be secured separately.

The design smell was visible from the start: the repo was doing three jobs (versioning code, archiving art, serving assets) and doing the last two badly.

## Small versus big, master versus derivative

The lesson is not "keep binaries out of version control." Two distinctions do the real work:

**Size and count.** A cover image, a social share card, a logo: kilobytes to low megabytes, dozens of files, changing rarely. These belong in the repo. They version with the code that references them, they make the repo self-contained, and their history cost rounds to zero. Small binaries matter, and git handles them fine.

**Master versus derivative.** The masters (source art, original renders, session logs) are precious substrate in the sense of [Ephemeral Software, Precious Context](/perspectives/ephemeral-software-precious-context): irrecoverable if lost, so they get version control in their own source repos. The platform-ready WebP/MP3 set is a derivative: regenerable from the masters by a pipeline. Derivatives at scale belong in object storage, behind whatever access control the product needs.

The failure mode is the cross-product: a large derivative set inside the app repo. It inflates every clone, bloats every push, couples asset access to static hosting, and buys nothing, because the derivative was never the thing worth protecting.

## Where each copy lives

The repair landed on a three-copy model:

1. **Masters** stay version-controlled in each book's own source repo. Canonical, precious, small enough per repo to be sane.
2. **The serving copy** moved to a private object-storage bucket with public access prevention on. The app authenticates the reader, mints a short-lived ticket, and redirects asset requests to signed URLs. The app repo ships only each book's cover and share card: the small binaries that ship with the product.
3. **The derivative archive**, for the "but I wanted it version-controlled" instinct, became its own dedicated repo holding nothing but the derivative set. This is the honest version of the original impulse. You can put image data in repos. A repo whose one job is archiving binaries pays the size cost exactly once, in a place where nobody clones, builds, or deploys by accident.

A guard test now fails the app's suite if derivative files ever reappear in `public/`. That last step is the one most teams skip, and it is the one that makes the fix permanent.

## Digging out

Deleting the files from the working tree slims nothing: history keeps every blob. Actually reclaiming the space means a history rewrite, and the mechanics have sharp edges worth knowing before you need them:

- `git filter-repo` with a path callback drops the offending blobs from every commit. Verify the HEAD tree hash is identical before and after: same content, slimmer history.
- The rewrite is a force-push. Every clone, every concurrent working session, and every CI integration must move to the new history deliberately, never by force-pushing old history back over the fix.
- Local disk does not shrink until nothing anchors the old objects. `ORIG_HEAD`, reflogs, and forgotten worktrees all keep dead history alive through `git gc`. In this repair, a stale deploy worktree silently pinned all 579MB until it was pruned.

Result: 593MB of git history became 13MB, with zero change to the deployed product.

## The agentic angle

An agent made this mistake faster than a human team would have, and that is the operator lesson. Committing assets next to the code that uses them is the path of least resistance, and an agent optimizing for "make the book appear on the site" will take it every time. Twenty-six books later, the repo is a liability.

Agents also fix it faster: the entire repair (bucket, signed-URL gate, upload pipeline, archive repo, history purge, guard test) shipped in one working session. But only because a human looked at the shape of the repo and called it what it was. The boundary between "small binary, commit it" and "derivative set, store it properly" is a judgment call today's agents do not reliably make on their own. Encode it: a guard test in the suite, a line in the repo's agent rules (see [Agent Rule Files](/concepts/agent-rule-files)), or both. What you tolerate in month one, you excavate in month six.

## Further Reading

- [Ephemeral Software, Precious Context](/perspectives/ephemeral-software-precious-context) the master/derivative distinction is the same inversion: protect the substrate, treat the regenerable layer as disposable
- [Knowledge Repo Design](/playbooks/knowledge-repo-design) deciding what lives in which repo is the same design act for prose that this page argues for binaries
- [Protect Your Truth](/disciplines/truth-management/protect-your-truth) matching access controls to sensitivity, which a `public/` folder cannot do
- [Make Every Share Link an Invite](/playbooks/make-every-share-link-an-invite) the gated-product pattern this platform uses on top of the private asset store
- [Git](/reference/tools/git) the tool whose strengths (text, history, small files) define exactly where it stops being the right store
