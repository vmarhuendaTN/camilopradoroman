// Ajustes editables de la web. Cambia aquí los valores; no hace falta tocar los módulos.

export const config = {
  // Formulario de contacto: GitHub Pages no ejecuta código de servidor, así que los mensajes
  // se envían con FormSubmit (https://formsubmit.co, gratuito y sin cuenta) al correo de campaña.
  // La primera vez, FormSubmit manda a hola@camilopradoroman.es un correo de activación: hay que pulsar su enlace.
  formEndpoint: 'https://formsubmit.co/ajax/hola@camilopradoroman.es',

  // Textos de respuesta del formulario
  messages: {
    sending: 'Enviando…',
    ok: 'Gracias. He recibido tu mensaje y te responderé pronto.',
    error: 'No se ha podido enviar. Inténtalo de nuevo o escríbeme a hola@camilopradoroman.es.',
    invalid: 'Revisa los campos marcados.',
    notConfigured: 'El formulario aún no está activado.',
  },

  // Encuentros: texto cuando no hay ninguno próximo
  eventsEmpty: 'Pronto anunciaremos nuevos encuentros. Síguenos en redes para no perderte ninguno.',
};
