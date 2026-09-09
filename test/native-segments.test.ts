import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { normalizeNativeSegments } from "../scripts/normalize-native-segments.mjs";

test("native segment aliases match client URLs and preserve existing export files", async () => {
  const root = await mkdtemp(join(tmpdir(), "rallii-segments-"));
  try {
    const segment = join(root, "green", "__next.green", "courses", "$d$slug");
    await mkdir(segment, { recursive: true });
    await writeFile(join(segment, "__PAGE__.txt"), "prepared data");
    assert.equal(await normalizeNativeSegments(root), 1);
    const alias = join(root, "green", "__next.green.courses.$d$slug.__PAGE__.txt");
    assert.equal(await readFile(alias, "utf8"), "prepared data");
    await writeFile(alias, "keep existing");
    assert.equal(await normalizeNativeSegments(root), 0);
    assert.equal(await readFile(alias, "utf8"), "keep existing");
    assert.equal(await readFile(join(segment, "__PAGE__.txt"), "utf8"), "prepared data");
  } finally { await rm(root, { recursive: true, force: true }); }
});
