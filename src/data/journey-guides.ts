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
    routeSlugs: ["tranzalpine", "california-zephyr", "the-ghan"],
    connectionNote: "Each route is a separate long-distance journey on another continent. Use this guide to compare the character and scale, then plan the chosen route directly.",
    coverRouteSlug: "the-ghan",
    collectionSlugs: ["great-rail-crossings", "multi-day-journeys"],
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
