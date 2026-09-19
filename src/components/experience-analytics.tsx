"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { experienceEvent, experienceForPath } from "@/lib/experience-events";

export function ExperienceAnalytics() {
  const path = usePathname();
  useEffect(() => {
    const context = experienceForPath(path);
    if (context) experienceEvent("route_view", context);
    const outbound = (event: MouseEvent) => {
      if (event.type === "auxclick" && event.button !== 1) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[data-outbound]") : null;
      if (!link) return;
      const mode = link.dataset.mode || context?.mode;
      if (mode !== "rail" && mode !== "trail" && mode !== "mtb" && mode !== "snow" && mode !== "green") return;
      const kind = link.dataset.outbound;
      if (kind !== "shopmy_click" && kind !== "commercial_outbound_click" && kind !== "jetset_click") return;
      experienceEvent(kind, { mode, route_id: link.dataset.routeId || context?.route_id || "", product_id: link.dataset.productId, destination_host: new URL(link.href).hostname });
    };
    document.addEventListener("click", outbound);
    document.addEventListener("auxclick", outbound);
    return () => { document.removeEventListener("click", outbound); document.removeEventListener("auxclick", outbound); };
  }, [path]);
  return null;
}
