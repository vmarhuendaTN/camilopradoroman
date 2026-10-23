// Muestra los elementos con data-show-from="AAAA-MM-DD" a partir de esa fecha (hora de Madrid).
// Sirve para que la información de campaña aparezca sola el día que empieza la campaña.
// Opcional: data-hide-from="AAAA-MM-DD" los vuelve a ocultar desde esa fecha.
// data-show-on="AAAA-MM-DD,AAAA-MM-DD" los muestra solo esos días (p. ej., los dos días de campaña).

function todayMadrid() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());
}

export function initSchedule(root = document) {
  const today = todayMadrid();
  root.querySelectorAll('[data-show-from]').forEach((el) => {
    const from = el.dataset.showFrom;
    const until = el.dataset.hideFrom;
    el.hidden = !(today >= from && (!until || today < until));
  });
  root.querySelectorAll('[data-show-on]').forEach((el) => {
    const days = el.dataset.showOn.split(',').map((d) => d.trim());
    el.hidden = !days.includes(today);
  });
}
