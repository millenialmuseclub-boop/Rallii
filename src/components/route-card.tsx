import Link from "next/link";
import { RouteMedia } from "@/components/route-media";
import type { RailRoute } from "@/types/route";

export function RouteCard({ route, matchContext }: { route: RailRoute; matchContext?: string }) {
  const { summary } = route;
  return (
    <article className="journey-card">
      <RouteMedia summary={summary} variant="card" />
      <div className="p-6 sm:p-8">
        <p className="eyebrow">{summary.country}</p>
        <h3 className="mt-3 font-serif text-3xl sm:text-4xl"><Link className="card-title-link focus-ring" href={`/routes/${summary.slug}`}>{summary.name}</Link></h3>
        <p className="mt-2 font-serif text-lg text-stone-600">{summary.origin} → {summary.destination}</p>
        {matchContext ? <p className="match-context">{matchContext}</p> : null}
        <p className="mt-5 text-sm leading-6 text-stone-600">{summary.shortDescription}</p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="route-card-meta">{formatDuration(summary.durationMinutes)} <i aria-hidden="true" /> {formatJourneyType(summary.journeyTypes[0])}</span>
          <Link className="primary-link focus-ring" href={`/routes/${summary.slug}`}>Explore <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}

function formatJourneyType(value: string): string { return value.split("-").map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(" "); }

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours} hr ${remainder} min` : `${hours} hours`;
}
