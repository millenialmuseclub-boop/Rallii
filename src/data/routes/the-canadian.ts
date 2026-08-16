import type { RailRoute } from "../../types/route.ts";

export const theCanadianRoute = {
  capabilities: { rideMode: false },
  summary: { id: "the-canadian", slug: "the-canadian", name: "The Canadian", origin: "Toronto", destination: "Vancouver", country: "Canada", countries: ["Canada"], journeyTypes: ["scenic", "mountain", "multi-day"], operator: "VIA Rail", durationMinutes: 5760, durationLabel: "Approx. 4 nights / 5 days", journeyDays: 5, overnightStops: ["Four nights aboard"], distanceKm: 4100.55, trainType: "Transcontinental sleeper train", reservationStatus: "required", shortDescription: "A long-form Canadian rail journey through Ontario’s Shield country, the Prairies, Jasper, and the Rocky Mountains to Vancouver.", status: "published", heroImageAlt: "VIA Rail’s The Canadian at a station stop", metadataDescription: "A curated guide to VIA Rail’s The Canadian from Toronto to Vancouver.", searchAliases: ["VIA Rail", "Toronto", "Parry Sound", "Sudbury", "Hornepayne", "Sioux Lookout", "Winnipeg", "Saskatoon", "Edmonton", "Jasper", "Kamloops", "Vancouver", "Canadian Shield", "Prairies", "Rockies", "sleeper", "transcontinental", "Canada"], experienceTags: ["forest", "lakes", "rivers", "mountain-valleys"], bestFor: ["a classic Canadian transcontinental rail journey", "contrasting Shield, Prairie, and Rocky Mountain scenery", "a long-form sleeper experience"] },
  stops: [
    { id: "toronto", name: "Toronto", latitude: 43.6453, longitude: -79.3801, sequence: 1, distanceAlongRouteKm: 0 },
    { id: "parry-sound", name: "Parry Sound", latitude: 45.34, longitude: -80.03, sequence: 2, distanceAlongRouteKm: 280 },
    { id: "capreol", name: "Capreol", latitude: 46.71, longitude: -81.34, sequence: 3, distanceAlongRouteKm: 500 },
    { id: "sioux-lookout", name: "Sioux Lookout", latitude: 50.10, longitude: -91.92, sequence: 4, distanceAlongRouteKm: 1450 },
    { id: "winnipeg", name: "Winnipeg", latitude: 49.9, longitude: -97.14, sequence: 5, distanceAlongRouteKm: 1950 },
    { id: "saskatoon", name: "Saskatoon", latitude: 52.13, longitude: -106.67, sequence: 6, distanceAlongRouteKm: 2600 },
    { id: "edmonton", name: "Edmonton", latitude: 53.54, longitude: -113.49, sequence: 7, distanceAlongRouteKm: 3200 },
    { id: "jasper", name: "Jasper", latitude: 52.88, longitude: -118.08, sequence: 8, distanceAlongRouteKm: 3600 },
    { id: "kamloops", name: "Kamloops", latitude: 50.7, longitude: -120.33, sequence: 9, distanceAlongRouteKm: 3900 },
    { id: "vancouver", name: "Vancouver", latitude: 49.2731, longitude: -123.0992, sequence: 10, distanceAlongRouteKm: 4100.55 },
  ],
  landmarks: [
    { id: "muskoka", name: "Muskoka and the Canadian Shield", type: "lake", latitude: 45.1, longitude: -79.8, distanceAlongRouteKm: 210, shortDescription: "Lakes, exposed rock, and forest announce the long northwestern departure from Toronto.", importance: "highlight", bestSideForward: "both", bestSideReverse: "both" },
    { id: "northern-ontario", name: "Northern Ontario forest", type: "scenic-section", latitude: 49.2, longitude: -86.2, distanceAlongRouteKm: 1030, shortDescription: "Remote forest, lakes, and sparse settlements make this one of the journey’s most isolated chapters.", importance: "dont-miss", bestSideForward: "both", bestSideReverse: "both" },
    { id: "prairies", name: "Canadian Prairies", type: "scenic-section", latitude: 50.2, longitude: -101.8, distanceAlongRouteKm: 2300, shortDescription: "The horizon opens dramatically west of Winnipeg as the railway crosses prairie provinces.", importance: "highlight", bestSideForward: "both", bestSideReverse: "both" },
    { id: "jasper", name: "Jasper and the Rockies", type: "mountain-pass", latitude: 52.88, longitude: -118.08, distanceAlongRouteKm: 3600, shortDescription: "Jasper marks the transition from broad plains toward the Canadian Rockies and western mountain valleys.", importance: "dont-miss", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "fraser", name: "Fraser Valley approach", type: "river", latitude: 50.67, longitude: -121.95, distanceAlongRouteKm: 4020, shortDescription: "River valleys and increasingly temperate western landscapes carry the final descent toward Vancouver.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
  ],
  timelineEntries: [
    { id: "shield", title: "Canadian Shield", subtitle: "Day one", distanceAlongRouteKm: 210, approximateJourneyMinutes: 250, type: "lake", importance: "highlight", bestSide: "both", relatedLandmarkId: "muskoka", shortDescription: "Lakes and forest create a strong contrast with the city departure." },
    { id: "northern-ontario", title: "Northern Ontario", subtitle: "Remote forest and lakes", distanceAlongRouteKm: 1030, approximateJourneyMinutes: 1300, type: "scenic-section", importance: "dont-miss", bestSide: "both", relatedLandmarkId: "northern-ontario", shortDescription: "This long, remote section is shaped by water, trees, and the rhythm of the sleeping-car journey." },
    { id: "winnipeg", title: "Winnipeg", subtitle: "Prairie gateway", distanceAlongRouteKm: 1950, approximateJourneyMinutes: 2550, type: "station", importance: "highlight", shortDescription: "A major stop where the landscape begins to open and broaden." },
    { id: "prairies", title: "Canadian Prairies", subtitle: "Day three", distanceAlongRouteKm: 2500, approximateJourneyMinutes: 3300, type: "scenic-section", importance: "highlight", bestSide: "both", relatedLandmarkId: "prairies", shortDescription: "Open sky and farmland read clearly from both sides; daylight depends on the current running pattern." },
    { id: "edmonton", title: "Edmonton", subtitle: "Toward the mountains", distanceAlongRouteKm: 3200, approximateJourneyMinutes: 4100, type: "station", importance: "normal", shortDescription: "Beyond Edmonton, the route works steadily toward the Rocky Mountain chapter." },
    { id: "jasper", title: "Jasper and the Rockies", subtitle: "Day four", distanceAlongRouteKm: 3600, approximateJourneyMinutes: 4700, type: "mountain-pass", importance: "dont-miss", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "jasper", shortDescription: "Mountain curves and valleys make the strongest window views directional and situational." },
    { id: "fraser", title: "Fraser Valley", subtitle: "Western descent", distanceAlongRouteKm: 4020, approximateJourneyMinutes: 5400, type: "river", importance: "highlight", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "fraser", shortDescription: "River corridors lead out of the interior toward the coast and Vancouver." },
  ],
  bestSideSegments: [
    { id: "ontario", startDistanceKm: 0, endDistanceKm: 1950, forwardDirectionSide: "both", reverseDirectionSide: "both", reason: "Canadian Shield lakes and forest are broadly rewarding across both sides.", confidenceType: "limited-data" },
    { id: "prairies", startDistanceKm: 1950, endDistanceKm: 3200, forwardDirectionSide: "both", reverseDirectionSide: "both", reason: "The principal experience is the scale of the prairie horizon and changing light across both windows.", confidenceType: "limited-data" },
    { id: "rockies", startDistanceKm: 3200, endDistanceKm: 3900, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Mountain alignment, riverbank changes, and curves shift the strongest views between sides.", confidenceType: "limited-data" },
    { id: "west", startDistanceKm: 3900, endDistanceKm: 4100.55, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "The Fraser Valley approach changes orientation through river corridors and the urban edge.", confidenceType: "limited-data" },
  ],
  journeyInformation: [
    { id: "duration", label: "A multi-night journey", detail: "VIA Rail’s published schedule and service dates can change; long-distance freight-network conditions can also affect arrival times and daylight." },
    { id: "reservation", label: "Reservation required", detail: "A confirmed booking is required. Rallii does not publish fares, inventory, or availability." },
    { id: "onboard", label: "On board", detail: "Accommodation and food options depend on the travel class and selected departure. Check VIA Rail directly for current details." },
    { id: "daylight", label: "Scenery and daylight", detail: "With several nights aboard, not every landmark is guaranteed in daylight. Season, direction, and operational timing all matter." },
  ],
  sources: [
    { id: "via", label: "VIA Rail — The Canadian", category: "operator", url: "https://corpo.viarail.ca/en/company", note: "Official VIA Rail context for the Toronto–Vancouver transcontinental route." },
    { id: "timetable", label: "VIA Rail — Toronto to Vancouver schedule", category: "operator", url: "https://www.viarail.ca/en/plan/train-schedules/toronto-winnipeg-jasper-vancouver", note: "Current date-specific schedule context; not treated as permanent timetable data." },
    { id: "osm", label: "OpenStreetMap relation 1828833", category: "railway-map", url: "https://www.openstreetmap.org/relation/1828833", note: "Prepared local route geometry based on the Toronto–Vancouver passenger relation; © OpenStreetMap contributors, ODbL." },
    { id: "editorial", label: "Rallii guidance", category: "editorial", note: "Curated scenic sequence and cautious segment-level viewing guidance." },
  ],
  geoJsonPath: "/data/routes/the-canadian.geojson", relatedRouteSlugs: ["the-ghan", "california-zephyr"],
} satisfies RailRoute;
