const CACHE_NAME = "Nextap-app-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/vite.svg",
  "/manifest.json",
  // Add more assets to cache if needed
];

// Install event - Cache app shell
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app shell and assets");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event - Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - Serve cached content or fallback to network
self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("[Service Worker] Serving from cache:", event.request.url);
        return response;
      }
      console.log("[Service Worker] Fetching from network:", event.request.url);
      return fetch(event.request);
    })
  );
});
