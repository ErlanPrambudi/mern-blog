const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/main.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache telah dibuka');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // Memastikan service worker baru langsung aktif
            .catch(error => console.error('Pemasangan cache gagal:', error))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Mengembalikan respons dari cache
                }
                return fetch(event.request) // Mengambil dari jaringan jika tidak ada di cache
                    .catch(error => {
                        console.error('Pengambilan gagal:', error);
                        throw error;
                    });
            })
            .catch(error => {
                console.error('Pencocokan cache gagal:', error);
                throw error;
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Menghapus cache yang sudah usang
                    }
                })
            );
        })
            .then(() => self.clients.claim()) // Mengklaim kontrol pada semua klien agar service worker baru langsung aktif
            .catch(error => console.error('Aktivasi cache gagal:', error))
    );
});
