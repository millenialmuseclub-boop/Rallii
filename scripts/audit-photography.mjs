import { readFile, writeFile, stat } from 'node:fs/promises';
import sharp from 'sharp';
import { routeMediaBySlug } from '../src/data/route-media.ts';

// Disk-derived dimensions and sizes prevent stale hand-entered metadata.
const report = {};
for (const mode of ['trail','mtb','snow']) {
  const path=`src/${mode}/media.json`, registry=JSON.parse(await readFile(path,'utf8'));
  for(const asset of Object.values(registry)) {
    const file=`public${asset.src}`, info=await sharp(file).metadata();
    Object.assign(asset,{width:info.width,height:info.height,fileSize:(await stat(file)).size,position:asset.position??'50% 50%'});
  }
  await writeFile(path,JSON.stringify(registry,null,2)+'\n');
  report[mode]=Object.keys(registry).length;
}
const rail={};
for(const [slug,asset]of Object.entries(routeMediaBySlug)) {
  const file=`public${asset.path}`,info=await sharp(file).metadata();
  rail[slug]={width:info.width,height:info.height,fileSize:(await stat(file)).size,position:'50% 50%'};
}
await writeFile('src/data/route-media-dimensions.json',JSON.stringify(rail,null,2)+'\n');
report.rail=Object.keys(rail).length;
console.log(report);
