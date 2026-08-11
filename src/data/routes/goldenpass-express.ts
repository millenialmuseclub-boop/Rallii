import type { RailRoute } from "../../types/route.ts";

export const goldenPassExpressRoute = {
  summary: {
    id: "goldenpass-express", slug: "goldenpass-express", name: "GoldenPass Express", origin: "Montreux", destination: "Interlaken Ost", country: "Switzerland",
    countries: ["Switzerland"], journeyTypes: ["panoramic", "alpine", "scenic"], operator: "Montreux Oberland Bernois (MOB) / BLS",
    durationMinutes: 195, distanceKm: 115.34, trainType: "Direct panoramic express", reservationStatus: "recommended",
    shortDescription: "A direct panoramic journey from Lake Geneva through the Pays-d’Enhaut and Saanenland to Lake Thun and the Bernese Oberland.",
    status: "published", heroImageAlt: "GoldenPass Express crossing the Swiss landscape between Montreux and Interlaken", metadataDestination: "Interlaken",
  },
  stops: [
    { id: "montreux", name: "Montreux", latitude: 46.4360985, longitude: 6.9108208, sequence: 1, distanceAlongRouteKm: 0, shortDescription: "Departure above Lake Geneva." },
    { id: "montbovon", name: "Montbovon", latitude: 46.4858742, longitude: 7.0427472, sequence: 2, distanceAlongRouteKm: 22 },
    { id: "chateau-doex", name: "Château-d’Oex", latitude: 46.4745787, longitude: 7.1306325, sequence: 3, distanceAlongRouteKm: 32.3, shortDescription: "A principal stop in the Pays-d’Enhaut." },
    { id: "gstaad", name: "Gstaad", latitude: 46.4747901, longitude: 7.2842686, sequence: 4, distanceAlongRouteKm: 45.6 },
    { id: "zweisimmen", name: "Zweisimmen", latitude: 46.5530661, longitude: 7.3749392, sequence: 5, distanceAlongRouteKm: 62.2 },
    { id: "spiez", name: "Spiez", latitude: 46.6858694, longitude: 7.6798623, sequence: 6, distanceAlongRouteKm: 97.1 },
    { id: "interlaken-ost", name: "Interlaken Ost", latitude: 46.6911195, longitude: 7.8697217, sequence: 7, distanceAlongRouteKm: 115.1, shortDescription: "Arrival in the Bernese Oberland." },
  ],
  landmarks: [
    { id: "lake-geneva-slopes", name: "Lake Geneva slopes", type: "scenic-section", latitude: 46.447, longitude: 6.925, distanceAlongRouteKm: 4, shortDescription: "The railway climbs quickly above Montreux, opening changing glimpses over the lake and Riviera.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "pays-denhaut", name: "Pays-d’Enhaut", type: "scenic-section", latitude: 46.477, longitude: 7.115, distanceAlongRouteKm: 30, shortDescription: "Pastures, wooded slopes, and villages shape the quieter middle of the western section.", importance: "dont-miss", bestSideForward: "both", bestSideReverse: "both" },
    { id: "saanenland", name: "Gstaad & Saanenland", type: "village", latitude: 46.4747901, longitude: 7.2842686, distanceAlongRouteKm: 45.6, shortDescription: "The journey crosses the broad Saanenland landscape around Gstaad.", importance: "highlight", bestSideForward: "both", bestSideReverse: "both" },
    { id: "lake-thun", name: "Lake Thun", type: "lake", latitude: 46.69, longitude: 7.77, distanceAlongRouteKm: 105, shortDescription: "Beyond Spiez, the railway follows the southern shore toward Interlaken with lake and mountain views.", importance: "dont-miss", bestSideForward: "left", bestSideReverse: "right" },
  ],
  timelineEntries: [
    { id: "timeline-lake-geneva", title: "Climbing from Montreux", subtitle: "Lake Geneva slopes", distanceAlongRouteKm: 4, approximateJourneyMinutes: 12, type: "scenic-section", importance: "highlight", bestSide: "varies", relatedLandmarkId: "lake-geneva-slopes", shortDescription: "Look back as the line rises from the Riviera into wooded slopes." },
    { id: "timeline-pays-denhaut", title: "Through the Pays-d’Enhaut", distanceAlongRouteKm: 30, approximateJourneyMinutes: 62, type: "scenic-section", importance: "dont-miss", bestSide: "both", relatedLandmarkId: "pays-denhaut", shortDescription: "The landscape settles into pasture, forest, and traditional villages." },
    { id: "timeline-gstaad", title: "Gstaad", subtitle: "Saanenland", distanceAlongRouteKm: 45.6, approximateJourneyMinutes: 90, type: "village", importance: "highlight", bestSide: "both", relatedLandmarkId: "saanenland", shortDescription: "A broad mountain-valley setting frames one of the route’s best-known stops." },
    { id: "timeline-zweisimmen", title: "Changing track gauge", subtitle: "Zweisimmen", distanceAlongRouteKm: 62.2, approximateJourneyMinutes: 118, type: "station", importance: "highlight", shortDescription: "The same carriages continue as their variable-gauge bogies move from metre gauge to standard gauge." },
    { id: "timeline-lake-thun", title: "Along Lake Thun", distanceAlongRouteKm: 105, approximateJourneyMinutes: 174, type: "lake", importance: "dont-miss", bestSide: "left", relatedLandmarkId: "lake-thun", shortDescription: "The final approach pairs the lake with the mountains of the Bernese Oberland." },
  ],
  bestSideSegments: [
    { id: "riviera-climb", startDistanceKm: 1, endDistanceKm: 12, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Curves above Montreux shift lake glimpses between sides.", confidenceType: "limited-data" },
    { id: "pays-denhaut-views", startDistanceKm: 22, endDistanceKm: 52, forwardDirectionSide: "both", reverseDirectionSide: "both", reason: "The pastoral valleys and villages open on both sides.", confidenceType: "editorial" },
    { id: "simmental", startDistanceKm: 62, endDistanceKm: 96, forwardDirectionSide: "both", reverseDirectionSide: "both", reason: "Valley scenery changes continually across both windows.", confidenceType: "limited-data" },
    { id: "lake-thun-approach", startDistanceKm: 98, endDistanceKm: 113, forwardDirectionSide: "left", reverseDirectionSide: "right", reason: "This side faces Lake Thun on the approach to Interlaken.", confidenceType: "editorial" },
  ],
  journeyInformation: [
    { id: "direct", label: "Direct journey", detail: "The service runs from Montreux to Interlaken Ost without a train change." },
    { id: "reservation", label: "Seat reservation", detail: "Recommended in 1st and 2nd class and required in Prestige class." },
    { id: "classes", label: "On board", detail: "Panoramic windows in 2nd, 1st, and Prestige class, with food and drinks served at the seat." },
    { id: "luggage", label: "Luggage", detail: "Luggage and ski racks are available in the carriages." },
  ],
  sources: [
    { id: "gpx-osm", label: "OpenStreetMap", category: "railway-map", url: "https://www.openstreetmap.org/copyright", note: "Prepared from MOB and BLS railway ways; © OpenStreetMap contributors, ODbL." },
    { id: "gpx-official", label: "GoldenPass Express", category: "operator", url: "https://www.gpx.swiss/en/", note: "Official direct-service, duration, class, and variable-gauge information." },
    { id: "gpx-bls", label: "BLS", category: "operator", url: "https://www.bls.ch/en/freizeit-und-ferien/ausfluege/mob-goldenpass-express", note: "Official distance, reservation, onboard, and service information." },
    { id: "gpx-rallii", label: "Rallii guidance", category: "editorial", note: "Curated timeline and cautious seat-view guidance derived from route geography." },
  ],
  geoJsonPath: "/data/routes/goldenpass-express.geojson",
} satisfies RailRoute;
