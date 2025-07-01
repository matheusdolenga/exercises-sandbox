// Carrega e exibe os favoritos
function renderBookmarks() {
  chrome.bookmarks.getTree(function(tree) {
    const container = document.getElementById('bookmarks');
    container.innerHTML = '';
    function renderNode(node, level = 0) {
      if (node.url || node.children) {
        const div = document.createElement('div');
        div.className = 'bookmark';
        div.style.marginLeft = (level * 16) + 'px';
        // Ícone customizado
        chrome.storage.local.get([`icon_${node.id}`], function(result) {
          let iconUrl = result[`icon_${node.id}`] || (node.children ? 'icons/icon16.png' : '');
          if (iconUrl) {
            const img = document.createElement('img');
            img.src = iconUrl;
            img.className = 'icon-preview';
            div.appendChild(img);
          }
        });
        div.appendChild(document.createTextNode(node.title));
        // Upload de ícone
        const label = document.createElement('label');
        label.className = 'upload';
        label.textContent = ' [Editar ícone]';
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function(e) {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
              chrome.storage.local.set({[`icon_${node.id}`]: evt.target.result}, function() {
                renderBookmarks();
              });
            };
            reader.readAsDataURL(file);
          }
        };
        label.appendChild(input);
        div.appendChild(label);
        container.appendChild(div);
      }
      if (node.children) {
        node.children.forEach(child => renderNode(child, level + 1));
      }
    }
    tree.forEach(node => renderNode(node));
  });
}

// Atualiza favicons dos favoritos toda vez que o popup é aberto
chrome.runtime.sendMessage({ action: 'updateFavicons' });

document.addEventListener('DOMContentLoaded', renderBookmarks);
