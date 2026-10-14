// Al imprimir, abre los desplegables de medidas para que salga todo el programa,
// y al terminar deja cerrados los que abrió. Las pestañas las resuelve css/base/print.css.

export function initPrint(root = document) {
  const opened = new Set();

  window.addEventListener('beforeprint', () => {
    // El navegador puede lanzar este aviso más de una vez: se acumulan, no se reinician
    root.querySelectorAll('details:not([open])').forEach((d) => {
      d.open = true;
      opened.add(d);
    });
  });

  window.addEventListener('afterprint', () => {
    opened.forEach((d) => { d.open = false; });
    opened.clear();
  });
}
