"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Capacitor } from "@capacitor/core";

export type PartnerWidgetKind = "stays" | "flights" | "cars" | "activities";

const subscribe = () => () => {};
const getNativePlatform = () => Capacitor.isNativePlatform();
const getServerPlatform = (): boolean | null => null;

export function PartnerWidgetFrame({ kind, title }: { kind: PartnerWidgetKind; title: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(defaultWidgetHeights[kind]);
  const native = useSyncExternalStore(subscribe, getNativePlatform, getServerPlatform);
  // Capacitor serves the home page for extensionless iframe requests.
  const widgetPath = native === null ? null : native ? "/partner-widget/index.html" : "/partner-widget";

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      const data = event.data;
      if (!isWidgetHeightMessage(data) || data.kind !== kind || event.source !== iframeRef.current?.contentWindow) return;
      setHeight(Math.min(Math.max(Math.ceil(data.height), 220), 620));
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [kind]);

  return <div className="partner-plan__widget">{widgetPath ? <iframe ref={iframeRef} title={title} className="partner-plan__partner-frame" data-kind={kind} style={{ height: `${height}px` }} loading="lazy" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" src={`${widgetPath}?kind=${kind}`} /> : <p>Loading partner search…</p>}<p className="partner-plan__widget-fallback">If the partner tool does not load, refresh the page or try again later.</p></div>;
}

const defaultWidgetHeights: Record<PartnerWidgetKind, number> = { stays: 360, flights: 300, cars: 320, activities: 360 };

function isWidgetHeightMessage(value: unknown): value is { type: "rallii-partner-widget-height"; kind: PartnerWidgetKind; height: number } {
  if (typeof value !== "object" || value === null) return false;
  const message = value as Record<string, unknown>;
  return message.type === "rallii-partner-widget-height" && (message.kind === "stays" || message.kind === "flights" || message.kind === "cars" || message.kind === "activities") && typeof message.height === "number" && Number.isFinite(message.height);
}
