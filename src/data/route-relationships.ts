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
    { slug: "jacobite-steam-train", reason: "The seasonal steam journey on its Fort William–Mallaig section" },
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
  "eastern-express": [{ slug: "the-ghan", reason: "Another overnight crossing of a vast interior" }, { slug: "the-canadian", reason: "A contrasting long-form sleeper journey" }],
  "hiram-bingham": [{ slug: "kandy-ella-railway", reason: "Another compact journey through mountain valleys" }, { slug: "tranzalpine", reason: "A longer mountain railway on another continent" }],
  "alishan-forest-railway": [{ slug: "kurobe-gorge-railway", reason: "Another compact forested mountain railway" }, { slug: "kandy-ella-railway", reason: "Another railway shaped by steep highland terrain" }],
  "belgrade-bar": [{ slug: "eastern-express", reason: "Another long journey through changing mountain landscapes" }, { slug: "bergen-line", reason: "A contrasting full-day mountain crossing" }],
  "konkan-railway": [{ slug: "kandy-ella-railway", reason: "Another South Asian journey transformed by monsoon landscapes" }, { slug: "alishan-forest-railway", reason: "A shorter contrast of forest, tunnels, and mountain engineering" }],
  "blue-train": [{ slug: "the-ghan", reason: "Another defining luxury sleeper across an immense interior" }, { slug: "the-canadian", reason: "A contrasting multi-night crossing on another continent" }],
  "el-chepe-express": [{ slug: "california-zephyr", reason: "Another North American journey shaped by canyons and mountain engineering" }, { slug: "hiram-bingham", reason: "A contrasting Latin American railway into celebrated mountain landscapes" }],
  inlandsbanan: [{ slug: "the-canadian", reason: "Another long-form journey through immense northern landscapes" }, { slug: "west-highland-line", reason: "A shorter contrast of remote communities, water, and northern scenery" }],
  "train-des-merveilles": [{ slug: "cinque-terre", reason: "Another compact regional railway of tunnels and dramatic terrain" }, { slug: "bernina-express", reason: "A longer Alpine contrast of viaducts, valleys, and high mountains" }],
  "jacobite-steam-train": [
    { slug: "west-highland-line", reason: "The longer scheduled journey that shares this Highland railway section" },
    { slug: "train-des-merveilles", reason: "Another short scenic railway defined by remarkable engineering" },
  ],
  "sagano-scenic-railway": [{ slug: "kurobe-gorge-railway", reason: "Another compact Japanese sightseeing railway through steep terrain" }, { slug: "alishan-forest-railway", reason: "A longer forested mountain railway in East Asia" }],
  "rauma-line": [{ slug: "bergen-line", reason: "Another Norwegian mountain railway linking interior and western landscapes" }, { slug: "flam-railway", reason: "A compact Scandinavian railway shaped by steep valleys and dramatic terrain" }],
  "madaraka-express": [{ slug: "blue-train", reason: "Another long African rail journey across changing landscapes" }, { slug: "the-ghan", reason: "A contrasting long-distance rail crossing with a strong sense of scale" }],
  "reunification-express": [{ slug: "eastern-express", reason: "Another long overland rail journey with a changing regional landscape" }, { slug: "coast-starlight", reason: "A contrasting long-distance railway shaped by coastal sections" }],
  "east-rift-valley-railway": [{ slug: "alishan-forest-railway", reason: "Another Taiwanese journey shaped by mountain landscapes" }, { slug: "kurobe-gorge-railway", reason: "A compact East Asian railway through dramatic green terrain" }],
  "kuranda-scenic-railway": [{ slug: "kurobe-gorge-railway", reason: "Another short heritage railway through steep, wooded scenery" }, { slug: "sagano-scenic-railway", reason: "A contrasting compact sightseeing railway through a gorge" }],
  "kalka-shimla-railway": [{ slug: "konkan-railway", reason: "Another Indian railway where mountain engineering shapes the journey" }, { slug: "alishan-forest-railway", reason: "A contrasting narrow-gauge mountain railway in Asia" }],
};

export function getRouteRelationships(slug: string): readonly RouteRelationship[] {
  return routeRelationships[slug] ?? [];
}

export function buildComparePath(firstSlug: string, secondSlug?: string): string {
  return `/compare?routes=${[firstSlug, secondSlug].filter(Boolean).join(",")}`;
}
