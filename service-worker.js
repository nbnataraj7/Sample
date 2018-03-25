var cacheName = 'puppies-cache-v7';
var filesToCache = [
  './',
  './index.html',
  './w3.css',
  './styles.css',
  './img/pup.png',
  './jquery.min.js'
];

self.addEventListener("install", function(e){
	e.waitUntil(
		caches.open(cacheName).then(function(cache){
			return cache.addAll(filesToCache);
		})
	);	
});


self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Do something interesting with the fetch here
  console.log("Fetching "+e.request.url);
  e.respondWith(
	caches.match(e.request).then(function(response){
		return response || fetch(e.request);
	})
  );
});