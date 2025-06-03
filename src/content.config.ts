import { defineCollection } from "astro:content";
import { glob, Loader, LoaderContext } from "astro/loaders";
import path from "path";
import { gameSchema, postSchema, projectSchema } from "./schemas.js";

type GlobOptions = Parameters<typeof glob>[0];

/**
 * An extension for Astro's glob loader that adds better i18n support.
 * - translationId: the filename of the content entry without the included locale directory
 * - locale: the locale associated with the content entry
 * @param options Options for the default Astro glob loader (https://docs.astro.build/en/reference/content-loader-reference/#glob-loader)
 */
const i18nLoader = (options: GlobOptions): Loader => {
  const loader = glob(options);
  return {
    name: "i18n-loader",
    load: async (context: LoaderContext) => {
      const parseData = context.parseData;
      context.parseData = (props) => {
        if (!props.filePath) return parseData(props);

        const { name: translationId, dir } = path.parse(props.filePath);
        const locale = dir.split(path.sep).pop();

        return parseData({ ...props, data: { ...props.data, translationId, locale } });
      };

      await loader.load(context);
    },
  };
};

const posts = defineCollection({
  loader: i18nLoader({
    pattern: "**/*.mdx",
    base: "./src/content/posts",
  }),
  schema: postSchema,
});
const games = defineCollection({
  loader: i18nLoader({
    pattern: "**/*.json",
    base: "./src/content/games",
  }),
  schema: gameSchema,
});
const projects = defineCollection({
  loader: i18nLoader({
    pattern: "**/*.json",
    base: "./src/content/projects",
  }),
  schema: projectSchema,
});

export const collections = { posts, games, projects };
