import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import { trails, filterTrails } from "../src/trail/data.ts";
import { parseTrailLibrary, updateTrailStatus, TRAIL_LIBRARY_KEY } from "../src/trail/library.ts";
import { parseActivityPaths, activityForPath, isFamilyPath, launchActivity } from "../src/lib/activities.ts";
import { parseCollections, updateCollection } from "../src/lib/pro-collections.ts";
import { TRAVEL_LIBRARY_KEY, parseTravelLibrary } from "../src/lib/travel-library.ts";
import { COURSE_LIBRARY_KEY, parseCourseLibrary } from "../src/green/lib/course-library.ts";

test("Trail catalogue has 30 unique complete guides with licensed local media and no invented geometry", () => {
  const media = JSON.parse(readFileSync(new URL("../src/trail/media.json", import.meta.url), "utf8"));
  assert.equal(trails.length, 30);
  assert.equal(new Set(trails.map(trail => trail.slug)).size, 30);
  for (const trail of trails) {
    assert.ok(trail.distanceKm > 0);
    assert.ok(trail.elevationGainM === null || trail.elevationGainM >= 0);
    for (const field of [trail.whyGo, trail.route, trail.guidance, trail.bestTime, trail.map.trailhead.name]) assert.ok(field.length > 5, trail.slug);
    assert.ok(trail.sourceUrl.startsWith("https://"));
    const photo = media[trail.imageKey];
    assert.ok(photo?.credit && photo.sourceUrl && photo.licenseUrl, trail.slug);
    assert.ok(existsSync(new URL(`../public${photo.src}`, import.meta.url)), trail.slug);
    assert.equal(trail.map.geometry, undefined);
    assert.equal(trail.map.offlinePack, undefined);
  }
});
test("discovery combines filters, matches scenery and handles diacritics and empty results", () => {
  assert.equal(filterTrails("kilauea")[0]?.slug, "kilauea-iki");
  assert.ok(filterTrails("waterfalls", "Easy", "California").length > 0);
  assert.ok(filterTrails("waterfalls", "Easy", "California").every(trail => trail.difficulty === "Easy" && trail.region === "California"));
  assert.deepEqual(filterTrails("no-such-trail"), []);
  assert.equal(filterTrails(" ").length, 30);
});
test("Trail status updates persist, replace and remove without changing existing mode schemas", () => {
  const rail = '{"version":1,"routes":{"glacier-express":"want_to_go"}}';
  const green = '{"version":1,"courses":{"pebble-beach":"played"}}';
  assert.equal(new Set([TRAIL_LIBRARY_KEY, TRAVEL_LIBRARY_KEY, COURSE_LIBRARY_KEY]).size, 3);
  const first = updateTrailStatus(parseTrailLibrary(null), "mist-trail", "want_to_go");
  const next = updateTrailStatus(first, "mist-trail", "been");
  assert.equal(first.trails["mist-trail"], "want_to_go");
  assert.equal(parseTrailLibrary(JSON.stringify(next)).trails["mist-trail"], "been");
  assert.deepEqual(updateTrailStatus(next, "mist-trail").trails, {});
  assert.equal(parseTravelLibrary(rail).routes["glacier-express"], "want_to_go");
  assert.equal(parseCourseLibrary(green).courses["pebble-beach"], "played");
  for (const raw of ["oops", "[]", '{"version":2,"trails":{}}', '{"version":1,"trails":[]}']) assert.deepEqual(parseTrailLibrary(raw).trails, {});
  assert.deepEqual(parseTrailLibrary('{"version":1,"trails":{"mist-trail":"been","unknown":"admin","__proto__":"been"}}').trails, {"mist-trail":"been"});
});
test("remembered mode paths stay internal, preserve queries, and keep family pages neutral", () => {
  assert.equal(activityForPath("/trail/mist-trail/"), "trail");
  assert.equal(launchActivity("/", true, "trail"), "trail");
  assert.equal(launchActivity("/routes/glacier-express/", true, "trail"), "rail");
  assert.equal(isFamilyPath("/"), true);
  assert.deepEqual(parseActivityPaths(JSON.stringify({trail:"/trail/?difficulty=Easy",green:"/green/courses/pebble-beach/",rail:"/routes/glacier-express/?direction=reverse"})), {trail:"/trail/?difficulty=Easy",green:"/green/courses/pebble-beach/",rail:"/routes/glacier-express/?direction=reverse"});
  for (const path of ["https://evil.test", "//evil.test", "/\\evil.test", "/pro/", "/green/"]) assert.deepEqual(parseActivityPaths(JSON.stringify({trail:path})), {});
});
test("one Pro collection can contain all three modes and remains readable after expiry", () => {
  const collection = { id: "trip", name: "Outside", notes: "Saved plans", experiences: [{activity:"rail" as const,slug:"glacier-express"},{activity:"green" as const,slug:"pebble-beach"},{activity:"trail" as const,slug:"mist-trail"}] };
  const saved = updateCollection([], collection, true);
  assert.equal(parseCollections(JSON.stringify({version:1,collections:saved}))[0].experiences.length,3);
  assert.deepEqual(updateCollection(saved,{...collection,name:"Changed"},false),saved);
});
