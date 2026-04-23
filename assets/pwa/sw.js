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

const BUILD_VERSION = "{{BUILD_VERSION}}";
const CACHE_NAME = "library-articles-shell-v" + BUILD_VERSION;
const PRECACHE_URLS = {{PRECACHE_URLS}};

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
