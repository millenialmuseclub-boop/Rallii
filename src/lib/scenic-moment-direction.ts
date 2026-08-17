import { getScenicMoments } from "@/data/scenic-moments";
import { getDirectionalScenicMoments } from "@/lib/scenic-alerts";
import type { JourneyDirection, RailRoute, ScenicTimelineEntry } from "@/types/route";

/** Keeps the existing timeline UI on the same prepared content used by Scenic Alerts. */
export function getScenicMomentTimeline(route: RailRoute, direction: JourneyDirection): ScenicTimelineEntry[] {
  return getDirectionalScenicMoments(getScenicMoments(route), route.summary.distanceKm, direction).map((moment) => {
    const original = route.timelineEntries.find((entry) => `${route.summary.slug}:${entry.id}` === moment.id);
    return {
      id: original?.id ?? moment.id,
      title: moment.title,
      subtitle: direction === "reverse" ? original?.reverseSubtitle ?? original?.subtitle : original?.subtitle,
      shortDescription: moment.description,
      distanceAlongRouteKm: moment.journeyDistanceKm,
      approximateJourneyMinutes: moment.approximateJourneyMinutes === undefined ? undefined : direction === "reverse" ? route.summary.durationMinutes - moment.approximateJourneyMinutes : moment.approximateJourneyMinutes,
      type: original?.type ?? "journey-note",
      bestSide: moment.viewingSide,
      bestSideReverse: original?.bestSideReverse,
      importance: moment.importance,
      relatedLandmarkId: original?.relatedLandmarkId,
    };
  });
}
