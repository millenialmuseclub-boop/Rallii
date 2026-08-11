import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { glacierExpressRoute } from "../src/data/routes/glacier-express.ts";
import { berninaExpressRoute } from "../src/data/routes/bernina-express.ts";
import { goldenPassExpressRoute } from "../src/data/routes/goldenpass-express.ts";
import { westHighlandLineRoute } from "../src/data/routes/west-highland-line.ts";
import { getAllRoutes, getRouteBySlug } from "../src/data/routes/index.ts";
import { validateRoute } from "../src/lib/route-validation.ts";

test("looks up a route by slug", () => {
  assert.equal(getRouteBySlug("glacier-express")?.summary.name, "Glacier Express");
  assert.equal(getRouteBySlug("bernina-express")?.summary.name, "Bernina Express");
  assert.equal(getRouteBySlug("goldenpass-express")?.summary.name, "GoldenPass Express");
  assert.equal(getRouteBySlug("west-highland-line")?.summary.name, "West Highland Line");
  assert.equal(getAllRoutes().length, 4);
  assert.equal(getRouteBySlug("missing-route"), undefined);
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

for (const slug of ["glacier-express", "bernina-express", "goldenpass-express", "west-highland-line"]) test(`${slug} geometry is a sourced GeoJSON LineString`, async () => {
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
  assert.ok((feature?.geometry?.coordinates?.length ?? 0) > 1_000);
});
