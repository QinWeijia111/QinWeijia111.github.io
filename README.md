# Qin Weijia · Agent Systems

A personal technical portfolio for 秦维嘉, a Computer Science master’s student at Harbin Engineering University. Three ongoing projects show the progression from domain tools to desktop runtime integration and source-verified research.

**Target website:** https://qinweijia111.github.io/ — published after human review and merge, followed by a successful Pages deployment.

## Selected work

- **NewRevit** — BIM domain Agent system built from zero; public results and scoped regression evidence.
- **PiRevit** — Revit Agent Runtime & Desktop Workbench built from zero on Pi RPC. Pi provides Agent Core.
- **Multica Learning** — source-verified Agent Runtime research and Agentic Workflow; M01–M06. [Read online](https://qinweijia111.github.io/multica-learning/).

## Run locally

Requires Node 24.16+ and npm.

```sh
npm ci
npm run dev
```

## Verify

```sh
npm run format/check
npm run lint
npm run check
npm test
npm run build
npm run test:browser
npm run audit
```

Browser tests use Chrome; install once with `npx playwright install --with-deps chrome` if unavailable. Build includes local links, assets, SEO and privacy checks. CI also runs browser accessibility tests and Lighthouse budgets. See [validation evidence](docs/VALIDATION.md) for measured results and limits.

## Update content

Edit project Markdown in `src/content/projects/`; metadata is validated by `src/content.config.ts`. Edit the public biography in `src/data/profile.ts`. Reusable components do not own project facts.

The owner prohibits public resume downloads: use the email-based **Request Resume** action. The owner approved the joint engineering demo for public viewing. Both detail pages include its 720p H.264 derivative with controls, metadata preloading, original on-screen text and a Chinese scene guide; homepage cards use original abstract concept diagrams. Source recordings, PDF/DOCX resumes, private project code and internal material must never be committed.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): content, rendering and runtime design.
- [Content boundary](docs/CONTENT_BOUNDARY.md): what may be public and the media release checklist.
- [Deployment](docs/DEPLOYMENT.md): Pages setup, release and rollback.
- [Agent instructions](AGENTS.md): rules for coding agents.
- [Roadmap](ROADMAP.md): outstanding gates and next steps.
- [Changelog](CHANGELOG.md): release history.

## Design references

Information architecture was informed by [folio](https://github.com/rhyswdev/folio) and [Astro Portfolio Template](https://github.com/floating-astronaut/astro-portfolio-template). The implementation, visual system and concept diagrams were created for this portfolio; no template code or media was copied.

No analytics, cookies, remote fonts, backend or client framework is required. Only the theme toggle uses client JavaScript.
