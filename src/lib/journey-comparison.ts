import type { RailRoute, ReservationStatus, ViewSide } from "../types/route.ts";

export type JourneyDurationCategory = "Quick Escape" | "Half-Day Journey" | "Long Scenic Journey" | "Full-Day Experience";

export function getJourneyDurationCategory(minutes: number): JourneyDurationCategory {
  if (minutes < 90) return "Quick Escape";
  if (minutes < 240) return "Half-Day Journey";
  if (minutes < 360) return "Long Scenic Journey";
  return "Full-Day Experience";
}

export function parseComparisonRoutes(value: string | string[] | undefined, routes: RailRoute[]): RailRoute[] {
  const source = Array.isArray(value) ? value[0] : value;
  const slugs = source?.split(",").map((slug) => slug.trim()).filter(Boolean) ?? [];
  const unique = [...new Set(slugs)].slice(0, 2);
  return unique.map((slug) => routes.find((route) => route.summary.slug === slug)).filter((route): route is RailRoute => Boolean(route));
}

export function buildComparisonPath(slugs: string[]): string {
  const unique = [...new Set(slugs)].filter(Boolean).slice(0, 2);
  return unique.length ? `/compare?routes=${unique.map(encodeURIComponent).join(",")}` : "/compare";
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} hr ${rest} min` : hours === 1 ? "1 hour" : `${hours} hours`;
}

export function formatReservation(status: ReservationStatus): string {
  return status === "required" ? "Required" : status === "recommended" ? "Recommended" : status === "not-required" ? "Not required" : "Check before travel";
}

export function getBestSideSummary(route: RailRoute): string {
  const sides = new Set<ViewSide>(route.bestSideSegments.flatMap((segment) => [segment.forwardDirectionSide, segment.reverseDirectionSide]));
  if (sides.size === 1 && sides.has("both")) return "Both sides throughout";
  if (sides.size === 1 && sides.has("varies")) return "Varies along the journey";
  if (sides.has("left") || sides.has("right")) return "Direction-specific, with variation by section";
  if (sides.has("both") && sides.has("varies")) return "Both sides, varying by section";
  return "Section-by-section guidance available";
}

export function formatExperienceTag(tag: string): string {
  return tag.split("-").map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(" ");
}
