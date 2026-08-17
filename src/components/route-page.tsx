"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { JourneyActions } from "@/components/journey-actions";
import { RouteCard } from "@/components/route-card";
import { RouteExperience } from "@/components/route-experience";
import { SiteHeader } from "@/components/site-header";
import { RouteMedia } from "@/components/route-media";
import type { JourneyDirection, RailRoute } from "@/types/route";
import { getDirectionalEndpoints, parseJourneyDirection } from "@/lib/route-direction";
import { getCollectionsForRoute } from "@/data/journey-collections";
import { buildComparePath } from "@/data/route-relationships";
import { routePlanningHref, routeStaysHref } from "@/data/partner-placements";
import { RouteIntelligence } from "@/components/route-intelligence";
import { getOperationalInformation } from "@/data/operational-information";

const directionChangeEvent = "rallii:direction-change";

export function RoutePage({ route, nextRoutes }: { route: RailRoute; nextRoutes: Array<{ route: RailRoute; reason: string }> }) {
  const { summary } = route;
  const direction = useSyncExternalStore<JourneyDirection>(subscribeToDirection, getDirectionSnapshot, () => "forward");
  const endpoints = getDirectionalEndpoints(route, direction);
  const collections = getCollectionsForRoute(summary.slug);
  const [surface, setSurface] = useState("overview");

  function toggleDirection() {
    const nextDirection = direction === "forward" ? "reverse" : "forward";
    const url = new URL(window.location.href);
    if (nextDirection === "reverse") url.searchParams.set("direction", "reverse");
    else url.searchParams.delete("direction");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(directionChangeEvent));
  }
  return <><SiteHeader /><div className="journey-app-bar"><Link href="/discover">← Discover</Link><span>{summary.name}</span><small>{endpoints.origin} → {endpoints.destination}</small><Link className="journey-app-bar__saved" href="/saved">Saved</Link></div><main><article>
    <header className={`site-shell scroll-section py-10 sm:py-16 journey-surface${surface === "overview" ? " journey-surface--active" : ""}`} id="overview">
      <div className="route-hero-grid">
        <div className="route-hero-identity"><p className="eyebrow">{summary.country}</p><h1 className="mt-4 font-serif text-5xl leading-none tracking-tight sm:text-7xl">{summary.name}</h1><p className="mt-4 font-serif text-2xl text-stone-600 sm:text-3xl">{endpoints.origin} → {endpoints.destination}</p><button className="direction-button focus-ring mt-5" type="button" aria-pressed={direction === "reverse"} aria-label={`Change journey direction to ${endpoints.destination} to ${endpoints.origin}`} onClick={toggleDirection}>Travel {endpoints.destination} → {endpoints.origin}</button></div>
        <RouteMedia summary={summary} variant="hero" />
        <div className="route-hero-summary"><dl className="route-essential-facts grid grid-cols-2 border-y border-stone-300"><Essential label="Duration" value={summary.durationLabel ?? formatDuration(summary.durationMinutes)} /><Essential label="Distance" value={`${summary.distanceKm} km`} /><Essential label="Train" value={summary.trainType} /><Essential label="Reservation" value={formatReservation(summary.reservationStatus)} /></dl><p className="mt-6 max-w-xl text-base leading-7 text-stone-600">{summary.shortDescription}</p><JourneyActions routeName={summary.name} routeSlug={summary.slug} rideModeAvailable={route.capabilities.rideMode} direction={direction} /></div>
      </div>
    </header>
    <nav className="route-section-nav" aria-label="Journey workspace">{[{id:"overview",label:"Overview"},{id:"best-side",label:"Best Side"},{id:"map",label:"Map"},{id:"timeline",label:"Timeline"},{id:"practical",label:"Practical"}].map((item)=><button key={item.id} type="button" aria-pressed={surface===item.id} onClick={()=>setSurface(item.id)}>{item.label}</button>)}</nav>
    <div className="site-shell pb-28 sm:pb-28">
      <RouteExperience route={route} direction={direction} activeSurface={surface} />
      <RouteIntelligence route={route} />
      <section className={`section-space border-t border-stone-300 pt-14 sm:pt-20 journey-surface${surface === "overview" ? " journey-surface--active" : ""}`} aria-labelledby="expect-title"><p className="eyebrow">Journey overview</p><h2 id="expect-title" className="mt-2 font-serif text-4xl sm:text-5xl">What to Expect</h2><dl className="mt-9 grid gap-px bg-stone-300 sm:grid-cols-3"><OverviewItem term="Reservations" detail={`${formatReservation(summary.reservationStatus)} for this journey.`} /><OverviewItem term="Train" detail={summary.trainType} /><OverviewItem term="Operated by" detail={summary.operator} /></dl></section>
      <section className={`section-space scroll-section journey-surface${surface === "practical" ? " journey-surface--active" : ""}`} id="practical" aria-labelledby="practical-title"><p className="eyebrow">Plan the journey</p><h2 id="practical-title" className="mt-2 font-serif text-4xl sm:text-5xl">Practical Information</h2><dl className="mt-8 grid gap-px bg-stone-300 sm:grid-cols-2">{getOperationalInformation(route).map((item) => <OverviewItem key={item.id} term={item.label} detail={item.detail} note={item.status === "changeable" ? "Check current operator information" : undefined} />)}</dl><div className="mt-7 flex flex-wrap gap-3"><Link className="cta-button" href={routePlanningHref(summary.slug)}>Plan this journey</Link><Link className="action-button" href={routeStaysHref(summary.slug)}>Find stays</Link></div></section>
      {nextRoutes.length ? <section className="section-space route-connections" aria-labelledby="continue-title"><div className="section-heading"><div><p className="eyebrow">Continue the story</p><h2 id="continue-title" className="mt-2 font-serif text-4xl sm:text-5xl">Related journeys</h2></div><Link className="secondary-link focus-ring" href="/discover">Browse all journeys →</Link></div><div className="mt-8 grid gap-7 lg:grid-cols-2">{nextRoutes.map((item) => <RouteCard key={item.route.summary.slug} route={item.route} relationshipReason={item.reason} variant="compact" />)}</div><div className="connection-links"><div><p className="eyebrow">Keep exploring</p><div className="mt-3 flex flex-wrap gap-2">{collections.map((collection) => <Link className="context-link focus-ring" key={collection.slug} href={`/discover/${collection.slug}`}>{collection.title}</Link>)}<Link className="context-link focus-ring" href={`/discover?filter=${getDiscoverFilter(route)}`}>{summary.slug === "belfast-derry" ? "Northern Ireland" : summary.country} journeys</Link><Link className="context-link focus-ring" href={`/search?q=${encodeURIComponent(summary.experienceTags[0])}`}>More {summary.experienceTags[0]} journeys</Link></div></div><Link className="cta-button focus-ring" href={buildComparePath(summary.slug, nextRoutes[0]?.route.summary.slug)}>Compare with {nextRoutes[0]?.route.summary.name}</Link></div></section> : null}
      <section className="section-space border-t border-stone-300 pt-10" aria-labelledby="sources-title"><h2 id="sources-title" className="text-sm font-semibold">Route & data sources</h2><ul className="mt-4 grid gap-4 text-xs leading-5 text-stone-600 sm:grid-cols-3">{route.sources.map((source) => <li key={source.id}><span className="block uppercase tracking-[0.12em] text-stone-500">{source.category === "railway-map" ? "Railway / map data" : source.category === "operator" ? "Operator information" : source.category === "infrastructure" ? "Infrastructure information" : source.category === "tourism" ? "Scenic context" : "Rallii guidance"}</span>{source.url ? <a className="mt-1 inline-block underline decoration-stone-400 underline-offset-4" href={source.url} rel="noreferrer" target="_blank">{source.label}</a> : <span className="mt-1 block font-medium">{source.label}</span>}<p className="mt-1">{source.note}</p></li>)}</ul></section>
    </div>
  </article></main></>;
}

