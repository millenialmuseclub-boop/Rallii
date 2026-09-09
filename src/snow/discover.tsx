"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DestinationBrowser } from "@/components/destination-browser";
import { ACTIVITY_PATHS_KEY, parseActivityPaths } from "@/lib/activities";
import { SnowPhoto, SnowCredit } from "./photo";
import { SnowCard } from "./card";
import { filterSnow, snowDestinations } from "./data";

export function SnowDiscover() {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const region = params.get("region") ?? "All", kind = params.get("kind") ?? "All", applied = params.get("q") ?? "";
  const results = filterSnow(applied, region, kind);
  function update(values: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(values)) { if (!value || value === "All") next.delete(key); else next.set(key, value); }
    const href = `/snow/${next.size ? `?${next}` : ""}`;
    try { const paths = parseActivityPaths(localStorage.getItem(ACTIVITY_PATHS_KEY)); paths.snow = href; localStorage.setItem(ACTIVITY_PATHS_KEY, JSON.stringify(paths)); } catch { /* Optional preference. */ }
    router.replace(href, { scroll: false });
  }
  return <main className="rallii-editorial snow-editorial">
    <section className="snow-hero"><SnowPhoto imageKey="chamonix" priority/><div className="rallii-container"><p className="rallii-kicker">Rallii / Snow</p><h1>Follow winter.</h1><p>Mountain towns, deep-snow days and twelve places to begin.</p><a className="rallii-button rallii-button-light" href="#snow-catalogue">Explore snow ↓</a></div></section><div className="rallii-container"><SnowCredit imageKey="chamonix"/></div>
    <section id="snow-catalogue" className="rallii-container rallii-section"><div className="rallii-section-heading"><div><p className="rallii-kicker">The Snow collection</p><h2>Choose your winter.</h2></div><p>Resorts and ski regions, organized for a trip.</p></div>
      <form className="discovery-search" onSubmit={event => { event.preventDefault(); update({ q: query }); }}><label className="trail-search">Search snow<input type="search" placeholder="Try Whistler, Japan or alpine" value={query} onChange={event => setQuery(event.target.value)} /></label><button className="rallii-button" type="submit">Search</button></form>
      <details className="catalogue-filters"><summary>Filters <span>{[region, kind].filter(value => value !== "All").join(" · ") || "All destinations"}</span></summary><div className="trail-filters"><label>Region<select value={region} onChange={event => update({ region: event.target.value })}>{["All", ...new Set(snowDestinations.map(item => item.region))].map(value => <option key={value}>{value}</option>)}</select></label><label>Type<select value={kind} onChange={event => update({ kind: event.target.value })}>{["All", "Resort", "Ski region"].map(value => <option key={value}>{value}</option>)}</select></label></div></details>
      <div className="trail-results-line"><p role="status">{results.length} snow destinations</p>{applied || region !== "All" || kind !== "All" ? <button type="button" onClick={() => { setQuery(""); update({ q: "", region: "All", kind: "All" }); }}>Clear filters</button> : null}</div>
      {results.length ? <DestinationBrowser key={params.toString()} items={results} describe={item => `${item.kind} · ${item.season}`} render={item => <SnowCard place={item} />} /> : <p>No snow destinations match these filters.</p>}
      <p className="trail-editorial-note">A trip-planning starting point, not a live snow report. Check the linked destination for current terrain, weather, access and safety information.</p>
    </section>
  </main>;
}
