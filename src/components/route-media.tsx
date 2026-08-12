import Image from "next/image";
import type { RouteSummary } from "@/types/route";

interface RouteMediaProps {
  summary: RouteSummary;
  variant: "card" | "hero";
}

export function RouteMedia({ summary, variant }: RouteMediaProps) {
  const className = `route-media route-media--${variant} route-media--${summary.slug}`;
  if (summary.heroImage) {
    return (
      <figure className={className}>
        <Image className="route-media__image" src={summary.heroImage} alt={summary.heroImageAlt} fill sizes={variant === "hero" ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"} priority={variant === "hero"} />
        {summary.heroImageCredit ? <figcaption className="route-media__credit">Photo: {summary.heroImageCredit}</figcaption> : null}
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
