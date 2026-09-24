"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

export interface OutdoorCollection<T> { title: string; description: string; items: T[] }

/** Only the selected editorial rail mounts photos and save subscriptions. */
export function OutdoorDiscovery<T extends { slug: string; imageKey: string }>({ mode, collections, render }: {
  mode: string; collections: OutdoorCollection<T>[]; render: (item: T) => ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  const collection = collections[selected];
  const seen = new Set<string>();
  const items = collection.items.filter(item => {
    if (seen.has(item.imageKey)) return false;
    seen.add(item.imageKey); return true;
  }).slice(0, 4);
  return <section className="rallii-container rallii-section outdoor-discovery">
    <div className="rallii-section-heading"><div><p className="rallii-kicker">Ideas for your next escape</p><h2>Go for the experience.</h2></div><Link className="rallii-button" href={`/${mode}/plan/`}>Plan a trip →</Link></div>
    <div className="outdoor-collection-tabs" aria-label="Discovery collections">{collections.map((item, index) => <button type="button" key={item.title} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.title}</button>)}</div>
    <p aria-live="polite">{collection.description}</p>
    <div className="outdoor-photo-rail" aria-label={collection.title}>{items.map(item => <div key={item.slug}>{render(item)}</div>)}</div>
  </section>;
}
