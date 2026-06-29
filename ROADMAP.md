# Roadmap — Tema Astro **Ri**

> Tema para blog + documentación técnica.
> Inspirado en [Firefly/Mdobs](tmp/) pero con stack más ligero.

## Fase 1 — Base

- [x] Scaffold con `create-astro --template blog` (Astro 7)
- [x] Renombrar proyecto a `ri`
- [x] Configuración inicial: `package.json`, `consts.ts`, `astro.config.mjs`
- [x] Verificar que `npm run dev` funciona

## Fase 2 — Personalización del tema base

- [ ] Definir paleta de colores y variables CSS
- [ ] Diseñar layout principal (header, footer, navegación)
- [ ] Estilos globales (`src/styles/global.css`)
- [ ] Configurar tipografía (sistema de fuentes)
- [ ] Modo oscuro / claro
- [ ] Página de inicio personalizada

## Fase 3 — Contenido y colecciones

- [ ] Schema de blog con: título, descripción, fecha, tags, categoría, imagen
- [ ] Posts de ejemplo variados (markdown, mdx, con código, imágenes)
- [ ] Sistema de tags (página de tags, filtrado)
- [ ] Colección `docs` para documentación técnica
- [ ] Layout de documentación con sidebar de navegación
- [ ] Página de archive (listado cronológico)

## Fase 4 — Features principales

- [ ] **Code highlighting** → `astro-expressive-code`
  - Lenguaje badges, line numbers, collapsible sections
- [ ] **Búsqueda** → Pagefind (búsqueda estática sin servidor)
- [ ] **RSS feed** → `@astrojs/rss` (ya incluido)
- [ ] **Sitemap** → `@astrojs/sitemap` (ya incluido)
- [ ] **Paginación** en listado de posts
- [ ] **Open Graph / SEO** → imágenes OG dinámicas
- [ ] **Tabla de contenidos** flotante en posts
- [ ] **Transiciones de página** → View Transitions (nativas de Astro)

## Fase 5 — Widgets y extras

- [ ] Widgets de sidebar: perfil, tags, categorías, stats
- [ ] Comentarios → Giscus (GitHub Discussions)
- [ ] Imágenes: lightbox (PhotoSwipe o Fancybox)
- [ ] Soporte para KaTeX (matemáticas)
- [ ] Soporte para Mermaid (diagramas)
- [ ] Páginas: about, 404
- [ ] Footer con enlaces sociales

## Fase 6 — Pulido y producción

- [ ] Responsive design (mobile-first)
- [ ] Performance audit (Lighthouse)
- [ ] SEO audit
- [ ] Escribir `README.md` del tema
- [ ] Publicar como template de Astro

---

## Referencias

- **Firefly theme** → `tmp/` — tema de referencia para ideas de implementación
- [Astro docs](https://docs.astro.build)
- [Expressive Code](https://expressive-code.com)
- [Pagefind](https://pagefind.app)
