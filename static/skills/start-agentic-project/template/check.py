#!/usr/bin/env python3
"""Assert this project is actually in the state it claims to be in.

WHY THIS EXISTS, AND WHY IT LOOKS LIKE THIS.

The first version of this script counted files. It reported `annotated: 1` for a
13-byte file containing the word "Annotation", `sources: 2` for two empty
directories, and "No drift detected" over a repo with no next action, no stated
deliverable and no captured material. It detected exactly the three bugs the
previous review had found and nothing else, so green meant "last round's bugs did
not come back" while reading as "the project is healthy".

That is the same trusted-and-wrong failure the state file used to have, moved one
layer up into the tool built to kill it. So this version ASSERTS CONTENT. A
directory is not a source. A touched file is not an annotation. A heading with
its own authoring instructions still under it is not a filled-in section.

    python3 check.py            report, exit 1 if anything is wrong
    python3 check.py --quiet    exit code only

Never pipe it to head/tail when you care about the exit code; the pipe returns
the last command's status, not this one's.

No dependencies, no network.
"""
import re, sys, json, datetime, pathlib

TEMPLATE_VERSION = "2026-07-29.5"   # bump on any change to this template
ROOT = pathlib.Path(__file__).parent
DATE = re.compile(r"(\d{4})-(\d{2})-(\d{2})")
MIN_ANNOTATION = 200          # bytes; below this it is a placeholder, not a thought
# An UNMISSABLE marker beats sniffing at prose. The previous version guessed
# whether a section was still boilerplate by pattern-matching its wording, and
# false-negatived on three of five sections in the shipped template: it passed
# "The deliverable" while that section still contained the instructions for
# writing a deliverable. A heuristic that fails silently is the exact thing this
# script exists to catch, so the template now marks every section that must be
# filled and the check is simply whether the marker is gone.
# A SECTION IS UNFILLED IF IT STILL MATCHES THE SHIPPED TEXT.
#
# The previous version used a <!-- FILL --> marker. One `sed` deleted every
# marker and turned an empty repo green, and the marker itself said "delete this
# line once this section is written", so an honest tired user did the same thing
# by following the instruction. A guarantee that a single keystroke defeats is
# not a guarantee.
#
# Diffing against a pristine copy cannot be evaded by deleting anything, because
# deleting the boilerplate is exactly what filling it in requires.
PRISTINE = ROOT / ".claude" / "pristine"


def _section(text, name):
    m = re.search(rf"##\s+{re.escape(name)}\s*\n(.*?)(?=\n##\s|\Z)", text, re.S)
    return (m.group(1).strip() if m else "")


def _unfilled(name, actual_text, pristine_text):
    """True when the section is empty or still substantially the shipped prose."""
    a, b = _section(actual_text, name), _section(pristine_text, name)
    if not a:
        return True
    if not b:
        return False
    norm = lambda s: " ".join(s.split())
    if norm(a) == norm(b):
        return True
    # partial edits still count as unfilled if most of the boilerplate survives
    kept = sum(1 for line in b.splitlines() if line.strip() and line.strip() in a)
    total = sum(1 for line in b.splitlines() if line.strip())
    return total > 0 and kept / total >= 0.6


def _is_example(path):
    """True when a file is still substantially the shipped _example text."""
    ref = PRISTINE / "example-annotation.md"
    if not ref.exists():
        return False
    a, b = path.read_text(), ref.read_text()
    lines = [l.strip() for l in b.splitlines() if l.strip()]
    if not lines:
        return False
    kept = sum(1 for l in lines if l in a)
    return kept / len(lines) >= 0.6


def _scaffold(f):
    return f.name == "README.md" or f.name.startswith(("_", "."))


