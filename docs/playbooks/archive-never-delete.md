---
title: "Archive, Never Delete"
slug: /playbooks/archive-never-delete
description: "Clear a cluttered workspace by sweeping loose files into a dated archive folder, not by deleting them. Cheap storage makes every file you have ever touched a recoverable part of your context corpus. Pruning is a separate, deliberate decision."
image: "/img/comics/archive-never-delete.png"
---

# Archive, Never Delete

*Clear a cluttered workspace by sweeping loose files into a dated archive folder, not by deleting them. Cheap storage makes every file you have touched a recoverable part of your context corpus. Pruning is a separate, deliberate decision, never a side effect of tidying up.*

![Three-panel comic strip on cream paper with chunky inked title bar reading "ARCHIVE, NEVER DELETE" and footer bar reading "TIDY BY MOVING. DELETE ON PURPOSE." Panel 1, label "THE MESS": the hyperagent Midas in matte-navy plate armor with orange seams stands over a computer desktop buried in loose file cards, screenshots, and stray documents (draft_v7_FINAL.docx, meeting_notes.pdf, OLD VERSION, temp!); a glowing crimson DELETE ALL trash button is boldly crossed out with a black X. Paper-tape caption: "Don't panic-delete to feel clean." Panel 2, label "SWEEP, DON'T DESTROY": Midas sweeps his gauntleted arm and the loose cards stream as a glowing golden ribbon into a sturdy folder labeled "YYYY-MM-DD ARCHIVE" nested inside a larger folder labeled "MONTH YEAR"; the desktop behind him is clean. Paper-tape caption: "Move into a dated archive. Nothing is lost." Panel 3, label "THE TIME CAPSULE": Midas in the flesh stands beside a glowing vault of dated file cards (2025-05-20, 2025-04-30, and so on) and a physical external drive marked "PAOS DRIVE 4TB"; a floating holographic VIRTUAL ARCHIVE window shows a translucent cyan-and-gold sub-agent construct pulling one dated card to search it, staying inside its virtual window. Paper-tape caption: "Your files are a context corpus. Cheap storage, total recall."](/img/comics/archive-never-delete.png)

---

Most people keep a messy desktop, then periodically panic-delete it to feel clean. Both halves of that habit are wrong for an operator running AI work. The mess is real friction. But the delete throws away the one thing an applied-AI practitioner should hoard: the raw record of what you were doing. Screenshots, exports, voice memos, half-finished drafts, one-off downloads. Individually they look like trash. Collectively they are a time capsule of your work, and a time capsule is retrievable [context](/concepts/context-searching), not clutter.

The resolution is to stop treating "clean" and "deleted" as the same operation. You clean by moving, not by destroying.

## Your loose files are a context corpus

An applied-AI operator's advantage is the accumulated material an agent can search: prior artifacts, the screenshot of the dashboard you were debugging, the export you generated for a client three weeks ago. This is the same logic behind the [Capture-First Autobiography](/playbooks/capture-first-autobiography) and [Knowledge Repo Design](/playbooks/knowledge-repo-design): the corpus is the asset, and every output you produce is a projection of it. Deleting to tidy up is deleting the corpus to clean the desk.

Storage is the cheapest thing you own. A terabyte external drive costs less than an hour of your time. There is no economic reason to destroy a file you might want to hand an agent later. The only real cost of keeping everything is disorder, and disorder is solved by structure, not by deletion.

## The sweep pattern

The discipline is one repeatable move. Never let loose files pile up in the open, and never delete them to clear the pile. Sweep them into a dated archive on a fixed cadence.

1. **A period holder.** One folder per month (or week, or whatever cadence matches your churn), named `<Month YYYY>`. This is the only long-lived folder that lives in the open workspace.
2. **A dated archive inside it.** When you tidy, create a `YYYY-MM-DD Archive` folder inside the current period holder and move every loose item into it. The date stamps *when you swept*, so the archive doubles as a timeline of your activity.
3. **Leave the holders and system files alone.** Period-holder folders and hidden system files stay put. Everything else moves.

The end state is a workspace that shows only the current period holder, with every past sweep preserved and dated one level down. You can always drag a file back out. Nothing is lost, and the surface is clean.

## Codify it as a skill, not a chore

A tidy-up you have to remember to do by hand is a tidy-up you will skip, and the skip is what drives people back to panic-deleting. Turn the sweep into a deterministic skill, developed [skill file first, app second](/concepts/skill-file-first-app-second), so it runs the same way every time and never depends on your judgment in the moment.

A good archiving skill is a few lines of script with three properties:

- **Deterministic targeting.** It computes the period holder and the archive date from the system clock, so it always sweeps into today's folder without being told.
- **Explicit skip list.** It protects the period holders and system files by pattern, so the routine never eats the structure it depends on.
- **A preview mode.** A dry run prints every move before touching anything, so a destructive-looking operation is inspectable before it runs.

Housekeeping that is worth doing at all is worth making unskippable. Encoding it once means the workspace stays clean on autopilot and you never face the "delete everything" temptation again.

## Never destructive, even on collision

An archiving routine must be incapable of losing data, or it defeats its own purpose. The one dangerous case is a name collision: sweeping a file whose name already exists in the archive from an earlier run. A naive `move` overwrites the older file silently.

The rule is simple. On collision, rename, do not overwrite. Append ` (2)`, ` (3)`, and so on until the name is unique. The archive can hold two files with the same name and different contents. It can never hold one fewer file than you put in. Because the sweep moves within a single volume, it is instant and trivially reversible: undoing a sweep is dragging a folder back out.

## Pruning is a separate, deliberate decision

None of this means you keep every byte forever. It means deletion is its own considered act, done on purpose, not a reflex triggered by a cluttered desk.

Once the corpus lives in dated archives, pruning becomes a calm, occasional review: open an old archive, decide what genuinely has no future value, and delete that on its own terms. That decision has nothing to do with wanting a clean workspace, because the workspace is already clean. Separating the two acts is the whole point. Tidying happens constantly and destroys nothing. Pruning happens rarely and destroys only what you have consciously chosen to let go.

## Further Reading

- [The Capture-First Autobiography](/playbooks/capture-first-autobiography) the same corpus-is-the-asset logic applied to a life story.
- [Knowledge Repo Design](/playbooks/knowledge-repo-design) structuring the material you keep so it stays retrievable.
- [Context Searching](/concepts/context-searching) why an accumulated file corpus is worth keeping in the first place.
- [Why Truth Management Matters](/disciplines/truth-management/why-it-matters) keeping the context your agentic system runs on accurate and intact.
