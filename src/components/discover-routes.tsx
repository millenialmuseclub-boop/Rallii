"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { RouteCard } from "@/components/route-card";
import { JourneyCollections } from "@/components/journey-collections";
import { journeyGuides } from "@/data/journey-guides";
import { catalogueExperiences, catalogueRegions, routesInRegion } from "@/data/catalogue-taxonomy";
import { searchRoutes } from "@/lib/route-search";
import { useTravelLibrary } from "@/hooks/use-travel-library";
import type { RailRoute } from "@/types/route";

const countryAliases: Record<string, string> = { "northern-ireland": "Northern Ireland", "united-kingdom": "United Kingdom", "united-states": "United States", "new-zealand": "New Zealand" };
const durationFilters = [
  { id: "quick", label: "Under 90 min", matches: (route: RailRoute) => route.summary.durationMinutes < 90 },
  { id: "day", label: "A day", matches: (route: RailRoute) => route.summary.durationMinutes >= 90 && route.summary.durationMinutes < 720 },
  { id: "multi-day", label: "Multi-day", matches: (route: RailRoute) => route.summary.durationMinutes >= 720 },
] as const;
export type DiscoverFilter = string;

export function filterRoutes(routes: RailRoute[], filter: DiscoverFilter): RailRoute[] {
  if (filter === "all") return routes;
  if (filter === "northern-ireland") return routes.filter((route) => route.summary.slug === "belfast-derry");
  if (filter === "cross-border") return routes.filter((route) => route.summary.journeyTypes.includes("cross-border"));
  if (catalogueRegions.some((region) => region.id === filter)) return routesInRegion(routes, filter);
  const duration = durationFilters.find((item) => item.id === filter);
  if (duration) return routes.filter(duration.matches);
  const country = countryAliases[filter] ?? titleCase(filter);
  return routes.filter((route) => route.summary.countries.includes(country) || route.summary.journeyTypes.includes(filter as RailRoute["summary"]["journeyTypes"][number]) || route.summary.experienceTags.includes(filter as RailRoute["summary"]["experienceTags"][number]));
}

export function DiscoverRoutes({ routes, initialFilter = "all" }: { routes: RailRoute[]; initialFilter?: DiscoverFilter }) {
  const router = useRouter();
  const [filter, setFilter] = useState<DiscoverFilter>(initialFilter);
  const [group, setGroup] = useState<"regions" | "experiences" | "duration" | "collections">("regions");
  const [visibleCount, setVisibleCount] = useState(8);
  const [query, setQuery] = useState("");
  const { statuses } = useTravelLibrary();
  useEffect(() => {
    const filterFromUrl = new URLSearchParams(window.location.search).get("filter");
    const timeout = filterFromUrl ? window.setTimeout(() => setFilter(filterFromUrl), 0) : undefined;
    return () => { if (timeout) window.clearTimeout(timeout); };
  }, []);
  const savedCount = Object.values(statuses).filter(Boolean).length;
  const filtered = useMemo(() => filterRoutes(routes, filter), [routes, filter]);
  const matches = useMemo(() => query.trim() ? searchRoutes(filtered, query).map((result) => result.route) : filtered, [filtered, query]);
  function chooseFilter(item: DiscoverFilter) { setFilter(item); setVisibleCount(8); router.replace(item === "all" ? "/discover" : `/discover?filter=${item}`, { scroll: false }); }
  const options = group === "regions" ? catalogueRegions : group === "experiences" ? catalogueExperiences : durationFilters;
  const showingCollections = group === "collections";
  return <section className="discover-catalogue" aria-labelledby="all-journeys-title">
    <div className="screen-section-heading"><div><p className="eyebrow">World rail catalogue</p><h2 id="all-journeys-title">Find your next journey</h2></div><span>{matches.length} {matches.length === 1 ? "route" : "routes"}</span></div>
    <label className="discover-search"><span className="sr-only">Search the rail catalogue</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(8); }} placeholder="Search routes, cities, countries, operators…" /></label>
    <div className="discover-continuity"><span>{savedCount ? `${savedCount} saved ${savedCount === 1 ? "journey" : "journeys"} on this device` : "Save a journey to continue planning later"}</span><span><Link className="text-link focus-ring" href="/guides">{journeyGuides.length} trip guides</Link><Link className="text-link focus-ring" href={savedCount ? "/saved" : "/discover"}>{savedCount ? "Open saved" : "Keep exploring"}</Link></span></div>
    <div className="catalogue-groups" role="tablist" aria-label="Browse journeys"><button type="button" role="tab" aria-selected={group === "regions"} onClick={() => { setGroup("regions"); setVisibleCount(8); }}>Region</button><button type="button" role="tab" aria-selected={group === "experiences"} onClick={() => { setGroup("experiences"); setVisibleCount(8); }}>Experience</button><button type="button" role="tab" aria-selected={group === "duration"} onClick={() => { setGroup("duration"); setVisibleCount(8); }}>Duration</button><button type="button" role="tab" aria-selected={showingCollections} onClick={() => setGroup("collections")}>Collections</button></div>
    {showingCollections ? <JourneyCollections routes={routes} limit={5} compact /> : <>
      <div className="discover-filter-heading"><p>Browse by {group === "regions" ? "world region" : group === "experiences" ? "journey character" : "available time"}</p>{filter !== "all" ? <button className="text-link" type="button" onClick={() => chooseFilter("all")}>Show all</button> : null}</div>
      <div className="discover-filters" aria-label="Filter journeys"><button className={`filter-button${filter === "all" ? " filter-button--active" : ""}`} type="button" aria-pressed={filter === "all"} onClick={() => chooseFilter("all")}>All</button>{options.map((item) => <button className={`filter-button${filter === item.id ? " filter-button--active" : ""}`} key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => chooseFilter(item.id)}>{item.label}</button>)}</div>
      <div className="compact-route-grid">{matches.slice(0, visibleCount).map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" />)}</div>
      {matches.length > visibleCount ? <button className="action-button catalogue-more" type="button" onClick={() => setVisibleCount((count) => count + 8)}>Show 8 more journeys</button> : null}
      {!matches.length ? <div className="empty-state"><h3>No journeys found</h3><p>Try a route, country, city, station, operator, landscape, or journey type.</p></div> : null}
    </>}
  </section>;
}

function titleCase(value: string): string { return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "); }
