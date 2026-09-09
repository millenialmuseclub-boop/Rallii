import { DestinationPhoto, DestinationCredit } from "@/components/destination-photo";
import { snowMedia } from "./media";

export function SnowPhoto({ imageKey, priority = false }: { imageKey: string; priority?: boolean }) {
  return <DestinationPhoto media={snowMedia[imageKey]} priority={priority} />;
}
export function SnowCredit({ imageKey }: { imageKey: string }) {
  return <DestinationCredit media={snowMedia[imageKey]} />;
}
