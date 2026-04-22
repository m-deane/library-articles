# Offline Reading — Implementation Checklist (Short-Term Track)

_Companion to `docs/offline-reading-research.md`. Implements the PDF-export + vendored-scripts track. Assumes the two-track plan has been accepted._

**Estimated total: 1–2 days, all at `library-articles/`. Nothing in `library/` changes.**

---

## Phase 0 — Verify current state (15 min)

Before touching anything, confirm the baseline:

- [ ] `cd library-articles && grep -l 'unpkg.com' assets/template.html assets/index-template.html` — expect both files to match.
- [ ] `curl -I https://helwyr55-library-articles.static.hf.space/articles/virtual-barrels.html` — expect HTTP 200, no sandbox CSP header on GET.
- [ ] Open DevTools → Network on `virtual-barrels.html`, airplane-mode reload — expect everything fails (establishes the offline problem).
- [ ] `ls articles/ | wc -l` — count the `.jsx` / `.html` / `.meta.json` sets so we know the baseline artifact count.

---

## Phase 1 — Vendor the CDN scripts (~2 hours)

**Prerequisite for everything else. No offline option works until this lands.**

### 1.1 Download vendor scripts

- [ ] Create `library-articles/assets/vendor/` directory.
- [ ] Download each of the five UMD bundles into `assets/vendor/` with these exact filenames:
  - `react.production.min.js` from `https://unpkg.com/react@18.3.1/umd/react.production.min.js`
  - `react-dom.production.min.js` from `https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js`
  - `prop-types.min.js` from `https://unpkg.com/prop-types@15.8.1/prop-types.min.js`
  - `recharts.js` from `https://unpkg.com/recharts@2.12.7/umd/Recharts.js`
  - `babel.min.js` from `https://unpkg.com/@babel/standalone@7.24.7/babel.min.js`
- [ ] Verify sizes — expect ~3.5 MB total raw.
- [ ] Commit these to git. Yes, check them in — reproducibility and the ability to rebuild offline beat a few MB of repo size.

### 1.2 Optional: pre-transpile JSX to drop Babel Standalone (~1 extra hour)

Only do this if answering "yes" to Open Question #3. Skip to 1.3 if undecided — Babel Standalone in-browser is the status quo and still works.

- [ ] `pip install esbuild-python` OR install `esbuild` binary from https://github.com/evanw/esbuild/releases and commit a pinned version.
- [ ] In `build.py`, add `transpile_jsx(source_str) -> str` that shells out to `esbuild --loader=jsx --jsx=automatic`.
- [ ] Replace `<script type="text/babel">…</script>` in `template.html` with `<script>{{JSX_TRANSPILED}}</script>`; remove the `<script src="…/babel.min.js">` line.
- [ ] Delete `assets/vendor/babel.min.js` (the 2.8 MB saving).
- [ ] Regenerate all articles and verify they render unchanged — visual smoke-test `virtual-barrels.html` especially (all 10 chapters, 7 visuals).

### 1.3 Vendor Google Fonts (~30 min)

Two choices — pick one:

**Option A (preferred): inline `@font-face` with local woff2s.**
- [ ] Download the woff2 files Google serves for the seven font families in use (Playfair Display, Source Serif 4, Source Sans 3, JetBrains Mono, DM Serif Display, Instrument Sans, Inter) into `assets/fonts/`.
- [ ] Replace the `<link href="https://fonts.googleapis.com/css2?…">` in both templates with a local `<link rel="stylesheet" href="/assets/fonts/fonts.css">` (or inline the CSS).
- [ ] Add `fonts.css` with `@font-face` rules pointing at the local woff2s with appropriate `font-display: swap`.

**Option B (faster, lower fidelity): simplify font stacks to system fonts.**
- [ ] In `assets/styles.css` and every article's `const F` definition, swap `'Playfair Display',Georgia,serif` → `Georgia,serif`, etc. Accept the fidelity loss.

### 1.4 Rewrite template script srcs

- [ ] Edit `assets/template.html`:
  - [ ] Change `<script crossorigin src="https://unpkg.com/react@18.3.1/…">` → `<script src="/assets/vendor/react.production.min.js">`. Drop `crossorigin` (same-origin now).
  - [ ] Repeat for `react-dom`, `prop-types`, `recharts`, `babel.min.js` (unless step 1.2 dropped Babel).
