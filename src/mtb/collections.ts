import { mtbDestinations } from "./data";
const terrain = (pattern: RegExp) => mtbDestinations.filter(item => pattern.test(`${item.terrain} ${item.summary} ${item.sections.join(" ")}`));
export const mtbCollections = [
  { title: "Iconic riding", description: "Places with a distinct riding character. Choose the individual line from the local map, then build the trip around it.", items: mtbDestinations.filter(item => item.kind === "Riding region") },
  { title: "Start here", description: "Areas with beginner options. At Glentress, start with the skills area and choose a signed route for the least experienced rider.", items: mtbDestinations.filter(item => item.skills.includes("Beginner")) },
  { title: "Find your flow", description: "Berms and purpose-built trails, with progression before speed. Flow does not mean every feature is beginner-friendly.", items: terrain(/flow|berm/i) },
  { title: "Technical lines", description: "Roots, slabs and deliberate line choices. Inspect unfamiliar features and leave yourself the option to walk.", items: terrain(/technical|rock slab|roots/i) },
  { title: "Bike-park weekends", description: "Make time for rentals, protection and an orientation lap. Check whether uplift is operating before booking a park trip.", items: mtbDestinations.filter(item => item.kind === "Bike park") },
  { title: "Alpine views", description: "High-country scenery with weather and access to match. Start early enough to return without racing the light.", items: terrain(/alpine|high.country/i) },
  { title: "Desert riding", description: "Open landscapes and exposed riding. Moab’s Slickrock is demanding sandstone riding; its Practice Loop is not a beginner trail.", items: terrain(/desert|sandstone/i) },
  { title: "Forest escapes", description: "A weekend under the canopy. Respect wet-weather closures and shared access, and choose a base close to the trailhead.", items: terrain(/forest|wood/i) },
];
