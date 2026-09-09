// Explicit acquisition only. Production and native builds never download images.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const candidates = JSON.parse(await readFile('build/photography/candidates.json', 'utf8').catch(()=>readFile('docs/photography-source-evidence.json','utf8')));
const selections = JSON.parse(await readFile('scripts/photography-selections.json', 'utf8'));
const clean = value => (value ?? '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
for (const selection of selections) {
  const { mode, key } = selection;
  const registryPath = mode === 'green' ? 'src/green/data/photography.json' : `src/${mode}/media.json`;
  const registry = JSON.parse(await readFile(registryPath,'utf8').catch(()=>'{}'));
  if (registry[key]?.sourceUrl?.endsWith(encodeURI(selection.title).replaceAll('%20','_'))) continue;
  if (registry[key]?.selectionTitle === selection.title) continue;
  const page = candidates[selection.query]?.candidates.find(p => p.title === selection.title);
  if (!page) throw new Error(`Missing reviewed candidate: ${selection.title}`);
  const info = page.imageinfo[0], meta = info.extmetadata;
  const license = clean(meta.LicenseShortName?.value);
  const licenseUrl = meta.LicenseUrl?.value?.replace(/^http:/,'https:') ?? (/Public domain/i.test(license) ? info.descriptionurl : '');
  const credit = selection.creator ?? clean(meta.Artist?.value);
  if (!credit || !licenseUrl || !/^(CC BY|CC0|Public domain)/i.test(license)) throw new Error(`Unapproved rights: ${key}`);
  const originalUrl = info.url.split('?')[0];
  let response = await fetch(originalUrl);
  for(let retry=0;response.status===429 && retry<4;retry++) { await new Promise(r=>setTimeout(r,15000)); response=await fetch(originalUrl); }
  if(!response.ok) throw new Error(`${key}: HTTP ${response.status}`);
  const src = `/images/${mode}/${key}.webp`;
  await mkdir(`public/images/${mode}`,{recursive:true});
  const output = await sharp(Buffer.from(await response.arrayBuffer())).rotate().resize({width:1600,height:1200,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toBuffer({resolveWithObject:true});
  await writeFile(`public${src}`,output.data);
  registry[key] = {src,alt:selection.alt,caption:selection.caption,credit,sourceUrl:info.descriptionurl,license,licenseUrl,originalUrl,accessedAt:'2026-09-09',width:output.info.width,height:output.info.height,fileSize:output.info.size,position:selection.position ?? '50% 50%',representative:selection.representative ?? false,selectionTitle:selection.title,reuseNotes:'Resized and encoded as WebP; no crop baked in. Original license retained.'};
  await writeFile(registryPath,JSON.stringify(registry,null,2)+'\n');
  console.log(`Prepared ${mode}/${key}: ${output.info.width}×${output.info.height}, ${output.info.size} bytes`);
  await new Promise(r=>setTimeout(r,4500));
}
