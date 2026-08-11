"use client";
import { useState } from "react";
import { RouteCard } from "@/components/route-card";
import type { RailRoute } from "@/types/route";
const filters = ["all", "switzerland", "united-kingdom", "cross-border"] as const;
type Filter = (typeof filters)[number];
export function filterRoutes(routes: RailRoute[], filter: Filter): RailRoute[] { if (filter === "all") return routes; if (filter === "switzerland") return routes.filter((route) => route.summary.countries.length === 1 && route.summary.countries[0] === "Switzerland"); if (filter === "united-kingdom") return routes.filter((route) => route.summary.countries.includes("United Kingdom")); return routes.filter((route) => route.summary.journeyTypes.includes(filter)); }
export function DiscoverRoutes({ routes }: { routes: RailRoute[] }) { const [filter, setFilter] = useState<Filter>("all"); const visible = filterRoutes(routes, filter); return <><div className="mt-8 flex flex-wrap gap-2" aria-label="Filter journeys">{filters.map((item) => <button className={`filter-button${filter === item ? " filter-button--active" : ""}`} key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item === "all" ? "All" : item === "cross-border" ? "Cross-border" : item === "united-kingdom" ? "United Kingdom" : "Switzerland"}</button>)}</div><div className="mt-8 grid gap-7 lg:grid-cols-2">{visible.map((route) => <RouteCard key={route.summary.slug} route={route} />)}</div></>; }
