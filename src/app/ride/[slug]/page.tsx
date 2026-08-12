import type { Metadata } from "next";
import Link from "next/link";
import { RideMode } from "@/components/ride-mode";
import { SiteHeader } from "@/components/site-header";
import { getRouteBySlug } from "@/data/routes";

export const metadata: Metadata = { title: "Ride Mode", description: "Follow your approximate progress and see what’s coming along a Rallii journey." };
export default async function RidePage({ params }: { params: Promise<{ slug: string }> }) { const route = getRouteBySlug((await params).slug); if (!route || !route.capabilities.rideMode) return <><SiteHeader /><main className="site-shell py-14 pb-28 sm:py-20"><p className="eyebrow">Ride Mode</p><h1 className="mt-3 max-w-3xl font-serif text-5xl sm:text-7xl">Ride Mode isn’t available for this journey yet.</h1><Link className="primary-link mt-8" href={route ? `/routes/${route.summary.slug}` : "/discover"}>{route ? "View journey" : "Explore journeys"} →</Link></main></>; return <><SiteHeader /><main className="site-shell py-10 pb-28 sm:py-16"><p className="eyebrow">{route.summary.country}</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">{route.summary.name}</h1><p className="mt-3 font-serif text-2xl text-stone-600">{route.summary.origin} → {route.summary.destination}</p><div className="mt-10"><RideMode route={route} /></div></main></>; }
