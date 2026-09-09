import type { Course } from "@/green/types/course";

export const courseRegions = ["Pacific & Hawaii", "Desert & Inland", "Atlantic America", "Scotland", "Ireland", "England & Wales", "Continental Europe", "Asia Pacific", "Africa"] as const;
export type CourseRegion = (typeof courseRegions)[number];

export function courseRegionFor(course: Course): CourseRegion {
  const country = course.location.country;
  if (country === "Mexico") return "Desert & Inland";
  if (["United States", "USA"].includes(country)) {
    if (["California", "Oregon", "Washington", "Hawaii"].includes(course.location.state ?? "")) return "Pacific & Hawaii";
    if (["Arizona", "Nevada", "Wisconsin"].includes(course.location.state ?? "")) return "Desert & Inland";
    return "Atlantic America";
  }
  if (country === "Scotland") return "Scotland";
  if (["Ireland", "Northern Ireland"].includes(country)) return "Ireland";
  if (["England", "Wales", "United Kingdom"].includes(country)) return "England & Wales";
  if (["Australia", "New Zealand", "Japan", "South Korea"].includes(country)) return "Asia Pacific";
  if (country === "South Africa") return "Africa";
  return "Continental Europe";
}
