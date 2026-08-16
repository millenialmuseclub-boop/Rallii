import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { glacierExpressRoute } from "../src/data/routes/glacier-express.ts";
import { berninaExpressRoute } from "../src/data/routes/bernina-express.ts";
import { goldenPassExpressRoute } from "../src/data/routes/goldenpass-express.ts";
import { westHighlandLineRoute } from "../src/data/routes/west-highland-line.ts";
import { flamRailwayRoute } from "../src/data/routes/flam-railway.ts";
import { cinqueTerreRoute } from "../src/data/routes/cinque-terre.ts";
import { tranzAlpineRoute } from "../src/data/routes/tranzalpine.ts";
import { kurobeGorgeRailwayRoute } from "../src/data/routes/kurobe-gorge-railway.ts";
import { belfastDerryRoute } from "../src/data/routes/belfast-derry.ts";
import { dublinRosslareRoute } from "../src/data/routes/dublin-rosslare.ts";
import { douroLineRoute } from "../src/data/routes/douro-line.ts";
import { firstPassageWestRoute } from "../src/data/routes/first-passage-west.ts";
import { settleCarlisleRoute } from "../src/data/routes/settle-carlisle.ts";
import { californiaZephyrRoute } from "../src/data/routes/california-zephyr.ts";
import { bergenLineRoute } from "../src/data/routes/bergen-line.ts";
import { theGhanRoute } from "../src/data/routes/the-ghan.ts";
import { kandyEllaRailwayRoute } from "../src/data/routes/kandy-ella-railway.ts";
import { coastStarlightRoute } from "../src/data/routes/coast-starlight.ts";
import { theCanadianRoute } from "../src/data/routes/the-canadian.ts";
import { easternExpressRoute } from "../src/data/routes/eastern-express.ts";
import { hiramBinghamRoute } from "../src/data/routes/hiram-bingham.ts";
import { alishanForestRailwayRoute } from "../src/data/routes/alishan-forest-railway.ts";
import { getAllRoutes, getRouteBySlug } from "../src/data/routes/index.ts";
import { validateRoute } from "../src/lib/route-validation.ts";
import { normalizeSearchText, searchRoutes } from "../src/lib/route-search.ts";
import { buildComparisonPath, getBestSideSummary, getJourneyDurationCategory, parseComparisonRoutes } from "../src/lib/journey-comparison.ts";
import { getCollectionRoutes, getCollectionsForRoute, getJourneyCollection, journeyCollections } from "../src/data/journey-collections.ts";
import { featuredRouteSlugs } from "../src/data/featured-routes.ts";
import { isNavigationItemActive, primaryNavigation } from "../src/data/navigation.ts";
import { buildComparePath, getRouteRelationships } from "../src/data/route-relationships.ts";
import { getRouteMedia, routeMediaBySlug } from "../src/data/route-media.ts";
import { getNextHighlight, getPreviousHighlight, getMatchConfidence } from "../src/lib/ride-guidance.ts";
import { interpolateRouteCoordinate, projectCoordinateOntoRoute, routeLengthKm, type RouteCoordinate } from "../src/lib/route-geometry.ts";
import { migrateLegacySaved, parseTravelLibrary } from "../src/lib/travel-library.ts";
import { getBeenRoutes, getLibrarySummary, getWantToGoRoutes } from "../src/lib/travel-library-summary.ts";
import { getDirectionalEndpoints, getDirectionalLandmarks, getDirectionalSegments, getDirectionalStops, getDirectionalTimeline, parseJourneyDirection, transformRouteDistance } from "../src/lib/route-direction.ts";
import { getOfficialOperatorSource, getPlanningLocations, hasPreparedActivityContext, isGetYourGuideConfigured, isStay22Configured, partnerPlanning } from "../src/data/partner-planning.ts";

test("direction parsing is strict and safely defaults forward", () => {
  assert.equal(parseJourneyDirection("reverse"), "reverse");
  for (const value of [undefined, null, "", "forward", "backward", ["reverse", "forward"]]) assert.equal(parseJourneyDirection(value), Array.isArray(value) ? "reverse" : "forward");
});

test("direction helpers swap endpoints, stops, and exact endpoint distances", () => {
  assert.deepEqual(getDirectionalEndpoints(tranzAlpineRoute, "reverse"), { origin: "Greymouth", destination: "Christchurch" });
  const stops = getDirectionalStops(tranzAlpineRoute, "reverse");
  assert.deepEqual(stops.map((stop) => stop.name), ["Greymouth", "Moana", "Arthur's Pass", "Springfield", "Darfield", "Rolleston", "Christchurch"]);
  assert.deepEqual(stops.map((stop) => stop.sequence), [1, 2, 3, 4, 5, 6, 7]);
  assert.equal(stops[0].distanceAlongRouteKm, 0); assert.equal(stops.at(-1)?.distanceAlongRouteKm, 230.98);
  assert.equal(transformRouteDistance(0, 21.41, "reverse"), 21.41); assert.equal(transformRouteDistance(21.41, 21.41, "reverse"), 0);
});

test("reverse timelines transform order, distance, time, side, and editorial copy", () => {
  const timeline = getDirectionalTimeline(tranzAlpineRoute, "reverse");
  assert.equal(timeline[0].id, "timeline-lake-brunner"); assert.equal(timeline.at(-1)?.id, "timeline-plains");
  assert.equal(timeline[0].distanceAlongRouteKm, 37.24); assert.equal(timeline[0].approximateJourneyMinutes, 55); assert.equal(timeline[0].bestSide, "right");
  assert.match(timeline[0].shortDescription, /Look right from Greymouth/);
  assert.ok(timeline.every((entry, index) => index === 0 || entry.distanceAlongRouteKm > timeline[index - 1].distanceAlongRouteKm));
  assert.ok(timeline.every((entry, index) => index === 0 || entry.approximateJourneyMinutes === undefined || timeline[index - 1].approximateJourneyMinutes === undefined || entry.approximateJourneyMinutes > timeline[index - 1].approximateJourneyMinutes!));
  assert.ok(getDirectionalTimeline(cinqueTerreRoute, "reverse").every((entry) => entry.approximateJourneyMinutes === undefined));
});

test("reverse landmarks and segments retain explicit prepared sides", () => {
  const landmarks = getDirectionalLandmarks(cinqueTerreRoute, "reverse");
  assert.equal(landmarks[0].id, "monterosso-coast"); assert.equal(landmarks[0].distanceAlongRouteKm, 5.31); assert.equal(landmarks[0].bestSideReverse, "right");
  const segments = getDirectionalSegments(flamRailwayRoute, "reverse");
  assert.ok(segments.every((segment, index) => index === 0 || segment.startDistanceKm >= segments[index - 1].startDistanceKm));
  assert.equal(segments.find((segment) => segment.id === "rjoandefossen-view")?.reverseDirectionSide, "left");
  for (const route of [tranzAlpineRoute, cinqueTerreRoute, flamRailwayRoute, westHighlandLineRoute, glacierExpressRoute]) {
    for (const landmark of route.landmarks.filter((item) => ["both", "varies", "unknown"].includes(item.bestSideForward))) assert.equal(landmark.bestSideReverse, landmark.bestSideForward);
  }
});

test("all routes satisfy generic direction invariants without changing canonical data", () => {
  for (const route of getAllRoutes()) {
    const canonicalStops = route.stops.map((stop) => ({ ...stop }));
    const reverseStops = getDirectionalStops(route, "reverse"); const reverseTimeline = getDirectionalTimeline(route, "reverse");
    assert.equal(reverseStops[0].name, route.summary.destination); assert.equal(reverseStops.at(-1)?.name, route.summary.origin);
    assert.ok(reverseStops.every((stop, index) => index === 0 || stop.distanceAlongRouteKm > reverseStops[index - 1].distanceAlongRouteKm));
    assert.ok(reverseTimeline.every((entry, index) => index === 0 || entry.distanceAlongRouteKm > reverseTimeline[index - 1].distanceAlongRouteKm));
    assert.deepEqual(route.stops, canonicalStops);
  }
  assert.deepEqual(getAllRoutes().filter((route) => route.capabilities.rideMode).map((route) => route.summary.slug), ["flam-railway"]);
});

