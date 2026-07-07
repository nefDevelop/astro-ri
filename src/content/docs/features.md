---
title: 'Features'
description: 'Series, widgets, comments, backlinks, and more'
order: 6
section: 'features'
tags: ['widgets', 'comments', 'seo']
---

## Series (Book Chapters)

Series group blog posts into ordered chapters with a cover, progress bar, and navigation.

**How it works:**
1. Create a series entry in `src/content/series/` with a `chapters` list of blog post slugs
2. Each blog post in the series has `series: 'series-slug'` and `order: N` in its frontmatter
3. The series page shows cover, chapter list with reading time, and progress
4. Sidebar WidgetSeries shows chapter numbers with ✓ completed / current / pending states
5. Blog posts display "Chapter X of Y" badge above the title

**Nav links:** prev/next chapter navigation appears automatically below post content.

## Sidebar Widgets

Configurable widgets for docs and blog sidebars. Set in `src/consts.ts`:

```ts
export const SIDEBAR_WIDGETS = {
  docs: ['toc', 'stats', 'categories', 'tags'],
  blog: ['toc', 'author', 'tags', 'featured', 'social', 'series'],
};
```

Available widgets:

| Widget | Description |
|--------|-------------|
| `toc` | On-page table of contents (Alpine.js, active heading tracking) |
| `tags` | Top 8 tags with post count |
| `stats` | Posts, docs, tags, sections counts |
| `author` | Current author avatar, bio, social links |
| `recent` | Last 3 posts |
| `categories` | Categories with post count |
| `archive` | Monthly archive |
| `social` | Social follow buttons |
| `series` | Current series chapter navigation |
| `featured` | Latest pinned post |

## Giscus Comments

Comments via GitHub Discussions. Configure in `src/consts.ts`:

```ts
export const GISCUS = {
  repo: 'user/repo',
  repoId: 'R_kg...',        // from giscus.app
  category: 'General',
  categoryId: 'DIC_...',    // from giscus.app
};
```

Get your `repoId` and `categoryId` at https://giscus.app.

## Related Posts

Shown at the bottom of each blog post. Computed automatically from shared tags and categories. Up to 3 posts displayed.

## Backlinks

Posts that link to the current post via `[[wikilinks]]` are listed below related posts. Uses the `remark-obsidian` plugin for wiki-style `[[slug]]` and `[[slug|text]]` syntax.

## Tag & Category Descriptions

Add descriptions in `src/consts.ts`:

```ts
export const TAG_DESCRIPTIONS = {
  astro: 'Posts about Astro framework.',
};

export const CATEGORY_DESCRIPTIONS = {
  dev: 'Development and programming.',
};
```

## JSON-LD Schema

Each blog post includes `BlogPosting` structured data with:
- headline, description, datePublished, dateModified
- author (Person), publisher (Organization)
- image, url

## Anchor Links

Headings in `.prose` content show a `#` link icon on hover for direct section linking.

## Search

Static search via Pagefind. Access at `/search/` or with `Ctrl+K` keyboard shortcut. Input auto-focuses on page load.
