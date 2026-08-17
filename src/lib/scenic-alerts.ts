import type { ScenicMoment } from "@/types/intelligence";
import type { JourneyDirection, ViewSide } from "@/types/route";

export interface DirectionalScenicMoment extends ScenicMoment { journeyDistanceKm: number; viewingSide?: ViewSide; }

export function getDirectionalScenicMoments(moments: ScenicMoment[], totalDistanceKm: number, direction: JourneyDirection): DirectionalScenicMoment[] {
  return moments.map((moment) => ({ ...moment, title: direction === "reverse" ? moment.reverseTitle ?? moment.title : moment.title, description: direction === "reverse" ? moment.reverseDescription ?? moment.description : moment.description, journeyDistanceKm: direction === "reverse" ? totalDistanceKm - moment.distanceAlongRouteKm : moment.distanceAlongRouteKm, viewingSide: direction === "reverse" ? moment.viewingSideReverse : moment.viewingSideForward })).sort((a, b) => a.journeyDistanceKm - b.journeyDistanceKm);
}

export function getUpcomingScenicMoment(moments: DirectionalScenicMoment[], journeyDistanceKm: number): DirectionalScenicMoment | undefined { return moments.find((moment) => moment.journeyDistanceKm >= journeyDistanceKm); }

export function getForegroundScenicAlert(moments: DirectionalScenicMoment[], journeyDistanceKm: number, firedIds: ReadonlySet<string>): DirectionalScenicMoment | undefined {
  return moments.find((moment) => moment.alertEligible && !firedIds.has(moment.id) && moment.journeyDistanceKm >= journeyDistanceKm && moment.journeyDistanceKm - journeyDistanceKm <= moment.leadDistanceKm);
}
