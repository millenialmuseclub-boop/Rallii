import type { Metadata } from "next";
import Link from "next/link";
import { DiscoverRoutes, type DiscoverFilter } from "@/components/discover-routes";
import { JourneyCollections } from "@/components/journey-collections";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Discover rail journeys", description: "Explore Rallii's curated guides to extraordinary rail journeys." };

const validFilters: DiscoverFilter[] = ["all", "switzerland", "italy", "ireland", "northern-ireland", "united-kingdom", "norway", "portugal", "canada", "united-states", "new-zealand", "japan", "cross-border"];

export default async function DiscoverPage({ searchParams }: { searchParams: Promise<{ filter?: string | string[] }> }) {
  const routes = getAllRoutes();
  const value = (await searchParams).filter;
  const candidate = typeof value === "string" ? value : undefined;
  const filter: DiscoverFilter = validFilters.includes(candidate as DiscoverFilter) ? candidate as DiscoverFilter : "all";
  return <AppScreenShell title="Discover" context="Find a prepared journey by landscape, place, or length.">
    <div className="app-screen-actions"><Link className="app-search-shortcut focus-ring" href="/search">Search routes and landmarks <span>⌕</span></Link><Link className="text-link focus-ring" href="/plan">Open Plan Journey</Link></div>
    <JourneyCollections routes={routes} limit={5} />
    <DiscoverRoutes routes={routes} initialFilter={filter} />
  </AppScreenShell>;
}
