import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { publishedCourses } from '../src/green/data/courses.ts';
import { courseMedia } from '../src/green/data/media.ts';
import { snowDestinations } from '../src/snow/data.ts';

let queries = [
  ...snowDestinations.map(p => [p.slug, `${p.name} ski snow`, 'snow']),
  ...publishedCourses.filter(c => !courseMedia.some(m => m.courseSlug === c.slug)).map(c => [c.slug, `${c.name} golf`, 'green']),
];
if(process.argv[2]) queries = JSON.parse(await readFile(process.argv[2], 'utf8'));
await mkdir('build/photography', { recursive: true });
const results = JSON.parse(await readFile('build/photography/candidates.json','utf8').catch(()=>'{}'));
for (const [slug, query, mode] of queries) {
  if(results[slug]) continue;
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.search = new URLSearchParams({ action:'query', format:'json', generator:'search', gsrsearch:query+' filetype:bitmap', gsrnamespace:'6', gsrlimit:'8', prop:'imageinfo', iiprop:'url|extmetadata|size', iiurlwidth:'1600' });
  let response = await fetch(url);
  for(let retry=0;response.status===429 && retry<4;retry++) { await new Promise(resolve=>setTimeout(resolve,15000)); response=await fetch(url); }
  if (!response.ok) throw new Error(`${slug}: ${response.status}`);
  const data = await response.json();
  results[slug] = {mode, query, candidates:Object.values(data.query?.pages ?? {}).sort((a,b)=>a.index-b.index)};
  console.log(slug, results[slug].candidates.map(p=>p.title));
  await writeFile('build/photography/candidates.json', JSON.stringify(results,null,2));
  await new Promise(resolve=>setTimeout(resolve,4500));
}
await writeFile('build/photography/candidates.json', JSON.stringify(results,null,2));
