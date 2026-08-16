import type { RailRoute } from "../../types/route.ts";

export const coastStarlightRoute = {
  capabilities: { rideMode: false },
  summary: { id: "coast-starlight", slug: "coast-starlight", name: "Coast Starlight", origin: "Seattle", destination: "Los Angeles", country: "United States", countries: ["United States"], journeyTypes: ["scenic", "coastal", "mountain", "multi-day"], operator: "Amtrak", durationMinutes: 2116, durationLabel: "Approx. 35 hours", journeyDays: 2, overnightStops: ["One night aboard"], distanceKm: 2122.45, trainType: "Long-distance Superliner train", reservationStatus: "required", shortDescription: "A one-night journey down the American West Coast, linking the Pacific Northwest, Cascades, northern California, the Bay Area, and Southern California.", status: "published", heroImageAlt: "Amtrak Coast Starlight at San Luis Obispo station", metadataDescription: "A curated guide to Amtrak’s Coast Starlight from Seattle to Los Angeles.", searchAliases: ["Amtrak", "Seattle", "Tacoma", "Portland", "Eugene", "Klamath Falls", "Dunsmuir", "Sacramento", "Oakland", "Emeryville", "San Jose", "Salinas", "San Luis Obispo", "Santa Barbara", "Los Angeles", "Cascades", "Pacific Coast", "California", "Oregon", "sleeper"], experienceTags: ["coast", "mountain-valleys", "forest", "rivers"], bestFor: ["a long Pacific Coast rail journey", "Cascades, California valleys, and the Santa Barbara coast", "one night of classic Amtrak travel"] },
  stops: [
    { id: "seattle", name: "Seattle", latitude: 47.5985, longitude: -122.3295, sequence: 1, distanceAlongRouteKm: 0 },
    { id: "portland", name: "Portland", latitude: 45.523, longitude: -122.676, sequence: 2, distanceAlongRouteKm: 280 },
    { id: "eugene", name: "Eugene", latitude: 43.996, longitude: -123.091, sequence: 3, distanceAlongRouteKm: 450 },
    { id: "klamath-falls", name: "Klamath Falls", latitude: 42.224, longitude: -121.736, sequence: 4, distanceAlongRouteKm: 690 },
    { id: "sacramento", name: "Sacramento", latitude: 38.586, longitude: -121.501, sequence: 5, distanceAlongRouteKm: 1180 },
    { id: "emeryville", name: "Emeryville", latitude: 37.798, longitude: -122.275, sequence: 6, distanceAlongRouteKm: 1310 },
    { id: "san-luis-obispo", name: "San Luis Obispo", latitude: 35.276, longitude: -120.654, sequence: 7, distanceAlongRouteKm: 1700 },
    { id: "santa-barbara", name: "Santa Barbara", latitude: 34.44, longitude: -119.7, sequence: 8, distanceAlongRouteKm: 1920 },
    { id: "los-angeles", name: "Los Angeles", latitude: 34.0562, longitude: -118.2365, sequence: 9, distanceAlongRouteKm: 2122.45 },
  ],
  landmarks: [
    { id: "cascades", name: "Cascade foothills", type: "mountain-pass", latitude: 43.5, longitude: -122.2, distanceAlongRouteKm: 560, shortDescription: "The line leaves the Willamette Valley for forested Cascade country and higher inland terrain.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "klamath", name: "Klamath country", type: "lake", latitude: 42.22, longitude: -121.74, distanceAlongRouteKm: 690, shortDescription: "Open high country around Klamath Falls marks a calmer, more spacious Oregon chapter.", importance: "highlight", bestSideForward: "both", bestSideReverse: "both" },
    { id: "dunsmuir", name: "Dunsmuir and Mount Shasta country", type: "mountain-pass", latitude: 41.3, longitude: -122.27, distanceAlongRouteKm: 850, shortDescription: "Northern California forest and volcanic mountain country frame the descent from Oregon.", importance: "dont-miss", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "bay", name: "San Francisco Bay approach", type: "scenic-section", latitude: 37.8, longitude: -122.27, distanceAlongRouteKm: 1310, shortDescription: "The journey reaches the Bay Area before turning south on California’s inland corridor.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "santa-barbara-coast", name: "Santa Barbara coast", type: "scenic-section", latitude: 34.42, longitude: -119.78, distanceAlongRouteKm: 1920, shortDescription: "The railway runs close to the Pacific for a memorable final daylight chapter near Santa Barbara.", importance: "dont-miss", bestSideForward: "right", bestSideReverse: "left" },
  ],
  timelineEntries: [
    { id: "portland", title: "Portland", subtitle: "Pacific Northwest to Oregon", distanceAlongRouteKm: 280, approximateJourneyMinutes: 240, type: "station", importance: "highlight", shortDescription: "A major stop before the route follows the Willamette Valley south." },
    { id: "cascades", title: "Cascade foothills", distanceAlongRouteKm: 560, approximateJourneyMinutes: 500, type: "mountain-pass", importance: "highlight", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "cascades", shortDescription: "Forest, curves, and changing terrain favor staying alert rather than choosing one permanent side." },
    { id: "klamath", title: "Klamath Falls", subtitle: "High Oregon country", distanceAlongRouteKm: 690, approximateJourneyMinutes: 650, type: "station", importance: "highlight", relatedLandmarkId: "klamath", shortDescription: "Daylight here depends on season and current timetable timing." },
    { id: "night", title: "Night aboard", subtitle: "Northern California", distanceAlongRouteKm: 950, approximateJourneyMinutes: 900, type: "journey-note", importance: "normal", shortDescription: "Part of the north–south journey is typically after dark; actual progress varies with operations." },
    { id: "bay", title: "San Francisco Bay approach", distanceAlongRouteKm: 1310, approximateJourneyMinutes: 1300, type: "scenic-section", importance: "highlight", relatedLandmarkId: "bay", shortDescription: "Emeryville is on the east side of the Bay; San Francisco is a separate onward connection." },
    { id: "san-luis", title: "San Luis Obispo", subtitle: "Central Coast", distanceAlongRouteKm: 1700, approximateJourneyMinutes: 1650, type: "station", importance: "highlight", shortDescription: "The landscape becomes drier as the train moves toward California’s central and southern coast." },
    { id: "santa-barbara", title: "Santa Barbara coast", subtitle: "Pacific window time", distanceAlongRouteKm: 1920, approximateJourneyMinutes: 1870, type: "scenic-section", importance: "dont-miss", bestSide: "right", bestSideReverse: "left", relatedLandmarkId: "santa-barbara-coast", shortDescription: "For Seattle-to-Los Angeles travel, the prepared coastal guidance favors the right side, subject to daylight and train orientation." },
  ],
  bestSideSegments: [
    { id: "northwest", startDistanceKm: 0, endDistanceKm: 850, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Forest, river valleys, and Cascade curves move the most open views between sides.", confidenceType: "limited-data" },
    { id: "california-inland", startDistanceKm: 850, endDistanceKm: 1800, forwardDirectionSide: "both", reverseDirectionSide: "both", reason: "The changing northern California, valley, and Bay Area landscape is worthwhile across both sides.", confidenceType: "limited-data" },
    { id: "santa-barbara", startDistanceKm: 1800, endDistanceKm: 2020, forwardDirectionSide: "right", reverseDirectionSide: "left", reason: "The prepared recommendation favors the ocean-facing side around Santa Barbara, but curves and time of day can reduce the view.", confidenceType: "limited-data" },
    { id: "la", startDistanceKm: 2020, endDistanceKm: 2122.45, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "The final urban approach changes orientation frequently.", confidenceType: "limited-data" },
  ],
  journeyInformation: [
    { id: "duration", label: "One night aboard", detail: "Amtrak’s current timetable presents a roughly 34–35 hour journey. Timings and daylight coverage can change." },
    { id: "reservation", label: "Reservation required", detail: "A confirmed ticket is required. Rallii does not publish fares, inventory, or availability." },
    { id: "onboard", label: "On board", detail: "Amtrak lists coach and sleeping accommodation plus food service; current onboard options can change." },
    { id: "coast", label: "Coast timing", detail: "The Santa Barbara coastal section is only useful if it falls in daylight, which varies by direction, season, and operating conditions." },
  ],
  sources: [
    { id: "amtrak", label: "Amtrak — Coast Starlight", category: "operator", url: "https://www.amtrak.com/routes/coast-starlight-train", note: "Official route identity, highlights, and station context." },
    { id: "timetable", label: "Amtrak — Coast Starlight timetable", category: "operator", url: "https://content.amtrak.com/content/timetable/Coast%20Starlight.pdf", note: "Current service context and representative duration; not treated as permanent schedule data." },
    { id: "osm", label: "OpenStreetMap relation 2812900", category: "railway-map", url: "https://www.openstreetmap.org/relation/2812900", note: "Prepared local route geometry based on the southbound passenger relation; © OpenStreetMap contributors, ODbL." },
    { id: "editorial", label: "Rallii guidance", category: "editorial", note: "Curated scenic sequence and cautious segment-level viewing guidance." },
  ],
  geoJsonPath: "/data/routes/coast-starlight.geojson", relatedRouteSlugs: ["california-zephyr", "west-highland-line"],
} satisfies RailRoute;
