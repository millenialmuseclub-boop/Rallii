import type { Metadata } from "next";
import { DiscoverRoutes } from "@/components/discover-routes";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Discover rail journeys", description: "Explore Rallii's curated guides to extraordinary rail journeys." };

export default function DiscoverPage() {
  const routes = getAllRoutes();
  return <AppScreenShell title="Discover" context="Find a prepared journey by landscape, place, or length." mediaKey="discover">
    <DiscoverRoutes routes={routes} />
  </AppScreenShell>;
}
