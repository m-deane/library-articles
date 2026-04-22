# Offline Reading — Research Report

_Date: 2026-04-22. Synthesised from five parallel research threads under `/tmp/offline-research/`._

## TL;DR

- **A single prerequisite unlocks every offline option**: stop loading React, ReactDOM, PropTypes, Recharts, and Babel Standalone from `unpkg.com` and serve them from `assets/vendor/` instead. Until this is done, no offline strategy works — the cross-origin CDN dependency is the choke point. Measured cost: ~3.5 MB on disk (or ~630 KB if we also drop Babel Standalone by pre-transpiling JSX at build time), ~2 hours of `build.py` edits.
- **Short-term recommendation: build-time PDF export via Playwright**. Adds a ~40-line `render_pdfs()` pass to `build.py`, emits `articles/{slug}.pdf` alongside each HTML, links it from the article header and index. PDFs are the ideal offline format for iOS Files.app (search, markup, iCloud sync), render Recharts charts as crisp vector SVG, and carry zero runtime dependencies. Risk 2/5, ship-in-a-day.
- **Medium-term recommendation: layer a Progressive Web App (PWA)** on top of the same vendored scripts. A root-scoped service worker with cache-first for vendor + stale-while-revalidate for articles gives installable offline reading on every desktop browser and on iOS Safari 16.4+. iOS caps at ~50 MB storage and may evict after 7 days of non-use — acceptable for a reader, not ideal. Risk 2/5, ship-in-a-week.
- **Reject**: native app wrappers (Electron/Tauri/Capacitor), read-later apps (Pocket/Instapaper/Readwise), browser "Save Page As", and Safari Reader Mode / Reading List. Reasons in §4.
- **Open questions for the user**: §5.

---

## Option comparison

| Option | PC support | iOS support | Implementation effort | Ongoing maintenance | Works without dev account? | Requires code signing? | Recommended for |
|---|---|---|---|---|---|---|---|
| **Build-time PDF (Playwright)** | ✅ All desktop browsers via Files | ✅ iOS Files.app native (ideal) | ~½ day after prereq | Low (Playwright in CI, font-load gate) | ✅ | ❌ | **Short-term default** |
| **PWA (service worker + manifest)** | ✅ Chrome/Edge/Firefox/Safari 17+ install, all browsers cache | ✅ iOS 16.4+ Add to Home Screen, 50 MB cap, 7-day ITP | ~½–1 day after prereq | Medium (SW versioning, escape hatch) | ✅ | ❌ | **Medium-term polish** |
| **Per-article "Download HTML" button** | ✅ Universal | ⚠️ iOS Safari can't render local HTML from Files.app (iOS 14+); needs Documents-by-Readdle or Edge | ~2–4 hours after prereq | Low | ✅ | ❌ | Nice-to-have alongside PDF |
| **Whole-library ZIP** | ✅ Universal | ⚠️ Same iOS local-HTML limitation | ~1 hour after prereq | Low | ✅ | ❌ | "Plane trip" use case |
| **SingleFile browser extension** (user-side) | ✅ Chrome/Firefox/Edge; ✅ Safari iOS via $2 App Store ext. | ⚠️ Same local-HTML issue; works in third-party viewers | Zero repo work (user docs only) | Zero | ✅ | ❌ | Document as reader-side escape hatch |
| **Tauri desktop app** | ✅ Mac/Win/Linux, 2–10 MB bundle | ❌ iOS "functional, not polished" | ~1 day after prereq | Medium (Rust, signing, CI) | Partially ($99 Apple for mac notarisation) | ✅ (Apple DevID) | Only if user wants a "real" desktop app |
| **Electron desktop app** | ✅ Mac/Win/Linux, 80–200 MB bundle | — | ~½ day after prereq | High (Chromium security patches) | Partially ($99 for mac) | ✅ | Rejected — Tauri dominates here |
| **Capacitor / WKWebView iOS app** | — | ✅ Native WKWebView wrapper | ~1 day after prereq | Medium-high (Xcode, 90-day TestFlight rebuilds) | ❌ $99/yr Apple | ✅ iOS | **Rejected** unless App-Store-distributed product emerges |
| **iOS Share → Print → Save PDF** (manual) | — | ✅ Best zero-code iOS workflow | Zero | Zero | ✅ | ❌ | Document as a per-article manual fallback |
| **Read-later apps** (Pocket/Instapaper/Readwise) | ❌ All use Readability parsers; see empty `<div id="root">` and save nothing | ❌ Same | N/A | N/A | Varies | N/A | **Rejected — content-extraction class fundamentally incompatible with runtime-rendered JSX** |
| **Browser "Save Page As"** | ❌ Saved file re-fetches unpkg on `file://` → CORS blocked → blank page | ❌ Same | N/A | N/A | ✅ | N/A | **Rejected** |
| **Safari Reader Mode / Reading List** | — | ❌ Reader heuristic needs ≥700 chars of semantic `<p>` in source HTML; articles serve empty `<div id="root">` so Reader never activates | N/A | N/A | ✅ | N/A | **Rejected** |

