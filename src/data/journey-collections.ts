import type { RailRoute } from "../types/route.ts";

export interface JourneyCollection {
  slug: string;
  title: string;
  description: string;
  routeSlugs: string[];
  coverRouteSlug?: string;
}

export const journeyCollections: JourneyCollection[] = [
  { slug: "alpine-journeys", title: "Alpine Journeys", description: "Panoramic railways shaped by high passes, glaciers, lakes, and deep valleys.", routeSlugs: ["glacier-express", "bernina-express", "goldenpass-express"] },
  { slug: "northern-landscapes", title: "Northern Landscapes", description: "Remote Highland, fjord, and north-coast journeys with a strong sense of place.", routeSlugs: ["west-highland-line", "flam-railway", "bergen-line", "rauma-line", "belfast-derry", "settle-carlisle", "inlandsbanan"], coverRouteSlug: "inlandsbanan" },
  { slug: "cross-border-journeys", title: "Cross-Border Journeys", description: "Rail experiences whose changing geography carries you between countries.", routeSlugs: ["bernina-express", "belgrade-bar"] },
  { slug: "short-scenic-escapes", title: "Short Scenic Escapes", description: "Concentrated railway experiences that fit into a wider trip.", routeSlugs: ["flam-railway", "cinque-terre", "kurobe-gorge-railway", "sagano-scenic-railway", "train-des-merveilles"], coverRouteSlug: "train-des-merveilles" },
  { slug: "coastal-journeys", title: "Coastal Journeys", description: "Railways where sea, shoreline, and dramatic terrain shape the journey.", routeSlugs: ["cinque-terre", "west-highland-line", "jacobite-steam-train", "belfast-derry", "dublin-rosslare", "coast-starlight"] },
  { slug: "full-day-journeys", title: "Full-Day Journeys", description: "Immersive routes where the railway journey becomes the day itself.", routeSlugs: ["glacier-express", "tranzalpine", "bergen-line", "first-passage-west", "california-zephyr"] },
  { slug: "mountain-journeys", title: "Mountain Journeys", description: "Railways shaped by high passes, steep valleys, and memorable mountain engineering.", routeSlugs: ["tranzalpine", "glacier-express", "bernina-express", "flam-railway", "bergen-line", "rauma-line", "kurobe-gorge-railway", "first-passage-west", "settle-carlisle", "california-zephyr", "kandy-ella-railway", "coast-starlight", "the-canadian", "eastern-express", "hiram-bingham", "alishan-forest-railway", "belgrade-bar", "konkan-railway", "el-chepe-express", "train-des-merveilles"], coverRouteSlug: "bernina-express" },
  { slug: "irish-rail-journeys", title: "Irish Rail Journeys", description: "Two coastal railways across the island of Ireland, shaped by different landscapes, countries, and operators.", routeSlugs: ["belfast-derry", "dublin-rosslare"] },
  { slug: "river-journeys", title: "River Journeys", description: "Railways whose landscapes are organized by major rivers, gorges, and valley bends.", routeSlugs: ["douro-line", "first-passage-west", "flam-railway", "rauma-line", "belfast-derry", "california-zephyr"] },
  { slug: "railway-engineering", title: "Railway Engineering", description: "Journeys defined by viaducts, tunnels, mountain crossings, and the bold decisions that made the railway possible.", routeSlugs: ["glacier-express", "bernina-express", "flam-railway", "rauma-line", "kurobe-gorge-railway", "settle-carlisle", "alishan-forest-railway", "belgrade-bar", "konkan-railway", "el-chepe-express"], coverRouteSlug: "bernina-express" },
  { slug: "gorge-and-valley-journeys", title: "Gorge & Valley Journeys", description: "Railways that follow rivers, sheer-sided gorges, and deep valleys where the view changes with every curve.", routeSlugs: ["glacier-express", "tranzalpine", "flam-railway", "rauma-line", "kurobe-gorge-railway", "douro-line", "belgrade-bar", "el-chepe-express", "train-des-merveilles"], coverRouteSlug: "kurobe-gorge-railway" },
  { slug: "heritage-lines", title: "Heritage Lines", description: "Characterful railways where historic rolling stock, distinctive engineering, and a strong sense of railway history shape the experience.", routeSlugs: ["goldenpass-express", "flam-railway", "kurobe-gorge-railway", "sagano-scenic-railway", "alishan-forest-railway", "jacobite-steam-train", "inlandsbanan", "train-des-merveilles"], coverRouteSlug: "alishan-forest-railway" },
  { slug: "multi-day-journeys", title: "Multi-Day Journeys", description: "Long-form railway experiences that continue across one or more nights.", routeSlugs: ["the-ghan", "first-passage-west", "california-zephyr", "coast-starlight", "the-canadian", "eastern-express", "blue-train", "inlandsbanan"], coverRouteSlug: "the-ghan" },
  { slug: "great-rail-crossings", title: "Great Rail Crossings", description: "Long-distance journeys whose changing landscapes reveal the scale of a country or continent.", routeSlugs: ["tranzalpine", "bergen-line", "the-ghan", "first-passage-west", "california-zephyr", "coast-starlight", "the-canadian", "belgrade-bar", "konkan-railway", "blue-train", "el-chepe-express", "inlandsbanan"], coverRouteSlug: "el-chepe-express" },
];

export const promotedCollectionSlugs = [
  "short-scenic-escapes",
  "coastal-journeys",
  "mountain-journeys",
  "multi-day-journeys",
  "great-rail-crossings",
] as const;

export function getJourneyCollection(slug: string): JourneyCollection | undefined { return journeyCollections.find((collection) => collection.slug === slug); }
export function getCollectionRoutes(collection: JourneyCollection, routes: RailRoute[]): RailRoute[] { return collection.routeSlugs.map((slug) => routes.find((route) => route.summary.slug === slug)).filter((route): route is RailRoute => Boolean(route)); }
export function getCollectionCover(collection: JourneyCollection, routes: RailRoute[]): RailRoute | undefined { return routes.find((route) => route.summary.slug === collection.coverRouteSlug) ?? getCollectionRoutes(collection, routes)[0]; }
export function getCollectionsForRoute(routeSlug: string): JourneyCollection[] { return journeyCollections.filter((collection) => collection.routeSlugs.includes(routeSlug)); }
export function getRelatedCollections(collection: JourneyCollection): JourneyCollection[] {
  return journeyCollections
    .filter((candidate) => candidate.slug !== collection.slug && candidate.routeSlugs.some((slug) => collection.routeSlugs.includes(slug)))
    .slice(0, 2);
}
