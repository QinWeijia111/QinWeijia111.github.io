import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const detailSection = z.object({
  heading: z.string(),
  description: z.string().optional(),
  layout: z.enum(['flow', 'cards']),
  items: z
    .array(
      z.object({
        label: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        url: z.url().optional(),
      }),
    )
    .min(1),
});

const architectureDiagram = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  src: z.string().startsWith('/images/'),
  alt: z.string(),
  title: z.string(),
  description: z.string(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.string(),
    order: z.number().int(),
    summary: z.string(),
    ownership: z.string(),
    myRole: z.string(),
    status: z.string(),
    poster: z.string().startsWith('/images/'),
    posterAlt: z.string(),
    detailSections: z.array(detailSection).default([]),
    evolution: detailSection.optional(),
    crossProject: z
      .object({
        project: reference('projects'),
        heading: z.string(),
        description: z.string(),
      })
      .optional(),
    technologies: z.array(z.string()),
    highlights: z.array(z.string()),
    metrics: z
      .array(
        z.object({ value: z.string(), label: z.string(), context: z.string() }),
      )
      .default([]),
    demo: z
      .object({
        status: z.enum(['needs-human-review', 'approved', 'not-applicable']),
        note: z.string(),
        src: z.string().startsWith('/videos/').optional(),
        captions: z.string().startsWith('/videos/').optional(),
        stages: z.array(z.string()).optional(),
        poster: z.string().startsWith('/images/').optional(),
      })
      .refine(
        (demo) =>
          demo.status !== 'approved' || Boolean(demo.src && demo.captions),
        { message: 'Approved demos require video and captions.' },
      )
      .refine((demo) => demo.status === 'approved' || !demo.src, {
        message: 'Unreviewed videos cannot have a public source.',
      }),
    links: z.array(z.object({ label: z.string(), url: z.url() })),
    architecture: z.array(z.string()).optional(),
    architectureNote: z.string().optional(),
    architectureDiagrams: z.array(architectureDiagram).default([]),
    resultNote: z.string(),
  }),
});
export const collections = { projects };
