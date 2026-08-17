export type PublicationStatus = "draft" | "published";

export type ReservationStatus = "required" | "recommended" | "not-required" | "unknown";

export type ViewSide = "left" | "right" | "both" | "varies" | "unknown";
export type JourneyDirection = "forward" | "reverse";

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
export type JourneyType = "panoramic" | "alpine" | "cross-border" | "unesco" | "scenic" | "regional" | "highlands" | "coastal" | "mountain" | "multi-day";
export type ExperienceTag = "alpine-passes" | "bridges" | "coast" | "desert" | "fjords" | "forest" | "glaciers" | "gorges" | "highlands" | "lakes" | "mountain-valleys" | "moorland" | "rainforest" | "rivers" | "tunnels" | "viaducts" | "villages" | "vineyards" | "waterfalls";

export interface RouteSummary {
  id: string;
  slug: string;
  name: string;
  origin: string;
  destination: string;
  country: string;
  countries: string[];
  journeyTypes: JourneyType[];
  operator: string;
  durationMinutes: number;
  durationLabel?: string;
  journeyDays?: number;
  overnightStops?: string[];
  distanceKm: number;
  trainType: string;
  reservationStatus: ReservationStatus;
  shortDescription: string;
  status: PublicationStatus;
  heroImage?: string;
  heroImageAlt: string;
  heroImageCredit?: string;
  heroImageSourceUrl?: string;
  metadataDestination?: string;
  metadataDescription?: string;
  searchAliases?: string[];
  experienceTags: ExperienceTag[];
  bestFor: string[];
  accessTier?: "free" | "pro";
}

export interface JourneyInformationItem {
  id: string;
  label: string;
  detail: string;
}

export interface RouteSource {
  id: string;
  label: string;
  category: "railway-map" | "operator" | "infrastructure" | "tourism" | "editorial";
  url?: string;
  note: string;
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
  reverseShortDescription?: string;
  importance: Importance;
  bestSideForward: ViewSide;
  bestSideReverse: ViewSide;
}

export interface ScenicTimelineEntry {
  id: string;
  title: string;
  subtitle?: string;
  reverseTitle?: string;
  reverseSubtitle?: string;
  distanceAlongRouteKm: number;
  approximateJourneyMinutes?: number;
  type: TimelineEntryType;
  importance: Importance;
  bestSide?: ViewSide;
  bestSideReverse?: ViewSide;
  relatedLandmarkId?: string;
  shortDescription: string;
  reverseShortDescription?: string;
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
  capabilities: { rideMode: boolean; scenicAlerts?: boolean };
  summary: RouteSummary;
  stops: RouteStop[];
  landmarks: Landmark[];
  timelineEntries: ScenicTimelineEntry[];
  bestSideSegments: BestSideSegment[];
  journeyInformation: JourneyInformationItem[];
  sources: RouteSource[];
  geoJsonPath: string;
  relatedRouteSlugs?: string[];
}
