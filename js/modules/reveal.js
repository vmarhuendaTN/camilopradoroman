// Aparición suave de bloques al entrar en pantalla: <div data-reveal>.
// Los hijos de un [data-reveal-stagger] aparecen en cascada.
// Si el navegador no tiene IntersectionObserver o se prefiere menos movimiento, todo se ve sin animar.

const STAGGER_STEP = 0.08; // segundos entre elementos de una cascada

export function initReveal(root = document) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  root.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      child.style.setProperty('--reveal-delay', `${i * STAGGER_STEP}s`);
    });
  });

  const items = root.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  document.documentElement.classList.add('js-reveal');
  items.forEach((item) => observer.observe(item));
}
