import { chromium } from '../build/photography-tools/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
const dir = 'build/ota-quality';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const report = { pages: [], errors: [] };
page.on('pageerror', error => report.errors.push({ url: page.url(), message: error.message }));
try {
  for (const path of ['/', '/rail/', '/routes/glacier-express/', '/routes/bernina-express/', '/routes/goldenpass-express/', '/routes/west-highland-line/', '/routes/flam-railway/', '/trail/', '/trail/mist-trail/', '/mtb/', '/mtb/lost-lake/', '/snow/', '/snow/zermatt/', '/snow/compare/', '/compare/', '/ride/glacier-express/', '/search/', '/saved/', '/plan/']) {
    const response = await page.goto(`https://rallii-kappa.vercel.app${path}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.locator('main').waitFor();
    console.log(path, response.status());
    report.pages.push({ path, status: response.status(), title: await page.title(), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), brokenImages: await page.locator('img').evaluateAll(images => images.filter(image => image.complete && !image.naturalWidth).map(image => image.src)), text: (await page.locator('main').innerText()).slice(0, 4500) });
    if (['/routes/glacier-express/', '/snow/', '/mtb/'].includes(path)) await page.screenshot({ path: `${dir}/before-${path.split('/').filter(Boolean).join('-')}.png` });
    if (path === '/routes/glacier-express/') {
      for (const name of ['Best Side', 'Timeline', 'Map', 'Practical']) {
        await page.getByRole('navigation', { name: 'Journey workspace' }).getByRole('button', { name, exact: true }).click();
        report.pages.push({ path: `${path} ${name}`, text: (await page.locator('.journey-surface--active').last().innerText()).slice(0, 3000) });
      }
      await page.screenshot({ path: `${dir}/before-map.png` });
    }
  }
} finally {
  await writeFile(`${dir}/production-audit.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify({ pages: report.pages.length, errors: report.errors, failures: report.pages.filter(p => p.status && (p.status !== 200 || p.overflow || p.brokenImages.length)) }));
