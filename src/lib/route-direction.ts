import type { BestSideSegment, JourneyDirection, Landmark, RailRoute, RouteStop, ScenicTimelineEntry, ViewSide } from "../types/route.ts";

export function parseJourneyDirection(value: string | string[] | null | undefined): JourneyDirection {
  return (Array.isArray(value) ? value[0] : value) === "reverse" ? "reverse" : "forward";
}

export function transformRouteDistance(distanceKm: number, totalDistanceKm: number, direction: JourneyDirection): number {
  return direction === "forward" ? distanceKm : roundDistance(totalDistanceKm - distanceKm);
}

export function getDirectionalEndpoints(route: RailRoute, direction: JourneyDirection): { origin: string; destination: string } {
  return direction === "forward"
    ? { origin: route.summary.origin, destination: route.summary.destination }
    : { origin: route.summary.destination, destination: route.summary.origin };
}

export function getDirectionalStops(route: RailRoute, direction: JourneyDirection): RouteStop[] {
  const source = direction === "forward" ? route.stops : [...route.stops].reverse();
  return source.map((stop, index) => ({
    ...stop,
    sequence: index + 1,
    distanceAlongRouteKm: transformRouteDistance(stop.distanceAlongRouteKm, route.summary.distanceKm, direction),
  }));
}

export function getDirectionalLandmarks(route: RailRoute, direction: JourneyDirection): Landmark[] {
  const source = direction === "forward" ? route.landmarks : [...route.landmarks].reverse();
  return source.map((landmark) => ({
    ...landmark,
    distanceAlongRouteKm: transformRouteDistance(landmark.distanceAlongRouteKm, route.summary.distanceKm, direction),
    shortDescription: direction === "reverse" ? landmark.reverseShortDescription ?? landmark.shortDescription : landmark.shortDescription,
  }));
}

export function getDirectionalTimeline(route: RailRoute, direction: JourneyDirection): ScenicTimelineEntry[] {
  const source = direction === "forward" ? route.timelineEntries : [...route.timelineEntries].reverse();
  return source.map((entry) => {
    const landmark = entry.relatedLandmarkId ? route.landmarks.find((item) => item.id === entry.relatedLandmarkId) : undefined;
    return {
      ...entry,
      title: direction === "reverse" ? entry.reverseTitle ?? entry.title : entry.title,
      subtitle: direction === "reverse" ? entry.reverseSubtitle ?? entry.subtitle : entry.subtitle,
      shortDescription: direction === "reverse" ? entry.reverseShortDescription ?? entry.shortDescription : entry.shortDescription,
      distanceAlongRouteKm: transformRouteDistance(entry.distanceAlongRouteKm, route.summary.distanceKm, direction),
      approximateJourneyMinutes: entry.approximateJourneyMinutes === undefined
        ? undefined
        : direction === "reverse" ? route.summary.durationMinutes - entry.approximateJourneyMinutes : entry.approximateJourneyMinutes,
      bestSide: direction === "reverse" ? entry.bestSideReverse ?? landmark?.bestSideReverse ?? entry.bestSide : entry.bestSide,
    };
  });
}

export function getDirectionalSegments(route: RailRoute, direction: JourneyDirection): BestSideSegment[] {
  const source = direction === "forward" ? route.bestSideSegments : [...route.bestSideSegments].reverse();
  return source.map((segment) => direction === "forward" ? segment : {
    ...segment,
    startDistanceKm: transformRouteDistance(segment.endDistanceKm, route.summary.distanceKm, direction),
    endDistanceKm: transformRouteDistance(segment.startDistanceKm, route.summary.distanceKm, direction),
  });
}

export function getViewSide(forward: ViewSide, reverse: ViewSide, direction: JourneyDirection): ViewSide {
  return direction === "reverse" ? reverse : forward;
}

function roundDistance(value: number): number {
  const rounded = Math.round(value * 100) / 100;
  return Object.is(rounded, -0) ? 0 : rounded;
}
