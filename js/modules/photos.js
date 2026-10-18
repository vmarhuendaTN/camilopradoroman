// Si una foto con data-placeholder aún no existe, la sustituye por un recuadro con instrucciones.
// Así la web se puede publicar antes de tener las fotos definitivas.

function toPlaceholder(img) {
  const box = document.createElement('div');
  box.className = `${img.className} photo--empty`;
  box.setAttribute('role', 'img');
  box.setAttribute('aria-label', img.alt);

  const label = document.createElement('span');
  label.textContent = `[FOTO: ${img.dataset.placeholder || img.alt}]`;
  const hint = document.createElement('small');
  hint.textContent = `Sube el archivo a ${img.getAttribute('src')}`;

  box.append(label, hint);
  img.replaceWith(box);
}

export function initPhotos(root = document) {
  root.querySelectorAll('img[data-placeholder]').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) {
      toPlaceholder(img);
    } else {
      img.addEventListener('error', () => toPlaceholder(img), { once: true });
    }
  });
}