test("TranzAlpine is a complete New Zealand coast-to-coast route", () => {
  assert.equal(getRouteBySlug("tranzalpine"), tranzAlpineRoute);
  assert.deepEqual(validateRoute(tranzAlpineRoute), []);
  assert.deepEqual(tranzAlpineRoute.summary.countries, ["New Zealand"]);
  assert.deepEqual(tranzAlpineRoute.stops.map((stop) => stop.name), ["Christchurch", "Rolleston", "Darfield", "Springfield", "Arthur's Pass", "Moana", "Greymouth"]);
  assert.equal(tranzAlpineRoute.summary.distanceKm, 230.98);
  assert.equal(tranzAlpineRoute.capabilities.rideMode, false);
});

test("TranzAlpine search covers aliases, geography, stops, and landmarks", () => {
  for (const query of ["TranzAlpine", "Tranz Alpine", "Christchurch", "Greymouth", "New Zealand", "South Island", "Arthur's Pass", "Otira", "Waimakariri", "Lake Brunner", "Southern Alps", "scenic", "mountain", "rainforest"]) assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "tranzalpine"), `Expected TranzAlpine for ${query}`);
});

test("TranzAlpine geometry is continuous, east-to-west, and matches stored metadata", async () => {
  const contents = await readFile("public/data/routes/tranzalpine.geojson", "utf8");
  const data = JSON.parse(contents) as { metadata: { coordinate_count: number; calculated_distance_km: number; relation_ids: number[]; way_ids: number[] }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  const coordinates = data.features[0].geometry.coordinates;
  assert.equal(coordinates.length, 3141); assert.equal(data.metadata.coordinate_count, coordinates.length); assert.deepEqual(data.metadata.relation_ids, [1598960, 14005460]); assert.equal(data.metadata.way_ids.length, 339);
  assert.ok(coordinates[0][0] > coordinates.at(-1)![0]); assert.ok(Math.abs(routeLengthKm(coordinates) - 230.98) < 0.02); assert.equal(data.metadata.calculated_distance_km, 230.98);
});

test("TranzAlpine timeline and reverse Best Side guidance are prepared", () => {
  assert.equal(tranzAlpineRoute.timelineEntries.length, 8);
  assert.ok(tranzAlpineRoute.timelineEntries.every((entry, index, entries) => index === 0 || entry.distanceAlongRouteKm > entries[index - 1].distanceAlongRouteKm));
  const river = tranzAlpineRoute.bestSideSegments.find((segment) => segment.id === "waimakariri-ascent"); const lake = tranzAlpineRoute.bestSideSegments.find((segment) => segment.id === "lake-brunner");
  assert.deepEqual([river?.forwardDirectionSide, river?.reverseDirectionSide], ["right", "left"]); assert.deepEqual([lake?.forwardDirectionSide, lake?.reverseDirectionSide], ["left", "right"]);
  assert.ok(tranzAlpineRoute.bestSideSegments.slice(1).every((segment) => segment.confidenceType === "limited-data"));
});

test("TranzAlpine works with Discover, Compare, collections, and the personal library", () => {
  assert.deepEqual(getAllRoutes().filter((route) => route.summary.countries.includes("New Zealand")).map((route) => route.summary.slug), ["tranzalpine"]);
  assert.equal(getJourneyDurationCategory(tranzAlpineRoute.summary.durationMinutes), "Long Scenic Journey"); assert.equal(getBestSideSummary(tranzAlpineRoute), "Direction-specific, with variation by section");
  assert.ok(getJourneyCollection("full-day-journeys")?.routeSlugs.includes("tranzalpine")); assert.ok(getJourneyCollection("mountain-journeys")?.routeSlugs.includes("tranzalpine"));
  const statuses = { tranzalpine: "been", "glacier-express": "want_to_go" };
  assert.deepEqual(getBeenRoutes(getAllRoutes(), statuses).map((route) => route.summary.slug), ["tranzalpine"]); assert.deepEqual(getWantToGoRoutes(getAllRoutes(), statuses).map((route) => route.summary.slug), ["glacier-express"]);
  assert.deepEqual(getLibrarySummary([tranzAlpineRoute]), { journeyCount: 1, countryCount: 1, distanceKm: 230.98, countries: ["New Zealand"] }); assert.equal(tranzAlpineRoute.geoJsonPath, "/data/routes/tranzalpine.geojson");
});

test("legacy Saved arrays migrate to Want to Go without losing known routes", () => {
  const known = new Set(getAllRoutes().map((route) => route.summary.slug));
  assert.deepEqual(migrateLegacySaved('["glacier-express","flam-railway"]', known), { version: 1, routes: { "glacier-express": "want_to_go", "flam-railway": "want_to_go" } });
  assert.deepEqual(migrateLegacySaved("[]", known), { version: 1, routes: {} });
  assert.deepEqual(migrateLegacySaved("not-json", known), { version: 1, routes: {} });
  assert.deepEqual(migrateLegacySaved('["unknown","flam-railway"]', known), { version: 1, routes: { "flam-railway": "want_to_go" } });
});

test("Cinque Terre is a complete domestic Italian coastal route", () => {
  assert.equal(getRouteBySlug("cinque-terre"), cinqueTerreRoute);
  assert.deepEqual(validateRoute(cinqueTerreRoute), []);
  assert.deepEqual(cinqueTerreRoute.summary.countries, ["Italy"]);
  assert.deepEqual(cinqueTerreRoute.stops.map((stop) => stop.name), ["La Spezia Centrale", "Riomaggiore", "Manarola", "Corniglia", "Vernazza", "Monterosso", "Levanto"]);
  assert.equal(cinqueTerreRoute.capabilities.rideMode, false);
  assert.equal(cinqueTerreRoute.summary.distanceKm, 21.41);
});

test("Cinque Terre search finds route, Liguria, villages, and experience terms", () => {
  for (const query of ["Cinque Terre", "Cinqueterre", "La Spezia", "Levanto", "Riomaggiore", "Manarola", "Corniglia", "Vernazza", "Monterosso", "Italy", "Liguria", "coastal", "villages", "tunnels"]) assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "cinque-terre"), `Expected Cinque Terre for ${query}`);
});

test("Cinque Terre timeline and directional guidance remain ordered and cautious", () => {
  assert.ok(cinqueTerreRoute.timelineEntries.every((entry, index, entries) => index === 0 || entry.distanceAlongRouteKm > entries[index - 1].distanceAlongRouteKm));
  assert.equal(cinqueTerreRoute.timelineEntries.length, 6);
  assert.ok(cinqueTerreRoute.bestSideSegments.some((segment) => segment.forwardDirectionSide === "left" && segment.reverseDirectionSide === "right"));
  assert.ok(cinqueTerreRoute.bestSideSegments.every((segment) => segment.confidenceType === "limited-data"));
});

test("Cinque Terre works with comparison and personal-library derivations", () => {
  assert.equal(getJourneyDurationCategory(cinqueTerreRoute.summary.durationMinutes), "Quick Escape");
  assert.ok(cinqueTerreRoute.summary.experienceTags.includes("coast"));
  const statuses = { "cinque-terre": "been" };
  assert.deepEqual(getBeenRoutes(getAllRoutes(), statuses).map((route) => route.summary.slug), ["cinque-terre"]);
  assert.deepEqual(getLibrarySummary([cinqueTerreRoute]), { journeyCount: 1, countryCount: 1, distanceKm: 21.41, countries: ["Italy"] });
});

