---
title: 'Video Embeds — Multimedia en el Blog'
published: 2026-06-29
description: 'Ejemplos de contenido multimedia: videos embebidos de YouTube, HTML5 video, y audio'
tags: ['video', 'multimedia', 'embed']
categories: ['media']
author: ['ri']
difficulty: 'beginner'
---

## YouTube Embed

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full aspect-video rounded-lg"></iframe>

## Video Responsive

Para iframes responsivos, usa la clase `aspect-video` de Tailwind:

```html
<iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube"
  class="w-full aspect-video rounded-lg"
  allowfullscreen
></iframe>
```

## HTML5 Video Tag

<video controls class="w-full rounded-lg">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## Video con caption

<figure>
  <video controls class="w-full rounded-lg">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
  </video>
  <figcaption>Video de demostración — Big Buck Bunny</figcaption>
</figure>

## Audio Embed

<audio controls class="w-full">
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>

Los elementos `<video>`, `<audio>` e `<iframe>` se renderizan sin interferencia del pipeline de markdown gracias al plugin `rehype-figure` que preserva el HTML nativo.
