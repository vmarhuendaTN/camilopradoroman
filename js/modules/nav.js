// Menú principal en móvil: el botón abre y cierra la lista de enlaces.
// Sin JavaScript el menú se ve siempre abierto (la clase .js-nav activa el modo desplegable).

export function initNav(root = document) {
  const header = root.querySelector('.header');
  const toggle = header?.querySelector('.header__toggle');
  if (!header || !toggle) return;

  document.documentElement.classList.add('js-nav');

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));

  // Cierra al elegir un enlace, al pulsar Escape o al pasar a pantalla ancha
  header.querySelectorAll('.header__nav a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
