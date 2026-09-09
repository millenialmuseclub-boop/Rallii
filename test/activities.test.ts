import assert from "node:assert/strict";
import test from "node:test";
import { activityForPath, launchActivity } from "../src/lib/activities.ts";

test("only Green's namespace selects Green", () => {
  for (const path of ["/green", "/green/", "/green/courses/pebble-beach"]) assert.equal(activityForPath(path), "green");
  for (const path of ["/", "/routes/glacier-express", "/ride/bernina-express", "/greenhouse"]) assert.equal(activityForPath(path), "rail");
});
test("native launch restores an explicit Green preference, preserving Rail defaults and deep links", () => {
  assert.equal(launchActivity("/", true, "green"), "green");
  for (const saved of [null, "rail", "snow", "garbage"]) assert.equal(launchActivity("/", true, saved), "rail");
  assert.equal(launchActivity("/routes/glacier-express", true, "green"), "rail");
  assert.equal(launchActivity("/green/courses/pebble-beach", true, "rail"), "green");
  assert.equal(launchActivity("/", false, "green"), "rail");
});
