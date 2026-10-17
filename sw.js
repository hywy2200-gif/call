var C = 'call-v4';
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(C).then(function (c) { return c.addAll(['./index.html', './manifest.json']); }));
  self.skipWaiting();
});
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') { return; }
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request); }));
});
