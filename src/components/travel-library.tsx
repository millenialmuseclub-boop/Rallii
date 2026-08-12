"use client";
import Link from "next/link";
import { PersonalRailMap } from "@/components/personal-rail-map";
import { RouteCard } from "@/components/route-card";
import { useTravelLibrary } from "@/hooks/use-travel-library";
import { getBeenRoutes, getLibrarySummary, getWantToGoRoutes } from "@/lib/travel-library-summary";
import type { RailRoute } from "@/types/route";

export function TravelLibrary({ routes }: { routes: RailRoute[] }) { const { statuses } = useTravelLibrary(); const wantToGo = getWantToGoRoutes(routes, statuses); const been = getBeenRoutes(routes, statuses); const summary = getLibrarySummary(been); const allLibrary = [...wantToGo, ...been]; return <>
  {allLibrary.length >= 2 ? <Link className="primary-link mt-8" href="/compare">Compare journeys <span aria-hidden="true">→</span></Link> : null}
  <section className="library-map-section" aria-labelledby="rail-map-title"><p className="eyebrow">Private travel archive</p><h2 id="rail-map-title" className="mt-2 font-serif text-4xl sm:text-5xl">My Rail Map</h2>{been.length ? <><dl className="library-summary"><Summary term="Journeys" value={`${summary.journeyCount}`} /><Summary term="Countries" value={`${summary.countryCount}`} /><Summary term="Rail distance" value={`${formatDistance(summary.distanceKm)} km`} /></dl><PersonalRailMap routes={been} /></> : <div className="empty-state mt-8"><h3 className="font-serif text-3xl">Your rail map will appear here.</h3><p className="mt-3 text-stone-600">Mark a journey as Been to add its route.</p><Link className="primary-link mt-6" href="/discover">Explore journeys →</Link></div>}</section>
  <LibrarySection title="Want to Go" copy="Journeys you’re thinking about." routes={wantToGo} emptyTitle="Nothing here yet." emptyCopy="Save a journey you’d like to experience." />
  <LibrarySection title="Been" copy="Journeys you’ve experienced." routes={been} emptyTitle="No journeys marked Been yet." emptyCopy="Mark a route after you’ve traveled it." />
  </>; }
function Summary({ term, value }: { term: string; value: string }) { return <div><dt>{term}</dt><dd>{value}</dd></div>; }
function LibrarySection({ title, copy, routes, emptyTitle, emptyCopy }: { title: string; copy: string; routes: RailRoute[]; emptyTitle: string; emptyCopy: string }) { return <section className="section-space border-t border-stone-300 pt-12" aria-labelledby={`library-${title.replaceAll(" ", "-").toLowerCase()}`}><p className="eyebrow">Personal library</p><h2 id={`library-${title.replaceAll(" ", "-").toLowerCase()}`} className="mt-2 font-serif text-4xl sm:text-5xl">{title}</h2><p className="mt-3 text-stone-600">{copy}</p>{routes.length ? <div className="mt-8 grid gap-7 lg:grid-cols-2">{routes.map((route) => <div key={route.summary.slug}><p className="library-card-status">{title}</p><RouteCard route={route} /></div>)}</div> : <div className="empty-state mt-8"><h3 className="font-serif text-3xl">{emptyTitle}</h3><p className="mt-3 text-stone-600">{emptyCopy}</p><Link className="primary-link mt-6" href="/discover">Discover journeys →</Link></div>}</section>; }
function formatDistance(value: number): string { return new Intl.NumberFormat("en", { maximumFractionDigits: value % 1 ? 1 : 0 }).format(value); }