---

## Recommended two-track plan

### Short term (1–2 days of work)

**Goal: every article has a canonical offline artifact that works on iOS Files.app, macOS Preview, and every desktop PDF reader.**

1. **Vendor the CDN scripts** (prereq). Add `library-articles/assets/vendor/{react,react-dom,prop-types,recharts,babel}.min.js` — download once from unpkg and commit. Edit `library-articles/assets/template.html` to load from `../assets/vendor/` instead of `https://unpkg.com/...`. Drop the `crossorigin` attribute (same-origin now). Either vendor Google Fonts to `assets/fonts/` or simplify font stacks to system fallbacks. Same change to `assets/index-template.html` if it references any CDN scripts.
2. **Add PDF export pass to `build.py`**. New `render_pdfs()` function using Playwright Chromium. Launch once, reuse page across articles. For each built `{slug}.html`: `page.goto(file://...)` → `wait_for_load_state("networkidle")` → `page.evaluate("document.fonts.ready")` → `page.pdf(path=articles/{slug}.pdf, format="A4", print_background=True, margin={20mm})`. Skip if PDF newer than HTML (incremental).
3. **Add `@media print` CSS** to `assets/styles.css` — hide the header bar, page-break hints on `<Sec>`, enlarge serif body slightly, force `<Photograph>` to keep aspect ratio.
4. **Add "Download PDF" link** to the article `<header>` in `template.html` and a "PDF" icon next to each card in `index-template.html`.
5. **CI**: add `playwright install chromium` to `.github/workflows/publish-to-hf.yml` (or to the launchd `ingest.py` pipeline). Cache the Chromium download.
6. **Test airplane-mode**: on PC, open downloaded PDF in Preview; on iPhone/iPad, Save to Files → iCloud Drive → open offline.

**Deliverable**: every article readable offline as PDF, zero runtime dependencies, no service worker required, works on any platform that reads PDFs.

### Medium term (2–5 days on top of short term)

**Goal: installable offline reading with the live JSX experience (interactive charts, hover states, future features).**

1. **Ship `sw.js` + `manifest.webmanifest`** at the Space root (via `build.py` copy). Service worker lives at `/sw.js` — root placement is mandatory because Hugging Face's `custom_headers` config doesn't permit `Service-Worker-Allowed`.
2. **Cache strategy** (revised 2026-04-22 — HTML only, no PDFs in SW cache):
   - **Eager pre-cache on `install`**: `/articles/*.html` (full list from `_manifest.json` injected into `sw.js` at build time) + `/index.html` + `/assets/styles.css` + `/assets/vendor/*`. Total ~10–15 MB — well under iOS's ~50 MB cap.
   - **PDFs excluded from SW cache deliberately** — they're shipped via the Phase-5 ZIP or downloaded per-article on demand. Keeps the PWA install small and the two offline surfaces independent (cache eviction ≠ losing PDFs).
   - Cache-first for `/assets/vendor/*` (immutable, versioned).
   - Stale-while-revalidate for `/articles/*.html`, `/index.html`, `/_manifest.json`, `/assets/styles.css`.
   - Network-first for `/articles/*.meta.json`.
   - On new article publish, `BUILD_VERSION` changes, SW re-runs `install`, diffs the new manifest against old cache and fetches only the new article(s) — avoids re-downloading 15 MB per release.
