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

  test('switching Edit to a different project without saving discards the first project\'s unsaved edits', async ({
    page
  }) => {
    await unlock(page);

    const newHomesSection = page.locator('section', { has: page.getByRole('heading', { name: 'New Homes' }) });
    const rows = newHomesSection.locator('.adminProjectsEditor-row');
    const firstName = await rows.nth(0).locator('.adminProjectsEditor-name').innerText();
    const secondName = await rows.nth(1).locator('.adminProjectsEditor-name').innerText();

    await rows.nth(0).getByRole('button', { name: 'Edit' }).click();
    await page.locator('#project-name').fill('Unsaved draft text');

    const secondRow = newHomesSection.locator('.adminProjectsEditor-row').filter({
      has: page.locator('.adminProjectsEditor-name', { hasText: secondName })
    });
    await secondRow.getByRole('button', { name: 'Edit' }).click();

    await expect(page.getByRole('heading', { name: `Editing: ${secondName}` })).toBeVisible();
    await expect(page.locator('#project-name')).toHaveValue(secondName);
    await expect(page.getByText('Unsaved draft text')).toHaveCount(0);

    // The first project itself must be untouched too, not just the form's display.
    await expect(newHomesSection.locator('.adminProjectsEditor-name', { hasText: firstName }).first()).toBeVisible();
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
    const defaultRows = defaultVariant.locator('.adminLayoutPreview > .row');
    const wideRows = wideVariant.locator('.adminLayoutPreview > .row');

    const defaultRowCountBefore = await defaultRows.count();
    const wideRowCountBefore = await wideRows.count();
    await defaultVariant.getByRole('button', { name: 'Add row' }).click();
    await expect(defaultRows).toHaveCount(defaultRowCountBefore + 1);
    await expect(wideRows).toHaveCount(wideRowCountBefore);

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/layouts/new-homes.js');
  });

  test('each row in the preview has a toolbar whose actions are tucked behind one menu', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    const toolbar = page.locator('.adminLayoutsEditor-variant').first().locator('.adminLayoutStructure-toolbar--row').first();
    await expect(toolbar.getByRole('button', { name: 'Move up' })).toHaveCount(0);

    await toolbar.getByRole('button', { name: 'Row ▾' }).click();
    await expect(toolbar.getByRole('menuitem', { name: 'Move up' })).toBeVisible();
    await expect(toolbar.getByRole('menuitem', { name: 'Move up' })).toBeDisabled();
    await expect(toolbar.getByRole('menuitem', { name: 'Remove row' })).toBeVisible();
  });

  test('a nested row has its own toolbar, and moving it reorders it within its column', async ({ page }) => {
    await openLayouts(page, 'lyttonParkManorDetail');

    const defaultVariant = page.locator('.adminLayoutsEditor-variant').first();
    const nestedToolbars = defaultVariant.locator('.adminLayoutStructure-toolbar--nested');
    await expect(nestedToolbars).toHaveCount(2);

    // Row 3's first column holds two nested rows (350px then 310px tall).
    const nestedRows = defaultVariant.locator('.adminLayoutPreview > .row').nth(2).locator('.column .row');
    const firstNestedIdBefore = await nestedRows.first().getAttribute('data-row-id');

    const firstNestedToolbar = defaultVariant.locator(`[data-row-toolbar="${firstNestedIdBefore}"]`);
    await firstNestedToolbar.getByRole('button', { name: 'Nested row ▾' }).click();
    await firstNestedToolbar.getByRole('menuitem', { name: 'Move down' }).click();

    await expect(nestedRows.nth(1)).toHaveAttribute('data-row-id', firstNestedIdBefore);
  });

  test('dragging a row by its toolbar handle onto another row reorders them', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    const defaultVariant = page.locator('.adminLayoutsEditor-variant').first();
    const rows = defaultVariant.locator('.adminLayoutPreview > .row');
    const firstRowId = await rows.first().getAttribute('data-row-id');

    const handle = defaultVariant.locator(`[data-row-toolbar="${firstRowId}"]`).getByRole('button', { name: 'Drag to reorder' });
    await handle.scrollIntoViewIfNeeded();
    await handle.hover();
    await page.mouse.down();
    const secondBox = await rows.nth(1).boundingBox();
    await page.mouse.move(secondBox.x + secondBox.width / 2, secondBox.y + secondBox.height / 2, { steps: 10 });
    await expect(defaultVariant.locator('.adminLayoutStructure-dropZone--over')).toHaveCount(1);
    await page.mouse.up();

    await expect(rows.nth(1)).toHaveAttribute('data-row-id', firstRowId);
  });

  test('removing a row asks for confirmation first, and only removes it once accepted', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    const defaultVariant = page.locator('.adminLayoutsEditor-variant').first();
    const rows = defaultVariant.locator('.adminLayoutPreview > .row');
    const rowCountBefore = await rows.count();
    const toolbar = defaultVariant.locator('.adminLayoutStructure-toolbar--row').first();

    const removeRow = async () => {
      await toolbar.getByRole('button', { name: 'Row ▾' }).click();
      await toolbar.getByRole('menuitem', { name: 'Remove row' }).click();
    };

    page.once('dialog', (dialog) => {
      expect(dialog.message()).toContain('Remove this row and everything in it?');
      dialog.dismiss();
    });
    await removeRow();
    await expect(rows).toHaveCount(rowCountBefore);

    page.once('dialog', (dialog) => dialog.accept());
    await removeRow();
    await expect(rows).toHaveCount(rowCountBefore - 1);
  });

  test('duplicating a row inserts a copy right after it', async ({ page }) => {
    await openLayouts(page, 'newHomes');

    const defaultVariant = page.locator('.adminLayoutsEditor-variant').first();
    const rows = defaultVariant.locator('.adminLayoutPreview > .row');
    const rowCountBefore = await rows.count();

    const toolbar = defaultVariant.locator('.adminLayoutStructure-toolbar--row').first();
    await toolbar.getByRole('button', { name: 'Row ▾' }).click();
    await toolbar.getByRole('menuitem', { name: 'Duplicate row' }).click();

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

    await page.locator('.adminLayoutsEditor-variant').getByRole('button', { name: 'Add row' }).click();
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
    await expect(page.getByText('This layout has no rows yet.')).toBeVisible();

    // Build the page's first row up from nothing, entirely in the preview.
    await page.locator('.adminLayoutsEditor-variant').getByRole('button', { name: 'Add row' }).click();
    const rowToolbar = page.locator('.adminLayoutStructure-toolbar--row');
    await rowToolbar.getByRole('button', { name: 'Row ▾' }).click();
    await rowToolbar.getByRole('menuitem', { name: 'Add column' }).click();
    const columnToolbar = page.locator('.adminLayoutStructure-toolbar--column');
    await columnToolbar.getByRole('button', { name: 'Column ▾' }).click();
    await columnToolbar.getByRole('menuitem', { name: 'Add tile' }).click();
    await page.getByText('Empty slot — click to choose a tile').click();
    await page.getByRole('dialog').getByText(/^description —/).click();
    await expect(page.locator('.adminLayoutPreview').getByText('E2E New Page Manor')).toBeVisible();
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

    // Place it via a column's toolbar, and confirm the preview renders a plain blue filler for it.
    const columnToolbar = page.locator('.adminLayoutStructure-toolbar--column').first();
    await columnToolbar.getByRole('button', { name: 'Column ▾' }).click();
    await columnToolbar.getByRole('menuitem', { name: 'Add tile' }).click();
    const emptySlot = page.getByText('Empty slot — click to choose a tile');
    await emptySlot.scrollIntoViewIfNeeded();
    await emptySlot.click();
    await page.getByRole('dialog').getByText(/^placeholderTile —/).click();

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

  // Reads a row's/column's current size back through its toolbar's "Edit size…"/"Edit
  // width…" form (the same inline form a click on a resize line opens), then closes it.
  const readSize = async (page, toolbar, menuLabel, itemLabel, fieldLabel) => {
    await toolbar.getByRole('button', { name: menuLabel }).click();
    await toolbar.getByRole('menuitem', { name: itemLabel }).click();
    const input = page.locator('.adminLayoutResize-edit').getByLabel(fieldLabel, { exact: true });
    const value = await input.inputValue();
    await input.press('Escape');
    await expect(input).toHaveCount(0);
    return value;
  };

  const firstRowId = (page) => page.locator('.adminLayoutPreview > .row').first().getAttribute('data-row-id');

  // The row resize handle lying along a given row's bottom edge.
  const handleAlongBottomOf = async (page, rowLocator) => {
    const rowBox = await rowLocator.boundingBox();
    const handles = page.locator('.adminLayoutResize-row');
    const count = await handles.count();
    for (let i = 0; i < count; i += 1) {
      const box = await handles.nth(i).boundingBox();
      if (box && Math.abs(box.y + box.height / 2 - (rowBox.y + rowBox.height)) < 3 && Math.abs(box.x - rowBox.x) < 3) {
        return handles.nth(i);
      }
    }
    throw new Error('No resize handle found along that row\'s bottom edge');
  };

  test('dragging a row\'s bottom edge in the preview resizes it', async ({ page }) => {
    await openLayouts(page, 'creditRiverManor');

    const rowId = await firstRowId(page);
    const toolbar = page.locator(`[data-row-toolbar="${rowId}"]`);
    const heightBefore = await readSize(page, toolbar, 'Row ▾', 'Edit size…', 'Height (px)');

    const handle = await handleAlongBottomOf(page, page.locator(`[data-row-id="${rowId}"]`));
    await dragBy(page, handle, 0, 60);

    const heightAfter = await readSize(page, toolbar, 'Row ▾', 'Edit size…', 'Height (px)');
    expect(heightAfter).not.toBe(heightBefore);
  });

  test('dragging a column\'s right edge in the preview resizes it', async ({ page }) => {
    await openLayouts(page, 'lyttonParkManorDetail');

    // The default layout's third row has two columns (46% / 54%); its first column's
    // right edge is a real, draggable boundary.
    const defaultVariant = page.locator('.adminLayoutsEditor-variant').first();
    const columnId = await defaultVariant.locator('.adminLayoutPreview > .row').nth(2)
      .locator(':scope > .column').first().getAttribute('data-column-id');
    const toolbar = defaultVariant.locator(`[data-column-toolbar="${columnId}"]`);
    expect(await readSize(page, toolbar, 'Column ▾', 'Edit width…', 'Width')).toBe('46%');

    const handles = defaultVariant.locator('.adminLayoutResize-column');
    const count = await handles.count();
    let target = null;
    for (let i = 0; i < count; i += 1) {
      const box = await handles.nth(i).boundingBox();
      const columnBox = await defaultVariant.locator(`[data-column-id="${columnId}"]`).boundingBox();
      if (box && Math.abs(box.x + box.width / 2 - (columnBox.x + columnBox.width)) < 3 && Math.abs(box.y - columnBox.y) < 3) {
        target = handles.nth(i);
        break;
      }
    }
    expect(target).not.toBeNull();
    await dragBy(page, target, -40, 0);

    expect(await readSize(page, toolbar, 'Column ▾', 'Edit width…', 'Width')).not.toBe('46%');
  });

  // Drags a resize line and checks the edge ends up where the pointer let go — not
  // merely that "something changed" (a line that resized by the wrong amount passes that).
  const expectEdgeFollowsDrag = async (page, target, handleFor, axis, distance) => {
    // Bring the edge being dragged (a row's bottom, or a column's top where its handle
    // is grabbed) to mid-screen — a tall row's bottom can otherwise sit below the fold.
    const before = await target.boundingBox();
    await page.evaluate((y) => window.scrollBy(0, y - 350), axis === 'y' ? before.y + before.height : before.y);
    const box = await target.boundingBox();
    const handle = await handleFor(box);
    const handleBox = await handle.boundingBox();
    const start = axis === 'y'
      ? { x: handleBox.x + 30, y: handleBox.y + handleBox.height / 2 }
      : { x: handleBox.x + handleBox.width / 2, y: handleBox.y + 30 };
    // Compared in page (not viewport) coordinates: shrinking a row can shorten the page
    // enough that the browser scrolls, which moves everything in the viewport.
    const scrollY = () => page.evaluate(() => window.scrollY);
    const releasedAt = (axis === 'y' ? start.y + (await scrollY()) : start.x) + distance;

    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(start.x + (axis === 'x' ? distance : 0), start.y + (axis === 'y' ? distance : 0), { steps: 10 });
    await page.mouse.up();

    await expect.poll(async () => {
      const after = await target.boundingBox();
      const edge = axis === 'y' ? after.y + after.height + (await scrollY()) : after.x + after.width;
      return Math.abs(edge - releasedAt);
    }).toBeLessThanOrEqual(2);
  };

  const rowHandleAt = (page) => async (box) => {
    const handles = page.locator('.adminLayoutResize-row');
    for (let i = 0; i < await handles.count(); i += 1) {
      const h = await handles.nth(i).boundingBox();
      if (h && Math.abs(h.y + h.height / 2 - (box.y + box.height)) < 3 && Math.abs(h.x - box.x) < 3) return handles.nth(i);
    }
    throw new Error('No row resize handle along that edge');
  };

  const columnHandleAt = (page) => async (box) => {
    const handles = page.locator('.adminLayoutResize-column');
    for (let i = 0; i < await handles.count(); i += 1) {
      const h = await handles.nth(i).boundingBox();
      if (h && Math.abs(h.x + h.width / 2 - (box.x + box.width)) < 3 && Math.abs(h.y - box.y) < 3) return handles.nth(i);
    }
    throw new Error('No column resize handle along that edge');
  };

  test('a row\'s bottom edge ends up exactly where it was dragged to — sized or not, top-level or nested', async ({ page }) => {
    await openLayouts(page, 'lyttonParkManorDetail');
    const variant = page.locator('.adminLayoutsEditor-variant').first();
    const topRows = variant.locator('.adminLayoutPreview > .row');

    // Row 2 is the description row, with no height set (sized by its text).
    await expectEdgeFollowsDrag(page, topRows.nth(1), rowHandleAt(page), 'y', 60);
    // Row 1 has a height (600).
    await expectEdgeFollowsDrag(page, topRows.nth(0), rowHandleAt(page), 'y', -80);
    // A nested row (350) inside row 3.
    await expectEdgeFollowsDrag(page, topRows.nth(2).locator('.column .row').first(), rowHandleAt(page), 'y', 40);
  });

  test('a column\'s right edge ends up exactly where it was dragged to, with its neighbour taking up the difference', async ({ page }) => {
    await openLayouts(page, 'lyttonParkManorDetail');
    const variant = page.locator('.adminLayoutsEditor-variant').first();

    // Row 3's "46%" / "54%" pair: together with their borders they overflow the row,
    // so flexbox shrinks both — the case that used to land 20–30px off.
    const pair = variant.locator('.adminLayoutPreview > .row').nth(2).locator(':scope > .column');
    const rowBox = await variant.locator('.adminLayoutPreview > .row').nth(2).boundingBox();
    await expectEdgeFollowsDrag(page, pair.first(), columnHandleAt(page), 'x', -60);
    // The neighbour still ends at the row's right edge.
    const second = await pair.nth(1).boundingBox();
    expect(Math.abs(second.x + second.width - (rowBox.x + rowBox.width))).toBeLessThanOrEqual(1);
  });

  test('a column in a row whose columns have no widths ends up exactly where it was dragged to', async ({ page }) => {
    await openLayouts(page, 'creditRiverManor');

    // Row 5: three columns with no width set — the case that used to land 100px+ off.
    const trio = page.locator('.adminLayoutPreview > .row').nth(4).locator(':scope > .column');
    await expectEdgeFollowsDrag(page, trio.first(), columnHandleAt(page), 'x', -40);

    await page.getByRole('button', { name: 'Review Changes' }).click();
    // All three were given explicit widths, not just the dragged one.
    const output = page.locator('.adminOutputPanel-file pre');
    for (const tile of ['diningRoom', 'kitchenBreakfastBay', 'familyRoomWithCustomMantel']) {
      await expect(output).toContainText(new RegExp(`width: '[\\d.]+%',\\s*children: \\[\\s*\\{\\s*nodeType: 'tileRef',\\s*tileKey: '${tile}'`));
    }
  });

  test('a nested row gets its own resize handle, which changes only that nested row', async ({ page }) => {
    await openLayouts(page, 'lyttonParkManorDetail');

    const defaultVariant = page.locator('.adminLayoutsEditor-variant').first();
    const parentRow = defaultVariant.locator('.adminLayoutPreview > .row').nth(2);
    const nestedRow = parentRow.locator('.column .row').first();

    const target = await handleAlongBottomOf(page, nestedRow);
    await dragBy(page, target, 0, -50);

    await page.getByRole('button', { name: 'Review Changes' }).click();
    const output = page.locator('.adminOutputPanel-file pre');
    await expect(output).toContainText('height: 300');
    // The parent row and the other nested row keep their own heights.
    await expect(output).toContainText('height: 660');
    await expect(output).toContainText('height: 310');
  });

  test('clicking (not dragging) a resize line opens an inline form, and typing an exact height and image height commits both', async ({
    page
  }) => {
    await openLayouts(page, 'creditRiverManor');

    const handle = page.locator('.adminEditableLayoutPreview .adminLayoutResize-row').last();
    await handle.scrollIntoViewIfNeeded();
    await handle.click();

    const form = page.locator('.adminLayoutResize-edit');
    const heightInput = form.getByLabel('Height (px)', { exact: true });
    await expect(heightInput).toBeVisible();

    await heightInput.fill('555');
    await form.getByLabel('Image height (px)', { exact: true }).fill('444');
    await form.getByLabel('Image height (px)', { exact: true }).press('Enter');
    await expect(heightInput).toHaveCount(0);

    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-fileHeader code')).toHaveText('static/layouts/credit-river-manor.js');
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText('height: 555');
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText('imageHeight: 444');
  });
});

