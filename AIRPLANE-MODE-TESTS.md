# Airplane-Mode Verification Tests

End-to-end offline-reading verification for the library-articles static site. Run these after a new deploy or when validating the PWA / PDF / ZIP pipeline. Each test has a clear pass/fail criterion.

**Base URL**: `https://helwyr55-library-articles.static.hf.space/`
**Recovery URL**: `https://helwyr55-library-articles.static.hf.space/sw-reset.html` (use this if the PWA gets stuck in a bad state)

---

## 0. Pre-test setup

Do this once, before any device test, so results are clean:

1. Confirm the live site is up: `curl -sI https://helwyr55-library-articles.static.hf.space/ | head -1` → `HTTP/2 200`.
2. Confirm the service worker is live: `curl -sI https://helwyr55-library-articles.static.hf.space/sw.js | head -1` → `HTTP/2 200`.
3. Confirm the current `BUILD_VERSION`: `curl -s https://helwyr55-library-articles.static.hf.space/sw.js | grep -o 'BUILD_VERSION = "[^"]*"'`. Record the value — every device's cache should name itself `library-articles-shell-v{BUILD_VERSION}` after a successful install.

---

## 1. Desktop browser — PWA install + offline reading

### 1a. Chrome / Edge (macOS, Windows, Linux)

