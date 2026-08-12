"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RouteMedia } from "@/components/route-media";
import { useTravelLibrary } from "@/hooks/use-travel-library";
import { buildComparisonPath, formatDuration, formatExperienceTag, formatReservation, getBestSideSummary, getJourneyDurationCategory } from "@/lib/journey-comparison";
import type { RailRoute } from "@/types/route";

export function CompareJourneys({ routes, selected }: { routes: RailRoute[]; selected: RailRoute[] }) {
  const router = useRouter();
  const { getStatus, setStatus } = useTravelLibrary();
  const [shareStatus, setShareStatus] = useState("");
  const slugs = selected.map((route) => route.summary.slug);

  function selectRoute(index: number, slug: string) {
    const next = [...slugs];
    if (!slug) next.splice(index, 1); else next[index] = slug;
    router.push(buildComparisonPath(next));
  }

  async function shareComparison() {
    const url = window.location.href;
    const title = selected.length === 2 ? `${selected[0].summary.name} vs ${selected[1].summary.name} | Rallii` : "Compare Rail Journeys | Rallii";
    try {
      const usedNativeShare = Boolean(navigator.share);
      if (usedNativeShare) await navigator.share({ title, text: "Compare two rail journeys on Rallii.", url });
      else await navigator.clipboard.writeText(url);
      setShareStatus(usedNativeShare ? "Shared" : "Link copied");
    } catch (error) { if (!(error instanceof DOMException && error.name === "AbortError")) setShareStatus("Unable to share"); }
  }

  return <div className="mt-10">
    <div className="grid gap-4 sm:grid-cols-2">
      {[0, 1].map((index) => <label className="compare-selector" key={index}><span>Journey {index === 0 ? "A" : "B"}</span><select aria-label={`Journey ${index === 0 ? "A" : "B"}`} value={slugs[index] ?? ""} onChange={(event) => selectRoute(index, event.target.value)}><option value="">Choose a journey</option>{routes.map((route) => <option key={route.summary.slug} value={route.summary.slug} disabled={slugs.includes(route.summary.slug) && slugs[index] !== route.summary.slug}>{route.summary.name}</option>)}</select></label>)}
    </div>
    {selected.length < 2 ? <section className="empty-state mt-12"><p className="eyebrow">Compare experiences</p><h2 className="mt-2 font-serif text-3xl">{selected.length ? "Choose one more journey to compare" : "Choose two journeys to compare"}</h2><p className="mt-3 text-stone-600">Select from Rallii’s five curated journeys. No route is ranked or declared a winner.</p></section> : <>
      <div className="comparison-grid mt-10">{selected.map((route) => <CompareHeader key={route.summary.slug} route={route} saved={getStatus(route.summary.slug) === "want_to_go"} onSave={() => setStatus(route.summary.slug, getStatus(route.summary.slug) === "want_to_go" ? undefined : "want_to_go")} />)}</div>
      <dl className="comparison-list" aria-label={`Comparison of ${selected[0].summary.name} and ${selected[1].summary.name}`}>
        <CompareRow label="Journey time" routes={selected} render={(route) => `${formatDuration(route.summary.durationMinutes)} · ${getJourneyDurationCategory(route.summary.durationMinutes)}`} />
        <CompareRow label="Distance" routes={selected} render={(route) => `${route.summary.distanceKm} km`} />
        <CompareRow label="Where" routes={selected} render={(route) => route.summary.countries.join(" · ")} />
        <CompareRow label="Experience" routes={selected} render={(route) => route.summary.trainType} />
        <CompareRow label="Reservation" routes={selected} render={(route) => formatReservation(route.summary.reservationStatus)} />
        <CompareRow label="Landscapes" routes={selected} render={(route) => route.summary.experienceTags.map(formatExperienceTag).join(" · ")} />
        <CompareRow label="Journey highlights" routes={selected} render={(route) => route.landmarks.slice(0, 3).map((landmark) => landmark.name).join(" · ")} />
        <CompareRow label="Best side guidance" routes={selected} render={getBestSideSummary} />
      </dl>
      <div className="comparison-grid mt-8">{selected.map((route) => <section className="compare-best-for" key={route.summary.slug}><p className="eyebrow">{route.summary.name}</p><h2 className="mt-2 font-serif text-2xl">Choose this if you want</h2><ul>{route.summary.bestFor.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>
      <div className="mt-8 flex flex-wrap items-center gap-3"><button className="action-button" type="button" onClick={shareComparison}>Share comparison</button><button className="action-button" type="button" onClick={() => router.push(buildComparisonPath([slugs[1], slugs[0]]))}>Swap journeys</button><span className="text-xs text-stone-600" aria-live="polite">{shareStatus}</span></div>
    </>}
  </div>;
}

function CompareHeader({ route, saved, onSave }: { route: RailRoute; saved: boolean; onSave: () => void }) { const { summary } = route; return <article className="compare-header"><RouteMedia summary={summary} variant="card" /><div><p className="eyebrow">{summary.country}</p><h2 className="mt-2 font-serif text-3xl">{summary.name}</h2><p className="mt-2 font-serif text-lg text-stone-600">{summary.origin} → {summary.destination}</p><p className="mt-4 text-xs font-bold uppercase tracking-wider text-stone-500">{getJourneyDurationCategory(summary.durationMinutes)}</p><div className="mt-5 flex flex-wrap gap-2"><Link className="action-button" href={`/routes/${summary.slug}`}>View journey</Link><button className="action-button" type="button" aria-pressed={saved} onClick={onSave}>{saved ? "Want to Go" : "Add to Want to Go"}</button></div></div></article>; }
function CompareRow({ label, routes, render }: { label: string; routes: RailRoute[]; render: (route: RailRoute) => string }) { return <div className="comparison-row"><dt>{label}</dt><dd><span>{routes[0].summary.name}</span>{render(routes[0])}</dd><dd><span>{routes[1].summary.name}</span>{render(routes[1])}</dd></div>; }
