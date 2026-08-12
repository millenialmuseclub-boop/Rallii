import type { RailRoute } from "../../types/route.ts";

export const cinqueTerreRoute = {
  capabilities: { rideMode: false },
  summary: {
    id: "cinque-terre", slug: "cinque-terre", name: "Cinque Terre", origin: "La Spezia Centrale", destination: "Levanto", country: "Italy", countries: ["Italy"], journeyTypes: ["scenic", "regional", "coastal"], operator: "Trenitalia", durationMinutes: 30, durationLabel: "Approx. 25–35 min", distanceKm: 21.41, trainType: "Coastal regional rail journey", reservationStatus: "not-required",
    shortDescription: "A quick regional railway journey through the five Cinque Terre villages, where tunnels give way to brief views of the Ligurian coast.", status: "published", heroImageAlt: "Editorial route motif for the Cinque Terre railway from La Spezia to Levanto", metadataDestination: "Levanto", metadataDescription: "A curated guide to the coastal railway from La Spezia to Levanto through all five Cinque Terre villages.", searchAliases: ["Cinqueterre", "Cinque Terre railway", "Liguria", "5 Terre Express"], experienceTags: ["coast", "villages", "tunnels"], bestFor: ["dramatic coastal village scenery", "a short, concentrated rail experience", "exploring Cinque Terre without a car"],
  },
  stops: [
    { id: "la-spezia-centrale", name: "La Spezia Centrale", latitude: 44.1115265, longitude: 9.8135573, sequence: 1, distanceAlongRouteKm: 0, shortDescription: "Gateway departure for the Cinque Terre coast." },
    { id: "riomaggiore", name: "Riomaggiore", latitude: 44.0991393, longitude: 9.7379371, sequence: 2, distanceAlongRouteKm: 7.37 },
    { id: "manarola", name: "Manarola", latitude: 44.1069752, longitude: 9.7283587, sequence: 3, distanceAlongRouteKm: 8.57 },
    { id: "corniglia", name: "Corniglia", latitude: 44.12023, longitude: 9.7100396, sequence: 4, distanceAlongRouteKm: 10.91 },
    { id: "vernazza", name: "Vernazza", latitude: 44.1355387, longitude: 9.6837693, sequence: 5, distanceAlongRouteKm: 13.63 },
    { id: "monterosso", name: "Monterosso", latitude: 44.1462789, longitude: 9.6548512, sequence: 6, distanceAlongRouteKm: 16.33 },
    { id: "levanto", name: "Levanto", latitude: 44.1755025, longitude: 9.612572, sequence: 7, distanceAlongRouteKm: 21.41, shortDescription: "Northern endpoint beyond the five villages." },
  ],
  landmarks: [
    { id: "riomaggiore-reveal", name: "Riomaggiore coastal reveal", type: "scenic-section", latitude: 44.101, longitude: 9.744, distanceAlongRouteKm: 6.8, shortDescription: "The first quick opening toward the sea arrives as the railway emerges near Riomaggiore.", importance: "highlight", bestSideForward: "left", bestSideReverse: "right" },
    { id: "manarola-corniglia", name: "Manarola–Corniglia coast", type: "scenic-section", latitude: 44.113, longitude: 9.719, distanceAlongRouteKm: 9.7, shortDescription: "A brief open section between tunnels reveals steep vineyard slopes and the Ligurian Sea.", importance: "dont-miss", bestSideForward: "left", bestSideReverse: "right" },
    { id: "vernazza-approach", name: "Vernazza approach", type: "village", latitude: 44.1345, longitude: 9.687, distanceAlongRouteKm: 13.3, shortDescription: "The village and narrow coastal setting appear quickly on the station approach.", importance: "dont-miss", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "monterosso-coast", name: "Monterosso coastline", type: "scenic-section", latitude: 44.1459, longitude: 9.658, distanceAlongRouteKm: 16.1, shortDescription: "One of the corridor’s broader coastal openings arrives around Monterosso.", importance: "highlight", bestSideForward: "left", bestSideReverse: "right" },
  ],
  timelineEntries: [
    { id: "timeline-riomaggiore", title: "Riomaggiore", subtitle: "First Cinque Terre village", reverseSubtitle: "Final Cinque Terre village", distanceAlongRouteKm: 7.37, type: "station", importance: "highlight", bestSide: "left", relatedLandmarkId: "riomaggiore-reveal", shortDescription: "Be ready after the long approach tunnel: the village and sea appear quickly.", reverseShortDescription: "The final village and sea appear quickly before the longer tunnel toward La Spezia." },
    { id: "timeline-manarola", title: "Manarola", subtitle: "A quick village arrival", distanceAlongRouteKm: 8.57, type: "station", importance: "highlight", shortDescription: "The next station follows almost immediately, with little time between tunnel and platform." },
    { id: "timeline-open-coast", title: "Brief coastal window", subtitle: "Manarola to Corniglia", reverseSubtitle: "Corniglia to Manarola", distanceAlongRouteKm: 9.7, type: "scenic-section", importance: "dont-miss", bestSide: "left", relatedLandmarkId: "manarola-corniglia", shortDescription: "Look toward the sea as the railway briefly returns to open coastline between tunnels." },
    { id: "timeline-corniglia", title: "Corniglia", subtitle: "Below the hilltop village", distanceAlongRouteKm: 10.91, type: "station", importance: "normal", shortDescription: "The station sits below the elevated village; the surrounding slopes are more visible than the village centre." },
    { id: "timeline-vernazza", title: "Vernazza", subtitle: "Village approach", distanceAlongRouteKm: 13.63, type: "village", importance: "dont-miss", bestSide: "varies", relatedLandmarkId: "vernazza-approach", shortDescription: "Look up promptly as the tight coastal settlement appears around the station approach." },
    { id: "timeline-monterosso", title: "Monterosso", subtitle: "The coast opens", distanceAlongRouteKm: 16.33, type: "scenic-section", importance: "highlight", bestSide: "left", relatedLandmarkId: "monterosso-coast", shortDescription: "A broader sea view and beachfront setting provide the journey’s longest coastal pause." },
  ],
  bestSideSegments: [
    { id: "riomaggiore-manarola", startDistanceKm: 6.5, endDistanceKm: 9, forwardDirectionSide: "left", reverseDirectionSide: "right", reason: "The seaward side generally offers the clearest brief openings, interrupted by tunnels and curves.", confidenceType: "limited-data" },
    { id: "manarola-vernazza", startDistanceKm: 9, endDistanceKm: 14, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Short tunnel portals, curves, and village approaches make timing more dependable than a single side.", confidenceType: "limited-data" },
    { id: "vernazza-monterosso", startDistanceKm: 14, endDistanceKm: 17, forwardDirectionSide: "left", reverseDirectionSide: "right", reason: "The sea is generally on this side when the tunnel-heavy railway opens toward the coast.", confidenceType: "limited-data" },
  ],
  journeyInformation: [
    { id: "regional-service", label: "The service", detail: "This guide covers the regional railway corridor, not one premium train product. Individual trains and stopping patterns vary." },
    { id: "seasonal-service", label: "5 Terre Express", detail: "Trenitalia operates additional seasonal regional services between La Spezia and Levanto in 2026. Check current dates and schedules before travel." },
    { id: "tickets", label: "Tickets", detail: "Regional services do not use reserved seats. Travel with the correct regional ticket and follow current validation rules." },
    { id: "train-card", label: "Cinque Terre Train Card", detail: "The National Park’s Train Card includes regional rail travel on the La Spezia–Levanto corridor together with Park services; conditions can change." },
    { id: "viewing", label: "When to look", detail: "Much of the line is in tunnel. Keep the timeline close: the strongest coastal views can last only seconds." },
  ],
  sources: [
    { id: "cinque-osm", label: "OpenStreetMap", category: "railway-map", url: "https://www.openstreetmap.org/", note: "Prepared from 56 RFI-operated main-line railway ways; © OpenStreetMap contributors, ODbL." },
    { id: "cinque-trenitalia", label: "Trenitalia — Travel around 5 Terre", category: "operator", url: "https://www.trenitalia.com/en/connections/travel-around-5-terre.html", note: "Current 2026 seasonal service context, corridor, stations, and regional travel information." },
    { id: "cinque-park", label: "Parco Nazionale delle Cinque Terre", category: "tourism", url: "https://www.parconazionale5terre.it/", note: "Official park geography, rail access, and Cinque Terre Train Card context." },
    { id: "cinque-rallii", label: "Rallii guidance", category: "editorial", note: "Curated scenic-window sequencing and deliberately cautious directional viewing guidance." },
  ],
  geoJsonPath: "/data/routes/cinque-terre.geojson", relatedRouteSlugs: ["flam-railway", "west-highland-line"],
} satisfies RailRoute;
