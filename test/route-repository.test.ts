import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { glacierExpressRoute } from "../src/data/routes/glacier-express.ts";
import { getRouteBySlug } from "../src/data/routes/index.ts";
import { validateRoute } from "../src/lib/route-validation.ts";

test("looks up a route by slug", () => {
  assert.equal(getRouteBySlug("glacier-express")?.summary.name, "Glacier Express");
  assert.equal(getRouteBySlug("missing-route"), undefined);
});

test("Glacier Express satisfies route invariants", () => {
  assert.deepEqual(validateRoute(glacierExpressRoute), []);
  assert.equal(glacierExpressRoute.stops[0].name, "Zermatt");
  assert.equal(glacierExpressRoute.stops.at(-1)?.name, "St. Moritz");
});

test("prepared geometry is a sourced GeoJSON LineString", async () => {
  const contents = await readFile("public/data/routes/glacier-express.geojson", "utf8");
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
  assert.match(feature?.properties?.source ?? "", /OpenStreetMap/);
  assert.ok((feature?.geometry?.coordinates?.length ?? 0) > 1_000);
});
