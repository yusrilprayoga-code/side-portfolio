// Service Worker for offline support
const CACHE_NAME = "portfolio-v1";
const OFFLINE_URL = "/_offline";

// Assets to cache immediately
const PRECACHE_ASSETS = [
  "/",
  OFFLINE_URL,
  "/manifest.json",
  "/images/profil.jpg",
  "/images/about.webp",
];

// Install event - cache assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Precaching assets");
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip Chrome extensions
  if (event.request.url.includes("chrome-extension")) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        // Try network first for API calls
        if (event.request.url.includes("/api/")) {
          return await fetch(event.request);
        }

        // Try cache first for other resources
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          console.log(
            "[Service Worker] Serving from cache:",
            event.request.url
          );
          return cachedResponse;
        }

        // Try network
        const networkResponse = await fetch(event.request);

        // Cache successful GET requests
        if (event.request.method === "GET" && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }

        return networkResponse;
      } catch (error) {
        console.log(
          "[Service Worker] Fetch failed, serving offline page:",
          error
        );

        // Return offline page for navigation requests
        if (event.request.mode === "navigate") {
          const cache = await caches.open(CACHE_NAME);
          const offlineResponse = await cache.match(OFFLINE_URL);
          if (offlineResponse) {
            return offlineResponse;
          }
        }

        // For other requests, return a basic response
        return new Response("Offline - No cached version available", {
          status: 503,
          statusText: "Service Unavailable",
          headers: new Headers({
            "Content-Type": "text/plain",
          }),
        });
      }
    })()
  );
});

// Message event - for communication with the app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
