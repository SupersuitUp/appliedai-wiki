#!/usr/bin/env -S uv run --with pillow --quiet python3
"""Converter paired with scripts/check-image-weight.mjs, which is the gate this satisfies.

Converts every illustration under static/ to webp (q80, capped at 1536px wide), renames the
file and its .recipe.json sidecar, and rewrites every reference to it across docs/, src/ and
the config. Idempotent: a second run finds nothing to do.

Run it on a laptop, never in a build:

    npm run optimize:images
    npm run optimize:images -- --dry-run

WHY IT IS PYTHON AND THE GATE IS NODE. The gate runs on every Vercel build, so it carries no
dependencies and reads image headers itself. The converter needs a real encoder, and adding
sharp to every wiki would cost more install time on every build than it ever saves. uv
fetches Pillow on demand, on the one machine that actually generates images.

WHY THE REFERENCE REWRITE IS PART OF THIS AND NOT A SEPARATE STEP. Converting foo.png to
foo.webp without rewriting `![](/img/foo.png)` leaves a page with a broken image and a green
build, because a missing static asset is a 404 at read time, not a build error. The
conversion and the rewrite are one operation or they are a bug.
"""
import io, json, os, re, sys
from pathlib import Path
from PIL import Image

ROOT = Path(sys.argv[0]).resolve().parent.parent
MAX_W, QUALITY = 1536, 80
IMAGE_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp"}
# Same two exemptions the gate makes, for the same reasons: icons must keep their format,
# and share cards must stay png/jpg because several unfurl consumers do not render webp.
#
# Judged on the whole PATH, and kept in lockstep with check-image-weight.mjs.
# buildonanthropic-wiki keeps its deck card at static/og-deck/share.png, referenced from an
# og:image meta as an absolute external URL, so a filename-only rule converted it and no
# site-absolute reference scan could have caught the break.
ICON_NAME = re.compile(r"^(favicon|apple-touch-icon|android-chrome|mstile|safari-pinned|icon)[-.]", re.I)
CARD_STEM = re.compile(r"^(share|card|og|og-image|social-card|share-card)$"
                       r"|(-social-card|-share-card|-og-image)$", re.I)
CARD_DIR = re.compile(r"^(og|share|social)(-.*)?$", re.I)


def format_exempt(rel: str) -> bool:
    parts = rel.split("/")
    # search, not match: CARD_STEM's second alternative is a SUFFIX (-social-card), and
    # re.match anchors at the start, so match() silently classified
    # docusaurus-social-card.jpg as convertible while the JS gate called it exempt. The
    # self-test below exists because that drift is invisible until it converts something.
    return bool(ICON_NAME.search(parts[-1])) or bool(CARD_STEM.search(parts[-1].rsplit(".", 1)[0])) \
        or any(CARD_DIR.search(d) for d in parts[:-1])


def self_test():
    """Both scripts check themselves against scripts/image-exempt-cases.json first."""
    cases = json.loads((ROOT / "scripts" / "image-exempt-cases.json").read_text())
    bad = [p for p in cases["exempt"] if not format_exempt(p)]
    bad += [p for p in cases["convert"] if format_exempt(p)]
    if bad:
        print("[optimize-images] SELF-TEST FAILED, classification disagrees with "
              "scripts/image-exempt-cases.json:", file=sys.stderr)
        for p in bad:
            print(f"  {p}", file=sys.stderr)
        sys.exit(2)


self_test()

# Where a reference to a static asset can live.
TEXT_DIRS = ["docs", "blog", "src", "static/skills"]
TEXT_FILES = ["docusaurus.config.ts", "sidebars.ts", "wiki.config.json"]
TEXT_EXT = {".md", ".mdx", ".ts", ".tsx", ".js", ".jsx", ".json", ".html", ".yml", ".yaml"}

dry = "--dry-run" in sys.argv


def needs_work(path: Path):
    """(reasons, width) — empty reasons means the file already satisfies the contract."""
    try:
        with Image.open(path) as im:
            fmt, w = (im.format or "").lower(), im.width
    except Exception as e:
        return [f"unreadable ({e})"], 0
    exempt = format_exempt(str(path.relative_to(ROOT)))
    reasons = []
    if fmt != "webp" and not exempt:
        reasons.append(f"is {fmt}, not webp")
    if w > MAX_W and not exempt:
        reasons.append(f"is {w}px wide")
    if path.stat().st_size > 1_000_000:
        reasons.append(f"is {path.stat().st_size/1048576:.1f} MB")
    return reasons, w


