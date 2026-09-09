import media from "./media.json";
export interface TrailMedia { src: string; alt: string; caption: string; credit: string; sourceUrl: string; license: string; licenseUrl: string; position?: string }
export const trailMedia: Record<string, TrailMedia> = media;
