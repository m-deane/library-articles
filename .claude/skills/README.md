# Skills mirror

Source of truth: `github:m-deane/claude-skills` → `~/.claude/skills/`

This directory is a mirror so Claude Code for web (which only reads
`.claude/` committed to this repo) can invoke the generator skills.

**Update flow**:
1. Edit in `~/.claude/skills/`
2. Commit + push to `m-deane/claude-skills`
3. Run `./.claude/sync-skills.sh` in THIS repo to pull fresh copies
4. Commit + push this repo