def problems():
    """Every way this repo is not what it appears to be. Each is a hard finding."""
    out = []

    # ---- PROJECT.md: is the ontology actually written, or still its own instructions?
    pj = ROOT / "PROJECT.md"
    pristine_pj = (PRISTINE / "PROJECT.md").read_text() if (PRISTINE / "PROJECT.md").exists() else ""
    if not pj.exists():
        out.append("PROJECT.md is missing. Nothing can be judged without it.")
    else:
        txt = pj.read_text()
        for section in ["The deliverable", "What good looks like",
                        "What would make this a failure", "Constraints",
                        "Out of scope", "Milestones", "People"]:
            if _unfilled(section, txt, pristine_pj):
                out.append(f"PROJECT.md '{section}' is UNFILLED: still the shipped boilerplate.")

        rows = [l for l in _section(txt, "People").splitlines()
                if l.strip().startswith("|") and not set(l.strip()) <= set("|- ")]
        if len(rows) <= 1:
            out.append("PROJECT.md 'People' has a header and no rows. The agent is told to chase blocked items and has nobody to chase.")

    # ---- sources: a directory is not a source
    src = ROOT / "sources"
    folders = [d for d in src.iterdir() if d.is_dir() and not d.name.startswith("_")] if src.exists() else []
    real_sources, real_annotations = 0, 0
    for d in folders:
        has_raw = any(f.name.startswith("raw") for f in d.iterdir() if f.is_file())
        if has_raw:
            real_sources += 1
        else:
            out.append(f"sources/{d.name} has no raw.* and no raw-UNAVAILABLE.md. It is a folder, not a source.")
        a = d / "annotation.md"
        if not a.exists():
            out.append(f"sources/{d.name} is not annotated. A raw source is a rock.")
        elif a.stat().st_size < MIN_ANNOTATION:
            out.append(f"sources/{d.name}/annotation.md is {a.stat().st_size} bytes. That is a placeholder, not an annotation.")
        elif _is_example(a):
            # `cp -R sources/_example sources/chapter1` used to pass: the shipped
            # example annotation is 683 bytes of instructions and cleared the size
            # bar three times over. The template shipped its own bypass.
            out.append(f"sources/{d.name}/annotation.md is still the shipped example text, unedited.")
        else:
            real_annotations += 1
        m = d / "meta.json"
        if not m.exists():
            out.append(f"sources/{d.name} has no meta.json.")
        else:
            try:
                keys = set(json.loads(m.read_text()))
                missing = {"origin", "added", "why"} - keys
                if missing:
                    out.append(f"sources/{d.name}/meta.json is missing {sorted(missing)}.")
            except Exception:
                out.append(f"sources/{d.name}/meta.json is not valid JSON.")

    # ---- STATE.md: the loudest possible failure is a missing next action
    st_path = ROOT / "STATE.md"
    st = st_path.read_text() if st_path.exists() else ""
    if not st:
        out.append("STATE.md is missing.")
    else:
        pristine_st = (PRISTINE / "STATE.md").read_text() if (PRISTINE / "STATE.md").exists() else ""
        body = _section(st, "Next action")
        if _unfilled("Next action", st, pristine_st):
            out.append("STATE.md has NO NEXT ACTION. This is the one thing the repo exists to answer.")
        elif len(body.split()) < 4:
            out.append("STATE.md's next action is too terse to act on.")
        # counts must never be asserted by hand, in either word order
        for label, actual in (("sources", real_sources), ("annotated", real_annotations)):
            words = {"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7,"eight":8,"nine":9,"ten":10}
            # Only word-numbers ("three sources") or an explicit "sources: 3".
            # A bare digit before the noun is almost always a DATE in the Done log
            # ("2026-07-28 Annotated the transcript"), and matching it fabricated
            # an accusation that pushed the reviewer to delete true log entries.
            for m2 in re.finditer(rf"(?:\b({'|'.join(words)})\s+{label}\b|{label}\s*[:=]\s*(\d+))", st, re.I):
                w = (m2.group(1) or "").lower(); n = m2.group(2)
                claimed = int(n) if n else words.get(w)
                if claimed is not None and claimed != actual:
                    out.append(f"STATE.md claims {claimed} {label}; the repo actually has {actual}.")
        for pat, why in ((r"Days to deadline:\**\s*\d+", "'Days to deadline'"),
                         (r"On track:\**\s*(yes|no)", "'On track'"),
                         (r"Last updated:\**\s*\d{4}-\d{2}-\d{2}", "'Last updated'")):
            if re.search(pat, st, re.I):
                out.append(f"STATE.md hand-types {why}. Delete it; a typed value is stale the next day.")
    return out, real_sources, real_annotations, folders


def dates():
    """Every date in PROJECT.md's Milestones table, tagged per DATE not per line.

    Three bugs lived here. `self-imposed` was tested against the whole LINE, so a
    milestone row containing two dates tagged both, and the same date came out
    real on one row and self-imposed on another. Past dates were eligible to be
    "what binds", and one five days gone was duly reported as the binding
    constraint. And self-imposed dates were excluded from binding at all, which
    contradicted PROJECT.md's own advice that the decision you must make before
    the work can start is usually the thing that actually catches you out.

    Now: only the Milestones section is parsed, the tag comes from the cell the
    date sits in, past dates are reported but never bind, and the nearest FUTURE
    date binds whether or not it is self-imposed.
    """
    pj = ROOT / "PROJECT.md"
    if not pj.exists():
        return []
    body = _section(pj.read_text(), "Milestones") or pj.read_text()
    found = []
    for line in body.splitlines():
        if not line.strip().startswith("|") or set(line.strip()) <= set("|- "):
            continue
        cells = [x.strip() for x in line.strip().strip("|").split("|")]
        # ONLY the first column. Prose in a "Derived from" cell routinely mentions
        # other dates ("15 Oct minus her lead time"), and treating those as
        # milestones produced duplicate rows with contradictory tags.
        if not cells:
            continue
        m = DATE.search(cells[0])
        if m:
            try:
                d = datetime.date(*map(int, m.groups()))
            except ValueError:
                continue
            found.append((d, line.strip(), "self-imposed" in line.lower()))
    return sorted(found)


def main():
    quiet = "--quiet" in sys.argv
    today = datetime.date.today()
    probs, nsrc, nann, folders = problems()
    ds = dates()
    if not ds:
        probs.append("PROJECT.md's Milestones table has NO DATE. The deadline question cannot be answered at all.")
    elif not [x for x in ds if x[0] >= today]:
        probs.append("Every milestone in PROJECT.md is in the PAST. Either the project is over or the plan is stale.")
    claims = ROOT / "claims"
    delivs = ROOT / "deliverables"
    # Assert content here too. These two counters survived the last round as pure
    # filename counts, printed under a header claiming otherwise: three `touch`
    # commands produced "claims: 2, deliverable drafts: 1".
    MIN_CLAIM, MIN_DRAFT = 120, 500
    nclaims = len([f for f in claims.glob("*.md")
                   if not _scaffold(f) and f.stat().st_size >= MIN_CLAIM]) if claims.exists() else 0
    thin = [f.name for f in claims.glob("*.md")
            if not _scaffold(f) and f.stat().st_size < MIN_CLAIM] if claims.exists() else []
    for t in thin:
        probs.append(f"claims/{t} is under {MIN_CLAIM} bytes. That is a stub, not a claim.")
    # a deliverable may be a directory (a LaTeX project is the normal shape)
    ndel = 0
    if delivs.exists():
        for f in delivs.iterdir():
            if _scaffold(f):
                continue
            size = f.stat().st_size if f.is_file() else sum(x.stat().st_size for x in f.rglob("*") if x.is_file())
            if size >= MIN_DRAFT:
                ndel += 1

    L = [f"agentic-project-template {TEMPLATE_VERSION}",
         "  (if this is older than the copy you were given, you are reviewing a stale template)", "",
         "DERIVED STATE (asserted against content, not counted from filenames)", "",
         f"  usable sources (raw present): {nsrc} of {len(folders)} folders",
         f"  real annotations (>{MIN_ANNOTATION}b):  {nann}",
         f"  claims:                       {nclaims}",
         f"  deliverable drafts:           {ndel}", ""]

    L.append("MILESTONES")
    future = [x for x in ds if x[0] >= today]
    binder = future[0] if future else None
    for d, ctx, si in ds:
        n = (d - today).days
        tag = " [self-imposed]" if si else " [external]"
        if d < today:
            note = "  (PAST, cannot bind)"
        elif binder and (d, ctx, si) == binder:
            note = "  <-- NEAREST FUTURE DATE, this is what binds"
        else:
            note = ""
        L.append(f"  {d} ({n:+d}d){tag}{note}")
        L.append(f"      {ctx[:96]}")
    if binder and binder[2]:
        L.append("  (it is self-imposed, and it still binds: everything after it waits on it)")

    L.append("")
    if probs:
        L.append(f"NOT READY, {len(probs)} finding(s):")
        L += [f"  - {p}" for p in probs]
    else:
        L.append("No findings. Content asserted, not merely counted.")

    if not quiet:
        print("\n".join(L))
    return 1 if probs else 0


if __name__ == "__main__":
    sys.exit(main())
