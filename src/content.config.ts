import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const repositories = defineCollection({
  loader: glob({ pattern: "*.md", base: "./data/repositories" }),
  schema: z.object({
    title: z.string().nonempty(),
    url: z.string().url(),
    technologies: z.string().array().default([]),
    imagePath: z.string(),
  }),
});

export const collections = {
  "repositories": repositories,
};
