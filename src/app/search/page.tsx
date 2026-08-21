import type { Metadata } from "next";
import { SearchRoutes } from "@/components/search-routes";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Search journeys", description: "Find a Rallii journey, place, landmark, or railway." };

export default function SearchPage() {
  return <AppScreenShell title="Search" context="Find a journey, place, landmark, or railway." backHref="/discover" backLabel="Discover" mediaKey="search"><SearchRoutes routes={getAllRoutes()} /></AppScreenShell>;
}
