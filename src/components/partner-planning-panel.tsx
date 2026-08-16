"use client";

import { useEffect, useRef, useState } from "react";
import type { RailRoute } from "@/types/route";
import {
  getOfficialOperatorSource,
  getPlanningLocations,
  hasPreparedActivityContext,
  isGetYourGuideConfigured,
  isStay22Configured,
  partnerPlanning,
} from "@/data/partner-planning";

type PartnerSurface = "stays" | "flights" | "experiences" | "car" | null;

export function PartnerPlanningPanel({ routes, initialRouteSlug }: { routes: RailRoute[]; initialRouteSlug?: string }) {
  const initialRoute = routes.find((route) => route.summary.slug === initialRouteSlug) ?? routes[0];
  const [routeSlug, setRouteSlug] = useState(initialRoute.summary.slug);
  const [surface, setSurface] = useState<PartnerSurface>(null);
  const route = routes.find((item) => item.summary.slug === routeSlug) ?? initialRoute;
  const locations = getPlanningLocations(route);
  const [locationId, setLocationId] = useState(locations[0].id);
  const location = locations.find((item) => item.id === locationId) ?? locations[0];
  const operator = getOfficialOperatorSource(route);

  function selectRoute(nextSlug: string) {
    const nextRoute = routes.find((route) => route.summary.slug === nextSlug);
    setRouteSlug(nextSlug);
    setLocationId(nextRoute ? getPlanningLocations(nextRoute)[0].id : "departure");
    setSurface(null);
  }

  return <section className="partner-plan" aria-labelledby="partner-plan-title">
    <div className="screen-section-heading"><div><p className="eyebrow">Build around your rail day</p><h2 id="partner-plan-title">Plan the practical pieces</h2></div></div>
    <label className="partner-plan__route-label" htmlFor="plan-route">Journey</label>
    <select id="plan-route" className="partner-plan__route-select focus-ring" value={routeSlug} onChange={(event) => selectRoute(event.target.value)}>
      {routes.map((item) => <option key={item.summary.slug} value={item.summary.slug}>{item.summary.name} — {item.summary.origin} to {item.summary.destination}</option>)}
    </select>
    <div className="partner-plan__route-summary"><span>{route.summary.origin} → {route.summary.destination}</span><span>{route.summary.country}</span></div>

    <div className="partner-plan__sections">
      <section className="partner-plan__section"><p className="eyebrow">Continue planning</p><h3>Travel with the operator</h3><p>Rallii’s route guidance is editorial. Check the operator directly for current reservations, schedules, and service information.</p>{operator?.url ? <a className="action-button focus-ring" href={operator.url} target="_blank" rel="noreferrer">Visit {route.summary.operator}</a> : null}</section>
      <section className="partner-plan__section"><p className="eyebrow">Stay near the journey</p><h3>Choose a practical base</h3><div className="partner-plan__locations">{locations.map((item) => <button key={item.id} type="button" className="action-button focus-ring" aria-pressed={location.id === item.id} onClick={() => setLocationId(item.id)}>{item.label}: {item.place}</button>)}</div>{isStay22Configured() ? <button className="action-button action-button--primary focus-ring" type="button" onClick={() => setSurface("stays")}>Search stays near {location.place}</button> : <p className="partner-plan__quiet">Accommodation search is not configured yet.</p>}</section>
      <section className="partner-plan__section"><p className="eyebrow">Get there</p><h3>Find flights</h3><p>Flight options will remain separate from the rail experience and open with a partner when the flight-only integration is confirmed.</p><span className="partner-plan__quiet">Partner search — coming soon</span></section>
      {hasPreparedActivityContext(route) && isGetYourGuideConfigured() ? <section className="partner-plan__section"><p className="eyebrow">Explore the destination</p><h3>Ideas around {route.summary.destination}</h3><p>A local activity search for the city at the end of this route.</p><button className="action-button focus-ring" type="button" onClick={() => setSurface("experiences")}>Explore destination</button></section> : null}
      <section className="partner-plan__section"><p className="eyebrow">Continue by car</p><h3>Car hire when it makes sense</h3><p>Car-search options will appear for appropriate endpoints after a destination-aware partner format is configured.</p><span className="partner-plan__quiet">Partner search — coming soon</span></section>
    </div>
    {surface === "stays" ? <PartnerDetail title={`Stays near ${location.place}`} onClose={() => setSurface(null)}><p>Partner search · Opens external booking options.</p><iframe className="partner-plan__embed" title={`Stay22 accommodation search near ${location.place}`} loading="lazy" src={getStay22Url(location.place, route.summary.country)} /></PartnerDetail> : null}
    {surface === "experiences" ? <PartnerDetail title={`Explore ${route.summary.destination}`} onClose={() => setSurface(null)}><p>Partner search by GetYourGuide · Opens external booking options.</p><GetYourGuideWidget /></PartnerDetail> : null}
    <p className="planning-disclosure">Where a partner search is available, it opens external booking options with that provider. Rallii does not process reservations or show prices and availability.</p>
  </section>;
}

function getStay22Url(place: string, country: string): string {
  const params = new URLSearchParams({ aid: partnerPlanning.stay22.aid, address: `${place}, ${country}` });
  return `https://www.stay22.com/embed/gm?${params.toString()}`;
}

function PartnerDetail({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return <section className="partner-detail" aria-live="polite"><div className="partner-detail__header"><h3>{title}</h3><button className="action-button focus-ring" type="button" onClick={onClose}>Close</button></div>{children}</section>;
}

function GetYourGuideWidget() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src = `https://tpwdgt.com/content?trs=${encodeURIComponent(partnerPlanning.travelpayouts.trs)}&shmarker=${encodeURIComponent(partnerPlanning.travelpayouts.marker)}&locale=en-US&powered_by=true&campaign_id=108&promo_id=4040`;
    container.current?.appendChild(script);
    return () => script.remove();
  }, []);
  return <div className="partner-plan__widget" ref={container} />;
}
