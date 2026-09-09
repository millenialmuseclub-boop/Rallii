export type TrailDifficulty = "Easy" | "Moderate" | "Strenuous";
export type TrailShape = "Loop" | "Out & Back" | "Point to Point";
export interface TrailCoordinate { latitude: number; longitude: number }
export interface TrailWaypoint {
  id: string;
  name: string;
  kind: "trailhead" | "viewpoint" | "waterfall" | "junction" | "nature";
  coordinate: TrailCoordinate;
  distanceFromStartKm?: number;
  description?: string;
}
export interface TrailMap {
  // Only publish surveyed/sourced coordinates and geometry; never infer a navigable route.
  trailhead: { name: string; coordinate?: TrailCoordinate };
  waypoints: TrailWaypoint[];
  geometry?: { type: "LineString"; coordinates: [number, number][] };
  geometrySource?: string;
  previewImage?: string;
  offlinePack?: { version: string; url: string; sizeBytes: number };
}
export interface Trail {
  slug: string; name: string; destination: string; region: string; country: string;
  distanceKm: number; elevationGainM: number | null; duration: string;
  difficulty: TrailDifficulty; routeType: TrailShape; tags: string[];
  imageKey: string; whyGo: string; route: string; guidance: string; bestTime: string;
  sourceUrl: string; reviewedAt: string; map: TrailMap;
  // Unknown stays unknown until verified; absence must never imply permission/accessibility.
  suitability?: { dogs?: "allowed" | "restricted" | "not-allowed"; family?: string; accessibility?: string };
}
