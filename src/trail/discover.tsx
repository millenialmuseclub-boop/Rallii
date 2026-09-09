"use client";
import { DestinationBrowser } from "@/components/destination-browser";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { filterTrails, trails } from "./data";
import { TrailCard } from "./trail-card";
import { TrailPhoto, TrailCredit } from "./trail-photo";
import { ACTIVITY_PATHS_KEY, parseActivityPaths } from "@/lib/activities";

export function TrailDiscover() {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const difficulty = params.get("difficulty") ?? "All";
  const region = params.get("region") ?? "All";
  const appliedQuery = params.get("q") ?? "";
  const results = filterTrails(appliedQuery, difficulty, region);
  function update(values: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(values)) { if (!value || value === "All") next.delete(key); else next.set(key, value); }
    const href = `/trail/${next.size ? `?${next}` : ""}`;
    try { const paths = parseActivityPaths(localStorage.getItem(ACTIVITY_PATHS_KEY)); paths.trail = href; localStorage.setItem(ACTIVITY_PATHS_KEY, JSON.stringify(paths)); } catch { /* Optional preference. */ }
    router.replace(href, { scroll: false });
  }
  return <main className="rallii-editorial trail-discover">
    <section className="trail-intro rallii-container"><div><p className="rallii-kicker">Rallii / Trail</p><h1>A little further.<br /><em>A little wilder.</em></h1><p>Waterfall mornings. Alpine afternoons. Thirty remarkable reasons to take the long way outside.</p><a className="rallii-button" href="#trail-catalogue">Find your trail ↓</a></div><div className="trail-intro-photo"><TrailPhoto imageKey="moss" priority /><span>Field notes / Hoh Rain Forest</span></div></section>
    <div className="rallii-container"><TrailCredit imageKey="moss" /></div>
    <section id="trail-catalogue" className="rallii-container rallii-section"><div className="rallii-section-heading"><div><p className="rallii-kicker">The Trail collection</p><h2>Find your kind of outside.</h2></div><p>Curated routes, at your pace.</p></div>
      <form className="discovery-search" onSubmit={event => { event.preventDefault(); update({ q: query }); }}><label className="trail-search">Search trails<input type="search" placeholder="Try Yosemite, coast or waterfalls" value={query} onChange={event => setQuery(event.target.value)} /></label><button className="rallii-button" type="submit">Search</button></form>
      <details className="catalogue-filters"><summary>Filters <span>{[difficulty, region].filter(value => value !== "All").join(" · ") || "All destinations"}</span></summary><div className="trail-filters">
        <label>Difficulty<select value={difficulty} onChange={event => update({ difficulty: event.target.value })}>{["All", "Easy", "Moderate", "Strenuous"].map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Region<select value={region} onChange={event => update({ region: event.target.value })}>{["All", ...new Set(trails.map(trail => trail.region))].map(value => <option key={value}>{value}</option>)}</select></label>
        </div></details>
      <div className="trail-results-line"><p role="status">{results.length} {results.length === 1 ? "trail" : "trails"}{appliedQuery ? ` for “${appliedQuery}”` : " to remember"}</p>{appliedQuery || difficulty !== "All" || region !== "All" ? <button type="button" onClick={() => { setQuery(""); update({ q: "", difficulty: "All", region: "All" }); }}>Clear filters</button> : null}</div>
      {results.length ? <DestinationBrowser key={params.toString()} items={results} describe={trail => `${trail.difficulty} · ${trail.distanceKm} km · ${trail.duration}`} render={trail => <TrailCard trail={trail} />} /> : <div className="trail-empty"><h2>A different path?</h2><p>No trails match this search. Clear the filters to see the full collection.</p></div>}
      <p className="trail-editorial-note">An editorial starting point. Distances and times are approximate, and difficulty assumes ordinary hiking conditions. Check official access, weather and trail notices before you go.</p>
    </section>
  </main>;
}
