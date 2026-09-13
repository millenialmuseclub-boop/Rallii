import type { AffiliateMode } from "../data/affiliate-offers.ts";
export interface AffiliateContext { affiliate_partner: string; affiliate_context: string; route_id: string; mode: AffiliateMode }
/** Local integration hook only. No analytics provider or personal-data transmission. */
export function affiliateEvent(name: "affiliate_impression" | "affiliate_click", context: AffiliateContext) {
  if(typeof window!=="undefined") window.dispatchEvent(new CustomEvent("rallii:analytics",{detail:{event:name,...context}}));
}
