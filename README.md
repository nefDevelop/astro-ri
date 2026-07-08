# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📝 Guía de Uso (Usage Guide)

### 1. Instalación
Si quieres empezar un proyecto nuevo con este tema desde cero, ejecuta:
```sh
npm create astro@latest -- --template blog
```
Si ya clonaste o descargaste el repositorio, instala las dependencias y arranca el servidor local:
```sh
npm install
npm run dev
```

### 2. Configuración Principal
Puedes modificar los metadatos globales del sitio (como el título y la descripción) en el archivo `src/consts.ts`.

### 3. Escribir un Post
Para publicar una nueva entrada de blog, simplemente crea un archivo Markdown (`.md`) o MDX (`.mdx`) en el directorio `src/content/blog/`. Asegúrate de incluir el *frontmatter* al principio del archivo:

```markdown
---
title: "Mi Nuevo Post"
description: "Descripción de mi post"
pubDate: "Jul 08 2026"
heroImage: "/blog-placeholder-1.jpg"
---
Contenido de tu post aquí...
```

### 4. Manejo de Imágenes y Assets
- **Imágenes estáticas**: Colócalas en la carpeta `public/` (ej. `public/blog-placeholder-1.jpg`) y referéncialas usando rutas absolutas en tu código o *frontmatter* (`/blog-placeholder-1.jpg`).
- **Assets procesados**: Para optimizar imágenes automáticamente, guárdalas en `src/assets/` y utiliza el componente `<Image />` nativo de Astro dentro de tus archivos `.astro`.

### 5. Feed RSS
El tema viene con soporte nativo para RSS ubicado en `src/pages/rss.xml.js`. Este archivo extraerá automáticamente el contenido de la colección de tu blog y generará un feed funcional bajo la ruta `/rss.xml`.

### 6. Modificar el Diseño y Estilos
- **Componentes**: Añade o edita los componentes globales en `src/components/`.
- **Layouts**: La estructura general de las páginas se encuentra en `src/layouts/`.
- **Páginas**: Edita las páginas estáticas o endpoints en `src/pages/`.
## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
