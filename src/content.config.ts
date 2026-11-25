import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const DOMAINS = [
  'frontend',
  'backend',
  'qa',
  'cybersecurity',
  'data',
  'devops',
  'career',
  'general',
] as const;

export const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

/**
 * Tutorialele stau in `src/content/tutorials/<limba>/<serie>/<NN-nume>.md`.
 * Limba si seria se deduc din calea fisierului, iar `series` si `order`
 * din frontmatter controleaza afisarea si ordinea lectiilor.
 */
const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tutorials' }),
  schema: z.object({
    title: z.string().min(3),
    description: z.string().min(10).max(160),
    domain: z.enum(DOMAINS),
    level: z.enum(LEVELS),
    series: z.string(),
    order: z.number().int().positive(),
    durationMin: z.number().int().positive().optional(),
    // Link YouTube (watch, youtu.be sau embed). Optional: un tutorial poate fi doar text.
    videoUrl: z.url().optional(),
    author: z.string().optional(),
    updated: z.coerce.date().optional(),
    // Lectia marcata ca proiect final apare intr-un card separat, la finalul seriei.
    isProject: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { tutorials };
