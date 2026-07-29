#!/bin/bash
# Regression suite for the agentic-project template.
#
# WHY THIS EXISTS. Three cold reviews of this template found real defects, and
# then a fourth review spent an hour producing a confident, thorough, WRONG
# report because it was testing a two-generations-stale copy that had no way to
# announce itself. Both problems have the same fix: run the attacks every time,
# against the real thing, automatically.
#
# The suite is the attacks. A checker you have not attacked is a checker you have
# not tested.
#
# Never pipe this to head/tail when you care about the exit code.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
T="$HERE/template"
fail=0; n=0

expect () {  # expect <want-exit> <name> <setup-command...>
  local want="$1" name="$2"; shift 2
  local d; d="$(mktemp -d)"
  cp -R "$T/." "$d/" 2>/dev/null
  ( cd "$d" && eval "$@" >/dev/null 2>&1 )
  ( cd "$d" && python3 check.py >/dev/null 2>&1 ); local got=$?
  n=$((n+1))
  if [ "$got" -eq "$want" ]; then
    printf "  ok    %-44s exit=%s\n" "$name" "$got"
  else
    printf "  FAIL  %-44s exit=%s want=%s\n" "$name" "$got" "$want"; fail=1
  fi
  rm -rf "$d"
}

FILL='python3 - <<PY
import pathlib,re,json
def sec(f,name,body):
    p=pathlib.Path(f); s=p.read_text()
    p.write_text(re.sub(rf"(##\s+{re.escape(name)}\s*\n)(.*?)(?=\n##\s|\Z)", lambda m:m.group(1)+"\n"+body+"\n\n", s, flags=re.S))
sec("PROJECT.md","The deliverable","A 20-page thesis, PDF, via the portal.")
sec("PROJECT.md","What good looks like","One arguable position, defended, every claim traceable to a source here.")
sec("PROJECT.md","What would make this a failure","A neutral explainer with no thesis in it.")
sec("PROJECT.md","Constraints","The university penalises AI-assisted prose, so the final pass is typed by hand.")
sec("PROJECT.md","Out of scope","Original quantitative research.")
sec("PROJECT.md","Milestones","| Date | What is due | Derived from |\n|---|---|---|\n| 2099-10-01 | draft to supervisor | deadline minus lead time |")
sec("PROJECT.md","People","| Name | Role | How to reach them | Lead | Owes |\n|---|---|---|---|---|\n| A. Reyes | Supervisor | a@uni.example | 2w | one read |")
sec("STATE.md","Next action","Read chapter three and dictate its annotation.")
sec("STATE.md","Blocked","| What | Waiting on | Since | Chased |\n|---|---|---|---|")
sec("STATE.md","Open questions","| Question | Decide by | Where |\n|---|---|---|")
d=pathlib.Path("sources/wp"); d.mkdir(parents=True)
(d/"raw.txt").write_text("x")
(d/"meta.json").write_text(json.dumps({"origin":"o","added":"2026-01-01","why":"w"}))
(d/"annotation.md").write_text("A real annotation. "*30)
pathlib.Path("claims/c.md").write_text("**Claim.** Something falsifiable. "*8)
PY'

echo "agentic-project-template regression suite"
echo
echo "must FAIL (exit 1):"
expect 1 "pristine template, nothing filled in"            "true"
expect 1 "attack: delete every FILL-style marker"          "sed -i '' '/FILL:/d' PROJECT.md STATE.md"
expect 1 "attack: copy the shipped _example source"        "cp -R sources/_example sources/chapter1"
expect 1 "attack: touch an empty claim and deliverable"    "touch claims/c1.md deliverables/d1.md"
expect 1 "attack: fill everything but leave no date"       "$FILL; python3 - <<'P'
import pathlib,re
p=pathlib.Path('PROJECT.md');s=p.read_text()
p.write_text(re.sub(r'\| 2099-10-01 .*\n','',s))
P"
echo
echo "must PASS (exit 0):"
expect 0 "a good-faith fill"                               "$FILL"
echo
if [ "$fail" -eq 0 ]; then echo "ALL $n GREEN"; else echo "FAILURES above"; fi
exit $fail
