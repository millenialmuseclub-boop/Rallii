import type { RailRoute } from "../../types/route.ts";

export const kandyEllaRailwayRoute = {
  capabilities: { rideMode: false },
  summary: { id: "kandy-ella-railway", slug: "kandy-ella-railway", name: "Kandy–Ella Railway", origin: "Kandy", destination: "Ella", country: "Sri Lanka", countries: ["Sri Lanka"], journeyTypes: ["scenic", "mountain", "highlands"], operator: "Sri Lanka Railways", durationMinutes: 420, durationLabel: "Approx. 6–8 hours", distanceKm: 114.72, trainType: "Scheduled highland railway", reservationStatus: "recommended", shortDescription: "A slow climb through Sri Lanka’s central highlands, between Kandy, tea country, misty ridges, and Ella.", status: "published", heroImageAlt: "Railway track in the Sri Lankan highlands between Kandy and Ella", metadataDescription: "A curated guide to the Kandy–Ella Railway through Sri Lanka’s central highlands.", searchAliases: ["Kandy Ella", "Kandy to Ella", "Sri Lanka Railways", "Hill Country Line", "Main Line", "Peradeniya", "Nawalapitiya", "Hatton", "Nanu Oya", "Haputale", "Nine Arch Bridge", "tea country", "highlands", "Sri Lanka"], experienceTags: ["highlands", "mountain-valleys", "bridges", "forest"], bestFor: ["Sri Lanka’s tea-country landscapes", "a slow, daylight rail day", "combining Kandy, Nuwara Eliya, and Ella"] },
  stops: [
    { id: "kandy", name: "Kandy", latitude: 7.2906, longitude: 80.6337, sequence: 1, distanceAlongRouteKm: 0 },
    { id: "peradeniya", name: "Peradeniya Junction", latitude: 7.266, longitude: 80.596, sequence: 2, distanceAlongRouteKm: 7 },
    { id: "gampola", name: "Gampola", latitude: 7.162, longitude: 80.567, sequence: 3, distanceAlongRouteKm: 25 },
    { id: "nawalapitiya", name: "Nawalapitiya", latitude: 7.049, longitude: 80.536, sequence: 4, distanceAlongRouteKm: 42 },
    { id: "hatton", name: "Hatton", latitude: 6.895, longitude: 80.572, sequence: 5, distanceAlongRouteKm: 65 },
    { id: "nanu-oya", name: "Nanu Oya", latitude: 6.95, longitude: 80.741, sequence: 6, distanceAlongRouteKm: 82 },
    { id: "haputale", name: "Haputale", latitude: 6.77, longitude: 80.952, sequence: 7, distanceAlongRouteKm: 100 },
    { id: "ella", name: "Ella", latitude: 6.8762, longitude: 81.0475, sequence: 8, distanceAlongRouteKm: 114.72 },
  ],
  landmarks: [
    { id: "mahaweli", name: "Mahaweli valley", type: "river", latitude: 7.2, longitude: 80.58, distanceAlongRouteKm: 17, shortDescription: "The railway leaves Kandy’s basin and begins its hill-country climb through humid valleys.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "tea-country", name: "Tea country", type: "scenic-section", latitude: 6.99, longitude: 80.57, distanceAlongRouteKm: 50, shortDescription: "Tea estates, forest, and steep cultivated slopes define the central part of the journey.", importance: "dont-miss", bestSideForward: "both", bestSideReverse: "both" },
    { id: "nanu-oya", name: "Nanu Oya highlands", type: "station", latitude: 6.95, longitude: 80.741, distanceAlongRouteKm: 82, shortDescription: "The highland stop for the Nuwara Eliya area, surrounded by cooler, open country.", importance: "highlight", bestSideForward: "both", bestSideReverse: "both" },
    { id: "haputale-ridge", name: "Haputale ridge", type: "mountain-pass", latitude: 6.8, longitude: 80.91, distanceAlongRouteKm: 96, shortDescription: "Ridge-top curves and breaks in the vegetation create changing views toward the southern lowlands.", importance: "dont-miss", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "ella-approach", name: "Ella approach", type: "scenic-section", latitude: 6.85, longitude: 81.01, distanceAlongRouteKm: 108, shortDescription: "The final approach is shaped by forested slopes, tunnels, bridges, and the highland air around Ella.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
  ],
  timelineEntries: [
    { id: "peradeniya", title: "Peradeniya Junction", subtitle: "The highland route begins", distanceAlongRouteKm: 7, approximateJourneyMinutes: 25, type: "station", importance: "normal", shortDescription: "After the junction, the railway commits to the slower climb toward the central highlands." },
    { id: "gampola", title: "Gampola and the valley climb", distanceAlongRouteKm: 25, approximateJourneyMinutes: 100, type: "scenic-section", importance: "highlight", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "mahaweli", shortDescription: "Curves and hillside alignment make both windows worthwhile as the valley narrows." },
    { id: "tea", title: "Tea country", subtitle: "Forest, estates, and cloud", distanceAlongRouteKm: 50, approximateJourneyMinutes: 220, type: "scenic-section", importance: "dont-miss", bestSide: "both", relatedLandmarkId: "tea-country", shortDescription: "Keep looking across both sides; the wider experience is the changing highland landscape." },
    { id: "hatton", title: "Hatton", subtitle: "Central highlands", distanceAlongRouteKm: 65, approximateJourneyMinutes: 300, type: "station", importance: "highlight", shortDescription: "A useful marker for the cooler, higher section of the trip." },
    { id: "nanu", title: "Nanu Oya", subtitle: "Nuwara Eliya gateway", distanceAlongRouteKm: 82, approximateJourneyMinutes: 390, type: "station", importance: "highlight", relatedLandmarkId: "nanu-oya", shortDescription: "Services, stop lengths, and onward connections vary by train and date." },
    { id: "haputale", title: "Haputale ridge", distanceAlongRouteKm: 96, approximateJourneyMinutes: 500, type: "mountain-pass", importance: "dont-miss", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "haputale-ridge", shortDescription: "Be ready for brief openings in the vegetation rather than one continuous fixed-side panorama." },
    { id: "ella", title: "Ella approach", subtitle: "Tunnels and highland slopes", distanceAlongRouteKm: 108, approximateJourneyMinutes: 600, type: "scenic-section", importance: "highlight", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "ella-approach", shortDescription: "The last stretch rewards staying alert through curves, tree cover, bridges, and tunnels." },
  ],
  bestSideSegments: [
    { id: "kandy-nawalapitiya", startDistanceKm: 0, endDistanceKm: 42, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Valley curves and the climbing alignment repeatedly move views between sides.", confidenceType: "limited-data" },
    { id: "tea-country", startDistanceKm: 42, endDistanceKm: 82, forwardDirectionSide: "both", reverseDirectionSide: "both", reason: "Tea estates and highland scenery are rewarding from either side through the central section.", confidenceType: "limited-data" },
    { id: "nanu-oya-ella", startDistanceKm: 82, endDistanceKm: 114.72, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Ridge curves, tree cover, bridges, and tunnels make timing more useful than a fixed seat side.", confidenceType: "limited-data" },
  ],
  journeyInformation: [
    { id: "service", label: "Choose a daylight service", detail: "Sri Lanka Railways’ exact trains, times, and service pattern can change. Check the official schedule for the chosen travel date." },
    { id: "reservations", label: "Reservations", detail: "Reserved seating is useful on popular departures, but availability and classes differ by train. Rallii does not publish fares or inventory." },
    { id: "weather", label: "Weather and visibility", detail: "Cloud, rain, mist, and seasonal daylight materially change the views. Treat every scenic moment as weather-dependent." },
    { id: "journey", label: "A slower railway day", detail: "This is a scheduled railway, not a dedicated sightseeing train. Stopping patterns and journey time vary by service." },
  ],
  sources: [
    { id: "slr", label: "Sri Lanka Railways — schedule service", category: "operator", url: "https://www.eservices.railway.gov.lk/schedule/homeAction.action?lag=en", note: "Official date-specific timetable lookup." },
    { id: "slr-main", label: "Sri Lanka Railways", category: "operator", url: "https://railway.gov.lk/web/index.php/en/schedules", note: "Official railway service and notice context." },
    { id: "tourism", label: "Sri Lanka Tourism — Ella", category: "tourism", url: "https://srilanka.travel/attraction?attraction_id=154", note: "Official tourism context for Ella and its rail connection." },
    { id: "osm", label: "OpenStreetMap railway data", category: "railway-map", url: "https://www.openstreetmap.org/", note: "Prepared local route corridor; © OpenStreetMap contributors, ODbL." },
    { id: "editorial", label: "Rallii guidance", category: "editorial", note: "Prepared scenic sequence and cautious segment-level viewing guidance." },
  ],
  geoJsonPath: "/data/routes/kandy-ella-railway.geojson", relatedRouteSlugs: ["tranzalpine", "kurobe-gorge-railway"],
} satisfies RailRoute;
