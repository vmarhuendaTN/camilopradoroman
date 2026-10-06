// Punto de entrada. Primero carga los parciales compartidos (cabecera y pie)
// y después activa cada módulo. Para añadir comportamiento nuevo: crea un archivo en
// js/modules/, expórtale una función init y llámala aquí.
import { loadIncludes } from './modules/include.js';
import { initTabs } from './modules/tabs.js';
import { initEncuentros } from './modules/encuentros.js';
import { initContactForm } from './modules/contact-form.js';
import { initPhotos } from './modules/photos.js';
import { initYear } from './modules/year.js';

async function start() {
  await loadIncludes();
  initYear();
  initPhotos();
  initTabs();
  initContactForm();
  await initEncuentros();
}

start();
