import test from "node:test";
import assert from "node:assert/strict";
import { createProStore, PRO_ENTITLEMENT, type PurchaseProvider } from "../src/lib/pro-store.ts";
import { parseCollections, updateCollection, type TripCollection } from "../src/lib/pro-collections.ts";
import { migrateLegacySaved, updateLibraryStatus } from "../src/lib/travel-library.ts";
import { parseCourseLibrary } from "../src/green/lib/course-library.ts";
import { activityForPath, isFamilyPath } from "../src/lib/activities.ts";
const active = { activeEntitlements: [PRO_ENTITLEMENT] };
const free = { activeEntitlements: [] };
const provider = (overrides: Partial<PurchaseProvider> = {}): PurchaseProvider => ({ refresh: async () => active, restore: async () => active, purchase: async () => active, ...overrides });
const trip: TripCollection = { id: "trip", name: "Switzerland", notes: "Book a window seat", experiences: [{ activity: "rail", slug: "bernina-express" }, { activity: "green", slug: "pebble-beach" }] };

test("unconfigured release is free and restore reports unavailable without granting access", async () => {
  const store = createProStore(); await store.restorePurchases();
  assert.equal(store.getSnapshot().isPro, false); assert.equal(store.getSnapshot().purchasesAvailable, false);
  assert.match(store.getSnapshot().error, /not available/);
});
test("one verified entitlement unlocks Rail and Green consumers immediately", async () => {
  const store = createProStore(provider()); const rail: boolean[] = [], green: boolean[] = [];
  const offRail = store.subscribe(() => rail.push(store.getSnapshot().canUseScenicAlerts));
  const offGreen = store.subscribe(() => green.push(store.getSnapshot().canUseCollections));
  await store.purchase(); assert.equal(rail.at(-1), true); assert.equal(green.at(-1), true);
  assert.equal(store.getSnapshot().personalLibraryLimit, null); offRail(); offGreen();
});
test("unrelated or expired entitlements do not unlock Pro", async () => {
  const store = createProStore(provider({ refresh: async () => ({ activeEntitlements: ["green_pro"] }) }));
  await store.refreshEntitlements(); assert.equal(store.getSnapshot().isPro, false);
});
test("restore succeeds only with verified active membership", async () => {
  const store = createProStore(provider({ restore: async () => free })); await store.restorePurchases();
  assert.equal(store.getSnapshot().isPro, false); assert.match(store.getSnapshot().message, /No active/);
  const subscribed = createProStore(provider()); await subscribed.restorePurchases(); assert.equal(subscribed.getSnapshot().isPro, true);
});
test("failed refresh preserves verified membership and clears loading", async () => {
  const store = createProStore(provider({ refresh: async () => { throw new Error("offline"); } }));
  await store.restorePurchases(); await store.refreshEntitlements();
  assert.equal(store.getSnapshot().isPro, true); assert.equal(store.getSnapshot().isLoadingEntitlements, false); assert.match(store.getSnapshot().error, /connection/);
});
test("cancelled purchase does not grant membership", async () => {
  const store = createProStore(provider({ purchase: async () => null })); await store.purchase();
  assert.equal(store.getSnapshot().isPro, false); assert.match(store.getSnapshot().message, /cancelled/);
});
test("duplicate operations share a pending request and newer customer events win", async () => {
  let resolve!: (customer: typeof active) => void;
  let listener!: (customer: typeof active) => void;
  let calls = 0;
  const store = createProStore(provider({ refresh: () => { calls++; return new Promise(done => { resolve = done; }); }, subscribe: fn => { listener = fn; return () => {}; } }));
  store.connect(); const first = store.refreshEntitlements(); const second = store.restorePurchases(); await Promise.resolve();
  assert.equal(store.getSnapshot().isLoadingEntitlements, true); assert.equal(calls, 1); assert.equal(first, second);
  listener(free); resolve(active); await first;
  assert.equal(store.getSnapshot().isPro, false); assert.equal(store.getSnapshot().isLoadingEntitlements, false);
});
test("provider expiry updates all consumers and releases its listener", async () => {
  let listener!: (customer: typeof active) => void; let disposed = false;
  const store = createProStore(provider({ subscribe: fn => { listener = fn; return () => { disposed = true; }; } }));
  const disconnect = store.connect(); await store.refreshEntitlements(); listener(free);
  assert.equal(store.getSnapshot().canUseCollections, false); assert.equal(store.getSnapshot().canUseScenicAlerts, false);
  disconnect(); assert.equal(disposed, true);
});
test("switching modes does not reset entitlement or alter legacy Rail and Green saves", async () => {
  const store = createProStore(provider()); await store.restorePurchases();
  const rail = migrateLegacySaved('["bernina-express","glacier-express","west-highland-line"]');
  const green = parseCourseLibrary('{"version":1,"courses":{"pebble-beach":"played"}}');
  for (const path of ["/", "/green/", "/pro/", "/my-rallii/", "/routes/bernina-express/"]) { activityForPath(path); assert.equal(store.getSnapshot().isPro, true); }
  assert.equal(Object.keys(rail.routes).length, 3); assert.equal(green.courses["pebble-beach"], "played");
  assert.equal(updateLibraryStatus(rail, "fourth", "want_to_go", store.getSnapshot().personalLibraryLimit).result.ok, true);
  assert.equal(isFamilyPath("/pro/"), true); assert.equal(isFamilyPath("/my-rallii"), true); assert.equal(isFamilyPath("/green/"), false);
});
test("unfinished offline and enhanced schedule capabilities remain unavailable to Pro", async () => {
  const store = createProStore(provider()); await store.refreshEntitlements();
  assert.equal(store.getSnapshot().canUseOffline, false); assert.equal(store.getSnapshot().canUseAdvancedSchedules, false);
});
test("cross-mode collections persist notes, deduplicate references and stay readable after expiry", () => {
  const next = updateCollection([], { ...trip, experiences: [...trip.experiences, trip.experiences[0]] }, true);
  assert.equal(next[0].experiences.length, 2);
  const restored = parseCollections(JSON.stringify({ version: 1, collections: next }));
  assert.deepEqual(restored, [trip]);
  assert.equal(updateCollection(restored, { ...trip, notes: "changed" }, false), restored);
});
test("invalid collections cannot inject arbitrary destinations or malformed content", () => {
  for (const raw of ["{", "null", '{"version":2,"collections":[]}', JSON.stringify({ version: 1, collections: [{ ...trip, experiences: [{ activity: "script", slug: "javascript:alert(1)" }] }] })]) assert.deepEqual(parseCollections(raw), []);
  assert.deepEqual(updateCollection([], { ...trip, name: "  " }, true), []);
});


test("synchronous provider errors allow subsequent retries", async () => {
  let calls = 0;
  const store = createProStore(provider({ refresh: () => { calls++; throw new Error("SDK not ready"); } }));
  await store.refreshEntitlements(); await store.refreshEntitlements();
  assert.equal(calls, 2); assert.equal(store.getSnapshot().isLoadingEntitlements, false);
});
