/* SRJ offline app-shell + Supabase SDK cache. Authenticated API/data responses are never cached here. */
const CACHE_NAME = 'srj-gold-ledger-shell-v3';
const SDK_CACHE = 'srj-supabase-sdk-v1';
const APP_SHELL = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./lakshmi-logo.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('srj-gold-ledger-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Cache only the public Supabase JavaScript SDK so the app shell can start offline after first online use.
  if (url.hostname === 'cdn.jsdelivr.net' && url.pathname.includes('/@supabase/supabase-js@')) {
    event.respondWith(caches.open(SDK_CACHE).then(async cache => {
      try { const response = await fetch(request); if (response && (response.ok || response.type === 'opaque')) await cache.put(request, response.clone()); return response; }
      catch (error) { const cached = await cache.match(request); if (cached) return cached; throw error; }
    }));
    return;
  }
  if (url.origin !== self.location.origin) return; // Never cache authenticated Supabase API or storage responses.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => { if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put('./index.html', response.clone())); return response; }).catch(async () => (await caches.match('./index.html')) || Response.error()));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => { if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone())); return response; })));
});
