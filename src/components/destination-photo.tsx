import Image from "next/image";

/** Shared rendering only: each mode owns its catalogue, registry and save state. */
export interface DestinationMedia {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  position?: string;
}

export function DestinationPhoto({ media, priority = false }: { media: DestinationMedia; priority?: boolean }) {
  return <Image src={media.src} alt={media.alt} fill unoptimized preload={priority}
    sizes={priority ? "100vw" : "(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"}
    style={{ objectFit: "cover", objectPosition: media.position ?? "50% 50%" }} />;
}

export function DestinationCredit({ media }: { media: DestinationMedia }) {
  return <small className="trail-credit photo-credit">{media.caption} · <a href={media.sourceUrl} target="_blank" rel="noreferrer">{media.credit}</a> · <a href={media.licenseUrl} target="_blank" rel="noreferrer">{media.license}</a></small>;
}
