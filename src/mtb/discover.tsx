"use client";
import { DestinationBrowser } from "@/components/destination-browser";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ACTIVITY_PATHS_KEY, parseActivityPaths } from "@/lib/activities";
import { filterMtb, mtbDestinations } from "./data";
import { MtbCard } from "./card";
import { MtbPhoto, MtbCredit } from "./photo";
export function MtbDiscover() {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const skill = params.get("skill") ?? "All", region = params.get("region") ?? "All", kind = params.get("kind") ?? "All", appliedQuery = params.get("q") ?? "";
  const results = filterMtb(appliedQuery, skill, region, kind);
  function update(values: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(values)) { if (!value || value === "All") next.delete(key); else next.set(key, value); }
    const href = `/mtb/${next.size ? `?${next}` : ""}`;
    try { const paths = parseActivityPaths(localStorage.getItem(ACTIVITY_PATHS_KEY)); paths.mtb = href; localStorage.setItem(ACTIVITY_PATHS_KEY, JSON.stringify(paths)); } catch { /* Optional preference. */ }
    router.replace(href, { scroll: false });
  }
  return <main className="rallii-editorial mtb-editorial">
    <section className="mtb-hero"><MtbPhoto imageKey="crested-butte" priority /><div className="rallii-hero-shade" /><div className="rallii-container mtb-hero-copy"><p className="rallii-kicker">Rallii / Mountain biking</p><h1>Find your line.<br />Make a day of it.</h1><p>Forest flow. Red rock. One more mountain descent.<br />Thirty places worth bringing your bike.</p><a className="rallii-button rallii-button-light" href="#mtb-catalogue">Explore the riding ↓</a></div></section>
    <div className="rallii-container"><MtbCredit imageKey="crested-butte" /></div>
    <section id="mtb-catalogue" className="rallii-container rallii-section"><div className="rallii-section-heading"><div><p className="rallii-kicker">The MTB collection</p><h2>Choose your terrain.</h2></div><p>Trail systems, iconic regions and bike parks.</p></div>
    <details className="catalogue-filters"><summary>Search & filters</summary><form className="trail-filters mtb-filters" onSubmit={event => { event.preventDefault(); update({ q: query }); }}><label className="trail-search">Search MTB<input type="search" placeholder="Try Whistler, forest or desert" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <label>Rider level<select value={skill} onChange={event => update({ skill: event.target.value })}>{["All", "Beginner", "Intermediate", "Advanced"].map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Region<select value={region} onChange={event => update({ region: event.target.value })}>{["All", ...new Set(mtbDestinations.map(item => item.region))].map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Riding style<select value={kind} onChange={event => update({ kind: event.target.value })}>{["All", "Bike park", "Trail system", "Riding region"].map(value => <option key={value}>{value}</option>)}</select></label><button className="rallii-button" type="submit">Search</button></form></details>
    <div className="trail-results-line"><p role="status">{results.length} {results.length === 1 ? "riding destination" : "riding destinations"}{appliedQuery ? ` for “${appliedQuery}”` : " to explore"}</p>{appliedQuery || skill !== "All" || region !== "All" || kind !== "All" ? <button type="button" onClick={() => { setQuery(""); update({ q: "", skill: "All", region: "All", kind: "All" }); }}>Clear filters</button> : null}</div>
    <p className="trail-fact-note">Rider levels describe options within an area, not the grade of every trail. Choose an individual route using the local map.</p>
    {results.length ? <DestinationBrowser key={params.toString()} items={results} describe={ride => `${ride.kind} · ${ride.skills.join(" / ")}`} render={ride => <MtbCard ride={ride} />} /> : <div className="trail-empty"><h2>Try another line.</h2><p>No riding areas match these filters.</p><button className="rallii-button" onClick={() => { setQuery(""); update({ q: "", skill: "All", region: "All", kind: "All" }); }}>Show all riding areas</button></div>}
    <p className="trail-editorial-note">A destination guide, not a live trail report. Choose a bike-permitted route and check the linked operator or trail organization for current maps, access and conditions.</p></section>
  </main>;
}
