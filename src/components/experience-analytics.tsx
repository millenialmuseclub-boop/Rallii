"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { experienceEvent, experienceForPath } from "@/lib/experience-events";
import { activityForPath } from "@/lib/activities";

export function ExperienceAnalytics() {
  const path = usePathname();
  useEffect(() => {
    const context = experienceForPath(path);
    if (context) experienceEvent("route_view", context);
    const outbound = (event: MouseEvent) => {
      if (event.type === "auxclick" && event.button !== 1) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a") : null;
      if (!link) return;
      const target = new URL(link.href);
      if (target.origin === window.location.origin) {
        const destination = experienceForPath(target.pathname);
        if (destination && link.closest("[data-related-journeys]")) experienceEvent("related_route", { mode: context?.mode ?? destination.mode, route_id: context?.route_id ?? "", target_id: `${destination.mode}:${destination.route_id}` });
        const selected = target.pathname.match(/^\/(rail|trail|mtb|snow|green)\/?$/)?.[1];
        if (selected && selected !== activityForPath(path)) experienceEvent("mode_selected", { mode: selected as "rail" | "trail" | "mtb" | "snow" | "green", route_id: "" });
      }
      const mode = link.dataset.mode || context?.mode;
      if (mode !== "rail" && mode !== "trail" && mode !== "mtb" && mode !== "snow" && mode !== "green") return;
      const kind = link.dataset.outbound;
      if (kind !== "shopmy_click" && kind !== "commercial_outbound_click" && kind !== "jetset_click" && kind !== "ecosystem_click") return;
      experienceEvent(kind, { mode, route_id: link.dataset.routeId || context?.route_id || "", product_id: link.dataset.productId, destination_host: new URL(link.href).hostname });
    };
    document.addEventListener("click", outbound);
    document.addEventListener("auxclick", outbound);
    const changed = (event: Event) => {
      const input = event.target;
      if (!(input instanceof HTMLSelectElement || input instanceof HTMLInputElement)) return;
      if (input.closest(".phone-activity")) experienceEvent("mode_selected", { mode: input.value as "rail" | "trail" | "mtb" | "snow" | "green", route_id: "" });
      else if (path !== "/search" && path !== "/search/" && input.closest(".trail-filters, .trail-search, .discover-search, .outdoor-planner")) experienceEvent("search_filter", { mode: activityForPath(path), route_id: "", filter_keys: [input.name || input.getAttribute("aria-label") || input.type] });
    };
    document.addEventListener("change", changed);
    return () => { document.removeEventListener("click", outbound); document.removeEventListener("auxclick", outbound); document.removeEventListener("change", changed); };
  }, [path]);
  return null;
}
