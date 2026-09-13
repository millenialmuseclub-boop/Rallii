import {execFileSync} from 'node:child_process';
for(const mode of ['snow','mtb','trail'])execFileSync(process.execPath,['scripts/fetch-expansion-media.mjs',mode],{stdio:'inherit'});
