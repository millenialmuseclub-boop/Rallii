export type MtbStatus = "want_to_ride" | "ridden";
export interface MtbSave { status: MtbStatus; favorite: boolean }
export interface MtbLibrary { version: 1; rides: Record<string, MtbSave> }
export const MTB_LIBRARY_KEY = "rallii:mtb-library:v1";
export const MTB_LIBRARY_EVENT = "rallii:mtb-library-change";
export function parseMtbLibrary(raw: string | null): MtbLibrary {
  try {
    const value = JSON.parse(raw ?? "null");
    if (value?.version !== 1 || !value.rides || typeof value.rides !== "object" || Array.isArray(value.rides)) return { version: 1, rides: {} };
    return { version: 1, rides: Object.fromEntries(Object.entries(value.rides).flatMap(([slug, entry]) => {
      const saved = entry as MtbSave | null;
      return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && saved && (saved.status === "want_to_ride" || saved.status === "ridden") ? [[slug, { status: saved.status, favorite: saved.favorite === true }]] : [];
    })) };
  } catch { return { version: 1, rides: {} }; }
}
export function updateMtbSave(library: MtbLibrary, slug: string, change: MtbStatus | "favorite"): MtbLibrary {
  const rides = { ...library.rides };
  const current = rides[slug];
  if (change === "favorite") rides[slug] = { status: current?.status ?? "want_to_ride", favorite: !current?.favorite };
  else if (current?.status === change) delete rides[slug];
  else rides[slug] = { status: change, favorite: current?.favorite ?? false };
  return { version: 1, rides };
}
export function mtbSnapshot() { try { return localStorage.getItem(MTB_LIBRARY_KEY) ?? ""; } catch { return ""; } }
export function subscribeToMtb(callback: () => void) {
  const storage = (event: StorageEvent) => { if (!event.key || event.key === MTB_LIBRARY_KEY) callback(); };
  window.addEventListener("storage", storage); window.addEventListener(MTB_LIBRARY_EVENT, callback);
  return () => { window.removeEventListener("storage", storage); window.removeEventListener(MTB_LIBRARY_EVENT, callback); };
}
export function writeMtbSave(slug: string, change: MtbStatus | "favorite") {
  try {
    localStorage.setItem(MTB_LIBRARY_KEY, JSON.stringify(updateMtbSave(parseMtbLibrary(mtbSnapshot()), slug, change)));
    window.dispatchEvent(new Event(MTB_LIBRARY_EVENT)); return true;
  } catch { return false; }
}
