const staticCacheName = "site-static-v1";
const dynamicCache = "site-dynamic-v1";
const assets = [
  "/",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css",
  "https://code.jquery.com/jquery-3.2.1.slim.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
  "/js/snackbar.js",
  "/api/auth/session",
  "/manifest.webmanifest",
  "/icon-192x192.png",
  "/icon-256x256.png",
  "/icon-384x384.png",
  "/icon-512x512.png",
  // "/api/tasks/",
  "/tasks",
];

// install
self.addEventListener("install", (evt) => {
  // console.log("Service workers has been installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  // console.log(`Service worker has been activated.`);
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key != staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  // console.log(`fetch event`, evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});
