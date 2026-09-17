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
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/app-constants.js');
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
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/app-constants.js');
  });

  test('shows a thumbnail on each project row', async ({ page }) => {
    await unlock(page);

    const newHomesSection = page.locator('section', { has: page.getByRole('heading', { name: 'New Homes' }) });
    const firstRow = newHomesSection.locator('.adminProjectsEditor-row').first();

    await expect(firstRow.locator('img.adminThumbnail')).toBeVisible();
  });
});

test.describe('layouts editor', () => {
  const openLayouts = async (page, pageKey) => {
    await unlock(page);
    await page.getByRole('button', { name: 'Layouts' }).click();
    await expect(page.locator('.adminLayoutsEditor')).toBeVisible();
    if (pageKey) await page.getByLabel('Page').selectOption(pageKey);
  };

  test('shows the target file and a live preview matching the real page', async ({ page }) => {
    await openLayouts(page);

    await expect(page.getByText('Editing: static/layouts/index.js')).toBeVisible();
    await expect(page.locator('.adminLayoutPreview').first().getByText("Hogg's Hollow French")).toBeVisible();
  });

  test('shows a thumbnail on each tile that has an image', async ({ page }) => {
    await openLayouts(page);

    const tileRow = page.locator('.adminTileLibrary li', { hasText: 'hoggsHollowFrench' }).first();
    await expect(tileRow.locator('img.adminThumbnail')).toBeVisible();
  });

  test('duplicating a tile adds a copy to the Tile Library', async ({ page }) => {
    await openLayouts(page);

    const tileLibrary = page.locator('.adminTileLibrary');
    const tileRow = tileLibrary.locator('li', { hasText: 'hoggsHollowFrench' }).first();
    await tileRow.getByRole('button', { name: 'Actions ▾' }).click();
    await tileRow.getByRole('menuitem', { name: 'Duplicate' }).click();

    await expect(tileLibrary.locator('li', { hasText: 'hoggsHollowFrenchCopy' })).toBeVisible();
  });

  test('filtering the Tile Library narrows the list to matching tiles', async ({ page }) => {
    await openLayouts(page);

    const tileLibrary = page.locator('.adminTileLibrary');
    await expect(tileLibrary.locator('li', { hasText: 'kingswayGeorgian' })).toBeVisible();

    await page.getByLabel('Filter tiles').fill('hoggsHollowFrench');

    await expect(tileLibrary.locator('li', { hasText: 'hoggsHollowFrench' })).toBeVisible();
    await expect(tileLibrary.locator('li', { hasText: 'kingswayGeorgian' })).toHaveCount(0);
  });

  test('switches between supported pages via the selector', async ({ page }) => {
    await openLayouts(page);

    await page.getByLabel('Page').selectOption('renovationsAdditions');

    await expect(page.getByText('Editing: static/layouts/renovations-additions.js')).toBeVisible();
    await expect(page.locator('.adminLayoutPreview').first().getByText('Lytton Park Manor')).toBeVisible();
  });

  test('editing a tile updates its live preview', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    const tileRow = page.locator('.adminTileLibrary li', { hasText: 'classicCentreHall' });
    await tileRow.getByRole('button', { name: 'Actions ▾' }).click();
    await tileRow.getByRole('menuitem', { name: 'Edit' }).click();
    await page.getByLabel(/Background position/).fill('10% 10%');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.adminTileLibrary li', { hasText: 'classicCentreHall' })).toBeVisible();
  });

  test('adding a row to the default layout leaves the wide layout unchanged, and surfaces the file in Review Changes', async ({
    page
  }) => {
    await openLayouts(page, 'newHomes');

    const variants = page.locator('.adminLayoutsEditor-variant');
    const defaultVariant = variants.first();
    const wideVariant = variants.nth(1);

    const wideRowCountBefore = await wideVariant.locator('.adminLayoutTree > .adminLayoutTree-row').count();
    await defaultVariant.getByRole('button', { name: 'Add row' }).click();
    const wideRowCountAfter = await wideVariant.locator('.adminLayoutTree > .adminLayoutTree-row').count();
    expect(wideRowCountAfter).toBe(wideRowCountBefore);

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/layouts/new-homes.js');
  });

  test('a row\'s actions are tucked behind one menu instead of separate buttons', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    const rowHeader = page.locator('.adminLayoutTree > .adminLayoutTree-row > .adminLayoutTree-rowHeader').first();
    await expect(rowHeader.getByRole('button', { name: 'Move up' })).toHaveCount(0);

    await rowHeader.getByRole('button', { name: 'Actions ▾' }).click();
    await expect(rowHeader.getByRole('menuitem', { name: 'Move up' })).toBeVisible();
    await expect(rowHeader.getByRole('menuitem', { name: 'Move up' })).toBeDisabled();
    await expect(rowHeader.getByRole('menuitem', { name: 'Remove row' })).toBeVisible();
  });

  test('collapsing a row hides its fields and columns behind a summary, and expanding restores them', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    const firstRow = page.locator('.adminLayoutTree > .adminLayoutTree-row').first();
    const rowHeader = firstRow.locator(':scope > .adminLayoutTree-rowHeader');
    await expect(rowHeader.getByLabel('Height (px)', { exact: true })).toBeVisible();

    await rowHeader.locator('.adminLayoutTree-collapseToggle').click();
    await expect(rowHeader.getByLabel('Height (px)', { exact: true })).toHaveCount(0);
    await expect(rowHeader.getByText(/^Row — \d+ columns?$/)).toBeVisible();

    await rowHeader.locator('.adminLayoutTree-collapseToggle').click();
    await expect(rowHeader.getByLabel('Height (px)', { exact: true })).toBeVisible();
  });

  test('dragging a row by its handle onto another row reorders them', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    const rows = page.locator('.adminLayoutTree > .adminLayoutTree-row');
    const firstRowSummaryBefore = await rows.first().locator(':scope > .adminLayoutTree-rowHeader input').first().inputValue();

    const firstHandle = rows.first().locator(':scope > .adminLayoutTree-rowHeader .adminLayoutTree-dragHandle');
    await firstHandle.dragTo(rows.nth(1));

    const secondRowHeightAfter = await rows.nth(1).locator(':scope > .adminLayoutTree-rowHeader input').first().inputValue();
    expect(secondRowHeightAfter).toBe(firstRowSummaryBefore);
  });

  test('duplicating a row inserts a copy right after it', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    const rows = page.locator('.adminLayoutTree > .adminLayoutTree-row');
    const rowCountBefore = await rows.count();

    const firstRowHeader = rows.first().locator(':scope > .adminLayoutTree-rowHeader');
    await firstRowHeader.getByRole('button', { name: 'Actions ▾' }).click();
    await firstRowHeader.getByRole('menuitem', { name: 'Duplicate row' }).click();

    await expect(rows).toHaveCount(rowCountBefore + 1);
  });

  test('a detail page shows a single layout tree bound to its own project, with only image/description tile kinds', async ({
    page
  }) => {
    await openLayouts(page, 'creditRiverManor');

    await expect(page.getByText('Editing: static/layouts/credit-river-manor.js')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Layout' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Default layout (narrow screens)' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Add image tile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add description tile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add project tile' })).toHaveCount(0);
    await expect(page.locator('.adminLayoutPreview').getByText('Credit River Manor')).toBeVisible();
  });

  test('editing a detail page and reviewing changes surfaces its file', async ({ page }) => {
    await openLayouts(page, 'creditRiverManor');

    await page.locator('.adminLayoutTree').getByRole('button', { name: 'Add row' }).click();
    await page.getByRole('button', { name: 'Review Changes' }).click();

    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText(
      'static/layouts/credit-river-manor.js'
    );
  });

  test('a dual-layout detail page shows two sections (not one), still with detail-only tile kinds', async ({
    page
  }) => {
    await openLayouts(page, 'kingswayGeorgianDetail');

    await expect(page.getByRole('heading', { name: 'Default layout (narrow screens)' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Wide layout (wide screens)' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Layout', exact: true })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Add image tile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add project tile' })).toHaveCount(0);
  });

  test('adding an embed tile by pasting iframe markup lists it and surfaces its file in Review Changes', async ({
    page
  }) => {
    await openLayouts(page, 'creditRiverManor');

    await page.getByRole('button', { name: 'Add embed tile' }).click();
    await page.getByLabel(/Embed HTML/).fill('<iframe title="Tour" width="100%" height="500" src="https://kuula.co/share/abc"></iframe>');
    await page.locator('.adminTileLibrary').getByRole('button', { name: 'Add tile' }).click();

    await expect(page.getByText(/Embed — pasted iframe markup/)).toBeVisible();

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText(
      'static/layouts/credit-river-manor.js'
    );
  });

  test('creating a page for a new project, editing it, and reviewing changes surfaces all 3 of its files', async ({
    page
  }) => {
    await unlock(page);

    const newHomesSection = page.locator('section', { has: page.getByRole('heading', { name: 'New Homes' }) });
    await newHomesSection.getByRole('button', { name: 'Add New Homes project' }).click();
    await page.locator('#project-name').fill('E2E New Page Manor');
    await page.locator('#project-fileName').fill('e2e-new-page-manor');
    await page.locator('#project-mainImageUrl').fill('https://example.com/e2e-new-page-manor.jpg');
    await page.getByRole('button', { name: 'Save' }).click();

    await page.getByRole('button', { name: 'Layouts' }).click();
    await page.getByLabel('Create a page for').selectOption({ label: 'E2E New Page Manor' });

    await expect(page.getByText('Editing: static/layouts/e2e-new-page-manor.js')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete this new page' })).toBeVisible();
    await expect(page.locator('.adminLayoutTree').getByRole('button', { name: 'Add row' })).toBeVisible();

    await page.locator('.adminLayoutTree').getByRole('button', { name: 'Add row' }).click();
    await page.getByRole('button', { name: 'Review Changes' }).click();

    // Adding the project itself also changes static/app-constants.js, so it's expected
    // alongside the 3 new-page files.
    const fileHeaders = page.locator('.adminOutputPanel-fileHeader code');
    await expect(fileHeaders).toHaveText([
      'static/app-constants.js',
      'static/layouts/e2e-new-page-manor.js',
      'src/pages/portfolio/new-homes/e2e-new-page-manor.jsx',
      'src/pages/portfolio/new-homes/__tests__/e2e-new-page-manor.test.jsx'
    ]);
  });
});

test.describe('about editor', () => {
  test('editing a heading and paragraph updates the live preview and surfaces static/about.js', async ({ page }) => {
    await unlock(page);
    await page.getByRole('button', { name: 'About' }).click();
    await expect(page.locator('.adminAboutEditor')).toBeVisible();

    const introSection = page.locator('section.adminAboutEditor-section', { hasText: 'Introduction' });
    await introSection.locator('input[type="text"]').fill('E2E New Intro Heading');

    const preview = page.locator('.adminAboutPreview');
    await expect(preview.getByText('E2E New Intro Heading')).toBeVisible();

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/about.js');
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText('E2E New Intro Heading');
  });

  test('adding and removing a paragraph updates the live preview', async ({ page }) => {
    await unlock(page);
    await page.getByRole('button', { name: 'About' }).click();

    const bioSection = page.locator('section.adminAboutEditor-section', { hasText: 'Bio' });
    const paragraphCountBefore = await bioSection.locator('textarea').count();

    await bioSection.getByRole('button', { name: 'Add paragraph' }).click();
    await expect(bioSection.locator('textarea')).toHaveCount(paragraphCountBefore + 1);

    await bioSection.getByRole('button', { name: 'Remove paragraph' }).last().click();
    await expect(bioSection.locator('textarea')).toHaveCount(paragraphCountBefore);
  });
});

test.describe('reviews editor', () => {
  test('adding a review shows it in the live preview and surfaces static/reviews.js', async ({ page }) => {
    await unlock(page);
    await page.getByRole('button', { name: 'Reviews' }).click();
    await expect(page.locator('.adminReviewsEditor')).toBeVisible();

    await page.getByRole('button', { name: 'Add review' }).click();
    await page.getByLabel('Name').fill('E2E Test Reviewer');
    await page.getByLabel(/Project date/).fill('January 2026');
    await page.getByLabel(/^Text/).fill('An outstanding experience from start to finish.');
    await page.getByRole('button', { name: 'Add review' }).click();

    const preview = page.locator('.adminReviewsPreview');
    await expect(preview.getByText('E2E Test Reviewer')).toBeVisible();
    await expect(preview.getByText('An outstanding experience from start to finish.')).toBeVisible();

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/reviews.js');
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText('E2E Test Reviewer');
  });

  test('editing and deleting a review updates the list and live preview', async ({ page }) => {
    await unlock(page);
    await page.getByRole('button', { name: 'Reviews' }).click();

    const row = page.locator('.adminProjectsEditor-row', { hasText: 'Marisa C' }).first();
    await row.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Name').fill('Marisa Renamed via E2E');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.adminProjectsEditor-row', { hasText: 'Marisa Renamed via E2E' })).toBeVisible();
    await expect(page.locator('.adminReviewsPreview').getByText('Marisa Renamed via E2E')).toBeVisible();

    page.once('dialog', (dialog) => dialog.accept());
    await page
      .locator('.adminProjectsEditor-row', { hasText: 'Marisa Renamed via E2E' })
      .getByRole('button', { name: 'Delete' })
      .click();

    await expect(page.locator('.adminProjectsEditor-row', { hasText: 'Marisa Renamed via E2E' })).toHaveCount(0);
  });
});

