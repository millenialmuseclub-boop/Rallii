// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright entry point.
// Uses fresh browser contexts; never reads or alters a personal browser profile.
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : "playwright");
const base = process.env.REVIEW_URL ?? "http://localhost:3000";
const directory = "artifacts/mobile-review";
mkdirSync(directory, { recursive: true });
const browser = await chromium.launch({ headless: true });
let debugPage;
const report = { flows: [], layouts: [], errors: [] };
const visit = async (page, path) => { const response = await page.goto(base + path); assert.ok(response?.ok(), `${path} loads`); await page.locator("main").waitFor(); };
try {
  const context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  debugPage = page;
  page.on("pageerror", error => report.errors.push(error.message));
  for (const mode of ["rail", "green", "trail", "mtb", "snow"]) {
    await visit(page, "/");
    await page.getByLabel("Switch activity").selectOption(mode);
    await page.waitForURL(`**/${mode}`);
    if (mode === "rail") { await page.locator(".phone-nav").getByRole("link", { name: "Discover", exact: true }).click(); await page.waitForURL("**/discover"); }
    console.log("BROWSE", mode, page.url());
    const queries = { rail: "Glacier", green: "Pebble", trail: "Yosemite", mtb: "Whistler", snow: "Whistler" };
    const input = page.locator(mode === "rail" ? ".discover-search input" : mode === "green" ? ".catalogue .search input" : ".discovery-search input");
    await input.fill(queries[mode]);
    if (["trail", "mtb", "snow"].includes(mode)) {
      await page.locator(".discovery-search").getByRole("button", { name: "Search", exact: true }).click();
      await page.waitForURL(url => url.searchParams.get("q") === queries[mode]);
      await page.locator(".catalogue-filters summary").click();
      const label = mode === "trail" ? "Difficulty" : mode === "mtb" ? "Rider level" : "Type";
      await page.getByRole("combobox", { name: label, exact: true }).selectOption(mode === "trail" ? "Easy" : mode === "mtb" ? "Beginner" : "Resort");
    } else if (mode === "green") {
      await page.getByRole("button", { name: "Refine the atlas" }).click();
      await page.getByRole("button", { name: "coastal", exact: true }).click();
    } else {
      await page.getByRole("button", { name: "Europe", exact: true }).click();
    }
    const card = page.locator(mode === "rail" ? ".compact-route-grid .journey-card" : mode === "green" ? ".course-rail .course-card" : ".destination-grid article").first();
    await card.waitFor();
    await card.scrollIntoViewIfNeeded();
    await card.locator("img").first().evaluate(img => img.decode());
    await card.screenshot({ path: `${directory}/card-${mode}.png` });
    const title = card.locator("h2 a,h3 a").first();
    const name = (await title.innerText()).trim();
    const detailPath = await title.getAttribute("href");
    await title.click();
    await page.waitForURL(url => url.pathname.replace(/\/$/, "") === detailPath.replace(/\/$/, ""));
    await page.locator("h1").waitFor();
    const button = page.getByRole("button", { name: mode === "green" ? "Want to Play" : mode === "mtb" ? `Want to Ride: ${name}` : mode === "rail" ? "Save journey" : `Want to Go: ${name}`, exact: true }).first();
    await button.click();
    await page.waitForFunction(() => [...document.querySelectorAll("button[aria-pressed=true]")].some(button => /Saved|Want to Go|Want to Ride|Want to Play/.test(button.textContent)));
    console.log("DETAIL",mode,page.url());
    await page.goBack();
    console.log("BACK",mode,page.url());
    await input.waitFor();
    assert.equal(await input.inputValue(), queries[mode], `${mode} retains search`);
    assert.ok((await page.locator("main").innerText()).includes(name));
    await page.locator(".phone-nav").getByRole("link", { name: "Saved", exact: true }).click();
    await page.waitForURL(url => url.pathname === (mode === "rail" ? "/saved" : mode === "green" ? "/green/my-green" : "/my-rallii"));
    await page.locator("main a:visible").filter({ hasText: name }).first().waitFor();
    await page.reload();
    await page.locator("main a:visible").filter({ hasText: name }).first().waitFor();
    report.flows.push({ mode, destination: name, result: "switch, query, filter, detail, save, back, saved library and reload passed" });
    console.log("FLOW", mode, "PASS", name);
  }
  await context.close();
  const countContext = await browser.newContext({ serviceWorkers: "block", viewport: { width: 390, height: 844 } });
  const countPage = await countContext.newPage();
  debugPage = countPage;
  for (const mode of ["rail", "green"]) {
    await visit(countPage, mode === "rail" ? "/discover" : "/green");
    const cards = countPage.locator(mode === "rail" ? ".compact-route-grid .journey-card" : ".course-rail .course-card");
    await countPage.getByRole("button", { name: mode === "rail" ? "Show 8 more journeys" : /Show more courses/ }).click();
    const count = await cards.count();
    const link = cards.last().locator("h3 a");
    const href = await link.getAttribute("href");
    await link.click(); await countPage.waitForURL(url => url.pathname === href);
    assert.equal(await countPage.locator(".phone-nav").getByRole("link", { name: "Discover", exact: true }).getAttribute("aria-current"), "page");
    await countPage.goBack(); await cards.first().waitFor();
    assert.equal(await cards.count(), count, mode + " retains expanded results");
  }
  await countContext.close();
  const layoutContext = await browser.newContext({ serviceWorkers: "block" });
  const layout = await layoutContext.newPage();
  debugPage = layout;
  layout.on("pageerror", error => report.errors.push(error.message));
  const routes = ["/", "/rail", "/discover", "/green", "/trail", "/mtb", "/snow", "/routes/glacier-express", "/green/courses/pebble-beach", "/trail/lower-yosemite-fall", "/mtb/whistler-bike-park", "/snow/whistler-blackcomb", "/saved", "/green/my-green", "/my-rallii", "/pro"];
  for (const width of [390, 360, 430, 768, 1440]) {
    await layout.setViewportSize({ width, height: width > 800 ? 1000 : 844 });
    for (const route of routes) {
      await visit(layout, route);
      await layout.evaluate(() => document.fonts.ready);
      await layout.waitForFunction(() => [...document.images].filter(img => { const r = img.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0; }).every(img => img.complete && img.naturalWidth > 0));
      const metrics = await layout.evaluate(() => ({ width: window.innerWidth, contentWidth: document.documentElement.scrollWidth, header: document.querySelector(".phone-header").getBoundingClientRect().height, title: document.querySelector("h1")?.textContent, overlay: !!document.querySelector("[data-nextjs-dialog]") }));
      const file = `${directory}/${width}-${route.replaceAll("/", "-") || "home"}.png`;
      await layout.screenshot({ path: file });
      report.layouts.push({ route, ...metrics, screenshot: file });
      if (metrics.contentWidth > width || metrics.overlay) report.errors.push(`${width} ${route}: overflow or error overlay`);
    }
    console.log("LAYOUT", width, "complete");
  }
  await layoutContext.close();
} catch (error) {
  if (debugPage && !debugPage.isClosed()) { await debugPage.screenshot({path: `${directory}/failure.png`}); console.error(debugPage.url(), await debugPage.locator("body").innerText(), await debugPage.evaluate(() => JSON.stringify(localStorage))); }
  report.errors.push(error.stack);
  console.error(error);
  process.exitCode = 1;
} finally {
  writeFileSync(`${directory}/results.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
