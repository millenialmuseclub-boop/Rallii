import type { Metadata } from "next";
import { AppScreenShell } from "@/components/app-screen-shell";
import { JourneyCollections } from "@/components/journey-collections";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = {
  title: "Journey collections",
  description: "Browse Rallii rail journeys by landscape, pace, and journey character.",
};

export default function CollectionsPage() {
  return <AppScreenShell title="Journey Collections" context="Browse the worldwide rail catalogue by landscape, pace, and journey character." backHref="/discover" backLabel="Discover"><JourneyCollections routes={getAllRoutes()} /></AppScreenShell>;
}
