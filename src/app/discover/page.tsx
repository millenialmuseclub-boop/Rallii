import type { Metadata } from "next";
import { DiscoverRoutes, type DiscoverFilter } from "@/components/discover-routes";
import { JourneyCollections } from "@/components/journey-collections";
import { SiteHeader } from "@/components/site-header";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Discover rail journeys", description: "Explore Rallii's curated guides to extraordinary rail journeys." };
export default async function DiscoverPage({ searchParams }: { searchParams: Promise<{ filter?: string | string[] }> }) { const routes = getAllRoutes(); const value = (await searchParams).filter; const candidate = typeof value === "string" ? value : undefined; const validFilters: DiscoverFilter[] = ["all", "switzerland", "italy", "ireland", "northern-ireland", "united-kingdom", "norway", "new-zealand", "japan", "cross-border"]; const filter: DiscoverFilter = validFilters.includes(candidate as DiscoverFilter) ? candidate as DiscoverFilter : "all"; return <><SiteHeader /><main className="site-shell py-14 pb-28 sm:py-20"><p className="eyebrow">Journey collection</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">Discover</h1><p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">Extraordinary rail journeys, curated around what you can see from the train.</p><DiscoverRoutes routes={routes} initialFilter={filter} /><JourneyCollections routes={routes} /></main></>; }
