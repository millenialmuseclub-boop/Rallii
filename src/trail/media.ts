import media from "./media.json";
export interface TrailMedia { src: string; alt: string; caption: string; credit: string; sourceUrl: string; license: string; licenseUrl: string; position: string; width: number; height: number; fileSize: number; representative?: boolean }
export const trailMedia: Record<string, TrailMedia> = media;
