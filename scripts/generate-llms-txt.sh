#!/bin/bash
# Generate llms.txt and llms-full.txt for AI agent consumption.
# llms.txt = index with titles, URLs, and descriptions
# llms-full.txt = full content of every page concatenated
#
# Runs as part of prebuild. Output goes to static/ so Docusaurus serves them at root.
#
# Parameterize per wiki via the four environment variables below (or pass them
# inline before invocation). Defaults assume the canonical wiki layout.

set -euo pipefail

# --- Configuration -----------------------------------------------------------
# Override these via environment variables when wiring into a specific wiki.

WIKI_TITLE="${WIKI_TITLE:-Wiki Documentation}"
WIKI_DESCRIPTION="${WIKI_DESCRIPTION:-Documentation for this wiki, served as llms.txt for AI agent consumption.}"
BASE_URL="${BASE_URL:-https://example.com}"
DOCS_DIR="${DOCS_DIR:-docs}"
STATIC_DIR="${STATIC_DIR:-static}"

LLMS_TXT="$STATIC_DIR/llms.txt"
LLMS_FULL="$STATIC_DIR/llms-full.txt"

# --- Header: llms.txt --------------------------------------------------------

cat > "$LLMS_TXT" << EOF
# $WIKI_TITLE

> $WIKI_DESCRIPTION

## Docs

EOF

# --- Header: llms-full.txt ---------------------------------------------------

cat > "$LLMS_FULL" << EOF
# $WIKI_TITLE: Full Content

> This file contains the full text of every page in the wiki.
> Generated automatically at build time.

EOF

# --- Walk + emit -------------------------------------------------------------

find "$DOCS_DIR" -name "*.md" -o -name "*.mdx" | sort | while read -r file; do
  # Extract title from frontmatter
  title=$(grep -m1 '^title:' "$file" 2>/dev/null | sed 's/^title:[[:space:]]*//' | sed 's/^"//' | sed 's/"$//' || echo "")

  # Fall back to first H1 if no frontmatter title
  if [ -z "$title" ]; then
    title=$(grep -m1 '^# ' "$file" 2>/dev/null | sed 's/^# //' || echo "")
  fi

  # Skip if no title found
  if [ -z "$title" ]; then
    continue
  fi

  # Build URL path from file path
  # docs/concepts/foo.md -> concepts/foo
  # docs/start-here/index.md -> start-here/
  url_path=$(echo "$file" | sed 's|^'"$DOCS_DIR"'/||' | sed 's|\.mdx$||' | sed 's|\.md$||' | sed 's|/index$||')
  if [ -z "$url_path" ] || [ "$url_path" = "index" ]; then
    url="$BASE_URL"
  else
    url="$BASE_URL/$url_path"
  fi

  # Extract description from frontmatter
  description=$(grep -m1 '^description:' "$file" 2>/dev/null | sed 's/^description:[[:space:]]*//' | sed 's/^"//' | sed 's/"$//' || echo "")

  # Write to llms.txt index
  if [ -n "$description" ]; then
    echo "- [$title]($url): $description" >> "$LLMS_TXT"
  else
    echo "- [$title]($url)" >> "$LLMS_TXT"
  fi

  # Write full content to llms-full.txt
  echo "---" >> "$LLMS_FULL"
  echo "# $title" >> "$LLMS_FULL"
  echo "URL: $url" >> "$LLMS_FULL"
  echo "" >> "$LLMS_FULL"
  # Strip frontmatter and emit body
  awk '/^---$/{if(++c==2)next}c>=2' "$file" >> "$LLMS_FULL"
  echo "" >> "$LLMS_FULL"
  echo "" >> "$LLMS_FULL"
done

# --- Footer + summary --------------------------------------------------------

page_count=$(grep -c '^\- \[' "$LLMS_TXT" || echo 0)
echo "" >> "$LLMS_TXT"
echo "---" >> "$LLMS_TXT"
echo "Generated at build time. $page_count pages indexed." >> "$LLMS_TXT"

echo "Generated llms.txt ($page_count pages) and llms-full.txt"
