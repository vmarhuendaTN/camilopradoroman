// Pestañas accesibles: <div data-tabs> con role="tablist", role="tab" y role="tabpanel".
// Teclado: flechas izquierda/derecha, Inicio y Fin. Sin JavaScript se ven todos los paneles.

export function initTabs(root = document) {
  root.querySelectorAll('[data-tabs]').forEach((container) => {
    const list = container.querySelector('[role="tablist"]');
    const tabs = Array.from(container.querySelectorAll('[role="tab"]'));
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
    if (!list || !tabs.length) return;

    list.hidden = false;

    const select = (index, focus = false) => {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        if (panels[i]) panels[i].hidden = !active;
      });
      if (focus) tabs[index].focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (event) => {
        const last = tabs.length - 1;
        const keys = {
          ArrowRight: i === last ? 0 : i + 1,
          ArrowLeft: i === 0 ? last : i - 1,
          Home: 0,
          End: last,
        };
        if (event.key in keys) {
          event.preventDefault();
          select(keys[event.key], true);
        }
      });
    });

    select(0);
  });
}
