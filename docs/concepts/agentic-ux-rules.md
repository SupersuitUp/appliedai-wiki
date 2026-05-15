---
title: "Agentic UX Rules"
slug: /concepts/agentic-ux-rules
description: "A growing list of UX rules for the agentic age. The bar for product UX has moved because AI moved it."
---

# Agentic UX Rules

*A growing list of UX rules for the agentic age. Add to it when a new rule declares itself.*

---

## Why This List

Every product built in the chat-with-a-GUI era is accumulating a layer of technical debt you can feel in your hands: menus too deep to search, settings that require knowing the right tab name, actions that only work if a human moves a mouse. The bar that used to feel okay now feels hostile because there is a much better bar available. AI has moved the floor.

This doc is a growing list of the rules that move with it. Not exhaustive. Add a rule when a new one declares itself in daily use.

## The Rules

### 1. Every settings surface needs search.

If a user has to scroll through 14 tabs to find "turn off join sound," you built a filing cabinet, not a product. Zoom, macOS System Settings, and most enterprise SaaS fail this hard. A search bar that returns the setting you want (not a doc about it) is the bare minimum.

### 2. Settings are natural language now.

*"Stop joining calls with video on, and raise my mic gain"* should work. Menus, toggles, and dropdowns are a pre-AI-era fallback. They stay as a confirmation layer. They stop being the primary surface.

### 3. Every setting should be agent-modifiable.

A user should be able to tell their agent *"set up Zoom the way I want it for focused work"* and have the agent flip the switches without the human learning where each switch lives. The same logic applies to every application setting, every preference, every configuration flag. If a human can change it, an agent should be able to change it.

### 4. Every non-destructive action should be agent-executable.

Broader than settings. Export this file. Generate this report. Archive these old threads. Draft this reply. Rename this folder. If the action does not destroy data or commit something irreversible (sending external messages, making payments, deleting records), an agent should be able to perform it. Human confirmation belongs on the destructive surface only. Routine actions do not need it.

---

## Running Examples of Violations

A short list of products that currently fail one or more rules. Grows over time.

- **Zoom settings** across roughly 14 tabs, no search bar. Finding "disable join sound" is a scavenger hunt.
- **macOS System Settings** after the Ventura redesign: deeper nesting, search that returns unrelated results, no natural-language surface.
- **Most SaaS admin panels**: rows of toggles with no structured API, no MCP server, no way for an agent to flip one without Playwright-style DOM scraping.

---

## The Meta Rule

**Humans are not the only users of your product anymore.** Agents are. If the only path to a feature is a human moving a mouse through a menu tree, that feature is invisible to the world that is actually running now. The products that age well in the agentic era are the ones where every action has a machine-legible surface and every surface has a natural-language entry point.

---

## Further Reading

- [Agent-Accessible Products](/concepts/agent-accessible-products): The positive version of this. If agents cannot use your product, agents will replace your product.
- [llms.txt and llms-full.txt](/concepts/llms-txt): The simplest machine-legible surface a product can ship.
- [The Permission Surface](/disciplines/the-permission-surface): The right answer for the destructive edge of Rule 4.
