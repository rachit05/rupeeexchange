self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing...')
    event.waitUntil(
        caches.open('sw-cache').then(function (cache) {
            return cache.addAll(['/index.html', '/style.css', '/main.js', '/list.json', '/manifest.json', '/Favicon/']);
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