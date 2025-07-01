// background.js
// Necessário para o service worker do manifest v3

chrome.runtime.onInstalled.addListener(() => {
  // Inicialização ou lógica futura
});

// Sincroniza ícones customizados com os favoritos
function syncCustomIcons() {
  chrome.bookmarks.getTree(function(tree) {
    const allIds = [];
    function collectIds(node) {
      allIds.push(node.id);
      if (node.children) node.children.forEach(collectIds);
    }
    tree.forEach(collectIds);
    chrome.storage.local.get(null, function(items) {
      // Remove ícones de favoritos que não existem mais
      Object.keys(items).forEach(key => {
        if (key.startsWith('icon_')) {
          const id = key.replace('icon_', '');
          if (!allIds.includes(id)) {
            chrome.storage.local.remove(key);
          }
        }
      });
    });
  });
}

// Função para obter o favicon mais provável de um link
function getBestFaviconUrl(url) {
  try {
    const u = new URL(url);
    // Tenta as opções mais comuns
    const candidates = [
      u.origin + '/favicon.ico',
      u.origin + '/favicon.png',
      u.origin + '/favicon.svg',
      u.origin + '/apple-touch-icon.png',
      u.origin + '/apple-touch-icon-precomposed.png',
      u.origin + '/android-chrome-192x192.png',
      u.origin + '/android-chrome-512x512.png',
      u.origin + '/mstile-150x150.png',
      u.origin + '/favicon-32x32.png',
      u.origin + '/favicon-16x16.png'
    ];
    return candidates;
  } catch {
    return [];
  }
}

// Função para buscar o primeiro favicon válido
function fetchFirstValidFavicon(urls, callback) {
  if (!urls.length) return callback('');
  const img = new Image();
  img.onload = function() { callback(this.src); };
  img.onerror = function() { fetchFirstValidFavicon(urls.slice(1), callback); };
  img.src = urls[0];
}

// Ao criar um favorito, salva o favicon mais provável se for um link
chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  if (bookmark.url) {
    const candidates = getBestFaviconUrl(bookmark.url);
    fetchFirstValidFavicon(candidates, function(favicon) {
      if (favicon) {
        chrome.storage.local.set({[`icon_${id}`]: favicon});
      }
    });
  }
  syncCustomIcons();
});

// Atualiza favicons para todos os favoritos de link que ainda não possuem ícone customizado
function updateAllFavicons() {
  chrome.bookmarks.getTree(function(tree) {
    function setFaviconIfMissing(node) {
      if (node.url) {
        chrome.storage.local.get([`icon_${node.id}`], function(result) {
          if (!result[`icon_${node.id}`]) {
            const candidates = getBestFaviconUrl(node.url);
            fetchFirstValidFavicon(candidates, function(favicon) {
              if (favicon) {
                chrome.storage.local.set({[`icon_${node.id}`]: favicon});
              }
            });
          }
        });
      }
      if (node.children) node.children.forEach(setFaviconIfMissing);
    }
    tree.forEach(setFaviconIfMissing);
  });
}

// Executa ao instalar/atualizar a extensão
chrome.runtime.onInstalled.addListener(() => {
  updateAllFavicons();
  // Inicialização ou lógica futura
});

// Escuta eventos de alteração nos favoritos
chrome.bookmarks.onRemoved.addListener(syncCustomIcons);
chrome.bookmarks.onChanged.addListener(syncCustomIcons);
chrome.bookmarks.onMoved.addListener(syncCustomIcons);
chrome.bookmarks.onCreated.addListener(syncCustomIcons);

// Listener para mensagem do popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateFavicons') {
    updateAllFavicons();
  }
});
