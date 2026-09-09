import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
const mode=process.argv[2]??'snow';
const media=JSON.parse(await readFile(mode==='green'?'src/green/data/photography.json':`src/${mode}/media.json`));
const layers=[];
let i=0;
for(const[key,asset]of Object.entries(media)) {
  const left=i%3*420,top=Math.floor(i/3)*270;
  layers.push({input:await sharp(`public${asset.src}`).resize(420,230,{fit:'contain',background:'#192b32'}).png().toBuffer(),left,top});
  layers.push({input:Buffer.from(`<svg width="420" height="40"><text x="8" y="24" fill="white" font-size="16">${key}</text></svg>`),left,top:top+230});
  i++;
}
await sharp({create:{width:1260,height:Math.ceil(i/3)*270,channels:3,background:'#192b32'}}).composite(layers).png().toFile(`build/photography/${mode}-contact.png`);
