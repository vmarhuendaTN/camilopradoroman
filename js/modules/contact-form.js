// Formulario de contacto: valida en el navegador y envía al servicio de js/config.js sin recargar la página.
import { config } from '../config.js';

export function initContactForm(root = document) {
  root.querySelectorAll('[data-contact-form]').forEach((form) => {
    const status = form.querySelector('.form__status');
    const button = form.querySelector('[type="submit"]');

    const setStatus = (text, state = '') => {
      if (!status) return;
      status.textContent = text;
      status.dataset.state = state;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Validación nativa, marcando los campos con error para lectores de pantalla
      const fields = Array.from(form.querySelectorAll('input, select, textarea'));
      fields.forEach((f) => f.removeAttribute('aria-invalid'));
      const invalid = fields.filter((f) => !f.checkValidity());
      if (invalid.length) {
        invalid.forEach((f) => f.setAttribute('aria-invalid', 'true'));
        invalid[0].focus();
        setStatus(config.messages.invalid, 'error');
        return;
      }

      if (config.formEndpoint.includes('[')) {
        setStatus(config.messages.notConfigured, 'error');
        return;
      }

      button.disabled = true;
      setStatus(config.messages.sending);
      try {
        const res = await fetch(config.formEndpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus(config.messages.ok, 'ok');
      } catch (err) {
        console.error('Error al enviar el formulario', err);
        setStatus(config.messages.error, 'error');
      } finally {
        button.disabled = false;
      }
    });
  });
}
