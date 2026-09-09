import assert from "node:assert/strict";
import test from "node:test";
import { filterSnow, snowDestinations } from "../src/snow/data.ts";
import { activityForPath, launchActivity, parseActivityPaths } from "../src/lib/activities.ts";
import { parseSnowLibrary, writeSnowSave, SNOW_LIBRARY_KEY } from "../src/snow/library.ts";
import { parseCollections, updateCollection } from "../src/lib/pro-collections.ts";

test("Snow ships as a complete, independent destination mode", () => {
  assert.equal(snowDestinations.length, 12);
  assert.equal(new Set(snowDestinations.map(item => item.slug)).size, 12);
  for (const place of snowDestinations) {
    assert.ok(place.name && place.location && place.terrain.length > 20 && place.summary.length > 20);
    assert.ok(place.sourceUrl.startsWith("https://"));
  }
  assert.equal(filterSnow("Whistler", "Canada", "Resort")[0]?.slug, "whistler-blackcomb");
  assert.equal(filterSnow("Hokkaido")[0]?.slug, "niseko-united");
});

test("Snow routing and storage stay separate from the existing modes", () => {
  assert.equal(activityForPath("/snow/whistler-blackcomb/"), "snow");
  assert.equal(launchActivity("/", true, "snow"), "snow");
  assert.deepEqual(parseActivityPaths('{"snow":"/snow/?region=Canada","mtb":"/mtb/"}'), { snow: "/snow/?region=Canada", mtb: "/mtb/" });
  assert.equal(SNOW_LIBRARY_KEY, "rallii:snow-library:v1");
  assert.deepEqual(parseSnowLibrary(null), { version: 1, places: {} });
  assert.equal(typeof writeSnowSave, "function");
});

test("Snow can join a shared Pro trip without breaking older collections", () => {
  const old = { id: "winter", name: "Winter", notes: "", experiences: [{ activity: "rail" as const, slug: "glacier-express" }] };
  const next = { ...old, experiences: [...old.experiences, { activity: "snow" as const, slug: "zermatt" }] };
  const saved = updateCollection([old], next, true);
  assert.equal(parseCollections(JSON.stringify({ version: 1, collections: saved }))[0].experiences.length, 2);
});
