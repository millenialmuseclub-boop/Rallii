"use client";

import { useEffect, useState } from "react";

type PartnerWidgetKind = "stays" | "flights" | "cars" | "activities";

const widgetParameters: Record<PartnerWidgetKind, Record<string, string>> = {
  stays: { locale: "en", powered_by: "true", primary_override: "#5392F9", color_button: "#2681ff", color_icons: "#5392F9", dark: "#262626", color_border: "#2681ff", color_focused: "#32a8dd", border_radius: "0", plain: "false", promo_id: "8303", campaign_id: "104" },
  flights: { locale: "en", curr: "USD", powered_by: "true", border_radius: "0", plain: "true", color_button: "#2681ff", color_button_text: "#ffffff", color_border: "#2681ff", promo_id: "4132", campaign_id: "121" },
  cars: { locale: "en", powered_by: "true", bg_color: "#fad130", font_color: "#333333", button_color: "#00a200", button_font_color: "#ffffff", button_text: "Search", rounded_corners: "false", benefits: "false", dc_powered_by: "false", supplier_logos: "false", top_logo: "false", logo_style: "dark", top_color: "#007ac2", campaign_id: "117", promo_id: "3873" },
  activities: { locale: "en-US", powered_by: "true", campaign_id: "108", promo_id: "4040" },
};

function isWidgetKind(value: string | null): value is PartnerWidgetKind {
  return value === "stays" || value === "flights" || value === "cars" || value === "activities";
}

export default function PartnerWidgetPage() {
  const [message, setMessage] = useState("Loading partner search…");

  useEffect(() => {
    const kind = new URLSearchParams(window.location.search).get("kind");
    const trs = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_TRS?.trim();
    const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER?.trim();
    if (!isWidgetKind(kind) || !trs || !marker) {
      const timeout = window.setTimeout(() => setMessage("Partner search is not configured."), 0);
      return () => window.clearTimeout(timeout);
      return;
    }

    const parameters = new URLSearchParams({ trs, shmarker: marker, ...widgetParameters[kind] });
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src = `https://tpwdgt.com/content?${parameters.toString()}`;
    script.onerror = () => setMessage("Partner search is unavailable. Please try again later.");
    document.body.appendChild(script);
    const messageTimeout = window.setTimeout(() => setMessage(""), 0);

    const reportHeight = () => window.parent.postMessage({ type: "rallii-partner-widget-height", kind, height: document.documentElement.scrollHeight }, "*");
    const observer = new ResizeObserver(reportHeight);
    observer.observe(document.documentElement);
    window.addEventListener("load", reportHeight);
    const timeout = window.setTimeout(reportHeight, 1200);
    return () => {
      observer.disconnect();
      window.removeEventListener("load", reportHeight);
      window.clearTimeout(timeout);
      window.clearTimeout(messageTimeout);
      script.remove();
    };
  }, []);

  return <main style={{ padding: 2, fontFamily: "Arial, sans-serif" }}>{message}</main>;
}