test.describe('layouts editor — renaming a tile', () => {
  const openLayouts = async (page, pageKey) => {
    await unlock(page);
    await page.getByRole('button', { name: 'Layouts' }).click();
    await expect(page.locator('.adminLayoutsEditor')).toBeVisible();
    if (pageKey) await page.getByLabel('Page').selectOption(pageKey);
  };

  test('renaming a tile updates its placement and still surfaces the file in Review Changes', async ({ page }) => {
    await openLayouts(page, 'creditRiverManor');

    const tileRow = page.locator('.adminTileLibrary li', { hasText: '1 —' });
    await tileRow.getByRole('button', { name: 'Actions ▾' }).click();
    await tileRow.getByRole('menuitem', { name: 'Edit' }).click();
    await page.getByLabel(/^Key/).fill('frontFacade');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.adminTileLibrary li', { hasText: 'frontFacade —' })).toBeVisible();
    await expect(page.locator('.adminTileLibrary li', { hasText: '1 —' })).toHaveCount(0);
    // The preview still renders the renamed tile's image — its placement followed the rename.
    await expect(page.locator('.adminLayoutPreview img').first()).toBeVisible();

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/layouts/credit-river-manor.js');
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText('frontFacade');
  });
});

test.describe('layouts editor — image and placeholder tiles', () => {
  const openLayouts = async (page, pageKey) => {
    await unlock(page);
    await page.getByRole('button', { name: 'Layouts' }).click();
    await expect(page.locator('.adminLayoutsEditor')).toBeVisible();
    if (pageKey) await page.getByLabel('Page').selectOption(pageKey);
  };

  test('adding a static image tile on a listing page renders it in the live preview and surfaces the file', async ({
    page
  }) => {
    await openLayouts(page, 'newHomes');

    const tileLibrary = page.locator('.adminTileLibrary');
    await tileLibrary.getByRole('button', { name: 'Add image tile' }).click();
    await page.getByLabel('Image URL').fill('https://example.com/e2e-static-image.jpg');
    await tileLibrary.getByRole('button', { name: 'Add tile' }).click();

    await expect(tileLibrary.locator('li', { hasText: 'imageTile —' })).toBeVisible();

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/layouts/new-homes.js');
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText('e2e-static-image.jpg');
  });

  test('adding a placeholder tile on a detail (project) page renders a blank blue filler in the live preview', async ({
    page
  }) => {
    await openLayouts(page, 'creditRiverManor');

    const tileLibrary = page.locator('.adminTileLibrary');
    await tileLibrary.getByRole('button', { name: 'Add placeholder tile' }).click();
    await tileLibrary.getByRole('button', { name: 'Add tile' }).click();

    await expect(tileLibrary.locator('li', { hasText: 'placeholderTile — Placeholder' })).toBeVisible();

    // Place it in the tree, and confirm the preview renders a plain blue filler for it.
    await page.locator('.adminLayoutTree-column').first().getByRole('button', { name: 'Add tile' }).click();
    const newPlacementSelect = page.locator('.adminLayoutTree-placement select').last();
    await newPlacementSelect.selectOption('placeholderTile');

    await expect(page.locator('.adminLayoutPreview .textBlurbFiller')).toBeVisible();
  });
});

