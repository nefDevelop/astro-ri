# Ri — Blog + Documentación con Astro

Tema para blog personal y documentación técnica construido con **Astro 7**, **Tailwind CSS v4** y **Alpine.js**. Sin frameworks pesados del lado del cliente, con sistema de color generativo, búsqueda estática, comentarios vía GitHub y soporte para markdown extendido.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | [Astro](https://astro.build) 7 — Islands architecture |
| Estilos | [Tailwind CSS](https://tailwindcss.com) v4 + CSS custom properties |
| Tipografía | Atkinson Hyperlegible (local, variable) |
| Interactividad | [Alpine.js](https://alpinejs.dev) — liviano, sin bundle pesado |
| Código | [Expressive Code](https://expressive-code.com) — resaltado con temas, números de línea, secciones plegables |
| Búsqueda | [Pagefind](https://pagefind.app) — búsqueda estática indexada en build |
| Comentarios | [Giscus](https://giscus.app) — GitHub Discussions |
| Lightbox | [PhotoSwipe](https://photoswipe.com) |
| Diagramas | [Mermaid](https://mermaid.js.org) |
| Math | [KaTeX](https://katex.org) (MathML) |
| OG Images | [Satori](https://github.com/vercel/satori) + Sharp — generación dinámica de Open Graph |
| Testing | Vitest (unit) + Playwright (e2e) |
| Package manager | npm |

## Características

### Contenido
- Colecciones tipadas con Zod: blog, docs, autores, series, páginas
- Markdown + MDX, con frontmatter validado
- Posts con dificultad (beginner / intermediate / advanced)
- Posts pinned (fijados al inicio)
- Series de posts con navegación entre capítulos
- Sistema multi-autor con perfiles YAML
- Drafts (ocultos en producción)
- Tags y categorías con páginas de listado y filtrado
- Archivo cronológico por año
- Imágenes OG dinámicas por post

### Markdown extendido
- **Callouts / Admonitions** estilo Obsidian (nota, warning, danger, info, defini, etc.)
- **Wikilinks** (`[[slug]]` → enlace interno) y `==highlight==`
- **Mermaid** en bloque ` ```mermaid `
- **KaTeX** en línea y bloque (`$...$` / `$$...$$`)
- **Tablas ordenables** con `{.sortable}`
- **Figuras** automáticas con caption desde alt text
- **Atributos CSS** mediante `{.classname}` en línea propia

### UI / UX
- Modo oscuro / claro con persistencia en localStorage
- Paleta de colores generativa desde un color semilla (seed color)
- Tabla de contenidos flotante con seguimiento visual (IntersectionObserver)
- Barra de progreso de lectura
- Búsqueda con atajo Ctrl+K
- Paginación en listados (blog, tags, categorías, autores)
- Navegación responsive con dropdown en móvil
- Lightbox para imágenes
- Botones de compartir (Reddit, Telegram, LinkedIn, Email, copiar enlace)
- Skip-to-content, focus-visible, prefers-reduced-motion, aria-current
- Transiciones de página suaves (View Transitions API)
- Estilos de impresión optimizados

### SEO / Meta
- Open Graph / Twitter Cards
- JSON-LD schema (BlogPosting, Article)
- Sitemap automático
- RSS feed
- URLs limpias
- Canonical URLs

### Widgets (sidebar)
- Tabla de contenidos
- Autor (avatar, bio, enlaces)
- Calendario interactivo con marcadores de posts
- Categorías, Tags, Tags de documentación
- Posts recientes, post destacado
- Series (progreso de capítulos)
- Estadísticas del sitio
- Archivo mensual
- Enlaces de apoyo (Buy me a coffee, GitHub Sponsor)

## Estructura del proyecto

```
src/
├── assets/              # Fuentes locales e imágenes
├── components/          # Componentes Astro reutilizables
│   ├── icons/           # Iconos SVG inline
│   └── widgets/         # Componentes de sidebar
├── config/              # Generador de paleta de colores
├── consts.ts            # Configuración global del sitio
├── content/             # Colecciones de contenido
│   ├── authors/         # Perfiles de autor (YAML)
│   ├── blog/            # Posts del blog (md/mdx)
│   ├── docs/            # Páginas de documentación
│   ├── pages/           # Páginas especiales (about)
│   └── series/          # Definiciones de series (YAML)
├── content.config.ts    # Schemas Zod para colecciones
├── i18n/                # Traducciones (es/en)
├── layouts/             # Layouts base, blog post, docs
├── pages/               # Rutas y páginas
│   ├── authors/         # Páginas de autores
│   ├── blog/            # Listado y posts individuales
│   ├── categories/      # Páginas de categorías
│   ├── docs/            # Documentación
│   ├── og/              # Generación de OG images
│   ├── series/          # Páginas de series
│   └── tags/            # Páginas de tags
├── plugins/             # Plugins remark/rehype propios
└── styles/              # CSS global y temas
```

## Comandos

| Comando | Acción |
|---------|--------|
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción + indexación Pagefind |
| `npm run preview` | Previsualizar build local |
| `npm run check` | Type checking con `astro check` |
| `npm run test` | Tests unitarios (Vitest) |
| `npm run test:e2e` | Tests end-to-end (Playwright) |

## Cómo empezar

### 1. Configuración global

Edita `src/consts.ts` para personalizar:

```ts
export const SITE_TITLE = 'Mi Blog';
export const SITE_DESCRIPTION = 'Descripción de mi sitio';
export const SITE_URL = 'https://midominio.com';

export const NAV_LINKS = [
  { label: 'Inicio', url: '/' },
  { label: 'Blog', url: '/blog' },
  // ...
];

export const SOCIAL_LINKS = [
  { label: 'GitHub', url: 'https://github.com/tuusuario', icon: 'github' },
  { label: 'RSS', url: '/rss.xml', icon: 'rss' },
];

export const GISCUS = {
  repo: 'usuario/repo',
  repoId: '',
  category: 'General',
  categoryId: '',
};
```

### 2. Paleta de colores

La paleta se genera automáticamente desde un color semilla. Ajústalo en `src/config/palette.js`:

```js
export const PALETTE_SEED = '#FF7800'; // Color principal
export const HARMONY = 'tonal';        // tonal | complementary | analogous
```

### 3. Escribir un post

Crea un archivo `.md` o `.mdx` en `src/content/blog/`:

```markdown
---
title: "Título del post"
published: 2026-07-09
description: "Breve descripción"
tags: ["astro", "tutorial"]
categories: ["dev"]
author: ["tu-slug"]
difficulty: beginner
draft: false
pinned: false
series: "nombre-serie"
order: 1
image: "/ruta-a-imagen.jpg"
---

Contenido del post...
```

### 4. Crear una serie

Define la serie en `src/content/series/`:

```yaml
# src/content/series/mi-serie.yaml
title: "Mi Serie"
description: "Descripción de la serie"
author: ["tu-slug"]
chapters:
  - primer-post
  - segundo-post
  - tercer-post
```

### 5. Perfiles de autor

Crea un archivo YAML en `src/content/authors/`:

```yaml
name: "Tu Nombre"
avatar: "/ruta/avatar.jpg"
bio: "Breve biografía"
website: "https://tusitio.com"
github: "https://github.com/tuusuario"
twitter: "https://twitter.com/tuusuario"
```

## Despliegue

El proyecto genera una carpeta `dist/` con HTML estático. Funciona en cualquier plataforma:

| Plataforma | Build command | Output dir |
|------------|--------------|------------|
| Cloudflare Pages | `npm run build` | `dist` |
| Vercel | `npm run build` | `dist` |
| Netlify | `npm run build` | `dist` |
| GitHub Pages | `npm run build` | `dist` |

Node.js >= 22.12.0 requerido.

## Licencia

MIT
