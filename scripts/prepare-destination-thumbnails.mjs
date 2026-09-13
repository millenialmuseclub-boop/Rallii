import {readFileSync,writeFileSync} from 'node:fs';
import sharp from 'sharp';
let count=0;
for(const mode of ['snow','mtb','trail']){
 const path=`src/${mode}/media.json`,media=JSON.parse(readFileSync(path,'utf8'));
 for(const asset of Object.values(media)){
  asset.cardSrc=asset.src.replace(/\.(webp|jpg|png)$/i,'.card.webp');
  await sharp(`public${asset.src}`).resize({width:640,withoutEnlargement:true}).webp({quality:74}).toFile(`public${asset.cardSrc}`);count++;
 }
 writeFileSync(path,JSON.stringify(media,null,2)+'\n');
}console.log(`${count} compact card derivatives generated.`);
