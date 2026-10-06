// Punto de entrada. Primero carga los parciales compartidos (cabecera y pie)
// y después activa cada módulo. Para añadir comportamiento nuevo: crea un archivo en
// js/modules/, expórtale una función init y añádela a la lista de abajo.
import { loadIncludes } from './modules/include.js';
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initTabs } from './modules/tabs.js';
import { initEncuentros } from './modules/encuentros.js';
import { initContactForm } from './modules/contact-form.js';
import { initPhotos } from './modules/photos.js';
import { initYear } from './modules/year.js';

const modules = [initNav, initReveal, initYear, initPhotos, initTabs, initContactForm, initEncuentros];

async function start() {
  await loadIncludes();
  // Cada módulo arranca por separado: si uno falla, los demás siguen funcionando.
  await Promise.all(
    modules.map(async (init) => {
      try {
        await init();
      } catch (err) {
        console.error(`Error al iniciar ${init.name}`, err);
      }
    })
  );
}

start();
