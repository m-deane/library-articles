/*
 * library-articles service worker (Wave 4 — PWA layer)
 *
 * Authoring source. `build.py` copies this to /sw.js at the Space root and
 * substitutes two build-injected constants in the code below:
 *   - BUILD_VERSION placeholder -> a short git SHA (or epoch-seconds fallback)
 *   - PRECACHE_URLS placeholder -> a JSON array of same-origin URLs
 *
 * Placement: the SW MUST live at the Space root (/sw.js) because Hugging Face
 * static Spaces' custom_headers config does not permit Service-Worker-Allowed,
 * so a sub-path SW cannot claim root scope.
 *
 * Strategy:
 *   - install: skipWaiting + addAll(PRECACHE_URLS). Diff-on-install copies
 *     entries whose URL already exists in an older cache instead of re-fetching
 *     (avoids re-downloading 15 MB per release when only a few URLs changed).
 *   - activate: clients.claim + prune every cache whose name doesn't match
 *     the current BUILD_VERSION.
 *   - fetch:
 *       - cache-first  for /assets/vendor/* and /assets/fonts/*   (immutable)
 *       - SWR          for articles/*.html, md/*.html, /, index.html,
 *                        _manifest.json, assets/styles.css, assets/md-styles.css,
 *                        search-index.json, search-store.json
 *       - network-only for articles/*.pdf and library-articles-offline.zip
 *         (deliberately excluded from the SW cache — Q4 decision; they travel
 *         via direct download / the separate ZIP so the PWA install stays under
 *         iOS's ~50 MB cap)
 *       - network-first-with-cache-fallback for any other same-origin request
 *       - bypass for cross-origin (nothing cross-origin is loaded at runtime,
 *         but be defensive in case someone adds an external script later).
 *   - message: SKIP_WAITING handler for a future "update available" banner.
 *
 * Escape hatch: /sw-reset.html unregisters all SWs + clears all caches — the
 * only recovery path if a bad deploy poisons the cache.
 */

const BUILD_VERSION = "11696d3";
const CACHE_NAME = "library-articles-shell-v" + BUILD_VERSION;
const PRECACHE_URLS = ["/","/index.html","/_manifest.json","/assets/styles.css","/assets/md-styles.css","/assets/fonts/fonts.css","/assets/vendor/react.production.min.js","/assets/vendor/react-dom.production.min.js","/assets/vendor/prop-types.min.js","/assets/vendor/recharts.js","/assets/vendor/lunr.min.js","/assets/fonts/dm-serif-display-bc1e1e.woff2","/assets/fonts/instrument-sans-11aa49.woff2","/assets/fonts/inter-bec94a.woff2","/assets/fonts/jetbrains-mono-b87346.woff2","/assets/fonts/playfair-display-46289f.woff2","/assets/fonts/playfair-display-fdd6c3.woff2","/assets/fonts/source-sans-3-94a3c9.woff2","/assets/fonts/source-serif-4-1be424.woff2","/assets/fonts/source-serif-4-6aeca2.woff2","/assets/icons/apple-touch-icon-180.png","/assets/icons/icon-192.png","/assets/icons/icon-512.png","/manifest.webmanifest","/articles/london-housing-market-2026.html","/articles/virtual-barrels.html","/articles/virtual-barrels-chapter-notes.html","/articles/python-for-algorithmic-trading-cookbook-chapter-notes.html","/articles/forecasting-principles-and-practice-notes.html","/articles/crude-oil-handbook-chapter-notes.html","/articles/bayesian-analysis-with-python-chapter-notes.html","/articles/applied-bayesian-statistics-notes.html","/articles/advances-in-financial-machine-learning-chapter-notes.html","/articles/test-chart-article.html","/articles/forty-classic-crude-oil-trades-chapter-notes.html","/articles/ts-feature-engineering-guide.html","/articles/stochastic-dp-encyclopaedic-article.html","/articles/splitwise-python-article.html","/articles/shapash-timeseries-technical-article.html","/articles/safe-ts-article.html","/articles/rag-2026-definitive-guide.html","/articles/probabilistic-forecasting-guide.html","/articles/pfi-definitive-guide.html","/articles/feature-selection-ts-deep-dive.html","/articles/ebm-definitive-guide.html","/articles/conformal-prediction-guide.html","/articles/catboost-guide.html","/md/index.html","/md/advances-in-financial-machine-learning-chapter-notes.html","/md/applied-bayesian-statistics-notes.html","/md/bayesian-analysis-with-python-chapter-notes.html","/md/catboost-guide.html","/md/conformal-prediction-guide.html","/md/crude-oil-handbook-chapter-notes.html","/md/ebm-definitive-guide.html","/md/feature-selection-ts-deep-dive.html","/md/forecasting-principles-and-practice-notes.html","/md/forty-classic-crude-oil-trades-chapter-notes.html","/md/pfi-definitive-guide.html","/md/probabilistic-forecasting-guide.html","/md/python-for-algorithmic-trading-cookbook-chapter-notes.html","/md/rag-2026-definitive-guide.html","/md/safe-ts-article.html","/md/shapash-timeseries-technical-article.html","/md/splitwise-python-article.html","/md/stochastic-dp-encyclopaedic-article.html","/md/test-chart-article.html","/md/the-monotonic-constraint-trick.html","/md/ts-feature-engineering-guide.html","/md/virtual-barrels-chapter-notes.html","/md/virtual-barrels.html","/search-index.json","/search-store.json"];

