"use client";

import Link from "next/link";
import { useState } from "react";
import { PartnerWidgetFrame } from "@/components/partner-widget-frame";
import { RouteMedia } from "@/components/route-media";
import { getPlanningLocations, isTravelpayoutsConfigured } from "@/data/partner-planning";
import type { RailRoute } from "@/types/route";

export function StayPlanner({ routes, initialRouteSlug }: { routes: RailRoute[]; initialRouteSlug?: string }) {
  const initialRoute = routes.find((route) => route.summary.slug === initialRouteSlug) ?? routes[0];
  const [routeSlug, setRouteSlug] = useState(initialRoute.summary.slug);
  const [locationId, setLocationId] = useState(getPlanningLocations(initialRoute)[0].id);
  const [open, setOpen] = useState(false);
  const route = routes.find((item) => item.summary.slug === routeSlug) ?? initialRoute;
  const locations = getPlanningLocations(route);
  const location = locations.find((item) => item.id === locationId) ?? locations[0];

  function selectRoute(nextSlug: string) {
    const nextRoute = routes.find((item) => item.summary.slug === nextSlug) ?? routes[0];
    setRouteSlug(nextRoute.summary.slug);
    setLocationId(getPlanningLocations(nextRoute)[0].id);
    setOpen(false);
  }

  return <section className="partner-plan" aria-labelledby="stay-planner-title">
    <div className="screen-section-heading"><div><p className="eyebrow">Stay near the journey</p><h2 id="stay-planner-title">Choose a useful rail base</h2></div></div>
    <label className="partner-plan__route-label" htmlFor="stay-route">Journey</label>
    <select id="stay-route" className="partner-plan__route-select focus-ring" value={routeSlug} onChange={(event) => selectRoute(event.target.value)}>{routes.map((item) => <option key={item.summary.slug} value={item.summary.slug}>{item.summary.name} — {item.summary.origin} to {item.summary.destination}</option>)}</select>
    <div className="planning-route-visual"><RouteMedia summary={route.summary} variant="card" /><div className="partner-plan__route-summary"><span>{route.summary.origin} → {route.summary.destination}</span><span>{route.summary.country}</span></div></div>
    <div className="partner-plan__section stay-planner__section"><h3>Main places along this journey</h3><p>Select a prepared departure, arrival, or genuine overnight stop.</p><div className="partner-plan__locations">{locations.map((item) => <button key={item.id} type="button" className="action-button focus-ring" aria-pressed={location.id === item.id} onClick={() => { setLocationId(item.id); setOpen(false); }}>{item.label}: {item.place}</button>)}</div>{isTravelpayoutsConfigured() ? <><button className="action-button action-button--primary focus-ring" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>Find places near {location.place}</button>{open ? <div className="partner-inline-widget" aria-live="polite"><div className="partner-inline-widget__header"><strong>Places near {location.place}</strong><button className="action-button focus-ring" type="button" onClick={() => setOpen(false)}>Close</button></div><p>Partner search by Agoda · Opens external booking options.</p><PartnerWidgetFrame kind="stays" title={`Agoda accommodation search near ${location.place}`} /></div> : null}</> : <p className="partner-plan__quiet">Accommodation search is not configured yet.</p>}<div className="stay-planner__links"><Link className="action-button focus-ring" href={`/routes/${route.summary.slug}`}>View journey</Link><Link className="action-button focus-ring" href={`/plan?route=${route.summary.slug}`}>Plan journey</Link></div></div>
    <p className="planning-disclosure">Agoda is an external partner search. Rallii does not process reservations or provide prices or availability.</p>
  </section>;
}
