"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jordypopProjects } from "@/data/jordypop";

export interface PlannerField { key: string; label: string; options: string[] }
export interface PlannerPlace { slug: string; name: string }

export function OutdoorPlanner<T extends PlannerPlace>({ mode, title, items, fields, matches, render, notes }: {
  mode: "trail" | "snow" | "mtb"; title: string; items: T[]; fields: PlannerField[];
  matches: (item: T, values: URLSearchParams) => boolean; render: (item: T) => ReactNode;
  notes: (item: T, values: URLSearchParams) => ReactNode;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const values = new URLSearchParams(params.toString());
  const route = values.get("route");
  const results = items.filter(item => (!route || item.slug === route) && matches(item, values));
  const [saved, setSaved] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const key = `rallii:${mode}:plan:v1`;
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { setSaved(localStorage.getItem(key)); } catch { /* Optional device storage. */ }
    }, 0);
    return () => clearTimeout(timer);
  }, [key]);
  function save() {
    try { localStorage.setItem(key, params.toString()); setSaved(params.toString()); setMessage("Planning preferences saved on this device. Save destinations below to add them to My Rallii."); }
    catch { setMessage("Device storage is unavailable. Keep this page’s URL to return to your choices."); }
  }
  return <main className={`rallii-editorial ${mode}-editorial`}><div className="rallii-container rallii-section outdoor-planner">
    <p className="rallii-kicker">Rallii / {title} / Plan</p><h1>Make a little room for {mode === "trail" ? "outside" : mode === "snow" ? "winter" : "the ride"}.</h1>
    <p>Choose a few preferences, save a shortlist, then use each guide to arrange the details.</p>
    <div className="outdoor-plan-actions"><Link href={`/${mode}/`}>Discover {title} →</Link><Link href="/my-rallii/">Your saved destinations →</Link>{saved !== null ? <Link href={`/${mode}/plan/?${new URLSearchParams(saved)}`}>Restore saved preferences →</Link> : null}</div>
    <form key={params.toString()} onSubmit={event => {
      event.preventDefault();
      const next = new URLSearchParams();
      new FormData(event.currentTarget).forEach((value, name) => { if (typeof value === "string" && value) next.set(name, value); });
      setMessage(""); router.replace(`/${mode}/plan/?${next}`, { scroll: false });
    }}>
      <div className="outdoor-plan-fields"><label>Destination<select name="route" defaultValue={route ?? ""}><option value="">Find a destination</option>{items.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
      <label>Trip length<select name="days" defaultValue={values.get("days") ?? "Weekend"}>{["Day trip", "Weekend", "Long weekend", "One week"].map(value => <option key={value}>{value}</option>)}</select></label>
      {fields.map(field => <label key={field.key}>{field.label}<select name={field.key} defaultValue={values.get(field.key) ?? ""}><option value="">Any</option>{field.options.map(value => <option key={value}>{value}</option>)}</select></label>)}</div>
      <div className="outdoor-plan-actions"><button className="rallii-button" type="submit">Find my trip</button><Link href={`/${mode}/plan/`}>Reset choices</Link></div>
    </form>
    <div className="trail-results-line"><p role="status">{results.length} matching {results.length === 1 ? "destination" : "destinations"} · {values.get("days") ?? "Weekend"}</p><button className="rallii-button" onClick={save}>Save planning preferences</button></div><p role="status">{message}</p>
    <p className="trail-fact-note">Apply choices before saving preferences. Trip length is your time budget, including travel. Seasonal notes are editorial guidance, not live access or conditions. Showing up to six ideas at a time; narrow your preferences for more.</p>
    {results.length ? <div className="outdoor-plan-results">{results.slice(0, 6).map(item => <section key={item.slug}>{render(item)}<div className="outdoor-plan-notes"><h3>Your planning notes</h3>{notes(item, values)}<Link className="rallii-text-link" href={`/${mode}/${item.slug}/`}>Explore the full guide & arrange your trip →</Link></div></section>)}</div> : <div className="trail-empty"><h2>Give your trip a little more room.</h2><p>No exact matches. Try another region or remove a preference; unknown distances and elevation gains do not count as matches.</p></div>}
    <details className="catalogue-filters"><summary>Around the trip</summary><p>For the days around your adventure: {mode === "snow" ? <a data-outbound="ecosystem_click" data-mode="snow" href={jordypopProjects.find(project => project.id === "luxe")!.href} target="_blank" rel="noopener noreferrer">Plan clothing for transfers and village evenings with Luxe Jetter ↗</a> : "Check the local climate and pack for your chosen activity, including the days spent getting there."}</p>{mode === "snow" ? <p><Link href="/guides/swiss-winter-by-rail/">Swiss winter by rail →</Link> · <Link href="/routes/glacier-express/">Explore the Glacier Express →</Link></p> : null}</details>
  </div></main>;
}
