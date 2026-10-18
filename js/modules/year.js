// Escribe el año actual en los elementos con data-year (aviso de copyright del pie).
export function initYear(root = document) {
  const year = String(new Date().getFullYear());
  root.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}
