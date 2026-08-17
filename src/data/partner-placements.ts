export type PartnerPlacement = "route" | "discover" | "saved" | "compare" | "collection" | "plan" | "stays";
export type PartnerAction = "plan" | "stays" | "operator" | "flights" | "cars" | "activities";

export const partnerPlacements: Record<PartnerPlacement, readonly PartnerAction[]> = {
  route: ["plan", "stays"], discover: ["plan"], saved: ["plan", "stays"], compare: ["plan", "stays"], collection: ["plan"],
  plan: ["operator", "flights", "cars", "activities"], stays: ["stays"],
};

export function routePlanningHref(slug: string): string { return `/plan?route=${slug}`; }
export function routeStaysHref(slug: string): string { return `/stays?route=${slug}`; }
export function placementIncludes(placement: PartnerPlacement, action: PartnerAction): boolean { return partnerPlacements[placement].includes(action); }
