import Image from "next/image";
import { mtbMedia } from "./media";
export function MtbPhoto({ imageKey, priority = false }: { imageKey: string; priority?: boolean }) {
  const image = mtbMedia[imageKey];
  return <Image src={image.src} alt={image.alt} fill unoptimized priority={priority} sizes={priority ? "100vw" : "(max-width: 550px) 100vw, (max-width: 1000px) 50vw, 33vw"} style={{ objectFit: "cover" }} />;
}
export function MtbCredit({ imageKey }: { imageKey: string }) {
  const image = mtbMedia[imageKey];
  return <small className="trail-credit">{image.caption} · <a href={image.sourceUrl} target="_blank" rel="noreferrer">{image.credit}</a> · <a href={image.licenseUrl} target="_blank" rel="noreferrer">{image.license}</a></small>;
}
