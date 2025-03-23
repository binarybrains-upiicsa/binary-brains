import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const repositories = defineCollection({
  loader: glob({ pattern: "*.md", base: "./data/repositories" }),
  schema: z.object({
    title: z.string().nonempty(),
    link: z.string().url(),
    technologies: z.string().array().default([]),
    imagePath: z.string().nonempty(),
  }),
});

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const events = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./data/events" }),
  schema: z.object({
    title: z.string().nonempty(),
    link: z.string().url(),
    address: z.string().nonempty(),
    eventDates: z.array(z.object({
      date: z.string().date(),
      start: z.string().regex(timeRegex, "Invalid time format. Use HH:MM"),
      end: z.string().regex(timeRegex, "Invalid time format. Use HH:MM"),
    })),
    imagePath: z.string().nonempty(),
  }),
});

export const collections = {
  "repositories": repositories,
  "events": events,
};