1. Open `https://helwyr55-library-articles.static.hf.space/` in a fresh Chrome/Edge profile (or Incognito, but install won't persist).
2. Wait for the page to fully render.
3. DevTools → **Application** → **Service Workers**: confirm `/sw.js` is **activated and running** with scope `/`.
4. DevTools → **Application** → **Cache Storage**: confirm `library-articles-shell-v{BUILD_VERSION}` exists with ~72 entries (HTMLs, md pages, vendor scripts, fonts, icons, search JSON). **Confirm no `.pdf` entries** — PDFs are deliberately excluded.
5. Click the **install icon** in the address bar (or ⋮ → "Install Data Science Library Articles"). The app launches in its own window.
6. **Go offline**: DevTools → Network → throttle to **Offline**. OR physically disable Wi-Fi/Ethernet.
7. Reload the index page. Expect it to render completely, with all article cards and the filter/sort/search UI.
8. Click into any article you have visited — expect it to render, including Recharts charts.
9. **Cold-read test (the plane-trip case)**: navigate directly to an article URL you have NEVER opened before, e.g. `/articles/probabilistic-forecasting-guide.html`. Expect full render — the eager pre-cache should have it. **This is the key test.**
10. Click **📄 Plain reader** on any article — expect the plain-HTML reader view to load offline.
11. Type in the **search box** (e.g. "kirk" or "bayesian") — expect content search results to appear even offline.
12. Try downloading a PDF while offline: click **📑 PDF** on any article. Expect a browser error ("unable to connect") — this is the expected, deliberate behaviour (PDFs are not pre-cached).

**Pass criteria**: steps 3–11 all succeed. Step 12 fails as expected.
**If a step fails**: open `/sw-reset.html` in a new tab, wait for the "Cleared" message, close the PWA window, revisit the site, re-install, retry.

### 1b. Firefox (desktop)

Firefox does not install PWAs as standalone desktop apps, but the service worker still caches everything in the tab:

1. Open the site in Firefox.
2. DevTools → **Application** → **Service Workers** — confirm registered.
3. Go offline (DevTools Network panel → Offline dropdown, or disable network at OS level).
4. Reload, navigate to cold articles, type search. Same pass criteria as 1a.

### 1c. Safari (macOS 14+)

1. Open the site in Safari.
2. File → **Add to Dock** (macOS Sonoma+) — confirm a standalone window launches.
3. Enable airplane mode or disable Wi-Fi.
4. Run the same tests as 1a steps 7–11.

**Pass criteria**: steps 3–4 succeed. Note: Safari's Intelligent Tracking Prevention may purge the cache after 7 days of non-use — re-open online at least once per week to keep it warm.

---

## 2. iPhone / iPad — PWA install + offline reading

**This is the primary target.** Run it on a device that has never visited the site before, so the cache is clean.

### 2a. Install the PWA

1. On the iPhone/iPad, open **Safari** (not Chrome, not any other browser — PWA install is Safari-only on iOS).
2. Visit `https://helwyr55-library-articles.static.hf.space/`.
3. Let the page fully render (you should see the article grid).
4. Tap the **Share** button (box-with-arrow icon in the toolbar).
5. Scroll down the share sheet → tap **Add to Home Screen**.
6. iOS 26+: the "Open as Web App" toggle should be **on** by default. Leave it on.
7. Confirm the name ("DS Articles" or similar) and tap **Add**.
8. Exit Safari. On the Home Screen, confirm the purple book icon appeared.

### 2b. Prime the cache

9. Tap the home-screen icon — the PWA launches in its own standalone window (no Safari chrome visible).
10. Wait at least 15 seconds for the service worker to finish the initial pre-cache (~10 MB). You can monitor progress informally by scrolling through the index — if it feels snappy, the cache is warm.
11. Tap any one article to confirm it renders. Tap back to the index.

### 2c. Airplane-mode tests

12. **Enable Airplane Mode** via Control Centre (or Settings → Airplane Mode → on). Confirm the status bar shows ✈.
13. **Kill the PWA** (swipe up, flick it away from the app switcher). Re-tap the home-screen icon.
14. The index should load **from the service worker cache** — fully rendered, all filters/sort/search present.
15. **Cold-read test**: tap an article you know you have NEVER opened before. It should render fully, including Recharts charts. *This is the plane-trip requirement.*
16. Tap **📄 Plain reader** on any article — the plain-HTML version should load.
17. Tap the **search box** on the index, type "kirk" or "bayesian". Content search should work offline (first keystroke fetches `search-index.json` from the cache — subsequent keystrokes are instant).
18. Try tapping **📑 PDF** — expect a failure message ("can't connect"). This is intentional.

### 2d. Leave airplane mode, confirm no regressions

19. Disable Airplane Mode.
20. Pull-to-refresh the index. Confirm nothing looks different — the SW's stale-while-revalidate keeps serving cached content and updates in the background.

### 2e. Day-7 eviction check (optional)

iOS's Intelligent Tracking Prevention may evict script-writable storage after ~7 days of non-use. To verify this doesn't happen in practice:

21. After ~7 days of NOT opening the PWA and NOT visiting the site in Safari, repeat steps 12–15.
22. If it still renders offline: ITP is not biting you — great.
23. If it doesn't: you'll need to re-visit the site online once to re-warm the cache. Log this as a known iOS limitation (we can't fix it from the webapp side).

**Pass criteria**: steps 14–17 all succeed. Step 18 fails as expected.

---

## 3. PDF offline reading (iOS Files.app)

PDFs are the belt-and-braces offline path. Independent of the PWA.

### 3a. Per-article PDF

1. **While online**: on the iPhone, visit any article at `https://helwyr55-library-articles.static.hf.space/articles/{slug}.html`.
2. Tap **📑 PDF** in the article header. Safari downloads the PDF; a download icon appears in the toolbar.
3. Tap the download icon → tap the PDF → tap **Share** → **Save to Files** → choose a folder (iCloud Drive or On My iPhone), tap **Save**.
4. Open the **Files** app. Navigate to where you saved it.
5. **Enable Airplane Mode.**
6. Tap the PDF. Expect it to open in the iOS PDF viewer.
7. Scroll through — confirm all Sec sections render, Recharts charts are vector (pinch-to-zoom stays crisp), fonts render correctly.
8. Try markup (pencil icon) — expect it works.

**Pass criteria**: steps 6–8 succeed.

### 3b. Whole-library ZIP

1. **While online**: on the iPhone, open `https://helwyr55-library-articles.static.hf.space/`.
2. Tap the **📦 Download all PDFs (16 MB)** button on the index page. Safari downloads the ZIP.
3. Download icon → tap the ZIP → iOS Files.app prompts to unzip.
4. Confirm a new folder `library-articles-offline/` appears with `articles/*.pdf` inside it.
5. **Enable Airplane Mode.**
6. Open any PDF from the unzipped folder. Expect full offline render.

**Pass criteria**: step 6 succeeds.

---

## 4. Desktop PDF offline (macOS Preview / Windows reader)

1. **While online**: visit `https://helwyr55-library-articles.static.hf.space/articles/virtual-barrels.pdf` (or use the 📑 PDF link on any article).
2. Save the file to your Desktop.
3. Disconnect Wi-Fi/Ethernet.
4. Double-click the PDF — opens in Preview (macOS), Adobe Reader / Edge (Windows), or Evince (Linux).
5. Scroll through — confirm vector charts, correct fonts, selectable text.
6. Cmd-F / Ctrl-F → search for a term like "Kirk" → expect text to be findable.

**Pass criteria**: steps 4–6 succeed.

---

## 5. Escape hatch — `/sw-reset.html`

If a device gets stuck in a bad cache state (broken deploy, stale SW, quota exhaustion):

1. Open `https://helwyr55-library-articles.static.hf.space/sw-reset.html`.
2. The page clears the service worker registration and all caches for this origin.
3. Expect "Cleared. Reload and it will re-register fresh." message.
4. Close the tab / PWA window.
5. Reopen the site — the SW re-registers with the current `BUILD_VERSION`.

**Pass criteria**: step 3 message appears. Subsequent visits work normally.

---

## 6. CI auto-deploy (after HF_TOKEN refresh)

Validates that pushes to `main` actually land on the HF Space without manual `git push hf main`:

1. Make a trivial change (e.g. edit this file, fix a typo).
2. Commit to `main` in `m-deane/library-articles`.
3. Push to GitHub only (`git push github main`).
4. Wait ~90 s, then: `gh run list --repo m-deane/library-articles --limit 1` — expect the newest run to show `completed success`.
5. `curl -sI https://helwyr55-library-articles.static.hf.space/` — should still return 200, with the new content reflected within another ~60 s.

**Pass criteria**: CI run green; HF Space reflects the change.

---

## Reporting results

When you finish a run, record:
- Date of test
- Device (e.g. iPhone 15 Pro, iOS 18.4 / iPadOS 18.3 / macOS Sonoma 14.5 / Chrome 130)
- Which sections passed / failed
- Any surprises (e.g. font fallbacks, SW registration errors, PDF rendering glitches)

Paste the summary into a new commit note or a comment on the most recent deploy's GitHub run.

## What counts as "done"

Offline reading is considered fully verified when:
- 2c steps 14–17 pass on iPhone/iPad.
- 3a step 6 passes (PDF offline via Files.app).
- 1a steps 9 + 11 pass on Chrome/Edge desktop.

The 7-day eviction test (2e) is optional — document the outcome whenever you remember, but don't block a release on it.
