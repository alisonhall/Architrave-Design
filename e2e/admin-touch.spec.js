// @ts-check
const { test, expect, devices } = require('@playwright/test');

// The admin layout editor on a tablet: real touch input (sent through the Chrome
// DevTools Protocol, so the browser applies its own touch-action/scroll rules exactly
// as it would on a device — Playwright's touchscreen API only taps).
// eslint-disable-next-line no-unused-vars
const { defaultBrowserType, ...ipad } = devices['iPad (gen 7) landscape'];
test.use(ipad);

const unlockLayouts = async (page, pageKey) => {
  await page.goto('/admin/');
  await page.getByLabel('Passphrase').fill('change-me-please');
  await page.getByRole('button', { name: 'Unlock' }).click();
  await page.getByRole('button', { name: 'Layouts' }).click();
  await page.getByLabel('Page').selectOption(pageKey);
};

const touchDrag = async (page, from, to) => {
  const cdp = await page.context().newCDPSession(page);
  const point = (x, y) => [{ x, y, id: 1 }];
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: point(from.x, from.y) });
  for (let i = 1; i <= 10; i += 1) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: point(from.x + ((to.x - from.x) * i) / 10, from.y + ((to.y - from.y) * i) / 10)
    });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
};

test('dragging a row\'s bottom edge with a finger resizes it, without scrolling the page', async ({ page }) => {
  await unlockLayouts(page, 'creditRiverManor');

  const row = page.locator('.adminLayoutPreview > .row').first();
  await row.scrollIntoViewIfNeeded();
  const box = await row.boundingBox();
  const scrollBefore = await page.evaluate(() => window.scrollY);

  // credit-river-manor.js's first row is 380px tall.
  await touchDrag(page, { x: box.x + box.width / 2, y: box.y + box.height }, { x: box.x + box.width / 2, y: box.y + box.height + 60 });

  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
  await page.getByRole('button', { name: 'Review Changes' }).click();
  await expect(page.locator('.adminOutputPanel-file pre')).toContainText('height: 440');
});

test('a tap on a resize line opens the exact-size form', async ({ page }) => {
  await unlockLayouts(page, 'creditRiverManor');

  const row = page.locator('.adminLayoutPreview > .row').first();
  await row.scrollIntoViewIfNeeded();
  const box = await row.boundingBox();
  await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height);

  await expect(page.locator('.adminLayoutResize-edit').getByLabel('Height (px)', { exact: true })).toHaveValue('380');
});

test('dragging a row\'s handle with a finger onto another row reorders them', async ({ page }) => {
  await unlockLayouts(page, 'newHomes');

  const variant = page.locator('.adminLayoutsEditor-variant').first();
  const rows = variant.locator('.adminLayoutPreview > .row');
  const firstRowId = await rows.first().getAttribute('data-row-id');
  const handle = variant.locator(`[data-row-toolbar="${firstRowId}"]`).getByRole('button', { name: 'Drag to reorder' });
  await handle.scrollIntoViewIfNeeded();

  const handleBox = await handle.boundingBox();
  const targetBox = await rows.nth(1).boundingBox();
  await touchDrag(
    page,
    { x: handleBox.x + handleBox.width / 2, y: handleBox.y + handleBox.height / 2 },
    { x: targetBox.x + targetBox.width / 2, y: targetBox.y + targetBox.height / 2 }
  );

  await expect(rows.nth(1)).toHaveAttribute('data-row-id', firstRowId);
});

test('toolbar controls are finger-sized', async ({ page }) => {
  await unlockLayouts(page, 'newHomes');

  const toolbar = page.locator('.adminLayoutStructure-toolbar--row').first();
  const handleBox = await toolbar.getByRole('button', { name: 'Drag to reorder' }).boundingBox();
  const menuBox = await toolbar.getByRole('button', { name: 'Row ▾' }).boundingBox();
  expect(handleBox.height).toBeGreaterThanOrEqual(32);
  expect(menuBox.height).toBeGreaterThanOrEqual(32);
});