def convert(path: Path):
    """Re-encode, then swap. Returns the new path, or None.

    An exempt file (icon, share card) is re-encoded IN ITS OWN FORMAT and keeps its
    extension. It can still land here by being oversized, and converting it anyway is what
    turned five wikis' social-card.jpg into a webp that several unfurl consumers do not
    render: the exemption suppressed the format complaint but not the conversion.
    """
    rel = str(path.relative_to(ROOT))
    exempt = format_exempt(rel)
    with Image.open(path) as im:
        if im.width > MAX_W:
            im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
        buf = io.BytesIO()
        if exempt:
            # Encode to the format the EXTENSION declares, not the bytes it currently holds.
            # The extension is what the og:image URL promises and what an unfurl consumer
            # sniffs for. appliedai-wiki's card is a PNG named social-card.jpg; honouring the
            # bytes re-saved 3.3 MB of PNG, honouring the extension gives a 0.5 MB JPEG.
            fmt = {"jpg": "JPEG", "jpeg": "JPEG", "png": "PNG"}.get(path.suffix[1:].lower())
            if fmt == "JPEG":
                im.convert("RGB").save(buf, "JPEG", quality=82, optimize=True, progressive=True)
            elif fmt == "PNG":
                im.save(buf, "PNG", optimize=True)
            else:
                return None  # .ico and friends: leave them entirely alone
        else:
            im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB").save(
                buf, "WEBP", quality=QUALITY, method=6
            )
    data = buf.getvalue()
    if exempt:
        if len(data) >= path.stat().st_size:
            return None
        tmp = path.with_name(path.name + ".tmp-optimize")
        if not dry:
            tmp.write_bytes(data)
            tmp.replace(path)
        return path   # same name, so no rename and no reference rewrite
    if len(data) >= path.stat().st_size and path.suffix.lower() == ".webp":
        return None  # already optimal; re-encoding would only make it bigger
    new = path.with_suffix(".webp")
    if not dry:
        tmp = new.with_name(new.name + ".tmp-optimize")
        tmp.write_bytes(data)
        tmp.replace(new)          # atomic: an interrupted run never leaves a half image
        if new != path:
            path.unlink()
            sidecar = path.with_name(path.name + ".recipe.json")
            if sidecar.exists():
                sidecar.rename(new.with_name(new.name + ".recipe.json"))
    return new


def text_files():
    for d in TEXT_DIRS:
        for p in (ROOT / d).rglob("*"):
            if p.is_file() and p.suffix.lower() in TEXT_EXT:
                yield p
    for f in TEXT_FILES:
        if (ROOT / f).exists():
            yield ROOT / f


targets = [
    p for p in (ROOT / "static").rglob("*")
    if p.is_file() and p.suffix.lower() in IMAGE_EXT
]
work = [(p, needs_work(p)[0]) for p in targets]
work = [(p, r) for p, r in work if r]

if not work:
    print(f"[optimize-images] nothing to do: {len(targets)} images already satisfy the contract")
    sys.exit(0)

print(f"[optimize-images] {len(work)} of {len(targets)} images need work"
      f"{' (dry run, nothing will be written)' if dry else ''}")
renames, before, after = {}, 0, 0
for path, reasons in work:
    size = path.stat().st_size
    new = convert(path)
    if new is None:
        continue
    before += size
    after += len(new.read_bytes()) if not dry else 0
    if new != path:
        rel_old = "/" + str(path.relative_to(ROOT / "static")).replace(os.sep, "/")
        rel_new = "/" + str(new.relative_to(ROOT / "static")).replace(os.sep, "/")
        renames[rel_old] = rel_new

# One pass over every text file, applying every rename. Path-anchored so a filename
# mentioned in prose is left alone.
touched = 0
if renames:
    for f in text_files():
        try:
            src = f.read_text(encoding="utf-8")
        except (UnicodeDecodeError, FileNotFoundError):
            continue
        out = src
        for old, new in renames.items():
            out = out.replace(old, new)
        if out != src:
            touched += 1
            if not dry:
                f.write_text(out, encoding="utf-8")

print(f"[optimize-images] converted {len([1 for _, r in work if r])} file(s), "
      f"rewrote references in {touched} file(s)")
if before:
    print(f"  {before/1048576:.1f} MB -> {after/1048576:.1f} MB "
          f"({(1 - after/before)*100:.1f}% smaller)" if after else f"  {before/1048576:.1f} MB (dry run)")
print("  now run: npm run build   (check-links proves no reference was missed)")
