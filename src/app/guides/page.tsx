import type { Metadata } from "next";
import { AppScreenShell } from "@/components/app-screen-shell";
import { JourneyGuides } from "@/components/journey-guides";
import { journeyGuides } from "@/data/journey-guides";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Journey Guides", description: "Curated multi-journey rail ideas built from Rallii’s prepared route guides." };

export default function GuidesPage() {
  return <AppScreenShell title="Journey Guides" context="Curated ways to connect a few remarkable rail journeys into one bigger travel idea." backHref="/" backLabel="Home" mediaKey="collections"><JourneyGuides guides={journeyGuides} routes={getAllRoutes()} /></AppScreenShell>;
}
