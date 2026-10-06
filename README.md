# Web de la candidatura · Camilo Prado, Decano

Web estática de la candidatura de Camilo Prado al decanato de la Facultad de Ciencias de la Economía y de la Empresa (URJC). Está hecha en HTML, CSS y JavaScript puros, sin frameworks ni paso de compilación, y GitHub Pages la publica tal cual.

## Estructura

```
camilopradoroman/
├── index.html               Portada: todas las secciones, marcadas con comentarios
├── privacidad.html          Política de privacidad
├── 404.html                 Página de error (calcula sola la base de sus rutas)
├── partials/
│   ├── header.html          Cabecera común (se edita una vez para todas las páginas)
│   └── footer.html          Pie común
├── css/
│   ├── main.css             Punto de entrada: importa todo lo demás en orden
│   ├── settings/tokens.css  Colores, tipografías, espacios (brandbook)
│   ├── base/                Reinicio, tipografía y utilidades
│   ├── layout/              Cabecera, pie y envoltorio de sección
│   ├── components/          Botones, fotos, tarjetas, pestañas, formulario
│   └── sections/            Estilos propios de cada sección
├── js/
│   ├── main.js              Punto de entrada: arranca cada módulo
│   ├── config.js            Ajustes editables (formulario, textos)
│   └── modules/             Un archivo por comportamiento
├── data/
│   └── encuentros.json      Agenda de cafés y encuentros
├── assets/
│   ├── logo/                Sello CP (principal, inversa, favicon)
│   ├── img/                 Fotografías
│   └── docs/                PDF del programa y otros descargables
├── CNAME                    Dominio: www.camilopradoroman.com
├── .nojekyll                Indica a GitHub Pages que publique los archivos tal cual
├── robots.txt
└── sitemap.xml
```

## Cambios habituales

| Quiero… | Archivo |
| --- | --- |
| Cambiar textos de la portada | `index.html` (cada sección empieza con un comentario `====`) |
| Cambiar el menú o las redes | `partials/header.html` y `partials/footer.html` |
| Añadir o quitar un encuentro | `data/encuentros.json` |
| Cambiar un color o una tipografía | `css/settings/tokens.css` |
| Activar el formulario | `js/config.js` (ver «Formulario») |
| Poner las fotos | Subir a `assets/img/` con estos nombres: `camilo-prado-hero.jpg` (vertical 4:5) y `camilo-prado-retrato.jpg` (cuadrada) |
| Publicar el programa | Subir `assets/docs/programa-camilo-prado.pdf` |
| Imagen al compartir en redes | Subir `assets/img/og-image.png` (1200 × 630) |

Mientras falte una foto, la web muestra en su lugar un recuadro con el nombre del archivo que hay que subir.

### Encuentros

Cada encuentro es un bloque en `data/encuentros.json`:

```json
{
  "date": "2026-11-12",
  "time": "11:00",
  "campus": "Campus de Vicálvaro",
  "place": "Cafetería del aulario",
  "format": "Café con el candidato"
}
```

La fecha va en formato AAAA-MM-DD. La web los ordena por fecha y oculta sola los que ya han pasado.

### Formulario

GitHub Pages no ejecuta código de servidor, así que los mensajes se envían a [Formspree](https://formspree.io) (plan gratuito):

1. Crea una cuenta con el correo de la campaña y un formulario nuevo.
2. Copia su dirección (`https://formspree.io/f/xxxxxxx`).
3. Pégala en `formEndpoint` dentro de `js/config.js`.
4. Indica el servicio en `privacidad.html`.

## Añadir una sección nueva

1. Copia en `index.html` el bloque de una sección parecida, con su comentario `====`.
2. Crea `css/sections/mi-seccion.css` y añade `@import url('sections/mi-seccion.css');` al final del bloque 5 de `css/main.css`.
3. Si necesita comportamiento, crea `js/modules/mi-modulo.js` con una función `initMiModulo()` e invócala en `js/main.js`.
4. Si debe aparecer en el menú, añade el enlace en `partials/header.html` con la forma `./#mi-seccion`.

Regla: nada de colores, tamaños, interlineados ni bordes sueltos. Usa siempre las variables de `tokens.css`; si falta una, créala allí con un comentario.

## Ver la web en local

La web carga archivos con `fetch` (parciales y encuentros), así que hay que abrirla con un servidor, no con doble clic:

```bash
cd camilopradoroman
python3 -m http.server 8000
# abre http://localhost:8000
```

También sirve la extensión Live Server de VS Code.

## Publicar en GitHub Pages

1. El repositorio es `camilopradoroman`; lo que se sube a la rama `main` es lo que se publica.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En un par de minutos la web estará en `https://<usuario>.github.io/camilopradoroman/`.

Cada cambio que se suba a `main` se publica solo.

### Dominio propio

La dirección principal es `www.camilopradoroman.com` (archivo `CNAME`; GitHub Pages admite un solo dominio).

1. En el proveedor del dominio `.com`, crea los registros DNS que indica GitHub en **Settings → Pages → Custom domain**: un `CNAME` de `www` hacia `<usuario>.github.io` y los registros `A` del dominio raíz. Después activa **Enforce HTTPS**.
2. En el proveedor del dominio `.es`, configura una redirección permanente (301) de `camilopradoroman.es` y `www.camilopradoroman.es` a `https://www.camilopradoroman.com`.
3. Si algún día cambia el dominio, actualízalo en `CNAME`, `sitemap.xml`, `robots.txt` y en las etiquetas `canonical` y `og:` de `index.html`.

La página 404 funciona igual con dominio propio y sin él: calcula sola la base de sus rutas.

## Reglas de marca

- Colores: papel, tinta, naranja Facultad (#F8931F) y rojo URJC (#CB0017) como acento; nunca texto blanco sobre naranja.
- Tipografías: Libre Franklin (titulares) y Newsreader (texto).
- Nunca el escudo de la URJC ni logos de AEDEM o la Fundación.
- El pie «Comunicación no institucional» debe estar en todas las páginas.
