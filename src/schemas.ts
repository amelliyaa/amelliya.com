import { z } from "astro/zod";

const i18nSchema = z.object({
  translationId: z.string(),
  locale: z.string(),
});

export const pageSchema = i18nSchema;

export const postSchema = z
  .object({
    title: z.string(),
    series: z
      .object({
        name: z.string(),
        part: z.number(),
      })
      .optional(),
    description: z.string(),
    published: z.coerce.date(),
    tags: z.array(z.string().toLowerCase()),
    draft: z.boolean().optional(),
  })
  .extend(i18nSchema.shape);

export const gameSchema = z
  .object({
    route: z.string(),
    title: z.string(),
    keyArt: z.object({
      imagePath: z.string(),
      alt: z.string(),
    }),
  })
  .extend(i18nSchema.shape);

export const projectSchema = z
  .object({
    workingTitle: z.string(),
    projectLink: z.string().optional(),
    description: z.string(),
    progress: z.number(),
    pinSize: z.string().optional(),
  })
  .extend(i18nSchema.shape);
