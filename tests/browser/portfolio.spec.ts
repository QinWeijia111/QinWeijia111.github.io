import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 812 },
]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${viewport.width}px / ${theme}: layout, accessibility, navigation`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('/');
      await expect(page.locator('h1')).toContainText('Agent 系统。');
      await expect(
        page.getByRole('link', { name: /邮件索取简历/ }),
      ).toHaveAttribute('href', /^mailto:/);
      await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
      const unreadable = await page
        .locator('p, small, nav a, dt, dd, li, span')
        .evaluateAll((nodes) =>
          nodes
            .filter(
              (node) =>
                node.getClientRects().length &&
                node.textContent?.trim() &&
                parseFloat(getComputedStyle(node).fontSize) < 12,
            )
            .map((node) => node.textContent),
        );
      expect(unreadable).toEqual([]);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.locator('h1').scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `test-results/home-${viewport.width}-${theme}.png`,
        fullPage: true,
      });
      for (const slug of ['newrevit', 'pirevit', 'multica-learning']) {
        await page.goto(`/projects/${slug}/`);
        await expect(page.locator('h1')).toBeVisible();
        await expect(
          page.getByRole('heading', { name: '我的角色' }),
        ).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        ).toBeTruthy();
        expect(
          await page
            .locator('.detail-content')
            .evaluate((el) => el.getBoundingClientRect().width),
        ).toBeLessThanOrEqual(780);
        const smallText = await page
          .locator('p, small, nav a, dt, dd, li, span')
          .evaluateAll((nodes) =>
            nodes
              .filter(
                (node) =>
                  node.getClientRects().length &&
                  node.textContent?.trim() &&
                  parseFloat(getComputedStyle(node).fontSize) < 12,
              )
              .map((node) => node.textContent),
          );
        expect(smallText).toEqual([]);
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        if (slug !== 'multica-learning') {
          await expect(
            page.getByRole('heading', { name: '项目演示' }),
          ).toBeVisible();
          await expect(page.locator('.demo-guide li')).toHaveCount(5);
          await expect(page.locator('.cross-project a')).toHaveAttribute(
            'href',
            slug === 'newrevit' ? '/projects/pirevit/' : '/projects/newrevit/',
          );
          await expect(page.locator('video')).toHaveCount(1);
          await expect(page.locator('video')).toHaveAttribute(
            'preload',
            'metadata',
          );
        }
        await page.locator('.project-pagination').scrollIntoViewIfNeeded();
        await page.locator('h1').scrollIntoViewIfNeeded();
        await page.screenshot({
          path: `test-results/${slug}-${viewport.width}-${theme}.png`,
          fullPage: true,
        });
      }
    });
  }
}
test('theme toggle persists and custom 404 exists', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: '切换深色与浅色主题' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const missing = await page.goto('/this-page-does-not-exist/');
  expect(missing?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('这里还没有内容');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex,follow',
  );
  await page.getByRole('link', { name: '返回首页' }).click();
  await expect(page).toHaveURL('/');
});
test('keyboard navigation and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: '跳至主要内容' })).toBeFocused();
  await page.keyboard.press('Enter');
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto');
});

test('approved joint video loads, plays and seeks with Chinese scene guide', async ({
  page,
}) => {
  await page.goto('/projects/newrevit/');
  const video = page.locator('video');
  await video.scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(1);
  expect(
    await video.evaluate((v: HTMLVideoElement) => v.duration),
  ).toBeGreaterThan(140);
  await video.evaluate((v: HTMLVideoElement) => v.play());
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0.2);
  await video.evaluate((v: HTMLVideoElement) => {
    v.pause();
    v.currentTime = 120;
  });
  await expect
    .poll(() =>
      video.evaluate((v: HTMLVideoElement) => !v.seeking && v.readyState >= 2),
    )
    .toBeTruthy();
  await expect
    .poll(() =>
      video.evaluate(
        (v: HTMLVideoElement) => v.textTracks[0]?.cues?.length ?? 0,
      ),
    )
    .toBeGreaterThan(0);
  await expect(page.locator('video[autoplay]')).toHaveCount(0);
});

test('project relationships and sequential reading links navigate correctly', async ({
  page,
}) => {
  await page.goto('/projects/newrevit/');
  await page.getByRole('link', { name: '查看 PiRevit →' }).click();
  await expect(page).toHaveURL('/projects/pirevit/');
  await page.getByRole('link', { name: '查看 NewRevit →' }).click();
  await expect(page).toHaveURL('/projects/newrevit/');
  await page.locator('.project-pagination a').last().click();
  await expect(page).toHaveURL('/projects/pirevit/');
  await page.locator('.project-pagination a').last().click();
  await expect(page).toHaveURL('/projects/multica-learning/');
  await expect(page.locator('.narrative-cards a')).toHaveCount(6);
});

test('PiRevit architecture preview and original are PNG and downloadable', async ({
  page,
}) => {
  await page.goto('/projects/pirevit/');
  const figure = page.locator('.diagram-card');
  await expect(figure).toHaveCount(1);
  await figure.scrollIntoViewIfNeeded();
  const img = figure.locator('img');
  await expect
    .poll(() =>
      img.evaluate(
        (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
      ),
    )
    .toBeTruthy();
  const src = await img.getAttribute('src');
  expect(src).toMatch(/\.png$/);
  const response = await page.request.get(src!);
  expect(response.headers()['content-type']).toContain('image/png');
  await expect(figure.locator('a[download]')).toHaveAttribute('href', src!);
  const originalUrl = page.url();
  const openLink = figure.getByRole('link', { name: /查看 PNG 原图/ });
  const dialog = page.getByRole('dialog');
  await openLink.click();
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute(
    'src',
    new RegExp('pirevit-architecture-png-v3\\.png$'),
  );
  await expect(page).toHaveURL(originalUrl);
  await dialog.getByRole('button', { name: '关闭图片' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(openLink).toBeFocused();
  await figure.locator('.diagram-image-link').click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await openLink.click();
  await page.mouse.click(2, 2);
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(originalUrl);
});

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
]) {
  test(`image viewer closes and restores page at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('/projects/pirevit/');
    const trigger = page.locator('.diagram-image-link');
    await trigger.scrollIntoViewIfNeeded();
    const scroll = await page.evaluate(() => window.scrollY);
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await dialog.getByRole('button', { name: '关闭图片' }).click();
    await expect(dialog).not.toBeVisible();
    expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(scroll, -1);
    expect(
      await page.evaluate(() => document.documentElement.style.overflow),
    ).not.toBe('hidden');
    await trigger.click();
    await page.mouse.click(2, 2);
    await expect(dialog).not.toBeVisible();
  });
}

for (const slug of ['newrevit', 'multica-learning']) {
  for (const width of [1440, 390]) {
    test(`${slug} PNG loads and returns from image viewer at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/projects/${slug}/`);
      const trigger = page.locator('.diagram-image-link');
      await expect(trigger).toHaveCount(1);
      const image = trigger.locator('img');
      await trigger.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth === 1536,
          ),
        )
        .toBeTruthy();
      const src = await image.getAttribute('src');
      expect(src).toMatch(/\.png$/);
      expect(
        (await page.request.get(src!)).headers()['content-type'],
      ).toContain('image/png');
      await trigger.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.locator('img')).toHaveAttribute(
        'src',
        new RegExp(
          slug === 'newrevit'
            ? 'newrevit-architecture-v1'
            : 'multica-learning-architecture-v1',
        ),
      );
      await dialog.getByRole('button', { name: '关闭图片' }).click();
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
      await trigger.click();
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await trigger.click();
      await page.mouse.click(2, 2);
      await expect(dialog).not.toBeVisible();
      await expect(page).toHaveURL(`/projects/${slug}/`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
    });
  }
}
