# CLAUDE.md · Web de la candidatura de Camilo Prado

Instrucciones para Claude Code. Léelas antes de tocar nada en este repositorio.

## Qué es este proyecto

Web estática de la candidatura del Dr. Camilo Prado Román (catedrático de Economía Financiera y Contabilidad, presidente de AEDEM) al decanato de la Facultad de Ciencias de la Economía y de la Empresa de la Universidad Rey Juan Carlos (URJC).

- Quien vota es la Junta de Facultad (PDI, PTGAS y representantes de estudiantes). La web construye reputación y recoge propuestas; el voto se gana en persona.
- Se publica en GitHub Pages desde la rama `main`, carpeta raíz. Cada push a `main` se publica solo.
- Responsable del proyecto: Victoria Marhuenda (comunicación de la campaña).

Idioma: todo el contenido, los comentarios de código y los mensajes de commit van en **español**.

## Cómo trabajar

1. Lee este archivo y, si la tarea toca contenido, `README.md`.
2. Antes de editar, localiza el archivo con la tabla «Dónde está cada cosa».
3. Haz el cambio mínimo que pide la tarea. No reorganices ni reescribas lo que no se ha pedido.
4. Comprueba en local (ver «Probar») antes de dar la tarea por terminada.
5. Resume en una o dos frases qué has cambiado y en qué archivos.

Si una petición choca con las reglas de marca o de campaña de este archivo, avísalo y pregunta antes de hacerla.

## Comandos

```bash
# Servidor local (obligatorio: la web carga parciales y JSON con fetch)
python3 -m http.server 8000
# → http://localhost:8000

# Publicar
git add -A
git commit -m "Descripción en español del cambio"
git push origin main
```

No hay `npm`, compilación ni dependencias. No las añadas sin que se pida expresamente.

## Dónde está cada cosa

| Necesito… | Archivo |
| --- | --- |
| Textos de la portada | `index.html` (cada sección empieza con `<!-- ============ NOMBRE ============ -->`) |
| Menú o redes sociales | `partials/header.html`, `partials/footer.html` |
| Currículum y perfiles de investigador | `index.html`, sección «Quién soy» |
| Agenda de encuentros | `data/encuentros.json` |
| Colores, tipografías, espacios | `css/settings/tokens.css` |
| Estilo de una sección | `css/sections/<seccion>.css` |
| Estilo de un componente | `css/components/<componente>.css` |
| Orden de carga de estilos | `css/main.css` |
| Comportamiento | `js/modules/<modulo>.js`, arrancado desde `js/main.js` |
| Ajustes editables (formulario, textos) | `js/config.js` |
| Logotipo | `assets/logo/` |
| Fotos | `assets/img/` (nombres en `assets/img/LEEME.md`) |
| PDF del programa | `assets/docs/programa-camilo-prado.pdf` |
| Privacidad | `privacidad.html` |

## Arquitectura y convenciones

### HTML
- HTML semántico: `section` con `aria-labelledby`, encabezados en orden (un solo `h1` por página).
- Cabecera y pie solo en `partials/`; las páginas los insertan con `<div data-include="partials/…"></div>`.
- Enlaces del menú con la forma `./#seccion`, para que funcionen desde cualquier página.
- Fotos con `data-placeholder="…"`: si falta el archivo, `js/modules/photos.js` muestra un recuadro con instrucciones.
- Huecos pendientes entre corchetes y en mayúsculas: `[MEDIDA]`, `[FECHA]`, `[ID-FORMULARIO]`. Nunca inventes datos para rellenarlos.

### CSS
- Metodología BEM: `.bloque`, `.bloque__elemento`, `.bloque--variante`.
- **Ningún color, tipografía, radio o espacio literal fuera de `tokens.css`**: usa siempre `var(--…)`. Si necesitas un valor nuevo, créalo en `tokens.css` con un comentario.
- Un archivo por sección o componente. Cada archivo nuevo se importa en `css/main.css`, en su bloque y en orden de lo general a lo particular.
- Móvil primero, sin scroll horizontal a 360 px: `flex-wrap`, `grid` con `auto-fit`/`minmax` y `clamp()` para los tamaños de titular.

### JavaScript
- Módulos ES nativos (`type="module"`), sin librerías.
- Un archivo por comportamiento en `js/modules/`, que exporta una función `initNombre(root = document)`. Se registra en `js/main.js`, siempre después de `loadIncludes()`.
- Mejora progresiva: la página debe leerse sin JavaScript (las pestañas muestran todos los paneles; los encuentros, un aviso).
- Nada de `innerHTML` con datos de JSON o del usuario: crea nodos y usa `textContent`.
- Los textos visibles generados por JS van en `js/config.js`, no dentro de los módulos.

