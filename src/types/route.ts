export type PublicationStatus = "draft" | "published";

export type ReservationStatus = "required" | "recommended" | "not-required" | "unknown";

export type ViewSide = "left" | "right" | "both" | "varies" | "unknown";

export type Importance = "normal" | "highlight" | "dont-miss";

export type LandmarkType =
  | "scenic-section"
  | "bridge"
  | "viaduct"
  | "mountain-pass"
  | "gorge"
  | "river"
  | "lake"
  | "village"
  | "station"
  | "historic-site"
  | "tunnel"
  | "other";

export type TimelineEntryType = LandmarkType | "journey-note";

export type ConfidenceType = "editorial" | "community" | "limited-data";

export interface RouteSummary {
  id: string;
  slug: string;
  name: string;
  origin: string;
  destination: string;
  country: string;
  operator: string;
  durationMinutes: number;
  distanceKm: number;
  trainType: string;
  reservationStatus: ReservationStatus;
  shortDescription: string;
  status: PublicationStatus;
}

export interface RouteStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  sequence: number;
  distanceAlongRouteKm: number;
  shortDescription?: string;
}

export interface Landmark {
  id: string;
  name: string;
  type: LandmarkType;
  latitude: number;
  longitude: number;
  distanceAlongRouteKm: number;
  shortDescription: string;
  importance: Importance;
  bestSideForward: ViewSide;
  bestSideReverse: ViewSide;
}

export interface ScenicTimelineEntry {
  id: string;
  title: string;
  subtitle?: string;
  distanceAlongRouteKm: number;
  approximateJourneyMinutes?: number;
  type: TimelineEntryType;
  importance: Importance;
  bestSide?: ViewSide;
  relatedLandmarkId?: string;
  shortDescription: string;
}

export interface BestSideSegment {
  id: string;
  startDistanceKm: number;
  endDistanceKm: number;
  forwardDirectionSide: ViewSide;
  reverseDirectionSide: ViewSide;
  reason: string;
  confidenceType: ConfidenceType;
}

export interface RailRoute {
  summary: RouteSummary;
  stops: RouteStop[];
  landmarks: Landmark[];
  timelineEntries: ScenicTimelineEntry[];
  bestSideSegments: BestSideSegment[];
  geoJsonPath: string;
}
