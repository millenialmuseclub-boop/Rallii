import type { RailRoute } from "../../types/route.ts";

export const elChepeExpressRoute = {
  capabilities: { rideMode: false },
  summary: {
    id: "el-chepe-express", slug: "el-chepe-express", name: "El Chepe Express", origin: "Los Mochis", destination: "Creel", country: "Mexico", countries: ["Mexico"],
    journeyTypes: ["scenic", "mountain"], operator: "Ferromex", durationMinutes: 580, durationLabel: "Approx. 9–10 hours", distanceKm: 344.51,
    trainType: "Scenic tourist train", reservationStatus: "required", shortDescription: "A dramatic climb from the Sinaloa lowlands into the Sierra Tarahumara and the vast canyon country of northern Mexico.",
    status: "published", heroImageAlt: "El Chepe train at Divisadero above Copper Canyon", metadataDescription: "A direction-aware guide to El Chepe Express from Los Mochis to Creel.",
    searchAliases: ["Chepe", "Copper Canyon train", "Barrancas del Cobre", "Los Mochis", "El Fuerte", "Bahuichivo", "Divisadero", "Creel", "Chihuahua", "Sinaloa", "Sierra Tarahumara", "Ferromex", "Mexico"],
    experienceTags: ["gorges", "mountain-valleys", "tunnels", "bridges"], bestFor: ["Copper Canyon on a daylight train", "dramatic railway engineering", "combining rail travel with canyon stopovers"],
  },
  stops: [
    { id: "los-mochis", name: "Los Mochis", latitude: 25.7724, longitude: -108.9602, sequence: 1, distanceAlongRouteKm: 0, shortDescription: "The Pacific-side gateway in the Sinaloa lowlands." },
    { id: "el-fuerte", name: "El Fuerte", latitude: 26.417, longitude: -108.619, sequence: 2, distanceAlongRouteKm: 73, shortDescription: "A historic riverside town before the mountain climb." },
    { id: "bahuichivo", name: "Bahuichivo", latitude: 27.408, longitude: -107.73, sequence: 3, distanceAlongRouteKm: 233, shortDescription: "The rail gateway for Cerocahui and Urique Canyon." },
    { id: "divisadero", name: "Divisadero", latitude: 27.5345, longitude: -107.8246, sequence: 4, distanceAlongRouteKm: 264, shortDescription: "A celebrated canyon-rim stop; dwell arrangements vary." },
    { id: "creel", name: "Creel", latitude: 27.75, longitude: -107.6352, sequence: 5, distanceAlongRouteKm: 344.51, shortDescription: "The highland terminus in the Sierra Tarahumara." },
  ],
  landmarks: [
    { id: "rio-fuerte", name: "Río Fuerte country", type: "river", latitude: 26.42, longitude: -108.61, distanceAlongRouteKm: 78, shortDescription: "Fields and river country give way to the first foothills beyond El Fuerte.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "temoris-climb", name: "Témoris mountain climb", type: "scenic-section", latitude: 27.22, longitude: -108.25, distanceAlongRouteKm: 190, shortDescription: "Loops, bridges, and tunnels gain height through increasingly steep terrain.", importance: "dont-miss", bestSideForward: "varies", bestSideReverse: "varies" },
    { id: "urique-canyon", name: "Urique Canyon country", type: "gorge", latitude: 27.42, longitude: -107.9, distanceAlongRouteKm: 245, shortDescription: "Deep, layered canyon walls dominate the approach to Divisadero.", importance: "dont-miss", bestSideForward: "right", bestSideReverse: "left" },
    { id: "divisadero-canyon", name: "Divisadero canyon rim", type: "gorge", latitude: 27.5345, longitude: -107.8246, distanceAlongRouteKm: 264, shortDescription: "The railway reaches one of its broadest Copper Canyon panoramas.", importance: "dont-miss", bestSideForward: "right", bestSideReverse: "left" },
    { id: "tarahumara", name: "Sierra Tarahumara", type: "mountain-pass", latitude: 27.67, longitude: -107.72, distanceAlongRouteKm: 310, shortDescription: "Pine-covered highlands replace the hotter canyon slopes before Creel.", importance: "highlight", bestSideForward: "varies", bestSideReverse: "varies" },
  ],
  timelineEntries: [
    { id: "lowlands", title: "Sinaloa lowlands", distanceAlongRouteKm: 35, type: "scenic-section", importance: "normal", shortDescription: "Settle in as fields and low hills frame the route toward El Fuerte." },
    { id: "el-fuerte", title: "El Fuerte", distanceAlongRouteKm: 73, type: "village", importance: "highlight", shortDescription: "The journey leaves the lowlands and begins its long approach to the mountains." },
    { id: "climb", title: "Témoris climb", distanceAlongRouteKm: 190, type: "scenic-section", importance: "dont-miss", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "temoris-climb", shortDescription: "Be ready through tunnels for brief views of bridges, loops, and steep slopes." },
    { id: "bahuichivo", title: "Bahuichivo", distanceAlongRouteKm: 233, type: "station", importance: "highlight", shortDescription: "A useful stopover gateway; transfers and accommodation should be arranged independently." },
    { id: "canyons", title: "Copper Canyon reveals", distanceAlongRouteKm: 245, type: "gorge", importance: "dont-miss", bestSide: "right", bestSideReverse: "left", relatedLandmarkId: "urique-canyon", shortDescription: "Look right for the strongest forward-direction canyon windows." },
    { id: "divisadero", title: "Divisadero", distanceAlongRouteKm: 264, type: "gorge", importance: "dont-miss", bestSide: "right", bestSideReverse: "left", relatedLandmarkId: "divisadero-canyon", shortDescription: "The canyon rim is the route’s signature moment; the stop length is operationally changeable." },
    { id: "highlands", title: "Sierra Tarahumara", distanceAlongRouteKm: 310, type: "mountain-pass", importance: "highlight", bestSide: "varies", bestSideReverse: "varies", relatedLandmarkId: "tarahumara", shortDescription: "Pine forest and highland settlements lead toward Creel." },
  ],
  bestSideSegments: [
    { id: "lowlands", startDistanceKm: 0, endDistanceKm: 150, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "River and foothill views alternate as the railway curves inland.", confidenceType: "limited-data" },
    { id: "canyon-climb", startDistanceKm: 150, endDistanceKm: 285, forwardDirectionSide: "right", reverseDirectionSide: "left", reason: "Many of the broader canyon openings are generally outward on the south-facing side, though tunnels and curves continually change the view.", confidenceType: "limited-data" },
    { id: "highlands", startDistanceKm: 285, endDistanceKm: 344.51, forwardDirectionSide: "varies", reverseDirectionSide: "varies", reason: "Forest, rock formations, and settlement views are distributed across both sides.", confidenceType: "limited-data" },
  ],
  journeyInformation: [
    { id: "service", label: "Current service", detail: "El Chepe Express currently links Los Mochis and Creel on selected operating days. Confirm dates, direction, and intermediate stops directly with Chepe." },
    { id: "reservation", label: "Reservations", detail: "Advance booking is required. Rallii does not publish fares, availability, or guarantee stopover space." },
    { id: "stopovers", label: "Canyon stopovers", detail: "El Fuerte, Bahuichivo, Divisadero, and Creel can anchor a longer itinerary, but each train segment and overnight stay must be planned independently." },
    { id: "conditions", label: "Conditions", detail: "Heat, mountain weather, daylight, and service arrangements vary by season. Use the operator’s latest guidance before travel." },
  ],
  sources: [
    { id: "chepe", label: "Chepe Express", category: "operator", url: "https://chepe.mx/en/", note: "Official current route identity, journey duration, and operating context." },
    { id: "chepe-route", label: "Chepe Express route", category: "operator", url: "https://chepe.mx/en/train/get-to-know-the-chepe-express-route/", note: "Official stations and Copper Canyon journey context." },
    { id: "mexico-rail", label: "Proyectos México — Línea Q", category: "infrastructure", url: "https://www.proyectosmexico.gob.mx/proyecto_inversion/273-via-ferroviaria-ojinaga-topolobampo/?language=en", note: "Government infrastructure context for the Ojinaga–Topolobampo railway." },
    { id: "osm", label: "OpenStreetMap relation 5977762", category: "railway-map", url: "https://www.openstreetmap.org/relation/5977762", note: "Prepared Los Mochis–Creel railway geometry under ODbL." },
  ],
  geoJsonPath: "/data/routes/el-chepe-express.geojson",
} satisfies RailRoute;
