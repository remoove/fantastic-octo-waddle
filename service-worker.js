importScripts("/precache-manifest.4e0e0cceaa93784a5e19bac79ecabf20.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if (workbox) {
	// console.log(`Workbox is loaded`);
	workbox.precaching.precacheAndRoute(self.__precacheManifest);

	// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
	workbox.routing.registerRoute(
		({url}) => url.origin === 'https://fonts.googleapis.com',
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'google-fonts-stylesheets',
		})
	);

	self.addEventListener('message', (event) => {
		if (event.data && event.data.type === 'SKIP_WAITING') {
			self.skipWaiting()
		}
	})

	self.addEventListener('push', function(event) {
		const payload = event.data ? event.data.json() : {};

		event.waitUntil(
			self.registration.showNotification(payload.title || 'Notification', {
				lang: payload.lang || 'ru',
				body: payload.body || 'message',
				tag: payload.tag || String(Math.random()),
				icon: payload.icon || '/img/icons/android-chrome-192x192.png',
				data: {
					url: payload.url || undefined,
				}
			})
		);
	});

	self.addEventListener('notificationclick', function(event) {
		event.notification.close();
		event.waitUntil(
			clients.openWindow(event.notification.data.url)
		);
	})
} else {
	console.log(`Workbox didn't load`);
}

