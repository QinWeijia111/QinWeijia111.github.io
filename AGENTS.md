# Agent instructions

## Project Mission

Present Qin Weijia’s Agent Systems engineering through three evidence-backed projects. Keep the site fast, accessible and safe to publish. Target Agent Engineer / Agent algorithms / LLM application internships.

## Repository Map

- `src/content/projects/`: project facts, results, demo approval state and external links.
- `src/content.config.ts`: build-time project schema.
- `src/data/profile.ts`: owner-approved public profile.
- `src/components/`, `src/layouts/`, `src/pages/`: presentation and routes.
- `src/styles/global.css`: shared theme and responsive design.
- `public/`: publishable assets only. Every file is copied to the public site.
- `scripts/`: production artifact checks.
- `tests/`: content policy and browser verification.
- `docs/`: architecture, publication boundaries, deployment and validation evidence.

## Source of Truth

Project Markdown owns all project facts. Do not hardcode project facts in components. Schema owns the content contract. Owner instructions override source notes; do not import raw source material or private archives. Current public scope is recorded in `docs/CONTENT_BOUNDARY.md`.

## Content Ownership

Only the human owner approves new claims, metrics, project screenshots and demo releases. NewRevit / PiRevit are built from zero by the owner; PiRevit integrates Pi RPC and does not implement Pi Agent Core. Multica Learning researches upstream Multica, with M01–M06 completed.

## Privacy Boundary

Read `docs/CONTENT_BOUNDARY.md` before adding media or facts. No public PDF/DOCX resume: the owner explicitly prohibited it. Do not publish personal phone numbers, private source, schemas, prompts, Skills bodies, family identifiers, customer assets or internal paths. Unreviewed video sources must remain absent from collection metadata. `.review/` is ignored local-only material and must never enter `public/`, Git history or CI artifacts.

## Coding Rules

Use static Astro, TypeScript, Tailwind utilities and shared CSS. Prefer semantic HTML, native links and native video. Keep browser JavaScript limited to theme selection and the native architecture-image dialog; do not add client frameworks. Support keyboard navigation, reduced motion and both color themes. Use root paths for this user Pages site. Do not introduce frameworks, telemetry or third-party client scripts without a clear requirement.

## Validation

Run `npm ci`, `npm run format/check`, `npm run lint`, `npm run check`, `npm test`, `npm run build`. Build includes internal link, asset, anchor, privacy and metadata checks. Run `npm run test:browser` for responsive/theme changes and `npm run audit` for performance changes. Never equate a successful build with complete visual or privacy verification. Record observed limits in `docs/VALIDATION.md`.

## CI/CD

`ci.yml` validates PRs and main, including Chromium/axe and Lighthouse. `deploy-pages.yml` builds and deploys main with official Pages Actions. CI on pull requests has read-only repository permission. Do not run untrusted PR content with write credentials.

## Deployment

Production origin is `https://qinweijia111.github.io`; no project subpath base. See `docs/DEPLOYMENT.md` for Pages settings and verification. Do not publish to another host or enable automatic merging.

## Human Review Gate

Work on feature branches; commit, push and open a PR. Agents must not merge or approve their own PR. Human merge is the publication gate. The owner explicitly approved the supplied joint demo on 2026-10-20. Its approved derivative and Chinese scene guide are public; future media require fresh owner review. An incomplete privacy review is a real release limit, not a task to bypass. Never reintroduce public resume downloads without new explicit authorization.
