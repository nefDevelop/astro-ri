---
title: 'Getting Started'
description: 'How to set up and configure Ri'
pubDate: 2026-06-01
updatedDate: 2026-07-01
order: 1
section: 'guide'
tags: ['setup', 'configuration']
---

## Quick Start

```bash
npm create astro@latest -- --template ri
cd ri
npm run dev
```

Your site will be available at `http://localhost:4321`.

### Requirements

- Node.js 22+
- npm, pnpm, or yarn

### Project initialization

The template includes all the core features pre-configured: blog collections, documentation layout, generative color system, search, and more.

## Project Structure

```
src/
├── components/       # UI components
│   ├── icons/        # SVG icon components
│   └── widgets/      # Sidebar widgets
├── config/           # Color palette generator
├── content/          # Content collections
│   ├── authors/      # Author profiles (YAML)
│   ├── blog/         # Blog posts (MD/MDX)
│   ├── docs/         # Documentation pages (MD/MDX)
│   └── series/       # Book-like series (YAML)
├── layouts/          # Page layouts
├── pages/            # Route pages
├── plugins/          # Remark/Rehype plugins
├── styles/           # CSS
└── consts.ts         # Global configuration
```

### Key directories

The `src/content/` folder holds all your content. Each subfolder is a collection with its own schema defined in `src/content.config.ts`.

The `src/components/` folder contains reusable Astro components. Widgets for the sidebar live in `src/components/widgets/`.

## Global Configuration

All site settings in `src/consts.ts`:

```ts
export const SITE_TITLE = 'Ri';
export const SITE_DESCRIPTION = 'Un tema de Astro para blog y documentación';
export const SITE_URL = 'https://ri.pages.dev';

export const NAV_LINKS = [
  { label: 'Home', url: '/' },
  { label: 'Blog', url: '/blog' },
  { label: 'Docs', url: '/docs' },
  { label: 'Search', url: '/search' },
];

export const SOCIAL_LINKS = [
  { label: 'GitHub', url: 'https://github.com', icon: 'github' },
  { label: 'RSS', url: '/rss.xml', icon: 'rss' },
];
```

### Navigation links

`NAV_LINKS` drives the header menu. Add or remove items to customize your navigation.

### Social links

`SOCIAL_LINKS` appears in the footer. Each entry needs a label, url, and matching icon component in `src/components/icons/`.

## Color System

Edit `src/config/palette.js`:

```js
export const PALETTE_SEED = '#FF7800';
export const HARMONY = 'tonal';
```

### Harmony types

- **tonal**: subtle variations of the same hue
- **analogous**: adjacent hues on the color wheel
- **triadic**: three evenly spaced hues
- **complementary**: opposite hues

### Shade scale

Each color generates a scale from `-0` (black) to `-100` (white). Used throughout the UI for pills, badges, and accents.
