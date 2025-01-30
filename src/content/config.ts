import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    image: z.string().optional(),
    category: z.string(),
    categoryColor: z.string(),
    author: z.object({
      name: z.string(),
      avatar: z.string(),
    }),
    readingTime: z.number(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};