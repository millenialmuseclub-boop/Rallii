import {readFileSync,writeFileSync} from 'node:fs';
import sharp from 'sharp';
const photos=['snow','mtb','trail'].flatMap(mode=>Object.entries(JSON.parse(readFileSync(`src/${mode}/media.json`,'utf8'))).filter(([,m])=>m.accessedAt==='2026-09-13').map(([key,m])=>({mode,key,...m})));
const cols=5,w=230,h=180;
for(let start=0;start<photos.length;start+=25){
const page=photos.slice(start,start+25),images=[];
for(let i=0;i<page.length;i++){const p=page[i];images.push({input:await sharp(`public${p.src}`).resize(w,145,{fit:'cover'}).toBuffer(),left:(i%cols)*w,top:Math.floor(i/cols)*h});const label=`<svg width="${w}" height="35"><rect width="100%" height="100%" fill="white"/><text x="5" y="21" font-size="12">${p.mode}/${p.key}</text></svg>`;images.push({input:Buffer.from(label),left:(i%cols)*w,top:Math.floor(i/cols)*h+145});}
await sharp({create:{width:cols*w,height:Math.ceil(page.length/cols)*h,channels:3,background:'white'}}).composite(images).png().toFile(`build/expansion-contact-${start/25}.png`);
}
writeFileSync('build/expansion-photo-index.json',JSON.stringify(photos,null,2));console.log(`${photos.length} photographs prepared for visual review.`);
