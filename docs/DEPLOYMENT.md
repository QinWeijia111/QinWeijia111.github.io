# Deployment runbook

## Target

Repository: `QinWeijia111/QinWeijia111.github.io`.
Production URL: https://qinweijia111.github.io/.
User Pages, no project subpath/base. Node 24.16+, npm lockfile, static `dist/` artifact.

## First release

1. Review the feature PR, CI, screenshots and content/privacy checklist. PDF resume remains private; the supplied joint demo has explicit owner approval. Review its final compressed derivative in the PR.
2. In repository Settings → Pages → Build and deployment, choose **GitHub Actions**. The repository setup may already have configured `build_type: workflow`; verify the saved state.
3. Human merges the PR into `main`. Agents must not merge it.
4. `Deploy GitHub Pages` installs dependencies, formats/checks/lints/tests/builds and uploads `dist/` through `actions/upload-pages-artifact`. The deploy job uses `actions/deploy-pages` in the `github-pages` environment.
5. Wait for a successful deploy. Open the workflow’s returned environment URL. Until that success is verified, the URL above is a target, not a verified deployed website.
6. Check home, three projects, theme toggle, mobile layout, social metadata, email links and an unknown path. Confirm unknown paths show the custom 404 with an actual HTTP 404 status.

Only main can deploy, including manual dispatch. Pull requests never publish a Pages build. The deployment job has only Pages write and OIDC permissions. Repo contents remain read-only.

## Local preview

```sh
npm ci
npm run format/check
npm run lint
npm run check
npm test
npm run build
npm run preview
```

The app prints a local preview URL. Run `npx playwright install --with-deps chrome` once on CI/Linux if needed; local tests use installed Chrome. `npm run test:browser` launches/reuses the preview, checks layouts and stores ignored screenshots. `npm run audit` runs mobile Lighthouse against home and NewRevit with a 95 budget.

## Approved media release

Follow `CONTENT_BOUNDARY.md` first. A compressed preview is not a privacy-approved asset. After approval, add reviewed MP4 + VTT, explicitly unignore only those approved files, update demo metadata in both relevant collection entries, and repeat validation in a new PR. The player requires captions, poster, controls and metadata preloading.

## Rollback

Revert the offending public content through a PR, human-merge and allow Pages to redeploy. For an actual privacy leak, immediately disable Pages and remove the asset from public reach, then assess Git history and Actions artifacts; a normal revert does not erase history. Never publish private assets as an intermediate step.
