import type { RailRoute, RouteSource } from "@/types/route";

export type PlanningLocationKind = "departure" | "arrival" | "overnight";

export interface PlanningLocation {
  id: string;
  label: string;
  place: string;
  kind: PlanningLocationKind;
}

export const partnerPlanning = {
  stay22: { aid: process.env.NEXT_PUBLIC_STAY22_AID?.trim() ?? "" },
  travelpayouts: {
    trs: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_TRS?.trim() ?? "",
    marker: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER?.trim() ?? "",
  },
  // Supplied by the publisher as the approved Travelpayouts flight creative.
  tripFlightsEnabled: true,
  // Supplied by the publisher as the approved DiscoverCars creative.
  discoverCarsEnabled: true,
} as const;

const activityDestinations = new Set([
  "Bergen", "Vancouver", "Darwin", "Christchurch", "Greymouth", "Cusco", "Machu Picchu",
  "Zermatt", "St. Moritz", "Porto", "Alice Springs", "Los Angeles", "Seattle", "Toronto",
  "Kandy", "Ella", "Chiayi", "Alishan", "Dublin", "Belfast", "Kars",
]);

export function getPlanningLocations(route: RailRoute): PlanningLocation[] {
  const locations: PlanningLocation[] = [
    { id: "departure", label: "Near departure", place: route.summary.origin, kind: "departure" },
    { id: "arrival", label: "Near arrival", place: route.summary.destination, kind: "arrival" },
  ];
  const stops = new Map(route.stops.map((stop) => [normalise(stop.name), stop.name]));
  for (const overnight of route.summary.overnightStops ?? []) {
    const place = stops.get(normalise(overnight));
    if (place && !locations.some((location) => location.place === place)) {
      locations.splice(1, 0, { id: `overnight-${normalise(place)}`, label: "Near overnight stop", place, kind: "overnight" });
    }
  }
  return locations;
}

export function getOfficialOperatorSource(route: RailRoute): RouteSource | undefined {
  return route.sources.find((source) => source.category === "operator" && source.url);
}

export function hasPreparedActivityContext(route: RailRoute): boolean {
  return activityDestinations.has(route.summary.destination);
}

export function isStay22Configured(): boolean {
  return Boolean(partnerPlanning.stay22.aid);
}

export function isGetYourGuideConfigured(): boolean {
  return isTravelpayoutsConfigured();
}

export function isTravelpayoutsConfigured(): boolean {
  return Boolean(partnerPlanning.travelpayouts.trs && partnerPlanning.travelpayouts.marker);
}

function normalise(value: string): string {
  return value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
