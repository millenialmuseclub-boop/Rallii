import type { RailRoute } from "../types/route.ts";

export function validateRoute(route: RailRoute): string[] {
  const errors: string[] = [];
  const { summary, stops, landmarks, timelineEntries, bestSideSegments } = route;

  if (!summary.id || !summary.slug || !summary.name) errors.push("Route identity fields are required.");
  if (summary.durationMinutes <= 0 || summary.distanceKm <= 0) {
    errors.push("Route duration and distance must be positive.");
  }
  if (stops.length < 2) errors.push("A route requires at least two stops.");

  const sequences = stops.map((stop) => stop.sequence);
  const distances = stops.map((stop) => stop.distanceAlongRouteKm);
  if (!isStrictlyIncreasing(sequences)) errors.push("Stop sequences must be strictly increasing.");
  if (!isStrictlyIncreasing(distances)) errors.push("Stop distances must be strictly increasing.");

  const landmarkIds = new Set(landmarks.map((landmark) => landmark.id));
  for (const entry of timelineEntries) {
    if (entry.relatedLandmarkId && !landmarkIds.has(entry.relatedLandmarkId)) {
      errors.push(`Timeline entry ${entry.id} references an unknown landmark.`);
    }
  }

  for (const segment of bestSideSegments) {
    if (segment.startDistanceKm >= segment.endDistanceKm) {
      errors.push(`Best-side segment ${segment.id} must have a positive distance range.`);
    }
  }

  return errors;
}

function isStrictlyIncreasing(values: number[]): boolean {
  return values.every((value, index) => index === 0 || value > values[index - 1]);
}
