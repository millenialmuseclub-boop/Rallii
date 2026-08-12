"use client";

import Link from "next/link";
import { RouteCard } from "@/components/route-card";
import { useSavedRoutes } from "@/hooks/use-saved-routes";
import type { RailRoute } from "@/types/route";

export function SavedRoutesList({ routes }: { routes: RailRoute[] }) {
  const { slugs } = useSavedRoutes();
  const saved = routes.filter((route) => slugs.includes(route.summary.slug));
  if (!saved.length) return <section className="empty-state mt-12"><p className="eyebrow">Your shortlist</p><h2 className="mt-2 font-serif text-3xl">No saved journeys yet</h2><p className="mt-3 text-stone-600">Save a journey and it will appear here.</p><Link className="primary-link focus-ring mt-7" href="/discover">Explore journeys <span aria-hidden="true">→</span></Link></section>;
  return <div className="mt-10 grid gap-7 lg:grid-cols-2">{saved.map((route) => <RouteCard key={route.summary.slug} route={route} />)}</div>;
}
