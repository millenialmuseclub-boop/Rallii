import type { DiscoveryEntry } from "../data/discovery-catalogue.ts";
export function searchDiscovery(entries:readonly DiscoveryEntry[],query:string,mode="all",country="All"){
 const normalize=(value:string)=>value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const words=normalize(query).trim().split(/\s+/).filter(Boolean);
 return entries.filter(p=>(mode==="all"||p.mode===mode)&&(country==="All"||p.country===country)&&words.every(word=>normalize([p.name,p.country,p.region,p.summary,...p.tags].join(" ")).includes(word)));
}
