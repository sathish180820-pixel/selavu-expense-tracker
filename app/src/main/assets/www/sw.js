/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "9100e62dd12c28c716fce883289da37b"
  }, {
    "url": "pwa-512x512.png",
    "revision": "9100e62dd12c28c716fce883289da37b"
  }, {
    "url": "pwa-192x192.png",
    "revision": "f23f9256e8a1505eb8bb3a4e68b39e64"
  }, {
    "url": "index.html",
    "revision": "dfea3dc67a70cb0038ad74da8c049068"
  }, {
    "url": "icon.svg",
    "revision": "e712a5e4c0e482ed320d70af42853756"
  }, {
    "url": "favicon.png",
    "revision": "f23f9256e8a1505eb8bb3a4e68b39e64"
  }, {
    "url": "favicon.ico",
    "revision": "f23f9256e8a1505eb8bb3a4e68b39e64"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "3742de461c0e072714861b0d30e6618a"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/index-DzgJWD_D.css",
    "revision": null
  }, {
    "url": "assets/index-BNZiUNi8.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "3742de461c0e072714861b0d30e6618a"
  }, {
    "url": "icon.svg",
    "revision": "e712a5e4c0e482ed320d70af42853756"
  }, {
    "url": "pwa-192x192.png",
    "revision": "f23f9256e8a1505eb8bb3a4e68b39e64"
  }, {
    "url": "pwa-512x512.png",
    "revision": "9100e62dd12c28c716fce883289da37b"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "9100e62dd12c28c716fce883289da37b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "23674515499f4a982a4a20476f023b58"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
