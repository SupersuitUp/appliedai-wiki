---
title: Website-Deployed Slide Decks
slug: /playbooks/website-deployed-slide-decks
description: "How to build a slide deck as a page on your own website: one fixed-proportion canvas that scales to fit any screen (so a phone shows a perfect miniature of the projector view, never a reflowed mess), click left and right to navigate like presenter view, exports to a crisp PDF from the same code, and is built by applying the brand OS."
---

# Website-Deployed Slide Decks

{/* last_updated: 2026-06-23 */}
{/* version: 0.1 */}

A deck does not have to be a PowerPoint file you attach, or a static PDF. It can be a page on your own website: a link you send, that opens to a real, navigable deck, stays on-brand because it is built from the brand OS, updates the moment you push, and still exports to a high-resolution PDF when someone wants the file. This is the recipe for building one that looks professional on a projector and on a phone.

## Why deploy a deck to the web

- **A link beats an attachment.** One URL on your domain (`/decks/<name>`) is easier to send, always current, and trackable. The PDF becomes a download, not the primary artifact.
- **It is built from the brand OS, so it cannot drift.** Real tokens, the real logo lockups, the real fonts, exact numbers rendered as code. See [Agentic Brand OS](/concepts/agentic-brand-os).
- **One source, two outputs.** The same coded slides render as an interactive web deck and as a print-to-PDF export. No second file to maintain.

## The one principle that matters: a fixed canvas that scales to fit

This is the difference between a deck that looks professional and a deck that looks broken on a phone. A normal responsive web page reflows: text wraps differently, font sizes track the viewport, layouts collapse. That is correct for a website and wrong for a slide. A slide is a fixed composition. It should scale as a single unit.

Build each slide as a **fixed-size canvas** (a design size, e.g. 1280x720 or 1920x1080, always 16:9), then scale the whole canvas to fit the screen:

```
scale = min(viewportWidth / DESIGN_W, viewportHeight / DESIGN_H)
canvas.style.transform = `scale(${scale})`
```

Everything inside the canvas is sized in **fixed units** (px or rem), so when the canvas scales, every headline, photo, and gap scales with it, in exact proportion. The result: a phone shows a perfect miniature of what the projector shows, letterboxed, never reflowed. The width of the slide determines how big the text is, and it is all proportional. That is the whole game.

The corollary, and the most common mistake: **do not use viewport-relative units inside the slide.** `vw`, `vh`, `clamp(..., vw, ...)`, and responsive breakpoints (`md:`, `sm:`) all read the real viewport, not the scaled canvas, so they fight the scaling and break the proportions. Inside the canvas, use fixed `px`/`rem` and fixed layouts. Let the single `transform: scale()` do all the resizing.

## Navigate like presenter view: left and right

A deck moves left and right, one slide at a time, the way Google Slides and PowerPoint presenter view do. Not vertical scroll.

- **Click the right half to advance, the left half to go back.** Cheap, obvious, works on touch.
- **Arrow keys** (and Space for next) for keyboard.
- **Dot indicators** at the bottom that show position and are themselves clickable.
- **Disable text selection on the deck** (`user-select: none`). Otherwise a click meant to advance the slide lands on a word and selects it instead of navigating, which feels broken. With selection off, a click on either half always moves the deck. Keep the genuinely interactive elements (links, the PDF button, the dot indicators) working by stopping click propagation on them, so they act without also flipping the slide.

## Own the screen: no site chrome

A deck should fill the screen with nothing else on it. Render it as a fixed, full-viewport layer above the rest of the site (`position: fixed; inset: 0; z-index: high`), so the site nav, footer, and any chat widget are covered. If a chat widget injects itself with a very high z-index, hide it explicitly on the deck route. The audience should see the slide, and only the slide.

## Export to PDF from the same code

You do not build the PDF separately. You print the same slides.

- A **print stylesheet** sets the page to the design size and breaks one slide per page:

```css
@media print {
  @page { size: 1280px 720px; margin: 0; }
  .deck-page { width: 1280px; height: 720px; page-break-after: always; }
  .deck-page:last-child { page-break-after: auto; }
  /* hide on-screen-only chrome: nav, dots, the download button, chat widgets */
}
```

- Render every slide at design size in print (not the one-at-a-time screen view), and drive it with headless Chrome:

```bash
chrome --headless=new --print-to-pdf=deck.pdf --no-pdf-header-footer <deck-url>
```

You get a crisp 16:9, one-slide-per-page PDF, exactly matching the web deck, and you link it from the deck as a download.

## Build shape

- A reusable **`DeckShell` + `Slide`** pair: the shell owns the scale-to-fit math, navigation, dots, and the print path; each `Slide` is one fixed canvas. Build it brand-agnostic so future decks reuse it. A validated shell is a natural [GABT](/concepts/golden-atomic-brand-templates).
- **Content in one place.** Keep slide copy and image references in a single content object, separate from the layout, so edits are one-touch.
- **One route per deck** (`/decks/<name>`) plus a simple `/decks` index that lists them.
- **Apply the brand OS.** Pull tokens, type, and voice from the brand. Use the real logo lockups (an `img` of the SVG, never redrawn). Render exact numbers as coded elements, never as text baked into a generated image, because an image model garbles digits. Real photographs beat generated crowd shots when you have them.

## Pitfalls learned the hard way

- **Reflow on mobile.** The default failure. Fixed-canvas-plus-scale is the fix. If text size tracks the viewport instead of the slide width, you did it wrong.
- **Viewport units and breakpoints inside the slide.** `clamp(..vw..)` and `md:`/`sm:` evaluate against the real viewport, so on a phone the 1280-wide canvas still thinks it is 390 wide and the layout collapses. Use fixed units and fixed layouts inside the canvas.
- **Photo painted over the text.** A full-bleed background image positioned at `z-index: 0` paints above non-positioned in-flow text (the text vanishes). Put the photo behind an isolated content layer (give the content wrapper its own stacking context) or a negative z-index scoped to the slide.
- **A trailing blank PDF page.** `page-break-after: always` on the last slide adds an empty page. Target `:last-child` (or `:last-of-type`) to drop the final break. Watch out: if the last child of your container is a button or link, `:last-child` will not be the last slide.
- **Content that overflows 16:9.** Every slide must fit the frame at design size. Stacks of cards plus a photo grid will overflow 720px; lay them out to fit (a row of stats, a row of images) rather than letting the slide grow.
- **The chat widget.** Site-wide widgets float over the deck and into the PDF. Suppress them on the deck route and in print.

## Optional, when you want it

- **Fullscreen** on a keypress for presenting.
- **Presenter sync** (a shared current-slide index over a realtime store) so a phone can drive the projector, with audience Q&A and polls layered on top. This is more than most decks need, but the fixed-canvas core is the same.

## Related

- [Agentic Brand OS](/concepts/agentic-brand-os): the package a deck pulls its identity from.
- [Golden Atomic Brand Templates](/concepts/golden-atomic-brand-templates): the coded-template discipline a deck shell graduates into.
- [Generate an Agentic Brand OS](/playbooks/generate-agentic-brand-os): how the brand OS that backs the deck gets built.
