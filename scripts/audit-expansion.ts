import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { snowDestinations } from "../src/snow/data.ts";
import { mtbDestinations } from "../src/mtb/data.ts";
import { trails } from "../src/trail/data.ts";
import { getAllRoutes } from "../src/data/routes/index.ts";
import { publishedCourses } from "../src/green/data/courses.ts";
import { publishedDestinations } from "../src/green/data/destinations.ts";
const errors:string[]=[];
const groups={snow:snowDestinations,mtb:mtbDestinations,trail:trails};
for(const [mode,items] of Object.entries(groups)){
 const media=JSON.parse(readFileSync(`src/${mode}/media.json`,"utf8"));
 const seen=new Set<string>();
 for(const item of items){if(seen.has(item.slug))errors.push(`Duplicate ${mode}/${item.slug}`);seen.add(item.slug);const photo=media[item.imageKey];if(!photo||!existsSync(`public${photo.src}`))errors.push(`Missing photograph: ${mode}/${item.slug}`);if(!item.sourceUrl.startsWith("https://"))errors.push(`Invalid official URL: ${mode}/${item.slug}`);}
}
const report={counts:{rail:getAllRoutes().length,trail:trails.length,mtb:mtbDestinations.length,snow:snowDestinations.length,greenCourses:publishedCourses.length,greenDestinations:publishedDestinations.length},errors};
writeFileSync("build/expansion-audit.json",JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
