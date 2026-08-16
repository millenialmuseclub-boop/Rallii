import type { Metadata } from "next";
import { SearchRoutes } from "@/components/search-routes";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Search journeys", description: "Find a Rallii journey, place, landmark, or railway." };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const value = (await searchParams).q;
  return <AppScreenShell title="Search" context="Find a journey, place, landmark, or railway." backHref="/discover" backLabel="Discover"><SearchRoutes routes={getAllRoutes()} initialQuery={typeof value === "string" ? value : ""} /></AppScreenShell>;
}
