import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { parse } from 'yaml';
const directory = 'src/content/projects';
async function projects() {
  return Promise.all(
    (await readdir(directory)).map(async (name) => {
      const raw = await readFile(`${directory}/${name}`, 'utf8');
      return {
        id: name.replace(/\.mdx?$/, ''),
        raw,
        data: parse(raw.split('---')[1]),
      };
    }),
  );
}
test('exactly three owned projects with distinct ordering and complete public sections', async () => {
  const list = await projects();
  assert.deepEqual(list.map((p) => p.id).sort(), [
    'multica-learning',
    'newrevit',
    'pirevit',
  ]);
  assert.equal(new Set(list.map((p) => p.data.order)).size, 3);
  for (const { raw, data } of list) {
    assert(raw.includes('## 项目概述'));
    assert((raw.match(/^## /gm) ?? []).length >= 3);
    assert(data.detailSections.length >= 2);
    assert(data.myRole.length > 30);
    assert(data.posterAlt.length > 30);
    for (const link of data.links)
      assert.equal(new URL(link.url).protocol, 'https:');
  }
});
test('unapproved joint demos cannot publish a video source', async () => {
  for (const { data } of await projects()) {
    if (data.demo.status !== 'approved') assert.equal(data.demo.src, undefined);
    else {
      assert(data.demo.src.startsWith('/videos/'));
      assert(data.demo.captions);
    }
  }
});
test('NewRevit only publishes scoped owner-approved metrics', async () => {
  const project = (await projects()).find((p) => p.id === 'newrevit');
  assert.deepEqual(
    project.data.metrics.map((m) => m.value),
    ['61+', '9/9', '9/9', '18', '0'],
  );
  assert(project.data.metrics.every((m) => m.context.length > 10));
  assert(project.data.resultNote.includes('据工程师反馈'));
  assert(!project.raw.includes('## Technical Deep Dive'));
});
test('owner forbids public resume files and raw implementation material', async () => {
  const files = await readdir('public/resume');
  assert(!files.some((f) => /\.(pdf|docx)$/i.test(f)));
  for (const { raw } of await projects()) {
    assert(!/\/Users\/|[A-Z]:\\|tool_schema|system_prompt|客户名称/i.test(raw));
  }
});

test('related engineering projects are reciprocal and six research chapters are linked', async () => {
  const list = await projects();
  const byId = Object.fromEntries(list.map((p) => [p.id, p]));
  for (const { id, data } of list.filter((p) => p.data.crossProject)) {
    const related = byId[data.crossProject.project];
    assert(related, 'Related project must exist');
    assert.equal(related.data.crossProject.project, id);
    assert.equal(data.demo.stages.length, 5);
  }
  const modules = byId['multica-learning'].data.detailSections
    .flatMap((section) => section.items)
    .filter((item) => item.label);
  assert.deepEqual(
    modules.map((item) => item.label),
    ['M01', 'M02', 'M03', 'M04', 'M05', 'M06'],
  );
  assert(
    modules.every((item) =>
      item.url.startsWith(
        'https://qinweijia111.github.io/multica-learning/learn/',
      ),
    ),
  );
});

test('PiRevit uses one actual PNG architecture image with correct dimensions', async () => {
  const project = (await projects()).find((p) => p.id === 'pirevit');
  assert.equal(project.data.architectureDiagrams.length, 1);
  const diagram = project.data.architectureDiagrams[0];
  assert(diagram.src.endsWith('.png'));
  const bytes = await readFile(`public${diagram.src}`);
  assert.deepEqual(
    [...bytes.subarray(0, 8)],
    [137, 80, 78, 71, 13, 10, 26, 10],
  );
  assert.equal(bytes.readUInt32BE(16), diagram.width);
  assert.equal(bytes.readUInt32BE(20), diagram.height);
});
