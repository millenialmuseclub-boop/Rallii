import { chromium } from '../build/photography-tools/node_modules/playwright/index.mjs';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
const report = { errors: [], checks: [] };
page.on('pageerror', error => report.errors.push(error.message));
try {
  await page.goto(`${process.env.QUALITY_BASE ?? 'http://127.0.0.1:4225'}/routes/bernina-express/`);
  const nav = page.getByRole('navigation', { name: 'Journey workspace' });
  await nav.getByRole('button', { name: 'Timeline', exact: true }).click();
  await page.locator('#timeline button').first().click();
  await page.getByRole('button', { name: 'Fit route', exact: true }).waitFor({ timeout: 45000 });
  await page.locator('.landmark-marker--selected').waitFor();
  assert.equal(await page.locator('.landmark-marker--selected').evaluate(marker => getComputedStyle(marker).position), 'absolute');
  await page.locator('.maplibregl-popup').waitFor();
  await page.getByRole('button', { name: 'Stations on', exact: true }).click();
  assert.equal(await page.locator('.route-marker').first().isVisible(), false);
  await page.getByRole('button', { name: 'Stations off', exact: true }).click();
  await page.getByRole('button', { name: 'Fit route', exact: true }).click();
  // Give the external basemap time to paint before the visual inspection.
  await page.waitForTimeout(3000);
  await page.locator('.route-map-frame').screenshot({ path: 'build/ota-quality/after-map-mobile.png' });
  report.checks.push('Live map, route geometry, initially selected landmark popup, station visibility, fit route, reduced-motion setting');
  await page.route('**/data/routes/bernina-express.geojson', route => route.abort());
  await nav.getByRole('button', { name: 'Overview', exact: true }).click();
  await nav.getByRole('button', { name: 'Map', exact: true }).click();
  await page.getByText(/prepared route could not load|Failed to fetch|Route geometry returned/).waitFor();
  report.checks.push('Map geometry network failure renders an error without unhandled rejection');
  assert.equal(report.errors.length, 0);
} finally { await writeFile('build/ota-quality/map-verification.json', JSON.stringify(report, null, 2)); await browser.close(); }
console.log(report);
