import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const origin = 'http://127.0.0.1:4323';
const server = spawn(
  process.execPath,
  [
    'node_modules/astro/bin/astro.mjs',
    'preview',
    '--ignore-lock',
    '--host',
    '127.0.0.1',
    '--port',
    '4323',
  ],
  { stdio: 'ignore' },
);
let chrome;
let ready = false;
try {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      if ((await fetch(origin)).ok) {
        ready = true;
        break;
      }
    } catch {
      /* Starting preview. */
    }
    await setTimeout(250);
  }
  if (!ready) throw new Error('Lighthouse preview did not become ready.');
  chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox'] });
  await mkdir('.lighthouseci/reports', { recursive: true });
  for (const route of ['/', '/projects/newrevit/']) {
    const result = await lighthouse(`${origin}${route}`, {
      port: chrome.port,
      output: ['html', 'json'],
      onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
      logLevel: 'error',
    });
    if (!result || result.lhr.runtimeError)
      throw new Error(
        result?.lhr.runtimeError?.message ?? 'No Lighthouse result',
      );
    const name = route === '/' ? 'home' : 'newrevit';
    await writeFile(`.lighthouseci/reports/${name}.html`, result.report[0]);
    await writeFile(`.lighthouseci/reports/${name}.json`, result.report[1]);
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    );
    console.log(`${route} ${JSON.stringify(scores)}`);
    for (const category of ['performance', 'accessibility', 'seo']) {
      if (scores[category] < 95) process.exitCode = 1;
    }
  }
} finally {
  chrome?.kill();
  server.kill('SIGTERM');
}
