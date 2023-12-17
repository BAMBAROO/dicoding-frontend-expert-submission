/* eslint-disable no-restricted-globals */
import CONFIG from '../globals/config';
import cacheHelper from './utils/cache-helper';

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim().then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ action: 'reload' });
        });
      });
    }),
  );
  event.waitUntil(cacheHelper.deleteCache(CONFIG.CACHE_NAME));
});

self.addEventListener('fetch', async (event) => {
  if (event.request.url.split('/')[3] === 'detail') {
    if (!navigator.onLine) {
      event.respondWith(
        caches.match(event.request).then(async (response) => {
          if (response) {
            return response;
          }
          return fetch(event?.request?.url);
        }),
      );
    } else {
      caches.match(event.request).then(async (response) => {
        if (response) {
          caches.open(CONFIG.CACHE_NAME).then((cache) => {
            cache.delete(event.request).catch((error) => {
              console.error('Error saat menghapus respons dari cache:', error);
            });
          });
        }
        const cache = await caches.open(CONFIG.CACHE_NAME);
        await cache.add(event?.request?.url);
        return fetch(event?.request?.url);
      });
    }
    return;
  }
  if (event.request.method !== 'POST') {
    event.respondWith(
      caches.match(event.request).then(async (response) => {
        if (response) {
          return response;
        }
        const cache = await caches.open(CONFIG.CACHE_NAME);
        await cache.add(event?.request?.url);
        return fetch(event?.request?.url);
      }),
    );
  }
});
