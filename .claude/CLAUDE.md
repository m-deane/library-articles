# Project Context

This repo is part of the Data Science Library pipeline:

- This repo (`library-articles`) is mirrored to HuggingFace Spaces at `helwyr55/library-articles`.
- User-level article skills live at `~/.claude/skills/` (source of truth: github.com/m-deane/claude-skills). A mirror is committed under `.claude/skills/` so Claude Code for web can invoke them.
- Article generation → publishing flow: generator skill (technical-ds-article | natgeo-article | travel-photography-article) → JSX artifact → `library-articles/articles/{slug}.jsx` → Phase-2 launchd daemon OR GitHub Actions → auto-commit + auto-push to both GitHub and HF.
- Branch protection is on `main`; all changes go via PR with auto-merge.

## Invocation

- **CLI**: `claude -p "/technical-ds-article {topic}"` from the repo root. Articles save via the Write tool.
- **Web** (claude.ai/code): open this repo, start a session, same skill invocations. The web sandbox will open a PR on your behalf.

## Offline-ready build (Phase 1 — April 2026)

The static site loads zero cross-origin assets at runtime. Every browser fetch is same-origin, so the site can be cached cleanly and served offline later.

- **Vendored runtime scripts** live in `assets/vendor/`: `react.production.min.js`, `react-dom.production.min.js`, `prop-types.min.js`, `recharts.js` (~630 KB total, UMD globals). These used to be loaded from `unpkg.com`.
- **Vendored fonts** live in `assets/fonts/`: 9 woff2 files covering Playfair Display, Source Serif 4, Source Sans 3, JetBrains Mono, DM Serif Display, Instrument Sans, Inter (latin subset, ~308 KB total). Loaded via `assets/fonts/fonts.css` (29 `@font-face` rules, `font-display: swap`).
- **JSX is pre-transpiled at build time** via esbuild (classic mode → `React.createElement(...)` calls that resolve against the UMD React global). Babel Standalone is no longer required at runtime. The esbuild static binaries are gitignored (too large for HF Space push); run `bash tools/esbuild/install.sh` once locally and the CI workflow runs the same script on every push (pinned to esbuild 0.21.0).
- Entry point: `transpile_jsx(jsx_source: str) -> str` in `build.py`. If no esbuild binary is found it logs a warning and returns the raw JSX as a fallback — keeping the escape hatch functional.
- `build.py` also strips any `@import url('https://fonts.googleapis.com/...')` lines that articles embed in their own inline `<style>` tags (they pre-dated vendoring). Specialty families like Newsreader or IBM Plex now degrade to the Georgia/system fallback declared alongside them.
- After editing any article, run `python3 build.py` and verify no `unpkg.com` / `fonts.googleapis.com` / `fonts.gstatic.com` appear in `articles/*.html` or `index.html`.

Design rationale is in `docs/offline-reading-research.md` and the step-by-step plan in `docs/offline-reading-implementation-checklist.md`.
