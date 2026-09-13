import {chromium} from '../build/photography-tools/node_modules/playwright/index.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.RALLII_VERIFY_URL??'http://127.0.0.1:4185';
const report={pages:[],errors:[],flows:[]};await mkdir('build/expansion-browser',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
for(const width of [390,430,768,844]){
 const context=await browser.newContext({viewport:{width,height:width===844?390:900},serviceWorkers:'block'});const page=await context.newPage();
 page.on('pageerror',error=>report.errors.push({width,url:page.url(),error:error.message}));
 for(const path of ['/','/snow/','/snow/palisades-tahoe/','/snow/compare/','/mtb/','/mtb/oaxaca/','/trail/hooker-valley/','/green/destinations/portugal-atlantic-golf/','/guides/scotland-beyond-the-viaduct/','/search/','/my-rallii/']){
  const response=await page.goto(base+path,{waitUntil:'domcontentloaded'});await page.locator('main').first().waitFor();
  await page.locator('main img').evaluateAll(async images=>{for(const img of images)img.loading='eager';await Promise.all(images.map(img=>img.decode().catch(()=>{})));});
  const audit=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.querySelectorAll('main img')].filter(i=>!i.naturalWidth).map(i=>i.getAttribute('src')),missingAlt:[...document.querySelectorAll('main img')].filter(i=>!i.alt).length}));
  report.pages.push({width,path,status:response.status(),...audit});
  if(width===390&&['/','/snow/compare/','/snow/palisades-tahoe/','/search/'].includes(path))await page.screenshot({path:`build/expansion-browser/${path.replace(/\//g,'-')||'home'}-390.png`,fullPage:true});
 }
 await context.close();
}
const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});const page=await context.newPage();
await page.goto(base+'/snow/',{waitUntil:'domcontentloaded'});await page.getByRole('combobox',{name:'Snow country',exact:true}).selectOption('Japan');await page.waitForURL('**country=Japan');await page.locator('.snow-card').first().waitFor();report.flows.push({name:'Snow country filter',passed:await page.locator('.snow-card').count()===5});
await page.goto(base+'/mtb/',{waitUntil:'domcontentloaded'});const before=await page.locator('.destination-grid>div').count();await page.getByRole('button',{name:/Show more places/}).click();report.flows.push({name:'MTB controlled list',passed:before===18&&await page.locator('.destination-grid>div').count()===36});
await page.goto(base+'/snow/compare/',{waitUntil:'domcontentloaded'});await page.getByLabel('Mountain 1').selectOption('portillo');report.flows.push({name:'Snow comparison',passed:await page.getByRole('heading',{name:'Portillo',exact:true}).count()===1});
await page.goto(base+'/search/',{waitUntil:'domcontentloaded'});await page.getByRole('combobox',{name:'Discovery mode',exact:true}).selectOption('mtb');await page.getByLabel('Place or landscape').fill('Oaxaca');report.flows.push({name:'Global search mode isolation',passed:await page.locator('.field-notes-grid article').count()===1&&await page.getByRole('link',{name:'Oaxaca highlands',exact:true}).count()===1});
await context.close();
}finally{await browser.close();await writeFile('build/expansion-browser/report.json',JSON.stringify(report,null,2));}
const failures=report.pages.filter(p=>p.status!==200||p.overflow||p.broken.length||p.missingAlt);console.log(JSON.stringify({visits:report.pages.length,failures,errors:report.errors,flows:report.flows},null,2));if(failures.length||report.errors.length||report.flows.some(f=>!f.passed))process.exitCode=1;
