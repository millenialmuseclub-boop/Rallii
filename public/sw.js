const CACHE = "rallii-editorial-v1";
const CORE = ["/", "/discover", "/plan", "/stays", "/privacy", "/terms"];
self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE))));
self.addEventListener("activate", (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))));
self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;
  event.respondWith(fetch(event.request).then((response) => { const copy = response.clone(); void caches.open(CACHE).then((cache) => cache.put(event.request, copy)); return response; }).catch(async () => (await caches.match(event.request)) ?? (await caches.match("/"))));
});