test("versioned travel-library parsing is valid, filtered, and idempotent", () => {
  const known = new Set(getAllRoutes().map((route) => route.summary.slug));
  const raw = '{"version":1,"routes":{"glacier-express":"want_to_go","flam-railway":"been","unknown":"been","bernina-express":"invalid"}}';
  const parsed = parseTravelLibrary(raw, known);
  assert.deepEqual(parsed, { version: 1, routes: { "glacier-express": "want_to_go", "flam-railway": "been" } });
  assert.deepEqual(parseTravelLibrary(JSON.stringify(parsed), known), parsed);
  assert.deepEqual(parseTravelLibrary("invalid", known), { version: 1, routes: {} });
});

test("library status switching and removal remain mutually exclusive", () => {
  const library = parseTravelLibrary('{"version":1,"routes":{"flam-railway":"want_to_go"}}');
  library.routes["flam-railway"] = "been";
  assert.equal(library.routes["flam-railway"], "been");
  library.routes["flam-railway"] = "want_to_go";
  assert.equal(library.routes["flam-railway"], "want_to_go");
  delete library.routes["flam-railway"];
  assert.equal(library.routes["flam-railway"], undefined);
});

test("personal library derives route groups, countries, distance, and map selection", () => {
  const routes = getAllRoutes(); const statuses = { "bernina-express": "been", "flam-railway": "been", "glacier-express": "want_to_go" };
  const been = getBeenRoutes(routes, statuses); const want = getWantToGoRoutes(routes, statuses); const summary = getLibrarySummary(been);
  assert.deepEqual(been.map((route) => route.summary.slug), ["bernina-express", "flam-railway"]);
  assert.deepEqual(want.map((route) => route.summary.slug), ["glacier-express"]);
  assert.equal(summary.journeyCount, 2); assert.equal(summary.countryCount, 3); assert.equal(summary.distanceKm, 81.2);
  assert.deepEqual(been.map((route) => route.geoJsonPath), ["/data/routes/bernina-express.geojson", "/data/routes/flam-railway.geojson"]);
  assert.deepEqual(getBeenRoutes(routes, {}), []);
});

async function getFlamGeometry(): Promise<RouteCoordinate[]> { const contents = await readFile("public/data/routes/flam-railway.geojson", "utf8"); const data = JSON.parse(contents) as { features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> }; return data.features[0].geometry.coordinates; }

test("Ride Mode capability is enabled only for Flåm Railway", () => {
  assert.deepEqual(getAllRoutes().filter((route) => route.capabilities.rideMode).map((route) => route.summary.slug), ["flam-railway"]);
});

test("route projection respects Flåm to Myrdal geometry direction", async () => {
  const geometry = await getFlamGeometry(); const length = routeLengthKm(geometry);
  const start = projectCoordinateOntoRoute(geometry[0], geometry); const end = projectCoordinateOntoRoute(geometry.at(-1)!, geometry); const midpoint = projectCoordinateOntoRoute(interpolateRouteCoordinate(geometry, 0.5), geometry);
  assert.ok(start.distanceAlongRouteKm < 0.01); assert.ok(start.progress < 0.001);
  assert.ok(Math.abs(end.distanceAlongRouteKm - length) < 0.01); assert.ok(end.progress > 0.999);
  assert.ok(midpoint.progress > 0.49 && midpoint.progress < 0.51);
});

test("off-route projection reports a large distance and centralized confidence", async () => {
  const geometry = await getFlamGeometry(); const projection = projectCoordinateOntoRoute([10.75, 59.91], geometry);
  assert.ok(projection.distanceFromRouteMeters > 100_000); assert.equal(getMatchConfidence(projection.distanceFromRouteMeters), "unmatched"); assert.equal(getMatchConfidence(50), "on-route"); assert.equal(getMatchConfidence(500), "near-route");
});

test("demo interpolation follows the LineString and progresses monotonically", async () => {
  const geometry = await getFlamGeometry(); const projections = [0, 0.25, 0.5, 0.75, 1].map((value) => projectCoordinateOntoRoute(interpolateRouteCoordinate(geometry, value), geometry));
  assert.ok(projections.every((projection, index) => index === 0 || projection.distanceAlongRouteKm > projections[index - 1].distanceAlongRouteKm));
  const endpointMidpoint: RouteCoordinate = [(geometry[0][0] + geometry.at(-1)![0]) / 2, (geometry[0][1] + geometry.at(-1)![1]) / 2]; assert.ok(projectCoordinateOntoRoute(interpolateRouteCoordinate(geometry, 0.5), geometry).distanceFromRouteMeters < 1); assert.ok(projectCoordinateOntoRoute(endpointMidpoint, geometry).distanceFromRouteMeters > 50);
});

test("Ride Mode advances upcoming highlights and excludes passed highlights", () => {
  assert.equal(getNextHighlight(flamRailwayRoute, 0)?.id, "timeline-lower-valley"); assert.equal(getNextHighlight(flamRailwayRoute, 5)?.id, "timeline-kjosfossen"); assert.equal(getNextHighlight(flamRailwayRoute, 16.1)?.id, "timeline-upper-ascent"); assert.equal(getNextHighlight(flamRailwayRoute, 20.2), undefined); assert.equal(getPreviousHighlight(flamRailwayRoute, 16.1)?.id, "timeline-kjosfossen");
});

test("comparison parsing accepts valid routes and handles partial, duplicate, and invalid input", () => {
  const routes = getAllRoutes();
  assert.deepEqual(parseComparisonRoutes("glacier-express,flam-railway", routes).map((route) => route.summary.slug), ["glacier-express", "flam-railway"]);
  assert.deepEqual(parseComparisonRoutes("glacier-express", routes).map((route) => route.summary.slug), ["glacier-express"]);
  assert.deepEqual(parseComparisonRoutes("flam-railway,flam-railway,missing", routes).map((route) => route.summary.slug), ["flam-railway"]);
  assert.deepEqual(parseComparisonRoutes("missing", routes), []);
  assert.equal(buildComparisonPath(["glacier-express", "flam-railway"]), "/compare?routes=glacier-express,flam-railway");
});

test("duration categories are derived at stable boundaries", () => {
  assert.equal(getJourneyDurationCategory(60), "Quick Escape");
  assert.equal(getJourneyDurationCategory(90), "Half-Day Journey");
  assert.equal(getJourneyDurationCategory(240), "Long Scenic Journey");
  assert.equal(getJourneyDurationCategory(360), "Full-Day Experience");
});

test("controlled experience metadata and comparison side summaries are available", () => {
  assert.deepEqual(flamRailwayRoute.summary.experienceTags, ["fjords", "waterfalls", "mountain-valleys"]);
  assert.equal(flamRailwayRoute.summary.bestFor.length, 3);
  assert.equal(getBestSideSummary(flamRailwayRoute), "Direction-specific, with variation by section");
  assert.equal(getBestSideSummary(westHighlandLineRoute), "Both sides, varying by section");
});

test("editorial collections resolve repository routes without empty membership", () => {
  assert.ok(journeyCollections.every((collection) => getCollectionRoutes(collection, getAllRoutes()).length > 0));
  assert.deepEqual(getJourneyCollection("alpine-journeys")?.routeSlugs, ["glacier-express", "bernina-express", "goldenpass-express"]);
});