- [ ] Edit `assets/index-template.html` if it references any CDN scripts (currently it does not; verify).
- [ ] Run `python3 build.py`, open `articles/virtual-barrels.html` locally, confirm renders identically.
- [ ] Airplane-mode test: open locally again with DevTools Network → Offline, confirm renders.

### 1.5 Commit + push to HF

- [ ] `git add assets/vendor/ assets/fonts/ assets/template.html assets/index-template.html articles/*.html index.html _manifest.json`
- [ ] Commit: `"Vendor React/Recharts/Babel/fonts locally — prereq for offline"`
- [ ] `git push hf main && git push github main`
- [ ] Wait ~30 s, verify live URL still renders in-browser.

**Checkpoint: site works identically online, no CDN dependencies. Offline reload still fails because there's no service worker yet — but the building blocks are now local.**

---

## Phase 2 — Add Playwright PDF export (~4 hours)

### 2.1 Install Playwright

- [ ] Add to a new `library-articles/requirements-build.txt`:
  ```
  playwright==1.44.0
  ```
- [ ] Local dev: `pip install -r requirements-build.txt && playwright install chromium`.
- [ ] Verify Chromium is installed: `playwright --version && ls ~/Library/Caches/ms-playwright/chromium-*`.

### 2.2 Add `render_pdfs()` function to `build.py`

New top-level function, called at the end of `main()` behind an env guard so the default local build doesn't require Chromium:

- [ ] Function signature: `def render_pdfs(html_paths: list[Path], out_dir: Path) -> None`.
- [ ] Implementation outline (no code here — see the research file `/tmp/offline-research/05-existing-tools.md` §7 for the exact pattern):
  1. `with sync_playwright() as p: browser = p.chromium.launch()`
  2. `page = browser.new_page()`
  3. For each `html_path`:
     - Skip if `html_path.with_suffix('.pdf')` exists and is newer than `html_path` (incremental).
     - `page.goto(f"file://{html_path.absolute()}")`
     - `page.wait_for_load_state("networkidle")` (Babel transpile needs ~500 ms)
     - `page.evaluate("() => document.fonts.ready")` (font-load gate to prevent FOUT)
     - `page.pdf(path=str(html_path.with_suffix('.pdf')), format="A4", print_background=True, margin={"top":"20mm","bottom":"20mm","left":"18mm","right":"18mm"})`
  4. `browser.close()`
- [ ] Guard the call in `main()`: `if "--pdf" in sys.argv or os.environ.get("BUILD_PDFS") == "1": render_pdfs(html_paths, ARTICLES_DIR)`.

### 2.3 Add `@media print` to `assets/styles.css`

- [ ] Hide the `.article-header-bar` and `.article-footer` in print mode.
- [ ] Add `page-break-before: auto; page-break-inside: avoid;` to `<h2>` (Sec titles) and figure captions.
- [ ] Slight type-size bump for body prose in print (16px → 17px, line-height 1.8 → 1.75).
- [ ] Force `<Photograph>` images to `width: 100%; height: auto; page-break-inside: avoid;`.

### 2.4 Surface "Download PDF" UI

- [ ] Edit `assets/template.html`: add a "📑 PDF" link next to "Back to library" in the article header, pointing at `{{SLUG}}.pdf` (new template token).
- [ ] Edit `build.py` `render_article_page()` to substitute `{{SLUG}}` with the article slug.
- [ ] Edit `assets/index-template.html`: add `<a class="pdf-link" href="articles/{{SLUG}}.pdf">PDF</a>` to each card.
- [ ] Edit `build.py` `render_index()` to emit the PDF link per card.

### 2.5 Add metadata field

- [ ] Extend `build.py` to write `"pdf_url": "articles/{slug}.pdf"` into each `{slug}.meta.json` and into `_manifest.json` entries. Downstream tools (including the Streamlit reader) can pick this up later.

### 2.6 CI integration

- [ ] Edit `.github/workflows/publish-to-hf.yml`:
  - [ ] Add a step `- run: pip install playwright && playwright install --with-deps chromium` before the build.
  - [ ] Cache the Playwright browser install to `~/.cache/ms-playwright` with `actions/cache@v4`.
  - [ ] Set env var `BUILD_PDFS=1` before `python3 build.py`.
