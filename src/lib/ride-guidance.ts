import type { BestSideSegment, RailRoute, ScenicTimelineEntry, ViewSide } from "../types/route.ts";

export const rideMatchThresholds = { onRouteMeters: 150, nearRouteMeters: 1_000 } as const;
export function getMatchConfidence(distanceMeters: number): "on-route" | "near-route" | "unmatched" { return distanceMeters <= rideMatchThresholds.onRouteMeters ? "on-route" : distanceMeters <= rideMatchThresholds.nearRouteMeters ? "near-route" : "unmatched"; }
export function getNextHighlight(route: RailRoute, distanceKm: number): ScenicTimelineEntry | undefined { return route.timelineEntries.filter((entry) => entry.importance !== "normal" && entry.distanceAlongRouteKm > distanceKm + 0.05).sort((a, b) => a.distanceAlongRouteKm - b.distanceAlongRouteKm)[0]; }
export function getPreviousHighlight(route: RailRoute, distanceKm: number): ScenicTimelineEntry | undefined { return route.timelineEntries.filter((entry) => entry.importance !== "normal" && entry.distanceAlongRouteKm <= distanceKm + 0.05).sort((a, b) => b.distanceAlongRouteKm - a.distanceAlongRouteKm)[0]; }
export function getCurrentBestSideSegment(segments: BestSideSegment[], distanceKm: number): BestSideSegment | undefined { return segments.find((segment) => distanceKm >= segment.startDistanceKm && distanceKm <= segment.endDistanceKm); }
export function getRideSide(route: RailRoute, distanceKm: number, upcoming?: ScenicTimelineEntry): ViewSide { if (upcoming?.bestSide) return upcoming.bestSide; return getCurrentBestSideSegment(route.bestSideSegments, distanceKm)?.forwardDirectionSide ?? "unknown"; }
export function formatRideSide(side: ViewSide): string { return side === "left" ? "Look left" : side === "right" ? "Look right" : side === "both" ? "Views on both sides" : side === "varies" ? "Views vary here" : "No clear recommendation"; }
export function formatAheadDistance(km: number): string { return km < 1 ? `About ${Math.max(100, Math.round(km * 10) * 100)} m ahead` : `About ${km.toFixed(1)} km ahead`; }
