---
title: "Remote Control for Coaching"
slug: /reference/tools/remote-control
description: "How to set up your computer so a coach can watch your screen and, when needed, briefly take control to help you over an install issue. Remote coaching is almost essential for first-time agent workspace setup when the coach cannot be next to you."
---

# Remote Control for Coaching

*How to set up your computer so a coach can watch your screen and, when needed, briefly take control to help you over an install issue. Remote coaching is almost essential for first-time agent workspace setup when the coach cannot be next to you.*

---

## Why this page exists

Getting a personal agent workspace running for the first time is 90% joyful and 10% "my terminal is doing something weird and I do not know why." That 10% usually takes a trained coach 30 seconds to fix, when they can see your screen. When the coach is remote, the difference between "take control for a moment" and "describe the error over voice" is the difference between resolved-in-a-minute and stuck-for-an-hour.

This page documents how to set up remote screen sharing and optional remote control for coaching sessions. It is written for **both sides**: the coach who wants a reliable way to help, and the workshop participant who wants to know what to install so help can actually happen.

---

## The shortlist

Pick one. All four work. Start with the first that matches your situation.

| Tool | Best for | Cost | Trust model |
|---|---|---|---|
| **[Zoom remote control](#zoom-the-default)** | Default. Everyone already has Zoom. Good enough for most 30-minute coaching calls. | Free (up to 40 min per call) | Cloud-hosted, US-based. |
| **[Google Meet + Chrome Remote Desktop](#google-meet--chrome-remote-desktop)** | Google-first teams. Meet for video/voice, Chrome Remote Desktop for the actual control. | Free | Cloud-hosted, US-based. |
| **[Tuple](#tuple-pair-programming-feel)** | Long sessions where it feels more like pair programming. Very high fidelity. | Roughly $29/mo per coach | End-to-end encrypted. Screen data does not hit Tuple's servers. |
| **[RustDesk](#rustdesk-sovereign-option)** | Sovereignty-first. You want to self-host or stay off US-company servers. | Free, open source | Self-hostable. |

What to avoid in 2026: TeamViewer (price hikes, 2024 APT29 breach, forced perpetual-license termination) and AnyDesk (October 2025 price hike of 26-40%, shift to connection-based licensing). Both still work; neither is a good default.

---

## Before the call: what each side sets up

The quality of a remote coaching session is 70% decided before anyone joins the call. Use this checklist.

### The trainer hosts. Always.

The trainer creates the meeting, owns the link, and runs the call. Three reasons:

- **Account-level settings.** Remote control has to be enabled in the host's Zoom account (Settings → In Meeting (Basic) → Remote control). The host's account is where this lives.
- **No 40-minute cap.** The trainer should be on Zoom Pro, Team, or Business. The free tier cuts group calls at 40 minutes, which is not enough time for an install session if anything goes sideways.
- **Recording, co-hosts, waiting rooms.** All of these are the host's to configure. Recording the call (with consent) so the coachee can replay later is often the single most useful thing a trainer does.

If a coachee invites a trainer to a call the coachee hosted, move to a trainer-hosted link before starting work. It is a small friction up front and saves fifteen different failure modes downstream.

### Trainer: before you send the invite

- [ ] **Confirm the end state with the coachee.** Are they starting from zero, or stuck at a specific step? What hardware and OS (Mac or Windows)? Ask before the call; walk in knowing.
- [ ] **Send the prerequisite checklist at least 24 hours ahead.** They need time to update their OS (can take 1-2 hours), create a GitHub account, and have a working credit card handy. Nothing kills a 90-minute coaching block like starting on a pending macOS update.
- [ ] **Complete the [First-time Zoom settings setup](#first-time-zoom-settings-setup-critical) below.** One-time setup per Zoom account. The critical toggles are **Remote control** (Meeting → In Meeting Basic) and **Remote support** (Meeting → In Meeting Advanced). If either is off, the coaching flow silently breaks mid-session.
- [ ] **Update your Zoom client to the latest version.** Two clients on different versions sometimes fail to hand off remote control cleanly.
- [ ] **Create the meeting on a Pro+ Zoom account** (yours, not the coachee's). Add the coachee as an attendee. Enable recording to the cloud or locally.
- [ ] **Send the calendar invite with the Zoom link plus a one-pager of what to prepare.** Include the coachee checklist below.
- [ ] **Have your own agent workspace open** during the call. You will frequently pull up your own instruction files, skill files, or example artifacts to show the coachee what the finished result looks like.
- [ ] **Have a backup channel ready.** Text them on WhatsApp or SMS if Zoom acts up.

### Coachee: the night before and the morning of

- [ ] **Complete the prerequisite checklist the night before.** Update your OS. Create a GitHub account. Have a credit card ready. Plug in your charger. This is the most important prep step.
- [ ] **Know your laptop admin password.** The one you type to log in on a fresh boot, not your Apple ID or Google password. You will need it during install. Write it down somewhere safe if you do not remember it.
- [ ] **Test the Zoom link** 5 to 10 minutes before the call. Join, confirm your camera and mic work, leave, rejoin when the trainer starts.
- [ ] **Close sensitive apps.** Lock your password manager. Close email, banking tabs, anything showing 2FA codes or recovery phrases. See [Safety practices](#safety-practices) for the full list.
- [ ] **Quit unnecessary apps to free RAM.** Downloads during install can take several gigabytes; you want headroom.
- [ ] **Get on strong Wi-Fi** (or plug into ethernet). Downloads during install can be large; a spotty cafe connection will stretch a 30-minute session into two hours.
- [ ] **On macOS, pre-grant Zoom Screen Recording and Accessibility permissions.** System Settings → Privacy & Security → Screen Recording (check Zoom), then Accessibility (check Zoom), then restart Zoom. The first time anyone does this, it takes about two minutes and the install session cannot progress without it.
- [ ] **Block 60 to 90 minutes of uninterrupted time.** Turn off notifications. Close Slack. Put your phone face down.
- [ ] **Have the trainer's contact info on another device.** If Zoom fails completely, you want to reach them by text.

---

## Zoom: the default

If you are running a remote workshop and have not thought about this yet, use Zoom. It is on every participant's computer already, it works on Mac and Windows, and the remote control handoff is a three-click flow.

### First-time Zoom settings setup (critical)

Before your first remote-coaching call, open [zoom.us/profile/setting](https://zoom.us/profile/setting) and configure the settings below. One-time setup per Zoom account. If any of these toggles are wrong, the remote-control flow will silently fail mid-session and you will not know why.

**Meeting → In Meeting (Basic):**

- **Screen sharing**: **ON**. Configure the sub-options like this (matches Zoom's Remote Support constraint, which forces single-participant sharing):
  - *How many participants can share at the same time:* **One participant can share at a time**
  - *All screens mode:* **checked**
  - *Who can share:* **All Participants** (without this, the coachee cannot share and the whole flow breaks)
  - *Who can start sharing when someone else is sharing:* **All Participants**
  - (Zoom shows a warning: *"When 'Remote Support' is enabled, you cannot enable multiple participants to share simultaneously"*. That is expected and fine.)
- **Annotation**: **ON**. Useful for circling errors on the coachee's screen mid-session.
- **Remote control**: **ON**. The one people most often forget. If this is off, the *Request Remote Control* option will not appear in the meeting. Sub-settings:
  - *Allow remote controlling user to share clipboard:* **ON** (so you can copy text between machines during the call)
  - *Allow "auto accept all requests":* **OFF** (safety: the coachee should explicitly approve each handoff)
- **Prevent my screen from being controlled by an external user**: **OFF**
- **Prevent guest user's screen from being controlled in your meeting**: **OFF**
- **Restrict external users from using remote control and remote support in a meeting**: **OFF**. If this is locked by your organization's Zoom admin, the trainer account needs to be on a paid tier that sits outside the restriction, or the admin needs to unlock it for coaching.

**Meeting → In Meeting (Advanced):**

- **Remote support**: **ON**. Separate toggle from Remote Control. Remote Support lets the host provide 1:1 help without the participant having to start a screen-share first. Frequently off by default on new or free Zoom accounts.

**Recording → General (recommended):**

- **Cloud recording**: **ON**, so coaching sessions are replayable by the coachee afterward. Check *"Display participants' names in the recording"* and *"Record thumbnails when sharing"* under the advanced sub-settings while you are there.
- **Automatic recording**: optional. If you want every coaching call recorded without thinking about it, turn this on.

After changing any of these, **fully quit and restart the Zoom desktop app** so the new settings propagate. A running client will happily ignore the new settings until the next launch.

### Step by step

**The participant shares their screen first.** Remote control in Zoom is only available for the person who is sharing. That is almost always the student during a coaching session.

1. Participant clicks **Share Screen** in the Zoom meeting and picks their desktop (not just a single window, or the coach will only see one app).
2. On Mac, Zoom may prompt the participant to grant **Screen Recording** and **Accessibility** permissions the first time. Open System Settings → Privacy & Security → Screen Recording and Accessibility, check the box next to Zoom, and restart Zoom. This is a one-time setup; subsequent sessions skip this step.
3. Coach clicks the three dots next to the participant's name in the meeting, selects **Request Remote Control**, and clicks Request. (On Linux, you cannot request; the participant has to initiate via *Give remote control to* from the floating share toolbar.)
4. Participant gets a prompt: "... is requesting remote control of your screen." **They must tick the "I know and trust the user" checkbox** before the Approve button becomes clickable. Warn them about this step; a lot of first-time participants stare at a greyed-out Approve button without noticing the checkbox.
5. Coach now drives the participant's mouse and keyboard. The participant sees their cursor moving, and the title of the screen-share tab at the top of the meeting window changes to *Controlling [name]'s screen*.

### Handing control back

- Participant can click anywhere on their screen to temporarily take over, or click **Stop Share** to end the session.
- Coach can click **View Options** → **Give Up Remote Control** to hand it back voluntarily.

### What the coach cannot do

- **Click through most system password prompts or OS security dialogs.** macOS admin password dialogs and Windows UAC prompts are intentionally not clickable via screen-share remote control. The participant has to type their admin password themselves. Tell them to expect this.
- **Access a second monitor if only one was shared.** If you need the coach to see everything, have the participant share their full desktop from the start.

### When Zoom falls short

The Zoom free tier caps group calls at 40 minutes. For a full setup session (typically 45 to 90 minutes), the coach needs a Zoom Pro account. If neither of you has one, move to Google Meet or Tuple.

---

## Google Meet + Chrome Remote Desktop

Google Meet itself does not include remote control. The working pattern is: run the video/voice on Google Meet, run the control on [Chrome Remote Desktop](https://remotedesktop.google.com).

### Step by step

1. Participant visits [remotedesktop.google.com/support](https://remotedesktop.google.com/support) and clicks **Share this screen** (first-time users install the Chrome extension when prompted).
2. Google generates a **12-digit access code**. Participant reads this to the coach over the Meet call.
3. Coach goes to the same URL, enters the 12-digit code under **Give support**, and clicks **Connect**.
4. Participant approves the prompt on their screen.
5. Coach has full remote control. Participant can end the session anytime by clicking **Stop Sharing**.

This setup takes longer than Zoom's one-click flow, but the control quality is better and there is no 40-minute call limit.

---

## Tuple: pair-programming feel

If you are coaching someone for the long haul (multiple sessions, pairing on their first real workflows), [Tuple](https://tuple.app/) is the nicest experience of anything here. High-resolution streaming, end-to-end encryption, low latency, both-parties-have-cursors mode. Mac and Windows.

The tradeoff is cost: Tuple is roughly $29/month per host. For an organization running many workshops, this is trivial. For a solo coach running a couple sessions a month, Zoom is plenty.

Install on the coach's machine, send an invite link to the participant (they install a lightweight client), and go.

---

## RustDesk: sovereign option

For teams that want to stay off US-company servers, [RustDesk](https://rustdesk.com) is an open-source remote desktop tool that you can self-host. It is a direct functional replacement for TeamViewer and AnyDesk.

Default setup uses RustDesk's public rendezvous servers (free, fine for most people). If sovereignty matters more, spin up your own rendezvous server on a VPS and both sides connect through that. Install is `brew install --cask rustdesk` on Mac, or the installer from the GitHub releases page on Windows.

Security model: open source, self-hostable, no company collecting your screen data. The tradeoff is a slightly rougher user experience than Tuple and a small amount of trust placed in whoever runs the rendezvous server you connect to.

---

## OS-native fallbacks

If all else fails, the operating systems have built-in options.

- **macOS Screen Sharing**: System Settings → General → Sharing → Screen Sharing. Works for Mac-to-Mac only, and the user being controlled needs to give their Apple ID or grant the session manually. Good for family or internal team use.
- **Windows Quick Assist**: Pre-installed on Windows 10/11. Search "Quick Assist" in the Start menu. Coach gives participant a six-digit code; participant types it in and grants control. Works well and is Microsoft-native, so no extra install.
- **Apple Messages screen share**: If both sides are on iMessage and on Apple devices, start an iMessage thread, click the person's name, and there is a "Share" button for screen sharing. Surprisingly reliable.

---

## Safety practices

Giving someone remote control of your computer is a serious trust action, even for a few minutes. A short checklist:

- **Close your password manager, email, and any open banking or finance tabs before the session.** If 1Password or Bitwarden is unlocked, lock it. You do not want the coach accidentally seeing (or clicking) anything sensitive.
- **Close any window showing two-factor codes or recovery phrases.** Cryptocurrency wallets, authenticator apps, anything that displays secrets on screen.
- **Watch your screen the whole time.** Do not walk away. You are the emergency stop.
- **End the session the moment anything feels off.** Click Stop Share, end the call, and close the app. No explanation needed. A trustworthy coach will understand.
- **Only use this with people you actually know and trust.** Remote control of your machine is not a thing to offer to a stranger on the internet. Verified community trainers and coaches are fine. Random DMs offering "help" with your setup are not.
- **After the session, scan for what changed.** `git status` in your workspace shows exactly what files were added or modified. Review the diff. Understand what the coach did.

---

## Sources

- [Zoom: Requesting or giving remote control](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0065790)
- [Chrome Remote Desktop](https://remotedesktop.google.com)
- [Tuple](https://tuple.app)
- [RustDesk](https://rustdesk.com) (open source, self-hostable)

## Further Reading

- [Setups](/reference/tools/setups): the harness setup flows a coaching session walks a participant through.
- [Capturing Conversations](/reference/tools/capturing-conversations): the companion tool stack for the workflow a participant inherits after setup.
