import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { mtbDestinations, filterMtb } from "../src/mtb/data.ts";
import { parseMtbLibrary, updateMtbSave, MTB_LIBRARY_KEY } from "../src/mtb/library.ts";
import { activities, activityForPath, launchActivity, parseActivityPaths } from "../src/lib/activities.ts";
import { parseCollections, updateCollection } from "../src/lib/pro-collections.ts";

test("MTB has thirty independent, fully described destination guides and local credited photography", () => {
  const media = JSON.parse(readFileSync(new URL("../src/mtb/media.json", import.meta.url), "utf8"));
  assert.equal(mtbDestinations.length, 30);
  assert.equal(new Set(mtbDestinations.map(item => item.slug)).size, 30);
  for (const ride of mtbDestinations) {
    for (const field of [ride.summary, ride.terrain, ride.notes, ride.season, ride.start, ride.bike]) assert.ok(field.length > 20, ride.slug);
    assert.ok(ride.skills.length && ride.sections.length >= 3);
    assert.ok(ride.sourceUrl.startsWith("https://"));
    assert.equal(ride.distanceKm, null, "area guides must not invent a measured route");
    assert.equal(ride.elevationGainM, null);
    const image = media[ride.imageKey];
    assert.ok(image?.credit && image?.license && image?.caption, ride.slug);
    assert.ok(existsSync(new URL(`../public${image.src}`, import.meta.url)), ride.slug);
  }
});
test("MTB search combines rider level, place and riding style without changing the catalogue", () => {
  assert.equal(filterMtb("Whistler", "Beginner", "Canada", "Bike park")[0]?.slug, "whistler-bike-park");
  assert.equal(filterMtb("Moab", "Beginner").length, 1);
  assert.equal(filterMtb("QueENStown").length, 1);
  assert.equal(filterMtb("nonexistent place").length, 0);
  assert.equal(filterMtb().length, 30);
});
test("MTB Want to Ride, Ridden and Favorites round-trip without touching other libraries", () => {
  assert.equal(MTB_LIBRARY_KEY, "rallii:mtb-library:v1");
  const first = updateMtbSave(parseMtbLibrary(null), "whistler-bike-park", "want_to_ride");
  const favorite = updateMtbSave(first, "whistler-bike-park", "favorite");
  const ridden = updateMtbSave(favorite, "whistler-bike-park", "ridden");
  assert.equal(first.rides["whistler-bike-park"].favorite, false);
  assert.deepEqual(parseMtbLibrary(JSON.stringify(ridden)), ridden);
  assert.deepEqual(ridden.rides["whistler-bike-park"], { status: "ridden", favorite: true });
  assert.deepEqual(updateMtbSave(ridden, "whistler-bike-park", "ridden").rides, {});
  for (const raw of [null, "broken", "[]", '{"version":2,"rides":{}}', '{"version":1,"rides":{"x":null,"__proto__":{"status":"ridden"}}}']) assert.deepEqual(parseMtbLibrary(raw).rides, {});
});
test("released-mode routing remembers MTB without making it an alias of Trail", () => {
  assert.deepEqual(activities.map(item => item.id), ["rail", "green", "trail", "mtb", "snow"]);
  assert.equal(activityForPath("/mtb/whistler-bike-park/"), "mtb");
  assert.equal(activityForPath("/trail/mist-trail/"), "trail");
  assert.equal(launchActivity("/", true, "mtb"), "mtb");
  assert.equal(launchActivity("/trail/mist-trail/", true, "mtb"), "trail");
  assert.deepEqual(parseActivityPaths(JSON.stringify({ mtb: "/mtb/?skill=Beginner", trail: "/trail/?difficulty=Easy" })), { mtb: "/mtb/?skill=Beginner", trail: "/trail/?difficulty=Easy" });
  assert.deepEqual(parseActivityPaths(JSON.stringify({ mtb: "/trail/", trail: "/mtb/" })), {});
});
test("one Pro collection supports all four modes and preserves older collections and expiry behavior", () => {
  const old = { id: "trip", name: "Trip", notes: "Existing notes", experiences: [{ activity: "rail" as const, slug: "glacier-express" }, { activity: "green" as const, slug: "pebble-beach" }, { activity: "trail" as const, slug: "mist-trail" }] };
  const next = { ...old, experiences: [...old.experiences, { activity: "mtb" as const, slug: "whistler-bike-park" }] };
  assert.deepEqual(updateCollection([old], next, false), [old]);
  const saved = updateCollection([old], next, true);
  assert.equal(parseCollections(JSON.stringify({ version: 1, collections: saved }))[0].experiences.length, 4);
  assert.deepEqual(parseCollections(JSON.stringify({ version: 1, collections: [old] })), [old]);
});