- [ ] Local run: `BUILD_PDFS=1 python3 build.py` → verify `articles/*.pdf` created.
- [ ] Smoke test a PDF: open `articles/virtual-barrels.pdf` in Preview, confirm all 10 sections render, Recharts diagrams are vector-crisp, no FOUT, no blank pages.

### 2.7 Commit + push

- [ ] `.gitignore`: decide — commit the PDFs (simpler HF serve, ~15–30 MB repo bloat) or gitignore them (CI builds them on every push). **Default: commit**. Adjust for your appetite.
- [ ] `git add articles/*.pdf build.py assets/template.html assets/index-template.html assets/styles.css .github/workflows/publish-to-hf.yml requirements-build.txt`
- [ ] Commit: `"Add Playwright PDF export pass + Download PDF links"`.
- [ ] `git push hf main && git push github main`.

### 2.8 Verify live

- [ ] Visit `https://helwyr55-library-articles.static.hf.space/articles/virtual-barrels.pdf` — expect HTTP 200 with `Content-Type: application/pdf`.
- [ ] Open on Mac: Finder → Preview → verify charts + fonts.
- [ ] Open on iPhone: tap link → iOS downloads → Files → Save. Re-open offline (airplane mode). Expect perfect render.

**Checkpoint: every article has an offline-readable PDF, discoverable from the article header and the index. iOS Files.app workflow works.**

---

## Phase 3 — Verify offline mode (~30 min)

The acceptance test — run both of these on real devices:

### PC (desktop browser)

- [ ] Open `https://helwyr55-library-articles.static.hf.space/articles/virtual-barrels.html` online.
- [ ] Click "📑 PDF" → downloads `virtual-barrels.pdf`.
- [ ] Open the PDF in any reader (Preview, Acrobat, Chrome) — render ✓.
- [ ] Airplane mode → re-open the PDF — still renders ✓.
- [ ] Search inside the PDF — expect text is selectable (verifies no rasterisation).

### iPhone / iPad

- [ ] Open `https://helwyr55-library-articles.static.hf.space/articles/virtual-barrels.html` in Safari.
- [ ] Tap "📑 PDF" → downloads.
- [ ] Safari Downloads → tap the PDF → auto-opens in Safari PDF viewer.
- [ ] Share → Save to Files → iCloud Drive / On My iPhone → Library.
- [ ] Airplane mode.
- [ ] Files.app → Library → tap `virtual-barrels.pdf` → renders ✓.
- [ ] Scroll through all 10 Sec blocks, verify Recharts diagrams are crisp vector (not blurry).
- [ ] Try markup (highlight, annotate) — expect it works (standard Files.app PDF features).

### Pass criteria

- [ ] PDF loads in < 2 s on both platforms.
- [ ] Every Recharts diagram renders as vector SVG (pinch-to-zoom stays crisp).
- [ ] All seven font families render correctly (no FOUT/FOIT).
- [ ] Code cells (`<Code>`, `<NB>`) have dark background preserved (`print_background=True` is set).
- [ ] Article cross-links (e.g., `<a href="../index.html">`) are clickable but fail gracefully offline.

---

## Phase 4 — Documentation (~30 min)

- [ ] Update `README.md` — add an "Offline reading" section explaining the PDF workflow.
- [ ] Update `CLAUDE.md` at repo root — note the new vendor scripts and PDF build pass.
- [ ] Add a short tip in `assets/index-template.html` footer: `"Tip: click 📑 PDF on any article to save an offline copy."`.

---

## Phase 5 — Whole-library ZIP for plane-trip cold reads (~1 hour) — REQUIRED

_Added 2026-04-22 after user confirmed plane-trip cold reads are a requirement. This phase was "nice-to-have" originally; it's now mandatory for the short-term track._

### 5.1 Add ZIP build pass

- [ ] New function `build_library_zip(articles_dir: Path, out_path: Path)` in `build.py`, called at end of `main()`.
- [ ] Use stdlib `zipfile.ZipFile(out_path, 'w', ZIP_DEFLATED)`.
- [ ] Include: `articles/*.pdf` (every article PDF).
- [ ] Optional: include `articles/*.html` + `assets/vendor/*` + `assets/styles.css` + `index.html` (rewritten to relative vendor paths) as an offline-browsable bundle. Expands the ZIP from ~15 MB (PDFs only) to ~20–25 MB (HTML + PDFs). Recommend PDFs-only for v1 — the HTML offline path has the iOS Safari "can't render local HTML" problem documented in the research; PDFs sidestep it entirely.
- [ ] Output: `dist/library-articles-offline.zip`.

