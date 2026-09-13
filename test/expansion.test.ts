import assert from "node:assert/strict";
import test from "node:test";
import { discoveryCatalogue } from "../src/data/discovery-catalogue.ts";
import { searchDiscovery } from "../src/lib/discovery-search.ts";
import { approvedAffiliateUrl } from "../src/data/affiliate-offers.ts";
import { snowDestinations } from "../src/snow/data.ts";
test("global catalogue keeps mode identities unique and country filters independent",()=>{
 assert.equal(new Set(discoveryCatalogue.map(p=>p.id)).size,discoveryCatalogue.length);
 assert.equal(new Set(discoveryCatalogue.map(p=>p.href)).size,discoveryCatalogue.length);
 assert.ok(searchDiscovery(discoveryCatalogue,"Cervinia","snow","Italy").some(p=>p.slug==="cervinia"));
 assert.deepEqual(searchDiscovery(discoveryCatalogue,"Cervinia","mtb"),[]);
 assert.ok(searchDiscovery(discoveryCatalogue,"Pucon","mtb","Chile").length);
 assert.ok(searchDiscovery(discoveryCatalogue,"","trail","Norway").some(p=>p.slug==="preikestolen"));
});
test("snow planning covers both hemispheres without inventing live conditions",()=>{
 for(const place of snowDestinations){assert.equal(place.conditions.status,"not-connected");assert.equal(place.perfectDay.length,3);assert.ok(place.airport&&place.lodging&&place.highlights.length>=3);}
 assert.ok(snowDestinations.find(p=>p.slug==="portillo")!.bestMonths.includes(8));
 assert.ok(snowDestinations.find(p=>p.slug==="hakuba")!.bestMonths.includes(1));
});
test("affiliate tracking preserves existing query values and rejects unsafe URLs",()=>{
 assert.equal(approvedAffiliateUrl("javascript:alert(1)"),null);
 assert.equal(approvedAffiliateUrl("https://user:secret@example.com"),null);
 assert.equal(approvedAffiliateUrl("https://example.com/path?existing=1",{campaign:"snow trip"}),"https://example.com/path?existing=1&campaign=snow+trip");
});