function subscribeToDirection(onStoreChange: () => void): () => void {
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(directionChangeEvent, onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(directionChangeEvent, onStoreChange);
  };
}

function getDirectionSnapshot(): JourneyDirection {
  return parseJourneyDirection(new URLSearchParams(window.location.search).get("direction"));
}

function Essential({ label, value }: { label: string; value: string }) { return <div className="min-h-24 border-stone-300 px-3 py-5 even:border-l sm:min-h-28 sm:border-l sm:first:border-l-0 sm:px-5"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-stone-500">{label}</dt><dd className="mt-2 text-sm font-semibold sm:text-base">{value}</dd></div>; }
function OverviewItem({ term, detail, note }: { term: string; detail: string; note?: string }) { return <div className="bg-page p-6 sm:p-8"><dt className="text-xs uppercase tracking-[0.16em] text-stone-500">{term}</dt><dd className="mt-3 text-sm leading-6 text-stone-700">{detail}{note ? <small className="operational-note">{note}</small> : null}</dd></div>; }
function formatReservation(status: string): string { return status === "required" ? "Required" : status === "not-required" ? "Not required" : status === "recommended" ? "Recommended" : "Check before travel"; }
function formatDuration(minutes: number): string { const hours = Math.floor(minutes / 60); const rest = minutes % 60; return rest ? `${hours} hr ${rest} min` : hours === 1 ? "1 hour" : `${hours} hours`; }
function getDiscoverFilter(route: RailRoute): string { if (route.summary.slug === "belfast-derry") return "northern-ireland"; if (route.summary.countries.includes("United Kingdom")) return "united-kingdom"; return route.summary.countries[0].toLowerCase().replaceAll(" ", "-"); }
