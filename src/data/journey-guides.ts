import type { RailRoute } from "@/types/route";

export interface JourneyGuide {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  routeSlugs: readonly string[];
  connectionNote: string;
  coverRouteSlug: string;
  collectionSlugs: readonly string[];
}

export const journeyGuides: readonly JourneyGuide[] = [
  {slug:"swiss-winter-by-rail",title:"A Swiss winter by rail",eyebrow:"Snow towns and panoramic trains",description:"Use Zermatt and the Engadin as winter bases with a scenic rail day between mountain days. Compare the Glacier Express crossing with a separate Bernina journey toward Tirano; they are different commitments, not interchangeable transfers.",routeSlugs:["glacier-express","bernina-express"],connectionNote:"Book the panoramic train's required reservation as well as a valid ticket. Check current regional-train reservation advice with RhB instead of assuming every alternative is reservation-free. Use daylight to choose your departure and leave a buffer night before a flight. Ski passes, equipment carriage and final hotel transfers need separate checks.",coverRouteSlug:"bernina-express",collectionSlugs:["alpine-journeys","mountain-journeys"]},
  {slug:"scotland-beyond-the-viaduct",title:"Scotland beyond the viaduct",eyebrow:"Highland rail, slowly",description:"Give the West Highland landscape more than one passing glance. Base in Fort William, leave a day for the coast at Mallaig and compare the regular railway with the seasonal Jacobite experience.",routeSlugs:["west-highland-line","jacobite-steam-train"],connectionNote:"These journeys share track: choose separate days if taking both. Confirm the Jacobite’s current operation and reservations; allow an overnight in Fort William rather than assuming a same-day connection from a sleeper arrival.",coverRouteSlug:"west-highland-line",collectionSlugs:["northern-landscapes","heritage-lines"]},
  {slug:"japan-and-taiwan-by-scenic-rail",title:"Forest trains of Japan and Taiwan",eyebrow:"Small railways, large landscapes",description:"Compare Kyoto’s short gorge excursion, the mountain engineering of Kurobe and Alishan’s climb into Taiwan’s forest. Each works best as the centerpiece of its own local stay.",routeSlugs:["sagano-scenic-railway","kurobe-gorge-railway","alishan-forest-railway"],connectionNote:"An editorial collection across two countries, not a through itinerary. Mountain operations can be seasonal or curtailed; verify the open section and onward transport before reserving accommodation.",coverRouteSlug:"alishan-forest-railway",collectionSlugs:["heritage-lines","mountain-journeys"]},
  {slug:"latin-america-window-seat",title:"Latin America from the window",eyebrow:"Canyons and the Sacred Valley",description:"Copper Canyon and the Sacred Valley offer very different rail journeys. Give northern Mexico time for canyon-town stays, or build a Peru trip around Cusco, acclimatization and the approach to Machu Picchu.",routeSlugs:["el-chepe-express","hiram-bingham"],connectionNote:"Separate journeys in Mexico and Peru. Mountain health, attraction entry, transfers and operator tickets need independent planning; a train ticket does not imply admission to every attraction.",coverRouteSlug:"el-chepe-express",collectionSlugs:["mountain-journeys","gorge-and-valley-journeys"]},
  {slug:"north-america-long-way",title:"North America, the long way",eyebrow:"A landscape-sized journey",description:"Choose the Pacific edge, the Rockies or a transcontinental crossing. Plan overnight comfort and daylight around the scenery that matters most, then leave recovery time at the far end.",routeSlugs:["coast-starlight","california-zephyr","the-canadian","first-passage-west"],connectionNote:"Compare these as distinct journeys, not guaranteed connections. Timetables, delays and daylight vary; allow buffer nights before flights and check accommodation and meal inclusions with each operator.",coverRouteSlug:"the-canadian",collectionSlugs:["multi-day-journeys","great-rail-crossings"]},
  {
    slug: "swiss-panoramic-railways",
    title: "Swiss Panoramic Railways",
    eyebrow: "A high-alpine rail week",
    description: "Three distinct ways to experience the Swiss Alps: lakeside valleys, a long central crossing, and the high Bernina Pass.",
    routeSlugs: ["goldenpass-express", "glacier-express", "bernina-express"],
    connectionNote: "These are individual rail journeys, not one through service. Choose dates and connections independently; mountain weather and seasonal daylight can change the experience.",
    coverRouteSlug: "bernina-express",
    collectionSlugs: ["alpine-journeys", "railway-engineering"],
  },
  {
    slug: "norway-mountain-to-fjord",
    title: "Norway: Mountain to Fjord",
    eyebrow: "A Bergen and Flåm pairing",
    description: "Cross Norway’s high plateau on the Bergen Line, then descend on the separate Flåm Railway from the mountain interchange at Myrdal.",
    routeSlugs: ["bergen-line", "rauma-line", "flam-railway"],
    connectionNote: "Myrdal is the interchange. The Bergen Line does not travel to Flåm, and the two services must be planned and checked independently.",
    coverRouteSlug: "flam-railway",
    collectionSlugs: ["northern-landscapes", "mountain-journeys"],
  },
  {
    slug: "alps-to-the-riviera",
    title: "Alps to the Riviera",
    eyebrow: "Mountain engineering to Mediterranean coast",
    description: "Pair a mountain railway of tunnels and stone villages with a short coastal line that threads through Cinque Terre.",
    routeSlugs: ["train-des-merveilles", "cinque-terre"],
    connectionNote: "This is an editorial pairing rather than a same-day itinerary. Continue planning separately for travel between the French Riviera and Liguria.",
    coverRouteSlug: "cinque-terre",
    collectionSlugs: ["coastal-journeys", "short-scenic-escapes"],
  },
  {
    slug: "great-rail-crossings",
    title: "Great Rail Crossings",
    eyebrow: "Long-form rail journeys",
    description: "A collection of large-scale crossings where the changing landscape is the point of the journey, not simply the route between cities.",
    routeSlugs: ["tranzalpine", "california-zephyr", "the-ghan", "madaraka-express"],
    connectionNote: "Each route is a separate long-distance journey on another continent. Use this guide to compare the character and scale, then plan the chosen route directly.",
    coverRouteSlug: "the-ghan",
    collectionSlugs: ["great-rail-crossings", "multi-day-journeys"],
  },
  {
    slug: "asian-rail-landscapes",
    title: "Asian Rail Landscapes",
    eyebrow: "Four distinct mountain and coast journeys",
    description: "From the East Rift Valley to Himalayan foothills, these journeys show how railways meet forest, monsoon country, coast, and mountain terrain across Asia.",
    routeSlugs: ["reunification-express", "east-rift-valley-railway", "kandy-ella-railway", "kalka-shimla-railway"],
    connectionNote: "This is an editorial grouping, not an itinerary. Each route has separate operators, seasons, and travel requirements; check current details independently.",
    coverRouteSlug: "kalka-shimla-railway",
    collectionSlugs: ["mountain-journeys", "heritage-lines"],
  },
];

export function getJourneyGuide(slug: string): JourneyGuide | undefined {
  return journeyGuides.find((guide) => guide.slug === slug);
}

export function getGuideRoutes(guide: JourneyGuide, routes: readonly RailRoute[]): RailRoute[] {
  return guide.routeSlugs.map((slug) => routes.find((route) => route.summary.slug === slug)).filter((route): route is RailRoute => Boolean(route));
}

export function getGuidesForRoute(routeSlug: string): JourneyGuide[] {
  return journeyGuides.filter((guide) => guide.routeSlugs.includes(routeSlug));
}