3. **Build-time cache busting**: `build.py` stamps a `BUILD_VERSION` (git SHA or epoch) into `sw.js`. Cache name becomes `library-articles-v{BUILD_VERSION}`. Old caches purged on SW `activate`.
4. **Manifest**: `name`, `short_name`, `start_url=/`, `scope=/`, `display=standalone`, `theme_color=#7c4dff`, icons 192×192 + 512×512 + maskable 512×512. Generate from a single-source SVG via `build.py`.
5. **iOS meta tags** in both templates: `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, `apple-touch-icon` (180×180). Plus `apple-touch-startup-image` variants for iPhone/iPad splash screens.
6. **Escape hatch**: `/sw-reset.html` that unregisters all service workers — the recovery URL if a bad deploy poisons the cache.
7. **Install prompt**: on non-iOS, listen for `beforeinstallprompt` and surface a subtle "Install app" button. On iOS, a one-paragraph "How to install" hint shown only on Safari.

**Deliverable**: installable PWA on every platform, articles readable offline after first visit, automatic update on reconnect.

### Why this two-track plan

- PDFs and PWAs solve different problems: **archival** (PDFs, zero-dependency, forever-readable) vs **interactive reading** (PWA, full JSX live). Shipping PDFs first locks in the "I need this on a plane / on my Kindle / in my Books.app" use case with minimal risk. PWAs are a nice layer on top for power users.
- Both tracks share the same vendor-scripts prerequisite — once that's done, both options are unlocked.
- The plan defers the CDN → vendored scripts migration to step 1 of the short track; everything else builds on it.

---

## Rejected options (with one-line reasons)

- **Electron desktop wrapper** — Tauri gives 15× smaller bundles and ~5× less RAM for identical functionality on this use case.
- **Native iOS app (Capacitor / WKWebView / RN WebView)** — $99/yr Apple tax + App Store Guideline 4.2 rejection risk for "lazy webview wrappers" + 90-day TestFlight rebuild cadence; PWA captures 95% of the value at zero cost.
- **AltStore / sideloading** — 7-day resign cadence outside the EU (UK is not EU post-Brexit); operationally painful for a daily-use reader.
- **Read-later apps (Pocket, Instapaper, Readwise Reader, GoodLinks, Matter, Omnivore)** — all use Mozilla-Readability-style DOM extractors on source HTML; our article body only exists after Babel + React execute, so these save an empty `<div id="root">`. Pocket shut down 8 July 2025.
- **Safari Reading List** — Reader heuristic needs ≥700 chars of semantic `<p>` in source HTML; our articles serve an empty `<div id="root">` so Reader button doesn't activate. Reading List saves the broken snapshot.
- **Safari Reader Mode** — same heuristic; Reader never activates on these pages.
- **Browser "Save Page As"** — saved file opens from `file://` and tries to re-fetch `https://unpkg.com/...` which is blocked by CORS on local-origin; page renders blank. Was broken for this stack before cache partitioning too (in-browser Babel needs a live fetch).
- **Shortcuts.app "Get Contents of URL" → Save to Files** — captures raw HTML only, not dependencies; reopened file still tries the network.
- **AppCache / manifest.appcache** — deprecated and removed from all modern browsers; service workers superseded it.
- **`wkhtmltopdf`** — unmaintained, WebKit-era, no modern JS/flexbox/grid; would render an empty page against this stack.
- **Omnivore (self-hosted)** — project shut down November 2024 after ElevenLabs acquihire; forks unmaintained.

---

## Open questions for the user

These should be answered before implementation starts — they change the scope:

