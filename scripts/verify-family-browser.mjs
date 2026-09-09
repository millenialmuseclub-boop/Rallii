// Local Chromium verification. Does not configure purchases or ship a Pro override.
import { createRequire } from "node:module";
import { mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import assert from "node:assert/strict";
import { createServer } from "node:http";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.RALLII_PLAYWRIGHT_PATH || "playwright");
const root = process.cwd();
const generated = resolve("build/pro-ui");
await mkdir(generated, { recursive: true });
await writeFile(join(generated, "loader.cjs"), `const ts = require(${JSON.stringify(require.resolve("typescript"))}); module.exports = function(source) { return ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext } }).outputText; };`);
await writeFile(join(generated, "navigation.js"), 'import {useSyncExternalStore} from "react"; const navigate = path => {history.replaceState(null,"",path); window.dispatchEvent(new Event("fixture-navigation"));}; export const useRouter = () => ({push:navigate,replace:navigate}); export const usePathname = () => useSyncExternalStore(fn => {window.addEventListener("fixture-navigation",fn);return () => window.removeEventListener("fixture-navigation",fn);},()=>location.pathname,()=>"/");');
await writeFile(join(generated, "capacitor.js"), 'export const Capacitor = {isNativePlatform:()=>true};');
await writeFile(join(generated, "link.jsx"), 'export default function Link({children, ...props}) { return <a {...props}>{children}</a>; }');
await writeFile(join(generated, "entry.jsx"), `
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { FamilyShell } from "@/components/family-shell";
import { ProProvider } from "@/components/pro-provider";
import { ProMembership } from "@/components/pro-membership";
import { MyRallii } from "@/components/my-rallii";
import { useEntitlements } from "@/hooks/use-entitlements";
let listener = () => {}; let active = false;
const customer = () => ({ activeEntitlements: active ? ["rallii_pro"] : [] });
const provider = { refresh: async () => customer(), restore: async () => { active = true; return customer(); }, purchase: async () => { active = true; return customer(); }, subscribe: fn => { listener = fn; return () => {}; } };
const experiences = [{activity:"rail",slug:"bernina-express",name:"Bernina Express",href:"/routes/bernina-express/"},{activity:"green",slug:"pebble-beach",name:"Pebble Beach",href:"/green/courses/pebble-beach/"}];
function Consumer({mode}) { const pro = useEntitlements(); return <p data-testid={mode}>{mode}: {pro.isPro ? "Pro" : "Free"}; {mode === "Rail" ? String(pro.canUseScenicAlerts) : String(pro.canUseCollections)}</p>; }
function Harness() { const [mode,setMode]=useState("Rail"); return <ProProvider provider={provider}><button onClick={()=>setMode(mode === "Rail" ? "Green" : "Rail")}>Switch activity fixture</button><button onClick={()=>{active=false;listener(customer());}}>Expire membership fixture</button><Consumer mode={mode} key={mode}/><ProMembership/><MyRallii experiences={experiences}/></ProProvider>; }
createRoot(document.getElementById("root")).render(location.search.includes("native=1") ? <FamilyShell><h1>Native launch fixture</h1></FamilyShell> : <Harness/>);
`);
const { webpack } = require("next/dist/compiled/webpack/webpack");
await new Promise((done, fail) => webpack({ mode: "development", devtool: false, context: root, entry: join(generated, "entry.jsx"), output: { path: generated, filename: "harness.js" }, resolve: { extensions: [".tsx", ".ts", ".jsx", ".js"], alias: { "@": resolve("src"), "@capacitor/core$": join(generated, "capacitor.js"), "next/link$": join(generated, "link.jsx"), "next/navigation$": join(generated, "navigation.js") } }, module: { rules: [{ test: /\.[jt]sx?$/, exclude: /node_modules/, use: join(generated, "loader.cjs") }] } }, (error, stats) => error || stats.hasErrors() ? fail(error || new Error(stats.toString({ all: false, errors: true }))) : done()));
const css = (await readFile("src/app/globals.css", "utf8")).replace(/^@import.*$/gm, "");
const server = createServer(async (request, response) => {
  if (request.url === "/harness.js") { response.setHeader("Content-Type", "text/javascript"); response.end(await readFile(join(generated, "harness.js"))); }
  else { response.setHeader("Content-Type", "text/html"); response.end(`<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{padding:16px;font-family:Arial} ${css}</style></head><body><div id="root"></div><script src="/harness.js"></script></body></html>`); }
});
await new Promise(done => server.listen(4174, "127.0.0.1", done));
const browser = await chromium.launch({ headless: true, channel: "chrome", args: ["--disable-gpu"] });
const results = { checkedRoutes: [], errors: [], screenshots: [], checks: [] };
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
  const page = await context.newPage();
  page.on("pageerror", error => results.errors.push(error.stack || String(error)));
  page.on("console", message => { if (message.type() === "error") results.errors.push(message.text()); });
  const base = "http://127.0.0.1:4173";
  const visit = async path => { const response = await page.goto(base + path); assert.equal(response.status(), 200, path); await page.locator("h1").first().waitFor({state:"attached"}); assert.ok((await page.locator("body").innerText()).length > 100, path); await page.waitForTimeout(200); assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `overflow ${path}`); results.checkedRoutes.push(path); };
  await visit("/");
  await page.evaluate(() => { localStorage.setItem("rallii:saved-routes", JSON.stringify(["bernina-express", "glacier-express"])); localStorage.setItem("rallii-green:course-library", JSON.stringify({version:1,courses:{"pebble-beach":"want_to_play","spyglass-hill":"played"}})); });
  await visit("/my-rallii/");
  await page.getByRole("link", {name:"Bernina Express →",exact:true}).waitFor();
  await page.getByRole("button", {name:"Green",exact:true}).click();
  assert.equal(await page.locator(".family-saved-list li").count(), 2);
  assert.equal(await page.locator(".family-saved-list").getByText("Bernina Express").count(), 0);
  await page.getByRole("button", {name:"Rail",exact:true}).click(); assert.equal(await page.locator(".family-saved-list li").count(), 2);
  await visit("/pro/"); await page.getByRole("button", {name:"Restore purchases",exact:true}).click();
  await page.getByRole("status").filter({hasText:"not available"}).waitFor();
  await page.screenshot({path:"docs/pro-mobile.png",fullPage:true}); results.screenshots.push("pro-mobile.png");
  for (const width of [768, 1440]) { await page.setViewportSize({width,height:1000}); await visit("/pro/"); await visit("/my-rallii/"); }
  await page.screenshot({path:"docs/my-rallii-desktop.png",fullPage:true}); results.screenshots.push("my-rallii-desktop.png");
  await page.setViewportSize({width:390,height:844});
  for (const path of ["/saved/", "/routes/bernina-express/", "/routes/glacier-express/", "/ride/bernina-express/", "/green/", "/green/courses/pebble-beach/", "/green/courses/spyglass-hill/", "/green/my-green/", "/green/compare/?a=pebble-beach&b=spyglass-hill", "/green/plan/?course=pebble-beach", "/green/?setting=coastal"]) await visit(path);
  await visit("/green/courses/pebble-beach/");
  await page.getByRole("button",{name:"Played",exact:true}).click();
  await page.reload(); await page.getByRole("button",{name:"✓ Played",exact:true}).first().waitFor();
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem("rallii-green:course-library")).courses["pebble-beach"]),"played");
  await page.getByRole("navigation", {name:"Rallii activities"}).filter({visible:true}).getByRole("link",{name:"Rail",exact:true}).click();
  await page.waitForURL(base + "/");
  await page.getByRole("navigation", {name:"Rallii activities"}).filter({visible:true}).getByRole("link",{name:"Green",exact:true}).focus(); await page.keyboard.press("Enter"); await page.waitForURL(base + "/green/");
  assert.equal(await page.evaluate(()=>localStorage.getItem("rallii:activity:v1")), "green");
  await visit("/pro/"); assert.equal(await page.evaluate(()=>localStorage.getItem("rallii:activity:v1")), "green");
  await page.goBack(); await page.waitForURL(base + "/green/");
  await page.reload(); assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem("rallii:travel-library")).routes["bernina-express"]), "want_to_go");
  results.checks.push("Save filters, legacy migration, keyboard activity switch, mode persistence through Pro, back navigation, free restore and responsive shared screens");
  // Every generated detail pattern is checked for a non-error static document.
  for (const activity of ["routes", "green/courses", "green/destinations", "green/collections", "green/trips"]) {
    const entries = await readdir(resolve("out", activity), {withFileTypes:true});
    for (const entry of entries.filter(entry=>entry.isDirectory() && !entry.name.startsWith("__next."))) {
      const url = `/${activity}/${entry.name}/`; const response = await context.request.get(base + url);
      assert.equal(response.status(),200,url); assert.match(await response.text(), /<h1[ >]/, url);
    }
    results.checks.push(`All generated ${activity} detail documents return 200 with headings`);
  }
  await page.goto("http://127.0.0.1:4174/");
  await page.evaluate(()=> { localStorage.setItem("rallii:travel-library",JSON.stringify({version:1,routes:{"bernina-express":"want_to_go"}})); localStorage.setItem("rallii-green:course-library",JSON.stringify({version:1,courses:{"pebble-beach":"played"}})); });
  await page.reload(); await page.getByTestId("Rail").filter({hasText:"Free"}).waitFor();
  await page.getByRole("button",{name:"Restore purchases",exact:true}).click(); await page.getByTestId("Rail").filter({hasText:"Pro; true"}).waitFor();
  await page.getByRole("button",{name:"Switch activity fixture"}).click(); await page.getByTestId("Green").filter({hasText:"Pro; true"}).waitFor();
  await page.getByRole("button",{name:"New collection",exact:true}).click(); await page.getByLabel("Collection name").fill("Rail and a round"); await page.getByLabel("Trip notes").fill("Book the window seat and confirm the tee time.");
  await page.getByLabel("Bernina Express · rail",{exact:true}).check(); await page.getByLabel("Pebble Beach · green",{exact:true}).check();
  await page.getByRole("button",{name:"Save collection",exact:true}).click(); await page.getByRole("heading",{name:"Rail and a round",exact:true}).waitFor();
  const stored = await page.evaluate(()=>JSON.parse(localStorage.getItem("rallii:collections:v1"))); assert.equal(stored.collections[0].experiences.length,2);
  await page.screenshot({path:"docs/pro-active-fixture-mobile.png",fullPage:true}); results.screenshots.push("pro-active-fixture-mobile.png");
  await page.getByRole("button",{name:"Expire membership fixture"}).click(); await page.getByTestId("Green").filter({hasText:"Free"}).waitFor();
  assert.equal(await page.getByRole("button",{name:"New collection",exact:true}).count(),0); await page.getByText("Book the window seat and confirm the tee time.",{exact:true}).waitFor();
  await page.reload(); await page.getByRole("heading",{name:"Rail and a round",exact:true}).waitFor();
  results.checks.push("Isolated real-component fixture: free → restore → Rail Pro → Green Pro → mixed collection and notes → expiry → read-only persistence; fixture is outside app routes and native output");
  await page.evaluate(()=>localStorage.setItem("rallii:activity:v1","green"));
  await page.goto("http://127.0.0.1:4174/?native=1"); await page.waitForURL("http://127.0.0.1:4174/green/");
  await page.goto("http://127.0.0.1:4174/routes/bernina-express/?native=1"); await page.getByRole("heading",{name:"Native launch fixture"}).waitFor();
  assert.equal(new URL(page.url()).pathname,"/routes/bernina-express/");
  results.checks.push("Real FamilyShell with isolated Capacitor/navigation fixture restores Green on native root launch and preserves explicit Rail deep links");
  assert.deepEqual(results.errors, []);
  await context.close();
} finally {
  await browser.close(); server.close(); await writeFile("docs/pro-browser-results.json",JSON.stringify(results,null,2));
}
console.log(JSON.stringify(results,null,2));




