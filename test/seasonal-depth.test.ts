import assert from "node:assert/strict";
import test from "node:test";
import { snowComparison } from "../src/snow/comparison.ts";
import { snowDestinations } from "../src/snow/data.ts";
import { experienceForPath, experienceEvent } from "../src/lib/experience-events.ts";
import { ridingPlans } from "../src/mtb/ride-options.ts";
import { mtbDestinations } from "../src/mtb/data.ts";
import { shopMyProducts, productsForExperience } from "../src/data/shopmy-products.ts";

test("shared Snow comparisons repair stale IDs, duplicates and extra selections",()=>{
  const known=snowDestinations.map(place=>place.slug);
  assert.deepEqual(snowComparison("portillo,portillo,missing",known),["portillo","whistler-blackcomb"]);
  assert.deepEqual(snowComparison("missing,zermatt",known),["zermatt","whistler-blackcomb"]);
  assert.deepEqual(snowComparison("portillo,zermatt,whistler-blackcomb",known),["portillo","zermatt"]);
});
test("seasonal depth references existing destinations and keeps navigation uncertainty explicit",()=>{
  for(const slug of Object.keys(ridingPlans))assert.ok(mtbDestinations.some(ride=>ride.slug===slug));
  assert.match(ridingPlans["tahoe-flume"].options[0].distance,/segment only/);
  assert.ok(snowDestinations.find(place=>place.slug==="zermatt")!.bestMonths.includes(4));
  assert.ok(snowDestinations.find(place=>place.slug==="portillo")!.bestMonths.includes(8));
  for(const place of snowDestinations)assert.equal(place.conditions.status,"not-connected");
});
test("view event context excludes catalogue and comparison pages and works without browser globals",()=>{
  assert.deepEqual(experienceForPath("/routes/bernina-express/"),{mode:"rail",route_id:"bernina-express"});
  assert.equal(experienceForPath("/snow/compare/"),null);
  assert.equal(experienceForPath("/mtb/"),null);
  assert.doesNotThrow(()=>experienceEvent("route_view",{mode:"snow",route_id:"portillo"}));
});
test("ShopMy placements retain verified URLs and stay scoped to relevant experiences",()=>{
  assert.equal(new Set(shopMyProducts.map(product=>product.url)).size,shopMyProducts.length);
  for(const product of shopMyProducts){
    assert.match(product.url,/^https:\/\/go\.shopmy\.us\/p-\d+$/);
    assert.equal(new URL(product.retailerUrl).hostname,"www.rei.com");
    assert.ok(product.verifiedAt);
    for(const [mode,placement] of Object.entries(product.placements)){
      const known=mode==="snow"?snowDestinations:mode==="mtb"?mtbDestinations:null;
      if(known)for(const slug of placement.routes)assert.ok(known.some(place=>place.slug===slug),`${mode}/${slug}`);
    }
  }
  assert.equal(productsForExperience("green","lake-louise").length,0);
  assert.equal(productsForExperience("snow","missing").length,0);
  assert.ok(productsForExperience("mtb","moab-slickrock").some(product=>product.id==="crankbrothers-m19"));
});
