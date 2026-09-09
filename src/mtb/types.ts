export type MtbSkill = "Beginner" | "Intermediate" | "Advanced";
export type MtbKind = "Bike park" | "Trail system" | "Riding region";
export interface MtbDestination {
  slug: string;
  name: string;
  location: string;
  region: string;
  kind: MtbKind;
  skills: MtbSkill[];
  imageKey: string;
  summary: string;
  terrain: string;
  character: string;
  sections: string[];
  season: string;
  start: string;
  notes: string;
  bike: string;
  sourceUrl: string;
  distanceKm: number | null;
  elevationGainM: number | null;
  time: string;
}
