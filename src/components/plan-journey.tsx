"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PartnerPlanningPanel } from "@/components/partner-planning-panel";
import type { RailRoute } from "@/types/route";

export function PlanJourney({ routes, initialRouteSlug }: { routes: RailRoute[]; initialRouteSlug?: string }) {
  const [routeSlug, setRouteSlug] = useState(initialRouteSlug);
  useEffect(() => {
    const timeout = window.setTimeout(() => setRouteSlug(new URLSearchParams(window.location.search).get("route") ?? initialRouteSlug), 0);
    return () => window.clearTimeout(timeout);
  }, [initialRouteSlug]);
  return <><section className="plan-start" aria-labelledby="plan-start-title"><p className="eyebrow">Start with the rail journey</p><h2 id="plan-start-title">Build around a route you love.</h2><div className="plan-start__actions"><Link className="cta-button focus-ring" href="/saved">Open saved journeys</Link><Link className="action-button focus-ring" href="/discover">Find a journey</Link></div><p>{routes.length} prepared route guides are available. Rallii helps you choose the experience; reservations remain with the operator.</p></section><aside className="plan-pro-note"><p className="eyebrow">Rallii Pro</p><p>Designed for deeper planning organization, scenic alerts, and an expanded private library—without limiting ordinary discovery.</p><Link className="text-link focus-ring" href="/pro">Explore the planned upgrade</Link></aside><PartnerPlanningPanel key={routeSlug ?? "default"} routes={routes} initialRouteSlug={routeSlug} /></>;
}
