export const screenMedia = {
  discover: { routeSlug: "glacier-express", label: "Find a journey" },
  search: { routeSlug: "cinque-terre", label: "Search the catalogue" },
  compare: { routeSlug: "bernina-express", label: "Compare journeys" },
  plan: { routeSlug: "tranzalpine", label: "Plan a journey" },
  saved: { routeSlug: "west-highland-line", label: "Saved journeys" },
  stays: { routeSlug: "flam-railway", label: "Find places to stay" },
  collections: { routeSlug: "the-ghan", label: "Journey collections" },
} as const;

export type ScreenMediaKey = keyof typeof screenMedia;
