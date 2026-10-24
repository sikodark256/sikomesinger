/* ============================================================
   SERVICE WORKER — SIKOCHAT v19 · EDICIÓN PROFESIONAL ESTILO WHATSAPP
   + diseño limpio y minimalista, sin neón
   + toda la funcionalidad: chat grupal+privado, pizarrita, reacciones,
     reenviar, borrar, favoritos, radio, PWA, temas
   Subí este número (v20, v21…) cada vez que cambies el index.html
   ============================================================ */
var CACHE = 'sikochat-v22';
var ARCHIVOS = [
  './', './index.html', './manifest.json',
  './icon-192.png', './icon-512.png', './favicon.png', './apple-touch-icon.png',
  './icon-maskable-192.png', './icon-maskable-512.png',
  './logo-blanco.png', './logo-negro.png', './logo-cara.png',
  './gifs/hola.gif', './gifs/jajaja.gif', './gifs/corazon.gif', './gifs/musica.gif',
  './gifs/vinilo.gif', './gifs/vamos.gif', './gifs/gol.gif', './gifs/estrellas.gif'
];
self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return c.addAll(ARCHIVOS).catch(function(){
        return Promise.all(ARCHIVOS.map(function(u){ return c.add(u).catch(function(){}); }));
      });
    })
  );
});
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var data = e.notification.data || {};
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(lista){
      for (var i = 0; i < lista.length; i++) {
        var c = lista[i];
        if ('focus' in c) {
          c.focus();
          if (data && data.de) c.postMessage({ tipo: 'notiPriv', de: data.de });
          return;
        }
      }
      return self.clients.openPage('./');
    })
  );
});
self.addEventListener('fetch', function(e){
  var url = e.request.url;
  if (e.request.method !== 'GET') return;
  if (url.indexOf('googleapis.com') !== -1 || url.indexOf('gstatic.com') !== -1 || url.indexOf('firebaseio.com') !== -1) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function(r){
        var cl = r.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, cl); });
        return r;
      }).catch(function(){
        return caches.match(e.request).then(function(x){ return x || caches.match('./index.html'); });
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(x){
      if (x) {
        fetch(e.request).then(function(r){
          if (r && r.ok && url.indexOf(self.location.origin) === 0) {
            var cl = r.clone();
            caches.open(CACHE).then(function(c){ c.put(e.request, cl); });
          }
        }).catch(function(){});
        return x;
      }
      return fetch(e.request).then(function(r){
        if (r && r.ok && url.indexOf(self.location.origin) === 0) {
          var cl2 = r.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, cl2); });
        }
        return r;
      });
    })
  );
});