test("looks up a route by slug", () => {
  assert.equal(getRouteBySlug("glacier-express")?.summary.name, "Glacier Express");
  assert.equal(getRouteBySlug("bernina-express")?.summary.name, "Bernina Express");
  assert.equal(getRouteBySlug("goldenpass-express")?.summary.name, "GoldenPass Express");
  assert.equal(getRouteBySlug("west-highland-line")?.summary.name, "West Highland Line");
  assert.equal(getRouteBySlug("flam-railway")?.summary.name, "Flåm Railway");
  assert.equal(getRouteBySlug("tranzalpine")?.summary.name, "TranzAlpine");
  assert.equal(getRouteBySlug("kurobe-gorge-railway")?.summary.name, "Kurobe Gorge Railway");
  assert.equal(getAllRoutes().length, 22);
  assert.equal(getRouteBySlug("missing-route"), undefined);
});

test("Flåm Railway is a compact Norwegian route compatible with repository and Saved lookup", () => {
  assert.deepEqual(validateRoute(flamRailwayRoute), []);
  assert.deepEqual(flamRailwayRoute.summary.countries, ["Norway"]);
  assert.ok(flamRailwayRoute.summary.journeyTypes.includes("mountain"));
  assert.equal(getRouteBySlug("flam-railway"), flamRailwayRoute);
  assert.equal(flamRailwayRoute.timelineEntries.length, 5);
  assert.equal(flamRailwayRoute.stops.length, 9);
});

test("Flåm search is accent-insensitive and indexes aliases, landmarks, and scenic language", () => {
  for (const query of ["Flåm", "Flam", "Flåmsbana", "Myrdal", "Norway", "Kjosfossen", "waterfall", "mountain", "scenic"]) {
    assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "flam-railway"), `Expected Flåm Railway for ${query}`);
  }
});

test("Flåm reverse-direction guidance uses explicitly prepared values", () => {
  const rjoandefossen = flamRailwayRoute.bestSideSegments.find((segment) => segment.id === "rjoandefossen-view");
  assert.equal(rjoandefossen?.forwardDirectionSide, "right");
  assert.equal(rjoandefossen?.reverseDirectionSide, "left");
  assert.equal(flamRailwayRoute.bestSideSegments.length, 3);
});

test("search ranks route names above other field matches", () => {
  const results = searchRoutes(getAllRoutes(), "Glacier Express");
  assert.equal(results[0]?.route.summary.slug, "glacier-express");
  assert.equal(results[0]?.matchType, "route");
});

test("search finds destinations, stops, landmarks, operators, and normalized text", () => {
  assert.equal(searchRoutes(getAllRoutes(), "Mallaig")[0]?.route.summary.slug, "west-highland-line");
  assert.equal(searchRoutes(getAllRoutes(), "Fort William")[0]?.matchType, "stop");
  assert.equal(searchRoutes(getAllRoutes(), "Glenfinnan Viaduct")[0]?.matchType, "landmark");
  assert.equal(searchRoutes(getAllRoutes(), "ScotRail")[0]?.matchType, "operator");
  assert.deepEqual(new Set(searchRoutes(getAllRoutes(), "Rhätische Bahn").map((result) => result.route.summary.slug)), new Set(["bernina-express", "glacier-express"]));
  assert.equal(normalizeSearchText("Rhätische Bahn"), "rhatische bahn");
});

test("search finds countries and journey types without returning results for empty input", () => {
  assert.ok(searchRoutes(getAllRoutes(), "Switzerland").length >= 3);
  assert.ok(searchRoutes(getAllRoutes(), "panoramic").length >= 3);
  assert.deepEqual(searchRoutes(getAllRoutes(), "   "), []);
  assert.deepEqual(searchRoutes(getAllRoutes(), "Shinkansen"), []);
});

test("West Highland Line is a UK scheduled scenic journey compatible with the route repository", () => {
  assert.deepEqual(validateRoute(westHighlandLineRoute), []);
  assert.deepEqual(westHighlandLineRoute.summary.countries, ["United Kingdom"]);
  assert.ok(westHighlandLineRoute.summary.journeyTypes.includes("regional"));
  assert.ok(westHighlandLineRoute.summary.journeyTypes.includes("highlands"));
  assert.equal(westHighlandLineRoute.summary.operator, "ScotRail");
  assert.equal(getAllRoutes().find((route) => route.summary.slug === "west-highland-line"), westHighlandLineRoute);
});

test("West Highland seat guidance stays cautious in both directions", () => {
  const forward = new Set(westHighlandLineRoute.bestSideSegments.map((segment) => segment.forwardDirectionSide));
  const reverse = new Set(westHighlandLineRoute.bestSideSegments.map((segment) => segment.reverseDirectionSide));
  assert.deepEqual(forward, new Set(["varies", "both"]));
  assert.deepEqual(reverse, new Set(["varies", "both"]));
  assert.ok(westHighlandLineRoute.bestSideSegments.every((segment) => segment.forwardDirectionSide === segment.reverseDirectionSide));
});

test("GoldenPass Express satisfies route invariants", () => {
  assert.deepEqual(validateRoute(goldenPassExpressRoute), []);
  assert.equal(goldenPassExpressRoute.stops[0].name, "Montreux");
  assert.equal(goldenPassExpressRoute.stops.at(-1)?.name, "Interlaken Ost");
});

test("Bernina Express satisfies route invariants", () => {
  assert.deepEqual(validateRoute(berninaExpressRoute), []);
  assert.equal(berninaExpressRoute.stops[0].name, "St. Moritz");
  assert.equal(berninaExpressRoute.stops.at(-1)?.name, "Tirano");
  assert.deepEqual(new Set(berninaExpressRoute.bestSideSegments.map((segment) => segment.forwardDirectionSide)), new Set(["both", "varies", "unknown"]));
});

test("Glacier Express satisfies route invariants", () => {
  assert.deepEqual(validateRoute(glacierExpressRoute), []);
  assert.equal(glacierExpressRoute.stops[0].name, "Zermatt");
  assert.equal(glacierExpressRoute.stops.at(-1)?.name, "St. Moritz");
});

for (const slug of ["glacier-express", "bernina-express", "goldenpass-express", "west-highland-line", "flam-railway", "cinque-terre", "tranzalpine", "kurobe-gorge-railway"]) test(`${slug} geometry is a sourced GeoJSON LineString`, async () => {
  const contents = await readFile(`public/data/routes/${slug}.geojson`, "utf8");
  const geoJson = JSON.parse(contents) as {
    type?: string;
    features?: Array<{
      properties?: { source?: string };
      geometry?: { type?: string; coordinates?: unknown[] };
    }>;
  };
  const feature = geoJson.features?.[0];

  assert.equal(geoJson.type, "FeatureCollection");
  assert.equal(feature?.geometry?.type, "LineString");
  const source = feature?.properties?.source ?? (geoJson as { metadata?: { source?: string } }).metadata?.source ?? "";
  assert.match(source, /OpenStreetMap/);
  assert.ok((feature?.geometry?.coordinates?.length ?? 0) > 250);
});

test("primary navigation is focused, consistent, and supports active nested pages", () => {
  assert.deepEqual(primaryNavigation.map((item) => item.label), ["Home", "Discover", "Plan", "Saved"]);
  assert.equal(isNavigationItemActive("/", "/"), true);
  assert.equal(isNavigationItemActive("/discover", "/"), false);
  assert.equal(isNavigationItemActive("/plan", "/plan"), true);
  assert.equal(isNavigationItemActive("/saved", "/saved"), true);
  assert.equal(isNavigationItemActive("/discover/alpine-journeys", "/discover"), true);
  assert.equal(isNavigationItemActive("/compare", "/discover"), false);
});

test("homepage keeps exactly three valid featured journeys", () => {
  assert.equal(featuredRouteSlugs.length, 3);
  assert.ok(featuredRouteSlugs.every((slug) => Boolean(getRouteBySlug(slug))));
});

test("every route has exactly two reviewable relationships and a valid compare path", () => {
  for (const route of getAllRoutes()) {
    const relationships = getRouteRelationships(route.summary.slug);
    assert.equal(relationships.length, 2);
    assert.ok(relationships.every((item) => item.reason.length > 10 && Boolean(getRouteBySlug(item.slug))));
    assert.equal(buildComparePath(route.summary.slug, relationships[0].slug), `/compare?routes=${route.summary.slug},${relationships[0].slug}`);
  }
});

