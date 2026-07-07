---
title: 'Image Gallery — Visual Showcase'
published: 2026-06-28
description: 'Demostración de imágenes responsive en el tema Ri, con galerías, captions y alineación'
tags: ['images', 'gallery', 'design']
categories: ['design']
author: ['ri', 'colaborador']
difficulty: 'beginner'
series: 'ejemplo-avanzado'
order: 1
---

## Imagen simple

![Paisaje montañoso](/assets/blog-placeholder-1.jpg)

## Imagen con caption

<figure>
  <img src="/assets/blog-placeholder-2.jpg" alt="Atardecer en la costa" />
  <figcaption>Atardecer en la costa oeste — Fotografía de ejemplo</figcaption>
</figure>

## Galería de dos columnas

<div class="grid grid-cols-2 gap-4 not-prose">
  <img src="/assets/blog-placeholder-3.jpg" alt="Bosque" class="rounded-lg" />
  <img src="/assets/blog-placeholder-4.jpg" alt="Río" class="rounded-lg" />
</div>

## Galería de tres columnas

<div class="grid grid-cols-3 gap-3 not-prose">
  <img src="/assets/blog-placeholder-5.jpg" alt="Montaña 1" class="rounded-lg" />
  <img src="/assets/blog-placeholder-1.jpg" alt="Montaña 2" class="rounded-lg" />
  <img src="/assets/blog-placeholder-2.jpg" alt="Montaña 3" class="rounded-lg" />
</div>

## Imagen alineada a la izquierda con texto

<img src="/assets/blog-placeholder-3.jpg" alt="Ejemplo" class="float-left mr-4 mb-2 w-48 rounded-lg" />

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Hero image

La imagen destacada de un post (heroImage) se renderiza automáticamente en la cabecera del artículo usando el componente `Image` de Astro con optimizaciones automáticas.
