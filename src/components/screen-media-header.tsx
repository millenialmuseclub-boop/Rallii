import Image from "next/image";
import { getRouteMedia } from "@/data/route-media";
import { screenMedia, type ScreenMediaKey } from "@/data/screen-media";

export function ScreenMediaHeader({ mediaKey, title, context }: { mediaKey?: ScreenMediaKey; title: string; context?: string }) {
  if (!mediaKey) return null;
  const config = screenMedia[mediaKey];
  const media = getRouteMedia(config.routeSlug);
  if (!media) return null;
  return <figure className="screen-media-header screen-media-header--immersive"><Image src={media.path} alt={media.alt} fill sizes="(min-width: 1024px) 76rem, (min-width: 640px) calc(100vw - 4rem), 100vw" quality={86} /><figcaption><span>{config.label}</span><small>Photo: <a href={media.sourcePageUrl} target="_blank" rel="noreferrer">{media.creator}</a> · <a href={media.licenseUrl} target="_blank" rel="noreferrer">{media.licenseName}</a></small></figcaption><div className="screen-media-header__copy"><strong>{title}</strong>{context ? <p>{context}</p> : null}</div></figure>;
}
