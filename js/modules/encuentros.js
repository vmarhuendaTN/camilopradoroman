// Pinta los encuentros desde un JSON (por defecto data/encuentros.json).
// Ordena por fecha y oculta solos los que ya han pasado: basta con añadir filas al JSON.
import { config } from '../config.js';

const dateFormat = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

function formatDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso; // admite texto libre, p. ej. "[FECHA]"
  const [y, m, d] = iso.split('-').map(Number);
  return dateFormat.format(new Date(Date.UTC(y, m - 1, d)));
}

function today() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function eventItem(event) {
  const li = document.createElement('li');
  li.className = 'event';

  const when = document.createElement('p');
  when.className = 'event__when';
  const time = document.createElement('time');
  if (/^\d{4}-\d{2}-\d{2}$/.test(event.date)) time.dateTime = event.date;
  time.textContent = formatDate(event.date);
  when.append(time);
  if (event.time) when.append(` · ${event.time}`);

  const campus = document.createElement('h3');
  campus.className = 'event__campus';
  campus.textContent = event.campus;

  const place = document.createElement('p');
  place.className = 'event__place';
  place.textContent = [event.place, event.format].filter(Boolean).join(' · ');

  li.append(when, campus, place);
  return li;
}

function emptyItem(text) {
  const li = document.createElement('li');
  li.className = 'events__empty';
  li.textContent = text;
  return li;
}

export async function initEncuentros(root = document) {
  const lists = root.querySelectorAll('[data-encuentros]');
  for (const list of lists) {
    const src = list.dataset.src || 'data/encuentros.json';
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`${res.status} ${src}`);
      const events = await res.json();
      const now = today();
      const upcoming = events
        .filter((e) => !/^\d{4}-\d{2}-\d{2}$/.test(e.date) || e.date >= now)
        .sort((a, b) => String(a.date).localeCompare(String(b.date)));

      list.replaceChildren(
        ...(upcoming.length ? upcoming.map(eventItem) : [emptyItem(config.eventsEmpty)])
      );
    } catch (err) {
      console.error('No se pudieron cargar los encuentros', err);
      list.replaceChildren(emptyItem(config.eventsEmpty));
    }
  }
}
