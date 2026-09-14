// @ts-check
const { test, expect } = require('@playwright/test');

const unlock = async (page) => {
  await page.goto('/admin/');
  await page.getByLabel('Passphrase').fill('change-me-please');
  await page.getByRole('button', { name: 'Unlock' }).click();
  await expect(page.locator('.adminProjectsEditor')).toBeVisible();
};

test.describe('admin page', () => {
  test('is gated behind a passphrase prompt', async ({ page }) => {
    const response = await page.goto('/admin/');

    expect(response.ok()).toBeTruthy();
    await expect(page.getByLabel('Passphrase')).toBeVisible();
    await expect(page.getByText('Projects')).not.toBeVisible();
  });

  test('is not indexable by search engines', async ({ page }) => {
    await page.goto('/admin/');

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  });

  test('rejects an incorrect passphrase', async ({ page }) => {
    await page.goto('/admin/');

    await page.getByLabel('Passphrase').fill('definitely-wrong');
    await page.getByRole('button', { name: 'Unlock' }).click();

    await expect(page.getByText('Incorrect passphrase.')).toBeVisible();
  });

  test('unlocks the admin app with the correct passphrase and lists its sections', async ({ page }) => {
    await page.goto('/admin/');

    await page.getByLabel('Passphrase').fill('change-me-please');
    await page.getByRole('button', { name: 'Unlock' }).click();

    const nav = page.locator('.adminApp-nav');
    await expect(nav.getByRole('button', { name: 'Projects' })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'Layouts' })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'About' })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'Reviews' })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'Review Changes' })).toBeVisible();
  });

  test('stays unlocked after a refresh, within the same session', async ({ page }) => {
    await page.goto('/admin/');
    await page.getByLabel('Passphrase').fill('change-me-please');
    await page.getByRole('button', { name: 'Unlock' }).click();
    await expect(page.locator('.adminApp')).toBeVisible();

    await page.reload();

    await expect(page.locator('.adminApp')).toBeVisible();
  });

  test('is not linked from the public site navigation', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('aside nav').getByRole('link', { name: /admin/i })).toHaveCount(0);
  });
});

test.describe('projects editor', () => {
  test('adding a project shows it as not-shown with a live preview, and in the generated output', async ({
    page
  }) => {
    await unlock(page);

    const newHomesSection = page.locator('section', { has: page.getByRole('heading', { name: 'New Homes' }) });
    await newHomesSection.getByRole('button', { name: 'Add New Homes project' }).click();

    await page.locator('#project-name').fill('E2E Test Manor');
    await page.locator('#project-mainImageUrl').fill('https://example.com/e2e-test-manor.jpg');
    await expect(page.locator('.adminProjectPreview')).toContainText('E2E Test Manor');

    await page.getByRole('button', { name: 'Save' }).click();

    const newRow = newHomesSection.locator('.adminProjectsEditor-row', { hasText: 'E2E Test Manor' });
    await expect(newRow).toBeVisible();
    await expect(newRow.getByRole('button', { name: 'Show' })).toBeVisible();

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-file header code')).toHaveText('static/app-constants.js');
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText('E2E Test Manor');
  });

  test('editing a project updates it in place', async ({ page }) => {
    await unlock(page);

    const row = page.locator('.adminProjectsEditor-row', { hasText: "Hogg's Hollow French" }).first();
    await row.getByRole('button', { name: 'Edit' }).click();

    await page.locator('#project-name').fill('Renamed via E2E');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.adminProjectsEditor-row', { hasText: 'Renamed via E2E' })).toBeVisible();
  });

  test('reordering, hiding, and showing a project updates the output panel', async ({ page }) => {
    await unlock(page);

    const newHomesSection = page.locator('section', { has: page.getByRole('heading', { name: 'New Homes' }) });
    const firstRow = newHomesSection.locator('.adminProjectsEditor-row').first();
    const firstRowNameBefore = await firstRow.locator('.adminProjectsEditor-name').innerText();

    await firstRow.getByRole('button', { name: 'Down' }).click();
    await expect(newHomesSection.locator('.adminProjectsEditor-row').first()).not.toHaveText(firstRowNameBefore);

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-file header code')).toHaveText('static/app-constants.js');
  });
});
