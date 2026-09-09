import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parseOtaManifest } from "../src/lib/ota-manifest.ts";

const manifestUrl = "https://example.com/updates/com.rallii.rail/production/manifest.json";
const sha = "a".repeat(40);
const valid = { appId: "com.rallii.rail", version: "1788926283", sha, url: new URL(`bundles/${sha}.zip`, manifestUrl).href, checksum: "checksum", sessionKey: "encrypted-key" };

test("OTA accepts the matching app and rejects shared or foreign bundles", () => {
  assert.deepEqual(parseOtaManifest(valid, manifestUrl), valid);
  for (const change of [{ appId: undefined }, { appId: "another.app" }, { url: `https://example.com/updates/production/bundles/${sha}.zip` }, { url: `https://other.example/bundles/${sha}.zip` }, { version: "NaN" }, { checksum: "" }]) {
    assert.throws(() => parseOtaManifest({ ...valid, ...change }, manifestUrl));
  }
});

test("publisher and app use the Rallii-specific OTA namespace", () => {
  for (const path of ["../src/lib/ota-config.ts", "../.github/workflows/ota-publish.yml"]) {
    const source = readFileSync(new URL(path, import.meta.url), "utf8");
    assert.ok(source.includes("/updates/com.rallii.rail/"));
    assert.ok(!source.includes("/updates/$") && !source.includes("/updates/production/"));
  }
});
