export const SITE_TITLE = 'Ri';
export const SITE_DESCRIPTION = 'Un tema de Astro para blog y documentación';
export const SITE_URL = 'https://ri.pages.dev';

export const NAV_LINKS = [
	{ label: 'Home', url: '/' },
	{ label: 'Blog', url: '/blog' },
	{ label: 'Docs', url: '/docs' },
	{ label: 'Tags', url: '/tags' },
	{ label: 'Categories', url: '/categories' },
	{ label: 'Archive', url: '/archive' },
	{ label: 'About', url: '/about' },
] as const;

export const SOCIAL_LINKS: { label: string; url: string; icon: string }[] = [
	{ label: 'GitHub', url: 'https://github.com', icon: 'github' },
	{ label: 'RSS', url: '/rss.xml', icon: 'rss' },
];

export const SUPPORT_LINKS = [
	{ label: 'Buy me a coffee', url: 'https://buymeacoffee.com', icon: 'coffee' },
	{ label: 'GitHub Sponsor', url: 'https://github.com/sponsors', icon: 'heart' },
];

export const SIDEBAR_WIDGETS = {
	docs: ['toc', 'categories', 'doc-tags'],
	blog: ['toc', 'author', 'calendar', 'tags'],
	post: ['toc', 'author', 'calendar'],
} as const;

export const TAG_DESCRIPTIONS: Record<string, string> = {
	test: 'Posts de prueba y experimentos con el tema.',
	code: 'Ejemplos de código en múltiples lenguajes.',
	markdown: 'Características y sintaxis de Markdown.',
	math: 'Contenido matemático con KaTeX.',
	mermaid: 'Diagramas y gráficos con Mermaid.',
	guide: 'Guías y tutoriales paso a paso.',
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
	dev: 'Desarrollo de software y programación.',
	design: 'Diseño UI/UX y recursos visuales.',
	guide: 'Guías y tutoriales.',
	media: 'Contenido multimedia y vídeos.',
};

export const GISCUS = {
	repo: 'nef734/astro-ri',
	repoId: '',
	category: 'General',
	categoryId: '',
};
