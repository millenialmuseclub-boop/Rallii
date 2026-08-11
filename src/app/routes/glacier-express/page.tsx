import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JourneyActions } from "@/components/journey-actions";
import { RouteExperience } from "@/components/route-experience";
import { SiteHeader } from "@/components/site-header";
import { getRouteBySlug } from "@/data/routes";

export const metadata: Metadata = {
  title: "Glacier Express: Zermatt to St. Moritz",
  description: "Plan the view on the Glacier Express from Zermatt to St. Moritz: where to sit, what to see, and when to look.",
  openGraph: {
    title: "Glacier Express: Zermatt to St. Moritz | Rallii",
    description: "A curated guide to the Glacier Express, from its best seat views to the moments worth looking up for.",
    siteName: "Rallii",
    type: "article",
  },
};

export default function GlacierExpressPage() {
  const route = getRouteBySlug("glacier-express");
  if (!route) notFound();
  const { summary } = route;

  return (
    <>
      <SiteHeader />
      <main>
        <article>
          <header className="site-shell py-10 sm:py-16">
            <div className="grid items-end gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
              <div className="pb-1">
                <p className="eyebrow">{summary.country}</p>
                <h1 className="mt-4 font-serif text-5xl leading-none tracking-tight sm:text-7xl">{summary.name}</h1>
                <p className="mt-4 font-serif text-2xl text-stone-600 sm:text-3xl">{summary.origin} → {summary.destination}</p>
                <p className="mt-6 max-w-xl text-base leading-7 text-stone-600">{summary.shortDescription}</p>
                <JourneyActions routeName={summary.name} />
              </div>
              <div className="mountain-placeholder min-h-72 p-5 sm:min-h-[30rem] sm:p-8" aria-label="Glacier Express photography placeholder">
                <span className="media-note">Across the Swiss Alps · Photography coming soon</span>
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-2 border-y border-stone-300 sm:grid-cols-4">
              <Essential label="Duration" value={`${summary.durationMinutes / 60} hours`} />
              <Essential label="Distance" value={`${summary.distanceKm} km`} />
              <Essential label="Train" value={summary.trainType} />
              <Essential label="Reservation" value={formatReservation(summary.reservationStatus)} />
            </dl>
          </header>

          <div className="site-shell pb-20 sm:pb-28">
            <RouteExperience route={route} />

            <section className="section-space border-t border-stone-300 pt-14 sm:pt-20" aria-labelledby="expect-title">
              <p className="eyebrow">Journey overview</p>
              <h2 id="expect-title" className="mt-2 font-serif text-4xl sm:text-5xl">What to Expect</h2>
              <dl className="mt-9 grid gap-px bg-stone-300 sm:grid-cols-3">
                <OverviewItem term="Reservations" detail={`${formatReservation(summary.reservationStatus)} for this panoramic service.`} />
                <OverviewItem term="Train" detail={summary.trainType} />
                <OverviewItem term="Operated by" detail={summary.operator} />
              </dl>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}

function Essential({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-24 border-stone-300 px-3 py-5 even:border-l sm:min-h-28 sm:border-l sm:first:border-l-0 sm:px-5">
      <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-stone-500">{label}</dt>
      <dd className="mt-2 text-sm font-semibold sm:text-base">{value}</dd>
    </div>
  );
}

function OverviewItem({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="bg-page p-6 sm:p-8">
      <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">{term}</dt>
      <dd className="mt-3 text-sm leading-6 text-stone-700">{detail}</dd>
    </div>
  );
}

function formatReservation(status: string): string {
  return status === "required" ? "Required" : status === "not-required" ? "Not required" : status === "recommended" ? "Recommended" : "Check before travel";
}
