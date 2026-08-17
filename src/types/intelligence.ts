import type { ConfidenceType, Importance, LandmarkType, ViewSide } from "./route.ts";

export type AccessTier = "free" | "pro";
export type PlaceType = LandmarkType | "city" | "coastline" | "viewpoint";
export type LoreCategory = "engineering" | "history" | "infrastructure" | "culture" | "operations";

export interface EditorialSource {
  id: string;
  label: string;
  url?: string;
  retrievedAt: string;
  confidence: ConfidenceType;
}

export interface Place {
  id: string;
  name: string;
  type: PlaceType;
  latitude: number;
  longitude: number;
  description: string;
  railwaySignificance: string;
  routeIds: string[];
  imageRouteSlug?: string;
  sourceIds: string[];
}

export interface ScenicMoment {
  id: string;
  routeId: string;
  placeId?: string;
  title: string;
  description: string;
  latitude?: number;
  longitude?: number;
  distanceAlongRouteKm: number;
  sequence: number;
  approximateJourneyMinutes?: number;
  viewingSideForward?: ViewSide;
  viewingSideReverse?: ViewSide;
  importance: Importance;
  leadDistanceKm: number;
  alertEligible: boolean;
  loreIds: string[];
  sourceIds: string[];
  confidence: ConfidenceType;
  reverseTitle?: string;
  reverseDescription?: string;
}

export interface Lore {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: LoreCategory;
  routeIds: string[];
  placeIds: string[];
  scenicMomentIds: string[];
  imageRouteSlug?: string;
  source: EditorialSource;
}

export interface OperationalInformation {
  id: string;
  label: string;
  detail: string;
  sourceIds: string[];
  status: "stable" | "changeable" | "unknown";
  retrievedAt?: string;
  confidence: ConfidenceType;
}
