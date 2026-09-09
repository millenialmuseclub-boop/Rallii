import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import { createHash } from "node:crypto";
import test from "node:test";
import sharp from "sharp";
import { snowDestinations } from "../src/snow/data.ts";
import { trails } from "../src/trail/data.ts";
import { mtbDestinations } from "../src/mtb/data.ts";
import { publishedCourses } from "../src/green/data/courses.ts";
import { publishedDestinations } from "../src/green/data/destinations.ts";
import { publishedCollections } from "../src/green/data/collections.ts";
import { publishedTrips } from "../src/green/data/trips.ts";
import { courseMedia, getCourseMedia } from "../src/green/data/media.ts";
import { getAllRoutes } from "../src/data/routes/index.ts";
import { routeMediaBySlug } from "../src/data/route-media.ts";

interface Photo { src: string; alt: string; caption: string; credit: string; sourceUrl: string; license: string; licenseUrl: string; width: number; height: number; fileSize: number; position: string; representative?: boolean }
const registry = (mode: string): Record<string, Photo> => JSON.parse(readFileSync(new URL(`../src/${mode}/media.json`, import.meta.url), "utf8"));
const snow = registry("snow"), trail = registry("trail"), mtb = registry("mtb");
const green = Object.fromEntries(courseMedia.map(m => [m.courseSlug!, { ...m, caption:m.caption!, credit:m.creator, position:m.focalPoint! }]));
const rail = Object.fromEntries(Object.entries(routeMediaBySlug).map(([slug,m]) => [slug,{...m,src:m.path,credit:m.creator,sourceUrl:m.sourcePageUrl,license:m.licenseName}]));
const groups = [
  { mode:"snow", records:snowDestinations, media:snow, key:(r:{slug:string;imageKey?:string})=>r.imageKey! },
  { mode:"trail", records:trails, media:trail, key:(r:{slug:string;imageKey?:string})=>r.imageKey! },
  { mode:"mtb", records:mtbDestinations, media:mtb, key:(r:{slug:string;imageKey?:string})=>r.imageKey! },
  { mode:"green", records:publishedCourses, media:green, key:(r:{slug:string})=>r.slug },
  { mode:"rail", records:getAllRoutes().map(r=>r.summary), media:rail, key:(r:{slug:string})=>r.slug },
];

for (const {mode,records,media,key} of groups) {
  test(`${mode}: every published record has distinct local photography and complete attribution`, async () => {
    assert.equal(new Set(records.map(r=>r.slug)).size,records.length);
    const identities = new Set<string>();
    for (const record of records) {
      const m:Photo = media[key(record)];
      assert.ok(m,`${mode}/${record.slug}: unresolved media key`);
      for(const value of [m.alt,m.caption,m.credit,m.license,m.position]) assert.ok(value?.trim(),record.slug);
      for(const value of [m.sourceUrl,m.licenseUrl]) { const url=new URL(value); assert.equal(url.protocol,"https:"); assert.ok(url.hostname.includes(".")); }
      assert.match(m.src,/^\/(?:images|green-assets\/images)\/.+\.(?:webp|jpg|jpeg|png)$/);
      const root=resolve("public"),file=resolve(root,`.${m.src}`);
      assert.ok(file.startsWith(root+sep),`Unsafe asset path: ${m.src}`);
      const bytes=readFileSync(file),hash=createHash("sha256").update(bytes).digest("hex");
      assert.ok(!identities.has(hash),`${mode}/${record.slug}: duplicated record photograph`);
      identities.add(hash);
      assert.equal(statSync(file).size,m.fileSize,`${m.src}: stale file size`);
      const dimensions=await sharp(bytes).metadata();
      assert.equal(dimensions.width,m.width,`${m.src}: stale width`);
      assert.equal(dimensions.height,m.height,`${m.src}: stale height`);
      if(m.representative) { assert.match(m.caption,/representative/i); assert.match(m.alt,/representative/i); }
    }
  });
}

test("Green destinations, collections and planning trips resolve photographed overview courses",()=>{
  for(const item of [...publishedDestinations,...publishedCollections]) {
    assert.ok(item.courseSlugs.length);
    for(const slug of item.courseSlugs) assert.ok(getCourseMedia(slug),`${item.slug}/${slug}`);
  }
  for(const trip of publishedTrips) for(const stop of trip.stops) assert.ok(getCourseMedia(stop.courseSlug));
  assert.equal(new Set(courseMedia.map(m=>m.id)).size,courseMedia.length);
});
