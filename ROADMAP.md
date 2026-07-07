# Roadmap — Tema Astro **Ri**

> Tema para blog + documentación técnica.
> Inspirado en [Firefly/Mdobs](tmp/) pero con stack más ligero.

## ✅ Completado

### Fase 1 — Base
- [x] Scaffold con `create-astro --template blog` (Astro 7)
- [x] Configuración inicial: `package.json`, `consts.ts`, `astro.config.mjs`
- [x] Paleta de colores generativa con seed color
- [x] Layout principal (header, footer, navegación)
- [x] Estilos globales con Tailwind CSS v4
- [x] Tipografía Atkinson Hyperlegible
- [x] Modo oscuro / claro con persistencia localStorage
- [x] Página de inicio personalizada

### Fase 2 — Contenido y colecciones
- [x] Schema de blog: title, published, description, image, tags, categories, author, difficulty, draft, pinned, series, order, links
- [x] Posts de ejemplo variados (md, mdx, código, imágenes, video, features)
- [x] Colección docs con sidebar de navegación
- [x] Sistema de tags (página de tags + filtrado por tag)
- [x] Página de archive (listado cronológico por año)

### Fase 3 — Features principales
- [x] Code highlighting → astro-expressive-code (line numbers, collapsible sections, copy button)
- [x] Búsqueda → Pagefind (búsqueda estática sin servidor)
- [x] RSS feed → @astrojs/rss
- [x] Sitemap → @astrojs/sitemap
- [x] Paginación en listado de posts
- [x] Open Graph / SEO → imágenes OG dinámicas con Satori
- [x] Tabla de contenidos flotante en posts
- [x] Transiciones de página → View Transitions (ClientRouter)
- [x] KaTeX (fórmulas matemáticas)
- [x] Mermaid (diagramas)
- [x] Callouts / Admonitions (estilo Obsidian)
- [x] Wikilinks estilo Obsidian ([[enlaces]], ==highlight==)
- [x] Tablas ordenables
- [x] Página 404 personalizada
- [x] Página About
- [x] Página Search
- [x] Páginas de categorías: `/categories` y `/categories/[cat]`
- [x] Páginas de autor: `/authors` y `/authors/[slug]`
- [x] Lightbox para imágenes (PhotoSwipe)
- [x] Footer con enlaces sociales configurables desde `consts.ts`
- [x] Image handling: thumbnails en cards de home y blog
- [x] Pinned posts: display prioritario con badge 📌
- [x] Barra de progreso de lectura (Reading Progress Bar) con Alpine.js
- [x] Botones de compartir en redes sociales y "Copiar enlace" con feedback visual
- [x] Estilos de impresión optimizados (@media print) para guardar en PDF o papel
- [x] Persistencia de tema y prevención de parpadeo (FOUC) en View Transitions (astro:after-swap)
- [x] Comentarios → Giscus (GitHub Discussions)
- [x] Sistema multi-autor con colección YAML (avatar, bio, redes)
- [x] Sugerencia de posts similares por tags/categorías
- [x] JSON-LD schema (BlogPosting, Article)
- [x] Series de posts (índice + navegación prev/next)
- [x] Breadcrumbs con schema.org (docs)
- [x] Paginación en tags, categorías y autores
- [x] Componente PostCard unificado con tags y categorías navegables
- [x] UX: skip-to-content, focus-visible, prefers-reduced-motion, aria-expanded, aria-current

## 📋 Pendiente

### Features
- [ ] Google Analytics / GTM
- [ ] Security headers (CSP, HSTS)
- [ ] Config para Netlify / Vercel
- [ ] Soporte multi-idioma (i18n)
- [ ] MDX auto-import de componentes

### Pulido
- [ ] Performance audit (Lighthouse)
- [ ] SEO audit
- [ ] Escribir README.md del tema
- [ ] Publicar como template de Astro

---

## Referencias

- **Firefly theme** → `tmp/` — tema de referencia
- [Astro docs](https://docs.astro.build)
- [Expressive Code](https://expressive-code.com)
- [Pagefind](https://pagefind.app)
- [PhotoSwipe](https://photoswipe.com)
- [Giscus](https://giscus.app)
