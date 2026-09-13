import type { Metadata } from "next";
import { SearchRoutes } from "@/components/search-routes";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";
import { discoveryCatalogue } from "@/data/discovery-catalogue";
import { GlobalSearch } from "@/components/global-search";

export const metadata: Metadata = { title: "Search journeys", description: "Find a Rallii journey, place, landmark, or railway." };

export default function SearchPage() {
  return <AppScreenShell title="Search" context="Rail, Trail, MTB, Snow and Green." backHref="/" backLabel="Home" mediaKey="search"><GlobalSearch entries={discoveryCatalogue}/><h2>Rail landmarks & detailed journey search</h2><SearchRoutes routes={getAllRoutes()} /></AppScreenShell>;
}
