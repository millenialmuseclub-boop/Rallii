import { DestinationPhoto, DestinationCredit } from "@/components/destination-photo";
import { mtbMedia } from "./media";
export function MtbPhoto({ imageKey, priority = false }: { imageKey: string; priority?: boolean }) {
  return <DestinationPhoto media={mtbMedia[imageKey]} priority={priority} />;
}
export function MtbCredit({ imageKey }: { imageKey: string }) {
  return <DestinationCredit media={mtbMedia[imageKey]} />;
}
