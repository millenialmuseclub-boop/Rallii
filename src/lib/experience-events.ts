import type { AffiliateMode } from "../data/affiliate-offers.ts";
export type ExperienceEvent = "route_view" | "save" | "comparison" | "shopmy_click" | "commercial_outbound_click" | "jetset_click";
export interface ExperienceContext { mode: AffiliateMode; route_id: string; comparison_ids?: string[]; status?: string; product_id?: string; destination_host?: string }
/** Existing local hook only: no cookies, network requests, notes or user identifiers. */
export function experienceEvent(event: ExperienceEvent, context: ExperienceContext) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("rallii:analytics", { detail: { event, ...context } }));
}
export function experienceForPath(path: string): { mode: AffiliateMode; route_id: string } | null {
  const match = path.match(/^\/(routes|trail|mtb|snow)\/([a-z0-9-]+)\/?$/);
  if (!match || match[2] === "compare") return null;
  return { mode: match[1] === "routes" ? "rail" : match[1] as AffiliateMode, route_id: match[2] };
}
