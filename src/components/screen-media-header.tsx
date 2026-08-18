import Image from "next/image";
import { getRouteMedia } from "@/data/route-media";
import { screenMedia, type ScreenMediaKey } from "@/data/screen-media";

export function ScreenMediaHeader({ mediaKey, title }: { mediaKey?: ScreenMediaKey; title: string }) {
  if (!mediaKey) return null;
  const config = screenMedia[mediaKey];
  const media = getRouteMedia(config.routeSlug);
  if (!media) return null;
  return <figure className="screen-media-header"><Image src={media.path} alt={media.alt} fill sizes="(min-width: 640px) 42rem, 100vw" quality={78} /><figcaption><span>{config.label}</span><small>Photo: <a href={media.sourcePageUrl} target="_blank" rel="noreferrer">{media.creator}</a> · <a href={media.licenseUrl} target="_blank" rel="noreferrer">{media.licenseName}</a></small></figcaption><strong>{title}</strong></figure>;
}
