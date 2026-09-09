export type TrailStatus = "want_to_go" | "been";
export interface TrailLibrary { version: 1; trails: Record<string, TrailStatus> }
export const TRAIL_LIBRARY_KEY = "rallii:trail-library:v1";
export const TRAIL_LIBRARY_EVENT = "rallii:trail-library-change";
export function parseTrailLibrary(raw: string | null): TrailLibrary {
  try {
    const value = JSON.parse(raw ?? "null");
    if (value?.version !== 1 || !value.trails || typeof value.trails !== "object" || Array.isArray(value.trails)) return { version: 1, trails: {} };
    return { version: 1, trails: Object.fromEntries(Object.entries(value.trails).filter(([slug, status]) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && (status === "want_to_go" || status === "been"))) as Record<string, TrailStatus> };
  } catch { return { version: 1, trails: {} }; }
}
export function updateTrailStatus(library: TrailLibrary, slug: string, status?: TrailStatus): TrailLibrary {
  const trails = { ...library.trails };
  if (status) trails[slug] = status; else delete trails[slug];
  return { version: 1, trails };
}
export function trailSnapshot() { try { return localStorage.getItem(TRAIL_LIBRARY_KEY) ?? ""; } catch { return ""; } }
export function subscribeToTrails(callback: () => void) {
  const storage = (event: StorageEvent) => { if (!event.key || event.key === TRAIL_LIBRARY_KEY) callback(); };
  window.addEventListener("storage", storage); window.addEventListener(TRAIL_LIBRARY_EVENT, callback);
  return () => { window.removeEventListener("storage", storage); window.removeEventListener(TRAIL_LIBRARY_EVENT, callback); };
}
export function writeTrailStatus(slug: string, status?: TrailStatus): boolean {
  try {
    localStorage.setItem(TRAIL_LIBRARY_KEY, JSON.stringify(updateTrailStatus(parseTrailLibrary(trailSnapshot()), slug, status)));
    window.dispatchEvent(new Event(TRAIL_LIBRARY_EVENT)); return true;
  } catch { return false; }
}
