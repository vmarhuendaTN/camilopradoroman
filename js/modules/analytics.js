// Analítica con Google Analytics 4 y aviso de cookies.
// Solo se activa si js/config.js tiene ga4Id. Nada se carga hasta que la persona acepta;
// la elección se guarda en el navegador y se puede cambiar con el botón «Configurar cookies» del pie.
import { config } from '../config.js';

const KEY = 'cookies-analitica';

function readChoice() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
function saveChoice(value) {
  try { localStorage.setItem(KEY, value); } catch { /* sin almacenamiento: se volverá a preguntar */ }
}

function loadGa(id) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

function showBanner(id) {
  if (document.querySelector('.cookies')) return;
  const t = config.cookies;
  const box = document.createElement('div');
  box.className = 'cookies';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', 'Aviso de cookies');

  const p = document.createElement('p');
  p.className = 'cookies__text';
  p.textContent = `${t.text} `;
  const more = document.createElement('a');
  more.href = 'privacidad.html#cookies';
  more.textContent = t.more;
  p.appendChild(more);

  const actions = document.createElement('div');
  actions.className = 'cookies__actions';
  const reject = document.createElement('button');
  reject.type = 'button';
  reject.className = 'btn btn--secundario';
  reject.textContent = t.reject;
  const accept = document.createElement('button');
  accept.type = 'button';
  accept.className = 'btn btn--primario';
  accept.textContent = t.accept;
  actions.append(reject, accept);

  box.append(p, actions);
  document.body.appendChild(box);

  reject.addEventListener('click', () => { saveChoice('no'); box.remove(); });
  accept.addEventListener('click', () => { saveChoice('si'); box.remove(); loadGa(id); });
}

export function initAnalytics(root = document) {
  const id = config.ga4Id;
  const settings = root.querySelectorAll('[data-cookie-settings]');
  if (!id) {
    settings.forEach((el) => { el.hidden = true; });
    return;
  }
  settings.forEach((el) => {
    el.hidden = false;
    el.addEventListener('click', () => showBanner(id));
  });
  const choice = readChoice();
  if (choice === 'si') loadGa(id);
  else if (choice !== 'no') showBanner(id);
}
