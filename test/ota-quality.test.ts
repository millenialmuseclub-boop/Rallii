import test from "node:test";
import assert from "node:assert/strict";
import { seatRecommendation } from "../src/lib/seat-guidance.ts";
import { journeyShareUrl } from "../src/lib/share-journey.ts";
import { experienceForPath } from "../src/lib/experience-events.ts";
import { discoveryCatalogue } from "../src/data/discovery-catalogue.ts";
import { searchDiscovery } from "../src/lib/discovery-search.ts";
import type { BestSideSegment } from "../src/types/route.ts";

const section = (side: BestSideSegment["forwardDirectionSide"], start = 0, end = 10): BestSideSegment => ({ id: "section", startDistanceKm: start, endDistanceKm: end, forwardDirectionSide: side, reverseDirectionSide: side === "left" ? "right" : side === "right" ? "left" : side, reason: "Fixture", confidenceType: "editorial" });
test("seat guidance never turns missing or zero-length data into a left-side recommendation", () => {
  for (const segments of [[], [section("unknown")], [section("left", 0, 0)], [section("left", 10, 0)]]) assert.equal(seatRecommendation(segments, "forward").side, "unknown");
  assert.equal(seatRecommendation([section("left"), section("right", 10, 20)], "forward").side, "varies");
  assert.equal(seatRecommendation([section("left"), section("right", 10, 30)], "forward").side, "right");
  assert.equal(seatRecommendation([section("left"), section("right", 10, 30)], "reverse").side, "left");
});
test("shared journey links use the public site and preserve reverse travel", () => {
  assert.equal(journeyShareUrl("/routes/bernina-express/", "reverse"), "https://rallii-kappa.vercel.app/routes/bernina-express/?direction=reverse");
  assert.equal(journeyShareUrl("/snow/zermatt/"), "https://rallii-kappa.vercel.app/snow/zermatt/");
  assert.throws(() => journeyShareUrl("https://elsewhere.example/"));
});
test("discovery matches cross-border countries, punctuation and southern planning months", () => {
  assert.ok(searchDiscovery(discoveryCatalogue, "Bernina", "rail", "Italy").some(place => place.slug === "bernina-express"));
  assert.ok(searchDiscovery(discoveryCatalogue, "alpine passes", "rail").length);
  assert.ok(searchDiscovery(discoveryCatalogue, "", "snow", "Chile", "8").length);
  assert.equal(searchDiscovery(discoveryCatalogue, "", "snow", "Chile", "1").length, 0);
  assert.equal(searchDiscovery(discoveryCatalogue, "", "trail", "All", "8").length, 0);
  assert.ok(searchDiscovery(discoveryCatalogue, "Flåm", "rail").length);
});
test("planning tools are not misreported as destination views", () => {
  for (const mode of ["snow", "mtb", "trail"]) assert.equal(experienceForPath(`/${mode}/plan/`), null);
});
