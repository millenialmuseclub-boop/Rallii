export type AccessType = "public" | "resort" | "private";
export type Setting = "coastal" | "forest" | "desert" | "mountain" | "links" | "parkland" | "tropical";
export type Experience = "bucket-list" | "great-public-golf" | "architecture" | "historic" | "scenic" | "challenging" | "walkable" | "hidden-gem" | "resort-golf" | "worth-the-trip";
export type CourseStatus = "published" | "draft";

export interface Source { label: string; url: string; note: string; lastVerified: string }
export interface Hole {
  number: number; par: number; yards: number; name?: string; label?: "Signature Hole" | "Best View" | "Most Difficult" | "Best Birdie Opportunity" | "Architecture Highlight" | "Turning Point" | "Don’t Miss";
  description: string; strategy?: string; latitude?: number; longitude?: number; notableFor?: string;
}
export interface JourneyChapter { range: string; title: string; description: string }
export interface Course {
  id: string; slug: string; name: string; shortName?: string;
  location: { city: string; region: string; state?: string; country: string; latitude: number; longitude: number };
  access: { type: AccessType; publicAccess: string };
  holes: number; par: number; yards: number; architect: string; openingYear: number;
  character: { settings: Setting[]; difficulty: number; scenery: number; walkability: number; history: number; architecture: number };
  editorial: { headline: string; shortDescription: string; whyPlay: string; story: string; knowBeforeYouGo: string[] };
  signatureHoles: Hole[]; journey: JourneyChapter[]; amenities: string[]; season: string; typicalRoundDuration: string;
  greenFee: { display: string; note: string; lastVerified: string }; bookingUrl?: string; bestFor: string[]; collections: string[];
  destinationSlug?: string; experiences?: Experience[];
  image?: { src: string; alt: string; credit: string; sourceUrl: string };
  sources: Source[]; status: CourseStatus;
}

export type MediaRole = "hero" | "card" | "signature-hole" | "course-journey" | "destination" | "map-preview" | "collection";
export interface CourseMedia { id: string; courseSlug?: string; destinationSlug?: string; collectionSlug?: string; src: string; alt: string; caption?: string; creator: string; license: string; licenseUrl: string; sourceUrl: string; accessedAt: string; role: MediaRole; width: number; height: number; fileSize: number; focalPoint?: string; reuseNotes: string; attribution: string; status: "published" | "review" }
export interface Destination { id: string; slug: string; name: string; location: { region?: string; state?: string; country: string; latitude: number; longitude: number }; headline: string; shortDescription: string; story: string; courseSlugs: string[]; practical: { idealTripLength: string; gettingAround: string; seasonality: string; weatherNotes: string }; sources: Source[]; status: CourseStatus }
export interface CourseCollection { id: string; slug: string; title: string; shortDescription: string; introduction: string; courseSlugs: string[]; destinationSlugs: string[]; status: CourseStatus }
export type RelationshipType = "same-destination" | "similar-setting" | "architectural-contrast" | "trip-companion" | "historical-connection" | "similar-access" | "alternative-experience";
export interface CourseRelationship { sourceCourseSlug: string; targetCourseSlug: string; reason: string; relationshipType: RelationshipType }
export interface GreenTripStop { courseSlug: string; day: string; note: string }
export interface GreenTrip { id: string; slug: string; title: string; eyebrow: string; duration: string; pace: "measured" | "full"; introduction: string; destinationSlugs: string[]; stops: GreenTripStop[]; practicalNotes: string[]; status: CourseStatus }