test("route-to-collection links derive from centralized collection membership", () => {
  for (const route of getAllRoutes()) {
    const collections = getCollectionsForRoute(route.summary.slug);
    assert.ok(collections.length > 0);
    assert.ok(collections.every((collection) => collection.routeSlugs.includes(route.summary.slug)));
  }
});

test("every route has complete, locally prepared, licensed hero photography", async () => {
  for (const route of getAllRoutes()) {
    const media = getRouteMedia(route.summary.slug);
    assert.ok(media);
    assert.equal(media.routeSlug, route.summary.slug);
    assert.ok(media.alt.length > 30 && media.alt !== route.summary.name);
    assert.ok(media.caption.length > 40);
    assert.match(media.sourcePageUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.match(media.originalFileUrl, /^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\//);
    assert.match(media.licenseName, /Public domain|CC BY/);
    assert.match(media.licenseUrl, /^https:\/\/creativecommons\.org\//);
    assert.match(media.accessedAt, /^2026-08-(12|14|15|16)$/);
    assert.ok(media.width >= 1400 && media.height >= 800);
    const file = await readFile(`public${media.path}`);
    assert.ok(file.length > 150_000);
  }
});

test("featured routes use prepared photography and unknown routes retain fallback eligibility", () => {
  assert.ok(featuredRouteSlugs.every((slug) => Boolean(getRouteMedia(slug))));
  assert.equal(getRouteMedia("unprepared-route"), undefined);
  assert.equal(Object.keys(routeMediaBySlug).length, getAllRoutes().length);
});

test("media landmark references resolve within their canonical route", () => {
  for (const media of Object.values(routeMediaBySlug)) {
    if (!media.relatedLandmarkId) continue;
    const route = getRouteBySlug(media.routeSlug);
    assert.ok(route?.landmarks.some((landmark) => landmark.id === media.relatedLandmarkId));
  }
});

test("Kurobe Gorge Railway is a complete canonical Japanese route", () => {
  assert.equal(getRouteBySlug("kurobe-gorge-railway"), kurobeGorgeRailwayRoute);
  assert.deepEqual(validateRoute(kurobeGorgeRailwayRoute), []);
  assert.deepEqual(kurobeGorgeRailwayRoute.summary.countries, ["Japan"]);
  assert.deepEqual(kurobeGorgeRailwayRoute.stops.map((stop) => stop.name), ["Unazuki", "Kuronagi", "Kanetsuri", "Keyakidaira"]);
  assert.equal(kurobeGorgeRailwayRoute.capabilities.rideMode, false);
  assert.equal(getAllRoutes().length, 22);
});

test("Kurobe search, Discover, and collections use generic metadata", () => {
  for (const query of ["Kurobe Gorge Railway", "Kurobe", "Unazuki", "Keyakidaira", "Japan", "Japanese Alps", "gorge", "river", "bridges", "tunnels", "open-sided train", "Atobiki Bridge"]) {
    assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "kurobe-gorge-railway"), `Expected Kurobe Gorge Railway for ${query}`);
  }
  assert.deepEqual(getAllRoutes().filter((route) => route.summary.countries.includes("Japan")).map((route) => route.summary.slug), ["kurobe-gorge-railway"]);
  assert.ok(getJourneyCollection("short-scenic-escapes")?.routeSlugs.includes("kurobe-gorge-railway"));
  assert.ok(getJourneyCollection("mountain-journeys")?.routeSlugs.includes("kurobe-gorge-railway"));
});

test("Kurobe geometry is continuous, canonical, and matches prepared distance", async () => {
  const contents = await readFile("public/data/routes/kurobe-gorge-railway.geojson", "utf8");
  const data = JSON.parse(contents) as { metadata: { osmWayIds: number[]; approximateLengthKm: number; osmRelationIds: number[] }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  const geometry = data.features[0].geometry.coordinates;
  assert.equal(geometry.length, 1085);
  assert.equal(data.metadata.osmWayIds.length, 99);
  assert.deepEqual(data.metadata.osmRelationIds, []);
  assert.ok(Math.abs(routeLengthKm(geometry) - 19.91) < 0.02);
  assert.ok(projectCoordinateOntoRoute([kurobeGorgeRailwayRoute.stops[0].longitude, kurobeGorgeRailwayRoute.stops[0].latitude], geometry).distanceFromRouteMeters < 5);
  assert.ok(projectCoordinateOntoRoute([kurobeGorgeRailwayRoute.stops.at(-1)!.longitude, kurobeGorgeRailwayRoute.stops.at(-1)!.latitude], geometry).distanceFromRouteMeters < 5);
  assert.ok(geometry.slice(1).every((coordinate, index) => projectCoordinateOntoRoute(coordinate, [geometry[index], coordinate]).distanceFromRouteMeters < 1));
});

test("Kurobe timeline, reverse guidance, relationships, and library remain generic", () => {
  assert.equal(kurobeGorgeRailwayRoute.timelineEntries.length, 8);
  assert.ok(kurobeGorgeRailwayRoute.timelineEntries.every((entry, index, entries) => index === 0 || entry.distanceAlongRouteKm > entries[index - 1].distanceAlongRouteKm));
  assert.ok(kurobeGorgeRailwayRoute.bestSideSegments.every((segment) => segment.confidenceType === "limited-data"));
  const forward = kurobeGorgeRailwayRoute.bestSideSegments.find((segment) => segment.id === "unazuki-lake-side");
  assert.equal(forward?.forwardDirectionSide, "right");
  assert.equal(forward?.reverseDirectionSide, "left");
  assert.equal(getRouteRelationships("kurobe-gorge-railway").length, 2);
  assert.equal(getJourneyDurationCategory(kurobeGorgeRailwayRoute.summary.durationMinutes), "Quick Escape");
  assert.deepEqual(getLibrarySummary([kurobeGorgeRailwayRoute]), { journeyCount: 1, countryCount: 1, distanceKm: 19.91, countries: ["Japan"] });
});

test("repository includes twenty-two routes while featured journeys remain exactly three", () => {
  assert.equal(getAllRoutes().length, 22);
  assert.ok(getAllRoutes().some((route) => route.summary.slug === "kurobe-gorge-railway"));
  assert.equal(featuredRouteSlugs.length, 3);
});

test("Settle–Carlisle is a complete scheduled northern England journey", async () => {
  assert.equal(getRouteBySlug("settle-carlisle"), settleCarlisleRoute);
  assert.deepEqual(validateRoute(settleCarlisleRoute), []);
  assert.deepEqual(settleCarlisleRoute.stops.map((stop) => stop.name), ["Leeds", "Skipton", "Settle", "Ribblehead", "Dent", "Garsdale", "Kirkby Stephen", "Appleby", "Carlisle"]);
  assert.deepEqual(settleCarlisleRoute.summary.countries, ["United Kingdom"]);
  for (const query of ["Settle Carlisle", "Ribblehead", "Yorkshire Dales", "Pennines", "Eden Valley", "Northern Rail"]) assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "settle-carlisle"));
  const data = JSON.parse(await readFile("public/data/routes/settle-carlisle.geojson", "utf8")) as { metadata: { relationIds: number[]; contributingWayIds: number[]; calculatedLengthKm: number }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  assert.equal(data.features[0].geometry.coordinates.length, 2904);
  assert.equal(data.metadata.contributingWayIds.length, 526);
  assert.deepEqual(data.metadata.relationIds, [9902815]);
  assert.ok(Math.abs(routeLengthKm(data.features[0].geometry.coordinates) - 181.13) < 0.02);
  assert.equal(getRouteRelationships("settle-carlisle").length, 2);
  assert.ok(getJourneyCollection("mountain-journeys")?.routeSlugs.includes("settle-carlisle"));
  assert.equal(settleCarlisleRoute.capabilities.rideMode, false);
});

test("partner planning derives locations, stays opt-in, and preserves editorial route pages", async () => {
  const [home, saved, plan, navigation, panel, routePage] = await Promise.all([
    readFile("src/app/page.tsx", "utf8"),
    readFile("src/app/saved/page.tsx", "utf8"),
    readFile("src/app/plan/page.tsx", "utf8"),
    readFile("src/data/navigation.ts", "utf8"),
    readFile("src/components/partner-planning-panel.tsx", "utf8"),
    readFile("src/components/route-page.tsx", "utf8"),
  ]);
  assert.doesNotMatch(home, /Choose a window|home-route-rail|overflow-x-auto/);
  assert.match(saved, /<TravelLibrary/);
  assert.match(plan, /Plan Your Journey/);
  assert.match(navigation, /\/saved/);
  assert.doesNotMatch(navigation, /My Journeys/);
  assert.deepEqual(getPlanningLocations(firstPassageWestRoute).map((location) => location.place), ["Vancouver", "Kamloops", "Banff"]);
  assert.equal(getPlanningLocations(theCanadianRoute).some((location) => location.kind === "overnight"), false);
  assert.equal(getOfficialOperatorSource(bergenLineRoute)?.category, "operator");
  assert.equal(hasPreparedActivityContext(bergenLineRoute), true);
  assert.equal(partnerPlanning.tripFlightsEnabled, true);
  assert.equal(partnerPlanning.discoverCarsEnabled, true);
  assert.equal(isStay22Configured(), false);
  assert.equal(isGetYourGuideConfigured(), false);
  assert.match(panel, /\/partner-widget\?kind=/);
  assert.match(panel, /allow-same-origin/);
  assert.match(panel, /openSurfaces\.experiences/);
  assert.match(panel, /openSurfaces\.flights/);
  assert.match(panel, /openSurfaces\.car/);
  assert.match(panel, /openSurfaces\.stays/);
  assert.match(panel, /Agoda/);
  assert.doesNotMatch(panel, /srcDoc/);
  assert.match(panel, /partner tool does not load/);
  assert.doesNotMatch(panel, /Stay22/);
  assert.match(routePage, /\/plan\?route=/);
  const routeCard = await readFile("src/components/route-card.tsx", "utf8");
  const comparison = await readFile("src/components/compare-journeys.tsx", "utf8");
  assert.match(routeCard, /\/plan\?route=/);
  assert.match(comparison, /\/plan\?route=/);
});

test("Belfast–Derry is a complete Northern Irish coastal journey", async () => {
  assert.equal(getRouteBySlug("belfast-derry"), belfastDerryRoute);
  assert.deepEqual(validateRoute(belfastDerryRoute), []);
  assert.deepEqual(belfastDerryRoute.stops.map((stop) => stop.name), ["Belfast Grand Central", "Antrim", "Ballymena", "Cullybackey", "Ballymoney", "Coleraine", "Castlerock", "Bellarena", "Derry~Londonderry"]);
  assert.equal(belfastDerryRoute.capabilities.rideMode, false);
  for (const query of ["Northern Ireland", "Causeway Coast", "Castlerock", "Downhill", "River Foyle"]) assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "belfast-derry"));
  const data = JSON.parse(await readFile("public/data/routes/belfast-derry.geojson", "utf8")) as { metadata: { osmWayIds: number[]; osmRelationIds: number[] }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  assert.equal(data.features[0].geometry.coordinates.length, 1885);
  assert.equal(data.metadata.osmWayIds.length, 218);
  assert.deepEqual(data.metadata.osmRelationIds, []);
  assert.ok(Math.abs(routeLengthKm(data.features[0].geometry.coordinates) - 153.29) < 0.02);
});

