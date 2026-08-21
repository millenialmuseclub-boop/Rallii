import type { Metadata } from "next";
import { CompareJourneys } from "@/components/compare-journeys";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Compare Rail Journeys", description: "Compare the experience, landscapes, duration, and practical character of Rallii rail journeys." };
export default function ComparePage() { const routes = getAllRoutes(); return <AppScreenShell title="Compare" context="See two journey experiences side by side." backHref="/discover" backLabel="Discover" mediaKey="compare"><CompareJourneys routes={routes} /></AppScreenShell>; }
