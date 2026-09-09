import Image from "next/image";
import { trailMedia } from "./media";
export function TrailPhoto({ imageKey, priority = false }: { imageKey: string; priority?: boolean }) {
  const media = trailMedia[imageKey];
  return <Image src={media.src} alt={media.alt} fill sizes={priority ? "100vw" : "(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"} priority={priority} unoptimized style={{ objectFit: "cover", objectPosition: media.position ?? "center" }} />;
}
export function TrailCredit({ imageKey }: { imageKey: string }) {
  const media = trailMedia[imageKey];
  return <small className="trail-credit">{media.caption} · <a href={media.sourceUrl} target="_blank" rel="noreferrer">{media.credit}</a> · <a href={media.licenseUrl} target="_blank" rel="noreferrer">{media.license}</a></small>;
}
