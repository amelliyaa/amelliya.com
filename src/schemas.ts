import { z } from "astro:content";

const i18nSchema = z.object({
  translationId: z.string(),
  locale: z.string(),
});

export const pageSchema = i18nSchema.merge(
  z.object({
    title: z.string(),
    description: z.string(),
  }),
);

export const postSchema = i18nSchema.merge(
  z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    published: z.coerce.date(),
    thumbnail: z.object({
      imagePath: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
);

export const gameSchema = i18nSchema.merge(
  z.object({
    route: z.string(),
    title: z.string(),
    keyArt: z.object({
      imagePath: z.string(),
      alt: z.string(),
    }),
  }),
);

export const projectSchema = i18nSchema.merge(
  z.object({
    workingTitle: z.string(),
    description: z.string(),
    progress: z.number(),
    updated: z.coerce.date(),
    pinSize: z.string().optional(),
  }),
);
