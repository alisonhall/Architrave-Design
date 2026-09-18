// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('home page', () => {
  test('loads and renders the expected title and layout', async ({ page }) => {
    const response = await page.goto('/');

    expect(response.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/Architrave Design, Architect/);
    await expect(page.locator('aside nav')).toBeVisible();
    await expect(page.locator('header.top')).toContainText('Architrave Design');
    await expect(page.locator('footer')).toBeVisible();
  });

  test('loads without console or page errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });
});

test.describe('primary navigation', () => {
  const navLinks = [
    { text: 'About', path: '/about/' },
    { text: 'Reviews', path: '/reviews/' },
    { text: 'Contact', path: '/contact/' },
  ];

  for (const { text, path } of navLinks) {
    test(`navigates to the ${text} page`, async ({ page }) => {
      await page.goto('/');

      await page.locator('aside nav').getByRole('link', { name: text, exact: true }).click();

      await expect(page).toHaveURL(new RegExp(`${path.replace(/\//g, '\\/')}$`));
      await expect(page.locator('main')).toBeVisible();
    });
  }

  test('navigates to the portfolio new homes page', async ({ page }) => {
    await page.goto('/');

    await page.locator('aside nav').getByRole('link', { name: 'Portfolio' }).click();

    await expect(page).toHaveURL(/\/portfolio\/new-homes\/$/);
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('portfolio', () => {
  test('renovations-additions listing page loads and links to a project detail page', async ({ page }) => {
    const response = await page.goto('/portfolio/renovations-additions/');
    expect(response.ok()).toBeTruthy();

    const projectLink = page.locator('a.image-link').first();
    await expect(projectLink).toBeVisible();
    await projectLink.click();

    await expect(page).toHaveURL(/\/portfolio\/renovations-additions\/.+\/$/);
    await expect(page.locator('img.imageDiv').first()).toBeVisible();
  });

  test('a project detail page shows previous/next project navigation', async ({ page }) => {
    await page.goto('/portfolio/new-homes/classic-centre-hall/');

    await expect(page.getByText('Previous Project').first()).toBeVisible();
    await expect(page.getByText('Next Project').first()).toBeVisible();
  });
});

test.describe('sitemap page', () => {
  test('lists links to every top-level section', async ({ page }) => {
    await page.goto('/sitemap/');

    const sitemapList = page.locator('main');

    await expect(sitemapList.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute(
      'href',
      '/'
    );
    await expect(sitemapList.getByRole('link', { name: 'About', exact: true })).toHaveAttribute(
      'href',
      '/about/'
    );
    await expect(sitemapList.getByRole('link', { name: 'Reviews', exact: true })).toHaveAttribute(
      'href',
      '/reviews/'
    );
    await expect(sitemapList.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute(
      'href',
      '/contact/'
    );
  });
});

test.describe('404 page', () => {
  test('renders a not-found message for an unknown route', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist/');

    expect(response.status()).toBe(404);
    await expect(page.getByText('NOT FOUND')).toBeVisible();
  });
});
