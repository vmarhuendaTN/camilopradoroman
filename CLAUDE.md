# CLAUDE.md · Web de la candidatura de Camilo Prado

Instrucciones para Claude Code. Léelas antes de tocar nada en este repositorio.

## Qué es este proyecto

Web estática de la candidatura del Dr. Camilo Prado Román (catedrático de Economía Financiera y Contabilidad, presidente de AEDEM) al decanato de la Facultad de Ciencias de la Economía y de la Empresa de la Universidad Rey Juan Carlos (URJC).

- **Vota toda la Facultad, no la Junta:** sufragio universal, presencial y ponderado (convocatoria del 29-09-2026 y Reglamento, BOURJC n.º 82):
  - PDI doctor con vinculación permanente: 53 %
  - Estudiantado: 21 %
  - Resto del PDI: 15 %
  - PTGAS: 11 %

  Gana en primera vuelta quien supere el 50 % de los votos ponderados; si no, segunda vuelta el 12 de noviembre. La web construye reputación y recoge propuestas; el voto se gana en persona.
- Se publica en GitHub Pages desde la rama `main`, carpeta raíz. Cada push a `main` se publica solo (en uno o dos minutos; se sigue en la pestaña **Actions**).
- Dirección: https://www.camilopradoroman.com/ (dominio en el archivo `CNAME`; ver «Dominio»).
- Contacto y redes (definitivos): Instagram [@cpradoroman](https://www.instagram.com/cpradoroman/) · [LinkedIn](https://www.linkedin.com/in/camilo-prado-roman-38b37334/) · correo `hola@camilopradoroman.es` (formulario).
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

# Publicar (directo)
git add -A
git commit -m "Descripción en español del cambio"
git push origin main
```

Si trabajas en otra rama, abre un pull request a `main` y publícalo solo cuando se pida («publica»). GitHub Pages guarda caché unos 10 minutos: si un cambio no se ve, recarga con Ctrl/Cmd + Mayús + R.

No hay `npm`, compilación ni dependencias. No las añadas sin que se pida expresamente.

## Dónde está cada cosa

| Necesito… | Archivo |
| --- | --- |
| Textos de la portada | `index.html` (cada sección empieza con `<!-- ============ NOMBRE ============ -->`) |
| Medidas del programa | `index.html`, secciones «Programa» (cuatro líneas) y «Para ti» (por colectivo) |
| Menú o redes sociales | `partials/header.html`, `partials/footer.html` |
| Currículum y perfiles de investigador | `index.html`, sección «Quién soy» |
| Agenda de encuentros | `data/encuentros.json` |
| Colores, tipografías, espacios, sombras, movimiento | `css/settings/tokens.css` |
| Estilo de una sección | `css/sections/<seccion>.css` |
| Estilo de un componente | `css/components/<componente>.css` |
| Orden de carga de estilos | `css/main.css` |
| Comportamiento | `js/modules/<modulo>.js`, arrancado desde `js/main.js` |
| Menú móvil | `js/modules/nav.js` y `css/layout/header.css` |
| Aparición al hacer scroll | `js/modules/reveal.js` y `css/base/motion.css` |
| Contenido que aparece en una fecha (campaña) | atributo `data-show-from` + `js/modules/schedule.js` |
| Cómo votar | `index.html` (sección `#votar`) y `css/sections/votar.css` |
| Ajustes editables (formulario, textos) | `js/config.js` |
| Logotipo | `assets/logo/` |
| Fotos | `assets/img/` (nombres en `assets/img/LEEME.md`) |
| Imagen al compartir (WhatsApp, redes) | `assets/img/og-image.jpg` y etiquetas `og:` de `index.html` |
| PDF del programa | `assets/docs/programa-camilo-prado.pdf` |
| Privacidad | `privacidad.html` |

## Estructura de la portada

Orden de secciones en `index.html` y fondo de cada una (alternan papel y papel 2; nunca fondos de color):

1. **Portada** (`hero`): eslogan, entradilla, botones y foto panorámica.
2. **Manifiesto**: cita de presentación del programa y tres cifras (`.datos`).
3. **Programa** (`#programa`, papel 2): cuatro líneas en tarjetas con desplegable «Ver las medidas» (`<details>`, funciona sin JavaScript).
4. **Para ti** (`#para-ti`): pestañas Estudiantes · PDI · PTGAS con sus medidas.
5. **Encuentros** (`#encuentros`, papel 2): tarjetas desde `data/encuentros.json`; carrusel en móvil.
6. **Cómo votar** (`#votar`): solo desde el 23 de octubre (`data-show-from`); cuándo, dónde, qué llevar y voto anticipado.
7. **Quién soy** (`#quien-soy`): retrato, presentación, cifras y perfiles de investigador.
8. **Compromiso** (`#compromiso`, papel 2): cita de compromiso institucional y tres compromisos.
9. **Contacto** (`#contacto`): formulario.

La portada muestra también la fecha de las elecciones bajo la etiqueta del titular (`.hero__date`).

## Origen de los textos

- La fuente de las medidas, citas y cifras es el **programa electoral** (Word de la campaña, fuera del repositorio; versión actual: v1, archivo `2026_PROGRAMA_ELECTORAL_CPR_v.6.docx`). Cuando llegue una versión nueva, actualiza «Programa», «Para ti», «Manifiesto» y «Compromiso» a partir de ella.
- Las medidas se resumen en frases cortas, sin añadir nada que no esté en el programa. Lo tachado en el documento no se publica.
- Las citas (`.cita`) son literales; si se recortan, se marca con «…».
- Cifras publicadas y su origen: 11.002 estudiantes (curso 2024-25) y «cerca de 12.000» (redondeo del propio programa); la Facultad imparte en todos los campus.
- Los indicadores de cada línea aún no existen: siguen como `[INDICADOR PÚBLICO Y PLAZO]` hasta que la campaña los defina.

## Arquitectura y convenciones

### HTML
- HTML semántico: `section` con `aria-labelledby`, encabezados en orden (un solo `h1` por página).
- Cabecera y pie solo en `partials/`; las páginas los insertan con `<div data-include="partials/…"></div>`.
- Enlaces del menú con la forma `./#seccion`, para que funcionen desde cualquier página.
- Fotos con `data-placeholder="…"`: si falta el archivo, `js/modules/photos.js` muestra un recuadro con instrucciones. Portada horizontal 3:2, se ve entera en escritorio (en móvil se recorta a 4:5 por el centro); retrato 2:3 en un hueco 4:5, recortado por abajo (`.photo--retrato`).
- `data-show-from="AAAA-MM-DD"` (con `hidden` en el HTML) hace que un elemento aparezca solo desde esa fecha, en hora de Madrid; `data-hide-from` lo vuelve a ocultar. Lo gestiona `js/modules/schedule.js`, que se ejecuta justo después de cargar los parciales.
- `data-reveal` en un bloque lo hace aparecer suavemente al hacer scroll; `data-reveal-stagger` en un contenedor anima sus hijos en cascada. Sin JavaScript o con «reducir movimiento», todo se ve sin animar.
- Etiqueta pequeña sobre cada `h2`: `<p class="eyebrow">Nombre de la sección</p>`. Palabra destacada con degradado de marca: `<span class="text-marca">…</span>` (solo en titulares grandes y con mesura).
- Huecos pendientes entre corchetes y en mayúsculas: `[MEDIDA]`, `[FECHA]`, `[ID-FORMULARIO]`. Nunca inventes datos para rellenarlos.

### CSS
- Metodología BEM: `.bloque`, `.bloque__elemento`, `.bloque--variante`.
- **Ningún color, tipografía, radio o espacio literal fuera de `tokens.css`**: usa siempre `var(--…)`. Si necesitas un valor nuevo, créalo en `tokens.css` con un comentario.
- Un archivo por sección o componente. Cada archivo nuevo se importa en `css/main.css`, en su bloque y en orden de lo general a lo particular.
- Móvil primero, sin scroll horizontal desde 320 px: `flex-wrap`, `grid` con `auto-fit`/`minmax(min(100%, var(--…)), 1fr)` y `clamp()` para tamaños y espacios.
- Componentes disponibles: botones (`.btn--primario` tinta, `.btn--secundario` borde, `.link-flecha` enlace con «›»), tarjetas (`.card`), listas de medidas (`.lista`), citas (`.cita`, `.cita--s`), pestañas (`.tabs`) y formulario (`.form`).

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

### Formulario de contacto
Ya está activo: el formulario envía con FormSubmit (`formEndpoint` de `js/config.js`) a `hola@camilopradoroman.es`, el correo de campaña, que también aparece bajo el formulario, en el pie y en `privacidad.html`. La primera vez hay que pulsar el enlace del correo de activación que manda FormSubmit. Si cambia el correo, cámbialo en esos cuatro sitios.

### Dominio
Definitivo: `www.camilopradoroman.com` (archivo `CNAME`). `canonical`, las etiquetas `og:`/`twitter:` de `index.html`, `robots.txt` y `sitemap.xml` usan `https://www.camilopradoroman.com/`. El DNS del `.com` debe apuntar a GitHub Pages (Settings → Pages → Custom domain); `camilopradoroman.es` se redirige al `.com` desde su proveedor. Si se cambia de dominio, hay que cambiar el `CNAME` y todas esas direcciones a la vez. `404.html` no necesita cambios: un script fija la base de sus rutas según dónde se sirva.

## Reglas de marca (brandbook)

| Color | Variable | Uso |
| --- | --- | --- |
| Papel #FBF7F1 | `--color-papel` | Fondo principal (~60%) |
| Tinta #17182B | `--color-tinta` | Texto y fondos de autoridad (~25%) |
| Naranja Facultad #F8931F | `--color-naranja` | Acento (~10%); **nunca texto blanco encima** |
| Rojo URJC #CB0017 | `--color-rojo` | Pertenencia: filete de cabecera, cifras, línea del sello (~5%); **nunca fondo dominante** |
| Naranja tinta #A85200 | `--color-naranja-tinta` | Texto naranja sobre fondo claro |

- **Criterio visual (tipo app, sobrio):** fondos siempre claros (papel, papel 2 y tarjetas blancas con filete finísimo y sombra suave); texto en tinta. El color de marca **solo destaca, nunca es fondo**: cifras en rojo, numerales y etiquetas en naranja tinta, viñetas y filetes cortos en naranja, filete rojo fino de la cabecera y degradado naranja→rojo en la palabra clave del titular. Mucho aire, titulares grandes y compactos, botones en píldora.
- Tipografía (decisión de la campaña, octubre de 2026): **Libre Franklin en toda la web**; no cambiarla ni sus reservas.
  - Titulares (`--font-titular`): pesos 700–900, interletrado ajustado. Cursiva negra en el logotipo.
  - Texto largo (`--font-texto`, también Libre Franklin): entradillas, párrafos, resúmenes, listas de medidas, compromisos y citas, en peso normal (citas en peso medio, sin cursiva).
  - Newsreader ya no se usa ni se carga; no la reintroduzcas sin que se pida.
- Logotipo: sello circular con las iniciales CP en cursiva y una fina línea roja desplazada. Usa los SVG de `assets/logo/`; no lo redibujes ni cambies sus colores.
- Eslogan único: «Aquí se viene a crecer.» Sin eslóganes secundarios.
- Tono: tuteo, frases cortas, cada promesa con su medida y su indicador. Nada de memes, emojis en titulares, críticas al equipo saliente ni a otras candidaturas.
- Accesibilidad: contraste mínimo 4,5:1 en texto, objetivos táctiles de 44 px, foco visible, `alt` en todas las imágenes.

## Calendario electoral oficial (no cambiar sin nueva convocatoria)

Fuentes: convocatoria firmada por el decano el 29-09-2026 y Reglamento para las elecciones a decano (BOURJC n.º 82, 28-09-2026).

| Fecha (2026) | Hito |
| --- | --- |
| 9 oct | Censo definitivo |
| 13–16 oct | Presentación de candidaturas (registro electrónico) |
| 22 oct | Proclamación definitiva de candidaturas |
| 23 y 26 oct | Campaña electoral y voto anticipado por registro |
| 27 oct | Jornada de reflexión: nada de campaña |
| 28 oct | Votación presencial, 9 a 20 h (DNI, pasaporte, carné de conducir o carné URJC) |
| 6 y 10 nov | Campaña de segunda vuelta, si la hay |
| 11 nov | Reflexión de segunda vuelta |
| 12 nov | Votación de segunda vuelta |

Cómo afecta a la web:

- Antes del 23 de octubre la web presenta la candidatura y el programa, pero **no pide el voto** (el reglamento reserva la petición pública de voto a la campaña, art. 12.3).
- Contenido de campaña (sección «Cómo votar», enlace del menú, llamadas a votar) solo con `data-show-from="2026-10-23"`; lo gestiona `js/modules/schedule.js` con la hora de Madrid.
- **27 y 28 de octubre: no se publica nada nuevo ni se hace push con cambios de contenido.** Si hace falta corregir un error, solo el error.
- Mesas electorales: pendiente de que la Junta Electoral las publique; sustituir `[MESAS ELECTORALES · pendiente de la Junta Electoral]` en `index.html`.
- Los encuentros de `data/encuentros.json` deben caer entre el 13 y el 26 de octubre.

## Reglas de campaña (no negociables)

- **Nunca** el escudo ni la marca oficial de la URJC, ni logos de AEDEM o de la Fundación Camilo Prado.
- El aviso «Candidatura de Camilo Prado · Comunicación no institucional. Esta web no es un canal de la Universidad Rey Juan Carlos.» debe estar en el pie de todas las páginas.
- No enlazar ni simular canales institucionales de la URJC como si fueran de la campaña.
- No publicar datos personales de terceros ni listas de correo; el formulario solo recoge lo imprescindible.
- No inventar cifras, medidas, fechas ni citas. Lo que falte queda como `[HUECO]` y se avisa.

## Probar antes de terminar

1. `python3 -m http.server 8000` y abrir `http://localhost:8000`.
2. Revisar al menos a 320, 390, 768, 1366 y 1920 px de ancho, y un móvil en horizontal (844 × 390): sin scroll horizontal, nada fuera de pantalla y con la cabecera y el pie cargados.
3. Consola del navegador sin errores, salvo los 404 de fotos o del PDF pendientes de subir.
4. Hoy, antes del 23 de octubre, «Cómo votar» y su enlace del menú no deben verse. Para probar la campaña sin tocar el código, adelanta el reloj del navegador (por ejemplo, el reloj simulado de Playwright) al 24 de octubre; si fuerzas la fecha en `schedule.js`, deshazlo antes del commit.
5. Si se ha tocado: probar las pestañas con teclado (flechas), el menú móvil (abrir, cerrar con Escape), los desplegables de medidas, el envío del formulario y la lista de encuentros.
6. Comprobar que toda la web sale en Libre Franklin (y que no se carga Newsreader).

## Contexto de la campaña (fuera del repositorio)

- Plan de comunicación y brandbook definitivos: documento compartido de la campaña (pestañas «Plan de comunicación» y «Brandbook»).
- Piezas de diseño (logo, posts, story, carrusel, maqueta web): lienzo de diseño de la campaña.
- Pendiente de confirmar: visto bueno de la Junta Electoral al uso de colores URJC, versión definitiva del programa e indicadores de cada línea, equipo decanal, mesas electorales y fechas de los cafés por campus.
- Pendiente de subir o configurar: PDF del programa y activación de FormSubmit (enlace del primer correo).
- No hay canal de WhatsApp: no lo añadas.
- Erratas detectadas en el programa v1 (corregidas en la web, no en el Word): «intencionales» → «internacionales», «Postgrados» → «Posgrados», «EULIST» → «EULiST», paréntesis sin cerrar en la medida del TFG; «cambios normativos (RD)» no indica qué Real Decreto.
- Confirmado: dominio `www.camilopradoroman.com`, Instagram `@cpradoroman`, LinkedIn, correo `hola@camilopradoroman.es`, perfiles de investigador y calendario electoral.
