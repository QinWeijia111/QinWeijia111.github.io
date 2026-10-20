# Validation evidence

Local validation date: 2026-10-20 (Asia/Shanghai). Node 24.19.0, macOS, installed Google Chrome. This records observed results, not a claim that GitHub Pages is already deployed.

## Required checks

- `npm ci`: clean lockfile installation passed; zero dependency audit findings after replacing the legacy audit toolchain with current Lighthouse.
- `npm run format/check`: passed.
- `npm run lint`: passed.
- `npm run check`: passed, zero errors/warnings/hints.
- `npm test`: 4 meaningful content/privacy tests passed.
- `npm run build`: passed; 5 static pages. Post-build validation resolves local page links, fragments and assets, validates root-origin metadata, rejects public resumes/private archives and enforces video contracts.

## Browser checks

`npm run test:browser`: 9 passed. Home and all three project routes tested at 1440×1000, 768×1024 and 390×844, in light and dark system color modes. No horizontal overflow, and axe reported zero violations across these routes and modes. Screenshots were visually inspected for desktop, tablet and mobile layouts, including project results and demo sections.

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
