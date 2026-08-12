"use client";
import { useState } from "react";
import { TravelLibrary } from "@/components/travel-library";
import { TravelPlanningTool, type PlanningToolType } from "@/components/travel-planning-tool";
import type { RailRoute } from "@/types/route";

type PlanSurface = "rail" | PlanningToolType;
const surfaces: Array<{ id: PlanSurface; label: string }> = [{ id: "rail", label: "Rail Journeys" }, { id: "flights", label: "Flights" }, { id: "hotels", label: "Hotels" }, { id: "stays", label: "Stays" }];

export function PlanJourney({ routes }: { routes: RailRoute[] }) {
  const [surface, setSurface] = useState<PlanSurface>("rail");
  return <><div className="plan-tabs" role="tablist" aria-label="Journey planning tools">{surfaces.map((item) => <button key={item.id} role="tab" aria-selected={surface === item.id} aria-controls={`plan-panel-${item.id}`} id={`plan-tab-${item.id}`} onClick={() => setSurface(item.id)}>{item.label}</button>)}</div><div id={`plan-panel-${surface}`} role="tabpanel" aria-labelledby={`plan-tab-${surface}`} tabIndex={0}>{surface === "rail" ? <TravelLibrary routes={routes} /> : <TravelPlanningTool type={surface} />}</div><p className="planning-disclosure">External planning tools may later be supplied by approved booking partners. If activated, bookings will be completed with that provider and Rallii may earn a commission. Rallii remains an independent journey-discovery guide.</p></>;
}
