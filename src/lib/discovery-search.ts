import type { DiscoveryEntry } from "../data/discovery-catalogue.ts";
export function searchDiscovery(entries:readonly DiscoveryEntry[],query:string,mode="all",country="All",month="All"){
 const normalize=(value:string)=>value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ");
 const words=normalize(query).trim().split(/\s+/).filter(Boolean);
 return entries.filter(p=>(mode==="all"||p.mode===mode)&&(country==="All"||(p.countries??[p.country]).includes(country))&&(month==="All"||p.bestMonths?.includes(Number(month)))&&words.every(word=>normalize([p.name,p.country,p.region,p.summary,p.season,...p.tags].join(" ")).includes(word)));
}
