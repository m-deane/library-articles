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

## PWA layer (Wave 4 — April 2026)

The site is an installable Progressive Web App with eager HTML pre-caching. Add-to-Home-Screen on iOS Safari 16.4+ (and Install app on desktop Chrome / Edge / Safari 17+) gives a standalone app with the full article library available offline.

- **Authoring source**: `assets/pwa/` — edit `sw.js`, `manifest.webmanifest`, `sw-reset.html` there. `build.py` copies them to the Space root (`/sw.js`, `/manifest.webmanifest`, `/sw-reset.html`) on every build. Root placement is MANDATORY because Hugging Face `custom_headers` config does not permit `Service-Worker-Allowed`; a sub-path SW cannot claim root scope.
- **Cache name**: `library-articles-shell-v{BUILD_VERSION}`. `BUILD_VERSION` is a short git SHA (or `int(time.time())` fallback if git fails), stamped into `sw.js` at build time. The SW deletes any cache whose name doesn't match the current BUILD_VERSION on `activate` — prevents quota creep across deploys.
- **Diff-on-install**: when a new BUILD_VERSION activates, the SW copies entries that already exist in an older cache into the new cache instead of re-fetching them, then fetches only the missing/changed URLs. Avoids re-downloading ~15 MB per release.
- **Precache scope** (what's included in the install — see `_collect_precache_urls` in `build.py`):
  - `/`, `/index.html`, `/_manifest.json`
  - `/manifest.webmanifest`, `/assets/icons/*.png`
  - `/assets/styles.css`, `/assets/md-styles.css`, `/assets/fonts/fonts.css`, every `.woff2` under `/assets/fonts/`
  - `/assets/vendor/{react,react-dom,prop-types,recharts,lunr}.*.js`
  - every `/articles/*.html`
  - every `/md/*.html` + `/md/index.html`
  - `/search-index.json`, `/search-store.json`
- **PDFs are EXCLUDED from the SW cache.** They live at `/articles/*.pdf` (LFS-tracked) and the whole-library ZIP at `/library-articles-offline.zip`. Caching them would bloat the install past iOS's ~50 MB cap; they travel via direct download instead.
- **Fetch strategies**:
  - Cache-first for `/assets/vendor/*` and `/assets/fonts/*` (immutable, versioned).
  - Stale-while-revalidate for `/articles/*.html`, `/md/*.html`, `/`, `/index.html`, `/_manifest.json`, `/assets/styles.css`, `/assets/md-styles.css`, `/search-index.json`, `/search-store.json`.
  - Network-only (no caching) for `/articles/*.pdf` and `/library-articles-offline.zip`.
  - Network-first-with-cache-fallback for anything else same-origin.
  - Bypass for cross-origin (nothing cross-origin is loaded at runtime).
- **Escape hatch**: visit `/sw-reset.html` to unregister every SW and delete every cache. The only recovery path if a bad deploy poisons the cache.
- **No Android polish** (Q1 decision): no maskable icon variant, no `beforeinstallprompt` UI.
