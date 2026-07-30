---
name: open-clauded-tab
description: Open a new terminal tab inside the CURRENT VS Code window and launch a fresh interactive agent session in it, optionally in a specific directory, with a session name, and with an opening prompt already typed. Use when the operator says "open a new agent tab", "spin up another session", "start a session in <repo>", "fan this out to a second session", or when work should continue in a sibling interactive session rather than the current one. NOT for background agents and NOT for spawning subagents inside the current session.
---

# Open Clauded Tab

Opens a new integrated-terminal tab in the VS Code window you are already in, and starts a fresh interactive agent session there.

Hosted at https://www.appliedai.wiki/skills/open-clauded-tab/SKILL.md
Companion script: https://www.appliedai.wiki/skills/open-clauded-tab/open-tab.sh

`clauded` is the default command: a shell alias for a permissive agent session. Point it at whatever your own alias is with `--command` or the `AGENT_TAB_COMMAND` environment variable.

```sh
# the alias this was built against
alias clauded="claude --dangerously-skip-permissions --remote-control"
```

## When to reach for this vs the alternatives

| Want | Use |
|---|---|
| A second **interactive** session you can talk to, side by side | **this skill** |
| Parallel work you do NOT need to converse with | subagents inside the current session |
| A detached run you check on later | your harness's background mode |

The distinguishing feature is interactivity. This produces a real tab with a real prompt you can type into. If you never intend to talk to it, a subagent is cheaper and does not steal your keyboard.

## Install

Save the companion script somewhere on disk and make it executable:

```bash
mkdir -p ~/.agents/skills/open-clauded-tab/scripts
curl -fsSL https://www.appliedai.wiki/skills/open-clauded-tab/open-tab.sh \
  -o ~/.agents/skills/open-clauded-tab/scripts/open-tab.sh
chmod +x ~/.agents/skills/open-clauded-tab/scripts/open-tab.sh
```

## Usage

```bash
~/.agents/skills/open-clauded-tab/scripts/open-tab.sh [options]
```

| Option | Effect |
|---|---|
| `--dir <path>` | `cd` there before launching. Defaults to the new tab's own cwd (VS Code's workspace root). |
| `--name <session-name>` | Passes `--remote-control <name>`, so the session is identifiable when steering it from a phone. |
| `--prompt <text>` | Opening prompt, typed as `clauded '<text>'`. Quotes, apostrophes, and backslashes are handled. |
| `--delay <seconds>` | How long to wait for the new shell before typing. Default `1.5`. Raise it if keystrokes get dropped. |
| `--command <cmd>` | Run something other than `clauded`. Also settable as `AGENT_TAB_COMMAND`. |
| `--dry-run` | Print the line that would be typed and exit. Use this first when the prompt is complicated. |

Examples:

```bash
# plain new session
scripts/open-tab.sh

# a named session in a specific repo, with the first prompt queued up
scripts/open-tab.sh --dir ~/repos/my-wiki \
                    --name wiki-work \
                    --prompt "intake the field note I just dropped in /tmp"
```

## How it works, and why it works this way

1. Activates VS Code, then sends its own **New Terminal** shortcut (`ctrl+shift+\``) via System Events.
2. Waits `--delay` seconds for the shell to attach.
3. Types the command line and presses Return.

Typing into an **interactive shell** is deliberate, and it is the part worth stealing.

`clauded` is an alias in a shell profile, so it exists only in an interactive shell. The script could have hardcoded the expansion (`claude --dangerously-skip-permissions --remote-control`) and skipped the whole keystroke dance by spawning a process directly. That would have created a second copy of a setting that already had a home, and the two would drift the first time the alias changed.

Driving the real terminal means the skill **references** your configuration instead of **copying** it. This was proven in the session that produced the script: the alias gained a new flag, and the skill picked it up with no edit. The same reasoning covers the editor shortcut. Sending VS Code's own `ctrl+shift+\`` inherits whatever "new terminal" currently means, including your default profile, shell, and starting directory.

The general rule: when automating through a tool someone has already configured, drive their real interface rather than reimplementing what it does. Reimplementation forks the config.

## Requirements and failure modes

- **macOS and VS Code only.** The mechanism is AppleScript plus VS Code's keybinding. There is no Linux or Windows path here, and no path for other editors without changing the shortcut and the process name.
- **VS Code must be running.** The script asks the app directly (`application "Visual Studio Code" is running`). `pgrep -x Code` does not reliably match despite the process name being exactly `Code`, and must not be used here.
- **Accessibility permission** must be granted to whichever app hosts the process (VS Code, when the agent runs in its integrated terminal). Without it System Events sends keystrokes into the void with no error. The script preflights this and names the settings pane.
- **Keystrokes follow focus.** For roughly two seconds the script owns the keyboard. Switching apps mid-run lands the text in the wrong window. Do not run it unattended, and keep prompts short.
- **Dropped keystrokes** mean the shell was not ready. Raise `--delay`.

## Verifying a change to this skill

Do not test by launching a real nested session. Use `--command` to prove the chain instead:

```bash
rm -f /tmp/tabtest.txt
scripts/open-tab.sh --dir ~/.agents \
  --command '{ pwd; echo "shell=$$ alias=$(alias clauded)"; } > /tmp/tabtest.txt'
sleep 4 && cat /tmp/tabtest.txt
```

A different shell PID from the calling session proves a new tab opened. The printed alias proves the interactive-shell assumption still holds, which is the assumption the whole design rests on.
