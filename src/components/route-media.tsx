import Image from "next/image";
import type { RouteSummary } from "@/types/route";
import { getRouteMedia } from "@/data/route-media";

interface RouteMediaProps {
  summary: RouteSummary;
  variant: "card" | "hero";
}

export function RouteMedia({ summary, variant }: RouteMediaProps) {
  const className = `route-media route-media--${variant} route-media--${summary.slug}`;
  const media = getRouteMedia(summary.slug);
  if (media) {
    return (
      <figure className={className}>
        <Image className="route-media__image" src={media.path} alt={media.alt} fill sizes={variant === "hero" ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} quality={variant === "hero" ? 88 : 76} priority={variant === "hero"} />
        <figcaption className="route-media__credit">
          {variant === "hero" ? <span>{media.caption}</span> : null}
          <small>Photo: <a href={media.sourcePageUrl} target="_blank" rel="noreferrer">{media.creator}</a> · <a href={media.licenseUrl} target="_blank" rel="noreferrer">{media.licenseName}</a></small>
        </figcaption>
      </figure>
    );
  }

  return (
    <div className={className} role="img" aria-label={summary.heroImageAlt}>
      <span className="route-media__kicker">{summary.country}</span>
      <span className="route-media__line" aria-hidden="true"><i /><i /><i /></span>
      <span className="route-media__journey"><span>{summary.origin}</span><b aria-hidden="true">→</b><span>{summary.destination}</span></span>
    </div>
  );
}
