import type { RailRoute } from "../types/route.ts";

export interface JourneyCollection {
  slug: string;
  title: string;
  description: string;
  routeSlugs: string[];
}

export const journeyCollections: JourneyCollection[] = [
  { slug: "alpine-journeys", title: "Alpine Journeys", description: "Panoramic railways shaped by high passes, glaciers, lakes, and deep valleys.", routeSlugs: ["glacier-express", "bernina-express", "goldenpass-express"] },
  { slug: "northern-landscapes", title: "Northern Landscapes", description: "Remote Highland, fjord, and north-coast journeys with a strong sense of place.", routeSlugs: ["west-highland-line", "flam-railway", "belfast-derry", "settle-carlisle"] },
  { slug: "cross-border-journeys", title: "Cross-Border Journeys", description: "Rail experiences whose changing geography carries you between countries.", routeSlugs: ["bernina-express"] },
  { slug: "short-scenic-escapes", title: "Short Scenic Escapes", description: "Concentrated railway experiences that fit into a wider trip.", routeSlugs: ["flam-railway", "cinque-terre", "kurobe-gorge-railway"] },
  { slug: "coastal-journeys", title: "Coastal Journeys", description: "Railways where sea, shoreline, and dramatic terrain shape the journey.", routeSlugs: ["cinque-terre", "west-highland-line", "belfast-derry", "dublin-rosslare"] },
  { slug: "full-day-journeys", title: "Full-Day Journeys", description: "Immersive routes where the railway journey becomes the day itself.", routeSlugs: ["glacier-express", "tranzalpine", "first-passage-west"] },
  { slug: "mountain-journeys", title: "Mountain Journeys", description: "Railways shaped by high passes, steep valleys, and memorable mountain engineering.", routeSlugs: ["tranzalpine", "glacier-express", "bernina-express", "flam-railway", "kurobe-gorge-railway", "first-passage-west", "settle-carlisle"] },
  { slug: "irish-rail-journeys", title: "Irish Rail Journeys", description: "Two coastal railways across the island of Ireland, shaped by different landscapes, countries, and operators.", routeSlugs: ["belfast-derry", "dublin-rosslare"] },
  { slug: "river-journeys", title: "River Journeys", description: "Railways whose landscapes are organized by major rivers, gorges, and valley bends.", routeSlugs: ["douro-line", "first-passage-west", "flam-railway", "belfast-derry"] },
  { slug: "multi-day-journeys", title: "Multi-Day Journeys", description: "Daylight rail experiences whose prepared journey continues across an overnight break.", routeSlugs: ["first-passage-west"] },
];

export function getJourneyCollection(slug: string): JourneyCollection | undefined { return journeyCollections.find((collection) => collection.slug === slug); }
export function getCollectionRoutes(collection: JourneyCollection, routes: RailRoute[]): RailRoute[] { return collection.routeSlugs.map((slug) => routes.find((route) => route.summary.slug === slug)).filter((route): route is RailRoute => Boolean(route)); }
export function getCollectionsForRoute(routeSlug: string): JourneyCollection[] { return journeyCollections.filter((collection) => collection.routeSlugs.includes(routeSlug)); }
export function getRelatedCollections(collection: JourneyCollection): JourneyCollection[] {
  return journeyCollections
    .filter((candidate) => candidate.slug !== collection.slug && candidate.routeSlugs.some((slug) => collection.routeSlugs.includes(slug)))
    .slice(0, 2);
}
