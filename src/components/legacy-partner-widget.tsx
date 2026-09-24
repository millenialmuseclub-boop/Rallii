"use client";
import { useEffect, useState } from "react";
import { createPartnerWidgetUrl } from "@/lib/partner-widget";
import { partnerPlanning } from "@/data/partner-planning";

/** Keep old embeds working through the same isolated document as current ones. */
export function LegacyPartnerWidget() {
  const [message, setMessage] = useState("Opening partner search…");
  useEffect(() => {
    const kind = new URLSearchParams(window.location.search).get("kind");
    const { trs, marker } = partnerPlanning.travelpayouts;
    if ((kind === "stays" || kind === "flights" || kind === "cars" || kind === "activities") && trs && marker) {
      window.location.replace(createPartnerWidgetUrl(kind, trs, marker));
      return;
    }
    const timer = window.setTimeout(() => setMessage("Partner search is not configured."), 0);
    return () => clearTimeout(timer);
  }, []);
  return <main><p role="status">{message}</p></main>;
}
