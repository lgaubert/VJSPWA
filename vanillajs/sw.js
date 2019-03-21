let CACHE_NAME = 'vanillajs';
let urlsToCache = [
	'index.html',
	'manifest.json',
	'js/app.js',
	'js/controller.js',
	'js/helpers.js',
	'js/model.js',
	'js/store.js',
	'js/template.js',
	'js/view.js',
	'test/ControllerSpec.js',
	'test/SpecRunner.html',
	'node_modules/todomvc-common/base.js',
	'node_modules/todomvc-common/base.css',
	'node_modules/todomvc-app-css/index.css'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			}) 
	);
});



self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(res => {
        return res || fetch(event.request)
      });
    })
  );
});
