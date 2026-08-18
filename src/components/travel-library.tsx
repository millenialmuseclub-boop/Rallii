"use client";
import Link from "next/link";
import { useState } from "react";
import { PersonalRailMap } from "@/components/personal-rail-map";
import { RouteCard } from "@/components/route-card";
import { useTravelLibrary } from "@/hooks/use-travel-library";
import { getLibrarySummary, getWantToGoRoutes } from "@/lib/travel-library-summary";
import type { RailRoute } from "@/types/route";

type LibrarySurface = "saved" | "map";

export function TravelLibrary({ routes }: { routes: RailRoute[] }) {
  const { statuses } = useTravelLibrary();
  const saved = getWantToGoRoutes(routes, statuses);
  const [surface, setSurface] = useState<LibrarySurface>("saved");
  const summary = getLibrarySummary(saved);
  const tabs = [{ id: "saved" as const, label: "Saved", count: saved.length }, { id: "map" as const, label: "Rail Map", count: saved.length }];
  return <section className="rail-library" aria-labelledby="rail-library-title"><div className="screen-section-heading"><div><p className="eyebrow">Private on this device</p><h2 id="rail-library-title">Saved rail journeys</h2></div>{saved.length >= 2 ? <Link className="text-link focus-ring" href="/compare">Compare</Link> : null}</div><div className="library-tabs" role="tablist" aria-label="Saved rail journey views">{tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={surface === tab.id} onClick={() => setSurface(tab.id)}>{tab.label}<span>{tab.count}</span></button>)}</div><div className="library-panel" role="tabpanel">{surface === "saved" ? <LibraryList routes={saved} emptyTitle="No journeys saved yet" emptyCopy="Find a route you want to experience and keep it here." /> : null}{surface === "map" ? saved.length ? <><dl className="library-summary"><Summary term="Journeys" value={`${summary.journeyCount}`} /><Summary term="Countries" value={`${summary.countryCount}`} /><Summary term="Rail distance" value={`${formatDistance(summary.distanceKm)} km`} /></dl><PersonalRailMap routes={saved} /></> : <Empty title="Your rail map will appear here" copy="Saved journeys create your private rail map." /> : null}</div></section>;
}

function LibraryList({ routes, emptyTitle, emptyCopy }: { routes: RailRoute[]; emptyTitle: string; emptyCopy: string }) { return routes.length ? <div className="compact-route-grid">{routes.map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" showStays />)}</div> : <Empty title={emptyTitle} copy={emptyCopy} />; }
function Empty({ title, copy }: { title: string; copy: string }) { return <div className="empty-state"><h3>{title}</h3><p>{copy}</p><div className="empty-actions"><Link className="cta-button focus-ring" href="/discover">Discover journeys</Link><Link className="text-link focus-ring" href="/search">Search</Link></div></div>; }
function Summary({ term, value }: { term: string; value: string }) { return <div><dt>{term}</dt><dd>{value}</dd></div>; }
function formatDistance(value: number): string { return new Intl.NumberFormat("en", { maximumFractionDigits: value % 1 ? 1 : 0 }).format(value); }
