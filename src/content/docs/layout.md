---
title: 'Layout System'
description: 'Layout structure, navigation, and responsive behavior'
order: 4
section: 'components'
tags: ['layout', 'navigation']
---

## Structure

```
<body>
  <SkipLink />           ← keyboard-first skip to content
  <Header />              ← nav + dark mode toggle
  <main id="main-content">
    <slot />              ← page content
  </main>
  <BackToTop />           ← floating scroll-to-top
  <Footer />              ← social links + copyright
</body>
```

### Skip link

The first focusable element on the page. Hidden by default, visible when focused via keyboard tab.

### Main content

Wraps page content with `transition:animate="fade"` for smooth View Transitions between pages.

## Header Navigation

Nav links driven by `NAV_LINKS` in `src/consts.ts`. Each link uses `HeaderLink.astro` with `aria-current="page"` active detection.

### Desktop vs mobile

- Desktop (`≥ md`): horizontal nav, sticky at top
- Mobile (`< md`): bottom-anchored bar, hamburger menu opens upward

### Active link

The `HeaderLink` component compares the link's `href` with the current pathname and applies an active state class and `aria-current="page"`.

## Mobile Menu

- Opens with Alpine.js `x-show`
- Closes on Escape key or click outside
- `aria-expanded` and `aria-controls` for accessibility
- Animated with `x-transition:enter/leave` (fade + translate)

## Dark Mode Toggle

- `aria-pressed` reflects current state
- `aria-live` region announces mode to screen readers
- Persistent via `localStorage`

### Theme persistence

A script in `BaseHead.astro` applies the stored theme before the first paint, preventing FOUC. On View Transitions, the theme is applied via `astro:before-swap` to avoid flash during crossfade.

## Skip Link

First focusable element — visible on keyboard tab, hidden otherwise. Targets `#main-content` on the `<main>` element.
