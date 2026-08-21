import type { RailRoute } from "../../types/route.ts";

export const raumaLineRoute = {
  capabilities: { rideMode: false },
  summary: {
    id: "rauma-line", slug: "rauma-line", name: "Rauma Line", origin: "Dombås", destination: "Åndalsnes", country: "Norway", countries: ["Norway"], journeyTypes: ["scenic", "mountain", "regional"], operator: "SJ Norge", durationMinutes: 100, durationLabel: "Approx. 1 hr 40 min", distanceKm: 113.01, trainType: "Scheduled regional railway", reservationStatus: "recommended",
    shortDescription: "A compact Norwegian mountain railway following the Rauma valley from Dombås through Bjorli and dramatic Romsdalen to Åndalsnes.", status: "published", heroImageAlt: "Åndalsnes station at the western end of the Rauma Line beneath the Romsdal mountains", metadataDescription: "A curated guide to Norway's Rauma Line from Dombås to Åndalsnes, including Romsdalen, Kylling Bridge, Trollveggen, and direction-aware viewing guidance.", searchAliases: ["Raumabanen", "Dombås", "Åndalsnes", "Romsdalen", "Rauma River", "Bjorli", "Verma", "Kylling Bridge", "Trollveggen", "SJ Norge", "Norway", "mountain", "river"], experienceTags: ["mountain-valleys", "rivers", "bridges", "tunnels"], bestFor: ["a compact Norwegian mountain journey", "Romsdalen's river and cliff scenery", "pairing with a wider Norway rail trip"],
  },
  stops: [
    { id: "dombas", name: "Dombås", latitude: 62.0681979, longitude: 9.125548, sequence: 1, distanceAlongRouteKm: 0 },
    { id: "lesja", name: "Lesja", latitude: 62.1186798, longitude: 8.8540321, sequence: 2, distanceAlongRouteKm: 16.8 },
    { id: "bjorli", name: "Bjorli", latitude: 62.2585745, longitude: 8.2010274, sequence: 3, distanceAlongRouteKm: 56.1 },
    { id: "verma", name: "Verma", latitude: 62.3469978, longitude: 8.0585983, sequence: 4, distanceAlongRouteKm: 79.3 },
    { id: "andalsnes", name: "Åndalsnes", latitude: 62.5671705, longitude: 7.6924473, sequence: 5, distanceAlongRouteKm: 113.01 },
  ],
  landmarks: [
    { id: "lesjaskogsvatnet", name: "Lesjaskogsvatnet", type: "lake", latitude: 62.207, longitude: 8.642, distanceAlongRouteKm: 32.8, shortDescription: "The line runs beside the long mountain lake before the landscape narrows toward Bjorli.", importance: "highlight", bestSideForward: "both", bestSideReverse: "both" },
    { id: "rauma-river", name: "Rauma River", type: "river", latitude: 62.429, longitude: 8.129, distanceAlongRouteKm: 67, shortDescription: "Below Bjorli, the route begins following the Rauma through increasingly steep valley country.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "kylling-bridge", name: "Kylling Bridge", type: "bridge", latitude: 62.511, longitude: 8.017, distanceAlongRouteKm: 88.2, shortDescription: "The railway crosses a high stone bridge above the Rauma in the heart of Romsdalen.", importance: "dont-miss", bestSideForward: "both", bestSideReverse: "both" },
    { id: "trollveggen", name: "Trollveggen", type: "mountain-pass", latitude: 62.516, longitude: 7.99, distanceAlongRouteKm: 92, shortDescription: "When cloud clears, the high cliff faces around Trollveggen define the valley's most dramatic chapter.", importance: "dont-miss", bestSideForward: "right", bestSideReverse: "left" },
    { id: "romsdalen", name: "Romsdalen", type: "scenic-section", latitude: 62.548, longitude: 7.83, distanceAlongRouteKm: 103, shortDescription: "River, forest, rocky walls, and sharp mountain profiles lead the train toward Åndalsnes.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
  ],
  timelineEntries: [
    { id: "lesja", title: "Lesja", subtitle: "Into the mountain interior", distanceAlongRouteKm: 16.8, approximateJourneyMinutes: 15, type: "station", importance: "normal", shortDescription: "The broad valley gradually opens into higher, quieter country." },
    { id: "lesjaskogsvatnet", title: "Lesjaskogsvatnet", subtitle: "Lake and high valley", distanceAlongRouteKm: 32.8, approximateJourneyMinutes: 28, type: "lake", importance: "highlight", bestSide: "both", relatedLandmarkId: "lesjaskogsvatnet", shortDescription: "Watch both sides around the lake; the perspective shifts as the line curves west." },
    { id: "bjorli", title: "Bjorli", subtitle: "The Romsdal descent begins", distanceAlongRouteKm: 56.1, approximateJourneyMinutes: 48, type: "station", importance: "highlight", shortDescription: "After Bjorli, the landscape tightens and the river becomes a stronger companion." },
    { id: "rauma-river", title: "Rauma River", subtitle: "River valley scenery", distanceAlongRouteKm: 67, approximateJourneyMinutes: 58, type: "river", importance: "highlight", bestSide: "varies", relatedLandmarkId: "rauma-river", shortDescription: "Keep looking through the curves; river views move from side to side." },
    { id: "kylling-bridge", title: "Kylling Bridge", subtitle: "A stone crossing above the Rauma", distanceAlongRouteKm: 88.2, approximateJourneyMinutes: 76, type: "bridge", importance: "dont-miss", bestSide: "both", relatedLandmarkId: "kylling-bridge", shortDescription: "Be ready before the bridge: it is a brief, memorable piece of mountain railway engineering." },
    { id: "trollveggen", title: "Trollveggen", subtitle: "Cliffs above the valley", distanceAlongRouteKm: 92, approximateJourneyMinutes: 80, type: "mountain-pass", importance: "dont-miss", bestSide: "right", bestSideReverse: "left", relatedLandmarkId: "trollveggen", shortDescription: "Cloud can hide the wall, but a clear window rewards the outward-facing side of the valley." },
    { id: "romsdalen", title: "Romsdalen", subtitle: "The final valley", distanceAlongRouteKm: 103, approximateJourneyMinutes: 90, type: "scenic-section", importance: "highlight", bestSide: "varies", relatedLandmarkId: "romsdalen", shortDescription: "Mountains, forest, and river scenes alternate rapidly into Åndalsnes." },
  ],
  bestSideSegments: [
    { id: "dombas-bjorli", startDistanceKm: 0, endDistanceKm: 56.1, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Open valley and lake views shift with the gently curving alignment.", confidenceType: "limited-data" },
    { id: "bjorli-verma", startDistanceKm: 56.1, endDistanceKm: 79.3, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "The Rauma and valley slopes alternate around repeated bends.", confidenceType: "limited-data" },
    { id: "trollveggen-window", startDistanceKm: 79.3, endDistanceKm: 103, forwardDirectionSide: "right", reverseDirectionSide: "left", reason: "This orientation can favor cliff and mountain-wall views through parts of Romsdalen, though curves and weather matter.", confidenceType: "limited-data" },
    { id: "andalsnes-approach", startDistanceKm: 103, endDistanceKm: 113.01, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "The final valley approach changes quickly between river, forest, and mountain views.", confidenceType: "limited-data" },
  ],
  journeyInformation: [
    { id: "duration", label: "Journey time", detail: "The representative journey is around one hour and forty minutes. Check the operator for the chosen departure, as timings can change." },
    { id: "reservations", label: "Reservations", detail: "Seat arrangements can vary by departure. Check the current operator booking flow before travel, particularly in busier seasons." },
    { id: "daylight", label: "Seasonal daylight", detail: "Winter daylight can be short, while snow and low cloud may substantially change the mountain views." },
    { id: "weather", label: "Mountain conditions", detail: "The Rauma valley is scenic in changing weather, but cloud can obscure the highest cliffs and affect operations." },
    { id: "connections", label: "At Dombås and Åndalsnes", detail: "Plan onward connections independently. This guide is an experience layer, not a timetable or connection guarantee." },
  ],
  sources: [
    { id: "rauma-osm", label: "OpenStreetMap", category: "railway-map", url: "https://www.openstreetmap.org/relation/950560", note: "Prepared from the Rauma Line relation 950560; 403 contributing railway ways and 3,451 coordinates; © OpenStreetMap contributors, ODbL." },
    { id: "rauma-sj", label: "SJ Norge", category: "operator", url: "https://www.sj.no/en/", note: "Current operator and service context; schedules and service arrangements can change." },
    { id: "rauma-visit-norway", label: "Visit Norway — Rauma Railway", category: "tourism", url: "https://www.visitnorway.com/plan-your-trip/getting-around/by-train/rauma-railway/", note: "Scenic and regional context for Romsdalen and the railway journey." },
    { id: "rauma-rallii", label: "Rallii guidance", category: "editorial", note: "Prepared scenic sequencing and deliberately cautious direction-aware viewing guidance." },
  ],
  geoJsonPath: "/data/routes/rauma-line.geojson", relatedRouteSlugs: ["bergen-line", "flam-railway"],
} satisfies RailRoute;
