import { copyFile, readdir } from "node:fs/promises";
import { join } from "node:path";

// Next's Windows exporter can emit nested __next segment files while its client
// requests dot-separated filenames. Keep originals and add only missing aliases.
export async function normalizeNativeSegments(root) {
  let copied = 0;
  async function walk(directory, segmentRoot, parts = []) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        const startsSegment = !segmentRoot && entry.name.startsWith("__next.");
        await walk(path, startsSegment ? directory : segmentRoot, startsSegment ? [entry.name] : segmentRoot ? [...parts, entry.name] : []);
      } else if (segmentRoot && entry.name.endsWith(".txt")) {
        try { await copyFile(path, join(segmentRoot, [...parts, entry.name].join(".")), 1); copied++; }
        catch (error) { if (error.code !== "EEXIST") throw error; }
      }
    }
  }
  await walk(root);
  return copied;
}
