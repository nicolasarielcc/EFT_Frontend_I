# GameStore — Tienda online de videojuegos

> **Asignatura:** Desarrollo Frontend I (PFY2201) — Evaluación Final Transversal (EFT), Semana 9.
> **Stack:** HTML5, CSS3, Bootstrap 5, JavaScript y React (Vite).
> **Publicado en:** https://nicolasarielcc.github.io/EFT_Frontend_I/

Aplicación web sencilla para la venta de videojuegos online. Muestra un catálogo de videojuegos en tarjetas (imagen, nombre, precio y descripción), permite **filtrar por categoría** y **buscar por nombre**, permite **agregar o eliminar videojuegos** de la lista (manejado con estado en React), e incluye un **formulario de contacto validado**.

---

## Tabla de contenidos

- [Descripción del caso](#caso)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Requisitos previos](#requisitos-previos)
- [Instalación del proyecto](#instalación-del-proyecto)
- [Uso del sitio](#uso-del-sitio)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo se cumplen los criterios de evaluación](#cómo-se-cumplen-los-criterios-de-evaluación)
- [Despliegue en GitHub Pages](#despliegue-en-github-pages)
- [Licencia](#licencia)

---

## Caso

Se encarga el desarrollo de un sitio web para una tienda de venta de videojuegos online. El sitio debe:

- Mostrar los **videojuegos disponibles** en la página principal.
- Permitir **filtrar los videojuegos por categoría** (botones en la barra de navegación).
- Ofrecer un **formulario de contacto** para comunicarse con el administrador.

El proyecto está **dividido en componentes React** para modularizar el código y facilitar su mantenimiento.

---

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|---|---|
| HTML5 | Estructura semántica (`header`, `main`, `section`, `nav`, `footer`) en `index.html`. |
| CSS3 | Estilos propios en `src/index.css` utilizando **Flexbox** (layout general) y **CSS Grid** (pie de página). |
| Bootstrap 5 | Maquetación responsiva por CDN: navbar, cards del catálogo, grilla (`col-*`), formularios y spinner. |
| JavaScript | Objeto de datos JSON (`public/data/juegos.json`), carga dinámica con **Fetch API**, búsqueda y validaciones. |
| React | Componentes funcionales (`Navbar`, `GameList`, `GameCard`, `AddGameForm`, `ContactForm`), **`useState`** para el estado y **props** para comunicar información entre componentes. |

---

## Requisitos previos

- **Node.js** versión 18 o superior (recomendado LTS) y **npm** incluido.
  - Verificar con: `node -v` y `npm -v`.
- (Opcional) Cuenta GitHub para el despliegue.

---

## Instalación del proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/nicolasarielcc/EFT_Frontend_I.git
cd EFT_Frontend_I

# 2. Instalar las dependencias
npm install

# 3. Ejecutar el servidor de desarrollo (http://localhost:5173)
npm run dev
```

> Nota: si trabajas con doble clic sobre `index.html` (protocolo `file://`), la carga de datos puede fallar. Se recomienda **servir el proyecto con npm** (paso 3) para que el catálogo se cargue correctamente.

---

## Uso del sitio

| Sección | Función |
|---|---|
| **Inicio** | Hero con el nombre de la tienda. |
| **Catálogo de videojuegos** | Tarjetas con imagen, categoría, nombre, descripción y precio. Se muestra un indicador de carga y, si falla la carga, un mensaje amigable con botón **Reintentar**. |
| **Barra de navegación** | Enlaces **Inicio**, **categorías** (filtrar el catálogo) y **Contacto**. Incluye un buscador por nombre (búsqueda en vivo). |
| **Agregar un videojuego** | Formulario validado que incorpora nuevos juegos a la lista (el estado se actualiza dinámicamente; cada tarjeta permite **quitar** el juego). |
| **Contacto** | Formulario (nombre, email, mensaje) que **valida** los campos y muestra mensajes de error si falta información o el correo es inválido. |

### Ejemplo de uso rápido

1. `npm run dev` y abrir `http://localhost:5173`.
2. Haz clic en una **categoría** del menú (p. ej. "RPG") → el catálogo se filtra.
3. Escribe en el **buscador** → la lista se filtra por nombre en tiempo real.
4. Agrega un **videojuego** con el formulario; aparecerá al final del catálogo.
5. Usa **Quitar del catálogo** para eliminar un juego.
6. Envía el formulario de **Contacto** vacío → se muestran los errores; con datos válidos → mensaje de éxito.

---

## Estructura del proyecto

```
EFT_Frontend_I/
├── index.html                  # Estructura semántica + Bootstrap 5 (CDN)
├── package.json                # Scripts: dev, build, deploy (gh-pages)
├── vite.config.js              # base = '/EFT_Frontend_I/' para GitHub Pages
├── public/
│   ├── data/
│   │   └── juegos.json         # Objeto JS con la información de los videojuegos
│   └── img/                    # Portadas (SVG) de los videojuegos
└── src/
    ├── main.jsx                # Punto de entrada de React
    ├── App.jsx                 # Estado central + props entre secciones
    ├── index.css               # Estilos propios (Flexbox + CSS Grid)
    ├── utils/
    │   └── format.js           # Formateo de precio en CLP
    └── components/
        ├── Navbar.jsx          # Barra de navegación (menú ul/li + categorías + buscador)
        ├── GameList.jsx        # Grilla de tarjetas (filtrados)
        ├── GameCard.jsx        # Tarjeta de videojuego (Card de Bootstrap)
        ├── AddGameForm.jsx     # Formulario para agregar juegos (state)
        ├── ContactForm.jsx     # Formulario de contacto validado
        └── Footer.jsx          # Pie de página (CSS Grid)
```

**Modelo de datos** (`public/data/juegos.json`):

```json
{
  "id": 1,
  "nombre": "The Legend of Zelda: Breath of the Wild",
  "categoria": "Aventura",
  "precio": 49990,
  "descripcion": "Explora el vasto reino de Hyrule…",
  "imagen": "img/zelda-botw.svg"
}
```

Campos: `id`, `nombre`, `categoria`, `precio`, `descripcion`, `imagen`.

---

## Cómo se cumplen los criterios de evaluación

| Criterio (Pauta EFT) | Implementación |
|---|---|
| 1. Estructura del código (HTML, CSS, Bootstrap 5) | Etiquetas semánticas, Flexbox + CSS Grid y Bootstrap 5 óptimo (grilla responsiva). |
| 2. Componentes de Bootstrap con coherencia visual | Navbar, cards del catálogo y formularios con clases de Bootstrap. |
| 3. Manipulación del DOM / contenido dinámico | Render dinámico del catálogo desde JSON (Fetch API) y filtrado/búsqueda sin errores. |
| 4. Componentes React reutilizables (state y props) | 5 componentes funcionales, `useState` (agregar/eliminar) y props para conectar las secciones. |
| 5. Control de versiones (GitHub) | Historial con commits detallados; repositorio público y rama `gh-pages` desplegada. |
| 6. Presentación (video explicativo) | Guion y presentación disponibles en la entrega (ver repositorio/AVA). |
| 7. Compatibilidad con dispositivos y navegadores | Diseño responsivo probado en desktop, tablet y móvil (y en más de un navegador). |
| 8. Documentación en README.md | Este documento: instalación, uso y estructura detallados. |

---

## Despliegue en GitHub Pages

El proyecto usa **Vite** y publica la rama `gh-pages` con la librería `gh-pages`:

```bash
npm run build    # genera la carpeta dist/
npm run deploy   # publica dist/ en la rama gh-pages
```

Detalles de configuración:

- `vite.config.js` define `base: '/EFT_Frontend_I/'` (nombre del repositorio) para que los assets funcionen en GitHub Pages.
- El deploy usa `--nojekyll` para evitar que Jekyll procese el sitio estático.
- El sitio queda en: `https://nicolasarielcc.github.io/EFT_Frontend_I/`.

---

## Licencia

Proyecto académico — Desarrollo Frontend I (PFY2201). Fundación Instituto Profesional Duoc UC.