test("Dublin–Rosslare is a complete Irish east-coast journey", async () => {
  assert.equal(getRouteBySlug("dublin-rosslare"), dublinRosslareRoute);
  assert.deepEqual(validateRoute(dublinRosslareRoute), []);
  assert.deepEqual(dublinRosslareRoute.stops.map((stop) => stop.name), ["Dublin Connolly", "Tara Street", "Dublin Pearse", "Dún Laoghaire", "Bray", "Greystones", "Kilcoole", "Wicklow", "Rathdrum", "Arklow", "Gorey", "Enniscorthy", "Wexford", "Rosslare Strand", "Rosslare Europort"]);
  assert.equal(dublinRosslareRoute.capabilities.rideMode, false);
  for (const query of ["Ireland", "Dublin Bay", "Bray Head", "Wexford Harbour", "Rosslare Europort"]) assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "dublin-rosslare"));
  const data = JSON.parse(await readFile("public/data/routes/dublin-rosslare.geojson", "utf8")) as { metadata: { osmWayIds: number[]; osmRelationIds: number[] }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  assert.equal(data.features[0].geometry.coordinates.length, 2643);
  assert.equal(data.metadata.osmWayIds.length, 451);
  assert.deepEqual(data.metadata.osmRelationIds, [16753439]);
  assert.ok(Math.abs(routeLengthKm(data.features[0].geometry.coordinates) - 167.86) < 0.02);
  assert.ok(getJourneyCollection("irish-rail-journeys")?.routeSlugs.includes("dublin-rosslare"));
});

test("Douro Line is a complete Portuguese river journey", async () => {
  assert.equal(getRouteBySlug("douro-line"), douroLineRoute);
  assert.deepEqual(validateRoute(douroLineRoute), []);
  assert.deepEqual(douroLineRoute.summary.countries, ["Portugal"]);
  assert.deepEqual(douroLineRoute.stops.map((stop) => stop.name), ["Porto Campanhã", "Ermesinde", "Penafiel", "Caíde", "Marco de Canaveses", "Mosteirô", "Aregos", "Régua", "Pinhão", "Tua", "Ferradosa", "Pocinho"]);
  for (const query of ["Linha do Douro", "Porto Campanhã", "Régua", "Pinhão", "vineyards", "Portugal"]) assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "douro-line"));
  const data = JSON.parse(await readFile("public/data/routes/douro-line.geojson", "utf8")) as { metadata: { osmWayIds: number[]; osmRelationIds: number[] }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  assert.equal(data.features[0].geometry.coordinates.length, 2805);
  assert.equal(data.metadata.osmWayIds.length, 380);
  assert.deepEqual(data.metadata.osmRelationIds, [4508126, 1724300]);
  assert.ok(Math.abs(routeLengthKm(data.features[0].geometry.coordinates) - 169.91) < 0.02);
  assert.equal(getRouteRelationships("douro-line").length, 2);
});

test("First Passage to the West models a two-day Canadian tourism journey", async () => {
  assert.equal(getRouteBySlug("first-passage-west"), firstPassageWestRoute);
  assert.deepEqual(validateRoute(firstPassageWestRoute), []);
  assert.equal(firstPassageWestRoute.summary.journeyDays, 2);
  assert.deepEqual(firstPassageWestRoute.summary.overnightStops, ["Kamloops"]);
  assert.deepEqual(firstPassageWestRoute.stops.map((stop) => stop.name), ["Vancouver", "Kamloops", "Banff"]);
  assert.match(firstPassageWestRoute.journeyInformation.find((item) => item.id === "overnight")?.detail ?? "", /not a sleeper train/i);
  for (const query of ["Rocky Mountaineer", "Fraser Canyon", "Kamloops", "Spiral Tunnels", "Canadian Rockies", "multi-day train"]) assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "first-passage-west"));
  const data = JSON.parse(await readFile("public/data/routes/first-passage-west.geojson", "utf8")) as { metadata: { osmWayIds: number[]; osmRelationIds: number[] }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  assert.equal(data.features[0].geometry.coordinates.length, 12247);
  assert.equal(data.metadata.osmWayIds.length, 606);
  assert.deepEqual(data.metadata.osmRelationIds, [7449835, 19430310, 7449764, 7449700, 8106956, 7449396]);
  assert.ok(Math.abs(routeLengthKm(data.features[0].geometry.coordinates) - 899.37) < 0.02);
  assert.equal(getRouteRelationships("first-passage-west").length, 2);
  assert.equal(firstPassageWestRoute.capabilities.rideMode, false);
});

