#!/usr/bin/env bash
set -eu
SRC="${HOME}/.claude/skills"
DEST="$(cd "$(dirname "$0")/skills" && pwd)"
rsync -av --delete --exclude ".git" "${SRC}/" "${DEST}/"
echo "Synced $SRC → $DEST"
