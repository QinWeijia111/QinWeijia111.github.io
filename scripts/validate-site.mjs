import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';

const root = path.resolve('dist');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
const html = files.filter((f) => f.endsWith('.html'));
const errors = [];
const approvedVideoPaths = new Set();
for (const file of html) {
  const $ = load(await readFile(file, 'utf8'));
  const relative = path.relative(root, file);
  const page = new URL(
    relative.replace(/index\.html$/, ''),
    'https://qinweijia111.github.io/',
  );
  const fail = (message) => errors.push(`${relative}: ${message}`);
  if ($('h1').length !== 1) fail('Expected exactly one H1');
  if (!$('title').text() || !$('meta[name="description"]').attr('content'))
    fail('Missing SEO metadata');
  if (
    !$('meta[property="og:image"]').attr('content')?.endsWith('/images/og.png')
  )
    fail('Missing Open Graph image');
  if (
    $('link[rel="canonical"]').attr('href') !== page.href &&
    relative !== '404.html'
  )
    fail('Incorrect canonical URL');
  if ($('a[href$=".pdf"],a[href$=".docx"]').length)
    fail('Public resume downloads are forbidden');
  if ($('video[autoplay]').length) fail('Video autoplay is forbidden');
  $('video').each((_, video) => {
    const v = $(video);
    const videoSrc = v.find('source').attr('src');
    if (videoSrc) approvedVideoPaths.add(path.join(root, videoSrc));
    if (
      !v.is('[controls]') ||
      !v.attr('poster') ||
      v.attr('preload') !== 'metadata' ||
      !v.find('track[kind="captions"]').length
    )
      fail('Video playback contract not met');
  });
  for (const element of $('[href],[src]').toArray()) {
    const raw = $(element).attr('href') ?? $(element).attr('src');
    if (!raw || /^(mailto:|tel:|data:|https?:\/\/)/.test(raw)) continue;
    const url = new URL(raw, page);
    let target = path.join(root, decodeURIComponent(url.pathname));
    try {
      if ((await stat(target)).isDirectory())
        target = path.join(target, 'index.html');
      await stat(target);
      if (url.hash && target.endsWith('.html')) {
        const targetDoc = load(await readFile(target, 'utf8'));
        if (
          !targetDoc('[id]')
            .toArray()
            .some(
              (e) =>
                targetDoc(e).attr('id') ===
                decodeURIComponent(url.hash.slice(1)),
            )
        )
          fail(`Missing anchor ${raw}`);
      }
    } catch {
      fail(`Broken local asset/link: ${raw}`);
    }
  }
}
assert(
  !files.some((f) => /\.(pdf|docx|zip)$/i.test(f)),
  'Private resume or source archive found in build',
);
assert(
  !files.some((f) => f.includes('/.review/')),
  'Review assets leaked into build',
);
assert(
  files
    .filter((f) => f.endsWith('.mp4'))
    .every((f) => approvedVideoPaths.has(f)),
  'Unreferenced/unapproved recording found in build',
);
assert.equal(html.length, 5, 'Expected home, three project pages and 404');
assert(
  files.some((f) => f.endsWith('/sitemap-index.xml')),
  'Missing sitemap',
);
assert.deepEqual(errors, []);
console.log(
  `Validated ${html.length} pages: internal links, anchors, assets, metadata, video contracts and privacy exclusions.`,
);
