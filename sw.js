// Immunization Dashboard - phone app helper (made by the dashboard script; upload it with index.html every month).
// Keeps a copy of the dashboard on the phone, so it opens without internet, and tells the page when a newer one is uploaded.
const VERSION = 'c1490449cc87';
const CACHE = 'imm-dashboard-' + VERSION;
const FILES = ['./', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE)
        .then(c => Promise.all(FILES.map(f => fetch(new Request(f, { cache: 'reload' })).then(r => {
            if (!r.ok) throw new Error(f + ': ' + r.status);
            return c.put(f, r);
        }))))
        .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys()
        .then(keys => Promise.all(keys.filter(k => k.startsWith('imm-dashboard-') && k !== CACHE).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});
function sameFile(a, b) {
    const ea = a.headers.get('etag'), eb = b.headers.get('etag');
    if (ea && eb) return ea === eb;
    const la = a.headers.get('last-modified'), lb = b.headers.get('last-modified');
    if (la && lb) return la === lb;
    return a.headers.get('content-length') === b.headers.get('content-length');
}
function tellPages() {
    return self.clients.matchAll({ type: 'window' }).then(cs => cs.forEach(c => c.postMessage({ type: 'imm-new-data' })));
}
self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
    if (req.mode === 'navigate') {
        // the dashboard: open the saved copy at once; look for a newer upload in the background
        e.respondWith(caches.open(CACHE).then(c => c.match('./').then(hit => {
            const net = fetch('./', { cache: 'no-cache' }).then(r => {
                if (r && r.ok && !(hit && sameFile(hit, r))) return c.put('./', r.clone()).then(() => (hit ? tellPages() : null)).then(() => r);
                return r;
            }).catch(() => null);
            if (hit) { e.waitUntil(net); return hit; }
            return net.then(r => r || fetch(req));
        })));
        return;
    }
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req)));
});
