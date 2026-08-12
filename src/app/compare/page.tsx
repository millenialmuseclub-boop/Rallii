import type { Metadata } from "next";
import { CompareJourneys } from "@/components/compare-journeys";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";
import { parseComparisonRoutes } from "@/lib/journey-comparison";

export const metadata: Metadata = { title: "Compare Rail Journeys", description: "Compare the experience, landscapes, duration, and practical character of Rallii rail journeys." };
export default async function ComparePage({ searchParams }: { searchParams: Promise<{ routes?: string | string[] }> }) { const routes = getAllRoutes(); const selected = parseComparisonRoutes((await searchParams).routes, routes); return <AppScreenShell title="Compare" context="See two journey experiences side by side." backHref="/discover" backLabel="Discover"><CompareJourneys routes={routes} selected={selected} /></AppScreenShell>; }
