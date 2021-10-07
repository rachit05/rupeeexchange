self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing...')
    event.waitUntil(
        caches.open('sw-cache').then(function (cache) {
            return cache.addAll(['/']);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating...');
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            console.log('[Service Worker Installed Successfully]')

            return response || fetch(event.request);
        })
    )
})