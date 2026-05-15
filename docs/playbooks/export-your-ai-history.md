---
title: "Export your AI history"
slug: /playbooks/export-your-ai-history
description: "Years of conversations with ChatGPT, Claude, or Gemini already contain a picture of who you are. Export, filter, and bootstrap your agent workspace from it."
---

# Export your AI history

*Years of conversations with ChatGPT, Claude, or Gemini already contain a detailed picture of who you are. Export that history, filter it, and let your new agent read it to bootstrap your `user/USER.md` in minutes instead of an hour-long interview.*

---

## Why export?

Your conversation history with ChatGPT, Claude, or Gemini is a rich record of how you think, what you are building, what you care about, and what you are stuck on. Before answering a single profile question from scratch, consider: your old AI tools already know a lot of this. Export what they have, feed it to your new agent, let it synthesize, review, and save. Fifteen minutes instead of an hour, and the result is usually deeper.

## Before you start: filter sensitive information

:::caution This is not optional
Your chat history probably contains things you would never share with a coworker: health questions, relationship processing, financial details, therapy-style reflections, private venting. Your agent workspace lives on your machine, but you will likely push it to GitHub, share your screen, or collaborate with others at some point.

**Never drop raw exports into your workspace.** Always synthesize with a filtering prompt, review the output, and delete the raw export when you are done.
:::

## Approach A (recommended): full export + filtered synthesis

Export your archive, drop it in a temporary location (Desktop, Downloads, NOT in your agent workspace), and tell your agent to synthesize a filtered profile from it.

### ChatGPT export (OpenAI)

1. Sign in to [chatgpt.com](https://chatgpt.com).
2. Click your profile icon (bottom left).
3. **Settings > Data Controls > Export data > Confirm export**.
4. Wait 20 to 30 minutes for an email with your download link.
5. Download the ZIP (link expires in 24 hours). It contains `conversations.json` (full history + metadata) and `chat.html` (browser-viewable).

**Not available on ChatGPT Business or Enterprise plans.** On those plans, conversations cannot be bulk-exported; you have to document the useful ones manually.

### Claude export (Anthropic)

1. Go to [claude.ai](https://claude.ai) on desktop (this flow is not available on iOS or Android).
2. Click your initials (lower left) > **Settings > Privacy > Export data**.
3. Wait for an email with your download link (link expires in 24 hours).
4. Download the ZIP containing your conversation history as JSON. As of early 2026, this includes conversations inside Claude Projects.

**Claude Memory is not included** in the standard export because memory is tied to your account and is not currently exportable as a standalone file. Don't worry: the conversations themselves contain most of what matters.

### Gemini export (Google)

Gemini history is exported via [Google Takeout](https://takeout.google.com), not from Gemini's settings directly:

1. Go to [takeout.google.com](https://takeout.google.com).
2. Deselect all, then scroll to find and select **"My Activity"**.
3. Click **"All activity data included"** > deselect all > re-select only **"Gemini Apps"** (or **"Gemini Apps Activity"**).
4. Choose JSON format.
5. Create the export. Google emails you a download link when it is ready.

Alternative: for a single conversation, use Gemini's built-in **"Share & export"** icon below any response to export to a Google Doc.

### Other sources (no export needed)

LinkedIn profile, personal website, published blog posts, strategic docs, bio blurbs you wrote for a conference, Notion pages about yourself. These are already curated for professional consumption, so they are safe to drop directly into your workspace at `user/` without filtering. The filtering caution applies specifically to raw AI conversation exports.

### The synthesis prompt

Once your export is unzipped and sitting somewhere on your machine (Desktop is fine), launch your harness inside your workspace. Paste this prompt, then **drag the unzipped export folder (or the `conversations.json` / `chat.html` file) from Finder or File Explorer directly into your terminal**. Dragging auto-appends the full path to the end of your prompt, so you never have to type or guess it. Then hit enter.

```text
Read through my AI export (path at the end of this message) and synthesize a user/USER.md file about me. Focus on extracting:

- My professional skills, expertise, and domain knowledge
- Projects I have worked on or am working on
- Goals, ambitions, and what I am trying to build
- How I make decisions and what I value professionally
- Industries, tools, and technologies I am familiar with
- My communication style and how I think through problems

Do NOT include or reference:

- Personal health, medical, or mental-health conversations
- Relationship, dating, or sexual-orientation details
- Financial details (account numbers, salaries, debts)
- Private venting, gossip, or complaints about specific people
- Anything that would be embarrassing or inappropriate in a professional context

If something is borderline, leave it out. I would rather add context later than have sensitive info in my workspace. After synthesizing, show me the full output so I can review before you save it.

Export path:
```

Your agent will read the export, apply the filter, and produce a draft `USER.md`. Review it carefully (read every line), remove anything you would not want a collaborator to see, then save it to `user/USER.md`.

**Then delete the raw export from your machine.** You do not need it anymore, and keeping it around is a privacy liability.

---

## Approach B (quick alternative): ask your old AI about you

Skip the export entirely. Open ChatGPT (or whichever LLM you have used the longest) in a browser and paste this prompt:

```text
Based on everything you know about me from our conversations, write a detailed professional profile. Cover my skills, expertise, projects, goals, decision-making style, interests, and what I am currently working on. Skip anything personal or sensitive.
```

Copy the output. Paste it into your agent session inside your workspace and tell it:

```text
Save this as user/USER.md.
```

This is faster than the full export and avoids touching any raw files. The trade-off: the AI only surfaces what it actively remembers in its current context, not patterns buried across months of conversation. The result will be thinner than Approach A but is still a good starting point. You can deepen it later.

## Approach C (from scratch): live interview

If you have no history to export (or prefer to start clean), just tell your agent in natural language:

```text
Interview me to create my user profile.
```

Use voice-to-text to speak your answers naturally. Do not overthink. If you get stuck, just ask: *"Based on what you already know about me, what do you think?"* The AI will offer its best guess and you confirm or correct. That alone often surfaces things you would not have articulated on your own.

---

## What good looks like

Your resulting `user/USER.md` should feel like the briefing document you would hand to a new chief of staff on their first day. It should cover:

- Who you are (role, background, what you are building).
- What you value and how you make decisions.
- What you are working on right now across your life's pillars.
- Your style (communication, work rhythm, strong opinions).
- Your 90-day vision.

It should **not** contain:

- Private health, mental-health, or relationship details.
- Financial credentials or sensitive numbers.
- Anything you would be uncomfortable with a future collaborator reading.

## After this step

You have a `USER.md`. Your agent now knows the shape of you. Every future conversation it has with you is informed by this file. From here, the next move is to keep building context: relationship files in `people/`, strategy docs in `artifacts/`, processed transcripts in `meeting-transcripts/`. All compound.

## Source links (vendor-confirmed)

- [ChatGPT export: OpenAI Help Center](https://help.openai.com/en/articles/7260999-how-do-i-export-my-chatgpt-history-and-data)
- [Claude export: Anthropic Privacy Center](https://privacy.claude.com/en/articles/9450526-how-can-i-export-my-claude-data)
- [Gemini export: Google Takeout](https://takeout.google.com)

## Further Reading

- [Context engineering](/disciplines/context-engineering). The discipline of curating what your AI knows.
- [Externalize your brain](/foundations/externalize-your-brain). The broader principle behind this move.
- [Priming your agent](/playbooks/priming-your-agent). What you do with the workspace once it exists.