test.describe('layouts editor — click-to-edit-in-preview', () => {
  const openLayouts = async (page, pageKey) => {
    await unlock(page);
    await page.getByRole('button', { name: 'Layouts' }).click();
    await expect(page.locator('.adminLayoutsEditor')).toBeVisible();
    if (pageKey) await page.getByLabel('Page').selectOption(pageKey);
  };

  test('clicking a tile in the preview opens a popover to edit it, and the edit reaches the Tile Library', async ({
    page
  }) => {
    await openLayouts(page, 'creditRiverManor');

    await page.locator('.adminLayoutPreview img').first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Editing tile: 1')).toBeVisible();

    await dialog.getByLabel(/Background position/).fill('12% 34%');
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(dialog).toHaveCount(0);

    const tileRow = page.locator('.adminTileLibrary li', { hasText: '1 —' });
    await tileRow.getByRole('button', { name: 'Actions ▾' }).click();
    await tileRow.getByRole('menuitem', { name: 'Edit' }).click();
    await expect(page.getByLabel(/Background position/)).toHaveValue('12% 34%');
  });

  test('clicking a project tile (a real link on the live site) opens its popover instead of navigating away', async ({
    page
  }) => {
    await openLayouts(page, 'newHomes');

    await page.locator('.adminLayoutPreview a', { hasText: "Hogg's Hollow French" }).first().click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').getByText(/^Editing tile:/)).toBeVisible();
    // The whole point: still on /admin/, not navigated to the project's own detail page.
    expect(page.url()).toContain('/admin/');
  });

  test('the popover renders above a project tile\'s title text and stays fully within the viewport', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    await page.locator('.adminLayoutPreview a', { hasText: "Hogg's Hollow French" }).first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    const viewport = page.viewportSize();
    const box = await dialog.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);

    // item.scss's .textOverlay (a project tile's title) sits at z-index: 200 in
    // production, so the popover only reliably renders in front of it — rather than
    // whichever one happens to win a given pixel — if its own z-index actually exceeds
    // that (checked against the real computed style, not just the source stylesheet).
    const popoverZIndex = await dialog.evaluate((el) => parseInt(window.getComputedStyle(el).zIndex, 10));
    expect(popoverZIndex).toBeGreaterThan(200);
  });

  test('filtering the "assign a tile" list in the popover narrows it to matching tiles', async ({ page }) => {
    await openLayouts(page, 'kingswayGeorgianDetail');

    await page.locator('.adminLayoutPreview .textBlurbFiller:visible').first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByText(/^frontFacade —/)).toBeVisible();

    await dialog.getByLabel('Filter tiles').fill('sittingRoom');

    await expect(dialog.getByText(/^sittingRoom —/)).toBeVisible();
    await expect(dialog.getByText(/^frontFacade —/)).toHaveCount(0);
  });

  test('assigning an existing tile to an empty slot from the preview updates the layout', async ({ page }) => {
    await openLayouts(page, 'kingswayGeorgianDetail');

    await page.locator('.adminLayoutPreview .textBlurbFiller:visible').first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByText('Assign a tile')).toBeVisible();

    await dialog.getByText(/^frontFacade —/).click();
    await expect(dialog).toHaveCount(0);

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/layouts/kingsway-georgian.js');
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText("nodeType: 'tileRef'");
  });

  test('creating a new tile from an empty slot assigns it and adds it to the Tile Library', async ({ page }) => {
    await openLayouts(page, 'kingswayGeorgianDetail');

    await page.locator('.adminLayoutPreview .textBlurbFiller:visible').first().click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Add image tile' }).click();
    await dialog.getByLabel('Image URL').fill('https://example.com/e2e-popover-image.jpg');
    await dialog.getByRole('button', { name: 'Add & assign' }).click();

    await expect(dialog).toHaveCount(0);
    await expect(page.locator('.adminTileLibrary li', { hasText: 'imageTile —' })).toBeVisible();
  });
});

