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
    { slug: "bergen-line", reason: "Connect at Myrdal for the separate Bergen Line journey" },
    { slug: "goldenpass-express", reason: "Another scenic journey through mountain valleys" },
  ],
  "cinque-terre": [
    { slug: "flam-railway", reason: "Another concentrated scenic escape" },
    { slug: "west-highland-line", reason: "A longer railway shaped by coast and water" },
  ],
  tranzalpine: [
    { slug: "glacier-express", reason: "Another full-day mountain crossing" },
    { slug: "west-highland-line", reason: "Another remote landscape experience" },
  ],
  "kurobe-gorge-railway": [
    { slug: "flam-railway", reason: "Another compact mountain railway shaped by steep terrain" },
    { slug: "tranzalpine", reason: "Another journey where river and mountain landscapes define the route" },
  ],
  "belfast-derry": [
    { slug: "dublin-rosslare", reason: "A contrasting coastal railway on the island of Ireland" },
    { slug: "west-highland-line", reason: "Another northern journey shaped by remote coast and water" },
  ],
  "dublin-rosslare": [
    { slug: "belfast-derry", reason: "Another Irish journey with a memorable coastal chapter" },
    { slug: "cinque-terre", reason: "A more concentrated contrast of coast, curves, and tunnels" },
  ],
  "douro-line": [
    { slug: "flam-railway", reason: "Another railway shaped by a steep river valley" },
    { slug: "cinque-terre", reason: "A concentrated southern-European landscape contrast" },
  ],
  "first-passage-west": [
    { slug: "tranzalpine", reason: "Another panoramic mountain crossing across two coasts" },
    { slug: "glacier-express", reason: "A classic long-form mountain journey on a different scale" },
  ],
  "settle-carlisle": [
    { slug: "west-highland-line", reason: "Another scheduled British journey through remote northern landscapes" },
    { slug: "douro-line", reason: "Another ordinary railway shaped by a celebrated valley landscape" },
  ],
  "california-zephyr": [
    { slug: "first-passage-west", reason: "Another multi-day crossing of the North American West" },
    { slug: "tranzalpine", reason: "A shorter coast-to-coast mountain journey" },
  ],
  "bergen-line": [
    { slug: "flam-railway", reason: "Connect at Myrdal for the separate descent to Flåm" },
    { slug: "tranzalpine", reason: "Another full-day crossing from one coast toward another" },
  ],
  "the-ghan": [
    { slug: "california-zephyr", reason: "Another landmark long-distance sleeper crossing" },
    { slug: "first-passage-west", reason: "A contrasting multi-day rail journey built around changing landscapes" },
  ],
  "kandy-ella-railway": [
    { slug: "tranzalpine", reason: "Another daylight journey shaped by changing mountain landscapes" },
    { slug: "kurobe-gorge-railway", reason: "A shorter railway through steep forested terrain" },
  ],
  "coast-starlight": [
    { slug: "california-zephyr", reason: "Another landmark American long-distance train" },
    { slug: "west-highland-line", reason: "A contrasting railway with memorable coastal scenery" },
  ],
  "the-canadian": [
    { slug: "the-ghan", reason: "Another defining multi-night rail journey across a continent" },
    { slug: "california-zephyr", reason: "A contrasting North American sleeper crossing" },
  ],
};

export function getRouteRelationships(slug: string): readonly RouteRelationship[] {
  return routeRelationships[slug] ?? [];
}

export function buildComparePath(firstSlug: string, secondSlug?: string): string {
  return `/compare?routes=${[firstSlug, secondSlug].filter(Boolean).join(",")}`;
}
