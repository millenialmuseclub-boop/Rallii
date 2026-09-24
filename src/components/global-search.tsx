
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { DiscoveryEntry } from "@/data/discovery-catalogue";
import { searchDiscovery } from "@/lib/discovery-search";
import { experienceEvent } from "@/lib/experience-events";

export function GlobalSearch({ entries }: { entries: DiscoveryEntry[] }) {
  const params = useSearchParams(), router = useRouter();
  const query = params.get("q") ?? "", country = params.get("country") ?? "All";
  const modes = ["all", "rail", "trail", "mtb", "snow", "green"] as const;
  const mode = modes.find(value => value === params.get("mode")) ?? "all";
  const month = mode === "snow" ? params.get("month") ?? "All" : "All";
  const [limit, setLimit] = useState(12);
  const results = searchDiscovery(entries, query, mode, country, month);
  function update(values: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(values)) { if (!value || value === "All" || value === "all") next.delete(key); else next.set(key, value); }
    if (next.get("mode") !== "snow") next.delete("month");
    setLimit(12); router.replace(`/search/${next.size ? `?${next}` : ""}`, { scroll: false });
    experienceEvent("search_filter", { mode, route_id: "", filter_keys: Object.keys(values) });
  }
  return <section className="rallii-section"><p className="rallii-kicker">Find your way outside</p><h2>What kind of journey calls you?</h2>
    <form onSubmit={event => { event.preventDefault(); update({ q: String(new FormData(event.currentTarget).get("q") ?? "") }); }}>
      <div className="trail-filters"><label>Place or landscape<input key={query} name="q" type="search" defaultValue={query} placeholder="Try Japan, alpine or forest" /></label>
        <label>Mode<select aria-label="Discovery mode" value={mode} onChange={event => update({ mode: event.target.value })}>{modes.map(value => <option key={value} value={value}>{value === "all" ? "All modes" : value.toUpperCase()}</option>)}</select></label>
        <label>Country<select aria-label="Discovery country" value={country} onChange={event => update({ country: event.target.value })}>{["All", ...new Set(entries.flatMap(place => place.countries ?? [place.country]))].sort((a,b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)).map(value => <option key={value}>{value}</option>)}</select></label>
        {mode === "snow" ? <label>Snow planning month<select value={month} onChange={event => update({ month: event.target.value })}><option value="All">All months</option>{Array.from({ length: 12 }, (_, index) => <option key={index} value={index + 1}>{new Date(2026, index, 1).toLocaleString("en", { month: "long" })}</option>)}</select></label> : null}
      </div><button className="rallii-button" type="submit">Search journeys</button>
    </form>
    <div className="discovery-actions"><button className="action-button" type="button" disabled={!results.length} onClick={() => { const place = results[Math.floor(Math.random() * results.length)]; experienceEvent("surprise", { mode: place.mode, route_id: place.slug, result_count: results.length }); router.push(place.href); }}>Surprise me</button>{query || mode !== "all" || country !== "All" ? <button className="action-button" type="button" onClick={() => update({ q: "", mode: "all", country: "All", month: "All" })}>Clear discovery filters</button> : null}</div>
    <p role="status">{results.length} places and journeys</p>{mode === "snow" ? <p className="trail-fact-note">Months are editorial planning windows, not opening dates or live snow conditions.</p> : null}
    {!results.length ? <p>Try a broader landscape or country, or clear the filters to explore again.</p> : null}
    <div className="field-notes-grid">{results.slice(0, limit).map(place => <article key={place.id}><p className="rallii-kicker">{place.mode} / {place.country}</p><h3><Link href={place.href}>{place.name}</Link></h3><p>{place.summary}</p><p className="trail-fact-note">{place.season}</p><Link className="rallii-text-link" href={place.href}>Explore →</Link></article>)}</div>
    {results.length > limit ? <button className="rallii-button" type="button" onClick={() => setLimit(value => value + 12)}>Show more results</button> : null}
  </section>;
}
