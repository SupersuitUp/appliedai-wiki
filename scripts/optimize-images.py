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
FORMAT_EXEMPT = re.compile(
    r"(favicon|apple-touch-icon|android-chrome|mstile|safari-pinned|icon-\d|social-card|share-card|og-image)",
    re.I,
)
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
    exempt = bool(FORMAT_EXEMPT.search(path.name))
    reasons = []
    if fmt != "webp" and not exempt:
        reasons.append(f"is {fmt}, not webp")
    if w > MAX_W and not exempt:
        reasons.append(f"is {w}px wide")
    if path.stat().st_size > 1_000_000:
        reasons.append(f"is {path.stat().st_size/1048576:.1f} MB")
    return reasons, w


def convert(path: Path):
    """Re-encode to webp beside the original, then swap. Returns the new path, or None."""
    with Image.open(path) as im:
        if im.width > MAX_W:
            im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
        buf = io.BytesIO()
        im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB").save(
            buf, "WEBP", quality=QUALITY, method=6
        )
    data = buf.getvalue()
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
