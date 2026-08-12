import type { RailRoute } from "../../types/route.ts";

export const douroLineRoute = {
  capabilities: { rideMode: false },
  summary: { id: "douro-line", slug: "douro-line", name: "Douro Line", origin: "Porto Campanhã", destination: "Pocinho", country: "Portugal", countries: ["Portugal"], journeyTypes: ["scenic", "regional"], operator: "CP — Comboios de Portugal", durationMinutes: 205, durationLabel: "Approx. 3 hr 15–3 hr 30", distanceKm: 169.91, trainType: "Regular InterRegional train", reservationStatus: "not-required", shortDescription: "A regular Portuguese railway that leaves metropolitan Porto before settling beside the Douro through vineyard terraces, tight river bends, and the dry upper valley.", status: "published", heroImageAlt: "A CP train at Pinhão station on the Douro Line", metadataDestination: "Pocinho", metadataDescription: "A curated guide to Portugal’s Douro Line from Porto Campanhã to Pocinho.", searchAliases: ["Porto", "Porto Campanhã", "Campanhã", "Régua", "Peso da Régua", "Pinhão", "Pocinho", "Douro", "Douro Valley", "Douro River", "Portugal", "Portuguese railway", "Linha do Douro", "CP", "Comboios de Portugal", "vineyards", "terraces", "river", "valley", "Tua"], experienceTags: ["rivers", "vineyards", "mountain-valleys", "bridges"], bestFor: ["vineyard terraces and river scenery", "a regular train through the Douro Valley", "watching the landscape become drier toward Pocinho"] },
  stops: [
    { id: "porto", name: "Porto Campanhã", latitude: 41.14879, longitude: -8.58519, sequence: 1, distanceAlongRouteKm: 0 },
    { id: "ermesinde", name: "Ermesinde", latitude: 41.216, longitude: -8.553, sequence: 2, distanceAlongRouteKm: 10 },
    { id: "penafiel", name: "Penafiel", latitude: 41.204, longitude: -8.282, sequence: 3, distanceAlongRouteKm: 38 },
    { id: "caide", name: "Caíde", latitude: 41.21, longitude: -8.165, sequence: 4, distanceAlongRouteKm: 50 },
    { id: "marco", name: "Marco de Canaveses", latitude: 41.184, longitude: -8.149, sequence: 5, distanceAlongRouteKm: 61 },
    { id: "mosteiro", name: "Mosteirô", latitude: 41.154, longitude: -7.991, sequence: 6, distanceAlongRouteKm: 78 },
    { id: "aregos", name: "Aregos", latitude: 41.102, longitude: -7.921, sequence: 7, distanceAlongRouteKm: 88 },
    { id: "regua", name: "Régua", latitude: 41.158, longitude: -7.784, sequence: 8, distanceAlongRouteKm: 112 },
    { id: "pinhao", name: "Pinhão", latitude: 41.19, longitude: -7.545, sequence: 9, distanceAlongRouteKm: 135 },
    { id: "tua", name: "Tua", latitude: 41.205, longitude: -7.428, sequence: 10, distanceAlongRouteKm: 146 },
    { id: "ferradosa", name: "Ferradosa", latitude: 41.161, longitude: -7.32, sequence: 11, distanceAlongRouteKm: 157 },
    { id: "pocinho", name: "Pocinho", latitude: 41.12881, longitude: -7.13689, sequence: 12, distanceAlongRouteKm: 169.91 },
  ],
  landmarks: [
    { id: "douro-arrival", name: "First Douro river reach", type: "river", latitude: 41.12, longitude: -8.02, distanceAlongRouteKm: 75, shortDescription: "The line reaches the Douro after the metropolitan and inland opening section.", importance: "highlight", bestSideForward: "right", bestSideReverse: "left" },
    { id: "regua-terraces", name: "Régua vineyard terraces", type: "scenic-section", latitude: 41.158, longitude: -7.78, distanceAlongRouteKm: 112, shortDescription: "Terraced slopes begin to dominate both banks around the valley’s principal railway town.", importance: "dont-miss", bestSideForward: "both", bestSideReverse: "both" },
    { id: "pinhao-bend", name: "Pinhão river bend", type: "village", latitude: 41.19, longitude: -7.545, distanceAlongRouteKm: 135, shortDescription: "The station, tiled panels, vineyards, and river occupy one compact bend in the valley.", importance: "dont-miss", bestSideForward: "right", bestSideReverse: "left" },
    { id: "tua-confluence", name: "Tua confluence", type: "river", latitude: 41.205, longitude: -7.428, distanceAlongRouteKm: 146, shortDescription: "The railway passes the mouth of the Tua as the valley becomes steeper and more sparsely settled.", importance: "highlight", bestSideForward: "right", bestSideReverse: "left" },
    { id: "upper-douro", name: "Upper Douro", type: "scenic-section", latitude: 41.16, longitude: -7.27, distanceAlongRouteKm: 160, shortDescription: "Rockier slopes, dams, and broad bends replace the denser vineyard landscape toward Pocinho.", importance: "dont-miss", bestSideForward: "varies", bestSideReverse: "varies" },
  ],
  timelineEntries: [
    { id: "porto-inland", title: "Beyond Porto", subtitle: "City to interior", distanceAlongRouteKm: 25, type: "scenic-section", importance: "normal", shortDescription: "Urban railways give way to the wooded valleys east of Porto." },
    { id: "meet-douro", title: "The Douro appears", distanceAlongRouteKm: 75, type: "river", importance: "highlight", bestSide: "right", bestSideReverse: "left", relatedLandmarkId: "douro-arrival", shortDescription: "The river begins to organize the journey after the railway reaches its bank." },
    { id: "regua", title: "Régua and the terraces", distanceAlongRouteKm: 112, type: "scenic-section", importance: "dont-miss", bestSide: "both", bestSideReverse: "both", relatedLandmarkId: "regua-terraces", shortDescription: "Look across both sides for steep vineyard geometry around Régua." },
    { id: "pinhao", title: "Pinhão", subtitle: "Tiles, vines, and river", distanceAlongRouteKm: 135, type: "village", importance: "dont-miss", bestSide: "right", bestSideReverse: "left", relatedLandmarkId: "pinhao-bend", shortDescription: "The celebrated station sits within one of the route’s most concentrated river scenes." },
    { id: "tua", title: "Tua confluence", distanceAlongRouteKm: 146, type: "river", importance: "highlight", bestSide: "right", bestSideReverse: "left", relatedLandmarkId: "tua-confluence", shortDescription: "Watch the tributary valley open briefly beside the Douro." },
    { id: "upper", title: "Into the upper Douro", subtitle: "Drier, wider country", distanceAlongRouteKm: 160, type: "scenic-section", importance: "dont-miss", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "upper-douro", shortDescription: "The final railway follows large bends through increasingly austere terrain." },
  ],
  bestSideSegments: [
    { id: "porto-opening", startDistanceKm: 0, endDistanceKm: 70, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "The opening railway changes orientation before reaching the Douro.", confidenceType: "limited-data" },
    { id: "river-middle", startDistanceKm: 70, endDistanceKm: 150, forwardDirectionSide: "right", reverseDirectionSide: "left", reason: "Many of the clearest sustained river windows fall on this side, although curves still move the view.", confidenceType: "limited-data" },
    { id: "upper-valley", startDistanceKm: 150, endDistanceKm: 169.91, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Large bends and changes of bank prevent one reliable side near Pocinho.", confidenceType: "limited-data" },
  ],
  journeyInformation: [
    { id: "service", label: "Regular railway", detail: "This is CP’s scheduled Douro service, not a river cruise or a dedicated luxury sightseeing train." },
    { id: "times", label: "Service pattern", detail: "Journey times and through services vary by date. Some departures require attention to connections; check CP for the travel day." },
    { id: "seating", label: "Seating", detail: "Reserved seating is not normally required on the regular regional service, so preferred window positions cannot be guaranteed." },
    { id: "scenery", label: "Where scenery concentrates", detail: "The strongest sustained river and vineyard scenery begins well east of Porto, particularly from Régua through Pinhão and Tua." },
  ],
  sources: [
    { id: "douro-cp", label: "CP — Linha do Douro timetable", category: "operator", url: "https://www1.cp.pt/info/documents/d/cp/horarios-douro-02-04-2026", note: "Current official corridor and passenger stopping sequence." },
    { id: "douro-osm", label: "OpenStreetMap relations 4508126 and 1724300", category: "railway-map", url: "https://www.openstreetmap.org/relation/1724300", note: "Prepared from the Porto connection and Linha do Douro railway relations; © OSM contributors, ODbL." },
    { id: "douro-editorial", label: "Rallii guidance", category: "editorial", note: "Curated landscape sequence and deliberately cautious side guidance." },
  ],
  geoJsonPath: "/data/routes/douro-line.geojson", relatedRouteSlugs: ["flam-railway", "cinque-terre"],
} satisfies RailRoute;