1. ~~Android in scope?~~ **→ Answered 2026-04-22: NO.** Simplifies: skip maskable-icon Android variants, don't bother with `beforeinstallprompt` UI, focus iOS + macOS + Windows/Linux desktop. PWA manifest still written for completeness but no Android-specific polish.
2. ~~Offline search within the library?~~ **→ Answered 2026-04-22: YES.** Adds a build-time step that produces a `search-index.json` (lunr.js pre-built index over article text — reuse the markdown the existing `jsx_to_markdown.py` already generates, since it has the prose without JSX noise). PWA caches the index; a small client-side search box on the index page queries it offline. ~100–300 KB index for 60+ articles.
3. ~~Pre-transpile JSX to drop Babel Standalone?~~ **→ Recommended: YES.** Reasons: the PWA-cache budget is tight (2.7 MB Babel = 20% of the 15 MB iOS cache), load time improves ~100 ms per article, the CI already runs `build.py` in GitHub Actions so adding `esbuild` is cheap. The `CLAUDE.md` "no build step on push" property is already violated by `build.py` itself — adding an `esbuild` subprocess doesn't change the author workflow (skill invocation still produces a `.jsx`; `build.py` transpiles during its usual pass). Decision owner: you. Flag in the checklist if rejected.
4. ~~Eager vs runtime cache~~ **→ Answered 2026-04-22: EAGER pre-cache of every article HTML, but HTML only in the PWA** (no PDFs in the service-worker cache). On install, the SW `addAll()`s the full manifest of `articles/*.html` + shared vendor bundle. 60+ articles × ~100 KB + 3.5 MB vendor ≈ **10–15 MB** — very comfortable on iOS's ~50 MB cap, leaves headroom for hundreds more articles. PDFs are distributed via the separate ZIP download (Phase 5) instead, keeping the PWA slim and the archival artifact decoupled.
5. ~~Plane-trip cold reads~~ **→ Answered 2026-04-22: YES, required.** Satisfied by two independent paths: (a) the eager HTML pre-cache in the PWA (any article readable offline interactively), (b) the whole-library PDF ZIP (Phase 5, no PWA required, works even if service-worker cache has been evicted).
6. ~~Commit PDFs or build-artifact?~~ **→ Recommended: COMMIT them.** Reasons: repo is already ~7 MB of articles, +15–30 MB is fine for a personal library; HF serves static files directly (no CI pipeline latency on deploy); Playwright install in GitHub Actions adds ~150 MB and ~30 s per push; committing decouples "can I rebuild?" from "is HF serving correctly?". Main cost: every new article produces a ~300 KB PDF diff in git. Acceptable. Decision owner: you. Flag in checklist if rejected.
7. ~~Apple Developer Program ($99/yr)?~~ **→ Answered 2026-04-22: NO.** Locks out TestFlight, native iOS apps, macOS Developer ID notarisation. Consequences:
   - Tauri/Electron desktop: unsigned only — Gatekeeper on macOS will show the "app from an unidentified developer" warning until the user right-clicks → Open (acceptable for personal use on your own machine).
   - No native iOS app path — **PWA is the only iOS offline-interactive route**. Confirms the plan.
   - Homebrew Cask distribution is off the table (requires notarisation); direct DMG download from GitHub Releases only.
8. ~~Streamlit reader offline?~~ **→ Answered 2026-04-22: YES (probably).** Architectural implication worth flagging: **the Streamlit app cannot be made offline** — it's a WebSocket-driven Python server. Two honest options:
   - **(a) Ship a static-rendered markdown reader inside the PWA.** The `jsx_to_markdown.py` output (at `library/articles/*.md`) already exists. Add a second build pass that wraps each markdown file in a minimal styled HTML shell (no React, no Babel — just a `<main>` with markdown-to-HTML via a tiny stdlib pass or pre-rendered via `markdown` lib). These offline-ready HTMLs live at `library-articles/md/{slug}.html` (say), get cached by the same PWA service worker, and show up as an alternate "Plain Text Reader" view on the index. ~30–80 KB per article, far smaller than the JSX versions. **Recommended.**
   - **(b) Keep Streamlit online-only, ship a markdown ZIP.** Add a "Download markdown bundle" button to the Streamlit reader that serves `library/articles/*.md` as a ZIP (~500 KB). Users read offline in Obsidian, iA Writer, or any text editor. No UI, just content. Simpler than (a) but loses web-viewable offline reading. Could coexist with (a) — do both.

   Recommendation: **(a) + (b)**, sequenced — (b) is 30 minutes of work (add one Streamlit route), (a) is a meaningful extension of the PWA track (~half a day). Flag in the checklist.

---

## Next step

Review this report, answer questions 1–8, and if the two-track plan is accepted, proceed to the implementation checklist at `docs/offline-reading-implementation-checklist.md`.

---

## Answer summary (resolved 2026-04-22)

| Q | Question | Answer | Effect |
|---|---|---|---|
| 1 | Android in scope? | **No** | Skip Android-specific polish |
| 2 | Offline search? | **Yes** | Add `search-index.json` build pass + client-side search box |
| 3 | Pre-transpile JSX (drop Babel Standalone)? | **Recommended yes, TBD** | Frees 2.7 MB in PWA cache, 100 ms faster loads |
| 4 | Eager vs runtime cache? | **Eager HTML only** | 10–15 MB PWA cache |
| 5 | Plane-trip cold reads? | **Yes** | Eager PWA pre-cache + PDF ZIP |
| 6 | Commit PDFs? | **Recommended yes, TBD** | +15–30 MB repo, simpler deploy |
| 7 | Apple Developer Program? | **No** | PWA is the only iOS interactive-offline route |
| 8 | Streamlit offline? | **Yes (markdown reader + ZIP)** | Add static markdown-HTML build pass to PWA + Streamlit markdown-bundle download |

With these decisions, the implementation checklist needs three extensions — see the updated `docs/offline-reading-implementation-checklist.md`.
