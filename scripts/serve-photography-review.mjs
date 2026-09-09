// Serve the native export locally. This does not publish or sync native projects.
import { createServer } from 'node:http';
import { readFile,stat } from 'node:fs/promises';
import { resolve,extname,sep } from 'node:path';
const root=resolve('out');
const mime={'.html':'text/html','.txt':'text/plain','.js':'text/javascript','.css':'text/css','.json':'application/json','.geojson':'application/geo+json','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.webmanifest':'application/manifest+json'};
createServer(async(request,response)=>{
  try {
    let file=resolve(root,`.${decodeURIComponent(new URL(request.url,'http://localhost').pathname)}`);
    if(file!==root&&!file.startsWith(root+sep)) {response.writeHead(403).end();return;}
    if((await stat(file)).isDirectory())file=resolve(file,'index.html');
    response.writeHead(200,{'Content-Type':mime[extname(file)]??'application/octet-stream','Cache-Control':'no-store'}).end(await readFile(file));
  } catch {response.writeHead(404).end('Not found');}
}).listen(4184,'127.0.0.1',()=>console.log('Photography review: http://127.0.0.1:4184'));
