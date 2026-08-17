import type { ScenicMoment } from "@/types/intelligence";
import type { RailRoute } from "@/types/route";

const preparedMomentData: Record<string, Partial<ScenicMoment>> = {
  "bernina-express:timeline-lago-bianco": { leadDistanceKm: 1.2, alertEligible: true, loreIds: ["bernina-high-alpine-railway"], confidence: "editorial" },
  "bernina-express:timeline-alp-grum": { leadDistanceKm: 1, alertEligible: true, loreIds: ["bernina-high-alpine-railway"], confidence: "editorial" },
  "bernina-express:timeline-brusio": { leadDistanceKm: 1, alertEligible: true, loreIds: ["brusio-without-rack"], confidence: "editorial" },
  "flam-railway:timeline-rjoandefossen": { leadDistanceKm: 0.8, alertEligible: true, loreIds: ["flam-steep-railway"], confidence: "editorial" },
  "flam-railway:timeline-kjosfossen": { leadDistanceKm: 0.9, alertEligible: true, loreIds: ["kjosfossen-railway-stop"], confidence: "editorial" },
  "kurobe-gorge-railway:timeline-atobiki": { leadDistanceKm: 0.6, alertEligible: false, loreIds: ["kurobe-power-railway"], confidence: "editorial" },
};

export function getScenicMoments(route: RailRoute): ScenicMoment[] {
  return route.timelineEntries.map((entry, index) => {
    const id = `${route.summary.slug}:${entry.id}`;
    const landmark = entry.relatedLandmarkId ? route.landmarks.find((item) => item.id === entry.relatedLandmarkId) : undefined;
    const prepared = preparedMomentData[id];
    return {
      id, routeId: route.summary.slug, placeId: entry.relatedLandmarkId ? `${route.summary.slug}:${entry.relatedLandmarkId}` : undefined,
      title: entry.title, reverseTitle: entry.reverseTitle, description: entry.shortDescription, reverseDescription: entry.reverseShortDescription,
      latitude: landmark?.latitude, longitude: landmark?.longitude, distanceAlongRouteKm: entry.distanceAlongRouteKm, sequence: index + 1,
      approximateJourneyMinutes: entry.approximateJourneyMinutes, viewingSideForward: entry.bestSide, viewingSideReverse: entry.bestSideReverse ?? entry.bestSide,
      importance: entry.importance, leadDistanceKm: prepared?.leadDistanceKm ?? 0.7, alertEligible: prepared?.alertEligible ?? false,
      loreIds: prepared?.loreIds ?? [], sourceIds: landmark ? route.sources.filter((source) => source.category !== "railway-map").slice(0, 2).map((source) => source.id) : [], confidence: prepared?.confidence ?? "limited-data",
    };
  });
}

export function getAlertEligibleMoments(route: RailRoute): ScenicMoment[] { return getScenicMoments(route).filter((moment) => moment.alertEligible); }
