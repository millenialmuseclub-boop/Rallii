// Exercise the local native export using an isolated browser context.
import { chromium } from '../build/photography-tools/node_modules/playwright/index.mjs';
import { mkdir,writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { snowDestinations } from '../src/snow/data.ts';
const base='http://127.0.0.1:4184',dir='build/photography/browser';
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const results={visits:[],errors:[],checks:[],screenshots:[]};
try {
  const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});
  const page=await context.newPage();
  page.on('pageerror',e=>results.errors.push({url:page.url(),error:String(e)}));
  page.on('console',m=>{if(m.type()==='error')results.errors.push({url:page.url(),error:m.text()});});
  async function check(path) {
    assert.equal((await page.goto(base+path,{waitUntil:'domcontentloaded'})).status(),200,path);
    await page.locator('main').waitFor();
    await page.locator('main img').evaluateAll(async images=>{
      for(const img of images)img.loading='eager';
      await Promise.all(images.map(img=>img.decode().catch(()=>{})));
    });
    const audit=await page.evaluate(()=>({
      width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,
      broken:[...document.querySelectorAll('main img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src')),
      alt:[...document.querySelectorAll('main img')].filter(i=>!i.getAttribute('alt')?.trim()).map(i=>i.getAttribute('src')),
      clipped:[...document.querySelectorAll('.photo-credit,.course-visual>figcaption,.route-media__credit')].filter(e=>e.getBoundingClientRect().height>0 && (e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2)).map(e=>e.textContent),
      remote:[...document.querySelectorAll('main img')].filter(i=>new URL(i.currentSrc).origin!==location.origin).map(i=>i.currentSrc),
    }));
    results.visits.push({path,...audit});
    assert.equal(audit.overflow,false,`${path}: horizontal overflow at ${audit.width}`);
    assert.deepEqual(audit.broken,[],`${path}: broken images`);
    assert.deepEqual(audit.alt,[],`${path}: missing alt`);
    assert.deepEqual(audit.clipped,[],`${path}: clipped credits`);
    assert.deepEqual(audit.remote,[],`${path}: hotlinked photos`);
  }
  async function shot(name) {const path=`${dir}/${name}.png`;await page.screenshot({path});results.screenshots.push(path);}
  const paths=['/','/rail/','/routes/glacier-express/','/compare/?routes=glacier-express,bernina-express','/plan/?route=glacier-express','/saved/','/discover/collections/','/green/','/green/courses/pacific-dunes/','/green/courses/mauna-kea/','/green/destinations/hawaii-island-golf/','/green/compare/?a=pacific-dunes&b=pebble-beach','/green/plan/?course=mauna-kea','/green/collections/','/green/my-green/','/trail/','/trail/mirror-lake/','/trail/mist-trail/','/mtb/','/mtb/moab-brands/','/mtb/slaughter-pen/','/snow/','/snow/zermatt/','/my-rallii/'];
  for(const width of [1440,390]) {
    await page.setViewportSize({width,height:width===1440?1000:844});
    for(const path of paths) {
      await check(path);
      if(['/rail/','/green/','/trail/','/mtb/','/snow/','/green/courses/pacific-dunes/','/snow/zermatt/','/my-rallii/'].includes(path))await shot(`${path.replaceAll('/','-').slice(1,-1)}-${width}`);
    }
    await check('/snow/');
    assert.equal(await page.locator('.snow-card').count(),0);
    await page.getByRole('button',{name:'Canada 4 places',exact:true}).click();
    assert.equal(await page.locator('.snow-card').count(),0);
    await page.getByRole('button',{name:/^Whistler Blackcomb/}).click();
    assert.equal(await page.locator('.snow-card').count(),1);
    await page.locator('.snow-card img').evaluate(img=>img.decode());
    await page.locator('.snow-card').scrollIntoViewIfNeeded();
    await shot(`snow-expanded-${width}`);
    await page.getByRole('button',{name:/^Banff Sunshine/}).click();
    assert.equal(await page.locator('.snow-card').count(),1);
    assert.match(await page.locator('.snow-card h2').innerText(),/Banff Sunshine/);
    results.checks.push(`Snow ${width}px: closed regions, tap-to-open entries, only one card mounted`);
  }
  for(const place of snowDestinations)await check(`/snow/${place.slug}/`);
  await check('/my-rallii/');
  await page.evaluate(()=>{
    localStorage.setItem('rallii:travel-library',JSON.stringify({version:1,routes:{'glacier-express':'want_to_go'}}));
    localStorage.setItem('rallii:saved-routes',JSON.stringify(['glacier-express']));
    localStorage.setItem('rallii-green:course-library',JSON.stringify({version:1,courses:{'pebble-beach':'played'}}));
    localStorage.setItem('rallii:trail-library:v1',JSON.stringify({version:1,trails:{'mist-trail':'want_to_go'}}));
    localStorage.setItem('rallii:mtb-library:v1',JSON.stringify({version:1,rides:{'moab-brands':{status:'want_to_ride',favorite:false}}}));
    localStorage.setItem('rallii:snow-library:v1',JSON.stringify({version:1,places:{zermatt:{status:'want_to_go',favorite:false}}}));
    localStorage.setItem('rallii:collections:v1',JSON.stringify({version:1,collections:[{id:'photo-review',name:'Photography review trip',notes:'Local verification fixture',experiences:[{activity:'snow',slug:'zermatt'},{activity:'green',slug:'pebble-beach'}]}]}));
  });
  await check('/my-rallii/');
  await page.locator('.family-saved-list li').last().waitFor();
  assert.equal(await page.locator('.family-saved-list .saved-photo img').count(),5,'All five saved modes have photography');
  assert.equal(await page.locator('.family-collection-grid .saved-photo img').count(),1,'Collection overview has photography');
  await shot('saved-populated-mobile');
  await page.setViewportSize({width:1440,height:1000});
  await check('/my-rallii/');await shot('saved-populated-desktop');
  results.checks.push('Saved photography for all five modes survives reload in an isolated device context');
  assert.deepEqual(results.errors,[],'Browser console/page errors');
} finally {
  await writeFile(`${dir}/results.json`,JSON.stringify(results,null,2)+'\n');
  await browser.close();
}
console.log(`Verified ${results.visits.length} page/viewport combinations; ${results.errors.length} console errors.`);
