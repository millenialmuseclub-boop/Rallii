import type { Metadata } from "next";
import { TravelLibrary } from "@/components/travel-library";
import { SiteHeader } from "@/components/site-header";
import { getAllRoutes } from "@/data/routes";
export const metadata: Metadata = { title: "My Journeys", description: "Your private, browser-local rail journey library." };
export default function SavedPage() { return <><SiteHeader /><main className="site-shell py-14 pb-28 sm:py-20"><p className="eyebrow">Personal rail library</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">My Journeys</h1><p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">A quiet place for journeys you want to take and those you’ve experienced.</p><TravelLibrary routes={getAllRoutes()} /></main></>; }
