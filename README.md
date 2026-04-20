---
title: Library Articles
emoji: "📝"
colorFrom: purple
colorTo: indigo
sdk: static
pinned: false
---

# Library Articles

Companion static site for [huggingface.co/spaces/helwyr55/library](https://huggingface.co/spaces/helwyr55/library) — renders full JSX React article artifacts with Recharts, custom SVG, and magazine-quality typography.

**Live**: [helwyr55-library-articles.static.hf.space](https://helwyr55-library-articles.static.hf.space/)

## How it works

This is a **zero-build static Space**. Each article is a `.jsx` file; an HTML wrapper per article loads React, ReactDOM, Recharts, Babel Standalone, and the article's inline styles from CDN — Babel transpiles the JSX in-browser on page load. No npm, no Vite, no Node.

```
articles/{slug}.jsx       ← source (committed)
       ↓ python3 build.py
articles/{slug}.html      ← HTML wrapper (committed, served by HF)
articles/{slug}.meta.json ← parsed metadata (committed)
index.html                ← regenerated listing page
_manifest.json            ← JSON index of all articles
```

## Directory structure

| Path | Purpose |
|------|---------|
| `articles/*.jsx` | Source JSX — the canonical form of each article |
| `articles/*.html` | Auto-generated HTML wrappers (from `build.py`) |
| `articles/*.meta.json` | Parsed frontmatter + metadata |
| `assets/template.html` | HTML wrapper template (React/Recharts/Babel CDN + global `<Photograph>` helper) |
| `assets/styles.css` | Shared CSS — syncs with the main Streamlit library's design tokens |
| `assets/index-template.html` | Template for the article index page |
| `build.py` | JSX → HTML wrappers + index + manifest (stdlib only) |
| `jsx_to_markdown.py` | JSX → markdown mirror for `library/articles/{slug}.md` |
| `extract_metadata.py` | Post-build metadata enrichment (title, subtitle, tags) |
| `scripts/` | Phase 2 launchd auto-ingest watcher |
| `.github/workflows/` | Phase 4 GitHub Actions (publish-to-hf + auto-revert) |

## Article conventions — hard requirements

Every `.jsx` in `articles/` must:

- Start with `/* --- YAML frontmatter --- */` comment AND a `const ARTICLE_DATA = { ... };` literal
- End with `export default function ArticleName() { ... }` — default export is mandatory
- **No ES imports** — React, hooks, Recharts components are all global at runtime (the HTML wrapper destructures them)
- Use short component names: `<Sec>`, `<DC>`, `<SB>`, `<IC>`, `<P>`, `<PQ>`, `<Callout>`, `<NB>`, `<Code>`, `<Cap>`, `<Photograph>`
- Valid `ARTICLE_DATA.style` (e.g. `technical-ds`, `natgeo-classic`, `travel-service-hybrid`) and `category` (e.g. `machine-learning`, `science-nature`)

See `~/.claude/skills/shared-article-jsx-reference.md` for the full spec.

## Running locally

```bash
# Regenerate HTML wrappers + index + manifest after editing any JSX
python3 build.py

# Refresh the markdown mirror (optional — requires sibling library/ repo)
python3 jsx_to_markdown.py

# Preview
python3 -m http.server 8765
open http://localhost:8765/
```

## Deployment

Pushes to `main` trigger `.github/workflows/publish-to-hf.yml` which runs `build.py`, `jsx_to_markdown.py`, then pushes to the HF Space git remote. HF rebuilds the static site in ~1 minute.

## Adding an article

1. Generate the JSX via a Claude Code skill (see `~/.claude/skills/` and `AUTOMATION.md` in the workspace root)
2. Save to `articles/{kebab-slug}.jsx`
3. Commit + push — the Phase 2 watcher or GitHub Actions pipeline handles the rest

## Related repos

- `library/` — Streamlit reader (sibling in `____p-library/` workspace)
- `article-daemon/` — Obsidian-driven generator
- `github.com/m-deane/claude-skills` — generator skill source of truth
