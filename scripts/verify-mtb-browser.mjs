// Actual exported app verification. No network deployment, purchase override, or native sync.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.RALLII_PLAYWRIGHT_PATH || 'playwright');
const root = resolve('out');
const types = {'.html':'text/html','.txt':'text/plain','.js':'text/javascript','.css':'text/css','.json':'application/json','.geojson':'application/geo+json','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const server = createServer(async (request,response) => {
 try {
  let file=resolve(root,`.${decodeURIComponent(new URL(request.url,'http://localhost').pathname)}`);
  if(file!==root&&!file.startsWith(root+sep)){response.writeHead(403).end();return;}
  if((await stat(file)).isDirectory()) file=resolve(file,'index.html');
  response.writeHead(200,{'Content-Type':types[extname(file)]??'application/octet-stream','Cache-Control':'no-store'}).end(await readFile(file));
 }catch{response.writeHead(404).end('Not found');}
});
await new Promise(done=>server.listen(4181,'127.0.0.1',done));
const browser=await chromium.launch({headless:true,channel:'chrome',args:['--disable-gpu']});
const results={checks:[],routes:[],errors:[],screenshots:[]};
await mkdir('build/mtb-verification',{recursive:true});
try {
 const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});
 const page=await context.newPage();
 page.on('pageerror',error=>results.errors.push(String(error)));
 page.on('console',message=>{if(message.type()==='error')results.errors.push(message.text());});
 const visit=async path=>{
  const response=await page.goto('http://127.0.0.1:4181'+path);
  assert.equal(response.status(),200,path);
  await page.locator('h1').first().waitFor();
  await page.waitForFunction(()=>[...document.images].filter(i=>i.loading!=='lazy').every(i=>i.complete));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'document overflow '+path);
  results.routes.push(`${page.viewportSize().width}px ${path}`);
 };
 const screenshot=async name=>{const path=`build/mtb-verification/${name}.png`;await page.evaluate(()=>{for(const img of document.images)img.loading='eager';});await page.waitForFunction(()=>[...document.images].every(img=>img.complete));assert.ok(await page.evaluate(()=>[...document.images].every(img=>img.naturalWidth>0)),'broken image');await page.screenshot({path,fullPage:true});results.screenshots.push(path);};
 await visit('/');
 await page.evaluate(()=>document.fonts.ready);
 assert.ok(await page.evaluate(()=>getComputedStyle(document.querySelector('h1')).fontFamily.includes('sourceSans')),'local Source Sans font applied');
 assert.equal(await page.locator('h1 em').evaluate(element=>getComputedStyle(element).fontStyle),'normal');
 assert.match(await page.locator('h1').innerText(),/worth remembering/);
 await screenshot('home-desktop');
 await page.getByRole('link',{name:'See the world by rail →',exact:true}).click();
 await page.waitForURL('**/rail/');
 assert.match(await page.locator('h1').innerText(),/Know where to sit/);
 await page.getByRole('link',{name:'Rallii Rail home',exact:true}).click();
 await page.waitForURL('http://127.0.0.1:4181/');
 await page.getByRole('link',{name:'Find a place to play →',exact:true}).click();
 await page.waitForURL('**/green/');
 await page.getByRole('link',{name:'Rallii family home',exact:true}).click();
 await page.waitForURL('http://127.0.0.1:4181/');
 await page.getByRole('link',{name:'Take the trail →',exact:true}).click();
 await page.waitForURL('**/trail/');
 await page.locator('.trail-card').first().waitFor();
 assert.equal(await page.locator('.trail-card').count(),30);
 results.checks.push('Home → Rail, Green and Trail links work on the real static export');
 await screenshot('discover-desktop');
 await page.getByLabel('Search trails',{exact:true}).fill('Yosemite');
 await page.getByRole('button',{name:'Search',exact:true}).click();
 await page.waitForURL('**/?q=Yosemite');
 await page.getByRole('combobox').first().selectOption('Easy');
 await page.waitForURL('**difficulty=Easy');
 assert.equal(await page.locator('.trail-card').count(),3);
 const remembered=page.url();
 await page.getByRole('navigation',{name:'Rallii activities'}).getByRole('link',{name:'Green',exact:true}).click();
 await page.waitForURL('**/green/');
 await page.getByRole('navigation',{name:'Rallii activities'}).filter({visible:true}).getByRole('link',{name:'Trail',exact:true}).click();
 await page.waitForURL(remembered);
 assert.equal(await page.locator('.trail-card').count(),3);
 results.checks.push('Trail search and difficulty filters survive mode switching');
 await page.getByRole('button',{name:'Clear filters',exact:true}).click();
 await page.getByRole('link',{name:'Mist Trail to Vernal Fall',exact:true}).click();
 await page.waitForURL('**/trail/mist-trail/');
 await screenshot('detail-desktop');
 await page.getByRole('button',{name:'Want to Go: Mist Trail to Vernal Fall',exact:true}).click();
 await page.reload();
 await page.locator('.trail-save button[aria-pressed="true"]').waitFor();
 assert.equal(await page.getByRole('button',{name:'Want to Go: Mist Trail to Vernal Fall',exact:true}).getAttribute('aria-pressed'),'true');
 await page.getByRole('link',{name:'Saved',exact:true}).click();
 await page.waitForURL('**/my-rallii/');
 await page.getByRole('button',{name:'Trail',exact:true}).click();
 await page.getByRole('link',{name:'Mist Trail to Vernal Fall →',exact:true}).waitFor();
 await page.getByRole('button',{name:'Been: Mist Trail to Vernal Fall',exact:true}).click();
 await page.getByRole('button',{name:'Been',exact:true}).click();
 assert.equal(await page.locator('.family-saved-list li').count(),1);
 await screenshot('saved-desktop');
 await visit('/');
 assert.match(await page.locator('.family-saved-summary').innerText(),/1 Been/);
 assert.equal(await page.getByRole('link',{name:'1 Hiking trails',exact:true}).count(),1);
 results.checks.push('Want to Go persists on reload; Been updates Saved and the home preview');
 await page.evaluate(()=>{localStorage.setItem('rallii:saved-routes',JSON.stringify(['glacier-express']));localStorage.setItem('rallii-green:course-library',JSON.stringify({version:1,courses:{'pebble-beach':'played'}}));});
 await visit('/my-rallii/');
 await page.getByRole('link',{name:'Glacier Express →',exact:true}).waitFor();
 await page.getByRole('link',{name:'Pebble Beach Golf Links →',exact:true}).waitFor();
 await page.getByRole('link',{name:'Mist Trail to Vernal Fall →',exact:true}).waitFor();
 const railBefore=await page.evaluate(()=>localStorage.getItem('rallii:travel-library'));
 const greenBefore=await page.evaluate(()=>localStorage.getItem('rallii-green:course-library'));
 await page.getByRole('button',{name:'Been: Mist Trail to Vernal Fall',exact:true}).click();
 assert.equal(await page.evaluate(()=>localStorage.getItem('rallii:travel-library')),railBefore);
 assert.equal(await page.evaluate(()=>localStorage.getItem('rallii-green:course-library')),greenBefore);
 results.checks.push('Legacy Rail migration and Green saves remain intact when Trail is removed');
 for(const width of [390,768,320]) {
  await page.setViewportSize({width,height:width===768?1024:844});
  for(const path of ['/','/rail/','/green/','/trail/','/trail/mist-trail/','/mtb/','/mtb/whistler-bike-park/','/my-rallii/','/pro/']) {
   await visit(path);
   assert.ok(await page.evaluate(()=>[...document.querySelectorAll('main img')].filter(i=>i.complete).every(i=>i.naturalWidth>0)),'broken loaded image '+path);
   if(width!==320&&['/','/trail/','/trail/mist-trail/','/my-rallii/'].includes(path)) await screenshot(`${path==='/'?'home':path==='/trail/'?'discover':path==='/my-rallii/'?'saved':'detail'}-${width}`);
  }
 }
 results.checks.push('Desktop, 390px iPhone, 768px iPad and 320px layouts: no document overflow or broken loaded photos');
 await visit('/trail/?q=unlikely-no-results');
 await page.getByRole('heading',{name:'A different path?',exact:true}).waitFor();
 await page.getByRole('button',{name:'Clear filters',exact:true}).click();
 await page.locator('.trail-card').first().waitFor();
 assert.equal(await page.locator('.trail-card').count(),30);
 results.checks.push('Search empty state recovers to all 30 trails');

 await page.setViewportSize({width:390,height:844});
 await visit('/mtb/');
 await page.locator('.mtb-card').first().waitFor();
 assert.equal(await page.locator('.mtb-card').count(),30);
 await page.getByLabel('Search MTB',{exact:true}).fill('Whistler');
 await page.getByRole('button',{name:'Search',exact:true}).click();
 await page.waitForURL('**?q=Whistler');
 await page.getByRole('combobox').first().selectOption('Beginner');
 await page.waitForURL('**skill=Beginner');
 const mtbUrl=page.url();
 for(const mode of ['Rail','Green','Trail','MTB']){
   const nav=page.getByRole('navigation',{name:'Rallii activities'}).filter({visible:true});
   await nav.getByRole('link',{name:mode,exact:true}).click();
   await page.waitForURL(url=>mode==='MTB'?url.href===mtbUrl:url.pathname.startsWith(mode==='Rail'?'/rail/':'/'+mode.toLowerCase()+'/'));
 }
 assert.equal(await page.locator('.mtb-card').count(),2);
 await page.getByRole('link',{name:'Whistler Mountain Bike Park',exact:true}).click();
 await page.waitForURL('**/mtb/whistler-bike-park/');
 await page.getByRole('button',{name:'Want to Ride: Whistler Mountain Bike Park',exact:true}).click();
 await page.getByRole('button',{name:'Favorite: Whistler Mountain Bike Park',exact:true}).click();
 await page.reload();
 await page.locator('.mtb-save button[aria-pressed="true"]').first().waitFor();
 assert.equal(await page.getByRole('button',{name:'Favorite: Whistler Mountain Bike Park',exact:true}).getAttribute('aria-pressed'),'true');
 await page.getByRole('button',{name:'Ridden: Whistler Mountain Bike Park',exact:true}).click();
 await screenshot('mtb-detail-390');
 await visit('/my-rallii/');
 await page.getByRole('button',{name:'MTB',exact:true}).click();
 await page.getByRole('button',{name:'Favorites',exact:true}).click();
 await page.getByRole('link',{name:'Whistler Mountain Bike Park →',exact:true}).waitFor();
 await screenshot('mtb-saved-390');
 await page.getByRole('button',{name:'Ridden',exact:true}).click();
 assert.equal(await page.locator('.family-saved-list li').count(),1);
 const originalStores=await page.evaluate(()=>Object.fromEntries(['rallii:travel-library','rallii-green:course-library','rallii:trail-library:v1'].map(k=>[k,localStorage.getItem(k)])));
 await page.getByRole('button',{name:'Ridden: Whistler Mountain Bike Park',exact:true}).click();
 assert.deepEqual(await page.evaluate(()=>Object.fromEntries(['rallii:travel-library','rallii-green:course-library','rallii:trail-library:v1'].map(k=>[k,localStorage.getItem(k)]))),originalStores);
 await page.evaluate(()=>localStorage.setItem('rallii:collections:v1',JSON.stringify({version:1,collections:[{id:'four-mode',name:'Four ways outside',notes:'Existing private note',experiences:[{activity:'rail',slug:'glacier-express'},{activity:'green',slug:'pebble-beach'},{activity:'trail',slug:'mist-trail'},{activity:'mtb',slug:'whistler-bike-park'}]}]})));
 await page.reload();
 await page.getByRole('heading',{name:'Four ways outside'}).waitFor();
 assert.equal(await page.locator('.family-collection-grid li').count(),4);
 assert.equal(await page.getByRole('button',{name:'New collection',exact:true}).count(),0);
 results.checks.push('All four modes switch and restore MTB filters; Want to Ride, Ridden and Favorites persist; older libraries and four-mode Pro collections remain intact');
 await visit('/mtb/?q=no-such-riding-area');
 await page.getByRole('button',{name:'Show all riding areas',exact:true}).click();
 await page.locator('.mtb-card').first().waitFor();
 assert.equal(await page.locator('.mtb-card').count(),30);
 await screenshot('mtb-discover-390');
 await page.setViewportSize({width:1440,height:1000});
 await screenshot('mtb-discover-desktop');
 for(const ride of ['madeira','blue-derby','coler','moab-slickrock'])await visit('/mtb/'+ride+'/');
 results.checks.push('MTB empty search recovers and regional detail routes render correctly');

 await context.close();
 const blocked=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await blocked.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Storage blocked','SecurityError');};});
 const blockedPage=await blocked.newPage();
 await blockedPage.goto('http://127.0.0.1:4181/trail/mist-trail/');
 await blockedPage.getByRole('button',{name:'Want to Go: Mist Trail to Vernal Fall',exact:true}).click();
 await blockedPage.getByRole('alert').filter({hasText:'Device storage is unavailable'}).waitFor();
 results.checks.push('Unavailable storage reports a save error without falsely showing saved state');
 await blockedPage.goto('http://127.0.0.1:4181/mtb/whistler-bike-park/');
 await blockedPage.getByRole('button',{name:'Want to Ride: Whistler Mountain Bike Park',exact:true}).click();
 await blockedPage.getByRole('alert').filter({hasText:'Device storage is unavailable'}).waitFor();
 assert.equal(await blockedPage.getByRole('button',{name:'Want to Ride: Whistler Mountain Bike Park',exact:true}).getAttribute('aria-pressed'),'false');
 await blocked.close();
 assert.deepEqual(results.errors,[],'browser console/page errors');
} finally {
 await writeFile('build/mtb-verification/results.json',JSON.stringify(results,null,2)+'\n');
 await browser.close(); server.close();
}
console.log(JSON.stringify(results,null,2));

