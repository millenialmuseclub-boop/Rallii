/** One registry for editorial commerce; approved URLs belong here, never in JSX. */
export type AffiliateMode = "rail" | "trail" | "mtb" | "snow" | "green";
export const affiliateCategories = ["stays", "flights", "cars", "activities", "rentals", "passes", "guides", "gear"] as const;
export type AffiliateCategory = typeof affiliateCategories[number];
export const affiliatePartners = {
  agoda: { name: "Agoda", kind: "stays" }, trip: { name: "Trip.com", kind: "flights" },
  discovercars: { name: "DiscoverCars", kind: "cars" }, getyourguide: { name: "GetYourGuide", kind: "activities" },
} as const;
export const affiliateOffers = Object.entries(affiliatePartners).map(([id,partner]) => ({ id, partner:id, category:partner.kind, label:partner.name }));
export const destinationAffiliateOffers: Record<AffiliateMode, readonly AffiliateCategory[]> = {
  rail:["stays","flights","activities","gear"], trail:["stays","cars","guides","gear"],
  mtb:["stays","cars","rentals","guides","gear"], snow:["stays","flights","rentals","passes","guides","gear"],
  green:["stays","cars","activities","gear"],
};
export const editorialGear: Record<AffiliateMode, readonly string[]> = {
  rail:["Compact luggage","Camera","Power bank"],trail:["Footwear suited to the trail","Water carrying system","Weather layers"],
  mtb:["Helmet","Hydration pack","Gloves","Repair kit","Riding glasses"],
  snow:["Helmet","Goggles","Gloves","Base layers","Ski socks"], green:["Weather layers","Walking shoes","Sun protection"],
};
/** Validate publisher-supplied partner URLs before adding configured tracking. */
export function approvedAffiliateUrl(raw: string, tracking: Record<string,string> = {}): string | null {
  try { const url=new URL(raw); if(url.protocol!=="https:" || url.username || url.password) return null;
    for(const [key,value] of Object.entries(tracking)) if(value) url.searchParams.set(key,value);
    return url.toString();
  } catch { return null; }
}
