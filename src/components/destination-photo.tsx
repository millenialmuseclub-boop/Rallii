"use client";
import Image from "next/image";
import { useState } from "react";

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
  cardSrc?: string;
  width?: number;
}

export function DestinationPhoto({ media, priority = false }: { media: DestinationMedia; priority?: boolean }) {
  const [failed,setFailed]=useState(false);
  if(!media || failed) return <span className="destination-photo-fallback" role="img" aria-label={media?.alt??"Destination photograph unavailable"}>Photograph unavailable</span>;
  return <picture>{!priority&&media.cardSrc?<source srcSet={`${media.cardSrc} 640w, ${media.src} ${media.width??1600}w`} sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"/>:null}<Image src={media.src} alt={media.alt} fill unoptimized preload={priority}
    sizes={priority ? "100vw" : "(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"}
    onError={()=>setFailed(true)} style={{ objectFit: "cover", objectPosition: media.position ?? "50% 50%" }} /></picture>;
}

export function DestinationCredit({ media }: { media: DestinationMedia }) {
  if(!media)return null;
  return <small className="trail-credit photo-credit">{media.caption} · <a href={media.sourceUrl} target="_blank" rel="noreferrer">{media.credit}</a> · <a href={media.licenseUrl} target="_blank" rel="noreferrer">{media.license}</a></small>;
}
