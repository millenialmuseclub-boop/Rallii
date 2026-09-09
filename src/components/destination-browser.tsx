"use client";

import { useId, useState, type ReactNode } from "react";

export function DestinationBrowser<T extends { slug: string; name: string; region: string }>({ items, describe, render }: { items: T[]; describe: (item: T) => string; render: (item: T) => ReactNode }) {
  const id = useId();
  const [region, setRegion] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const regionLabel = (item: T) => item.region.startsWith("US ") ? "United States" : item.region;
  const regions = [...new Set(items.map(regionLabel))];
  return <div className="destination-browser">{regions.map((name, index) => {
    const entries = items.filter(item => regionLabel(item) === name);
    const open = region === name;
    return <section className="destination-region" key={name}>
      <button className="destination-region-toggle" aria-expanded={open} aria-controls={`${id}-${index}`} onClick={() => { setRegion(open ? null : name); setSelected(null); }}><span>{name}<small>{entries.length} {entries.length === 1 ? "place" : "places"}</small></span><span aria-hidden="true">{open ? "−" : "+"}</span></button>
      <div id={`${id}-${index}`} hidden={!open}>{open ? entries.map(item => <div className="destination-entry" key={item.slug}>
        <button className="destination-entry-toggle" aria-expanded={selected === item.slug} aria-controls={`${id}-${item.slug}`} onClick={() => setSelected(selected === item.slug ? null : item.slug)}><span>{item.name}<small>{describe(item)}</small></span><span aria-hidden="true">{selected === item.slug ? "−" : "+"}</span></button>
        <div id={`${id}-${item.slug}`} hidden={selected !== item.slug}>{selected === item.slug ? render(item) : null}</div>
      </div>) : null}</div>
    </section>;
  })}</div>;
}
