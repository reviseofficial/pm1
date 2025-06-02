const cacheName = "DefaultCompany-ProjetM1EB9-1.0";
const contentToCache = [
    "Build/WebGL Site25.loader.js",
    "Build/WebGL Site25.framework.js",
    //"Build/WebGL Site25.data",
    "https://drive.usercontent.google.com/u/0/uc?id=1QL1Hk5dBc1yg4O-jtTOfYEgCVxoJuJZ6&export=download",
    "Build/WebGL Site25.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
