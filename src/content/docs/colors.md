---
title: 'Color System'
description: 'How the generative palette works'
order: 2
section: 'guide'
tags: ['palette', 'theming']
---

The entire UI palette derives from a single **seed color** defined in `src/config/palette.js`.

## Harmony Types

| Type | Effect |
|------|--------|
| `tonal` | Subtle variations of the same hue (default) |
| `analogous` | Adjacent hues on the color wheel |
| `triadic` | Three evenly spaced hues |
| `complementary` | Opposite hues |

## Shade Scale

Each color generates a scale from `-0` (black) to `-100` (white):

- `--primary-90` / `--primary-10` — light bg / dark text (used in pills, badges)
- `--primary-80` / `--primary-20` — hover states
- The same pattern applies to `--secondary-*` and `--tertiary-*`

## Dark Mode

Dark mode uses `--dark-bg` and `--dark-card-bg` derived from the seed. Toggle via the sun/moon button in the header — persists in `localStorage`.
