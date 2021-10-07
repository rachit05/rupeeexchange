self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing...')
    event.waitUntil(
        caches.open('sw-cache').then(function (cache) {
            return cache.addAll(["index.html", "style.css", "manifest.json", "list.json", "main.js"]);
        })
    );
});

// const KEY = "key";

self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message Recieved')
});

self.addEventListener('activate', function (event) {
    // self.
    console.log('[Service Worker] Activating...');
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            console.log('[Service Worker] Fetched The Data')

            return response || fetch(event.request);
        })
    )
})