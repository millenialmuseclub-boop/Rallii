import Link from "next/link";
import { RouteMedia } from "@/components/route-media";
import type { RailRoute } from "@/types/route";

export type RouteCardVariant = "standard" | "featured" | "compact";

interface RouteCardProps {
  route: RailRoute;
  matchContext?: string;
  relationshipReason?: string;
  variant?: RouteCardVariant;
}

export function RouteCard({ route, matchContext, relationshipReason, variant = "standard" }: RouteCardProps) {
  const { summary } = route;
  return (
    <article className={`journey-card journey-card--${variant}`}>
      <RouteMedia summary={summary} variant="card" />
      <div className="journey-card__body">
        <p className="eyebrow">{summary.country}</p>
        <h3 className="mt-3 font-serif text-3xl sm:text-4xl"><Link className="card-title-link focus-ring" href={`/routes/${summary.slug}`}>{summary.name}</Link></h3>
        <p className="mt-2 font-serif text-lg text-stone-600">{summary.origin} → {summary.destination}</p>
        {relationshipReason ? <p className="relationship-reason">{relationshipReason}</p> : null}
        {matchContext ? <p className="match-context">Matched: {matchContext}</p> : null}
        {variant !== "compact" ? <p className="mt-5 text-sm leading-6 text-stone-600">{summary.shortDescription}</p> : null}
        <p className="route-card-landscapes">{summary.experienceTags.slice(0, 3).map(formatLabel).join(" · ")}</p>
        {variant !== "compact" ? <p className="route-card-reason">{summary.bestFor[0]}</p> : null}
        <div className="route-card__footer">
          <span className="route-card-meta">{summary.durationLabel ?? formatDuration(summary.durationMinutes)} <i aria-hidden="true" /> {formatLabel(summary.journeyTypes[0])}</span>
          <span className="route-card__links"><Link className="text-link focus-ring" href={`/compare?routes=${summary.slug}`}>Compare</Link><Link className="primary-link focus-ring" href={`/routes/${summary.slug}`}>Explore <span aria-hidden="true">→</span></Link></span>
        </div>
      </div>
    </article>
  );
}

function formatLabel(value: string): string { return value.split("-").map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(" "); }
function formatDuration(minutes: number): string { const hours = Math.floor(minutes / 60); const remainder = minutes % 60; return remainder ? `${hours} hr ${remainder} min` : hours === 1 ? "1 hour" : `${hours} hours`; }
