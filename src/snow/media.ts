import media from "./media.json";
import type { DestinationMedia } from "@/components/destination-photo";

export interface SnowMedia extends DestinationMedia {
  originalUrl: string;
  width: number;
  height: number;
  fileSize: number;
  position: string;
  accessedAt: string;
}
export const snowMedia: Record<string, SnowMedia> = media;
