/* El Bombón Dorado · service worker
   Guarda la app en el teléfono para que abra sin señal. Los datos siguen
   yendo a Apps Script (esas llamadas no se guardan aquí). */
var VERSION = '2026-09-22.1';
var CACHE = 'ebd-' + VERSION;
var ARCHIVOS = ['./', './index.html', './config.js', './manifest.webmanifest', './icono-192.png', './icono-512.png'];

self.addEventListener('install', function (ev) {
  self.skipWaiting();
  ev.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARCHIVOS); }));
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(caches.keys().then(function (claves) {
    return Promise.all(claves.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (ev) {
  var url = new URL(ev.request.url);
  // Solo lo propio de la app y solo lecturas. Apps Script, mapas, etc. pasan directo.
  if (ev.request.method !== 'GET' || url.origin !== self.location.origin) return;
  ev.respondWith(
    caches.match(ev.request, { ignoreSearch: true }).then(function (guardado) {
      var red = fetch(ev.request).then(function (resp) {
        if (resp && resp.ok) caches.open(CACHE).then(function (c) { c.put(ev.request, resp.clone()); });
        return resp;
      }).catch(function () { return guardado; });
      // Primero lo guardado (abre al instante y sin señal); se refresca por detrás.
      return guardado || red;
    })
  );
});
