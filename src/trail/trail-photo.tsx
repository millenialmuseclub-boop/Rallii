import { DestinationPhoto, DestinationCredit } from "@/components/destination-photo";
import { trailMedia } from "./media";
export function TrailPhoto({ imageKey, priority = false }: { imageKey: string; priority?: boolean }) {
  return <DestinationPhoto media={trailMedia[imageKey]} priority={priority} />;
}
export function TrailCredit({ imageKey }: { imageKey: string }) {
  return <DestinationCredit media={trailMedia[imageKey]} />;
}
