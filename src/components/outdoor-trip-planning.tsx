"use client";

import { GearPicks } from "./gear-picks";
import { useEffect, useRef, useState } from "react";
import { PartnerWidgetFrame, type PartnerWidgetKind } from "./partner-widget-frame";
import { isTravelpayoutsConfigured } from "@/data/partner-planning";
import { affiliateOffers, destinationAffiliateOffers, approvedAffiliateUrl, editorialGear, type AffiliateMode } from "@/data/affiliate-offers";
import { affiliateEvent } from "@/lib/affiliate-events";

const options = affiliateOffers.map(offer => ({kind:offer.category as PartnerWidgetKind,label:offer.label,partner:offer.partner}));

export function OutdoorTripPlanning({ place, mode = "trail", routeId = "", sourceUrl }: { place: string; mode?: AffiliateMode; routeId?: string; sourceUrl?: string }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<PartnerWidgetKind | null>(null);
  const root=useRef<HTMLElement>(null);
  const configured=isTravelpayoutsConfigured();
  sourceUrl=sourceUrl?approvedAffiliateUrl(sourceUrl)??undefined:undefined;
  const relevantOptions=options.filter(option=>destinationAffiliateOffers[mode].includes(option.kind));
  useEffect(()=>{if(!open || !configured || !root.current)return;const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){for(const option of options.filter(option=>destinationAffiliateOffers[mode].includes(option.kind)))affiliateEvent("affiliate_impression",{affiliate_partner:option.partner,affiliate_context:option.kind,route_id:routeId,mode});observer.disconnect();}});observer.observe(root.current);return()=>observer.disconnect();},[open,configured,routeId,mode]);
  return <section className="outdoor-planning" ref={root}>
    <button className="destination-region-toggle" aria-expanded={open} onClick={() => { setOpen(!open); setKind(null); }}><span>Plan this trip<small>Stays, flights & getting around</small></span><span aria-hidden="true">{open ? "−" : "+"}</span></button>
    {open ? <div className="outdoor-planning-body"><p>Planning around {place}?</p>{configured ? <><p className="trail-fact-note">Affiliate links: Rallii may earn a commission when you book through these partners.</p><div className="outdoor-planning-options">{relevantOptions.map(option => <button className="rallii-button" key={option.kind} aria-pressed={kind === option.kind} onClick={() => {if(kind!==option.kind)affiliateEvent("affiliate_click",{affiliate_partner:option.partner,affiliate_context:option.kind,route_id:routeId,mode});setKind(kind === option.kind ? null : option.kind);}}>{option.kind} · {option.label}</button>)}</div>{kind ? <PartnerWidgetFrame key={kind} kind={kind} title={options.find(option => option.kind === kind)!.label} /> : null}</> : null}<GearPicks mode={mode} slug={routeId}/><div className="editorial-opportunities"><h3>{mode==="snow"?"For this mountain":mode==="mtb"?"For this ride":"For this journey"}</h3><p>A small packing list to adapt to your plans.</p><ul>{editorialGear[mode].map(item=><li key={item}>{item}</li>)}</ul>{sourceUrl ? <><h3>{mode==="snow"?"Rentals, lessons & mountain passes":"Local rentals & guides"}</h3><p>Start with the destination’s official directory for equipment, qualified instruction and current access.</p><a className="rallii-text-link" data-outbound="commercial_outbound_click" data-mode={mode} data-route-id={routeId} href={sourceUrl} target="_blank" rel="noopener noreferrer">Explore local services ↗</a><p className="trail-fact-note">Official information link. This is not an affiliate booking.</p></> : null}</div></div> : null}
  </section>;
}
