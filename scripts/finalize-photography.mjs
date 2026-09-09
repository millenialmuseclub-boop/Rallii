import { readFile,writeFile,stat } from 'node:fs/promises';
import sharp from 'sharp';

for(const path of ['src/snow/media.json','src/trail/media.json','src/mtb/media.json','src/green/data/photography.json','src/green/data/course-photography.json']) {
  const media=JSON.parse(await readFile(path,'utf8'));
  for(const m of Object.values(media)) {
    const file=`public${m.src}`;
    const input=await readFile(file);
    let info=await sharp(input).metadata();
    if(info.width>1600 || info.height>1200) {
      const data=await sharp(input).resize({width:1600,height:1200,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toBuffer();
      await writeFile(file,data);
      info=await sharp(file).metadata();
    }
    Object.assign(m,{width:info.width,height:info.height,fileSize:(await stat(file)).size});
  }
  await writeFile(path,JSON.stringify(media,null,2)+'\n');
}
