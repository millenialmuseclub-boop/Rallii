import media from "./media.json";
export interface MtbMedia { src: string; alt: string; caption: string; credit: string; sourceUrl: string; license: string; licenseUrl: string; originalUrl: string }
export const mtbMedia = media as Record<string, MtbMedia>;
