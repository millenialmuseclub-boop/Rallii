"use client";

import { useState } from "react";
import { PartnerWidgetFrame } from "@/components/partner-widget-frame";
import { RouteMedia } from "@/components/route-media";
import type { RailRoute } from "@/types/route";
import {
  getOfficialOperatorSource,
  getPlanningLocations,
  hasPreparedActivityContext,
  isGetYourGuideConfigured,
  isTravelpayoutsConfigured,
  partnerPlanning,
} from "@/data/partner-planning";

type PartnerSurface = "stays" | "flights" | "experiences" | "car";
type OpenSurfaces = Record<PartnerSurface, boolean>;

const closedSurfaces: OpenSurfaces = { stays: true, flights: true, experiences: true, car: true };

export function PartnerPlanningPanel({ routes, initialRouteSlug }: { routes: RailRoute[]; initialRouteSlug?: string }) {
  const initialRoute = routes.find((route) => route.summary.slug === initialRouteSlug) ?? routes[0];
  const [routeSlug, setRouteSlug] = useState(initialRoute.summary.slug);
  const [openSurfaces, setOpenSurfaces] = useState<OpenSurfaces>(closedSurfaces);
  const route = routes.find((item) => item.summary.slug === routeSlug) ?? initialRoute;
  const locations = getPlanningLocations(route);
  const [locationId, setLocationId] = useState(locations[0].id);
  const location = locations.find((item) => item.id === locationId) ?? locations[0];
  const operator = getOfficialOperatorSource(route);

  function selectRoute(nextSlug: string) {
    const nextRoute = routes.find((item) => item.summary.slug === nextSlug) ?? routes[0];
    setRouteSlug(nextSlug);
    setLocationId(getPlanningLocations(nextRoute)[0].id);
    setOpenSurfaces(closedSurfaces);
  }

  function toggleSurface(surface: PartnerSurface) {
    setOpenSurfaces((current) => ({ ...current, [surface]: !current[surface] }));
  }

  return <section className="partner-plan" aria-labelledby="partner-plan-title">
    <div className="screen-section-heading"><div><p className="eyebrow">Build around your rail day</p><h2 id="partner-plan-title">Plan the practical pieces</h2></div></div>
    <label className="partner-plan__route-label" htmlFor="plan-route">Journey</label>
    <select id="plan-route" className="partner-plan__route-select focus-ring" value={routeSlug} onChange={(event) => selectRoute(event.target.value)}>
      {routes.map((item) => <option key={item.summary.slug} value={item.summary.slug}>{item.summary.name} — {item.summary.origin} to {item.summary.destination}</option>)}
    </select>
    <div className="planning-route-visual"><RouteMedia summary={route.summary} variant="card" /><div className="partner-plan__route-summary"><span>{route.summary.origin} → {route.summary.destination}</span><span>{route.summary.country}</span></div></div>

    <div className="partner-plan__sections">
      <section className="partner-plan__section"><p className="eyebrow">Continue planning</p><h3>Travel with the operator</h3><p>Rallii’s route guidance is editorial. Check the operator directly for current reservations, schedules, and service information.</p>{operator?.url ? <a className="action-button focus-ring" href={operator.url} target="_blank" rel="noreferrer">Visit {route.summary.operator}</a> : null}</section>
      <section className="partner-plan__section"><p className="eyebrow">Stay near the journey</p><h3>Find places to stay</h3><p>Choose a prepared city along this journey, then open Agoda below.</p><label className="partner-plan__route-label" htmlFor="plan-stay-location">Stay near</label><select id="plan-stay-location" className="partner-plan__route-select focus-ring" value={location.id} onChange={(event) => { setLocationId(event.target.value); setOpenSurfaces((current) => ({ ...current, stays: false })); }}>{locations.map((item) => <option key={item.id} value={item.id}>{item.label}: {item.place}</option>)}</select>{isTravelpayoutsConfigured() ? <><button className="action-button action-button--primary focus-ring" type="button" aria-expanded={openSurfaces.stays} onClick={() => toggleSurface("stays")}>Find places near {location.place}</button>{openSurfaces.stays ? <PartnerDetail title={`Places near ${location.place}`} onClose={() => toggleSurface("stays")}><p>Partner search by Agoda · Opens external booking options.</p><PartnerWidgetFrame kind="stays" title={`Agoda accommodation search near ${location.place}`} /></PartnerDetail> : null}</> : <p className="partner-plan__quiet">Accommodation search is not configured yet.</p>}</section>
      <section className="partner-plan__section"><p className="eyebrow">Get there</p><h3>Find flights</h3><p>Compare flight options separately from your rail journey.</p>{partnerPlanning.tripFlightsEnabled && isTravelpayoutsConfigured() ? <><button className="action-button focus-ring" type="button" aria-expanded={openSurfaces.flights} onClick={() => toggleSurface("flights")}>Find flights</button>{openSurfaces.flights ? <PartnerDetail title="Flight finder" onClose={() => toggleSurface("flights")}><p>Partner search by Trip.com · Opens external booking options.</p><PartnerWidgetFrame kind="flights" title="Trip.com flight search" /></PartnerDetail> : null}</> : <span className="partner-plan__quiet">Partner search is not configured yet.</span>}</section>
      {hasPreparedActivityContext(route) && isGetYourGuideConfigured() ? <section className="partner-plan__section"><p className="eyebrow">Explore around the journey</p><h3>Find activities</h3><p>Browse the general GetYourGuide activity finder. Confirm the place directly with the partner.</p><button className="action-button focus-ring" type="button" aria-expanded={openSurfaces.experiences} onClick={() => toggleSurface("experiences")}>Explore activities</button>{openSurfaces.experiences ? <PartnerDetail title="Activity finder" onClose={() => toggleSurface("experiences")}><p>General partner search by GetYourGuide · Opens external booking options.</p><PartnerWidgetFrame kind="activities" title="GetYourGuide activity search" /></PartnerDetail> : null}</section> : null}
      <section className="partner-plan__section"><p className="eyebrow">Continue by car</p><h3>Find cars</h3><p>Compare car-hire options separately for your arrival or onward travel.</p>{partnerPlanning.discoverCarsEnabled && isTravelpayoutsConfigured() ? <><button className="action-button focus-ring" type="button" aria-expanded={openSurfaces.car} onClick={() => toggleSurface("car")}>Find cars</button>{openSurfaces.car ? <PartnerDetail title="Car finder" onClose={() => toggleSurface("car")}><p>Partner search by DiscoverCars · Opens external booking options.</p><PartnerWidgetFrame kind="cars" title="DiscoverCars search" /></PartnerDetail> : null}</> : <span className="partner-plan__quiet">Partner search is not configured yet.</span>}</section>
    </div>
    <p className="planning-disclosure">Where a partner search is available, it opens external booking options with that provider. Rallii does not process reservations or show prices and availability.</p>
  </section>;
}

function PartnerDetail({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return <section className="partner-detail" aria-live="polite"><div className="partner-detail__header"><h3>{title}</h3><button className="action-button focus-ring" type="button" onClick={onClose}>Close</button></div>{children}</section>;
}
