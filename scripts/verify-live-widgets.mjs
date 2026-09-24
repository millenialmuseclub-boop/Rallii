import { chromium } from '../build/photography-tools/node_modules/playwright/index.mjs';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createPartnerWidgetUrl } from '../src/lib/partner-widget.ts';
import assert from 'node:assert/strict';
const env = await readFile('.env.example', 'utf8');
const trs = env.match(/^NEXT_PUBLIC_TRAVELPAYOUTS_TRS=(.+)$/m)[1].trim();
const marker = env.match(/^NEXT_PUBLIC_TRAVELPAYOUTS_MARKER=(.+)$/m)[1].trim();
const dir = 'build/mode-completion';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const kind of ['stays', 'flights', 'cars', 'activities']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const failures = [];
    const responses = [];
    page.on('pageerror', error => failures.push({ error: error.message, stack: error.stack?.slice(0, 600) }));
    page.on('response', async response => {
      if (response.url().startsWith('https://tpwdgt.com/content')) {
        const body = await response.text();
        responses.push({ status: response.status(), bytes: body.length });
        await writeFile(`${dir}/widget-${kind}-provider.js`, body);
      }
    });
    page.on('requestfailed', request => failures.push({ host: new URL(request.url()).hostname, error: request.failure()?.errorText }));
    await page.goto((process.env.WIDGET_CHECK_BASE ?? 'http://127.0.0.1:4190') + createPartnerWidgetUrl(kind, trs, marker));
    await page.locator('#status').waitFor({ state: 'hidden', timeout: 20000 });
    await page.waitForTimeout(4000);
    let controls = 0, focused = false;
    for (const frame of page.frames()) {
      controls += await frame.locator('input:visible, button:visible, a:visible').count();
      const input = frame.locator('input:visible').first();
      if (!focused && await input.count()) { await input.click(); focused = true; }
    }
    assert.ok(controls > 0, `${kind}: no visible interactive controls`);
    results.push({ kind, statusVisible: await page.locator('#status').isVisible(), controls, focused, frames: page.frames().length, failures, responses });
    await page.screenshot({ path: `${dir}/widget-${kind}.png`, fullPage: true });
    await page.close();
  }
} finally { await browser.close(); }
await writeFile(`${dir}/live-widgets.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