test("California Zephyr is a complete three-day United States journey", () => {
  assert.equal(getRouteBySlug("california-zephyr"), californiaZephyrRoute);
  assert.deepEqual(validateRoute(californiaZephyrRoute), []);
  assert.deepEqual(californiaZephyrRoute.summary.countries, ["United States"]);
  assert.equal(californiaZephyrRoute.summary.journeyDays, 3);
  assert.deepEqual(californiaZephyrRoute.stops.map((stop) => stop.name), ["Chicago", "Omaha", "Denver Union Station", "Fraser–Winter Park", "Glenwood Springs", "Grand Junction", "Salt Lake City", "Reno", "Sacramento Valley Station", "Emeryville"]);
  assert.ok(californiaZephyrRoute.timelineEntries.every((entry, index, entries) => index === 0 || entry.distanceAlongRouteKm > entries[index - 1].distanceAlongRouteKm));
  assert.ok(californiaZephyrRoute.timelineEntries.some((entry) => entry.id === "timeline-first-night"));
  assert.ok(californiaZephyrRoute.timelineEntries.some((entry) => entry.id === "timeline-second-night"));
  assert.equal(californiaZephyrRoute.capabilities.rideMode, false);
});

test("California Zephyr search, direction, collections, comparison, and library remain generic", () => {
  for (const query of ["California Zephyr", "Amtrak", "Chicago", "Denver", "Glenwood Springs", "Salt Lake City", "Reno", "Sacramento", "Emeryville", "San Francisco Bay Area", "Rocky Mountains", "Sierra Nevada", "Colorado River", "Donner Pass", "sleeper", "overnight", "United States"]) {
    assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "california-zephyr"), `Expected California Zephyr for ${query}`);
  }
  assert.equal(searchRoutes(getAllRoutes(), "Donner Pass")[0]?.matchLabel, "Donner Pass");
  const reverseStops = getDirectionalStops(californiaZephyrRoute, "reverse");
  assert.equal(reverseStops[0].name, "Emeryville");
  assert.equal(reverseStops.at(-1)?.name, "Chicago");
  const reverseTimeline = getDirectionalTimeline(californiaZephyrRoute, "reverse");
  assert.equal(reverseTimeline[0].id, "timeline-bay");
  assert.equal(reverseTimeline.at(-1)?.id, "timeline-plains");
  assert.equal(getDirectionalSegments(californiaZephyrRoute, "reverse").find((segment) => segment.id === "sierra")?.reverseDirectionSide, "left");
  assert.equal(getRouteRelationships("california-zephyr").length, 2);
  assert.ok(getJourneyCollection("multi-day-journeys")?.routeSlugs.includes("california-zephyr"));
  assert.ok(getJourneyCollection("great-rail-crossings")?.routeSlugs.includes("california-zephyr"));
  assert.deepEqual(getLibrarySummary([californiaZephyrRoute]), { journeyCount: 1, countryCount: 1, distanceKm: 3886.14, countries: ["United States"] });
});

test("California Zephyr geometry is continuous, canonical, and matches prepared metadata", async () => {
  const data = JSON.parse(await readFile("public/data/routes/california-zephyr.geojson", "utf8")) as { metadata: { relationIds: number[]; contributingWayIds: number[]; coordinateCount: number; calculatedLengthKm: number }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  const coordinates = data.features[0].geometry.coordinates;
  assert.equal(coordinates.length, 46883);
  assert.equal(data.metadata.coordinateCount, coordinates.length);
  assert.deepEqual(data.metadata.relationIds, [8440320]);
  assert.equal(data.metadata.contributingWayIds.length, 2438);
  assert.ok(coordinates[0][0] > coordinates.at(-1)![0]);
  assert.ok(Math.abs(routeLengthKm(coordinates) - 3886.14) < 0.02);
  assert.equal(data.metadata.calculatedLengthKm, 3886.14);
});

test("previous seven GeoJSON paths remain stable", () => {
  const expected = ["glacier-express", "bernina-express", "goldenpass-express", "west-highland-line", "flam-railway", "cinque-terre", "tranzalpine"];
  assert.deepEqual(expected.map((slug) => getRouteBySlug(slug)?.geoJsonPath), expected.map((slug) => `/data/routes/${slug}.geojson`));
});

test("Bergen Line is a complete scheduled Norwegian mountain crossing", () => {
  assert.equal(getRouteBySlug("bergen-line"), bergenLineRoute);
  assert.deepEqual(validateRoute(bergenLineRoute), []);
  assert.deepEqual(bergenLineRoute.stops.map((stop) => stop.name), ["Oslo", "Hønefoss", "Nesbyen", "Gol", "Ål", "Geilo", "Ustaoset", "Finse", "Myrdal", "Voss", "Dale", "Bergen"]);
  assert.equal(bergenLineRoute.summary.operator, "Vy");
  assert.equal(bergenLineRoute.capabilities.rideMode, false);
  assert.equal(featuredRouteSlugs.length, 3);
});

test("Bergen Line search, collections, relationships, and library stay generic", () => {
  for (const query of ["Bergen Line", "Bergen Railway", "Bergensbanen", "Oslo", "Bergen", "Hallingdal", "Geilo", "Finse", "Hardangervidda", "Myrdal", "Voss", "Vy", "Norway", "mountain", "plateau"]) {
    assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "bergen-line"), `Expected Bergen Line for ${query}`);
  }
  for (const slug of ["northern-landscapes", "full-day-journeys", "mountain-journeys", "great-rail-crossings"]) assert.ok(getJourneyCollection(slug)?.routeSlugs.includes("bergen-line"));
  assert.deepEqual(getRouteRelationships("bergen-line").map((item) => item.slug), ["flam-railway", "tranzalpine"]);
  assert.ok(getRouteRelationships("flam-railway").some((item) => item.slug === "bergen-line"));
  assert.match(bergenLineRoute.journeyInformation.find((item) => item.id === "myrdal-connection")?.detail ?? "", /separate Flåm Railway/);
  assert.deepEqual(getLibrarySummary([bergenLineRoute]), { journeyCount: 1, countryCount: 1, distanceKm: 482.01, countries: ["Norway"] });
  assert.equal(parseComparisonRoutes("bergen-line,flam-railway", getAllRoutes()).length, 2);
});

