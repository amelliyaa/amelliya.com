import { defineCollection } from "astro:content";
import { gameSchema, postSchema, projectSchema } from "../schemas.js";

const blogCollection = defineCollection({
  type: "content",
  schema: postSchema,
});
const gameCollection = defineCollection({
  type: "data",
  schema: gameSchema,
});
const projectCollection = defineCollection({
  type: "data",
  schema: projectSchema,
});

export const collections = {
  blog: blogCollection,
  game: gameCollection,
  project: projectCollection,
};
