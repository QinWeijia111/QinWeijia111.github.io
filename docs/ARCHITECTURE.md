# Architecture

## Static content pipeline

Markdown project files → Astro Content Collection + Zod schema → typed cards and detail routes → static HTML/CSS/assets → official GitHub Pages artifact.

`src/content.config.ts` loads `src/content/projects/*.{md,mdx}` with Astro’s glob loader. Every project owns title, ordering, summaries, role, evidence, technology names, links, poster and media approval state. Markdown owns the narrative sections. `src/data/profile.ts` owns the public biography, education and honors. UI components contain presentation labels, not project claims.

## Presentation

`Layout.astro` supplies metadata, canonical links, social image, semantic navigation and footer. `ProjectCard.astro` renders selected work. `ProjectSection.astro` renders schema-driven narrative cards and ordered workflow steps. Project references are typed collection references; previous/next navigation follows collection order. Demo stages and optional future approved posters live in the same Markdown metadata. `[id].astro` statically enumerates collection entries. `Demo.astro` renders either a clear review notice or an approved native video player; a source cannot be assigned to an unapproved demo. MDX is available without adding a client framework.

Tailwind v4 is integrated through its Vite plugin. Prose is capped at 780px inside the 960px detail layout; media and flows retain full width. Supporting text is at least 12px and Chinese headings use relaxed letter spacing. Small composition utilities work alongside the token-based shared stylesheet. System fonts avoid network fonts and late layout shifts. A monochrome/warm-gray system with forest-green accent supports readable light/dark themes. Original SVG concept diagrams expose no customer data.

## Client runtime

Theme selection and the native architecture-image dialog use small client scripts. A tiny head script applies saved/system preference before paint. Storage failure is handled; CSS supplies a system fallback. Without JavaScript, all content and navigation remain available, and the theme button is hidden. The image viewer stays on the project page, closes through its button, backdrop or Escape, and restores focus and page scrolling. Without JavaScript, the original PNG link remains available in a separate tab. No analytics, remote font requests, client router, hydration framework or autoplay video.

## Routes and assets

- `/`: seven-section homepage.
- `/projects/newrevit/`, `/projects/pirevit/`, `/projects/multica-learning/`: project detail pages.
- `/404.html`: GitHub Pages custom error document, marked noindex.
- `/sitemap-index.xml`, `/sitemap-0.xml`, `/robots.txt`: discovery.
- `/images/og.png`, `/favicon.svg`: social and identity assets.

The production origin is the user Pages root. No `base` is configured. Root-relative assets and absolute canonical/social URLs avoid subpath errors.

## Verification boundaries

Astro validates schema at build time. Unit tests enforce meaningful content/privacy invariants. The post-build check resolves all local links, anchors and assets and checks SEO, media and resume exclusions. Browser tests cover three widths, both color modes, axe accessibility, keyboard navigation, theme persistence and 404. Lighthouse has 95 minimum budgets for performance/accessibility/SEO. External link checks are recorded separately: upstream status can change without a source edit.

See CONTENT_BOUNDARY for disclosure policy and DEPLOYMENT for operational steps; neither is duplicated here.
