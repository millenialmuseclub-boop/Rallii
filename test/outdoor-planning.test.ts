import assert from "node:assert/strict";
import test from "node:test";
import { trails } from "../src/trail/data.ts";
import { mtbDestinations } from "../src/mtb/data.ts";
import { snowDestinations } from "../src/snow/data.ts";
import { matchesTrailPlan } from "../src/trail/trip-planning.ts";
import { matchesMtbPlan } from "../src/mtb/trip-planning.ts";
import { matchesSnowPlan } from "../src/snow/trip-planning.ts";

test("hiking preferences intersect distance, effort and shape; unknown gain is excluded", () => {
  const choices = new URLSearchParams({ difficulty: "Easy", distance: "Under 5 km", shape: "Loop", gain: "Under 300 m" });
  const matches = trails.filter(item => matchesTrailPlan(item, choices));
  assert.ok(matches.some(item => item.slug === "lower-yosemite-fall"));
  assert.ok(!matches.some(item => item.slug === "upper-yosemite-falls"));
  assert.equal(matchesTrailPlan({ ...matches[0], elevationGainM: null }, choices), false);
  assert.equal(matchesTrailPlan({ ...matches[0], distanceKm: 5 }, choices), false);
});
test("MTB planning distinguishes a pedal trail system from a lift-assisted bike park", () => {
  const lostLake = mtbDestinations.find(item => item.slug === "lost-lake")!;
  const park = mtbDestinations.find(item => item.slug === "whistler-bike-park")!;
  const choices = new URLSearchParams({ skill: "Beginner", kind: "Trail system", access: "Pedal-powered", terrain: "Forest" });
  assert.equal(matchesMtbPlan(lostLake, choices), true);
  assert.equal(matchesMtbPlan(park, choices), false);
  assert.equal(matchesMtbPlan(park, new URLSearchParams({ access: "Lift-assisted" })), true);
});
test("snow timing respects the hemisphere and leaves experience choices to planning notes", () => {
  const southern = snowDestinations.find(item => item.slug === "coronet-peak")!;
  const northern = snowDestinations.find(item => item.slug === "zermatt")!;
  assert.equal(matchesSnowPlan(southern, new URLSearchParams({ month: "August" })), true);
  assert.equal(matchesSnowPlan(northern, new URLSearchParams({ month: "August" })), false);
  assert.equal(matchesSnowPlan(northern, new URLSearchParams({ month: "January", activity: "Scenic-only", skill: "First timer" })), true);
});
