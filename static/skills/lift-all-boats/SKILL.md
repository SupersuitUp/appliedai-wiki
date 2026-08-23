---
name: lift-all-boats
description: Propagate a fix across every instance of a family (every site forked from one template, every service from one scaffold, every repo from one generator) AND into the template that mints new ones, so the defect cannot come back. Use when someone says "fix this everywhere", "do this across all of them", "propagate this fix", or when you have just fixed one instance of something there are many of. NOT for a one-off change to a single repo.
---

# Lift All Boats

One instance got fixed. There are eleven more with the same defect, and a
template that will mint a twelfth next week.

This skill turns a single repair into a fleet-wide one. It exists because the
natural stopping point (the instance in front of you now works) is the point at
which the fix is worth the least: the defect stays in every sibling, and the
generator keeps producing it.

## The rule that makes this work: a fix is a DETECTOR plus a REMEDY

Never propagate a bare edit. Propagate a pair:

- **DETECTOR**: a command that answers "does this instance have the defect?"
  and can be run against an untouched instance.
- **REMEDY**: what to change when the detector fires.

A remedy without a detector produces the worst possible outcome, which is a
sweep that reports success everywhere. Edits silently no-op on instances that
drifted, on instances that never had the defect, and on instances where the
anchor text differs by a character, and all three look identical to "done".

Earned on a fleet of eight documentation sites. A swizzled theme component (a
password gate) returned `null` before mount, and since that component wrapped
the whole app including the document head, static generation emitted every page
with an empty `<title>` and zero Open Graph tags. The site had never produced a
single working link preview. The obvious sweep is "apply the gate fix to all
the sites". Five of the eight have no such component at all, so that sweep
would have edited nothing on five repos and declared victory on all eight.

### Prove the detector can fail before you trust it

Run the detector against the instance you already know is broken. If it does
not fire there, it is not a detector, and a clean sweep with it means nothing.
This is the same discipline as a permissions test that cannot fail being
decoration.

Where possible, prefer a detector that reads the BUILT OUTPUT or the LIVE
DEPLOYMENT over one that greps source. Source greps encode one spelling of the
defect; output checks encode the defect itself. Grepping for `return null`
finds one authoring style. Counting the Open Graph tags in the built HTML finds
the defect no matter how it was written.

### A detector frequently finds a second defect

Fixing one thing removes whatever the defect was hiding. In the case above, the
component rendering nothing also meant the framework's broken-link checker had
nothing to check, so three genuinely broken links had been passing the build for
months. The moment the head was fixed, the build went red. That is the fix
working, not the fix breaking something, and the sweep needs room in its
schedule for it.

## Order of operations, and it is not negotiable

1. **Fix the generator FIRST.** Repair the template before touching a single
   instance. Fix instances first and a fork created in the gap is born broken,
   which leaves the fleet inconsistent in a way nobody will look for again.
2. **Enumerate instances from a registry, not from memory.** Find the
   authoritative list and say which one you used. A hand-typed list of siblings
   is how three sites got missed on a previous sweep: they were created after
   the enumerating document was written, so they inherited the wrong default and
   nothing ever revisited them.
3. **Detect across the whole fleet before remedying any of it.** The survey is
   cheap and it tells you the real scope, which is frequently not what you
   assumed.
4. **Remedy, one instance at a time, each behind its own build gate.**
5. **Report the matrix.** Never a sentence.

## The report is a matrix, and the fourth column is the point

| instance | had it | fixed | verified | notes |
|---|---|---|---|---|

Four outcomes per instance, and they are not the same thing:

- **had-it / fixed / verified** is the happy path.
- **already-clean** means the detector ran and did not fire. Say so explicitly;
  this is the row that a remedy-only sweep would have silently faked.
- **had-it / could-not-apply** means the defect is there and the remedy did not fit
  (drifted source, different framework, a deliberate local variation). This is
  the most valuable row in the table and it must never be rounded up to "done".
- **skipped**, deliberately out of scope, with the reason.

A sweep that reports only successes is not a report, it is an assertion.

## Guardrails

- **One defect per run.** Bundling three fixes into one sweep means one failure
  on one instance blocks the other two, and the commit messages stop being
  reviewable. Run it three times.
- **Each instance gets its own commit in its own repo**, with the same
  imperative summary, so the fleet-wide change is greppable later by message.
- **Never sweep a change that is a matter of taste.** Propagate defects and
  contract violations. A layout preference is not a defect, and applying one
  across eleven repos is how a fleet loses the local decisions that were
  deliberate.
- **Respect the deliberate exception.** Some instances differ on purpose. When
  the detector fires but the local variation looks intentional, that is a
  `could-not-apply` row and a question for the owner, not an edit.
- **Stop and report if the detector fires on more instances than expected.** A
  defect in 11 of 11 usually means the template did it, which changes the story
  from "sweep the fleet" to "the generator has been shipping this all along".

## Procedure

```
0. Name the defect in one sentence. Write the DETECTOR and the REMEDY.
1. Run the detector against the KNOWN-BAD instance. It must fire. If not, stop.
2. Apply the remedy to the template repo, commit, push.
3. Enumerate instances from the registry.
4. Run the detector across all of them. Record had-it / already-clean.
5. For each had-it: apply remedy, run that repo's build gate, commit, push.
6. Re-run the detector against every instance you touched. Record verified.
7. Report the matrix, including every could-not-apply row.
```

## Worked example: the empty-head defect

**Defect.** A swizzled `src/theme/Root.tsx` (a client-side password gate)
returned `null` before mount. Root wraps the whole app including the head, so
static generation emitted pages with an empty `<title>` and zero `og:` tags.
Unshareable, on every page, invisible to every check except a scraper.

**Detector** (reads built output, not source):

```bash
npm run build >/dev/null 2>&1 && \
  grep -c 'property=og:' build/index.html    # 0 means the defect is present
```

**Remedy.** Render `{children}` always and make the gate an overlay on top,
rendered during static generation too so there is no flash of content before
hydration. A client-side gate never kept content out of the shipped bundle
anyway; the edge middleware is the real boundary, and it deliberately passes
link-preview bots so cards render.

**What the survey found.** Two of eight sites had it. The other six have no such
component and were already clean. A remedy-only sweep would have reported eight
successes.

## Related

- **Fix the generator, not the artifact.** The companion discipline this skill
  depends on: <https://www.appliedai.wiki/perspectives/the-generator-is-the-only-thing-worth-fixing>
- **Why the generator is not enough on its own:**
  <https://www.appliedai.wiki/perspectives/fixing-the-generator-does-not-fix-the-fleet>