// Request-URL predicates. All operate on a same-origin URL object.
function isVendorOrFont(url) {
  return (
    url.pathname.startsWith("/assets/vendor/") ||
    url.pathname.startsWith("/assets/fonts/")
  );
}

function isExcludedBinary(url) {
  // PDFs + the whole-library ZIP are intentionally NOT cached by the SW.
  // See the header comment for the full rationale.
  return (
    (url.pathname.startsWith("/articles/") && url.pathname.endsWith(".pdf")) ||
    url.pathname === "/library-articles-offline.zip"
  );
}

function isSwrTarget(url) {
  const p = url.pathname;
  if (p === "/" || p === "/index.html") return true;
  if (p === "/_manifest.json") return true;
  if (p === "/search-index.json" || p === "/search-store.json") return true;
  if (p === "/assets/styles.css" || p === "/assets/md-styles.css") return true;
  if (p.startsWith("/articles/") && p.endsWith(".html")) return true;
  if (p.startsWith("/md/") && p.endsWith(".html")) return true;
  return false;
}

// ---------------- install ----------------

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const newCache = await caches.open(CACHE_NAME);

      // Diff-on-install: copy entries that already exist in a previous cache
      // into the new one so we don't re-download them. Then fetch whatever is
      // still missing.
      const priorKeys = (await caches.keys()).filter((k) => k !== CACHE_NAME);
      const copied = new Set();
      for (const key of priorKeys) {
        const prior = await caches.open(key);
        for (const url of PRECACHE_URLS) {
          if (copied.has(url)) continue;
          const hit = await prior.match(url);
          if (hit) {
            try {
              // Response bodies are single-use — clone before put.
              await newCache.put(url, hit.clone());
              copied.add(url);
            } catch (e) {
              // Quota / cloning failure — fall through to a network fetch
              // below. Swallow and continue so one bad entry doesn't abort
              // the entire install.
              console.warn("[sw] reuse failed for", url, e);
            }
          }
        }
      }

      const toFetch = PRECACHE_URLS.filter((u) => !copied.has(u));
      if (toFetch.length === 0) return;

      // Fetch one-at-a-time batches to be gentle on HF's static tier.
      // addAll would abort the whole install on any single 404 — we'd rather
      // log a warning and continue.
      await Promise.all(
        toFetch.map(async (url) => {
          try {
            const res = await fetch(url, { cache: "reload" });
            if (!res || !res.ok) {
              console.warn("[sw] precache skip", url, res && res.status);
              return;
            }
            await newCache.put(url, res.clone());
          } catch (e) {
            console.warn("[sw] precache fetch failed", url, e);
          }
        })
      );
    })()
  );
});

// ---------------- activate ----------------

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k.startsWith("library-articles-shell-v"))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// ---------------- fetch ----------------

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch (e) {
    // Offline + not cached — fall through to a basic 504.
    return new Response("Offline and resource is not cached.", {
      status: 504,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);
  return cached || (await fetchPromise) || new Response("Offline.", { status: 504 });
}

async function networkFirstWithCache(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch (e) {
    const cached = await cache.match(request);
    return cached || new Response("Offline.", { status: 504 });
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Only touch same-origin traffic. Cross-origin requests (should be zero at
  // runtime, but be defensive) go straight to the network.
  if (url.origin !== self.location.origin) return;

  if (isExcludedBinary(url)) {
    // PDFs + ZIP — hand straight to the browser (network-only, no caching).
    return;
  }

  if (isVendorOrFont(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (isSwrTarget(url)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Default for same-origin: network-first with cache fallback. Keeps the
  // first-visit experience fresh while preserving offline capability for
  // anything the user has successfully loaded before.
  event.respondWith(networkFirstWithCache(request));
});

// ---------------- messaging ----------------

self.addEventListener("message", (event) => {
  const msg = event.data;
  if (msg && msg.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
