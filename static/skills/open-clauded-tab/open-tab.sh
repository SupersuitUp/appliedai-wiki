#!/usr/bin/env bash
# Open a new terminal tab in the CURRENT VS Code window and launch an agent in it.
#
# Works by driving VS Code's own "New Terminal" shortcut (ctrl+shift+`) via
# System Events, then typing the command into the fresh shell. Typing into an
# INTERACTIVE shell is the whole point: that is the only context where your
# shell aliases exist, so this picks up whatever your alias currently means
# instead of hardcoding a copy of it that drifts the next time you edit it.
#
# Requires macOS + VS Code + Accessibility permission. See SKILL.md.
#
# Usage:
#   open-tab.sh [--dir <path>] [--prompt <text>] [--name <session-name>]
#               [--delay <seconds>] [--command <cmd>] [--dry-run]

set -euo pipefail

DIR=""
PROMPT=""
NAME=""
DELAY="1.5"
COMMAND="${AGENT_TAB_COMMAND:-clauded}"
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dir)     DIR="${2:?--dir needs a path}"; shift 2 ;;
    --prompt)  PROMPT="${2:?--prompt needs text}"; shift 2 ;;
    --name)    NAME="${2:?--name needs a value}"; shift 2 ;;
    --delay)   DELAY="${2:?--delay needs seconds}"; shift 2 ;;
    --command) COMMAND="${2:?--command needs a command}"; shift 2 ;;
    --dry-run) DRY_RUN=1; shift ;;
    -h|--help) sed -n '2,16p' "$0"; exit 0 ;;
    *) echo "open-tab.sh: unknown argument: $1" >&2; exit 2 ;;
  esac
done

# --- Preflight -------------------------------------------------------------

# pgrep's name matching is unreliable for VS Code (comm is "Code", but -x Code
# does not match), so ask the app itself.
if [[ "$(osascript -e 'application "Visual Studio Code" is running' 2>/dev/null)" != "true" ]]; then
  echo "open-tab.sh: VS Code does not appear to be running." >&2
  exit 1
fi

# Confirms Accessibility permission is granted for whatever app hosts this
# process. Without it, System Events silently sends keystrokes nowhere.
if ! osascript -e 'tell application "System Events" to get name of first application process whose frontmost is true' >/dev/null 2>&1; then
  echo "open-tab.sh: System Events is blocked. Grant Accessibility permission to" >&2
  echo "  the app running this (VS Code, or your terminal) in:" >&2
  echo "  System Settings > Privacy & Security > Accessibility" >&2
  exit 1
fi

if [[ -n "$DIR" && ! -d "$DIR" ]]; then
  echo "open-tab.sh: --dir is not a directory: $DIR" >&2
  exit 1
fi

# --- Build the command line to type ----------------------------------------

# Single-quote a value for safe pasting into the shell. The replacement is built
# as a variable because inside double quotes bash leaves \' as a literal
# backslash, which silently corrupts the quoting.
shq() {
  local esc="'\\''"   # the four characters:  ' \ ' '
  printf "'%s'" "${1//\'/$esc}"
}

LINE=""
[[ -n "$DIR" ]] && LINE="cd $(shq "$DIR") && "
LINE+="$COMMAND"
[[ -n "$NAME"   ]] && LINE+=" --remote-control $(shq "$NAME")"
[[ -n "$PROMPT" ]] && LINE+=" $(shq "$PROMPT")"

# Escape for an AppleScript string literal: backslashes first, then quotes.
as_escape() { local s="$1"; s="${s//\\/\\\\}"; s="${s//\"/\\\"}"; printf '%s' "$s"; }
LINE_AS="$(as_escape "$LINE")"

if [[ "$DRY_RUN" == "1" ]]; then
  echo "Would type into a new VS Code terminal tab:"
  echo "  $LINE"
  exit 0
fi

# --- Drive VS Code ---------------------------------------------------------

osascript <<EOF
tell application "Visual Studio Code" to activate
delay 0.4
tell application "System Events"
	tell process "Code"
		keystroke "\`" using {control down, shift down}
	end tell
end tell
delay ${DELAY}
tell application "System Events"
	keystroke "${LINE_AS}"
	key code 36
end tell
EOF

echo "Opened a new VS Code terminal tab running: $LINE"
