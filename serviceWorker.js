// install
self.addEventListener("install", (evt) => {
  console.log("Service workers has been installed");
});

// activate event
self.addEventListener("activate", (evt) => {
  console.log(`Service worker has been activated.`);
});

self.addEventListener("fetch", (evt) => {
  console.log(`fetch event`, evt);
});
