export interface RouteRelationship {
  slug: string;
  reason: string;
}

export const routeRelationships: Record<string, readonly [RouteRelationship, RouteRelationship]> = {
  "glacier-express": [
    { slug: "tranzalpine", reason: "Another full-day mountain crossing" },
    { slug: "goldenpass-express", reason: "A gentler panoramic Swiss journey" },
  ],
  "bernina-express": [
    { slug: "glacier-express", reason: "Another classic journey across the Swiss Alps" },
    { slug: "cinque-terre", reason: "Continue exploring dramatic Italian landscapes" },
  ],
  "goldenpass-express": [
    { slug: "glacier-express", reason: "A longer panoramic Swiss crossing" },
    { slug: "flam-railway", reason: "A shorter journey shaped by steep valleys" },
  ],
  "west-highland-line": [
    { slug: "tranzalpine", reason: "Another remote landscape experience" },
    { slug: "cinque-terre", reason: "A contrasting coastal railway" },
  ],
  "flam-railway": [
    { slug: "goldenpass-express", reason: "Another scenic journey through mountain valleys" },
    { slug: "cinque-terre", reason: "A short coastal alternative" },
  ],
  "cinque-terre": [
    { slug: "flam-railway", reason: "Another concentrated scenic escape" },
    { slug: "west-highland-line", reason: "A longer railway shaped by coast and water" },
  ],
  tranzalpine: [
    { slug: "glacier-express", reason: "Another full-day mountain crossing" },
    { slug: "west-highland-line", reason: "Another remote landscape experience" },
  ],
};

export function getRouteRelationships(slug: string): readonly RouteRelationship[] {
  return routeRelationships[slug] ?? [];
}

export function buildComparePath(firstSlug: string, secondSlug?: string): string {
  return `/compare?routes=${[firstSlug, secondSlug].filter(Boolean).join(",")}`;
}
