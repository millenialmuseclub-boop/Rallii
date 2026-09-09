"use client";

import { useSearchParams } from "next/navigation";
import { DiscoverCatalogue } from "@/green/components/discover-catalogue";
import { CompareCourses } from "@/green/components/compare-courses";
import { GreenPlanningPanel } from "@/green/components/green-planning-panel";
import { publishedCourses } from "@/green/data/courses";
import { getDestination, publishedDestinations } from "@/green/data/destinations";
import { publishedTrips } from "@/green/data/trips";
import type { Setting } from "@/green/types/course";

// Query state belongs in the browser so these routes also run from Capacitor's static bundle.
export function DiscoveryQuery() {
  const params = useSearchParams();
  const requested = params.get("setting");
  const settings: string[] = ["coastal", "links", "forest", "desert", "mountain", "parkland", "tropical"];
  const setting = requested && settings.includes(requested) ? requested as Setting : "all";
  return <DiscoverCatalogue key={setting} courses={publishedCourses} destinations={publishedDestinations} initialSetting={setting} />;
}

export function ComparisonQuery() {
  const params = useSearchParams();
  return <CompareCourses key={`${params.get("a")}:${params.get("b")}`} courses={publishedCourses} initialA={params.get("a") ?? undefined} initialB={params.get("b") ?? undefined} />;
}

export function PlanningQuery() {
  const params = useSearchParams();
  const trip = publishedTrips.find((item) => item.slug === params.get("trip"));
  const destination = getDestination(params.get("destination") ?? "");
  const requested = params.get("course") ?? trip?.stops[0]?.courseSlug ?? destination?.courseSlugs[0];
  const initial = publishedCourses.some((course) => course.slug === requested) ? requested : undefined;
  return <GreenPlanningPanel key={initial ?? "default"} courses={publishedCourses} initialCourseSlug={initial} />;
}