test("Bergen Line geometry, direction, timeline, and Best Side data are prepared", async () => {
  const data = JSON.parse(await readFile("public/data/routes/bergen-line.geojson", "utf8")) as { metadata: { relationIds: number[]; contributingWayIds: number[]; coordinateCount: number; calculatedLengthKm: number }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  const geometry = data.features[0].geometry.coordinates;
  assert.deepEqual(data.metadata.relationIds, [950556, 9531101]);
  assert.equal(data.metadata.contributingWayIds.length, 1075);
  assert.equal(data.metadata.coordinateCount, 12580);
  assert.equal(geometry.length, 12580);
  assert.ok(Math.abs(routeLengthKm(geometry) - 482.01) < 0.02);
  assert.ok(projectCoordinateOntoRoute([bergenLineRoute.stops[0].longitude, bergenLineRoute.stops[0].latitude], geometry).distanceFromRouteMeters < 5);
  assert.ok(projectCoordinateOntoRoute([bergenLineRoute.stops.at(-1)!.longitude, bergenLineRoute.stops.at(-1)!.latitude], geometry).distanceFromRouteMeters < 5);
  assert.ok(bergenLineRoute.timelineEntries.every((entry, index, entries) => index === 0 || entry.distanceAlongRouteKm > entries[index - 1].distanceAlongRouteKm));
  assert.ok(getDirectionalTimeline(bergenLineRoute, "reverse").every((entry, index, entries) => index === 0 || entry.distanceAlongRouteKm > entries[index - 1].distanceAlongRouteKm));
  assert.deepEqual(getDirectionalEndpoints(bergenLineRoute, "reverse"), { origin: "Bergen", destination: "Oslo" });
  assert.ok(bergenLineRoute.bestSideSegments.every((segment) => segment.confidenceType === "limited-data"));
  assert.equal(bergenLineRoute.bestSideSegments[1].forwardDirectionSide, "right");
  assert.equal(bergenLineRoute.bestSideSegments[1].reverseDirectionSide, "left");
});

test("The Ghan is a complete Australian multi-day journey", () => {
  assert.equal(getRouteBySlug("the-ghan"), theGhanRoute);
  assert.deepEqual(validateRoute(theGhanRoute), []);
  assert.deepEqual(theGhanRoute.stops.map((stop) => stop.name), ["Adelaide", "Port Augusta", "Marla", "Alice Springs", "Katherine", "Darwin"]);
  assert.equal(theGhanRoute.summary.journeyDays, 3);
  assert.equal(theGhanRoute.capabilities.rideMode, false);
  assert.equal(featuredRouteSlugs.length, 3);
});

test("The Ghan uses generic search, catalogue, comparison, and library integrations", () => {
  for (const query of ["The Ghan", "Adelaide", "Darwin", "Alice Springs", "Katherine", "Marla", "Journey Beyond", "Australia", "desert", "sleeper train"]) assert.ok(searchRoutes(getAllRoutes(), query).some((result) => result.route.summary.slug === "the-ghan"), `Expected The Ghan for ${query}`);
  assert.ok(getAllRoutes().filter((route) => route.summary.countries.includes("Australia")).some((route) => route.summary.slug === "the-ghan"));
  assert.ok(theGhanRoute.summary.journeyTypes.includes("multi-day"));
  assert.ok(getJourneyCollection("multi-day-journeys")?.routeSlugs.includes("the-ghan"));
  assert.ok(getJourneyCollection("great-rail-crossings")?.routeSlugs.includes("the-ghan"));
  assert.equal(getRouteRelationships("the-ghan").length, 2);
  assert.equal(parseComparisonRoutes("the-ghan,california-zephyr", getAllRoutes()).length, 2);
  assert.deepEqual(getLibrarySummary([theGhanRoute]), { journeyCount: 1, countryCount: 1, distanceKm: 2980.57, countries: ["Australia"] });
});

test("The Ghan geometry and direction-aware experience are prepared", async () => {
  const data = JSON.parse(await readFile("public/data/routes/the-ghan.geojson", "utf8")) as { metadata: { relationIds: number[]; contributingWayIds: number[]; coordinateCount: number; calculatedLengthKm: number }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
  const coordinates = data.features[0].geometry.coordinates;
  assert.deepEqual(data.metadata.relationIds, [1148765]);
  assert.equal(data.metadata.contributingWayIds.length, 471);
  assert.equal(data.metadata.coordinateCount, coordinates.length);
  assert.ok(coordinates.length > 6000);
  assert.ok(Math.abs(routeLengthKm(coordinates) - 2980.57) < 0.03);
  assert.ok(projectCoordinateOntoRoute([theGhanRoute.stops[0].longitude, theGhanRoute.stops[0].latitude], coordinates).distanceFromRouteMeters < 5);
  assert.ok(projectCoordinateOntoRoute([theGhanRoute.stops.at(-1)!.longitude, theGhanRoute.stops.at(-1)!.latitude], coordinates).distanceFromRouteMeters < 5);
  assert.deepEqual(getDirectionalEndpoints(theGhanRoute, "reverse"), { origin: "Darwin", destination: "Adelaide" });
  assert.ok(getDirectionalTimeline(theGhanRoute, "reverse").every((entry, index, entries) => index === 0 || entry.distanceAlongRouteKm > entries[index - 1].distanceAlongRouteKm));
  assert.ok(theGhanRoute.bestSideSegments.every((segment) => segment.confidenceType === "limited-data"));
});

test("Kandy–Ella Railway, Coast Starlight, and The Canadian are complete generic routes", async () => {
  const routes = [kandyEllaRailwayRoute, coastStarlightRoute, theCanadianRoute];
  assert.deepEqual(routes.map((route) => getRouteBySlug(route.summary.slug)), routes);
  for (const route of routes) {
    assert.deepEqual(validateRoute(route), []);
    assert.equal(route.capabilities.rideMode, false);
    assert.equal(getRouteRelationships(route.summary.slug).length, 2);
    assert.ok(parseComparisonRoutes(`${route.summary.slug},the-ghan`, getAllRoutes()).length === 2);
    assert.ok(getLibrarySummary([route]).distanceKm > 0);
    assert.ok(getDirectionalTimeline(route, "reverse").every((entry, index, entries) => index === 0 || entry.distanceAlongRouteKm > entries[index - 1].distanceAlongRouteKm));
    assert.ok(route.bestSideSegments.every((segment) => segment.confidenceType === "limited-data"));
    const data = JSON.parse(await readFile(`public${route.geoJsonPath}`, "utf8")) as { metadata: { coordinateCount: number; calculatedLengthKm: number }; features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
    assert.equal(data.metadata.coordinateCount, data.features[0].geometry.coordinates.length);
    assert.ok(data.features[0].geometry.coordinates.length >= 10);
    assert.ok(Math.abs(routeLengthKm(data.features[0].geometry.coordinates) - data.metadata.calculatedLengthKm) < 0.02);
  }
  for (const query of ["Kandy Ella", "Nine Arch Bridge", "Sri Lanka", "Coast Starlight", "Santa Barbara", "Amtrak", "The Canadian", "VIA Rail", "Jasper", "Vancouver"]) assert.ok(searchRoutes(getAllRoutes(), query).length > 0, `Expected search result for ${query}`);
  assert.ok(getJourneyCollection("multi-day-journeys")?.routeSlugs.includes("the-canadian"));
  assert.ok(getJourneyCollection("coastal-journeys")?.routeSlugs.includes("coast-starlight"));
  assert.ok(getJourneyCollection("mountain-journeys")?.routeSlugs.includes("kandy-ella-railway"));
});

test("Eastern Express, Hiram Bingham, and Alishan Forest Railway remain generic routes", async () => {
  for (const route of [easternExpressRoute, hiramBinghamRoute, alishanForestRailwayRoute]) {
    assert.deepEqual(validateRoute(route), []);
    assert.equal(getRouteBySlug(route.summary.slug), route);
    assert.equal(route.capabilities.rideMode, false);
    assert.equal(getRouteRelationships(route.summary.slug).length, 2);
    assert.ok(getDirectionalStops(route, "reverse")[0].name === route.summary.destination);
    assert.ok(route.bestSideSegments.every((segment) => segment.confidenceType === "limited-data"));
    const data = JSON.parse(await readFile(`public${route.geoJsonPath}`, "utf8")) as { features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> };
    assert.ok(data.features[0].geometry.coordinates.length >= 3);
  }
  for (const query of ["Doğu Ekspresi", "Kars", "Hiram Bingham", "Machu Picchu", "Alishan", "Chiayi", "Taiwan"]) assert.ok(searchRoutes(getAllRoutes(), query).length > 0);
  assert.equal(featuredRouteSlugs.length, 3);
});
