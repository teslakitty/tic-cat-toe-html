const cacheName = 'tic-tac-toe-v1';
const assets = [
    './',
    './index.html',
    './style.css',
    './script.js'
];

// Install event - caching assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('Caching assets');
            return cache.addAll(assets);
        })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(
                keys.map(key => {
                    if (key !== cacheName) {
                        console.log('Removing old cache', key);
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

// Fetch event - serving cached content
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});