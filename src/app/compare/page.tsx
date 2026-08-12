import type { Metadata } from "next";
import { CompareJourneys } from "@/components/compare-journeys";
import { SiteHeader } from "@/components/site-header";
import { getAllRoutes } from "@/data/routes";
import { parseComparisonRoutes } from "@/lib/journey-comparison";

export const metadata: Metadata = { title: "Compare Rail Journeys", description: "Compare the experience, landscapes, duration, and practical character of Rallii rail journeys." };
export default async function ComparePage({ searchParams }: { searchParams: Promise<{ routes?: string | string[] }> }) { const routes = getAllRoutes(); const selected = parseComparisonRoutes((await searchParams).routes, routes); return <><SiteHeader /><main className="site-shell py-14 pb-28 sm:py-20"><p className="eyebrow">Choose by experience</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">Compare Journeys</h1><p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">See how Rallii journeys differ before deciding what belongs on your trip.</p><CompareJourneys routes={routes} selected={selected} /></main></>; }
