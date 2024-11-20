const CACHE_NAME = "v1_cache_PWA";

var urlsToCache = [
    './',
    './styles.css',
    './index.html',
    './imagenes/bell-logo.jpeg',
    './imagenes/foto.jpg',
    './imagenes/gallina(1).jpg',
    './imagenes/gallina(2).jpg',
    './imagenes/gallina(3).jpg',
    './imagenes/gallina(4).jpg',
    './imagenes/gallina(5).jpg',
    './imagenes/gallina(6).jpg',
    './imagenes/gallina(7).jpg',
    './imagenes/gallina(8).jpg',
    './imagenes/gallina(9).jpg',
    './imagenes/gallina(10).jpg',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
                    .catch(err => {
                        console.log('No se ha cargado la cache', err);
                    });
            })
    );
});

self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (!cacheWhiteList.includes(cacheName)) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim();
            })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res;
                }
                return fetch(e.request);
            })
    );
});
