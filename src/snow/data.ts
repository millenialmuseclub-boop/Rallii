import expanded from "./expanded.json" with { type: "json" };
export type SnowKind = "Resort" | "Ski region";
export interface SnowDestination { slug: string; imageKey: string; name: string; location: string; region: string; kind: SnowKind; terrain: string; season: string; summary: string; sourceUrl: string }
const originalDestinations: SnowDestination[] = [
  ["whistler-blackcomb","Whistler Blackcomb","British Columbia, Canada","Canada","Resort","Two linked mountains with a broad mix of alpine and tree skiing.","Northern winter","A big-mountain base for long ski days and a village-built trip.","https://www.whistlerblackcomb.com/"],
  ["banff-sunshine","Banff Sunshine","Alberta, Canada","Canada","Resort","High alpine bowls and open terrain in Banff National Park.","November–May","A high-elevation ski day surrounded by the Canadian Rockies.","https://www.skibanff.com/"],
  ["lake-louise","Lake Louise Ski Resort","Alberta, Canada","Canada","Resort","Front-side groomers, bowls and mountain views above Lake Louise.","November–May","A classic Rockies resort that works well inside a wider Banff trip.","https://www.skilouise.com/"],
  ["revelstoke","Revelstoke Mountain Resort","British Columbia, Canada","Canada","Resort","Long vertical, glades and advanced alpine terrain.","December–April","For skiers and riders who want the mountain to be the main event.","https://www.revelstokemountainresort.com/"],
  ["park-city","Park City Mountain","Utah, United States","United States","Resort","A large linked trail network with direct town access.","November–April","Easy logistics, varied terrain and a historic mountain-town base.","https://www.parkcitymountain.com/"],
  ["jackson-hole","Jackson Hole Mountain Resort","Wyoming, United States","United States","Resort","Steep alpine terrain, bowls and substantial vertical.","November–April","A serious mountain with a strong sense of place in the Tetons.","https://www.jacksonhole.com/"],
  ["aspen-snowmass","Aspen Snowmass","Colorado, United States","United States","Ski region","Four mountains connected by one destination base.","November–April","Choose a mountain to match the day, from mellow cruising to steep lines.","https://www.aspensnowmass.com/"],
  ["chamonix","Chamonix Mont-Blanc","France","Europe","Ski region","Multiple mountain areas beneath the Mont Blanc massif.","December–April","An alpine town for experienced skiers who plan carefully and use local guidance.","https://www.chamonix.com/"],
  ["zermatt","Zermatt","Switzerland","Europe","Ski region","High-altitude skiing beneath the Matterhorn with linked terrain toward Italy.","November–April","A car-free alpine trip where the journey and the mountain belong together.","https://www.zermatt.ch/en"],
  ["niseko-united","Niseko United","Hokkaido, Japan","Japan","Ski region","Four connected areas known for frequent winter snow and tree skiing.","December–April","A Hokkaido snow trip with several bases and a strong food culture beyond the lifts.","https://www.niseko.ne.jp/en/"],
  ["coronet-peak","Coronet Peak","Queenstown, New Zealand","New Zealand","Resort","Open groomed terrain close to Queenstown.","June–October","A Southern Hemisphere ski day that fits naturally into a Queenstown trip.","https://www.coronetpeak.co.nz/"],
  ["falls-creek","Falls Creek","Victoria, Australia","Australia","Resort","A pedestrian alpine village with groomed runs and Nordic access.","June–October","An Australian winter base with village convenience and varied snow activities.","https://www.fallscreek.com.au/"],
].map(([slug,name,location,region,kind,terrain,season,summary,sourceUrl]) => ({slug,imageKey:slug,name,location,region,kind: kind as SnowKind,terrain,season,summary,sourceUrl}));
export type SnowAbility = "Beginner" | "Intermediate" | "Expert";
const originalPlanning: Record<string, [string, string, string[]]> = {
  "whistler-blackcomb": ["Vancouver", "Whistler Village or Creekside", ["Whistler Mountain", "Blackcomb Mountain", "Creekside"]],
  "banff-sunshine": ["Calgary", "Banff town or Sunshine base", ["Sunshine Village", "Lookout Mountain", "Banff town"]],
  "lake-louise": ["Calgary", "Lake Louise village or Banff", ["Front-side groomers", "Back bowls", "Lake Louise village"]],
  revelstoke: ["Kelowna", "Revelstoke town or resort base", ["Revelation Gondola", "Upper mountain", "Revelstoke town"]],
  "park-city": ["Salt Lake City", "Park City or Canyons Village", ["Park City base", "Canyons Village", "Historic Main Street"]],
  "jackson-hole": ["Jackson Hole", "Teton Village or Jackson", ["Rendezvous Mountain", "Après in Teton Village", "Jackson town"]],
  "aspen-snowmass": ["Aspen/Pitkin County", "Aspen or Snowmass Village", ["Snowmass", "Buttermilk", "Aspen Mountain"]],
  chamonix: ["Geneva", "Chamonix town or Argentière", ["Brévent–Flégère", "Les Houches", "Argentière"]],
  zermatt: ["Zurich or Geneva", "Zermatt village", ["Gornergrat", "Sunnegga", "Matterhorn views"]],
  "niseko-united": ["New Chitose", "Hirafu, Niseko Village or Annupuri", ["Hirafu", "Annupuri", "Niseko Village"]],
  "coronet-peak": ["Queenstown", "Queenstown or Arrowtown", ["Coronet Peak", "Queenstown lakefront", "Arrowtown"]],
  "falls-creek": ["Albury or Melbourne", "Falls Creek village", ["Village slopes", "Nordic trails", "Alpine village"]],
};
export interface SnowGuide extends SnowDestination {
  id: string; mode: "snow"; country: string; airport: string; lodging: string;
  highlights: string[]; abilities: SnowAbility[]; bestMonths: number[];
  family: string; snowCharacter: string; transport: string; offMountain: string;
  perfectDay: string[]; gallery: string[]; conditions: { status: "not-connected" };
}
export const snowDestinations: SnowGuide[] = [...originalDestinations, ...expanded.map(item => ({...item, kind: item.kind as SnowKind}))].map(place => {
  const addition = expanded.find(item => item.slug === place.slug);
  const [airport, lodging, highlights] = addition ? [addition.airport, addition.lodging, addition.highlights] : originalPlanning[place.slug];
  const country = addition?.country ?? (place.location.includes("United States") ? "United States" : place.location.includes("Canada") ? "Canada" : place.slug === "chamonix" ? "France" : place.slug === "zermatt" ? "Switzerland" : place.region);
  const southern = ["Chile", "Argentina", "New Zealand", "Australia"].includes(country);
  return {...place, id:`snow:${place.slug}`, mode:"snow", country, airport, lodging, highlights,
    abilities: ["Beginner", "Intermediate", "Expert"], bestMonths: southern ? [7,8,9] : [1,2,3], gallery:[place.imageKey],
    family: `Choose a base in ${lodging} and book lessons for the least experienced skier. Confirm children's ages, meeting points and non-ski access before booking.`,
    snowCharacter: country === "Japan" ? "Cold midwinter storms are part of the appeal; powder is never guaranteed. Respect resort boundaries and local avalanche guidance." : southern ? "Southern winter brings variable mountain weather. Wind, freeze–thaw cycles and storms can affect lift access." : "Midwinter snow and spring freeze–thaw cycles offer different trips. Grooming, wind and recent weather matter more than a seasonal reputation.",
    transport: `Plan arrival through ${airport}. Compare a booked transfer with public connections to ${lodging}; confirm winter schedules and the last return before choosing flights.`,
    offMountain: `Leave an afternoon for ${lodging}: a slow lunch, village wandering and local food. Ask the visitor office which winter walks and sightseeing lifts are open to non-skiers.`,
    perfectDay: [`Start near ${highlights[0]} with an open groomed run below your usual grade; use the current piste map.`, `Make ${highlights[1]} the focus of the day only if the terrain, links and conditions suit your group. Break for lunch before fatigue builds.`, `Finish with time for ${highlights[2]} and return to ${lodging} before the last required lift or transfer.`],
    conditions:{status:"not-connected"},
  };
});
export function findSnow(slug: string) { return snowDestinations.find(item => item.slug === slug); }
export function filterSnow(query = "", region = "All", kind = "All") { const q=query.trim().toLowerCase(); return snowDestinations.filter(item => (!q || `${item.name} ${item.location} ${item.terrain}`.toLowerCase().includes(q)) && (region === "All" || item.region === region) && (kind === "All" || item.kind === kind)); }
