import type { Metadata } from "next";
import { AppScreenShell } from "@/components/app-screen-shell";
import { TravelLibrary } from "@/components/travel-library";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Saved Journeys", description: "Your private Rallii journey library and rail map." };

export default function SavedPage() {
  return <AppScreenShell title="Saved" context="Your private journey library and rail map." backHref="/" backLabel="Home" mediaKey="saved"><TravelLibrary routes={getAllRoutes()} /></AppScreenShell>;
}
