import type { Metadata } from "next";
import { SearchRoutes } from "@/components/search-routes";
import { SiteHeader } from "@/components/site-header";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Search journeys", description: "Find a Rallii journey, place, landmark, or railway." };

export default function SearchPage() {
  return <><SiteHeader /><main className="site-shell page-intro"><p className="eyebrow">Curated route library</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">Search</h1><p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">Find a journey, place, landmark, or railway.</p><SearchRoutes routes={getAllRoutes()} /></main></>;
}