### 5.2 Link from index

- [ ] Edit `assets/index-template.html`: add a prominent "📦 Download all ({{ZIP_SIZE_MB}} MB)" button next to the filter bar.
- [ ] Edit `build.py` `render_index()` to substitute `{{ZIP_SIZE_MB}}` with the actual size rounded to the nearest MB.
- [ ] Edit `build.py` to copy `dist/library-articles-offline.zip` into the Space root (so HF serves it at `https://helwyr55-library-articles.static.hf.space/library-articles-offline.zip`).

### 5.3 Verify

- [ ] Size check: ZIP should be 10–30 MB. If larger, reconsider including HTML.
- [ ] iPhone plane-trip test: before flight, download the ZIP on iPhone via Safari → Save to Files → unzip in Files.app → verify all PDFs are there and openable offline.
- [ ] Desktop plane-trip test: download ZIP on Mac/PC, unzip, open any PDF — renders offline.

### 5.4 Commit + push

- [ ] `.gitignore`: add `dist/library-articles-offline.zip` if you're rebuilding every push; or commit it if you want the repo self-contained (+15–30 MB repo bloat).
- [ ] Commit, push, verify `https://helwyr55-library-articles.static.hf.space/library-articles-offline.zip` returns HTTP 200 with `Content-Type: application/zip`.

---

## Rollback plan (if something breaks)

Each phase is independently reversible:

- **Phase 1 rollback**: `git revert` the vendor-scripts commit. Template reverts to unpkg. Zero data loss.
- **Phase 2 rollback**: `git revert` the PDF commit. Delete `articles/*.pdf` if committed. PDFs stop appearing, HTML still works.

The `/sw-reset.html` escape hatch (Phase 2 of the medium-term track) is not needed here since we haven't shipped a service worker yet.

---

## When this is done, proceed to the medium-term track

Once short-term is live and stable for ~a week (verify no one's complained about missing PDFs, no build failures in CI), move to `docs/offline-reading-research.md` § "Medium term" — the PWA layer. That checklist is not written yet (only write it once you've confirmed the short-term track works in practice and you still want the PWA features).

---

## Estimated timeline

| Phase | Elapsed | Notes |
|---|---|---|
| Phase 0 | 15 min | Verify baseline |
| Phase 1 | 2 hours | Prereq — vendor CDN + fonts |
| Phase 2 | 4 hours | Playwright + render_pdfs + UI + CI |
| Phase 3 | 30 min | Device verification |
| Phase 4 | 30 min | Docs |
| **Total** | **~7 hours** | One focused workday |

Add ~1 hour for the Babel-Standalone drop (Phase 1.2) if you take that option. Add ~1 hour if Playwright fonts flake on CI and need debugging.

---

## Phase 6 — Offline search (~3 hours) — REQUIRED per 2026-04-22 decision

_Makes article content searchable inside the PWA while offline._

### 6.1 Generate search index at build time

- [ ] Add `lunr` Python port or pre-install `lunr.js` CLI in the build environment.
- [ ] Add `build_search_index(articles_markdown_dir)` to `build.py`:
  1. Read every `library/articles/*.md` (the output of `jsx_to_markdown.py` — clean prose without JSX noise).
  2. Extract `{slug, title, subtitle, category, tags, body}` per article.
  3. Build a lunr index: `fields: title^3, subtitle^2, body; metadata: slug, title, category`.
  4. Write to `library-articles/search-index.json` (~100–300 KB).
- [ ] Run `jsx_to_markdown.py` before `build_search_index()` to guarantee markdown is fresh.

### 6.2 Client-side search UI

- [ ] Add `<input type="search" id="content-search">` to `assets/index-template.html` next to the existing filter bar. Reuse styling.
- [ ] Bundle `lunr.min.js` (~30 KB) into `assets/vendor/` (commit it) — ship as part of the PWA pre-cache.
- [ ] Add inline JS in the index template: load `search-index.json` on first keystroke (lazy), run lunr query on input, render a dropdown of hits with title + highlighted snippet + slug → link.
- [ ] Add "Search results" visual state: dim the regular card grid, show matches as a linear list.

### 6.3 PWA cache

