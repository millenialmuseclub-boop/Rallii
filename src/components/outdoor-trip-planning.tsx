"use client";

import { useState } from "react";
import { PartnerWidgetFrame, type PartnerWidgetKind } from "./partner-widget-frame";
import { isTravelpayoutsConfigured } from "@/data/partner-planning";

const options: { kind: PartnerWidgetKind; label: string }[] = [
  { kind: "stays", label: "Places to stay · Agoda" },
  { kind: "flights", label: "Flights · Trip.com" },
  { kind: "cars", label: "Car hire · DiscoverCars" },
  { kind: "activities", label: "Things to do · GetYourGuide" },
];

export function OutdoorTripPlanning({ place }: { place: string }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<PartnerWidgetKind | null>(null);
  if (!isTravelpayoutsConfigured()) return null;
  return <section className="outdoor-planning">
    <button className="destination-region-toggle" aria-expanded={open} onClick={() => { setOpen(!open); setKind(null); }}><span>Plan this trip<small>Stays, flights & getting around</small></span><span aria-hidden="true">{open ? "−" : "+"}</span></button>
    {open ? <div className="outdoor-planning-body"><p>Planning around {place}? Choose a partner search, then enter your destination and dates.</p><p className="trail-fact-note">Affiliate links: Rallii may earn a commission when you book through these partners.</p><div className="outdoor-planning-options">{options.map(option => <button className="rallii-button" key={option.kind} aria-pressed={kind === option.kind} onClick={() => setKind(kind === option.kind ? null : option.kind)}>{option.label}</button>)}</div>{kind ? <PartnerWidgetFrame key={kind} kind={kind} title={options.find(option => option.kind === kind)!.label} /> : null}</div> : null}
  </section>;
}
