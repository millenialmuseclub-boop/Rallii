import { readFile,writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { routeMediaBySlug } from '../src/data/route-media.ts';
let source=await readFile('src/data/route-media.ts','utf8');
const retired=[];
for(const asset of Object.values(routeMediaBySlug)) {
  const path=asset.path.replace(/\.[^.]+$/,'.webp');
  const bytes=await readFile(`public${asset.path}`);
  const image=await sharp(bytes).rotate().resize({width:1600,height:1200,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toBuffer();
  await writeFile(`public${path}`,image);
  if(path!==asset.path) {
    source=source.replace(`"${asset.path}"`,`"${path}"`);
    retired.push(asset.path);
  }
}
await writeFile('src/data/route-media.ts',source);
await writeFile('build/photography/retired-rail-images.json',JSON.stringify(retired,null,2));
