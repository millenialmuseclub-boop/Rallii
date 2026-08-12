"use client";
import Link from "next/link";
import { useState } from "react";
import { PersonalRailMap } from "@/components/personal-rail-map";
import { RouteCard } from "@/components/route-card";
import { useTravelLibrary } from "@/hooks/use-travel-library";
import { getBeenRoutes, getLibrarySummary, getWantToGoRoutes } from "@/lib/travel-library-summary";
import type { RailRoute } from "@/types/route";

type LibrarySurface = "want" | "been" | "map";

export function TravelLibrary({ routes }: { routes: RailRoute[] }) {
  const { statuses } = useTravelLibrary();
  const [surface, setSurface] = useState<LibrarySurface>("want");
  const wantToGo = getWantToGoRoutes(routes, statuses);
  const been = getBeenRoutes(routes, statuses);
  const summary = getLibrarySummary(been);
  const tabs = [{ id: "want" as const, label: "Want to Go", count: wantToGo.length }, { id: "been" as const, label: "Been", count: been.length }, { id: "map" as const, label: "Rail Map", count: been.length }];
  return <section className="rail-library" aria-labelledby="rail-library-title"><div className="screen-section-heading"><div><p className="eyebrow">Private on this device</p><h2 id="rail-library-title">Saved rail journeys</h2></div>{wantToGo.length + been.length >= 2 ? <Link className="text-link focus-ring" href="/compare">Compare</Link> : null}</div><div className="library-tabs" role="tablist" aria-label="Saved rail journey views">{tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={surface === tab.id} onClick={() => setSurface(tab.id)}>{tab.label}<span>{tab.count}</span></button>)}</div><div className="library-panel" role="tabpanel">{surface === "want" ? <LibraryList routes={wantToGo} emptyTitle="No journeys saved yet" emptyCopy="Find a route you want to experience and keep it here." /> : null}{surface === "been" ? <LibraryList routes={been} emptyTitle="No completed journeys yet" emptyCopy="Mark a route Been after you travel it." /> : null}{surface === "map" ? been.length ? <><dl className="library-summary"><Summary term="Journeys" value={`${summary.journeyCount}`} /><Summary term="Countries" value={`${summary.countryCount}`} /><Summary term="Rail distance" value={`${formatDistance(summary.distanceKm)} km`} /></dl><PersonalRailMap routes={been} /></> : <Empty title="Your rail map will appear here" copy="Routes marked Been create your private rail map." /> : null}</div></section>;
}

function LibraryList({ routes, emptyTitle, emptyCopy }: { routes: RailRoute[]; emptyTitle: string; emptyCopy: string }) { return routes.length ? <div className="compact-route-grid">{routes.map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" />)}</div> : <Empty title={emptyTitle} copy={emptyCopy} />; }
function Empty({ title, copy }: { title: string; copy: string }) { return <div className="empty-state"><h3>{title}</h3><p>{copy}</p><div className="empty-actions"><Link className="cta-button focus-ring" href="/discover">Discover journeys</Link><Link className="text-link focus-ring" href="/search">Search</Link></div></div>; }
function Summary({ term, value }: { term: string; value: string }) { return <div><dt>{term}</dt><dd>{value}</dd></div>; }
function formatDistance(value: number): string { return new Intl.NumberFormat("en", { maximumFractionDigits: value % 1 ? 1 : 0 }).format(value); }
