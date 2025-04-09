const CACHE_NAME = 'notes-pwa-v1';
const ASSETS_TO_CACHE = [
  '/notes-pwa/',
  '/notes-pwa/index.html',
  '/notes-pwa/styles.css',
  '/notes-pwa/app.js',
  '/notes-pwa/manifest.json',
  '/notes-pwa/icons/icon-72x72.png',
  '/notes-pwa/icons/icon-96x96.png',
  '/notes-pwa/icons/icon-128x128.png',
  '/notes-pwa/icons/icon-144x144.png',
  '/notes-pwa/icons/icon-152x152.png',
  '/notes-pwa/icons/icon-192x192.png',
  '/notes-pwa/icons/icon-384x384.png',
  '/notes-pwa/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});