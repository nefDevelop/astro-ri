import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).default([]),
			category: z.string().default('uncategorized'),
			draft: z.boolean().default(false),
			readingTime: z
				.object({ text: z.string(), minutes: z.number(), words: z.number() })
				.optional(),
		}),
});

const docs = defineCollection({
	loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			order: z.number().default(0),
			section: z.string().default('general'),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog, docs };
