// self.addEventListener('install', function (event) {
//     console.log('[Service Worker] Installing...')
//     event.waitUntil(
//         caches.open('sw-cache').then(function (cache) {
//             return cache.addAll(['/']);
//         })
//     );
// });

const KEY = "key";

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(KEY)
                .then( (cache) => {
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

self.addEventListener('activate', function (event) {
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