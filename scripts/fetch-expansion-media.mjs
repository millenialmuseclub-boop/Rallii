import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import sharp from 'sharp';
const mode=process.argv[2]??'snow';
const entries=JSON.parse(readFileSync(`src/${mode}/expanded.json`,'utf8'));
const manifestPath=`src/${mode}/media.json`;
const registry=JSON.parse(readFileSync(manifestPath,'utf8'));
const cachePath=`build/${mode}-photo-candidates.json`;
const cache=existsSync(cachePath)?JSON.parse(readFileSync(cachePath,'utf8')):{};
const selections=JSON.parse(readFileSync('scripts/expansion-photo-selections.json','utf8'));
const clean=value=>(value??'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').trim();
async function api(host,params){await new Promise(r=>setTimeout(r,6500));const response=await fetch(`https://${host}/w/api.php?${new URLSearchParams({format:'json',...params})}`,{headers:{'User-Agent':'RalliiEditorial/1.0 (licensed travel photography research)'},signal:AbortSignal.timeout(25000)});if(!response.ok)throw Error(`HTTP ${response.status}`);return response.json();}
mkdirSync(`public/images/${mode}`,{recursive:true});
for(const entry of entries){
 if(registry[entry.imageKey]&&existsSync(`public${registry[entry.imageKey].src}`)&&(!selections[entry.slug]||registry[entry.imageKey].selectionTitle===selections[entry.slug]))continue;
 try{
  const query=entry.photoQuery??entry.wiki;
  const result=selections[entry.slug]?null:await api('commons.wikimedia.org',{action:'query',list:'search',srsearch:`"${query}" filetype:bitmap`,srnamespace:'6',srlimit:'8'});
  const titles=selections[entry.slug]?[selections[entry.slug]]:(result.query.search??[]).map(i=>i.title).filter(x=>/\.(jpe?g|png)$/i.test(x)&&!/(logo|flag|map|icon|coat of arms|locator|pictogram|1850)/i.test(x));
  let selected;
  for(const title of [...new Set(titles)].slice(0,8)){
   const info=await api('commons.wikimedia.org',{action:'query',titles:title,prop:'imageinfo',iiprop:'url|size|extmetadata',iiurlwidth:'960'});
   const file=Object.values(info.query.pages)[0].imageinfo?.[0];
   if(!file||file.width<1000||file.height<500)continue;
   const license=clean(file.extmetadata.LicenseShortName?.value);
   if(!/^(CC BY|CC0|Public domain)/i.test(license)||/NC|ND/.test(license))continue;
   selected={file,license,title};break;
  }
  if(!selected)throw Error('No suitable free photo found');
  cache[entry.slug]=selected;writeFileSync(cachePath,JSON.stringify(cache,null,2));
  const {file,license,title}=selected;
  const originalUrl=file.thumburl??file.url;
  const response=await fetch(originalUrl,{headers:{'User-Agent':'RalliiEditorial/1.0 (licensed travel photography research)'},signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error(`Image HTTP ${response.status}`);
  const bytes=Buffer.from(await response.arrayBuffer());
  const src=`/images/${mode}/${entry.imageKey}.webp`;
  const output=await sharp(bytes).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:78}).toBuffer({resolveWithObject:true});
  writeFileSync(`public${src}`,output.data);
  registry[entry.imageKey]={src,alt:clean(title.replace(/^File:/,'').replace(/\.[^.]+$/,'')),caption:`${entry.name} destination setting.`,credit:clean(file.extmetadata.Artist?.value)||clean(file.extmetadata.Credit?.value),sourceUrl:file.descriptionurl,license,licenseUrl:clean(file.extmetadata.LicenseUrl?.value)||'https://creativecommons.org/publicdomain/mark/1.0/',originalUrl,width:output.info.width,height:output.info.height,fileSize:output.data.length,position:'50% 50%',accessedAt:'2026-09-13',representative:false,selectionTitle:title,reuseNotes:'Resized and encoded as WebP. Original license retained.'};
  writeFileSync(manifestPath,JSON.stringify(registry,null,2)+'\n');
  console.log(`${entry.slug}: ${title}`);
 }catch(error){console.log(`UNRESOLVED ${entry.slug}: ${error.message}`);}
}
