# Content boundary

This file owns publication policy. It does not document private implementation. The site repository is intended to be public; privacy applies to Git history, PR diffs, build artifacts, screenshots and Actions artifacts as well as the rendered pages.

## PUBLIC

- Project purpose, owner role, high-level capabilities, selected technologies.
- NewRevit and PiRevit: owner-built from 0 to 1, continuously maintained engineering projects.
- Owner-confirmed NewRevit metrics: 61+ Agent Tools; 9/9 branch connections; 9/9 main connections; 18 pumps in the stated regression; representative physical collisions: 0.
- Each result retains its scope. The week-to-half-hour observation is engineer feedback from a typical scenario, not a controlled benchmark.
- PiRevit integrates Pi RPC; Pi supplies Agent Core.
- Multica Learning: M01–M06, source verification, Agent Runtime research, Learning Squad, Agentic Workflow and public repository/site.
- Abstract concept diagrams authored for this site, explicitly marked as diagrams rather than product screenshots.
- Owner’s name, education, honors, GitHub and email. Resume requests go through email.
- A sanitized demo only after explicit owner approval and the checklist below.

## PRIVATE

- Private source code and source archives.
- Tool schemas/contracts, parameter contracts or internal command lists.
- Original prompts and Skills content.
- Customer models, internal customer documents and test assets.
- Internal family names and filesystem paths.
- PDF/DOCX resume and personal telephone number. The owner explicitly prohibited public PDF downloads during this task. Do not copy the existing resume into the repository, build output or CI artifacts.

## NEEDS_HUMAN_REVIEW

- Future recordings or derivatives without explicit owner publication approval.
- Any video, screenshot, poster frame, caption, transcript or audio that could show customer names, engineering files, internal paths or private models.
- New claims or unscoped extrapolations from existing metrics.

## Approved joint demo — 2026-10-20

The owner explicitly stated: “视频可以上传查看，不涉及到隐私”. This authorization approves the supplied joint recording for public viewing and supersedes its earlier pending-review state. The owner’s explicit instruction takes precedence over the provisional checklist below. This is owner attestation, not a claim that an agent performed a full privacy audit.

The published derivative is `public/videos/newrevit-pirevit-demo.mp4`: H.264, 1280×720, approximately 142.4 s, 3,963,552 bytes, no audio, stripped metadata, fast-start. SHA-256: `d3b6c8bab0479827ac7f09e1cc6e9dca3bb8615a69f87812c0e0c3e7882a04cd`.

The exact video contains desktop/runtime UI and model views; approval is specific to this recording and does not authorize separately publishing private code, tool contracts, prompts or Skills. Original source and extracted QA frames remain ignored local files. Public posters are authored concept diagrams. A WebVTT track supplies a Chinese scene guide; existing burned-in text remains in the video. The audio was deliberately omitted from the web derivative, so no speech transcript is claimed.

Both project pages use the same approved file. The home page only loads posters. The final PR is still subject to normal human content review before merge.

## Checklist for future media without owner approval

- [ ] Watch the entire recording, including opening/closing frames, menus, tooltips and dialogs.
- [ ] Confirm rights to publish any visible model and all customer-related material.
- [ ] Remove or obscure names, file paths, filenames, accounts, API keys and private UI/log output.
- [ ] Check model labels/family names, prompt text, tool arguments and Skills content.
- [ ] Review audio separately; local compressed preview deliberately has no audio.
- [ ] Approve final compressed output, poster and accurate Chinese captions.
- [ ] Record explicit owner permission, final checksum and review date in the release PR.
- [ ] Only then add video/captions to `public/videos/` and set both projects’ demo status to `approved`, with `src` and `captions`.

## Media preparation

Local-only review output lives in ignored `.review/`. The H.264 720p review copy strips metadata and audio and uses CRF 26 with fast-start MP4. This is compression, **not sanitization**. A 720p copy can still expose every sensitive item in the original.

Example for an already installed ffmpeg (replace local input/output paths yourself; never commit the input):

```sh
ffmpeg -i INPUT.mp4 -vf 'scale=1280:-2' -c:v libx264 -preset fast -crf 26 \
  -pix_fmt yuv420p -an -map_metadata -1 -movflags +faststart OUTPUT.mp4
```

Preserve audio only if approved, and encode it separately with AAC. Prefer below 15 MB for the final 2–3 minute demo; inspect text legibility after compression. There is no autoplay. Only approved detail pages load the full video, with poster, controls, captions and `preload="metadata"`; home cards load concept posters only.
