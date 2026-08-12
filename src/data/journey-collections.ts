import type { RailRoute } from "../types/route.ts";

export interface JourneyCollection {
  slug: string;
  title: string;
  description: string;
  routeSlugs: string[];
}

export const journeyCollections: JourneyCollection[] = [
  { slug: "alpine-journeys", title: "Alpine Journeys", description: "Panoramic railways shaped by high passes, glaciers, lakes, and deep valleys.", routeSlugs: ["glacier-express", "bernina-express", "goldenpass-express"] },
  { slug: "northern-landscapes", title: "Northern Landscapes", description: "Remote Highland and fjord-country journeys with a strong sense of place.", routeSlugs: ["west-highland-line", "flam-railway"] },
  { slug: "cross-border-journeys", title: "Cross-Border Journeys", description: "Rail experiences whose changing geography carries you between countries.", routeSlugs: ["bernina-express"] },
  { slug: "short-scenic-escapes", title: "Short Scenic Escapes", description: "Concentrated railway experiences that fit into a wider trip.", routeSlugs: ["flam-railway"] },
  { slug: "full-day-journeys", title: "Full-Day Journeys", description: "Immersive routes where the railway journey becomes the day itself.", routeSlugs: ["glacier-express"] },
];

export function getJourneyCollection(slug: string): JourneyCollection | undefined { return journeyCollections.find((collection) => collection.slug === slug); }
export function getCollectionRoutes(collection: JourneyCollection, routes: RailRoute[]): RailRoute[] { return collection.routeSlugs.map((slug) => routes.find((route) => route.summary.slug === slug)).filter((route): route is RailRoute => Boolean(route)); }
