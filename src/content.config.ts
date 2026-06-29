import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		published: z.coerce.date(),
		updated: z.coerce.date().optional(),
		description: z.string(),
		image: z.string().optional(),
		tags: z.array(z.string()).default([]),
		categories: z.array(z.string()).default([]),
		author: z.array(z.string()).default([]),
		difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
		draft: z.boolean().default(false),
		pinned: z.boolean().default(false),
		series: z.string().optional(),
		order: z.number().optional(),
		links: z
			.object({
				website: z.string().optional(),
				github: z.string().optional(),
			})
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
