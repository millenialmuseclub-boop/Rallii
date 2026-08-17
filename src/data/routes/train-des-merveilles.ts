import type { RailRoute } from "../../types/route.ts";

export const trainDesMerveillesRoute = {
  capabilities: { rideMode: false },
  summary: {
    id: "train-des-merveilles", slug: "train-des-merveilles", name: "Train des Merveilles", origin: "Nice", destination: "Tende", country: "France", countries: ["France"], journeyTypes: ["regional", "scenic", "mountain"], operator: "TER Sud / SNCF Voyageurs",
    durationMinutes: 130, durationLabel: "Approx. 2–2½ hours", distanceKm: 65.3, trainType: "Scheduled regional mountain train", reservationStatus: "not-required",
    shortDescription: "A remarkable regional climb from the Mediterranean city of Nice into the Roya Valley through viaducts, tunnels, and stone mountain villages.", status: "published",
    heroImageAlt: "A regional train on the mountain railway between Nice and Tende", metadataDescription: "A direction-aware guide to the Train des Merveilles from Nice to Tende.",
    searchAliases: ["Train of Wonders", "Nice Tende", "Nice Breil-sur-Roya", "Sospel", "Breil-sur-Roya", "Saorge", "La Brigue", "Tende", "Roya Valley", "French Riviera", "Alpes-Maritimes", "TER Sud", "SNCF", "France"],
    experienceTags: ["mountain-valleys", "viaducts", "tunnels", "villages"], bestFor: ["a mountain railway day trip from Nice", "viaducts, tunnels, and stone villages", "an ordinary regional train with extraordinary scenery"],
  },
  stops: [
    { id: "nice", name: "Nice", latitude: 43.7048, longitude: 7.2619, sequence: 1, distanceAlongRouteKm: 0 },
    { id: "sospel", name: "Sospel", latitude: 43.878, longitude: 7.448, sequence: 2, distanceAlongRouteKm: 39 },
    { id: "breil", name: "Breil-sur-Roya", latitude: 43.944, longitude: 7.517, sequence: 3, distanceAlongRouteKm: 49 },
    { id: "fontan-saorge", name: "Fontan–Saorge", latitude: 43.999, longitude: 7.552, sequence: 4, distanceAlongRouteKm: 56 },
    { id: "la-brigue", name: "La Brigue", latitude: 44.064, longitude: 7.605, sequence: 5, distanceAlongRouteKm: 62 },
    { id: "tende", name: "Tende", latitude: 44.0882, longitude: 7.5959, sequence: 6, distanceAlongRouteKm: 65.3 },
  ],
  landmarks: [
    { id: "paillon", name: "Paillon valley", type: "river", latitude: 43.76, longitude: 7.34, distanceAlongRouteKm: 15, shortDescription: "Urban Nice quickly gives way to a narrowing valley and the first mountain folds.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "sospel-spirals", name: "Sospel spiral tunnels", type: "tunnel", latitude: 43.87, longitude: 7.45, distanceAlongRouteKm: 38, shortDescription: "The line uses remarkable tunnel engineering to gain height around Sospel.", importance: "dont-miss", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "roya", name: "Roya Valley", type: "gorge", latitude: 43.97, longitude: 7.54, distanceAlongRouteKm: 52, shortDescription: "Cliffs, river, roads, and railway share a tight alpine corridor north of Breil.", importance: "dont-miss", bestSideForward: "right", bestSideReverse: "left" },
    { id: "saorge", name: "Saorge hillside village", type: "village", latitude: 43.988, longitude: 7.55, distanceAlongRouteKm: 55, shortDescription: "The stone village appears high above the valley during a brief open view.", importance: "dont-miss", bestSideForward: "right", bestSideReverse: "left" },
    { id: "tende-basin", name: "Tende mountain basin", type: "scenic-section", latitude: 44.08, longitude: 7.59, distanceAlongRouteKm: 64, shortDescription: "High valley slopes and clustered roofs frame the final approach.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
  ],
  timelineEntries: [
    { id: "nice-departure", title: "Leave the Mediterranean city", distanceAlongRouteKm: 8, type: "journey-note", importance: "normal", shortDescription: "The urban departure is brief; hills close around the line surprisingly quickly." },
    { id: "paillon", title: "Paillon valley", distanceAlongRouteKm: 15, type: "river", importance: "highlight", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "paillon", shortDescription: "Watch both sides as the railway begins its inland climb." },
    { id: "sospel", title: "Sospel and the spiral climb", distanceAlongRouteKm: 38, type: "tunnel", importance: "dont-miss", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "sospel-spirals", shortDescription: "Tunnels and changing orientation reveal how quickly the train gains height." },
    { id: "breil", title: "Breil-sur-Roya", distanceAlongRouteKm: 49, type: "station", importance: "highlight", shortDescription: "The railway turns north into the most concentrated Roya Valley scenery." },
    { id: "roya", title: "Roya Valley", distanceAlongRouteKm: 52, type: "gorge", importance: "dont-miss", bestSide: "right", bestSideReverse: "left", relatedLandmarkId: "roya", shortDescription: "Look right in the forward direction for river, cliff, and viaduct windows." },
    { id: "saorge", title: "Saorge reveal", distanceAlongRouteKm: 55, type: "village", importance: "dont-miss", bestSide: "right", bestSideReverse: "left", relatedLandmarkId: "saorge", shortDescription: "The hillside village appears quickly above the valley; be ready after Breil." },
    { id: "la-brigue", title: "La Brigue", distanceAlongRouteKm: 62, type: "village", importance: "highlight", shortDescription: "Stone roofs and higher valley scenery signal the approach to Tende." },
  ],
  bestSideSegments: [
    { id: "nice-sospel", startDistanceKm: 0, endDistanceKm: 40, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "The railway changes direction through valleys and spiral tunnels.", confidenceType: "limited-data" },
    { id: "roya-valley", startDistanceKm: 40, endDistanceKm: 59, forwardDirectionSide: "right", reverseDirectionSide: "left", reason: "The most useful forward-direction views into the Roya gorge and toward Saorge are generally on the east side.", confidenceType: "limited-data" },
    { id: "upper-valley", startDistanceKm: 59, endDistanceKm: 65.3, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Village and mountain-basin views are shared across both sides.", confidenceType: "limited-data" },
  ],
  journeyInformation: [
    { id: "service", label: "Regional service", detail: "This is a public TER railway, not a separate luxury train. Journey times, stopping patterns, and engineering works can change." },
    { id: "commentary", label: "Onboard commentary", detail: "Commented Train des Merveilles services operate on selected dates and trains. Confirm current availability with TER Sud." },
    { id: "reservation", label: "Reservations", detail: "Standard regional seating is generally unreserved. Check the operator for the travel date and do not rely on Rallii for fares or availability." },
    { id: "conditions", label: "Mountain conditions", detail: "Weather, daylight, and infrastructure disruption can affect the upper Roya Valley. Check live operator advice before departure." },
  ],
  sources: [
    { id: "ter", label: "TER Sud — Train des Merveilles", category: "operator", url: "https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/decouvrir/trains-touristiques/train-merveilles-english-version", note: "Official route identity, landscape, engineering, and commentary context." },
    { id: "tourism", label: "Côte d’Azur France — Train des Merveilles", category: "tourism", url: "https://cotedazurfrance.com/to-do/visit/trains-touristiques/train-des-merveilles/", note: "Regional destination and village context." },
    { id: "osm", label: "OpenStreetMap relation 1059561", category: "railway-map", url: "https://www.openstreetmap.org/relation/1059561", note: "Prepared Nice–Tende railway geometry under ODbL." },
  ],
  geoJsonPath: "/data/routes/train-des-merveilles.geojson",
} satisfies RailRoute;
