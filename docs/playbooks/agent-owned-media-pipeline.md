---
title: Agent-Owned Media Pipeline
slug: /playbooks/agent-owned-media-pipeline
description: A concrete workflow where the implementer hands off SD card to agent and gets back a pre-built editing timeline. The pattern generalizes to any capture-to-output flow.
---

# Agent-Owned Media Pipeline

*A concrete workflow where the implementer hands off SD card to agent and gets back a pre-built editing timeline. The pattern generalizes to any capture-to-output flow.*

---

The principle is simple: the human owns judgment, the agent owns every handoff. The capture-to-timeline example below is a video production flow with DJI cameras into Final Cut Pro, but the pattern is the same anywhere you need to move from "I captured something" to "it is ready to work on" with zero manual sorting in between.

## How It Works

Most modern capture devices write accurate timestamps into every file, both in the filename and in the metadata. The ingest agent reads those timestamps, sorts the artifacts chronologically, and generates a pre-built work file (here an FCPXML timeline) that the editing tool opens directly. Open the tool and the material is already there in the order it was captured, ready to work on.

**Plug in card → agent runs → open editing tool → cut.**
Total time from plug-in to timeline: under three minutes.

## What You Need

### Hardware

| Item | Why |
|------|-----|
| USB-C SD card reader (dual-slot) | One slot per camera card |
| USB-C hub (if MacBook) | So both cards can be plugged in at once |

### Software

| Software | Cost | Where |
|----------|------|-------|
| Hazel | $42 one-time | noodlesoft.com |
| FFmpeg | Free | `brew install ffmpeg` |
| Python 3 | Free | `brew install python` |
| Whisper (OpenAI) | Free | `pip install openai-whisper` |
| Final Cut Pro | $300 one-time | Mac App Store |
| CapCut Desktop | Free | capcut.com |

## Step 1: Create the Folder Structure

Run once in Terminal:

```bash
mkdir -p ~/Content/_INBOX
mkdir -p ~/Content/projects
mkdir -p ~/Content/assets/music
mkdir -p ~/Content/assets/b-roll
mkdir -p ~/Content/assets/graphics
mkdir -p ~/Content/archive
mkdir -p ~/Content/_logs
```

```
~/Content/
├── _INBOX/          <- everything lands here first
├── projects/        <- agent sorts into dated folders here
├── assets/          <- reusable: music, b-roll, graphics
├── archive/         <- old projects after 90 days
└── _logs/           <- agent activity log
```

The rule: nothing goes directly to `projects/`. Everything hits `_INBOX/` first. The agent sorts it.

## Step 2: Configure Hazel

### Add the _INBOX folder

Open Hazel, click `+`, select `~/Content/_INBOX/`. No rules needed on `_INBOX` itself. Hazel's job here is watching for SD card mounts.

### Add SD card mount rules

In Hazel, go to **Folder Options** and add a watch for each camera card volume.

**Rule: Pocket 3 card**

```
If volume name contains "DJI" or "OSMO"
  Run shell script:
    rsync -av /Volumes/[CARD_NAME]/DCIM/ ~/Content/_INBOX/
    diskutil eject /Volumes/[CARD_NAME]
```

**Rule: Mini card**

```
If volume name contains "DJI" or "MINI"
  Run shell script:
    rsync -av /Volumes/[CARD_NAME]/DCIM/ ~/Content/_INBOX/
    diskutil eject /Volumes/[CARD_NAME]
```

Plug each card in once first. Check Disk Utility for the exact volume name. Replace `[CARD_NAME]` accordingly (e.g. `DJI_MAVIC` or `POCKET3`).

## Step 3: Install the Ingest Agent

### Install dependencies

```bash
brew install ffmpeg python
pip3 install openai-whisper
```

### Create the agent script

Save as `~/Content/ingest_agent.py`:

