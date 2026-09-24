import { chromium } from '../build/photography-tools/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.env.QUALITY_BASE ?? 'http://127.0.0.1:4215';
const dir = 'build/ota-quality';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = { checks: [], pages: [], errors: [], consoleErrors: [] };
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
await context.addInitScript(() => {
  window.qualityEvents = [];
  window.addEventListener('rallii:analytics', event => window.qualityEvents.push(event.detail));
  // Separate browser profile; never read or clear a user's real saved library.
  if (!localStorage.getItem('quality-seeded')) {
    localStorage.setItem('rallii:travel-library', JSON.stringify({ version: 1, routes: { 'bernina-express': 'want_to_go' } }));
    localStorage.setItem('rallii:snow-library:v1', JSON.stringify({ version: 1, places: { portillo: { status: 'been', favorite: true } } }));
    localStorage.setItem('quality-seeded', 'true');
  }
  Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.copiedLink = text; } } });
});
const page = await context.newPage();
page.on('pageerror', error => report.errors.push({ url: page.url(), message: error.message }));
page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push({ url: page.url(), message: message.text() }); });
async function visit(path) {
  const response = await page.goto(base + path, { waitUntil: 'domcontentloaded' });
  assert.equal(response.status(), 200, path);
  await page.locator('main').waitFor();
  await page.locator('.phone-activity select').waitFor({ state: 'attached' });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `overflow ${path}`);
  report.pages.push(path);
}
const workspace = () => page.getByRole('navigation', { name: 'Journey workspace' });
try {
  for (const slug of ['glacier-express','bernina-express','goldenpass-express','west-highland-line','flam-railway']) {
    await visit(`/routes/${slug}/`);
    await page.getByRole('button', { name: 'Share journey', exact: true }).click();
    assert.equal(await page.evaluate(() => window.copiedLink), `https://rallii-kappa.vercel.app/routes/${slug}/`);
    const heroSide = await page.locator('.route-hero-seat-guide strong').innerText();
    await workspace().getByRole('button', { name: 'Best Side', exact: true }).click();
    const overall = await page.locator('#best-side .text-5xl').innerText();
    assert.equal(heroSide === 'It varies' ? 'Varies' : heroSide, overall);
    await workspace().getByRole('button', { name: 'Timeline', exact: true }).click();
    assert.ok(await page.locator('#timeline button').count());
    await page.locator('#timeline button').first().click();
    assert.equal(await workspace().getByRole('button', { name: 'Map', exact: true }).getAttribute('aria-pressed'), 'true');
    await page.locator('.route-map-canvas').waitFor();
    // Tile networks are optional; the geometry and selected marker must still be handled without a crash.
    await workspace().getByRole('button', { name: 'Overview', exact: true }).click();
    await page.getByRole('button', { name: /^Change journey direction/ }).click();
    await page.getByRole('button', { name: 'Share journey', exact: true }).click();
    assert.match(await page.evaluate(() => window.copiedLink), /direction=reverse/);
    await workspace().getByRole('button', { name: 'Practical', exact: true }).click();
    assert.equal(await page.locator('#practical').isVisible(), true);
    report.checks.push(`${slug}: seat consistency, timeline→map, reverse direction, copy share, practical`);
  }
  await visit('/search/?mode=snow&country=Chile&month=8');
  assert.equal(await page.getByRole('combobox', { name: 'Discovery mode' }).inputValue(), 'snow');
  assert.equal(await page.getByRole('combobox', { name: 'Discovery country' }).inputValue(), 'Chile');
  assert.ok(await page.locator('.field-notes-grid article').count());
  await page.reload();
  assert.equal(await page.getByRole('combobox', { name: 'Snow planning month' }).inputValue(), '8');
  await page.getByRole('button', { name: 'Surprise me', exact: true }).click();
  await page.waitForURL(/\/snow\/[^/?]+\/$/);
  report.checks.push('Snow country/month URL reload and Surprise me');
  await visit('/search/?mode=rail&country=Italy&q=Bernina');
  assert.match(await page.locator('.field-notes-grid').innerText(), /Bernina/);
  await page.getByLabel('Place or landscape').fill('no-such-destination');
  await page.getByRole('button', { name: 'Search journeys', exact: true }).click();
  await page.waitForURL(/no-such-destination/);
  assert.equal(await page.getByRole('button', { name: 'Surprise me', exact: true }).isDisabled(), true);
  await page.getByRole('button', { name: 'Clear discovery filters', exact: true }).click();
  await page.waitForURL(url => !url.searchParams.has('q'));
  report.checks.push('Cross-border search, empty results, clear filters');
  await visit('/compare/?routes=glacier-express,bernina-express');
  await page.getByRole('combobox', { name: 'Journey B', exact: true }).selectOption('flam-railway');
  await page.waitForURL(/flam-railway/);
  assert.match(await page.locator('.comparison-list').getAttribute('aria-label'), /Flåm/);
  await page.goBack();
  assert.equal(await page.getByRole('combobox', { name: 'Journey B', exact: true }).inputValue(), 'bernina-express');
  await visit('/snow/compare/?mountains=portillo,zermatt');
  await page.getByRole('combobox', { name: 'Mountain 1', exact: true }).selectOption('lake-louise');
  await page.waitForURL(/lake-louise/);
  await page.reload();
  assert.equal(await page.getByRole('combobox', { name: 'Mountain 1', exact: true }).inputValue(), 'lake-louise');
  report.checks.push('Rail comparison updates/back navigation and Snow comparison reload');
  for (const path of ['/snow/zermatt/', '/mtb/lost-lake/', '/trail/mist-trail/']) {
    await visit(path);
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://rallii-kappa.vercel.app${path}`);
    assert.ok(await page.locator('meta[property="og:image"]').getAttribute('content'));
    await page.getByRole('button', { name: 'Share journey', exact: true }).click();
    assert.equal(await page.evaluate(() => window.copiedLink), `https://rallii-kappa.vercel.app${path}`);
    assert.ok(await page.evaluate(() => window.qualityEvents.some(event => event.event === 'share')));
    await page.screenshot({ path: `${dir}/after-${path.split('/').filter(Boolean).join('-')}.png` });
  }
  await visit('/routes/glacier-express/');
  await page.getByRole('button', { name: 'Save journey', exact: true }).click();
  await page.reload();
  assert.equal(await page.getByRole('button', { name: 'Saved', exact: true }).getAttribute('aria-pressed'), 'true');
  const storage = await page.evaluate(() => ({ rail: JSON.parse(localStorage.getItem('rallii:travel-library')), snow: JSON.parse(localStorage.getItem('rallii:snow-library:v1')) }));
  assert.equal(storage.rail.routes['bernina-express'], 'want_to_go');
  assert.deepEqual(storage.snow.places.portillo, { status: 'been', favorite: true });
  await page.screenshot({ path: `${dir}/after-rail-mobile.png` });
  report.checks.push('Save/reload preserves existing Rail and Snow entries');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined }));
  await page.getByRole('button', { name: 'Share journey', exact: true }).click();
  assert.match(await page.getByLabel('Journey link', { exact: true }).inputValue(), /https:\/\/rallii-kappa.vercel.app/);
  report.checks.push('Sharing works with a manual-copy fallback when clipboard/share APIs are absent');

  await visit('/ride/bernina-express/?direction=reverse');
  assert.equal(await page.getByRole('button', { name: 'Tirano → St. Moritz', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: 'Try Demo Mode', exact: true }).click();
  await page.locator('#demo-progress').waitFor();
  await page.locator('#demo-progress').fill('55');
  assert.match(await page.locator('.ride-progress').innerText(), /55%/);
  await page.getByRole('button', { name: 'End Ride Mode', exact: true }).click();
  await page.evaluate(() => {
    window.clearedWatches = [];
    Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
      watchPosition(success, failure) { window.geoSuccess = success; window.geoFailure = failure; return 7; },
      clearWatch(id) { window.clearedWatches.push(id); }
    } });
  });
  await page.getByRole('button', { name: 'Use My Location', exact: true }).click();
  await page.evaluate(() => window.geoSuccess({ coords: { latitude: 0, longitude: 0, accuracy: 10 } }));
  assert.equal(await page.locator('.ride-progress').count(), 0);
  assert.equal(await page.locator('.ride-up-next').count(), 0);
  await page.evaluate(() => window.geoFailure({ code: 1, PERMISSION_DENIED: 1 }));
  await page.getByRole('button', { name: 'Try Demo Mode', exact: true }).waitFor();
  assert.deepEqual(await page.evaluate(() => window.clearedWatches), [7]);
  report.checks.push('Reverse Ride Mode, demo progress, off-route suppression, location error cleanup');

  await page.route('**/data/routes/bernina-express.geojson', route => route.fulfill({ status: 503, body: 'Unavailable' }));
  await visit('/ride/bernina-express/');
  await page.getByRole('button', { name: 'Retry route', exact: true }).waitFor();
  await page.unroute('**/data/routes/bernina-express.geojson');
  await Promise.all([page.waitForResponse(response => response.url().includes('bernina-express.geojson') && response.status() === 200), page.getByRole('button', { name: 'Retry route', exact: true }).click()]);
  await page.getByRole('button', { name: 'Try Demo Mode', exact: true }).click();
  await page.locator('#demo-progress').waitFor();
  report.checks.push('Failed geometry has recovery; retry restores demo');
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/search/?mode=snow', '/routes/bernina-express/', '/snow/zermatt/', '/mtb/lost-lake/', '/trail/mist-trail/']) await visit(path);
  }
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
} finally {
  await writeFile(`${dir}/verification.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
