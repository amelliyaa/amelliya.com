import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { gameSchema, postSchema, projectSchema } from "./schemas.js";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: postSchema,
});
const games = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/games" }),
  schema: gameSchema,
});
const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: projectSchema,
});

export const collections = { posts, games, projects };
