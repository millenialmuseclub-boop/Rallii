"use client";

import Link from "next/link";
import { useState } from "react";
import { RouteCard } from "@/components/route-card";
import { searchRoutes } from "@/lib/route-search";
import type { RailRoute } from "@/types/route";

const suggestions = ["Glacier Express", "Scotland", "Panoramic", "Glenfinnan Viaduct"];

export function SearchRoutes({ routes }: { routes: RailRoute[] }) {
  const [query, setQuery] = useState("");
  const results = searchRoutes(routes, query);
  const hasQuery = query.trim().length > 0;

  return <div className="mt-9">
    <label className="sr-only" htmlFor="route-search">Search Rallii journeys</label>
    <div className="search-field"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 4 4" /></svg><input id="route-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Zermatt, Glenfinnan, panoramic…" autoComplete="off" /></div>
    {!hasQuery ? <section className="empty-state mt-10" aria-labelledby="suggestions-title"><p className="eyebrow">Start somewhere</p><h2 id="suggestions-title" className="mt-2 font-serif text-3xl">Popular searches</h2><div className="mt-6 flex flex-wrap gap-2">{suggestions.map((suggestion) => <button className="filter-button" type="button" onClick={() => setQuery(suggestion)} key={suggestion}>{suggestion}</button>)}</div></section> : null}
    {hasQuery && results.length ? <div className="mt-10"><p className="mb-6 text-sm text-stone-600" aria-live="polite">{results.length === 1 ? "1 curated journey" : `${results.length} curated journeys`}</p><div className="grid gap-7 lg:grid-cols-2">{results.map((result) => <RouteCard key={result.route.summary.slug} route={result.route} matchContext={result.matchType === "route" ? undefined : result.matchLabel} />)}</div></div> : null}
    {hasQuery && !results.length ? <section className="empty-state mt-10" aria-live="polite"><p className="eyebrow">Search Rallii</p><h2 className="mt-2 font-serif text-3xl">No journeys found</h2><p className="mt-3 text-stone-600">Try another route, place, landmark, or country.</p><Link className="primary-link focus-ring mt-7" href="/discover">Explore all journeys <span aria-hidden="true">→</span></Link></section> : null}
  </div>;
}
