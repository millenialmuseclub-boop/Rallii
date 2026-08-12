import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { glacierExpressRoute } from "../src/data/routes/glacier-express.ts";
import { berninaExpressRoute } from "../src/data/routes/bernina-express.ts";
import { goldenPassExpressRoute } from "../src/data/routes/goldenpass-express.ts";
import { westHighlandLineRoute } from "../src/data/routes/west-highland-line.ts";
import { flamRailwayRoute } from "../src/data/routes/flam-railway.ts";
import { getAllRoutes, getRouteBySlug } from "../src/data/routes/index.ts";
import { validateRoute } from "../src/lib/route-validation.ts";
import { normalizeSearchText, searchRoutes } from "../src/lib/route-search.ts";
import { buildComparisonPath, getBestSideSummary, getJourneyDurationCategory, parseComparisonRoutes } from "../src/lib/journey-comparison.ts";
import { getCollectionRoutes, getJourneyCollection, journeyCollections } from "../src/data/journey-collections.ts";

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
  assert.equal(getAllRoutes().length, 5);
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

for (const slug of ["glacier-express", "bernina-express", "goldenpass-express", "west-highland-line", "flam-railway"]) test(`${slug} geometry is a sourced GeoJSON LineString`, async () => {
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
  assert.ok((feature?.geometry?.coordinates?.length ?? 0) > 500);
});
