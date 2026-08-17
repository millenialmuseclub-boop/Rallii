import type { Metadata } from "next";
import { DiscoverRoutes, type DiscoverFilter } from "@/components/discover-routes";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Discover rail journeys", description: "Explore Rallii's curated guides to extraordinary rail journeys." };

export default async function DiscoverPage({ searchParams }: { searchParams: Promise<{ filter?: string | string[] }> }) {
  const routes = getAllRoutes();
  const value = (await searchParams).filter;
  const candidate = typeof value === "string" ? value : undefined;
  const filter: DiscoverFilter = candidate || "all";
  return <AppScreenShell title="Discover" context="Find a prepared journey by landscape, place, or length.">
    <DiscoverRoutes routes={routes} initialFilter={filter} />
  </AppScreenShell>;
}
