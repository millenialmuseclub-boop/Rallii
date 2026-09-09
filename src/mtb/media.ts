import media from "./media.json";
export interface MtbMedia { src: string; alt: string; caption: string; credit: string; sourceUrl: string; license: string; licenseUrl: string; originalUrl: string; position: string; width: number; height: number; fileSize: number; representative?: boolean }
export const mtbMedia = media as Record<string, MtbMedia>;
