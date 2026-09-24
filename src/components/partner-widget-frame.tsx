"use client";

import { useEffect, useRef, useState } from "react";
import { partnerPlanning } from "@/data/partner-planning";
import { createPartnerWidgetUrl, type PartnerWidgetKind } from "@/lib/partner-widget";

export type { PartnerWidgetKind } from "@/lib/partner-widget";

export function PartnerWidgetFrame({ kind, title }: { kind: PartnerWidgetKind; title: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(defaultWidgetHeights[kind]);
  const [reload, setReload] = useState(0);
  const { trs, marker } = partnerPlanning.travelpayouts;
  const widgetUrl = `${createPartnerWidgetUrl(kind, trs, marker)}&reload=${reload}`;
  const partner = widgetPartners[kind];

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      const data = event.data;
      if (!isWidgetHeightMessage(data) || data.kind !== kind || event.source !== iframeRef.current?.contentWindow || event.origin !== window.location.origin) return;
      setHeight(Math.min(Math.max(Math.ceil(data.height), 220), 1200));
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [kind]);

  return <div className="partner-plan__widget"><iframe key={`${kind}-${reload}`} ref={iframeRef} title={title} className="partner-plan__partner-frame" data-kind={kind} style={{ height: `${height}px`, width: "100%", border: 0, display: "block" }} loading="lazy" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" src={widgetUrl} /><p className="partner-plan__widget-fallback">If the partner tool does not load, <button type="button" className="action-button focus-ring" onClick={() => { setHeight(defaultWidgetHeights[kind]); setReload(value => value + 1); }}>Reload search</button> or <a className="text-link focus-ring" href={partner.href} target="_blank" rel="noopener noreferrer">visit {partner.name} directly ↗</a>.</p></div>;
}

const widgetPartners: Record<PartnerWidgetKind, { name: string; href: string }> = {
  stays: { name: "Agoda", href: "https://www.agoda.com/" },
  flights: { name: "Trip.com", href: "https://www.trip.com/" },
  cars: { name: "DiscoverCars", href: "https://www.discovercars.com/" },
  activities: { name: "GetYourGuide", href: "https://www.getyourguide.com/" },
};
const defaultWidgetHeights: Record<PartnerWidgetKind, number> = { stays: 360, flights: 300, cars: 320, activities: 360 };

function isWidgetHeightMessage(value: unknown): value is { type: "rallii-partner-widget-height"; kind: PartnerWidgetKind; height: number } {
  if (typeof value !== "object" || value === null) return false;
  const message = value as Record<string, unknown>;
  return message.type === "rallii-partner-widget-height" && (message.kind === "stays" || message.kind === "flights" || message.kind === "cars" || message.kind === "activities") && typeof message.height === "number" && Number.isFinite(message.height);
}
