import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { courseMedia } from '../src/green/data/media.ts';
const existing=[];
for(const media of courseMedia.filter(m=>!m.representative)) {
  const src=media.src.replace(/\.[^.]+$/,'.webp');
  const output=await sharp(`public${media.src}`).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:84}).toBuffer({resolveWithObject:true});
  await writeFile(`public${src}`,output.data);
  existing.push({...media,src,caption:media.caption??media.alt,width:output.info.width,height:output.info.height,fileSize:output.info.size,focalPoint:media.focalPoint??'50% 50%',reuseNotes:`${media.reuseNotes} Local derivative resized and encoded as WebP; original license retained.`});
}
await writeFile('src/green/data/course-photography.json',JSON.stringify(existing,null,2)+'\n');
console.log(`Optimized ${existing.length} existing Green photographs`);
