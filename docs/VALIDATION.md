# Validation evidence

Local validation date: 2026-10-20 (Asia/Shanghai). Node 24.19.0, macOS, installed Google Chrome. This records observed results, not a claim that GitHub Pages is already deployed.

## Required checks

- `npm ci`: clean lockfile installation passed; zero dependency audit findings after replacing the legacy audit toolchain with current Lighthouse.
- `npm run format/check`: passed.
- `npm run lint`: passed.
- `npm run check`: passed, zero errors/warnings/hints.
- `npm test`: 5 meaningful content/privacy tests passed.
- `npm run build`: passed; 5 static pages. Post-build validation resolves local page links, fragments and assets, validates root-origin metadata, rejects public resumes/private archives and enforces video contracts.

## Browser checks

`npm run test:browser`: 12 passed. Home and all three project routes tested at 1440×1000, 768×1024, 390×844 and 320×812, in light and dark system color modes. No horizontal overflow, and axe reported zero violations across these routes and modes. Screenshots were visually inspected for desktop, tablet and mobile layouts, including project results and demo sections.

Readability checks require visible supporting text to be at least 12px and Markdown content to remain no wider than 780px. Reciprocal project links and next-project navigation were exercised; all six external module URLs returned HTTP 200.

Additional checks covered keyboard skip navigation, reduced motion, theme persistence after reload, an unknown path returning HTTP 404 with the custom page, and return-home navigation. Public PDF/DOCX links are absent; the resume action uses email as required by the owner.

The approved joint MP4 loaded metadata, played, advanced time, sought to 120 s and loaded Chinese scene-guide cues in Chrome. The entire compressed recording decoded without errors. Both project pages reference one shared MP4, controls, poster, metadata preloading and a VTT track. No page has autoplay; homepage cards load images only. The supplied original is HEVC 1080p; the published derivative is H.264 720p, 3,963,552 bytes, approximately 142.4 seconds, no audio. This is a 90% size reduction from 39,305,523 bytes, not a new privacy audit.

## Lighthouse

`npm run audit`, local mobile Lighthouse 13.5.0; one run per page. This is a laboratory measurement, not a production/field guarantee.

| Page     | Performance | Accessibility | Best Practices | SEO |
| -------- | ----------- | ------------- | -------------- | --- |
| Home     | 100         | 100           | 100            | 100 |
| NewRevit | 100         | 100           | 100            | 100 |

HTML/JSON reports are saved in ignored `.lighthouseci/reports/`; CI uploads corresponding reports. PR budgets require at least 95 in Performance, Accessibility and SEO. PiRevit and Multica Learning share the layout but do not have individually measured Lighthouse scores.

## Links, SEO and deployment path

- Public profile, public Multica repository and learning site verified accessible. Learning site returned HTTP 200.
- Every internal page, navigation fragment, asset, video and VTT path checked against generated output.
- Canonical URLs use `https://qinweijia111.github.io`; root-relative assets, no project subpath base.
- Title, description, Open Graph/Twitter image, 1200×630 PNG, favicon, sitemap and robots present. 404 is noindex and excluded from sitemap.
- Both provided template references were inspected for architecture/design inspiration; no code or template assets were copied.

## Review and limits

- Manual source/diff review covered claim ownership, Pi Core attribution, scoped NewRevit metrics, absence of private source/assets, media authorization, CI permissions and main-only deployment.
- The owner forbids public PDF downloads. No resume or telephone number is present in public assets.
- The owner explicitly authorized public viewing of the joint video. This is recorded in CONTENT_BOUNDARY with the exact published derivative checksum. Final edited video and scene-guide phrasing remain available for human review in the PR.
- Public production deployment, production HTTP status, social-card crawler behavior and real device Safari/iOS playback remain unverified until a human merges and the Pages workflow succeeds. Chromium emulation is not a physical-device test.
- The feature branch must not be merged by an agent. Deployment URL remains a target until the first successful main workflow is observed.

## PR #1 review revision

The seven requested commands were rerun after the typography/narrative changes: format/check, lint, check, test, build, test:browser and audit. No new CI tools or dependencies were added. Both measured Lighthouse pages retained 100 in all four categories.

The system font stack removes the unused Inter preference; Chinese headings use -0.01em spacing. Body/prose is 17px, card copy 15px, highlights 14px, ownership/meta/metric labels 13px, and supporting text at least 12px. Media, metrics and flows retain the outer detail width while prose is capped at 780px.

Agent visual inspection covered Desktop/Mobile project cards, prose line width, task journeys, module cards, metrics, demo guidance, architecture wrapping and related-project links. Review captures are in [the screenshot index](review/pr1-readability/README.md). These captures show webpage text and concept posters only; no new real Revit screenshot was published. The real screenshot poster enhancement is deferred for separate human approval.

The owner’s final visual/content acceptance remains pending. Automated checks and agent screenshot inspection do not substitute for that human review. PR #1 remains open and must not be merged by an agent.

## PNG architecture and return navigation — 2026-10-24

The owner accepted the generated PNG and requested that enlargement always offer a clear way back. The selected PNG replaces the earlier SVG. Actual PNG signature, dimensions, HTTP Content-Type and download target are validated. Both the thumbnail and the original-image action now open a native on-page dialog. Close button, backdrop and Escape return to the same URL, preserve scroll position, restore page scrolling and return keyboard focus to the trigger. Dialog accessibility is checked on desktop and mobile.

Local validation passed: format/check, lint, Astro check (zero diagnostics), 6 content tests, build/site validation and 15 browser tests. Local mobile Lighthouse for home and NewRevit remains 100 in all four measured categories. [Desktop/Mobile viewer screenshots](review/png-viewer/README.md) show open and returned states. The generated PNG content itself was accepted in the conversation; no new model or UI screenshot was introduced for this fix.

## NewRevit and Multica Learning PNGs — 2026-10-24

Owner reviewed the local pages and authorized a PR. Both diagrams reuse the previously tested viewer. Local checks passed: npm ci, format/check, lint, Astro check (zero diagnostics), 8 content tests, build/local link validation, 19 browser tests and audit. PNG signatures, dimensions, HTTP delivery and native decoding are checked for all three projects. The new pages exercise close button, backdrop, Escape, focus restoration and unchanged project URL at desktop/mobile widths.

Local mobile Lighthouse scored 100 in Performance, Accessibility, Best Practices and SEO for home and NewRevit through the existing audit command. Multica Learning was measured separately with the installed Lighthouse CLI and also scored 100 in all four categories. These remain local laboratory measurements. [Reviewed webpage captures](review/project-architectures/README.md) cover both new pages; no actual customer/software screenshots were added.
