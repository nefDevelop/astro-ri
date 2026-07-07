---
title: 'Components'
description: 'Available UI components and their usage'
order: 3
section: 'components'
tags: ['ui', 'reference']
---

## PostCard

Unified card for blog listings. Used in home, blog, tags, categories, authors, and series pages.

```astro
<PostCard
  id="my-post"
  title={post.data.title}
  description={post.data.description}
  published={post.data.published}
  image={post.data.image}
  tags={post.data.tags}
  categories={post.data.categories}
  author={post.data.author}
  difficulty={post.data.difficulty}
  pinned={post.data.pinned}
  readingTime="5 min read"
/>
```

### Props

- `id` — post slug
- `title` — post title (appears as heading)
- `description` — preview text, line-clamped to 2 lines
- `published` — date object for formatting
- `image` — optional thumbnail with aspect-ratio placeholder
- `tags` — clickable tag pills linking to `/tags/`
- `categories` — clickable category badge
- `author` — author name linked to `/authors/`
- `difficulty` — colored badge (beginner/intermediate/advanced)
- `pinned` — shows pin icon when true

### Layout

The card uses a flex column with a spacer between description and tags, keeping the bottom meta bar aligned across cards of different heights.

## Pagination

Shared pagination with prev/next and numbered pages:

```astro
<Pagination currentPage={page} lastPage={lastPage} baseUrl="/blog/" />
```

### Usage

Used in blog listing, tags, categories, and authors pages. Supports first page at the base URL and numbered subpages.

## BackToTop

Floating scroll-to-top button. Appears after 300px scroll. Included in `Layout.astro`.

### Behavior

- Alpine.js `x-show` based on scroll position
- Smooth scroll animation
- Respects `prefers-reduced-motion`
- Offset from bottom increased on mobile to avoid overlapping the nav

## ReadingProgress

Scroll progress bar at page top. Auto-hides on short pages. Included in blog post and docs layouts.

```astro
<ReadingProgress />
```

### Visual

- Fixed at top of viewport, 3px height in primary color
- Updates on scroll via `@scroll.window`
- ARIA progressbar with `aria-valuenow`
- Hidden when page content fits within viewport

## ShareButtons

Social sharing and copy-link buttons:

```astro
<ShareButtons title={post.data.title} />
```

### Platforms

- Reddit, Telegram, LinkedIn, Email
- Obsidian (opens `obsidian://new` with markdown link)
- Copy link (URL only, icon-only button)

## SortableTable

Click-to-sort on any `.prose` table header. Works with View Transitions.

### How it works

A delegated click handler on `th` elements sorts the `tbody` rows by column. Click again to toggle ascending/descending.

## FormattedDate

Locale-formatted date display:

```astro
<FormattedDate date={post.data.published} />
```
