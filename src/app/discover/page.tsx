import type { Metadata } from "next";
import Link from "next/link";
import { DiscoverRoutes, type DiscoverFilter } from "@/components/discover-routes";
import { JourneyCollections } from "@/components/journey-collections";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Discover rail journeys", description: "Explore Rallii's curated guides to extraordinary rail journeys." };
export default async function DiscoverPage({ searchParams }: { searchParams: Promise<{ filter?: string | string[] }> }) { const routes = getAllRoutes(); const value = (await searchParams).filter; const candidate = typeof value === "string" ? value : undefined; const validFilters: DiscoverFilter[] = ["all", "switzerland", "italy", "ireland", "northern-ireland", "united-kingdom", "norway", "portugal", "canada", "new-zealand", "japan", "cross-border"]; const filter: DiscoverFilter = validFilters.includes(candidate as DiscoverFilter) ? candidate as DiscoverFilter : "all"; return <AppScreenShell title="Discover" context="Browse prepared journeys by place and landscape."><Link className="app-search-shortcut focus-ring" href="/search">Search routes, places, and landmarks <span>⌕</span></Link><DiscoverRoutes routes={routes} initialFilter={filter} /><JourneyCollections routes={routes} /></AppScreenShell>; }
