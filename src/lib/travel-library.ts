export type RouteStatus = "want_to_go" | "been";
export interface TravelLibrary { version: 1; routes: Record<string, RouteStatus>; }

export const TRAVEL_LIBRARY_KEY = "rallii:travel-library";
export const LEGACY_SAVED_KEY = "rallii:saved-routes";
const CHANGE_EVENT = "rallii:travel-library-change";
const emptyLibrary: TravelLibrary = { version: 1, routes: {} };
let cachedRaw: string | null | undefined;
let cachedLibrary = emptyLibrary;

export function parseTravelLibrary(raw: string | null, knownSlugs?: ReadonlySet<string>): TravelLibrary {
  if (!raw) return emptyLibrary;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return emptyLibrary;
    const candidate = value as { version?: unknown; routes?: unknown };
    if (candidate.version !== 1 || !candidate.routes || typeof candidate.routes !== "object" || Array.isArray(candidate.routes)) return emptyLibrary;
    const routes = Object.fromEntries(Object.entries(candidate.routes).filter(([slug, status]) => (!knownSlugs || knownSlugs.has(slug)) && (status === "want_to_go" || status === "been"))) as Record<string, RouteStatus>;
    return { version: 1, routes };
  } catch { return emptyLibrary; }
}

export function migrateLegacySaved(raw: string | null, knownSlugs?: ReadonlySet<string>): TravelLibrary {
  try { const value: unknown = raw ? JSON.parse(raw) : []; if (!Array.isArray(value)) return emptyLibrary; const routes: Record<string, RouteStatus> = {}; for (const slug of value) if (typeof slug === "string" && (!knownSlugs || knownSlugs.has(slug))) routes[slug] = "want_to_go"; return { version: 1, routes }; } catch { return emptyLibrary; }
}

export function getTravelLibrary(): TravelLibrary {
  if (typeof window === "undefined") return emptyLibrary;
  let raw = window.localStorage.getItem(TRAVEL_LIBRARY_KEY);
  if (!raw) { const migrated = migrateLegacySaved(window.localStorage.getItem(LEGACY_SAVED_KEY)); if (Object.keys(migrated.routes).length) { raw = JSON.stringify(migrated); window.localStorage.setItem(TRAVEL_LIBRARY_KEY, raw); window.localStorage.removeItem(LEGACY_SAVED_KEY); } }
  if (raw === cachedRaw) return cachedLibrary;
  cachedRaw = raw; cachedLibrary = parseTravelLibrary(raw); return cachedLibrary;
}

export function setRouteStatus(slug: string, status?: RouteStatus): void { if (typeof window === "undefined") return; const current = getTravelLibrary(); const routes = { ...current.routes }; if (status) routes[slug] = status; else delete routes[slug]; const next: TravelLibrary = { version: 1, routes }; window.localStorage.setItem(TRAVEL_LIBRARY_KEY, JSON.stringify(next)); window.localStorage.removeItem(LEGACY_SAVED_KEY); cachedRaw = undefined; window.dispatchEvent(new Event(CHANGE_EVENT)); }
export function getRouteStatus(slug: string): RouteStatus | undefined { return getTravelLibrary().routes[slug]; }
export function subscribeToTravelLibrary(onChange: () => void): () => void { if (typeof window === "undefined") return () => undefined; const storage = (event: StorageEvent) => { if (event.key === TRAVEL_LIBRARY_KEY || event.key === LEGACY_SAVED_KEY) { cachedRaw = undefined; onChange(); } }; window.addEventListener("storage", storage); window.addEventListener(CHANGE_EVENT, onChange); return () => { window.removeEventListener("storage", storage); window.removeEventListener(CHANGE_EVENT, onChange); }; }
