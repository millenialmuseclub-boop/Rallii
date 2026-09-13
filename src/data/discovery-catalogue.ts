import { snowDestinations } from "../snow/data.ts";
import { mtbDestinations } from "../mtb/data.ts";
import { trails } from "../trail/data.ts";
import { publishedCourses } from "../green/data/courses.ts";
import { getAllRoutes } from "./routes/index.ts";
export interface DiscoveryEntry {id:string;slug:string;name:string;mode:"rail"|"trail"|"mtb"|"snow"|"green";country:string;region:string;href:string;summary:string;season:string;tags:string[]}
export const discoveryCatalogue: DiscoveryEntry[] = [
 ...snowDestinations.map(p=>({id:p.id,slug:p.slug,name:p.name,mode:"snow" as const,country:p.country,region:p.region,href:`/snow/${p.slug}/`,summary:p.summary,season:p.season,tags:p.highlights})),
 ...mtbDestinations.map(p=>({id:`mtb:${p.slug}`,slug:p.slug,name:p.name,mode:"mtb" as const,country:p.location.split(",").at(-1)!.trim().replace("USA","United States"),region:p.region,href:`/mtb/${p.slug}/`,summary:p.summary,season:p.season,tags:[p.kind,...p.skills,...p.sections]})),
 ...trails.map(p=>({id:`trail:${p.slug}`,slug:p.slug,name:p.name,mode:"trail" as const,country:p.country,region:p.region,href:`/trail/${p.slug}/`,summary:p.whyGo,season:p.bestTime,tags:[p.difficulty,...p.tags]})),
 ...publishedCourses.map(p=>({id:`green:${p.slug}`,slug:p.slug,name:p.name,mode:"green" as const,country:p.location.country,region:p.location.region,href:`/green/courses/${p.slug}/`,summary:p.editorial.shortDescription,season:p.season,tags:p.character.settings})),
 ...getAllRoutes().map(({summary:p})=>({id:`rail:${p.slug}`,slug:p.slug,name:p.name,mode:"rail" as const,country:p.country,region:p.country,href:`/routes/${p.slug}/`,summary:p.shortDescription,season:"Confirm the operator’s calendar",tags:p.experienceTags})),
];
