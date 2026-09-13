import {readdirSync,readFileSync,existsSync,statSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve('out');const pages=[];
function visit(path){for(const item of readdirSync(path,{withFileTypes:true})){if(item.name==='_next')continue;const file=join(path,item.name);if(item.isDirectory())visit(file);else if(file.endsWith('.html'))pages.push(file);}}
visit(root);const broken=new Map();let checked=0;
for(const file of pages){const html=readFileSync(file,'utf8');for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){const href=match[1];if(href.startsWith('//')||href.startsWith('/_next/'))continue;const path=resolve(root,'.'+decodeURIComponent(href));checked++;if(existsSync(path)&&(statSync(path).isFile()||existsSync(join(path,'index.html'))))continue;if(existsSync(path+'.html'))continue;broken.set(href,file.replace(root,''));}}
const report={pages:pages.length,references:checked,broken:[...broken].map(([href,page])=>({href,page}))};writeFileSync('build/expansion-internal-links.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(broken.size)process.exitCode=1;