test.describe('layouts editor — drag-to-resize in preview', () => {
  const openLayouts = async (page, pageKey) => {
    await unlock(page);
    await page.getByRole('button', { name: 'Layouts' }).click();
    await expect(page.locator('.adminLayoutsEditor')).toBeVisible();
    if (pageKey) await page.getByLabel('Page').selectOption(pageKey);
  };

  const dragBy = async (page, handle, dx, dy) => {
    // page.mouse.move/down/up work in raw viewport coordinates and don't auto-scroll the
    // way locator.click() does, so a handle below the fold (this preview column is tall)
    // needs to be brought into view first.
    await handle.scrollIntoViewIfNeeded();
    const box = await handle.boundingBox();
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + dx, startY + dy, { steps: 10 });
    await page.mouse.up();
  };

  test('dragging a row\'s bottom edge in the preview resizes it, matching the tree editor\'s height field', async ({
    page
  }) => {
    await openLayouts(page, 'creditRiverManor');

    const heightInput = page.locator('.adminLayoutTree > .adminLayoutTree-row').first()
      .locator(':scope > .adminLayoutTree-rowHeader').getByLabel('Height (px)', { exact: true });
    const heightBefore = await heightInput.inputValue();

    const handle = page.locator('.adminEditableLayoutPreview .adminLayoutResize-row').first();
    await dragBy(page, handle, 0, 60);

    await expect(heightInput).not.toHaveValue(heightBefore);
  });

  test('dragging a column\'s right edge in the preview resizes it, matching the tree editor\'s width field', async ({
    page
  }) => {
    await openLayouts(page, 'creditRiverManor');

    const widthInput = page.locator('.adminLayoutTree-column').first().getByLabel(/^Width/);
    const widthBefore = await widthInput.inputValue();

    const handle = page.locator('.adminEditableLayoutPreview .adminLayoutResize-column').first();
    await dragBy(page, handle, -40, 0);

    await expect(widthInput).not.toHaveValue(widthBefore);
  });

  test('clicking (not dragging) a resize line opens an inline input, and typing an exact height updates the tree editor', async ({
    page
  }) => {
    await openLayouts(page, 'creditRiverManor');

    const handle = page.locator('.adminEditableLayoutPreview .adminLayoutResize-row').first();
    await handle.click();

    const inlineInput = page.locator('.adminLayoutResize-edit').getByLabel('Height (px)');
    await expect(inlineInput).toBeVisible();

    await inlineInput.fill('555');
    await inlineInput.press('Enter');
    await expect(inlineInput).toHaveCount(0);

    const heightInput = page.locator('.adminLayoutTree > .adminLayoutTree-row').first()
      .locator(':scope > .adminLayoutTree-rowHeader').getByLabel('Height (px)', { exact: true });
    await expect(heightInput).toHaveValue('555');

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/layouts/credit-river-manor.js');
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText('height: 555');
  });
});
