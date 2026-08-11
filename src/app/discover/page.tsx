import type { Metadata } from "next";
import { RouteCard } from "@/components/route-card";
import { SiteHeader } from "@/components/site-header";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Discover rail journeys", description: "Explore Rallii's curated guides to extraordinary rail journeys." };
export default function DiscoverPage() { const routes = getAllRoutes(); return <><SiteHeader /><main className="site-shell py-14 sm:py-20"><p className="eyebrow">Journey collection</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">Discover</h1><p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">Extraordinary rail journeys, curated around what you can see from the train.</p><div className="mt-10 grid gap-7 lg:grid-cols-2">{routes.map((route) => <RouteCard key={route.summary.slug} route={route} />)}</div></main></>; }
