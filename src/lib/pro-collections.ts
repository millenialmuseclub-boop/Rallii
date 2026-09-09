export const COLLECTIONS_KEY = "rallii:collections:v1";
export interface ExperienceRef { activity: "rail" | "green" | "trail" | "mtb"; slug: string }
export interface TripCollection { id: string; name: string; notes: string; experiences: ExperienceRef[] }
export function parseCollections(raw: string | null): TripCollection[] {
  try {
    const value: unknown = JSON.parse(raw ?? "null");
    if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1 || !("collections" in value) || !Array.isArray(value.collections)) return [];
    return value.collections.filter((entry): entry is TripCollection => !!entry && typeof entry.id === "string" && typeof entry.name === "string" && typeof entry.notes === "string" && Array.isArray(entry.experiences) && entry.experiences.every((ref: ExperienceRef) => ref && (ref.activity === "rail" || ref.activity === "green" || ref.activity === "trail" || ref.activity === "mtb") && typeof ref.slug === "string"));
  } catch { return []; }
}
export function updateCollection(collections: TripCollection[], collection: TripCollection, isPro: boolean): TripCollection[] {
  if (!isPro || !collection.name.trim()) return collections;
  const next = { ...collection, name: collection.name.trim().slice(0, 80), notes: collection.notes.slice(0, 4000), experiences: collection.experiences.filter((ref, index, all) => all.findIndex(other => other.activity === ref.activity && other.slug === ref.slug) === index) };
  return collections.some(entry => entry.id === next.id) ? collections.map(entry => entry.id === next.id ? next : entry) : [...collections, next];
}
