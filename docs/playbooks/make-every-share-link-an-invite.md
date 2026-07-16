---
title: "Make Every Share Link an Invite"
slug: /playbooks/make-every-share-link-an-invite
description: "A viral-invite and attribution-graph pattern for gated products: every member's share link doubles as an invite, every new member is permanently attributed to whoever brought them, and the result is a legacy tree instead of a marketing funnel."
image: "/img/comics/make-every-share-link-an-invite.png"
---

# Make Every Share Link an Invite

*A viral-invite and attribution-graph pattern for gated products: every member's share link doubles as an invite, every new member is permanently attributed to whoever brought them, and the result is a legacy tree instead of a marketing funnel.*

![Three-panel neo-comic action-zine strip on cream paper. Title bar in chunky inked caps: 'MAKE EVERY SHARE LINK AN INVITE'. Panel 1, '1. SHARING IS INVITING': the supersuited leader (matte-navy plate armor with orange seams) hands a glowing gold card shaped like a browser address bar, marked with a via-code glyph, to a smiling woman in street clothes; behind them a gated stone library archway labeled 'HYPERCONTEXT LIBRARY' stands with its wrought-iron gate ajar, warm gold light spilling out. Caption: 'Your link to the thing IS the invite. No form, no quota.' Panel 2, '2. FIRST TOUCH, WRITTEN ONCE': the woman walks through the open gate into the light while, in the foreground, an armored hand inks one gold edge between her portrait medallion and the leader's in a large open ledger of node-and-edge portraits; a red rubber stamp beside the ledger reads 'PERMANENT'. Caption: 'Sign in through the link and the graph writes one edge, forever: who brought you.' Panel 3, '3. BRANCH, NOT LEADERBOARD': over-the-shoulder view of the leader at a desk monitor showing a gold family tree branching down from his portrait through the woman's to five varied portraits, with HUD labels 'BROUGHT 3' and 'BRANCH 11 STRONG'. Caption: 'Each member sees their own branch, to the nth degree. Legacy, not leaderboard.' Footer bar in chunky inked caps: 'EVERY LINK IS A DOOR. THE TREE REMEMBERS WHO OPENED IT.'](/img/comics/make-every-share-link-an-invite.png)

---

## When to use this playbook

You have a product, library, or community whose growth should run through relationships rather than ads: a gated content library, a private tool, a membership app, an internal beta. You want three things at once:

1. **Access control.** Not everyone gets in. Someone inside has to bring you in.
2. **Zero-friction sharing.** Members share the way they already share: by sending a link to the thing itself, not a special referral form.
3. **Attribution.** You can see who brought whom, to the nth degree, forever.

The pattern collapses all three into one mechanism. A member's share link to any page in the product carries their code. If the recipient signs in through it, they are in, and the graph records the edge. There is no separate "invite flow" to build or explain. Sharing is inviting.

The reference implementation described here shipped in one day on a gated picture-book library and produced its first real second-generation member within hours of launch.

## The core mechanic

Every signed-in member gets a short, human-readable share code at first sign-in (for example `FIRE-ES4C`, generated from an alphabet with ambiguous characters removed). Three rules make the system:

1. **The code rides on every link.** When a member views any page, the app quietly embeds `?via=<their-code>` into the address bar. Whatever they copy, from the share button or the URL bar, carries their code. The share button copies the full current URL on purpose.
2. **Every link is a door.** A visitor arriving with `?via=` who signs in gets access, attributed to the code's owner. No separate invite table, no invite quota, no expiry to manage.
3. **First touch wins, permanently.** Attribution is written once at account creation and never changes. Self-referral is rejected. Re-arriving through someone else's link later changes nothing.

The permanence is the point. The graph is not a growth metric to be gamed; it is a record of who actually brought whom into the room. That record forms a tree: your direct invitees, their invitees, and so on. Show each member their own branch, all the way down.

## Language matters: legacy, not leaderboard

Resist the public leaderboard. The reference implementation gives each member a private impact view: "You have brought 3 people. Your branch is 11 strong," with the tree rendered underneath. Members compare themselves to their own past, not to each other. The framing is harvest language (who you brought, how your branch grows), not competition language (rank, points, streaks). For a community product, being shown your legacy is a stronger motivator than being shown your rank, and it never humiliates the member with zero referrals.

## Architecture: the whole thing is five collections and a token check

