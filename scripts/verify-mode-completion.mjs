import { chromium } from '../build/photography-tools/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.env.MODE_CHECK_BASE ?? 'http://127.0.0.1:4190';
const dir = 'build/mode-completion';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = { pages: [], checks: [], errors: [] };
const scenarios = [
  { mode: 'trail', slug: 'lower-yosemite-fall', name: 'Lower Yosemite Fall', choices: { difficulty: 'Easy', distance: 'Under 5 km' }, save: 'Want to Go' },
  { mode: 'snow', slug: 'zermatt', name: 'Zermatt', choices: { month: 'January', activity: 'Scenic-only', group: 'Family' }, save: 'Want to Go' },
  { mode: 'mtb', slug: 'lost-lake', name: 'Lost Lake Trails', choices: { skill: 'Beginner', access: 'Pedal-powered' }, save: 'Want to Ride' },
];
try {
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push({ url: page.url(), error: error.message }));
    async function visit(path) {
      const response = await page.goto(base + path, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200, path);
      await page.locator('main').waitFor();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `overflow: ${width} ${path}`);
      assert.equal(await page.locator('[data-nextjs-dialog]').count(), 0);
      report.pages.push({ width, path });
    }
    for (const scenario of scenarios) {
      const { mode, slug, name, choices, save } = scenario;
      await visit(`/${mode}/`);
      const tabs = page.locator('.outdoor-collection-tabs button');
      for (let index = 0; index < await tabs.count(); index++) {
        await tabs.nth(index).click();
        const cards = page.locator('.outdoor-photo-rail article');
        assert.ok(await cards.count() > 0 && await cards.count() <= 4, `empty collection ${mode} ${index}`);
      }
      await page.locator('.outdoor-discovery').screenshot({ path: `${dir}/${mode}-discover-${width}.png` });
      await visit(`/${mode}/${slug}/`);
      await page.getByRole('link', { name: new RegExp('Build a .* trip around') }).click();
      await page.waitForURL(url => url.pathname.replace(/\/$/, '') === `/${mode}/plan`);
      assert.equal(await page.locator('select[name=route]').inputValue(), slug);
      for (const [key, value] of Object.entries(choices)) await page.locator(`select[name=${key}]`).selectOption(value);
      await page.locator('select[name=days]').selectOption('Long weekend');
      await page.getByRole('button', { name: 'Find my trip' }).click();
      await page.waitForURL(url => url.searchParams.get('days') === 'Long weekend');
      assert.equal(await page.locator('.outdoor-plan-results>section').count(), 1);
      await page.getByRole('button', { name: `${save}: ${name}`, exact: true }).click();
      assert.equal(await page.getByRole('button', { name: `${save}: ${name}`, exact: true }).getAttribute('aria-pressed'), 'true');
      await page.getByRole('button', { name: 'Save planning preferences' }).click();
      await page.reload({ waitUntil: 'domcontentloaded' });
      assert.equal(await page.getByRole('button', { name: `${save}: ${name}`, exact: true }).getAttribute('aria-pressed'), 'true');
      await page.getByRole('link', { name: 'Reset choices', exact: true }).click();
      await page.getByRole('link', { name: 'Restore saved preferences', exact: false }).click();
      await page.waitForURL(url => url.searchParams.get('route') === slug);
      assert.equal(await page.locator('select[name=days]').inputValue(), 'Long weekend');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      await page.screenshot({ path: `${dir}/${mode}-plan-${width}.png`, fullPage: true });
      if (width === 390) assert.equal(await page.locator('.phone-nav a[aria-current=page]').innerText(), 'Plan');
      await visit('/my-rallii/');
      assert.ok((await page.locator('main').innerText()).includes(name), `saved ${name}`);
      report.checks.push(`${width}: ${mode} collections, detail → plan, filter, save, reload, restore, My Rallii`);
    }
    for (const path of ['/rail/', '/discover/', '/plan/', '/routes/glacier-express/', '/compare/', '/ride/glacier-express/', '/green/', '/green/plan/', '/green/courses/pebble-beach/']) await visit(path);
    if (width === 390) {
      await page.locator('.phone-activity select').selectOption('trail');
      await page.waitForURL(/\/trail/);
      report.checks.push('Mobile mode switching');
    }
    await context.close();
  }
  // Isolated provider responses exercise failure and delayed rendering without
  // sending test data to booking services or pretending a fixture is live.
  const page = await browser.newPage();
  await page.route('https://tpwdgt.com/**', route => route.fulfill({ contentType: 'application/javascript', body: '' }));
  await page.goto(`${base}/partner-widget.html?kind=stays&trs=test&shmarker=test`);
  assert.equal(await page.locator('#status').isVisible(), true);
  await page.waitForFunction(() => document.querySelector('#status').textContent.includes('unavailable'), { timeout: 18000 });
  await page.unroute('https://tpwdgt.com/**');
  await page.route('https://tpwdgt.com/**', route => route.fulfill({ contentType: 'application/javascript', body: 'setTimeout(()=>{const host=document.createElement("div");document.body.append(host);const root=host.attachShadow({mode:"open"});setTimeout(()=>{const f=document.createElement("form");f.style.cssText="width:300px;height:350px";f.innerHTML="<input aria-label=Destination><button>Search</button>";root.append(f)},500)},500)' }));
  await page.reload();
  await page.locator('form').waitFor();
  assert.equal(await page.locator('#status').isHidden(), true);
  await page.unroute('https://tpwdgt.com/**');
  await page.route('https://tpwdgt.com/**', route => route.abort());
  await page.reload();
  await page.waitForFunction(() => document.querySelector('#status').textContent.includes('unavailable'));
  report.checks.push('Widget empty-script timeout, delayed shadow-DOM form readiness, network failure');
  await page.close();
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
} finally {
  await writeFile(`${dir}/results.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify({ visits: report.pages.length, checks: report.checks, errors: report.errors }, null, 2));