```python
#!/usr/bin/env python3
"""
Content Ingest Agent
Watches _INBOX/, processes capture files, generates editor-ready timeline.
"""

import os
import json
import shutil
import subprocess
import datetime
from pathlib import Path

INBOX = Path.home() / "Content" / "_INBOX"
PROJECTS = Path.home() / "Content" / "projects"
LOG = Path.home() / "Content" / "_logs" / "capture_log.md"

VIDEO_EXTS = {".mp4", ".mov", ".MP4", ".MOV"}
AUDIO_EXTS = {".m4a", ".wav", ".mp3"}

def get_creation_time(filepath):
    """Extract creation time from DJI filename or file metadata."""
    name = Path(filepath).stem
    # DJI Pocket 3 format: DJI_20240411_143022_001
    if name.startswith("DJI_") and len(name) >= 20:
        try:
            dt = datetime.datetime.strptime(name[4:19], "%Y%m%d_%H%M%S")
            return dt
        except:
            pass
    return datetime.datetime.fromtimestamp(os.path.getmtime(filepath))

def get_duration(filepath):
    """Get video duration in seconds using ffprobe."""
    result = subprocess.run([
        "ffprobe", "-v", "quiet", "-print_format", "json",
        "-show_format", str(filepath)
    ], capture_output=True, text=True)
    data = json.loads(result.stdout)
    return float(data["format"].get("duration", 0))

def generate_proxy(src, dst_dir):
    """Generate proxy MP4 with REC709 LUT for D-Log footage."""
    proxy_path = dst_dir / ("PROXY_" + Path(src).stem + ".mp4")
    subprocess.run([
        "ffmpeg", "-i", str(src),
        "-vf", "lut3d=DJI_DLog_M_to_Rec709.cube",
        "-c:v", "libx264", "-crf", "23", "-preset", "fast",
        "-c:a", "aac", str(proxy_path)
    ], capture_output=True)
    return proxy_path

def generate_fcpxml(clips, output_path):
    """Generate FCPXML with clips in chronological order."""
    clips_sorted = sorted(clips, key=lambda x: x["time"])

    timebase = 30000
    offset = 0
    asset_lines = []
    clip_lines = []

    for i, clip in enumerate(clips_sorted):
        duration_frames = int(clip["duration"] * 30)
        dur_str = f"{duration_frames * 1001}/{timebase}s"

        asset_lines.append(f'''    <asset id="r{i+2}" name="{clip['name']}" start="0s" duration="{dur_str}"
           hasVideo="1" hasAudio="1" audioSources="1" audioChannels="2" audioRate="48000">
      <media-rep kind="original-media" src="{clip['path']}"/>
    </asset>''')

        offset_str = f"{offset * 1001}/{timebase}s"
        clip_lines.append(f'''        <asset-clip ref="r{i+2}" offset="{offset_str}" name="{clip['name']}"
                    duration="{dur_str}" start="0s" tcFormat="NDF"/>''')
        offset += duration_frames

    total_dur = f"{offset * 1001}/{timebase}s"
    assets = "\n".join(asset_lines)
    clips_xml = "\n".join(clip_lines)
    date = clips_sorted[0]["time"].strftime("%Y-%m-%d") if clips_sorted else "session"

    xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.10">
  <resources>
    <format id="r1" name="FFVideoFormat1080p30" frameDuration="1001/30000s" width="1920" height="1080"/>
{assets}
  </resources>
  <library>
    <event name="{date} Raw Capture">
      <project name="{date} Rough Cut">
        <sequence format="r1" duration="{total_dur}" tcStart="0s" tcFormat="NDF">
          <spine>
{clips_xml}
          </spine>
        </sequence>
      </project>
    </event>
  </library>
</fcpxml>'''

    with open(output_path, "w") as f:
        f.write(xml)
    print(f"  -> FCPXML written: {output_path}")

def process_inbox():
    files = list(INBOX.rglob("*"))
    if not files:
        return

    sessions = {}
    for f in files:
        if not f.is_file():
            continue
        if f.suffix.lower() not in {*VIDEO_EXTS, *AUDIO_EXTS}:
            continue
        t = get_creation_time(f)
        date_key = t.strftime("%Y-%m-%d")
        if date_key not in sessions:
            sessions[date_key] = []
        sessions[date_key].append((f, t))

    for date_key, file_list in sessions.items():
        slug = date_key
        project_dir = PROJECTS / slug
        raw_dir = project_dir / "raw"
        ready_dir = project_dir / "ready"
        transcript_dir = project_dir / "transcripts"

        for d in [raw_dir, ready_dir, transcript_dir]:
            d.mkdir(parents=True, exist_ok=True)

        clips = []

        for filepath, capture_time in sorted(file_list, key=lambda x: x[1]):
            dest = raw_dir / filepath.name
            shutil.move(str(filepath), str(dest))
            print(f"  Ingested: {dest.name}")

            if filepath.suffix.lower() in VIDEO_EXTS:
                duration = get_duration(dest)
                clips.append({
                    "name": dest.name,
                    "path": dest.resolve().as_uri(),
                    "time": capture_time,
                    "duration": duration
                })

        if clips:
            fcpxml_path = ready_dir / f"{date_key}_timeline.fcpxml"
            generate_fcpxml(clips, fcpxml_path)

        brief_path = project_dir / "brief.md"
        with open(brief_path, "w") as f:
            f.write(f"# {date_key} Capture Brief\n\n")
            f.write(f"**Clips captured:** {len(clips)}\n\n")
            f.write("## Shot Log\n\n")
            for clip in sorted(clips, key=lambda x: x["time"]):
                f.write(f"- `{clip['name']}` {clip['time'].strftime('%H:%M:%S')} {clip['duration']:.1f}s\n")
            f.write("\n## Notes\n\n_Add context here after reviewing_\n")

        print(f"\nProject ready: {project_dir}")
        print(f"Open in editor: {ready_dir / f'{date_key}_timeline.fcpxml'}")

        with open(LOG, "a") as log:
            log.write(f"\n## {date_key} {datetime.datetime.now().strftime('%H:%M')}\n")
            log.write(f"- {len(clips)} clips ingested\n")
            log.write(f"- FCPXML: `{fcpxml_path}`\n")

if __name__ == "__main__":
    print("Ingest Agent running...")
    process_inbox()
    print("Done.")
```

