// Remove only reviewed originals with a local WebP replacement and no runtime reference.
import { readFile,writeFile,unlink,stat } from 'node:fs/promises';
import { resolve,sep } from 'node:path';
import assert from 'node:assert/strict';
const oldGreen=await readFile('build/photography/original-green-media.txt','utf8');
const paths=[...JSON.parse(await readFile('build/photography/retired-rail-images.json','utf8')),...[...oldGreen.matchAll(/src:\s*"([^"]+)"/g)].map(match=>match[1])];
const files=(await readFile('build/photography/runtime-files.txt','utf8')).replace(/^\uFEFF/,'').trim().split(/\r?\n/);
const text=await Promise.all(files.map(file=>readFile(file,'utf8')));
const root=resolve('public'),removed=[];
for(const path of new Set(paths)) {
  if(path.endsWith('.webp'))continue;
  const file=resolve(root,`.${path}`),replacement=file.replace(/\.[^.]+$/,'.webp');
  assert.ok(file.startsWith(root+sep)&&replacement.startsWith(root+sep));
  assert.ok((await stat(replacement)).size>0,`Missing replacement for ${path}`);
  assert.ok(!text.some(value=>value.includes(path)),`Still referenced: ${path}`);
  if(await stat(file).catch(()=>null)) {removed.push({path,bytes:(await stat(file)).size});await unlink(file);}
}
await writeFile('build/photography/removed-originals.json',JSON.stringify(removed,null,2)+'\n');
console.log(`Removed ${removed.length} superseded originals (${removed.reduce((n,m)=>n+m.bytes,0)} bytes).`);