The pattern needs one auth provider, one database, and server-verified API routes. The reference implementation uses Google sign-in via Firebase Auth and Firestore, but any equivalent stack works.

The load-bearing security decision: **the database rules deny all client access.** Every read and write goes through an API route that verifies the caller's ID token server-side. The client holds no privileged logic; gated content never ships in the static payload (gated pages serve stripped data publicly and full data only through an authed endpoint).

The collections:

| Collection | Key | What it holds |
|---|---|---|
| `users` | uid | name, photo, status (active or revoked), share code, `invitedBy` (the attribution edge) |
| `codes` | share code | owner uid (or a label for admin-minted VIP codes), use count, active flag |
| `whitelist` | email | pre-approved emails that can sign in with no invite |
| `reads` | uid + item | first-opened, last-opened, and finished timestamps per member per item |
| `guestbook` | item + uid | one note per member per item, with created and updated timestamps |

Two doors into the product, checked in order at sign-in: is the email whitelisted (founders, hand-picked people), and if not, did they arrive with a valid, active `?via=` code? Anyone else who signs in sees a wall that tells them the truth: this is invite-only, and anyone already inside can let them in with their link.

## Build steps

1. **Gate the content, tease the covers.** Public visitors see what exists (titles, covers, taglines) but cannot open anything. The tease gives a shared link something to land on before sign-in.
2. **Wire the two doors.** At sign-in, check whitelist first, then the `?via=` code. Create the user document with `invitedBy` set to the code's owner (or null for whitelisted roots). Generate their own share code in the same write.
3. **Embed the code everywhere.** A small client component rewrites the address bar with `?via=<code>` via `history.replaceState` on every page for signed-in members. Share buttons copy the full URL.
4. **Build the impact view.** One endpoint walks the users collection and returns the caller's branch as a tree, plus direct and total counts. Render it privately to each member.
5. **Build the admin view.** The full forest with every member, per-code use counts, whitelist management, VIP code minting for events, and revoke. Revoking a member deactivates their code and their access without deleting the graph.
6. **Test the chain with a second account.** The system is not verified until a second person has arrived through a member's link, signed in, and appeared in the tree.

## The completion layer

Once the graph exists, a light gamification layer compounds it. Track completion per member per item (a `finished` timestamp written once when they reach the end). Then:

- **Progress, quietly.** The library shows each member "You have read 2 of 3 books" and a small read-mark on finished items. Finishing everything earns a one-line flourish, not a badge case.
- **A guestbook at the end, gated on finishing.** At the last page of each item, members who actually finished can leave one editable note, shown with their name and photo to every reader who reaches the same place. The server rejects notes from members without a `finished` timestamp, so the guestbook is a room only finishers can write in.

The guestbook does double duty: it rewards completion with authorship, and it seeds every item's ending with social proof that real people made it there. Admin gets per-item finished counts and note moderation.

## Design decisions worth copying

- **First-touch attribution, written once.** Any recalculation invites gaming and erodes trust in the tree.
- **Share codes over invite quotas.** Quotas create hoarding and expiry bugs. A permanent personal code creates identity: members recognize their own code in the URL bar.
- **Whitelist as root set.** The founders and hand-picked members become the roots of the forest. Everyone else hangs off a branch, so the graph is connected by construction.
- **Revoke, never delete.** A revoked member's code stops working and their access ends, but their node and edges stay. The history is the asset.
- **Server-side everything.** Deny-all database rules plus token-verified API routes cost one afternoon and remove the entire class of client-side data leaks, including gated content hiding in static page props.
- **No charging while the graph is young.** Attribution-gated free access builds the graph; monetization can arrive later with the graph intact.

## Further Reading

- [The Product Is an Operation](/concepts/the-product-is-an-operation) the operations mindset behind building distribution into the product itself
- [Activation](/playbooks/activation) engineering the first hour; the invite wall is the pre-activation moment for whoever receives a shared link
- [The Cheaper Code Gets, the Simpler You Should Build](/perspectives/the-cheaper-code-gets-the-simpler-you-should-build) why five collections and token-checked routes beat a referral SaaS
- [Designing an AI Loop](/playbooks/designing-an-ai-loop) the loop framing; the invite chain is a growth loop with the graph as its sensor layer
- [Minimum Viable Infrastructure](/concepts/minimum-viable-infrastructure) the baseline stack assumptions this pattern sits on
