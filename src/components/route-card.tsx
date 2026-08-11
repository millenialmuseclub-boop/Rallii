import Link from "next/link";
import type { RailRoute } from "@/types/route";

export function RouteCard({ route }: { route: RailRoute }) {
  const { summary } = route;
  return (
    <article className="journey-card">
      <div className={`route-visual route-visual--${summary.slug}`} role="img" aria-label={summary.heroImageAlt}>
        <span className="media-note">Rallii visual study · Photography coming soon</span>
      </div>
      <div className="p-6 sm:p-8">
        <p className="eyebrow">{summary.country}</p>
        <h3 className="mt-3 font-serif text-3xl sm:text-4xl">{summary.name}</h3>
        <p className="mt-2 font-serif text-lg text-stone-600">{summary.origin} → {summary.destination}</p>
        <p className="mt-5 text-sm leading-6 text-stone-600">{summary.shortDescription}</p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.14em] text-stone-500">{formatDuration(summary.durationMinutes)}</span>
          <Link className="primary-link focus-ring" href={`/routes/${summary.slug}`}>Explore <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours} hr ${remainder} min` : `${hours} hours`;
}