### Datos
- `data/encuentros.json`: fechas en `AAAA-MM-DD`. El módulo ordena y oculta los pasados; admite texto libre (`[FECHA]`) mientras no haya fecha.

## Tareas frecuentes

### Añadir una sección
1. Copia en `index.html` el bloque de una sección parecida, con su comentario `====`, un `id` y un `h2` con `id="<seccion>-titulo"`.
2. Crea `css/sections/<seccion>.css` e impórtalo al final del bloque 5 de `css/main.css`.
3. Si lleva comportamiento: `js/modules/<modulo>.js` + llamada en `js/main.js`.
4. Si va en el menú: enlace `./#<seccion>` en `partials/header.html`.

### Añadir una página
Copia `privacidad.html` (mantiene parciales, fuentes, estilos y scripts), cambia `title`, `description` y el contenido de `main`, y añádela a `sitemap.xml`.

### Añadir un encuentro
Añade un bloque a `data/encuentros.json` con `date`, `time`, `campus`, `place` y `format`.

### Activar el formulario
Pega la dirección de Formspree en `formEndpoint` de `js/config.js` y nombra el servicio en `privacidad.html`.

### Dominio
Principal: `www.camilopradoroman.com` (archivo `CNAME`). `camilopradoroman.es` redirige a él desde el proveedor del dominio. Si cambia, actualiza `CNAME`, `robots.txt`, `sitemap.xml` y las etiquetas `canonical` y `og:` de `index.html`. `404.html` no necesita cambios: un script fija la base de sus rutas según dónde se sirva.

## Reglas de marca (brandbook)

| Color | Variable | Uso |
| --- | --- | --- |
| Papel #FBF7F1 | `--color-papel` | Fondo principal (~60%) |
| Tinta #17182B | `--color-tinta` | Texto y fondos de autoridad (~25%) |
| Naranja Facultad #F8931F | `--color-naranja` | Acento (~10%); **nunca texto blanco encima** |
| Rojo URJC #CB0017 | `--color-rojo` | Pertenencia: filete de cabecera, cifras, línea del sello (~5%); **nunca fondo dominante** |
| Naranja tinta #A85200 | `--color-naranja-tinta` | Texto naranja sobre fondo claro |

- Tipografías: **Libre Franklin** (titulares e interfaz; 800–900, cursiva negra en el logotipo) y **Newsreader** (texto largo y citas).
- Logotipo: sello circular con las iniciales CP en cursiva y una fina línea roja desplazada. Usa los SVG de `assets/logo/`; no lo redibujes ni cambies sus colores.
- Eslóganes: «Una Facultad que se mide por su impacto.» (paraguas) · «Tu título, con más valor.» (estudiantes) · «Escuchar primero. Decidir con datos.» (llamada a la acción).
- Tono: tuteo, frases cortas, cada promesa con su medida y su indicador. Nada de memes, emojis en titulares, críticas al equipo saliente ni a otras candidaturas.
- Accesibilidad: contraste mínimo 4,5:1 en texto, objetivos táctiles de 44 px, foco visible, `alt` en todas las imágenes.

## Reglas de campaña (no negociables)

- **Nunca** el escudo ni la marca oficial de la URJC, ni logos de AEDEM o de la Fundación Camilo Prado.
- El aviso «Candidatura de Camilo Prado · Comunicación no institucional. Esta web no es un canal de la Universidad Rey Juan Carlos.» debe estar en el pie de todas las páginas.
- No enlazar ni simular canales institucionales de la URJC como si fueran de la campaña.
- No publicar datos personales de terceros ni listas de correo; el formulario solo recoge lo imprescindible.
- No inventar cifras, medidas, fechas ni citas. Lo que falte queda como `[HUECO]` y se avisa.

## Probar antes de terminar

1. `python3 -m http.server 8000` y abrir `http://localhost:8000`.
2. Revisar a 1366 px y a 390 px de ancho: sin scroll horizontal y con la cabecera y el pie cargados.
3. Consola del navegador sin errores, salvo los 404 de fotos o del PDF pendientes de subir.
4. Si se ha tocado: probar las pestañas con teclado (flechas), el envío del formulario y la lista de encuentros.

## Contexto de la campaña (fuera del repositorio)

- Plan de comunicación y brandbook definitivos: documento compartido de la campaña (pestañas «Plan de comunicación» y «Brandbook»).
- Piezas de diseño (logo, posts, story, carrusel, maqueta web): lienzo de diseño de la campaña.
- Pendiente de confirmar: fechas electorales, visto bueno de la Junta Electoral al uso de colores URJC, medidas del programa, equipo decanal y canal de WhatsApp.
- Confirmado: dominio `www.camilopradoroman.com` (y `.es`), Instagram `@cpradoroman`, LinkedIn y perfiles de investigador.
