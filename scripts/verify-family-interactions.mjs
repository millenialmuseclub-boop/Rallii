import {createRequire} from "node:module";
import {writeFile} from "node:fs/promises";
import assert from "node:assert/strict";
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.RALLII_PLAYWRIGHT_PATH || "playwright");
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-gpu"]});
const errors=[];const checks=[];
try {
  const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:"block"});
  page.on("pageerror",e=>errors.push(e.stack));
  page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
  const base="http://127.0.0.1:4173";
  await page.goto(base+"/green/?setting=coastal");
  await page.getByRole("button",{name:"Refine the atlas",exact:true}).click();
  assert.equal(await page.getByRole("button",{name:"coastal",exact:true}).getAttribute("aria-pressed"),"true");
  await page.getByPlaceholder("Search the atlas…").fill("Pebble Beach");
  await page.locator(".course-card").first().waitFor();
  assert.match(await page.locator(".course-card").first().innerText(),/Pebble Beach/);
  checks.push("Green coastal query and typed course search return matching cards");
  await page.goto(base+"/green/compare/?a=pebble-beach&b=spyglass-hill");
  assert.equal(await page.locator(".compare-pickers select").nth(0).inputValue(),"pebble-beach");
  assert.equal(await page.locator(".compare-pickers select").nth(1).inputValue(),"spyglass-hill");
  await page.goto(base+"/green/plan/?course=spyglass-hill");
  assert.equal(await page.locator("#plan-course").inputValue(),"spyglass-hill");
  checks.push("Green comparison and planner preserve selected course queries");
  await page.goto(base+"/green/courses/pebble-beach/");
  await page.locator(".maplibregl-canvas").first().waitFor();
  assert.ok(await page.locator(".maplibregl-canvas").first().evaluate(canvas=>canvas.width>0 && canvas.height>0));
  await page.goto(base+"/routes/bernina-express/");
  await page.getByRole("button",{name:"Map",exact:true}).click();
  await page.locator(".maplibregl-canvas").first().waitFor();
  await page.getByRole("button",{name:"Overview",exact:true}).click();
  await page.getByRole("button",{name:"Save journey",exact:true}).click();
  await page.reload(); await page.getByRole("button",{name:"Saved",exact:true}).waitFor();
  checks.push("Green and Rail map canvases render; Rail save survives reload");
  await page.goto(base+"/ride/bernina-express/");
  await page.waitForFunction(()=>performance.getEntriesByType("resource").some(entry=>entry.name.includes("bernina-express.geojson")));
  await page.getByRole("button",{name:"Try Demo Mode",exact:true}).click();
  await page.locator("#demo-progress").waitFor();
  await page.locator("#demo-progress").fill("50");
  await page.getByText("50% of the journey",{exact:false}).waitFor();
  await page.getByRole("button",{name:"End Ride Mode",exact:true}).click();
  await page.getByRole("button",{name:"Try Demo Mode",exact:true}).waitFor();
  checks.push("Ride Mode demo starts, updates journey progress, and ends");
  assert.deepEqual(errors,[]);
} finally { await browser.close(); await writeFile("docs/pro-interaction-results.json",JSON.stringify({checks,errors},null,2)); }
console.log(JSON.stringify({checks,errors},null,2));



