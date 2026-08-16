"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { RouteCard } from "@/components/route-card";
import type { RailRoute } from "@/types/route";

const countryAliases: Record<string, string> = { "northern-ireland": "Northern Ireland", "united-kingdom": "United Kingdom", "united-states": "United States", "new-zealand": "New Zealand" };
const durationFilters = [
  { id: "quick", label: "Under 90 min", matches: (route: RailRoute) => route.summary.durationMinutes < 90 },
  { id: "day", label: "A day", matches: (route: RailRoute) => route.summary.durationMinutes >= 90 && route.summary.durationMinutes < 720 },
  { id: "multi-day", label: "Multi-day", matches: (route: RailRoute) => route.summary.durationMinutes >= 720 },
] as const;
const landscapeFilters = ["mountain", "coastal", "multi-day", "scenic"] as const;
export type DiscoverFilter = string;

export function isDiscoverFilter(value: string | undefined): value is DiscoverFilter { return Boolean(value); }
export function filterRoutes(routes: RailRoute[], filter: DiscoverFilter): RailRoute[] {
  if (filter === "all") return routes;
  if (filter === "northern-ireland") return routes.filter((route) => route.summary.slug === "belfast-derry");
  if (filter === "cross-border") return routes.filter((route) => route.summary.journeyTypes.includes("cross-border"));
  const duration = durationFilters.find((item) => item.id === filter);
  if (duration) return routes.filter(duration.matches);
  const country = countryAliases[filter] ?? titleCase(filter);
  return routes.filter((route) => route.summary.countries.includes(country) || route.summary.journeyTypes.includes(filter as RailRoute["summary"]["journeyTypes"][number]) || route.summary.experienceTags.includes(filter as RailRoute["summary"]["experienceTags"][number]));
}

export function DiscoverRoutes({ routes, initialFilter = "all" }: { routes: RailRoute[]; initialFilter?: DiscoverFilter }) {
  const router = useRouter();
  const [filter, setFilter] = useState<DiscoverFilter>(initialFilter);
  const [group, setGroup] = useState<"places" | "landscapes" | "duration">("places");
  const [showAll, setShowAll] = useState(false);
  const countries = useMemo(() => [...new Set(routes.flatMap((route) => route.summary.countries))].sort(), [routes]);
  const visible = filterRoutes(routes, filter);
  function chooseFilter(item: DiscoverFilter) { setFilter(item); setShowAll(false); router.replace(item === "all" ? "/discover" : `/discover?filter=${item}`, { scroll: false }); }
  const options = group === "places" ? countries.map((country) => ({ id: country.toLowerCase().replaceAll(" ", "-"), label: country })) : group === "landscapes" ? landscapeFilters.map((item) => ({ id: item, label: titleCase(item) })) : durationFilters;
  return <section className="discover-catalogue" aria-labelledby="all-journeys-title">
    <div className="screen-section-heading"><div><p className="eyebrow">World rail catalogue</p><h2 id="all-journeys-title">Find your next journey</h2></div><span>{visible.length} {visible.length === 1 ? "route" : "routes"}</span></div>
    <div className="catalogue-groups" role="tablist" aria-label="Browse journeys"><button type="button" role="tab" aria-selected={group === "places"} onClick={() => { setGroup("places"); setShowAll(false); }}>Place</button><button type="button" role="tab" aria-selected={group === "landscapes"} onClick={() => { setGroup("landscapes"); setShowAll(false); }}>Landscape</button><button type="button" role="tab" aria-selected={group === "duration"} onClick={() => { setGroup("duration"); setShowAll(false); }}>Time</button></div>
    <div className="discover-filter-heading"><p>Browse by {group === "places" ? "country" : group === "landscapes" ? "journey character" : "available time"}</p>{filter !== "all" ? <button className="text-link" type="button" onClick={() => chooseFilter("all")}>Show all</button> : null}</div>
    <div className="discover-filters" aria-label="Filter journeys"><button className={`filter-button${filter === "all" ? " filter-button--active" : ""}`} type="button" aria-pressed={filter === "all"} onClick={() => chooseFilter("all")}>All</button>{options.map((item) => <button className={`filter-button${filter === item.id ? " filter-button--active" : ""}`} key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => chooseFilter(item.id)}>{item.label}</button>)}</div>
    <div className="compact-route-grid">{(showAll ? visible : visible.slice(0, 8)).map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" />)}</div>
    {visible.length > 8 && !showAll ? <button className="action-button catalogue-more" type="button" onClick={() => setShowAll(true)}>Show all {visible.length} journeys</button> : null}
  </section>;
}

function titleCase(value: string): string { return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "); }
