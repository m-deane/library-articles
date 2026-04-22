# Project Context

This repo is part of the Data Science Library pipeline:

- This repo (`library-articles`) is mirrored to HuggingFace Spaces at `helwyr55/library-articles`.
- User-level article skills live at `~/.claude/skills/` (source of truth: github.com/m-deane/claude-skills). A mirror is committed under `.claude/skills/` so Claude Code for web can invoke them.
- Article generation → publishing flow: generator skill (technical-ds-article | natgeo-article | travel-photography-article) → JSX artifact → `library-articles/articles/{slug}.jsx` → Phase-2 launchd daemon OR GitHub Actions → auto-commit + auto-push to both GitHub and HF.
- Branch protection is on `main`; all changes go via PR with auto-merge.

## Invocation

- **CLI**: `claude -p "/technical-ds-article {topic}"` from the repo root. Articles save via the Write tool.
- **Web** (claude.ai/code): open this repo, start a session, same skill invocations. The web sandbox will open a PR on your behalf.
