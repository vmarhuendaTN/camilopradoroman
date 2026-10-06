// Ajustes editables de la web. Cambia aquí los valores; no hace falta tocar los módulos.

export const config = {
  // Formulario de contacto: GitHub Pages no ejecuta código de servidor, así que los mensajes
  // se envían a un servicio externo. Crea un formulario gratuito en https://formspree.io
  // y pega aquí su dirección (tiene la forma https://formspree.io/f/xxxxxxx).
  formEndpoint: 'https://formspree.io/f/[ID-FORMULARIO]',

  // Textos de respuesta del formulario
  messages: {
    sending: 'Enviando…',
    ok: 'Gracias. He recibido tu mensaje y te responderé pronto.',
    error: 'No se ha podido enviar. Inténtalo de nuevo o escríbeme por redes.',
    invalid: 'Revisa los campos marcados.',
    notConfigured: 'El formulario aún no está activado.',
  },

  // Encuentros: texto cuando no hay ninguno próximo
  eventsEmpty: 'Pronto anunciaremos nuevos encuentros. Síguenos en redes para no perderte ninguno.',
};
