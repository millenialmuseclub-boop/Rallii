"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RouteCard } from "@/components/route-card";
import type { RailRoute } from "@/types/route";
const filters = ["all", "switzerland", "italy", "ireland", "northern-ireland", "united-kingdom", "norway", "portugal", "canada", "united-states", "new-zealand", "japan", "cross-border"] as const;
export type DiscoverFilter = (typeof filters)[number];
export function isDiscoverFilter(value: string | undefined): value is DiscoverFilter { return filters.includes(value as DiscoverFilter); }
export function filterRoutes(routes: RailRoute[], filter: DiscoverFilter): RailRoute[] { if (filter === "all") return routes; if (filter === "cross-border") return routes.filter((route) => route.summary.journeyTypes.includes("cross-border")); if (filter === "northern-ireland") return routes.filter((route) => route.summary.slug === "belfast-derry"); const country = filter === "united-kingdom" ? "United Kingdom" : filter === "united-states" ? "United States" : filter === "new-zealand" ? "New Zealand" : filter.charAt(0).toUpperCase() + filter.slice(1); return routes.filter((route) => route.summary.countries.includes(country)); }
export function DiscoverRoutes({ routes, initialFilter = "all" }: { routes: RailRoute[]; initialFilter?: DiscoverFilter }) {
  const router = useRouter();
  const [filter, setFilter] = useState<DiscoverFilter>(initialFilter);
  const visible = filterRoutes(routes, filter);
  function chooseFilter(item: DiscoverFilter) { setFilter(item); router.replace(item === "all" ? "/discover" : `/discover?filter=${item}`, { scroll: false }); }
  return <section className="discover-catalogue" aria-labelledby="all-journeys-title">
    <div className="screen-section-heading"><div><p className="eyebrow">Complete catalogue</p><h2 id="all-journeys-title">All journeys</h2></div><span>{visible.length} {visible.length === 1 ? "route" : "routes"}</span></div>
    <div className="discover-filter-heading"><p>Filter by country or journey type</p>{filter !== "all" ? <button className="text-link" type="button" onClick={() => chooseFilter("all")}>Reset filters</button> : null}</div>
    <div className="discover-filters" aria-label="Filter journeys">{filters.map((item) => <button className={`filter-button${filter === item ? " filter-button--active" : ""}`} key={item} type="button" aria-pressed={filter === item} onClick={() => chooseFilter(item)}>{item === "all" ? "All" : item.split("-").map((part) => part.charAt(0).toUpperCase()+part.slice(1)).join(" ")}</button>)}</div>
    <div className="compact-route-grid">{visible.map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" />)}</div>
  </section>;
}
