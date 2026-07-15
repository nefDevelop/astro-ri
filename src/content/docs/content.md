---
title: 'Content & Collections'
description: 'How to create blog posts, docs, authors, and series'
order: 5
section: 'guide'
tags: ['content', 'collections']
---

## Blog Posts

Create `.md` or `.mdx` files in `src/content/blog/`:

```yaml
---
title: 'My Post'
published: 2026-07-01
description: 'Post description'
image: '/assets/image.jpg'       # optional
tags: ['astro', 'tutorial']
categories: ['dev']
author: ['ri']                    # slug from authors collection
difficulty: 'beginner'            # beginner, intermediate, advanced
draft: false
pinned: false
series: 'intro-astro'              # optional, slug from series collection
order: 1                           # chapter order within series
downloads:                         # optional, files for download
  - id: button-astro
    label: 'Componente Button.astro'
    url: 'https://raw.githubusercontent.com/user/repo/main/Button.astro'
---
```

## Docs

Create `.md` or `.mdx` files in `src/content/docs/`:

```yaml
---
title: 'Page Title'
description: 'Page description'
order: 1
section: 'guide'                  # groups pages in sidebar
updatedDate: 2026-07-01           # optional, shown on page
---
```

## Authors

Create `.yaml` files in `src/content/authors/`:

```yaml
name: Ri
avatar: /assets/avatar.jpg        # optional
bio: 'Theme creator.'             # optional
github: https://github.com/ri     # optional
website: https://ri.pages.dev     # optional
```

The filename becomes the slug (e.g., `ri.yaml` → `/authors/ri/`).

## Series

Create `.yaml` files in `src/content/series/`:

```yaml
title: Introducción a Astro
description: 'Learn Astro step by step.'
cover: /assets/series.jpg         # optional
author: ['ri']                    # optional
chapters:                         # blog post slugs in order
  - post-one
  - post-two
  - post-three
```

The filename becomes the slug (e.g., `intro-astro.yaml` → `/series/intro-astro/`).

Blog posts reference series via the `series` field using the same slug.