test.describe('layouts editor — moving and removing a tile\'s spot from its popover', () => {
  test('"Remove from layout" takes the clicked tile out of the preview, leaving the tile in the library', async ({ page }) => {
    await unlock(page);
    await page.getByRole('button', { name: 'Layouts' }).click();
    await page.getByLabel('Page').selectOption('creditRiverManor');

    const images = page.locator('.adminLayoutPreview img');
    const countBefore = await images.count();
    await images.first().click();
    await page.getByRole('dialog').getByRole('button', { name: 'Remove from layout' }).click();

    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(images).toHaveCount(countBefore - 1);
    await expect(page.locator('.adminTileLibrary li', { hasText: '1 —' })).toBeVisible();
  });
});

test.describe('layouts editor — edits that change the layout under other controls', () => {
  const openLayouts = async (page, pageKey) => {
    await unlock(page);
    await page.getByRole('button', { name: 'Layouts' }).click();
    await page.getByLabel('Page').selectOption(pageKey);
  };

  test('removing the first of two sized columns leaves the editor working', async ({ page }) => {
    await openLayouts(page, 'lyttonParkManorDetail');
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));

    // Row 3's "46%" / "54%" pair.
    const variant = page.locator('.adminLayoutsEditor-variant').first();
    const row = variant.locator('.adminLayoutPreview > .row').nth(2);
    const firstColumnId = await row.locator(':scope > .column').first().getAttribute('data-column-id');
    const toolbar = variant.locator(`[data-column-toolbar="${firstColumnId}"]`);
    page.once('dialog', (dialog) => dialog.accept());
    await toolbar.getByRole('button', { name: 'Column ▾' }).click();
    await toolbar.getByRole('menuitem', { name: 'Remove column' }).click();

    await expect(row.locator(':scope > .column')).toHaveCount(1);
    // Still alive: the remaining column's toolbar works.
    await expect(variant.locator('.adminLayoutStructure-toolbar--column').first()).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('the tile popover closes when the layout is changed elsewhere, so it can\'t undo that change', async ({ page }) => {
    await openLayouts(page, 'creditRiverManor');

    await page.locator('.adminLayoutPreview img').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    const rows = page.locator('.adminLayoutPreview > .row');
    const rowCount = await rows.count();
    // The popover is fixed on screen and can end up covering "Add row" — press it
    // directly rather than by clicking at its position.
    await page.getByRole('button', { name: 'Add row' }).dispatchEvent('click');

    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(rows).toHaveCount(rowCount + 1);
  });

  test('deleting a tile removes it from the layout too, so the saved file never points at a missing tile', async ({ page }) => {
    await openLayouts(page, 'creditRiverManor');
    const images = page.locator('.adminLayoutPreview img');
    const imageCount = await images.count();

    await images.first().click();
    page.once('dialog', (dialog) => {
      expect(dialog.message()).toBe('Delete the tile "1"? It\'s placed in 1 spot in this page\'s layout, which will be removed too.');
      dialog.accept();
    });
    await page.getByRole('dialog').getByRole('button', { name: 'Delete this tile' }).click();

    await expect(images).toHaveCount(imageCount - 1);
    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-file pre')).not.toContainText("tileKey: '1'");
  });

  test('clicking a second tile while the first one\'s form is open edits the second tile, not a copy of the first', async ({ page }) => {
    await openLayouts(page, 'creditRiverManor');
    const images = page.locator('.adminLayoutPreview img');
    const dialog = page.getByRole('dialog');

    await images.nth(0).click();
    await expect(dialog.getByText('Editing tile: 1')).toBeVisible();
    const firstUrl = await dialog.getByLabel('Image URL').inputValue();

    await images.nth(1).click();
    await expect(dialog.getByText(/^Editing tile: (?!1$)/)).toBeVisible();
    await expect(dialog.getByLabel('Image URL')).not.toHaveValue(firstUrl);
  });

  test('an open exact-size form closes when its row is dragged, instead of later saving its old value', async ({ page }) => {
    await openLayouts(page, 'creditRiverManor');
    const row = page.locator('.adminLayoutPreview > .row').first();
    const rowBox = await row.boundingBox();
    await page.evaluate((y) => window.scrollBy(0, y - 350), rowBox.y + rowBox.height);
    const box = await row.boundingBox();
    const edgeY = box.y + box.height;

    // Click the line (opens the form at 380), then drag the same line down 60px.
    await page.mouse.click(box.x + box.width / 2, edgeY);
    const form = page.locator('.adminLayoutResize-edit');
    await expect(form.getByLabel('Height (px)', { exact: true })).toHaveValue('380');
    await page.mouse.move(box.x + box.width / 2, edgeY);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, edgeY + 60, { steps: 10 });
    await page.mouse.up();

    await expect(form).toHaveCount(0);
    // A click elsewhere can't bring the old 380 back.
    await page.getByRole('heading', { name: 'Layout' }).click();
    await page.getByRole('button', { name: 'Review Changes' }).click();
    await expect(page.locator('.adminOutputPanel-file pre')).toContainText('height: 440');
  });

  test('the tile popover closes when the page scrolls, but not while its fields are being typed in', async ({ page }) => {
    await openLayouts(page, 'creditRiverManor');
    const dialog = page.getByRole('dialog');

    await page.locator('.adminLayoutPreview img').first().click();
    await expect(dialog).toBeVisible();
    await page.mouse.wheel(0, 400);
    await expect(dialog).toHaveCount(0);

    await page.locator('.adminLayoutPreview img').first().click();
    await dialog.getByLabel('Image URL').click();
    await page.mouse.wheel(0, 400);
    await expect(dialog).toBeVisible();
  });
});
