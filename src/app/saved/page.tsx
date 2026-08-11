import type { Metadata } from "next";
import { SavedRoutesList } from "@/components/saved-routes-list";
import { SiteHeader } from "@/components/site-header";
import { getAllRoutes } from "@/data/routes";
export const metadata: Metadata = { title: "Saved journeys", description: "Journeys you want to come back to." };
export default function SavedPage() { return <><SiteHeader /><main className="site-shell py-14 sm:py-20"><p className="eyebrow">Your shortlist</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">Saved</h1><p className="mt-5 text-base leading-7 text-stone-600">Journeys you want to come back to.</p><SavedRoutesList routes={getAllRoutes()} /></main></>; }
