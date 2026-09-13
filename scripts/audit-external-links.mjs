import {readFileSync,writeFileSync} from 'node:fs';
const sources=[...JSON.parse(readFileSync('src/snow/expanded.json','utf8')),...JSON.parse(readFileSync('src/mtb/expanded.json','utf8'))].map(p=>({slug:p.slug,url:p.sourceUrl}));
const output=[];let cursor=0;
async function worker(){while(cursor<sources.length){const entry=sources[cursor++];try{const r=await fetch(entry.url,{redirect:'follow',signal:AbortSignal.timeout(18000),headers:{'User-Agent':'Mozilla/5.0 Rallii source review'}});output.push({...entry,status:r.status,finalUrl:r.url});await r.body?.cancel();}catch(e){output.push({...entry,status:'unverified',reason:e.cause?.code??e.message});}}}
await Promise.all([worker(),worker(),worker()]);writeFileSync('build/expansion-external-links.json',JSON.stringify(output,null,2));console.log(JSON.stringify(output.filter(p=>p.status!==200),null,2));
