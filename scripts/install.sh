#!/usr/bin/env bash
set -eu
PLIST_NAME="com.mdeane.article-ingest"
SRC="$(cd "$(dirname "$0")" && pwd)/launchd/${PLIST_NAME}.plist"
DEST="${HOME}/Library/LaunchAgents/${PLIST_NAME}.plist"
cp "$SRC" "$DEST"
launchctl bootout gui/$(id -u)/${PLIST_NAME} 2>/dev/null || true
launchctl bootstrap gui/$(id -u) "$DEST"
echo "Installed: $DEST"
launchctl list | grep article-ingest || echo "(not yet listed)"
