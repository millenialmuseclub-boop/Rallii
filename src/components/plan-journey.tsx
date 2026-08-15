"use client";
import { useState } from "react";
import Link from "next/link";
import { TravelPlanningTool, type PlanningToolType } from "@/components/travel-planning-tool";
import type { RailRoute } from "@/types/route";

const surfaces: Array<{ id: PlanningToolType; label: string }> = [{ id: "flights", label: "Flights" }, { id: "hotels", label: "Hotels" }, { id: "stays", label: "Stays" }];

export function PlanJourney({ routes }: { routes: RailRoute[] }) {
  const [surface, setSurface] = useState<PlanningToolType>("flights");
  return <><section className="plan-start" aria-labelledby="plan-start-title"><p className="eyebrow">Start with the rail journey</p><h2 id="plan-start-title">Build around a route you love.</h2><div className="plan-start__actions"><Link className="cta-button focus-ring" href="/saved">Open saved journeys</Link><Link className="action-button focus-ring" href="/discover">Find a journey</Link></div><p>{routes.length} prepared route guides are available. Rallii helps you choose the experience; reservations remain with the operator.</p></section><section className="plan-tools" aria-labelledby="plan-tools-title"><div className="screen-section-heading"><div><p className="eyebrow">Complete the trip</p><h2 id="plan-tools-title">Planning tools</h2></div></div><div className="plan-tabs" role="tablist" aria-label="Journey planning tools">{surfaces.map((item) => <button key={item.id} role="tab" aria-selected={surface === item.id} aria-controls={`plan-panel-${item.id}`} id={`plan-tab-${item.id}`} onClick={() => setSurface(item.id)}>{item.label}</button>)}</div><div id={`plan-panel-${surface}`} role="tabpanel" aria-labelledby={`plan-tab-${surface}`} tabIndex={0}><TravelPlanningTool type={surface} /></div></section><p className="planning-disclosure">External tools, when available, complete bookings with their provider. Rallii remains an independent journey-discovery guide.</p></>;
}