- [ ] Add `search-index.json` and `assets/vendor/lunr.min.js` to the service worker's pre-cache list (when the medium-term PWA phase ships).

### 6.4 Smoke test

- [ ] Type "kirk" on the index — expect hits on Virtual Barrels and Virtual Barrels Chapter Notes (Kirk's spread-option formula).
- [ ] Type "gaussian mixture" — expect hit on AFML ch 10 (bet sizing).
- [ ] Airplane mode (after PWA phase lands) — confirm search still works.

---

## Phase 7 — Markdown reader (plain-HTML alternate view) (~4 hours) — REQUIRED per 2026-04-22 decision

_Gives offline reading of Streamlit-equivalent content without the WebSocket dependency. Uses the existing `library/articles/*.md` markdown mirror as the source._

### 7.1 Build markdown → styled HTML

- [ ] Add Python `markdown` lib (or `mistune`) to `requirements-build.txt`.
- [ ] Add `build_md_reader(slug)` to `build.py`:
  1. Read `library/articles/{slug}.md`.
  2. Parse markdown → HTML.
  3. Wrap in a tiny new template `assets/md-template.html` (no React, no Babel, no Recharts — just `<main>` with the same header/footer chrome as the JSX template for navigation consistency).
  4. Write to `library-articles/md/{slug}.html`.
- [ ] Add a CSS file `assets/md-styles.css` that gives the plain-HTML reader the same serif typography as the JSX version. ~200 lines.

### 7.2 Cross-link from the JSX reader

- [ ] Add a "📄 Plain reader" toggle next to the "📑 PDF" button in `assets/template.html` — links to `../md/{slug}.html`.
- [ ] Add the reverse toggle to `assets/md-template.html` — "🎨 Full reader" links back to `../articles/{slug}.html`.

### 7.3 Separate index for plain reader

- [ ] Generate `library-articles/md/index.html` — minimal markdown-reader index (same filter/sort UI pattern as the main index but pointing at `/md/{slug}.html`).

### 7.4 PWA cache inclusion

- [ ] Extend the service-worker pre-cache list to include `/md/*.html` + `/md/index.html` + `/assets/md-styles.css`. Adds ~30–80 KB per article — ~5 MB for 60+ articles.
- [ ] PWA total budget post-Phase 7: ~10 MB HTML + ~5 MB md-HTML + ~1 MB vendor = **~16 MB**. Still fine on iOS's 50 MB cap.

### 7.5 Streamlit markdown-bundle download (Option 8b)

- [ ] In the **Streamlit** repo (not library-articles), add a new route or sidebar button "📦 Download markdown bundle" that zips `library/articles/*.md` on request and serves. ~30 min of Streamlit work.
- [ ] Not strictly necessary if Phase 7 covers the content; purely a belt-and-braces for users who want the raw markdown.

### 7.6 Smoke test

- [ ] Visit `library-articles/md/virtual-barrels.html` locally — expect clean serif reading, no JS errors.
- [ ] Confirm toggle between full and plain reader works.
- [ ] After PWA phase: airplane mode → plain reader still works.

---

## Phase 8 — Desktop wrappers (OPTIONAL, per decision #7) — deferred

Per 2026-04-22 decision: no Apple Developer Program, no code signing. Native-app wrappers (Tauri/Electron) are not worth pursuing — unsigned desktop apps trigger Gatekeeper warnings on macOS and SmartScreen on Windows. The PWA covers desktop install adequately (Chrome/Edge/Safari 17+ all support "Install app").

Skip this phase unless a future decision reverses on the $99/yr Apple Developer Program.

---

## Updated total timeline

| Phase | Elapsed | Notes |
|---|---|---|
| Phase 0 | 15 min | Verify baseline |
| Phase 1 | 2–3 hours | Vendor CDN + fonts (+ 1 h if pre-transpiling JSX) |
| Phase 2 | 4 hours | Playwright + render_pdfs + UI + CI |
| Phase 3 | 30 min | Device verification |
| Phase 4 | 30 min | Docs |
| Phase 5 | 1 hour | Whole-library ZIP |
| Phase 6 | 3 hours | Offline search |
| Phase 7 | 4 hours | Markdown reader + Streamlit bundle download |
| **Total** | **~15 hours** | ~2 focused workdays for short-term track |

Medium-term PWA layer still outstanding after this — a further ~1 day of work once the short-term track is validated.