### Make it executable

```bash
chmod +x ~/Content/ingest_agent.py
```

## Step 4: Automate the Agent

### Option A: Hazel trigger (recommended)

Add a rule on `~/Content/_INBOX/`:

```
If any file is added
  Run shell script:
    /usr/bin/python3 ~/Content/ingest_agent.py
```

### Option B: Cron job (runs every 5 minutes)

```bash
crontab -e
# Add this line:
*/5 * * * * /usr/bin/python3 ~/Content/ingest_agent.py
```

## Step 5: Final Cut Pro Setup

### Create the library

1. Open FCP, choose **File > New > Library**
2. Name it `Content`
3. Save to `~/Content/`

### Open a pre-built timeline

1. In Finder, go to `~/Content/projects/[date]/ready/`
2. Double-click `[date]_timeline.fcpxml`
3. FCP opens it. All clips on the timeline in chronological order, linked to raw files.
4. Cut immediately.

### Manual import sort (backup)

If importing manually, in the FCP Browser go to **View > Sort By > Content Created** (ascending).

## Step 6: CapCut Setup

CapCut does not support FCPXML. Manual sort on import:

1. Open CapCut, choose **New Project**
2. Click **Import**, navigate to `~/Content/projects/[date]/raw/`
3. Select all clips, sort by **Date Modified** (ascending)
4. Click **Add**. Clips land on timeline in chronological order.

For CapCut, shoot in standard color (not D-Log). CapCut's auto-enhance handles flat footage poorly.

## Step 7: D-Log Color (Optional)

If shooting D-Log M on either camera:

1. Download DJI's official LUT from DJI support (search "D-Log M LUT").
2. Download `DJI_DLog_M_to_Rec709.cube`.
3. Save to `~/Content/assets/`.
4. Update the proxy LUT path in `ingest_agent.py`:

```python
"-vf", "lut3d=/Users/[yourname]/Content/assets/DJI_DLog_M_to_Rec709.cube",
```

The agent generates proxy files with the LUT baked in. Your timeline clips look correct the moment the editor opens.

## Daily Workflow (Once Set Up)

```
1. Come home from shooting
2. Plug SD card(s) into reader
3. Hazel copies to _INBOX/, ejects cards automatically
4. Agent runs, processes footage, generates FCPXML + brief.md
5. Open ~/Content/projects/[today]/ready/[date]_timeline.fcpxml
6. Editor opens, timeline built, clips in chronological order
7. Cut.
```

## Setup Priority Order

| Priority | Task | Time |
|----------|------|------|
| 1 | Run folder structure script | 10 min |
| 2 | Install dependencies (FFmpeg, Python, Whisper) | 20 min |
| 3 | Configure Hazel SD card mount rules | 30 min |
| 4 | Save and test `ingest_agent.py` | 30 min |
| 5 | Set up Hazel trigger on `_INBOX/` | 15 min |
| 6 | Create FCP Library at `~/Content/` | 10 min |
| 7 | Add D-Log LUT if shooting flat color | 15 min |

## Phase 2: Transcription and Auto-Briefs

The next build layer is Whisper transcription plus AI brief generation. The agent auto-transcribes audio from every clip and writes `brief.md` with a shot-by-shot breakdown before the editor even opens. Roughly a two-hour build. Gives you a searchable record of every capture session.

## Generalizing the Pattern

The same shape applies to any flow where humans capture material and need it ready to work on without manual sorting:

- **Voice memos** to transcripts and tagged notes
- **Email inbox** to triaged, summarized digest
- **Screenshots** to OCR'd searchable archive
- **Receipts** to expense report

Three pieces every time: a single inbox the human dumps into, an agent watching that inbox, and a target tool that opens the agent's output directly without further setup.

## Further Reading

- [Knowledge Repo Design](/playbooks/knowledge-repo-design) for the folder pattern this pipeline writes into
- [Command Center](/playbooks/command-center) for where this kind of pipeline lives inside an operator's repo
- [Teammate Discipline](/foundations/teammate-discipline) for the posture an implementer brings when handing off work to an agent
