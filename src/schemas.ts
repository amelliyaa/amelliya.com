import { z } from "astro:content";

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  updated: z.date(),
  published: z.date(),
  thumbnail: z.object({
    imagePath: z.string(),
    alt: z.string(),
  }),
  tags: z.array(z.string()),
  draft: z.boolean().optional(),
});

export const gameSchema = z.object({
  route: z.string(),
  title: z.string(),
  keyArt: z.object({
    imagePath: z.string(),
    alt: z.string(),
  }),
});

export const projectSchema = z.object({
  workingTitle: z.string(),
  description: z.string(),
  progress: z.number(),
  updated: z.coerce.date(),
  pinSize: z.string().optional(),
});
