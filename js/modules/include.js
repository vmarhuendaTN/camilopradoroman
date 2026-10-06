// Inserta fragmentos HTML compartidos: <div data-include="partials/header.html"></div>
// Así la cabecera y el pie se editan en un solo archivo para todas las páginas.

export async function loadIncludes(root = document) {
  const slots = Array.from(root.querySelectorAll('[data-include]'));
  await Promise.all(
    slots.map(async (slot) => {
      const src = slot.getAttribute('data-include');
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`${res.status} ${src}`);
        slot.outerHTML = await res.text();
      } catch (err) {
        console.error('No se pudo cargar el parcial', src, err);
      }
    })
  );
}
